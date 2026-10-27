import {
  about,
  cvExtras,
  education,
  experience,
  faqs,
  nav,
  projects,
  resumeDocument,
  services,
  site,
  stackGroups,
  stats,
} from "@/lib/content";

/** Shape of `knowledge-base/site-data.json` (auto-generated). */
export type SiteData = {
  meta: {
    schemaVersion: 1;
    generatedAt: string;
    source: "lib/content.ts";
    note: string;
  };
  site: typeof site;
  about: typeof about;
  cvExtras: typeof cvExtras;
  resumeDocument: typeof resumeDocument;
  projects: typeof projects;
  stats: typeof stats;
  services: typeof services;
  experience: typeof experience;
  stackGroups: typeof stackGroups;
  education: typeof education;
  faqs: typeof faqs;
  nav: typeof nav;
};

/** All portfolio content in one object (for JSON export and future chatbot context). */
export function buildSiteData(): SiteData {
  return {
    meta: {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      source: "lib/content.ts",
      note:
        "Do not edit by hand. Edit lib/content.ts, then npm run sync:data (or dev / build). Output: knowledge-base/site-data.json.",
    },
    site,
    about,
    cvExtras,
    resumeDocument,
    projects,
    stats,
    services,
    experience,
    stackGroups,
    education,
    faqs,
    nav,
  };
}
