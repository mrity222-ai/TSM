import { DatabaseSync } from 'node:sqlite';
import mysql, { Pool } from 'mysql2/promise';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Article, Category, AdSlot, NavItem } from '../types/database';

// Global singletons to prevent multiple connections during Next.js hot-reloading & serverless invocations
declare global {
  // eslint-disable-next-line no-var
  var __stocktimes_sqlite_db: DatabaseSync | undefined;
  // eslint-disable-next-line no-var
  var __stocktimes_mysql_pool: Pool | undefined;
}

// Ensure local data directory exists for SQLite fallback
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(dbDir, 'thestocktimes.db');

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(`stocktimes_salt_${password}`).digest('hex');
}

/**
 * Get or initialize MySQL connection pool if DB_HOST is set
 */
export function getMySQLPool(): Pool | null {
  if (!process.env.DB_HOST) {
    return null;
  }

  if (!global.__stocktimes_mysql_pool) {
    global.__stocktimes_mysql_pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      maxIdle: 2,
      idleTimeout: 60000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      connectTimeout: 10000,
    });
  }

  return global.__stocktimes_mysql_pool;
}

/**
 * Get or initialize SQLite database for local fallback
 */
export function getSQLiteDatabase(): DatabaseSync {
  if (!global.__stocktimes_sqlite_db) {
    const db = new DatabaseSync(dbPath);
    try {
      db.exec('PRAGMA busy_timeout = 30000;');
      db.exec('PRAGMA journal_mode = WAL;');
    } catch {
      // Ignored if busy
    }
    global.__stocktimes_sqlite_db = db;
  }
  return global.__stocktimes_sqlite_db;
}

// Backward compatibility
export const getDb = () => getSQLiteDatabase();
export const db = getSQLiteDatabase();

/**
 * Universal Query Runner (Runs on MySQL when DB_HOST is configured, else SQLite)
 */
export async function dbQuery<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  const pool = getMySQLPool();
  if (pool) {
    try {
      const [rows] = await pool.query(sql, params);
      return (rows || []) as T[];
    } catch (err: any) {
      console.error('MySQL query error:', err.message);
      // Fallback to SQLite if MySQL network hiccups during local dev
      try {
        return getSQLiteDatabase().prepare(sql).all(...params) as T[];
      } catch {
        return [];
      }
    }
  }

  try {
    return getSQLiteDatabase().prepare(sql).all(...params) as T[];
  } catch (err: any) {
    console.error('SQLite query error:', err.message);
    return [];
  }
}

/**
 * Universal Query One Runner (Returns single record or null)
 */
export async function dbQueryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const pool = getMySQLPool();
  if (pool) {
    try {
      const [rows] = await pool.query(sql, params) as any[];
      if (rows && rows.length > 0) {
        return rows[0] as T;
      }
      return null;
    } catch (err: any) {
      console.error('MySQL queryOne error:', err.message);
      try {
        const row = getSQLiteDatabase().prepare(sql).get(...params);
        return (row as T) || null;
      } catch {
        return null;
      }
    }
  }

  try {
    const row = getSQLiteDatabase().prepare(sql).get(...params);
    return (row as T) || null;
  } catch (err: any) {
    console.error('SQLite queryOne error:', err.message);
    return null;
  }
}

/**
 * Universal Execute Runner (For INSERT, UPDATE, DELETE)
 */
export async function dbExecute(sql: string, params: any[] = []): Promise<any> {
  const pool = getMySQLPool();
  if (pool) {
    const [result] = await pool.execute(sql, params);
    return result;
  }
  return getSQLiteDatabase().prepare(sql).run(...params);
}

// ----------------- Parsers & Helpers -----------------

