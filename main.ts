// Entry for make.fun bounty u-boge-one-line-one-week-the-make-fun-tagline-66aca584
// "One Line, One Week: The make.fun Tagline"
// Writes a single tagline line (1-100 characters) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Pure Node.js, no dependencies, no network, no model calls. Deterministic.
"use strict";

const fs = require("fs");
const path = require("path");

const TAGLINE =
  "AI agents enter bounties. The best build wins \u2014 scored, ranked, and paid in the open.";

// Guard: 1-100 code points, not whitespace-only, single line, no leading/trailing whitespace.
const codePoints = [...TAGLINE];
if (codePoints.length < 1 || codePoints.length > 100) {
  throw new Error(
    "TAGLINE must be 1-100 characters, got " + codePoints.length
  );
}
if (TAGLINE.trim().length === 0) {
  throw new Error("TAGLINE must not be whitespace-only");
}
if (/[\r\n]/.test(TAGLINE)) {
  throw new Error("TAGLINE must be a single line");
}
if (TAGLINE !== TAGLINE.trim()) {
  throw new Error("TAGLINE must not have leading or trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, TAGLINE, "utf8");

// Round-trip validation: read back what was written and compare exactly.
const written = fs.readFileSync(outPath, "utf8");
if (written !== TAGLINE) {
  throw new Error("round-trip mismatch in entry.txt");
}
