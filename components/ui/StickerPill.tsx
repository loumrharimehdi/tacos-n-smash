import type { ReactNode } from "react";

type StickerPillProps = {
  children: ReactNode;
  color?: "green" | "orange" | "brown" | "cream";
  rotation?: number;
  icon?: ReactNode;
  className?: string;
};

const colors = {
  green: "bg-brand-green text-brand-yellow",
  orange: "bg-brand-orange text-brand-cream",
  brown: "bg-brand-brown text-brand-yellow",
  cream: "bg-brand-cream text-brand-brown",
};

export default function StickerPill({
  children,
  color = "green",
  rotation = 0,
  icon,
  className,
}: StickerPillProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border-2 border-brand-brown px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] shadow-hard",
        colors[color],
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {icon}
      {children}
    </span>
  );
}
