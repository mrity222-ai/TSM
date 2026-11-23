import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { Article, Category, AdSlot, NavItem } from '../types/database';

// Ensure data directory exists
const dbDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'thestocktimes.db');

// Global singleton pattern to prevent multiple connections during Next.js hot reload
declare global {
  // eslint-disable-next-line no-var
  var __stocktimes_db: DatabaseSync | undefined;
}

function getDatabase(): DatabaseSync {
  if (!global.__stocktimes_db) {
    const db = new DatabaseSync(dbPath);
    try {
      db.exec('PRAGMA busy_timeout = 30000;');
      db.exec('PRAGMA journal_mode = WAL;');
    } catch {
      // Pragmas may already be active or locked by another worker
    }
    initTables(db);
    global.__stocktimes_db = db;
  }
  return global.__stocktimes_db;
}

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(`stocktimes_salt_${password}`).digest('hex');
}

function initTables(db: DatabaseSync) {
  // Fast path: if tables are already created and seeded, skip all write operations to avoid lock contention
  try {
    const tableCheck = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='site_navigation'").get();
    if (tableCheck) {
      return;
    }
  } catch {
    // Proceed to initialize
  }

  // 1. Categories Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT
    );
  `);

  // 2. Articles Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      key_takeaways TEXT,
      content TEXT NOT NULL,
      category_id TEXT,
      author_name TEXT DEFAULT 'The Stock Times Editorial Desk',
      author_role TEXT DEFAULT 'Global Markets & Equity Research',
      is_featured INTEGER DEFAULT 0,
      featured_image TEXT,
      image_alt TEXT,
      entity_tags TEXT,
      source_citation TEXT,
      direct_answer TEXT,
      faqs TEXT,
      focus_keyword TEXT,
      seo_title TEXT,
      seo_description TEXT,
      canonical_url TEXT,
      affiliate_title TEXT,
      affiliate_url TEXT,
      affiliate_cta TEXT,
      status TEXT CHECK(status IN ('draft', 'published')) DEFAULT 'draft',
      views INTEGER DEFAULT 0,
      published_at TEXT,
      updated_at TEXT,
      created_at TEXT,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    );
  `);

  // Safe migrations for newly added columns in existing articles table
  const tryAddCol = (colDef: string) => {
    try {
      db.exec(`ALTER TABLE articles ADD COLUMN ${colDef}`);
    } catch {
      // Column already exists or added concurrently by parallel build worker
    }
  };

  tryAddCol("author_role TEXT DEFAULT 'Global Markets & Equity Research'");
  tryAddCol('is_featured INTEGER DEFAULT 0');
  tryAddCol('entity_tags TEXT');
  tryAddCol('direct_answer TEXT');
  tryAddCol('focus_keyword TEXT');
  tryAddCol('canonical_url TEXT');

  // 3. Ad Slots Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS ad_slots (
      id TEXT PRIMARY KEY,
      slot_key TEXT UNIQUE NOT NULL,
      slot_label TEXT NOT NULL,
      ad_type TEXT CHECK(ad_type IN ('adsense', 'inhouse_banner', 'affiliate_card', 'custom_banner')) DEFAULT 'inhouse_banner',
      ad_size TEXT DEFAULT 'responsive',
      code_or_title TEXT,
      description TEXT,
      bullet_points TEXT,
      image_url TEXT,
      target_url TEXT,
      cta_text TEXT DEFAULT 'Explore Now',
      is_active INTEGER DEFAULT 1,
      updated_at TEXT
    );
  `);

  // Safe migrations for newly added columns in existing ad_slots table
  const tryAddAdCol = (colDef: string) => {
    try {
      db.exec(`ALTER TABLE ad_slots ADD COLUMN ${colDef}`);
    } catch {
      // Column already exists or added concurrently
    }
  };
  tryAddAdCol("ad_size TEXT DEFAULT 'responsive'");
  tryAddAdCol('bullet_points TEXT');

  // 4. Admin Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT
    );
  `);

  // 5. Site Navigation & Tools Ordering Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_navigation (
      id TEXT PRIMARY KEY,
      section_type TEXT NOT NULL CHECK (section_type IN ('navbar', 'tools')),
      label TEXT NOT NULL,
      href TEXT NOT NULL,
      badge_text TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // Seed default categories if empty
  const catCount = db.prepare('SELECT count(*) as count FROM categories').get() as { count: number };
  if (catCount.count === 0) {
    const insertCat = db.prepare('INSERT OR IGNORE INTO categories (id, name, slug, description) VALUES (?, ?, ?, ?)');
    insertCat.run(crypto.randomUUID(), 'Global Markets', 'global-markets', 'Wall Street, Asian indices, and international equity trends.');
    insertCat.run(crypto.randomUUID(), 'Tech & AI Stocks', 'tech-ai-stocks', 'Deep dives into semiconductor, cloud, and generative AI corporate equities.');
    insertCat.run(crypto.randomUUID(), 'Crypto & Fintech', 'crypto-fintech', 'Bitcoin, stablecoins, tokenized assets, and neobanking developments.');
    insertCat.run(crypto.randomUUID(), 'Economy & Policy', 'economy-policy', 'Central bank interest rates, inflation indicators, and macro policies.');
  }

  // Seed default ad slots if empty
  const adCount = db.prepare('SELECT count(*) as count FROM ad_slots').get() as { count: number };
  if (adCount.count === 0) {
    const insertAd = db.prepare(`
      INSERT OR IGNORE INTO ad_slots (id, slot_key, slot_label, ad_type, code_or_title, description, image_url, target_url, cta_text, is_active, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const now = new Date().toISOString();
    insertAd.run(crypto.randomUUID(), 'header_banner', '1. Homepage Top Leaderboard (Below Ticker)', 'affiliate_card', 'Zero-Brokerage Demat Account', 'Trade stocks and F&O with top licensed brokers.', null, 'https://thestocktimes.online', 'Open Account', 1, now);
    insertAd.run(crypto.randomUUID(), 'in_article_para_2', 'In-Article Slot 1 (Post Intro)', 'affiliate_card', 'Automate Your Trading Strategy', 'Discover institutional-grade charting and screener tools.', null, 'https://thestocktimes.online', 'Start Free Trial', 1, now);
    insertAd.run(crypto.randomUUID(), 'before_faq', 'In-Article Slot 2 (Before FAQs)', 'inhouse_banner', 'Sponsored Market Insight', null, null, 'https://thestocktimes.online', 'Learn More', 0, now);
    insertAd.run(crypto.randomUUID(), 'sidebar_sticky', '3. Sticky Sidebar Box (300x250)', 'affiliate_card', 'Institutional Research Terminal', 'Get real-time news alerts and earnings forecasts.', null, 'https://thestocktimes.online', 'Claim Discount', 1, now);
  }

  // Safe migration to ensure ad slots exist
  const ensureAdSlot = (
    key: string,
    label: string,
    adType: 'inhouse_banner' | 'adsense' | 'affiliate_card',
    adSize: string,
    title: string | null,
    desc: string | null,
    bullets: string[] | null,
    cta: string,
    isActive: number,
    imageUrl?: string | null,
    targetUrl?: string | null
  ) => {
    try {
      const existing = db.prepare('SELECT id FROM ad_slots WHERE slot_key = ?').get(key);
      if (!existing) {
        db.prepare(`
          INSERT INTO ad_slots (id, slot_key, slot_label, ad_type, ad_size, code_or_title, description, bullet_points, image_url, target_url, cta_text, is_active, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `).run(
          crypto.randomUUID(),
          key,
          label,
          adType,
          adSize,
          title,
          desc,
          bullets ? JSON.stringify(bullets) : null,
          imageUrl || null,
          targetUrl || 'https://thestocktimes.online',
          cta,
          isActive
        );
      }
    } catch {
      // Ignore
    }
  };

  // Register all 21 Strategic Ad Slots across the 4 core page templates
  // 1. Homepage (6 Slots)
  ensureAdSlot('home_top_banner', 'Home 1: Top Leaderboard (Below Ticker)', 'inhouse_banner', '728x90', 'Zero-Brokerage Demat Account', 'Trade stocks and F&O with top licensed brokers.', ['Zero Account Opening Fee', 'Free TradingView Charts', 'Instant UPI Deposits'], 'Open Account', 1);
  ensureAdSlot('home_mid_banner', 'Home 2: Below Bento Hero', 'inhouse_banner', 'responsive', 'Open a Zero-Brokerage Trading & Demat Account', 'Start investing in US & Indian equities with institutional-grade charts.', ['Zero Account Opening Fee', 'Free TradingView Charts', 'Instant UPI Deposits'], 'Open Free Account', 1);
  ensureAdSlot('home_tools_below', 'Home 3: Below Calculators Strip', 'adsense', '728x90', '', null, null, 'Explore', 0);
  ensureAdSlot('home_feed_mid', 'Home 4: Inside Latest Market Coverage', 'adsense', 'responsive', '', null, null, 'Learn More', 0);
  ensureAdSlot('home_sidebar_sticky', 'Home 5: Sticky Sidebar Box (300x250)', 'inhouse_banner', '300x250', 'Institutional Research Terminal', 'Get real-time news alerts and earnings forecasts.', ['Live Screener Alerts', 'Consensus Analyst Price Targets', 'AI Sentiment Tracker'], 'Claim Discount', 1);
  ensureAdSlot('home_footer_banner', 'Home 6: Bottom Footer Leaderboard', 'inhouse_banner', '728x90', 'Institutional Market Intelligence', 'Subscribe to daily pre-market equity briefs and stock alerts.', null, 'Explore Insights', 1);

  // 2. Article Reading Page / Blog Details (5 Slots)
  ensureAdSlot('article_top_banner', 'Article 1: Top Leaderboard (Above Title)', 'adsense', '728x90', '', null, null, 'Learn More', 0);
  ensureAdSlot('article_para_2', 'Article 2: After Key Takeaways / Intro', 'adsense', 'responsive', '', null, null, 'Explore', 0);
  ensureAdSlot('article_mid_body', 'Article 3: Mid-Article Content Slot', 'inhouse_banner', 'responsive', 'Track Live Stock Charts with TradingView', 'Institutional-grade charting and screener tools for modern investors.', ['Advanced Technical Indicators', 'Real-Time Market Heatmaps', 'Multi-Asset Watchlists'], 'Try Free', 1);
  ensureAdSlot('article_before_faq', 'Article 4: End of Article (Before FAQs)', 'adsense', 'responsive', '', null, null, 'Learn More', 0);
  ensureAdSlot('article_sidebar_sticky', 'Article 5: Sticky Right Sidebar (300x250)', 'inhouse_banner', '300x250', 'Institutional Research Terminal', 'Get real-time news alerts and earnings forecasts.', ['Live Screener Alerts', 'Consensus Analyst Price Targets'], 'Explore Terminal', 1);

  // 3. Financial Tools / Calculators Page (5 Slots)
  ensureAdSlot('tool_top_banner', 'Tools 1: Top Leaderboard (Above Calculator)', 'adsense', '728x90', '', null, null, 'Learn More', 0);
  ensureAdSlot('tool_below_result', 'Tools 2: Below Result & Chart Box', 'inhouse_banner', 'responsive', 'Start Your SIP with Zero Commission', 'Invest in top-rated direct mutual funds and equity baskets with zero hidden charges.', ['0% Brokerage on Mutual Funds', 'Automated Daily/Monthly SIPs', 'Instant Portfolio Rebalancing'], 'Invest Now', 1);
  ensureAdSlot('tool_before_guide', 'Tools 3: Above Formula & Guide Section', 'adsense', 'responsive', '', null, null, 'Learn More', 0);
  ensureAdSlot('tool_sidebar_sticky', 'Tools 4: Sticky Sidebar Box (300x250)', 'inhouse_banner', '300x250', 'Automate Your Wealth Strategy', 'Connect with verified portfolio managers and algorithmic models.', null, 'Explore Wealth', 1);
  ensureAdSlot('tool_footer_banner', 'Tools 5: Bottom Footer Leaderboard', 'adsense', '728x90', '', null, null, 'Learn More', 0);

  // 4. Category / Blogs Listing Page (5 Slots)
  ensureAdSlot('cat_top_banner', 'Category 1: Top Leaderboard', 'adsense', '728x90', '', null, null, 'Learn More', 0);
  ensureAdSlot('cat_row_1_below', 'Category 2: After First 3 Articles', 'adsense', 'responsive', '', null, null, 'Learn More', 0);
  ensureAdSlot('cat_row_2_below', 'Category 3: After 6 Articles', 'inhouse_banner', 'responsive', 'Get Daily IPO & Stock Alerts', 'Get instant WhatsApp and email notifications on upcoming IPOs and breakout stocks.', ['Pre-IPO Valuations', 'Grey Market Premium (GMP)', 'Listing Day Strategies'], 'Join Free', 1);
  ensureAdSlot('cat_sidebar_sticky', 'Category 4: Sticky Sidebar Box (300x250)', 'inhouse_banner', '300x250', 'Institutional Research Terminal', 'Access in-depth market research and sector coverage.', null, 'Get Free Access', 1);
  ensureAdSlot('cat_footer_banner', 'Category 5: Bottom Footer Leaderboard', 'adsense', '728x90', '', null, null, 'Learn More', 0);

  // 5. Native Sponsored Grid Slots (3 Slots for NativeSponsoredGrid)
  ensureAdSlot(
    'native_partner_1',
    'Native Sponsored 1: Demat & US Stocks Account',
    'inhouse_banner',
    'responsive',
    'Zero-Brokerage Demat & US Stocks Account for Indian Investors',
    'Open a free trading account in 5 minutes with instant UPI deposits & live TradingView charts.',
    null,
    'Open Account',
    1,
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    '/tools/sip-calculator'
  );
  ensureAdSlot(
    'native_partner_2',
    'Native Sponsored 2: SIP Wealth Corpus Calculator',
    'inhouse_banner',
    'responsive',
    'Calculate Your 10-Year Mutual Fund SIP Wealth Corpus Instantly',
    'Compare monthly SIP vs Lumpsum compounding returns and plan your financial freedom goal.',
    null,
    'Learn More',
    1,
    'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80',
    '/tools/sip-calculator'
  );
  ensureAdSlot(
    'native_partner_3',
    'Native Sponsored 3: Income Tax & 80C Savings',
    'inhouse_banner',
    'responsive',
    'Save Up to ₹46,800 in Taxes Under New Regime & Section 80C',
    'Estimate your exact FY 2026-27 tax liability and compare PPF, ELSS & NPS tax deductions.',
    null,
    'Learn More',
    1,
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    '/tools/income-tax-calculator'
  );

  // Legacy mappings fallback
  ensureAdSlot('header_banner', 'Legacy Header Banner', 'inhouse_banner', '728x90', 'Zero-Brokerage Demat Account', 'Trade stocks and F&O with top licensed brokers.', null, 'Open Account', 1);
  ensureAdSlot('sidebar_sticky', 'Legacy Sidebar Sticky', 'inhouse_banner', '300x250', 'Institutional Research Terminal', null, null, 'Claim Discount', 1);
  ensureAdSlot('in_article_para_2', 'Legacy In-Article Para 2', 'inhouse_banner', 'responsive', 'Automate Your Trading Strategy', null, null, 'Start Free Trial', 1);

  // Seed default admin if empty
  const adminCount = db.prepare('SELECT count(*) as count FROM admins').get() as { count: number };
  if (adminCount.count === 0) {
    const insertAdmin = db.prepare('INSERT OR IGNORE INTO admins (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)');
    insertAdmin.run(
      crypto.randomUUID(),
      'admin@thestocktimes.online',
      hashPassword('Admin@123'),
      new Date().toISOString()
    );
  }

  // Seed default site navigation & tools if empty
  const navCount = db.prepare('SELECT count(*) as count FROM site_navigation').get() as { count: number };
  if (navCount.count === 0) {
    const insertNav = db.prepare(`
      INSERT OR IGNORE INTO site_navigation (id, section_type, label, href, badge_text, sort_order, is_active, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);
    // Seed default navbar items
    insertNav.run(crypto.randomUUID(), 'navbar', 'HOME', '/', null, 1, 1);
    insertNav.run(crypto.randomUUID(), 'navbar', 'STOCK MARKET', '/global-markets', null, 2, 1);
    insertNav.run(crypto.randomUUID(), 'navbar', 'TECH & AI', '/tech-ai-stocks', null, 3, 1);
    insertNav.run(crypto.randomUUID(), 'navbar', 'CRYPTO & FINTECH', '/crypto-fintech', null, 4, 1);
    insertNav.run(crypto.randomUUID(), 'navbar', 'ECONOMY', '/economy-policy', null, 5, 1);
    insertNav.run(crypto.randomUUID(), 'navbar', 'TOOLS & CALCULATORS', '/tools', null, 6, 1);

    // Seed default tools ordering
    insertNav.run(crypto.randomUUID(), 'tools', 'SIP Calculator', '/tools/sip-calculator', 'Investing', 1, 1);
    insertNav.run(crypto.randomUUID(), 'tools', 'Compound Interest', '/tools/compound-interest-calculator', 'Investing', 2, 1);
    insertNav.run(crypto.randomUUID(), 'tools', 'Stock Average Calculator', '/tools/stock-average-calculator', 'Trading', 3, 1);
    insertNav.run(crypto.randomUUID(), 'tools', 'EMI Calculator', '/tools/emi-calculator', 'Loans & Planning', 4, 1);
    insertNav.run(crypto.randomUUID(), 'tools', 'Dividend Calculator', '/tools/dividend-calculator', 'Investing', 5, 1);
    insertNav.run(crypto.randomUUID(), 'tools', 'Retirement Calculator', '/tools/retirement-calculator', 'Loans & Planning', 6, 1);
  }

  // Safe migration to update any existing /category/ URLs in navigation to clean root URLs
  try {
    db.exec("UPDATE site_navigation SET href = REPLACE(href, '/category/', '/') WHERE href LIKE '/category/%';");
  } catch {
    // Ignore
  }
}

export const db = getDatabase();
export const getDb = () => db;

// ----------------- Helper Functions -----------------

function parseArticle(row: any): Article {
  if (!row) return row;
  let parsedEntityTags: string[] = [];
  if (row.entity_tags) {
    try {
      if (typeof row.entity_tags === 'string' && row.entity_tags.startsWith('[')) {
        parsedEntityTags = JSON.parse(row.entity_tags);
      } else if (typeof row.entity_tags === 'string') {
        parsedEntityTags = row.entity_tags.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
    } catch {
      parsedEntityTags = [];
    }
  }

  return {
    ...row,
    key_takeaways: row.key_takeaways ? JSON.parse(row.key_takeaways) : [],
    faqs: row.faqs ? JSON.parse(row.faqs) : [],
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

export function getAllArticles(status?: string, search?: string): Article[] {
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
  const rows = db.prepare(query).all(...params);
  return rows.map(parseArticle);
}

export function getArticleBySlug(slug: string): Article | null {
  const row = db.prepare(`
    SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.slug = ?
  `).get(slug);

  return row ? parseArticle(row) : null;
}

export function getArticleById(id: string): Article | null {
  const row = db.prepare(`
    SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.id = ?
  `).get(id);

  return row ? parseArticle(row) : null;
}

export function getArticlesByCategory(categorySlug: string): { category: Category | null; articles: Article[] } {
  const category = db.prepare('SELECT * FROM categories WHERE slug = ?').get(categorySlug) as unknown as Category | undefined;
  if (!category) return { category: null, articles: [] };

  const rows = db.prepare(`
    SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.category_id = ? AND a.status = 'published'
    ORDER BY a.published_at DESC
  `).all(category.id) as unknown as any[];

  return { category, articles: rows.map(parseArticle) };
}

export function getCategoryBySlug(slug: string): Category | null {
  const row = db.prepare('SELECT * FROM categories WHERE slug = ?').get(slug) as unknown as Category | undefined;
  return row || null;
}

export function getArticleByCategoryAndSlug(categorySlug: string, articleSlug: string): Article | null {
  const row = db.prepare(`
    SELECT a.*, c.name as category_name, c.slug as category_slug, c.description as category_description
    FROM articles a
    INNER JOIN categories c ON a.category_id = c.id
    WHERE a.slug = ? AND c.slug = ? AND a.status = 'published'
  `).get(articleSlug, categorySlug);

  return row ? parseArticle(row) : null;
}

export function getAllCategories(): Category[] {
  return db.prepare('SELECT * FROM categories ORDER BY name ASC').all() as unknown as Category[];
}

function parseAdSlot(row: any): AdSlot {
  if (!row) return row;
  let parsedBullets: string[] = [];
  if (row.bullet_points) {
    try {
      if (typeof row.bullet_points === 'string' && row.bullet_points.startsWith('[')) {
        parsedBullets = JSON.parse(row.bullet_points);
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

export function getAdSlot(slotKey: string): AdSlot | null {
  const row = db.prepare('SELECT * FROM ad_slots WHERE slot_key = ? AND is_active = 1').get(slotKey) as any;
  if (!row) return null;
  return parseAdSlot(row);
}

export function getAllAdSlots(): AdSlot[] {
  const rows = db.prepare('SELECT * FROM ad_slots ORDER BY slot_key ASC').all() as any[];
  return rows.map(parseAdSlot);
}

// ----------------- Site Navigation Helper Functions -----------------

export function getNavigationItems(sectionType?: string, onlyActive = true): NavItem[] {
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

  query += ' ORDER BY sort_order ASC, created_at ASC';
  const rows = db.prepare(query).all(...params) as any[];
  return rows.map((r) => ({
    ...r,
    is_active: Boolean(r.is_active),
  }));
}

export function getAllNavigationItems(): NavItem[] {
  return getNavigationItems('all', false);
}

export function updateNavItem(id: string, updates: Partial<NavItem>): void {
  const fields: string[] = [];
  const params: any[] = [];

  if (updates.label !== undefined) {
    fields.push('label = ?');
    params.push(updates.label);
  }
  if (updates.href !== undefined) {
    fields.push('href = ?');
    params.push(updates.href);
  }
  if (updates.badge_text !== undefined) {
    fields.push('badge_text = ?');
    params.push(updates.badge_text);
  }
  if (updates.sort_order !== undefined) {
    fields.push('sort_order = ?');
    params.push(updates.sort_order);
  }
  if (updates.is_active !== undefined) {
    fields.push('is_active = ?');
    params.push(updates.is_active ? 1 : 0);
  }

  if (fields.length === 0) return;

  params.push(id);
  db.prepare(`UPDATE site_navigation SET ${fields.join(', ')} WHERE id = ?`).run(...params);
}

export function reorderNavItems(items: { id: string; sort_order: number }[]): void {
  const stmt = db.prepare('UPDATE site_navigation SET sort_order = ? WHERE id = ?');
  db.exec('BEGIN TRANSACTION;');
  try {
    for (const item of items) {
      stmt.run(item.sort_order, item.id);
    }
    db.exec('COMMIT;');
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }
}

export function insertNavItem(item: {
  section_type: 'navbar' | 'tools';
  label: string;
  href: string;
  badge_text?: string | null;
  sort_order?: number;
  is_active?: boolean;
}): string {
  const id = crypto.randomUUID();
  const sortOrder = item.sort_order ?? 99;
  const isActive = item.is_active === false ? 0 : 1;

  db.prepare(`
    INSERT INTO site_navigation (id, section_type, label, href, badge_text, sort_order, is_active, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).run(id, item.section_type, item.label, item.href, item.badge_text || null, sortOrder, isActive);

  return id;
}

export function deleteNavItem(id: string): void {
  db.prepare('DELETE FROM site_navigation WHERE id = ?').run(id);
}
