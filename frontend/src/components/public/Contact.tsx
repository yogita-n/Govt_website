import { Mail, MapPin, Heart } from 'lucide-react';
import { useContactInfo } from '@/hooks/useContactInfo';

export default function Contact() {
  const { data: contact } = useContactInfo();

  return (
    <section id="contact" className="bg-darkgreen section-padding">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-heading text-2xl sm:text-3xl lg:text-4xl italic text-white mb-4 leading-snug">
          "Tiny drops of water make a mighty ocean."
        </p>
        <p className="text-lightgreen mb-12 max-w-xl mx-auto">
          Every little contribution matters. Help us improve our school's infrastructure and education.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-[#1a3515] rounded-xl p-6 space-y-3">
            <Mail className="w-8 h-8 text-lightgreen" />
            <h3 className="font-heading font-bold text-white">Get in Touch</h3>
            {contact && (
              <div className="space-y-1 text-sm text-white/80">
                <p>{contact.contactPersonName}</p>
                <p className="text-white/60">{contact.contactPersonTitle}</p>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
              </div>
            )}
          </div>

          <div className="bg-[#1a3515] rounded-xl p-6 space-y-3">
            <MapPin className="w-8 h-8 text-lightgreen" />
            <h3 className="font-heading font-bold text-white">Visit Us</h3>
            {contact && (
              <div className="space-y-1 text-sm text-white/80">
                <p>{contact.address}</p>
                <p className="text-white/60 mt-2">90km from Bengaluru via NH 275</p>
              </div>
            )}
          </div>

          <div className="bg-[#1a3515] rounded-xl p-6 space-y-3">
            <Heart className="w-8 h-8 text-lightgreen" />
            <h3 className="font-heading font-bold text-white">Support Our Mission</h3>
            <p className="text-sm text-white/80">Registered under 12A & 80G</p>
            {contact && <p className="text-xs text-white/60">{contact.taxNote}</p>}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-3 w-full bg-accent text-white py-3 rounded-xl font-semibold hover:bg-accent/90 transition-colors"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
