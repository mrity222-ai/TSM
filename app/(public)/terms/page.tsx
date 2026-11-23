import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | The Stock Times',
  description:
    'Terms and Conditions governing the use of The Stock Times website, editorial articles, and financial calculators.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed shadow-2xs">
        <header className="space-y-2 border-b border-slate-200 pb-5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
            User Agreement
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-slate-500">Effective Date: November 2026</p>
        </header>

        <section className="space-y-2">
          <p>
            Welcome to <strong>The Stock Times</strong> (<strong>https://thestocktimes.online</strong>). By accessing or using this website, you agree to comply with and be bound by the following Terms and Conditions. If you disagree with any part of these terms, please discontinue use of the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            1. Intellectual Property Rights
          </h2>
          <p>
            Unless otherwise stated, The Stock Times and/or its licensors own the intellectual property rights for all editorial content, custom graphics, calculator interfaces, and original analysis published on <strong>thestocktimes.online</strong>. You may view, share links to, and print pages for personal, non-commercial use only. Republishing or scraping bulk content without written permission is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            2. Educational Use &amp; Calculator Accuracy
          </h2>
          <p>
            All articles, market summaries, IPO reviews, and interactive calculators (SIP, EMI, Tax, PPF, Stock Average) are provided strictly for informational and educational estimation purposes. While we strive for mathematical and factual accuracy, market figures, tax slabs, and interest rates are subject to regulatory change.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            3. Third-Party Links &amp; Advertisements
          </h2>
          <p>
            Our website displays advertisements served by third-party networks (including Google AdSense) and links to external financial websites. The Stock Times does not control or endorse the content, policies, or services of third-party websites.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall The Stock Times, its editors, authors, or contributors be held liable for any direct, indirect, or consequential financial loss arising out of your reliance on information, market commentary, or calculator projections published on this platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            5. Governing Law
          </h2>
          <p>
            These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to conflict of law provisions.
          </p>
        </section>
      </article>
    </div>
  );
}
