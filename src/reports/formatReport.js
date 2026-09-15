export function formatReport(report) {
  if (report.kind === "summary") {
    const lines = [
      `Requests: ${report.total}`,
      `Average duration: ${report.averageDurationMs.toFixed(1)}ms`,
      `Levels: ${Object.entries(report.levels)
        .map(([level, count]) => `${level}=${count}`)
        .join(", ")}`
    ];
    if (report.routes) {
      lines.push(
        `Routes: ${Object.entries(report.routes)
          .map(([route, count]) => `${route}=${count}`)
          .join(", ")}`
      );
    }
    return lines.join("\n");
  }

  return [
    `Slowest ${report.entries.length} requests:`,
    ...report.entries.map(
      (entry, index) =>
        `${String(index + 1).padStart(2, " ")}. ${entry.durationMs}ms ${entry.request} [${entry.status}]`
    )
  ].join("\n");
}
