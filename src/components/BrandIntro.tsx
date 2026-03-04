"use client";

import { motion } from "framer-motion";

export function BrandIntro() {
    return (
        <section className="py-28 md:py-36 px-6 bg-[#faf8f5]">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-gray-400 text-xs tracking-[0.3em] uppercase"
                >
                    Philosophy
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl leading-relaxed text-gray-600 font-light"
                >
                    디지털이 모든 것을 대체하는 시대,
                    <br />
                    손으로 쓴 글씨에는 대체할 수 없는 온기가 있습니다.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl leading-relaxed text-gray-800 font-light"
                >
                    글씨인아트센터는 그 온기를 지키는 공간입니다.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="w-12 h-[1px] bg-gray-300 mx-auto"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-sm md:text-base leading-relaxed text-gray-500 font-light"
                >
                    붓끝에서 퍼지는 먹의 농담, 펜촉이 종이를 스치는 사각거림 —
                    <br />
                    그 안에 담긴 당신의 호흡과 감정이 예술이 됩니다.
                </motion.p>
            </div>
        </section>
    );
}
