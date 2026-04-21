"use client";

import { useEffect } from "react";
import { animate, useMotionValue, useTransform, motion } from "framer-motion";

export default function PriceCounter({
  value,
  className = "",
  suffix = " DH",
}: {
  value: number;
  className?: string;
  suffix?: string;
}) {
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.5,
      ease: [0.2, 0.8, 0.2, 1],
    });
    return controls.stop;
  }, [value, mv]);

  return (
    <span className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
