"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/nav";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/lib/i18n";
import { UserProfile } from "@/lib/types";
import { getLocal, setLocal } from "@/lib/utils";

const templates: Record<string, string[]> = {
  economics: [
    "Learn microeconomics basics",
    "Solve 20 economics problems",
    "Join economics olympiad",
    "Read finance starter guide",
    "Build business case portfolio",
    "Apply to business/economics competition",
  ],
  "computer-science": [
    "Learn programming basics",
    "Build one small project",
    "Join hackathon",
    "Study AI/data science intro",
    "Add project to portfolio",
  ],
  admissions: [
    "SAT/IELTS plan",
    "Essay plan",
    "Extracurricular plan",
    "Scholarship research",
    "Application timeline",
  ],
};

export default function RoadmapPage() {
  const { t } = useTranslation();
  const [profile] = useState<UserProfile | null>(() => getLocal("current-user", null));
  const [done, setDone] = useState<string[]>(() => getLocal("roadmap-done", []));
  const tasks = templates[profile?.major || ""] || templates.economics;

  return (
    <AppShell>
      <h1 className="display text-4xl font-black uppercase">{t("roadmapTitle")}</h1>
      <Card className="mt-6">
        <CardTitle>
          {profile?.grade || "10"} grade · {profile?.major || "economics"} plan
        </CardTitle>
        <div className="mt-4">
          <Progress value={(done.length / tasks.length) * 100} />
        </div>
      </Card>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {tasks.map((task, index) => (
          <Card key={task}>
            <BadgeIndex n={index + 1} />
            <CardTitle className="mt-3">{task}</CardTitle>
            <Button
              className="mt-4"
              variant={done.includes(task) ? "secondary" : "default"}
              onClick={() => {
                const next = Array.from(new Set([...done, task]));
                setDone(next);
                setLocal("roadmap-done", next);
                toast.success(t("roadmapUpdated"));
              }}
            >
              {done.includes(task) ? t("completed") : t("markComplete")}
            </Button>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

function BadgeIndex({ n }: { n: number }) {
  return (
    <span className="grid size-10 place-items-center rounded-xl bg-[#93CFDB] font-black text-[#07111F]">
      {n}
    </span>
  );
}
