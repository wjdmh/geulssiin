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
                    className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-serif"
                >
                    잘 쓴 글씨보다, 마음이 담긴 글씨.
                    <br />
                    그것이 글씨인이 걷는 길입니다.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-12 h-[1px] bg-gray-300 mx-auto"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-sm md:text-base leading-relaxed text-gray-500 font-light"
                >
                    붓끝에서 시작되는 당신만의 시간을 경험해보세요.
                </motion.p>
            </div>
        </section>
    );
}