export function parseArticle(row: any): Article {
  if (!row) return row;
  let parsedEntityTags: string[] = [];
  if (row.entity_tags) {
    try {
      if (typeof row.entity_tags === 'string' && row.entity_tags.startsWith('[')) {
        parsedEntityTags = JSON.parse(row.entity_tags);
      } else if (Array.isArray(row.entity_tags)) {
        parsedEntityTags = row.entity_tags;
      } else if (typeof row.entity_tags === 'string') {
        parsedEntityTags = row.entity_tags.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
    } catch {
      parsedEntityTags = [];
    }
  }

  let keyTakeaways: string[] = [];
  if (row.key_takeaways) {
    try {
      keyTakeaways = typeof row.key_takeaways === 'string' ? JSON.parse(row.key_takeaways) : row.key_takeaways;
    } catch {
      keyTakeaways = [];
    }
  }

  let faqs: any[] = [];
  if (row.faqs) {
    try {
      faqs = typeof row.faqs === 'string' ? JSON.parse(row.faqs) : row.faqs;
    } catch {
      faqs = [];
    }
  }

  return {
    ...row,
    key_takeaways: Array.isArray(keyTakeaways) ? keyTakeaways : [],
    faqs: Array.isArray(faqs) ? faqs : [],
    entity_tags: parsedEntityTags,
    is_featured: Boolean(row.is_featured),
    categories: row.category_name ? {
      id: row.category_id,
      name: row.category_name,
      slug: row.category_slug,
      description: row.category_description || null
    } : undefined
  };
}

export function parseAdSlot(row: any): AdSlot {
  if (!row) return row;
  let parsedBullets: string[] = [];
  if (row.bullet_points) {
    try {
      if (typeof row.bullet_points === 'string' && row.bullet_points.startsWith('[')) {
        parsedBullets = JSON.parse(row.bullet_points);
      } else if (Array.isArray(row.bullet_points)) {
        parsedBullets = row.bullet_points;
      } else if (typeof row.bullet_points === 'string') {
        parsedBullets = row.bullet_points.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
    } catch {
      parsedBullets = [];
    }
  }

  return {
    ...row,
    ad_size: row.ad_size || 'responsive',
    bullet_points: parsedBullets,
    is_active: Boolean(row.is_active),
  };
}

// ----------------- Public Data Functions -----------------

export async function getAllArticles(status?: string, search?: string): Promise<Article[]> {
  let query = `
    SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
  `;
  const conditions: string[] = [];
  const params: any[] = [];

  if (status) {
    conditions.push('a.status = ?');
    params.push(status);
  }
  if (search && search.trim() !== '') {
    conditions.push('(a.title LIKE ? OR a.content LIKE ? OR a.seo_description LIKE ?)');
    const term = `%${search.trim()}%`;
    params.push(term, term, term);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY a.published_at DESC, a.created_at DESC';
  const rows = await dbQuery(query, params);
  return rows.map(parseArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const row = await dbQueryOne(`
    SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.slug = ?
  `, [slug]);

  return row ? parseArticle(row) : null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const row = await dbQueryOne(`
    SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.id = ?
  `, [id]);

  return row ? parseArticle(row) : null;
}

export async function getArticlesByCategory(categorySlug: string): Promise<{ category: Category | null; articles: Article[] }> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return { category: null, articles: [] };

  const rows = await dbQuery(`
    SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.category_id = ? AND a.status = 'published'
    ORDER BY a.published_at DESC
  `, [category.id]);

  return { category, articles: rows.map(parseArticle) };
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const row = await dbQueryOne('SELECT * FROM categories WHERE slug = ?', [slug]);
  return row || null;
}

export async function getArticleByCategoryAndSlug(categorySlug: string, articleSlug: string): Promise<Article | null> {
  const row = await dbQueryOne(`
    SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description
    FROM articles a
    INNER JOIN categories c ON a.category_id = c.id
    WHERE a.slug = ? AND c.slug = ? AND a.status = 'published'
  `, [articleSlug, categorySlug]);

  return row ? parseArticle(row) : null;
}

export async function getAllCategories(): Promise<Category[]> {
  const rows = await dbQuery('SELECT * FROM categories ORDER BY name ASC');
  return rows as Category[];
}

export async function getAdSlot(slotKey: string): Promise<AdSlot | null> {
  const row = await dbQueryOne('SELECT * FROM ad_slots WHERE slot_key = ? AND is_active = 1', [slotKey]);
  if (!row) return null;
  return parseAdSlot(row);
}

export async function getAllAdSlots(): Promise<AdSlot[]> {
  const rows = await dbQuery('SELECT * FROM ad_slots ORDER BY slot_key ASC');
  return rows.map(parseAdSlot);
}

export async function getNavigationItems(sectionType?: string, onlyActive = true): Promise<NavItem[]> {
  let query = 'SELECT * FROM site_navigation';
  const conditions: string[] = [];
  const params: any[] = [];

  if (sectionType && sectionType !== 'all') {
    conditions.push('section_type = ?');
    params.push(sectionType);
  }
  if (onlyActive) {
    conditions.push('is_active = 1');
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY sort_order ASC, label ASC';
  const rows = await dbQuery(query, params);
  return rows.map((r: any) => ({
    ...r,
    is_active: Boolean(r.is_active),
  }));
}

export async function getAllNavigationItems(): Promise<NavItem[]> {
  return getNavigationItems('all', false);
}

export async function insertNavItem(item: {
  section_type: 'navbar' | 'tools';
  label: string;
  href: string;
  badge_text?: string | null;
  sort_order?: number;
  is_active?: boolean;
}): Promise<string> {
  const id = crypto.randomUUID();
  await dbExecute(
    `INSERT INTO site_navigation (id, section_type, label, href, badge_text, sort_order, is_active, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
    [
      id,
      item.section_type,
      item.label,
      item.href,
      item.badge_text || null,
      item.sort_order ?? 0,
      item.is_active === false ? 0 : 1,
    ]
  );
  return id;
}

export async function updateNavItem(
  id: string,
  updates: Partial<Omit<NavItem, 'id' | 'section_type' | 'created_at'>>
): Promise<void> {
  const sets: string[] = [];
  const params: any[] = [];

  if (updates.label !== undefined) {
    sets.push('label = ?');
    params.push(updates.label);
  }
  if (updates.href !== undefined) {
    sets.push('href = ?');
    params.push(updates.href);
  }
  if (updates.badge_text !== undefined) {
    sets.push('badge_text = ?');
    params.push(updates.badge_text);
  }
  if (updates.sort_order !== undefined) {
    sets.push('sort_order = ?');
    params.push(updates.sort_order);
  }
  if (updates.is_active !== undefined) {
    sets.push('is_active = ?');
    params.push(updates.is_active ? 1 : 0);
  }

  if (sets.length === 0) return;

  params.push(id);
  await dbExecute(`UPDATE site_navigation SET ${sets.join(', ')} WHERE id = ?`, params);
}

export async function reorderNavItems(
  items: { id: string; sort_order: number }[]
): Promise<void> {
  for (const item of items) {
    await dbExecute('UPDATE site_navigation SET sort_order = ? WHERE id = ?', [
      item.sort_order,
      item.id,
    ]);
  }
}

export async function deleteNavItem(id: string): Promise<void> {
  await dbExecute('DELETE FROM site_navigation WHERE id = ?', [id]);
}
