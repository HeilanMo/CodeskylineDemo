import { readFile } from "node:fs/promises";
import { parseArgs } from "node:util";
import { parseLog } from "./parser/logParser.js";
import { summarize } from "./analysis/summarize.js";
import { findSlowest } from "./analysis/slowRequests.js";
import { formatReport } from "./reports/formatReport.js";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    level: { type: "string" },
    summary: { type: "boolean", default: false },
    slowest: { type: "boolean", default: false },
    limit: { type: "string", default: "10" }
  }
});

const filename = positionals[0] ?? "sample-logs/app.log";
const text = await readFile(filename, "utf8");
const entries = parseLog(text);
const filtered = values.level
  ? entries.filter((entry) => entry.level === values.level.toUpperCase())
  : entries;

if (values.slowest) {
  console.log(formatReport(findSlowest(filtered, Number(values.limit))));
} else {
  console.log(formatReport(summarize(filtered, { includeDetails: values.summary })));
}
