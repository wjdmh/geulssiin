import { Metadata } from "next";
import { GallerySection } from "@/components/GallerySection";

export const metadata: Metadata = {
    title: "Gallery",
    description: "글씨인아트센터의 캘리그라피, 서예, 펜드로잉 작품을 만나보세요.",
};

export default function GalleryPage() {
    return (
        <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
            <GallerySection />
        </div>
    );
}
