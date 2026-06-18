"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/nav";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { opportunities } from "@/data/opportunities";
import { useTranslation } from "@/lib/i18n";
import { getLocal, urgency } from "@/lib/utils";

export default function CalendarPage() {
  const { t } = useTranslation();
  const [saved] = useState<string[]>(() => getLocal("saved-opportunities", []));
  const items = opportunities.filter((opportunity) => saved.includes(opportunity.id));

  return (
    <AppShell>
      <h1 className="display text-4xl font-black uppercase">{t("calendarTitle")}</h1>
      <p className="mt-2 text-slate-400">{t("remindersPlanned")}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(items.length ? items : opportunities.slice(0, 4)).map((opportunity) => (
          <Card key={opportunity.id}>
            <Badge>{urgency(opportunity.deadline)}</Badge>
            <CardTitle className="mt-3">{opportunity.title}</CardTitle>
            <p className="mt-2 text-slate-300">
              {opportunity.deadlineLabel || opportunity.deadline} · {opportunity.category}
            </p>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
