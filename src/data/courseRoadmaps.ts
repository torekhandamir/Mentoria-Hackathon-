import { CourseSection } from "@/lib/types";

const original = "Original Mentoria practice";

export const courseRoadmaps: Record<string, CourseSection[]> = {
  "sat-math": [
    {
      id: "sat-math-1",
      tab: "Math",
      title: "SECTION 1 - Foundations of Algebra",
      nodes: [
        { id: "sat-linear-video", title: "Linear Functions - Video", type: "video", description: "Watch the concept walk-through.", externalUrl: "https://youtu.be/1bTkbmHx944?si=dymJX6bUH-b2eEEp", embedUrl: "https://www.youtube.com/embed/1bTkbmHx944" },
        { id: "sat-linear-practice", title: "Linear Functions - Practice Test", type: "practice", description: "Answer original SAT-style questions.", questions: [{ id: "sat-q1", prompt: "A line passes through (0, 3) and (2, 7). What is its slope?", type: "numeric", correctAnswer: "2", explanation: "Slope = rise/run = (7-3)/(2-0)=2.", difficulty: "Beginner", topic: "Linear Functions", sourceLabel: original }] },
        { id: "sat-systems-video", title: "Linear Equations and Systems - Video", type: "video", description: "Review systems and intersections.", externalUrl: "https://bluebook.collegeboard.org/" },
        { id: "sat-systems-practice", title: "Linear Equations and Systems - Practice Test", type: "practice", description: "Solve systems-based practice.", questions: [{ id: "sat-q2", prompt: "What is the solution to x + y = 10 and x - y = 2?", type: "short-answer", correctAnswer: "x=6,y=4", explanation: "Add equations to get 2x=12, then y=4.", difficulty: "Beginner", topic: "Systems", sourceLabel: original }] },
        { id: "sat-ineq-video", title: "Linear Inequalities - Video", type: "video", description: "Study inequality interpretation.", externalUrl: "https://satsuite.collegeboard.org/practice/practice-tests" },
        { id: "sat-section-quiz", title: "Section Quiz", type: "quiz", description: "Check section mastery.", questions: [{ id: "sat-q3", prompt: "If 3x - 5 > 10, which statement is true?", type: "multiple-choice", choices: ["x > 5", "x > 15", "x < 5", "x < 15"], correctAnswer: "x > 5", explanation: "3x > 15, so x > 5.", difficulty: "Beginner", topic: "Inequalities", sourceLabel: original }] },
      ],
    },
    {
      id: "sat-rw-1",
      tab: "Reading & Writing",
      title: "SECTION 1 - Information and Ideas",
      nodes: [
        { id: "rw-central-ideas", title: "Central Ideas - Reading", type: "reading", description: "Read and identify the main claim.", externalUrl: "https://www.collegeessayguy.com/blog/personal-statement-examples" },
        { id: "rw-evidence", title: "Command of Evidence - Practice", type: "practice", description: "Choose the strongest evidence.", questions: [{ id: "rw-q1", prompt: "Which sentence best supports a claim about school attendance improving after schedule changes?", type: "multiple-choice", choices: ["A neutral sentence", "A statistic showing attendance growth", "A quote about lunch", "A vague opinion"], correctAnswer: "A statistic showing attendance growth", explanation: "Evidence should directly support the claim with measurable proof.", difficulty: "Beginner", topic: "Command of Evidence", sourceLabel: original }] },
        { id: "rw-inferences", title: "Inferences - Quiz", type: "quiz", description: "Infer meaning from a short passage.", questions: [{ id: "rw-q2", prompt: "True or False: An inference must be directly stated in the passage.", type: "true-false", correctAnswer: "False", explanation: "An inference is supported by clues, not directly stated.", difficulty: "Beginner", topic: "Inferences", sourceLabel: original }] },
        { id: "rw-words", title: "Words in Context - Flashcards", type: "flashcards", description: "Review context-based vocabulary.", flashcards: [{ front: "Subtle", back: "Delicate or not obvious" }, { front: "Infer", back: "Reach a conclusion using evidence" }] },
        { id: "rw-section-quiz", title: "Section Quiz", type: "quiz", description: "Wrap up the reading and writing section.", questions: [{ id: "rw-q3", prompt: "What is the best revision goal for a transition sentence?", type: "multiple-choice", choices: ["Add a random fact", "Clarify the relationship between ideas", "Repeat the paragraph", "Shorten every word"], correctAnswer: "Clarify the relationship between ideas", explanation: "Transitions should guide logical flow.", difficulty: "Beginner", topic: "Revisions", sourceLabel: original }] },
      ],
    },
  ],
  "intro-economics": [
    {
      id: "econ-1",
      tab: "Microeconomics",
      title: "SECTION 1 - Supply, Demand & Elasticity",
      nodes: [
        { id: "econ-video", title: "What is Economics? - Video", type: "video", description: "Watch the intro lesson.", externalUrl: "https://www.youtube.com/watch?v=3ez10ADR_gM", embedUrl: "https://www.youtube.com/embed/3ez10ADR_gM" },
        { id: "econ-reading", title: "OpenStax Intro Reading", type: "reading", description: "Read the first textbook section.", externalUrl: "https://openstax.org/details/books/principles-economics-3e" },
        { id: "econ-quiz", title: "Supply and Demand Questions", type: "practice", description: "Answer original economics questions.", questions: [{ id: "econ-q1", prompt: "If demand increases while supply stays constant, what usually happens to price?", type: "multiple-choice", choices: ["Price falls", "Price rises", "Price stays fixed", "Supply doubles"], correctAnswer: "Price rises", explanation: "Higher demand with unchanged supply usually pushes price upward.", difficulty: "Beginner", topic: "Supply and Demand", sourceLabel: original }] },
        { id: "econ-flashcards", title: "Elasticity Flashcards", type: "flashcards", description: "Review elasticity concepts.", flashcards: [{ front: "Elastic demand", back: "Quantity changes a lot when price changes" }, { front: "Inelastic demand", back: "Quantity changes a little when price changes" }] },
        { id: "econ-case", title: "Mini Case Task", type: "assignment", description: "Write one paragraph about a real market example." },
      ],
    },
  ],
  "finance-basics": [
    {
      id: "fin-1",
      tab: "Finance",
      title: "SECTION 1 - Rates, Returns & Portfolio Basics",
      nodes: [
        { id: "fin-reading", title: "Rates and Returns - Reading", type: "reading", description: "Study the key concepts.", externalUrl: "https://www.khanacademy.org/economics-finance-domain/core-finance" },
        { id: "fin-practice", title: "Time Value of Money - Practice", type: "practice", description: "Answer original finance questions.", questions: [{ id: "fin-q1", prompt: "If you invest $100 at 10% simple interest for 2 years, how much interest do you earn?", type: "numeric", correctAnswer: "20", explanation: "Simple interest = principal x rate x time = 100 x 0.10 x 2 = 20.", difficulty: "Beginner", topic: "Time Value of Money", sourceLabel: original }] },
        { id: "fin-risk", title: "Risk and Return - Quiz", type: "quiz", description: "Test basic portfolio thinking.", questions: [{ id: "fin-q2", prompt: "Why do investors diversify?", type: "multiple-choice", choices: ["To remove all uncertainty", "To reduce concentration risk", "To guarantee profit", "To avoid research"], correctAnswer: "To reduce concentration risk", explanation: "Diversification spreads risk across assets.", difficulty: "Beginner", topic: "Portfolio Basics", sourceLabel: original }] },
      ],
    },
  ],
};
