import { runHotPath } from "./hotPath.js";
import { runMediumPath } from "./mediumPath.js";
import { runColdPath } from "./coldPath.js";

function runExecutionDemo() {
  const hotCount = runHotPath(100000);
  const mediumCount = runMediumPath(10000);
  const coldCount = runColdPath(100);

  console.log({
    hotCount,
    mediumCount,
    coldCount,
    message: "Start coverage recording and choose Debug: Heatmap"
  });
}

runExecutionDemo();
setInterval(runExecutionDemo, 3000);
