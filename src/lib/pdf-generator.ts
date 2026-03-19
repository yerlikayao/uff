import type { FormDefinition } from "./forms";

/**
 * Calls the FastAPI backend to fill the official IRS PDF template
 * with user data and returns the filled PDF as a Blob.
 */
export async function generateFormPdf(
  form: FormDefinition,
  values: Record<string, string>
): Promise<Blob> {
  if (form.id === "fincen-boi") {
    throw new Error(
      "FinCEN BOI must be filed online at https://boiefiling.fincen.gov"
    );
  }

  const response = await fetch("/api/fill-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      form_id: form.id,
      values,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: "Unknown error" }));
    throw new Error(error.detail || `PDF generation failed (${response.status})`);
  }

  return response.blob();
}
