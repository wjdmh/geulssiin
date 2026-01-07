"use client";

import { motion } from "framer-motion";

import Image from "next/image";

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
                <div className="absolute inset-0 bg-black/50" /> {/* Dark Dim Layer 50% opacity */}
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

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute bottom-12 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-widest text-white/40">아래로 스크롤</span>
                    <div className="w-[1px] h-12 bg-white/20"></div>
                </motion.div>

            </div>
        </section>
    );
}
