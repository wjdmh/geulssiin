"use client";

import { motion } from "framer-motion";

const meanings = [
    {
        key: "in",
        label: "글씨 + in",
        description: "글씨 안에 담긴 마음, 글씨 안에 스며든 감정, 글씨 안에 머무는 시간",
    },
    {
        key: "人",
        label: "글씨 + 인(人)",
        description: "글씨를 쓰는 사람. 모든 수강생은 글씨를 쓰는 사람이다",
    },
    {
        key: "因",
        label: "글씨 + 인(因)",
        description: "글씨로 인하여. 글씨가 원인이 되어 삶에 변화가 시작된다",
    },
    {
        key: "印",
        label: "글씨인(印)",
        description: "글씨가 곧 도장. 나만의 글씨가 곧 나라는 사람의 인장이 된다",
    },
];

export function NameMeaning() {
    return (
        <section className="py-24 md:py-32 px-6 bg-[#faf8f5]">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4">Name</p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                        <span className="font-bold">글씨인</span>이라는 이름
                    </h2>
                </motion.div>

                <div className="space-y-8">
                    {meanings.map((item, i) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="flex items-start gap-6 md:gap-8"
                        >
                            <span className="shrink-0 w-12 h-12 flex items-center justify-center text-lg font-serif font-bold text-gray-900 border border-gray-200 rounded-full bg-white">
                                {item.key}
                            </span>
                            <div className="pt-1">
                                <h3 className="text-base font-medium text-gray-900 mb-1">{item.label}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
