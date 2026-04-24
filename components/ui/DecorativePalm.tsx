type DecorativePalmProps = {
  className?: string;
  flip?: boolean;
};

export default function DecorativePalm({ className, flip }: DecorativePalmProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      aria-hidden="true"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      fill="none"
    >
      <path
        d="M82 210c18-55 20-102 6-146"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M90 68C60 20 25 15 8 21c34 5 52 26 65 62M94 67C92 23 116 3 139 4c-19 18-25 42-25 75M96 72c33-37 70-41 94-29-31 8-54 27-72 54M97 78c50-10 87 4 105 29-39-8-70-4-100 14M88 75C45 62 19 73 3 92c31-4 56 2 80 23"
        stroke="currentColor"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
