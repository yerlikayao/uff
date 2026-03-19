import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { forms, formCategories } from "@/lib/forms";

const categoryColors: Record<string, string> = {
  formation: "bg-pop-blue text-white",
  "foreign-llc": "bg-pop-purple text-white",
  partnership: "bg-pop-green text-white",
  compliance: "bg-pop-coral text-white",
  individual: "bg-pop-yellow text-ink",
  extension: "bg-ink text-white",
};

const categoryEmoji: Record<string, string> = {
  formation: "1",
  "foreign-llc": "2",
  partnership: "3",
  compliance: "4",
  individual: "5",
  extension: "6",
};

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-36">
          <div className="max-w-3xl">
            <div className="inline-block bg-pop-green text-white text-xs font-bold px-3 py-1 rounded-md border-2 border-border-bold shadow-brutal-static rotate-[-2deg] mb-6">
              Open source &middot; Free forever
            </div>
            <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[1] mb-6 tracking-tight">
              Stop fighting<br />
              with <span className="highlight-yellow italic">IRS forms</span>.
            </h1>
            <p className="text-lg md:text-xl text-ink-light leading-relaxed mb-10 max-w-xl">
              You have a US company. You need to file forms with the IRS.
              Pick the form, fill in the blanks, get a perfectly filled PDF.
              Your data never leaves your browser. <strong className="text-ink">Seriously.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/forms"
                className="inline-flex items-center justify-center gap-2 bg-pop-yellow text-ink font-bold text-base px-7 py-3.5 rounded-lg border-2 border-border-bold shadow-brutal-static hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all"
              >
                Start Filling
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/#how-it-works"
                className="inline-flex items-center justify-center gap-2 text-ink font-bold text-base px-7 py-3.5 rounded-lg border-2 border-border-bold hover:bg-paper-dark transition-all"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 md:py-28 bg-pop-blue-light border-y-2 border-border-bold">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-3">
            Three steps. Done.
          </h2>
          <p className="text-ink-light text-lg mb-14 max-w-lg">
            No more squinting at 4-page PDFs trying to figure out which box is which.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                title: "Pick your form",
                desc: "13 IRS forms organized by what you actually need to do. Formation, compliance, tax returns, extensions.",
                color: "bg-pop-blue",
                rotate: "rotate-[-1deg]",
              },
              {
                num: "2",
                title: "Fill the fields",
                desc: "A clean guided flow walks you through every field. Required fields marked, helpful descriptions included.",
                color: "bg-pop-coral",
                rotate: "rotate-[0.5deg]",
              },
              {
                num: "3",
                title: "Download your PDF",
                desc: "We fill the official IRS PDF template with your data. Print it, sign it, send it. You're done.",
                color: "bg-pop-green",
                rotate: "rotate-[-0.5deg]",
              },
            ].map((item) => (
              <div
                key={item.num}
                className={`bg-card border-2 border-border-bold rounded-xl p-7 shadow-brutal-static ${item.rotate}`}
              >
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${item.color} text-white text-sm font-black mb-4 border-2 border-border-bold`}>
                  {item.num}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-[15px] text-ink-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forms */}
      <section id="forms" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-3">
            Every form you need.
          </h2>
          <p className="text-ink-light text-lg mb-14 max-w-lg">
            13 IRS and FinCEN forms. Covering everything from getting your EIN to filing your extension request.
          </p>

          {formCategories.map((cat) => {
            const catForms = forms.filter((f) => f.category === cat.id);
            if (catForms.length === 0) return null;
            const colors = categoryColors[cat.id] || "bg-ink text-white";
            return (
              <div key={cat.id} className="mb-12 last:mb-0">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-xs font-black border-2 border-border-bold ${colors}`}>
                    {categoryEmoji[cat.id]}
                  </span>
                  <h3 className="text-base font-bold">{cat.label}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catForms.map((form) => (
                    <Link
                      key={form.id}
                      href={`/forms/${form.id}`}
                      className="bg-card border-2 border-border-bold rounded-xl p-5 shadow-brutal-static hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[11px] font-mono font-bold bg-paper-dark px-2 py-0.5 rounded-md text-ink border-2 border-border">
                          {form.name}
                        </span>
                        <svg
                          className="w-4 h-4 text-ink-muted group-hover:text-pop-coral group-hover:translate-x-0.5 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <h4 className="font-bold text-sm mb-1 leading-snug">{form.fullName}</h4>
                      <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                        {form.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* No data stored callout */}
      <section className="py-20 md:py-24 bg-pop-yellow border-y-2 border-border-bold">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white mb-6 border-2 border-border-bold shadow-brutal-static">
              <svg className="w-8 h-8 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-4">
              Your data stays in your browser.
            </h2>
            <p className="text-ink-light text-base leading-relaxed mb-8">
              We don&apos;t send your tax data anywhere. Everything runs locally in your browser.
              When you close the tab, your data is gone. No accounts, no databases, no tracking.
              It&apos;s open source &mdash; you can read every line of code.
            </p>
            <Link
              href="/forms"
              className="inline-flex items-center gap-2 bg-ink text-white font-bold text-sm px-5 py-2.5 rounded-lg border-2 border-border-bold hover:bg-ink-light transition-colors"
            >
              Start filling now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-5">
            Ready to file?
          </h2>
          <p className="text-ink-light text-lg mb-10 max-w-md mx-auto">
            Pick a form, fill it out, download the PDF.<br />
            It really is that simple.
          </p>
          <Link
            href="/forms"
            className="inline-flex items-center gap-2 bg-pop-yellow text-ink font-bold text-lg px-8 py-4 rounded-lg border-2 border-border-bold shadow-brutal-static hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all"
          >
            Start Filling
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
