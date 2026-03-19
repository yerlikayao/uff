import { forms } from "@/lib/forms";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormFiller from "@/components/FormFiller";

export function generateStaticParams() {
  return forms.map((form) => ({ formId: form.id }));
}

export default async function FormPage({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const { formId } = await params;
  const form = forms.find((f) => f.id === formId);
  if (!form) notFound();

  return (
    <>
      <Header />
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono font-bold bg-paper-dark px-2.5 py-1 rounded-md text-ink border-2 border-border">
                {form.name}
              </span>
              <span className="text-xs font-medium text-ink-muted">{form.categoryLabel}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl tracking-tight mb-2">
              {form.fullName}
            </h1>
            <p className="text-ink-light text-lg">{form.description}</p>
          </div>
          <FormFiller form={form} />
        </div>
      </section>
      <Footer />
    </>
  );
}
