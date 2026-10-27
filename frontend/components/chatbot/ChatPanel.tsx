"use client";

import { useEffect, useRef, type FormEvent, type KeyboardEvent } from "react";

import type { ChatMessage } from "@/lib/chat/types";

type ChatPanelProps = {
  messages: ChatMessage[];
  pending: boolean;
  error: string | null;
  onClose: () => void;
  onSend: (text: string) => void;
};

export function ChatPanel({
  messages,
  pending,
  error,
  onClose,
  onSend,
}: ChatPanelProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const field = inputRef.current;
    if (!field) return;
    const text = field.value.trim();
    if (!text || pending) return;
    field.value = "";
    onSend(text);
  }

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  return (
    <section className="chatbot-panel" role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
      <header className="chatbot-header">
        <div className="chatbot-header-inner">
          <div className="chatbot-header-brand">
            <div className="chatbot-header-badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path
                  d="M12 3.5a5 5 0 0 1 4.9 4.1c2.6.4 4.6 2.5 4.6 5.1 0 2.1-1.2 3.9-3 4.8V19a1 1 0 0 1-1 1h-2.2a3 3 0 0 1-5.8 0H7a1 1 0 0 1-1-1v-1.5c-1.8-.9-3-2.7-3-4.8 0-2.6 2-4.7 4.6-5.1A5 5 0 0 1 12 3.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="9.25" cy="12.25" r="1" fill="currentColor" />
                <circle cx="12" cy="12.25" r="1" fill="currentColor" />
                <circle cx="14.75" cy="12.25" r="1" fill="currentColor" />
              </svg>
            </div>
            <div className="chatbot-header-copy">
              <p className="chatbot-header-label">
                <span className="chatbot-header-status" aria-hidden="true" />
                Assistant
              </p>
              <h2 id="chatbot-title" className="chatbot-header-title">
                Chat with Afaq’s assistant
              </h2>
              <p className="chatbot-header-sub">
                CV-style answers: experience, education, projects, stack, and role fit.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="chatbot-close"
            onClick={onClose}
            aria-label="Close chat"
          >
            <svg
              className="chatbot-close-icon"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
            <span>Close</span>
          </button>
        </div>
      </header>

      <div ref={listRef} className="chatbot-log" aria-live="polite">
        {messages.map((message, index) => (
          <p
            key={`${message.role}-${index}`}
            className={message.role === "user" ? "chatbot-bubble-user" : "chatbot-bubble-bot"}
          >
            {message.content}
          </p>
        ))}
        {pending ? (
          <p className="chatbot-bubble-bot chatbot-typing" aria-label="Assistant is typing">
            <span />
            <span />
            <span />
          </p>
        ) : null}
        {error ? <p className="chatbot-error" role="alert">{error}</p> : null}
      </div>

      <form ref={formRef} onSubmit={submit} className="chatbot-form">
        <label htmlFor="chatbot-input" className="sr-only">
          Message
        </label>
        <div className="flex items-end gap-2">
          <textarea
            id="chatbot-input"
            ref={inputRef}
            rows={2}
            className="chatbot-input"
            placeholder="Ask about projects, stack, or a role…"
            maxLength={800}
            onKeyDown={onKeyDown}
          />
          <button type="submit" className="chatbot-send" disabled={pending}>
            Send
          </button>
        </div>
      </form>
    </section>
  );
}
