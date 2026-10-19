import Link from "next/link";
import { site } from "@/lib/content";

const itemClass =
  "btn-ghost shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm whitespace-nowrap hover:border-forest hover:text-forest";

export function QuickActions() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-4 sm:px-4 sm:pb-6">
      <nav
        aria-label="Quick actions"
        className="pointer-events-auto mx-auto flex w-max max-w-full gap-2 overflow-x-auto rounded-full border border-line bg-paper/95 p-2 shadow-[0_10px_40px_rgba(20,20,20,0.08)] backdrop-blur-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <Link
          href="/#contact"
          className="btn-solid shrink-0 rounded-full bg-forest px-4 py-2 text-sm font-medium whitespace-nowrap text-white hover:bg-forest-deep"
        >
          Get in touch
        </Link>
        <Link href="/#projects" className={itemClass}>
          Projects
        </Link>
        <a
          href={site.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClass}
        >
          View resume
        </a>
        <a
          href={site.resumePath}
          download={site.resumeDownloadName}
          className={itemClass}
        >
          Download
        </a>
      </nav>
    </div>
  );
}
