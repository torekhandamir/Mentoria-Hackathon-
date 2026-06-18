"use client";

import Link from "next/link";
import ShinyText from "@/components/animations/ShinyText";
import { AppShell } from "@/components/layout/nav";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { mockUsers } from "@/data/mockUsers";
import { opportunities } from "@/data/opportunities";
import { resources } from "@/data/resources";
import { useTranslation } from "@/lib/i18n";

export default function AdminPage() {
  const { t } = useTranslation();

  return (
    <AppShell admin>
      <h1 className="display text-4xl font-black uppercase">{t("adminCenterTitle")}</h1>
      <p className="mt-2 text-slate-300">{t("adminIntro")}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
        <Stat label={t("totalStudents")} value={mockUsers.length} />
        <Stat label={t("activeCourses")} value={courses.length} />
        <Stat label={t("opportunitiesLabel")} value={opportunities.length} />
        <Stat label={t("resourcesFiles")} value={resources.length} />
        <Stat label={t("completedLessons")} value={42} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <ShinyText
            text={t("engagementLeaderboard")}
            speed={2.5}
            color="#86BCDE"
            shineColor="#F8FAFC"
            className="text-sm font-semibold uppercase tracking-[0.2em]"
          />
          <CardTitle className="mt-3">{t("engagementLeaderboard")}</CardTitle>
          <p className="mt-3 text-slate-300">{t("leaderboardHint")}</p>
          <Link className="mt-4 inline-flex" href="/admin/leaderboard">
            <Button>{t("openLeaderboard")}</Button>
          </Link>
        </Card>
        <Card>
          <CardTitle>{t("operationalOverview")}</CardTitle>
          <p className="mt-3 text-slate-300">
            Popular majors: Economics, Computer Science, Admissions. Highest saved category: Business Competition.
          </p>
        </Card>
      </div>
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
