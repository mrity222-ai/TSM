'use client';

import { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

export default function MarketTicker() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'BSE:SENSEX', title: 'SENSEX' },
        { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
        { proName: 'FOREXCOM:NSXUSD', title: 'NASDAQ 100' },
        { proName: 'FOREXCOM:DJI', title: 'DOW JONES' },
        { proName: 'TVC:GOLD', title: 'GOLD' },
        { proName: 'BITSTAMP:BTCUSD', title: 'BITCOIN' },
      ],
      showSymbolLogo: false,
      isTransparent: true,
      displayMode: 'compact',
      colorTheme: 'dark',
      locale: 'en',
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="w-full bg-[#081523] border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 py-2">
          <Activity className="w-3.5 h-3.5" />
          <span>MARKETS LIVE</span>
        </div>
        <div className="flex-1 overflow-hidden" ref={containerRef} />
      </div>
    </div>
  );
}
