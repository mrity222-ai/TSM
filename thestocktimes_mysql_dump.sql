-- The Stock Times (thestocktimes.online) MySQL Database Dump
-- Generated on: 2026-11-24T05:12:52.624Z
-- Target Database: u784817558_tsm

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Drop child tables before parent tables to prevent foreign key errors
-- --------------------------------------------------------
DROP TABLE IF EXISTS `articles`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `ad_slots`;
DROP TABLE IF EXISTS `admins`;
DROP TABLE IF EXISTS `site_navigation`;

-- --------------------------------------------------------
-- 1. Table structure for table `categories`
-- --------------------------------------------------------
CREATE TABLE `categories` (
  `id` varchar(64) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text,
  `sort_order` int DEFAULT 0,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Table structure for table `articles` (Exact Match)
-- --------------------------------------------------------
CREATE TABLE `articles` (
  `id` varchar(64) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `key_takeaways` json,
  `content` longtext NOT NULL,
  `category_id` varchar(64) DEFAULT NULL,
  `author_name` varchar(100) DEFAULT 'The Stock Times Editorial Desk',
  `featured_image` varchar(500),
  `image_alt` varchar(255),
  `faqs` json,
  `affiliate_title` varchar(255),
  `affiliate_url` varchar(500),
  `affiliate_cta` varchar(100),
  `source_citation` varchar(255),
  `seo_title` varchar(255),
  `seo_description` text,
  `status` varchar(20) DEFAULT 'published',
  `views` int DEFAULT 0,
  `published_at` datetime,
  `updated_at` datetime,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `author_role` varchar(100) DEFAULT 'Global Markets & Equity Research',
  `is_featured` tinyint(1) DEFAULT 0,
  `entity_tags` json,
  `direct_answer` text,
  `focus_keyword` varchar(150),
  `canonical_url` varchar(500),
  PRIMARY KEY (`id`),
  UNIQUE KEY `art_slug_unique` (`slug`),
  KEY `cat_id_idx` (`category_id`),
  CONSTRAINT `fk_articles_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Table structure for table `ad_slots`
-- --------------------------------------------------------
CREATE TABLE `ad_slots` (
  `id` varchar(64) NOT NULL,
  `slot_key` varchar(64) NOT NULL,
  `slot_label` varchar(100) NOT NULL,
  `ad_type` varchar(32) DEFAULT 'inhouse_banner',
  `code_or_title` varchar(255),
  `description` text,
  `image_url` varchar(500),
  `target_url` varchar(500),
  `cta_text` varchar(50) DEFAULT 'Explore Now',
  `is_active` tinyint(1) DEFAULT 0,
  `ad_size` varchar(32) DEFAULT 'responsive',
  `bullet_points` text,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slot_key_unique` (`slot_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Table structure for table `admins`
-- --------------------------------------------------------
CREATE TABLE `admins` (
  `id` varchar(64) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. Table structure for table `site_navigation`
-- --------------------------------------------------------
CREATE TABLE `site_navigation` (
  `id` varchar(64) NOT NULL,
  `section_type` varchar(20) NOT NULL,
  `label` varchar(100) NOT NULL,
  `href` varchar(255) NOT NULL,
  `badge_text` varchar(50),
  `sort_order` int DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- DATA DUMP (Insert into parent tables first)
-- --------------------------------------------------------

-- Data for `categories` (6 rows)
INSERT INTO `categories` (`id`, `name`, `slug`, `description`) VALUES
  ('cedd4ef9-9df4-4a02-8e01-58bfc7e341fa', 'Global Markets', 'global-markets', 'Real-time reporting on Indian equities (Nifty, Sensex), US Wall Street indices, Gold, and Global Forex markets.'),
  ('a238d5fa-32bc-4a3f-8e87-dfdadcdf4c1c', 'Tech & AI Stocks', 'tech-ai-stocks', 'Deep coverage on global AI stocks, semiconductor wafer giants, cloud computing, and big tech earnings.'),
  ('0680af6a-6543-41d0-8615-388bfd3e5950', 'Crypto & Fintech', 'crypto-fintech', 'Bitcoin spot ETFs, stablecoin regulations, digital payments infrastructure, and next-gen fintech breakthroughs.'),
  ('30b7ce1b-5df2-49ba-b8b6-edc4a8d795a6', 'Economy & Policy', 'economy-policy', 'RBI monetary policy updates, Union Budget analysis, inflation (CPI/WPI), GDP growth trends, and government fiscal tax changes.'),
  ('cb1e812c-27db-453f-b0bb-fd121921b9d0', 'IPO', 'ipo', 'Upcoming mainboard & SME IPOs, real-time Grey Market Premium (GMP) tracker, subscription status, and listing gain analysis.'),
  ('b8110d8f-9f4c-4a7e-b32e-b166574d16da', 'Personal Finance', 'personal-finance', 'Smart money management, mutual fund SIP compounding, tax-saving strategies, insurance, and retirement planning.');

-- Data for `admins` (1 rows)
INSERT INTO `admins` (`id`, `email`, `password_hash`, `created_at`) VALUES
  ('526537e4-cd9b-4d8c-9032-7794b95121a5', 'admin@thestocktimes.online', '6e1e1678472094ebf0faaee9e2d2a311f28d5d243bd716469ec1c2ad6cdf8568', '2026-11-19T10:09:32.726Z');

-- Data for `ad_slots` (29 rows)
INSERT INTO `ad_slots` (`id`, `slot_key`, `slot_label`, `ad_type`, `code_or_title`, `description`, `image_url`, `target_url`, `cta_text`, `is_active`, `updated_at`, `ad_size`, `bullet_points`) VALUES
  ('1aacd0a6-98e0-4c52-b638-f7a7c0f94004', 'header_banner', 'Header Billboard Slot', 'affiliate_card', 'Zero-Brokerage Demat Account', 'Trade stocks and F&O with top licensed brokers.', NULL, 'https://thestocktimes.online', 'Open Account', 0, '2026-11-22T16:31:39.769Z', 'responsive', '[]'),
  ('32be9503-5bdb-4c92-9868-034224529b68', 'in_article_para_2', 'In-Article Slot 1 (Post Intro)', 'affiliate_card', 'Automate Your Trading Strategy', 'Discover institutional-grade charting and screener tools.', NULL, 'https://thestocktimes.online', 'Start Free Trial', 0, '2026-11-22T16:31:56.250Z', 'responsive', '[]'),
  ('0e15d956-3e65-47cc-b0b5-30bfb420bcd7', 'before_faq', 'In-Article Slot 2 (Before FAQs)', 'inhouse_banner', 'Sponsored Market Insight', NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22T05:07:40.887Z', 'responsive', NULL),
  ('b5f7e9d6-3526-49c5-a3b8-00992766ff4e', 'sidebar_sticky', 'Sticky Right Sidebar Unit', 'affiliate_card', 'Institutional Research Terminal', 'Get real-time news alerts and earnings forecasts.', NULL, 'https://thestocktimes.online', 'Claim Discount', 0, '2026-11-22T16:31:58.748Z', 'responsive', '[]'),
  ('66dd0b85-2cf4-40fc-a41d-62c3a9d82f5d', 'home_mid_banner', '2. Homepage Mid-Section (Partner / AdSense)', 'inhouse_banner', 'Open a Zero-Brokerage Trading & Demat Account', 'Start investing in US & Indian equities with institutional-grade charts.', NULL, 'https://thestocktimes.online', 'Open Free Account', 0, '2026-11-22T16:31:46.424Z', 'responsive', '["Zero Account Opening Fee","Free TradingView Charts","Instant UPI Deposits"]'),
  ('2ef876b5-bc6b-41e2-b96e-e1d1fc9f42c0', 'footer_banner', '4. Bottom Leaderboard (Above Footer)', 'inhouse_banner', 'Institutional Market Intelligence', 'Subscribe to daily pre-market equity briefs and stock alerts.', NULL, 'https://thestocktimes.online', 'Explore Insights', 0, '2026-11-22T16:31:35.929Z', '728x90', '[]'),
  ('9ffc55dc-897d-4f09-9c81-50bb1916d68e', 'home_top_banner', 'Home 1: Top Leaderboard (Below Ticker)', 'inhouse_banner', 'Zero-Brokerage Demat Account', 'Trade stocks and F&O with top licensed brokers.', NULL, 'https://thestocktimes.online', 'Open Account', 0, '2026-11-22T16:31:53.095Z', '728x90', '["Zero Account Opening Fee","Free TradingView Charts","Instant UPI Deposits"]'),
  ('751f249c-aef9-41a6-8729-dbbbf77f84d8', 'home_tools_below', 'Home 3: Below Calculators Strip', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Explore', 0, '2026-11-22 09:01:07', '728x90', NULL),
  ('44c10e4d-5d64-4d1e-9a03-e97a864a5396', 'home_feed_mid', 'Home 4: Inside Latest Market Coverage', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22 09:01:07', 'responsive', NULL),
  ('a4734ced-6e4f-474b-ada2-762933ba704a', 'home_sidebar_sticky', 'Home 5: Sticky Sidebar Box (300x250)', 'inhouse_banner', 'Institutional Research Terminal', 'Get real-time news alerts and earnings forecasts.', NULL, 'https://thestocktimes.online', 'Claim Discount', 0, '2026-11-22T16:31:49.227Z', '300x250', '["Live Screener Alerts","Consensus Analyst Price Targets","AI Sentiment Tracker"]'),
  ('f1770929-c3f4-4e80-80f0-056370da3bea', 'home_footer_banner', 'Home 6: Bottom Footer Leaderboard', 'inhouse_banner', 'Institutional Market Intelligence', 'Subscribe to daily pre-market equity briefs and stock alerts.', NULL, 'https://thestocktimes.online', 'Explore Insights', 0, '2026-11-22T16:31:43.674Z', '728x90', '[]'),
  ('9cc8491a-a09b-4d78-898f-e1eac532a649', 'article_top_banner', 'Article 1: Top Leaderboard (Above Title)', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22 09:01:07', '728x90', NULL),
  ('d24708b7-07d3-40b5-9582-48a243248a94', 'article_para_2', 'Article 2: After Key Takeaways / Intro', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Explore', 0, '2026-11-22 09:01:07', 'responsive', NULL),
  ('4a1dd327-b682-4af1-95dd-d7d60778a243', 'article_mid_body', 'Article 3: Mid-Article Content Slot', 'inhouse_banner', 'Track Live Stock Charts with TradingView', 'Institutional-grade charting and screener tools for modern investors.', NULL, 'https://thestocktimes.online', 'Try Free', 0, '2026-11-22T11:39:20.866Z', 'responsive', '["Advanced Technical Indicators","Real-Time Market Heatmaps","Multi-Asset Watchlists"]'),
  ('b3284c3a-8d45-4e49-929f-c3c0e0c0f3d4', 'article_before_faq', 'Article 4: End of Article (Before FAQs)', 'adsense', NULL, NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22T11:39:17.999Z', 'responsive', '[]'),
  ('27dbad55-ba7e-455b-9e48-6b102286169a', 'article_sidebar_sticky', 'Article 5: Sticky Right Sidebar (300x250)', 'inhouse_banner', 'Institutional Research Terminal', 'Get real-time news alerts and earnings forecasts.', NULL, 'https://thestocktimes.online', 'Explore Terminal', 0, '2026-11-22T16:31:22.415Z', '300x250', '["Live Screener Alerts","Consensus Analyst Price Targets"]'),
  ('999971c4-2f3f-4fa1-9947-afb2f44a37cd', 'tool_top_banner', 'Tools 1: Top Leaderboard (Above Calculator)', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22 09:01:07', '728x90', NULL),
  ('8c960e5f-269b-4270-a866-5130ca2cc7c6', 'tool_below_result', 'Tools 2: Below Result & Chart Box', 'inhouse_banner', 'Start Your SIP with Zero Commission', 'Invest in top-rated direct mutual funds and equity baskets with zero hidden charges.', NULL, 'https://thestocktimes.online', 'Invest Now', 0, '2026-11-22T16:32:02.138Z', 'responsive', '["0% Brokerage on Mutual Funds","Automated Daily/Monthly SIPs","Instant Portfolio Rebalancing"]'),
  ('8349f1a6-1133-43b0-be90-b48d112b8cf3', 'tool_before_guide', 'Tools 3: Above Formula & Guide Section', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22 09:01:07', 'responsive', NULL),
  ('dca74254-c0b1-4e2e-bab9-1d49ff196070', 'tool_sidebar_sticky', 'Tools 4: Sticky Sidebar Box (300x250)', 'inhouse_banner', 'Automate Your Wealth Strategy', 'Connect with verified portfolio managers and algorithmic models.', NULL, 'https://thestocktimes.online', 'Explore Wealth', 0, '2026-11-22T16:32:06.238Z', '300x250', '[]'),
  ('af5de450-1aa4-479c-9d5a-0465cf6a51ab', 'tool_footer_banner', 'Tools 5: Bottom Footer Leaderboard', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22 09:01:07', '728x90', NULL),
  ('3453ef01-88b6-42c7-96c1-bdf49ce673dc', 'cat_top_banner', 'Category 1: Top Leaderboard', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22 09:01:07', '728x90', NULL),
  ('ddeba9db-3560-4a53-bdab-b3b9b3434fe3', 'cat_row_1_below', 'Category 2: After First 3 Articles', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22 09:01:07', 'responsive', NULL),
  ('4dcccdff-962b-433d-bee4-aea2c15ede12', 'cat_row_2_below', 'Category 3: After 6 Articles', 'inhouse_banner', 'Get Daily IPO & Stock Alerts', 'Get instant WhatsApp and email notifications on upcoming IPOs and breakout stocks.', NULL, 'https://thestocktimes.online', 'Join Free', 0, '2026-11-22T16:31:28.688Z', 'responsive', '["Pre-IPO Valuations","Grey Market Premium (GMP)","Listing Day Strategies"]'),
  ('d7783c2a-0623-4b7c-a915-5cebaa0521ae', 'cat_sidebar_sticky', 'Category 4: Sticky Sidebar Box (300x250)', 'inhouse_banner', 'Institutional Research Terminal', 'Access in-depth market research and sector coverage.', NULL, 'https://thestocktimes.online', 'Get Free Access', 0, '2026-11-22T16:31:31.521Z', '300x250', '[]'),
  ('1f5f1900-f578-4a2d-833d-195d37ff3a73', 'cat_footer_banner', 'Category 5: Bottom Footer Leaderboard', 'adsense', '', NULL, NULL, 'https://thestocktimes.online', 'Learn More', 0, '2026-11-22 09:01:07', '728x90', NULL),
  ('361c3daf-e0fd-413e-88f3-493ec16bc27e', 'native_partner_1', 'Native Sponsored 1: Demat & US Stocks Account', 'inhouse_banner', 'Zero-Brokerage Demat & US Stocks Account for Indian Investors', 'Open a free trading account in 5 minutes with instant UPI deposits & live TradingView charts.', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80', '/tools/sip-calculator', 'Open Account', 1, '2026-11-22 18:21:30', 'responsive', NULL),
  ('a4b1130a-e9cf-4a00-89c5-3c7fbc903b02', 'native_partner_2', 'Native Sponsored 2: SIP Wealth Corpus Calculator', 'inhouse_banner', 'Calculate Your 10-Year Mutual Fund SIP Wealth Corpus Instantly', 'Compare monthly SIP vs Lumpsum compounding returns and plan your financial freedom goal.', 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&w=800&q=80', '/tools/sip-calculator', 'Learn More', 1, '2026-11-22 18:21:30', 'responsive', NULL),
  ('17c05af6-4b62-4a0d-8623-d2b8022d57c4', 'native_partner_3', 'Native Sponsored 3: Income Tax & 80C Savings', 'inhouse_banner', 'Save Up to ₹46,800 in Taxes Under New Regime & Section 80C', 'Estimate your exact FY 2026-27 tax liability and compare PPF, ELSS & NPS tax deductions.', 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80', '/tools/income-tax-calculator', 'Learn More', 1, '2026-11-22 18:21:30', 'responsive', NULL);

-- Data for `site_navigation` (14 rows)
INSERT INTO `site_navigation` (`id`, `section_type`, `label`, `href`, `badge_text`, `sort_order`, `is_active`, `created_at`) VALUES
  ('779eedda-a588-4c3f-a4b0-16e11dd925d8', 'tools', 'SIP Calculator', '/calculators/sip-calculator', 'Investing', 1, 1, '2026-11-22 05:07:40'),
  ('9e18c910-6474-4ddd-b549-8c569152b246', 'tools', 'Compound Interest', '/calculators/compound-interest-calculator', 'Investing', 2, 1, '2026-11-22 05:07:40'),
  ('a4c2230d-a061-4368-bcc3-1fd26e37cfdc', 'tools', 'Stock Average Calculator', '/calculators/stock-average-calculator', 'Trading', 3, 1, '2026-11-22 05:07:40'),
  ('19d08680-bea9-458d-9323-763816ee3c57', 'tools', 'EMI Calculator', '/calculators/emi-calculator', 'Loans & Planning', 4, 1, '2026-11-22 05:07:40'),
  ('eed210fd-bfc5-43a8-ae72-91f986384429', 'tools', 'Dividend Calculator', '/calculators/dividend-calculator', 'Investing', 5, 1, '2026-11-22 05:07:40'),
  ('9cfe67aa-bd17-4712-b1e6-05548ea2bcb5', 'tools', 'Retirement Calculator', '/calculators/retirement-calculator', 'Loans & Planning', 6, 1, '2026-11-22 05:07:40'),
  ('bc0997a1-1c69-4e36-8581-b0f790f199c6', 'navbar', 'HOME', '/', NULL, 1, 1, '2026-11-23 15:46:52'),
  ('03475328-6528-4cc5-99c6-704109624d2c', 'navbar', 'GLOBAL MARKETS', '/global-markets', NULL, 2, 1, '2026-11-23 15:46:52'),
  ('c400cc03-5970-4f4b-bc7b-4e5681626075', 'navbar', 'IPO', '/ipo', NULL, 3, 1, '2026-11-23 15:46:52'),
  ('773e3fcb-f038-4511-89ac-3497a67e04f7', 'navbar', 'TECH & AI', '/tech-ai-stocks', NULL, 4, 1, '2026-11-23 15:46:52'),
  ('91b10941-3ef1-4a5c-92a2-f3c931e396db', 'navbar', 'CRYPTO & FINTECH', '/crypto-fintech', NULL, 5, 1, '2026-11-23 15:46:52'),
  ('b837bdff-e36c-4c58-8277-b2d2a479319f', 'navbar', 'ECONOMY', '/economy-policy', NULL, 6, 1, '2026-11-23 15:46:52'),
  ('8c329d15-3c51-4646-a9b9-50dbc5b9c301', 'navbar', 'PERSONAL FINANCE', '/personal-finance', NULL, 7, 1, '2026-11-23 15:46:52'),
  ('58e1a593-cc43-44ff-b0b0-99061037f220', 'navbar', 'WEALTH TOOLS', '/calculators', NULL, 8, 1, '2026-11-23 15:46:52');

-- Data for `articles` (4 rows)
INSERT INTO `articles` (`id`, `title`, `slug`, `key_takeaways`, `content`, `category_id`, `author_name`, `featured_image`, `image_alt`, `faqs`, `affiliate_title`, `affiliate_url`, `affiliate_cta`, `source_citation`, `seo_title`, `seo_description`, `status`, `views`, `published_at`, `updated_at`, `created_at`, `author_role`, `is_featured`, `entity_tags`, `direct_answer`, `focus_keyword`, `canonical_url`) VALUES
  ('3760dd26-faf0-4bcc-bcb8-bc7c3747437a', 'Nvidia Q3 Earnings Beat Estimates: .1B Revenue & AI Chip Demand', 'nvidia-q3-earnings-beat-estimates', '["Revenue surged 94% YoY reaching .1 billion in Q3.","Data Center compute revenue driven by Hopper and Blackwell architectures.","Gross margins remained industry-leading at 74.6%."]', '<p>Nvidia delivered another blockbuster quarterly earnings report that crushed Wall Street consensus estimates across all key metrics.</p><h2>Blackwell Architecture Demand</h2><p>CEO Jensen Huang emphasized that demand for Blackwell is extraordinary as global enterprises transition into accelerated computing.</p>', 'cedd4ef9-9df4-4a02-8e01-58bfc7e341fa', 'The Stock Times Editorial Desk', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200', 'Nvidia AI Semiconductor Chip Architecture', '[{"question":"What was Nvidia Q3 revenue?","answer":"Nvidia generated .1 billion in Q3, representing 94% YoY growth."},{"question":"When will Blackwell GPUs ship at scale?","answer":"Blackwell shipments are scaling through late 2026 across major cloud service providers."}]', NULL, NULL, 'Explore Platform', 'SEC Form 10-Q Q3 Filings & Investor Relations', 'Nvidia Q3 Earnings Beat Estimates: .1B Revenue | The Stock Times', 'Nvidia reports record Q3 revenue of .1 billion, up 94% YoY driven by generative AI accelerator demand.', 'published', 0, '2026-11-22T05:39:29.109Z', '2026-11-22T05:39:29.125Z', '2026-11-22T05:39:29.125Z', 'Global Markets & Equity Research', 1, '["Nvidia","NVDA","Semiconductors","Blackwell","NASDAQ"]', 'Nvidia delivered exceptional Q3 revenue of .1B, up 94% YoY, comfortably exceeding Wall Street projections driven by relentless hyperscaler demand for generative AI accelerators.', 'nvidia q3 earnings 2026', NULL),
  ('e7bfa6e6-1689-413e-bfd9-568b0f90783c', 'Tata Capital Mega IPO: Valuations, GMP Trends, and Long-Term Investor Outlook', 'tata-capital-mega-ipo-valuation-gmp-outlook', '["Issue size projected between ₹15,000 Cr to ₹18,000 Cr to meet RBI regulatory mandates.","Retail loan portfolio has expanded at a 34% CAGR over the last three fiscal years.","Unlisted grey market premium (GMP) indicates strong double-digit listing gain expectations.","Valuation metrics show attractive price-to-book ratios compared to key peers Bajaj Finance and Jio Financial."]', '\n      <p>The primary markets are bracing for one of the most anticipated public offerings of the decade as <strong>Tata Capital Financial Services</strong> gears up for its landmark initial public offering. This IPO is slated to fulfill the Reserve Bank of India\'s (RBI) mandatory listing norms for \'Upper-Layer\' Non-Banking Financial Companies (NBFCs).</p>\n      \n      <h2>1. Key Business Metrics and Loan Book Growth</h2>\n      <p>Over the past three fiscal years, Tata Capital has aggressively pivoted towards diversified consumer credit, SME business loans, and secured home financing. Its loan book has compounded at an impressive <strong>34% CAGR</strong>, significantly outpacing the broader banking sector credit growth of 14-16%.</p>\n      \n      <p>Asset quality has remained robust, with Gross Non-Performing Assets (GNPA) holding steady below <strong>1.5%</strong>, supported by automated algorithmic underwriting and strict recovery mechanisms across tier-1 and tier-2 geographic clusters.</p>\n\n      <h2>2. Grey Market Premium (GMP) & Valuation Benchmarks</h2>\n      <p>In the unofficial grey market, unlisted shares of Tata Capital have witnessed steady institutional accumulation, commanding a healthy premium of 22% over estimated floor price ranges. Analysts expect the company to target a valuation of around ₹1.2 to ₹1.4 Lakh Crore upon debut.</p>\n\n      <div class="my-6 p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">\n        <h3 class="text-base font-bold text-slate-900">Comparative NBFC Peer Valuation Snapshot</h3>\n        <ul class="text-xs space-y-1 text-slate-700">\n          <li><strong>Tata Capital (Estimated):</strong> Price-to-Book ~3.2x | Return on Equity (RoE) ~17.5%</li>\n          <li><strong>Bajaj Finance:</strong> Price-to-Book ~4.8x | Return on Equity (RoE) ~21.2%</li>\n          <li><strong>Jio Financial Services:</strong> Price-to-Book ~1.9x | Emerging Credit Ecosystem</li>\n        </ul>\n      </div>\n\n      <h2>3. Long-Term Investor Strategy</h2>\n      <p>For long-term retail and institutional investors, the Tata brand equity coupled with scalable digital distribution makes this IPO a prime core portfolio candidate. However, investors should monitor interest rate sensitivity and potential net interest margin (NIM) compression in an evolving monetary policy regime.</p>\n    ', 'cb1e812c-27db-453f-b0bb-fd121921b9d0', 'Arjun Mehta', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80', 'Stock market trading terminal and IPO financial results charts', '[{"question":"When is the Tata Capital IPO expected to hit the primary market?","answer":"The IPO is slated to open for subscription in late 2026, following statutory approvals and SEBI prospectus clearance to fulfill RBI upper-layer guidelines."},{"question":"What is the estimated issue size of Tata Capital IPO?","answer":"Market analysts project the total issue size to range between ₹15,000 Crore and ₹18,000 Crore, combining fresh equity issuance and an offer for sale (OFS)."},{"question":"How can retail investors apply for this IPO?","answer":"Retail investors can apply through standard UPI-based ASBA facilities via licensed stockbrokers, discount brokers, or net banking portals."}]', NULL, NULL, NULL, 'RBI Upper Layer NBFC Disclosures, Company Annual Reports & Exchange Filings', 'Tata Capital IPO: Valuations, GMP Trends & Investor Analysis | The Stock Times', 'In-depth analysis of Tata Capital Mega IPO: valuation multiples, grey market premium (GMP), asset quality, and long-term portfolio growth outlook.', 'published', 1420, '2026-11-22T11:12:52.683Z', '2026-11-22T13:12:52.683Z', '2026-11-22T11:12:52.682Z', 'Senior IPO & Equity Analyst', 1, '["Tata Capital","IPO","NBFC","RBI","Stock Market"]', 'Tata Capital is preparing for an estimated ₹15,000–₹18,000 Crore landmark initial public offering (IPO) to comply with RBI upper-layer NBFC listing norms, backed by strong retail loan book expansion and healthy return on equity (RoE).', 'Tata Capital IPO', NULL),
  ('30c73261-bb7c-4cf1-85e1-88d505bdb964', 'Semiconductor Boom 2026: Why AI Chip Demand is Powering Record Tech Valuations', 'semiconductor-boom-2026-ai-chip-demand-record-valuations', '["Global semiconductor industry revenue is projected to cross the $700 Billion milestone in 2026.","High Bandwidth Memory (HBM3e/HBM4) supply remains fully booked across major hyperscaler cloud providers.","Sovereign AI infrastructure investments across Europe, Asia, and Middle East have expanded by 140%.","Operating margins for leading pure-play foundries hover near historic highs of 44% to 52%."]', '\n      <p>The global semiconductor industry has entered an unprecedented supercycle. Far from the traditional consumer PC and smartphone cyclical swings of the past, the current boom is structurally anchored in <strong>accelerated computing infrastructure</strong> and sovereign artificial intelligence deployments.</p>\n\n      <h2>1. The Architecture Behind the Surge: HBM and CoWoS Packaging</h2>\n      <p>Modern Large Language Models (LLMs) and multi-modal reasoning networks require massive memory throughput. High Bandwidth Memory (HBM3e and incoming HBM4) has emerged as the critical bottleneck. Memory manufacturers have reported that production capacity for the entirety of 2026 is already fully contracted to cloud hyperscalers.</p>\n      \n      <p>Similarly, Chip-on-Wafer-on-Substrate (CoWoS) packaging capacity has expanded at a breakneck pace, enabling advanced 3nm and 2nm multi-die integration for enterprise AI superclusters.</p>\n\n      <h2>2. Sovereign AI: The New Macro Catalyst</h2>\n      <p>Beyond commercial cloud providers, nation-states have emerged as massive direct semiconductor consumers. Governments across Japan, Germany, India, and the Gulf nations are pouring tens of billions into domestic sovereign computing clusters to maintain data sovereignty and strategic technological independence.</p>\n\n      <h2>3. Fundamental Valuations and Earnings Resilience</h2>\n      <p>Despite significant equity run-ups over the past 24 months, forward Price-to-Earnings (P/E) multiples for semiconductor leaders remain grounded when adjusted for explosive earnings per share (EPS) growth rates (PEG ratios typically below 1.4x), making quality chip stocks a resilient foundation for modern technology portfolios.</p>\n    ', 'a238d5fa-32bc-4a3f-8e87-dfdadcdf4c1c', 'Dr. Sarah Chen', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', 'High-density microchip silicon wafer with circuit architecture', '[{"question":"Is the semiconductor industry at risk of an AI bubble burst?","answer":"Unlike speculative dot-com infrastructure, current semiconductor capex is backed by record enterprise free cash flows and proven operational productivity gains across enterprise automation."},{"question":"Which sub-sectors in semiconductors have the highest pricing power?","answer":"High Bandwidth Memory (HBM), advanced lithography equipment (EUV), and EDA design software monopolize the greatest pricing leverage due to insurmountable technical barriers to entry."},{"question":"How do interest rates affect semiconductor equity multiples?","answer":"While higher interest rates traditionally compress high-growth valuations, semiconductor companies with net cash balance sheets and expanding gross margins exhibit strong resistance to rate volatility."}]', NULL, NULL, NULL, 'Gartner Semiconductor Forecast, SIA Global Billings, Hyperscaler 10-K Filings', 'Semiconductor Supercycle 2026: AI Chip Demand & Tech Equity Analysis | The Stock Times', 'Explore the structural drivers powering the 2026 semiconductor boom: AI accelerator hardware, HBM memory shortages, sovereign supercomputing, and valuation outlook.', 'published', 2150, '2026-11-22T08:12:52.683Z', '2026-11-22T13:12:52.683Z', '2026-11-22T08:12:52.683Z', 'Global Technology Sector Lead', 1, '["Semiconductors","AI Hardware","NVIDIA","TSMC","Tech Stocks"]', 'Exponential demand for next-generation AI accelerators, high-bandwidth memory (HBM), and advanced silicon packaging continues to outstrip global fab supply, projecting sustained double-digit revenue growth across leading foundry and fabless equities through 2027.', 'Semiconductor AI Chip Boom', NULL),
  ('302398c0-acdf-4bf9-8a15-d57de306769d', 'Bitcoin Surges Past Key Resistance: Institutional ETF Inflows and Macro Tailwinds Explained', 'bitcoin-surges-past-key-resistance-etf-inflows-macro-tailwinds', '["Spot Bitcoin ETFs recorded cumulative net inflows crossing $2.4 Billion within 5 consecutive trading sessions.","On-chain long-term holder supply accumulation reached a record high of 14.8 Million BTC.","Global interest rate cuts by the Federal Reserve and ECB have expanded broad M2 money supply liquidity.","Corporate treasury balance sheet allocations to digital assets grew by 42% year-over-year."]', '\n      <p>Bitcoin has decisively broken out of its multi-month consolidation channel, establishing strong institutional support as sustained spot exchange-traded fund (ETF) inflows absorb secondary market supply at an unprecedented velocity.</p>\n\n      <h2>1. The Wall Street Inflow Engine</h2>\n      <p>Institutional adoption has fundamentally transformed Bitcoin\'s market microstructure. Regulated spot ETFs in the United States and Hong Kong now collectively custody over <strong>5% of the total circulating supply</strong>. Daily creation units continue to swallow multiples of the newly minted post-halving daily supply (approx 450 BTC/day).</p>\n\n      <h2>2. Macro Monetary Backdrop: Synchronized Easing</h2>\n      <p>Central banks worldwide have pivoted decisively toward monetary accommodation. With the Federal Reserve, the European Central Bank (ECB), and the People\'s Bank of China (PBOC) expanding global liquidity metrics (M2 money supply), hard assets with fixed mathematical scarcity—specifically gold and Bitcoin—have attracted massive sovereign and wealth office diversification flows.</p>\n\n      <h2>3. Key On-Chain Support and Overhead Resistance</h2>\n      <p>On-chain analytics reveal that short-term holder cost basis has shifted upward into a fortified technical floor. Analysts identify little overhead historical supply resistance, with market indicators pointing to an extended price discovery regime throughout the coming fiscal quarters.</p>\n    ', '0680af6a-6543-41d0-8615-388bfd3e5950', 'Vikramaditya Rao', 'https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=1200&q=80', 'Digital Bitcoin golden coin on matrix financial data stream', '[{"question":"What is driving the current Bitcoin rally?","answer":"The primary catalysts are structural spot ETF institutional accumulation, post-halving supply constriction, and global central bank rate cut cycles expanding fiat liquidity."},{"question":"Are retail investors leading this cycle?","answer":"Unlike the retail-frenzy cycles of 2017 and 2021, on-chain data confirms that institutional custodial wallets, family offices, and registered investment advisors (RIAs) are driving current market volume."},{"question":"What are the main macro risks for digital assets currently?","answer":"Key downside risks include unexpected hawkish central bank pauses, geopolitical escalations disrupting global trade liquidity, or regulatory friction surrounding stablecoin reserve frameworks."}]', NULL, NULL, NULL, 'Glassnode On-Chain Analytics, SEC ETF Filings & Bloomberg Intelligence', 'Bitcoin Breakout: Institutional ETF Inflows & Macro Analysis | The Stock Times', 'Analyze Bitcoin’s latest technical breakout: record spot ETF inflows, global central bank liquidity easing, on-chain accumulation, and price discovery targets.', 'published', 3100, '2026-11-22T05:12:52.683Z', '2026-11-22T13:12:52.683Z', '2026-11-22T05:12:52.683Z', 'Digital Assets & Macro Strategist', 1, '["Bitcoin","Crypto","Spot ETF","Macro","Federal Reserve"]', 'Bitcoin has breached significant multi-month resistance levels driven by net institutional spot ETF inflows exceeding $2.4 Billion in a single trading week, combined with global central bank liquidity easing cycles.', 'Bitcoin Institutional ETF Inflow', NULL);

SET FOREIGN_KEY_CHECKS = 1;
-- End of Dump
