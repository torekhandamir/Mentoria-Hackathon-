import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-2xl border border-[#324E60]/70 bg-white/[0.055] p-5 shadow-2xl shadow-black/20 backdrop-blur transition hover:-translate-y-1 hover:border-[#86BCDE]/60 hover:bg-white/[0.075] hover:shadow-[#5E96CA]/10", className)} {...props} />;
}
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-black text-white", className)} {...props} />;
}
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-[#86BCDE]/25 bg-[#86BCDE]/10 px-2.5 py-1 text-xs font-bold text-[#94CFDB]", className)} {...props} />;
}
