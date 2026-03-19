export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  relatedForm?: string;
  publishedAt: string;
  readingTime: string;
}

export const blogCategories = [
  { id: "guides", label: "Step-by-Step Guides" },
  { id: "explainers", label: "Form Explainers" },
  { id: "tips", label: "Tips & Best Practices" },
  { id: "scenarios", label: "Real Scenarios" },
];

export const blogPosts: BlogPost[] = [
  // ── SS-4 (EIN) ──
  {
    slug: "how-to-apply-for-ein-form-ss4",
    title: "How to Apply for an EIN Using Form SS-4",
    excerpt: "A complete walkthrough for applying for your Employer Identification Number. Every field explained, every gotcha covered.",
    content: `Getting an EIN is the very first thing you do after forming your US company. The IRS uses Form SS-4 to process your application. Here's how to fill it out correctly.

## What is an EIN?

An Employer Identification Number is like a Social Security Number for your business. Banks need it to open your account. The IRS needs it to track your taxes. You can't do much without one.

## Who needs to file SS-4?

Every business entity formed in the US needs an EIN. This includes LLCs, corporations, partnerships, and nonprofits. Even single-member LLCs need one if they have employees or file certain tax returns.

## Walking through the form

**Line 1 — Legal name of entity.** This must match exactly what's on your formation documents. If you formed "Acme Holdings LLC" in Wyoming, write exactly that. Not "Acme Holdings" or "ACME HOLDINGS LLC."

**Line 2 — Trade name.** Only fill this if your business operates under a different name (DBA). If your LLC is "Acme Holdings LLC" but you do business as "Acme," put "Acme" here.

**Line 3 — Executor/Trustee.** Leave this blank unless you're filing for an estate or trust.

**Lines 4a-4b — Mailing address.** Your business mailing address. If you're international, you can use a US registered agent address here.

**Lines 5a-5b — Street address.** If different from mailing address. If it's the same, write "Same."

**Line 7a — Responsible party.** This is crucial for foreign founders. The IRS needs a real person's name — not a company name. This person must have an SSN, ITIN, or EIN.

**Line 7b — SSN/ITIN/EIN.** The responsible party's tax ID number. If you're a foreign founder without an SSN, you'll need an ITIN first, or you can use a US-based responsible party.

**Line 9a — Type of entity.** Check the box that matches your structure. Most foreign founders forming an LLC will check "Other" and write "Single-member LLC" or "Multi-member LLC."

**Line 10 — Reason for applying.** "Started new business" for new formations. "Banking purpose" if you already had an EIN but need a new one for banking.

**Line 16 — Date business started.** The date your entity was formed with the state, not the date you're filling this form.

## Common mistakes

1. **Name mismatch.** The name on SS-4 must match your state formation documents exactly.
2. **Wrong responsible party.** A company cannot be its own responsible party. It must be a person.
3. **Missing ITIN.** Foreign founders often skip this. You need a valid SSN or ITIN for the responsible party.

## How to submit

You have three options: online (US-based applicants only), by fax (4-business-day turnaround), or by mail (4-6 weeks). International applicants can also call the IRS at 267-941-1099.

## Filing with UFF

Use UFF to fill out your SS-4 digitally. Pick the form, fill in the guided fields, and download a perfectly formatted PDF ready to fax or mail.`,
    category: "guides",
    relatedForm: "ss-4",
    publishedAt: "2025-01-15",
    readingTime: "8 min",
  },
  {
    slug: "ein-for-foreign-founders",
    title: "Getting an EIN as a Foreign Founder: What You Need to Know",
    excerpt: "No SSN? No problem. Here's exactly how international founders can get their EIN from the IRS.",
    content: `If you're forming a US company from outside the United States, getting an EIN is your first real interaction with the IRS. It can feel daunting, but the process is straightforward once you know the steps.

## The challenge for foreign founders

US citizens and residents can apply for an EIN online in minutes. But the IRS online application requires a valid SSN or ITIN — which most foreign founders don't have yet.

## Your options

**Option 1: Apply by fax.** Fill out Form SS-4, fax it to the IRS at (855) 641-6935. You'll receive your EIN by fax within 4 business days. This is the most popular method for international founders.

**Option 2: Apply by phone.** Call the IRS Business & Specialty Tax Line at (267) 941-1099, Monday through Friday, 6am to 11pm Eastern Time. An agent will walk you through the application and issue your EIN immediately. Be prepared for long hold times.

**Option 3: Apply by mail.** Send your completed SS-4 to the IRS. This takes 4-6 weeks. Not recommended unless you have plenty of time.

## The responsible party question

The IRS requires a "responsible party" with a US tax ID (SSN, ITIN, or EIN). As a foreign founder, you have two paths:

1. **Get an ITIN first.** File Form W-7 to get an Individual Taxpayer Identification Number. This takes 7-11 weeks by mail, or you can use a Certifying Acceptance Agent to speed it up.

2. **Use a US-based responsible party.** If you have a US partner, officer, or authorized representative with an SSN, they can be listed as the responsible party.

## After you get your EIN

With your EIN in hand, you can:
- Open a US business bank account
- File your annual tax returns
- Apply for business licenses
- Hire employees or contractors

## Pro tip

Keep your EIN confirmation letter (CP 575) safe. Banks and other institutions will ask for it. If you lose it, you'll need to call the IRS to get a verification letter (147C letter).`,
    category: "guides",
    relatedForm: "ss-4",
    publishedAt: "2025-01-20",
    readingTime: "6 min",
  },
  {
    slug: "ss4-common-mistakes",
    title: "5 Common Mistakes on Form SS-4 (And How to Avoid Them)",
    excerpt: "These are the errors we see most often. Avoid them and save yourself weeks of back-and-forth with the IRS.",
    content: `Form SS-4 looks simple — it's just one page. But small mistakes can delay your EIN by weeks. Here are the five most common errors.

## 1. Legal name doesn't match formation docs

The name on Line 1 of your SS-4 must be identical to the name on your Articles of Organization or Certificate of Formation. If your LLC was formed as "TechCo Solutions, LLC" with a comma, include the comma. If it says "Inc." not "Incorporated," use "Inc."

The IRS will reject applications where the name doesn't match what's on file with your state of formation.

## 2. Listing the company as its own responsible party

Line 7a asks for the "responsible party." Many people write their company name here. The IRS explicitly requires a person — an individual with an SSN, ITIN, or EIN. For single-member LLCs, this is typically the sole member.

## 3. Checking the wrong entity type

Line 9a has multiple entity type options. Foreign-owned LLCs that have elected to be taxed as corporations (via Form 8832) should check "Corporation." Single-member LLCs that haven't made an election are "disregarded entities" — check "Other" and specify.

## 4. Wrong date for "business started"

Line 16 asks when the business started or was acquired. This is the date your entity was officially formed with the state — not the date you started doing business, and not the date you're filling out the form.

## 5. Using a PO Box when not allowed

Lines 4-5 ask for mailing and street addresses. The street address (Lines 5a-5b) cannot be a PO Box. Your mailing address can be. If you're using a registered agent, use their physical office address for the street address.

## How UFF helps

UFF validates your inputs as you fill, flagging required fields and formatting issues before you generate the PDF. This catches most of these mistakes before they reach the IRS.`,
    category: "tips",
    relatedForm: "ss-4",
    publishedAt: "2025-01-25",
    readingTime: "5 min",
  },

  // ── Form 8832 ──
  {
    slug: "entity-classification-election-form-8832",
    title: "Entity Classification Election: A Complete Guide to Form 8832",
    excerpt: "Want your LLC taxed as a corporation? Form 8832 is how you make that election. Here's everything you need to know.",
    content: `By default, the IRS classifies a single-member LLC as a "disregarded entity" and a multi-member LLC as a partnership. Form 8832 lets you change that classification.

## Why elect corporate taxation?

The most common reason international founders file Form 8832 is to elect C-Corporation taxation for their LLC. This is often required when:

- You want to raise venture capital (investors prefer C-Corps)
- You want to issue stock options to employees
- You want to retain earnings in the business at the flat 21% corporate rate
- Your tax advisor recommends it based on your specific situation

## When to file

Form 8832 can be filed:
- Before your LLC starts operating (initial classification)
- After formation, to change your existing classification

**Important:** The effective date of the election can be up to 75 days before the form is filed. So if you formed your LLC on January 1 and file Form 8832 on March 1, you can make the election effective as of January 1.

## Key fields explained

**Line 1 — Type of election.** Choose "initial classification" if you're electing before your first tax return, or "change in current classification" if you're switching.

**Line 2 — Form of election.** Choose the classification you want. For most foreign-owned LLCs wanting corporate treatment, select: "A domestic eligible entity electing to be classified as an association taxable as a corporation."

**Line 3 — Effective date.** Cannot be more than 75 days before filing or more than 12 months after filing.

**Line 4 — Authorized person.** Must be signed by an authorized officer, member, or manager of the entity.

## After filing

Once approved, the IRS will send a confirmation letter. Your LLC will be treated as a corporation for all federal tax purposes from the effective date. You'll file Form 1120 instead of reporting on your personal return.

## Can you reverse it?

Yes, but not easily. If you elect corporate taxation and later want to go back to disregarded entity or partnership treatment, you generally must wait 60 months before making another election.`,
    category: "guides",
    relatedForm: "form-8832",
    publishedAt: "2025-02-01",
    readingTime: "7 min",
  },
  {
    slug: "llc-vs-corporation-tax-election",
    title: "LLC vs Corporation Tax Treatment: When to File Form 8832",
    excerpt: "Not all LLCs should elect corporate taxation. Here's how to decide if Form 8832 is right for your business.",
    content: `The beauty of an LLC is flexibility. You get liability protection with your choice of tax treatment. But choosing the right tax classification matters — a lot.

## Default classifications

Without filing Form 8832, the IRS assigns your LLC a default classification:

- **Single-member LLC:** Disregarded entity. All income flows to your personal return.
- **Multi-member LLC:** Partnership. Income flows to each member's return via Schedule K-1.

## When corporate taxation makes sense

**You're raising investment.** VC firms strongly prefer C-Corporations. They need to issue preferred stock, which LLCs technically can't do without some gymnastics.

**You're profitable and want to retain earnings.** The corporate tax rate is a flat 21%. If your personal rate is higher, keeping money in the corporation can be advantageous.

**You want to issue equity compensation.** ISOs (Incentive Stock Options) are only available to employees of corporations.

**Your foreign tax situation benefits from it.** Some countries have tax treaties that provide better treatment for corporations than pass-through entities.

## When to stay as a disregarded entity or partnership

**You're not profitable yet.** Pass-through losses can offset your other income (subject to limitations).

**You want simplicity.** Disregarded entities and partnerships have simpler filing requirements.

**You plan to distribute all profits.** Corporate taxation means double taxation — once at the corporate level (21%) and again when distributed as dividends to shareholders.

## The decision framework

Ask yourself:
1. Am I raising venture capital? → Elect corporation
2. Am I profitable with earnings to retain? → Consider corporation
3. Do I need stock options for employees? → Elect corporation
4. Am I just getting started with no outside investors? → Stay default

Always consult with a CPA who understands your specific situation before making this election. Form 8832 is hard to undo.`,
    category: "explainers",
    relatedForm: "form-8832",
    publishedAt: "2025-02-05",
    readingTime: "6 min",
  },

  // ── Form 1120 ──
  {
    slug: "form-1120-guide-foreign-owned-llc",
    title: "Filing Form 1120 for Your Foreign-Owned LLC",
    excerpt: "If your LLC elected corporate tax treatment, Form 1120 is your annual return. Here's how to approach it.",
    content: `Form 1120 is the U.S. Corporation Income Tax Return. If you filed Form 8832 to elect corporate taxation for your LLC, this is now your annual filing obligation.

## Who files Form 1120?

Any entity classified as a C-Corporation for federal tax purposes. This includes:
- Corporations formed as corporations
- LLCs that elected corporate treatment via Form 8832

## When is it due?

Form 1120 is due on the 15th day of the 4th month after your tax year ends. For calendar-year filers, that's **April 15**. You can get an automatic 6-month extension by filing Form 7004.

## Key sections

**Page 1 — Income.** Report gross receipts, cost of goods sold, and compute gross profit. Then add other income sources like dividends, interest, rents, and royalties.

**Page 1 — Deductions.** Common deductions include compensation of officers, salaries and wages, repairs, rent, taxes and licenses, interest, and depreciation.

**Page 1 — Tax computation.** Taxable income is total income minus total deductions. The corporate tax rate is a flat 21%.

**Schedule L — Balance sheet.** Assets, liabilities, and shareholders' equity at the beginning and end of the tax year.

**Schedule M-1 — Reconciliation.** Reconciles book income with taxable income.

## Foreign-owned LLC specifics

If your LLC is foreign-owned, you almost certainly need to also file Form 5472 alongside Form 1120. The IRS uses Form 5472 to track transactions between the US entity and its foreign owner.

Even if your LLC had zero income and zero expenses, you must still file Form 1120 with Form 5472 attached if you're a foreign-owned entity that has elected corporate treatment.

## Penalties for not filing

The penalty for failing to file Form 1120 on time is 5% of unpaid tax per month, up to 25%. But even more concerning for foreign-owned LLCs: the penalty for failing to file Form 5472 is $25,000 per form, per year.

## Using UFF

UFF walks you through the essential fields of Form 1120. Fill in the guided sections, generate the PDF, and hand it to your CPA for review before filing.`,
    category: "guides",
    relatedForm: "form-1120",
    publishedAt: "2025-02-10",
    readingTime: "7 min",
  },
  {
    slug: "form-1120-zero-income-filing",
    title: "Do I Need to File Form 1120 If My LLC Had No Income?",
    excerpt: "Yes. Even with $0 in revenue, foreign-owned LLCs must file. Here's why and how.",
    content: `This is one of the most common questions from international founders. The short answer is: yes, you must file Form 1120 even if your LLC had absolutely no income.

## Why zero-income filing is required

If your LLC elected corporate tax treatment (or is treated as a corporation by default), the IRS expects an annual Form 1120 regardless of revenue. The IRS needs to know about your entity's financial position, even if that position is $0.

## The Form 5472 connection

For foreign-owned LLCs, the real obligation isn't just Form 1120 — it's Form 5472. The IRS wants to know about all "reportable transactions" between your US entity and its foreign owner. This includes:

- Capital contributions (even your initial LLC funding)
- Loans from you to the LLC or vice versa
- Paying for LLC expenses from personal funds
- Any payments between you and the LLC

That $100 you transferred to your LLC's bank account to keep it open? That's a reportable transaction.

## What a zero-income filing looks like

Your Form 1120 will show:
- $0 gross receipts
- $0 (or minimal) deductions
- $0 taxable income
- $0 tax due

Attach Form 5472 reporting any transactions between you and the LLC.

## Penalties for skipping it

- **Form 1120 late filing:** 5% of unpaid tax per month (which is $0 if you owe nothing, but the IRS can still assess minimum penalties)
- **Form 5472 late filing:** $25,000 per form. This is the one that hurts. The IRS is serious about foreign ownership reporting.

## Deadlines

Same as regular Form 1120: April 15 for calendar-year filers. File Form 7004 for an automatic 6-month extension to October 15.`,
    category: "explainers",
    relatedForm: "form-1120",
    publishedAt: "2025-02-15",
    readingTime: "5 min",
  },

  // ── Form 5472 ──
  {
    slug: "form-5472-complete-guide",
    title: "Form 5472: The Filing Every Foreign-Owned LLC Must Know About",
    excerpt: "The $25,000 penalty form. Here's how to fill it out correctly and avoid the IRS's attention.",
    content: `Form 5472 is an information return that reports transactions between a 25% foreign-owned US corporation (or LLC treated as a corporation) and its foreign owners. It's one of the most important — and most penalized — filings for international founders.

## Who must file?

Any US entity that is at least 25% foreign-owned AND had "reportable transactions" during the tax year. For most single-member LLCs owned by foreign individuals, this means you.

## What counts as a reportable transaction?

Almost everything:
- Capital contributions (money you put into the LLC)
- Loans to or from the LLC
- Payments for services
- Rent payments
- Interest payments
- Any other monetary exchange between you and the LLC

**The key insight:** Even your initial capital contribution when forming the LLC is a reportable transaction. If you put $1,000 into your LLC bank account, that goes on Form 5472.

## Walking through the form

**Part I — Reporting Corporation.** Your LLC's name, EIN, address, country of incorporation (your state of formation), and total assets.

**Part II — 25% Foreign Shareholder.** Your personal information as the foreign owner. Name, address, country of citizenship, and US taxpayer ID (if you have one).

**Part III — Related Party.** Information about the related party involved in the transactions. For most single-member LLCs, this is the same as Part II.

**Part IV — Monetary Transactions.** This is the meat of the form. Report dollar amounts for each category of transaction:
- Capital contributions received
- Loans from/to foreign owner
- Interest paid/received
- Rents paid/received
- Royalties paid/received
- Amounts paid/received for services

**Part V — Reportable Transactions of a Section 721(c) Partnership.** Skip this unless your CPA tells you otherwise.

## The $25,000 penalty

The penalty for failing to file Form 5472, or filing with incomplete information, is $25,000 per form per year. This penalty applies even if you owe zero tax. The IRS has been actively enforcing this penalty against foreign-owned LLCs.

## Tips for accuracy

1. Keep meticulous records of every transaction between you and your LLC
2. Even small amounts matter — $50 for a domain registration paid from personal funds
3. File on time. The penalty for late filing is the same as not filing
4. When in doubt, report more rather than less

## Filing with Form 1120

Form 5472 is always filed as an attachment to Form 1120. You cannot file it standalone. Even if your LLC had no income, file Form 1120 with Form 5472 attached.`,
    category: "guides",
    relatedForm: "form-5472",
    publishedAt: "2025-02-20",
    readingTime: "8 min",
  },
  {
    slug: "form-5472-reportable-transactions",
    title: "What Counts as a Reportable Transaction on Form 5472?",
    excerpt: "That $50 wire transfer? Reportable. That domain you bought with your personal card? Also reportable.",
    content: `The IRS casts a wide net with Form 5472. Almost any financial interaction between you (the foreign owner) and your US LLC is a "reportable transaction." Here's a practical breakdown.

## The IRS definition

A reportable transaction is any monetary transaction between the reporting corporation and a foreign related party. The IRS groups these into categories:

## Category 1: Capital contributions

**What it includes:**
- Initial funding when you open the LLC bank account
- Additional investments into the LLC
- Converting personal expenses to business use

**Example:** You form your Wyoming LLC and wire $5,000 from your Turkish bank account to the LLC's Mercury bank account. Report $5,000 as "Capital contributions received."

## Category 2: Loans

**What it includes:**
- Formal loans with promissory notes
- Informal advances ("I'll put money in now and take it out later")
- The LLC lending money back to you

**Example:** Your LLC needs $10,000 to cover expenses but doesn't have revenue yet. You loan $10,000 from personal funds. Report under "Loans from foreign owner."

## Category 3: Interest

**What it includes:**
- Interest paid on any loans between you and the LLC
- Imputed interest on below-market loans (this is complex — ask your CPA)

## Category 4: Rents

**What it includes:**
- If you rent office space to your LLC
- If your LLC pays rent for property you own

## Category 5: Services

**What it includes:**
- Payments for services you provide to the LLC (management fees, consulting)
- Payments for services the LLC provides to you (rare but possible)

**Example:** You're the sole member-manager of your LLC. The LLC pays you $3,000/month as a management fee. Report $36,000 under "Amounts paid for services."

## Category 6: Other amounts

**The catch-all.** Anything that doesn't fit above:
- Expense reimbursements
- Purchase of assets
- Distribution of profits

## What is NOT reportable

- Transactions between the LLC and unrelated third parties (customers, vendors)
- Transactions between the LLC and other US entities that are not foreign-owned

## Record-keeping tip

Open a spreadsheet on January 1 each year. Log every single transaction between you and your LLC with the date, amount, and description. This makes Form 5472 filing trivial.`,
    category: "explainers",
    relatedForm: "form-5472",
    publishedAt: "2025-02-25",
    readingTime: "7 min",
  },
  {
    slug: "form-5472-penalties-how-to-avoid",
    title: "The $25,000 Form 5472 Penalty: How to Avoid It",
    excerpt: "The IRS doesn't play around with foreign ownership reporting. Here's how to stay on the right side.",
    content: `The Form 5472 penalty is one of the steepest in the IRS code for what is essentially an information return. No tax is due with this form — it's purely informational. Yet the penalty for getting it wrong is $25,000.

## How the penalty works

The IRS assesses a $25,000 penalty for:
- Failing to file Form 5472
- Filing late
- Filing with substantially incomplete information
- Filing with inaccurate information

This penalty is per form, per year. If you had two reportable years you missed, that's $50,000.

## Can you get the penalty abated?

Yes, but it's not guaranteed. The two main paths:

**Reasonable cause.** If you can demonstrate that you had reasonable cause for the failure and acted in good faith, the IRS may waive the penalty. Common arguments include:
- You relied on professional advice that turned out to be wrong
- You were unaware of the filing requirement despite reasonable diligence
- Circumstances beyond your control prevented timely filing

**First-time penalty abatement.** If you have a clean compliance history (filed and paid on time for the prior 3 years), you may qualify for automatic abatement.

## Prevention checklist

1. **Know your deadlines.** Form 5472 is due with Form 1120 — April 15 for calendar-year filers.
2. **File Form 7004 for an extension** if you need more time. This extends the deadline to October 15.
3. **Keep transaction records** throughout the year. Don't scramble at tax time.
4. **File even if transactions seem immaterial.** A $200 capital contribution is still reportable.
5. **Work with a CPA who knows foreign ownership.** Not all CPAs are familiar with Form 5472.
6. **Use UFF to ensure completeness.** Our guided form filling ensures you don't miss required fields.

## If you've already missed a filing

Don't panic, but act quickly:
1. Prepare the delinquent Form 5472 and Form 1120
2. Write a reasonable cause statement explaining why the filing is late
3. File as soon as possible — the longer you wait, the weaker your reasonable cause argument
4. Consider working with a tax attorney if significant penalties are already assessed`,
    category: "tips",
    relatedForm: "form-5472",
    publishedAt: "2025-03-01",
    readingTime: "6 min",
  },

  // ── Form 1065 ──
  {
    slug: "form-1065-partnership-return-guide",
    title: "Filing Form 1065: Partnership Income Tax Return Explained",
    excerpt: "Running a multi-member LLC? Form 1065 is your annual filing. Here's the complete walkthrough.",
    content: `Form 1065 is the annual information return for partnerships and multi-member LLCs that haven't elected corporate treatment. Unlike Form 1120, Form 1065 itself doesn't calculate any tax — partnerships are pass-through entities.

## Who files Form 1065?

- Multi-member LLCs (default classification)
- General partnerships
- Limited partnerships
- LLPs (Limited Liability Partnerships)

## Key concept: Pass-through taxation

A partnership doesn't pay income tax itself. Instead, it "passes through" income, deductions, and credits to each partner. Each partner reports their share on their individual tax return. Form 1065 is the vehicle that calculates each partner's share.

## Important sections

**Page 1 — Income.** Gross receipts, cost of goods sold, gross profit, and other income. This looks similar to Form 1120.

**Page 1 — Deductions.** Salaries and wages, guaranteed payments to partners, rent, taxes, interest, depreciation, and other deductions.

**Schedule K — Partners' Distributive Share Items.** This is the summary of everything that gets passed through to partners: ordinary income, rental income, interest, dividends, capital gains, Section 179 deductions, charitable contributions, and more.

**Schedule K-1 — Per Partner.** One Schedule K-1 is prepared for each partner, showing their specific share of each item on Schedule K.

## Guaranteed payments

If partners receive guaranteed payments (similar to a salary but for partners), these are reported on Form 1065 as both income to the partner and a deduction for the partnership.

## Deadlines

Form 1065 is due on the 15th day of the 3rd month after the tax year ends. For calendar-year partnerships, that's **March 15**. Earlier than Form 1120!

File Form 7004 for an automatic 6-month extension to September 15.

## Penalties

The penalty for late filing of Form 1065 is $235 per partner per month, for up to 12 months. A 3-partner LLC that's 6 months late faces a $4,230 penalty.

## Using UFF

UFF guides you through the essential fields of Form 1065. Fill in the partnership details, income, deductions, and partner information, then generate a clean PDF.`,
    category: "guides",
    relatedForm: "form-1065",
    publishedAt: "2025-03-05",
    readingTime: "7 min",
  },
  {
    slug: "schedule-k1-explained",
    title: "Schedule K-1: Understanding Your Partner's Share",
    excerpt: "Every partner gets a K-1. Here's what all those boxes mean and how they affect your personal taxes.",
    content: `Schedule K-1 (Form 1065) is the document that tells each partner exactly what to report on their personal tax return. If you're a partner in a US partnership or multi-member LLC, you'll receive one of these each year.

## What is Schedule K-1?

Think of it as a partnership's version of a W-2. Instead of reporting wages, it reports your share of the partnership's income, deductions, credits, and other items.

## Part I — Information about the partnership

Basic details: partnership name, EIN, and address. This should match what's on Form 1065.

## Part II — Information about the partner

Your name, address, tax ID, and partnership details:
- **Partner type:** General, limited, or LLC member-manager
- **Domestic or foreign partner:** Important for withholding purposes
- **Profit/loss/capital sharing percentages:** These determine your share of each item

## Part III — Partner's share of current year items

This is the meat of the K-1. Key boxes include:

**Box 1 — Ordinary business income (loss).** Your share of the partnership's ordinary business profit or loss.

**Box 2 — Net rental real estate income (loss).** If the partnership has rental properties.

**Box 4 — Guaranteed payments.** Any guaranteed payments you received (these are taxable to you regardless of the partnership's profitability).

**Box 5 — Interest income.** Your share of interest earned by the partnership.

**Box 6 — Dividends.** Your share of dividend income.

**Box 8-9 — Capital gains and losses.** Short-term and long-term capital gains or losses from partnership transactions.

**Box 14 — Self-employment earnings.** Important for calculating self-employment tax.

## For foreign partners

If you're a foreign partner, special rules apply:
- The partnership may need to withhold tax on your share of effectively connected income
- You may need to file Form 1040-NR
- Tax treaty benefits may apply

## Common confusion

**"I received a K-1 showing income, but I didn't receive any cash."** This is normal. Partnerships pass through income whether or not it's distributed. You may owe tax on income the partnership retained.

**"My K-1 shows a loss. Can I deduct it?"** Maybe. Losses are limited by your basis in the partnership, at-risk rules, and passive activity loss rules.`,
    category: "explainers",
    relatedForm: "schedule-k1",
    publishedAt: "2025-03-10",
    readingTime: "7 min",
  },

  // ── FinCEN BOI ──
  {
    slug: "fincen-boi-beneficial-ownership-guide",
    title: "FinCEN BOI Report: What Every Business Owner Must File",
    excerpt: "The Corporate Transparency Act requires most US companies to report their beneficial owners. Here's your complete guide.",
    content: `Starting January 1, 2024, most US companies must file a Beneficial Ownership Information (BOI) report with the Financial Crimes Enforcement Network (FinCEN). This is a new requirement under the Corporate Transparency Act.

## Who must file?

Most corporations, LLCs, and other entities created by filing with a state must report. This includes:
- LLCs
- Corporations
- Limited partnerships
- Any entity created by filing a document with a secretary of state

## Who is exempt?

23 categories of entities are exempt, including:
- Large operating companies (20+ US employees, $5M+ revenue, physical US office)
- Banks, credit unions, and other regulated financial institutions
- Tax-exempt organizations
- Publicly traded companies

Most small businesses and startup LLCs are NOT exempt.

## What information is reported?

**About the company:**
- Legal name and any trade names (DBAs)
- Address
- State of formation
- Tax identification number (EIN or SSN)

**About each beneficial owner:**
- Full legal name
- Date of birth
- Residential address
- ID document (passport, driver's license, or state ID) — number and image

## Who is a beneficial owner?

Any individual who:
1. Exercises substantial control over the company, OR
2. Owns or controls at least 25% of the company

For a single-member LLC, the sole member is always a beneficial owner.

## Deadlines

- **Companies formed before January 1, 2024:** Must file by January 1, 2025
- **Companies formed in 2024:** Must file within 90 days of formation
- **Companies formed in 2025 and later:** Must file within 30 days of formation

## How to file

BOI reports are filed electronically through FinCEN's website at boiefiling.fincen.gov. There is no paper filing option. The filing is free.

## Penalties

Willful failure to file can result in:
- Civil penalties of up to $500 per day
- Criminal penalties of up to 2 years imprisonment and $10,000 fine

## Using UFF

UFF helps you organize the information you'll need before filing on FinCEN's website. Fill out our guided form to prepare your data, then use it as a reference when filing electronically.`,
    category: "guides",
    relatedForm: "fincen-boi",
    publishedAt: "2025-03-15",
    readingTime: "7 min",
  },
  {
    slug: "fincen-boi-for-foreign-owned-llcs",
    title: "BOI Reporting for Foreign-Owned LLCs: Special Considerations",
    excerpt: "International founders have unique challenges with BOI reporting. Non-US passports, foreign addresses, and more.",
    content: `If you're a foreign founder with a US LLC, the FinCEN BOI report has some unique requirements you need to be aware of.

## You're almost certainly a beneficial owner

As the foreign owner of a US LLC, you exercise substantial control and/or own 25%+ of the entity. You are a beneficial owner and must be reported.

## ID document requirements

FinCEN accepts the following ID documents:
1. **Non-US passport** — This is the most common for international founders
2. US driver's license
3. State-issued ID

If you don't have a US-issued document, you must provide a non-US passport AND a secondary document showing proof of US address (if you have one).

**Important:** You must upload an image of the ID document. Make sure it's clear and legible.

## Foreign addresses are acceptable

Unlike some IRS forms, the BOI report allows foreign residential addresses for beneficial owners. You don't need a US address.

## Company applicant vs. beneficial owner

The BOI report also asks about "company applicants" — the person(s) who filed the formation documents. This could be:
- You, if you filed directly
- A registered agent or attorney who filed on your behalf

Companies formed before 2024 do not need to report company applicants.

## Multiple entities

If you own multiple US LLCs, each one needs its own BOI report. There's no consolidated filing.

## Updating the report

If your information changes (new address, new passport, change in ownership), you must file an updated report within 30 days. This is an ongoing obligation, not a one-time filing.`,
    category: "explainers",
    relatedForm: "fincen-boi",
    publishedAt: "2025-03-18",
    readingTime: "5 min",
  },

  // ── Form 1040-NR ──
  {
    slug: "form-1040-nr-nonresident-alien-guide",
    title: "Form 1040-NR: The Nonresident Alien's Tax Return",
    excerpt: "If you have US-source income but aren't a US person, Form 1040-NR is your individual tax return.",
    content: `Form 1040-NR is the individual income tax return for nonresident aliens. If you're a foreign individual with income from US sources, this may be your filing obligation.

## Who files Form 1040-NR?

You file Form 1040-NR if you are a nonresident alien who:
- Had US-source income that is effectively connected with a US trade or business
- Had US-source income on which tax was not fully withheld
- Want to claim a refund of overpaid or overwithheld tax
- Want to claim the benefit of a tax treaty

## Resident vs. nonresident: How to determine

You're generally a **resident alien** if you meet either:
1. **Green Card Test:** You had a green card at any point during the year
2. **Substantial Presence Test:** You were in the US for 31+ days in the current year AND 183+ days over a 3-year period (using a weighted formula)

If you meet neither test, you're a **nonresident alien** and file Form 1040-NR.

## Types of US-source income

**Effectively Connected Income (ECI):** Income from a US trade or business. Taxed at graduated rates (same as US citizens). Common examples: self-employment income, partnership income, rental income from active management.

**FDAP Income:** Fixed, Determinable, Annual, or Periodical income. Taxed at a flat 30% (or lower treaty rate). Examples: dividends, interest, royalties, rents (passive).

## Key differences from Form 1040

- No standard deduction (you get itemized deductions related to ECI only)
- Different filing status options
- Tax treaty benefits may reduce rates
- Different rules for dependents

## Deadlines

- **If you had wages subject to withholding:** April 15
- **If you had no wages subject to withholding:** June 15
- Extension available by filing Form 4868

## Common for international founders

If you're a foreign founder who:
- Received guaranteed payments from a US partnership → File 1040-NR
- Had effectively connected income through your LLC → File 1040-NR
- Had US dividends or interest → May need 1040-NR or may be covered by withholding`,
    category: "guides",
    relatedForm: "form-1040-nr",
    publishedAt: "2025-03-20",
    readingTime: "7 min",
  },
  {
    slug: "substantial-presence-test-explained",
    title: "The Substantial Presence Test: Am I a US Tax Resident?",
    excerpt: "183 days, weighted formula, exceptions — here's how to figure out if you're considered a US tax resident.",
    content: `Before you can determine which tax return to file, you need to know whether the IRS considers you a resident or nonresident alien. The Substantial Presence Test (SPT) is the primary way to figure this out.

## The formula

You're a US tax resident under the SPT if:
1. You were in the US for at least **31 days** during the current year, AND
2. The sum of the following equals **183 days or more:**
   - All days in the current year, PLUS
   - 1/3 of the days in the prior year, PLUS
   - 1/6 of the days in the year before that

## Example

- 2024: 120 days in the US
- 2023: 90 days in the US
- 2022: 60 days in the US

Calculation: 120 + (90 × 1/3) + (60 × 1/6) = 120 + 30 + 10 = 160 days

Result: 160 < 183, so you're NOT a resident under the SPT for 2024.

## Exceptions

**Closer Connection Exception.** Even if you meet the 183-day threshold, you may still be treated as a nonresident if:
- You were in the US for fewer than 183 actual days in the current year
- You have a closer connection to a foreign country (your "tax home" is abroad)
- You file Form 8840 to claim this exception

**Exempt individuals.** Certain people don't count days toward the SPT:
- Foreign government-related individuals (A/G visa holders)
- Teachers and trainees (J/Q visa holders) — first 2 calendar years
- Students (F/J/M/Q visa holders) — first 5 calendar years
- Professional athletes competing in charitable events

## Why it matters

- **Resident alien:** File Form 1040 (same as US citizens). Taxed on worldwide income.
- **Nonresident alien:** File Form 1040-NR. Taxed only on US-source income.

The difference can be enormous. A resident alien with $500,000 in foreign income owes US tax on all of it. A nonresident alien with the same foreign income owes nothing to the IRS (on that foreign income).

## Digital nomads beware

If you're traveling to the US frequently for business, keep a careful count of your days. Even transit days count (unless you're in transit and don't conduct business). Use a calendar app or spreadsheet to track your US presence.`,
    category: "explainers",
    relatedForm: "form-1040-nr",
    publishedAt: "2025-03-25",
    readingTime: "6 min",
  },

  // ── W-8BEN ──
  {
    slug: "w8ben-guide-for-individuals",
    title: "W-8BEN: Certificate of Foreign Status for Individuals",
    excerpt: "Working with US companies as a foreign individual? They'll ask for your W-8BEN. Here's how to fill it.",
    content: `Form W-8BEN is one of the most commonly requested forms for foreign individuals doing business with US companies. It certifies that you are not a US person and may qualify for reduced withholding rates under a tax treaty.

## When do you need a W-8BEN?

You'll be asked to provide a W-8BEN when:
- A US company pays you for services (freelancing, consulting)
- You receive dividends from US stocks
- You receive interest from US bank accounts or bonds
- You receive royalties from US sources
- Any US entity needs to determine your tax status

## Who provides W-8BEN to whom?

**You** (the foreign individual) provide W-8BEN to the **US entity** paying you. It's not filed with the IRS directly — the US entity keeps it on file and may submit it with their own tax filings.

## Key fields

**Part I — Identification**

- **Line 1 — Name.** Your legal name as it appears on your passport or ID.
- **Line 2 — Country of citizenship.** Your citizenship, not where you live.
- **Line 3 — Permanent residence address.** Your home address in your country of residence.
- **Line 5 — US taxpayer identification number.** Your SSN or ITIN, if you have one. Not required for all situations.
- **Line 6 — Foreign tax ID.** Your tax ID in your country of residence (e.g., T.C. Kimlik No for Turkey, NIF for Spain).
- **Line 7 — Reference number.** Optional. The paying entity may assign you a reference number.
- **Line 8 — Date of birth.** Required.

**Part II — Tax Treaty Benefits**

If your country has a tax treaty with the US, you can claim a reduced withholding rate:

- **Line 9 — Treaty country.** The country under whose treaty you're claiming benefits.
- **Line 10 — Special rates and conditions.** The specific treaty article, rate, and type of income.

**Example:** A Turkish citizen earning freelance income from a US company could claim benefits under Article 14 (Independent Personal Services) of the US-Turkey tax treaty, potentially reducing withholding from 30% to 0% on certain service income.

**Part III — Certification**

Sign and date the form. A W-8BEN is valid for 3 years from the date of signing (through December 31 of the third year).

## Common mistakes

1. **Not claiming treaty benefits.** Many people leave Part II blank, missing out on reduced withholding rates.
2. **Using the wrong form.** Entities should use W-8BEN-E, not W-8BEN.
3. **Expired forms.** If your W-8BEN is more than 3 years old, the paying entity must withhold at 30%.

## Filing with UFF

Use UFF to fill out W-8BEN correctly. Our guided flow walks you through each field with explanations, then generates a clean PDF ready to send to the requesting party.`,
    category: "guides",
    relatedForm: "w-8ben",
    publishedAt: "2025-04-01",
    readingTime: "7 min",
  },
  {
    slug: "tax-treaties-withholding-rates",
    title: "US Tax Treaties: How to Reduce Withholding on Your US Income",
    excerpt: "The US has tax treaties with over 60 countries. Here's how they work and how to claim the benefits.",
    content: `Tax treaties are bilateral agreements between the US and other countries designed to prevent double taxation and reduce withholding rates. If your country has a treaty with the US, you may be leaving money on the table.

## How withholding works without a treaty

When a US company pays a foreign individual, they're generally required to withhold 30% of the payment for federal income tax. This applies to:
- Dividends
- Interest
- Royalties
- Service payments (in some cases)
- Other FDAP income

## How treaties help

Tax treaties can reduce the 30% withholding rate to as low as 0%. The specific rate depends on:
1. Your country of residence
2. The type of income
3. The specific treaty article

## Common treaty rates (selected countries)

**Dividends:**
- Turkey: 15% (20% for portfolio dividends)
- UK: 15%
- Germany: 15%
- India: 25%
- Canada: 15%

**Interest:**
- Turkey: 10%
- UK: 0%
- Germany: 0%
- India: 15%
- Canada: 10%

**Royalties:**
- Turkey: 10%
- UK: 0%
- Germany: 0%
- India: 15%
- Canada: 10%

**Independent personal services:**
Many treaties reduce withholding on service income to 0%, provided the individual doesn't have a fixed base in the US.

## How to claim treaty benefits

1. **Determine eligibility.** You must be a resident of a treaty country.
2. **Identify the correct treaty article.** Different articles cover different types of income.
3. **Fill out Form W-8BEN (individuals) or W-8BEN-E (entities).** Complete Part II with the treaty country, article, rate, and income type.
4. **Provide the form to the US payer.** They will apply the reduced rate.

## Limitation on Benefits (LOB)

Most modern US tax treaties include a Limitation on Benefits article. This prevents "treaty shopping" — setting up entities in treaty countries just to get reduced rates. You must have a genuine connection to the treaty country.

## When treaties don't help

- If your income is "effectively connected" with a US trade or business, it's taxed at regular graduated rates regardless of treaties
- Some types of income aren't covered by treaties
- If you fail to provide a valid W-8BEN, the payer must withhold at 30%`,
    category: "explainers",
    relatedForm: "w-8ben",
    publishedAt: "2025-04-05",
    readingTime: "7 min",
  },

  // ── W-8BEN-E ──
  {
    slug: "w8ben-e-guide-for-entities",
    title: "W-8BEN-E: Certificate of Foreign Status for Entities",
    excerpt: "The most complex W-8 form. Here's how foreign entities certify their status for US withholding purposes.",
    content: `Form W-8BEN-E is the entity version of W-8BEN. It's used by foreign entities (corporations, partnerships, trusts) to certify their foreign status, claim treaty benefits, and declare their FATCA classification.

## When is W-8BEN-E needed?

Your foreign entity will need to provide W-8BEN-E when:
- Receiving payments from US companies (services, licenses, royalties)
- Opening a US financial account (some banks)
- Investing in US securities
- Any US withholding agent requests it

## Why is it so long?

W-8BEN-E is 8 pages because it covers FATCA (Foreign Account Tax Compliance Act) classifications. FATCA requires foreign financial institutions to report US account holders, and W-8BEN-E is the mechanism for determining FATCA status.

## Key sections

**Part I — Identification.** Entity name, country of incorporation, entity type, address, and tax IDs.

**Part I, Line 5 — FATCA status.** This is critical. You must check one of 30+ FATCA classifications. The most common for non-financial entities:
- **Active NFFE** (Non-Financial Foreign Entity) — if less than 50% of your income is passive
- **Passive NFFE** — if 50% or more of your income is passive

**Part III — Tax treaty benefits.** Similar to W-8BEN but for entities. Treaty country, article, rate, and income type.

**Parts IV through XXVIII** — These are specific to various FATCA classifications. Most non-financial entities only need to complete Part XXV (Active NFFE) or Part XXVI (Passive NFFE).

**Part XXX — Certification.** Signature and date.

## For software companies and startups

If your foreign entity provides SaaS, consulting, or other services to US clients:
- Your FATCA status is likely "Active NFFE" (most of your income is from active business)
- You may claim treaty benefits on service income
- The W-8BEN-E is valid for 3 years

## Common pitfalls

1. **Wrong FATCA status.** If unsure, start with Active NFFE (if your business earns active income).
2. **Missing GIIN.** Only needed for financial institutions. Non-financial entities can leave blank.
3. **Skipping treaty benefits.** Like W-8BEN, many entities miss treaty rate reductions.

## UFF simplifies this

W-8BEN-E is notoriously complex. UFF focuses on the most common fields and walks you through each section with clear explanations. Generate a properly filled PDF in minutes instead of hours.`,
    category: "guides",
    relatedForm: "w-8ben-e",
    publishedAt: "2025-04-10",
    readingTime: "8 min",
  },
  {
    slug: "fatca-nffe-classification",
    title: "FATCA for Non-Financial Entities: Active NFFE vs Passive NFFE",
    excerpt: "Most foreign companies are NFFEs. But are you active or passive? The distinction matters for W-8BEN-E.",
    content: `FATCA (Foreign Account Tax Compliance Act) requires all foreign entities to classify themselves for US tax purposes. If you're not a bank, fund, or insurance company, you're almost certainly a Non-Financial Foreign Entity (NFFE). But which kind?

## Active NFFE

You're an Active NFFE if less than 50% of your gross income for the preceding calendar year is passive income, AND less than 50% of your assets produce or are held for passive income.

**Passive income includes:**
- Dividends
- Interest
- Rents (unless actively managed)
- Royalties
- Annuities
- Capital gains from selling assets that produce passive income

**Active income includes:**
- Revenue from services
- Revenue from selling goods
- Revenue from SaaS subscriptions
- Consulting fees
- Manufacturing revenue

**If you run an actual business** (software company, consulting firm, e-commerce store, agency), you're almost certainly an Active NFFE.

## Passive NFFE

You're a Passive NFFE if 50% or more of your gross income is passive. Common examples:
- Holding companies that primarily earn dividends
- Investment vehicles
- Companies that primarily license IP and earn royalties
- Companies with large cash holdings earning mostly interest

## Why the distinction matters

**Active NFFE:** No additional reporting required on W-8BEN-E. Complete Part XXV with a simple certification.

**Passive NFFE:** Must disclose "substantial US owners" — any US person who owns 10%+ of the entity. Complete Part XXVI with owner details. This is FATCA's way of finding US persons hiding money in foreign entities.

## For international founders

If you're a non-US person running a foreign company that provides services to US clients:
- You're an Active NFFE
- Check the Active NFFE box on W-8BEN-E Part I, Line 5
- Complete Part XXV
- No US owner disclosure needed (you're not a US person)

## Edge cases

**Startups with no revenue yet?** Look at your assets. If your assets are primarily for business operations (equipment, IP you're developing), you're likely Active NFFE. If your only asset is a bank account earning interest, you might be Passive NFFE.

**Mixed income?** Use the 50% threshold. If 60% of your income is from services and 40% from investments, you're Active NFFE.`,
    category: "explainers",
    relatedForm: "w-8ben-e",
    publishedAt: "2025-04-15",
    readingTime: "6 min",
  },

  // ── Form 7004 ──
  {
    slug: "form-7004-business-extension-guide",
    title: "Form 7004: How to Get a 6-Month Extension for Business Tax Returns",
    excerpt: "Not ready to file? Form 7004 gives you an automatic 6-month extension. Here's how to file it.",
    content: `Form 7004 is your lifeline when you can't file your business tax return on time. It provides an automatic 6-month extension for most business return types.

## What does "automatic" mean?

Unlike individual extensions (Form 4868) where the IRS might reject your request, Form 7004 extensions are automatic. If you file the form correctly and on time, your extension is granted. No explanation needed.

## Which returns does Form 7004 cover?

- Form 1120 (Corporation) — extends from April 15 to October 15
- Form 1065 (Partnership) — extends from March 15 to September 15
- Form 1120-S (S Corporation) — extends from March 15 to September 15
- Form 1041 (Estate/Trust) — extends from April 15 to October 15
- Several other business returns

## How to fill it out

Form 7004 is refreshingly simple — just one page.

**Line 1 — Entity information.** Name, EIN, and address.

**Line 2 — Form code.** A two-digit code identifying which return you're extending. Common codes:
- 04 = Form 1065
- 12 = Form 1120
- 25 = Form 1120-S

**Lines 3-4 — Tax year.** The beginning and ending dates of the tax year you're extending.

**Lines 5-8 — Tax estimate.** Estimate your total tax liability, total payments/credits, and balance due. If you owe tax, pay with the extension to avoid interest and penalties.

## Key rules

**Extension of time to file ≠ extension of time to pay.** Even with an extension, any tax owed is still due on the original deadline. Interest and penalties accrue on unpaid amounts from the original due date.

**File before the original deadline.** If your Form 1120 is due April 15, file Form 7004 by April 15. A late-filed extension is invalid.

**One form per return.** Each entity and each return type needs its own Form 7004.

## When to use it

- Your CPA needs more time to prepare the return
- You're waiting for K-1s from other partnerships
- Your books aren't closed yet
- You simply need more time

There's no stigma in filing an extension. Millions of businesses do it every year. The IRS expects it.

## Filing with UFF

Use UFF to quickly generate a completed Form 7004. Fill in the basic fields, generate the PDF, and fax or mail it to the IRS before your deadline.`,
    category: "guides",
    relatedForm: "form-7004",
    publishedAt: "2025-04-20",
    readingTime: "6 min",
  },

  // ── Form 4868 ──
  {
    slug: "form-4868-individual-extension-guide",
    title: "Form 4868: Extending Your Individual Tax Return Deadline",
    excerpt: "Need more time for your personal return? Form 4868 gives you until October 15.",
    content: `Form 4868 is the Application for Automatic Extension of Time to File U.S. Individual Income Tax Return. It extends your filing deadline by 6 months — from April 15 to October 15.

## Who files Form 4868?

Anyone who needs more time to file:
- Form 1040 (US citizens and residents)
- Form 1040-NR (Nonresident aliens)
- Form 1040-SR (Seniors)

## How to file

**Option 1 — Electronic.** File through IRS Free File, your tax software, or a tax professional. This is the fastest and most reliable method.

**Option 2 — Paper.** Fill out Form 4868 and mail it to the IRS. Use UFF to generate the PDF.

**Option 3 — Payment as extension.** If you make an electronic tax payment by the original deadline, the IRS automatically treats it as an extension request. No separate form needed.

## Key fields

- **Lines 1-3 — Personal information.** Name, address, SSN.
- **Line 4 — Estimate of total tax liability.** Your best estimate of what you'll owe.
- **Line 5 — Total payments.** Withholding, estimated payments, and credits already applied.
- **Line 6 — Balance due.** Line 4 minus Line 5.
- **Line 7 — Amount you're paying.** Pay as much as you can to minimize interest.

## The payment trap

Just like Form 7004, **an extension to file is not an extension to pay.** Your tax is due on April 15 regardless of the extension. If you don't pay enough by April 15:

- **Interest** accrues from April 15 on the unpaid balance
- **Late payment penalty** of 0.5% per month on the unpaid balance

However, the **late filing penalty** (5% per month, up to 25%) is avoided by filing the extension. This is why filing Form 4868 is always better than simply not filing.

## For nonresident aliens

If you file Form 1040-NR and had no wages subject to US withholding, your original deadline is already June 15. Filing Form 4868 extends it to December 15.

## Pro tip

Even if you think you'll owe nothing, file Form 4868 anyway. It's free insurance against the late filing penalty if it turns out you do owe.`,
    category: "guides",
    relatedForm: "form-4868",
    publishedAt: "2025-04-25",
    readingTime: "5 min",
  },

  // ── General tax topics / Scenarios ──
  {
    slug: "us-company-formation-for-international-founders",
    title: "Forming a US Company as an International Founder: The Complete Tax Checklist",
    excerpt: "From LLC formation to first tax filing — every form you'll need in your first year.",
    content: `You've decided to form a US company. Congratulations! Here's the complete checklist of IRS and FinCEN forms you'll encounter in your first year.

## Step 1: Form your entity

This isn't an IRS form — you form your LLC or corporation with a state (Wyoming, Delaware, and Florida are popular). This typically involves:
- Filing Articles of Organization (LLC) or Certificate of Incorporation (Corporation)
- Appointing a registered agent
- Cost: $100-500 depending on the state

## Step 2: Get your EIN (Form SS-4)

Within days of formation, apply for your EIN. You'll need it for everything else. International founders typically apply by fax or phone.

**Timeline:** Same day (phone) to 4 business days (fax)

## Step 3: File FinCEN BOI Report

Within 30 days of formation (for entities formed in 2025+), file your Beneficial Ownership Information report with FinCEN. This is a new requirement.

**Timeline:** Within 30 days of formation

## Step 4: Elect tax classification (Form 8832) — if needed

If you want your LLC taxed as a corporation, file Form 8832. Do this early — the election can be retroactive up to 75 days.

**Timeline:** Within 75 days of formation for retroactive election

## Step 5: Open a bank account

With your EIN, formation documents, and operating agreement, open a US business bank account. Mercury, Relay, and traditional banks all work.

## Step 6: Annual tax filing

At the end of your first tax year, file the appropriate return:

- **Single-member LLC (disregarded):** Form 1120 + Form 5472 (if foreign-owned)
- **LLC taxed as corporation:** Form 1120 + Form 5472 (if foreign-owned)
- **Multi-member LLC:** Form 1065 + Schedule K-1s
- **Individual return (if needed):** Form 1040-NR

## Step 7: Extensions if needed

Can't file on time? File Form 7004 (business) or Form 4868 (individual) before the deadline.

## Annual ongoing obligations

Every year, you'll need to:
1. File your business tax return (Form 1120 or 1065)
2. File Form 5472 if foreign-owned
3. File your state annual report (not an IRS form)
4. Update FinCEN BOI if ownership changes
5. File your personal return (Form 1040-NR) if you have US-source income`,
    category: "scenarios",
    publishedAt: "2025-05-01",
    readingTime: "7 min",
  },
  {
    slug: "annual-tax-calendar-foreign-founders",
    title: "The Annual Tax Calendar for Foreign-Owned US LLCs",
    excerpt: "Mark these dates. Miss them and you'll face penalties. Here's your month-by-month filing calendar.",
    content: `Running a US LLC from abroad means keeping track of multiple deadlines across the year. Here's your complete calendar.

## January

**January 1** — New tax year begins (for calendar-year filers)
**January 15** — Q4 estimated tax payment due (if applicable)
**January 31** — Form W-2 / 1099 deadline for employees and contractors

## March

**March 15** — **Form 1065 due** (Partnership/Multi-member LLC returns)
- File Form 7004 for automatic extension to September 15
- Schedule K-1s must be sent to partners by this date

## April

**April 15** — Multiple deadlines:
- **Form 1120 due** (Corporation returns, including LLCs taxed as corps)
- **Form 5472 due** (attached to Form 1120)
- **Form 1040 / 1040-NR due** (Individual returns)
- Q1 estimated tax payment due
- File Form 7004 or 4868 for extensions

## June

**June 15** — Special deadlines:
- **Form 1040-NR due** (if no wages subject to US withholding — you get an automatic 2-month extension)
- Q2 estimated tax payment due
- FBAR (FinCEN 114) original deadline — automatic extension to October 15

## September

**September 15** — Extended deadline:
- **Form 1065 extended deadline** (if Form 7004 was filed)
- Q3 estimated tax payment due

## October

**October 15** — Extended deadlines:
- **Form 1120 extended deadline** (if Form 7004 was filed)
- **Form 1040/1040-NR extended deadline** (if Form 4868 was filed)
- **FBAR extended deadline**

## Ongoing

**Within 30 days** — Update FinCEN BOI report if beneficial ownership changes
**Within 90 days of formation** — File initial FinCEN BOI report (2024 formations)
**Within 30 days of formation** — File initial FinCEN BOI report (2025+ formations)

## State obligations

Don't forget state-level requirements:
- Annual reports (varies by state — Wyoming is annually in the anniversary month)
- State franchise tax (Delaware charges annually, due June 1)
- State income tax (if applicable to your state of formation)

## Pro tip

Set calendar reminders 30 days before each deadline. This gives you time to prepare or file for extensions.`,
    category: "tips",
    publishedAt: "2025-05-05",
    readingTime: "6 min",
  },
  {
    slug: "wyoming-llc-tax-obligations",
    title: "Wyoming LLC: What Tax Forms Do You Actually Need to File?",
    excerpt: "Wyoming has no state income tax, but you still have federal obligations. Here's the complete picture.",
    content: `Wyoming is one of the most popular states for LLC formation, especially for international founders. Zero state income tax, strong privacy laws, and low annual fees. But "no state income tax" doesn't mean "no tax obligations."

## Federal obligations (same regardless of state)

**Single-member LLC owned by a foreign person:**
- Form 1120 (US Corporation Income Tax Return) — even with zero income
- Form 5472 (Foreign-Owned Corporation Information Return)
- Due: April 15 (extension to October 15 with Form 7004)

**Single-member LLC owned by a US person:**
- Schedule C on your personal Form 1040 (disregarded entity)
- Due: April 15

**Multi-member LLC:**
- Form 1065 (Partnership Return)
- Schedule K-1 for each member
- Due: March 15 (extension to September 15 with Form 7004)

**LLC that elected corporate taxation:**
- Form 1120
- Due: April 15

## Wyoming state obligations

**Annual Report:** Due on the first day of the anniversary month of formation. Cost: $60 minimum (based on assets in Wyoming). Filed with the Wyoming Secretary of State.

**State income tax:** None. Wyoming does not impose a state income tax on LLCs or corporations.

**Sales tax:** If you sell taxable goods or services in Wyoming, you may need to collect state sales tax (4%) and local sales tax.

**Property tax:** Only if you own real or tangible personal property in Wyoming.

## Federal obligations that many miss

1. **FinCEN BOI Report** — Required for all LLCs regardless of state
2. **Form 5472** — Required for all foreign-owned LLCs
3. **FBAR (FinCEN 114)** — Required if you have authority over foreign financial accounts exceeding $10,000

## The Wyoming advantage

The main tax advantage of Wyoming is simplicity at the state level. No state income tax return to file. No franchise tax (unlike Delaware). Just a simple annual report.

But remember: your federal tax obligations are identical whether you form in Wyoming, Delaware, Florida, or any other state. The IRS doesn't care which state your LLC is in.`,
    category: "scenarios",
    publishedAt: "2025-05-10",
    readingTime: "6 min",
  },
  {
    slug: "delaware-vs-wyoming-llc",
    title: "Delaware vs Wyoming LLC: Tax Filing Comparison",
    excerpt: "Both are popular for LLC formation. But they have very different ongoing costs and filing requirements.",
    content: `Delaware and Wyoming are the two most popular states for LLC formation. From a tax filing perspective, here's how they compare.

## Formation cost

- **Delaware:** $90 filing fee
- **Wyoming:** $100 filing fee (includes first year annual report)

Roughly equivalent.

## Annual state obligations

**Delaware:**
- Annual franchise tax: $300 flat fee for LLCs (due June 1)
- No annual report for LLCs (corporations have one)
- No state income tax on LLCs with no Delaware operations

**Wyoming:**
- Annual report: $60 minimum (due anniversary month)
- No franchise tax
- No state income tax

**Winner: Wyoming.** $60/year vs $300/year, and Wyoming's annual report is simpler.

## Federal obligations

Identical for both states. The IRS doesn't differentiate:
- Same Form 1120 / 1065 requirements
- Same Form 5472 for foreign-owned LLCs
- Same FinCEN BOI reporting
- Same deadlines

## Privacy

**Delaware:** Manager/member names are not on public filings. But the registered agent and authorized person are public.

**Wyoming:** Similar privacy. No requirement to disclose members/managers in state filings.

## Court system

**Delaware:** Famous Court of Chancery with deep corporate law expertise. Matters more for corporations than LLCs.

**Wyoming:** Standard state courts. Less corporate law precedent.

## When to choose Delaware

- You're raising VC and investors require it
- You anticipate complex corporate governance disputes
- Your attorney specifically recommends it

## When to choose Wyoming

- You want the lowest ongoing costs
- You're a small LLC or solo founder
- You value simplicity
- You don't have investor requirements dictating the state

## The bottom line

For most international founders forming a simple LLC, Wyoming is the better choice. Lower annual costs, simpler filings, and the same federal tax treatment. Delaware's advantages (Court of Chancery, corporate law precedent) matter more for venture-backed corporations.`,
    category: "scenarios",
    publishedAt: "2025-05-15",
    readingTime: "6 min",
  },
  {
    slug: "estimated-tax-payments-guide",
    title: "Estimated Tax Payments: When and How to Pay the IRS Quarterly",
    excerpt: "If you expect to owe $1,000+ in tax, you need to make quarterly estimated payments. Here's how it works.",
    content: `The US tax system is pay-as-you-go. Employees have taxes withheld from each paycheck. Self-employed individuals and business owners must make quarterly estimated tax payments instead.

## Who needs to pay estimated taxes?

You generally must make estimated tax payments if:
1. You expect to owe $1,000 or more when you file your return, AND
2. You expect your withholding and credits to be less than the smaller of:
   - 90% of the tax shown on your current year return, or
   - 100% of the tax on your prior year return

## Quarterly deadlines

- **Q1:** April 15 (for income earned Jan 1 - Mar 31)
- **Q2:** June 15 (for income earned Apr 1 - May 31)
- **Q3:** September 15 (for income earned Jun 1 - Aug 31)
- **Q4:** January 15 of next year (for income earned Sep 1 - Dec 31)

## How to calculate

**Method 1 — Annualized income.** Estimate your annual income, calculate the tax, divide by 4.

**Method 2 — Prior year safe harbor.** Pay 100% of last year's tax liability divided by 4. This guarantees you won't owe an underpayment penalty, even if you earn more this year. (110% if your AGI exceeded $150,000.)

## How to pay

- **IRS Direct Pay** (irs.gov/payments) — free, from a bank account
- **EFTPS** (Electronic Federal Tax Payment System) — free, requires enrollment
- **IRS2Go app** — mobile payments
- **Credit/debit card** — convenience fee applies

## For foreign founders

If you receive guaranteed payments from a US partnership or have effectively connected income, you may owe estimated taxes as an individual on Form 1040-NR.

For foreign-owned LLCs taxed as corporations, the corporation itself may owe estimated tax payments if it expects to owe $500 or more.

## Underpayment penalty

If you don't pay enough estimated tax, the IRS charges a penalty. It's essentially interest on the amount you should have paid. The rate changes quarterly and is currently around 7-8%.

## Pro tip

Overpaying slightly in estimated taxes is better than underpaying. You'll get the excess back as a refund when you file. It's better to receive a small refund than to face an underpayment penalty.`,
    category: "tips",
    publishedAt: "2025-05-20",
    readingTime: "6 min",
  },
  {
    slug: "itin-application-foreign-founders",
    title: "How to Get an ITIN: A Guide for Foreign Founders",
    excerpt: "Need an Individual Taxpayer Identification Number? Here's the step-by-step process.",
    content: `An ITIN (Individual Taxpayer Identification Number) is a 9-digit number issued by the IRS for individuals who need a US tax ID but aren't eligible for a Social Security Number.

## When do you need an ITIN?

- Filing a US tax return (Form 1040-NR)
- Claiming tax treaty benefits
- Being listed as a responsible party on Form SS-4
- Opening certain US financial accounts
- Filing Form 5472 as a foreign individual

## How to apply

**Form W-7** is the ITIN application. You'll need:

1. **Completed Form W-7**
2. **Tax return** — In most cases, you must attach the tax return for which the ITIN is needed
3. **Identity documents** — Original passport (or certified copy from the issuing agency)

## Three ways to submit

**Option 1 — By mail.** Send Form W-7, your tax return, and original identity documents to the IRS ITIN Operation in Austin, TX. Processing: 7-11 weeks. Downside: your original passport will be mailed back, but it's out of your hands for weeks.

**Option 2 — Certifying Acceptance Agent (CAA).** A CAA is an IRS-authorized person who can verify your identity documents and submit your application. You keep your original passport. Processing: 7-11 weeks, but more convenient.

**Option 3 — In person.** Visit an IRS Taxpayer Assistance Center in the US. Bring your documents and Form W-7. This requires being physically in the US.

## Tips for a smooth application

1. **Use a CAA.** It's worth the fee to avoid mailing your passport.
2. **Apply early.** The 7-11 week processing time can conflict with filing deadlines.
3. **Get the tax return right.** A rejected tax return means a rejected ITIN application.
4. **Passport must be current.** Expired passports are not accepted.

## ITIN renewal

ITINs expire if not used on a tax return for 3 consecutive years, or if issued before 2013 (rolling expiration schedule). Renew using the same Form W-7 process.

## After you get your ITIN

Your ITIN looks like an SSN (9 digits, formatted XXX-XX-XXXX) but always starts with the number 9. Use it on tax returns, W-8BEN forms, and any IRS form requiring a taxpayer identification number.`,
    category: "guides",
    publishedAt: "2025-05-25",
    readingTime: "6 min",
  },
  {
    slug: "fbar-foreign-bank-account-reporting",
    title: "FBAR: Do You Need to Report Your Foreign Bank Accounts?",
    excerpt: "If you have authority over foreign accounts exceeding $10,000, the answer is yes. Here's what you need to know.",
    content: `The FBAR (Report of Foreign Bank and Financial Accounts, FinCEN Form 114) is a reporting requirement for US persons who have financial interest in or signature authority over foreign financial accounts.

## Who must file?

Any US person (citizen, resident, or entity) who had a financial interest in or signature authority over foreign financial accounts with an aggregate value exceeding $10,000 at any point during the year.

## Wait — how does this affect international founders?

If you're a foreign person (non-US), FBAR generally doesn't apply to you personally. But:

**Your US LLC may have an FBAR obligation** if the LLC has interest in or authority over foreign bank accounts. For example, if your US LLC has a subsidiary or account in another country.

**If you become a US tax resident** (through the Substantial Presence Test or Green Card), then your personal foreign accounts become reportable.

## What accounts are reportable?

- Bank accounts (checking, savings)
- Securities accounts (brokerage)
- Mutual funds
- Certain insurance policies with cash value
- Pension accounts (in some cases)

## The $10,000 threshold

The $10,000 is the **aggregate** maximum value of ALL foreign accounts combined, at any point during the year. If you have:
- Account A peaked at $6,000
- Account B peaked at $5,000
- Combined peak: $11,000 → You must file

Even if the accounts never simultaneously held $10,000.

## How to file

FBAR is filed electronically through FinCEN's BSA E-Filing System. It cannot be filed on paper.

**Deadline:** April 15, with an automatic extension to October 15. No form needed for the extension.

## Penalties

FBAR penalties are severe:
- **Non-willful violation:** Up to $12,500 per account per year
- **Willful violation:** Up to $100,000 or 50% of the account balance, whichever is greater
- **Criminal penalties:** Up to $250,000 fine and 5 years imprisonment

## FBAR vs FATCA (Form 8938)

These are separate requirements:
- **FBAR** → Filed with FinCEN, lower threshold ($10,000)
- **Form 8938** → Filed with IRS (attached to tax return), higher threshold ($50,000-$200,000 depending on filing status and residency)

You may need to file both.`,
    category: "explainers",
    publishedAt: "2025-06-01",
    readingTime: "7 min",
  },
  {
    slug: "us-tax-for-saas-companies",
    title: "US Tax Obligations for Foreign-Owned SaaS Companies",
    excerpt: "Running a SaaS from abroad with a US LLC? Here's your specific tax filing roadmap.",
    content: `Software-as-a-Service businesses are one of the most common types of companies formed by international founders. Here's the specific tax filing picture for a foreign-owned SaaS LLC.

## Typical structure

- Wyoming or Delaware LLC
- Single foreign owner (or a few foreign co-founders)
- Revenue from US and international customers
- Team may be remote/international

## If you're a single-member LLC (not electing corp status)

Your LLC is a "disregarded entity." But as a foreign-owned disregarded entity, you still must file:
- **Form 1120** — Pro forma return showing the LLC's activity
- **Form 5472** — Reporting transactions between you and the LLC
- **FinCEN BOI** — Beneficial ownership report

## If you elected corporate taxation (Form 8832)

Your LLC is treated as a C-Corporation:
- **Form 1120** — Full corporate income tax return
- **Form 5472** — Foreign ownership transactions
- **FinCEN BOI** — Beneficial ownership report
- **State annual report** — Wyoming, Delaware, etc.

## SaaS-specific considerations

**Revenue recognition.** SaaS revenue is generally recognized ratably over the subscription period. A $1,200 annual subscription started July 1 means $600 of revenue for that tax year.

**R&D tax credits.** If you're developing software in the US (or paying US-based developers), you may qualify for the R&D tax credit. This can offset your tax liability dollar-for-dollar.

**Transfer pricing.** If your US LLC pays your foreign entity (or vice versa) for services, the pricing must be "arm's length" — what unrelated parties would charge. The IRS scrutinizes transfer pricing heavily for foreign-owned entities.

**Sales tax.** SaaS may be subject to state sales tax depending on the state. This is separate from federal income tax and varies widely by state.

**Payment processing.** Stripe, Paddle, and other payment processors may issue 1099-K forms reporting your revenue. This revenue must match what you report on Form 1120.

## Common SaaS LLC tax mistakes

1. **Not filing Form 5472** for capital contributions and intercompany payments
2. **Ignoring transfer pricing** when the US LLC pays the founder's foreign company
3. **Missing state sales tax obligations** as you grow
4. **Not tracking R&D expenses** for potential credits

## Revenue thresholds that matter

- **$0-$250K revenue:** Keep it simple. Form 1120 + 5472. Consider using Form 7004 for extensions.
- **$250K-$1M:** Time to get serious about accounting. Consider a US-based CPA.
- **$1M+:** You need professional tax planning. Transfer pricing documentation becomes important.`,
    category: "scenarios",
    publishedAt: "2025-06-05",
    readingTime: "7 min",
  },
  {
    slug: "freelancer-w8ben-guide",
    title: "Foreign Freelancers Working with US Clients: Forms You Need",
    excerpt: "US clients will ask you for tax forms. Here's which ones, when, and why.",
    content: `If you're a foreign freelancer or contractor working with US clients, you'll encounter tax forms early in the relationship. Here's what to expect.

## The first request: W-8BEN

Almost every US company will ask you to fill out Form W-8BEN before they pay you. This form certifies that you're a foreign person and tells them:
- Your country of tax residence
- Whether you qualify for reduced withholding under a tax treaty
- Your foreign tax ID

**Without a W-8BEN on file,** the US company is required to withhold 30% of your payment and send it to the IRS. With a valid W-8BEN claiming treaty benefits, this rate can drop to 0-15%.

## Do you need an ITIN?

**For services:** Generally no. If your income is from independent personal services and you're performing the work outside the US, many treaty articles exempt the income from US taxation entirely. You don't need an ITIN just to fill out W-8BEN.

**For other income types:** You may need an ITIN to claim treaty benefits on dividends, royalties, or other passive income.

## If you're incorporated

If you work through your own foreign company (not as an individual), you'll need:
- **W-8BEN-E** (the entity version) instead of W-8BEN
- Your company's foreign tax ID
- FATCA classification (likely Active NFFE)

## Do you need to file a US tax return?

**If all your work is performed outside the US** and your income is exempt under a tax treaty: generally no. The W-8BEN handles the withholding side.

**If you perform work in the US** (you travel to the US for client work): you may need to file Form 1040-NR for the income earned while physically in the US.

**If tax was withheld and you believe it shouldn't have been:** File Form 1040-NR to claim a refund.

## The 1099-NEC question

US companies report payments to independent contractors on Form 1099-NEC. For foreign contractors who submitted a valid W-8BEN, the company typically reports on Form 1042-S instead. You don't need to worry about this — it's the company's obligation.

## Practical tips

1. Have your W-8BEN ready before the client asks. It speeds up onboarding.
2. Research your country's tax treaty with the US. Know which articles apply to your income.
3. Include your foreign tax ID on the W-8BEN. Some withholding agents require it.
4. Renew your W-8BEN every 3 years. Set a reminder.
5. Use UFF to generate a properly filled W-8BEN in minutes.`,
    category: "scenarios",
    publishedAt: "2025-06-10",
    readingTime: "6 min",
  },
  {
    slug: "form-1120-vs-1065-which-to-file",
    title: "Form 1120 vs Form 1065: Which Return Does Your LLC File?",
    excerpt: "The answer depends on your LLC's structure and tax elections. Here's a decision tree.",
    content: `One of the most confusing aspects of US LLC taxation is figuring out which return to file. LLCs are flexible entities — the IRS treats them differently based on their structure and elections.

## The decision tree

**Step 1: How many members?**

→ **Single member** → Go to Step 2
→ **Multiple members** → Go to Step 3

**Step 2: Single-member LLC**

Default: Disregarded entity. No separate return (report on owner's return).
- US owner → Schedule C on Form 1040
- Foreign owner → Form 1120 + Form 5472 (special rules for foreign-owned disregarded entities)

Did you file Form 8832 to elect corporate treatment?
- Yes → Form 1120
- No → Follow default above

**Step 3: Multi-member LLC**

Default: Partnership → **Form 1065**

Did you file Form 8832 to elect corporate treatment?
- Yes → **Form 1120**
- No → **Form 1065**

## Summary table

| LLC Type | Election | Return | Due Date |
|----------|----------|--------|----------|
| Single-member, US owner | None | Schedule C (1040) | April 15 |
| Single-member, foreign owner | None | 1120 + 5472 | April 15 |
| Single-member, any owner | Corp (8832) | 1120 | April 15 |
| Multi-member | None | 1065 | March 15 |
| Multi-member | Corp (8832) | 1120 | April 15 |

## Key differences between 1120 and 1065

**Form 1120 (Corporation):**
- Entity pays its own tax at 21% flat rate
- Distributions to owners are taxed again (double taxation)
- Simpler for foreign-owned single-member LLCs

**Form 1065 (Partnership):**
- No entity-level tax (pass-through)
- Each partner reports their share on their personal return
- Requires Schedule K-1 for each partner
- Due earlier (March 15 vs April 15)

## What if you filed the wrong return?

It happens more often than you'd think. If you filed Form 1120 when you should have filed Form 1065 (or vice versa), work with a CPA to:
1. File an amended return on the correct form
2. File Form 8832 if an entity classification election is needed
3. Address any penalties with a reasonable cause statement`,
    category: "explainers",
    publishedAt: "2025-06-15",
    readingTime: "6 min",
  },
  {
    slug: "irs-penalties-guide",
    title: "IRS Penalties for Late Filing: What You'll Pay and How to Avoid It",
    excerpt: "From $25,000 Form 5472 penalties to 5% monthly late filing penalties — here's the complete breakdown.",
    content: `The IRS has a penalty for almost everything. Here are the most common ones that affect international founders and small business owners.

## Late filing penalties

**Form 1120 (Corporation return):**
- 5% of unpaid tax per month, up to 25%
- Minimum penalty for returns over 60 days late: lesser of $510 or 100% of unpaid tax

**Form 1065 (Partnership return):**
- $235 per partner per month, up to 12 months
- A 2-partner LLC that's 6 months late = $2,820

**Form 1040-NR (Individual return):**
- 5% of unpaid tax per month, up to 25%

**Form 5472 (Foreign-owned corporation info):**
- $25,000 per form per year
- This is the big one for foreign founders

## Late payment penalties

**All returns:**
- 0.5% of unpaid tax per month, up to 25%
- Plus interest (currently ~8% annual rate)

**Note:** If both late filing AND late payment penalties apply, the late filing penalty is reduced by the late payment amount. Maximum combined penalty is 5% per month.

## Estimated tax underpayment

- Interest on the underpaid amount, calculated quarterly
- Currently around 8% annual rate

## How to avoid penalties

1. **File on time.** Even if you can't pay, file the return. The late filing penalty (5%/month) is 10x the late payment penalty (0.5%/month).

2. **File extensions.** Form 7004 and Form 4868 are free and automatic. There's no reason not to file them.

3. **Pay what you can.** Partial payment reduces the base for penalty calculations.

4. **Keep records.** If you face a penalty, having organized records supports a reasonable cause argument.

## Getting penalties removed

**First-time penalty abatement (FTA).** If you have a clean history for the prior 3 tax years, you can request automatic removal of penalties for one year. Call the IRS or write a letter.

**Reasonable cause.** If you can show you had a good reason for the failure (illness, natural disaster, reliance on professional advice), the IRS may waive penalties. Write a detailed explanation and include supporting documentation.

**Statutory exceptions.** Certain situations automatically excuse penalties, like being in a federally declared disaster area.

## The cost of procrastination

A quick example: Foreign-owned LLC with $0 tax due, filed 6 months late without extension.
- Form 1120 late filing penalty: $0 (no unpaid tax)
- Form 5472 penalty: $25,000
- Total: $25,000 for a return that reported zero income

File. On. Time.`,
    category: "tips",
    publishedAt: "2025-06-20",
    readingTime: "7 min",
  },
  {
    slug: "bookkeeping-basics-us-llc",
    title: "Bookkeeping Basics for Your US LLC",
    excerpt: "Good books make tax filing easy. Bad books make it expensive. Here's how to set up your books right.",
    content: `Proper bookkeeping isn't just about compliance — it directly affects how painful (or painless) your annual tax filing is.

## Why bookkeeping matters

When it's time to file Form 1120 or Form 1065, your CPA needs:
- Total revenue by category
- All deductible expenses, properly categorized
- Capital contributions and distributions
- Intercompany transactions (for Form 5472)
- Beginning and ending balance sheet

If you don't have organized books, your CPA will charge you significantly more to reconstruct this information.

## Basic setup

**1. Separate bank account.** Never mix personal and business funds. This is the #1 rule. Every dollar in and out of the LLC should flow through the business bank account.

**2. Accounting method.** Choose cash or accrual:
- **Cash basis:** Record income when received, expenses when paid. Simpler.
- **Accrual basis:** Record income when earned, expenses when incurred. Required for some businesses.

Most small LLCs use cash basis.

**3. Chart of accounts.** At minimum:
- Revenue (broken down by category if you have multiple)
- Cost of Goods Sold
- Operating Expenses (rent, software, contractors, etc.)
- Owner's Equity (capital contributions, distributions)
- Bank accounts
- Loans payable / receivable

## Tools

**Simple option:** A spreadsheet tracking every transaction with date, description, amount, and category.

**Better option:** QuickBooks, Xero, or Wave. These connect to your bank account and semi-automate categorization.

**Best option:** A bookkeeper who handles it monthly. Costs $100-300/month for small businesses.

## Monthly routine

1. Categorize all bank transactions
2. Reconcile bank statements
3. Record any transactions not flowing through the bank (credit card charges, intercompany payments)
4. Review for accuracy

## For Form 5472 specifically

Keep a running log of all transactions between you (the foreign owner) and the LLC:
- Date, amount, description, and direction (to LLC or from LLC)
- This makes Form 5472 filing trivial at year-end

## Tax-time deliverables

At year-end, your books should produce:
- Profit & Loss statement
- Balance Sheet
- Transaction detail report
- Intercompany transaction log

Hand these to your CPA and watch them smile.`,
    category: "tips",
    publishedAt: "2025-06-25",
    readingTime: "6 min",
  },
  {
    slug: "choosing-a-cpa-for-foreign-owned-llc",
    title: "How to Choose a CPA for Your Foreign-Owned LLC",
    excerpt: "Not all CPAs understand foreign ownership. Here's what to look for and what to ask.",
    content: `Filing taxes for a foreign-owned US LLC is a niche specialty. Many CPAs have never filed a Form 5472 or dealt with the intricacies of foreign-owned disregarded entities. Choosing the right CPA matters.

## What makes foreign-owned LLC taxation different?

- Form 5472 reporting requirements ($25,000 penalty for mistakes)
- Entity classification elections (Form 8832)
- Tax treaty implications
- Transfer pricing between the LLC and foreign entities
- FBAR and FATCA reporting for the individual
- Coordination with foreign tax obligations

## What to look for

**1. Experience with international clients.** Ask: "How many foreign-owned LLCs do you serve?" You want someone who files Form 5472 regularly, not someone who needs to Google it.

**2. Understanding of tax treaties.** Your CPA should know whether your country's treaty affects your LLC's filing obligations.

**3. Responsiveness.** International founders are often in different time zones. A CPA who takes 2 weeks to respond to emails is a problem.

**4. Fixed-fee pricing.** Hourly billing creates a disincentive to ask questions. Look for CPAs who offer fixed annual fees for LLC tax filings.

**5. E-filing capability.** Your CPA should file electronically. Paper filing is slower and more error-prone.

## Questions to ask

1. "How many Form 5472s did you file last year?"
2. "Are you familiar with my country's tax treaty with the US?"
3. "What's your fee for filing Form 1120 + Form 5472 for a zero-income foreign-owned LLC?"
4. "Can you also help with my personal Form 1040-NR if needed?"
5. "Do you handle FinCEN BOI reporting?"

## Typical costs

- **Zero-income Form 1120 + 5472:** $500-1,500
- **Active Form 1120 + 5472 with bookkeeping:** $1,500-4,000
- **Form 1065 + K-1s:** $1,000-3,000
- **Form 1040-NR:** $500-2,000

## Red flags

- "What's a Form 5472?" — Run.
- Quoting extremely low prices ($200 for a full corporate return) — You get what you pay for.
- No experience with international clients
- Only available during tax season
- Can't explain the difference between a disregarded entity and a C-Corp

## Where to find them

- Referrals from other international founders (forums, communities)
- CPA directories with international specialization
- Firms that specifically market to foreign-owned businesses`,
    category: "tips",
    publishedAt: "2025-07-01",
    readingTime: "6 min",
  },
  {
    slug: "form-5472-with-form-1120-filing",
    title: "Filing Form 5472 with Form 1120: A Step-by-Step Walkthrough",
    excerpt: "These two forms go together. Here's how to prepare and file them as a package.",
    content: `For foreign-owned single-member LLCs, Form 1120 and Form 5472 are a package deal. You can't file one without the other. Here's the complete walkthrough.

## The relationship

Form 1120 is the "cover" return — it reports your LLC's income, deductions, and tax. Form 5472 is the "attachment" — it reports transactions between the LLC and its foreign owner.

For many foreign-owned LLCs with minimal activity, Form 1120 will show mostly zeros while Form 5472 will have the real information.

## Preparation order

**Step 1: Gather your records**
- Bank statements for the entire tax year
- Log of all transactions between you and the LLC
- Any invoices or receipts for business expenses
- Year-end balance sheet information

**Step 2: Fill Form 1120**
- Page 1: Income, deductions, tax computation
- Schedule L: Balance sheet (beginning and end of year)
- Schedule M-1: Book-to-tax reconciliation
- Schedule M-2: Analysis of unappropriated retained earnings

**Step 3: Fill Form 5472**
- Part I: Your LLC's information
- Part II: Your personal information as the foreign owner
- Part IV: All monetary transactions between you and the LLC

**Step 4: Attach and file**
- Form 5472 is attached to Form 1120
- File by April 15 (or October 15 with extension)

## Zero-income example

Your LLC was formed in June, got an EIN, opened a bank account, and you contributed $5,000 as initial capital. No revenue, no expenses.

**Form 1120:**
- All income lines: $0
- All deduction lines: $0
- Tax due: $0
- Schedule L: Assets = $5,000 (cash), Equity = $5,000

**Form 5472:**
- Part IV, Capital contributions: $5,000
- All other transaction lines: $0

## Active business example

Your LLC earned $80,000 in revenue, had $45,000 in expenses, and you contributed $10,000 in capital plus received $20,000 in distributions.

**Form 1120:**
- Gross receipts: $80,000
- Total deductions: $45,000
- Taxable income: $35,000
- Tax (21%): $7,350

**Form 5472:**
- Capital contributions: $10,000
- Distributions / other amounts paid: $20,000

## Filing method

- **E-file** through your CPA's tax software (preferred)
- **Paper file** by mailing to the IRS service center for your state

## Using UFF

UFF helps you prepare both forms. Fill in the guided fields for Form 1120 and Form 5472 separately, generate both PDFs, and provide them to your CPA for review and filing.`,
    category: "guides",
    relatedForm: "form-5472",
    publishedAt: "2025-07-05",
    readingTime: "7 min",
  },
  {
    slug: "tax-deductions-us-llc",
    title: "Common Tax Deductions for US LLCs",
    excerpt: "Every dollar of deduction saves you 21 cents in corporate tax. Here are the deductions most LLCs miss.",
    content: `Deductions reduce your taxable income. For a C-Corporation (or LLC taxed as one), every dollar of deduction saves you 21 cents in tax. Here are the most common deductions for small LLCs.

## Ordinary and necessary business expenses

The IRS allows deductions for expenses that are "ordinary and necessary" for your business. The key test:
- **Ordinary:** Common and accepted in your industry
- **Necessary:** Helpful and appropriate for your business

## Common deductions

**Software and tools**
- SaaS subscriptions (hosting, email, analytics)
- Development tools and licenses
- Design software
- Project management tools

**Professional services**
- CPA and tax preparation fees
- Legal fees
- Registered agent fees
- Bookkeeping services

**Marketing and advertising**
- Domain registration and renewal
- Advertising spend (Google Ads, social media)
- Website hosting

**Contractors and freelancers**
- Payments to independent contractors
- Outsourced development, design, or marketing

**Bank and payment fees**
- Monthly bank fees
- Payment processor fees (Stripe, PayPal)
- Wire transfer fees

**Insurance**
- Business liability insurance
- Professional liability / E&O insurance

**State fees**
- Annual report filing fees
- Franchise tax (Delaware)
- Business license fees

**Travel (if business-related)**
- Flights for business meetings
- Hotels during business travel
- Meals during business travel (50% deductible)

## Deductions specific to foreign-owned LLCs

**Management fees.** If the foreign owner manages the LLC, reasonable management fees paid by the LLC to the owner are deductible. But they must be arm's length and properly documented.

**Intercompany service fees.** If a related foreign entity provides services to the US LLC, those fees are deductible if arm's length. Report them on Form 5472.

## What's NOT deductible

- Personal expenses (even if paid from the business account)
- Capital expenditures (depreciated over time, not immediately deducted)
- Penalties and fines
- Political contributions
- Entertainment (post-2017 tax reform)

## Documentation

Keep receipts and records for every deduction. The IRS can disallow deductions without proper documentation. Digital receipts and bank statements are acceptable.

## The home office deduction

If your LLC has a dedicated home office space, a portion of rent, utilities, and internet may be deductible. The simplified method allows $5 per square foot, up to 300 square feet ($1,500 max).`,
    category: "tips",
    publishedAt: "2025-07-10",
    readingTime: "6 min",
  },
  {
    slug: "transfer-pricing-basics",
    title: "Transfer Pricing for Foreign-Owned LLCs: The Basics",
    excerpt: "When your US LLC transacts with related foreign entities, pricing matters. Here's why and what to do.",
    content: `Transfer pricing is the pricing of transactions between related entities. When your US LLC buys services from (or sells services to) a company you also own in another country, the price must be "arm's length."

## Why transfer pricing matters

The IRS wants to ensure that US entities aren't artificially shifting profits to low-tax countries by charging inflated prices for intercompany services.

**Example:** Your US LLC earns $100,000 in revenue. Your foreign company charges the US LLC $90,000 in "management fees." The US LLC reports only $10,000 in taxable income. The IRS will question whether $90,000 is a reasonable price for those services.

## The arm's length standard

The price between related parties should be the same price that would be charged between unrelated parties in comparable circumstances. If a third-party management company would charge $30,000 for the same services, then $30,000 is the arm's length price — not $90,000.

## Common intercompany transactions

- Management fees (foreign owner managing the US LLC)
- Software development services (foreign team building the product)
- Licensing fees (US LLC licensing IP from a foreign entity)
- Cost-sharing arrangements
- Loans and interest

## Methods for determining arm's length prices

**Comparable Uncontrolled Price (CUP).** Compare to prices in comparable transactions between unrelated parties.

**Cost Plus.** Start with the cost of providing the service, add a market-appropriate markup.

**Resale Price.** Start with the resale price, subtract a market-appropriate margin.

## Documentation requirements

For most small LLCs, the IRS doesn't require formal transfer pricing documentation. But it's smart to have:
- A written intercompany agreement
- A description of the services provided
- Justification for the pricing (comparable market rates)

For larger companies ($25M+ in intercompany transactions), formal documentation is required.

## Form 5472 reporting

All intercompany transactions between the US LLC and related foreign parties must be reported on Form 5472, Part IV. This is separate from transfer pricing documentation but gives the IRS the data to identify potential issues.

## Practical approach for small LLCs

1. Charge reasonable, justifiable prices for intercompany services
2. Document the basis for pricing in a simple memo
3. Keep intercompany agreements in writing
4. Report everything on Form 5472
5. If intercompany transactions exceed $100K, consider getting a CPA's input on transfer pricing`,
    category: "explainers",
    publishedAt: "2025-07-15",
    readingTime: "6 min",
  },
  {
    slug: "partnership-vs-corporation-llc",
    title: "Partnership vs Corporation: Choosing Tax Treatment for Your Multi-Member LLC",
    excerpt: "Multi-member LLCs default to partnership. Should you keep it that way or elect corporate treatment?",
    content: `When two or more people form an LLC, the IRS automatically treats it as a partnership. But you can elect corporate treatment via Form 8832. Which is better?

## Partnership taxation (default)

**How it works:** The LLC doesn't pay tax. Income, deductions, and credits "pass through" to each member. Each member reports their share on their personal tax return.

**Advantages:**
- No double taxation
- Losses pass through to members (can offset other income, subject to rules)
- Flexible allocation of income and losses
- Simpler for small businesses

**Disadvantages:**
- Members pay self-employment tax on their share of income
- Can't retain earnings at a lower rate
- K-1s must be issued to all partners
- Tax planning is more complex with multiple members

## Corporate taxation (elected via Form 8832)

**How it works:** The LLC pays corporate tax at 21%. Distributions to members are taxed again as dividends.

**Advantages:**
- Flat 21% rate on retained earnings
- Can issue stock options (ISOs)
- More attractive to investors
- Clear separation of entity and personal taxes

**Disadvantages:**
- Double taxation on distributed profits
- More complex compliance
- Less flexibility in allocating income
- More expensive to administer

## Decision factors

| Factor | Partnership | Corporation |
|--------|------------|-------------|
| Raising VC | Less preferred | Preferred |
| Distributing all profits | Better (single tax) | Worse (double tax) |
| Retaining profits | Worse (higher personal rates) | Better (flat 21%) |
| Stock options | Not available | Available |
| Self-employment tax | Yes | No (but payroll tax on wages) |
| Flexibility | More | Less |
| Filing complexity | Moderate | More complex |

## For foreign co-founders

Special considerations:
- Foreign partners may need to file Form 1040-NR
- The partnership may need to withhold tax on foreign partners' shares
- Tax treaty benefits may apply differently under each structure

## Making the election

File Form 8832 to change from partnership to corporate treatment. The election can be effective up to 75 days retroactively. Remember: this is hard to reverse (60-month waiting period).

Consult a CPA before making this election. The tax implications are significant and depend heavily on your specific situation.`,
    category: "explainers",
    publishedAt: "2025-07-20",
    readingTime: "7 min",
  },
  {
    slug: "irs-notices-what-to-do",
    title: "Got a Letter from the IRS? Here's What to Do",
    excerpt: "Don't panic. Most IRS notices are routine. Here's how to read them and respond.",
    content: `Getting a letter from the IRS can trigger anxiety, but most notices are routine matters that are easily resolved. Here's your guide.

## Step 1: Don't ignore it

This is the most important step. IRS notices have deadlines. If you miss the deadline, penalties increase and your options narrow.

## Step 2: Read the notice number

Every IRS notice has a number in the upper right corner. Common ones:

**CP14 — Balance due.** The IRS says you owe money. Review the amount and pay if correct, or respond with an explanation if you disagree.

**CP501/CP503/CP504 — Reminder/Final notices.** Escalating reminders for unpaid balances. CP504 is the final notice before the IRS takes collection action.

**CP2000 — Proposed changes.** The IRS thinks your income doesn't match what was reported on information returns (W-2s, 1099s, K-1s). Review carefully — sometimes they're right, sometimes they have incomplete information.

**CP575 — EIN confirmation.** Good news! This confirms your EIN was assigned.

**Letter 5699 — FinCEN BOI reminder.** A reminder to file your Beneficial Ownership Information report.

**CP215 — Penalty assessment.** The IRS has assessed a penalty. This is common for late-filed Form 5472.

## Step 3: Verify authenticity

The IRS communicates by mail, not email or text. If you receive an electronic communication claiming to be the IRS, it's likely a scam.

Verify by:
- Checking the notice number against irs.gov
- Calling the IRS at the number on the notice (verify it matches irs.gov)
- Logging into your IRS online account to see if the notice appears there

## Step 4: Respond appropriately

**If you agree:** Pay the amount or make the correction. Follow the instructions on the notice.

**If you disagree:**
1. Write a letter explaining why
2. Include the notice number and your tax ID
3. Attach supporting documentation
4. Send by certified mail to the address on the notice
5. Keep copies of everything

## Step 5: Meet deadlines

Most notices give you 30-60 days to respond. Mark the deadline on your calendar. If you need more time, call the number on the notice.

## Getting help

- **IRS website (irs.gov):** Look up your notice number for specific guidance
- **Taxpayer Advocate Service:** If you're unable to resolve the issue through normal channels
- **CPA or tax attorney:** For complex issues, especially penalties exceeding $10,000

## For foreign founders

If you receive a notice at your registered agent address, make sure your agent forwards it promptly. Delays in forwarding can eat into your response window.`,
    category: "tips",
    publishedAt: "2025-07-25",
    readingTime: "7 min",
  },
  {
    slug: "e-commerce-llc-tax-forms",
    title: "E-Commerce LLC: Which Tax Forms Do You Need?",
    excerpt: "Selling products online through a US LLC? Here's your complete tax filing guide.",
    content: `Running an e-commerce business through a US LLC comes with specific tax considerations. Whether you're selling on Amazon, Shopify, or your own store, here's what you need to file.

## The basics (same as any LLC)

- **EIN:** Form SS-4
- **FinCEN BOI:** Beneficial ownership report
- **Annual return:** Form 1120 or 1065 (depending on structure)
- **Form 5472:** If foreign-owned

## E-commerce specific considerations

### Sales tax

This is separate from federal income tax. If you sell physical products, you likely owe sales tax in states where you have "nexus" (a tax presence). Nexus is created by:

- Having inventory in a state (including Amazon FBA warehouses)
- Having employees in a state
- Exceeding a state's economic nexus threshold (typically $100K in sales or 200 transactions)

Sales tax is collected from customers and remitted to each state. This is NOT reported on your federal income tax return — it's a completely separate obligation.

### Cost of Goods Sold (COGS)

On Form 1120, Line 2 asks for "Cost of goods sold." For e-commerce businesses, this includes:
- Product purchase costs
- Shipping costs to receive inventory
- Customs and duties (for imported goods)
- Warehousing costs directly related to inventory

### 1099-K from payment processors

Stripe, PayPal, Amazon, and Shopify will issue Form 1099-K reporting your gross sales. The revenue on your Form 1120 should match (or be reconcilable with) the amounts on your 1099-Ks.

### Amazon FBA specific

If you use Amazon FBA:
- Amazon collects and remits sales tax in many states (Marketplace Facilitator laws)
- Amazon issues 1099-K for your gross sales
- Amazon fees (FBA fees, referral fees) are deductible business expenses
- Inventory held in Amazon warehouses creates nexus in those states

### Import duties

If you import products for resale, customs duties are part of your COGS. Keep customs documentation for your records.

## Common deductions for e-commerce

- Product costs and shipping
- Amazon/Shopify/platform fees
- Packaging materials
- Photography and listing creation
- Advertising (PPC, social media)
- Software tools (inventory management, analytics)
- Returns and refunds

## Multi-state filing

If you have sales tax nexus in multiple states, you'll need to register, collect, file, and remit in each state. Consider using services like TaxJar or Avalara to automate this.`,
    category: "scenarios",
    publishedAt: "2025-08-01",
    readingTime: "7 min",
  },
  {
    slug: "opening-us-bank-account-foreign-founder",
    title: "Opening a US Bank Account for Your LLC: What Forms You'll Need",
    excerpt: "Banks will ask for a stack of documents. Here's what to prepare before you apply.",
    content: `Opening a US business bank account is one of the first things you'll do after forming your LLC and getting your EIN. Banks have specific document requirements, especially for foreign-owned entities.

## Documents every bank will need

1. **EIN Confirmation Letter (CP 575)** — The letter the IRS sends confirming your EIN
2. **Articles of Organization** — Your LLC formation document from the state
3. **Operating Agreement** — Even if it's a single-member LLC, banks want to see it
4. **Form SS-4** — Some banks ask for a copy of your EIN application
5. **Government-issued ID** — Passport for foreign founders

## Additional documents for foreign owners

6. **W-8BEN or W-8BEN-E** — The bank needs this for tax reporting
7. **Proof of US address** — Even if it's a registered agent address
8. **Foreign passport** — Current and valid
9. **Proof of foreign address** — Utility bill or bank statement from your home country

## Bank options for foreign founders

**Online-first banks (easier for foreign founders):**
- Mercury — Popular with startups, allows remote opening
- Relay — Good for small businesses
- Brex — For funded startups

**Traditional banks (harder for foreign founders):**
- Chase, Bank of America, Wells Fargo — Usually require in-person visits
- Some branches are more accommodating than others

## The W-8BEN connection

When you open the account, the bank acts as a withholding agent. They need your W-8BEN (personal) or W-8BEN-E (entity) to determine:
- Your tax status (foreign or US person)
- Applicable withholding rates on interest income
- FATCA reporting obligations

## Common issues

**"We need an SSN."** Some banks incorrectly require an SSN. An EIN is sufficient for a business account. If the banker insists, try a different branch or bank.

**"We can't verify your identity."** Foreign passports sometimes fail automated identity verification systems. Ask for manual review.

**"We need you to come in person."** Some traditional banks require in-person account opening. Online banks like Mercury don't.

## After opening the account

- Deposit your initial capital contribution (record this for Form 5472)
- Set up online banking access
- Order a debit card if needed
- Link payment processors (Stripe, PayPal)

## Pro tip

Generate your Form SS-4 and W-8BEN using UFF before applying. Having these forms ready and properly filled speeds up the account opening process significantly.`,
    category: "scenarios",
    publishedAt: "2025-08-05",
    readingTime: "6 min",
  },
  {
    slug: "form-7004-vs-4868",
    title: "Form 7004 vs Form 4868: Which Extension Do You Need?",
    excerpt: "Business extension or individual extension? Here's how to know which one to file.",
    content: `Both Form 7004 and Form 4868 provide 6-month extensions, but they cover different returns. Filing the wrong one is a common mistake.

## Form 7004 — Business returns

**Covers:**
- Form 1120 (Corporation)
- Form 1065 (Partnership)
- Form 1120-S (S Corporation)
- Form 1041 (Estate/Trust)
- Several other business returns

**Who files:** The business entity itself. Filed using the entity's EIN.

**How it works:** Truly automatic. If the form is complete and filed on time, the extension is granted. No explanation needed.

## Form 4868 — Individual returns

**Covers:**
- Form 1040 (US citizens and residents)
- Form 1040-NR (Nonresident aliens)
- Form 1040-SR (Seniors)

**Who files:** The individual taxpayer. Filed using your SSN or ITIN.

**How it works:** Also automatic in practice, though technically the IRS can deny it (extremely rare).

## Common scenario for international founders

You own a foreign-owned single-member LLC. You need to file:
1. **Form 1120 + 5472** for the LLC → File **Form 7004** for extension
2. **Form 1040-NR** for yourself (if applicable) → File **Form 4868** for extension

These are separate extensions. Filing Form 7004 for your LLC does NOT extend your personal Form 1040-NR deadline.

## Partnership owners

If you're a partner in a multi-member LLC:
1. The LLC files **Form 7004** to extend Form 1065
2. You file **Form 4868** to extend your personal Form 1040-NR
3. You can't file your personal return until you receive your K-1 from the partnership

This is why partnerships have an earlier deadline (March 15) — to give partners time to receive K-1s before their April 15 personal deadline.

## Filing both

It's very common to file both extensions. There's no penalty for filing an extension, and it buys you significant breathing room.

**Form 7004:** File by April 15 (for Form 1120) or March 15 (for Form 1065)
**Form 4868:** File by April 15 (or June 15 for 1040-NR filers with no US wages)

## Use UFF

Generate both Form 7004 and Form 4868 with UFF. Fill in the basic fields (it takes 5 minutes each), download the PDFs, and file them before the deadlines.`,
    category: "explainers",
    relatedForm: "form-7004",
    publishedAt: "2025-08-10",
    readingTime: "6 min",
  },
  {
    slug: "digital-nomad-us-tax-obligations",
    title: "Digital Nomads and US Tax Forms: What You Need to Know",
    excerpt: "Working remotely while traveling? Your US tax obligations depend on where you are and who pays you.",
    content: `The digital nomad lifestyle creates unique tax situations, especially when US companies and US LLCs are involved. Here's how to navigate it.

## Scenario 1: Foreign freelancer with US clients

You're a non-US citizen, living abroad, freelancing for US companies.

**Forms needed:**
- W-8BEN (provide to each US client)
- Possibly Form 1040-NR (if you spent time working in the US)

**Tax exposure:** Generally none if you perform all work outside the US and claim treaty benefits on W-8BEN.

## Scenario 2: Foreign founder with a US LLC

You're a non-US citizen who owns a US LLC.

**Forms needed:**
- Form SS-4 (EIN application)
- FinCEN BOI (beneficial ownership)
- Form 1120 + Form 5472 (annual, if foreign-owned)
- Form 1040-NR (if you have US-source income personally)

**Tax exposure:** The LLC has US tax obligations regardless of where you physically are.

## Scenario 3: US citizen working abroad

You're a US citizen living as a digital nomad.

**Forms needed:**
- Form 1040 (you file on worldwide income as a US citizen, always)
- FBAR (if foreign accounts exceed $10,000)
- Form 8938 (if foreign assets exceed reporting thresholds)
- Possibly Form 2555 (Foreign Earned Income Exclusion)

**Tax exposure:** US citizens are taxed on worldwide income regardless of where they live. The Foreign Earned Income Exclusion ($126,500 for 2024) can help.

## The US presence trap

If you're a non-US person visiting the US for business:
- Days spent in the US count toward the Substantial Presence Test
- Income earned while physically in the US may be taxable
- If you exceed the Substantial Presence Test thresholds, you become a US tax resident

## Practical rules

1. **Track your days.** Keep a log of every day spent in the US.
2. **Know your treaty.** Many treaties exempt short-term business visitors.
3. **Separate US and non-US income.** If you spend some time in the US, you may need to allocate income.
4. **File on time.** Moving around doesn't change your filing deadlines.
5. **Get professional help.** Multi-country tax situations are complex. A CPA with international experience is worth the investment.

## For UFF users

UFF helps you prepare the US forms in this equation. Whether you need Form 1120 for your LLC, W-8BEN for your freelance work, or Form 1040-NR for your personal filing, the guided form filling makes it straightforward.`,
    category: "scenarios",
    publishedAt: "2025-08-15",
    readingTime: "7 min",
  },
  {
    slug: "registered-agent-and-tax-forms",
    title: "Your Registered Agent and Tax Forms: What You Should Know",
    excerpt: "Your registered agent receives important IRS mail. Make sure you're set up to get it promptly.",
    content: `A registered agent is a person or company that receives legal and tax documents on behalf of your LLC. If you're an international founder, your registered agent is a critical link in your tax compliance chain.

## What does a registered agent receive?

- IRS correspondence and notices
- State tax notices
- Secretary of State correspondence
- Legal service of process
- FinCEN correspondence

## Why this matters for tax forms

When you file Form SS-4 and list your registered agent's address, the IRS will send your EIN confirmation letter (CP 575) there. All future IRS notices go there too — including penalty notices.

**If your registered agent doesn't forward mail promptly, you could miss IRS deadlines.**

## Setting up mail forwarding

Most registered agent services offer:
1. **Scanning and emailing** — Immediate notification when mail arrives
2. **Physical forwarding** — Periodic mailing to your foreign address
3. **Digital mailbox** — Online access to scanned documents

For tax compliance, scanning and emailing is essential. You need to see IRS notices immediately, not wait for physical mail to arrive internationally.

## Address on tax forms

When filling forms with UFF, use your registered agent's address for:
- Form SS-4, Lines 4a-4b (mailing address)
- Form 1120, page 1 (entity address)
- Form 5472, Part I (reporting corporation address)

Use the registered agent's **physical office address** (not a PO Box) for street address lines.

## Changing your registered agent

If you switch registered agents, update your address with:
1. Your state's Secretary of State office
2. The IRS (Form 8822-B, Change of Address)
3. Any banks or financial institutions
4. FinCEN (updated BOI report)

## Cost

Registered agent services typically cost $50-300/year. Given that they're your lifeline for receiving IRS correspondence, this is not the place to cut corners.`,
    category: "tips",
    publishedAt: "2025-08-20",
    readingTime: "5 min",
  },
  {
    slug: "form-8832-timing-and-retroactive-elections",
    title: "Form 8832 Timing: Can You Make a Retroactive Entity Classification Election?",
    excerpt: "Yes, up to 75 days. But timing matters. Here's how to get the effective date right.",
    content: `One of the most useful features of Form 8832 is the ability to make a retroactive election. You can set the effective date up to 75 days before the filing date. This gives you flexibility to align your tax classification with your business needs.

## The 75-day rule

When you file Form 8832, the effective date of the election can be:
- **Up to 75 days BEFORE** the date the election is filed
- **Up to 12 months AFTER** the date the election is filed

## Why retroactive elections matter

**Scenario:** You formed your LLC on January 1 but didn't realize you needed corporate treatment until March. If you file Form 8832 on March 15 with an effective date of January 1, you're within the 75-day window and your LLC is treated as a corporation from day one.

This avoids the messy situation of being a disregarded entity for part of the year and a corporation for the rest.

## Late election relief

What if you missed the 75-day window? The IRS provides relief under Revenue Procedure 2009-41 if:
1. The entity intended to classify itself from a specific date
2. The entity has reasonable cause for failing to file on time
3. Less than 3 years and 75 days have passed since the intended effective date
4. The entity has been treated as the elected classification since the intended date

To request relief, write "FILED PURSUANT TO REV. PROC. 2009-41" at the top of Form 8832.

## Practical timing guide

**Best approach:** File Form 8832 within 75 days of your LLC formation, with the effective date being your formation date. This ensures clean tax classification from the start.

**If you're past 75 days:** Consult your CPA about late election relief. It's available in most cases where you acted in good faith.

**If you want future classification:** You can file Form 8832 now with an effective date up to 12 months in the future. This is rare but useful in specific tax planning situations.

## Filing with UFF

UFF's Form 8832 guided flow includes the effective date field with a clear explanation. Enter your desired effective date, and UFF generates the properly formatted PDF.`,
    category: "explainers",
    relatedForm: "form-8832",
    publishedAt: "2025-08-25",
    readingTime: "5 min",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}
