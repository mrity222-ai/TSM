'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface WatchlistIdeaCard {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export default function WatchlistIdeasCarousel({
  items,
}: {
  items: WatchlistIdeaCard[];
}) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleSlide = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section
      aria-label="Trending Watchlist Ideas"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-6 space-y-3.5"
    >
      {/* Header Row: "Trending Watchlist Ideas >" + "< >" Arrows */}
      <div className="flex items-center justify-between">
        <Link
          href="/global-markets"
          className="inline-flex items-center gap-1 text-lg sm:text-xl font-extrabold text-slate-950 hover:text-blue-700 transition tracking-tight"
        >
          <span>Trending Watchlist Ideas</span>
          <ChevronRight className="w-5 h-5 text-slate-700 mt-0.5" />
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleSlide('left')}
            aria-label="Previous Watchlist Ideas"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-950 flex items-center justify-center transition shadow-2xs active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleSlide('right')}
            aria-label="Next Watchlist Ideas"
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-950 flex items-center justify-center transition shadow-2xs active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal 3-Card Carousel */}
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-1"
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group min-w-[270px] sm:min-w-[320px] md:min-w-[calc((100%-2.5rem)/3)] max-w-[calc((100%-2.5rem)/3)] snap-start shrink-0 space-y-2.5"
          >
            {/* 16:9 Image with Bottom Dark Gradient + White Title Inside */}
            <div className="relative aspect-[16/9] w-full rounded-md overflow-hidden bg-slate-900">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <h3 className="absolute bottom-3 left-3.5 right-3.5 text-base sm:text-lg font-extrabold text-white leading-snug line-clamp-2 drop-shadow-xs">
                {item.title}
              </h3>
            </div>

            {/* 3-Line Editorial Summary Below Image */}
            <p className="text-xs sm:text-[13px] text-slate-600 group-hover:text-slate-900 leading-relaxed line-clamp-3 transition">
              {item.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Bottom-Right Action Link */}
      <div className="flex justify-end pt-0.5">
        <Link
          href="/global-markets"
          className="text-xs sm:text-[13px] font-bold text-blue-700 hover:text-blue-900 hover:underline transition"
        >
          Show all trending watchlist ideas
        </Link>
      </div>
    </section>
  );
}
