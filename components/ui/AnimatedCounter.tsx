"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
};

export default function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(reduce ? value : 0);
  const formatted = useTransform(motionValue, (latest) =>
    latest.toLocaleString("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  );

  useEffect(() => {
    if (reduce) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [value, reduce, motionValue]);

  return (
    <span className={className}>
      <motion.span>{formatted}</motion.span>
      {suffix}
    </span>
  );
}
