import { getAdSlot } from '@/lib/db';
import { AdSlot } from '@/types/database';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

const SIZE_CLASSES: Record<string, string> = {
  responsive: 'w-full',
  '728x90': 'max-w-[728px] mx-auto',
  '300x250': 'max-w-[300px] mx-auto',
  '320x100': 'max-w-[320px] mx-auto',
  '970x250': 'max-w-[970px] mx-auto',
};

export default async function DynamicAdSlot({ slotKey }: { slotKey: string }) {
  const slot = (await getAdSlot(slotKey)) as AdSlot | null;

  if (!slot || !slot.is_active) return null;

  const isSidebarSlot =
    slot.ad_size === '300x250' ||
    slotKey.includes('sidebar') ||
    slotKey.includes('sticky');

  // 1. Render Google AdSense / Third-Party Script
  if (slot.ad_type === 'adsense' && slot.code_or_title) {
    const wrapperClass = SIZE_CLASSES[slot.ad_size || 'responsive'] || 'w-full';
    return (
      <div className={`my-3 sm:my-4 overflow-hidden ${wrapperClass}`}>
        <span className="block text-[9px] uppercase tracking-widest text-slate-400 text-center mb-1">
          Advertisement
        </span>
        <div
          className="w-full overflow-hidden flex justify-center"
          dangerouslySetInnerHTML={{ __html: slot.code_or_title }}
        />
      </div>
    );
  }

  // 2. Render In-House Banner - Dedicated Vertical Layout for Sidebars
  if (isSidebarSlot) {
    return (
      <div className="w-full my-3">
        <div className="bg-gradient-to-br from-[#0B1C2D] via-[#11253E] to-[#132C46] text-white rounded-2xl p-5 border border-slate-700/80 shadow-md flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Partner Offer
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Sponsored
              </span>
            </div>

            {slot.image_url && (
              <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                <img
                  src={slot.image_url}
                  alt={slot.code_or_title || 'Sponsored Partner'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <h4 className="text-sm sm:text-base font-extrabold leading-snug text-white">
                {slot.code_or_title}
              </h4>
              {slot.description && (
                <p className="text-xs text-slate-300 leading-relaxed">
                  {slot.description}
                </p>
              )}
            </div>

            {Array.isArray(slot.bullet_points) && slot.bullet_points.length > 0 && (
              <ul className="space-y-2 pt-1 border-t border-white/10">
                {slot.bullet_points.map((bp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-emerald-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{bp}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {slot.target_url && (
            <a
              href={slot.target_url}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition shadow-sm mt-1"
            >
              <span>{slot.cta_text || 'Explore Now'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    );
  }

  // 3. Render In-House Banner - Full-Width Horizontal Responsive Layout
  return (
    <div className="w-full my-3 sm:my-4">
      <div className="bg-gradient-to-r from-[#0B1C2D] via-[#11253E] to-[#132C46] text-white rounded-2xl p-4 sm:p-5 border border-slate-700/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          {slot.image_url && (
            <img
              src={slot.image_url}
              alt={slot.code_or_title || 'Sponsored Partner'}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/15 shrink-0"
              loading="lazy"
              decoding="async"
            />
          )}

          <div className="space-y-1.5">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Partner Offer
            </span>
            <h4 className="text-base sm:text-lg font-extrabold leading-snug text-white">
              {slot.code_or_title}
            </h4>
            {slot.description && (
              <p className="text-xs text-slate-300">{slot.description}</p>
            )}

            {Array.isArray(slot.bullet_points) && slot.bullet_points.length > 0 && (
              <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                {slot.bullet_points.map((bp, i) => (
                  <li key={i} className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {slot.target_url && (
          <a
            href={slot.target_url}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition shadow-sm"
          >
            <span>{slot.cta_text || 'Explore Now'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
