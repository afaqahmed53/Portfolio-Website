import Link from "next/link";
import { nav, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 sm:grid-cols-3">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl">{site.name}</p>
          <p className="mt-2 text-sm text-muted">{site.role}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-copper">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-sm">
          <a className="block hover:text-copper" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="mt-2 block hover:text-copper" href={site.phoneHref}>
            {site.phone}
          </a>
          <p className="mt-2 text-muted">{site.location}</p>
        </div>
      </div>
    </footer>
  );
}
