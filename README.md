# Logscope - CodeSkyline Demo

Logscope is a small Node.js command-line log analyser designed for a live
CodeSkyline presentation. It parses request logs, filters entries, aggregates
errors, and reports slow requests.

## Run it

Requires Node.js 20 or newer.

```bash
npm install
npm start
npm test
```

The sample log contains 20,000 generated requests. The `--slowest` command
intentionally uses a slow nested search in `src/analysis/slowRequests.js`, which
is an easy hotspot to find with CPU profiling.

## Suggested presentation

1. Open this folder in VS Code and start with `npm start`.
2. Use the CodeSkyline map to explain the parser, analysis, and report layers.
3. Start debugging `src/analysis/slowRequests.js` and pause at `findMatchingRoute`.
4. Run `npm run profile`. Load the generated `.cpuprofile` in CodeSkyline and
   select **CPU: Self Time**.
5. Replace the nested search with the indexed implementation in
   `src/analysis/routeIndex.js`, then profile again and compare the two runs.
6. Change the level filter to `ERROR` and show the unvisited success path with
   coverage.

The deliberate hotspot is isolated and safe to explain: the result stays
correct, but every request scans the complete route list. The optimized version
builds a `Map` once and performs constant-time lookups.

## Commands

```bash
node src/cli.js sample-logs/app.log --summary
node src/cli.js sample-logs/app.log --level ERROR
node src/cli.js sample-logs/app.log --slowest
npm run profile
```

## Exception-Demo

The **Logscope: Exception Demo** launch profile runs
`src/debug/exceptionDemo.js`. It deliberately executes three invalid scenarios,
with an exception thrown in a different source file for each scenario:

- `userValidator.js`: invalid user payload (`TypeError`)
- `requestParser.js`: empty search request (`RangeError`)
- `reportRenderer.js`: report without result rows (`Error`)

The demo catches each exception and continues to the next scenario. With
**All Exceptions** enabled, the debugger therefore pauses three times in three
different files. Press `F5`/Continue after each pause so CodeSkyline can retain
all exception markers in the map.

For the live CodeSkyline demo:

1. Open **Run and Debug** and select **Logscope: Exception Demo**.
2. In the Debug sidebar, enable the **All Exceptions** breakpoint.
3. Start debugging with `F5`.
4. When execution pauses, open CodeSkyline and enable the **💥 Exceptions** marker.
5. Enable **📚 Call Stack** as well to show the call-stack lines and coupling
   between the three files/functions.

## Heap-Allocation-Demo

The **Logscope: Heap Allocation Demo** launch profile runs
`src/debug/heapDemo.js`. It creates several retained caches as well as
temporary report rows, giving the allocation profiler multiple memory
hotspots of different sizes:

- `customerCache.js`: smaller customer records and preferences
- `productCatalog.js`: larger records with descriptions, tags, and price arrays
- `searchIndex.js`: medium-sized search documents with token lists
- `reportCache.js`: short-lived report objects and strings

Start the profile, open CodeSkyline's debug panel, and choose **Record
Allocations**. Let it run for a few seconds, stop the recording, and select
**Memory: Self Size**. The map should highlight the allocation-heavy lines.

## CPU-Hotspots-Demo

The **Logscope: CPU Hotspots Demo** launch profile runs
`src/debug/cpuDemo.js` repeatedly and exercises three workloads with different
costs:

- `recommendationEngine.js`: deliberately expensive pairwise document matching
- `documentNormalizer.js`: medium-cost Unicode and text normalization
- `analyticsEngine.js`: faster word-frequency aggregation

Start the profile, choose **Record CPU Profile** in CodeSkyline, wait for a few
seconds, and stop the recording. Select **CPU: Self Time** to compare the
hotspots. The recommendation engine should dominate the map.

## CPU-Comparison-Demo

The profiles **Logscope: CPU Comparison Run 1 (Baseline)** and
**Logscope: CPU Comparison Run 2 (Current)** execute the same
`src/debug/cpuCompareDemo.js` entry point with different modes. They use the
same deterministic input data and the same files, but deliberately move the
CPU hotspots:

