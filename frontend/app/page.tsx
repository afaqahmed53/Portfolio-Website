import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { projects, services, site } from "@/lib/content";

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pt-24">
        <SectionLabel index="01">Introduction</SectionLabel>
        <h1 className="mt-6 max-w-4xl text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl">
          I build data systems and applied AI that a team can run.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
          {site.name} is a data engineer in {site.location}, with four years of
          project work across education, construction, and retail — plus a
          master’s thesis on deep learning for early diabetes detection.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className="bg-ink px-5 py-3 text-sm text-paper hover:bg-copper-deep">
            Start a conversation
          </Link>
          <Link href="/work" className="border border-ink px-5 py-3 text-sm hover:border-copper hover:text-copper">
            See the work
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <SectionLabel index="02">How I can help</SectionLabel>
          <ul className="mt-10 grid gap-px bg-line sm:grid-cols-2">
            {services.map((service, index) => (
              <li key={service.title} className="bg-paper p-6 sm:p-8">
                <p className="font-mono text-xs text-muted">0{index + 1}</p>
                <h2 className="mt-3 text-2xl font-medium">{service.title}</h2>
                <p className="mt-3 max-w-md leading-7 text-muted">{service.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex items-end justify-between gap-6">
            <SectionLabel index="03">Selected work</SectionLabel>
            <Link href="/work" className="text-sm hover:text-copper">
              All work
            </Link>
          </div>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="grid gap-3 py-8 sm:grid-cols-[14rem_1fr_auto] sm:items-baseline sm:gap-8"
                >
                  <span className="font-mono text-xs text-muted">{project.context}</span>
                  <span>
                    <span className="block text-2xl font-medium">{project.title}</span>
                    <span className="mt-2 block max-w-xl text-muted">{project.summary}</span>
                  </span>
                  <span className="text-sm text-copper">Read</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-[1fr_1.2fr]">
          <SectionLabel index="04">About</SectionLabel>
          <div>
            <p className="font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl">
              Useful models start with a decision, a dataset, and a person who will look at the result on Monday.
            </p>
            <p className="mt-6 max-w-xl leading-7 text-muted">
              {site.name} builds pipelines and reporting for people who have to trust the number in the meeting. Based in {site.location}. Master’s in computer science from the University of Eastern Finland.
            </p>
            <Link href="/about" className="mt-6 inline-block text-sm hover:text-copper">
              Read about
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-paper/70">
              <span>05</span>
              <span className="mx-2">/</span>
              Contact
            </p>
            <p className="mt-4 font-[family-name:var(--font-display)] text-4xl">
              Tell me what you are trying to measure.
            </p>
          </div>
          <Link href="/contact" className="border border-paper px-5 py-3 text-sm hover:border-copper hover:text-copper">
            {site.email}
          </Link>
        </div>
      </section>
    </div>
  );
}
