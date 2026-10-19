import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SectionHeading } from "@/components/SectionHeading";
import {
  education,
  experience,
  projects,
  services,
  site,
  stackGroups,
  stats,
} from "@/lib/content";

export default function Home() {
  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto flex min-h-[calc(100svh-7.25rem)] max-w-6xl flex-col justify-center px-6 py-12">
          <p className="font-mono text-[11px] tracking-[0.22em] text-forest uppercase">
            {site.tagline}
          </p>
          <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
            {site.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            {site.bio}
          </p>
        </div>
        <dl className="mx-auto grid max-w-6xl grid-cols-2 border-t border-line sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-8 sm:py-10 ${
                index % 2 === 0 ? "max-sm:border-r max-sm:border-line" : ""
              } ${index < 2 ? "max-sm:border-b max-sm:border-line" : ""} ${
                index < stats.length - 1 ? "sm:border-r sm:border-line" : ""
              }`}
            >
              <dt className="font-mono text-[10px] leading-relaxed tracking-[0.16em] text-muted uppercase">
                {stat.label}
              </dt>
              <dd
                className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${
                  "accent" in stat && stat.accent ? "text-forest" : ""
                }`}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="services" className="scroll-mt-36 border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading id="services-heading" title="What I build" label="Services" />
          <ul className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <li key={service.title} className="surface-card bg-paper p-6 sm:p-8">
                <p className="font-mono text-xs text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-medium">{service.title}</h3>
                <p className="mt-3 leading-7 text-muted">{service.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="projects" className="scroll-mt-36 border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading title="Selected work" label="Projects" />
          <ul className="mt-2 divide-y divide-line border-b border-line">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="row-link group grid gap-4 px-3 py-8 sm:grid-cols-[11rem_1fr] sm:gap-10"
                >
                  <span className="font-mono text-xs leading-5 text-muted">
                    {project.category}
                    <span className="mt-2 block text-ink">{project.context}</span>
                  </span>
                  <span>
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="text-2xl font-medium tracking-tight group-hover:text-forest">
                        {project.title}
                      </span>
                      <span className="shrink-0 text-sm text-forest transition-transform duration-200 group-hover:translate-x-1">
                        Read
                      </span>
                    </span>
                    <span className="mt-3 block max-w-2xl leading-7 text-muted">
                      {project.summary}
                    </span>
                    {project.metrics.length > 0 && (
                      <span className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                        {project.metrics.map((metric) => (
                          <span key={metric.label} className="text-sm">
                            <span className="font-semibold text-forest">
                              {metric.value}
                            </span>{" "}
                            <span className="text-muted">{metric.label}</span>
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href="/work" className="text-sm text-forest hover:underline">
              Open the full archive
            </Link>
          </p>
        </div>
      </section>

      <section id="experience" className="scroll-mt-36 border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading title="Experience" label="Where the work happened" />
          <ul className="mt-2 divide-y divide-line border-b border-line">
            {experience.map((job) => (
              <li
                key={job.org}
                className="grid gap-3 py-8 md:grid-cols-[16rem_1fr] md:gap-10"
              >
                <div>
                  <h3 className="text-xl font-medium">{job.org}</h3>
                  <p className="mt-1 font-mono text-xs text-muted">{job.place}</p>
                </div>
                <p className="leading-7 text-muted">{job.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="stack" className="scroll-mt-36 border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading title="Stack" label="What I reach for" />
          <div className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2">
            {stackGroups.map((group) => (
              <div key={group.title} className="surface-card bg-paper p-6 sm:p-8">
                <h3 className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="chip rounded-full border border-line bg-white px-3 py-1 text-sm hover:border-forest hover:text-forest"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-36 border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading title="About" label="Who you're hiring" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 text-lg leading-8">
              <p>
                I&apos;m {site.name}, a data and AI engineer in {site.location}.
                The work starts with a decision someone has to make on Monday:
                who might leave a program, which sprint is slipping, which
                product is actually selling.
              </p>
              <p className="text-muted">
                Then the data has to get boring. One grain, a tested model, a
                pipeline that can restart. Python, Spark, SQL, dbt, or Fabric —
                whichever already fits the stack. The report only ships after
                that.
              </p>
            </div>
            <aside className="border border-line bg-white p-6 shadow-[0_16px_40px_rgba(20,20,20,0.06)]">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                Now
              </p>
              <p className="mt-3 text-2xl font-medium">{site.title}</p>
              <p className="mt-1 text-muted">{site.location}</p>
              <a className="mt-6 block hover:text-forest" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <a className="mt-2 block hover:text-forest" href={site.phoneHref}>
                {site.phone}
              </a>
            </aside>
          </div>
          <ul className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
            {education.map((item) => (
              <li key={item.credential}>
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  Education
                </p>
                <h3 className="mt-3 text-xl font-medium">{item.credential}</h3>
                <p className="mt-2 text-forest">
                  {item.school} · {item.place}
                </p>
                <p className="mt-4 leading-7 text-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading title="Before we talk" label="Common questions" />
          <div className="mt-8">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-36">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionHeading title="Contact" label="A short brief is enough" />
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-lg leading-8">
                Have a pipeline, a warehouse, a dashboard, or a model that has
                to sit next to production data? Tell me the decision, the data
                you have, and what “done” looks like.
              </p>
              <p className="mt-6 leading-7 text-muted">
                I read every note myself and reply with the most useful next
                step — a call, a written plan, or a clear no if I am the wrong
                person.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
