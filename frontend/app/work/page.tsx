import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected data and AI projects: student analytics, engineering delivery, Microsoft Fabric, and diabetes research.",
};

export default function WorkArchivePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/#projects" className="text-sm text-forest hover:underline">
        ← Selected work
      </Link>
      <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-5xl tracking-tight">
        Project archive
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted">
        {projects.length} pieces of work, written the same way: the decision, the
        data, and what changed afterward.
      </p>
      <ul className="mt-12 divide-y divide-line border-y border-line">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="row-link group grid gap-4 px-3 py-8 sm:grid-cols-[14rem_1fr]"
            >
              <span className="font-mono text-xs text-muted">
                {project.category}
                <span className="mt-2 block">{project.context}</span>
              </span>
              <span>
                <span className="block text-2xl font-medium text-ink">
                  {project.title}
                </span>
                <span className="mt-2 block max-w-2xl leading-7 text-muted">
                  {project.summary}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
