import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Work" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sections = [
    { label: "Problem", text: project.problem },
    { label: "Approach", text: project.approach },
    { label: "Outcome", text: project.outcome },
  ];

  return (
    <article className="mx-auto max-w-6xl px-6 py-16">
      <Link href="/work" className="font-mono text-xs uppercase tracking-[0.16em] text-muted hover:text-copper">
        All work
      </Link>
      <h1 className="mt-8 max-w-3xl text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl">
        {project.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{project.summary}</p>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {project.context} · {project.tags.join(" · ")}
      </p>

      <div className="mt-14 grid gap-12">
        {sections.map((section) => (
          <section key={section.label} className="grid gap-4 border-t border-line pt-8 md:grid-cols-[10rem_1fr]">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-copper">{section.label}</h2>
            <p className="max-w-2xl text-lg leading-8">{section.text}</p>
          </section>
        ))}
        <section className="grid gap-4 border-t border-line pt-8 md:grid-cols-[10rem_1fr]">
          <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-copper">Stack</h2>
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li key={item} className="border border-line px-3 py-2 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
