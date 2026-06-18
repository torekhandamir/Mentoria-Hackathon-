"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PracticeQuestion as PracticeQuestionType } from "@/lib/types";

export function PracticeQuestion({ question, onAnswered }: { question: PracticeQuestionType; onAnswered: (correct: boolean) => void }) {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const correct = value.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

  return <Card className="space-y-3"><p className="font-semibold text-white">{question.prompt}</p>{question.choices ? <div className="grid gap-2">{question.choices.map((choice) => <button key={choice} onClick={() => setValue(choice)} className={`rounded-xl border px-3 py-2 text-left text-sm ${value === choice ? "border-[#94CFDB] bg-[#94CFDB]/10" : "border-[#324E60]"}`}>{choice}</button>)}</div> : <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Your answer" />}{!submitted ? <Button onClick={() => { setSubmitted(true); onAnswered(correct); }}>Submit practice</Button> : <div className={`rounded-xl p-3 text-sm ${correct ? "bg-emerald-500/10 text-emerald-200" : "bg-red-500/10 text-red-200"}`}>{correct ? "Correct" : "Try again"}: {question.explanation}</div>}</Card>;
}
