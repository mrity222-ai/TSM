import { getAllArticles } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online';

  let articlesText = '';

  try {
    const articles = getAllArticles('published').slice(0, 30);

    if (articles && articles.length > 0) {
      articlesText = articles
        .map((a) => {
          const takeaways = (a.key_takeaways || [])
            .map((t: string) => `  - ${t}`)
            .join('\n');

          const categoryName = a.categories?.name || 'Markets';

          return `### [${a.title}](${siteUrl}/${a.categories?.slug || 'global-markets'}/${a.slug})
- **Category:** ${categoryName}
- **Author:** ${a.author_name}
- **Published:** ${a.published_at ? new Date(a.published_at).toISOString().split('T')[0] : 'Recent'}
- **Summary:** ${a.seo_description || 'N/A'}
${takeaways ? `- **Key Takeaways:**\n${takeaways}` : ''}
`;
        })
        .join('\n---\n\n');
    }
  } catch {
    articlesText = 'Latest articles will be listed here dynamically.';
  }

  const content = `# The Stock Times
> Real-time global market reporting, technology and AI equity research, and macroeconomic insights for modern investors.

- Website: ${siteUrl}
- Contact: contact@thestocktimes.online
- License & Disclaimer: Information published is strictly for informational and educational purposes only. Not SEBI-registered financial or investment advice.

## Key Sections
- Global Markets: ${siteUrl}/global-markets
- Tech & AI Stocks: ${siteUrl}/tech-ai-stocks
- Crypto & Fintech: ${siteUrl}/crypto-fintech
- Economy & Policy: ${siteUrl}/economy-policy

## Latest Articles & Intelligence
${articlesText}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=120',
    },
  });
}
