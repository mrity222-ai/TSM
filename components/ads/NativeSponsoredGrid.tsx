import Link from 'next/link';
import { getDb } from '@/lib/db';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';

interface RecommendedBlogItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  categoryName: string;
  categorySlug: string;
  authorName: string;
  readTime: string;
}

export default function NativeSponsoredGrid() {
  let blogs: RecommendedBlogItem[] = [];

  try {
    const db = getDb();
    // Exclusively query real published articles with featured images from the database
    const rows = db
      .prepare(
        `SELECT a.id, a.title, a.slug, a.seo_description, a.direct_answer, a.featured_image, a.author_name, a.published_at,
                c.name AS category_name, c.slug AS category_slug
         FROM articles a
         JOIN categories c ON a.category_id = c.id
         WHERE a.status = 'published' AND a.featured_image IS NOT NULL AND a.featured_image != ''
         ORDER BY a.published_at DESC
         LIMIT 3`
      )
      .all() as any[];

    if (rows && rows.length > 0) {
      blogs = rows.map((b) => ({
        id: String(b.id),
        title: b.title,
        slug: b.slug,
        description:
          b.seo_description ||
          b.direct_answer ||
          `Read full institutional analysis, valuation metrics, and market outlook in ${b.category_name}.`,
        imageUrl: b.featured_image,
        categoryName: b.category_name || 'Market Story',
        categorySlug: b.category_slug || 'global-markets',
        authorName: b.author_name || 'The Stock Times Desk',
        readTime: '4 min read',
      }));
    }
  } catch (err) {
    console.error('Error fetching recommended blogs from database:', err);
    blogs = [];
  }

  // If no published blogs exist, cleanly hide section
  if (blogs.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Recommended Editorial Stories"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8 space-y-4"
    >
      {/* Top Divider & Label */}
      <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-900">
            RECOMMENDED STORIES FOR INVESTORS
          </span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition uppercase tracking-wider"
        >
          <span>From Our Editorial Desk</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 3-Column Editorial Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/${blog.categorySlug}/${blog.slug}`}
            className="group block h-full"
          >
            <div className="group h-full flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 p-3 hover:shadow-md hover:border-slate-300 transition">
              <div className="space-y-2.5">
                {/* Rounded 16:9 Image with Floating Category Badge */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-xs text-[10px] font-extrabold text-white tracking-wider uppercase shadow-xs">
                    {blog.categoryName}
                  </span>
                </div>

                {/* Bold Title + 2-Line Description */}
                <div className="space-y-1 px-0.5">
                  <h3 className="text-[15px] font-bold text-slate-950 group-hover:text-blue-700 transition leading-snug line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {blog.description}
                  </p>
                </div>
              </div>

              {/* Bottom Author / Read Time + Pill Button */}
              <div className="pt-3 mt-2 px-0.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium truncate">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{blog.authorName.split(' ')[0]} · {blog.readTime}</span>
                </span>

                <span className="shrink-0 px-3.5 py-1.5 rounded-full border border-slate-300 group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white text-slate-900 text-xs font-bold transition">
                  Read Story →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
