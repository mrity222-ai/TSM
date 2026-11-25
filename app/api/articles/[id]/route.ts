import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getArticleById, dbExecute } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await req.json();

    const existing = await getArticleById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

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

    const now = new Date().toISOString();

    await dbExecute(
      `UPDATE articles SET
        title = ?,
        slug = ?,
        category_id = ?,
        author_name = ?,
        author_role = ?,
        is_featured = ?,
        featured_image = ?,
        image_alt = ?,
        key_takeaways = ?,
        entity_tags = ?,
        source_citation = ?,
        direct_answer = ?,
        faqs = ?,
        content = ?,
        focus_keyword = ?,
        seo_title = ?,
        seo_description = ?,
        canonical_url = ?,
        affiliate_title = ?,
        affiliate_url = ?,
        affiliate_cta = ?,
        status = ?,
        published_at = ?,
        updated_at = ?
      WHERE id = ?`,
      [
        title,
        slug,
        category_id || null,
        author_name || existing.author_name,
        author_role || (existing as any).author_role || 'Global Markets & Equity Research',
        is_featured !== undefined ? (is_featured ? 1 : 0) : ((existing as any).is_featured ? 1 : 0),
        featured_image || null,
        image_alt || title,
        JSON.stringify(key_takeaways || []),
        JSON.stringify(entity_tags || []),
        source_citation || null,
        direct_answer || null,
        JSON.stringify(faqs || []),
        content,
        focus_keyword || null,
        seo_title || title,
        seo_description || null,
        canonical_url || null,
        affiliate_title || null,
        affiliate_url || null,
        affiliate_cta || 'Explore Platform',
        status || existing.status,
        published_at || (status === 'published' ? (existing.published_at || now) : existing.published_at),
        now,
        id,
      ]
    );

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    await dbExecute('DELETE FROM articles WHERE id = ?', [id]);
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
