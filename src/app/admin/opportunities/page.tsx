"use client";
import { AppShell } from "@/components/layout/nav";
import { AdminList } from "@/components/features/admin-list";
import { opportunities } from "@/data/opportunities";
import { Opportunity } from "@/lib/types";

export default function AdminOpportunities() {
  return <AppShell admin><AdminList<Opportunity> title="Manage Opportunities" storageKey="admin-opportunities" base={opportunities} makeItem={(title, description) => ({ id: `custom-${Date.now()}`, title, description, category: "Business Competition", format: "Online", deadline: "2026-09-30", gradeRange: "8-12", minGrade: 8, maxGrade: 12, region: "Global", requirements: "Admin-created demo item.", tags: ["Economics", "Business"], majorTargets: ["economics", "business"], difficulty: "Beginner", applicationLink: "https://example.com/apply", estimatedTime: "2 weeks" })} /></AppShell>;
}
