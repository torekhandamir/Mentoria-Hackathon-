"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/nav";
import { Button } from "@/components/ui/button";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { majors } from "@/data/majors";
import { useTranslation } from "@/lib/i18n";
import { UserProfile } from "@/lib/types";
import { getLocal, levelFromXp, setLocal } from "@/lib/utils";

export default function ProfilePage() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(() => getLocal("current-user", null));
  const xp = getLocal<number>("student-xp", 0);

  const save = () => {
    if (!profile) return;
    setLocal("current-user", profile);
    setLocal("mentoria-lang", profile.language || "ru");
    toast.success(t("saveProfile"));
  };

  return (
    <AppShell>
      <h1 className="display text-4xl font-black uppercase">{t("profileTitle")}</h1>
      <Card className="mt-6">
        <CardTitle>{profile?.name || "Student"}</CardTitle>
        <p className="mt-2 text-slate-400">{profile?.email}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Input
            value={profile?.name || ""}
            onChange={(event) => setProfile((current) => (current ? { ...current, name: event.target.value } : current))}
            placeholder={t("fullName")}
          />
          <Select
            value={profile?.grade || "10"}
            onChange={(event) =>
              setProfile((current) => (current ? { ...current, grade: event.target.value as UserProfile["grade"] } : current))
            }
          >
            {["8", "9", "10", "11", "12", "Gap Year"].map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </Select>
          <Select
            value={profile?.major || "economics"}
            onChange={(event) => setProfile((current) => (current ? { ...current, major: event.target.value } : current))}
          >
            {majors.map((major) => (
              <option key={major.id} value={major.id}>
                {major.title}
              </option>
            ))}
          </Select>
          <Select
            value={profile?.language || "ru"}
            onChange={(event) =>
              setProfile((current) => (current ? { ...current, language: event.target.value as UserProfile["language"] } : current))
            }
          >
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="kk">Қазақша</option>
          </Select>
        </div>
        <Button className="mt-4" onClick={save}>
          {t("saveProfile")}
        </Button>
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>{profile?.role}</Badge>
          <Badge>{levelFromXp(xp)}</Badge>
          <Badge>{xp} XP</Badge>
          <Badge>{getLocal<number>("student-streak", 0)}-day streak</Badge>
          <Badge>{getLocal<string[]>("completed-lessons", []).length} lessons</Badge>
          <Badge>{getLocal<string[]>("saved-opportunities", []).length} saved opportunities</Badge>
          <Badge>{getLocal<string[]>("saved-resources", []).length} saved resources</Badge>
        </div>
        <h3 className="mt-6 font-black">{t("interests")}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {profile?.interests?.length
            ? profile.interests.map((interest) => <Badge key={interest}>{interest}</Badge>)
            : <Badge>{t("addInterestsOnboarding")}</Badge>}
        </div>
        <h3 className="mt-6 font-black">{t("goals")}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {profile?.goals?.length
            ? profile.goals.map((goal) => <Badge key={goal}>{goal}</Badge>)
            : <Badge>{t("addGoalsOnboarding")}</Badge>}
        </div>
      </Card>
    </AppShell>
  );
}
