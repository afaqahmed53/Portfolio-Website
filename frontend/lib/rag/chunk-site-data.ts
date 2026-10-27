import type { SiteData } from "@/lib/site-data";
import type { KnowledgeChunk, KnowledgeChunksFile } from "@/lib/rag/types";

function chunk(
  id: string,
  section: string,
  title: string,
  text: string,
  metadata: Record<string, string> = {},
): KnowledgeChunk {
  return { id, section, title, text: text.trim(), metadata };
}

/** Turn synced site JSON into RAG-sized text chunks (no embeddings yet). */
export function chunkSiteData(data: SiteData): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  chunks.push(
    chunk(
      "profile",
      "profile",
      data.site.name,
      [
        `${data.site.name} — ${data.site.title}`,
        data.site.headline,
        data.site.bio,
        `Resume summary: ${data.site.resumeSummary}`,
        `Location: ${data.site.location}`,
        `Timezone: ${data.site.timezone}`,
        `Email: ${data.site.email}`,
        `Phone: ${data.site.phone}`,
      ].join("\n"),
      { type: "profile" },
    ),
  );

  chunks.push(
    chunk(
      "cv-overview",
      "cv",
      "CV / resume (site content)",
      [
        `Downloadable resume: ${data.site.resumePath} (${data.site.resumeDownloadName}).`,
        "Sections on this CV: profile and contact; quick summary; skillset; professional experience; academic profile.",
        `Resume PDF synced as plain text (${data.resumeDocument.sourcePdf}, last updated ${data.resumeDocument.lastUpdated}): ${data.resumeDocument.sections.map((s) => s.title).join("; ")}.`,
        "Site sections also in the knowledge base: career highlights; services; work experience; selected projects; education; technical stack; availability and FAQs.",
        `Experience: ${data.experience.map((e) => `${e.org} (${e.place})`).join("; ")}.`,
        `Education: ${data.education.map((e) => `${e.credential} — ${e.school}`).join("; ")}.`,
        `Projects: ${data.projects.map((p) => p.title).join("; ")}.`,
        `Stack groups: ${data.stackGroups.map((g) => g.title).join(", ")}.`,
        data.cvExtras.certifications.length
          ? `Certifications: ${data.cvExtras.certifications.join("; ")}.`
          : "Certifications: none listed in site content.",
        data.cvExtras.spokenLanguages.length
          ? `Spoken languages: ${data.cvExtras.spokenLanguages.join("; ")}.`
          : "Spoken languages: none listed in site content.",
      ].join("\n"),
      { type: "cv-overview" },
    ),
  );

  for (const section of data.resumeDocument.sections) {
    chunks.push(
      chunk(
        `resume-pdf-${section.id}`,
        "cv",
        section.title,
        section.text,
        {
          type: "resume-pdf",
          source: data.resumeDocument.sourcePdf,
          sectionId: section.id,
        },
      ),
    );
  }

  if (data.about.length > 0) {
    chunks.push(
      chunk(
        "about",
        "about",
        "About Afaq",
        data.about.join("\n\n"),
        { type: "about" },
      ),
    );
  }

  for (const stat of data.stats) {
    chunks.push(
      chunk(
        `stat-${stat.label.toLowerCase().replace(/\s+/g, "-")}`,
        "stats",
        stat.label,
        `${stat.label}: ${stat.value}`,
        { type: "stat" },
      ),
    );
  }

  for (const service of data.services) {
    chunks.push(
      chunk(
        `service-${service.title.toLowerCase().replace(/\s+/g, "-")}`,
        "services",
        service.title,
        `${service.title}\n${service.text}`,
        { type: "service" },
      ),
    );
  }

  for (const project of data.projects) {
    chunks.push(
      chunk(
        `project-${project.slug}`,
        "projects",
        project.title,
        [
          `${project.title} (${project.category})`,
          `Context: ${project.context}`,
          project.summary,
          `Problem: ${project.problem}`,
          `Approach: ${project.approach}`,
          `Outcome: ${project.outcome}`,
          `Stack: ${project.stack.join(", ")}`,
          `Tags: ${project.tags.join(", ")}`,
          project.metrics.length
            ? `Metrics: ${project.metrics.map((m) => `${m.value} ${m.label}`).join("; ")}`
            : "",
        ]
          .filter(Boolean)
          .join("\n"),
        { type: "project", slug: project.slug, category: project.category },
      ),
    );
  }

  for (const [index, exp] of data.experience.entries()) {
    chunks.push(
      chunk(
        `experience-${index}`,
        "experience",
        exp.org,
        [
          exp.org,
          "role" in exp && exp.role ? exp.role : "",
          "period" in exp && exp.period ? exp.period : "",
          exp.place,
          exp.text,
        ]
          .filter(Boolean)
          .join("\n"),
        { type: "experience", org: exp.org },
      ),
    );
  }

  for (const group of data.stackGroups) {
    chunks.push(
      chunk(
        `stack-${group.title.toLowerCase().replace(/\s+/g, "-")}`,
        "stack",
        group.title,
        `${group.title}: ${group.items.join(", ")}`,
        { type: "stack" },
      ),
    );
  }

  for (const [index, edu] of data.education.entries()) {
    chunks.push(
      chunk(
        `education-${index}`,
        "education",
        edu.credential,
        [
          `${edu.credential}`,
          `${edu.school}, ${edu.place}`,
          edu.detail,
        ].join("\n"),
        { type: "education", school: edu.school },
      ),
    );
  }

  for (const [index, faq] of data.faqs.entries()) {
    chunks.push(
      chunk(
        `faq-${index}`,
        "faq",
        faq.question,
        `Q: ${faq.question}\nA: ${faq.answer}`,
        { type: "faq" },
      ),
    );
  }

  return chunks;
}

export function buildChunksFile(data: SiteData): KnowledgeChunksFile {
  const chunks = chunkSiteData(data);
  return {
    meta: {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      sourceFile: "knowledge-base/site-data.json",
      chunkCount: chunks.length,
    },
    chunks,
  };
}
