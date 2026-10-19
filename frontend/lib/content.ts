export const site = {
  name: "Afaq Ahmed",
  title: "Data & AI Engineer",
  tagline:
    "DATA & AI ENGINEER · PIPELINES · WAREHOUSES · ANALYTICS · APPLIED ML",
  headline:
    "Data and AI engineering for teams that need a number they can defend.",
  bio: "Pipelines, warehouses, and Power BI for education, construction, and product sales — with machine learning when the decision needs a model. Based in Espoo.",
  timezone: "EET · UTC+2 · remote-friendly",
  email: "iafaqhere1@gmail.com",
  phone: "+358 41 7235431",
  phoneHref: "tel:+358417235431",
  location: "Espoo, Finland",
  resumePath: "/resume.pdf",
  resumeDownloadName: "Afaq-Ahmed-Resume.pdf",
};

export type Metric = {
  value: string;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  context: string;
  summary: string;
  tags: string[];
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  metrics: Metric[];
};

export const projects: Project[] = [
  {
    slug: "student-data-platform",
    title: "Student data platform",
    category: "Pipelines & analytics",
    context: "University of Eastern Finland",
    summary:
      "Pipelines, a dimensional warehouse, and Power BI for enrollment, performance, and feedback.",
    tags: ["Python", "PySpark", "SQL", "Power BI"],
    problem:
      "Academic reporting depended on manual work across enrollment, grades, and feedback. Staff waited hours for a report, and odd records — a sudden GPA jump, a missing enrollment id — took too long to find.",
    approach:
      "Built ETL and ELT jobs in Python, PySpark, and SQL over more than 5 million records. Modeled student, faculty, and course data in a warehouse, published Power BI for retention, graduation, dropout risk, and workload, and added Python checks plus checkpointing so Spark jobs could restart without corrupting a load.",
    outcome:
      "Manual processing time fell by 60%. Warehouse queries ran about 45% faster, and report generation moved from hours to minutes. Dashboards made the figures easier for academic staff to reach, and anomaly checks cut investigation time by about 40%.",
    stack: ["Python", "PySpark", "SQL", "Power BI"],
    metrics: [
      { value: "60%", label: "less manual processing" },
      { value: "45%", label: "faster warehouse queries" },
      { value: "40%", label: "faster anomaly checks" },
    ],
  },
  {
    slug: "engineering-delivery",
    title: "Engineering delivery analytics",
    category: "dbt & Azure DevOps",
    context: "GagaMuller · Dublin",
    summary:
      "A pipeline and live Power BI so leads could see backlog, sprint risk, and capacity without a manual export.",
    tags: ["Python", "dbt", "Azure DevOps", "Power BI"],
    problem:
      "Sprint planning sat on exported boards. Engineering leads and managers could not see backlog health, project risk, or resource load in one place.",
    approach:
      "Pulled Azure DevOps APIs into an end-to-end pipeline with Python and dbt, then built Power BI that stayed current for leads and senior managers. A second view covered construction projects: risk, resources, and procurement on the same reporting habit.",
    outcome:
      "Backlog analysis time dropped by about 75%. Sprint planning accuracy improved by about 25% across Scrum teams. On the construction work, delivery moved about 25% faster and resource use improved by about 30%.",
    stack: ["Python", "dbt", "Azure DevOps", "Power BI"],
    metrics: [
      { value: "75%", label: "less time on backlog analysis" },
      { value: "25%", label: "better sprint planning accuracy" },
      { value: "30%", label: "better resource use" },
    ],
  },
  {
    slug: "wayloader-fabric",
    title: "WayLoader on Microsoft Fabric",
    category: "Lakehouse",
    context: "GagaMuller · WayLoader",
    summary:
      "A lakehouse and pipelines so product sales reporting was no longer a manual refresh.",
    tags: ["Microsoft Fabric", "Data Factory", "Power BI"],
    problem:
      "Sales and product reporting lagged the business. People assembled numbers by hand, so a decision often waited on a stale extract.",
    approach:
      "Stood up Data Factory, a lakehouse, and pipelines in Microsoft Fabric, and shaped the data so Power BI could show product sales without a fresh spreadsheet each time.",
    outcome:
      "Data was about 70% fresher. Manual reporting time fell by about 50%, and product sales were visible to the people who needed them.",
    stack: ["Microsoft Fabric", "Data Factory", "Lakehouse", "Power BI"],
    metrics: [
      { value: "70%", label: "fresher product data" },
      { value: "50%", label: "less manual reporting" },
    ],
  },
  {
    slug: "diabetes-detection",
    title: "Early diabetes detection",
    category: "Applied research",
    context: "Master’s thesis · University of Eastern Finland",
    summary:
      "A hybrid deep learning model aimed at catching diabetes earlier, next to the production analytics work.",
    tags: ["Deep learning", "Python", "Research"],
    problem:
      "Earlier detection needs a model shaped around the signals in the data, not a single architecture chosen by habit.",
    approach:
      "Researched and built a hybrid deep learning model for early diabetes detection as the master’s thesis, grounded in coursework on machine learning, deep learning, image processing, and natural language processing.",
    outcome:
      "A research model focused on earlier detection, kept separate from the warehouse and dashboard work so each has a clear job.",
    stack: ["Python", "Deep learning", "Machine learning"],
    metrics: [],
  },
];

