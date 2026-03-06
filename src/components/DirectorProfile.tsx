"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function DirectorProfile() {
    return (
        <section className="py-24 md:py-32 bg-gray-50 border-t border-black/5">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4 block">Director</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-4">글씨인아트센터 대표 이보영</h2>
                </motion.div>

                <div className="flex flex-col md:flex-row items-start gap-12 md:gap-20">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full md:w-5/12 shrink-0"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-200">
                            <Image
                                src="/profile.jpeg"
                                alt="그리운 작가 프로필"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-4 border border-white/20 z-10" />
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
                        <div className="space-y-10">
                            {/* Career Timeline */}
                            <div>
                                <h4 className="text-lg font-serif font-bold text-black mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-black"></span>
                                    자격 및 경력
                                </h4>
                                <div className="space-y-4 border-l border-black/10 pl-6">
                                    {[
                                        { text: "사범대 미술교육학과 졸업", highlight: true },
                                        { text: "사단법인 한국캘리그라피디자인협회(KCDIA) 정회원 및 인증강사", highlight: true },
                                        { text: "글씨인아트센터 대표 (2020~)", highlight: true },
                                        { text: "글씨인 커뮤니티 대표 운영작가", highlight: false },
                                    ].map((item, index) => (
                                        <div key={index} className="relative">
                                            <div className={`absolute -left-[25px] top-[7px] w-2 h-2 rounded-full ${item.highlight ? "bg-black" : "bg-gray-300"}`}></div>
                                            <p className="text-[15px] text-gray-700 font-light leading-relaxed">{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Awards */}
                            <div>
                                <h4 className="text-lg font-serif font-bold text-black mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-black"></span>
                                    수상 경력
                                </h4>
                                <div className="space-y-4 border-l border-black/10 pl-6">
                                    {[
                                        "대한민국 미술대전(국전) 캘리그라피 부문 특선 다수",
                                        "국제현대미술대전 동상",
                                        "대한민국창작미술대전 삼채상",
                                        "대한민국 서예술대전 특선",
                                        "대한민국 서예·문인화공모대전 특선",
                                        "경기미술대전 특선",
                                        "대한민국 서예술인협회 우수상 다수",
                                        "오원상 수상 (현대미술작든그룹전)",
                                        "전국 각종 캘리그라피·서예대전 우수상 다수",
                                    ].map((item, index) => (
                                        <div key={index} className="relative">
                                            <div className="absolute -left-[25px] top-[7px] w-2 h-2 rounded-full bg-gray-300"></div>
                                            <p className="text-[15px] text-gray-600 font-light leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Activities */}
                            <div>
                                <h4 className="text-lg font-serif font-bold text-black mb-6 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-black"></span>
                                    전시 및 활동
                                </h4>
                                <div className="space-y-4 border-l border-black/10 pl-6">
                                    {[
                                        "대한민국 서예술인협회 초대작가",
                                        "서화협회 & 국가보훈문화예술협회 추천작가",
                                        "KCDIA 정기회원전 다수 참여",
                                        "\"묵묵히\" 시리즈 전시 다수",
                                        "글씨인아트센터 회원전시 \"아름다운 처음이여\"",
                                        "공모전, 협회전, 초대전, 단체전 등 다양한 전시 활동",
                                        "관공서 및 교육기관 캘리그라피 & 펜그림 출강 다수",
                                    ].map((item, index) => (
                                        <div key={index} className="relative">
                                            <div className="absolute -left-[25px] top-[7px] w-2 h-2 rounded-full bg-gray-300"></div>
                                            <p className="text-[15px] text-gray-600 font-light leading-relaxed">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quote */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-12 pt-8 border-t border-black/10"
                        >
                            <p className="text-gray-400 italic font-serif text-sm leading-relaxed">
                                글씨는 마음의 거울입니다. <br />
                                진실된 마음으로 쓰고, 아름답게 표현하는 길을 함께 걷겠습니다.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
