const text =
  "★ TACOS SIGNATURE ★ SMASH BURGERS ★ SAUCE FROMAGÈRE MAISON ★ FRITES FRAÎCHES ★ LIVRAISON MEKNÈS ★ 4,8 GOOGLE ★";

export default function MarqueeTicker() {
  return (
    <div className="overflow-hidden border-y-[3px] border-brand-green bg-brand-brown py-3 text-brand-yellow">
      <div className="flex min-w-max animate-marquee whitespace-nowrap font-display text-2xl uppercase sm:text-3xl">
        {[0, 1].map((row) => (
          <span key={row} className="px-6 tracking-[0.08em]">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
