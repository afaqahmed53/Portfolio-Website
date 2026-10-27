import OpenAI from "openai";

import { DEFAULT_SUGGESTIONS, type ChatMessage } from "@/lib/chat/types";
import { buildUserPayload, toOpenAiMessages } from "@/lib/chat/prompt";
import { formatChunksForPrompt, isCvOverviewQuery, retrieveChunks } from "@/lib/chat/retrieve";

export async function generateModelReply(messages: ChatMessage[], query: string) {
  const cvOverview = isCvOverviewQuery(query);
  const notes = formatChunksForPrompt(retrieveChunks(query, cvOverview ? 28 : 5));
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.38,
    max_tokens: cvOverview ? 900 : 380,
    messages: toOpenAiMessages(messages, buildUserPayload(query, notes)),
  });

  const reply =
    completion.choices[0]?.message?.content?.trim() ||
    "I didn’t get a usable answer just then. Try something like his experience, education, projects, stack, or contact details — I’ll keep it short and scannable.";

  return {
    reply,
    source: "model" as const,
    suggestions: [...DEFAULT_SUGGESTIONS],
    aiAvailable: true,
  };
}
