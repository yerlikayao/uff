/**
 * Mapping from our app field names → IRS AcroForm field names.
 *
 * Each entry can be:
 *   - string: a text field name to set
 *   - { checkbox: string, index: number }: a specific checkbox widget to check
 *   - { checkboxMap: Record<string, string> }: maps select values to checkbox field names
 *   - null: no corresponding PDF field (data shown in app but can't be auto-filled)
 */

export type FieldMapping =
  | string
  | { checkbox: string; index?: number }
  | { checkboxMap: Record<string, string> }
  | { combined: string; fields: string[] }
  | null;

export type FormFieldMapping = Record<string, FieldMapping>;

// ════════════════════════════════════════════════════════════════
// SS-4 — Application for Employer Identification Number
// ════════════════════════════════════════════════════════════════
export const ss4Mapping: FormFieldMapping = {
  legalName:               "topmostSubform[0].Page1[0].f1_2[0]",
  tradeName:               "topmostSubform[0].Page1[0].f1_3[0]",
  executorName:            "topmostSubform[0].Page1[0].f1_4[0]",
  streetAddress:           "topmostSubform[0].Page1[0].f1_7[0]",
  city:                    null, // combined with state/zip in cityStateZip
  state:                   null,
  zipCode:                 null,
  cityStateZip:            "topmostSubform[0].Page1[0].f1_8[0]",
  county:                  "topmostSubform[0].Page1[0].f1_9[0]",
  responsiblePartyName:    "topmostSubform[0].Page1[0].f1_10[0]",
  responsiblePartySSN:     "topmostSubform[0].Page1[0].f1_11[0]",
  entityType: {
    checkboxMap: {
      sole_proprietor:     "topmostSubform[0].Page1[0].c1_3[0]",
      partnership:         "topmostSubform[0].Page1[0].c1_3[2]",
      corporation:         "topmostSubform[0].Page1[0].c1_3[4]",
      personal_service_corp: "topmostSubform[0].Page1[0].c1_3[6]",
      church:              "topmostSubform[0].Page1[0].c1_3[9]",
      nonprofit:           "topmostSubform[0].Page1[0].c1_3[12]",
      other:               "topmostSubform[0].Page1[0].c1_3[15]",
    },
  },
  reasonApplying: {
    checkboxMap: {
      started_new_business: "topmostSubform[0].Page1[0].c1_4[0]",
      hired_employees:      "topmostSubform[0].Page1[0].c1_4[3]",
      banking_purpose:      "topmostSubform[0].Page1[0].c1_4[8]",
      changed_org_type:     "topmostSubform[0].Page1[0].c1_4[1]",
      purchased_business:   "topmostSubform[0].Page1[0].c1_4[2]",
      other:                "topmostSubform[0].Page1[0].c1_4[7]",
    },
  },
  dateBusinessStarted:     "topmostSubform[0].Page1[0].f1_31[0]",
  closingMonthFiscalYear:  "topmostSubform[0].Page1[0].f1_32[0]",
  highestNumEmployees:     "topmostSubform[0].Page1[0].f1_35[0]",
  principalActivity:       null, // checkbox-based on actual form, simplified to text
  principalProduct:        "topmostSubform[0].Page1[0].f1_38[0]",
  applicantPhone:          "topmostSubform[0].Page1[0].f1_45[0]",
  applicantFax:            "topmostSubform[0].Page1[0].f1_46[0]",
};

// ════════════════════════════════════════════════════════════════
// Form 8832 — Entity Classification Election
// ════════════════════════════════════════════════════════════════
export const f8832Mapping: FormFieldMapping = {
  entityName:              "topmostSubform[0].Page1[0].p1-t1[0]",
  ein:                     "topmostSubform[0].Page1[0].p1-t2[0]",
  streetAddress:           "topmostSubform[0].Page1[0].p1-t4[0]",
  city:                    null,
  state:                   null,
  zipCode:                 null,
  cityStateZipCountry:     "topmostSubform[0].Page1[0].p1-t5[0]",
  country:                 null, // combined above
  electionType: {
    checkboxMap: {
      initial: "topmostSubform[0].Page1[0].c1_02_0_[0]",
      change:  "topmostSubform[0].Page1[0].c1_02_0_[1]",
    },
  },
  classificationElected: {
    checkboxMap: {
      corporation:         "topmostSubform[0].Page2[0].c2_01_0_[0]",
      partnership:         "topmostSubform[0].Page2[0].c2_01_0_[1]",
      disregarded:         "topmostSubform[0].Page2[0].c2_01_0_[2]",
      foreign_corp:        "topmostSubform[0].Page2[0].c2_01_0_[3]",
      foreign_partnership: "topmostSubform[0].Page2[0].c2_01_0_[4]",
      foreign_disregarded: "topmostSubform[0].Page2[0].c2_01_0_[5]",
    },
  },
  electionEffectiveDate:   "topmostSubform[0].Page2[0].p2-t2[0]",
  authorizedPersonName:    "topmostSubform[0].Page2[0].p2-t5[0]",
  authorizedPersonTitle:   null, // combined in p2-t5
  signatureDate:           "topmostSubform[0].Page2[0].Pg2Table[0].BodyRow1[0].p2-t9[0]",
};

