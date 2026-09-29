export function Mark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M16 2 28 9v14L16 30 4 23V9z" fill="hsl(var(--ink))" />
      <path d="M9 19c3.5 0 3.5-6 7-6s3.5 6 7 6" stroke="hsl(var(--copper))" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="16" cy="9.5" r="1.8" fill="hsl(var(--copper))" />
    </svg>
  );
}