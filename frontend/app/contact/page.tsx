import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionLabel } from "@/components/SectionLabel";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Afaq Ahmed, data and AI engineer.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <SectionLabel index="01">Contact</SectionLabel>
        <h1 className="mt-6 text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl">
          Write with the problem, not a job title.
        </h1>
        <p className="mt-6 max-w-md leading-7 text-muted">
          A short note about the decision, the data you already have, and what “better” would look like is enough.
        </p>
        <dl className="mt-10 space-y-4 text-sm">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Email</dt>
            <dd className="mt-1">
              <a className="hover:text-copper" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Phone</dt>
            <dd className="mt-1">
              <a className="hover:text-copper" href={site.phoneHref}>
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Based in</dt>
            <dd className="mt-1">{site.location}</dd>
          </div>
        </dl>
      </div>
      <ContactForm />
    </div>
  );
}
