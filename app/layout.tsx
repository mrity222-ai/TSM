import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thestocktimes.online'),
  title: {
    default: 'The Stock Times | Global Markets, AI Tech & Financial Intelligence',
    template: '%s | The Stock Times',
  },
  description:
    'Real-time global market reporting, technology and AI equity research, and macroeconomic insights for modern investors.',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#F8FAFC] text-slate-900">
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-58JHHLWK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* 1. Google AdSense Verification & Auto-Ads Script (Loaded only when valid client ID is provided in .env) */}
        {adsenseId && (
          <Script
            id="google-adsense"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* 2. Google Tag Manager / Google Tag (GTM-58JHHLWK) */}
        <Script
          id="gtm-script"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-58JHHLWK"
          strategy="afterInteractive"
        />
        <Script id="gtm-datalayer" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </body>
    </html>
  );
}
