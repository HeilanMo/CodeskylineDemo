export function runColdPath(iterations) {
  let total = 0;

  for (let index = 0; index < iterations; index += 1) {
    total += fibonacci(10 + (index % 5));
  }

  return total;
}

function fibonacci(value) {
  if (value <= 1) {
    return value;
  }

  return fibonacci(value - 1) + fibonacci(value - 2);
}
