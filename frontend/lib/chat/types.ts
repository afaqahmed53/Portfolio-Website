export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type ChatSource = "steer" | "model" | "unavailable";

export type ChatResponse = {
  reply: string;
  source: ChatSource;
  suggestions?: string[];
  aiAvailable?: boolean;
};

export const DEFAULT_SUGGESTIONS = [
  "Walk me through his CV",
  "Experience and projects?",
  "How do I contact him?",
] as const;
