import { useState } from 'react';
import SectionLabel from '@/components/shared/SectionLabel';
import SkeletonCard from '@/components/shared/SkeletonCard';
import { useActivities } from '@/hooks/useActivities';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const categories = ['All', 'Cultural', 'Academic', 'Sports', 'Infrastructure'];

export default function Activities() {
  const { data: activities, isLoading } = useActivities();
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState<{ images: { url: string; caption: string }[]; index: number } | null>(null);

  const filtered = filter === 'All' ? activities : activities?.filter(a => a.category === filter);

  return (
    <section id="activities" className="bg-cream section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Recent Activities" />
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-darkgreen mb-6">A glimpse into student life</h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === c ? 'bg-primary text-white' : 'bg-white text-textdark hover:bg-lightgreen/50'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered?.map(a => (
                <div key={a.id} className="bg-white rounded-xl shadow-md overflow-hidden group">
                  <div className="relative">
                    {a.images[0] && (
                      <img src={a.images[0].url} alt={a.title} className="aspect-video w-full object-cover" />
                    )}
                    <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {a.category}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-heading font-bold text-darkgreen">{a.title}</h3>
                    <p className="text-xs text-textmuted">{new Date(a.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-sm text-textdark line-clamp-2">{a.description}</p>
                    {a.images.length > 0 && (
                      <button
                        onClick={() => setLightbox({ images: a.images, index: 0 })}
                        className="text-sm font-semibold text-accent hover:underline"
                      >
                        View Photos →
                      </button>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[70] bg-black/90 flex items-center justify-center" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white z-10" onClick={() => setLightbox(null)}><X className="w-8 h-8" /></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10" onClick={(e) => { e.stopPropagation(); setLightbox(l => l ? { ...l, index: Math.max(0, l.index - 1) } : null); }}>
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10" onClick={(e) => { e.stopPropagation(); setLightbox(l => l ? { ...l, index: Math.min(l.images.length - 1, l.index + 1) } : null); }}>
            <ChevronRight className="w-10 h-10" />
          </button>
          <div className="max-w-4xl w-full px-4" onClick={e => e.stopPropagation()}>
            <img src={lightbox.images[lightbox.index].url} alt="" className="w-full max-h-[80vh] object-contain rounded-lg" />
            {lightbox.images[lightbox.index].caption && (
              <p className="text-white text-center mt-3">{lightbox.images[lightbox.index].caption}</p>
            )}
            <p className="text-white/60 text-center text-sm mt-1">{lightbox.index + 1} / {lightbox.images.length}</p>
          </div>
        </div>
      )}
    </section>
  );
}
