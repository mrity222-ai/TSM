import { Article } from '@/types/database';

export default function JsonLdSchema({ article }: { article: Article }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online';
  const articleUrl = `${siteUrl}/${article.categories?.slug || 'global-markets'}/${article.slug}`;

  const newsSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.seo_title || article.title,
    description: article.seo_description || '',
    image: article.featured_image ? [article.featured_image] : [],
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at || article.published_at,
    author: {
      '@type': 'Person',
      name: article.author_name || 'The Stock Times Editorial Desk',
      jobTitle: article.author_role || 'Global Markets & Equity Research',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Stock Times',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      ...(article.categories
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: article.categories.name,
              item: `${siteUrl}/${article.categories.slug}`,
            },
          ]
        : []),
      { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl },
    ],
  };

  const faqSchema =
    article.faqs && article.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
