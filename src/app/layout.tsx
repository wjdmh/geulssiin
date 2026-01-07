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
  title: "Geulssiin Art Center | 글씨인아트센터",
  description: "Calligraphy & Pen Drawing Studio",
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
