export function buildSearchIndex(amount) {
  return Array.from({ length: amount }, (_, index) => ({
    token: `search-token-${index}`,
    documentIds: Array.from({ length: 40 }, (_, document) => index * 40 + document),
    normalized: `searchable content ${index} `.repeat(18)
  }));
}
