import { useState } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';
import { galleryItems } from '@/lib/data';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Gallery() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="apple-section">
      <div className="apple-container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="apple-eyebrow mb-4">Media Galereya</p>
          <h2 className="apple-heading">Foto va video arxiv</h2>
          <p className="apple-subheading mt-4">
            Maktab hayotidan lahzalar — o'quv jarayoni, loyihalar va tadbirlar
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setLightbox(index)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-700 ease-out hover:shadow-xl ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <p className="p-4 text-sm font-medium text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[#6e6e73]">
          <ImageIcon className="h-4 w-4" />
          <span>{galleryItems.length} ta media — galereya doim yangilanib boradi</span>
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="max-h-full max-w-3xl overflow-hidden rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightbox].url}
              alt={galleryItems[lightbox].title}
              className="max-h-[80vh] w-full object-contain"
            />
            <p className="mt-4 text-center text-lg font-medium text-white">{galleryItems[lightbox].title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
