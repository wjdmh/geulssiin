"use client";

import { motion } from "framer-motion";

export function CTASection() {
    return (
        <section className="py-24 md:py-32 px-6 bg-neutral-900 text-white">
            <div className="max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-4xl font-serif font-bold">
                        첫 수업을 시작해보세요
                    </h2>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed">
                        붓 한 자루로 시작되는 당신만의 예술 여정.
                        <br />
                        부담 없이 문의해 주세요.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
                >
                    <a
                        href="tel:010-2497-4310"
                        className="w-full sm:w-auto px-8 py-3.5 border border-white/30 text-white text-sm font-medium rounded-full hover:bg-white hover:text-black transition-colors text-center"
                    >
                        전화 문의
                    </a>
                    <a
                        href="https://pf.kakao.com/_xkETdn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-colors text-center"
                    >
                        카카오톡 문의
                    </a>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-white/30 text-xs mt-8"
                >
                    수업 중에는 통화가 어려울 수 있으니 문자나 카카오톡을 남겨주세요
                </motion.p>
            </div>
        </section>
    );
}
