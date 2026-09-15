export function normalizeDocuments(documents) {
  return documents.map((document) => {
    const normalized = document.text
      .normalize("NFKD")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    return {
      id: document.id,
      words: normalized.split(" "),
      characterCount: normalized.length
    };
  });
}
