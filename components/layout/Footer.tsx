import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0B1C2D] text-slate-300 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-md space-y-2">
            <span className="text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase block">
              THE
            </span>
            <h3 className="text-xl font-serif font-black text-white">STOCK TIMES</h3>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Institutional-grade financial news, global equity analysis, AI technology market intelligence, and interactive wealth tools.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-bold text-slate-300 items-center">
            <Link href="/calculators" className="hover:text-emerald-400 transition">Wealth Management Tools</Link>
            <Link href="/about" className="hover:text-white transition">About Us</Link>
            <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
            <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms &amp; Conditions</Link>
            <Link href="/disclaimer" className="hover:text-white transition">Financial Disclaimer</Link>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
          <strong>Regulatory Disclaimer:</strong> The Stock Times (thestocktimes.online) provides market news and financial calculators strictly for educational and informational purposes. We are not a SEBI-registered investment advisor or broker-dealer.
        </div>
      </div>
    </footer>
  );
}
