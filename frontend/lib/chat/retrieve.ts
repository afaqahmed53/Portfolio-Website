import { loadChunksFromKnowledgeBase } from "@/lib/knowledge-base/load";
import type { KnowledgeChunk } from "@/lib/rag/types";

const STOP = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "for",
  "to",
  "of",
  "in",
  "on",
  "is",
  "are",
  "was",
  "be",
  "he",
  "his",
  "him",
  "you",
  "your",
  "what",
  "how",
  "does",
  "did",
  "about",
  "with",
  "that",
  "this",
  "from",
  "can",
  "would",
  "could",
]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

const SECTION_ORDER = [
  "profile",
  "cv",
  "about",
  "stats",
  "services",
  "experience",
  "projects",
  "education",
  "stack",
  "faq",
] as const;

const SPOKEN_LANGUAGE_QUERY =
  /\b(speak|speaks|speaking|spoken|fluent|bilingual|mother\s+tongue|native\s+language)\b/i;

const CV_NARROW_TOPIC =
  /\b(skills?|stack|tech|tools?|experience|work|projects?|education|degrees?|contact|email|phone)\b/i;
const CV_NARROW_INTENT = /\b(only|just|specifically)\b/i;

const CV_OVERVIEW_BROAD =
  /\b(everything|all|entire|full|whole|overview|summary|summarize|what'?s\s+on|walk\s+me|run\s+me\s+through|cover|sections?|background|qualifications?)\b/i;

const SECTION_QUERY_HINTS: Record<string, RegExp> = {
  education: /\b(education|degree|university|school|thesis|bachelor|master|msc|bsc|studied|graduate|academic)\b/i,
  experience: /\b(experience|employer|work\s+history|job|role|company|organi[sz]ation|career)\b/i,
  projects: /\b(project|portfolio|case\s+study|built|shipped|achievement)\b/i,
  stack: /\b(skill|stack|tech|tool|platform|framework|dbt|fabric|spark|python|sql|pyspark|programming|compute)\b/i,
  profile: /\b(contact|email|phone|location|bio|headline|who\s+is|introduce|summary|summarize)\b/i,
  about: /\b(about\s+(him|afaq)|who\s+are\s+you|background\s+story|personality)\b/i,
  cv: /\b(certif|credential|licen[cs]e|spoken\s+language)\b/i,
  services: /\b(service|offer|help\s+with|take\s+on|deliver)\b/i,
  faq: /\b(available|availability|hire|hiring|remote|open\s+to)\b/i,
  stats: /\b(highlight|stat|metric|years?)\b/i,
};

function hasCvOrResumeReference(query: string): boolean {
  return /\b(cv|cvs|resume|résumé|curriculum\s+vitae)\b/i.test(query);
}

/** Broad CV / resume questions should pull the whole knowledge base, not top-5 keyword hits. */
export function isCvOverviewQuery(query: string): boolean {
  const text = query.trim();
  if (!text) return false;
  if (CV_NARROW_INTENT.test(text) && CV_NARROW_TOPIC.test(text)) return false;

  if (hasCvOrResumeReference(text)) {
    if (CV_OVERVIEW_BROAD.test(text)) return true;
    if (/\b(about|show|share|see|read|tell\s+me)\b/i.test(text)) return true;
    const queryTokens = tokens(text);
    if (queryTokens.length <= 4) return true;
  }

  if (
    CV_OVERVIEW_BROAD.test(text) &&
    /\b(afaq|you|your|he|his|him|background|profile)\b/i.test(text)
  ) {
    return true;
  }

  if (/\btell\s+me\s+about\s+(him|afaq|his\s+(background|profile|cv|resume))\b/i.test(text)) {
    return true;
  }

  if (/\bwho\s+is\b/i.test(text) && /\b(afaq|he)\b/i.test(text)) return true;

  return false;
}

function orderChunks(chunks: KnowledgeChunk[]): KnowledgeChunk[] {
  const rank = new Map(SECTION_ORDER.map((section, index) => [section, index]));
  return [...chunks].sort((a, b) => {
    const aRank = rank.get(a.section as (typeof SECTION_ORDER)[number]) ?? 99;
    const bRank = rank.get(b.section as (typeof SECTION_ORDER)[number]) ?? 99;
    if (aRank !== bRank) return aRank - bRank;
    return a.id.localeCompare(b.id);
  });
}

function matchedSections(query: string): string[] {
  const sections: string[] = [];
  for (const [section, pattern] of Object.entries(SECTION_QUERY_HINTS)) {
    if (pattern.test(query)) sections.push(section);
  }
  if (SPOKEN_LANGUAGE_QUERY.test(query)) {
    return sections.filter((s) => s !== "stack").concat(["profile", "cv"]);
  }
  return sections;
}

function expandQueryTokens(query: string, queryTokens: string[]): string[] {
  const expanded = new Set(queryTokens);
  for (const section of matchedSections(query)) {
    expanded.add(section);
  }
  if (hasCvOrResumeReference(query)) {
    for (const section of SECTION_ORDER) expanded.add(section);
  }
  return [...expanded];
}

function chunksForMatchedSections(
  query: string,
  chunks: KnowledgeChunk[],
): KnowledgeChunk[] {
  const sections = new Set(matchedSections(query));
  if (sections.size === 0) return [];
  return chunks.filter((chunk) => sections.has(chunk.section));
}

function score(queryTokens: string[], chunk: KnowledgeChunk): number {
  const titleTokens = tokens(chunk.title);
  const bodyTokens = tokens(chunk.text);
  let value = 0;
  for (const token of queryTokens) {
    if (chunk.section === token || chunk.metadata?.type === token) value += 4;
    if (titleTokens.includes(token)) value += 3;
    if (bodyTokens.includes(token)) value += 1;
    if (chunk.section.includes(token) || chunk.id.includes(token)) value += 1;
  }
  return value;
}

function fallbackChunks(chunks: KnowledgeChunk[], k: number): KnowledgeChunk[] {
  const picked: KnowledgeChunk[] = [];
  const seen = new Set<string>();
  for (const section of SECTION_ORDER) {
    for (const chunk of chunks) {
      if (chunk.section !== section || seen.has(chunk.id)) continue;
      picked.push(chunk);
      seen.add(chunk.id);
      if (picked.length >= k) return picked;
    }
  }
  return picked;
}

export function retrieveChunks(query: string, k = 5): KnowledgeChunk[] {
  const { chunks } = loadChunksFromKnowledgeBase();

  if (isCvOverviewQuery(query)) {
    return orderChunks(chunks);
  }

  if (SPOKEN_LANGUAGE_QUERY.test(query)) {
    return orderChunks(
      chunks.filter((chunk) => chunk.section === "profile" || chunk.section === "cv"),
    );
  }

  const queryTokens = expandQueryTokens(query, tokens(query));
  if (queryTokens.length === 0) {
    return fallbackChunks(chunks, k);
  }

  const ranked = [...chunks]
    .map((chunk) => ({ chunk, value: score(queryTokens, chunk) }))
    .sort((a, b) => b.value - a.value)
    .filter((row) => row.value > 0);

  if (ranked.length === 0 && hasCvOrResumeReference(query)) {
    return orderChunks(chunks);
  }

  const limit = hasCvOrResumeReference(query) ? Math.max(k, 12) : k;
  const keywordHits = ranked.slice(0, limit).map((row) => row.chunk);
  const sectionHits = chunksForMatchedSections(query, chunks);
  if (sectionHits.length === 0) return keywordHits;

  const seen = new Set<string>();
  const merged: KnowledgeChunk[] = [];
  for (const chunk of orderChunks([...sectionHits, ...keywordHits])) {
    if (seen.has(chunk.id)) continue;
    seen.add(chunk.id);
    merged.push(chunk);
    if (merged.length >= Math.max(limit, sectionHits.length)) break;
  }
  return merged;
}

export function formatChunksForPrompt(chunks: KnowledgeChunk[]): string {
  if (chunks.length === 0) {
    return "(No matching notes. Say you don’t have that in the knowledge base and offer profile, education, experience, projects, stack, or how to contact Afaq.)";
  }
  return chunks
    .map((chunk) => `### ${chunk.title} [${chunk.section}]\n${chunk.text}`)
    .join("\n\n");
}
