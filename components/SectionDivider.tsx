export default function SectionDivider({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`divider-gradient ${className}`} />;
}
