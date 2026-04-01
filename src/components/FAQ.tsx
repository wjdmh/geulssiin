"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

const faqs = [
    { question: "글씨를 못 써도 배울 수 있나요?", answer: "네, 대부분의 수강생이 처음 시작하는 분들이에요. 기초부터 차근차근 안내해드립니다." },
    { question: "준비물이 필요한가요?", answer: "기본 재료(붓, 먹물, 종이)는 모두 제공됩니다. 편한 마음만 가지고 오시면 돼요." },
    { question: "원데이 클래스만 할 수도 있나요?", answer: "물론이요! 부담 없이 한 번 체험해보세요. 원데이 클래스는 2시간, 50,000원이며 재료가 포함되어 있습니다." },
    { question: "수업을 빠지면 어떻게 하나요?", answer: "한 달 안에 4회를 채우시면 됩니다. 다른 요일로 자유롭게 보강 가능해요." },
    { question: "주차는 되나요?", answer: "건물 내 주차장 이용 가능합니다." },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="section-lg" style={{ borderBottom: "var(--line-default)", backgroundColor: "var(--paper-50)" }}>
            <div className="container">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, ease }}
                    style={{ marginBottom: "var(--space-12)" }}
                >
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wider)",
                        marginBottom: "var(--space-5)",
                    }}>
                        FAQ
                    </p>
                    <h2 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(var(--text-xl), 3vw, var(--text-3xl))",
                        fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                        lineHeight: "var(--lh-snug)",
                    }}>
                        자주 묻는 질문
                    </h2>
                </motion.div>

                {/* FAQ list */}
                <div style={{ maxWidth: "680px" }}>
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.5, delay: i * 0.06, ease }}
                            style={{ borderBottom: "var(--line-default)" }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "var(--space-6) 0",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    gap: "var(--space-4)",
                                }}
                            >
                                <span style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-base)",
                                    fontWeight: 400,
                                    color: openIndex === i ? "var(--ink-950)" : "var(--ink-800)",
                                    letterSpacing: "var(--ls-normal)",
                                    lineHeight: "var(--lh-snug)",
                                    transition: "color var(--duration-fast) var(--ease-default)",
                                }}>
                                    {faq.question}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                                    transition={{ duration: 0.3, ease }}
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "var(--text-lg)",
                                        color: "var(--ink-300)",
                                        flexShrink: 0,
                                        lineHeight: 1,
                                    }}
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
                                        transition={{ duration: 0.4, ease }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <p style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "var(--text-sm)",
                                            color: "var(--ink-500)",
                                            lineHeight: "var(--lh-relaxed)",
                                            letterSpacing: "var(--ls-normal)",
                                            paddingBottom: "var(--space-6)",
                                        }}>
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
