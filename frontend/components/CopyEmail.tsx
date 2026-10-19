"use client";

import { useState } from "react";
import { site } from "@/lib/content";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      alert("Failed to copy email. Please try again.");
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className="btn-ghost rounded-full border border-line bg-white px-3 py-1 text-xs text-ink hover:border-forest hover:text-forest"
      aria-live="polite"
    >
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
