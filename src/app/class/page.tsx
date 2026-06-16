import { Metadata } from "next";
import { TimetableSection } from "@/components/TimetableSection";

export const metadata: Metadata = {
    title: "Class",
    description: "붓·붓펜 캘리그라피, 펜·수묵 드로잉, 서예, 글씨교정·필사 단기 클래스, 원데이 클래스 — 글씨인아트센터의 수업을 확인하세요.",
    alternates: { canonical: "/class" },
};

export default function ClassPage() {
    return (
        <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
            <TimetableSection />
        </div>
    );
}
