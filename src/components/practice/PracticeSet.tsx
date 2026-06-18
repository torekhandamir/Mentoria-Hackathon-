"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { PracticeQuestion as PracticeQuestionType } from "@/lib/types";
import { getLocal, setLocal } from "@/lib/utils";
import { PracticeQuestion } from "./PracticeQuestion";
import { QuestionNavigator } from "./QuestionNavigator";
import { QuizResult } from "./QuizResult";

export function PracticeSet({ id, questions }: { id: string; questions: PracticeQuestionType[] }) {
  const { lang } = useTranslation();
  const [active, setActive] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number[]>([]);
  const copy = useMemo(
    () =>
      ({
        en: { savedAttempt: "Saved attempt" },
        ru: { savedAttempt: "Сохраненная попытка" },
        kk: { savedAttempt: "Сақталған талпыныс" },
      })[lang],
    [lang],
  );

  return (
    <div className="space-y-4">
      <QuestionNavigator count={questions.length} active={active} onSelect={setActive} />
      <PracticeQuestion
        question={questions[active]}
        onAnswered={(correct) => {
          if (!answered.includes(active)) {
            const nextAnswered = [...answered, active];
            setAnswered(nextAnswered);
            const nextScore = score + (correct ? 1 : 0);
            setScore(nextScore);
            setLocal(`practice-${id}`, {
              score: nextScore,
              answered: nextAnswered.length,
              updatedAt: new Date().toISOString(),
            });
          }
        }}
      />
      {answered.length === questions.length && <QuizResult score={score} total={questions.length} />}
      <p className="text-xs text-slate-500">
        {copy.savedAttempt}: {JSON.stringify(getLocal(`practice-${id}`, { score: 0, answered: 0 }))}
      </p>
    </div>
  );
}
