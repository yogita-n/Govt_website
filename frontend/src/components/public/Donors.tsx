import SectionLabel from '@/components/shared/SectionLabel';
import { useDonors } from '@/hooks/useDonors';
import { useContactInfo } from '@/hooks/useContactInfo';

export default function Donors() {
  const { data: donors } = useDonors();
  const { data: contact } = useContactInfo();

  return (
    <section id="donors" className="bg-lightgreen/40 section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Our Donors" />
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-darkgreen mb-8">
          We are grateful to those who believed in this dream
        </h2>

        <div className="flex flex-wrap gap-3 mb-8">
          {donors?.map(d => (
            <div key={d.id} className="bg-white rounded-full px-4 py-2 shadow-sm flex items-center gap-2">
              <span className="font-semibold text-sm text-textdark">{d.name}</span>
              {d.location && <span className="text-xs text-textmuted">· {d.location}</span>}
            </div>
          ))}
        </div>

        <p className="text-textmuted italic mb-8">...and many individual donors. Thank you.</p>

        {contact?.taxNote && (
          <div className="bg-white rounded-xl border-l-4 border-accent p-5 max-w-2xl">
            <p className="text-sm text-textdark leading-relaxed">{contact.taxNote}</p>
          </div>
        )}
      </div>
    </section>
  );
}
