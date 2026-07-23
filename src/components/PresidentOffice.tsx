import { useState, useEffect } from 'react';
import {
  GraduationCap, Trophy, Leaf, Palette, Rocket, MessageCircle, Wallet,
  Send, CheckCircle, Loader2, Crown, Lightbulb, ArrowUpRight,
} from 'lucide-react';
import { ministries, schoolPresident } from '@/lib/data';
import { supabase, type StudentProposal } from '@/lib/supabase';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Trophy,
  Leaf,
  Palette,
  Rocket,
  MessageCircle,
  Wallet,
};

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-[#0071e3]/10', text: 'text-[#0071e3]', border: 'border-[#0071e3]/20' },
  green: { bg: 'bg-[#34c759]/10', text: 'text-[#34c759]', border: 'border-[#34c759]/20' },
  orange: { bg: 'bg-[#ff9500]/10', text: 'text-[#ff9500]', border: 'border-[#ff9500]/20' },
  red: { bg: 'bg-[#ff3b30]/10', text: 'text-[#ff3b30]', border: 'border-[#ff3b30]/20' },
};

export default function PresidentOffice() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [selectedMinistry, setSelectedMinistry] = useState<string>("Ta'lim Vazirligi");
  const [proposals, setProposals] = useState<StudentProposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: '',
    class: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('student_proposals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(12);

    if (error) {
      setError('Takliflarni yuklashda xatolik yuz berdi');
    } else if (data) {
      setProposals(data as StudentProposal[]);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.from('student_proposals').insert({
      ministry: selectedMinistry,
      full_name: form.full_name,
      class: form.class,
      title: form.title,
      description: form.description,
    });

    if (error) {
      setError("Taklifni yuborishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } else {
      setSubmitted(true);
      setForm({ full_name: '', class: '', title: '', description: '' });
      await loadProposals();
      setTimeout(() => setSubmitted(false), 5000);
    }
    setSubmitting(false);
  };

  return (
    <section id="president" className="apple-section bg-white/50">
      <div className="apple-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#1d1d1f]/5 px-4 py-1.5 text-sm font-medium text-[#1d1d1f]">
            <Crown className="h-4 w-4 text-[#ff9500]" />
            Prezident Devoni
          </div>
          <h2 className="apple-heading">O'zini-o'zi boshqarish tizimi</h2>
          <p className="apple-subheading mt-4">
            Maktab Prezidenti va 7 ta vazirlik — o'quvchilar maktab hayonini birga boshqaradi
          </p>
        </div>

        {/* President Card */}
        <div
          className={`mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1d1d1f] to-[#2c2c2e] p-8 transition-all duration-700 ease-out sm:p-10 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="relative flex-shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#ff9500] to-[#ff6b00] shadow-lg sm:h-24 sm:w-24">
                <Crown className="h-10 w-10 text-white sm:h-12 sm:w-12" strokeWidth={2} />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#0071e3] ring-4 ring-[#1d1d1f]">
                <span className="text-xs font-bold text-white">P</span>
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-sm font-medium uppercase tracking-wider text-[#ff9500]">Maktab Prezidenti</p>
              <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">{schoolPresident.name}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
                {schoolPresident.description}
              </p>
            </div>

            <a
              href={`https://t.me/${schoolPresident.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-shrink-0 items-center gap-2.5 rounded-full bg-white/10 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:scale-105"
            >
              <Send className="h-4 w-4 text-[#42a5f5]" />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-xs text-white/50">Telegram</span>
                <span className="text-sm">@{schoolPresident.telegram}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Ministries Grid */}
        <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry, index) => {
            const Icon = iconMap[ministry.icon] ?? GraduationCap;
            const colors = colorMap[ministry.color] ?? colorMap.blue;
            return (
              <div
                key={index}
                className={`apple-card group border ${colors.border} transition-all duration-700 ease-out ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 ${colors.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${colors.text}`} strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-semibold text-[#1d1d1f]">{ministry.name}</h3>
                </div>

                <div className="mb-3 rounded-xl bg-[#f5f5f7] px-3 py-2.5">
                  <p className="text-xs text-[#6e6e73]">Vazir</p>
                  <p className="text-sm font-medium text-[#1d1d1f]">{ministry.minister}</p>
                </div>

                <p className="mb-4 text-sm font-normal leading-relaxed text-[#6e6e73]">
                  {ministry.description}
                </p>

                <div className="space-y-1.5 border-t border-black/5 pt-3">
                  {ministry.initiatives.map((init, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#6e6e73]">
                      <Lightbulb className={`h-3.5 w-3.5 ${colors.text}`} />
                      {init}
                    </div>
                  ))}
                </div>

                <a
                  href={`https://t.me/${ministry.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-between gap-2 rounded-xl bg-[#0088cc]/10 px-4 py-3 transition-all hover:bg-[#0088cc]/20"
                >
                  <div className="flex items-center gap-2.5">
                    <Send className="h-4 w-4 text-[#0088cc]" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-xs text-[#6e6e73]">Telegram orqali bog'lanish</span>
                      <span className="text-sm font-medium text-[#0088cc]">@{ministry.telegram}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#0088cc]/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Proposal Form */}
        <div className="mt-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl">
              Taklifingizni yuboring
            </h3>
            <p className="mt-3 text-base text-[#6e6e73]">
              Vazirliklardan biriga o'z g'oyangizni yuboring — maktabni birga yaxshilaymiz
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              {submitted ? (
                <div className="flex h-full flex-col items-center justify-center text-center animate-scale-in">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#34c759]/10">
                    <CheckCircle className="h-8 w-8 text-[#34c759]" />
                  </div>
                  <h4 className="text-xl font-semibold text-[#1d1d1f]">Taklifingiz qabul qilindi!</h4>
                  <p className="mt-2 text-sm text-[#6e6e73]">
                    Vazirlik ko'rib chiqadi va tez orada javob beradi. Rahmat!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">Vazirlik</label>
                    <select
                      value={selectedMinistry}
                      onChange={(e) => setSelectedMinistry(e.target.value)}
                      className="w-full rounded-xl border border-black/10 bg-[#f5f5f7] px-4 py-3 text-sm text-[#1d1d1f] outline-none transition-colors focus:border-[#0071e3] focus:bg-white"
                    >
                      {ministries.map((m) => (
                        <option key={m.name} value={m.name}>{m.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">F.I.O</label>
                      <input
                        type="text"
                        required
                        value={form.full_name}
                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                        placeholder="Familiya Ism Sharif"
                        className="w-full rounded-xl border border-black/10 bg-[#f5f5f7] px-4 py-3 text-sm text-[#1d1d1f] outline-none transition-colors placeholder:text-[#aeaeb2] focus:border-[#0071e3] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">Sinf</label>
                      <input
                        type="text"
                        required
                        value={form.class}
                        onChange={(e) => setForm({ ...form, class: e.target.value })}
                        placeholder="Masalan: 10-A"
                        className="w-full rounded-xl border border-black/10 bg-[#f5f5f7] px-4 py-3 text-sm text-[#1d1d1f] outline-none transition-colors placeholder:text-[#aeaeb2] focus:border-[#0071e3] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">Taklif sarlavhasi</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Qisqacha sarlavha"
                      className="w-full rounded-xl border border-black/10 bg-[#f5f5f7] px-4 py-3 text-sm text-[#1d1d1f] outline-none transition-colors placeholder:text-[#aeaeb2] focus:border-[#0071e3] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#1d1d1f]">Batafsil tavsif</label>
                    <textarea
                      required
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Taklifingizni batafsil yoriting..."
                      className="w-full resize-none rounded-xl border border-black/10 bg-[#f5f5f7] px-4 py-3 text-sm text-[#1d1d1f] outline-none transition-colors placeholder:text-[#aeaeb2] focus:border-[#0071e3] focus:bg-white"
                    />
                  </div>

                  {error && (
                    <p className="rounded-xl bg-[#ff3b30]/10 px-4 py-3 text-sm text-[#ff3b30]">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="apple-button w-full disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Yuborilmoqda...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Taklifni yuborish
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="rounded-3xl bg-[#f5f5f7] p-8">
              <h4 className="mb-5 text-lg font-semibold text-[#1d1d1f]">So'nggi takliflar</h4>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-[#0071e3]" />
                </div>
              ) : proposals.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Lightbulb className="mb-3 h-10 w-10 text-[#aeaeb2]" />
                  <p className="text-sm text-[#6e6e73]">Hozircha takliflar yo'q. Birinchi bo'ling!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
                  {proposals.map((p) => (
                    <div key={p.id} className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="rounded-full bg-[#0071e3]/10 px-2.5 py-1 text-xs font-medium text-[#0071e3]">
                          {p.ministry}
                        </span>
                        <span className="text-xs text-[#aeaeb2]">
                          {new Date(p.created_at).toLocaleDateString('uz-UZ')}
                        </span>
                      </div>
                      <h5 className="text-sm font-semibold text-[#1d1d1f]">{p.title}</h5>
                      <p className="mt-1 line-clamp-2 text-xs text-[#6e6e73]">{p.description}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-[#6e6e73]">
                        <span className="font-medium">{p.full_name}</span>
                        <span>•</span>
                        <span>{p.class}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
