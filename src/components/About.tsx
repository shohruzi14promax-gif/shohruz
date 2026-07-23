import { Target, Lightbulb, Heart, Users } from 'lucide-react';
import { goals, historyTimeline } from '@/lib/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const iconMap: Record<string, typeof Target> = {
  Target,
  Lightbulb,
  Heart,
  Users,
};

export default function About() {
  const { ref: goalsRef, isVisible: goalsVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="about" className="apple-section">
      <div className="apple-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="apple-eyebrow mb-4">Maktab haqida</p>
          <h2 className="apple-heading">Maqsadlarimiz va tariximiz</h2>
          <p className="apple-subheading mt-4">
            2022-yildan beri iqtidorli o'quvchilarni kelajak yetakchilariga aylantirib kelyapmiz
          </p>
        </div>

        <div ref={goalsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {goals.map((goal, index) => {
            const Icon = iconMap[goal.icon] ?? Target;
            return (
              <div
                key={index}
                className={`apple-card group transition-all duration-700 ease-out ${
                  goalsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0071e3]/10 transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-[#0071e3]" strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#1d1d1f]">{goal.title}</h3>
                <p className="text-sm font-normal leading-relaxed text-[#6e6e73]">{goal.description}</p>
              </div>
            );
          })}
        </div>

        <div ref={timelineRef} className="mt-24">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl">
              Tarixiy xronologiya
            </h3>
            <p className="mt-3 text-base font-normal text-[#6e6e73]">
              Maktabning rivojlanish yo'nalishi — yildan yilga
            </p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-[#0071e3] via-[#0071e3]/30 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

            {historyTimeline.map((item, index) => (
              <div
                key={index}
                className={`relative mb-12 flex flex-col gap-4 pl-12 sm:w-1/2 sm:pl-0 ${
                  index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:ml-auto sm:pl-12'
                } transition-all duration-700 ease-out ${
                  timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`absolute top-1.5 left-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-[#0071e3]/10 sm:left-auto ${
                    index % 2 === 0 ? 'sm:-right-4' : 'sm:-left-4'
                  }`}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-[#0071e3]" />
                </div>

                <div className="apple-card !p-6">
                  <div className="mb-1 text-2xl font-bold text-[#0071e3]">{item.year}</div>
                  <h4 className="mb-2 text-lg font-semibold text-[#1d1d1f]">{item.title}</h4>
                  <p className="text-sm font-normal leading-relaxed text-[#6e6e73]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
