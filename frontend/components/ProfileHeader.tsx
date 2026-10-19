import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail";
import { nav, site } from "@/lib/content";

export function ProfileHeader() {
  return (
    <header id="top" className="site-header sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/#top" className="group flex min-w-0 items-center gap-3">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-white text-sm font-semibold tracking-wide text-forest"
              aria-hidden
            >
              AA
            </span>
            <span className="min-w-0">
              <span className="block font-semibold tracking-tight group-hover:text-forest">
                {site.name}
              </span>
              <span className="block font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                {site.title} · {site.location}
              </span>
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <a className="hover:text-forest" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <CopyEmail />
            <a className="text-muted hover:text-forest" href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </div>
        <nav aria-label="Page" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link text-muted hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
