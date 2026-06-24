import { Metadata } from "next";
import { GallerySection, type GalleryItem } from "@/components/GallerySection";
import { CTASection } from "@/components/CTASection";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Gallery",
    description: "글씨인아트센터의 캘리그라피, 서예, 펜드로잉 작품을 만나보세요.",
    alternates: { canonical: "/gallery" },
};

// 작품 목록을 서버에서 미리 렌더 → 검색엔진이 작품을 읽을 수 있게 한다.
export default async function GalleryPage() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

    const items = (data ?? []) as GalleryItem[];
    const director = items.filter((a) => a.category === "director");
    const member = items.filter((a) => a.category === "member");

    return (
        <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
            <GallerySection director={director} member={member} />
            <CTASection />
        </div>
    );
}
