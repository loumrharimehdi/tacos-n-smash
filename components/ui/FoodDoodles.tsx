type FoodDoodlesProps = {
  className?: string;
};

export default function FoodDoodles({ className }: FoodDoodlesProps) {
  return (
    <svg viewBox="0 0 280 180" aria-hidden="true" className={className} fill="none">
      <path d="M26 54c24-30 55-42 93-35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d="M32 73c23-13 49-18 78-12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M206 34l8 18 18 7-18 8-8 18-8-18-18-8 18-7 8-18Z" fill="currentColor" />
      <path d="M67 130l5 11 12 5-12 5-5 12-5-12-12-5 12-5 5-11Z" fill="currentColor" />
      <path d="M208 124c20-3 35 1 46 12" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M218 148c14-2 26 1 36 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
