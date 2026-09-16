import { runSharedWorkload } from "./coverageCompareShared.js";
import { runBaselineOnlyWorkload } from "./coverageCompareBaseline.js";
import { runCurrentOnlyWorkload } from "./coverageCompareCurrent.js";

const mode = process.argv[2] === "run2" ? "run2-current" : "run1-baseline";

function runCoverageComparison() {
  const sharedIterations = mode === "run1-baseline" ? 400 : 2400;
  const shared = runSharedWorkload(sharedIterations, mode);

  const variant = mode === "run1-baseline"
    ? runBaselineOnlyWorkload(600)
    : runCurrentOnlyWorkload(600);

  console.log({
    profile: mode,
    sharedIterations,
    shared,
    variant,
    message: "Record coverage in CodeSkyline before stopping this session.",
  });
}

runCoverageComparison();
setInterval(runCoverageComparison, 3000);
