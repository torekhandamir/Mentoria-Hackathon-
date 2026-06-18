import { UserProfile } from "@/lib/types";

export const demoStudent: UserProfile = {
  id: "student-demo",
  name: "Demo Student",
  email: "student@mentoria.demo",
  role: "student",
  grade: "10",
  country: "Kazakhstan",
  language: "en",
  major: "economics",
  interests: ["Economics", "Finance", "Business", "Olympiads", "SAT"],
  goals: ["Win olympiads", "Learn economics/finance", "Apply to top universities"],
  formatPreference: "Online",
};

export const demoMentor: UserProfile = {
  id: "mentor-demo",
  name: "Demo Mentor",
  email: "mentor@mentoria.demo",
  role: "mentor",
  interests: ["Economics", "SAT", "University Admission"],
  goals: ["Get mentorship"],
  language: "en",
  expertise: "Economics / SAT / University Admissions",
  bio: "Creates learning activities, resources and quizzes for Mentoria students.",
  languages: ["English", "Russian"],
};

export const mockUsers: UserProfile[] = [
  demoStudent,
  { ...demoStudent, id: "u2", name: "Demo CS Student", email: "cs@demo.kz", major: "computer-science", interests: ["Programming", "Hackathons"], goals: ["Join hackathons"], grade: "9" },
  { ...demoStudent, id: "u3", name: "Demo Admissions Student", email: "admissions@demo.kz", major: "admissions", interests: ["IELTS", "University Admission"], goals: ["Find scholarships"], grade: "11" },
];
