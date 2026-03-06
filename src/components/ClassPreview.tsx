"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { classCurriculum } from "@/lib/data";

const classKeywords: Record<string, string> = {
    "붓 캘리그라피 클래스": "전통의 깊이",
    "붓펜 캘리그라피 클래스": "일상의 실용",
    "펜드로잉 클래스": "선으로 보는 세상",
    "서예 클래스": "전통의 뿌리",
};

const regularClasses = classCurriculum.filter(c => c.title !== "원데이 클래스");

export function ClassPreview() {
    return (
        <section className="py-24 md:py-32 px-6 bg-[#faf8f5]">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4">Classes</p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">나에게 맞는 수업 찾기</h2>
                </motion.div>

                {/* One-day Class Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 p-8 bg-white border border-gray-200 text-center"
                >
                    <p className="text-xs text-gray-400 tracking-wide mb-3">한 번 체험해보고 싶은 분들을 위해</p>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">원데이 클래스</h3>
                    <p className="text-sm text-gray-500 mb-1">2시간 · 50,000원 · 재료 포함</p>
                    <p className="text-xs text-gray-400 mb-6">부채, 캘리액자, 엽서 & 족자 등 계절별 소품 제작</p>
                    <a
                        href="https://pf.kakao.com/_xkETdn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-2.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors"
                    >
                        일정 문의
                    </a>
                </motion.div>

                {/* Regular Classes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {regularClasses.map((cls, i) => (
                        <motion.div
                            key={cls.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white p-8 border border-gray-100 hover:border-gray-300 transition-colors group flex flex-col"
                        >
                            <p className="text-[10px] tracking-[0.2em] text-gray-400 uppercase mb-4">
                                {classKeywords[cls.title] || ""}
                            </p>
                            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3">
                                {cls.title.replace(" 클래스", "")}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                {cls.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {cls.details.map((d) => (
                                    <span key={d.level} className="text-[11px] text-gray-400 border border-gray-200 px-2.5 py-1 rounded-full">
                                        {d.level}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <p className="text-xs text-gray-400 mb-3">월 150,000원 · 주 1회 · 120분</p>
                                <a
                                    href="https://pf.kakao.com/_xkETdn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-500 hover:text-black transition-colors"
                                >
                                    이 수업 문의하기 &rarr;
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/class"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-1"
                    >
                        수업 안내 전체 보기
                        <span>&rarr;</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
