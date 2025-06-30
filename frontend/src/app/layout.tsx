import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/query-provider';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Desafio Cogna',
    template: `%s | Desafio Cogna`,
  },
  description:
    'Demosntração de um front-end moderno e responsivo para uma vitrine de produtos.',
  openGraph: {
    title: 'Desafio Técnico Cogna',
    description:
      'Demosntração de um front-end moderno e responsivo para uma vitrine de produtos.',
    url: 'https://github.com/brenoocanha/cogna-test',
    siteName: 'Desafio Técnico Cogna',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="relative min-h-screen">{children}</div>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
