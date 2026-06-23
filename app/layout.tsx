import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ModuPort | 輸入規制・通関の公式情報を毎日チェック',
  description: '財務省・税関・経済産業省・厚生労働省など42サイトの最新情報を毎日収集。AIが分析し、実務への影響をnoteで解説します。',
  openGraph: {
    title: 'ModuPort | 輸入規制・通関の公式情報を毎日チェック',
    description: '財務省・税関・経済産業省・厚生労働省など42サイトの最新情報を毎日収集。AIが分析し、実務への影響をnoteで解説します。',
    url: 'https://moduport-lp2.vercel.app',
    siteName: 'ModuPort',
    images: [{ url: '/ogp.png', width: 1200, height: 630, alt: 'ModuPort' }],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ModuPort | 輸入規制・通関の公式情報を毎日チェック',
    description: '財務省・税関・経済産業省・厚生労働省など42サイトの最新情報を毎日収集。AIが分析し、実務への影響をnoteで解説します。',
    images: ['/ogp.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
