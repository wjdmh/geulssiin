"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
    title?: string;
    subtitle?: string;
}

export function Hero({
    title = "글씨인아트센터",
    subtitle = "예술이 되는 글씨, 감성이 되는 그림"
}: HeroProps) {
    return (
        <section className="relative h-screen w-full flex items-center justify-center bg-white text-black overflow-hidden px-4">

            {/* Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero_bg.png"
                    alt="Abstract Ink Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="container mx-auto px-6 h-full flex flex-col items-center justify-center text-center z-10 relative">

                {/* Main Title Group */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <h2 className="text-xl md:text-2xl text-white/80 font-light tracking-[0.1em]">
                        {subtitle}
                    </h2>

                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-white">
                        {title}
                    </h1>

                    <div className="w-16 h-[1px] bg-white/20 mx-auto my-8"></div>

                    <p className="max-w-xl mx-auto text-white/80 leading-relaxed font-light text-sm md:text-base">
                        전통의 깊이와 현대적 감각이 공존하는 공간.<br />
                        글씨와 그림을 통해 나만의 고유한 감성을 표현합니다.
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-10"
                >
                    <a
                        href="https://pf.kakao.com/_xkETdn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
                    >
                        체험 수업 문의
                    </a>
                    <Link
                        href="/class"
                        className="px-8 py-3.5 border border-white/30 text-white text-sm font-medium rounded-full hover:bg-white/10 transition-colors"
                    >
                        수업 안내 보기
                    </Link>
                </motion.div>

                {/* Trust Badge */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="absolute bottom-12 text-white/40 text-xs tracking-widest"
                >
                    KCDA 인증 교육기관
                </motion.p>

            </div>
        </section>
    );
}