export const stats = [
  { value: "4 yrs", label: "Project work in data and AI" },
  {
    value: String(projects.length),
    label: "Selected projects",
  },
  { value: "5M+", label: "Records in the largest warehouse" },
  {
    value: "Data + ML",
    label: "Pipelines through models and dashboards",
    accent: true,
  },
] as const;

export const services = [
  {
    title: "Pipelines",
    text: "ETL and ELT in Python, PySpark, and SQL, with retries so a long job can restart cleanly.",
  },
  {
    title: "Warehouses",
    text: "Dimensional models and medallion layouts on Fabric, Databricks, and a warehouse people can query.",
  },
  {
    title: "Reporting",
    text: "Power BI and Tableau for retention, delivery, sales, and project risk — one definition per metric.",
  },
  {
    title: "Applied ML",
    text: "Anomaly checks in production data, and research on deep learning for early diabetes detection.",
  },
  {
    title: "Platforms",
    text: "Microsoft Fabric, Azure Data Factory, Databricks, and Airflow when the data has to stay fresh.",
  },
  {
    title: "Handover",
    text: "dbt, Git, and Azure DevOps so the next person can see how a number was made.",
  },
] as const;

export const experience = [
  {
    org: "University of Eastern Finland",
    place: "Joensuu, Finland",
    text: "Pipelines and a warehouse for student enrollment, performance, and feedback — more than 5 million records — plus Power BI for retention, graduation, and dropout risk. Python checks and Spark checkpointing so a long job can restart without corrupting a load.",
  },
  {
    org: "GagaMuller",
    place: "Dublin, Ireland",
    text: "Analytics for engineering delivery, a Microsoft Fabric lakehouse for WayLoader, and live Power BI for construction risk, resources, and procurement.",
  },
] as const;

export const stackGroups = [
  {
    title: "Languages & compute",
    items: ["Python", "PySpark", "SQL", "Docker"],
  },
  {
    title: "Platforms",
    items: [
      "Microsoft Fabric",
      "Databricks",
      "Azure Data Factory",
      "Apache Airflow",
      "Apache Spark",
    ],
  },
  {
    title: "Modeling & BI",
    items: ["dbt", "Dimensional modeling", "Power BI", "Tableau"],
  },
  {
    title: "Practice",
    items: ["Git", "Azure DevOps", "ETL / ELT", "Anomaly checks"],
  },
] as const;

export const education = [
  {
    credential: "Master’s in Computer Science",
    school: "University of Eastern Finland",
    place: "Joensuu, Finland",
    detail:
      "Thesis: hybrid deep learning model for early diabetes detection. Courses included machine learning, deep learning, image processing, and natural language processing.",
  },
  {
    credential: "Bachelor’s in Computer Science",
    school: "COMSATS University Islamabad",
    place: "Islamabad, Pakistan",
    detail:
      "Final project: a point-of-sale system in PHP and SQL, tested with local retailers. Courses included data warehousing, data mining, and artificial intelligence.",
  },
] as const;

export const faqs = [
  {
    question: "What kind of work do you take on?",
    answer:
      "Pipelines, warehouses, BI, and applied machine learning when the decision needs a model. Education, construction, and product data are the domains I have shipped in.",
  },
  {
    question: "Can you own both the pipeline and the report?",
    answer:
      "Yes. The usual delivery is ingestion, a tested model, and Power BI or Tableau with one definition per metric.",
  },
  {
    question: "Is this only batch analytics?",
    answer:
      "Most of the work is batch and warehouse-centric. I also pull APIs such as Azure DevOps, orchestrate with Airflow, and design for fresher data when the business is waiting on yesterday’s extract.",
  },
  {
    question: "What do you work with?",
    answer:
      "Python, PySpark, SQL, dbt, Microsoft Fabric, Databricks, Azure Data Factory, Airflow, Power BI, Tableau, Git, and Azure DevOps.",
  },
  {
    question: "Are you available?",
    answer:
      "Open to roles and project work from Finland and remote, EU-friendly hours. Send a short brief through the form or email.",
  },
] as const;

export const nav = [
  { href: "/#projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectNeighbors(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
