"use client";

import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { resources } from "@/data/resources";
import { useTranslation } from "@/lib/i18n";
import { Resource } from "@/lib/types";

export default function AdminResources() {
  const { lang } = useTranslation();
  const title =
    lang === "ru"
      ? "Управление ресурсами"
      : lang === "kk"
        ? "Ресурстарды басқару"
        : "Manage Resources";

  return (
    <AppShell admin>
      <AdminList<Resource>
        title={title}
        storageKey="admin-resources"
        base={resources}
        makeItem={(itemTitle, description) => ({
          id: `custom-resource-${Date.now()}`,
          title: itemTitle,
          description,
          type: "Guide",
          subject: "Economics",
          majorTargets: ["economics"],
          tags: ["Economics", "Business"],
          level: "Beginner",
          language: "English",
          fileUrl: "/resources/custom.pdf",
          isDownloadable: true,
          estimatedReadingTime: "20 min",
          createdAt: "2026-06-16",
        })}
      />
    </AppShell>
  );
}
