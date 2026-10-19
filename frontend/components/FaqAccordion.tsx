"use client";

import { useId, useState } from "react";
import { faqs } from "@/lib/content";

export function FaqAccordion() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={faq.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                className="faq-trigger flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span className="text-base font-medium sm:text-lg">
                  {faq.question}
                </span>
                <span className="faq-mark font-mono text-sm text-muted" aria-hidden>
                  {open ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              data-open={open}
              aria-hidden={!open}
              className="faq-panel"
            >
              <div>
                <p
                  className="px-1 pb-5 text-sm leading-7 text-muted sm:text-base"
                  aria-hidden={!open}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
