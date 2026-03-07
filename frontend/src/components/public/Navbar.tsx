import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Campus', href: '#campus' },
  { label: 'Activities', href: '#activities' },
  { label: 'Donors', href: '#donors' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-darkgreen/95 backdrop-blur shadow-lg' : 'bg-darkgreen'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <button onClick={() => scrollTo('#home')} className="font-heading text-xl font-bold text-white tracking-wide">
            PVET
          </button>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm text-white/80 hover:text-white transition-colors">
                {l.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo('#contact')} className="hidden sm:block bg-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-accent/90 transition-colors">
              Donate Now
            </button>
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-white p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-darkgreen flex flex-col">
          <div className="flex items-center justify-between px-4 h-16">
            <span className="font-heading text-xl font-bold text-white">PVET</span>
            <button onClick={() => setMobileOpen(false)} className="text-white p-2"><X className="w-6 h-6" /></button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            {navLinks.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="text-2xl text-white font-heading hover:text-lightgreen transition-colors">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo('#contact')} className="mt-4 bg-accent text-white px-8 py-3 rounded-xl text-lg font-semibold">
              Donate Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
