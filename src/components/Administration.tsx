import { Phone, Clock, User } from 'lucide-react';
import { administration } from '@/lib/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Administration() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="administration" className="apple-section bg-white/50">
      <div className="apple-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="apple-eyebrow mb-4">Ma'muriyat</p>
          <h2 className="apple-heading">Rahbariyat va qabul kunlari</h2>
          <p className="apple-subheading mt-4">
            Maktab ma'muriyati a'zolari, ularning lavozimlari va fuqarolarni qabul qilish kunlari
          </p>
        </div>

        <div ref={ref} className="grid gap-6 sm:grid-cols-2">
          {administration.map((person, index) => (
            <div
              key={index}
              className={`apple-card flex gap-5 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0071e3]/10 to-[#42a5f5]/10 sm:h-24 sm:w-24">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="text-lg font-semibold text-[#1d1d1f]">{person.name}</h3>
                <p className="mt-0.5 text-sm font-medium text-[#0071e3]">{person.position}</p>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#6e6e73]">
                    <Clock className="h-4 w-4 flex-shrink-0 text-[#0071e3]" />
                    <span>{person.reception}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6e6e73]">
                    <Phone className="h-4 w-4 flex-shrink-0 text-[#0071e3]" />
                    <span>{person.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-[#0071e3]/5 px-6 py-4 text-center">
          <User className="h-5 w-5 flex-shrink-0 text-[#0071e3]" />
          <p className="text-sm font-medium text-[#6e6e73]">
            Qabul kunlari dam olish kunlari va rasmiy bayramlardan tashqari har kuni amalga oshiriladi
          </p>
        </div>
      </div>
    </section>
  );
}
