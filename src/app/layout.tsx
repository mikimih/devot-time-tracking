import './globals.css';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import { AuthContextProvider } from '@/context/AuthContext';
import { siteConfig } from '@/constant/config';
import { PrimeReactProvider } from 'primereact/api';
import Tailwind from 'primereact/passthrough/tailwind';
import 'primeicons/primeicons.css';
import { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider';

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-nunito-sant',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://devot-time-tracking.vercel.app'),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  authors: [
    {
      name: 'Mihael Vitlov',
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${nunito.className} h-full`}>
        <QueryProvider>
          <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
            <AuthContextProvider>{children}</AuthContextProvider>
          </PrimeReactProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
