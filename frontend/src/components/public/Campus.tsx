// import SectionLabel from '@/components/shared/SectionLabel';
// import SkeletonCard from '@/components/shared/SkeletonCard';
// import { useCampuses } from '@/hooks/useCampuses';
// import { useSiteImages } from '@/hooks/useSiteImages';
// import { useLanguage } from '@/contexts/LanguageContext';

// export default function Campus() {

//   const { data: campuses, isLoading } = useCampuses();
//   const { data: images } = useSiteImages();
//   const { t } = useLanguage();

//   const campusMapUrl = images?.find(i => i.key === 'campus_map')?.url || '';

//   return (
//     <section id="campus" className="bg-white section-padding">

//       <div className="max-w-6xl mx-auto">

//         <SectionLabel label={t('campus.title')} />

//         <h2 className="font-heading text-3xl lg:text-4xl font-bold text-darkgreen mb-2">
//           {t('campus.subtitle')}
//         </h2>

//         {campusMapUrl && (
//           <div className="mt-8 mb-4">
//             <img
//               src={campusMapUrl}
//               alt="Campus Layout Map"
//               className="w-full rounded-xl shadow-md object-cover max-h-[400px]"
//             />
//             <p className="text-sm text-textmuted mt-2 text-center">
//               {t('campus.mapCaption')}
//             </p>
//           </div>
//         )}

//         <div className="mt-6 mb-10">
//           <iframe
//             src="https://maps.google.com/maps?q=Valagerehalli,Maddur&output=embed"
//             title="PVET Location"
//             className="w-full h-[400px] rounded-xl border-0"
//             loading="lazy"
//             allowFullScreen
//           />
//         </div>

//         <div className="grid sm:grid-cols-2 gap-6">

//           {isLoading
//             ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
//             : campuses?.map(c => (
//                 <div
//                   key={c.slug}
//                   className="bg-white rounded-2xl shadow-md overflow-hidden border border-lightgreen/20"
//                 >

//                   <img
//                     src={c.image.url}
//                     alt={c.title}
//                     className="aspect-video w-full object-cover"
//                   />

//                   <div className="p-5 space-y-3">
//                     <h3 className="font-heading text-lg font-bold text-darkgreen">
//                       {c.title}
//                     </h3>

//                     <p className="text-sm text-textmuted">{c.subtitle}</p>

//                     <p className="text-textdark text-sm leading-relaxed">
//                       {c.description}
//                     </p>
//                   </div>

//                 </div>
//               ))}

//         </div>

//       </div>
//     </section>
//   );
// }
// import SectionLabel from '@/components/shared/SectionLabel';
// import SkeletonCard from '@/components/shared/SkeletonCard';
// import { useCampuses } from '@/hooks/useCampuses';
// import { useSiteImages } from '@/hooks/useSiteImages';

// export default function Campus() {
//   const { data: campuses, isLoading } = useCampuses();
//   const { data: images } = useSiteImages();

//   const campusMapUrl = images?.find(i => i.key === 'campus_map')?.url || '';

//   return (
//     <section id="campus" className="bg-white section-padding">
//       <div className="max-w-6xl mx-auto">

//         <SectionLabel label="Our Campus" />

//         <h2 className="font-heading text-3xl lg:text-4xl font-bold text-darkgreen mb-2">
//           3 Buildings · 5 Acres · Valagerehalli
//         </h2>

//         {campusMapUrl && (
//           <div className="mt-8 mb-4">
//             <img
//               src={campusMapUrl}
//               alt="Campus Layout Map"
//               className="w-full rounded-xl shadow-md object-cover max-h-[400px]"
//             />
//             <p className="text-sm text-textmuted mt-2 text-center">
//               Campus layout — Valagerehalli, Maddur
//             </p>
//           </div>
//         )}

//         <div className="mt-6 mb-10">
//           <iframe
//             src="https://maps.google.com/maps?q=Valagerehalli,Maddur&output=embed"
//             title="PVET Location"
//             className="w-full h-[400px] rounded-xl border-0"
//             loading="lazy"
//             allowFullScreen
//           />
//         </div>

//         <div className="grid sm:grid-cols-2 gap-6">
//           {isLoading
//             ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
//             : campuses?.map(c => (
//                 <div
//                   key={c.slug}
//                   className="bg-white rounded-2xl shadow-md overflow-hidden border border-lightgreen/20 flex flex-col"
//                 >
//                   <div className="relative w-full aspect-video bg-gray-100 shrink-0">
//                     <img
//                       src={c.image?.url}
//                       alt=""
//                       className="absolute inset-0 w-full h-full object-cover"
//                       onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
//                     />
//                   </div>

//                   <div className="p-5 space-y-3 flex flex-col flex-1">
//                     <h3 className="font-heading text-lg font-bold text-darkgreen leading-snug">
//                       {c.title}
//                     </h3>
//                     {c.subtitle && <p className="text-sm text-textmuted">{c.subtitle}</p>}
//                     {c.description && <p className="text-textdark text-sm leading-relaxed">{c.description}</p>}
//                   </div>
//                 </div>
//               ))}
//         </div>

//       </div>
//     </section>
//   );
// }
import SectionLabel from '@/components/shared/SectionLabel';
import SkeletonCard from '@/components/shared/SkeletonCard';
import { useCampuses } from '@/hooks/useCampuses';

export default function Campus() {
  const { data: campuses, isLoading } = useCampuses();

  // Filter out Library & Computer Lab card
  const filteredCampuses = campuses?.filter(c => c.slug !== 'library') ?? [];

  return (
    <section id="campus" className="bg-white section-padding">
      <div className="max-w-6xl mx-auto">

        <SectionLabel label="Our Campus" />

        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-darkgreen mb-2">
          3 Buildings · 5 Acres · Valagerehalli
        </h2>



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
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredCampuses.map((c, index) => {
                const isLastOdd =
                  filteredCampuses.length % 2 !== 0 &&
                  index === filteredCampuses.length - 1;

                return (
                  <div
                    key={c.slug}
                    className={`bg-white rounded-2xl shadow-md overflow-hidden border border-lightgreen/20 flex flex-col ${
                      isLastOdd ? 'sm:col-span-2 sm:w-1/2 sm:mx-auto' : ''
                    }`}
                  >
                    <div className="relative w-full aspect-video bg-gray-100 shrink-0">
                      <img
                        src={c.image?.url}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    </div>

                    <div className="p-5 space-y-3 flex flex-col flex-1">
                      <h3 className="font-heading text-lg font-bold text-darkgreen leading-snug">
                        {c.title}
                      </h3>
                      {c.subtitle && <p className="text-sm text-textmuted">{c.subtitle}</p>}
                      {c.description && <p className="text-textdark text-sm leading-relaxed">{c.description}</p>}
                    </div>
                  </div>
                );
              })}
        </div>

      </div>
    </section>
  );
}