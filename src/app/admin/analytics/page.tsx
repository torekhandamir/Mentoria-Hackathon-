"use client";

import { AppShell } from "@/components/layout/nav";
import { Card, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";

const rows: [string, number][] = [
  ["Economics", 42],
  ["Computer Science", 31],
  ["Admissions", 27],
  ["Pre-Med", 18],
];

export default function AdminAnalyticsPage() {
  const { t } = useTranslation();

  return (
    <AppShell admin>
      <h1 className="display text-4xl font-black uppercase">{t("analyticsTitle")}</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Chart title={t("popularMajors")} rows={rows} />
        <Chart title={t("courseCompletion")} rows={[["Economics", 68], ["SAT Math", 44], ["IELTS", 51]]} />
        <Chart title={t("savedOpportunityCategories")} rows={[["Business", 58], ["Olympiad", 46], ["Hackathon", 39]]} />
      </div>
    </AppShell>
  );
}

function Chart({ title, rows }: { title: string; rows: [string, number][] }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      <div className="mt-5 space-y-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{label}</span>
              <span>{value}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#5E95CB] to-[#93CFDB]"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
