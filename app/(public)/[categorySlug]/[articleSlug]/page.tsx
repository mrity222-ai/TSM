import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDb } from '@/lib/db';
import DynamicAdSlot from '@/components/ads/DynamicAdSlot';
import { FINANCIAL_TOOLS } from '@/lib/tools/toolsData';
import {
  Calendar,
  User,
  Sparkles,
  ArrowRight,
  Flame,
  Calculator,
  Clock,
  ExternalLink,
  CheckCircle2,
  Cpu,
  Wallet,
  Layers,
} from 'lucide-react';

export const revalidate = 60;

function parseJsonArray<T = string>(val: unknown): T[] {
  if (Array.isArray(val)) return val as T[];
  if (typeof val === 'string' && val.trim() !== '') {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; articleSlug: string }>;
}): Promise<Metadata> {
  const { categorySlug, articleSlug } = await params;
  const db = getDb();

  const article = db
    .prepare(
      `SELECT a.*, c.name AS category_name, c.slug AS category_slug
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       WHERE a.slug = ? AND c.slug = ? AND a.status = 'published'`
    )
    .get(articleSlug, categorySlug) as any;

  if (!article) {
    return { title: 'Article Not Found | The Stock Times' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online';
  const canonical = article.canonical_url || `${siteUrl}/${article.category_slug}/${article.slug}`;
  const title = article.seo_title || `${article.title} | The Stock Times`;
  const description = article.seo_description || article.direct_answer || article.title;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: article.published_at || article.created_at,
      authors: [article.author_name || 'The Stock Times Editorial Desk'],
      images: article.featured_image ? [{ url: article.featured_image }] : [],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ categorySlug: string; articleSlug: string }>;
}) {
  const { categorySlug, articleSlug } = await params;
  const db = getDb();

  const article = db
    .prepare(
      `SELECT a.*, c.name AS category_name, c.slug AS category_slug
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       WHERE a.slug = ? AND c.slug = ? AND a.status = 'published'`
    )
    .get(articleSlug, categorySlug) as any;

  if (!article) {
    notFound();
  }

  // All Categories for Quick Discovery
  const allCategories = db
    .prepare('SELECT id, name, slug FROM categories ORDER BY name ASC')
    .all() as { id: string; name: string; slug: string }[];

  // 1. Same Category Articles
  const sameCategoryArticles = db
    .prepare(
      `SELECT a.id, a.title, a.slug, a.featured_image, a.image_alt, a.author_name, a.published_at,
              c.name AS category_name, c.slug AS category_slug
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       WHERE a.status = 'published' AND c.slug = ? AND a.id != ?
       ORDER BY a.published_at DESC LIMIT 6`
    )
    .all(categorySlug, article.id) as any[];

  // 2. Global Recent & Trending Articles (with images)
  const globalTrending = db
    .prepare(
      `SELECT a.id, a.title, a.slug, a.featured_image, a.image_alt, a.author_name, a.published_at,
              c.name AS category_name, c.slug AS category_slug
       FROM articles a
       JOIN categories c ON a.category_id = c.id
       WHERE a.status = 'published' AND a.id != ?
       ORDER BY a.published_at DESC LIMIT 12`
    )
    .all(article.id) as any[];

  // 3. Tech & AI News Feed (using active DB category slugs)
  const techRaw = globalTrending.filter(
    (a) => a.category_slug === 'tech-ai-stocks' || a.category_slug === 'crypto-fintech'
  );
  const techNewsList = (techRaw.length >= 2 ? techRaw : globalTrending).slice(0, 3);

  // 4. Global Markets & Policy Feed (using active DB category slugs)
  const marketsRaw = globalTrending.filter(
    (a) =>
      a.category_slug === 'global-markets' ||
      a.category_slug === 'economy-policy' ||
      a.category_slug === 'ipo'
  );
  const marketsPolicyList = (marketsRaw.length >= 2 ? marketsRaw : globalTrending.slice(2)).slice(0, 3);

  // Pick 2 distinct inline cards for inside the left article body
  const inlineTrendingOne = globalTrending[0];
  const inlineTrendingTwo = globalTrending[1] || sameCategoryArticles[0];

  const keyTakeaways = parseJsonArray<string>(article.key_takeaways);
  const faqs = parseJsonArray<{ question: string; answer: string }>(article.faqs);
  const entityTags = parseJsonArray<string>(article.entity_tags);

  // Split HTML content into 3 clean parts so inline cards + ads sit naturally between sections
  const rawHtml = article.content || '';
  const paragraphs = rawHtml.split('</p>');
  const totalParas = paragraphs.length;

  let partOneHtml = rawHtml;
  let partTwoHtml = '';
  let partThreeHtml = '';

  if (totalParas > 5) {
    const split1 = Math.max(2, Math.floor(totalParas / 3));
    const split2 = Math.max(split1 + 2, Math.floor((totalParas * 2) / 3));
    partOneHtml = paragraphs.slice(0, split1).join('</p>') + '</p>';
    partTwoHtml = paragraphs.slice(split1, split2).join('</p>') + '</p>';
    partThreeHtml = paragraphs.slice(split2).join('</p>');
  } else if (totalParas > 2) {
    const mid = Math.floor(totalParas / 2);
    partOneHtml = paragraphs.slice(0, mid).join('</p>') + '</p>';
    partTwoHtml = paragraphs.slice(mid).join('</p>');
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online';
  const articleUrl = `${siteUrl}/${article.category_slug}/${article.slug}`;

  const schemas: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.seo_description || article.direct_answer || article.title,
      image: article.featured_image ? [article.featured_image] : [],
      datePublished: article.published_at || article.created_at,
      dateModified: article.updated_at || article.published_at || article.created_at,
      author: {
        '@type': 'Person',
        name: article.author_name || 'The Stock Times Editorial Desk',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Stock Times',
        url: siteUrl,
      },
      mainEntityOfPage: articleUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        {
          '@type': 'ListItem',
          position: 2,
          name: article.category_name,
          item: `${siteUrl}/${article.category_slug}`,
        },
        { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
      ],
    },
  ];

  if (faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 pb-10 space-y-6 overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${article.category_slug}`} className="text-blue-600 hover:underline">
          {article.category_name}
        </Link>
        <span>/</span>
        <span className="text-slate-700 truncate max-w-[260px] sm:max-w-md">
          {article.title}
        </span>
      </nav>

      {/* ✅ ARTICLE AD SLOT 1: TOP LEADERBOARD */}
      <DynamicAdSlot slotKey="article_top_banner" />

      {/* Main 8 + 4 Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* =================================================================
            LEFT 8 COLUMNS: MAIN ARTICLE + INLINE TRENDING CARDS + ADS
        ================================================================= */}
        <article className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-8 shadow-2xs space-y-6">
          {/* Category Badge + Headline */}
          <header className="space-y-3">
            <Link
              href={`/${article.category_slug}`}
              className="inline-block px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-[11px] font-extrabold uppercase tracking-wider"
            >
              {article.category_name}
            </Link>

            <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-bold text-slate-950 leading-tight">
              {article.title}
            </h1>

            {/* E-E-A-T Author & Date Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 pb-3 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                  <User className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span className="font-bold text-slate-800">{article.author_name}</span>
                  {article.author_role && (
                    <span className="text-slate-400"> · {article.author_role}</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> 4 min read
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'Today'}
                </span>
              </div>
            </div>
          </header>

          {/* AEO Direct Answer Box */}
          {article.direct_answer && (
            <div className="bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl p-4 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {article.direct_answer}
            </div>
          )}

          {/* Featured Cover Image */}
          {article.featured_image && (
            <figure className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
              <img
                src={article.featured_image}
                alt={article.image_alt || article.title}
                className="w-full max-h-[440px] object-cover"
              />
            </figure>
          )}

          {/* GEO Key Takeaways Box */}
          {keyTakeaways.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700">
                <Sparkles className="w-4 h-4" />
                <span>Key Takeaways</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ ARTICLE AD SLOT 2 */}
          <DynamicAdSlot slotKey="article_para_2" />

          {/* Article Body Part 1 (With Drop-Cap) */}
          <div
            className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-blue-600 text-slate-800 leading-relaxed first-letter:float-left first-letter:text-5xl first-letter:font-serif first-letter:font-extrabold first-letter:text-slate-950 first-letter:mr-3 first-letter:leading-none"
            dangerouslySetInnerHTML={{ __html: partOneHtml }}
          />

          {/* 🔥 INLINE TRENDING CARD WITH IMAGE #1 (Inside Left Column) */}
          {inlineTrendingOne && (
            <Link
              href={`/${inlineTrendingOne.category_slug}/${inlineTrendingOne.slug}`}
              className="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition"
            >
              {inlineTrendingOne.featured_image && (
                <img
                  src={inlineTrendingOne.featured_image}
                  alt={inlineTrendingOne.image_alt || inlineTrendingOne.title}
                  className="w-24 h-16 sm:w-28 sm:h-20 rounded-xl object-cover shrink-0 bg-slate-200"
                />
              )}
              <div className="flex-1 min-w-0 space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-600">
                  <Flame className="w-3 h-3" /> Trending in {inlineTrendingOne.category_name}
                </span>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2 leading-snug">
                  {inlineTrendingOne.title}
                </h4>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 group-hover:translate-x-1 transition" />
            </Link>
          )}

          {/* ✅ ARTICLE AD SLOT 3: MID-ARTICLE BANNER */}
          <DynamicAdSlot slotKey="article_mid_body" />

          {/* Article Body Part 2 */}
          {partTwoHtml && (
            <div
              className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-blue-600 text-slate-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: partTwoHtml }}
            />
          )}

          {/* 🔥 INLINE PERSONAL FINANCE / TECH SPOTLIGHT WITH IMAGE #2 */}
          {inlineTrendingTwo && (
            <Link
              href={`/${inlineTrendingTwo.category_slug}/${inlineTrendingTwo.slug}`}
              className="group flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200/80 transition"
            >
              {inlineTrendingTwo.featured_image && (
                <img
                  src={inlineTrendingTwo.featured_image}
                  alt={inlineTrendingTwo.image_alt || inlineTrendingTwo.title}
                  className="w-24 h-16 sm:w-28 sm:h-20 rounded-xl object-cover shrink-0 bg-slate-200"
                />
              )}
              <div className="flex-1 min-w-0 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">
                  Recommended · {inlineTrendingTwo.category_name}
                </span>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-slate-900 group-hover:text-emerald-800 line-clamp-2 leading-snug">
                  {inlineTrendingTwo.title}
                </h4>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-700 shrink-0 group-hover:translate-x-1 transition" />
            </Link>
          )}

          {/* Article Body Part 3 */}
          {partThreeHtml && (
            <div
              className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-blue-600 text-slate-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: partThreeHtml }}
            />
          )}

          {/* Per-Article Custom Affiliate CTA */}
          {article.affiliate_title && article.affiliate_url && (
            <div className="bg-gradient-to-r from-[#0B1C2D] to-slate-900 text-white rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                  Featured Market Partner
                </span>
                <h3 className="text-base font-bold">{article.affiliate_title}</h3>
              </div>
              <a
                href={article.affiliate_url}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="shrink-0 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition"
              >
                {article.affiliate_cta || 'Explore Now'} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* ✅ ARTICLE AD SLOT 4: BEFORE FAQS */}
          <DynamicAdSlot slotKey="article_before_faq" />

          {/* FAQs Section */}
          {faqs.length > 0 && (
            <section className="pt-4 border-t border-slate-200 space-y-3">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-slate-50/60 space-y-1">
                    <h3 className="text-sm font-bold text-slate-900">{faq.question}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Entity / Topic Tags */}
          {entityTags.length > 0 && (
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Topics:</span>
              {entityTags.map((tag, idx) => (
                <Link
                  key={idx}
                  href={`/?q=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-700 transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </article>

        {/* =================================================================
            RIGHT 4 COLUMNS: RICH SIDEBAR (NO BLANK SPACE BELOW)
        ================================================================= */}
        <aside className="lg:col-span-4 space-y-5">
          {/* 1. Top Sidebar Ad Slot */}
          <DynamicAdSlot slotKey="article_sidebar_sticky" />

          {/* 2. Trending Market Stories (With Images) */}
          {globalTrending.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Trending Market Stories
                </h3>
              </div>

              <div className="space-y-3">
                {globalTrending.slice(0, 4).map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.category_slug}/${item.slug}`}
                    className="group flex items-center gap-3"
                  >
                    <div className="w-16 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      {item.featured_image ? (
                        <img
                          src={item.featured_image}
                          alt={item.image_alt || item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] font-bold text-slate-400">
                          NEWS
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <span className="text-[9px] font-extrabold uppercase text-blue-600 block">
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

          {/* 3. Finance Tools Box */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Finance Tools
                </h3>
              </div>
              <Link href="/tools" className="text-[11px] font-bold text-blue-600">
                All Finance Tools →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {FINANCIAL_TOOLS.slice(0, 6).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-[#0B1C2D] hover:text-white border border-slate-200/80 text-[11px] font-bold transition"
                >
                  {tool.shortTitle}
                </Link>
              ))}
            </div>
          </div>

          {/* 4. Tech & AI News Desk (With Images) */}
          {techNewsList.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Tech & AI News
                  </h3>
                </div>
                <Link href="/tech-ai-stocks" className="text-[11px] font-bold text-blue-600">
                  More →
                </Link>
              </div>

              <div className="space-y-3">
                {techNewsList.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.category_slug}/${item.slug}`}
                    className="group flex items-center gap-3"
                  >
                    {item.featured_image && (
                      <img
                        src={item.featured_image}
                        alt={item.image_alt || item.title}
                        className="w-16 h-14 rounded-lg object-cover shrink-0 bg-slate-100"
                      />
                    )}
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-700 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 5. Global Markets & Policy Picks (With Images) */}
          {marketsPolicyList.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <Wallet className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    Markets &amp; Economy Watch
                  </h3>
                </div>
                <Link href="/global-markets" className="text-[11px] font-bold text-blue-600">
                  More →
                </Link>
              </div>

              <div className="space-y-3">
                {marketsPolicyList.map((item) => (
                  <Link
                    key={item.id}
                    href={`/${item.category_slug}/${item.slug}`}
                    className="group flex items-center gap-3"
                  >
                    {item.featured_image && (
                      <img
                        src={item.featured_image}
                        alt={item.image_alt || item.title}
                        className="w-16 h-14 rounded-lg object-cover shrink-0 bg-slate-100"
                      />
                    )}
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-700 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 6. Explore All Categories + Sticky Bottom Ad */}
          <div className="sticky top-28 space-y-4">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Layers className="w-4 h-4 text-slate-700" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Explore Categories
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/${cat.slug}`}
                    className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-[#0B1C2D] hover:text-white text-[11px] font-bold text-slate-800 transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* ✅ STICKY BOTTOM SIDEBAR AD SLOT */}
            <DynamicAdSlot slotKey="home_sidebar_sticky" />
          </div>
        </aside>
      </div>

      {/* BOTTOM RELATED ARTICLES GRID */}
      {(sameCategoryArticles.length > 0 ? sameCategoryArticles : globalTrending).length > 0 && (
        <section className="pt-4 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900">
              Read Next in {article.category_name}
            </h2>
            <Link
              href={`/${article.category_slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
            >
              Explore {article.category_name} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(sameCategoryArticles.length > 0 ? sameCategoryArticles : globalTrending)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/${item.category_slug}/${item.slug}`}
                  className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-md hover:border-blue-300 transition flex flex-row sm:flex-col"
                >
                  {item.featured_image && (
                    <div className="w-28 sm:w-full sm:aspect-video bg-slate-100 overflow-hidden shrink-0">
                      <img
                        src={item.featured_image}
                        alt={item.image_alt || item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                  )}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold uppercase text-blue-600 block">
                        {item.category_name}
                      </span>
                      <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1.5 border-t border-slate-100">
                      <span>{item.author_name}</span>
                      <span className="font-bold text-blue-600">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
