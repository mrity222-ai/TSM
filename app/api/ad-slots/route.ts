import { NextRequest, NextResponse } from 'next/server';
import { db, getAllAdSlots } from '@/lib/db';
import crypto from 'crypto';

export async function GET() {
  try {
    const slots = getAllAdSlots();
    return NextResponse.json(slots);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slot_label, slot_key, ad_type, ad_size, bullet_points, is_active } = body;

    if (!slot_label || !slot_key) {
      return NextResponse.json({ error: 'Slot label and key are required' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const stmt = db.prepare(`
      INSERT INTO ad_slots (id, slot_label, slot_key, ad_type, ad_size, bullet_points, is_active, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      id,
      slot_label.trim(),
      slot_key.trim(),
      ad_type || 'inhouse_banner',
      ad_size || 'responsive',
      JSON.stringify(bullet_points || []),
      is_active ? 1 : 0,
      now
    );

    return NextResponse.json({ id, slot_label, slot_key, ad_type, ad_size, is_active }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
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
    const stmt = db.prepare(`
      UPDATE ad_slots
      SET slot_label = ?, ad_type = ?, ad_size = ?, code_or_title = ?, description = ?, bullet_points = ?, image_url = ?, target_url = ?, cta_text = ?, is_active = ?, updated_at = ?
      WHERE id = ?
    `);
    stmt.run(
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
      id
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    db.prepare('DELETE FROM ad_slots WHERE id = ?').run(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
