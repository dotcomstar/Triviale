#!/usr/bin/env node
"use strict";
const { spawnSync } = require("child_process");
const path = require("path");

let data = "";
process.stdin.on("data", (chunk) => (data += chunk));
process.stdin.on("end", () => {
  let payload;
  try {
    payload = JSON.parse(data);
  } catch {
    return;
  }
  const file = payload.tool_input && payload.tool_input.file_path;
  if (!file || !/\.(ts|tsx)$/.test(file)) return;

  const repoRoot = path.resolve(__dirname, "..", "..");
  const eslintBin = path.join(
    repoRoot,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "eslint.cmd" : "eslint"
  );
  const result = spawnSync(eslintBin, ["--max-warnings", "0", file], {
    cwd: repoRoot,
    stdio: "inherit",
    shell: true,
  });
  process.exit(result.status ?? 0);
});
