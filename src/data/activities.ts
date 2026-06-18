import { Activity } from "@/lib/types";

export const activities: Activity[] = [
  { id: "econ-video", title: "Watch Crash Course Econ #1", type: "Video", category: "Economics", xp: 30, majorTargets: ["economics", "finance"], tags: ["Economics", "Video"], link: "https://www.youtube.com/watch?v=3ez10ADR_gM" },
  { id: "econ-opp-cost", title: "Solve 5 opportunity cost questions", type: "Practice", category: "Economics", xp: 45, majorTargets: ["economics"], tags: ["Economics", "Practice"] },
  { id: "openstax-read", title: "Read the OpenStax economics introduction", type: "Reading", category: "Economics", xp: 35, majorTargets: ["economics"], tags: ["Economics", "Reading"], link: "https://openstax.org/details/books/principles-economics-3e" },
  { id: "save-business", title: "Save one business or economics opportunity", type: "Application", category: "Opportunities", xp: 25, majorTargets: ["economics", "business"], tags: ["Business", "Portfolio Building"], link: "/opportunities" },
  { id: "sat-linear", title: "Complete 10 SAT linear equations questions", type: "Quiz", category: "SAT", xp: 40, majorTargets: ["admissions", "mathematics"], tags: ["SAT", "Math"], link: "https://www.khanacademy.org/test-prep/v2-sat-math" },
  { id: "essay-check", title: "Complete one university essay checklist item", type: "Portfolio", category: "Admissions", xp: 35, majorTargets: ["admissions"], tags: ["University Admission", "Portfolio Building"] },
  { id: "research-program", title: "Compare Lumiere and Pioneer research programs", type: "Reading", category: "Research", xp: 50, majorTargets: ["admissions", "economics", "computer-science"], tags: ["Research", "Summer Schools"], link: "/resources" },
  { id: "deadline-review", title: "Review one upcoming deadline", type: "Deadline", category: "Planning", xp: 20, majorTargets: ["economics", "admissions", "computer-science"], tags: ["Deadline"], link: "/calendar" },
];
