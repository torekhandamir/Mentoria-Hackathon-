"use client";

import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";

type QuestionSet = { id: string; title: string; description?: string };

export default function AdminQuestions() {
  return <AppShell admin><AdminList<QuestionSet> title="Manage Questions" storageKey="admin-question-sets" base={[{ id: "admin-set-1", title: "SAT algebra question bank", description: "Original Mentoria practice set." }]} makeItem={(title, description) => ({ id: `admin-question-${Date.now()}`, title, description })} /></AppShell>;
}
