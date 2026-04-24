"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { MouseEventHandler, ReactNode } from "react";

type Variant = "primary" | "secondary" | "green" | "brown";
type Size = "sm" | "md" | "lg";

type StreetButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  size?: Size;
  variant?: Variant;
  fullWidth?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-orange text-brand-cream shadow-hard hover:shadow-hard-lg",
  secondary:
    "bg-brand-cream text-brand-brown shadow-green hover:shadow-green-lg",
  green:
    "bg-brand-green text-brand-yellow shadow-hard hover:shadow-hard-lg",
  brown:
    "bg-brand-brown text-brand-yellow shadow-green hover:shadow-green-lg",
};

const sizeClasses: Record<Size, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-3 text-base",
  lg: "min-h-14 px-8 py-4 text-lg",
};

function classes({
  variant,
  size,
  fullWidth,
  className,
}: {
  variant: Variant;
  size: Size;
  fullWidth?: boolean;
  className?: string;
}) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full border-[3px] border-brand-brown font-display uppercase leading-none transition-transform duration-200 ease-out active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:pointer-events-none disabled:opacity-55",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

export default function StreetButton({
  children,
  href,
  onClick,
  icon,
  size = "md",
  variant = "primary",
  fullWidth,
  className,
  type = "button",
  disabled,
  ariaLabel,
}: StreetButtonProps) {
  const classNameValue = classes({ variant, size, fullWidth, className });
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className={classNameValue}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={!disabled ? { x: -3, y: -3 } : undefined}
      whileTap={!disabled ? { x: 2, y: 2 } : undefined}
      className={classNameValue}
    >
      {content}
    </motion.button>
  );
}
