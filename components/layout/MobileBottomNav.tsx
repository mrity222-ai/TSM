'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, Wallet, Flame, Search } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'HOME', href: '/', icon: Home },
    { label: 'MARKETS', href: '/global-markets', icon: BarChart2 },
    { label: 'WEALTH TOOLS', href: '/calculators', icon: Wallet },
    { label: 'IPO', href: '/ipo', icon: Flame },
    { label: 'SEARCH', href: '/?search=1', icon: Search },
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-1 py-1.5 shadow-[0_-4px_18px_rgba(11,28,45,0.08)]"
    >
      <div className="grid grid-cols-5 gap-0.5 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href.split('?')[0]);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition ${
                isActive
                  ? 'text-[#0B1C2D] font-extrabold'
                  : 'text-slate-500 hover:text-slate-900 font-semibold'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-emerald-600' : ''}`} />
              <span className="text-[9px] tracking-tight leading-none text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
