"use client";

import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { opportunities } from "@/data/opportunities";
import { useTranslation } from "@/lib/i18n";
import { Opportunity } from "@/lib/types";

export default function AdminOpportunities() {
  const { lang } = useTranslation();
  const title =
    lang === "ru"
      ? "Управление возможностями"
      : lang === "kk"
        ? "Мүмкіндіктерді басқару"
        : "Manage Opportunities";

  return (
    <AppShell admin>
      <AdminList<Opportunity>
        title={title}
        storageKey="admin-opportunities"
        base={opportunities}
        makeItem={(itemTitle, description) => ({
          id: `custom-${Date.now()}`,
          title: itemTitle,
          description,
          category: "Business Competition",
          format: "Online",
          deadline: "2026-09-30",
          gradeRange: "8-12",
          minGrade: 8,
          maxGrade: 12,
          region: "Global",
          requirements: "Admin-created item.",
          tags: ["Economics", "Business"],
          majorTargets: ["economics", "business"],
          difficulty: "Beginner",
          applicationLink: "https://example.com/apply",
          estimatedTime: "2 weeks",
        })}
      />
    </AppShell>
  );
}
