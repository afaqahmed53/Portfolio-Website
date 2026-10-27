"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ChatPanel } from "@/components/chatbot/ChatPanel";
import { Mascot } from "@/components/chatbot/Mascot";
import type { ChatMessage, ChatResponse } from "@/lib/chat/types";

const WELCOME: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I’m Afaq’s assistant. Ask about anything on his CV: summary, education, experience, projects, stack, contact, or role fit.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiAvailable, setAiAvailable] = useState(true);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/chat/health")
      .then((res) => res.json() as Promise<{ aiAvailable?: boolean }>)
      .then((data) => {
        if (!cancelled && typeof data.aiAvailable === "boolean") {
          setAiAvailable(data.aiAvailable);
        }
      })
      .catch(() => {
        if (!cancelled) setAiAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab" || !rootRef.current) return;
      const nodes = [
        ...rootRef.current.querySelectorAll<HTMLElement>(
          'button, textarea, [href], input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("disabled"));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root?.contains(event.target as Node)) close();
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, [open, close]);

  async function send(text: string) {
    const next: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await response.json()) as ChatResponse;
      if (data.aiAvailable === false || data.source === "unavailable") {
        setAiAvailable(false);
      } else if (data.aiAvailable === true) {
        setAiAvailable(true);
      }
      const reply =
        data.reply?.trim() ||
        "I didn’t catch that. Try a question about his CV, a project, or role fit.";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setError("Couldn’t reach the assistant. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div ref={rootRef} className="chatbot-root">
      {open ? (
        <ChatPanel
          messages={messages}
          pending={pending}
          error={error}
          onClose={close}
          onSend={send}
        />
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        className="chatbot-trigger"
        aria-expanded={open}
        aria-controls={open ? "chatbot-title" : undefined}
        aria-label={open ? "Chat with Afaq’s assistant (open)" : "Open chat about Afaq"}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <Mascot open={open} eyesClosed={!aiAvailable} />
        {!open ? <span className="chatbot-nudge">Ask me</span> : null}
      </button>
    </div>
  );
}
