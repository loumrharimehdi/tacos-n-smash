type PriceBadgeProps = {
  price: number | string;
  color?: "yellow" | "orange" | "green";
  rotation?: number;
  className?: string;
};

const colors = {
  yellow: "bg-brand-yellow text-brand-brown shadow-green",
  orange: "bg-brand-orange text-brand-cream shadow-hard",
  green: "bg-brand-green text-brand-yellow shadow-hard",
};

export default function PriceBadge({
  price,
  color = "yellow",
  rotation = 0,
  className,
}: PriceBadgeProps) {
  return (
    <span
      className={[
        "inline-flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border-[3px] border-brand-brown font-display uppercase leading-none",
        colors[color],
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-label={`${price} DH`}
    >
      <span className="text-3xl">{price}</span>
      <span className="-mt-1 text-sm">DH</span>
    </span>
  );
}
