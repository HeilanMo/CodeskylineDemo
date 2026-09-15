export function generateAnalytics(documents) {
  return documents.map((document) => {
    const frequencies = new Map();

    for (const word of document.words) {
      frequencies.set(word, (frequencies.get(word) ?? 0) + 1);
    }

    return {
      id: document.id,
      uniqueWords: frequencies.size,
      density: document.words.length / Math.max(document.characterCount, 1)
    };
  });
}
