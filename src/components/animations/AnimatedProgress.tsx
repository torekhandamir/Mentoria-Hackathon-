"use client";

import { motion } from "motion/react";

export function AnimatedProgress({ value }: { value: number }) {
  return <div className="h-2 overflow-hidden rounded-full bg-white/10"><motion.div initial={{ width: 0 }} whileInView={{ width: `${Math.max(0, Math.min(100, value))}%` }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="h-full rounded-full bg-gradient-to-r from-[#86BCDE] to-[#94CFDB]" /></div>;
}
