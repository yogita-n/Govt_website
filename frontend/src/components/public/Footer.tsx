export default function Footer() {
  const navLinks = ['Home', 'About', 'Campus', 'Activities', 'Donors', 'Contact'];

  return (
    <footer className="bg-textdark py-10">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-5">

        <div>
          <span className="font-heading text-xl font-bold text-white">PVET</span>
          <p className="text-white/50 text-sm mt-1">Pramila Veerappa Educational Trust</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {navLinks.map(l => (
            <button
              key={l}
              onClick={() => document.querySelector(`#${l.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' })}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {l}
            </button>
          ))}
        </div>

        <div className="border-t border-white/10 pt-5 space-y-2">
          <p className="text-white/40 text-xs">
            © 2026 Pramila Veerappa Educational Trust ® · All rights reserved
          </p>
          <p className="text-white/30 text-xs">
            Built with ❤ to support rural education
          </p>
        </div>

      </div>
    </footer>
  );
}