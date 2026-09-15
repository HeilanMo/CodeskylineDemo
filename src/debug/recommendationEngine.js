export function calculateRecommendations(documents) {
  const recommendations = [];

  for (const document of documents) {
    const words = document.text.toLowerCase().split(/\s+/);
    let score = 0;

    for (const other of documents) {
      if (document.id === other.id) continue;
      const otherWords = other.text.toLowerCase().split(/\s+/);
      const overlap = words.filter((word) => otherWords.includes(word)).length;
      score += overlap;
    }

    recommendations.push({ id: document.id, score });
  }

  return recommendations.sort((left, right) => right.score - left.score);
}
