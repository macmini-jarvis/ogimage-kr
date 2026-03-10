import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OGMaker — OG 이미지 생성기 | 무료로 SNS 미리보기 이미지 만들기",
  description:
    "블로그, SNS 공유용 오픈그래프(OG) 이미지를 무료로 만드세요. 8종 템플릿, 한국어 폰트, 커스텀 그라디언트 지원. 회원가입 없이 바로 다운로드.",
  openGraph: {
    title: "OGMaker — 무료 OG 이미지 생성기",
    description: "블로그·SNS용 OG 이미지를 3초 만에 만드세요. 회원가입 없이 바로 다운로드.",
    url: "https://ogmaker.co.kr",
    siteName: "OGMaker",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OGMaker — 무료 OG 이미지 생성기",
    description: "블로그·SNS용 OG 이미지를 3초 만에 만드세요.",
  },
  keywords: ["OG 이미지", "오픈그래프", "OG image generator", "SNS 미리보기", "메타 이미지", "무료"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <meta name="ows-verify" content="e8f1c4d7f38748bf" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
