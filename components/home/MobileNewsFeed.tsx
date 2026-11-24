import Link from 'next/link';
import DynamicAdSlot from '@/components/ads/DynamicAdSlot';
import { FINANCIAL_TOOLS } from '@/lib/tools/toolsData';
import { Star, Calculator, Search, ArrowRight, TrendingUp, Flame } from 'lucide-react';

interface MobileNewsFeedProps {
  articles: any[];
  categories: { id: string; name: string; slug: string }[];
  q?: string;
  searchFocus?: boolean;
}

const PILL_COLORS = [
  'bg-rose-600 text-white',
  'bg-emerald-600 text-white',
  'bg-purple-700 text-white',
  'bg-amber-500 text-slate-950',
  'bg-indigo-600 text-white',
  'bg-cyan-700 text-white',
];

export default function MobileNewsFeed({
  articles,
  categories,
  q,
  searchFocus,
}: MobileNewsFeedProps) {
  const getHref = (art: any) =>
    `/${art.categories?.slug || art.category_slug || 'global-markets'}/${art.slug}`;

  // Dynamically derive pulse pills from active categories in the database
  const pulsePills = [
    { label: 'ALL NEWS', href: '/', style: 'bg-[#0B1C2D] text-white' },
    ...(categories || []).map((cat, idx) => ({
      label: cat.name.toUpperCase(),
      href: `/${cat.slug}`,
      style: PILL_COLORS[idx % PILL_COLORS.length],
    })),
    { label: 'WEALTH TOOLS', href: '/calculators', style: 'bg-blue-600 text-white' },
  ];

  const featuredBrief = articles[0];
  const latestCoverage = articles.length > 5 ? articles.slice(1, 6) : articles.slice(1);
  const snapshots = articles.length > 8 ? articles.slice(6, 9) : (articles.length > 2 ? articles.slice(1, 4) : articles);
  const marketIntelligence = articles.length > 6 ? articles.slice(6, 14) : articles.slice(1);

  return (
    <div className="md:hidden bg-[#F8FAFC] text-slate-900 px-3.5 pt-2.5 pb-6 space-y-4 overflow-x-hidden">
      {/* Mobile Quick Search Bar */}
      {(searchFocus || q) && (
        <form action="/" method="GET">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              name="q"
              defaultValue={q || ''}
              autoFocus={searchFocus}
              placeholder="Search stocks, IPOs, finance tools..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-slate-300 text-xs focus:outline-none focus:border-[#0B1C2D]"
            />
          </div>
        </form>
      )}

      {/* Active Search Filter Chip */}
      {q && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-3 py-1.5 text-xs">
          <span>
            Results for: <strong>&quot;{q}&quot;</strong>
          </span>
          <Link href="/" className="font-bold text-blue-600">
            Clear ×
          </Link>
        </div>
      )}

      {/* 1. LIVE MARKET PULSE PILLS */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
            LIVE MARKET PULSE
          </span>
          <Link href="/global-markets" className="text-[11px] font-bold text-blue-600">
            All Markets →
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {pulsePills.map((pill) => (
            <Link
              key={pill.label}
              href={pill.href}
              className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-extrabold tracking-wide shadow-2xs ${pill.style}`}
            >
              {pill.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ AD SLOT 1: TOP BANNER */}
      <DynamicAdSlot slotKey="home_top_banner" />

      {articles.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-2">
          <h1 className="text-lg font-serif font-bold text-slate-900">
            {q ? `No stories found for "${q}"` : 'Welcome to The Stock Times'}
          </h1>
          <p className="text-xs text-slate-500">
            Publish articles from your Admin CMS to populate this feed.
          </p>
        </div>
      ) : (
        <>
          {/* 2. GOLD-ACCENTED "FEATURED MARKET BRIEF" HERO CARD */}
          {featuredBrief && (
            <Link
              href={getHref(featuredBrief)}
              className="block rounded-2xl bg-gradient-to-b from-[#2A2416] via-[#1B1811] to-[#0F172A] p-3.5 border-2 border-amber-400/80 shadow-md space-y-2.5 text-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                  FEATURED MARKET BRIEF
                </span>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>

              {featuredBrief.featured_image && (
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-slate-900 border border-white/10">
                  <img
                    src={featuredBrief.featured_image}
                    alt={featuredBrief.image_alt || featuredBrief.title}
                    className="w-full h-full object-cover"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>
              )}

              <h1 className="text-base font-serif font-bold leading-snug text-white">
                {featuredBrief.title}
              </h1>

              <div className="flex items-center justify-between text-[10px] text-amber-200/80 pt-1 border-t border-white/10">
                <span className="font-bold uppercase">
                  {featuredBrief.categories?.name || featuredBrief.category_name || 'MARKET BRIEF'}
                </span>
                <span className="font-bold text-amber-300 inline-flex items-center gap-1">
                  Read Analysis <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          )}

          {/* 3. LATEST COVERAGE (Right-Thumbnail Clean List) */}
          {latestCoverage.length > 0 && (
            <section className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <h2 className="text-sm font-extrabold text-slate-950">Latest Coverage</h2>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                  <TrendingUp className="w-3 h-3" /> Live Desk
                </span>
              </div>

              <div className="divide-y divide-slate-200/80 bg-white border border-slate-200/90 rounded-2xl px-3.5 shadow-2xs">
                {latestCoverage.map((item) => (
                  <Link
                    key={item.id}
                    href={getHref(item)}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-600 block">
                        {item.categories?.name || item.category_name || 'MARKETS'}
                      </span>
                      <h3 className="text-[13px] font-serif font-bold text-slate-900 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <span className="text-[10px] text-slate-400 block truncate">
                        {item.author_name || 'The Stock Times'}
                      </span>
                    </div>

                    {item.featured_image && (
                      <img
                        src={item.featured_image}
                        alt={item.image_alt || item.title}
                        className="w-20 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ✅ AD SLOT 2: MID BANNER */}
          <DynamicAdSlot slotKey="home_mid_banner" />

          {/* 4. 60-SECOND SWIPEABLE SNAPSHOTS */}
          {snapshots.length > 0 && (
            <section className="bg-[#0B1C2D] text-white rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <h2 className="text-xs font-extrabold uppercase tracking-wider">
                    60-Second Market Snapshots
                  </h2>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">Swipe →</span>
              </div>

              <div className="flex gap-2.5 overflow-x-auto snap-x">
                {snapshots.map((snap) => (
                  <Link
                    key={snap.id}
                    href={getHref(snap)}
                    className="min-w-[235px] snap-start bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold uppercase text-emerald-300">
                        {snap.categories?.name || snap.category_name || 'MARKETS'}
                      </span>
                      <h3 className="text-xs font-bold leading-snug line-clamp-2">
                        {snap.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">
                      Quick Read →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 5. FINANCE TOOLS & CALCULATORS (2-Column Grid) */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-3.5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-950">
                  WEALTH MANAGEMENT TOOLS
                </h2>
              </div>
              <Link href="/calculators" className="text-[11px] font-bold text-blue-600">
                All Wealth Tools →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {FINANCIAL_TOOLS.slice(0, 6).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/calculators/${tool.slug}`}
                  className="p-3 rounded-xl bg-slate-100/80 hover:bg-[#0B1C2D] hover:text-white border border-slate-200/70 transition flex flex-col justify-between"
                >
                  <span className="text-[9px] font-extrabold uppercase text-emerald-700">
                    {tool.category}
                  </span>
                  <span className="text-xs font-extrabold leading-tight mt-0.5">
                    {tool.shortTitle}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ✅ AD SLOT 3: BELOW FINANCE TOOLS */}
          <DynamicAdSlot slotKey="home_tools_below" />

          {/* 6. BROWSE BY CATEGORY PILLS */}
          {categories.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                Explore Sections
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:border-blue-500"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* 7. MORE MARKET INTELLIGENCE */}
          {marketIntelligence.length > 0 && (
            <section className="space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <h2 className="text-sm font-extrabold text-slate-950">Market Intelligence</h2>
                <Link href="/global-markets" className="text-[11px] font-bold text-blue-600">
                  More →
                </Link>
              </div>

              <div className="divide-y divide-slate-200/80 bg-white border border-slate-200/90 rounded-2xl px-3.5 shadow-2xs">
                {marketIntelligence.map((item) => (
                  <Link
                    key={item.id}
                    href={getHref(item)}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                        {item.categories?.name || item.category_name || 'MARKETS'}
                      </span>
                      <h3 className="text-[13px] font-serif font-bold text-slate-900 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                    {item.featured_image && (
                      <img
                        src={item.featured_image}
                        alt={item.image_alt || item.title}
                        className="w-20 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ✅ AD SLOT 4: SIDEBAR / IN-FEED SLOT ON MOBILE */}
          <DynamicAdSlot slotKey="home_sidebar_sticky" />

          {/* ✅ AD SLOT 5: FOOTER BANNER */}
          <DynamicAdSlot slotKey="home_footer_banner" />
        </>
      )}
    </div>
  );
}
