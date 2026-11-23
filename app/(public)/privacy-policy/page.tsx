import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy – Data Protection & Advertising Disclosures | The Stock Times',
  description:
    'Read the Privacy Policy of The Stock Times explaining how we handle analytics, cookies, Google AdSense advertising, and visitor privacy.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed shadow-2xs">
        <header className="space-y-2 border-b border-slate-200 pb-5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600">
            Legal &amp; Compliance
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-950">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">Last Updated: November 2026</p>
        </header>

        <section className="space-y-2">
          <p>
            At <strong>The Stock Times</strong> (accessible at{' '}
            <strong>https://thestocktimes.online</strong>), the privacy of our visitors is of extreme importance to us. This Privacy Policy document outlines the types of information collected and recorded by The Stock Times and how we use it.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            1. Information We Collect
          </h2>
          <p>
            You can browse our articles and use all interactive financial calculators without creating an account or submitting personal identification details. When you voluntarily contact us via our Contact Form or email, we collect your name, email address, and message content solely to respond to your inquiry.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            2. Log Files &amp; Analytics
          </h2>
          <p>
            The Stock Times follows a standard procedure of using log files and privacy-compliant analytics tools (such as Google Analytics). The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamps, referring/exit pages, and aggregate click metrics. This data is used to analyze trends, administer the site, and improve page load speed.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            3. Cookies and Web Beacons
          </h2>
          <p>
            Like most modern websites, The Stock Times uses cookies to store visitor preferences and optimize user experience based on browser type and device screen size. You can choose to disable cookies through your individual browser settings at any time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            4. Google AdSense &amp; Third-Party Advertising Partners
          </h2>
          <p>
            Google is a third-party vendor on our site. It uses cookies, known as{' '}
            <strong>DART cookies</strong>, to serve ads to our site visitors based upon their visit to <strong>thestocktimes.online</strong> and other sites on the internet.
          </p>
          <p>
            Visitors may opt out of the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold hover:underline"
            >
              https://policies.google.com/technologies/ads
            </a>
            . Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons in their respective advertisements and links that appear on The Stock Times, which are sent directly to users’ browsers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            5. Affiliate Links Disclosure
          </h2>
          <p>
            Certain articles or partner sections on The Stock Times may contain affiliate or sponsored links to financial platforms, brokers, or research tools. Clicking these links may set a referral cookie by the partner site at no additional cost to you.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
            6. Consent &amp; Contact
          </h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have questions about our data practices, contact us at{' '}
            <strong>editorial@thestocktimes.online</strong>.
          </p>
        </section>
      </article>
    </div>
  );
}
