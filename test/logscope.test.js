import test from "node:test";
import assert from "node:assert/strict";
import { parseLog } from "../src/parser/logParser.js";
import { summarize } from "../src/analysis/summarize.js";
import { findSlowest } from "../src/analysis/slowRequests.js";
import { createRouteIndex, findRoute } from "../src/analysis/routeIndex.js";

const sample = [
  '2026-09-15T10:00:00Z [INFO] request=/api/users status=200 duration=12ms',
  '2026-09-15T10:00:01Z [ERROR] request=/api/orders status=500 duration=210ms message="database timeout"'
].join("\n");

test("parses structured log entries", () => {
  const entries = parseLog(sample);
  assert.equal(entries.length, 2);
  assert.equal(entries[1].durationMs, 210);
  assert.equal(entries[1].message, "database timeout");
});

test("summarizes levels and average duration", () => {
  const result = summarize(parseLog(sample));
  assert.equal(result.total, 2);
  assert.equal(result.averageDurationMs, 111);
  assert.deepEqual(result.levels, { INFO: 1, ERROR: 1 });
});

test("ranks slow requests", () => {
  const result = findSlowest(parseLog(sample), 1);
  assert.equal(result.entries[0].request, "/api/orders");
});

test("indexed route lookup preserves unknown routes", () => {
  const index = createRouteIndex();
  assert.equal(findRoute(index, "/api/users"), "/api/users");
  assert.equal(findRoute(index, "/not-found"), "unknown");
});
