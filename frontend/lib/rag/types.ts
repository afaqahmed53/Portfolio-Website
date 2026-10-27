export type KnowledgeChunk = {
  id: string;
  /** Logical section for filtering (e.g. project, faq, profile). */
  section: string;
  title: string;
  /** Plain text sent to embeddings / retrieval. */
  text: string;
  metadata: Record<string, string>;
};

export type KnowledgeChunksFile = {
  meta: {
    schemaVersion: 1;
    generatedAt: string;
    sourceFile: "knowledge-base/site-data.json";
    chunkCount: number;
  };
  chunks: KnowledgeChunk[];
};
