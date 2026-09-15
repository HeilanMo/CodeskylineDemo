export function summarize(entries, { includeDetails = false } = {}) {
  const byLevel = new Map();
  const byRoute = new Map();
  let totalDurationMs = 0;

  for (const entry of entries) {
    byLevel.set(entry.level, (byLevel.get(entry.level) ?? 0) + 1);
    byRoute.set(entry.request, (byRoute.get(entry.request) ?? 0) + 1);
    totalDurationMs += entry.durationMs;
  }

  return {
    kind: "summary",
    total: entries.length,
    averageDurationMs: entries.length ? totalDurationMs / entries.length : 0,
    levels: Object.fromEntries(byLevel),
    routes: includeDetails ? Object.fromEntries(byRoute) : undefined
  };
}
