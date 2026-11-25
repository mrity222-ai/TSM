import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getAllAdSlots, dbExecute } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';
import crypto from 'crypto';

export async function GET() {
  try {
    const slots = await getAllAdSlots();
    return NextResponse.json(slots);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json();
    const { slot_label, slot_key, ad_type, ad_size, bullet_points, is_active } = body;

    if (!slot_label || !slot_key) {
      return NextResponse.json({ error: 'Slot label and key are required' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    await dbExecute(
      `INSERT INTO ad_slots (id, slot_label, slot_key, ad_type, ad_size, bullet_points, is_active, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        slot_label.trim(),
        slot_key.trim(),
        ad_type || 'inhouse_banner',
        ad_size || 'responsive',
        JSON.stringify(bullet_points || []),
        is_active ? 1 : 0,
        now,
      ]
    );

    revalidatePath('/', 'layout');
    return NextResponse.json({ id, slot_label, slot_key, ad_type, ad_size, is_active }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json();
    const {
      id,
      slot_label,
      ad_type,
      ad_size,
      code_or_title,
      description,
      bullet_points,
      image_url,
      target_url,
      cta_text,
      is_active,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const now = new Date().toISOString();
    await dbExecute(
      `UPDATE ad_slots
       SET slot_label = ?, ad_type = ?, ad_size = ?, code_or_title = ?, description = ?, bullet_points = ?, image_url = ?, target_url = ?, cta_text = ?, is_active = ?, updated_at = ?
       WHERE id = ?`,
      [
        slot_label,
        ad_type,
        ad_size || 'responsive',
        code_or_title || null,
        description || null,
        JSON.stringify(bullet_points || []),
        image_url || null,
        target_url || null,
        cta_text || 'Explore Now',
        is_active ? 1 : 0,
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

export async function DELETE(req: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await dbExecute('DELETE FROM ad_slots WHERE id = ?', [id]);
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
