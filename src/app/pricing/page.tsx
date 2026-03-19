import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need. No strings.",
    features: [
      "All 13 IRS & FinCEN forms",
      "Guided field-by-field filling",
      "Official PDF generation",
      "No data stored anywhere",
      "Open source (Apache 2.0)",
    ],
    cta: "Start Filling",
    ctaHref: "/forms",
    highlight: false,
    cardColor: "bg-card",
    ctaColor: "bg-ink text-white border-2 border-border-bold shadow-brutal-sm",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For founders filling forms regularly across multiple entities.",
    features: [
      "Everything in Free",
      "Save & resume drafts",
      "Multi-entity management",
      "Filling calendar & reminders",
      "Pre-fill from previous forms",
      "Priority support",
      "Export history & audit trail",
    ],
    cta: "Coming Soon",
    ctaHref: "#",
    highlight: true,
    cardColor: "bg-pop-yellow",
    ctaColor: "bg-ink text-white border-2 border-border-bold shadow-brutal-sm",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For tax pros managing many clients.",
    features: [
      "Everything in Pro",
      "Unlimited clients",
      "Team access",
      "API",
      "Custom branding",
      "Dedicated support",
    ],
    cta: "Talk to Us",
    ctaHref: "mailto:hello@uff.tax",
    highlight: false,
    cardColor: "bg-card",
    ctaColor: "bg-ink text-white border-2 border-border-bold shadow-brutal-sm",
  },
];

const faqs = [
  {
    q: "Is UFF really free?",
    a: "Yes. The core product is free and open source. We make money from Pro and Enterprise plans which add convenience features like saved drafts and team access.",
  },
  {
    q: "Where is my data stored?",
    a: "Nowhere. All processing happens in your browser. Your data never touches any server. Close the tab and it's gone.",
  },
  {
    q: "Can I self-host this?",
    a: "Absolutely. Apache 2.0 license. Clone, build, deploy wherever you want.",
  },
  {
    q: "Does this replace a CPA?",
    a: "No. UFF helps you fill forms correctly, but it's not tax advice. Always work with a qualified CPA for your specific situation.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />

      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-6xl tracking-tight mb-4">
              Simple pricing.
            </h1>
            <p className="text-lg text-ink-light max-w-md mx-auto">
              The core product is free. Pay only if you need more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl p-7 flex flex-col border-2 border-border-bold shadow-brutal-static relative ${plan.cardColor}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pop-coral text-white text-[11px] font-black px-3 py-0.5 rounded-md border-2 border-border-bold uppercase tracking-wide">
                    Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-sm font-black mb-1 uppercase tracking-wide text-ink-muted">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-4xl font-black">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm font-medium text-ink-muted">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-2 text-ink-light">
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[13px] font-medium">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-pop-green"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaHref}
                  className={`block text-center font-bold py-2.5 px-6 rounded-lg transition-all text-sm ${plan.ctaColor} hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_var(--color-ink)]`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-xl mx-auto">
            <h2 className="font-display text-3xl text-center mb-10">
              Questions? Answers.
            </h2>
            <div className="space-y-0">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b-2 border-border py-6 last:border-0">
                  <h3 className="font-bold text-[15px] mb-2">{faq.q}</h3>
                  <p className="text-sm text-ink-light leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
