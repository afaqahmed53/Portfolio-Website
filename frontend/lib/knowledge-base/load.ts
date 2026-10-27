import { readFileSync } from "node:fs";

import type { SiteData } from "@/lib/site-data";
import type { KnowledgeChunksFile } from "@/lib/rag/types";
import { chunksJsonPath, siteDataJsonPath } from "@/lib/knowledge-base/paths";

export function loadSiteDataFromKnowledgeBase(): SiteData {
  const raw = readFileSync(siteDataJsonPath, "utf8");
  return JSON.parse(raw) as SiteData;
}

export function loadChunksFromKnowledgeBase(): KnowledgeChunksFile {
  const raw = readFileSync(chunksJsonPath, "utf8");
  return JSON.parse(raw) as KnowledgeChunksFile;
}
