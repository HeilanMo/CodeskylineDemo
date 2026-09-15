import { mkdir, writeFile } from "node:fs/promises";

const routes = [
  ["/api/users", 12, 200],
  ["/api/products", 35, 200],
  ["/api/search", 180, 200],
  ["/api/orders", 210, 500],
  ["/api/checkout", 95, 201],
  ["/api/notifications", 8, 200],
  ["/api/recommendations", 320, 200],
  ["/api/reports", 145, 200]
];
const levels = ["INFO", "INFO", "INFO", "WARN", "ERROR"];
const lines = [];

for (let index = 0; index < 20000; index += 1) {
  const [route, baseDuration, status] = routes[index % routes.length];
  const duration = baseDuration + ((index * 17) % 40);
  const level = status === 500 ? "ERROR" : levels[index % levels.length];
  const timestamp = new Date(Date.UTC(2026, 8, 15, 10, 0, 0, index)).toISOString();
  const message = status === 500 ? ' message="database timeout"' : "";
  lines.push(
    `${timestamp} [${level}] request=${route} status=${status} duration=${duration}ms${message}`
  );
}

await mkdir(new URL(".", import.meta.url), { recursive: true });
await writeFile(new URL("./app.log", import.meta.url), `${lines.join("\n")}\n`);
