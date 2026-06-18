 "use client";
import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { resources } from "@/data/resources";
import { Resource } from "@/lib/types";

export default function MentorResources() {
  return <AppShell mentor><AdminList<Resource> title="Mentor Resources" storageKey="mentor-resources" base={resources} makeItem={(title, description) => ({ id: `mentor-resource-${Date.now()}`, title, description, type: "Guide", subject: "Economics", majorTargets: ["economics"], tags: ["Economics"], level: "Beginner", language: "English", fileUrl: "/resources/mentor.pdf", isDownloadable: true, estimatedReadingTime: "20 min", createdAt: "2026-06-17" })} /></AppShell>;
}
