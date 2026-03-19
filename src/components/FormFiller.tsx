"use client";

import { useState, useMemo } from "react";
import type { FormDefinition, FormField } from "@/lib/forms";
import { generateFormPdf } from "@/lib/pdf-generator";

interface FormFillerProps {
  form: FormDefinition;
}

export default function FormFiller({ form }: FormFillerProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sections = useMemo(() => {
    const sectionMap = new Map<string, FormField[]>();
    for (const field of form.fields) {
      const existing = sectionMap.get(field.section) || [];
      existing.push(field);
      sectionMap.set(field.section, existing);
    }
    return Array.from(sectionMap.entries()).map(([name, fields]) => ({
      name,
      fields,
    }));
  }, [form.fields]);

  const section = sections[currentSection];
  const isFirstSection = currentSection === 0;
  const isLastSection = currentSection === sections.length - 1;

  const progress = ((currentSection + 1) / sections.length) * 100;

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateSection = () => {
    const newErrors: Record<string, string> = {};
    for (const field of section.fields) {
      if (field.required && !values[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection()) {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleGenerate = async () => {
    if (!validateSection()) return;

    setGenerating(true);
    try {
      const blob = await generateFormPdf(form, values);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${form.name.replace(/\s+/g, "_")}_filled.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert(err instanceof Error ? err.message : "PDF generation failed. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const filledCount = form.fields.filter((f) => values[f.name]?.trim()).length;
  const requiredCount = form.fields.filter((f) => f.required).length;
  const filledRequiredCount = form.fields.filter(
    (f) => f.required && values[f.name]?.trim()
  ).length;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ink-muted">
            Section {currentSection + 1} of {sections.length}
          </span>
          <span className="text-sm font-medium text-ink-muted">
            {filledCount}/{form.fields.length} fields filled &middot;{" "}
            {filledRequiredCount}/{requiredCount} required
          </span>
        </div>
        <div className="h-2 bg-paper-dark border-2 border-border rounded-full overflow-hidden">
          <div
            className="h-full bg-pop-blue rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Section nav */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((s, i) => {
          const sectionComplete = s.fields
            .filter((f) => f.required)
            .every((f) => values[f.name]?.trim());
          return (
            <button
              key={s.name}
              onClick={() => setCurrentSection(i)}
              className={`text-xs px-3 py-1.5 rounded-lg border-2 transition-all font-bold ${
                i === currentSection
                  ? "bg-pop-blue text-white border-border-bold shadow-brutal-sm"
                  : sectionComplete
                  ? "bg-pop-green-light text-pop-green border-pop-green"
                  : "bg-card text-ink-muted border-border hover:border-border-bold"
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      {/* Current section */}
      <div className="bg-card border-2 border-border-bold rounded-xl p-6 md:p-8 mb-6 shadow-brutal-static">
        <h2 className="text-lg font-black mb-6">{section.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {section.fields.map((field) => (
            <div
              key={field.name}
              className={field.width === "full" ? "md:col-span-2" : ""}
            >
              <FieldInput
                field={field}
                value={values[field.name] || ""}
                onChange={(val) => setValue(field.name, val)}
                error={errors[field.name]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={isFirstSection}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all ${
            isFirstSection
              ? "text-ink-muted cursor-not-allowed"
              : "bg-card border-2 border-border-bold text-ink shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_var(--color-ink)]"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>

        {isLastSection ? (
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="inline-flex items-center gap-2 bg-pop-yellow text-ink font-bold px-6 py-2.5 rounded-lg border-2 border-border-bold shadow-brutal-static hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all disabled:opacity-50"
          >
            {generating ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating PDF...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Generate PDF
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-pop-blue text-white font-bold px-6 py-2.5 rounded-lg border-2 border-border-bold shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_var(--color-ink)] transition-all"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  error,
}: {
  field: FormField;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}) {
  const baseClasses = `w-full px-3.5 py-2.5 bg-paper border-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:border-pop-blue focus:ring-0 ${
    error ? "border-red" : "border-border hover:border-border-bold"
  }`;

  return (
    <div>
      <label className="block text-sm font-bold mb-1.5">
        {field.label}
        {field.required && <span className="text-pop-coral ml-0.5">*</span>}
      </label>

      {field.type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
        >
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={baseClasses}
        />
      ) : field.type === "checkbox" ? (
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={value === "true"}
            onChange={(e) => onChange(e.target.checked ? "true" : "")}
            className="w-4 h-4 rounded border-2 border-border-bold text-pop-blue focus:ring-pop-blue/20"
          />
          <span className="text-sm text-ink-light">{field.helpText || field.label}</span>
        </label>
      ) : (
        <input
          type={
            field.type === "number"
              ? "number"
              : field.type === "date"
              ? "date"
              : field.type === "email"
              ? "email"
              : field.type === "phone"
              ? "tel"
              : "text"
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={
            field.placeholder ||
            (field.type === "ein"
              ? "XX-XXXXXXX"
              : field.type === "ssn"
              ? "XXX-XX-XXXX"
              : undefined)
          }
          className={baseClasses}
        />
      )}

      {field.helpText && field.type !== "checkbox" && (
        <p className="text-xs text-ink-muted mt-1.5">{field.helpText}</p>
      )}
      {error && <p className="text-xs text-red font-bold mt-1">{error}</p>}
    </div>
  );
}
