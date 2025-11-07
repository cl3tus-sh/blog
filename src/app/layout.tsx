import type { Metadata } from 'next';
import PlausibleProvider from 'next-plausible';
import { Geist, Geist_Mono, Merriweather } from 'next/font/google';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { siteConfig } from '@/config/site';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@cl3tus_',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-background text-foreground scheme-light-dark"
      suppressHydrationWarning
    >
      <head>
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} antialiased flex h-fit min-h-screen flex-col gap-y-6 font-sans`}
      >
        <PlausibleProvider
          domain={siteConfig.analytics.plausibleDomain}
          customDomain={siteConfig.analytics.plausibleCustomDomain}
          selfHosted
          trackOutboundLinks
          trackFileDownloads
          hash
          taggedEvents
          pageviewProps
        >
          <Header />
          <main className="w-full mx-auto flex grow flex-col gap-y-6 px-4">{children}</main>
          <Footer />
        </PlausibleProvider>
      </body>
    </html>
  );
}
