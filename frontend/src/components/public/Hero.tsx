import { useSiteImages } from '@/hooks/useSiteImages';

export default function Hero() {
  const { data: images } = useSiteImages();
  const heroUrl = images?.find(i => i.key === 'hero_banner')?.url || '';

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {heroUrl && (
        <img src={heroUrl} alt="PVET School" className="absolute inset-0 w-full h-full object-cover" />
      )}

      <div className="absolute inset-0 bg-darkgreen/55" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight mb-6">
          Free Education for Every Child
        </h1>

        <p className="text-lightgreen text-base sm:text-lg mb-10 max-w-2xl mx-auto font-body">
          Pramila Veerappa Educational Trust · Est. 1985 · Valagerehalli, Maddur, Karnataka
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollTo('#contact')} className="bg-accent text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-accent/90 transition-colors">
            Donate Now
          </button>
          <button onClick={() => scrollTo('#about')} className="border-2 border-white text-white px-8 py-3.5 rounded-xl text-lg font-semibold hover:bg-white/10 transition-colors">
            Our Story →
          </button>
        </div>

      </div>
    </section>
  );
}