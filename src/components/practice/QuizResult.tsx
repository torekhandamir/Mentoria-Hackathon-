import { Card, CardTitle } from "@/components/ui/card";

export function QuizResult({ score, total }: { score: number; total: number }) {
  return <Card><CardTitle>Quiz Result</CardTitle><p className="mt-3 text-sm text-slate-300">Score: {score}/{total}</p><p className="mt-2 text-sm text-slate-400">Attempts and score are saved locally.</p></Card>;
}
