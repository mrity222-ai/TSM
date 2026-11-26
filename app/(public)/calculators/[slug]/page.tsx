import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { dbQuery } from '@/lib/db';
import { FINANCIAL_TOOLS } from '@/lib/tools/toolsData';
import CalculatorEngine from '@/components/tools/CalculatorEngine';
import DynamicAdSlot from '@/components/ads/DynamicAdSlot';
import { Coins, Flame, ArrowRight, Calculator, AlertCircle } from 'lucide-react';

export const revalidate = 60;

export async function generateStaticParams() {
  return FINANCIAL_TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = FINANCIAL_TOOLS.find((t) => t.slug === slug);
  if (!tool) return { title: 'Calculator Not Found | The Stock Times' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online';
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: { canonical: `${siteUrl}/calculators/${tool.slug}` },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `${siteUrl}/calculators/${tool.slug}`,
      type: 'website',
    },
  };
}

export default async function SingleCalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = FINANCIAL_TOOLS.find((t) => t.slug === slug);
  if (!tool) notFound();

  const trendingArticles = await dbQuery(
    `SELECT a.id, a.title, a.slug, a.featured_image, a.image_alt, a.author_name, a.published_at,
            c.name AS category_name, c.slug AS category_slug
     FROM articles a
     JOIN categories c ON a.category_id = c.id
     WHERE a.status = 'published'
     ORDER BY a.published_at DESC LIMIT 5`
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online';

  const graphSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: tool.schemaName,
        url: `${siteUrl}/calculators/${tool.slug}`,
        description: tool.schemaDescription,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        publisher: {
          '@type': 'Organization',
          name: 'The Stock Times',
          url: siteUrl,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: tool.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Wealth Management Tools',
        item: `${siteUrl}/calculators`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.schemaName,
        item: `${siteUrl}/calculators/${tool.slug}`,
      },
    ],
  };

  const relatedTools = tool.relatedSlugs
    .map((relSlug) => FINANCIAL_TOOLS.find((t) => t.slug === relSlug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-10 space-y-5 sm:space-y-6 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ✅ MASTER AD SLOT 1: TOP LEADERBOARD */}
      <DynamicAdSlot slotKey="home_top_banner" />

      {/* Breadcrumb & H1 */}
      <div className="space-y-1.5">
        <nav className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/calculators" className="hover:text-blue-600">Wealth Management Tools</Link>
          <span>/</span>
          <span className="text-blue-600">{tool.shortTitle}</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {tool.h1Title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Main 8 + 4 Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 Columns: Calculator + Disclaimer + Inline Ads + Body H2 Sections + FAQs + Related */}
        <div className="lg:col-span-8 space-y-6">
          {/* Interactive Calculator Engine */}
          <div className="space-y-3">
            <CalculatorEngine slug={tool.slug} />
            <p className="flex items-start gap-2 rounded-xl bg-amber-50/80 border border-amber-200/80 px-4 py-2.5 text-[11px] sm:text-xs text-amber-950 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{tool.disclaimer}</span>
            </p>
          </div>

          {/* ✅ MASTER AD SLOT 2: BELOW CALCULATOR RESULT & CHART */}
          <DynamicAdSlot slotKey="home_mid_banner" />

          {/* STRUCTURED SEO BODY SECTIONS (All H2s in exact pack order) */}
          <div className="space-y-5">
            {tool.bodySections.map((section, idx) => (
              <section
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-3.5 shadow-2xs"
              >
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                  {section.heading}
                </h2>

                {section.orderedSteps && section.orderedSteps.length > 0 && (
                  <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {section.orderedSteps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                )}

                {section.formula && (
                  <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs sm:text-sm border border-slate-800 overflow-x-auto whitespace-pre-wrap text-center font-bold">
                    {section.formula}
                  </pre>
                )}

                {section.table && (
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-xs sm:text-sm text-left">
                      <thead className="bg-slate-100 text-slate-800 font-bold">
                        <tr>
                          {section.table.headers.map((header, hIdx) => (
                            <th key={hIdx} className="px-4 py-2.5 border-b border-slate-200">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`px-4 py-2.5 ${cIdx === 0 ? 'font-semibold text-slate-900' : ''}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {section.paragraphs &&
                  section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {para}
                    </p>
                  ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* ✅ MASTER AD SLOT 3: BEFORE FAQS */}
          <DynamicAdSlot slotKey="home_feed_mid" />

          {/* FAQ SECTION: H2 heading + H3 per question (word-for-word match with FAQPage JSON-LD) */}
          {tool.faqs && tool.faqs.length > 0 && (
            <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-slate-100">
                {tool.faqs.map((faq, idx) => (
                  <div key={idx} className="py-4 space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* RELATED CALCULATORS BLOCK UNDER FAQ */}
          {relatedTools.length > 0 && (
            <section className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                  Related calculators
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {relatedTools.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/calculators/${rel.slug}`}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-blue-600 block">
                        {rel.category}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700">
                        {rel.shortTitle}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition shrink-0" />
                  </Link>
                ))}
              </div>
              {tool.showRelatedIpoArticles && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600">
                    Related articles: Check latest IPO allotment status &amp; GMP coverage
                  </span>
                  <Link
                    href="/ipo"
                    className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline shrink-0"
                  >
                    View IPO News <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right 4 Columns: Sticky Ad + Invest CTA + Popular Calculators + Trending News */}
        <aside className="lg:col-span-4 space-y-5">
          {/* ✅ MASTER AD SLOT 5: SIDEBAR TOP BOX */}
          <DynamicAdSlot slotKey="home_sidebar_sticky" />

          {/* Invest CTA Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center space-y-3 shadow-2xs">
            <div className="w-11 h-11 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Invest in Mutual Funds</h3>
            <p className="text-xs text-slate-500">
              Start building long-term wealth with zero-commission direct SIPs
            </p>
            <Link
              href="/calculators/sip-calculator"
              className="block w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-extrabold uppercase tracking-wider transition"
            >
              INVEST NOW
            </Link>
          </div>

          {/* Popular Calculators */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-extrabold text-slate-900">
              Popular Wealth Management Tools
            </div>
            <div className="divide-y divide-slate-100">
              {FINANCIAL_TOOLS.map((item) => (
                <Link
                  key={item.slug}
                  href={`/calculators/${item.slug}`}
                  className={`block px-4 py-2.5 text-xs transition ${
                    item.slug === tool.slug
                      ? 'bg-emerald-50/70 font-bold text-emerald-800'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  {item.shortTitle}
                </Link>
              ))}
            </div>
          </div>

          {/* Trending Market Stories in Sidebar */}
          {trendingArticles.length > 0 && (
            <div className="sticky top-20 bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Trending Market News
                </h3>
              </div>
              <div className="space-y-3">
                {trendingArticles.map((item, idx) => (
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
                      <p className="text-xs font-bold text-slate-800 group-hover:text-blue-700 line-clamp-2 leading-snug">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Latest Articles Strip at Bottom */}
      {trendingArticles.length > 0 && (
        <section className="pt-2 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              Latest Market Coverage
            </h2>
            <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline">
              All News <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {trendingArticles.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/${item.category_slug}/${item.slug}`}
                className="group bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 transition space-y-1.5"
              >
                <span className="text-[10px] font-extrabold uppercase text-blue-600">
                  {item.category_name}
                </span>
                <h3 className="text-sm font-serif font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}