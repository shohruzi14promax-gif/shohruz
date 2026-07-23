import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Administration from '@/components/Administration';
import Academic from '@/components/Academic';
import VideoLessons from '@/components/VideoLessons';
import Innovation from '@/components/Innovation';
import PresidentOffice from '@/components/PresidentOffice';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Administration />
        <Academic />
        <VideoLessons />
        <Innovation />
        <PresidentOffice />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
