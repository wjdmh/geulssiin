"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "이 나이에 전시도 하고, 공모전에도 참여하며, 내 작품을 팔기도 했다. 삶에 활력이 돋는다.",
        age: 69,
    },
    {
        quote: "내 글씨로 이것저것 만들어서 지인들에게 선물하는 것이 너무 행복하다.",
        age: 65,
    },
    {
        quote: "글씨를 쓰며 나를 돌아보게 된다. 나에게 온전히 집중할 수 있어서 좋다.",
        age: 45,
    },
    {
        quote: "이렇게 한 분야를 꾸준히 파고든 적은 없는데, 이런 취미활동을 가지게 되어 기쁘다.",
        age: 49,
    },
];

export function Testimonials() {
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
                    <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4">Voices</p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">수강생의 이야기</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="bg-white p-8 border border-gray-100"
                        >
                            <span className="text-4xl font-serif text-gray-200 leading-none block mb-4">&ldquo;</span>
                            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6 font-light">
                                {t.quote}
                            </p>
                            <p className="text-xs text-gray-400">
                                — 수강생, {t.age}세
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center text-sm text-gray-400 mt-12"
                >
                    1,000명 이상의 수강생이 함께하고 있습니다
                </motion.p>
            </div>
        </section>
    );
}
