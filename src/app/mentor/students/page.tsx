"use client";

import { AppShell } from "@/components/layout/nav";
import { Card, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/data/mockUsers";
import { useTranslation } from "@/lib/i18n";

export default function MentorStudentsPage() {
  const { lang, t } = useTranslation();
  const copy =
    lang === "ru"
      ? { grade: "Класс", progress: "недавний прогресс: активен на этой неделе" }
      : lang === "kk"
        ? { grade: "Сынып", progress: "соңғы прогресс: осы аптада белсенді" }
        : { grade: "Grade", progress: "recent progress: active this week" };

  return (
    <AppShell mentor>
      <h1 className="display text-4xl font-black uppercase">{t("assignedStudents")}</h1>
      <div className="mt-6 grid gap-4">
        {mockUsers.map((user) => (
          <Card key={user.id}>
            <CardTitle>{user.name}</CardTitle>
            <p className="mt-2 text-slate-400">
              {copy.grade} {user.grade} · {user.major} · {copy.progress}
            </p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
