import Link from 'next/link';
import { getAllArticles, getAllCategories } from '@/lib/db';
import { Article } from '@/types/database';
import DynamicAdSlot from '@/components/ads/DynamicAdSlot';
import MobileNewsFeed from '@/components/home/MobileNewsFeed';
import { FINANCIAL_TOOLS } from '@/lib/tools/toolsData';
import AnimatedCard from '@/components/ui/AnimatedCard';
import FloatingBadge from '@/components/ui/FloatingBadge';
import { MotionCard } from '@/components/ui/MotionButtons';
import {
  Newspaper,
  Calendar,
  ArrowRight,
  Calculator,
  Sparkles,
  TrendingUp,
  Clock,
  Flame,
  Search,
} from 'lucide-react';

export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; search?: string }>;
}) {
  const { q, search } = await searchParams;

  const [articles, categories] = await Promise.all([
    Promise.resolve(getAllArticles('published', q)),
    Promise.resolve(getAllCategories()),
  ]);

  const heroArticle = articles[0];
  const sideTrending = articles.slice(1, 3);
  const quickBriefs = articles.slice(3, 6);
  const mostRead = articles.slice(0, 6);

  const getArticleHref = (art: Article) =>
    `/${art.categories?.slug || 'global-markets'}/${art.slug}`;

  // Build Category Asymmetric Blocks with Smart Side-Fill
  const categoryBlocks = categories
    .map((cat) => {
      const catArticles = articles.filter(
        (a) => a.categories?.slug === cat.slug || a.category_id === cat.id
      );
      const otherArticles = articles.filter(
        (a) => a.categories?.slug !== cat.slug && a.category_id !== cat.id
      );

      const lead = catArticles[0] || otherArticles[0];
      let side: Article[] = [];
      if (catArticles.length >= 3) {
        side = catArticles.slice(1, 3);
      } else if (catArticles.length === 2) {
        side = [catArticles[1], otherArticles[0]].filter(Boolean);
      } else if (catArticles.length === 1) {
        side = otherArticles.slice(0, 2);
      } else {
        side = otherArticles.slice(1, 3);
      }

      return {
        category: cat,
        lead,
        side,
        totalCount: catArticles.length,
      };
    })
    .filter((b) => b.lead);

  return (
    <>
      {/* 1. MOBILE VIEW (< 768px): Distinctive Institutional Mobile UI */}
      <MobileNewsFeed
        articles={articles}
        categories={categories}
        q={q}
        searchFocus={search === '1'}
      />

      {/* 2. DESKTOP & TABLET VIEW (≥ 768px): Full Bento Hero + Sticky Sidebar */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-8 space-y-5 sm:space-y-6 overflow-x-hidden">
        {/* Desktop/Tablet Quick Category Pills */}
        <div className="hidden lg:flex items-center gap-2 overflow-x-auto pb-1">
        <Link
          href="/"
          className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#0B1C2D] text-white text-xs font-bold"
        >
          All News
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${cat.slug}`}
            className="shrink-0 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:border-blue-400 transition"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* AD SLOT 1: TOP LEADERBOARD */}
      <DynamicAdSlot slotKey="home_top_banner" />

      {/* Active Search Indicator */}
      {q && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm">
          <span>
            Showing search results for: <strong className="text-blue-900">&quot;{q}&quot;</strong>
          </span>
          <Link href="/" className="font-bold text-blue-600 hover:underline">
            Clear Search ×
          </Link>
        </div>
      )}

      {articles.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            {q ? `No stories found for "${q}"` : 'Welcome to The Stock Times'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Publish your first financial market report from the Admin CMS to populate this feed.
          </p>
          <Link
            href="/admin/login"
            className="inline-block mt-2 px-5 py-2.5 rounded-xl bg-[#0B1C2D] text-white text-xs font-bold"
          >
            Open Editorial CMS
          </Link>
        </div>
      ) : (
        <>
          {/* SECTION 1: TODAY TRENDING (Clean Editorial Asymmetric Split Layout) */}
          <AnimatedCard>
            <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-600 text-white">
                    <Newspaper className="w-4 h-4" />
                  </span>
                  <h1 className="text-base sm:text-xl font-extrabold text-slate-950 tracking-tight">
                    Today Trending 🔥
                  </h1>
                </div>
                <FloatingBadge>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3" /> Live Desk
                  </span>
                </FloatingBadge>
              </div>

              <div className="grid lg:grid-cols-12 gap-5 items-start">
                {/* LEFT 8 COLUMNS: Big 16:9 Image + Bold Headline Below */}
                {heroArticle && (
                  <Link
                    href={getArticleHref(heroArticle)}
                    className={`${
                      sideTrending.length > 0
                        ? 'lg:col-span-8 group block space-y-3 lg:pr-5 lg:border-r lg:border-slate-200'
                        : 'lg:col-span-12 group block space-y-3'
                    }`}
                  >
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100">
                      {heroArticle.featured_image ? (
                        <img
                          src={heroArticle.featured_image}
                          alt={heroArticle.image_alt || heroArticle.title}
                          className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-400">
                          THE STOCK TIMES
                        </div>
                      )}

                      {/* Top-Left Brand / Category Tag */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B1C2D]/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wider">
                        {heroArticle.categories?.name || 'MARKETS'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-950 group-hover:text-blue-700 transition leading-snug line-clamp-2">
                        {heroArticle.title}
                      </h2>
                      {heroArticle.seo_description && (
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {heroArticle.seo_description}
                        </p>
                      )}
                    </div>
                  </Link>
                )}

                {/* RIGHT 4 COLUMNS: 2 Stacked Cards (Top Thumbnail + 3-Line Headline Below) */}
                {sideTrending.length > 0 && (
                  <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
                    {sideTrending.slice(0, 2).map((item) => (
                      <Link
                        key={item.id}
                        href={getArticleHref(item)}
                        className="group block space-y-2 pb-3 lg:last:pb-0 lg:border-b lg:last:border-b-0 border-slate-100"
                      >
                        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-100">
                          {item.featured_image ? (
                            <img
                              src={item.featured_image}
                              alt={item.image_alt || item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-400">
                              NEWS
                            </div>
                          )}
                        </div>

                        <h3 className="text-xs sm:text-[14px] font-semibold text-slate-900 group-hover:text-blue-700 transition leading-snug line-clamp-3">
                          {item.title}
                        </h3>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </AnimatedCard>

          {/* AD SLOT 2: BELOW HERO */}
          <DynamicAdSlot slotKey="home_mid_banner" />

          {/* SECTION 2: 60-SECOND MARKET SNAPSHOTS (Swipeable Carousel on Mobile) */}
          {quickBriefs.length > 0 && (
            <AnimatedCard delay={0.1}>
              <section className="bg-[#0B1C2D] text-white rounded-2xl p-4 sm:p-7 space-y-4 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <h2 className="text-xs sm:text-base font-extrabold uppercase tracking-wider">
                      60-Second Market Snapshots
                    </h2>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold md:hidden">
                    Swipe →
                  </span>
                </div>

                <div className="flex md:grid md:grid-cols-3 gap-3.5 overflow-x-auto snap-x pb-1">
                  {quickBriefs.map((brief) => (
                    <Link
                      key={brief.id}
                      href={getArticleHref(brief)}
                      className="min-w-[255px] md:min-w-0 snap-start bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 space-y-2 transition flex flex-col justify-between hover:scale-[1.02]"
                    >
                      <div className="space-y-1.5">
                        <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                          {brief.categories?.name || 'SNAPSHOT'}
                        </span>
                        <h3 className="text-sm font-bold leading-snug text-white line-clamp-2">
                          {brief.title}
                        </h3>
                        {brief.seo_description && (
                          <p className="text-xs text-slate-300 line-clamp-2">
                            {brief.seo_description}
                          </p>
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 pt-1 inline-flex items-center gap-1">
                        Quick Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </AnimatedCard>
          )}

          {/* SECTION 3: FINANCIAL TOOLS & CALCULATORS (2-Col Mobile | 6-Col Desktop) */}
          <AnimatedCard delay={0.15}>
            <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <Calculator className="w-4 h-4" />
                  </span>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                      Finance Tools & Wealth Calculators
                    </h2>
                    <p className="hidden sm:block text-[11px] text-slate-500">
                      Plan SIP investments, stock averaging, loan EMIs & retirement goals
                    </p>
                  </div>
                </div>
                <Link href="/tools" className="text-xs font-bold text-blue-600 hover:underline">
                  View All Finance Tools →
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
                {FINANCIAL_TOOLS.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="p-3 sm:p-3.5 rounded-xl bg-slate-50 hover:bg-[#0B1C2D] hover:text-white border border-slate-200/80 transition group flex flex-col justify-between hover:scale-[1.03]"
                  >
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-blue-600 group-hover:text-emerald-400">
                      {tool.category}
                    </span>
                    <span className="text-xs font-extrabold mt-1 leading-snug">
                      {tool.shortTitle}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </AnimatedCard>

          {/* AD SLOT 3: BELOW CALCULATORS STRIP */}
          <DynamicAdSlot slotKey="home_tools_below" />

          {/* SECTION 4: CATEGORY ASYMMETRIC BLOCKS (8-Col Lead + Vertical Divider + 4-Col 2 Stacked) */}
          <div className="space-y-6">
            {categoryBlocks.map((block, bIdx) => (
              <AnimatedCard key={block.category.id} delay={0.08 * (bIdx + 1)}>
                <div className="space-y-5">
                  <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5">
                    {/* Category Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-[#0B1C2D] text-white">
                          <Newspaper className="w-4 h-4" />
                        </span>
                        <h2 className="text-base sm:text-xl font-extrabold text-slate-950 tracking-tight">
                          {block.category.name}
                        </h2>
                      </div>
                      <Link
                        href={`/${block.category.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition"
                      >
                        Explore {block.category.name} →
                      </Link>
                    </div>

                    {/* 8:4 Asymmetric Grid (Identical to Today Trending) */}
                    <div className="grid lg:grid-cols-12 gap-5 items-start">
                      {/* Left 8 Cols: Lead Story */}
                      <Link
                        href={getArticleHref(block.lead)}
                        className="lg:col-span-8 group block space-y-3 lg:pr-5 lg:border-r lg:border-slate-200"
                      >
                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100">
                          {block.lead.featured_image ? (
                            <img
                              src={block.lead.featured_image}
                              alt={block.lead.image_alt || block.lead.title}
                              className="w-full h-full object-cover group-hover:scale-103 transition duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-400">
                              THE STOCK TIMES
                            </div>
                          )}
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0B1C2D]/90 backdrop-blur-xs text-white text-[10px] font-extrabold uppercase tracking-wider">
                            {block.lead.categories?.name || block.category.name}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h3 className="text-xl sm:text-2xl lg:text-[24px] font-bold text-slate-950 group-hover:text-blue-700 transition leading-snug line-clamp-2">
                            {block.lead.title}
                          </h3>
                          {block.lead.seo_description && (
                            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                              {block.lead.seo_description}
                            </p>
                          )}
                        </div>
                      </Link>

                      {/* Right 4 Cols: 2 Stacked Cards */}
                      <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
                        {block.side.map((item) => (
                          <Link
                            key={item.id}
                            href={getArticleHref(item)}
                            className="group block space-y-2 pb-3 lg:last:pb-0 lg:border-b lg:last:border-b-0 border-slate-100"
                          >
                            <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-100">
                              {item.featured_image ? (
                                <img
                                  src={item.featured_image}
                                  alt={item.image_alt || item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-400">
                                  NEWS
                                </div>
                              )}
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 block truncate">
                                {item.categories?.name || 'MARKETS'}
                              </span>
                              <h4 className="text-xs sm:text-[14px] font-semibold text-slate-900 group-hover:text-blue-700 transition leading-snug line-clamp-3">
                                {item.title}
                              </h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* AD SLOT 4: AFTER 2nd CATEGORY BLOCK */}
                  {bIdx === 1 && (
                    <div>
                      <DynamicAdSlot slotKey="home_feed_mid" />
                    </div>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* SECTION 5: MARKET PULSE & MOST READ (with Sticky Sidebar Ad Slot 5) */}
          <AnimatedCard delay={0.2}>
            <section className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                    <h2 className="text-base sm:text-xl font-extrabold text-slate-900">
                      Market Pulse &amp; Most Read Stories
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">
                    Real-Time Reader Interest
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {mostRead.map((item, idx) => (
                    <Link
                      key={item.id}
                      href={getArticleHref(item)}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-200"
                    >
                      <span className="text-2xl font-serif font-black text-slate-300 group-hover:text-blue-600 transition leading-none">
                        0{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase text-blue-600 block">
                          {item.categories?.name}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-700 line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-4">
                <DynamicAdSlot slotKey="home_sidebar_sticky" />
              </aside>
            </section>
          </AnimatedCard>
        </>
      )}
      </div>
    </>
  );
}
