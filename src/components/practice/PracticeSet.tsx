"use client";

import { useState } from "react";
import { PracticeQuestion as PracticeQuestionType } from "@/lib/types";
import { PracticeQuestion } from "./PracticeQuestion";
import { QuestionNavigator } from "./QuestionNavigator";
import { QuizResult } from "./QuizResult";
import { getLocal, setLocal } from "@/lib/utils";

export function PracticeSet({ id, questions }: { id: string; questions: PracticeQuestionType[] }) {
  const [active, setActive] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number[]>([]);
  return <div className="space-y-4"><QuestionNavigator count={questions.length} active={active} onSelect={setActive} /><PracticeQuestion question={questions[active]} onAnswered={(correct) => { if (!answered.includes(active)) { const nextAnswered = [...answered, active]; setAnswered(nextAnswered); const nextScore = score + (correct ? 1 : 0); setScore(nextScore); setLocal(`practice-${id}`, { score: nextScore, answered: nextAnswered.length, updatedAt: new Date().toISOString() }); } }} />{answered.length === questions.length && <QuizResult score={score} total={questions.length} />}<p className="text-xs text-slate-500">Saved attempt: {JSON.stringify(getLocal(`practice-${id}`, { score: 0, answered: 0 }))}</p></div>;
}
