"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/content";

export function ContactForm() {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      <label className="grid gap-2 text-sm" htmlFor="name">
        Your name
        <input
          id="name"
          name="name"
          required
          minLength={2}
          placeholder="Your name"
          autoComplete="name"
          className="field border border-line bg-white px-3 py-3 text-base outline-none"
        />
      </label>
      <label className="grid gap-2 text-sm" htmlFor="email">
        Your email
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          autoComplete="email"
          className="field border border-line bg-white px-3 py-3 text-base outline-none"
        />
      </label>
      <label className="grid gap-2 text-sm" htmlFor="message">
        Message
        <textarea
          id="message"
          name="message"
          required
          minLength={12}
          rows={5}
          placeholder="What should change, and where the data lives today."
          className="field border border-line bg-white px-3 py-3 text-base outline-none"
        />
      </label>
      <button
        type="submit"
        className="btn-solid justify-self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-white hover:bg-forest-deep"
      >
        Send message →
      </button>
      <p className="text-sm leading-6 text-muted" role="status">
        {opened
          ? `Your mail app should open a draft to ${site.email}. If it does not, copy the address and write directly.`
          : "This opens a draft in your mail app. Nothing is stored on this site."}
      </p>
    </form>
  );
}