// ════════════════════════════════════════════════════════════════
// Form 1120 — U.S. Corporation Income Tax Return
// ════════════════════════════════════════════════════════════════
export const f1120Mapping: FormFieldMapping = {
  corporationName:         "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_4[0]",
  ein:                     "topmostSubform[0].Page1[0].f1_11[0]",
  dateIncorporated:        "topmostSubform[0].Page1[0].f1_12[0]",
  streetAddress:           "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_5[0]",
  city:                    "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_7[0]",
  state:                   "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_8[0]",
  zipCode:                 "topmostSubform[0].Page1[0].NameFieldsReadOrder[0].f1_10[0]",
  totalAssets:             "topmostSubform[0].Page1[0].f1_13[0]",
  grossReceipts:           "topmostSubform[0].Page1[0].f1_14[0]",
  costOfGoodsSold:         "topmostSubform[0].Page1[0].f1_17[0]",
  grossProfit:             "topmostSubform[0].Page1[0].f1_18[0]",
  totalIncome:             "topmostSubform[0].Page1[0].f1_26[0]",
  totalDeductions:         "topmostSubform[0].Page1[0].f1_42[0]",
  taxableIncome:           "topmostSubform[0].Page1[0].f1_47[0]",
  totalTax:                "topmostSubform[0].Page1[0].f1_48[0]",
  taxYear:                 "topmostSubform[0].Page1[0].PgHeader[0].f1_1[0]",
  taxYearEnd:              "topmostSubform[0].Page1[0].PgHeader[0].f1_2[0]",
  officerName:             null, // wet signature area
  officerTitle:            null,
  signatureDate:           "topmostSubform[0].Page1[0].SignHere-ReadOrder[0].f1_58[0]",
};

// ════════════════════════════════════════════════════════════════
// Form 5472 — Information Return of 25% Foreign-Owned U.S. Corp
// ════════════════════════════════════════════════════════════════
export const f5472Mapping: FormFieldMapping = {
  reportingCorpName:       "topmostSubform[0].Page1[0].Line1a[0].f1_5[0]",
  reportingCorpEIN:        "topmostSubform[0].Page1[0].f1_8[0]",
  reportingCorpAddress:    "topmostSubform[0].Page1[0].Line1a[0].f1_6[0]",
  reportingCorpCity:       "topmostSubform[0].Page1[0].Line1a[0].f1_7[0]", // combined city/state/zip
  reportingCorpState:      null, // combined in f1_7
  reportingCorpZip:        null, // combined in f1_7
  reportingCorpCountryIncorp: "topmostSubform[0].Page1[0].f1_16[0]",
  totalAssets:             "topmostSubform[0].Page1[0].f1_9[0]",
  foreignOwnerName:        "topmostSubform[0].Page1[0].f1_20[0]",
  foreignOwnerAddress:     null, // combined with name in f1_20
  foreignOwnerCountry:     "topmostSubform[0].Page1[0].f1_25[0]",
  foreignOwnerIdNumber:    "topmostSubform[0].Page1[0].f1_21[0]",
  foreignOwnerPercentOwned: null, // no AcroForm field
  capitalContributions:    null, // Part V uses attached statement
  loansFromForeignOwner:   "topmostSubform[0].Page2[0].f2_19[0]",
  loansToForeignOwner:     "topmostSubform[0].Page2[0].f2_35[0]",
  interestPaid:            "topmostSubform[0].Page2[0].f2_36[0]",
  interestReceived:        "topmostSubform[0].Page2[0].f2_20[0]",
  rentsPaid:               "topmostSubform[0].Page2[0].f2_29[0]",
  rentsReceived:           "topmostSubform[0].Page2[0].f2_13[0]",
  royaltiesPaid:           "topmostSubform[0].Page2[0].f2_30[0]",
  royaltiesReceived:       "topmostSubform[0].Page2[0].f2_14[0]",
  servicesPaid:            "topmostSubform[0].Page2[0].f2_32[0]",
  servicesReceived:        "topmostSubform[0].Page2[0].f2_16[0]",
  otherAmountsPaid:        "topmostSubform[0].Page2[0].f2_39[0]",
  otherAmountsReceived:    "topmostSubform[0].Page2[0].f2_23[0]",
  taxYear:                 "topmostSubform[0].Page1[0].Pg1Header[0].f1_1[0]",
  taxYearEnd:              "topmostSubform[0].Page1[0].Pg1Header[0].f1_3[0]",
};

