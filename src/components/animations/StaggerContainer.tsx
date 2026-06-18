"use client";

import { motion } from "motion/react";

export function StaggerContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className={className}>{children}</motion.div>;
}

export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }} className={className}>{children}</motion.div>;
}
