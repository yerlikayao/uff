export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "checkbox" | "textarea" | "ssn" | "ein" | "phone" | "email";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  helpText?: string;
  section: string;
  width?: "full" | "half";
}

export interface FormDefinition {
  id: string;
  name: string;
  fullName: string;
  description: string;
  category: "formation" | "foreign-llc" | "partnership" | "compliance" | "individual" | "extension";
  categoryLabel: string;
  fields: FormField[];
  pdfFileName: string;
}

export const formCategories = [
  { id: "formation", label: "Formation & Identity", icon: "building" },
  { id: "foreign-llc", label: "Foreign-Owned LLC", icon: "globe" },
  { id: "partnership", label: "Partnership / Multi-Member LLC", icon: "users" },
  { id: "compliance", label: "Compliance & Ownership", icon: "shield" },
  { id: "individual", label: "Individual & Withholding", icon: "user" },
  { id: "extension", label: "Extensions", icon: "clock" },
];

export const forms: FormDefinition[] = [
  // ══════════════════════════════════════════════════
  // SS-4 — Application for Employer Identification Number
  // ══════════════════════════════════════════════════
  {
    id: "ss-4",
    name: "SS-4",
    fullName: "Application for Employer Identification Number",
    description: "Apply for an EIN from the IRS. Required for all US businesses to open bank accounts, hire employees, and file taxes.",
    category: "formation",
    categoryLabel: "Formation & Identity",
    pdfFileName: "fss4.pdf",
    fields: [
      // ── Lines 1-3: Entity Information ──
      { name: "legalName", label: "Line 1 – Legal name of entity (or individual)", type: "text", required: true, section: "Entity Information", width: "full", helpText: "Enter the legal name exactly as it appears on your formation documents (Articles of Organization / Certificate of Formation)." },
      { name: "tradeName", label: "Line 2 – Trade name (DBA)", type: "text", section: "Entity Information", width: "full", helpText: "Enter the 'doing business as' name only if different from Line 1. Leave blank if same." },
      { name: "executorName", label: "Line 3 – Executor, administrator, trustee, 'care of' name", type: "text", section: "Entity Information", width: "full", helpText: "Only complete if the entity is an estate, trust, or you need a 'care of' name on the EIN letter." },

      // ── Lines 4a-4b: Mailing Address ──
      { name: "mailingAddress", label: "Line 4a – Mailing address (street or P.O. box)", type: "text", required: true, section: "Mailing Address", width: "full", helpText: "Where the IRS will mail your EIN confirmation letter. Can be a P.O. box or registered agent address." },
      { name: "mailingSuite", label: "Line 4a – Suite / Room / Apt number", type: "text", section: "Mailing Address", width: "half" },
      { name: "city", label: "City", type: "text", required: true, section: "Mailing Address", width: "half" },
      { name: "state", label: "State", type: "text", required: true, section: "Mailing Address", width: "half", placeholder: "e.g. WY, DE, FL" },
      { name: "zipCode", label: "ZIP Code", type: "text", required: true, section: "Mailing Address", width: "half" },

      // ── Lines 5a-5b: Physical Address ──
      { name: "physicalAddress", label: "Line 5a – Street address (if different from Line 4a)", type: "text", section: "Physical Address", width: "full", helpText: "Only fill this if your physical business location is different from your mailing address." },
      { name: "county", label: "Line 6 – County and state where principal business is located", type: "text", section: "Physical Address", width: "full", helpText: "e.g. 'Laramie, WY' or 'New Castle, DE'" },

      // ── Lines 7a-7b: Responsible Party ──
      { name: "responsiblePartyName", label: "Line 7a – Name of responsible party", type: "text", required: true, section: "Responsible Party", width: "full", helpText: "The individual who controls or manages the entity. For an LLC, this is usually the owner or managing member." },
      { name: "responsiblePartySSN", label: "Line 7b – SSN, ITIN, or EIN of responsible party", type: "text", required: true, section: "Responsible Party", width: "half", helpText: "Enter the responsible party's SSN, ITIN, or existing EIN. Foreign individuals without an SSN/ITIN should apply for an ITIN first." },

      // ── Line 8a-8b: LLC Information ──
      { name: "isLLC", label: "Line 8a – Is this entity an LLC?", type: "select", section: "LLC Information", width: "half", options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ], helpText: "Select 'Yes' if the entity was formed as a Limited Liability Company." },
      { name: "llcMembers", label: "Line 8a – Number of LLC members", type: "number", section: "LLC Information", width: "half", helpText: "Enter the number of members in the LLC. A single-member LLC enters '1'." },
      { name: "organizedInUS", label: "Line 8b – If LLC, was it organized in the United States?", type: "select", section: "LLC Information", width: "half", options: [
        { value: "yes", label: "Yes – organized in a US state" },
        { value: "no", label: "No – organized outside the US" },
      ] },

      // ── Line 9a: Type of Entity ──
      { name: "entityType", label: "Line 9a – Type of entity", type: "select", required: true, section: "Type of Entity", width: "full", options: [
        { value: "sole_proprietor", label: "Sole proprietor" },
        { value: "partnership", label: "Partnership" },
        { value: "corporation", label: "Corporation" },
        { value: "personal_service_corp", label: "Personal service corporation" },
        { value: "church", label: "Church or church-controlled organization" },
        { value: "nonprofit", label: "Other nonprofit organization" },
        { value: "other", label: "Other (specify below)" },
      ], helpText: "Select the entity type. Most LLCs select 'Corporation' if they elected to be taxed as a corporation via Form 8832, or 'Other' if taxed as a disregarded entity." },
      { name: "entityTypeOther", label: "Line 9a – If 'Other', specify type", type: "text", section: "Type of Entity", width: "full", helpText: "e.g. 'LLC - Disregarded entity' or 'LLC - taxed as partnership'" },
      { name: "corporationType", label: "Corporation type (if applicable)", type: "text", section: "Type of Entity", width: "half", helpText: "If you selected Corporation, specify: e.g. 'General', 'S Corp', 'Close'" },
      { name: "stateOrCountry", label: "Line 9b – State or foreign country where incorporated/organized", type: "text", section: "Type of Entity", width: "half", helpText: "e.g. 'Wyoming' or 'Delaware'" },

      // ── Line 10: Reason for Applying ──
      { name: "reasonApplying", label: "Line 10 – Reason for applying", type: "select", required: true, section: "Reason for Applying", width: "full", options: [
        { value: "started_new_business", label: "Started new business" },
        { value: "hired_employees", label: "Hired employees" },
        { value: "compliance", label: "Compliance with IRS withholding regulations" },
        { value: "changed_org_type", label: "Changed type of organization" },
        { value: "purchased_business", label: "Purchased going business" },
        { value: "created_trust", label: "Created a trust" },
        { value: "created_pension_plan", label: "Created a pension plan" },
        { value: "banking_purpose", label: "Banking purpose" },
        { value: "other", label: "Other (specify below)" },
      ], helpText: "For new LLCs, select 'Started new business'. For foreign-owned LLCs needing to file returns, select 'Compliance with IRS withholding regulations' or 'Banking purpose'." },
      { name: "reasonSpecify", label: "Line 10 – Specify reason (if applicable)", type: "text", section: "Reason for Applying", width: "full" },

      // ── Lines 11-18: Business Details ──
      { name: "dateBusinessStarted", label: "Line 11 – Date business started or acquired", type: "text", section: "Business Details", width: "half", helpText: "Enter as MM/DD/YYYY. This is the date the entity was formed or started operating.", placeholder: "MM/DD/YYYY" },
      { name: "closingMonthFiscalYear", label: "Line 12 – Closing month of accounting year", type: "select", section: "Business Details", width: "half", options: [
        { value: "January", label: "January" }, { value: "February", label: "February" },
        { value: "March", label: "March" }, { value: "April", label: "April" },
        { value: "May", label: "May" }, { value: "June", label: "June" },
        { value: "July", label: "July" }, { value: "August", label: "August" },
        { value: "September", label: "September" }, { value: "October", label: "October" },
        { value: "November", label: "November" }, { value: "December", label: "December" },
      ], helpText: "Most businesses use December (calendar year). If you have a fiscal year, select the last month." },
      { name: "highestNumEmployeesAgricultural", label: "Line 13 – Agricultural employees expected", type: "text", section: "Business Details", width: "half", helpText: "Enter 0 if not applicable." },
      { name: "highestNumEmployeesHousehold", label: "Line 14 – Household employees expected", type: "text", section: "Business Details", width: "half", helpText: "Enter 0 if not applicable." },
      { name: "highestNumEmployees", label: "Line 15 – Other employees expected in next 12 months", type: "text", section: "Business Details", width: "half", helpText: "Enter the expected number of employees (not including agricultural/household). Enter 0 if none." },
      { name: "firstDateWagesPaid", label: "First date wages or annuities were paid", type: "text", section: "Business Details", width: "half", placeholder: "MM/DD/YYYY", helpText: "Leave blank if you haven't paid wages yet." },
      { name: "principalActivity", label: "Line 16 – Principal activity of the business", type: "select", section: "Business Details", width: "full", options: [
        { value: "construction", label: "Construction" },
        { value: "real_estate", label: "Real estate" },
        { value: "rental_leasing", label: "Rental & leasing" },
        { value: "manufacturing", label: "Manufacturing" },
        { value: "transportation", label: "Transportation & warehousing" },
        { value: "finance_insurance", label: "Finance & insurance" },
        { value: "health_care", label: "Health care & social assistance" },
        { value: "food_service", label: "Accommodation & food service" },
        { value: "wholesale_agent", label: "Wholesale – agent/broker" },
        { value: "wholesale_other", label: "Wholesale – other" },
        { value: "retail", label: "Retail" },
        { value: "other", label: "Other (specify below)" },
      ], helpText: "Select the category that best describes your business activity." },
      { name: "principalActivityOther", label: "Specify principal activity (if 'Other')", type: "text", section: "Business Details", width: "full" },
      { name: "principalProduct", label: "Line 18 – Principal product or service", type: "text", section: "Business Details", width: "full", helpText: "Describe what you sell or the service you provide. e.g. 'Software development', 'Consulting', 'E-commerce'" },
      { name: "previousEIN", label: "Have you ever applied for or received an EIN before?", type: "select", section: "Business Details", width: "half", options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ] },

      // ── Third Party Designee ──
      { name: "thirdPartyDesigneeName", label: "Third party designee name", type: "text", section: "Third Party Designee", width: "full", helpText: "If you want the IRS to discuss this application with someone other than you. Leave blank if not applicable." },
      { name: "thirdPartyPhone", label: "Third party designee phone", type: "phone", section: "Third Party Designee", width: "half" },
      { name: "thirdPartyAddress", label: "Third party designee address", type: "text", section: "Third Party Designee", width: "full" },

      // ── Contact ──
      { name: "applicantName", label: "Applicant name and title", type: "text", section: "Applicant Contact", width: "full", helpText: "Name and title of the person signing this application. e.g. 'John Doe, Managing Member'" },
      { name: "applicantPhone", label: "Applicant telephone number", type: "phone", section: "Applicant Contact", width: "half" },
      { name: "applicantFax", label: "Fax number", type: "phone", section: "Applicant Contact", width: "half" },
    ],
  },

  // ══════════════════════════════════════════════════
  // Form 8832 — Entity Classification Election
  // ══════════════════════════════════════════════════
  {
    id: "form-8832",
    name: "Form 8832",
    fullName: "Entity Classification Election",
    description: "Elect how your entity is classified for federal tax purposes. Commonly used by foreign-owned LLCs to elect corporation or disregarded entity status.",
    category: "formation",
    categoryLabel: "Formation & Identity",
    pdfFileName: "f8832.pdf",
    fields: [
      // ── Part I: Election Information ──
      { name: "entityName", label: "Line 1 – Name of eligible entity making election", type: "text", required: true, section: "Part I – Election Information", width: "full", helpText: "Enter the legal name of the entity exactly as shown on its formation documents." },
      { name: "ein", label: "Line 2 – EIN", type: "ein", required: true, section: "Part I – Election Information", width: "half", helpText: "Employer Identification Number. If the entity doesn't have one yet, apply using Form SS-4 first." },
      { name: "streetAddress", label: "Line 3 – Address (street or P.O. box)", type: "text", required: true, section: "Part I – Election Information", width: "full" },
      { name: "city", label: "City", type: "text", required: true, section: "Part I – Election Information", width: "half" },
      { name: "state", label: "State", type: "text", section: "Part I – Election Information", width: "half" },
      { name: "zipCode", label: "ZIP Code", type: "text", section: "Part I – Election Information", width: "half" },
      { name: "country", label: "Country (if foreign address)", type: "text", section: "Part I – Election Information", width: "half" },

      { name: "lateElectionRelief", label: "Line 4 – Check if late election relief is being requested", type: "checkbox", section: "Part I – Election Information", width: "full", helpText: "Check this box only if you're filing this form after the due date and requesting relief under Rev. Proc. 2009-41." },
      { name: "electionType", label: "Line 5 – Type of election", type: "select", required: true, section: "Part I – Election Information", width: "full", options: [
        { value: "initial", label: "Initial classification by a newly-formed entity" },
        { value: "change", label: "Change in current classification" },
      ], helpText: "Select 'Initial' if this is the first time the entity is choosing its classification. Select 'Change' to change an existing classification." },
      { name: "electionNotDefault", label: "Line 6 – Does the entity's current classification match its default?", type: "select", section: "Part I – Election Information", width: "full", options: [
        { value: "yes", label: "Yes – current matches default" },
        { value: "no", label: "No – current does not match default" },
      ], helpText: "A domestic single-member entity defaults to 'disregarded'. A domestic multi-member entity defaults to 'partnership'." },
      { name: "wasEverIncorporated", label: "Line 7 – Was the entity ever incorporated?", type: "select", section: "Part I – Election Information", width: "half", options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ] },

      // ── Part I: Lines 8-9 Classification ──
      { name: "classificationElected", label: "Line 8 – Elected classification", type: "select", required: true, section: "Part I – Classification", width: "full", options: [
        { value: "corporation", label: "a. Domestic – association taxable as a corporation" },
        { value: "partnership", label: "b. Domestic – partnership" },
        { value: "disregarded", label: "c. Domestic – single owner, disregarded as separate entity" },
        { value: "foreign_corp", label: "d. Foreign – association taxable as a corporation" },
        { value: "foreign_partnership", label: "e. Foreign – partnership" },
        { value: "foreign_disregarded", label: "f. Foreign – single owner, disregarded as separate entity" },
      ], helpText: "For a foreign-owned single-member LLC: if you want the LLC to file its own corporate tax return, choose (a). If you want it to be a pass-through to its owner, choose (c) for domestic." },
      { name: "numberOfOwners", label: "Number of owners at time of election", type: "text", section: "Part I – Classification", width: "half" },
      { name: "electionEffectiveDate", label: "Line 9 – Election effective date", type: "text", required: true, section: "Part I – Classification", width: "half", placeholder: "MM/DD/YYYY", helpText: "The date the classification takes effect. Cannot be more than 75 days before or 12 months after the filing date." },

      // ── Part II: Late Election Relief ──
      { name: "lateElectionExplanation", label: "Line 10 – Explanation for late election", type: "textarea", section: "Part II – Late Election Relief", width: "full", helpText: "If requesting late election relief (Line 4), explain the reasonable cause for filing late." },

      // ── Consent & Signature ──
      { name: "authorizedPersonName", label: "Consent statement – Name of person authorized to sign", type: "text", required: true, section: "Consent & Signature", width: "full", helpText: "Name of the person who has authority to make the election on behalf of the entity (e.g., owner, officer, managing member)." },
      { name: "authorizedPersonTitle", label: "Title", type: "text", section: "Consent & Signature", width: "half" },
      { name: "signatureDate", label: "Date", type: "text", section: "Consent & Signature", width: "half", placeholder: "MM/DD/YYYY" },
    ],
  },

  // ══════════════════════════════════════════════════
  // Form 1120 — U.S. Corporation Income Tax Return
  // ══════════════════════════════════════════════════
  {
    id: "form-1120",
    name: "Form 1120",
    fullName: "U.S. Corporation Income Tax Return",
    description: "Annual corporate income tax return. For foreign-owned single-member LLCs electing to be taxed as corporations, this is often filed as a 'pro forma' return alongside Form 5472.",
    category: "foreign-llc",
    categoryLabel: "Foreign-Owned LLC",
    pdfFileName: "f1120.pdf",
    fields: [
      // ── Header / Tax Period ──
      { name: "taxYearBegin", label: "Tax year beginning", type: "text", required: true, section: "Tax Period", width: "half", placeholder: "MM/DD/YYYY", helpText: "Usually 01/01/YYYY for calendar year filers." },
      { name: "taxYearEnd", label: "Tax year ending", type: "text", required: true, section: "Tax Period", width: "half", placeholder: "MM/DD/YYYY", helpText: "Usually 12/31/YYYY for calendar year filers." },
      { name: "shortYearReason", label: "Short-year return reason (if applicable)", type: "text", section: "Tax Period", width: "half", helpText: "Leave blank for regular calendar year returns." },

      // ── Entity Information ──
      { name: "corporationName", label: "Name of corporation", type: "text", required: true, section: "Entity Information", width: "full" },
      { name: "streetAddress", label: "Street address", type: "text", required: true, section: "Entity Information", width: "full" },
      { name: "suiteRoom", label: "Suite / Room number", type: "text", section: "Entity Information", width: "half" },
      { name: "city", label: "City or town", type: "text", required: true, section: "Entity Information", width: "half" },
      { name: "state", label: "State", type: "text", required: true, section: "Entity Information", width: "half" },
      { name: "country", label: "Country", type: "text", section: "Entity Information", width: "half" },
      { name: "zipCode", label: "ZIP Code", type: "text", required: true, section: "Entity Information", width: "half" },

      // ── Identification ──
      { name: "ein", label: "Employer identification number (EIN)", type: "ein", required: true, section: "Identification", width: "half" },
      { name: "dateIncorporated", label: "Date incorporated", type: "text", section: "Identification", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "totalAssets", label: "Total assets (Schedule L, end of year)", type: "text", section: "Identification", width: "half", helpText: "Enter total assets at end of tax year. Enter 0 if none.", placeholder: "0" },

      // ── Check Boxes ──
      { name: "initialReturn", label: "Check if initial return", type: "checkbox", section: "Check Boxes", width: "half" },
      { name: "finalReturn", label: "Check if final return", type: "checkbox", section: "Check Boxes", width: "half" },
      { name: "nameChange", label: "Check if name change", type: "checkbox", section: "Check Boxes", width: "half" },
      { name: "addressChange", label: "Check if address change", type: "checkbox", section: "Check Boxes", width: "half" },

      // ── Income (Lines 1-11) ──
      { name: "grossReceipts", label: "Line 1a – Gross receipts or sales", type: "text", section: "Income", width: "half", helpText: "Total gross receipts or sales for the tax year. Enter 0 for pro forma returns.", placeholder: "0" },
      { name: "returnsAllowances", label: "Line 1b – Returns and allowances", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "costOfGoodsSold", label: "Line 2 – Cost of goods sold (Schedule A)", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "grossProfit", label: "Line 3 – Gross profit", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "dividendIncome", label: "Line 4 – Dividends & inclusions (Schedule C)", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "interestIncome", label: "Line 5 – Interest", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "grossRents", label: "Line 6 – Gross rents", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "grossRoyalties", label: "Line 7 – Gross royalties", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "capitalGain", label: "Line 8 – Capital gain net income", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "netGainLoss", label: "Line 9 – Net gain or (loss) from Form 4797", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "otherIncome", label: "Line 10 – Other income", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "totalIncome", label: "Line 11 – Total income", type: "text", section: "Income", width: "half", placeholder: "0" },

      // ── Deductions (Lines 12-29b) ──
      { name: "compensationOfficers", label: "Line 12 – Compensation of officers", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "salariesWages", label: "Line 13 – Salaries and wages", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "repairsMainten", label: "Line 14 – Repairs and maintenance", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "badDebts", label: "Line 15 – Bad debts", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "rents", label: "Line 16 – Rents", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "taxes", label: "Line 17 – Taxes and licenses", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "interestDeduction", label: "Line 18 – Interest", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "depreciation", label: "Line 20 – Depreciation", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "otherDeductions", label: "Line 26 – Other deductions", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "totalDeductions", label: "Line 27 – Total deductions", type: "text", section: "Deductions", width: "half", placeholder: "0" },

      // ── Tax & Payments ──
      { name: "taxableIncome", label: "Line 28 – Taxable income before NOL", type: "text", section: "Tax & Payments", width: "half", placeholder: "0" },
      { name: "netOperatingLoss", label: "Line 29a – NOL deduction", type: "text", section: "Tax & Payments", width: "half", placeholder: "0" },
      { name: "taxableIncomeAfterNOL", label: "Line 30 – Taxable income", type: "text", section: "Tax & Payments", width: "half", placeholder: "0" },
      { name: "totalTax", label: "Line 31 – Total tax (Schedule J)", type: "text", section: "Tax & Payments", width: "half", placeholder: "0" },

      // ── Signature ──
      { name: "officerSignatureDate", label: "Sign here – Date", type: "text", section: "Signature", width: "half", placeholder: "MM/DD/YYYY" },
    ],
  },

  // ══════════════════════════════════════════════════
  // Form 5472 — Information Return of a 25% Foreign-Owned U.S. Corporation
  // ══════════════════════════════════════════════════
  {
    id: "form-5472",
    name: "Form 5472",
    fullName: "Information Return of a 25% Foreign-Owned U.S. Corporation",
    description: "Required annual filing for any U.S. entity with 25%+ foreign ownership. Reports all transactions between the entity and its foreign owner(s). Penalty for failure to file: $25,000.",
    category: "foreign-llc",
    categoryLabel: "Foreign-Owned LLC",
    pdfFileName: "f5472.pdf",
    fields: [
      // ── Filing Information ──
      { name: "taxYearBegin", label: "Tax year beginning", type: "text", required: true, section: "Filing Information", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "taxYearEnd", label: "Tax year ending", type: "text", required: true, section: "Filing Information", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "totalFormsAttached", label: "Total number of Forms 5472 filed", type: "text", section: "Filing Information", width: "half", helpText: "If filing multiple 5472s (for multiple foreign owners), enter the total count.", placeholder: "1" },
      { name: "formNumber", label: "This is form number __ of __", type: "text", section: "Filing Information", width: "half", placeholder: "1" },

      // ── Part I: Reporting Corporation ──
      { name: "reportingCorpName", label: "Line 1a – Name of reporting corporation", type: "text", required: true, section: "Part I – Reporting Corporation", width: "full", helpText: "Legal name of the U.S. corporation or LLC filing this return." },
      { name: "reportingCorpAddress", label: "Line 1a – Address (street)", type: "text", required: true, section: "Part I – Reporting Corporation", width: "full" },
      { name: "reportingCorpCity", label: "City", type: "text", required: true, section: "Part I – Reporting Corporation", width: "half" },
      { name: "reportingCorpState", label: "State", type: "text", section: "Part I – Reporting Corporation", width: "half" },
      { name: "reportingCorpZip", label: "ZIP Code", type: "text", section: "Part I – Reporting Corporation", width: "half" },
      { name: "reportingCorpEIN", label: "Line 1b – EIN", type: "ein", required: true, section: "Part I – Reporting Corporation", width: "half" },
      { name: "totalAssets", label: "Line 1b – Total assets", type: "text", section: "Part I – Reporting Corporation", width: "half", helpText: "Total assets as reported on the corporation's tax return. Enter 0 if none.", placeholder: "0" },
      { name: "principalBusinessActivity", label: "Line 1c – Principal business activity", type: "text", section: "Part I – Reporting Corporation", width: "half", helpText: "Describe the main business activity, e.g. 'Software consulting'" },
      { name: "principalBusinessCode", label: "Line 1c – Principal business activity code", type: "text", section: "Part I – Reporting Corporation", width: "half", helpText: "NAICS code. e.g. 541511 for custom software development", placeholder: "541511" },
      { name: "incorporationDate", label: "Line 1d – Date of incorporation", type: "text", section: "Part I – Reporting Corporation", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "reportingCorpCountryIncorp", label: "Line 1e – Country of incorporation", type: "text", section: "Part I – Reporting Corporation", width: "half", helpText: "For a US LLC, enter 'United States'. For a US subsidiary of a foreign parent, enter 'United States'." },
      { name: "stateOfIncorporation", label: "Line 1e – State of incorporation", type: "text", section: "Part I – Reporting Corporation", width: "half", placeholder: "e.g. WY, DE" },
      { name: "isSection898Election", label: "Line 1i – Section 898 election made?", type: "checkbox", section: "Part I – Reporting Corporation", width: "half", helpText: "Check if the corporation has made a section 898 election (conforming year)." },
      { name: "isSection338Election", label: "Line 1j – Section 338(g) election made?", type: "checkbox", section: "Part I – Reporting Corporation", width: "half" },

      // ── Part II: 25% Foreign Shareholder ──
      { name: "foreignOwnerName", label: "Line 2a – Name of 25% foreign shareholder", type: "text", required: true, section: "Part II – 25% Foreign Shareholder", width: "full", helpText: "Full legal name of the individual or entity that directly or indirectly owns 25% or more of the reporting corporation." },
      { name: "foreignOwnerAddress", label: "Line 2a – Address", type: "text", required: true, section: "Part II – 25% Foreign Shareholder", width: "full" },
      { name: "foreignOwnerCity", label: "City", type: "text", section: "Part II – 25% Foreign Shareholder", width: "half" },
      { name: "foreignOwnerCountry", label: "Line 2a – Country", type: "text", required: true, section: "Part II – 25% Foreign Shareholder", width: "half" },
      { name: "foreignOwnerIdNumber", label: "Line 2b – U.S. identifying number (if any)", type: "text", section: "Part II – 25% Foreign Shareholder", width: "half", helpText: "Enter SSN, ITIN, or EIN if the foreign owner has a U.S. tax ID." },
      { name: "foreignOwnerForeignIdNumber", label: "Line 2b – Foreign identifying number", type: "text", section: "Part II – 25% Foreign Shareholder", width: "half" },
      { name: "foreignOwnerCountryCitizenship", label: "Line 2c – Country of citizenship", type: "text", section: "Part II – 25% Foreign Shareholder", width: "half" },
      { name: "foreignOwnerCountryOrganization", label: "Line 2c – Country of organization (if entity)", type: "text", section: "Part II – 25% Foreign Shareholder", width: "half" },

      // ── Part III: Related Party ──
      { name: "relatedPartyName", label: "Line 3a – Name of related party", type: "text", section: "Part III – Related Party", width: "full", helpText: "If the related party is different from the 25% foreign shareholder in Part II, enter the name here. Otherwise, you can reference Part II." },
      { name: "relatedPartyAddress", label: "Line 3a – Address", type: "text", section: "Part III – Related Party", width: "full" },
      { name: "relatedPartyCountry", label: "Country", type: "text", section: "Part III – Related Party", width: "half" },
      { name: "relatedPartyIdNumber", label: "Line 3b – U.S. identifying number (if any)", type: "text", section: "Part III – Related Party", width: "half" },
      { name: "relatedPartyRelationship", label: "Line 3e – Relationship to reporting corporation", type: "text", section: "Part III – Related Party", width: "full", helpText: "e.g. '100% foreign owner', 'Parent company', 'Sole member'" },

      // ── Part IV: Monetary Transactions ──
      { name: "salesOfStock", label: "Line 1 – Sales of stock in trade (inventory)", type: "text", section: "Part IV – Monetary Transactions (Amounts Received)", width: "half", placeholder: "0", helpText: "Enter the dollar amounts received from the related party during the tax year." },
      { name: "salesOfTangible", label: "Line 2 – Sales of tangible property", type: "text", section: "Part IV – Monetary Transactions (Amounts Received)", width: "half", placeholder: "0" },
      { name: "platformContribution", label: "Line 3 – Platform contribution transaction payments received", type: "text", section: "Part IV – Monetary Transactions (Amounts Received)", width: "half", placeholder: "0" },
      { name: "costSharingReceived", label: "Line 4 – Cost sharing transaction payments received", type: "text", section: "Part IV – Monetary Transactions (Amounts Received)", width: "half", placeholder: "0" },
      { name: "rentsReceived", label: "Line 6 – Rents received", type: "text", section: "Part IV – Monetary Transactions (Amounts Received)", width: "half", placeholder: "0" },
      { name: "royaltiesReceived", label: "Line 7 – Royalties received", type: "text", section: "Part IV – Monetary Transactions (Amounts Received)", width: "half", placeholder: "0" },
      { name: "servicesReceived", label: "Line 9 – Amounts received for services", type: "text", section: "Part IV – Monetary Transactions (Amounts Received)", width: "half", placeholder: "0" },
      { name: "interestReceived", label: "Line 11 – Interest received", type: "text", section: "Part IV – Monetary Transactions (Amounts Received)", width: "half", placeholder: "0" },
      { name: "otherAmountsReceived", label: "Line 14 – Other amounts received", type: "text", section: "Part IV – Monetary Transactions (Amounts Received)", width: "half", placeholder: "0" },

      { name: "purchasesOfStock", label: "Line 16 – Purchases of stock in trade", type: "text", section: "Part IV – Monetary Transactions (Amounts Paid)", width: "half", placeholder: "0", helpText: "Enter the dollar amounts paid to the related party during the tax year." },
      { name: "purchasesOfTangible", label: "Line 17 – Purchases of tangible property", type: "text", section: "Part IV – Monetary Transactions (Amounts Paid)", width: "half", placeholder: "0" },
      { name: "platformContribPaid", label: "Line 18 – Platform contribution payments paid", type: "text", section: "Part IV – Monetary Transactions (Amounts Paid)", width: "half", placeholder: "0" },
      { name: "costSharingPaid", label: "Line 19 – Cost sharing payments paid", type: "text", section: "Part IV – Monetary Transactions (Amounts Paid)", width: "half", placeholder: "0" },
      { name: "rentsPaid", label: "Line 21 – Rents paid", type: "text", section: "Part IV – Monetary Transactions (Amounts Paid)", width: "half", placeholder: "0" },
      { name: "royaltiesPaid", label: "Line 22 – Royalties paid", type: "text", section: "Part IV – Monetary Transactions (Amounts Paid)", width: "half", placeholder: "0" },
      { name: "servicesPaid", label: "Line 24 – Amounts paid for services", type: "text", section: "Part IV – Monetary Transactions (Amounts Paid)", width: "half", placeholder: "0" },
      { name: "interestPaid", label: "Line 27 – Interest paid", type: "text", section: "Part IV – Monetary Transactions (Amounts Paid)", width: "half", placeholder: "0" },
      { name: "otherAmountsPaid", label: "Line 30 – Other amounts paid", type: "text", section: "Part IV – Monetary Transactions (Amounts Paid)", width: "half", placeholder: "0" },

      // ── Capital & Loans ──
      { name: "capitalContributions", label: "Line 10 – Capital contributions received from related party", type: "text", section: "Part IV – Capital & Loan Transactions", width: "half", placeholder: "0", helpText: "Total capital contributed by the foreign owner during the tax year." },
      { name: "loansFromForeignOwner", label: "Line 12 – Loan balances – Amounts owed BY foreign related party", type: "text", section: "Part IV – Capital & Loan Transactions", width: "half", placeholder: "0" },
      { name: "loansToForeignOwner", label: "Line 28 – Loan balances – Amounts owed TO foreign related party", type: "text", section: "Part IV – Capital & Loan Transactions", width: "half", placeholder: "0" },
    ],
  },

  // ══════════════════════════════════════════════════
  // Form 1065 — U.S. Return of Partnership Income
  // ══════════════════════════════════════════════════
  {
    id: "form-1065",
    name: "Form 1065",
    fullName: "U.S. Return of Partnership Income",
    description: "Annual partnership income tax return for multi-member LLCs and partnerships. Reports income, deductions, gains, and losses that flow through to partners via Schedule K-1.",
    category: "partnership",
    categoryLabel: "Partnership",
    pdfFileName: "f1065.pdf",
    fields: [
      // ── Tax Period ──
      { name: "taxYearBegin", label: "Tax year beginning", type: "text", required: true, section: "Tax Period", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "taxYearEnd", label: "Tax year ending", type: "text", required: true, section: "Tax Period", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "shortPeriodReason", label: "Short period reason (if applicable)", type: "text", section: "Tax Period", width: "half" },

      // ── Entity Information ──
      { name: "partnershipName", label: "Name of partnership", type: "text", required: true, section: "Entity Information", width: "full" },
      { name: "streetAddress", label: "Street address", type: "text", required: true, section: "Entity Information", width: "full" },
      { name: "suiteRoom", label: "Suite / Room number", type: "text", section: "Entity Information", width: "half" },
      { name: "city", label: "City or town", type: "text", required: true, section: "Entity Information", width: "half" },
      { name: "state", label: "State", type: "text", required: true, section: "Entity Information", width: "half" },
      { name: "country", label: "Country", type: "text", section: "Entity Information", width: "half" },
      { name: "zipCode", label: "ZIP Code", type: "text", required: true, section: "Entity Information", width: "half" },

      // ── Identification ──
      { name: "ein", label: "Employer identification number (EIN)", type: "ein", required: true, section: "Identification", width: "half" },
      { name: "dateBusinessStarted", label: "Date business started", type: "text", section: "Identification", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "totalAssets", label: "Total assets at end of year", type: "text", section: "Identification", width: "half", placeholder: "0" },

      // ── Lines A-C ──
      { name: "principalBusinessActivity", label: "A – Principal business activity", type: "text", section: "Lines A–H", width: "half", helpText: "e.g. 'Software', 'Consulting', 'Real estate'" },
      { name: "principalProduct", label: "B – Principal product or service", type: "text", section: "Lines A–H", width: "half" },
      { name: "businessCode", label: "C – Business code number (NAICS)", type: "text", section: "Lines A–H", width: "half", placeholder: "541511" },
      { name: "accountingMethod", label: "F – Accounting method", type: "select", section: "Lines A–H", width: "half", options: [
        { value: "cash", label: "Cash" },
        { value: "accrual", label: "Accrual" },
        { value: "other", label: "Other" },
      ] },
      { name: "numberOfPartners", label: "G – Number of Schedules K-1 attached", type: "text", section: "Lines A–H", width: "half", helpText: "Number of partners / members." },
      { name: "isInitialReturn", label: "Initial return", type: "checkbox", section: "Lines A–H", width: "half" },
      { name: "isFinalReturn", label: "Final return", type: "checkbox", section: "Lines A–H", width: "half" },

      // ── Income (Lines 1-8) ──
      { name: "grossReceipts", label: "Line 1a – Gross receipts or sales", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "returnsAllowances", label: "Line 1b – Returns and allowances", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "costOfGoodsSold", label: "Line 2 – Cost of goods sold", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "grossProfit", label: "Line 3 – Gross profit", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "ordinaryIncome", label: "Line 4 – Ordinary income (loss) from other partnerships", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "netFarmProfit", label: "Line 5 – Net farm profit (loss)", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "netGainLoss", label: "Line 6 – Net gain (loss) from Form 4797", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "otherIncome", label: "Line 7 – Other income (loss)", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "totalIncome", label: "Line 8 – Total income (loss)", type: "text", section: "Income", width: "half", placeholder: "0" },

      // ── Deductions (Lines 9-22) ──
      { name: "salariesWages", label: "Line 9 – Salaries and wages", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "guaranteedPayments", label: "Line 10 – Guaranteed payments to partners", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "repairsMaintenance", label: "Line 11 – Repairs and maintenance", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "badDebts", label: "Line 12 – Bad debts", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "rentExpense", label: "Line 13 – Rent", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "taxesLicenses", label: "Line 14 – Taxes and licenses", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "interestDeduction", label: "Line 15 – Interest", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "depreciation", label: "Line 16a – Depreciation", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "otherDeductions", label: "Line 20 – Other deductions", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "totalDeductions", label: "Line 21 – Total deductions", type: "text", section: "Deductions", width: "half", placeholder: "0" },
      { name: "ordinaryBusinessIncome", label: "Line 22 – Ordinary business income (loss)", type: "text", section: "Deductions", width: "half", placeholder: "0" },

      // ── Signature ──
      { name: "generalPartnerName", label: "Signature of partner or LLC member", type: "text", section: "Signature", width: "full" },
      { name: "signatureDate", label: "Date", type: "text", section: "Signature", width: "half", placeholder: "MM/DD/YYYY" },
    ],
  },

  // ══════════════════════════════════════════════════
  // Schedule K-1 (Form 1065) — Partner's Share
  // ══════════════════════════════════════════════════
  {
    id: "schedule-k1",
    name: "Schedule K-1",
    fullName: "Partner's Share of Income, Deductions, Credits",
    description: "Reports each partner's share of the partnership's income, deductions, and credits. One K-1 must be filed for each partner.",
    category: "partnership",
    categoryLabel: "Partnership",
    pdfFileName: "f1065sk1.pdf",
    fields: [
      // ── Tax Period ──
      { name: "taxYearBegin", label: "Calendar year or tax year beginning", type: "text", required: true, section: "Tax Period", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "taxYearEnd", label: "Tax year ending", type: "text", required: true, section: "Tax Period", width: "half", placeholder: "MM/DD/YYYY" },

      // ── Part I: Information About the Partnership ──
      { name: "partnershipName", label: "A – Partnership's name", type: "text", required: true, section: "Part I – Partnership Info", width: "full" },
      { name: "partnershipAddress", label: "Partnership's address", type: "text", section: "Part I – Partnership Info", width: "full" },
      { name: "partnershipCity", label: "City, state, ZIP", type: "text", section: "Part I – Partnership Info", width: "full" },
      { name: "partnershipEIN", label: "B – Partnership's EIN", type: "ein", required: true, section: "Part I – Partnership Info", width: "half" },
      { name: "irsCenter", label: "C – IRS center where return filed", type: "text", section: "Part I – Partnership Info", width: "half", helpText: "e.g. 'Ogden, UT'" },
      { name: "publiclyTraded", label: "D – Publicly traded partnership?", type: "select", section: "Part I – Partnership Info", width: "half", options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ] },

      // ── Part II: Information About the Partner ──
      { name: "partnerName", label: "E – Partner's name", type: "text", required: true, section: "Part II – Partner Info", width: "full" },
      { name: "partnerAddress", label: "Partner's address", type: "text", section: "Part II – Partner Info", width: "full" },
      { name: "partnerCity", label: "City, state, ZIP", type: "text", section: "Part II – Partner Info", width: "full" },
      { name: "partnerSSN", label: "F – Partner's identifying number (SSN/EIN)", type: "text", required: true, section: "Part II – Partner Info", width: "half" },
      { name: "partnerType", label: "G – General partner or LLC member-manager?", type: "select", required: true, section: "Part II – Partner Info", width: "half", options: [
        { value: "general", label: "General partner or LLC member-manager" },
        { value: "limited", label: "Limited partner or other LLC member" },
      ] },
      { name: "domesticOrForeign", label: "H1 – Domestic or foreign partner?", type: "select", section: "Part II – Partner Info", width: "half", options: [
        { value: "domestic", label: "Domestic" },
        { value: "foreign", label: "Foreign" },
      ] },
      { name: "entityType", label: "H2 – If partner is a disregarded entity, type", type: "text", section: "Part II – Partner Info", width: "half" },
      { name: "partnerEntityType", label: "I1 – What type of entity is this partner?", type: "select", section: "Part II – Partner Info", width: "full", options: [
        { value: "individual", label: "Individual" },
        { value: "corporation", label: "Corporation" },
        { value: "estate", label: "Estate" },
        { value: "trust", label: "Trust" },
        { value: "partnership", label: "Partnership" },
        { value: "llc", label: "LLC (Disregarded entity)" },
        { value: "exempt_org", label: "Exempt Organization" },
        { value: "ira", label: "IRA" },
        { value: "nominee", label: "Nominee/Other" },
      ] },

      // ── Line J: Partner's Share of Profit/Loss/Capital ──
      { name: "profitShareBeginning", label: "Profit – Beginning %", type: "text", section: "J – Partner's Share %", width: "half", placeholder: "e.g. 50" },
      { name: "profitShareEnd", label: "Profit – Ending %", type: "text", section: "J – Partner's Share %", width: "half", placeholder: "e.g. 50" },
      { name: "lossShareBeginning", label: "Loss – Beginning %", type: "text", section: "J – Partner's Share %", width: "half" },
      { name: "lossShareEnd", label: "Loss – Ending %", type: "text", section: "J – Partner's Share %", width: "half" },
      { name: "capitalShareBeginning", label: "Capital – Beginning %", type: "text", section: "J – Partner's Share %", width: "half" },
      { name: "capitalShareEnd", label: "Capital – Ending %", type: "text", section: "J – Partner's Share %", width: "half" },

      // ── Part III: Partner's Share of Current Year Income ──
      { name: "ordinaryIncome", label: "Line 1 – Ordinary business income (loss)", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "netRentalIncome", label: "Line 2 – Net rental real estate income (loss)", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "otherNetRentalIncome", label: "Line 3 – Other net rental income (loss)", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "guaranteedPayments", label: "Line 4c – Guaranteed payments (total)", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "interestIncome", label: "Line 5 – Interest income", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "dividends", label: "Line 6a – Ordinary dividends", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "royalties", label: "Line 7 – Royalties", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "netShortTermCapGain", label: "Line 8 – Net short-term capital gain (loss)", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "netLongTermCapGain", label: "Line 9a – Net long-term capital gain (loss)", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "section1231Gain", label: "Line 10 – Net section 1231 gain (loss)", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "otherIncome", label: "Line 11 – Other income (loss)", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "section179Deduction", label: "Line 12 – Section 179 deduction", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "otherDeductions", label: "Line 13 – Other deductions", type: "text", section: "Part III – Income & Deductions", width: "half" },
      { name: "selfEmploymentEarnings", label: "Line 14a – Net earnings from self-employment", type: "text", section: "Part III – Income & Deductions", width: "half" },
    ],
  },

  // ══════════════════════════════════════════════════
  // FinCEN BOI — Beneficial Ownership Information Report
  // ══════════════════════════════════════════════════
  {
    id: "fincen-boi",
    name: "FinCEN BOI",
    fullName: "Beneficial Ownership Information Report",
    description: "Report beneficial ownership information for your company to FinCEN. This form must be filed online — no PDF template exists. We'll guide you through the fields and redirect you to the official filing portal.",
    category: "compliance",
    categoryLabel: "Compliance & Ownership",
    pdfFileName: "",
    fields: [
      { name: "filingType", label: "Type of filing", type: "select", required: true, section: "Filing Information", width: "full", options: [
        { value: "initial", label: "Initial report" },
        { value: "updated", label: "Updated report" },
        { value: "corrected", label: "Corrected report" },
      ] },
      { name: "companyLegalName", label: "Legal name of reporting company", type: "text", required: true, section: "Company Information", width: "full" },
      { name: "companyAlternateName", label: "Alternate name (DBA / trade name)", type: "text", section: "Company Information", width: "full" },
      { name: "taxIdType", label: "Tax identification type", type: "select", required: true, section: "Company Information", width: "half", options: [
        { value: "ein", label: "EIN" },
        { value: "ssn", label: "SSN / ITIN" },
        { value: "foreign", label: "Foreign tax ID" },
      ] },
      { name: "taxIdNumber", label: "Tax identification number", type: "text", required: true, section: "Company Information", width: "half" },
      { name: "countryOfFormation", label: "Country / jurisdiction of formation", type: "text", required: true, section: "Company Information", width: "half" },
      { name: "stateOfFormation", label: "State of formation (if US)", type: "text", section: "Company Information", width: "half" },
      { name: "companyAddress", label: "Current US address", type: "text", required: true, section: "Company Information", width: "full" },
      { name: "companyCity", label: "City", type: "text", required: true, section: "Company Information", width: "half" },
      { name: "companyState", label: "State", type: "text", required: true, section: "Company Information", width: "half" },
      { name: "companyZip", label: "ZIP Code", type: "text", required: true, section: "Company Information", width: "half" },
      { name: "bo1LastName", label: "Beneficial owner – Last name", type: "text", required: true, section: "Beneficial Owner #1", width: "half" },
      { name: "bo1FirstName", label: "Beneficial owner – First name", type: "text", required: true, section: "Beneficial Owner #1", width: "half" },
      { name: "bo1DateOfBirth", label: "Date of birth", type: "date", required: true, section: "Beneficial Owner #1", width: "half" },
      { name: "bo1Address", label: "Residential address", type: "text", required: true, section: "Beneficial Owner #1", width: "full" },
      { name: "bo1City", label: "City", type: "text", required: true, section: "Beneficial Owner #1", width: "half" },
      { name: "bo1State", label: "State / Province", type: "text", section: "Beneficial Owner #1", width: "half" },
      { name: "bo1Country", label: "Country", type: "text", required: true, section: "Beneficial Owner #1", width: "half" },
      { name: "bo1ZipCode", label: "ZIP / Postal code", type: "text", section: "Beneficial Owner #1", width: "half" },
      { name: "bo1IdType", label: "Identifying document type", type: "select", required: true, section: "Beneficial Owner #1", width: "half", options: [
        { value: "us_passport", label: "US Passport" },
        { value: "passport", label: "Foreign Passport" },
        { value: "drivers_license", label: "State-issued driver's license" },
        { value: "state_id", label: "State / local / tribal-issued ID" },
      ] },
      { name: "bo1IdNumber", label: "Identifying document number", type: "text", required: true, section: "Beneficial Owner #1", width: "half" },
      { name: "bo1IdCountry", label: "Issuing jurisdiction – Country", type: "text", required: true, section: "Beneficial Owner #1", width: "half" },
      { name: "bo1IdState", label: "Issuing jurisdiction – State (if US)", type: "text", section: "Beneficial Owner #1", width: "half" },
    ],
  },

  // ══════════════════════════════════════════════════
  // Form 1040-NR — U.S. Nonresident Alien Income Tax Return
  // ══════════════════════════════════════════════════
  {
    id: "form-1040-nr",
    name: "Form 1040-NR",
    fullName: "U.S. Nonresident Alien Income Tax Return",
    description: "Individual income tax return for nonresident aliens who have U.S.-source income such as wages, business income, or investment income.",
    category: "individual",
    categoryLabel: "Individual & Withholding",
    pdfFileName: "f1040nr.pdf",
    fields: [
      // ── Personal Information ──
      { name: "firstName", label: "First name and middle initial", type: "text", required: true, section: "Personal Information", width: "half" },
      { name: "lastName", label: "Last name", type: "text", required: true, section: "Personal Information", width: "half" },
      { name: "ssn", label: "Your identifying number (SSN or ITIN)", type: "text", required: true, section: "Personal Information", width: "half", helpText: "If you don't have an SSN, apply for an ITIN using Form W-7." },
      { name: "identifyingNumberType", label: "Check if ITIN applied for", type: "checkbox", section: "Personal Information", width: "half" },
      { name: "spouseName", label: "If joint return, spouse's first name and initial, last name", type: "text", section: "Personal Information", width: "full" },
      { name: "spouseSSN", label: "Spouse's identifying number", type: "text", section: "Personal Information", width: "half" },
      { name: "usPresenceDays", label: "Substantial presence days in the US", type: "text", section: "Personal Information", width: "half" },

      // ── Address ──
      { name: "usAddress", label: "Present home address in the United States (if any)", type: "text", section: "U.S. Address", width: "full", helpText: "Enter your U.S. street address, apartment number, if you have one." },
      { name: "usCity", label: "City, town or post office", type: "text", section: "U.S. Address", width: "half" },
      { name: "usState", label: "State", type: "text", section: "U.S. Address", width: "half" },
      { name: "usZip", label: "ZIP Code", type: "text", section: "U.S. Address", width: "half" },
      { name: "foreignAddress", label: "Foreign address (street, city, province)", type: "text", required: true, section: "Foreign Address", width: "full" },
      { name: "foreignCountry", label: "Foreign country name", type: "text", required: true, section: "Foreign Address", width: "half" },
      { name: "foreignProvinceState", label: "Foreign province / state / county", type: "text", section: "Foreign Address", width: "half" },
      { name: "foreignPostalCode", label: "Foreign postal code", type: "text", section: "Foreign Address", width: "half" },
      { name: "countryOfResidence", label: "Country of tax residence", type: "text", required: true, section: "Foreign Address", width: "half", helpText: "The country where you maintain your tax home." },

      // ── Filing Status ──
      { name: "filingStatus", label: "Filing status", type: "select", required: true, section: "Filing Status", width: "full", options: [
        { value: "single", label: "Single nonresident alien" },
        { value: "married_separate", label: "Married nonresident alien filing separately" },
        { value: "married_joint", label: "Married filing jointly (with U.S. citizen/resident spouse)" },
        { value: "qualifying_surviving", label: "Qualifying surviving spouse" },
        { value: "estate_trust", label: "Nonresident alien estate or trust" },
      ], helpText: "Most nonresident aliens file as 'Single nonresident alien' or 'Married nonresident alien filing separately'." },

      // ── Income (Lines 1a-9) ──
      { name: "wagesUS", label: "Line 1a – Wages, salaries, tips (U.S. source)", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "taxExemptInterest", label: "Line 2a – Tax-exempt interest", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "taxableInterest", label: "Line 2b – Taxable interest", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "qualifiedDividends", label: "Line 3a – Qualified dividends", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "ordinaryDividends", label: "Line 3b – Ordinary dividends", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "businessIncome", label: "Line 8 – ECI from Schedule C (business income)", type: "text", section: "Income", width: "half", placeholder: "0", helpText: "Net profit or loss from business effectively connected with U.S. trade or business." },
      { name: "capitalGain", label: "Line 7 – Capital gain or (loss)", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "otherIncome", label: "Line 8 – Other income", type: "text", section: "Income", width: "half", placeholder: "0" },
      { name: "totalIncome", label: "Line 9 – Total income", type: "text", section: "Income", width: "half", placeholder: "0" },

      // ── Deductions & Tax ──
      { name: "adjustmentsToIncome", label: "Line 10 – Adjustments to income", type: "text", section: "Deductions & Tax", width: "half", placeholder: "0" },
      { name: "adjustedGrossIncome", label: "Line 11 – Adjusted gross income", type: "text", section: "Deductions & Tax", width: "half", placeholder: "0" },
      { name: "itemizedDeductions", label: "Line 12 – Itemized deductions (from Schedule A)", type: "text", section: "Deductions & Tax", width: "half", placeholder: "0" },
      { name: "qualifiedBusinessDeduction", label: "Line 13 – Qualified business income deduction", type: "text", section: "Deductions & Tax", width: "half", placeholder: "0" },
      { name: "totalDeductions", label: "Line 14 – Total deductions", type: "text", section: "Deductions & Tax", width: "half", placeholder: "0" },
      { name: "taxableIncome", label: "Line 15 – Taxable income", type: "text", section: "Deductions & Tax", width: "half", placeholder: "0" },
      { name: "tax", label: "Line 16 – Tax", type: "text", section: "Deductions & Tax", width: "half", placeholder: "0" },
      { name: "totalTax", label: "Line 24 – Total tax", type: "text", section: "Deductions & Tax", width: "half", placeholder: "0" },

      // ── Payments ──
      { name: "taxWithheld", label: "Line 25d – Federal income tax withheld", type: "text", section: "Payments", width: "half", placeholder: "0" },
      { name: "estimatedPayments", label: "Line 26 – Estimated tax payments", type: "text", section: "Payments", width: "half", placeholder: "0" },
      { name: "totalPayments", label: "Line 33 – Total payments", type: "text", section: "Payments", width: "half", placeholder: "0" },
      { name: "overpaid", label: "Line 34 – Amount overpaid", type: "text", section: "Payments", width: "half", placeholder: "0" },
      { name: "amountOwed", label: "Line 37 – Amount you owe", type: "text", section: "Payments", width: "half", placeholder: "0" },
    ],
  },

  // ══════════════════════════════════════════════════
  // W-8BEN — Certificate of Foreign Status (Individuals)
  // ══════════════════════════════════════════════════
  {
    id: "w-8ben",
    name: "W-8BEN",
    fullName: "Certificate of Foreign Status of Beneficial Owner for U.S. Tax Withholding (Individuals)",
    description: "Certificate used by foreign individuals to establish non-U.S. status and claim tax treaty benefits. Required by banks, brokerages, and companies that pay you U.S.-source income.",
    category: "individual",
    categoryLabel: "Individual & Withholding",
    pdfFileName: "fw8ben.pdf",
    fields: [
      // ── Part I: Identification of Beneficial Owner ──
      { name: "beneficialOwnerName", label: "Line 1 – Name of individual who is the beneficial owner", type: "text", required: true, section: "Part I – Identification", width: "full", helpText: "Your full legal name as it appears on your passport or other government-issued ID." },
      { name: "countryOfCitizenship", label: "Line 2 – Country of citizenship", type: "text", required: true, section: "Part I – Identification", width: "half" },
      { name: "permanentAddress", label: "Line 3 – Permanent residence address (street)", type: "text", required: true, section: "Part I – Identification", width: "full", helpText: "Your permanent residential address in your home country. P.O. boxes are not acceptable." },
      { name: "permanentCity", label: "City or town, state or province", type: "text", required: true, section: "Part I – Identification", width: "half" },
      { name: "permanentCountry", label: "Country", type: "text", required: true, section: "Part I – Identification", width: "half" },
      { name: "mailingAddress", label: "Line 4 – Mailing address (if different from Line 3)", type: "text", section: "Part I – Identification", width: "full" },
      { name: "mailingCity", label: "City or town, state or province", type: "text", section: "Part I – Identification", width: "half" },
      { name: "mailingCountry", label: "Country", type: "text", section: "Part I – Identification", width: "half" },
      { name: "ssnOrItin", label: "Line 5 – U.S. taxpayer identification number (SSN or ITIN)", type: "text", section: "Part I – Identification", width: "half", helpText: "Enter if you have one. Not required if claiming treaty benefits." },
      { name: "foreignTaxId", label: "Line 6a – Foreign tax identifying number (FTIN)", type: "text", section: "Part I – Identification", width: "half", helpText: "Your tax ID number from your country of residence. Required unless you check the box on Line 6b." },
      { name: "ftinNotRequired", label: "Line 6b – Check if FTIN not legally required", type: "checkbox", section: "Part I – Identification", width: "full" },
      { name: "referenceNumber", label: "Line 7 – Reference number(s)", type: "text", section: "Part I – Identification", width: "half", helpText: "Optional. Used by the withholding agent for identification purposes." },
      { name: "dateOfBirth", label: "Line 8 – Date of birth", type: "text", required: true, section: "Part I – Identification", width: "half", placeholder: "MM/DD/YYYY" },

      // ── Part II: Claim of Tax Treaty Benefits ──
      { name: "treatyCountry", label: "Line 9 – Country of residence for tax treaty purposes", type: "text", section: "Part II – Tax Treaty Benefits", width: "half", helpText: "Enter the country where you are a tax resident and that has a tax treaty with the U.S. Leave blank if not claiming treaty benefits." },
      { name: "treatyArticle", label: "Line 10 – Special rates: article and paragraph of treaty", type: "text", section: "Part II – Tax Treaty Benefits", width: "half", helpText: "e.g. 'Article 12, paragraph 2' for royalties under the UK treaty." },
      { name: "treatyRate", label: "Line 10 – Rate of withholding (%)", type: "text", section: "Part II – Tax Treaty Benefits", width: "half", helpText: "The reduced rate under the treaty. e.g. '0', '10', '15'" },
      { name: "incomeType", label: "Line 10 – Type of income", type: "text", section: "Part II – Tax Treaty Benefits", width: "half", helpText: "e.g. 'Royalties', 'Dividends', 'Interest', 'Independent personal services'" },
      { name: "treatyExplanation", label: "Line 10 – Additional conditions / explanation", type: "textarea", section: "Part II – Tax Treaty Benefits", width: "full", helpText: "Explain why you meet the treaty article requirements. Required if claiming treaty benefits." },

      // ── Part III: Certification ──
      { name: "capacitySigner", label: "Capacity in which acting (if form is not signed by beneficial owner)", type: "text", section: "Part III – Certification", width: "full" },
      { name: "signatureDate", label: "Date (MM/DD/YYYY)", type: "text", required: true, section: "Part III – Certification", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "printedName", label: "Print name of signer", type: "text", required: true, section: "Part III – Certification", width: "half" },
    ],
  },

  // ══════════════════════════════════════════════════
  // W-8BEN-E — Certificate of Foreign Status (Entities)
  // ══════════════════════════════════════════════════
  {
    id: "w-8ben-e",
    name: "W-8BEN-E",
    fullName: "Certificate of Status of Beneficial Owner for U.S. Tax Withholding and Reporting (Entities)",
    description: "Certificate used by foreign entities to establish non-U.S. status, claim tax treaty benefits, and report FATCA status. Required by U.S. withholding agents paying income to foreign entities.",
    category: "individual",
    categoryLabel: "Individual & Withholding",
    pdfFileName: "fw8bene.pdf",
    fields: [
      // ── Part I: Identification of Beneficial Owner ──
      { name: "entityName", label: "Line 1 – Name of organization that is the beneficial owner", type: "text", required: true, section: "Part I – Identification", width: "full" },
      { name: "countryOfIncorporation", label: "Line 2 – Country of incorporation or organization", type: "text", required: true, section: "Part I – Identification", width: "half" },
      { name: "disregardedEntityName", label: "Line 3 – Name of disregarded entity (if applicable)", type: "text", section: "Part I – Identification", width: "full", helpText: "If the entity on Line 1 is a disregarded entity for US tax purposes, enter the name of the branch receiving the payment." },
      { name: "entityType", label: "Line 4 – Chapter 3 Status (entity type)", type: "select", required: true, section: "Part I – Identification", width: "full", options: [
        { value: "corporation", label: "Corporation" },
        { value: "disregarded_entity", label: "Disregarded entity" },
        { value: "partnership", label: "Partnership" },
        { value: "simple_trust", label: "Simple trust" },
        { value: "grantor_trust", label: "Grantor trust" },
        { value: "complex_trust", label: "Complex trust" },
        { value: "estate", label: "Estate" },
        { value: "government", label: "Government" },
        { value: "central_bank", label: "Central Bank of Issue" },
        { value: "tax_exempt_org", label: "Tax-exempt organization" },
        { value: "private_foundation", label: "Private foundation" },
        { value: "international_org", label: "International organization" },
      ], helpText: "Select the entity's classification under Chapter 3 (withholding) rules." },
      { name: "hybrid", label: "Entity making a treaty claim treated as hybrid?", type: "checkbox", section: "Part I – Identification", width: "full" },

      // ── FATCA Status ──
      { name: "fatcaStatus", label: "Line 5 – Chapter 4 Status (FATCA)", type: "select", required: true, section: "Part I – FATCA Status", width: "full", options: [
        { value: "active_nffe", label: "Active NFFE" },
        { value: "passive_nffe", label: "Passive NFFE" },
        { value: "participating_ffi", label: "Participating FFI" },
        { value: "reporting_model1_ffi", label: "Reporting Model 1 FFI" },
        { value: "reporting_model2_ffi", label: "Reporting Model 2 FFI" },
        { value: "registered_deemed_compliant", label: "Registered deemed-compliant FFI" },
        { value: "nonparticipating_ffi", label: "Nonparticipating FFI" },
        { value: "exempt_beneficial_owner", label: "Exempt beneficial owner" },
        { value: "nonprofit", label: "Nonprofit organization (501(c))" },
        { value: "territory_fi", label: "Territory financial institution" },
        { value: "excepted_nffe", label: "Excepted NFFE" },
        { value: "direct_reporting_nffe", label: "Direct reporting NFFE" },
        { value: "sponsored_direct_reporting_nffe", label: "Sponsored direct reporting NFFE" },
      ], helpText: "Most operating companies that are not banks or investment entities should select 'Active NFFE'. Holding companies or investment entities may be 'Passive NFFE'." },

      // ── Address ──
      { name: "permanentAddress", label: "Line 6 – Permanent residence address (street)", type: "text", required: true, section: "Part I – Address", width: "full" },
      { name: "permanentCity", label: "City or town, state or province", type: "text", required: true, section: "Part I – Address", width: "half" },
      { name: "permanentCountry", label: "Country", type: "text", required: true, section: "Part I – Address", width: "half" },
      { name: "mailingAddress", label: "Line 7 – Mailing address (if different)", type: "text", section: "Part I – Address", width: "full" },

      // ── Tax ID Numbers ──
      { name: "ein", label: "Line 8 – U.S. taxpayer identification number (EIN)", type: "ein", section: "Part I – Tax ID", width: "half", helpText: "Enter EIN if the entity has one." },
      { name: "giin", label: "Line 9a – GIIN", type: "text", section: "Part I – Tax ID", width: "half", helpText: "Global Intermediary Identification Number. Required for FFIs registered with the IRS." },
      { name: "foreignTaxId", label: "Line 9b – Foreign TIN", type: "text", section: "Part I – Tax ID", width: "half" },
      { name: "referenceNumber", label: "Line 10 – Reference number(s)", type: "text", section: "Part I – Tax ID", width: "half" },

      // ── Part III: Claim of Tax Treaty Benefits ──
      { name: "treatyCountry", label: "Line 14a – Country of residence for treaty purposes", type: "text", section: "Part III – Treaty Benefits", width: "half", helpText: "Leave blank if not claiming treaty benefits." },
      { name: "treatyArticle", label: "Line 14b – Article and paragraph of treaty", type: "text", section: "Part III – Treaty Benefits", width: "half" },
      { name: "treatyRate", label: "Line 14b – Rate of withholding (%)", type: "text", section: "Part III – Treaty Benefits", width: "half" },
      { name: "incomeType", label: "Line 14b – Type of income", type: "text", section: "Part III – Treaty Benefits", width: "half" },
      { name: "treatyExplanation", label: "Line 14b – Additional conditions / explanation", type: "textarea", section: "Part III – Treaty Benefits", width: "full" },

      // ── Part XXV: Active NFFE ──
      { name: "activeNffeCheck", label: "Part XXV – Certify this entity is an Active NFFE?", type: "checkbox", section: "Part XXV – Active NFFE", width: "full", helpText: "Check if you selected 'Active NFFE' as your FATCA status. An Active NFFE is an entity where less than 50% of its gross income is passive income and less than 50% of its assets produce passive income." },

      // ── Part XXX: Certification ──
      { name: "authorizedSignerName", label: "Sign here – Print name of signer", type: "text", required: true, section: "Part XXX – Certification", width: "full", helpText: "Name of the person authorized to sign on behalf of the entity." },
      { name: "signerTitle", label: "Title", type: "text", section: "Part XXX – Certification", width: "half" },
      { name: "signatureDate", label: "Date (MM/DD/YYYY)", type: "text", required: true, section: "Part XXX – Certification", width: "half", placeholder: "MM/DD/YYYY" },
    ],
  },

  // ══════════════════════════════════════════════════
  // Form 7004 — Business Extension
  // ══════════════════════════════════════════════════
  {
    id: "form-7004",
    name: "Form 7004",
    fullName: "Application for Automatic Extension of Time to File Certain Business Income Tax, Information, and Other Returns",
    description: "Request an automatic 5- or 6-month extension for filing business tax returns. The extension is for filing only — any tax owed is still due by the original deadline.",
    category: "extension",
    categoryLabel: "Extensions",
    pdfFileName: "f7004.pdf",
    fields: [
      // ── Entity Information ──
      { name: "entityName", label: "Name", type: "text", required: true, section: "Entity Information", width: "full", helpText: "Legal name of the entity requesting the extension." },
      { name: "ein", label: "Identification number (EIN)", type: "ein", required: true, section: "Entity Information", width: "half" },
      { name: "streetAddress", label: "Street address (including suite / room)", type: "text", required: true, section: "Entity Information", width: "full" },
      { name: "foreignAddress", label: "Address in a foreign country (if applicable)", type: "text", section: "Entity Information", width: "full" },
      { name: "city", label: "City or town", type: "text", required: true, section: "Entity Information", width: "half" },
      { name: "state", label: "State", type: "text", required: true, section: "Entity Information", width: "half" },
      { name: "zipCode", label: "ZIP Code", type: "text", required: true, section: "Entity Information", width: "half" },

      // ── Part I: Automatic Extension ──
      { name: "isForeignCorp", label: "Check if this is a foreign corporation not having an office in the U.S.", type: "checkbox", section: "Part I – Extension Type", width: "full" },
      { name: "isConsolidated", label: "Check if filing a consolidated return", type: "checkbox", section: "Part I – Extension Type", width: "full" },
      { name: "isShortTaxYear", label: "Check if this is for a short tax year", type: "checkbox", section: "Part I – Extension Type", width: "full" },

      { name: "formCode", label: "Part I Line 1a – Enter the form code for the return being extended", type: "select", required: true, section: "Part I – Extension Type", width: "full", options: [
        { value: "04", label: "04 – Form 1065 (Partnership)" },
        { value: "05", label: "05 – Form 1041 (Estate/Trust)" },
        { value: "06", label: "06 – Form 1042 (Foreign Person's U.S. Source Income)" },
        { value: "08", label: "08 – Form 706-GS(T) (Generation-Skipping Transfer Tax)" },
        { value: "09", label: "09 – Form 706-GS(D) (Generation-Skipping Distribution)" },
        { value: "12", label: "12 – Form 1120 (Corporation)" },
        { value: "25", label: "25 – Form 1120-S (S Corporation)" },
        { value: "27", label: "27 – Form 1120-F (Foreign Corporation)" },
        { value: "31", label: "31 – Form 8804 (Foreign Partner Withholding)" },
        { value: "34", label: "34 – Form 8612 (Return of Excise Tax on Undist Income of RICs)" },
      ], helpText: "Select the form code for the return you need more time to file." },

      // ── Tax Period ──
      { name: "taxYearBegin", label: "Tax year beginning", type: "text", required: true, section: "Tax Period", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "taxYearEnd", label: "Tax year ending", type: "text", required: true, section: "Tax Period", width: "half", placeholder: "MM/DD/YYYY" },
      { name: "shortTaxYearReason", label: "Short tax year reason (if applicable)", type: "text", section: "Tax Period", width: "full", helpText: "e.g. 'Initial return', 'Final return', 'Change in accounting period'" },

      // ── Part II: Tentative Tax ──
      { name: "tentativeTotalTax", label: "Line 3 – Tentative total tax", type: "text", section: "Part II – Tentative Tax", width: "half", helpText: "Enter your best estimate of total tax for the year. Enter 0 if no tax is owed.", placeholder: "0" },
      { name: "totalPayments", label: "Line 4 – Total payments and credits", type: "text", section: "Part II – Tentative Tax", width: "half", placeholder: "0" },
      { name: "balanceDue", label: "Line 5 – Balance due (Line 3 minus Line 4)", type: "text", section: "Part II – Tentative Tax", width: "half", helpText: "If Line 3 is more than Line 4, enter the difference. You must pay this amount by the original due date.", placeholder: "0" },
    ],
  },

  // ══════════════════════════════════════════════════
  // Form 4868 — Individual Extension
  // ══════════════════════════════════════════════════
  {
    id: "form-4868",
    name: "Form 4868",
    fullName: "Application for Automatic Extension of Time to File U.S. Individual Income Tax Return",
    description: "Request an automatic 6-month extension for filing your individual income tax return (Form 1040, 1040-SR, 1040-NR, 1040-SS, or 1040-PR).",
    category: "extension",
    categoryLabel: "Extensions",
    pdfFileName: "f4868.pdf",
    fields: [
      // ── Personal Information ──
      { name: "firstName", label: "Your first name and middle initial", type: "text", required: true, section: "Personal Information", width: "half" },
      { name: "lastName", label: "Your last name", type: "text", required: true, section: "Personal Information", width: "half" },
      { name: "ssn", label: "Your social security number", type: "ssn", required: true, section: "Personal Information", width: "half" },
      { name: "spouseFirstName", label: "Spouse's first name and middle initial (if joint)", type: "text", section: "Personal Information", width: "half" },
      { name: "spouseLastName", label: "Spouse's last name (if joint)", type: "text", section: "Personal Information", width: "half" },
      { name: "spouseSSN", label: "Spouse's social security number", type: "ssn", section: "Personal Information", width: "half" },

      // ── Address ──
      { name: "streetAddress", label: "Home address (number, street, and apartment number)", type: "text", required: true, section: "Address", width: "full" },
      { name: "foreignAddress", label: "Foreign address (if outside the US)", type: "text", section: "Address", width: "full" },
      { name: "city", label: "City, town, or post office", type: "text", required: true, section: "Address", width: "half" },
      { name: "state", label: "State", type: "text", required: true, section: "Address", width: "half" },
      { name: "zipCode", label: "ZIP Code", type: "text", required: true, section: "Address", width: "half" },

      // ── Part I: Individual ──
      { name: "estimatedTaxLiability", label: "Line 4 – Estimate of total tax liability for the year", type: "text", required: true, section: "Part I – Tax Estimate", width: "half", helpText: "Your best estimate of total tax liability for the year.", placeholder: "0" },
      { name: "totalPayments", label: "Line 5 – Total payments (withholding + estimated payments)", type: "text", section: "Part I – Tax Estimate", width: "half", placeholder: "0" },
      { name: "balanceDue", label: "Line 6 – Balance due (Line 4 minus Line 5)", type: "text", section: "Part I – Tax Estimate", width: "half", placeholder: "0" },
      { name: "amountPaying", label: "Line 7 – Amount you are paying", type: "text", section: "Part I – Tax Estimate", width: "half", helpText: "You don't have to pay to get the extension, but interest and penalties will apply to any tax not paid by the original due date.", placeholder: "0" },

      // ── Part II: Checkboxes ──
      { name: "outOfCountry", label: "Check if you are 'out of the country'", type: "checkbox", section: "Part II – Additional Info", width: "full", helpText: "Check this box if on the regular due date of your return, you were out of the country (outside the US and Puerto Rico) and a US citizen or resident." },
      { name: "filing1040NR", label: "Check if filing Form 1040-NR", type: "checkbox", section: "Part II – Additional Info", width: "full", helpText: "Check if you are a nonresident alien filing Form 1040-NR." },
    ],
  },
];

export function getFormById(id: string): FormDefinition | undefined {
  return forms.find((f) => f.id === id);
}

export function getFormsByCategory(category: string): FormDefinition[] {
  return forms.filter((f) => f.category === category);
}
