export function runMediumPath(iterations) {
  let total = 0;

  for (let index = 0; index < iterations; index += 1) {
    const values = [
      index,
      index * 2,
      index * 3,
      index * 4,
      index * 5,
      index * 6
    ];
    total += values.reduce((sum, value) => sum + (value % 11), 0);
  }

  return total;
}
