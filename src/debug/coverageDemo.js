import { readFile } from "node:fs/promises";
import { parseLog } from "../parser/logParser.js";
import { summarize } from "../analysis/summarize.js";
import { findSlowest } from "../analysis/slowRequests.js";
import { createRouteIndex, findRoute } from "../analysis/routeIndex.js";
import { formatReport } from "../reports/formatReport.js";
import { parseUserPayload } from "./userValidator.js";
import { parseSearchRequest } from "./requestParser.js";
import { renderReport } from "./reportRenderer.js";
import { buildCustomerCache } from "./customerCache.js";
import { buildProductCatalog } from "./productCatalog.js";
import { buildSearchIndex } from "./searchIndex.js";
import { createTemporaryReport } from "./reportCache.js";
import { normalizeDocuments } from "./documentNormalizer.js";
import { generateAnalytics } from "./analyticsEngine.js";
import { classifyCustomer, createAlert } from "./coverageFixtures.js";

const logText = await readFile(new URL("../../sample-logs/app.log", import.meta.url), "utf8");
const entries = parseLog(logText.split("\n").slice(0, 30).join("\n"));

function exerciseLogAnalysis() {
  const summary = summarize(entries, { includeDetails: true });
  const errors = entries.filter((entry) => entry.level === "ERROR");
  const slowest = findSlowest(entries, 3);
  const routeIndex = createRouteIndex();
  const knownRoute = findRoute(routeIndex, entries[0].request);
  const unknownRoute = findRoute(routeIndex, "/missing");

  console.log(formatReport(summary));
  console.log(formatReport({ kind: "slowest", entries: slowest.entries }));
  console.log({ errors: errors.length, knownRoute, unknownRoute });
}

function exerciseValidationBranches() {
  console.log(parseUserPayload({ name: "Covered User", email: " USER@EXAMPLE.COM " }));
  console.log(parseSearchRequest({ query: "code", limit: 5 }));

  for (const invalidCase of [
    () => parseUserPayload({ email: undefined }),
    () => parseSearchRequest({ query: "", limit: 0 }),
    () => renderReport([])
  ]) {
    try {
      invalidCase();
    } catch (error) {
      console.log(`Covered expected error: ${error.message}`);
    }
  }
}

function exerciseAllocationHelpers() {
  const customers = buildCustomerCache(12);
  const products = buildProductCatalog(16);
  const searchIndex = buildSearchIndex(8);
  const report = createTemporaryReport();
  console.log({
    customers: customers.length,
    products: products.length,
    searchIndex: searchIndex.length,
    reportRows: report.length
  });
}

function exerciseDocumentAnalytics() {
  const documents = entries.map((entry, index) => ({
    id: index,
    text: `${entry.request} ${entry.message} ${entry.level}`
  }));
  const normalized = normalizeDocuments(documents);
  console.log(generateAnalytics(normalized));
}

function exercisePartialCoverage() {
  // The business path is covered. Trial, standard, and critical alert blocks
  // stay reachable in the source but are intentionally not executed in this
  // scenario, creating visible red lines in Debug: Coverage.
  console.log(classifyCustomer({ segment: "business" }));
  console.log(createAlert("warning"));
}

exerciseLogAnalysis();
exerciseValidationBranches();
exerciseAllocationHelpers();
exerciseDocumentAnalytics();
exercisePartialCoverage();
console.log("Coverage demo complete. Keep the debugger running and take a coverage snapshot in CodeSkyline.");

setInterval(() => {
  exerciseLogAnalysis();
  exerciseDocumentAnalytics();
}, 5000);
