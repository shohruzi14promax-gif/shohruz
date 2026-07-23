import { Rocket, Leaf, TrendingUp, Award } from 'lucide-react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

// Yangilangan loyihalar va tashabbuslar ro'yxati
const projects = [
  {
    title: "Schoolcoin",
    category: "Valyuta tizimi",
    year: "2026",
    description: "O'quvchilar uchun ichki valyuta va rag'batlantirish tizimi.",
    impact: "Faollik va rag'bat",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Kinetik velik",
    category: "Innovatsiya",
    year: "2026",
    description: "Harakatni elektr energiyasiga aylantiruvchi velosiped qurilmasi.",
    impact: "Muqobil energiya",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Sport maydonchasi",
    category: "Infratuzilma",
    year: "2026",
    description: "Grant yutib olingan yangi maktab vorkaut va sport zonasi.",
    impact: "Sog'lom turmush tarzi",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "EcoGuard",
    category: "Ekologiya",
    year: "2026",
    description: "Ekologik tozalik va plogging aksiyalari ('Yashil Jizzax' va Tuzkan ko'lidagi tadbirlar).",
    impact: "Toza atrof-muhit",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "StemX",
    category: "Ilmiy jamoa",
    year: "2026",
    description: "Ilmiy munozara va taqdimotlar uchun tuzilgan raqobatbardosh jamoa.",
    impact: "Intellektual rivojlanish",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Veb-sayt",
    category: "Raqamli portal",
    year: "2026",
    description: "Maktab uchun mo'ljallangan zamonaviy, login talab qilmaydigan axborot portali.",
    impact: "Ochiq axborot makoni",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "PitchLab",
    category: "Startap",
    year: "2026",
    description: "O'quvchilarning startap loyihalari va taqdimotlarini rivojlantirish yo'nalishi.",
    impact: "Biznes g'oyalar",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Avenor",
    category: "Tashabbus",
    year: "2026",
    description: "Ekologik loyiha va atrof-muhitni asrashga qaratilgan tashabbuslar.",
    impact: "Barqaror kelajak",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop"
  }
];

const socialActions = [
  { value: 200, suffix: "+", label: "Aksiya qatnashchilari" },
  { value: 15, suffix: " ta", label: "Maxsus loyihalar" },
  { value: 100, suffix: "%", label: "Ochiq portal" },
  { value: 1, suffix: "-o'rin", label: "Grant yutuqlari" }
];

function SocialStat({ stat, index, visible }: { stat: (typeof socialActions)[number]; index: number; visible: boolean }) {
  const count = useCountUp(stat.value, 2000, visible);
  return (
    <div
      className={`text-center transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {count.toLocaleString()}
        <span className="text-[#42a5f5]">{stat.suffix}</span>
      </div>
      <div className="mt-1 text-sm text-white/70">{stat.label}</div>
    </div>
  );
}

export default function Innovation() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="innovation" className="apple-section">
      <div className="apple-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="apple-eyebrow mb-4">Innovatsiya va Loyihalar</p>
          <h2 className="apple-heading">O'quvchilar loyihalari va ijtimoiy aksiyalar</h2>
          <p className="apple-subheading mt-4">
            Kinetik velosiped generatoridan axborot portaligacha — tashabbuskorlik natijalari
          </p>
        </div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-700 ease-out hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#1d1d1f] backdrop-blur-sm">
                  <Rocket className="h-3.5 w-3.5 text-[#0071e3]" />
                  {project.category}
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-[#0071e3]/90 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                  {project.year}
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-[#1d1d1f]">{project.title}</h3>
                <p className="text-sm font-normal leading-relaxed text-[#6e6e73]">{project.description}</p>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#34c759]/10 px-4 py-2.5">
                  <TrendingUp className="h-4 w-4 flex-shrink-0 text-[#34c759]" />
                  <span className="text-sm font-medium text-[#1d1d1f]">{project.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={statsRef}
          className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d1d1f] to-[#2c2c2e] p-8 sm:p-12"
        >
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              <Leaf className="h-4 w-4 text-[#34c759]" />
              Ijtimoiy aksiyalar statistikasi
            </div>
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">Jamiyatga hissamiz</h3>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {socialActions.map((stat, index) => (
              <SocialStat key={index} stat={stat} index={index} visible={statsVisible} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-center">
            <Award className="h-5 w-5 text-[#ff9500]" />
            <p className="text-sm text-white/60">
              "Yilning eng faol maktabi" — Jizzax viloyati, 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}