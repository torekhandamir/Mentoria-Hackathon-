import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Activity, Course, Opportunity, Resource, UserProfile } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocal<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setLocal<T>(key: string, value: T) {
  if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(value));
}

export function calculateMatchScore(
  profile: UserProfile | null,
  item: { majorTargets: string[]; tags: string[]; level?: Course["level"] | Resource["level"]; difficulty?: Opportunity["difficulty"]; minGrade?: number; maxGrade?: number; format?: Opportunity["format"] }
) {
  if (!profile) return 72;
  let score = 10;
  if (profile.major && item.majorTargets.includes(profile.major)) score += 30;
  const overlap = item.tags.filter((tag) => profile.interests?.includes(tag) || profile.goals?.includes(tag)).length;
  score += Math.min(20, overlap * 7);
  if ("minGrade" in item && profile.grade && profile.grade !== "Gap Year") {
    const grade = Number(profile.grade);
    if (grade >= (item.minGrade || 8) && grade <= (item.maxGrade || 12)) score += 15;
  } else score += 10;
  if (item.tags.some((tag) => profile.goals?.includes(tag))) score += 15;
  if ("format" in item && profile.formatPreference === item.format) score += 10;
  if (item.level === "Beginner" || item.difficulty === "Beginner") score += 10;
  return Math.min(100, score);
}

export function urgency(deadline: string) {
  const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
  if (days <= 3) return "urgent";
  if (days <= 14) return "soon";
  return "later";
}

export function recordActivity(activity: Pick<Activity, "id" | "title" | "xp">) {
  const done = getLocal<string[]>("completed-activities", []);
  if (done.includes(activity.id)) return false;
  setLocal("completed-activities", [...done, activity.id]);
  setLocal("student-xp", getLocal<number>("student-xp", 0) + activity.xp);
  const feed = getLocal<{ title: string; date: string; xp: number }[]>("activity-feed", []);
  setLocal("activity-feed", [{ title: activity.title, date: new Date().toISOString(), xp: activity.xp }, ...feed].slice(0, 12));
  setLocal("student-streak", Math.max(1, getLocal<number>("student-streak", 0) + 1));
  return true;
}

export function levelFromXp(xp: number) {
  if (xp >= 1000) return "Level 5: Mentor-ready";
  if (xp >= 650) return "Level 4: Achiever";
  if (xp >= 350) return "Level 3: Builder";
  if (xp >= 120) return "Level 2: Explorer";
  return "Level 1: Starter";
}

export function getPracticeSummary() {
  if (typeof window === "undefined") {
    return { totalAnswered: 0, averageScore: 0, answeredToday: 0, weakTopics: [] as string[] };
  }

  const practiceEntries = Object.entries(window.localStorage)
    .filter(([key]) => key.startsWith("practice-"))
    .map(([, value]) => {
      try {
        return JSON.parse(value) as {
          score?: number;
          answered?: number;
          updatedAt?: string;
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as { score?: number; answered?: number; updatedAt?: string }[];

  const totalAnswered = practiceEntries.reduce((sum, entry) => sum + (entry.answered || 0), 0);
  const averageScore = practiceEntries.length
    ? Math.round(
        (practiceEntries.reduce((sum, entry) => {
          const answered = Math.max(1, entry.answered || 0);
          return sum + ((entry.score || 0) / answered) * 100;
        }, 0) /
          practiceEntries.length),
      )
    : 0;
  const today = new Date().toISOString().slice(0, 10);
  const answeredToday = practiceEntries
    .filter((entry) => entry.updatedAt?.slice(0, 10) === today)
    .reduce((sum, entry) => sum + (entry.answered || 0), 0);

  const weakTopics = Object.entries(window.localStorage)
    .filter(([key]) => key.startsWith("practice-"))
    .map(([key, value]) => {
      try {
        const entry = JSON.parse(value) as { score?: number; answered?: number };
        const answered = Math.max(1, entry.answered || 0);
        const ratio = (entry.score || 0) / answered;
        if (ratio >= 0.6) return null;
        return key
          .replace("practice-", "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .slice(0, 3) as string[];

  return { totalAnswered, averageScore, answeredToday, weakTopics };
}
