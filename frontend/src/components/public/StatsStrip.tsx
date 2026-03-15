export default function StatsStrip() {

  const stats = [
    { value: '201',     label: 'Total Students' },
    { value: '18',      label: 'Teachers' },
    { value: '1985',    label: 'Est. Year' },
    { value: '5 Acres', label: 'Campus Area' },
    { value: '80G',     label: 'Tax Benefit' },
  ];

  return (
    <section className="bg-white py-6 border-b border-lightgreen/30">
      <div className="max-w-6xl mx-auto px-4 flex overflow-x-auto gap-0">
        {stats.map((s, i) => (
          <div key={s.label} className="flex items-center flex-shrink-0">
            <div className="text-center px-6 sm:px-10 py-2">
              <div className="font-heading text-2xl sm:text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-xs sm:text-sm text-textmuted mt-1">{s.label}</div>
            </div>
            {i < stats.length - 1 && (
              <div className="hidden sm:block w-px h-10 bg-lightgreen/50 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}