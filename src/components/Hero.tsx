import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { schoolInfo, stats } from '@/lib/data';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

function StatCard({ stat, index, visible }: { stat: (typeof stats)[number]; index: number; visible: boolean }) {
  const count = useCountUp(stat.value, 2000, visible);
  return (
    <div
      className={`flex flex-col items-center text-center transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl font-bold tracking-tight text-[#1d1d1f] sm:text-5xl md:text-6xl">
        {count.toLocaleString()}
        <span className="text-[#0071e3]">{stat.suffix}</span>
      </div>
      <div className="mt-2 text-sm font-medium text-[#6e6e73] sm:text-base">{stat.label}</div>
    </div>
  );
}

export default function Hero() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setStatsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-100/40 via-transparent to-transparent blur-3xl" />
        <div className="absolute right-0 top-40 h-[400px] w-[400px] rounded-full bg-gradient-to-bl from-green-100/30 to-transparent blur-3xl" />
      </div>

      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-8 md:px-12 lg:px-16">
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#0071e3]/10 px-4 py-1.5 text-sm font-medium text-[#0071e3]">
            <Sparkles className="h-4 w-4" />
            2022-yildan beri sifatli ta'lim
          </div>

          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-[#1d1d1f] sm:text-6xl md:text-7xl">
            Bilim, innovatsiya
            <br />
            va <span className="text-gradient-blue">vatanga muhabbat</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg font-normal leading-relaxed text-[#6e6e73] sm:text-xl">
            {schoolInfo.name}. Iqtidorli o'quvchilar uchun chuqurlashtirilgan ta'lim, zamonaviy
            laboratoriyalar va yetakchilik mahoratini rivojlantiruvchi innovatsion muhit.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button onClick={scrollToAbout} className="apple-button group">
              Maktab haqida batafsil
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => document.querySelector('#academic')?.scrollIntoView({ behavior: 'smooth' })}
              className="apple-button-secondary"
            >
              Akademik portal
            </button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 rounded-3xl bg-white/60 p-8 backdrop-blur-sm sm:gap-8 sm:p-12 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} visible={statsVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