// ════════════════════════════════════════════════════════════════
// Form 1065 — U.S. Return of Partnership Income
// ════════════════════════════════════════════════════════════════
export const f1065Mapping: FormFieldMapping = {
  partnershipName:         "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_04[0]",
  ein:                     "topmostSubform[0].Page1[0].f1_14[0]",
  dateBusinessStarted:     "topmostSubform[0].Page1[0].f1_15[0]",
  streetAddress:           "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_05[0]",
  city:                    "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_07[0]",
  state:                   "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_08[0]",
  zipCode:                 "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_10[0]",
  principalBusinessActivity: "topmostSubform[0].Page1[0].LinesA-C[0].f1_11[0]",
  principalProduct:        "topmostSubform[0].Page1[0].LinesA-C[0].f1_12[0]",
  businessCode:            "topmostSubform[0].Page1[0].LinesA-C[0].f1_13[0]",
  accountingMethod: {
    checkboxMap: {
      cash:    "topmostSubform[0].Page1[0].c1_6[0]",
      accrual: "topmostSubform[0].Page1[0].c1_6[1]",
      other:   "topmostSubform[0].Page1[0].c1_6[2]",
    },
  },
  numberOfPartners:        "topmostSubform[0].Page1[0].f1_18[0]",
  grossReceipts:           "topmostSubform[0].Page1[0].f1_19[0]",
  costOfGoodsSold:         "topmostSubform[0].Page1[0].f1_22[0]",
  ordinaryIncome:          "topmostSubform[0].Page1[0].f1_24[0]",
  totalIncome:             "topmostSubform[0].Page1[0].f1_28[0]",
  salariesWages:           "topmostSubform[0].Page1[0].f1_29[0]",
  guaranteedPayments:      "topmostSubform[0].Page1[0].f1_30[0]",
  rentExpense:             "topmostSubform[0].Page1[0].f1_33[0]",
  totalDeductions:         "topmostSubform[0].Page1[0].f1_45[0]",
  taxYear:                 "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_01[0]",
  taxYearEnd:              "topmostSubform[0].Page1[0].HeaderAddress_ReadOrder[0].CalendarName_ReadOrder[0].f1_02[0]",
  generalPartnerName:      "topmostSubform[0].Page1[0].f1_59[0]",
  signatureDate:           "topmostSubform[0].Page1[0].f1_60[0]",
};

// ════════════════════════════════════════════════════════════════
// Schedule K-1 (Form 1065)
// ════════════════════════════════════════════════════════════════
export const scheduleK1Mapping: FormFieldMapping = {
  partnershipName:         "topmostSubform[0].Page1[0].LeftCol[0].f1_7[0]",
  partnershipEIN:          "topmostSubform[0].Page1[0].LeftCol[0].f1_6[0]",
  partnershipAddress:      null, // combined in f1_7
  partnerName:             "topmostSubform[0].Page1[0].LeftCol[0].f1_10[0]",
  partnerSSN:              "topmostSubform[0].Page1[0].LeftCol[0].f1_9[0]",
  partnerAddress:          null, // combined in f1_10
  partnerType: {
    checkboxMap: {
      general:     "topmostSubform[0].Page1[0].LeftCol[0].c1_4[0]",
      limited:     "topmostSubform[0].Page1[0].LeftCol[0].c1_4[1]",
      llc_member:  "topmostSubform[0].Page1[0].LeftCol[0].c1_4[0]", // same as general
    },
  },
  domesticOrForeign: {
    checkboxMap: {
      domestic: "topmostSubform[0].Page1[0].LeftCol[0].c1_5[0]",
      foreign:  "topmostSubform[0].Page1[0].LeftCol[0].c1_5[1]",
    },
  },
  profitShareBeginning:    "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Profit[0].f1_14[0]",
  profitShareEnd:          "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Profit[0].f1_15[0]",
  lossShareBeginning:      "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Loss[0].f1_16[0]",
  lossShareEnd:            "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Loss[0].f1_17[0]",
  capitalShareBeginning:   "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Capital[0].f1_18[0]",
  capitalShareEnd:         "topmostSubform[0].Page1[0].LeftCol[0].LineJTable[0].Capital[0].f1_19[0]",
  ordinaryIncome:          "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_34[0]",
  netRentalIncome:         "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_35[0]",
  otherNetRentalIncome:    "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_36[0]",
  guaranteedPayments:      "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_39[0]",
  interestIncome:          "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_40[0]",
  dividends:               "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_41[0]",
  netShortTermCapGain:     "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_45[0]",
  netLongTermCapGain:      "topmostSubform[0].Page1[0].RightCol[0].RightCol1[0].f1_46[0]",
  taxYear:                 "topmostSubform[0].Page1[0].Pg1Header[0].ForCalendarYear[0].f1_1[0]",
  taxYearEnd:              "topmostSubform[0].Page1[0].Pg1Header[0].ForCalendarYear[0].f1_3[0]",
};

