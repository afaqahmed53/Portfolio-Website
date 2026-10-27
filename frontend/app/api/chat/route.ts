import { NextResponse } from "next/server";

import { generateModelReply } from "@/lib/chat/generate";
import { classifyTurn } from "@/lib/chat/gate";
import { allowRequest, clientIp } from "@/lib/chat/rate-limit";
import { lastUserMessage, sanitizeMessages } from "@/lib/chat/sanitize";
import {
  aiUnavailableReply,
  greetingReply,
  missingKeyReply,
  offTopicReply,
  rateLimitedReply,
} from "@/lib/chat/steer";

export async function POST(request: Request) {
  if (!allowRequest(clientIp(request.headers))) {
    return NextResponse.json(rateLimitedReply());
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(offTopicReply("invalid-json"));
  }

  const messages = sanitizeMessages(
    body && typeof body === "object" ? (body as { messages?: unknown }).messages : [],
  );
  const query = lastUserMessage(messages);
  if (!query) {
    return NextResponse.json(greetingReply("empty"));
  }

  const kind = classifyTurn(messages);
  if (kind === "greeting") {
    return NextResponse.json(greetingReply(query));
  }
  if (kind === "off_topic") {
    return NextResponse.json(offTopicReply(query));
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(missingKeyReply());
  }

  try {
    const result = await generateModelReply(messages, query);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(aiUnavailableReply());
  }
}
