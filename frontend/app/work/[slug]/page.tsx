import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjectNeighbors, projects } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { previous, next } = getProjectNeighbors(slug);

  return (
    <article className="mx-auto max-w-3xl px-6 pt-10 pb-16">
      <Link href="/#projects" className="text-sm text-forest hover:underline">
        ← Selected work
      </Link>
      <p className="mt-6 font-mono text-xs tracking-[0.16em] text-muted uppercase">
        {project.category}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-3 text-forest">{project.context}</p>
      <p className="mt-6 text-lg leading-8 text-muted">{project.summary}</p>

      {project.metrics.length > 0 && (
        <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="surface-card bg-paper px-4 py-5">
              <dt className="text-sm text-muted">{metric.label}</dt>
              <dd className="mt-2 text-3xl font-semibold text-forest">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className="chip rounded-full border border-line bg-white px-3 py-1 text-sm hover:border-forest"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-12 space-y-10 border-t border-line pt-10">
        <section>
          <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            Problem
          </h2>
          <p className="mt-3 leading-8">{project.problem}</p>
        </section>
        <section>
          <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            Approach
          </h2>
          <p className="mt-3 leading-8">{project.approach}</p>
        </section>
        <section>
          <h2 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            Outcome
          </h2>
          <p className="mt-3 leading-8">{project.outcome}</p>
        </section>
      </div>

      <nav
        aria-label="More projects"
        className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
      >
        {previous ? (
          <Link href={`/work/${previous.slug}`} className="row-link px-3 py-3 hover:text-forest">
            <span className="block font-mono text-xs text-muted">Previous</span>
            <span className="mt-1 block text-lg font-medium">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/work/${next.slug}`}
            className="row-link px-3 py-3 hover:text-forest sm:text-right"
          >
            <span className="block font-mono text-xs text-muted">Next</span>
            <span className="mt-1 block text-lg font-medium">{next.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
