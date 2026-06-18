"use client";

import { useState } from "react";
import ShinyText from "@/components/animations/ShinyText";
import { AppShell } from "@/components/layout/nav";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { activities } from "@/data/activities";
import { courses } from "@/data/courses";
import { demoMentor, mockUsers } from "@/data/mockUsers";
import { resources } from "@/data/resources";
import { useTranslation } from "@/lib/i18n";
import { UserProfile } from "@/lib/types";
import { getLocal } from "@/lib/utils";

export default function MentorDashboard() {
  const { lang, t } = useTranslation();
  const [mentor] = useState<UserProfile>(() => getLocal<UserProfile>("current-user", demoMentor));
  const activityLine =
    lang === "ru"
      ? "завершил учебную активность"
      : lang === "kk"
        ? "оқу белсенділігін аяқтады"
        : "completed a learning activity";

  return (
    <AppShell mentor>
      <h1 className="display text-4xl font-black uppercase">{t("mentorDashboardTitle")}</h1>
      <Card className="mt-6">
        <ShinyText
          text={mentor.expertise || demoMentor.expertise || "Mentoria mentor"}
          speed={2.5}
          color="#86BCDE"
          shineColor="#F8FAFC"
          className="text-sm font-semibold uppercase tracking-[0.2em]"
        />
        <CardTitle className="mt-3">{mentor.name}</CardTitle>
        <p className="mt-2 text-slate-400">{mentor.bio || demoMentor.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(mentor.languages || demoMentor.languages || []).map((language) => (
            <Badge key={language}>{language}</Badge>
          ))}
        </div>
      </Card>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Stat label={t("coursesManaged")} value={courses.length} />
        <Stat label={t("resourcesAdded")} value={resources.length} />
        <Stat label={t("activitiesCreated")} value={activities.length} />
        <Stat label={t("studentsHelped")} value={mockUsers.length} />
      </div>
      <Card className="mt-6">
        <CardTitle>{t("recentStudentProgress")}</CardTitle>
        <div className="mt-4 space-y-2 text-sm text-slate-300">
          {mockUsers.map((user) => (
            <p key={user.id}>{user.name}: {activityLine}</p>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <div className="text-3xl font-black">{value}</div>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </Card>
  );
}
