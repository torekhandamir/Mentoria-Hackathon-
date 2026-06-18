"use client";

import { AppShell } from "@/components/layout/nav";
import { Card, CardTitle } from "@/components/ui/card";
import { mockUsers } from "@/data/mockUsers";
import { useTranslation } from "@/lib/i18n";

export default function MentorStudentsPage() {
  const { t } = useTranslation();

  return (
    <AppShell mentor>
      <h1 className="display text-4xl font-black uppercase">{t("assignedStudents")}</h1>
      <div className="mt-6 grid gap-4">
        {mockUsers.map((user) => (
          <Card key={user.id}>
            <CardTitle>{user.name}</CardTitle>
            <p className="mt-2 text-slate-400">
              Grade {user.grade} · {user.major} · recent progress: active this week
            </p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
