'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Calculator, Globe, Radio, Menu, X } from 'lucide-react';

const defaultNavCategories = [
  { name: 'HOME', href: '/' },
  { name: 'STOCK MARKET', href: '/global-markets' },
  { name: 'TECH & AI', href: '/tech-ai-stocks' },
  { name: 'CRYPTO & FINTECH', href: '/crypto-fintech' },
  { name: 'ECONOMY', href: '/economy-policy' },
  { name: 'FINANCE TOOLS', href: '/tools' },
];

export default function Navbar() {
  const [navCategories, setNavCategories] = useState<{ name: string; href: string }[]>(defaultNavCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/navigation?section=navbar&activeOnly=true')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNavCategories(
            data.map((item: any) => ({
              name: item.label,
              href: typeof item.href === 'string' && item.href.startsWith('/category/')
                ? item.href.replace('/category/', '/')
                : item.href,
            }))
          );
        }
      })
      .catch(() => {
        // Fallback to defaultNavCategories
      });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* 1. Top Utility Bar (Crisp White Editorial Header) */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="shrink-0 group">
            <span className="block text-[10px] font-extrabold tracking-[0.25em] text-slate-500 uppercase leading-none">
              THE
            </span>
            <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-slate-950 group-hover:text-blue-700 transition">
              STOCK TIMES
            </span>
          </Link>

          {/* Center Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search markets, stocks, articles..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100/80 border border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-xs font-medium text-slate-800 transition"
            />
          </form>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Currency Switcher */}
            <button
              type="button"
              onClick={() => setCurrency(currency === 'USD' ? 'INR' : 'USD')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F2439] hover:bg-[#16324F] text-white text-xs font-bold transition shadow-sm"
              title="Switch Display Currency"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              {currency === 'USD' ? 'US USD ($)' : 'IN INR (₹)'}
            </button>

            {/* Financial Tools CTA */}
            <Link
              href="/tools"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0F2439] hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Financial Tools</span>
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Dark Institutional Navigation Strip */}
      <div className="bg-[#0B1C2D] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-11 hidden lg:flex items-center justify-between">
          <nav className="flex items-center gap-1">
            {navCategories.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider text-slate-200 hover:text-white hover:bg-white/10 transition"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Live Market Feed Status Indicator */}
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Radio className="w-3.5 h-3.5" />
            <span>LIVE MARKET FEED</span>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 py-3 space-y-2 bg-[#0F2439] border-t border-slate-700">
            <form onSubmit={handleSearch} className="relative pb-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-white"
              />
            </form>
            <div className="grid grid-cols-2 gap-1.5">
              {navCategories.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-xs font-bold text-slate-200 hover:bg-white/10"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
