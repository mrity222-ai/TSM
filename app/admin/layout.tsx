'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FilePlus2,
  FolderTree,
  Megaphone,
  SlidersHorizontal,
  LogOut,
  ExternalLink,
  Newspaper,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore
    }
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Newsroom Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Write Article', href: '/admin/articles/new', icon: FilePlus2 },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Ads (In-House & AdSense)', href: '/admin/ads-manager', icon: Megaphone },
    { label: 'Navbar & Tools Order', href: '/admin/navigation', icon: SlidersHorizontal },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFC]">
      <aside className="w-full md:w-64 bg-white border-b md:border-r border-slate-200 p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2.5 mb-8 px-1">
            <div className="p-2 bg-blue-600 text-white rounded-xl">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                Local Editorial CMS
              </span>
              <h2 className="text-base font-extrabold text-slate-900">The Stock Times</h2>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-100 space-y-2 mt-6">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-blue-600"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Live Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
