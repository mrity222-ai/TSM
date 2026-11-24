const { DatabaseSync } = require('node:sqlite');
const fs = require('fs');

const db = new DatabaseSync('data/thestocktimes.db');

function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') return val;
  if (typeof val === 'boolean') return val ? 1 : 0;
  return "'" + String(val).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n').replace(/\r/g, '\\r') + "'";
}

let sql = `-- The Stock Times (thestocktimes.online) MySQL Database Dump
-- Generated on: ${new Date().toISOString()}
-- Target Database: u784817558_tsm

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Drop child tables before parent tables to prevent foreign key errors
-- --------------------------------------------------------
DROP TABLE IF EXISTS \`articles\`;
DROP TABLE IF EXISTS \`categories\`;
DROP TABLE IF EXISTS \`ad_slots\`;
DROP TABLE IF EXISTS \`admins\`;
DROP TABLE IF EXISTS \`site_navigation\`;

-- --------------------------------------------------------
-- 1. Table structure for table \`categories\`
-- --------------------------------------------------------
CREATE TABLE \`categories\` (
  \`id\` varchar(64) NOT NULL,
  \`name\` varchar(100) NOT NULL,
  \`slug\` varchar(100) NOT NULL,
  \`description\` text,
  \`sort_order\` int DEFAULT 0,
  \`created_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`slug_unique\` (\`slug\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Table structure for table \`articles\` (Exact Match)
-- --------------------------------------------------------
CREATE TABLE \`articles\` (
  \`id\` varchar(64) NOT NULL,
  \`title\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL,
  \`key_takeaways\` json,
  \`content\` longtext NOT NULL,
  \`category_id\` varchar(64) DEFAULT NULL,
  \`author_name\` varchar(100) DEFAULT 'The Stock Times Editorial Desk',
  \`featured_image\` varchar(500),
  \`image_alt\` varchar(255),
  \`faqs\` json,
  \`affiliate_title\` varchar(255),
  \`affiliate_url\` varchar(500),
  \`affiliate_cta\` varchar(100),
  \`source_citation\` varchar(255),
  \`seo_title\` varchar(255),
  \`seo_description\` text,
  \`status\` varchar(20) DEFAULT 'published',
  \`views\` int DEFAULT 0,
  \`published_at\` datetime,
  \`updated_at\` datetime,
  \`created_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  \`author_role\` varchar(100) DEFAULT 'Global Markets & Equity Research',
  \`is_featured\` tinyint(1) DEFAULT 0,
  \`entity_tags\` json,
  \`direct_answer\` text,
  \`focus_keyword\` varchar(150),
  \`canonical_url\` varchar(500),
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`art_slug_unique\` (\`slug\`),
  KEY \`cat_id_idx\` (\`category_id\`),
  CONSTRAINT \`fk_articles_category\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\` (\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Table structure for table \`ad_slots\`
-- --------------------------------------------------------
CREATE TABLE \`ad_slots\` (
  \`id\` varchar(64) NOT NULL,
  \`slot_key\` varchar(64) NOT NULL,
  \`slot_label\` varchar(100) NOT NULL,
  \`ad_type\` varchar(32) DEFAULT 'inhouse_banner',
  \`code_or_title\` varchar(255),
  \`description\` text,
  \`image_url\` varchar(500),
  \`target_url\` varchar(500),
  \`cta_text\` varchar(50) DEFAULT 'Explore Now',
  \`is_active\` tinyint(1) DEFAULT 0,
  \`ad_size\` varchar(32) DEFAULT 'responsive',
  \`bullet_points\` text,
  \`updated_at\` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`slot_key_unique\` (\`slot_key\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Table structure for table \`admins\`
-- --------------------------------------------------------
CREATE TABLE \`admins\` (
  \`id\` varchar(64) NOT NULL,
  \`email\` varchar(150) NOT NULL,
  \`password_hash\` varchar(255) NOT NULL,
  \`created_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`email_unique\` (\`email\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. Table structure for table \`site_navigation\`
-- --------------------------------------------------------
CREATE TABLE \`site_navigation\` (
  \`id\` varchar(64) NOT NULL,
  \`section_type\` varchar(20) NOT NULL,
  \`label\` varchar(100) NOT NULL,
  \`href\` varchar(255) NOT NULL,
  \`badge_text\` varchar(50),
  \`sort_order\` int DEFAULT 0,
  \`is_active\` tinyint(1) DEFAULT 1,
  \`created_at\` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- DATA DUMP (Insert into parent tables first)
-- --------------------------------------------------------
`;

const tables = ['categories', 'admins', 'ad_slots', 'site_navigation', 'articles'];

for (const t of tables) {
  const rows = db.prepare(`SELECT * FROM ${t}`).all();
  if (rows.length > 0) {
    sql += `\n-- Data for \`${t}\` (${rows.length} rows)\n`;
    const cols = Object.keys(rows[0]);
    const colList = cols.map(c => `\`${c}\``).join(', ');
    sql += `INSERT INTO \`${t}\` (${colList}) VALUES\n`;
    
    const rowValues = rows.map(r => {
      return '  (' + cols.map(c => escapeSql(r[c])).join(', ') + ')';
    });
    
    sql += rowValues.join(',\n') + ';\n';
  }
}

sql += `\nSET FOREIGN_KEY_CHECKS = 1;\n-- End of Dump\n`;

fs.writeFileSync('thestocktimes_mysql_dump.sql', sql, 'utf8');
console.log('Successfully generated thestocktimes_mysql_dump.sql (size: ' + sql.length + ' bytes)');
