export function runBaselineOnlyWorkload(iterations) {
  let total = 0;

  for (let index = 0; index < iterations; index += 1) {
    total += (index % 2 === 0 ? index : index * 3) + 11;
  }

  return total;
}
