"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import SplitText from "@/components/animations/SplitText";
import { AppShell } from "@/components/layout/nav";
import { Button } from "@/components/ui/button";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/input";
import { activities } from "@/data/activities";
import { majors } from "@/data/majors";
import { useTranslation } from "@/lib/i18n";
import { UserProfile } from "@/lib/types";
import { getLocal, recordActivity } from "@/lib/utils";

export default function ActivitiesPage() {
  const { t } = useTranslation();
  const [profile] = useState<UserProfile | null>(() => getLocal("current-user", null));
  const [major, setMajor] = useState(profile?.major || "All");
  const [type, setType] = useState("All");
  const [timeRequired, setTimeRequired] = useState("All");
  const [status, setStatus] = useState("All");
  const [done, setDone] = useState<string[]>(() => getLocal("completed-activities", []));

  const filtered = useMemo(
    () =>
      activities.filter((activity) => {
        const duration = activity.xp >= 45 ? "30+ min" : activity.xp >= 35 ? "20 min" : "10 min";
        const isDone = done.includes(activity.id);

        return (
          (major === "All" || activity.majorTargets.includes(major)) &&
          (type === "All" || activity.type === type) &&
          (timeRequired === "All" || duration === timeRequired) &&
          (status === "All" || (status === "Completed" ? isDone : !isDone))
        );
      }),
    [major, type, timeRequired, status, done],
  );

  const complete = (id: string) => {
    const activity = activities.find((item) => item.id === id);
    if (!activity) return;
    if (recordActivity(activity)) {
      setDone(getLocal("completed-activities", []));
      toast.success(`Completed +${activity.xp} XP`);
    } else {
      toast.info("Already completed");
    }
  };

  return (
    <AppShell>
      <SplitText
        tag="h1"
        text={t("activitiesTitle")}
        splitType="words"
        delay={70}
        duration={0.8}
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        className="display text-4xl font-black uppercase"
        textAlign="left"
      />
      <p className="mt-2 text-slate-400">{t("activitiesIntro")}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <Select value={major} onChange={(event) => setMajor(event.target.value)}>
          <option>All</option>
          {majors.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </Select>
        <Select value={type} onChange={(event) => setType(event.target.value)}>
          <option>All</option>
          {Array.from(new Set(activities.map((activity) => activity.type))).map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
        <Select value={timeRequired} onChange={(event) => setTimeRequired(event.target.value)}>
          <option>All</option>
          <option>10 min</option>
          <option>20 min</option>
          <option>30+ min</option>
        </Select>
        <Select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option>All</option>
          <option>Open</option>
          <option>Completed</option>
        </Select>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((activity) => {
          const isDone = done.includes(activity.id);
          const duration = activity.xp >= 45 ? "30+ min" : activity.xp >= 35 ? "20 min" : "10 min";

          return (
            <Card key={activity.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>{activity.type}</Badge>
                    <Badge>{duration}</Badge>
                  </div>
                  <CardTitle className="mt-3">{activity.title}</CardTitle>
                </div>
                <b className="text-[#94CFDB]">+{activity.xp} XP</b>
              </div>
              <p className="mt-3 text-sm text-slate-400">
                {activity.category} · recommended for your current learning path.
              </p>
              <div className="mt-4 flex gap-2">
                <Button variant={isDone ? "secondary" : "default"} onClick={() => complete(activity.id)}>
                  {isDone ? t("completed") : t("complete")}
                </Button>
                {activity.link && (
                  <a
                    href={activity.link}
                    target={activity.link.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">{t("open")}</Button>
                  </a>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
