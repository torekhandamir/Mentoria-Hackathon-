 "use client";
import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { activities } from "@/data/activities";
import { Activity } from "@/lib/types";

export default function MentorActivities() {
  return <AppShell mentor><AdminList<Activity> title="Mentor Activities" storageKey="mentor-activities" base={activities} makeItem={(title) => ({ id: `mentor-activity-${Date.now()}`, title, type: "Practice", category: "Mentor", xp: 30, majorTargets: ["economics"], tags: ["Economics"] })} /></AppShell>;
}
