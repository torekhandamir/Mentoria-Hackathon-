"use client";

import { AppShell } from "@/components/layout/nav";
import { Card, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/data/mockUsers";
import { useTranslation } from "@/lib/i18n";

export default function AdminUsersPage() {
  const { lang, t } = useTranslation();
  const copy =
    lang === "ru"
      ? { grade: "Класс", progress: "прогресс" }
      : lang === "kk"
        ? { grade: "Сынып", progress: "прогресс" }
        : { grade: "Grade", progress: "progress" };

  return (
    <AppShell admin>
      <h1 className="display text-4xl font-black uppercase">{t("users")}</h1>
      <div className="mt-6 grid gap-4">
        {mockUsers.map((user) => (
          <Card key={user.id}>
            <CardTitle>{user.name}</CardTitle>
            <p className="mt-2 text-slate-400">
              {user.email} · {copy.grade} {user.grade} · {user.major} · {copy.progress}{" "}
              {user.id === "student-demo" ? "38%" : "24%"}
            </p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
