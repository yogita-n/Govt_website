import SectionLabel from '@/components/shared/SectionLabel';
import SkeletonCard from '@/components/shared/SkeletonCard';
import { useCampuses } from '@/hooks/useCampuses';
import { useSiteImages } from '@/hooks/useSiteImages';

export default function Campus() {
  const { data: campuses, isLoading } = useCampuses();
  const { data: images } = useSiteImages();
  const campusMapUrl = images?.find(i => i.key === 'campus_map')?.url || '';

  return (
    <section id="campus" className="bg-white section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Our Campus" />
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-darkgreen mb-2">4 Buildings · 5 Acres · Valagerehalli</h2>

        {campusMapUrl && (
          <div className="mt-8 mb-4">
            <img src={campusMapUrl} alt="Campus Layout Map" className="w-full rounded-xl shadow-md object-cover max-h-[400px]" />
            <p className="text-sm text-textmuted mt-2 text-center">Campus layout — Valagerehalli, Maddur</p>
          </div>
        )}

        <div className="mt-6 mb-10">
          <iframe
            src="https://maps.google.com/maps?q=Valagerehalli,Maddur&output=embed"
            title="PVET Location"
            className="w-full h-[400px] rounded-xl border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : campuses?.map(c => (
                <div key={c.slug} className="bg-white rounded-2xl shadow-md overflow-hidden border border-lightgreen/20">
                  <img src={c.image.url} alt={c.title} className="aspect-video w-full object-cover" />
                  <div className="p-5 space-y-3">
                    <h3 className="font-heading text-lg font-bold text-darkgreen">{c.title}</h3>
                    <p className="text-sm text-textmuted">{c.subtitle}</p>
                    <p className="text-textdark text-sm leading-relaxed">{c.description}</p>
                    {c.hasStats && c.stats && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {[
                          { label: 'Boys', val: c.stats.boys },
                          { label: 'Girls', val: c.stats.girls },
                          { label: 'Teachers', val: c.stats.teachers },
                          { label: 'Head', val: c.stats.head },
                        ].map(s => (
                          <div key={s.label} className="bg-lightgreen/30 rounded-lg p-2.5 text-center">
                            <div className="font-heading font-bold text-darkgreen text-sm">{s.val}</div>
                            <div className="text-xs text-textmuted">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
