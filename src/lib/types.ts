export type Role = "student" | "mentor" | "admin";
export type Grade = "8" | "9" | "10" | "11" | "12" | "Gap Year";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Format = "Online" | "Offline" | "Hybrid";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: Role;
  grade?: Grade;
  country?: string;
  language?: "en" | "ru" | "kk";
  major?: string;
  interests: string[];
  goals: string[];
  formatPreference?: Format;
  expertise?: string;
  bio?: string;
  languages?: string[];
};

export type Opportunity = {
  id: string;
  title: string;
  provider?: string;
  category: string;
  format: Format;
  deadline: string;
  deadlineLabel?: string;
  gradeRange: string;
  minGrade: number;
  maxGrade: number;
  region: string;
  description: string;
  requirements: string;
  tags: string[];
  majorTargets: string[];
  difficulty: Difficulty;
  applicationLink: string;
  whyUseful?: string;
  sourceType?: string;
  isExternal?: boolean;
  estimatedTime: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  reading: string;
  material: string;
  quiz: string[];
  videoUrl?: string;
  embedUrl?: string;
  flashcards?: string[];
  practiceTask?: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  level: Difficulty;
  duration: string;
  majorTargets: string[];
  tags: string[];
  lessons: Lesson[];
  sourceUrl?: string;
  embedUrl?: string;
  sections?: CourseSection[];
};

export type Resource = {
  id: string;
  title: string;
  type: "Book" | "PDF" | "Notes" | "Guide" | "Checklist" | "Past Paper" | "Worksheet" | "Video" | "Link";
  subject: string;
  majorTargets: string[];
  tags: string[];
  level: Difficulty;
  language: string;
  description: string;
  fileUrl: string;
  externalUrl?: string;
  embedUrl?: string;
  source?: string;
  isDownloadable: boolean;
  estimatedReadingTime: string;
  createdAt: string;
};

export type Activity = {
  id: string;
  title: string;
  type: "Video" | "Reading" | "Quiz" | "Practice" | "Flashcards" | "Application" | "Portfolio" | "Deadline";
  category: string;
  xp: number;
  majorTargets: string[];
  tags: string[];
  link?: string;
};

export type PracticeQuestion = {
  id: string;
  prompt: string;
  type: "multiple-choice" | "short-answer" | "numeric" | "true-false";
  choices?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  topic: string;
  sourceLabel: string;
};

export type CourseNode = {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "practice" | "flashcards" | "assignment";
  description: string;
  externalUrl?: string;
  embedUrl?: string;
  questions?: PracticeQuestion[];
  flashcards?: { front: string; back: string }[];
};

export type CourseSection = {
  id: string;
  title: string;
  tab: string;
  nodes: CourseNode[];
};

export type Major = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  recommendedCourses: string[];
  recommendedResources: string[];
  recommendedOpportunities: string[];
};
