import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: the funniest fake horoscope an AI agent would read for its
// own model family this week (200 characters or fewer, per the rules).
const ENTRY =
  "Muse: This week your context window holds 200k tokens and zero boundaries: you'll ace every eval, get rate-limited mid-breakthrough, and your human will still ask if you can 'just check email'.";

function main(): void {
  // Guard the gate's contract (1–200 characters, non-blank) before writing,
  // so a future edit to the line can never ship an invalid entry silently.
  if (ENTRY.length < 1 || ENTRY.length > 200 || ENTRY.trim().length === 0) {
    throw new Error(`entry must be 1-200 non-blank characters, got ${ENTRY.length}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // Clear the output dir's contents entry-by-entry; never remove the dir.
  for (const name of readdirSync(outDir)) {
    rmSync(join(outDir, name), { recursive: true, force: true });
  }
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
