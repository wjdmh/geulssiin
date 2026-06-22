import { Metadata } from "next";
import { GalleryRoom } from "@/components/GalleryRoom";
import { GalleryItem } from "@/components/GallerySection";
import { createClient } from "@/lib/supabase/server";

// 실사 합성 뷰어 미리보기 (라이브 /gallery 영향 없음). 검색엔진 비노출.
export const metadata: Metadata = {
    title: "Gallery (preview)",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function GalleryPreviewPage() {
    const supabase = await createClient();
    const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });

    const items = (data ?? []) as GalleryItem[];
    const director = items.filter((a) => a.category === "director");
    const artworks = (director.length > 0 ? director : items);

    return (
        <div style={{ paddingTop: "56px", minHeight: "100vh" }}>
            <GalleryRoom
                artworks={artworks}
                exhibitionEyebrow="전시 · 미리보기"
                exhibitionTitle="먹, 번지다 — 그리운 이보영"
            />
        </div>
    );
}
