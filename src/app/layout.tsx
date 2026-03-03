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
  title: {
    default: "글씨인아트센터 | 캘리그라피 · 펜드로잉 · 서예",
    template: "%s | 글씨인아트센터",
  },
  description: "김포 글씨인아트센터 — 붓캘리그라피, 펜드로잉, 서예 클래스. 전통의 깊이와 현대적 감각이 공존하는 예술 공간에서 나만의 감성을 표현하세요.",
  keywords: ["글씨인아트센터", "김포 캘리그라피", "캘리그라피 학원", "펜드로잉", "서예", "붓글씨", "원데이클래스", "김포 미술"],
  openGraph: {
    title: "글씨인아트센터",
    description: "예술이 되는 글씨, 감성이 되는 그림 — 김포 캘리그라피 · 펜드로잉 · 서예 클래스",
    type: "website",
    locale: "ko_KR",
    siteName: "글씨인아트센터",
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
