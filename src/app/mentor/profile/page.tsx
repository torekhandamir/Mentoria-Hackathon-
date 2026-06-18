"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/nav";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { demoMentor } from "@/data/mockUsers";
import { useTranslation } from "@/lib/i18n";
import { UserProfile } from "@/lib/types";
import { getLocal } from "@/lib/utils";

export default function MentorProfile() {
  const { t } = useTranslation();
  const [mentor] = useState<UserProfile>(() => getLocal<UserProfile>("current-user", demoMentor));

  return (
    <AppShell mentor>
      <h1 className="display text-4xl font-black uppercase">{t("mentorProfileTitle")}</h1>
      <Card className="mt-6">
        <CardTitle>{mentor.name}</CardTitle>
        <p className="mt-2 text-slate-400">{mentor.email}</p>
        <p className="mt-4">{mentor.bio || demoMentor.bio}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{mentor.expertise || demoMentor.expertise}</Badge>
          {(mentor.languages || demoMentor.languages || []).map((language) => (
            <Badge key={language}>{language}</Badge>
          ))}
          <Badge>{t("officeHoursPlanned")}</Badge>
        </div>
      </Card>
    </AppShell>
  );
}
