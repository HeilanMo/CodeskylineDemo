export function buildRecommendationWorkload(documents, repetitions) {
  const recommendations = [];

  for (let repetition = 0; repetition < repetitions; repetition += 1) {
    for (const document of documents) {
      const words = document.text.toLowerCase().split(/\s+/);
      let score = 0;

      for (const other of documents) {
        if (document.id === other.id) continue;
        const otherWords = other.text.toLowerCase().split(/\s+/);
        score += words.filter((word) => otherWords.includes(word)).length;
      }

      recommendations.push({ id: document.id, score });
    }
  }

  return recommendations.sort((left, right) => right.score - left.score);
}
