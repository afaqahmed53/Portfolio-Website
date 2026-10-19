import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-24">
      <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
        404
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-5xl tracking-tight">
        That page is not on this site.
      </h1>
      <p className="max-w-xl leading-7 text-muted">
        The link may be out of date. The work, experience, and contact form are
        still on the home page.
      </p>
      <Link
        href="/"
        className="btn-solid w-fit rounded-full bg-forest px-5 py-3 text-sm font-medium text-white hover:bg-forest-deep"
      >
        Back home
      </Link>
    </div>
  );
}
