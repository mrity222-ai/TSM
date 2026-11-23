import Link from 'next/link';
import { getDb } from '@/lib/db';

interface SponsoredCardItem {
  id: string;
  title: string;
  description: string;
  brand: string;
  imageUrl: string;
  targetUrl: string;
  ctaText: string;
}

export default function NativeSponsoredGrid() {
  let cards: SponsoredCardItem[] = [];

  try {
    const db = getDb();
    // Prioritize native_partner_ slots, then any active inhouse/affiliate banner with an image
    const activeBanners = db
      .prepare(
        `SELECT id, code_or_title, description, slot_label, image_url, target_url, cta_text
         FROM ad_slots
         WHERE is_active = 1
           AND (slot_key LIKE 'native_partner_%' OR ad_type IN ('inhouse_banner', 'affiliate_card'))
           AND image_url IS NOT NULL AND image_url != ''
         ORDER BY 
           CASE WHEN slot_key LIKE 'native_partner_%' THEN 0 ELSE 1 END,
           slot_key ASC,
           updated_at DESC
         LIMIT 3`
      )
      .all() as any[];

    if (activeBanners && activeBanners.length > 0) {
      cards = activeBanners.map((b) => ({
        id: String(b.id),
        title: b.code_or_title || 'Featured Market Offer',
        description:
          b.description ||
          'Explore curated financial tools, research terminals & investment accounts.',
        brand: b.slot_label?.split(':')[0]?.trim() || 'Partner Offer',
        imageUrl: b.image_url,
        targetUrl: b.target_url || '/tools',
        ctaText: b.cta_text || 'Learn More',
      }));
    }
  } catch (err) {
    console.error('Error fetching native sponsored cards from database:', err);
    cards = [];
  }

  // If no active cards exist in database, do not render empty section
  if (cards.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Recommended & Sponsored Stories"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8 space-y-4"
    >
      {/* Top Divider & Label (Matches Taboola / Outbrain clean institutional design) */}
      <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
          RECOMMENDED FOR INVESTORS
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          SPONSORED &amp; PARTNER PICKS
        </span>
      </div>

      {/* 3-Column Native Ad Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => {
          const isExternal = card.targetUrl.startsWith('http');

          const CardInner = (
            <div className="group h-full flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-3 hover:shadow-md hover:border-slate-300 transition">
              <div className="space-y-2.5">
                {/* Rounded 16:9 Image */}
                <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Bold Title + 2-Line Description */}
                <div className="space-y-1 px-0.5">
                  <h3 className="text-[15px] font-bold text-slate-950 group-hover:text-blue-700 transition leading-snug line-clamp-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Bottom Brand | Sponsored + Pill CTA Button */}
              <div className="pt-3 mt-2 px-0.5 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400 font-medium truncate">
                  {card.brand} <span className="mx-1">|</span> Sponsored
                </span>

                <span className="shrink-0 px-4 py-1.5 rounded-full border border-slate-300 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white text-slate-900 text-xs font-bold transition">
                  {card.ctaText}
                </span>
              </div>
            </div>
          );

          return isExternal ? (
            <a
              key={card.id}
              href={card.targetUrl}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="block h-full"
            >
              {CardInner}
            </a>
          ) : (
            <Link key={card.id} href={card.targetUrl} className="block h-full">
              {CardInner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
