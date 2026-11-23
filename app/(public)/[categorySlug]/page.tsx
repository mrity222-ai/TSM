import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDb } from '@/lib/db';
import DynamicAdSlot from '@/components/ads/DynamicAdSlot';
import { FINANCIAL_TOOLS } from '@/lib/tools/toolsData';
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

const HUB_STYLES = [
  'bg-blue-50 text-blue-700 border-blue-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
  'bg-indigo-50 text-indigo-700 border-indigo-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-purple-50 text-purple-700 border-purple-200',
  'bg-rose-50 text-rose-700 border-rose-200',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const db = getDb();
  const category = db
    .prepare('SELECT id, name, slug, description FROM categories WHERE slug = ?')
    .get(categorySlug) as { id: string; name: string; slug: string; description?: string } | undefined;

  if (!category) {
    return { title: 'Category Not Found | The Stock Times' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online';
  const title = `${category.name} News, Analysis & Market Updates | The Stock Times`;
  const description =
    category.description ||
    `Latest ${category.name} news, stock market insights, expert commentary, and real-time updates on The Stock Times.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/${category.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${category.slug}`,
      type: 'website',
    },
  };
}

export default async function CategoryLandingPage({
  params,
  searchParams,
}: {
  params: Promise<{ categorySlug: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { categorySlug } = await params;
  const { q } = await searchParams;
  const db = getDb();

  const allCategories = db
    .prepare('SELECT id, name, slug, description FROM categories ORDER BY name ASC')
    .all() as { id: string; name: string; slug: string; description?: string }[];

  const currentCategory = allCategories.find((c) => c.slug === categorySlug);
  if (!currentCategory) {
    notFound();
  }

  const articles = (
    q && q.trim() !== ''
      ? db
          .prepare(
            `SELECT a.*, c.name AS category_name, c.slug AS category_slug
             FROM articles a
             JOIN categories c ON a.category_id = c.id
             WHERE a.status = 'published' AND c.slug = ? AND a.title LIKE ?
             ORDER BY a.published_at DESC LIMIT 20`
          )
          .all(categorySlug, `%${q.trim()}%`)
      : db
          .prepare(
            `SELECT a.*, c.name AS category_name, c.slug AS category_slug
             FROM articles a
             JOIN categories c ON a.category_id = c.id
             WHERE a.status = 'published' AND c.slug = ?
             ORDER BY a.published_at DESC LIMIT 20`
          )
          .all(categorySlug)
  ) as any[];

  const heroArticle = articles[0];

  // Smart Side-Fill: Fetch trending fallback across site so right column is never empty and hero never stretches
  const trendingFallback = db
    .prepare(
      `SELECT a.*, c.name AS category_name, c.slug AS category_slug
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       WHERE a.status = 'published' AND a.id != ?
       ORDER BY a.published_at DESC LIMIT 6`
    )
    .all(heroArticle?.id || '') as any[];

  let sideTrending: any[] = [];
  if (articles.length >= 3) {
    sideTrending = articles.slice(1, 3);
  } else if (articles.length === 2) {
    sideTrending = [articles[1], trendingFallback[0]].filter(Boolean);
  } else if (articles.length === 1) {
    sideTrending = trendingFallback.slice(0, 2);
  }

  const quickBriefs = articles.length > 3 ? articles.slice(3, 6) : trendingFallback.slice(2, 5);
  // If fewer than 8 articles exist, reuse articles from index 1+ so the coverage grid stays populated
  const mainFeed = articles.length > 3 ? articles.slice(3, 14) : articles.slice(1);
  const mostRead = articles.length >= 5 ? articles.slice(0, 5) : trendingFallback.slice(0, 5);

  const getArticleHref = (art: any) => `/${art.category_slug || currentCategory.slug}/${art.slug}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online';

  // Dynamic Mobile Quick-Topic Hubs derived from database categories
  const mobileHubs = [
    ...allCategories.map((cat, idx) => ({
      label: cat.name.split(' ')[0],
      tag: cat.name.slice(0, 3).toUpperCase(),
      href: `/${cat.slug}`,
      style: HUB_STYLES[idx % HUB_STYLES.length],
    })),
    {
      label: 'SIP Tool',
      tag: 'SIP',
      href: '/tools/sip-calculator',
      style: 'bg-[#0B1C2D] text-white border-[#0B1C2D]',
    },
  ];

  // JSON-LD Schemas (CollectionPage + BreadcrumbList)
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${currentCategory.name} — The Stock Times`,
      description:
        currentCategory.description ||
        `Latest ${currentCategory.name} news, analysis, and market coverage.`,
      url: `${siteUrl}/${currentCategory.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        {
          '@type': 'ListItem',
          position: 2,
          name: currentCategory.name,
          item: `${siteUrl}/${currentCategory.slug}`,
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-8 space-y-5 sm:space-y-6 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* 1. Compact Category Pills Bar (Current Category Highlighted) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
        <Link
          href="/"
          className="shrink-0 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-500 text-xs font-bold transition"
        >
          All News
        </Link>
        {allCategories.map((cat) => {
          const isCurrent = cat.slug === currentCategory.slug;
          return (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                isCurrent
                  ? 'bg-[#0B1C2D] text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-500'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {/* Mobile Quick Search Bar (Filters inside this category) */}
      <form action={`/${currentCategory.slug}`} method="GET" className="md:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            name="q"
            defaultValue={q || ''}
            placeholder={`Search in ${currentCategory.name}...`}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </form>

      {/* Mobile Circular Quick-Topic Hubs */}
      <section className="md:hidden">
        <div className="flex items-center justify-between gap-2 overflow-x-auto py-0.5">
          {mobileHubs.map((hub) => (
            <Link
              key={hub.label}
              href={hub.href}
              className="flex flex-col items-center gap-1 shrink-0 min-w-[56px]"
            >
              <div
                className={`w-11 h-11 rounded-full border flex items-center justify-center text-xs font-extrabold ${hub.style}`}
              >
                {hub.tag}
              </div>
              <span className="text-[11px] font-bold text-slate-700">{hub.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ✅ MASTER AD SLOT 1: TOP LEADERBOARD */}
      <DynamicAdSlot slotKey="home_top_banner" />

      {/* Active Search Filter Indicator */}
      {q && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-xs sm:text-sm">
          <span>
            Results in <strong>{currentCategory.name}</strong> for:{' '}
            <strong className="text-blue-900">&quot;{q}&quot;</strong>
          </span>
          <Link
            href={`/${currentCategory.slug}`}
            className="font-bold text-blue-600 hover:underline"
          >
            Reset ×
          </Link>
        </div>
      )}

      {articles.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2.5">
          <h1 className="text-xl font-serif font-bold text-slate-900">
            {currentCategory.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {q
              ? `No stories matched "${q}" in ${currentCategory.name}.`
              : `No articles published in ${currentCategory.name} yet. Publish from Admin CMS to populate this section.`}
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2 rounded-xl bg-[#0B1C2D] text-white text-xs font-bold"
          >
            Back to All News
          </Link>
        </div>
      ) : (
        <>
          {/* SECTION 1: CATEGORY BENTO HERO (Clean Editorial Asymmetric Split Layout) */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
              <div className="space-y-0.5">
                <nav className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                  <Link href="/" className="hover:text-blue-600">
                    Home
                  </Link>
                  <span>/</span>
                  <span className="text-blue-600">{currentCategory.name}</span>
                </nav>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-600 text-white">
                    <Newspaper className="w-4 h-4" />
                  </span>
                  <h1 className="text-base sm:text-xl font-extrabold text-slate-950 tracking-tight">
                    {currentCategory.name} Desk
                  </h1>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> {articles.length} Reports
              </span>
            </div>

            {currentCategory.description && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentCategory.description}
              </p>
            )}

            <div className="grid lg:grid-cols-12 gap-5 items-start">
              {/* LEFT 8 COLUMNS: Big 16:9 Image + Bold Headline Below */}
              {heroArticle && (
                <Link
                  href={getArticleHref(heroArticle)}
                  className="lg:col-span-8 group block space-y-3 lg:pr-5 lg:border-r lg:border-slate-200"
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
                      {currentCategory.name}
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

                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 block truncate">
                        {item.category_name || currentCategory.name}
                      </span>
                      <h3 className="text-xs sm:text-[14px] font-semibold text-slate-900 group-hover:text-blue-700 transition leading-snug line-clamp-3">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ✅ MASTER AD SLOT 2: BELOW HERO */}
          <DynamicAdSlot slotKey="home_mid_banner" />

          {/* SECTION 2: 60-SECOND CATEGORY SNAPSHOTS */}
          {quickBriefs.length > 0 && (
            <section className="bg-[#0B1C2D] text-white rounded-2xl p-4 sm:p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                    60-Second {currentCategory.name} Snapshots
                  </h2>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold md:hidden">
                  Swipe →
                </span>
              </div>

              <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto snap-x">
                {quickBriefs.map((brief) => (
                  <Link
                    key={brief.id}
                    href={getArticleHref(brief)}
                    className="min-w-[250px] md:min-w-0 snap-start bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3.5 space-y-1.5 transition flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase">
                        {currentCategory.name}
                      </span>
                      <h3 className="text-xs sm:text-sm font-bold leading-snug text-white line-clamp-2">
                        {brief.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 inline-flex items-center gap-1">
                      Quick Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* SECTION 3: INTERACTIVE FINANCIAL TOOLS & CALCULATORS */}
          <section className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {FINANCIAL_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-3 rounded-xl bg-slate-50 hover:bg-[#0B1C2D] hover:text-white border border-slate-200/80 transition group flex flex-col justify-between"
                >
                  <span className="text-[9px] font-extrabold uppercase text-blue-600 group-hover:text-emerald-400">
                    {tool.category}
                  </span>
                  <span className="text-xs font-extrabold mt-1 leading-snug">
                    {tool.shortTitle}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ✅ MASTER AD SLOT 3: BELOW CALCULATORS */}
          <DynamicAdSlot slotKey="home_tools_below" />

          {/* SECTION 4: CATEGORY COVERAGE FEED + STICKY SIDEBAR */}
          <section className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  All {currentCategory.name} Coverage
                </h2>
                <span className="text-[11px] text-slate-500">Latest Analysis</span>
              </div>

              {mainFeed.length > 0 && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {mainFeed.slice(0, 4).map((article) => (
                      <Link
                        key={article.id}
                        href={getArticleHref(article)}
                        className="group bg-white border border-slate-200/90 rounded-xl overflow-hidden hover:shadow-sm hover:border-blue-300 transition flex flex-row sm:flex-col"
                      >
                        {article.featured_image && (
                          <div className="w-28 sm:w-full sm:aspect-video bg-slate-100 overflow-hidden shrink-0">
                            <img
                              src={article.featured_image}
                              alt={article.image_alt || article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                            />
                          </div>
                        )}
                        <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-extrabold uppercase">
                              <span className="text-blue-600 truncate">
                                {currentCategory.name}
                              </span>
                              <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
                                <Clock className="w-3 h-3" /> 4 min
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 group-hover:text-blue-700 transition line-clamp-2">
                              {article.title}
                            </h3>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-100">
                            <span className="truncate max-w-[120px]">{article.author_name}</span>
                            <span className="font-bold text-blue-600">Read →</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* ✅ MASTER AD SLOT 4: INSIDE CATEGORY COVERAGE */}
                  <DynamicAdSlot slotKey="home_feed_mid" />

                  {mainFeed.length > 4 && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {mainFeed.slice(4).map((article) => (
                        <Link
                          key={article.id}
                          href={getArticleHref(article)}
                          className="group bg-white border border-slate-200/90 rounded-xl overflow-hidden hover:shadow-sm hover:border-blue-300 transition flex flex-row sm:flex-col"
                        >
                          {article.featured_image && (
                            <div className="w-28 sm:w-full sm:aspect-video bg-slate-100 overflow-hidden shrink-0">
                              <img
                                src={article.featured_image}
                                alt={article.image_alt || article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                              />
                            </div>
                          )}
                          <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                            <div className="space-y-1">
                              <span className="text-[10px] font-extrabold uppercase text-blue-600 block truncate">
                                {currentCategory.name}
                              </span>
                              <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 group-hover:text-blue-700 transition line-clamp-2">
                                {article.title}
                              </h3>
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-100">
                              <span className="truncate max-w-[120px]">{article.author_name}</span>
                              <span className="font-bold text-blue-600">Read →</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right 4 Columns: Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="sticky top-20 space-y-4">
                {/* ✅ MASTER AD SLOT 5: STICKY SIDEBAR */}
                <DynamicAdSlot slotKey="home_sidebar_sticky" />

                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                    Most Read in {currentCategory.name}
                  </h3>
                  <div className="space-y-3">
                    {mostRead.map((item, idx) => (
                      <Link
                        key={item.id}
                        href={getArticleHref(item)}
                        className="group flex items-start gap-2.5"
                      >
                        <span className="text-base font-serif font-black text-slate-300 group-hover:text-blue-600 transition leading-none">
                          0{idx + 1}
                        </span>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-bold uppercase text-blue-600 block">
                            {currentCategory.name}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-700 line-clamp-2 leading-snug">
                            {item.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </>
      )}
    </div>
  );
}
