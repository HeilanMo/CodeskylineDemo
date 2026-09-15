export function buildProductCatalog(amount) {
  return Array.from({ length: amount }, (_, index) => ({
    id: `product-${index}`,
    title: `Demo product ${index}`,
    description: "A retained product description used for allocation profiling. ".repeat(25),
    tags: Array.from({ length: 12 }, (_, tag) => `tag-${index}-${tag}`),
    prices: Array.from({ length: 24 }, (_, month) => ({
      month,
      value: 9.99 + (index % 17) + month / 10
    }))
  }));
}
