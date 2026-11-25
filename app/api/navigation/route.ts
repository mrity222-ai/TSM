import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import {
  getNavigationItems,
  getAllNavigationItems,
  insertNavItem,
  updateNavItem,
  reorderNavItems,
  deleteNavItem,
} from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section') || 'all';
    const activeOnly = searchParams.get('activeOnly') === 'true';

    const items = activeOnly
      ? await getNavigationItems(section, true)
      : await getNavigationItems(section, false);

    return NextResponse.json(items);
  } catch (err: any) {
    console.error('Error in GET /api/navigation:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { section_type, label, href, badge_text, sort_order, is_active } = body;

    if (!section_type || !['navbar', 'tools'].includes(section_type)) {
      return NextResponse.json({ error: 'Valid section_type (navbar or tools) is required' }, { status: 400 });
    }
    if (!label || !label.trim()) {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 });
    }
    if (!href || !href.trim()) {
      return NextResponse.json({ error: 'URL (href) is required' }, { status: 400 });
    }

    const id = await insertNavItem({
      section_type,
      label: label.trim(),
      href: href.trim(),
      badge_text: badge_text ? badge_text.trim() : null,
      sort_order: typeof sort_order === 'number' ? sort_order : 99,
      is_active: is_active !== false,
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err: any) {
    console.error('Error in POST /api/navigation:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();

    // Case 1: Batch reorder
    if (Array.isArray(body.items)) {
      await reorderNavItems(body.items);
      revalidatePath('/', 'layout');
      return NextResponse.json({ success: true, message: 'Reordered successfully' });
    }

    // Case 2: Single item update
    const { id, label, href, badge_text, sort_order, is_active } = body;
    if (!id) {
      return NextResponse.json({ error: 'Item id is required for update' }, { status: 400 });
    }

    await updateNavItem(id, {
      ...(label !== undefined ? { label: label.trim() } : {}),
      ...(href !== undefined ? { href: href.trim() } : {}),
      ...(badge_text !== undefined ? { badge_text: badge_text ? badge_text.trim() : null } : {}),
      ...(sort_order !== undefined ? { sort_order: Number(sort_order) } : {}),
      ...(is_active !== undefined ? { is_active: Boolean(is_active) } : {}),
    });

    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error in PUT /api/navigation:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Item id is required' }, { status: 400 });
    }

    await deleteNavItem(id);
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error in DELETE /api/navigation:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
