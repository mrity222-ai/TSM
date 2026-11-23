import Navbar from '@/components/layout/Navbar';
import MarketTicker from '@/components/layout/MarketTicker';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import SmoothScroll from '@/components/ui/SmoothScroll';
import TrendingWatchlistSection from '@/components/news/TrendingWatchlistSection';
import NativeSponsoredGrid from '@/components/ads/NativeSponsoredGrid';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 overflow-x-hidden">
        <Navbar />
        <MarketTicker />
        <main className="flex-1 pb-16 md:pb-0">
          {children}
          {/* Universal Trending Watchlist Ideas Horizontal Carousel */}
          <TrendingWatchlistSection />
          {/* Universal 3-Column Native Sponsored / Recommended Content Grid */}
          <NativeSponsoredGrid />
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    </SmoothScroll>
  );
}
