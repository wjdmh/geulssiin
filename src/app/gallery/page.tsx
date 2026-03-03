import { Metadata } from "next";
import { GallerySection } from "@/components/GallerySection";

export const metadata: Metadata = {
    title: "갤러리",
    description: "글씨인아트센터의 캘리그라피, 서예, 펜드로잉 작품을 만나보세요. 그리운 작가와 수강생들의 작품을 감상하고 구매하실 수 있습니다.",
};

export default function GalleryPage() {
    return (
        <div className="pt-20 bg-white min-h-screen">
            <GallerySection />
        </div>
    );
}
