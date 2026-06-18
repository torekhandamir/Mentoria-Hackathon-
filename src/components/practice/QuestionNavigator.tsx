export function QuestionNavigator({ count, active, onSelect }: { count: number; active: number; onSelect: (index: number) => void }) {
  return <div className="flex flex-wrap gap-2">{Array.from({ length: count }).map((_, i) => <button key={i} onClick={() => onSelect(i)} className={`grid size-9 place-items-center rounded-full border text-sm ${i === active ? "border-[#94CFDB] bg-[#94CFDB]/10 text-white" : "border-[#324E60] text-slate-300"}`}>{i + 1}</button>)}</div>;
}
