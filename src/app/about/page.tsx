import { Metadata } from "next";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { AboutContent } from "./AboutContent";
import { DirectorProfile } from "@/components/DirectorProfile";
import { classCurriculum } from "@/lib/data";

export const metadata: Metadata = {
    title: "센터 소개 | 글씨인아트센터",
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

            {/* Section 2: Director Profile */}
            <DirectorProfile />

            {/* Section 3: Class Preview */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4 block">Programs</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">수업 안내</h2>
                        <div className="w-12 h-[1px] bg-black/20 mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {classCurriculum.slice(0, 5).map((cls, index) => (
                            <div
                                key={index}
                                className={`group p-8 border border-black/5 hover:border-black/10 transition-all duration-500 ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                            >
                                <h3 className="text-lg font-serif font-bold text-black mb-3 group-hover:text-gray-600 transition-colors">
                                    {cls.title}
                                </h3>
                                <p className="text-sm text-gray-500 font-light leading-relaxed mb-4">
                                    {cls.description}
                                </p>
                                <div className="space-y-1">
                                    {cls.details.slice(0, 3).map((detail, i) => (
                                        <p key={i} className="text-xs text-gray-400 font-light">
                                            <span className="text-black/50 font-medium">{detail.level}</span> — {detail.content}
                                        </p>
                                    ))}
                                    {cls.details.length > 3 && (
                                        <p className="text-xs text-gray-300 font-light">외 {cls.details.length - 3}단계</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a
                            href="/class"
                            className="inline-block px-8 py-3 border border-black/10 text-sm text-black/60 hover:text-black hover:border-black/30 transition-all duration-300 tracking-wide"
                        >
                            전체 수업 보기
                        </a>
                    </div>
                </div>
            </section>

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
                            href="tel:01024974310"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
                        >
                            전화 문의
                        </a>
                        <a
                            href="https://pf.kakao.com/_xkETdn"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-black/10 text-sm text-black/70 hover:text-black hover:border-black/30 transition-all duration-300"
                        >
                            카카오톡 문의
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
