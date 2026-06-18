"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/i18n";

export function MentoriaAssistantPanel() {
  const [message, setMessage] = useState("");
  const { t } = useTranslation();
  const [response, setResponse] = useState(t("assistantEmpty"));

  return <Card><CardTitle>{t("assistantTitle")}</CardTitle><p className="mt-2 text-sm text-slate-400">{t("assistantSubtitle")}</p><div className="mt-4 flex flex-wrap gap-2">{["Recommend opportunities for my major", "Explain opportunity cost", "Create a 7-day SAT Math plan", "Help me choose an economics competition", "Summarize this resource"].map((p) => <button key={p} onClick={() => setMessage(p)} className="rounded-full border border-[#324E60] px-3 py-1 text-xs text-[#94CFDB]">{p}</button>)}</div><div className="mt-5 flex gap-2"><Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t("assistantPlaceholder")} /><Button onClick={() => {
    // TODO: connect assistant backend later.
    setResponse(t("assistantEmpty"));
  }}>{t("ask")}</Button></div><div className="mt-4 rounded-xl border border-[#324E60] bg-[#07111F]/60 p-4 text-sm text-slate-300">{response}</div></Card>;
}
