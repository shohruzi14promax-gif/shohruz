import { GraduationCap, Send, Youtube, Instagram, Facebook } from 'lucide-react';
import { schoolInfo, navLinks } from '@/lib/data';

export default function Footer() {
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1d1d1f] px-5 py-16 sm:px-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0071e3]">
                <GraduationCap className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-base font-bold text-white">1-IMI Jizzax</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              {schoolInfo.name}. 2022-yildan beri sifatli ta'lim berib kelyapmiz.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={schoolInfo.social.telegram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20">
                <Send className="h-4 w-4 text-white" />
              </a>
              <a href={schoolInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20">
                <Youtube className="h-4 w-4 text-white" />
              </a>
              <a href={schoolInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20">
                <Instagram className="h-4 w-4 text-white" />
              </a>
              <a href={schoolInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors hover:bg-white/20">
                <Facebook className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Bo'limlar</h4>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm text-white/60 transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/80">Aloqa</h4>
            <div className="mt-4 space-y-2 text-sm text-white/60">
              <p>{schoolInfo.address}</p>
              <p>{schoolInfo.phone}</p>
              <p>{schoolInfo.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {schoolInfo.name}. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </footer>
  );
}
