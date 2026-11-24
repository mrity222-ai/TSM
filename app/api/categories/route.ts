import { NextRequest, NextResponse } from 'next/server';
import { getAllCategories, dbExecute } from '@/lib/db';
import crypto from 'crypto';

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, description } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    await dbExecute(
      'INSERT INTO categories (id, name, slug, description) VALUES (?, ?, ?, ?)',
      [id, name.trim(), slug.trim(), description?.trim() || null]
    );

    return NextResponse.json({ id, name, slug, description }, { status: 201 });
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

    await dbExecute('DELETE FROM categories WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
