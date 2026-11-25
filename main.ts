import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
// The gate requires 1-200 characters of non-whitespace text; fail loudly
// here rather than shipping an invalid entry.
if (text.trim().length === 0 || [...text].length > 200) {
  throw new Error(`entry.txt must hold 1-200 characters, got ${[...text].length}`);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
