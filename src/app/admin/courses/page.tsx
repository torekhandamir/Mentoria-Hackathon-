"use client";
import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { courses } from "@/data/courses";
import { Course } from "@/lib/types";

export default function AdminCourses() {
  return <AppShell admin><AdminList<Course> title="Manage Courses" storageKey="admin-courses" base={courses} makeItem={(title, description) => ({ id: `custom-course-${Date.now()}`, title, description, level: "Beginner", duration: "3 weeks", majorTargets: ["economics"], tags: ["Economics", "Business"], lessons: [{ id: `custom-lesson-${Date.now()}`, title: "Intro lesson", description: "Admin-created demo lesson.", reading: "Read the guide.", material: "/resources/custom.pdf", quiz: ["What did you learn?", "What is next?", "How will you apply it?"] }] })} /></AppShell>;
}
