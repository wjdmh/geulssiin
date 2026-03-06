"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function DirectorPreview() {
    return (
        <section className="py-24 md:py-32 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-gray-700 text-xs tracking-[0.3em] uppercase mb-4 font-medium">Director</p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                        className="w-56 md:w-64 shrink-0"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                            <Image
                                src="/profile.jpeg"
                                alt="그리운 작가"
                                fill
                                className="object-cover"
                                sizes="256px"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-center md:text-left"
                    >
                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">그리운</h3>
                        <p className="text-sm text-gray-400 mb-6">글씨인아트센터 대표 작가</p>

                        <div className="space-y-2 text-sm text-gray-600 mb-8">
                            <p>사범대 미술교육학과 졸업</p>
                            <p>대한민국 미술대전(국전) 특선 다수</p>
                            <p>KCDIA 정회원 및 인증강사</p>
                            <p>대한민국 서예술인협회 초대작가</p>
                        </div>

                        <blockquote className="border-l-2 border-gray-200 pl-4 italic text-gray-500 mb-8">
                            글씨는 마음의 거울입니다.
                            <br />
                            진실된 마음으로 쓰고, 아름답게 표현하는 길을 함께 걷겠습니다.
                        </blockquote>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-1"
                        >
                            더 알아보기
                            <span>&rarr;</span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
