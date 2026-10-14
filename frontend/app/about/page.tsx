import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { education, experience, site, skills } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Afaq Ahmed is a data and AI engineer in Espoo, with pipelines, warehouses, and a master’s thesis on diabetes detection.",
};

const steps = [
  {
    title: "Find the decision",
    text: "Name what the report should change: who is at risk of dropping out, which sprint is slipping, which product is actually selling.",
  },
  {
    title: "Make the data boring",
    text: "One grain, a tested model, and a pipeline that can restart. Python, Spark, SQL, dbt, or Fabric — whichever already fits the stack.",
  },
  {
    title: "Put it where people look",
    text: "Power BI or a checked table. If a number moves, the upstream job should fail before the meeting, not during it.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SectionLabel index="01">About</SectionLabel>
      <h1 className="mt-6 max-w-3xl text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl">
        Pipelines and models for education, construction, and retail.
      </h1>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
        {site.name} is a data and AI engineer in {site.location}. Four years of project work building ETL, warehouses, and dashboards — and a master’s thesis on a hybrid deep learning model for early diabetes detection.
      </p>

      <div className="mt-12 grid gap-10 border-t border-line pt-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 text-lg leading-8 text-muted">
          <p>
            Most of the work is getting data into a shape a team will still trust next quarter: enrollment and feedback at a university, delivery data from Azure DevOps, sales on Microsoft Fabric, live risk and procurement for a construction project.
          </p>
          <p>
            The machine learning sits next to that. Anomaly scripts flag odd academic records. The thesis work is a hybrid deep learning model aimed at catching diabetes earlier.
          </p>
        </div>
        <aside className="border border-line p-6">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Now</p>
          <p className="mt-4 text-2xl font-medium">{site.role}</p>
          <p className="mt-2 text-muted">{site.location}</p>
          <a className="mt-6 block hover:text-copper" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="mt-2 block hover:text-copper" href={site.phoneHref}>
            {site.phone}
          </a>
        </aside>
      </div>

      <section className="mt-20">
        <SectionLabel index="02">Experience</SectionLabel>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {experience.map((job) => (
            <li key={job.org} className="grid gap-3 py-8 md:grid-cols-[16rem_1fr]">
              <div>
                <h2 className="text-xl font-medium">{job.org}</h2>
                <p className="mt-1 font-mono text-xs text-muted">{job.place}</p>
              </div>
              <p className="leading-7 text-muted">{job.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <SectionLabel index="03">How the work goes</SectionLabel>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t border-line pt-6">
              <p className="font-mono text-xs text-muted">0{index + 1}</p>
              <h2 className="mt-3 text-2xl font-medium">{step.title}</h2>
              <p className="mt-3 leading-7 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <SectionLabel index="04">Skills</SectionLabel>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <li key={skill} className="border border-line px-4 py-4">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20">
        <SectionLabel index="05">Education</SectionLabel>
        <ul className="mt-8 grid gap-8 md:grid-cols-2">
          {education.map((item) => (
            <li key={item.school} className="border-t border-line pt-6">
              <h2 className="text-2xl font-medium">{item.credential}</h2>
              <p className="mt-2 text-muted">
                {item.school} · {item.place}
              </p>
              <p className="mt-4 leading-7 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
