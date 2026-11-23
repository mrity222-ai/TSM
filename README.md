# The Stock Times (TSM)

> **Institutional-Grade Market Intelligence, AI Tech Equities & Financial Analytics Platform**  
> Live at: [https://thestocktimes.online](https://thestocktimes.online)

---

## 📌 Overview

**The Stock Times** is a modern, high-performance financial journalism and market intelligence platform built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Node native SQLite**.

It combines real-time editorial reporting across equities, IPOs, AI tech stocks, and digital assets with a suite of interactive, zero-signup financial calculators.

---

## ✨ Features

- **Editorial Newsroom Architecture**:
  - 8+4 asymmetric editorial hero grids (FT/WSJ style).
  - Categorized news coverage (`Global Markets`, `Tech & AI Stocks`, `Crypto & Fintech`, `IPO Desk`, `Economy & Policy`).
  - E-E-A-T compliant author and research desk attribution.
  - Interactive **Trending Watchlist Ideas** carousel (TradingView / eToro style).
  - Outbrain / Taboola style 3-column native sponsored content grid.

- **Financial Tools & Calculators**:
  - SIP Calculator (Monthly SIP compounding & inflation adjustments).
  - Compound Interest Calculator.
  - Stock Average Calculator.
  - Loan EMI Calculator.
  - Income Tax Calculator (Old vs New Regime).
  - PPF & Retirement Calculators.

- **Monetization & Ad Engine**:
  - 21+ strategic ad placements (Leaderboard, In-article, Sticky sidebar, Footer).
  - Unified dynamic ad management via `/admin/ads-manager`.
  - Google AdSense, in-house banners, and affiliate cards support.

- **SEO & Compliance Ready**:
  - Full Google Search Console verification readiness.
  - Dynamic JSON-LD structured schemas (`NewsArticle`, `CollectionPage`, `BreadcrumbList`, `FAQPage`, `WebSite`).
  - Google AdSense DoubleClick DART cookie policy in `/privacy-policy`.
  - Prominent SEBI Non-Registration Regulatory Disclaimer in `/disclaimer`.
  - Automated `sitemap.xml` and `llms.txt`.

- **Admin CMS**:
  - Full CRUD for articles with rich text editing, direct answers, and FAQ builders.
  - Category management and site navigation re-ordering.
  - Ad slots configuration and live banner management.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Local SQLite via Node 24 native `node:sqlite` (`DatabaseSync`)
- **Animations & UX**: Framer Motion, Lenis SmoothScroll
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mrity222-ai/TSM.git
cd TSM
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📄 Mandatory Compliance Pages
- **About Us**: `/about`
- **Contact Us**: `/contact`
- **Privacy Policy**: `/privacy-policy`
- **Terms & Conditions**: `/terms`
- **Financial Disclaimer**: `/disclaimer`

---

## ⚖️ License & Disclaimer
Educational and informational use only. The Stock Times is not a SEBI-registered investment advisor or broker-dealer.
