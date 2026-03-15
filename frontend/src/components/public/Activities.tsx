// import { useState } from 'react';
// import SectionLabel from '@/components/shared/SectionLabel';
// import SkeletonCard from '@/components/shared/SkeletonCard';
// import { useActivities } from '@/hooks/useActivities';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// export default function Activities() {
//   const { data: activities, isLoading } = useActivities();
//   const { t } = useLanguage();

//   const categories = [
//     t('activities.all'),
//     t('activities.cultural'),
//     t('activities.academic'),
//     t('activities.sports'),
//     t('activities.infrastructure')
//   ];

//   const [filter, setFilter] = useState(categories[0]);

//   const [lightbox, setLightbox] = useState<{
//     images: { url: string; caption: string }[];
//     index: number;
//   } | null>(null);

//   const filtered =
//     filter === categories[0]
//       ? activities
//       : activities?.filter(a => a.category === filter);

//   return (
//     <section id="activities" className="bg-cream section-padding">
//       <div className="max-w-6xl mx-auto">

//         <SectionLabel label={t('activities.title')} />

//         <h2 className="font-heading text-3xl lg:text-4xl font-bold text-darkgreen mb-6">
//           {t('activities.subtitle')}
//         </h2>

//         <div className="flex flex-wrap gap-2 mb-8">
//           {categories.map(c => (
//             <button
//               key={c}
//               onClick={() => setFilter(c)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                 filter === c
//                   ? 'bg-primary text-white'
//                   : 'bg-white text-textdark hover:bg-lightgreen/50'
//               }`}
//             >
//               {c}
//             </button>
//           ))}
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {isLoading
//             ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
//             : filtered?.map(a => (
//                 <div key={a.id} className="bg-white rounded-xl shadow-md overflow-hidden group">

//                   <div className="relative">
//                     {a.images[0] && (
//                       <img
//                         src={a.images[0].url}
//                         alt={a.title}
//                         className="aspect-video w-full object-cover"
//                       />
//                     )}

//                     <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
//                       {a.category}
//                     </span>
//                   </div>

//                   <div className="p-4 space-y-2">
//                     <h3 className="font-heading font-bold text-darkgreen">
//                       {a.title}
//                     </h3>

//                     <p className="text-xs text-textmuted">
//                       {new Date(a.date).toLocaleDateString('en-IN', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </p>

//                     <p className="text-sm text-textdark line-clamp-2">
//                       {a.description}
//                     </p>

//                     {a.images.length > 0 && (
//                       <button
//                         onClick={() =>
//                           setLightbox({ images: a.images, index: 0 })
//                         }
//                         className="text-sm font-semibold text-accent hover:underline"
//                       >
//                         {t('activities.viewPhotos')}
//                       </button>
//                     )}
//                   </div>

//                 </div>
//               ))}
//         </div>

//       </div>
//     </section>
//   );
// }
import { useState } from 'react';
import SectionLabel from '@/components/shared/SectionLabel';
import SkeletonCard from '@/components/shared/SkeletonCard';
import { useActivities } from '@/hooks/useActivities';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const CATEGORIES = ['All', 'Cultural', 'Academic', 'Sports', 'Infrastructure'];

export default function Activities() {
  const { data: activities, isLoading } = useActivities();
  const [filter, setFilter] = useState('All');

  const [lightbox, setLightbox] = useState<{
    images: { url: string; caption: string }[];
    index: number;
  } | null>(null);

  const filtered =
    filter === 'All'
      ? activities
      : activities?.filter(a => a.category === filter);

  return (
    <section id="activities" className="bg-cream section-padding">
      <div className="max-w-6xl mx-auto">

        <SectionLabel label="Recent Activities" />

        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-darkgreen mb-6">
          A glimpse into student life
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === c ? 'bg-primary text-white' : 'bg-white text-textdark hover:bg-lightgreen/50'
              }`}
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
                    <p className="text-xs text-textmuted">
                      {new Date(a.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
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
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white"><X className="w-8 h-8" /></button>
          <button
            onClick={() => setLightbox(lb => lb && lb.index > 0 ? { ...lb, index: lb.index - 1 } : lb)}
            className="absolute left-4 text-white"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img src={lightbox.images[lightbox.index].url} alt="" className="max-h-[80vh] max-w-full rounded-xl" />
          <button
            onClick={() => setLightbox(lb => lb && lb.index < lb.images.length - 1 ? { ...lb, index: lb.index + 1 } : lb)}
            className="absolute right-4 text-white"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
}