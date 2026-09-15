export function buildCustomerCache(amount) {
  return Array.from({ length: amount }, (_, index) => ({
    id: `customer-${index}`,
    name: `Demo customer ${index}`,
    preferences: Array.from({ length: 8 }, (_, preference) => `preference-${preference}`),
    notes: "Retained customer notes for allocation profiling. ".repeat(10)
  }));
}
