"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function DirectorProfile() {
    return (
        <section className="py-24 bg-gray-50 border-t border-black/5">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-5/12 shrink-0"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                            {/* Assuming the image is in public/profile.jpeg */}
                            <Image
                                src="/profile.jpeg"
                                alt="그리운 작가 프로필"
                                fill
                                className="object-cover"
                            />
                            {/* Decorative border */}
                            <div className="absolute inset-4 border border-white/20 z-10" />
                        </div>
                        <div className="mt-6 text-center md:text-left hidden md:block">
                            <h3 className="text-2xl font-serif font-bold text-black mb-1">그리운 작가</h3>
                            <p className="text-sm text-gray-500 font-light tracking-widest uppercase">Director / Artist</p>
                        </div>
                    </motion.div>

                    {/* Text Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full md:w-7/12"
                    >
                        <div className="block md:hidden mb-10">
                            <h3 className="text-3xl font-serif font-bold text-black mb-1">그리운 작가</h3>
                            <p className="text-sm text-gray-500 font-light tracking-widest uppercase">Director / Artist</p>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-lg font-serif font-bold text-black mb-4 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-black"></span>
                                    자격 및 경력
                                </h4>
                                <ul className="space-y-3 text-gray-600 font-light leading-relaxed text-[15px]">
                                    <li>사단법인 한국캘리그라피디자인협회(KCDIA) 정회원 및 인증강사</li>
                                    <li>&apos;글씨인아트센터&apos; 대표(2020~)</li>
                                    <li>&apos;글씨인&apos; 커뮤니티 대표 운영작가</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-lg font-serif font-bold text-black mb-4 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-black"></span>
                                    수상 경력 및 활동
                                </h4>
                                <ul className="space-y-3 text-gray-600 font-light leading-relaxed text-[15px]">
                                    <li>대한민국 미술대전(국전) 특선 및 다수수상</li>
                                    <li>대한민국 서예술인협회 우수상 및 다수 수상</li>
                                    <li>대한민국 서예술인협회 초대작가</li>
                                    <li>서화협회 & 국가보훈문화예술협회 추천작가</li>
                                    <li>전국 각종 캘리그라피 서예대전 및 휘호대회 우수상 및 다수 수상</li>
                                    <li>공모전, 협회전, 초대전, 단체전 등 다양한 전시 활동</li>
                                    <li>관공서 및 교육기관 캘리그라피 & 펜그림 출강 다수</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-black/10">
                            <p className="text-gray-500 italic font-serif text-sm">
                                &quot;글씨는 마음의 거울입니다. <br />
                                진실된 마음으로 쓰고, 아름답게 표현하는 길을 함께 걷겠습니다.&quot;
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
