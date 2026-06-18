"use client";

import { animate } from "motion/react";
import { useEffect, useState } from "react";

export function CountUpStat({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.1,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{display}{suffix}</span>;
}