// ════════════════════════════════════════════════════════════════
// FinCEN BOI — online-only, no fillable PDF
// ════════════════════════════════════════════════════════════════
export const fincenBoiMapping: FormFieldMapping = {};

// ════════════════════════════════════════════════════════════════
// Form 1040-NR — Nonresident Alien Income Tax Return
// ════════════════════════════════════════════════════════════════
export const f1040nrMapping: FormFieldMapping = {
  firstName:               "topmostSubform[0].Page1[0].f1_01[0]",
  lastName:                "topmostSubform[0].Page1[0].f1_02[0]",
  ssn:                     "topmostSubform[0].Page1[0].f1_03[0]",
  foreignCountry:          null, // entered in address fields
  streetAddress:           "topmostSubform[0].Page1[0].f1_14[0]",
  foreignAddress:          "topmostSubform[0].Page1[0].f1_17[0]",
  foreignCity:             "topmostSubform[0].Page1[0].f1_19[0]",
  foreignProvinceState:    "topmostSubform[0].Page1[0].f1_20[0]",
  foreignPostalCode:       "topmostSubform[0].Page1[0].f1_21[0]",
  foreignCountryAddress:   "topmostSubform[0].Page1[0].f1_22[0]",
  filingStatus: {
    checkboxMap: {
      single:           "topmostSubform[0].Page1[0].c1_5[0]",
      married_separate:  "topmostSubform[0].Page1[0].c1_5[1]",
      married_resident:  "topmostSubform[0].Page1[0].c1_5[2]",
      estate_trust:      "topmostSubform[0].Page1[0].c1_5[3]",
    },
  },
  wagesUS:                 "topmostSubform[0].Page1[0].f1_42[0]",
  taxableInterest:         "topmostSubform[0].Page1[0].f1_44[0]",
  ordinaryDividends:       "topmostSubform[0].Page1[0].f1_46[0]",
  businessIncome:          "topmostSubform[0].Page1[0].f1_48[0]",
  capitalGain:             "topmostSubform[0].Page1[0].f1_50[0]",
  otherIncome:             "topmostSubform[0].Page1[0].f1_52[0]",
  totalIncome:             "topmostSubform[0].Page1[0].f1_53[0]",
  totalDeductions:         "topmostSubform[0].Page1[0].f1_59[0]",
  taxableIncome:           "topmostSubform[0].Page1[0].f1_62[0]",
  totalTax:                "topmostSubform[0].Page2[0].f2_07[0]",
  taxWithheld:             "topmostSubform[0].Page2[0].f2_08[0]",
  taxYear:                 null, // printed on form header, not a fillable field
};

