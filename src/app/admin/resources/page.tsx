"use client";
import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { resources } from "@/data/resources";
import { Resource } from "@/lib/types";

export default function AdminResources() {
  return <AppShell admin><AdminList<Resource> title="Manage Resources" storageKey="admin-resources" base={resources} makeItem={(title, description) => ({ id: `custom-resource-${Date.now()}`, title, description, type: "Guide", subject: "Economics", majorTargets: ["economics"], tags: ["Economics", "Business"], level: "Beginner", language: "English", fileUrl: "/resources/custom.pdf", isDownloadable: true, estimatedReadingTime: "20 min", createdAt: "2026-06-16" })} /></AppShell>;
}
