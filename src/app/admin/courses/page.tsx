"use client";

import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { courses } from "@/data/courses";
import { useTranslation } from "@/lib/i18n";
import { Course } from "@/lib/types";

export default function AdminCourses() {
  const { lang } = useTranslation();
  const title =
    lang === "ru" ? "Управление курсами" : lang === "kk" ? "Курстарды басқару" : "Manage Courses";

  return (
    <AppShell admin>
      <AdminList<Course>
        title={title}
        storageKey="admin-courses"
        base={courses}
        makeItem={(itemTitle, description) => ({
          id: `custom-course-${Date.now()}`,
          title: itemTitle,
          description,
          level: "Beginner",
          duration: "3 weeks",
          majorTargets: ["economics"],
          tags: ["Economics", "Business"],
          lessons: [
            {
              id: `custom-lesson-${Date.now()}`,
              title: "Intro lesson",
              description: "Admin-created lesson.",
              reading: "Read the guide.",
              material: "/resources/custom.pdf",
              quiz: ["What did you learn?", "What is next?", "How will you apply it?"],
            },
          ],
        })}
      />
    </AppShell>
  );
}
