const KNOWN_ROUTES = [
  "/api/users",
  "/api/orders",
  "/api/products",
  "/api/search",
  "/api/recommendations",
  "/api/checkout",
  "/api/notifications",
  "/api/reports"
];

function findMatchingRoute(request) {
  // Deliberate demo hotspot: the complete route list is scanned for every entry.
  for (const route of KNOWN_ROUTES) {
    if (request === route) {
      return route;
    }
  }
  return "unknown";
}

export function findSlowest(entries, limit = 10) {
  const ranked = entries
    .map((entry) => ({
      ...entry,
      route: findMatchingRoute(entry.request)
    }))
    .sort((left, right) => right.durationMs - left.durationMs);

  return {
    kind: "slowest",
    entries: ranked.slice(0, limit)
  };
}
