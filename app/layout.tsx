import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ModuPort｜輸入規制・通関情報を毎日チェック",
  description:
    "財務省・税関・経産省・厚生労働省など42サイトの公式情報を毎日自動収集。輸入・通関・貿易実務担当者のためのnoteマガジン。",
  openGraph: {
    title: "ModuPort｜輸入規制・通関情報を毎日チェック",
    description:
      "財務省・税関・経産省・厚生労働省など42サイトの公式情報を毎日自動収集。輸入・通関・貿易実務担当者のためのnoteマガジン。",
    type: "website",
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
      </body>
    </html>
  );
}
