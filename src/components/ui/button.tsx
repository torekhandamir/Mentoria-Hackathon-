import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "default", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "secondary" | "ghost" | "outline" }) {
  return <button className={cn("inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#94CFDB]/60 disabled:opacity-50", variant === "default" && "bg-gradient-to-r from-[#5E96CA] to-[#94CFDB] text-[#07111F] hover:shadow-lg hover:shadow-[#5E96CA]/25", variant === "secondary" && "bg-[#1E2F50] text-white hover:bg-[#324E60]", variant === "ghost" && "text-slate-200 hover:bg-white/10", variant === "outline" && "border border-[#324E60] bg-white/5 text-white hover:bg-white/10", className)} {...props} />;
}
