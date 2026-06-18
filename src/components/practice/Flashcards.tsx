"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export function Flashcards({ cards }: { cards: { front: string; back: string }[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = cards[index];
  return <div className="space-y-3"><Card className="cursor-pointer text-center" onClick={() => setFlipped((x) => !x)}><div className="text-xs uppercase text-slate-400">{flipped ? "Back" : "Front"}</div><div className="mt-3 text-lg font-bold text-white">{flipped ? card.back : card.front}</div></Card><div className="flex gap-2"><button className="rounded-xl border border-[#324E60] px-3 py-2 text-sm" onClick={() => { setIndex((i) => Math.max(0, i - 1)); setFlipped(false); }}>Prev</button><button className="rounded-xl border border-[#324E60] px-3 py-2 text-sm" onClick={() => { setIndex((i) => Math.min(cards.length - 1, i + 1)); setFlipped(false); }}>Next</button></div></div>;
}
