"use client";

import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";

type QuestionSet = { id: string; title: string; description?: string };

export default function MentorQuestions() {
  return <AppShell mentor><AdminList<QuestionSet> title="Mentor Questions" storageKey="mentor-question-sets" base={[{ id: "mentor-set-1", title: "Supply and demand practice", description: "Original Mentoria practice set." }]} makeItem={(title, description) => ({ id: `mentor-question-${Date.now()}`, title, description })} /></AppShell>;
}
