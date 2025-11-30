// functions/i18n/translateErrors.ts
export function translateErrors(
  errors: Record<string, string>,
  
  t?: (key: string) => string
): Record<string, string> {
    console.log("translateErrors called with errors:", errors);
  if (!t) return errors; // si no te pasan t, muestra claves tal cual
  const out: Record<string, string> = {};
  for (const [field, key] of Object.entries(errors)) {
    out[field] = t(key);
  }
  return out;
}
