"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/nav";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";
import { UserProfile } from "@/lib/types";
import { getLocal } from "@/lib/utils";

export default function AdminProfilePage() {
  const { lang, t } = useTranslation();
  const [admin] = useState<UserProfile | null>(() => getLocal("current-user", null));
  const fallbackName = lang === "ru" ? "Админ" : lang === "kk" ? "Әкімші" : "Admin";

  return (
    <AppShell admin>
      <h1 className="display text-4xl font-black uppercase">{t("adminProfileTitle")}</h1>
      <Card className="mt-6">
        <CardTitle>{admin?.name || fallbackName}</CardTitle>
        <p className="mt-2 text-slate-400">{admin?.email || "admin@mentoria.demo"}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{t("adminRole")}</Badge>
          <Badge>{t("platformStats")}</Badge>
          <Badge>{t("contentManagement")}</Badge>
        </div>
      </Card>
    </AppShell>
  );
}
