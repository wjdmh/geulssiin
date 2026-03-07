import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

import { createClient } from "@/lib/supabase/server";

const notoSans = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const notoSerif = Noto_Serif_KR({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://geulssiin.com'),
  title: {
    default: '글씨인아트센터 | 캘리그라피 · 펜드로잉 · 서예 (김포)',
    template: '%s | 글씨인아트센터',
  },
  description:
    '경기도 김포시 캘리그라피 전문 아트센터. 붓 캘리그라피, 붓펜 캘리그라피, 펜드로잉, 서예 수업. KCDA 인증 교육기관. 원데이클래스 50,000원.',
  keywords: [
    '캘리그라피',
    '김포캘리그라피',
    '캘리그라피학원',
    '펜드로잉',
    '서예',
    '붓캘리그라피',
    '원데이클래스',
    '글씨인아트센터',
    '김포아트센터',
    '캘리그라피자격증',
  ],
  authors: [{ name: '글씨인아트센터', url: 'https://geulssiin.com' }],
  creator: '글씨인아트센터',
  publisher: '글씨인아트센터',
  openGraph: {
    title: '글씨인아트센터 | 캘리그라피 · 펜드로잉 · 서예',
    description:
      '전통의 깊이와 현대적 감각이 공존하는 공간. 글씨와 그림을 통해 나만의 고유한 감성을 표현합니다.',
    url: 'https://geulssiin.com',
    siteName: '글씨인아트센터',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg', // 1200x630px 이미지 준비 필요
        width: 1200,
        height: 630,
        alt: '글씨인아트센터 캘리그라피 수업',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '글씨인아트센터',
    description: '김포 캘리그라피 전문 아트센터',
    images: ['/images/og-image.jpg'],
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
  verification: {
    // Google Search Console 등록 후 아래 값 채우기
    google: 'GOOGLE_VERIFICATION_CODE_HERE',
    // naver: 'NAVER_VERIFICATION_CODE_HERE',
  },
  alternates: {
    canonical: 'https://geulssiin.com',
  },
};

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    profile = data;
  }

  return (
    <html lang="ko">
      <body
        className={`${notoSans.variable} ${notoSerif.variable} antialiased bg-background text-foreground font-sans selection:bg-white/20 selection:text-white`}
      >
        <Navbar user={user} profile={profile} />
        <main className="min-h-screen relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
