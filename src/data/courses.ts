import { Course } from "@/lib/types";

const lessons = (prefix: string, names: string[]) => names.map((name, index) => ({
  id: `${prefix}-lesson-${index + 1}`,
  title: name,
  description: "Video lesson, reading pack, flashcards, quick quiz and applied task.",
  reading: "Open the linked guide, take notes, then complete the reflection prompt.",
  material: `/resources/${prefix}-${index + 1}.pdf`,
  videoUrl: prefix === "economics" ? "https://www.youtube.com/watch?v=3ez10ADR_gM" : undefined,
  embedUrl:
    prefix === "economics"
      ? "https://www.youtube.com/embed/3ez10ADR_gM"
      : prefix === "cs"
        ? "https://www.youtube.com/embed/SzJ46YA_RaA"
        : prefix === "biology"
          ? "https://www.youtube.com/embed/URUJD5NEXC8"
          : prefix === "physics"
            ? "https://www.youtube.com/embed/C48oHf1TOcg"
            : undefined,
  flashcards: ["Key term", "Example", "Common mistake"],
  practiceTask: "Complete one short practice set and write one sentence about what changed in your understanding.",
  quiz: ["What is the core concept?", "How would you apply it?", "What is your next action?"],
}));

export const courses: Course[] = [
  { id: "intro-economics", title: "Introduction to Economics", description: "Markets, incentives, supply, demand and real competition prep.", level: "Beginner", duration: "4 weeks", majorTargets: ["economics", "finance", "business"], tags: ["Economics", "Finance", "Business", "Olympiads"], sourceUrl: "https://openstax.org/details/books/principles-economics-3e", embedUrl: "https://www.youtube.com/embed/3ez10ADR_gM", lessons: lessons("economics", ["What is Economics?", "Scarcity and Opportunity Cost", "Supply and Demand", "Elasticity", "Market Structures"]) },
  { id: "finance-basics", title: "Finance & Investment Basics", description: "Budgeting, compounding, risk, portfolios and student-friendly finance.", level: "Beginner", duration: "3 weeks", majorTargets: ["finance", "economics", "business"], tags: ["Finance", "Business"], sourceUrl: "https://www.khanacademy.org/economics-finance-domain/core-finance", lessons: lessons("finance", ["Time Value of Money", "Interest and Debt", "Stocks and Bonds", "Risk and Return", "Personal Finance Basics"]) },
  { id: "sat-math", title: "SAT Math Foundations", description: "Algebra, functions and data analysis for SAT readiness.", level: "Beginner", duration: "5 weeks", majorTargets: ["admissions", "mathematics"], tags: ["SAT", "STEM"], sourceUrl: "https://www.khanacademy.org/test-prep/v2-sat-math", embedUrl: "https://www.youtube.com/embed/1bTkbmHx944", lessons: lessons("sat", ["Algebra Foundations", "Linear Equations", "Problem Solving and Data Analysis", "Advanced Math", "Practice Set"]) },
  { id: "ielts-english", title: "Academic English & IELTS Basics", description: "Academic writing, speaking confidence and IELTS task practice.", level: "Beginner", duration: "4 weeks", majorTargets: ["humanities", "admissions"], tags: ["English", "IELTS"], sourceUrl: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests", lessons: lessons("ielts", ["IELTS Format", "Reading Strategy", "Writing Task 1", "Writing Task 2", "Speaking Practice"]) },
  { id: "application-roadmap", title: "University Application Roadmap", description: "Essays, activities, scholarships, testing and application timelines.", level: "Intermediate", duration: "6 weeks", majorTargets: ["admissions"], tags: ["University Admission", "Scholarships", "Portfolio Building"], sourceUrl: "https://satsuite.collegeboard.org/practice", lessons: lessons("admissions", ["Building a Profile", "Choosing Universities", "Essays", "Scholarships", "Timeline"]) },
  { id: "cs-ai", title: "Intro to Computer Science & AI", description: "Programming concepts, AI product thinking and portfolio projects.", level: "Beginner", duration: "4 weeks", majorTargets: ["computer-science", "ai-data-science"], tags: ["Programming", "Hackathons", "AI"], sourceUrl: "https://youtu.be/SzJ46YA_RaA?si=34IGUtMt5PZ2Qq6U", embedUrl: "https://www.youtube.com/embed/SzJ46YA_RaA", lessons: lessons("cs", ["Computational Thinking", "Scratch / Logic", "C / Programming Basics", "Algorithms", "Final Mini Project"]) },
  { id: "physics-solving", title: "Physics Problem Solving", description: "Mechanics and structured problem-solving for competitions.", level: "Intermediate", duration: "4 weeks", majorTargets: ["physics", "engineering"], tags: ["STEM", "Science", "Olympiads"], sourceUrl: "https://youtu.be/C48oHf1TOcg?si=YMTlaiddzsNIBnQs", embedUrl: "https://www.youtube.com/embed/C48oHf1TOcg", lessons: lessons("physics", ["Forces", "Energy", "Momentum"]) },
  { id: "biology-premed", title: "Biology for Pre-Med", description: "Cell biology, genetics and research habits for pre-med students.", level: "Intermediate", duration: "4 weeks", majorTargets: ["medicine", "biology"], tags: ["Science", "Research"], sourceUrl: "https://youtu.be/URUJD5NEXC8?si=XpJKZ4H_3gnZ5E9q", embedUrl: "https://www.youtube.com/embed/URUJD5NEXC8", lessons: lessons("biology", ["Cells", "Genetics", "Research summary"]) },
];
