export const site = {
  name: "Afaq Ahmed",
  role: "Data and AI Engineer",
  email: "iafaqhere1@gmail.com",
  phone: "+358 41 7235431",
  phoneHref: "tel:+358417235431",
  location: "Espoo, Finland",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
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
    text: "Power BI and Tableau views for retention, delivery, sales, and project risk — one definition per metric.",
  },
  {
    title: "Applied ML",
    text: "Anomaly checks in production data, and research on deep learning for early diabetes detection.",
  },
] as const;

export const skills = [
  "Python / PySpark",
  "SQL",
  "ETL / ELT",
  "Dimensional modeling",
  "dbt",
  "Microsoft Fabric",
  "Databricks",
  "Apache Spark",
  "Azure Data Factory",
  "Apache Airflow",
  "Power BI",
  "Tableau",
  "Docker",
  "Git / Azure DevOps",
] as const;

export const experience = [
  {
    org: "University of Eastern Finland",
    place: "Joensuu, Finland",
    text: "Pipelines and a warehouse for student enrollment, performance, and feedback — more than 5 million records — plus Power BI for retention, graduation, and dropout risk.",
  },
  {
    org: "GagaMuller",
    place: "Dublin, Ireland",
    text: "Analytics for engineering delivery, a Microsoft Fabric lakehouse for WayLoader, and live Power BI for construction risk, resources, and procurement.",
  },
] as const;

export const education = [
  {
    school: "University of Eastern Finland",
    place: "Joensuu, Finland",
    credential: "Master’s in Computer Science",
    detail:
      "Thesis: hybrid deep learning model for early diabetes detection. Courses included machine learning, deep learning, image processing, and natural language processing.",
  },
  {
    school: "COMSATS University Islamabad",
    place: "Islamabad, Pakistan",
    credential: "Bachelor’s in Computer Science",
    detail:
      "Final project: a point-of-sale system in PHP and SQL, tested with local retailers. Courses included data warehousing, data mining, and artificial intelligence.",
  },
] as const;

export type Project = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  tags: string[];
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "student-data-platform",
    title: "Student data platform",
    summary:
      "Pipelines, a dimensional warehouse, and Power BI for enrollment, performance, and feedback at the University of Eastern Finland.",
    context: "University of Eastern Finland",
    tags: ["Pipelines", "Warehouse", "Power BI"],
    problem:
      "Academic reporting depended on manual work across enrollment, grades, and feedback. Staff waited hours for a report, and odd records — a sudden GPA jump, a missing enrollment id — took too long to find.",
    approach:
      "Built ETL and ELT jobs in Python, PySpark, and SQL over more than 5 million records. Modeled student, faculty, and course data in a warehouse, published Power BI for retention, graduation, dropout risk, and workload, and added Python checks plus checkpointing so Spark jobs could restart without corrupting a load.",
    outcome:
      "Manual processing time fell by 60%. Warehouse queries ran about 45% faster, and report generation moved from hours to minutes. Dashboards made the figures easier for academic staff to reach, and anomaly checks cut investigation time by about 40%.",
    stack: ["Python", "PySpark", "SQL", "Power BI"],
  },
  {
    slug: "engineering-delivery",
    title: "Engineering delivery analytics",
    summary:
      "An Azure DevOps pipeline and live Power BI so GagaMuller leads could see backlog, sprint risk, and capacity without a manual export.",
    context: "GagaMuller · Dublin",
    tags: ["dbt", "Azure DevOps", "Power BI"],
    problem:
      "Sprint planning sat on exported boards. Engineering leads and managers could not see backlog health, project risk, or resource load in one place.",
    approach:
      "Pulled Azure DevOps APIs into an end-to-end pipeline with Python and dbt, then built Power BI that stayed current for leads and senior managers. A second view covered construction projects: risk, resources, and procurement on the same reporting habit.",
    outcome:
      "Backlog analysis time dropped by about 75%. Sprint planning accuracy improved by about 25% across Scrum teams. On the construction work, delivery moved about 25% faster and resource use improved by about 30%.",
    stack: ["Python", "dbt", "Azure DevOps", "Power BI"],
  },
  {
    slug: "wayloader-fabric",
    title: "WayLoader on Microsoft Fabric",
    summary:
      "A lakehouse and pipelines for WayLoader so product sales and reporting were no longer a manual refresh.",
    context: "GagaMuller · WayLoader",
    tags: ["Microsoft Fabric", "Lakehouse"],
    problem:
      "Sales and product reporting lagged the business. People assembled numbers by hand, so a decision often waited on a stale extract.",
    approach:
      "Stood up Data Factory, a lakehouse, and pipelines in Microsoft Fabric, and shaped the data so Power BI could show product sales without a fresh spreadsheet each time.",
    outcome:
      "Data was about 70% fresher. Manual reporting time fell by about 50%, and product sales were visible to the people who needed them.",
    stack: ["Microsoft Fabric", "Data Factory", "Lakehouse", "Power BI"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
