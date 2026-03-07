import SectionLabel from '@/components/shared/SectionLabel';
import { useSiteImages } from '@/hooks/useSiteImages';

export default function About() {
  const { data: images } = useSiteImages();
  const founderUrl = images?.find(i => i.key === 'founder_portrait')?.url || '';

  return (
    <section id="about" className="bg-cream section-padding">
      <div className="max-w-6xl mx-auto">
        <SectionLabel label="Our History" />
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start mt-4">
          <div className="order-2 md:order-1">
            {founderUrl && (
              <img src={founderUrl} alt="Founder V.K. Veerappa" className="rounded-2xl shadow-lg aspect-[3/4] object-cover w-full max-w-sm mx-auto" />
            )}
          </div>
          <div className="order-1 md:order-2 space-y-5">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-darkgreen">A Vision Born in a Village</h2>
            <p className="text-textdark leading-relaxed">
              V.K. Veerappa (1929–2017) was born into a poor family in the small village of Valagerehalli.
              He worked hard, became an Engineer, but never forgot his roots.
            </p>
            <p className="text-textdark leading-relaxed">
              In 1985, he started the school in a small shed with a few children. Through unwavering
              determination, he collected charitable funds and built the entire campus over two decades.
            </p>
            <p className="text-textdark leading-relaxed">
              Today, over 200 students study here and have gone on to become engineers, doctors, and
              business people — fulfilling his dream.
            </p>
            <blockquote className="border-l-4 border-accent pl-5 py-2 italic text-textmuted">
              "Progress in every country depends mainly on the education of its people."
              <span className="block mt-1 not-italic text-sm font-semibold text-textdark">— Sir M. Visvesvaraya</span>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
