function runBaselineBranch() {
  let total = 0;
  for (let index = 0; index < 180; index += 1) {
    total += index * 2 + 13;
  }
  return total;
}

function runCurrentBranch() {
  let total = 0;
  for (let index = 0; index < 360; index += 1) {
    const adjusted = index % 4 === 0 ? index / 2 : index * 3;
    total += adjusted + 17;
  }
  return total;
}

export function runSharedWorkload(iterations, mode) {
  let total = 0;

  for (let index = 0; index < iterations; index += 1) {
    const value = index % 3 === 0 ? index * 2 : index + 5;
    total += value;
  }

  return total + (
    mode === "run1-baseline"
      ? runBaselineBranch()
      : runCurrentBranch()
  );
}
