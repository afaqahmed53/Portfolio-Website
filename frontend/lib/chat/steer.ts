import { DEFAULT_SUGGESTIONS } from "@/lib/chat/types";

const GREETINGS = [
  "Hey — good to meet you. I’m Afaq’s assistant. I can walk through his CV — experience, education, projects, stack — or how he might fit a role. What would you like to know?",
  "Hi. I can cover his full background: jobs, degrees, selected work, and tech stack. Or we can focus on role fit — your call.",
  "Hello. I’m here for recruiters: CV sections, projects, and honest role-fit. Where should we start?",
];

const OFF_TOPIC = [
  "I’m not the one for that — I stay on Afaq’s CV and portfolio. Happy to talk education, experience, projects, stack, or role fit.",
  "That’s outside what I cover. I can walk through his CV or how he’d map to a job description.",
  "I’ll skip that one. If you’re hiring or curious about Afaq, ask about his CV, a project, or a role and I’ll keep it useful.",
];

const RATE_LIMITED =
  "You’ve sent quite a few messages in a short time. Give it a little while, or email Afaq from the contact section if it’s urgent.";

const AI_UNAVAILABLE = "AI not available";

function pick(pool: string[], seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return pool[hash % pool.length] ?? pool[0];
}

export function greetingReply(seed: string) {
  return {
    reply: pick(GREETINGS, seed),
    source: "steer" as const,
    suggestions: [...DEFAULT_SUGGESTIONS],
  };
}

export function offTopicReply(seed: string) {
  return {
    reply: pick(OFF_TOPIC, seed),
    source: "steer" as const,
    suggestions: [...DEFAULT_SUGGESTIONS],
  };
}

export function rateLimitedReply() {
  return {
    reply: RATE_LIMITED,
    source: "steer" as const,
    suggestions: [...DEFAULT_SUGGESTIONS],
  };
}

export function aiUnavailableReply() {
  return {
    reply: AI_UNAVAILABLE,
    source: "unavailable" as const,
    aiAvailable: false,
    suggestions: [...DEFAULT_SUGGESTIONS],
  };
}

export function missingKeyReply() {
  return aiUnavailableReply();
}
