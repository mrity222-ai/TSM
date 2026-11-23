import { NextRequest, NextResponse } from 'next/server';
import { db, getAllArticles } from '@/lib/db';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const articles = getAllArticles(status);
    return NextResponse.json(articles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      category_id,
      author_name,
      author_role,
      is_featured,
      featured_image,
      image_alt,
      key_takeaways,
      entity_tags,
      source_citation,
      direct_answer,
      faqs,
      content,
      focus_keyword,
      seo_title,
      seo_description,
      canonical_url,
      affiliate_title,
      affiliate_url,
      affiliate_cta,
      status,
      published_at,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const stmt = db.prepare(`
      INSERT INTO articles (
        id, title, slug, key_takeaways, content, category_id,
        author_name, author_role, is_featured, featured_image, image_alt,
        entity_tags, source_citation, direct_answer, faqs, focus_keyword,
        seo_title, seo_description, canonical_url, affiliate_title, affiliate_url, affiliate_cta,
        status, views, published_at, updated_at, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      title.trim(),
      slug.trim(),
      JSON.stringify(key_takeaways || []),
      content,
      category_id || null,
      author_name?.trim() || 'The Stock Times Editorial Desk',
      author_role?.trim() || 'Global Markets & Equity Research',
      is_featured ? 1 : 0,
      featured_image || null,
      image_alt || title,
      JSON.stringify(entity_tags || []),
      source_citation || null,
      direct_answer || null,
      JSON.stringify(faqs || []),
      focus_keyword || null,
      seo_title || title,
      seo_description || null,
      canonical_url || null,
      affiliate_title || null,
      affiliate_url || null,
      affiliate_cta || 'Explore Platform',
      status || 'draft',
      0,
      published_at || (status === 'published' ? now : null),
      now,
      now
    );

    return NextResponse.json({ id, title, slug, status }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
