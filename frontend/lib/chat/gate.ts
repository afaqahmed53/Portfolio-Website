import type { ChatMessage } from "@/lib/chat/types";

export type GateKind = "greeting" | "off_topic" | "on_topic";

const GREETING =
  /^(hi|hii|hey|hello|yo|sup|howdy|hiya|good\s+(morning|afternoon|evening)|how\s+are\s+you|how'?s\s+it\s+going|thanks|thank\s+you|thx|ok|okay|cool|nice|great)\b/i;

const FOLLOW_UP =
  /^(yes|yeah|yep|sure|please|go\s+on|and|more|tell\s+me\s+more|what\s+about|why|how|which|that|this|those|continue|go\s+ahead)[\s.?!]*$/i;

const ON_TOPIC =
  /\b(afaq|you|your|he|his|him|hire|hiring|recruit|role|job|fit|relevant|experience|work|project|portfolio|resume|cv|curriculum\s+vitae|background|qualification|degree|bachelor|master|certif|skill|stack|data|ai|ml|machine\s*learning|pipeline|etl|elt|warehouse|lakehouse|dbt|fabric|spark|pyspark|python|sql|power\s*bi|tableau|databricks|airflow|azure|devops|uef|finland|espoo|gagamuller|wayloader|diabetes|thesis|education|available|open\s+to|contact|email|phone|location|remote|summary|about|sst|melbourne|retail|smart\s+solutions)\b/i;

const OFF_TOPIC =
  /\b(weather|homework|essay|joke|poem|recipe|crypto|bitcoin|stock|news|sports|game|movie|lyrics|write\s+(me\s+)?code|implement\s+for\s+me|jailbreak|ignore\s+(all\s+)?(previous|prior)|system\s+prompt|api\s+key|password)\b/i;

function lastUserText(messages: ChatMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i]?.role === "user") return messages[i].content.trim();
  }
  return "";
}

export function classifyTurn(messages: ChatMessage[]): GateKind {
  const text = lastUserText(messages);
  if (!text) return "greeting";

  if (OFF_TOPIC.test(text)) return "off_topic";

  if (ON_TOPIC.test(text)) return "on_topic";

  const hadAssistant = messages.some((m) => m.role === "assistant");
  if (hadAssistant && FOLLOW_UP.test(text)) return "on_topic";

  const short = text.length < 48 && !/[?]/.test(text);
  if (GREETING.test(text) && short) return "greeting";

  if (GREETING.test(text) && !ON_TOPIC.test(text)) return "greeting";

  return "off_topic";
}
