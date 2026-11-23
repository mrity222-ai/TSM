import { FaqItem } from '@/types/database';

export interface AutoSeoResult {
  slug: string;
  focusKeyword: string;
  seoTitle: string;
  seoDescription: string;
  directAnswer: string;
  takeaways: string[];
  entityTags: string;
  faqs: FaqItem[];
}

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'is', 'are', 'was', 'were', 'be', 'been', 'by', 'as', 'from', 'that',
  'this', 'it', 'its', 'how', 'what', 'why', 'when', 'will', 'can', 'new', 'after',
  'about', 'into', 'over', 'more', 'most', 'some', 'any', 'all', 'both', 'each',
]);

export function generateAutoSeoBundle(
  headline: string,
  htmlContent: string,
  categoryName = 'Stock Market'
): AutoSeoResult {
  // 1. Clean HTML to plain sentences
  const plainText = htmlContent
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

  const sentences = plainText
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 25);

  // 2. Clean SEO URL Slug (Max 7 high-value words, stop-words removed)
  const slugWords = headline
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

  const slug = slugWords.slice(0, 7).join('-') || 'market-update';

  // 3. Focus Keyword (Top 3-4 core words from headline)
  const focusKeyword = slugWords.slice(0, 4).join(' ');

  // 4. 45-Word Direct Answer (AEO Position-0 Snippet)
  const firstTwo = sentences.slice(0, 2).join(' ');
  const directAnswerWords = firstTwo.split(/\s+/).slice(0, 48);
  let directAnswer = directAnswerWords.join(' ');
  if (directAnswer && !/[.!?]$/.test(directAnswer)) {
    directAnswer += '.';
  }

  // Fallback direct answer if content is very short
  if (!directAnswer.trim() && headline) {
    directAnswer = `${headline}. Market participants and analysts are monitoring key developments and stock movements closely in ${categoryName}.`;
  }

  // 5. SEO Meta Description (155 chars max)
  const seoDescription = (directAnswer || headline).slice(0, 155).trim();

  // 6. GEO Key Takeaways (Prioritize sentences with financial metrics: %, $, ₹, Cr, B, M)
  const dataSentences = sentences.filter((s) =>
    /(\d+%|\$\d+|₹\d+|\d+\s?(crore|crores|billion|billions|million|millions|trillion|bps|pts|shares))/i.test(s)
  );

  const pool = dataSentences.length >= 3 ? dataSentences : sentences;
  const takeaways: string[] = [];

  for (const s of pool) {
    const trimmed = s.slice(0, 160).trim();
    if (trimmed && !takeaways.includes(trimmed)) {
      takeaways.push(trimmed);
    }
    if (takeaways.length >= 4) break;
  }

  while (takeaways.length < 3) {
    if (takeaways.length === 0) {
      takeaways.push(`${headline} — major financial development shaping market sentiment.`);
    } else if (takeaways.length === 1) {
      takeaways.push(`Key sectors and indices impacted across ${categoryName}.`);
    } else {
      takeaways.push(`Analysts advise monitoring upcoming regulatory filings and corporate commentary.`);
    }
  }

  // 7. Extract Capitalized Entities / Stock Tickers for GEO
  const matches = plainText.match(/\b[A-Z][A-Za-z0-9&]{1,14}\b/g) || [];
  const excludedEntities = new Set([
    'The', 'This', 'That', 'With', 'From', 'And', 'For', 'After', 'Before', 'During',
    'Under', 'Over', 'Between', 'However', 'Moreover', 'Furthermore', 'According',
    'There', 'Here', 'Where', 'When', 'What', 'Which', 'Who', 'Why', 'How',
    'Also', 'Just', 'Very', 'Most', 'More', 'Some', 'Many', 'Every', 'Each',
  ]);

  const uniqueEntities = Array.from(
    new Set(matches.filter((w) => !excludedEntities.has(w)))
  ).slice(0, 8);

  const entityTags = uniqueEntities.join(', ');

  // 8. Auto-Generate AEO FAQs (What people & AI chatbots ask)
  const cleanSubject = headline.split(':')[0].replace(/[-–—].*$/, '').trim();
  const h2Matches = Array.from(htmlContent.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)).map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim()
  );

  const generatedFaqs: FaqItem[] = [];

  // Question 1: Core subject question
  generatedFaqs.push({
    question: cleanSubject.endsWith('?')
      ? cleanSubject
      : `What is the latest update on ${cleanSubject}?`,
    answer: directAnswer || sentences[0] || `${cleanSubject} has witnessed significant activity influencing ${categoryName} trends.`,
  });

  // Question 2: From first H2 heading or key numbers
  if (h2Matches[0]) {
    generatedFaqs.push({
      question: h2Matches[0].endsWith('?') ? h2Matches[0] : `How does ${h2Matches[0]} impact investors?`,
      answer: sentences[1] || sentences[0] || `Market analysts are closely tracking ${h2Matches[0]} for near-term price discovery and corporate performance.`,
    });
  } else {
    generatedFaqs.push({
      question: `What are the key financial highlights and numbers for ${cleanSubject}?`,
      answer: takeaways.slice(0, 2).join(' '),
    });
  }

  // Question 3: Outlook or second H2
  if (h2Matches[1]) {
    generatedFaqs.push({
      question: h2Matches[1].endsWith('?') ? h2Matches[1] : `What are the future expectations for ${h2Matches[1]}?`,
      answer: sentences[2] || sentences[1] || `Key stakeholders are watching growth forecasts, margins, and industry headwinds.`,
    });
  } else {
    generatedFaqs.push({
      question: `What should stock market investors watch next regarding ${cleanSubject}?`,
      answer:
        sentences[sentences.length - 1] ||
        `Investors should monitor quarterly earnings reports, trading volumes, and official ${categoryName} announcements.`,
    });
  }

  return {
    slug,
    focusKeyword,
    seoTitle: `${headline.slice(0, 58).trim()} | The Stock Times`,
    seoDescription,
    directAnswer,
    takeaways,
    entityTags,
    faqs: generatedFaqs,
  };
}
