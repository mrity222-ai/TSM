import { MetadataRoute } from 'next';
import { getAllArticles, getAllCategories } from '@/lib/db';
import { FINANCIAL_TOOLS } from '@/lib/tools/toolsData';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    const articles = getAllArticles('published');
    const articleUrls: MetadataRoute.Sitemap = articles.map((art) => ({
      url: `${siteUrl}/${art.categories?.slug || 'global-markets'}/${art.slug}`,
      lastModified: new Date(art.updated_at || art.published_at || Date.now()),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const categories = getAllCategories();
    const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${siteUrl}/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    const toolUrls: MetadataRoute.Sitemap = FINANCIAL_TOOLS.map((t) => ({
      url: `${siteUrl}/calculators/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }));

    return [...staticPages, ...toolUrls, ...categoryUrls, ...articleUrls];
  } catch {
    return staticPages;
  }
}
