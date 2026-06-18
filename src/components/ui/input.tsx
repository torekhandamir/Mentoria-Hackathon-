import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-10 w-full rounded-xl border border-[#324E60] bg-[#07111F]/70 px-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#94CFDB]/60", className)} {...props} />;
}
export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={cn("h-10 w-full rounded-xl border border-[#324E60] bg-[#07111F] px-3 text-sm text-white outline-none focus:border-[#94CFDB]/60", className)} {...props} />;
}
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-24 w-full rounded-xl border border-[#324E60] bg-[#07111F]/70 p-3 text-sm text-white outline-none focus:border-[#94CFDB]/60", className)} {...props} />;
}
