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
        { proName: 'NSE:NIFTY', title: 'NIFTY 50' },
        { proName: 'SP:SPX', title: 'S&P 500' },
        { proName: 'NASDAQ:IXIC', title: 'NASDAQ' },
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
    <div className="w-full h-10 bg-[#081523] border-b border-slate-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 shrink-0 text-xs font-extrabold uppercase tracking-wider text-emerald-400 pr-2 border-r border-slate-800">
          <Activity className="w-3.5 h-3.5" />
          <span>MARKET INDICES</span>
        </div>
        <div className="flex-1 min-w-0 h-10 flex items-center overflow-hidden" ref={containerRef} />
      </div>
    </div>
  );
}
