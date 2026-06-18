"use client";

import { motion } from "motion/react";

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.5, ease: "easeOut" }} className={className}>{children}</motion.div>;
}
