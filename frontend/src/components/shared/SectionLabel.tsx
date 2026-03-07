interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className = '' }: SectionLabelProps) {
  return (
    <span className={`inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3 ${className}`}>
      {label}
    </span>
  );
}