- Run 1 repeats the recommendation workload four times.
- Run 2 runs the recommendation workload once and spends more time normalizing
  and analysing documents.

This makes the pair suitable for **CPU: Self Time Δ** without creating an
artificial difference from unrelated entry files. For the live demo:

1. Start **Logscope: CPU Comparison Run 1 (Baseline)**.
2. Record a CPU profile for several seconds and stop it.
3. Load that profile as the baseline with **Set Baseline…**.
4. Stop the first debug session and start **Logscope: CPU Comparison Run 2 (Current)**.
5. Record the second profile for roughly the same duration and stop it.
6. Select **CPU: Self Time Δ**.

Red lines represent a larger share of CPU time in Run 2; blue lines represent
a smaller share. Both profiles must use the same CPU profiler, because samples
and milliseconds cannot be compared.

## Coverage-Demo

The **Logscope: Coverage Demo** launch profile runs
`src/debug/coverageDemo.js`. It exercises the parser, all analysis modules,
report formatting, route lookup, validation errors, allocation helpers, and
document analytics. It deliberately visits both successful and expected-error
branches.

For the live demo:

1. Start **Logscope: Coverage Demo** with `F5`.
2. Open CodeSkyline's debug panel and choose **Start Coverage**.
3. Let the process run for a few seconds so the repeated analysis is sampled.
4. Choose **Take Coverage Snapshot** or stop the coverage recording.
5. Select **Debug: Coverage** to show covered and uncovered lines.

The coverage profile also calls `src/debug/coverageFixtures.js` with only
business customers and non-critical alerts. The trial, standard, and critical
paths remain reachable but are not executed, so they provide clearly visible
red lines in **Debug: Coverage**.

## Execution-Heatmap-Demo

The **Logscope: Execution Heatmap Demo** launch profile runs three paths with
deliberately different execution frequencies:

- `hotPath.js`: 300,000 helper calls per cycle
- `mediumPath.js`: 10,000 aggregation cycles
- `coldPath.js`: 100 recursive calculations

For the live demo:

1. Start **Logscope: Execution Heatmap Demo** with `F5`.
2. In CodeSkyline, start coverage recording.
3. Let it run for 5–10 seconds.
4. Take a coverage snapshot or stop recording.
5. Select **Debug: Heatmap** to colour lines by exact execution counts.

The heatmap uses real runtime execution counts, not debugger stop counts, so
the hot path should be visibly brighter than the medium and cold paths.

## Coverage-Comparison-Demo

The profiles **Logscope: Coverage Comparison Run 1 (Baseline)** and
**Logscope: Coverage Comparison Run 2 (Current)** use the same entry point and
the same shared workload. Each run also has one deliberate variant:

- Run 1 executes `coverageCompareBaseline.js`, but not `coverageCompareCurrent.js`.
- Run 2 executes `coverageCompareCurrent.js`, but not `coverageCompareBaseline.js`.
- `coverageCompareShared.js` runs in both sessions, but each mode calls a
  different branch function in that same file.
- The shared workload runs in both sessions, with more iterations in Run 2.

This makes the pair suitable for both **Runs: Coverage Δ** and
**Runs: Executions Δ**. For each run:

1. Start the corresponding comparison profile.
2. Start CodeSkyline coverage recording.
3. Let it run for several seconds.
4. Stop coverage recording before ending the debug session.

After both sessions are finished, choose **Compare Sessions…** and select Run 1
as A and Run 2 as B. Then:

- **Runs: Coverage Δ** shows newly reached lines in green and lines no longer
  reached in red. Lines reached in both runs are yellow; lines reached in
  neither run remain neutral.
- **Runs: Executions Δ** shows lines executed more often in red and less often
  in blue.

The shared module now provides both colours in one file: the baseline branch
contains lines that are lost in Run 2, while the current branch contains lines
gained in Run 2. The separate variant modules make the file-level difference
easy to spot as well.

The execution delta requires coverage recording in both sessions. The counts
are runtime execution counts, not debugger stop counts.
