"use client";

import { useMemo, useState } from "react";
import { BookOpen, CirclePlay, ClipboardCheck, Layers3, SquarePen } from "lucide-react";
import { Badge, Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CourseSection } from "@/lib/types";
import { PracticeSet } from "@/components/practice/PracticeSet";
import { Flashcards } from "@/components/practice/Flashcards";

const icons = {
  video: CirclePlay,
  reading: BookOpen,
  quiz: ClipboardCheck,
  practice: ClipboardCheck,
  flashcards: Layers3,
  assignment: SquarePen,
};

export function CourseRoadmap({ sections }: { sections: CourseSection[] }) {
  const tabs = useMemo(() => Array.from(new Set(sections.map((s) => s.tab))), [sections]);
  const [tab, setTab] = useState(tabs[0]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const visibleSections = sections.filter((s) => s.tab === tab);
  const selectedNode = visibleSections.flatMap((s) => s.nodes).find((n) => n.id === selectedNodeId) || visibleSections[0]?.nodes[0];

  return <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><div className="space-y-4 rounded-3xl bg-white p-5 text-slate-900"><div className="flex flex-wrap gap-2">{tabs.map((tabName) => <button key={tabName} onClick={() => setTab(tabName)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tabName === tab ? "bg-[#5E96CA] text-white" : "bg-slate-100 text-slate-600"}`}>{tabName}</button>)}</div>{visibleSections.map((section) => <div key={section.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4"><div className="mb-6 rounded-2xl bg-[#0F1621] p-4 text-white"><p className="text-xs tracking-[0.2em] text-[#94CFDB]">{section.title}</p></div><div className="relative space-y-5 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:border-l before:border-dashed before:border-[#5E96CA]/40">{section.nodes.map((node, index) => { const Icon = icons[node.type]; return <button key={node.id} onClick={() => setSelectedNodeId(node.id)} className="relative flex w-full items-start gap-4 text-left"><span className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full border ${index === 0 ? "border-[#5E96CA] bg-[#5E96CA] text-white" : "border-slate-300 bg-white text-slate-500"}`}><Icon size={18} /></span><div className={`rounded-2xl border p-4 ${selectedNode?.id === node.id ? "border-[#5E96CA] bg-white shadow-md" : "border-slate-200 bg-slate-100/80"}`}><div className="flex items-center gap-2"><Badge className="border-transparent bg-[#5E96CA]/10 text-[#1E2F50]">{node.type}</Badge></div><div className="mt-2 font-bold">{node.title}</div><p className="mt-1 text-sm text-slate-500">{node.description}</p></div></button>; })}</div></div>)}</div><Card><CardTitle>{selectedNode?.title || "Course node"}</CardTitle><p className="mt-2 text-sm text-slate-400">{selectedNode?.description}</p><div className="mt-4 flex flex-wrap gap-2">{selectedNode?.externalUrl && <a href={selectedNode.externalUrl} target="_blank" rel="noopener noreferrer"><Button>Start lesson</Button></a>}{selectedNode?.embedUrl && <iframe className="mt-3 aspect-video w-full rounded-2xl border border-[#324E60]" src={selectedNode.embedUrl} title={selectedNode.title} allowFullScreen />}{selectedNode?.questions && <div className="mt-4 w-full"><PracticeSet id={selectedNode.id} questions={selectedNode.questions} /></div>}{selectedNode?.flashcards && <div className="mt-4 w-full"><Flashcards cards={selectedNode.flashcards} /></div>}{selectedNode?.type === "assignment" && <div className="mt-4 rounded-xl border border-[#324E60] p-4 text-sm text-slate-300">Submit practice: write one concise response, compare it with the example, then continue to the next node.</div>}</div></Card></div>;
}