// ════════════════════════════════════════════════════════════════
// W-8BEN — Certificate of Foreign Status (Individuals)
// ════════════════════════════════════════════════════════════════
export const w8benMapping: FormFieldMapping = {
  beneficialOwnerName:     "topmostSubform[0].Page1[0].f_1[0]",
  countryOfCitizenship:    "topmostSubform[0].Page1[0].f_2[0]",
  permanentAddress:        "topmostSubform[0].Page1[0].f_3[0]",
  permanentCity:           "topmostSubform[0].Page1[0].f_4[0]",
  permanentCountry:        "topmostSubform[0].Page1[0].f_5[0]",
  mailingAddress:          "topmostSubform[0].Page1[0].f_6[0]",
  mailingCity:             "topmostSubform[0].Page1[0].f_7[0]",
  mailingCountry:          "topmostSubform[0].Page1[0].f_8[0]",
  ssnOrItin:               "topmostSubform[0].Page1[0].f_9[0]",
  foreignTaxId:            "topmostSubform[0].Page1[0].f_10[0]",
  dateOfBirth:             "topmostSubform[0].Page1[0].f_13[0]",
  referenceNumber:         "topmostSubform[0].Page1[0].f_11[0]",
  treatyCountry:           "topmostSubform[0].Page1[0].f_14[0]",
  treatyArticle:           "topmostSubform[0].Page1[0].f_15[0]",
  treatyRate:              "topmostSubform[0].Page1[0].f_16[0]",
  incomeType:              "topmostSubform[0].Page1[0].f_17[0]",
  treatyExplanation:       "topmostSubform[0].Page1[0].f_18[0]",
  signatureDate:           "topmostSubform[0].Page1[0].Date[0]",
  printedName:             "topmostSubform[0].Page1[0].f_21[0]",
};

// ════════════════════════════════════════════════════════════════
// W-8BEN-E — Certificate of Foreign Status (Entities)
// ════════════════════════════════════════════════════════════════
export const w8benEMapping: FormFieldMapping = {
  entityName:              "topmostSubform[0].Page1[0].f1_1[0]",
  countryOfIncorporation:  "topmostSubform[0].Page1[0].f1_2[0]",
  entityType: {
    checkboxMap: {
      corporation:         "topmostSubform[0].Page1[0].c1_1[0]",
      partnership:         "topmostSubform[0].Page1[0].c1_1[2]",
      disregarded_entity:  "topmostSubform[0].Page1[0].c1_1[1]",
      simple_trust:        "topmostSubform[0].Page1[0].c1_1[3]",
      grantor_trust:       "topmostSubform[0].Page1[0].c1_1[4]",
      complex_trust:       "topmostSubform[0].Page1[0].c1_1[5]",
      estate:              "topmostSubform[0].Page1[0].c1_1[6]",
      government:          "topmostSubform[0].Page1[0].c1_1[7]",
      central_bank:        "topmostSubform[0].Page1[0].c1_1[8]",
      tax_exempt_org:      "topmostSubform[0].Page1[0].c1_1[9]",
      private_foundation:  "topmostSubform[0].Page1[0].c1_1[10]",
      international_org:   "topmostSubform[0].Page1[0].c1_1[11]",
    },
  },
  permanentAddress:        "topmostSubform[0].Page1[0].f1_4[0]",
  permanentCity:           "topmostSubform[0].Page1[0].f1_5[0]",
  permanentCountry:        "topmostSubform[0].Page1[0].f1_6[0]",
  mailingAddress:          "topmostSubform[0].Page1[0].f1_7[0]",
  ein:                     "topmostSubform[0].Page1[0].f1_8[0]",
  foreignTaxId:            "topmostSubform[0].Page1[0].f1_9[0]",
  giin:                    "topmostSubform[0].Page2[0].f2_1[0]",
  referenceNumber:         "topmostSubform[0].Page1[0].f1_3[0]",
  fatcaStatus: {
    checkboxMap: {
      active_nffe:           "topmostSubform[0].Page1[0].Col2[0].c1_3[12]",
      passive_nffe:          "topmostSubform[0].Page1[0].Col2[0].c1_3[13]",
      participating_ffi:     "topmostSubform[0].Page1[0].Col1[0].c1_3[0]",
      nonparticipating_ffi:  "topmostSubform[0].Page1[0].Col1[0].c1_3[2]",
      exempt_beneficial_owner: "topmostSubform[0].Page1[0].Col1[0].c1_3[5]",
      nonprofit:             "topmostSubform[0].Page1[0].Col1[0].c1_3[8]",
      territory_fi:          "topmostSubform[0].Page1[0].Col1[0].c1_3[3]",
    },
  },
  treatyCountry:           "topmostSubform[0].Page2[0].f2_5[0]",
  treatyArticle:           "topmostSubform[0].Page2[0].f2_6[0]",
  treatyRate:              "topmostSubform[0].Page2[0].f2_7[0]",
  incomeType:              "topmostSubform[0].Page2[0].f2_8[0]",
  authorizedSignerName:    null, // signature area
  signerTitle:             null,
  signatureDate:           null,
};

