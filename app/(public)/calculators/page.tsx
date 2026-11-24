import Link from 'next/link';
import { Metadata } from 'next';
import { dbQuery } from '@/lib/db';
import DynamicAdSlot from '@/components/ads/DynamicAdSlot';
import { FINANCIAL_TOOLS } from '@/lib/tools/toolsData';
import {
  Calculator,
  ArrowRight,
  Flame,
  Sparkles,
} from 'lucide-react';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Wealth Management Tools & Financial Calculators – SIP, EMI, Tax, PPF | The Stock Times',
  description:
    'Free interactive wealth management tools and financial calculators for SIP, Lumpsum compounding, Loan EMI, Income Tax, PPF, EPF, FD, RD, and Stock Averaging.',
  alternates: {
    canonical: 'https://thestocktimes.online/calculators',
  },
};

export default async function CalculatorsDirectoryPage() {
  const trendingArticles = await dbQuery(
    `SELECT a.id, a.title, a.slug, a.featured_image, a.image_alt, a.author_name, a.published_at,
            c.name AS category_name, c.slug AS category_slug
     FROM articles a
     JOIN categories c ON a.category_id = c.id
     WHERE a.status = 'published'
     ORDER BY a.published_at DESC LIMIT 8`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-10 space-y-5 sm:space-y-6 overflow-x-hidden">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <span className="text-blue-600">Wealth Management Tools</span>
      </nav>

      {/* ✅ MASTER AD SLOT 1: TOP LEADERBOARD */}
      <DynamicAdSlot slotKey="home_top_banner" />

      {/* Hero Header */}
      <section className="bg-[#0B1C2D] text-white rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-400 text-slate-950 text-[10px] font-extrabold uppercase">
            <Sparkles className="w-3 h-3" /> Wealth &amp; Investment Suite
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold">
            Wealth Management Tools &amp; Financial Calculators
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Plan mutual fund SIPs, retirement corpus, loan EMIs, tax savings, and stock average prices with real-time visual compounding breakdowns.
          </p>
        </div>
        <Link
          href="/calculators/sip-calculator"
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider transition"
        >
          Launch SIP Calculator <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* ✅ MASTER AD SLOT 2: BELOW HERO */}
      <DynamicAdSlot slotKey="home_mid_banner" />

      {/* Main 8 + 4 Grid: All Calculators + Sticky Sidebar */}
      <section className="grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-600" />
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                All Wealth Management Tools ({FINANCIAL_TOOLS.length})
              </h2>
            </div>
            <span className="text-[11px] text-slate-500">100% Free &amp; Instant</span>
          </div>

          {/* First 6 Calculators */}
          <div className="grid sm:grid-cols-2 gap-4">
            {FINANCIAL_TOOLS.slice(0, 6).map((tool) => (
              <Link
                key={tool.slug}
                href={`/calculators/${tool.slug}`}
                className="group bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-blue-400 transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                    {tool.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition">
                    {tool.shortTitle}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600">
                  Calculate Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </span>
              </Link>
            ))}
          </div>

          {/* ✅ MASTER AD SLOT 3: MID TOOLS GRID BANNER */}
          <DynamicAdSlot slotKey="home_tools_below" />

          {/* Remaining Calculators */}
          {FINANCIAL_TOOLS.length > 6 && (
            <div className="grid sm:grid-cols-2 gap-4">
              {FINANCIAL_TOOLS.slice(6).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/calculators/${tool.slug}`}
                  className="group bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 hover:shadow-md hover:border-blue-400 transition flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600">
                      {tool.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition">
                      {tool.shortTitle}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600">
                    Calculate Now <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* ✅ MASTER AD SLOT 4: BEFORE TRENDING COVERAGE */}
          <DynamicAdSlot slotKey="home_feed_mid" />
        </div>

        {/* Right 4 Columns: Sticky Sidebar (Ad + Trending Market News) */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="sticky top-20 space-y-4">
            {/* ✅ MASTER AD SLOT 5: STICKY SIDEBAR AD */}
            <DynamicAdSlot slotKey="home_sidebar_sticky" />

            {trendingArticles.length > 0 && (
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
                <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Trending Market Stories
                  </h3>
                </div>
                <div className="space-y-3">
                  {trendingArticles.slice(0, 5).map((item, idx) => (
                    <Link
                      key={item.id}
                      href={`/${item.category_slug}/${item.slug}`}
                      className="group flex items-start gap-2.5"
                    >
                      <span className="text-base font-serif font-black text-slate-300 group-hover:text-blue-600 transition leading-none">
                        0{idx + 1}
                      </span>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase text-blue-600 block">
                          {item.category_name}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-700 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
