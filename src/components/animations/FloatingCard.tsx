"use client";

import { motion } from "motion/react";

export function FloatingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className={className}>{children}</motion.div>;
}
