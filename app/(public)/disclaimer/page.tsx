import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial & Investment Disclaimer | The Stock Times',
  description:
    'Important Financial Disclaimer: Content on The Stock Times is for educational and informational purposes only and does not constitute SEBI-registered investment advice.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed shadow-2xs">
        <header className="space-y-2 border-b border-slate-200 pb-5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
            Regulatory &amp; Risk Disclosure
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950">
            Financial &amp; Investment Disclaimer
          </h1>
          <p className="text-xs text-slate-500">Last Updated: November 2026</p>
        </header>

        {/* Highlighted Compliance Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-950 font-semibold leading-relaxed">
            No SEBI-Registered Investment Advice: The Stock Times (thestocktimes.online) is an independent financial news and educational portal. Neither the website nor its authors are registered with the Securities and Exchange Board of India (SEBI) as an Investment Adviser or Research Analyst.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            1. Educational &amp; Informational Purpose Only
          </h2>
          <p>
            All articles, stock market analyses, IPO Grey Market Premium (GMP) discussions, cryptocurrency reports, tax explainers, and financial calculator outputs published on <strong>The Stock Times</strong> are intended strictly for general informational and educational purposes. Nothing on this website should be construed as a solicitation, recommendation, endorsement, or offer to buy or sell any securities, mutual funds, derivatives, or digital assets.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            2. Market Risk Disclosure
          </h2>
          <p>
            Investments in the securities market, equities, IPOs, mutual funds, and digital assets are subject to high market risks. Past performance of any stock, index, or mutual fund scheme is not indicative of future returns. Unlisted grey market premiums (GMP) are unofficial, unregulated, and highly volatile.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            3. Consult a Certified Financial Advisor
          </h2>
          <p>
            Before making any investment, tax, or borrowing decision, readers are strongly advised to conduct their own independent due diligence and consult a <strong>SEBI-registered Investment Adviser</strong> or certified financial planner who can evaluate your specific financial goals and risk tolerance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            4. Accuracy of Data &amp; Calculators
          </h2>
          <p>
            While our editorial desk relies on publicly available filings, exchange disclosures, and standard financial formulas, we make no representations or warranties of any kind regarding the completeness, real-time accuracy, or suitability of the information displayed.
          </p>
        </section>
      </article>
    </div>
  );
}