// ════════════════════════════════════════════════════════════════
// Form 7004 — Business Extension
// ════════════════════════════════════════════════════════════════
export const f7004Mapping: FormFieldMapping = {
  entityName:              "topmostSubform[0].Page1[0].f1_1[0]",
  ein:                     "topmostSubform[0].Page1[0].f1_2[0]",
  streetAddress:           "topmostSubform[0].Page1[0].f1_3[0]",
  city:                    "topmostSubform[0].Page1[0].f1_5[0]",
  state:                   "topmostSubform[0].Page1[0].f1_6[0]",
  zipCode:                 "topmostSubform[0].Page1[0].f1_7[0]",
  formCode: {
    checkboxMap: {
      "04": "topmostSubform[0].Page1[0].c1_4[0]",  // Form 1065
      "05": "topmostSubform[0].Page1[0].c1_4[1]",  // Form 1041
      "09": "topmostSubform[0].Page1[0].c1_4[2]",  // Form 706-GS(D)
      "12": "topmostSubform[0].Page1[0].c1_4[3]",  // Form 1120
      "25": "topmostSubform[0].Page1[0].c1_4[4]",  // Form 1120-S
      "31": "topmostSubform[0].Page1[0].c1_1[0]",  // Form 8804
    },
  },
  taxYear:                 "topmostSubform[0].Page1[0].f1_11[0]",
  taxYearEnd:              "topmostSubform[0].Page1[0].f1_13[0]",
  tentativeTotalTax:       "topmostSubform[0].Page1[0].f1_16[0]",
  totalPayments:           "topmostSubform[0].Page1[0].f1_17[0]",
  balanceDue:              "topmostSubform[0].Page1[0].f1_18[0]",
};

// ════════════════════════════════════════════════════════════════
// Form 4868 — Individual Extension
// ════════════════════════════════════════════════════════════════
export const f4868Mapping: FormFieldMapping = {
  firstName:               "topmostSubform[0].Page1[0].VoucherHeader[0].f1_1[0]",
  lastName:                "topmostSubform[0].Page1[0].VoucherHeader[0].f1_2[0]",
  ssn:                     "topmostSubform[0].Page1[0].VoucherHeader[0].f1_3[0]",
  spouseFirstName:         null,
  spouseLastName:          null,
  spouseSSN:               null,
  streetAddress:           "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_4[0]",
  city:                    "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_6[0]",
  state:                   "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_7[0]",
  zipCode:                 "topmostSubform[0].Page1[0].PartI_ReadOrder[0].f1_8[0]",
  outOfCountry:            { checkbox: "topmostSubform[0].Page1[0].c1_1[0]" },
  estimatedTaxLiability:   "topmostSubform[0].Page1[0].f1_11[0]",
  totalPayments:           "topmostSubform[0].Page1[0].f1_12[0]",
  balanceDue:              "topmostSubform[0].Page1[0].f1_13[0]",
  amountPaying:            "topmostSubform[0].Page1[0].f1_14[0]",
};

// ════════════════════════════════════════════════════════════════
// Master lookup
// ════════════════════════════════════════════════════════════════
export const pdfMappings: Record<string, { mapping: FormFieldMapping; pdfFile: string }> = {
  "ss-4":         { mapping: ss4Mapping,         pdfFile: "fss4.pdf" },
  "form-8832":    { mapping: f8832Mapping,       pdfFile: "f8832.pdf" },
  "form-1120":    { mapping: f1120Mapping,       pdfFile: "f1120.pdf" },
  "form-5472":    { mapping: f5472Mapping,       pdfFile: "f5472.pdf" },
  "form-1065":    { mapping: f1065Mapping,       pdfFile: "f1065.pdf" },
  "schedule-k1":  { mapping: scheduleK1Mapping,  pdfFile: "f1065sk1.pdf" },
  "fincen-boi":   { mapping: fincenBoiMapping,   pdfFile: "" },
  "form-1040-nr": { mapping: f1040nrMapping,     pdfFile: "f1040nr.pdf" },
  "w-8ben":       { mapping: w8benMapping,        pdfFile: "fw8ben.pdf" },
  "w-8ben-e":     { mapping: w8benEMapping,       pdfFile: "fw8bene.pdf" },
  "form-7004":    { mapping: f7004Mapping,       pdfFile: "f7004.pdf" },
  "form-4868":    { mapping: f4868Mapping,       pdfFile: "f4868.pdf" },
};
