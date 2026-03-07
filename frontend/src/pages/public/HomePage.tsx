import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import StatsStrip from '@/components/public/StatsStrip';
import About from '@/components/public/About';
import Campus from '@/components/public/Campus';
import Activities from '@/components/public/Activities';
import Donors from '@/components/public/Donors';
import Contact from '@/components/public/Contact';
import Footer from '@/components/public/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsStrip />
      <About />
      <Campus />
      <Activities />
      <Donors />
      <Contact />
      <Footer />
    </>
  );
}
