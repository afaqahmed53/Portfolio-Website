import type { ChatMessage } from "@/lib/chat/types";

const MAX_CHARS = 800;
const MAX_MESSAGES = 8;

export function sanitizeMessages(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  const cleaned: ChatMessage[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: string }).role;
    const content = (item as { content?: string }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const text = content.trim().slice(0, MAX_CHARS);
    if (!text) continue;
    cleaned.push({ role, content: text });
  }

  return cleaned.slice(-MAX_MESSAGES);
}

export function lastUserMessage(messages: ChatMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i]?.role === "user") return messages[i].content;
  }
  return "";
}
