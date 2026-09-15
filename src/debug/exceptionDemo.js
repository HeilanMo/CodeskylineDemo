import { loadUserFromRequest } from "./userService.js";
import { parseSearchRequest } from "./requestParser.js";
import { renderReport } from "./reportRenderer.js";

const exceptionCases = [
  ["invalid user payload", loadUserFromRequest],
  ["invalid search request", parseSearchRequest],
  ["empty report", renderReport]
];

function runExceptionDemo() {
  for (const [name, execute] of exceptionCases) {
    try {
      execute();
    } catch (error) {
      console.error(`${name}: ${error.message}`);
    }
  }
}

runExceptionDemo();
