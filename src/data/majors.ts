import { Major } from "@/lib/types";

const majorRows: [string, string, string, string[]][] = [
  ["economics", "Economics", "Study markets, incentives, policy and decision-making.", ["Economics", "Finance", "Business", "Olympiads"]],
  ["finance", "Finance", "Learn investing, analysis and financial decision-making.", ["Finance", "Business", "Scholarships"]],
  ["business", "Business & Entrepreneurship", "Build startup, case and leadership skills.", ["Business", "Startups", "Portfolio Building"]],
  ["computer-science", "Computer Science", "Create software, apps and technical projects.", ["Programming", "Hackathons", "STEM"]],
  ["ai-data-science", "Artificial Intelligence / Data Science", "Explore AI, data and applied technology.", ["Programming", "AI", "Research"]],
  ["engineering", "Engineering", "Solve technical problems with design and science.", ["STEM", "Physics", "Research"]],
  ["mathematics", "Mathematics", "Strengthen math, olympiad and proof skills.", ["STEM", "SAT", "Olympiads"]],
  ["physics", "Physics", "Understand mechanics, energy and problem solving.", ["STEM", "Science", "Olympiads"]],
  ["biology", "Biology", "Prepare for research and life sciences pathways.", ["Science", "Research", "Medicine"]],
  ["chemistry", "Chemistry", "Build foundations for lab science and pre-med.", ["Science", "Research", "Medicine"]],
  ["medicine", "Medicine / Pre-Med", "Prepare for biology, chemistry, research and service.", ["Science", "Volunteering", "Research"]],
  ["environment", "Environmental Science", "Work on sustainability and climate projects.", ["Science", "Social Impact", "Volunteering"]],
  ["social-impact", "Social Impact", "Build community projects and social leadership.", ["Social Impact", "Volunteering", "Portfolio Building"]],
  ["policy", "Public Policy / International Relations", "Learn policy, diplomacy and public problems.", ["Social Impact", "English", "Research"]],
  ["law", "Law", "Develop argument, research and civic reasoning.", ["English", "Research", "Social Impact"]],
  ["psychology", "Psychology", "Explore behavior, learning and human development.", ["Science", "Research", "Social Impact"]],
  ["education", "Education", "Create learning projects and mentorship pathways.", ["Volunteering", "English", "Social Impact"]],
  ["humanities", "English / Humanities", "Build writing, analysis and communication skills.", ["English", "IELTS", "Research"]],
  ["design", "Design / Creative Industries", "Create visual, product and storytelling portfolios.", ["Portfolio Building", "Design", "Business"]],
  ["admissions", "University Admissions / General Portfolio", "Plan tests, essays, activities and scholarships.", ["SAT", "IELTS", "Scholarships", "University Admission"]],
];

export const majors: Major[] = majorRows.map(([id, title, description, tags]) => ({
  id,
  title,
  description,
  tags: tags as string[],
  recommendedCourses: ["intro-economics", "sat-math", "application-roadmap", "cs-ai"],
  recommendedResources: ["economics-notes", "micro-elasticity", "business-frameworks"],
  recommendedOpportunities: ["asian-economics-olympiad", "business-case-challenge", "essay-mentorship"],
}));

export const interests = ["Business", "STEM", "Finance", "Programming", "Science", "Social Impact", "English", "University Admission", "SAT", "IELTS", "Research", "Olympiads", "Hackathons", "Volunteering", "Scholarships", "Summer Schools", "Internships", "Portfolio Building"];
export const goals = ["Prepare for SAT/IELTS", "Win olympiads", "Join hackathons", "Build extracurricular profile", "Apply to top universities", "Improve English", "Learn economics/finance", "Start research", "Find scholarships", "Build portfolio", "Get mentorship"];
