"use client";

import { MentoriaAssistantPanel } from "@/components/ai/MentoriaAssistantPanel";
import { AppShell } from "@/components/layout/nav";
import { useTranslation } from "@/lib/i18n";

export default function AssistantPage() {
  const { t } = useTranslation();

  return (
    <AppShell>
      <h1 className="display text-4xl font-black uppercase">{t("assistantTitle")}</h1>
      <div className="mt-6">
        <MentoriaAssistantPanel />
      </div>
    </AppShell>
  );
}
