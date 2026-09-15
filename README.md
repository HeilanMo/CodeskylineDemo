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
