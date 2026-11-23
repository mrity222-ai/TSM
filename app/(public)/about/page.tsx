import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, BarChart3, Calculator, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us – Editorial Mission & Research Standards | The Stock Times',
  description:
    'Learn about The Stock Times, our independent financial journalism standards, market research team, and free wealth planning calculators.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xs">
        <div className="space-y-2 border-b border-slate-200 pb-5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
            About The Stock Times
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950">
            Institutional-Grade Market Intelligence &amp; Financial Clarity
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            The Stock Times (<strong>thestocktimes.online</strong>) is an independent digital financial news and wealth analytics platform built to help retail investors, market participants, and everyday savers make well-informed financial decisions.
          </p>
        </div>

        <section className="space-y-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          <h2 className="text-xl font-serif font-bold text-slate-900">Our Editorial Mission</h2>
          <p>
            Financial news is often buried under complex jargon or sensational headlines. Our mission at <strong>The Stock Times</strong> is to decode stock market movements, Initial Public Offerings (IPOs), macroeconomic policy shifts, personal finance strategies, and emerging technology trends into clear, data-backed insights.
          </p>
          <p>
            Alongside daily market coverage, we provide a suite of free, transparent <strong>Finance Tools &amp; Wealth Calculators</strong>—covering Mutual Fund SIPs, Lumpsum investments, Loan EMIs, Income Tax estimation, PPF, and Stock Averaging—so readers can test real numbers before committing capital.
          </p>
        </section>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>Data-First Market Coverage</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every report highlights key valuation metrics, balance-sheet fundamentals, and risk factors rather than unverified market rumours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Editorial Independence</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our newsroom operates independently from advertisers and sponsors. Any sponsored or partner placements are clearly labelled.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Calculator className="w-4 h-4 text-indigo-600" />
              <span>Free Financial Tools</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant, zero-signup calculators built on standard financial compounding and amortization formulas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Our Editorial Desk</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Managed by equity analysts, personal finance writers, and fintech researchers dedicated to accurate, timely reporting.
            </p>
          </div>
        </div>

        <section className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <span>
            Have a news tip, correction, or partnership inquiry?{' '}
            <Link href="/contact" className="font-bold text-blue-600 hover:underline">
              Contact our Editorial Desk →
            </Link>
          </span>
          <Link href="/disclaimer" className="font-bold text-slate-800 hover:underline">
            Read Financial Disclaimer
          </Link>
        </section>
      </div>
    </div>
  );
}
