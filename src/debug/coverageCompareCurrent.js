export function runCurrentOnlyWorkload(iterations) {
  let total = 0;

  for (let index = 0; index < iterations; index += 1) {
    const value = index % 5 === 0 ? index / 2 : index * 4;
    total += value > 1000 ? value - 100 : value + 7;
  }

  return total;
}
