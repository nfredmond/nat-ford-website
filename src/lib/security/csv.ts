/**
 * CSV cell encoding for exports of user-controlled data.
 * Quotes every cell and neutralizes spreadsheet formula injection: a value
 * beginning with = + - @ or a tab/CR would otherwise execute as a live
 * formula when the export is opened in Excel or Sheets.
 */
export function csvCell(input: unknown): string {
  let value = String(input ?? '')

  if (/^[=+\-@\t\r]/.test(value)) {
    value = `'${value}`
  }

  return `"${value.replace(/"/g, '""')}"`
}
