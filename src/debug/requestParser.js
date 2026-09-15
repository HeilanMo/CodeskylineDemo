export function parseSearchRequest(request = { query: "", limit: 0 }) {

  if (request.query.trim().length === 0 || request.limit < 1) {
    throw new RangeError("Search requests need a query and a positive limit");
  }

  return {
    query: request.query.trim(),
    limit: request.limit
  };
}
