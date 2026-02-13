import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auto10x - 네이버 블로그 & 카페 마케팅 자동화",
  description:
    "네이버 블로그 원고 편집, 블로거 수집, 카페 포스팅까지. 블로그 마케팅에 필요한 모든 자동화를 한곳에서.",
  openGraph: {
    title: "Auto10x - 네이버 블로그 & 카페 마케팅 자동화",
    description:
      "네이버 블로그 원고 편집, 블로거 수집, 카페 포스팅까지. 블로그 마케팅에 필요한 모든 자동화를 한곳에서.",
    url: "https://auto10x.newdev.it",
    siteName: "Auto10x",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://auto10x.newdev.it",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics - TODO: auto10x용 GA4 측정 ID 추가 */}

        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
