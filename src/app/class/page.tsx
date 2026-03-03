import { Metadata } from "next";
import { TimetableSection } from "@/components/TimetableSection";

export const metadata: Metadata = {
    title: "수업 안내",
    description: "붓캘리그라피, 붓펜캘리그라피, 펜드로잉, 서예, 원데이 클래스 — 글씨인아트센터의 다양한 수업을 확인하세요.",
};

export default function ClassPage() {
    return (
        <div className="pt-20 bg-white min-h-screen">
            <TimetableSection />
        </div>
    );
}
