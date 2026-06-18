"use client";

import { useMemo } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n";

export function QuizResult({ score, total }: { score: number; total: number }) {
  const { lang } = useTranslation();
  const copy = useMemo(
    () =>
      ({
        en: {
          title: "Quiz Result",
          score: "Score",
          saved: "Attempts and score are saved locally.",
        },
        ru: {
          title: "Результат квиза",
          score: "Результат",
          saved: "Попытки и результат сохраняются локально.",
        },
        kk: {
          title: "Квиз нәтижесі",
          score: "Нәтиже",
          saved: "Талпыныстар мен нәтиже локалды түрде сақталады.",
        },
      })[lang],
    [lang],
  );

  return (
    <Card>
      <CardTitle>{copy.title}</CardTitle>
      <p className="mt-3 text-sm text-slate-300">
        {copy.score}: {score}/{total}
      </p>
      <p className="mt-2 text-sm text-slate-400">{copy.saved}</p>
    </Card>
  );
}
