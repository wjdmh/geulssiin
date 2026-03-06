import { Metadata } from "next";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { AboutContent } from "./AboutContent";
import { DirectorProfile } from "@/components/DirectorProfile";
import { NameMeaning } from "@/components/NameMeaning";

export const metadata: Metadata = {
    title: "센터 소개",
    description: "글씨인아트센터는 전통 서예의 깊이와 현대적 감각을 잇는 예술 공간입니다. 붓캘리그라피, 펜드로잉, 서예 클래스를 운영합니다.",
};

export default async function AboutPage() {
    const config = await getSiteConfig();

    return (
        <div className="min-h-screen bg-white">
            {/* Section 1: Hero Title */}
            <section className="pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <AboutContent
                        title={config.about_title}
                        content={config.about_content}
                    />
                </div>
            </section>

            {/* Section 2: "글씨인" Name Meaning */}
            <NameMeaning />

            {/* Section 3: Director Profile */}
            <DirectorProfile />

            {/* Section 4: CTA */}
            <section className="py-24 md:py-32 bg-gray-50 border-t border-black/5">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-6">
                        첫 수업을 시작해보세요
                    </h2>
                    <p className="text-gray-500 font-light leading-relaxed mb-10 max-w-xl mx-auto">
                        글씨와 그림을 통해 일상의 잡념을 비우고, 오롯이 나에게 집중하는 시간을 경험해보세요.
                        원데이 클래스로 부담 없이 시작할 수 있습니다.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="https://pf.kakao.com/_xkETdn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
                        >
                            카카오톡 문의
                        </a>
                        <a
                            href="tel:01024974310"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-black/10 text-sm text-black/70 hover:text-black hover:border-black/30 transition-all duration-300"
                        >
                            전화 문의
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
