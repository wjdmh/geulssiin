"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "글씨를 못 써도 배울 수 있나요?",
        answer: "네, 대부분의 수강생이 처음 시작하는 분들이에요. 기초부터 차근차근 안내해드립니다.",
    },
    {
        question: "준비물이 필요한가요?",
        answer: "기본 재료(붓, 먹물, 종이)는 모두 제공됩니다. 편한 마음만 가지고 오시면 돼요.",
    },
    {
        question: "원데이 클래스만 할 수도 있나요?",
        answer: "물론이요! 부담 없이 한 번 체험해보세요. 원데이 클래스는 2시간, 50,000원이며 재료가 포함되어 있습니다.",
    },
    {
        question: "수업을 빠지면 어떻게 하나요?",
        answer: "한 달 안에 4회를 채우시면 됩니다. 다른 요일로 자유롭게 보강 가능해요.",
    },
    {
        question: "주차는 되나요?",
        answer: "건물 내 주차장 이용 가능합니다.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 md:py-32 px-6 bg-white">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4">FAQ</p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">자주 묻는 질문</h2>
                </motion.div>

                <div className="divide-y divide-gray-100">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between py-6 text-left group"
                            >
                                <span className="text-sm md:text-base text-gray-800 font-medium group-hover:text-black transition-colors pr-4">
                                    {faq.question}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-gray-400 text-xl shrink-0"
                                >
                                    +
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-sm text-gray-500 font-light leading-relaxed pb-6 pl-0">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
