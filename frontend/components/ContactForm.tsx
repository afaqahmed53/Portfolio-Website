"use client";

import { FormEvent } from "react";
import { site } from "@/lib/content";

export function ContactForm() {
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "someone"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <label className="grid gap-2 text-sm">
        Name
        <input
          name="name"
          required
          autoComplete="name"
          className="border border-line bg-paper px-3 py-3 text-base text-ink"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Email
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border border-line bg-paper px-3 py-3 text-base text-ink"
        />
      </label>
      <label className="grid gap-2 text-sm">
        Message
        <textarea
          name="message"
          required
          rows={6}
          className="border border-line bg-paper px-3 py-3 text-base text-ink"
        />
      </label>
      <button
        type="submit"
        className="justify-self-start bg-ink px-5 py-3 text-sm text-paper hover:bg-copper-deep"
      >
        Open email
      </button>
      <p className="text-sm text-muted">
        This opens your mail app addressed to {site.email}. It does not store the message.
      </p>
    </form>
  );
}
