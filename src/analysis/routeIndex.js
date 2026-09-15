const ROUTES = [
  "/api/users",
  "/api/orders",
  "/api/products",
  "/api/search",
  "/api/recommendations",
  "/api/checkout",
  "/api/notifications",
  "/api/reports"
];

export function createRouteIndex() {
  return new Map(ROUTES.map((route) => [route, route]));
}

export function findRoute(index, request) {
  return index.get(request) ?? "unknown";
}
