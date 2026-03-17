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
  metadataBase: new URL("https://ogmaker.co.kr"),
  title: {
    default: "OGMaker — OG 이미지 생성기 | 무료로 SNS 미리보기 이미지 만들기",
    template: "%s | OGMaker",
  },
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
  keywords: [
    "OG 이미지",
    "OG 이미지 생성기",
    "오픈그래프",
    "OG image generator",
    "SNS 미리보기",
    "메타 이미지",
    "무료 OG 이미지",
    "블로그 썸네일",
    "오픈그래프 이미지 만들기",
    "SNS 공유 이미지",
  ],
  alternates: {
    canonical: "https://ogmaker.co.kr",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <meta name="google-site-verification" content="JVjQCd_p-1S1mD7XycVi5ecnhsnTpKpNcBrPUoJ3lGs" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "OGMaker",
              url: "https://ogmaker.co.kr",
              description:
                "블로그, SNS 공유용 오픈그래프(OG) 이미지를 무료로 만드세요. 8종 템플릿, 한국어 폰트, 커스텀 그라디언트 지원.",
              applicationCategory: "DesignApplication",
              operatingSystem: "Web",
              inLanguage: "ko",
              offers: {
                "@type": "AggregateOffer",
                lowPrice: "0",
                highPrice: "3900",
                priceCurrency: "KRW",
                offerCount: 2,
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "OGMaker",
              url: "https://ogmaker.co.kr",
              logo: "https://ogmaker.co.kr/icon.png",
              description:
                "무료 OG 이미지 생성기 - 블로그와 SNS용 오픈그래프 이미지를 간편하게 만드세요.",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
