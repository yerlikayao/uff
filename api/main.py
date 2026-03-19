"""
UFF PDF Engine — FastAPI backend for filling official IRS PDF forms.

Uses PyMuPDF (fitz) which handles both AcroForm and XFA form fields
in the original IRS PDFs without corrupting them.
"""

from pathlib import Path
from io import BytesIO

import fitz  # PyMuPDF
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

app = FastAPI(
    title="UFF PDF Engine",
    description="Fill official IRS PDF forms with user data",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

# Path to the PDF templates
PDF_DIR = Path(__file__).parent.parent / "public" / "pdfs"


class FillRequest(BaseModel):
    """Request body for filling a PDF form."""
    form_id: str
    values: dict[str, str]


# ─── PDF file lookup ─────────────────────────────────────────────
FORM_PDF_FILES: dict[str, str] = {
    "ss-4": "fss4.pdf",
    "form-8832": "f8832.pdf",
    "form-1120": "f1120.pdf",
    "form-5472": "f5472.pdf",
    "form-1065": "f1065.pdf",
    "schedule-k1": "f1065sk1.pdf",
    "form-1040-nr": "f1040nr.pdf",
    "w-8ben": "fw8ben.pdf",
    "w-8ben-e": "fw8bene.pdf",
    "form-7004": "f7004.pdf",
    "form-4868": "f4868.pdf",
}


# ─── Field mappings (app field → PDF AcroForm field) ─────────────
# These map our app's field names to the actual AcroForm widget names
# in the IRS PDFs. Checkbox mappings use a dict of {value: field_name}.

FIELD_MAPPINGS: dict[str, dict[str, str | dict[str, str] | None]] = {
    "ss-4": {
        "legalName": "topmostSubform[0].Page1[0].f1_2[0]",
        "tradeName": "topmostSubform[0].Page1[0].f1_3[0]",
        "executorName": "topmostSubform[0].Page1[0].f1_4[0]",
        "mailingAddress": "topmostSubform[0].Page1[0].Line4ReadOrder[0].f1_5[0]",
        "mailingSuite": "topmostSubform[0].Page1[0].Line4ReadOrder[0].f1_6[0]",
        "physicalAddress": "topmostSubform[0].Page1[0].f1_7[0]",
        "_cityStateZip": "topmostSubform[0].Page1[0].f1_8[0]",
        "county": "topmostSubform[0].Page1[0].f1_9[0]",
        "responsiblePartyName": "topmostSubform[0].Page1[0].f1_10[0]",
        "responsiblePartySSN": "topmostSubform[0].Page1[0].f1_11[0]",
        "isLLC": {
            "yes": "topmostSubform[0].Page1[0].c1_1[0]",
            "no": "topmostSubform[0].Page1[0].c1_1[1]",
        },
        "llcMembers": "topmostSubform[0].Page1[0].f1_12[0]",
        "organizedInUS": {
            "yes": "topmostSubform[0].Page1[0].c1_2[0]",
            "no": "topmostSubform[0].Page1[0].c1_2[1]",
        },
        "entityType": {
            "sole_proprietor": "topmostSubform[0].Page1[0].c1_3[0]",
            "partnership": "topmostSubform[0].Page1[0].c1_3[2]",
            "corporation": "topmostSubform[0].Page1[0].c1_3[4]",
            "personal_service_corp": "topmostSubform[0].Page1[0].c1_3[6]",
            "church": "topmostSubform[0].Page1[0].c1_3[9]",
            "nonprofit": "topmostSubform[0].Page1[0].c1_3[12]",
            "other": "topmostSubform[0].Page1[0].c1_3[15]",
        },
        "entityTypeOther": "topmostSubform[0].Page1[0].f1_19[0]",
        "corporationType": "topmostSubform[0].Page1[0].f1_16[0]",
        "stateOrCountry": "topmostSubform[0].Page1[0].f1_20[0]",
        "reasonApplying": {
            "started_new_business": "topmostSubform[0].Page1[0].c1_4[0]",
            "hired_employees": "topmostSubform[0].Page1[0].c1_4[3]",
            "compliance": "topmostSubform[0].Page1[0].c1_4[4]",
            "changed_org_type": "topmostSubform[0].Page1[0].c1_4[1]",
            "purchased_business": "topmostSubform[0].Page1[0].c1_4[2]",
            "created_trust": "topmostSubform[0].Page1[0].c1_4[5]",
            "created_pension_plan": "topmostSubform[0].Page1[0].c1_4[6]",
            "banking_purpose": "topmostSubform[0].Page1[0].c1_4[8]",
            "other": "topmostSubform[0].Page1[0].c1_4[7]",
        },
        "reasonSpecify": "topmostSubform[0].Page1[0].f1_24[0]",
        "dateBusinessStarted": "topmostSubform[0].Page1[0].f1_31[0]",
        "closingMonthFiscalYear": "topmostSubform[0].Page1[0].f1_32[0]",
        "highestNumEmployeesAgricultural": "topmostSubform[0].Page1[0].f1_33[0]",
        "highestNumEmployeesHousehold": "topmostSubform[0].Page1[0].f1_34[0]",
        "highestNumEmployees": "topmostSubform[0].Page1[0].f1_35[0]",
        "firstDateWagesPaid": "topmostSubform[0].Page1[0].f1_30[0]",
        "principalActivity": {
            "construction": "topmostSubform[0].Page1[0].c1_6[0]",
            "real_estate": "topmostSubform[0].Page1[0].c1_6[1]",
            "rental_leasing": "topmostSubform[0].Page1[0].c1_6[2]",
            "manufacturing": "topmostSubform[0].Page1[0].c1_6[3]",
            "transportation": "topmostSubform[0].Page1[0].c1_6[4]",
            "finance_insurance": "topmostSubform[0].Page1[0].c1_6[5]",
            "health_care": "topmostSubform[0].Page1[0].c1_6[6]",
            "food_service": "topmostSubform[0].Page1[0].c1_6[7]",
            "wholesale_agent": "topmostSubform[0].Page1[0].c1_6[8]",
            "wholesale_other": "topmostSubform[0].Page1[0].c1_6[9]",
            "retail": "topmostSubform[0].Page1[0].c1_6[10]",
            "other": "topmostSubform[0].Page1[0].c1_6[11]",
        },
        "principalActivityOther": "topmostSubform[0].Page1[0].f1_37[0]",
        "principalProduct": "topmostSubform[0].Page1[0].f1_38[0]",
        "previousEIN": {
            "yes": "topmostSubform[0].Page1[0].c1_7[0]",
            "no": "topmostSubform[0].Page1[0].c1_7[1]",
        },
        "thirdPartyDesigneeName": "topmostSubform[0].Page1[0].f1_39[0]",
        "thirdPartyPhone": "topmostSubform[0].Page1[0].f1_40[0]",
        "thirdPartyAddress": "topmostSubform[0].Page1[0].f1_41[0]",
        "applicantName": "topmostSubform[0].Page1[0].f1_42[0]",
        "applicantPhone": "topmostSubform[0].Page1[0].f1_45[0]",
        "applicantFax": "topmostSubform[0].Page1[0].f1_46[0]",
    },
    "form-8832": {
        "entityName": "topmostSubform[0].Page1[0].p1-t1[0]",
        "ein": "topmostSubform[0].Page1[0].p1-t2[0]",
        "streetAddress": "topmostSubform[0].Page1[0].p1-t4[0]",
        "_cityStateZipCountry": "topmostSubform[0].Page1[0].p1-t5[0]",
        "lateElectionRelief": "topmostSubform[0].Page1[0].c1_01_0_[0]",
        "electionType": {
            "initial": "topmostSubform[0].Page1[0].c1_02_0_[0]",
            "change": "topmostSubform[0].Page1[0].c1_02_0_[1]",
        },
        "electionNotDefault": {
            "yes": "topmostSubform[0].Page1[0].c1_03_0_[0]",
            "no": "topmostSubform[0].Page1[0].c1_03_0_[1]",
        },
        "wasEverIncorporated": {
            "yes": "topmostSubform[0].Page1[0].c1_04_0_[0]",
            "no": "topmostSubform[0].Page1[0].c1_04_0_[1]",
        },
        "classificationElected": {
            "corporation": "topmostSubform[0].Page2[0].c2_01_0_[0]",
            "partnership": "topmostSubform[0].Page2[0].c2_01_0_[1]",
            "disregarded": "topmostSubform[0].Page2[0].c2_01_0_[2]",
            "foreign_corp": "topmostSubform[0].Page2[0].c2_01_0_[3]",
            "foreign_partnership": "topmostSubform[0].Page2[0].c2_01_0_[4]",
            "foreign_disregarded": "topmostSubform[0].Page2[0].c2_01_0_[5]",
        },
        "numberOfOwners": "topmostSubform[0].Page2[0].p2-t1[0]",
        "electionEffectiveDate": "topmostSubform[0].Page2[0].p2-t2[0]",
        "authorizedPersonName": "topmostSubform[0].Page2[0].p2-t5[0]",
        "authorizedPersonTitle": "topmostSubform[0].Page2[0].p2-t7[0]",
        "signatureDate": "topmostSubform[0].Page2[0].Pg2Table[0].BodyRow1[0].p2-t9[0]",
    },
    "form-1120": {
        "corporationName": "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_4[0]",
        "streetAddress": "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_5[0]",
        "suiteRoom": "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_6[0]",
        "city": "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_7[0]",
        "state": "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_8[0]",
        "country": "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_9[0]",
        "zipCode": "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_10[0]",
        "ein": "topmostSubform[0].Page1[0].f1_11[0]",
        "dateIncorporated": "topmostSubform[0].Page1[0].f1_12[0]",
        "totalAssets": "topmostSubform[0].Page1[0].f1_13[0]",
        "initialReturn": "topmostSubform[0].Page1[0].c1_6[0]",
        "finalReturn": "topmostSubform[0].Page1[0].c1_7[0]",
        "nameChange": "topmostSubform[0].Page1[0].c1_8[0]",
        "addressChange": "topmostSubform[0].Page1[0].c1_9[0]",
        "grossReceipts": "topmostSubform[0].Page1[0].f1_14[0]",
        "returnsAllowances": "topmostSubform[0].Page1[0].f1_15[0]",
        "costOfGoodsSold": "topmostSubform[0].Page1[0].f1_17[0]",
        "grossProfit": "topmostSubform[0].Page1[0].f1_18[0]",
        "dividendIncome": "topmostSubform[0].Page1[0].f1_19[0]",
        "interestIncome": "topmostSubform[0].Page1[0].f1_20[0]",
        "grossRents": "topmostSubform[0].Page1[0].f1_21[0]",
        "grossRoyalties": "topmostSubform[0].Page1[0].f1_22[0]",
        "capitalGain": "topmostSubform[0].Page1[0].f1_23[0]",
        "netGainLoss": "topmostSubform[0].Page1[0].f1_24[0]",
        "otherIncome": "topmostSubform[0].Page1[0].f1_25[0]",
        "totalIncome": "topmostSubform[0].Page1[0].f1_26[0]",
        "compensationOfficers": "topmostSubform[0].Page1[0].f1_27[0]",
        "salariesWages": "topmostSubform[0].Page1[0].f1_28[0]",
        "repairsMainten": "topmostSubform[0].Page1[0].f1_29[0]",
        "badDebts": "topmostSubform[0].Page1[0].f1_30[0]",
        "rents": "topmostSubform[0].Page1[0].f1_31[0]",
        "taxes": "topmostSubform[0].Page1[0].f1_32[0]",
        "interestDeduction": "topmostSubform[0].Page1[0].f1_33[0]",
        "depreciation": "topmostSubform[0].Page1[0].f1_35[0]",
        "otherDeductions": "topmostSubform[0].Page1[0].f1_41[0]",
        "totalDeductions": "topmostSubform[0].Page1[0].f1_42[0]",
        "taxableIncome": "topmostSubform[0].Page1[0].f1_43[0]",
        "netOperatingLoss": "topmostSubform[0].Page1[0].f1_44[0]",
        "taxableIncomeAfterNOL": "topmostSubform[0].Page1[0].f1_47[0]",
        "totalTax": "topmostSubform[0].Page1[0].f1_48[0]",
        "taxYearBegin": "topmostSubform[0].Page1[0].PgHeader[0].f1_1[0]",
        "taxYearEnd": "topmostSubform[0].Page1[0].PgHeader[0].f1_2[0]",
        "shortYearReason": "topmostSubform[0].Page1[0].PgHeader[0].f1_3[0]",
        "officerSignatureDate": "topmostSubform[0].Page1[0].SignHere-ReadOrder[0].f1_58[0]",
    },
    "form-5472": {
        "reportingCorpName": "topmostSubform[0].Page1[0].Line1a[0].f1_5[0]",
        "reportingCorpAddress": "topmostSubform[0].Page1[0].Line1a[0].f1_6[0]",
        "_reportingCorpCityStateZip": "topmostSubform[0].Page1[0].Line1a[0].f1_7[0]",
        "reportingCorpEIN": "topmostSubform[0].Page1[0].f1_8[0]",
        "totalAssets": "topmostSubform[0].Page1[0].f1_9[0]",
        "principalBusinessActivity": "topmostSubform[0].Page1[0].f1_10[0]",
        "principalBusinessCode": "topmostSubform[0].Page1[0].f1_11[0]",
        "incorporationDate": "topmostSubform[0].Page1[0].Line1f_ReadOrder[0].f1_12[0]",
        "reportingCorpCountryIncorp": "topmostSubform[0].Page1[0].f1_16[0]",
        "stateOfIncorporation": "topmostSubform[0].Page1[0].f1_17[0]",
        "isSection898Election": "topmostSubform[0].Page1[0].Line1i_ReadOrder[0].c1_1[0]",
        "isSection338Election": "topmostSubform[0].Page1[0].Line1j_ReadOrder[0].c1_2[0]",
        "totalFormsAttached": "topmostSubform[0].Page1[0].Pg1Header[0].f1_2[0]",
        "formNumber": "topmostSubform[0].Page1[0].Pg1Header[0].f1_4[0]",
        "foreignOwnerName": "topmostSubform[0].Page1[0].f1_20[0]",
        "foreignOwnerAddress": "topmostSubform[0].Page1[0].f1_22[0]",
        "foreignOwnerCity": "topmostSubform[0].Page1[0].f1_23[0]",
        "foreignOwnerCountry": "topmostSubform[0].Page1[0].f1_25[0]",
        "foreignOwnerIdNumber": "topmostSubform[0].Page1[0].f1_21[0]",
        "foreignOwnerForeignIdNumber": "topmostSubform[0].Page1[0].f1_26[0]",
        "foreignOwnerCountryCitizenship": "topmostSubform[0].Page1[0].f1_27[0]",
        "foreignOwnerCountryOrganization": "topmostSubform[0].Page1[0].f1_28[0]",
        # Part III
        "relatedPartyName": "topmostSubform[0].Page1[0].f1_29[0]",
        "relatedPartyAddress": "topmostSubform[0].Page1[0].f1_30[0]",
        "relatedPartyCountry": "topmostSubform[0].Page1[0].f1_33[0]",
        "relatedPartyIdNumber": "topmostSubform[0].Page1[0].f1_34[0]",
        # Part IV - Amounts Received
        "salesOfStock": "topmostSubform[0].Page2[0].f2_9[0]",
        "salesOfTangible": "topmostSubform[0].Page2[0].f2_10[0]",
        "platformContribution": "topmostSubform[0].Page2[0].f2_11[0]",
        "costSharingReceived": "topmostSubform[0].Page2[0].f2_12[0]",
        "rentsReceived": "topmostSubform[0].Page2[0].f2_13[0]",
        "royaltiesReceived": "topmostSubform[0].Page2[0].f2_14[0]",
        "servicesReceived": "topmostSubform[0].Page2[0].f2_16[0]",
        "interestReceived": "topmostSubform[0].Page2[0].f2_20[0]",
        "otherAmountsReceived": "topmostSubform[0].Page2[0].f2_23[0]",
        # Part IV - Amounts Paid
        "purchasesOfStock": "topmostSubform[0].Page2[0].f2_25[0]",
        "purchasesOfTangible": "topmostSubform[0].Page2[0].f2_26[0]",
        "platformContribPaid": "topmostSubform[0].Page2[0].f2_27[0]",
        "costSharingPaid": "topmostSubform[0].Page2[0].f2_28[0]",
        "rentsPaid": "topmostSubform[0].Page2[0].f2_29[0]",
        "royaltiesPaid": "topmostSubform[0].Page2[0].f2_30[0]",
        "servicesPaid": "topmostSubform[0].Page2[0].f2_32[0]",
        "interestPaid": "topmostSubform[0].Page2[0].f2_36[0]",
        "otherAmountsPaid": "topmostSubform[0].Page2[0].f2_39[0]",
        # Capital & Loans
        "capitalContributions": "topmostSubform[0].Page2[0].f2_18[0]",
        "loansFromForeignOwner": "topmostSubform[0].Page2[0].f2_19[0]",
        "loansToForeignOwner": "topmostSubform[0].Page2[0].f2_35[0]",
        # Tax period
        "taxYearBegin": "topmostSubform[0].Page1[0].Pg1Header[0].f1_1[0]",
        "taxYearEnd": "topmostSubform[0].Page1[0].Pg1Header[0].f1_3[0]",
    },
    "form-1065": {
        "partnershipName": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_04[0]",
        "streetAddress": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_05[0]",
        "suiteRoom": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_06[0]",
        "city": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_07[0]",
        "state": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_08[0]",
        "country": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_09[0]",
        "zipCode": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_10[0]",
        "ein": "topmostSubform[0].Page1[0].f1_14[0]",
        "dateBusinessStarted": "topmostSubform[0].Page1[0].f1_15[0]",
        "totalAssets": "topmostSubform[0].Page1[0].f1_16[0]",
        "principalBusinessActivity": "topmostSubform[0].Page1[0].LinesA-C[0].f1_11[0]",
        "principalProduct": "topmostSubform[0].Page1[0].LinesA-C[0].f1_12[0]",
        "businessCode": "topmostSubform[0].Page1[0].LinesA-C[0].f1_13[0]",
        "accountingMethod": {
            "cash": "topmostSubform[0].Page1[0].c1_6[0]",
            "accrual": "topmostSubform[0].Page1[0].c1_6[1]",
            "other": "topmostSubform[0].Page1[0].c1_6[2]",
        },
        "numberOfPartners": "topmostSubform[0].Page1[0].f1_18[0]",
        "isInitialReturn": "topmostSubform[0].Page1[0].c1_7[0]",
        "isFinalReturn": "topmostSubform[0].Page1[0].c1_8[0]",
        "grossReceipts": "topmostSubform[0].Page1[0].f1_19[0]",
        "returnsAllowances": "topmostSubform[0].Page1[0].f1_20[0]",
        "costOfGoodsSold": "topmostSubform[0].Page1[0].f1_22[0]",
        "grossProfit": "topmostSubform[0].Page1[0].f1_23[0]",
        "ordinaryIncome": "topmostSubform[0].Page1[0].f1_24[0]",
        "netFarmProfit": "topmostSubform[0].Page1[0].f1_25[0]",
        "netGainLoss": "topmostSubform[0].Page1[0].f1_26[0]",
        "otherIncome": "topmostSubform[0].Page1[0].f1_27[0]",
        "totalIncome": "topmostSubform[0].Page1[0].f1_28[0]",
        "salariesWages": "topmostSubform[0].Page1[0].f1_29[0]",
        "guaranteedPayments": "topmostSubform[0].Page1[0].f1_30[0]",
        "repairsMaintenance": "topmostSubform[0].Page1[0].f1_31[0]",
        "badDebts": "topmostSubform[0].Page1[0].f1_32[0]",
        "rentExpense": "topmostSubform[0].Page1[0].f1_33[0]",
        "taxesLicenses": "topmostSubform[0].Page1[0].f1_34[0]",
        "interestDeduction": "topmostSubform[0].Page1[0].f1_35[0]",
        "depreciation": "topmostSubform[0].Page1[0].f1_36[0]",
        "otherDeductions": "topmostSubform[0].Page1[0].f1_44[0]",
        "totalDeductions": "topmostSubform[0].Page1[0].f1_45[0]",
        "ordinaryBusinessIncome": "topmostSubform[0].Page1[0].f1_46[0]",
        "taxYearBegin": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_01[0]",
        "taxYearEnd": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_02[0]",
        "shortPeriodReason": "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_03[0]",
        "generalPartnerName": "topmostSubform[0].Page1[0].f1_59[0]",
        "signatureDate": "topmostSubform[0].Page1[0].f1_60[0]",
    },
    "schedule-k1": {
        "partnershipName": "topmostSubform[0].Page1[0].LeftCol[0].f1_7[0]",
        "partnershipEIN": "topmostSubform[0].Page1[0].LeftCol[0].f1_6[0]",
        "partnerName": "topmostSubform[0].Page1[0].LeftCol[0].f1_10[0]",
        "partnerSSN": "topmostSubform[0].Page1[0].LeftCol[0].f1_9[0]",
        "partnerType": {
            "general": "topmostSubform[0].Page1[0].LeftCol[0].c1_4[0]",
            "limited": "topmostSubform[0].Page1[0].LeftCol[0].c1_4[1]",
        },
        "domesticOrForeign": {
            "domestic": "topmostSubform[0].Page1[0].LeftCol[0].c1_5[0]",
            "foreign": "topmostSubform[0].Page1[0].LeftCol[0].c1_5[1]",
        },
        "profitShareBeginning": "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Profit[0].f1_14[0]",
        "profitShareEnd": "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Profit[0].f1_15[0]",
        "lossShareBeginning": "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Loss[0].f1_16[0]",
        "lossShareEnd": "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Loss[0].f1_17[0]",
        "capitalShareBeginning": "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Capital[0].f1_18[0]",
        "capitalShareEnd": "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Capital[0].f1_19[0]",
        "ordinaryIncome": "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_34[0]",
        "netRentalIncome": "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_35[0]",
        "otherNetRentalIncome": "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_36[0]",
        "guaranteedPayments": "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_39[0]",
        "interestIncome": "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_40[0]",
        "dividends": "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_41[0]",
        "netShortTermCapGain": "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_45[0]",
        "netLongTermCapGain": "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_46[0]",
        "taxYearBegin": "topmostSubform[0].Page1[0].Pg1Header[0].ForCalendarYear[0].f1_1[0]",
        "taxYearEnd": "topmostSubform[0].Page1[0].Pg1Header[0].ForCalendarYear[0].f1_3[0]",
    },
    "form-1040-nr": {
        "firstName": "topmostSubform[0].Page1[0].f1_01[0]",
        "lastName": "topmostSubform[0].Page1[0].f1_02[0]",
        "ssn": "topmostSubform[0].Page1[0].f1_03[0]",
        "identifyingNumberType": "topmostSubform[0].Page1[0].c1_1[0]",
        "spouseName": "topmostSubform[0].Page1[0].f1_04[0]",
        "spouseSSN": "topmostSubform[0].Page1[0].f1_11[0]",
        "usAddress": "topmostSubform[0].Page1[0].f1_14[0]",
        "usCity": "topmostSubform[0].Page1[0].f1_15[0]",
        "usState": "topmostSubform[0].Page1[0].f1_16[0]",
        "foreignAddress": "topmostSubform[0].Page1[0].f1_17[0]",
        "foreignCountry": "topmostSubform[0].Page1[0].f1_22[0]",
        "foreignProvinceState": "topmostSubform[0].Page1[0].f1_20[0]",
        "foreignPostalCode": "topmostSubform[0].Page1[0].f1_21[0]",
        "countryOfResidence": "topmostSubform[0].Page1[0].f1_24[0]",
        "filingStatus": {
            "single": "topmostSubform[0].Page1[0].c1_5[0]",
            "married_separate": "topmostSubform[0].Page1[0].c1_5[1]",
            "married_joint": "topmostSubform[0].Page1[0].c1_5[2]",
            "qualifying_surviving": "topmostSubform[0].Page1[0].c1_5[3]",
            "estate_trust": "topmostSubform[0].Page1[0].c1_5[4]",
        },
        "wagesUS": "topmostSubform[0].Page1[0].f1_42[0]",
        "taxableInterest": "topmostSubform[0].Page1[0].f1_44[0]",
        "ordinaryDividends": "topmostSubform[0].Page1[0].f1_46[0]",
        "businessIncome": "topmostSubform[0].Page1[0].f1_48[0]",
        "capitalGain": "topmostSubform[0].Page1[0].f1_50[0]",
        "otherIncome": "topmostSubform[0].Page1[0].f1_52[0]",
        "totalIncome": "topmostSubform[0].Page1[0].Line1k_ReadOrder[0].f1_53[0]",
        "adjustedGrossIncome": "topmostSubform[0].Page1[0].f1_56[0]",
        "totalDeductions": "topmostSubform[0].Page1[0].f1_60[0]",
        "taxableIncome": "topmostSubform[0].Page1[0].f1_65[0]",
        "totalTax": "topmostSubform[0].Page2[0].f2_07[0]",
        "taxWithheld": "topmostSubform[0].Page2[0].f2_09[0]",
        "totalPayments": "topmostSubform[0].Page2[0].f2_34[0]",
        "overpaid": "topmostSubform[0].Page2[0].f2_35[0]",
        "amountOwed": "topmostSubform[0].Page2[0].f2_42[0]",
    },
    "w-8ben": {
        "beneficialOwnerName": "topmostSubform[0].Page1[0].f_1[0]",
        "countryOfCitizenship": "topmostSubform[0].Page1[0].f_2[0]",
        "permanentAddress": "topmostSubform[0].Page1[0].f_3[0]",
        "permanentCity": "topmostSubform[0].Page1[0].f_4[0]",
        "permanentCountry": "topmostSubform[0].Page1[0].f_5[0]",
        "mailingAddress": "topmostSubform[0].Page1[0].f_6[0]",
        "mailingCity": "topmostSubform[0].Page1[0].f_7[0]",
        "mailingCountry": "topmostSubform[0].Page1[0].f_8[0]",
        "ssnOrItin": "topmostSubform[0].Page1[0].f_9[0]",
        "foreignTaxId": "topmostSubform[0].Page1[0].f_10[0]",
        "ftinNotRequired": "topmostSubform[0].Page1[0].c1_01[0]",
        "referenceNumber": "topmostSubform[0].Page1[0].f_11[0]",
        "dateOfBirth": "topmostSubform[0].Page1[0].f_13[0]",
        "treatyCountry": "topmostSubform[0].Page1[0].f_14[0]",
        "treatyArticle": "topmostSubform[0].Page1[0].f_15[0]",
        "treatyRate": "topmostSubform[0].Page1[0].f_16[0]",
        "incomeType": "topmostSubform[0].Page1[0].f_17[0]",
        "treatyExplanation": "topmostSubform[0].Page1[0].f_18[0]",
        "capacitySigner": "topmostSubform[0].Page1[0].f_20[0]",
        "signatureDate": "topmostSubform[0].Page1[0].Date[0]",
        "printedName": "topmostSubform[0].Page1[0].f_21[0]",
    },
    "w-8ben-e": {
        "entityName": "topmostSubform[0].Page1[0].f1_1[0]",
        "countryOfIncorporation": "topmostSubform[0].Page1[0].f1_2[0]",
        "disregardedEntityName": "topmostSubform[0].Page1[0].f1_3[0]",
        "entityType": {
            "corporation": "topmostSubform[0].Page1[0].c1_1[0]",
            "disregarded_entity": "topmostSubform[0].Page1[0].c1_1[1]",
            "partnership": "topmostSubform[0].Page1[0].c1_1[2]",
            "simple_trust": "topmostSubform[0].Page1[0].c1_1[3]",
            "grantor_trust": "topmostSubform[0].Page1[0].c1_1[4]",
            "complex_trust": "topmostSubform[0].Page1[0].c1_1[5]",
            "estate": "topmostSubform[0].Page1[0].c1_1[6]",
            "government": "topmostSubform[0].Page1[0].c1_1[7]",
            "central_bank": "topmostSubform[0].Page1[0].c1_1[8]",
            "tax_exempt_org": "topmostSubform[0].Page1[0].c1_1[9]",
            "private_foundation": "topmostSubform[0].Page1[0].c1_1[10]",
            "international_org": "topmostSubform[0].Page1[0].c1_1[11]",
        },
        "fatcaStatus": {
            "active_nffe": "topmostSubform[0].Page1[0].Col2[0].c1_3[12]",
            "passive_nffe": "topmostSubform[0].Page1[0].Col2[0].c1_3[13]",
            "participating_ffi": "topmostSubform[0].Page1[0].Col1[0].c1_3[0]",
            "reporting_model1_ffi": "topmostSubform[0].Page1[0].Col1[0].c1_3[1]",
            "reporting_model2_ffi": "topmostSubform[0].Page1[0].Col1[0].c1_3[2]",
            "registered_deemed_compliant": "topmostSubform[0].Page1[0].Col1[0].c1_3[4]",
            "nonparticipating_ffi": "topmostSubform[0].Page1[0].Col1[0].c1_3[3]",
            "exempt_beneficial_owner": "topmostSubform[0].Page1[0].Col1[0].c1_3[5]",
            "nonprofit": "topmostSubform[0].Page1[0].Col1[0].c1_3[8]",
            "territory_fi": "topmostSubform[0].Page1[0].Col1[0].c1_3[6]",
            "excepted_nffe": "topmostSubform[0].Page1[0].Col2[0].c1_3[14]",
            "direct_reporting_nffe": "topmostSubform[0].Page1[0].Col2[0].c1_3[16]",
            "sponsored_direct_reporting_nffe": "topmostSubform[0].Page1[0].Col2[0].c1_3[17]",
        },
        "permanentAddress": "topmostSubform[0].Page1[0].f1_4[0]",
        "permanentCity": "topmostSubform[0].Page1[0].f1_5[0]",
        "permanentCountry": "topmostSubform[0].Page1[0].f1_6[0]",
        "mailingAddress": "topmostSubform[0].Page1[0].f1_7[0]",
        "ein": "topmostSubform[0].Page1[0].f1_8[0]",
        "foreignTaxId": "topmostSubform[0].Page1[0].f1_9[0]",
        "giin": "topmostSubform[0].Page2[0].f2_1[0]",
        "referenceNumber": "topmostSubform[0].Page2[0].f2_4[0]",
        "treatyCountry": "topmostSubform[0].Page2[0].f2_5[0]",
        "treatyArticle": "topmostSubform[0].Page2[0].f2_6[0]",
        "treatyRate": "topmostSubform[0].Page2[0].f2_7[0]",
        "incomeType": "topmostSubform[0].Page2[0].f2_8[0]",
    },
    "form-7004": {
        "entityName": "topmostSubform[0].Page1[0].f1_1[0]",
        "ein": "topmostSubform[0].Page1[0].f1_2[0]",
        "streetAddress": "topmostSubform[0].Page1[0].f1_3[0]",
        "foreignAddress": "topmostSubform[0].Page1[0].f1_4[0]",
        "city": "topmostSubform[0].Page1[0].f1_5[0]",
        "state": "topmostSubform[0].Page1[0].f1_6[0]",
        "zipCode": "topmostSubform[0].Page1[0].f1_7[0]",
        "isForeignCorp": "topmostSubform[0].Page1[0].c1_1[0]",
        "isConsolidated": "topmostSubform[0].Page1[0].c1_2[0]",
        "isShortTaxYear": "topmostSubform[0].Page1[0].c1_3[0]",
        "formCode": {
            "04": "topmostSubform[0].Page1[0].c1_4[0]",
            "05": "topmostSubform[0].Page1[0].c1_4[1]",
            "06": "topmostSubform[0].Page1[0].c1_4[2]",
            "08": "topmostSubform[0].Page1[0].c1_4[3]",
            "09": "topmostSubform[0].Page1[0].c1_4[4]",
            "12": "topmostSubform[0].Page1[0].f1_8[0]",
            "25": "topmostSubform[0].Page1[0].f1_9[0]",
            "27": "topmostSubform[0].Page1[0].f1_10[0]",
            "31": "topmostSubform[0].Page1[0].f1_15[0]",
            "34": "topmostSubform[0].Page1[0].f1_14[0]",
        },
        "taxYearBegin": "topmostSubform[0].Page1[0].f1_11[0]",
        "taxYearEnd": "topmostSubform[0].Page1[0].f1_13[0]",
        "shortTaxYearReason": "topmostSubform[0].Page1[0].f1_12[0]",
        "tentativeTotalTax": "topmostSubform[0].Page1[0].f1_16[0]",
        "totalPayments": "topmostSubform[0].Page1[0].f1_17[0]",
        "balanceDue": "topmostSubform[0].Page1[0].f1_18[0]",
    },
    "form-4868": {
        "firstName": "topmostSubform[0].Page1[0].VoucherHeader[0].f1_1[0]",
        "lastName": "topmostSubform[0].Page1[0].VoucherHeader[0].f1_2[0]",
        "ssn": "topmostSubform[0].Page1[0].VoucherHeader[0].f1_3[0]",
        "streetAddress": "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_4[0]",
        "foreignAddress": "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_5[0]",
        "city": "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_6[0]",
        "state": "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_7[0]",
        "zipCode": "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_8[0]",
        "spouseFirstName": "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_9[0]",
        "spouseLastName": "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_10[0]",
        "estimatedTaxLiability": "topmostSubform[0].Page1[0].f1_11[0]",
        "totalPayments": "topmostSubform[0].Page1[0].f1_12[0]",
        "balanceDue": "topmostSubform[0].Page1[0].f1_13[0]",
        "amountPaying": "topmostSubform[0].Page1[0].f1_14[0]",
        "outOfCountry": "topmostSubform[0].Page1[0].c1_1[0]",
        "filing1040NR": "topmostSubform[0].Page1[0].c1_2[0]",
    },
}


def _build_widget_index(doc: fitz.Document) -> dict[str, tuple[int, int]]:
    """Build a lookup: field_name → (page_index, widget_index)."""
    index: dict[str, tuple[int, int]] = {}
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        for widget_idx, widget in enumerate(page.widgets()):
            if widget.field_name:
                index[widget.field_name] = (page_idx, widget_idx)
    return index


def fill_pdf(pdf_path: str, form_id: str, values: dict[str, str]) -> bytes:
    """
    Open the IRS PDF, fill form fields using PyMuPDF, return filled PDF bytes.
    PyMuPDF handles XFA forms natively without corrupting them.
    """
    mapping = FIELD_MAPPINGS.get(form_id, {})
    if not mapping:
        raise ValueError(f"No field mapping for form: {form_id}")

    doc = fitz.open(pdf_path)

    # Build widget index for fast lookup
    widget_index = _build_widget_index(doc)

    # Pre-compute combined fields
    combined_values = dict(values)
    if form_id == "ss-4" and values.get("city"):
        combined_values["_cityStateZip"] = ", ".join(
            filter(None, [values.get("city"), values.get("state"), values.get("zipCode")])
        )
    if form_id == "form-8832" and values.get("city"):
        combined_values["_cityStateZipCountry"] = ", ".join(
            filter(None, [
                values.get("city"), values.get("state"),
                values.get("zipCode"), values.get("country"),
            ])
        )
    if form_id == "form-5472" and values.get("reportingCorpCity"):
        combined_values["_reportingCorpCityStateZip"] = ", ".join(
            filter(None, [
                values.get("reportingCorpCity"),
                values.get("reportingCorpState"),
                values.get("reportingCorpZip"),
            ])
        )

    for field_name, pdf_field in mapping.items():
        if pdf_field is None:
            continue

        value = combined_values.get(field_name, "")
        if not value:
            continue

        if isinstance(pdf_field, dict):
            # Checkbox map: value selects which checkbox to check
            checkbox_name = pdf_field.get(value)
            if checkbox_name and checkbox_name in widget_index:
                page_idx, _ = widget_index[checkbox_name]
                page = doc[page_idx]
                for widget in page.widgets():
                    if widget.field_name == checkbox_name:
                        widget.field_value = True
                        widget.update()
                        break
        elif isinstance(pdf_field, str):
            if pdf_field in widget_index:
                page_idx, _ = widget_index[pdf_field]
                page = doc[page_idx]
                for widget in page.widgets():
                    if widget.field_name == pdf_field:
                        if widget.field_type_string == "CheckBox":
                            # Boolean checkbox
                            if value in ("true", "1", "yes", "True"):
                                widget.field_value = True
                                widget.update()
                        else:
                            # Text field
                            widget.field_value = value
                            widget.update()
                        break

    # Save to bytes
    output = BytesIO()
    doc.save(output)
    doc.close()
    result = output.getvalue()
    output.close()
    return result


# ─── API Routes ──────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "engine": "PyMuPDF/fitz"}


@app.get("/api/forms")
def list_forms():
    """List available forms and their PDF file availability."""
    return {
        form_id: {
            "pdf_file": pdf_file,
            "available": (PDF_DIR / pdf_file).exists(),
        }
        for form_id, pdf_file in FORM_PDF_FILES.items()
    }


@app.post("/api/fill-pdf")
def fill_pdf_endpoint(req: FillRequest):
    """Fill a PDF form and return the filled PDF."""
    if req.form_id not in FORM_PDF_FILES:
        raise HTTPException(404, f"Unknown form: {req.form_id}")

    if req.form_id == "fincen-boi":
        raise HTTPException(
            400,
            "FinCEN BOI must be filed online at https://boiefiling.fincen.gov"
        )

    pdf_file = FORM_PDF_FILES[req.form_id]
    pdf_path = PDF_DIR / pdf_file

    if not pdf_path.exists():
        raise HTTPException(404, f"PDF template not found: {pdf_file}")

    try:
        filled_bytes = fill_pdf(str(pdf_path), req.form_id, req.values)
    except Exception as e:
        raise HTTPException(500, f"PDF filling failed: {str(e)}")

    safe_name = req.form_id.replace("-", "_")
    return StreamingResponse(
        BytesIO(filled_bytes),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="{safe_name}_filled.pdf"'
        },
    )
