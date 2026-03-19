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

const categoryNum: Record<string, string> = {
  formation: "1",
  "foreign-llc": "2",
  partnership: "3",
  compliance: "4",
  individual: "5",
  extension: "6",
};

export default function FormsPage() {
  return (
    <>
      <Header />

      <section className="py-14 md:py-22">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-3">
              All Forms
            </h1>
            <p className="text-ink-light text-lg">
              Pick a form, fill it out, download the PDF. Your data stays in your browser.
            </p>
          </div>

          {formCategories.map((cat) => {
            const catForms = forms.filter((f) => f.category === cat.id);
            if (catForms.length === 0) return null;
            const colors = categoryColors[cat.id] || "bg-ink text-white";
            return (
              <div key={cat.id} className="mb-12 last:mb-0">
                <div className="flex items-center gap-2.5 mb-5">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-md text-[10px] font-black border-2 border-border-bold ${colors}`}>
                    {categoryNum[cat.id]}
                  </span>
                  <h2 className="text-base font-bold">{cat.label}</h2>
                  <span className="text-xs font-bold text-ink-muted bg-paper-dark px-2 py-0.5 rounded-md border border-border">
                    {catForms.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catForms.map((form) => (
                    <Link
                      key={form.id}
                      href={`/forms/${form.id}`}
                      className="bg-card border-2 border-border-bold rounded-xl p-5 shadow-brutal-static hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all group flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-14 h-14 bg-paper-dark border-2 border-border-bold rounded-lg flex items-center justify-center">
                        <span className="font-mono text-[10px] font-bold text-ink text-center leading-tight">
                          {form.name}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-bold text-sm leading-snug">{form.fullName}</h3>
                          <svg
                            className="w-3.5 h-3.5 text-ink-muted group-hover:text-pop-coral group-hover:translate-x-0.5 transition-all flex-shrink-0"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">
                          {form.description}
                        </p>
                        <p className="mt-1.5 text-[11px] text-ink-muted font-medium">
                          {form.fields.filter((f) => f.required).length} required &middot;{" "}
                          {form.fields.length} total fields
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
