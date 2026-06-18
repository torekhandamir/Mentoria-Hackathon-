import { Resource } from "@/lib/types";

const econ: [string, string, Resource["type"], string][] = [
  ["market-structures", "Market Structures Practice Pack", "Worksheet", "Economics"],
  ["econ-olympiad-set", "Economics Olympiad Problem Set", "Past Paper", "Economics"],
  ["business-frameworks", "Business Case Frameworks", "Checklist", "Business"],
  ["behavioral-econ", "Behavioral Economics Reading Pack", "Link", "Economics"],
];

export const resources: Resource[] = [
  {
    id: "mankiw-principles-6th",
    title: "Mankiw Principles of Economics 6th",
    type: "PDF",
    subject: "Economics",
    majorTargets: ["economics", "finance", "business"],
    tags: ["Economics", "Textbook", "Core Reading"],
    level: "Intermediate",
    language: "English",
    description: "Uploaded economics textbook for foundational theory and structured reading.",
    fileUrl: "/resources/mankiw-principles-of-economics-6th.pdf",
    isDownloadable: true,
    estimatedReadingTime: "PDF",
    createdAt: "2026-06-18",
  },
  {
    id: "core-econ",
    title: "CORE Econ",
    type: "Link",
    subject: "Economics",
    majorTargets: ["economics", "finance", "business"],
    tags: ["Economics", "Interactive", "Core Reading"],
    level: "Beginner",
    language: "English",
    description: "Open online economics curriculum with interactive explanations and modern examples.",
    fileUrl: "https://www.core-econ.org/",
    externalUrl: "https://www.core-econ.org/",
    isDownloadable: false,
    estimatedReadingTime: "Website",
    createdAt: "2026-06-18",
  },
  ...econ.map(([id, title, type, subject], i) => ({
    id, title, type, subject, majorTargets: ["economics", "finance", "business"], tags: ["Economics", "Finance", "Business", i > 6 ? "Olympiads" : "Portfolio Building"], level: i < 4 ? "Beginner" : "Intermediate", language: i % 3 === 0 ? "Russian" : "English", description: "Mentoria study resource for economics, finance and business preparation.", fileUrl: `/resources/${id}.pdf`, isDownloadable: true, estimatedReadingTime: `${20 + i * 5} min`, createdAt: `2026-06-${10 + i}`
  } as Resource)),
  { id: "sat-formulas", title: "SAT Math Formula Sheet", type: "Checklist", subject: "SAT Math", majorTargets: ["admissions", "mathematics"], tags: ["SAT", "STEM"], level: "Beginner", language: "English", description: "Core formulas and mistake patterns for SAT Math.", fileUrl: "/resources/sat-formulas.pdf", isDownloadable: true, estimatedReadingTime: "25 min", createdAt: "2026-06-15" },
  { id: "ielts-writing", title: "IELTS Writing Task 2 Planner", type: "Worksheet", subject: "IELTS", majorTargets: ["admissions", "humanities"], tags: ["IELTS", "English"], level: "Beginner", language: "English", description: "Template for argument structure and vocabulary practice.", fileUrl: "/resources/ielts-writing.pdf", isDownloadable: true, estimatedReadingTime: "30 min", createdAt: "2026-06-14" },
  { id: "cs-projects", title: "Beginner CS Portfolio Projects", type: "Guide", subject: "Computer Science", majorTargets: ["computer-science", "ai-data-science"], tags: ["Programming", "Hackathons", "Portfolio Building"], level: "Beginner", language: "English", description: "Project ideas for first technical portfolio pieces.", fileUrl: "/resources/cs-projects.pdf", isDownloadable: true, estimatedReadingTime: "35 min", createdAt: "2026-06-13" },
  { id: "premed-research", title: "Pre-Med Research Starter Kit", type: "Guide", subject: "Biology", majorTargets: ["medicine", "biology"], tags: ["Science", "Research"], level: "Intermediate", language: "Russian", description: "How to read biology papers and write a research summary.", fileUrl: "/resources/premed-research.pdf", isDownloadable: true, estimatedReadingTime: "45 min", createdAt: "2026-06-12" },
];
