import { buildRecommendationWorkload } from "./cpuCompareRecommendation.js";
import { normalizeDocuments } from "./cpuCompareNormalizer.js";
import { generateAnalytics } from "./analyticsEngine.js";

const mode = process.argv[2] === "run2" ? "run2-current" : "run1-baseline";
const documents = Array.from({ length: 520 }, (_, index) => ({
  id: index,
  text: `Document ${index} contains searchable words and repeated comparison content. `.repeat(8),
}));

function runComparison() {
  const startedAt = Date.now();
  const recommendationRepetitions = mode === "run1-baseline" ? 4 : 1;
  const normalizationPasses = mode === "run1-baseline" ? 1 : 3;
  const recommendations = buildRecommendationWorkload(documents, recommendationRepetitions);
  const normalizedRuns = Array.from({ length: normalizationPasses }, () => normalizeDocuments(documents));
  const analytics = generateAnalytics(normalizedRuns.flat());

  console.log({
    profile: mode,
    recommendations: recommendations.length,
    normalizationPasses,
    analytics: analytics.length,
    durationMs: Date.now() - startedAt,
  });
}

runComparison();
setInterval(runComparison, 3000);
