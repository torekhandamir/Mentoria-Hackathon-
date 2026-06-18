"use client";
import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { activities } from "@/data/activities";
import { Activity } from "@/lib/types";

export default function AdminActivities() {
  return <AppShell admin><AdminList<Activity> title="Manage Activities" storageKey="admin-activities" base={activities} makeItem={(title) => ({ id: `admin-activity-${Date.now()}`, title, type: "Practice", category: "Admin", xp: 35, majorTargets: ["economics"], tags: ["Economics"] })} /></AppShell>;
}
