import { Resource } from "@/lib/types";

const econ: [string, string, Resource["type"], string][] = [
  ["economics-notes", "Economics Fundamentals Notes", "Notes", "Economics"],
  ["micro-elasticity", "Microeconomics: Supply, Demand & Elasticity", "PDF", "Microeconomics"],
  ["macro-basics", "Macroeconomics: GDP, Inflation & Unemployment", "Guide", "Macroeconomics"],
  ["market-structures", "Market Structures Practice Pack", "Worksheet", "Economics"],
  ["game-theory", "Game Theory Basics", "Book", "Economics"],
  ["finance-starter", "Finance & Investment Starter Guide", "Guide", "Finance"],
  ["cfa-econ", "CFA Level 1 Economics Overview", "PDF", "Finance"],
  ["econ-olympiad-set", "Economics Olympiad Problem Set", "Past Paper", "Economics"],
  ["business-frameworks", "Business Case Frameworks", "Checklist", "Business"],
  ["behavioral-econ", "Behavioral Economics Reading Pack", "Link", "Economics"],
];

export const resources: Resource[] = [
  ...econ.map(([id, title, type, subject], i) => ({
    id, title, type, subject, majorTargets: ["economics", "finance", "business"], tags: ["Economics", "Finance", "Business", i > 6 ? "Olympiads" : "Portfolio Building"], level: i < 4 ? "Beginner" : "Intermediate", language: i % 3 === 0 ? "Russian" : "English", description: "Generated sample learning resource metadata for Mentoria Hub demos. Placeholder file only.", fileUrl: `/resources/${id}.pdf`, isDownloadable: true, estimatedReadingTime: `${20 + i * 5} min`, createdAt: `2026-06-${10 + i}`
  } as Resource)),
  { id: "sat-formulas", title: "SAT Math Formula Sheet", type: "Checklist", subject: "SAT Math", majorTargets: ["admissions", "mathematics"], tags: ["SAT", "STEM"], level: "Beginner", language: "English", description: "Core formulas and mistake patterns for SAT Math.", fileUrl: "/resources/sat-formulas.pdf", isDownloadable: true, estimatedReadingTime: "25 min", createdAt: "2026-06-15" },
  { id: "ielts-writing", title: "IELTS Writing Task 2 Planner", type: "Worksheet", subject: "IELTS", majorTargets: ["admissions", "humanities"], tags: ["IELTS", "English"], level: "Beginner", language: "English", description: "Template for argument structure and vocabulary practice.", fileUrl: "/resources/ielts-writing.pdf", isDownloadable: true, estimatedReadingTime: "30 min", createdAt: "2026-06-14" },
  { id: "cs-projects", title: "Beginner CS Portfolio Projects", type: "Guide", subject: "Computer Science", majorTargets: ["computer-science", "ai-data-science"], tags: ["Programming", "Hackathons", "Portfolio Building"], level: "Beginner", language: "English", description: "Project ideas for first technical portfolio pieces.", fileUrl: "/resources/cs-projects.pdf", isDownloadable: true, estimatedReadingTime: "35 min", createdAt: "2026-06-13" },
  { id: "premed-research", title: "Pre-Med Research Starter Kit", type: "Guide", subject: "Biology", majorTargets: ["medicine", "biology"], tags: ["Science", "Research"], level: "Intermediate", language: "Russian", description: "How to read biology papers and write a research summary.", fileUrl: "/resources/premed-research.pdf", isDownloadable: true, estimatedReadingTime: "45 min", createdAt: "2026-06-12" },
];
