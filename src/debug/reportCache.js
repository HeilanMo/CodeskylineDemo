export function createTemporaryReport() {
  return Array.from({ length: 30000 }, (_, index) => ({
    key: `report-row-${index}`,
    value: `temporary report value ${index}`.repeat(8)
  }));
}
