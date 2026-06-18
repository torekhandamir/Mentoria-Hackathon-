 "use client";
import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { courses } from "@/data/courses";
import { Course } from "@/lib/types";

export default function MentorCourses() {
  return <AppShell mentor><AdminList<Course> title="Mentor Courses" storageKey="mentor-courses" base={courses} makeItem={(title, description) => ({ id: `mentor-course-${Date.now()}`, title, description, level: "Beginner", duration: "2 weeks", majorTargets: ["economics"], tags: ["Economics"], lessons: [{ id: `mentor-lesson-${Date.now()}`, title: "Mentor lesson", description: "Mentor-created lesson.", reading: "Read and reflect.", material: "/resources/mentor.pdf", quiz: ["Question 1", "Question 2", "Question 3"] }] })} /></AppShell>;
}
