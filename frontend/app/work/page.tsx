import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected data engineering work by Afaq Ahmed: university analytics, delivery reporting, and Microsoft Fabric.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionLabel index="01">Work</SectionLabel>
      <h1 className="mt-6 max-w-3xl text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl">
        Selected work.
      </h1>
      <p className="mt-6 max-w-2xl leading-7 text-muted">
        Three projects from university analytics and from GagaMuller: delivery reporting, and a Fabric lakehouse for WayLoader.
      </p>
      <ul className="mt-12 divide-y divide-line border-y border-line">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link href={`/work/${project.slug}`} className="block py-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-3xl font-medium">{project.title}</h2>
                <span className="font-mono text-xs text-muted">{project.context}</span>
              </div>
              <p className="mt-4 max-w-2xl leading-7 text-muted">{project.summary}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-copper">
                {project.tags.join(" · ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
