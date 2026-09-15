const LOG_PATTERN =
  /^(\S+T\S+Z)\s+\[(INFO|WARN|ERROR|DEBUG)\]\s+request=(\S+)\s+status=(\d+)\s+duration=(\d+)ms(?:\s+message="([^"]*)")?$/;

export function parseLog(text) {
  return text
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, index) => {
      const match = line.match(LOG_PATTERN);
      if (!match) {
        throw new Error(`Invalid log entry on line ${index + 1}`);
      }

      return {
        timestamp: match[1],
        level: match[2],
        request: match[3],
        status: Number(match[4]),
        durationMs: Number(match[5]),
        message: match[6] ?? ""
      };
    });
}
