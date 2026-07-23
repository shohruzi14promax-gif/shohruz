import { useState } from 'react';
import { Play, Clock, Youtube, Send } from 'lucide-react';
import { videoLessons } from '@/lib/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function VideoLessons() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="video" className="apple-section bg-white/50">
      <div className="apple-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="apple-eyebrow mb-4">Video Darslar</p>
          <h2 className="apple-heading">O'qituvchilardan video darslar arxivi</h2>
          <p className="apple-subheading mt-4">
            Chuqurlashtirilgan fanlar bo'yicha sifatli video darslar — istalgan vaqtda, istalgan joyda
          </p>
        </div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videoLessons.map((lesson, index) => (
            <div
              key={index}
              className={`group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-700 ease-out hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setActiveVideo(activeVideo === index ? null : index)}
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                {activeVideo === index ? (
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${lesson.youtubeId}?autoplay=1`}
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img
                      src={lesson.thumbnail}
                      alt={lesson.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
                        <Play className="ml-0.5 h-6 w-6 fill-[#0071e3] text-[#0071e3]" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">
                      {lesson.duration}
                    </div>
                  </>
                )}
              </div>

              <div className="p-5">
                <span className="inline-block rounded-full bg-[#0071e3]/10 px-3 py-1 text-xs font-medium text-[#0071e3]">
                  {lesson.subject}
                </span>
                <h3 className="mt-3 text-base font-semibold leading-snug text-[#1d1d1f]">{lesson.title}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#6e6e73]">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{lesson.teacher}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl bg-gradient-to-br from-[#0071e3]/5 to-[#42a5f5]/5 p-8 text-center sm:flex-row sm:gap-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff3b30]/10">
              <Youtube className="h-6 w-6 text-[#ff3b30]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[#1d1d1f]">YouTube kanalimiz</p>
              <p className="text-xs text-[#6e6e73]">200+ video darslar arxivi</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071e3]/10">
              <Send className="h-6 w-6 text-[#0071e3]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-[#1d1d1f]">Telegram kanalimiz</p>
              <p className="text-xs text-[#6e6e73]">Kunlik yangi darslar</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
