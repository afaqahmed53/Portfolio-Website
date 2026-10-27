import path from "node:path";

/** Frontend package root (where `knowledge-base/` lives). */
export const frontendRoot = path.join(process.cwd());

export const knowledgeBaseDir = path.join(frontendRoot, "knowledge-base");

export const siteDataJsonPath = path.join(knowledgeBaseDir, "site-data.json");

export const chunksJsonPath = path.join(knowledgeBaseDir, "chunks.json");
