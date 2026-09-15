export function renderReport(rows = []) {

  if (rows.length === 0) {
    throw new Error("Cannot render a report without result rows");
  }

  return rows.join("\n");
}
