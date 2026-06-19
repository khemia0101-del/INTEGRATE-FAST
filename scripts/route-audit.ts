import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const forbidden = [
  ["manus", "space"].join("."),
  ["manus", "im"].join("."),
  ["manuscdn", "com"].join("."),
  ["manus-analytics", "com"].join("."),
  ["__MA", "NUS"].join(""),
];
const removedRoutes = [
  "app/openclaw-concierge/page.tsx",
  "app/openclaw-concierge/configure/page.tsx",
  "app/openclaw-concierge/dashboard/page.tsx",
  "app/openclaw-podcast/page.tsx",
  "app/admin/page.tsx",
];

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      if ([".git", ".next", "node_modules"].includes(entry)) {
        return [];
      }
      return walk(path);
    }
    return path;
  });
}

const files = walk(root).filter((file) => /\.(ts|tsx|js|jsx|css|html|md|svg)$/.test(file));
const violations = files.flatMap((file) => {
  const content = readFileSync(file, "utf8");
  return forbidden
    .filter((term) => content.includes(term))
    .map((term) => `${file.replace(root, ".")} contains ${term}`);
});

const missingRoutes = removedRoutes.filter((route) => !existsSync(join(root, route)));

if (violations.length || missingRoutes.length) {
  console.error([...violations, ...missingRoutes.map((route) => `Missing removed route: ${route}`)].join("\n"));
  process.exit(1);
}

console.log("Route/source audit passed: no Manus references and removed routes are explicit 404s.");
