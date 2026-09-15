import { calculateRecommendations } from "./recommendationEngine.js";
import { normalizeDocuments } from "./documentNormalizer.js";
import { generateAnalytics } from "./analyticsEngine.js";

const documents = Array.from({ length: 1800 }, (_, index) => ({
  id: index,
  text: `Document ${index} contains searchable words and repeated demo content. `.repeat(12)
}));

function runCpuDemo() {
  const startedAt = Date.now();
  const recommendations = calculateRecommendations(documents);
  const normalized = normalizeDocuments(documents);
  const analytics = generateAnalytics(normalized);

  console.log({
    recommendations: recommendations.length,
    normalized: normalized.length,
    analytics: analytics.length,
    durationMs: Date.now() - startedAt
  });
  console.log("Start CodeSkyline: Record CPU Profile now.");
}

runCpuDemo();
setInterval(runCpuDemo, 4000);
