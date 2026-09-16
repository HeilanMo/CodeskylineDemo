export function runHotPath(iterations) {
  let total = 0;

  for (let index = 0; index < iterations; index += 1) {
    total += normalizeHotValue(index);
    total += normalizeHotValue(index + 1);
    total += normalizeHotValue(index + 2);
  }

  return total;
}

function normalizeHotValue(value) {
  const text = `hot-value-${value}`.toLowerCase();
  return text.length + (value % 7);
}
