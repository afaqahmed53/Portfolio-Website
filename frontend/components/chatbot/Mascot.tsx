"use client";

import { useEffect, useRef, useState } from "react";

type MascotProps = {
  open: boolean;
  eyesClosed?: boolean;
};

export function Mascot({ open, eyesClosed = false }: MascotProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const inactive = eyesClosed || reduceMotion;

    if (inactive) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const onMove = (event: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const max = 3.2;
      setOffset({
        x: (dx / dist) * Math.min(max, dist / 28),
        y: (dy / dist) * Math.min(max, dist / 28),
      });
    };

    const tick = () => {
      setBlink(true);
      window.setTimeout(() => setBlink(false), 140);
    };

    window.addEventListener("pointermove", onMove);
    const blinkId = window.setInterval(tick, 4200);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearInterval(blinkId);
    };
  }, [eyesClosed, reduceMotion]);

  const pupil = { transform: `translate(${offset.x}px, ${offset.y}px)` };

  return (
    <span
      ref={rootRef}
      className="chatbot-mascot"
      data-open={open || undefined}
      data-sleeping={eyesClosed || undefined}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" width="56" height="56" fill="none" role="img">
        <circle cx="32" cy="32" r="30" fill="#1b4a38" />
        <circle cx="32" cy="32" r="30" fill="url(#mascotShine)" fillOpacity="0.35" />
        <path
          d="M18 38c4 7 24 7 28 0"
          stroke="#cfe0d8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {eyesClosed ? (
          <g className="chatbot-eyes chatbot-eyes--closed">
            <path
              d="M15 27 Q22 23 29 27"
              stroke="#cfe0d8"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M35 27 Q42 23 49 27"
              stroke="#cfe0d8"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </g>
        ) : (
          <g className="chatbot-eyes" data-blink={blink || undefined}>
            <ellipse cx="22" cy="26" rx="8" ry="9" fill="#f4f1ea" />
            <ellipse cx="42" cy="26" rx="8" ry="9" fill="#f4f1ea" />
            <g style={pupil}>
              <circle cx="22" cy="27" r="3.4" fill="#141414" />
              <circle cx="42" cy="27" r="3.4" fill="#141414" />
              <circle cx="20.6" cy="25.6" r="1" fill="#fff" />
              <circle cx="40.6" cy="25.6" r="1" fill="#fff" />
            </g>
          </g>
        )}
        <defs>
          <linearGradient id="mascotShine" x1="18" y1="8" x2="50" y2="56">
            <stop stopColor="#fff" />
            <stop offset="1" stopColor="#1b4a38" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}
