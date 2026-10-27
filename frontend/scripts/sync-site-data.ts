import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildSiteData } from "../lib/site-data";
import { buildChunksFile } from "../lib/rag/chunk-site-data";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "knowledge-base");
const siteDataPath = path.join(outDir, "site-data.json");
const chunksPath = path.join(outDir, "chunks.json");

mkdirSync(outDir, { recursive: true });

const data = buildSiteData();
writeFileSync(siteDataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Wrote ${siteDataPath}`);

const chunksFile = buildChunksFile(data);
writeFileSync(chunksPath, `${JSON.stringify(chunksFile, null, 2)}\n`, "utf8");
console.log(`Wrote ${chunksPath} (${chunksFile.meta.chunkCount} chunks)`);
