import { getDb } from '@/lib/db';
import WatchlistIdeasCarousel, {
  WatchlistIdeaCard,
} from '@/components/news/WatchlistIdeasCarousel';

export default function TrendingWatchlistSection() {
  let cards: WatchlistIdeaCard[] = [];

  try {
    const db = getDb();
    // Exclusively query real published articles with featured images from the database
    const recentArticles = db
      .prepare(
        `SELECT a.id, a.title, a.slug, a.seo_description, a.direct_answer, a.featured_image,
                c.name AS category_name, c.slug AS category_slug
         FROM articles a
         JOIN categories c ON a.category_id = c.id
         WHERE a.status = 'published' AND a.featured_image IS NOT NULL AND a.featured_image != ''
         ORDER BY a.published_at DESC LIMIT 8`
      )
      .all() as any[];

    if (recentArticles && recentArticles.length > 0) {
      cards = recentArticles.map((art) => ({
        id: String(art.id),
        title: art.title,
        description:
          art.seo_description ||
          art.direct_answer ||
          `Read full institutional analysis, key market metrics, and investor outlook in ${art.category_name}.`,
        imageUrl: art.featured_image,
        href: `/${art.category_slug}/${art.slug}`,
      }));
    }
  } catch (err) {
    console.error('Error fetching trending watchlist articles from database:', err);
    cards = [];
  }

  if (cards.length === 0) {
    return null;
  }

  return <WatchlistIdeasCarousel items={cards} />;
}
