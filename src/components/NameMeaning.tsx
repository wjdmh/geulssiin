"use client";

import { motion } from "framer-motion";

const meanings = [
    { key: "in", label: "글씨 + in", description: "글씨 안에 담긴 마음, 글씨 안에 스며든 감정, 글씨 안에 머무는 시간" },
    { key: "人", label: "글씨 + 인(人)", description: "글씨를 쓰는 사람. 모든 수강생은 글씨를 쓰는 사람이다" },
    { key: "因", label: "글씨 + 인(因)", description: "글씨로 인하여. 글씨가 원인이 되어 삶에 변화가 시작된다" },
    { key: "印", label: "글씨인(印)", description: "글씨가 곧 도장. 나만의 글씨가 곧 나라는 사람의 인장이 된다" },
];

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

export function NameMeaning() {
    return (
        <section className="section-lg" style={{
            backgroundColor: "var(--paper-100)",
            borderTop: "var(--line-default)",
            borderBottom: "var(--line-default)",
        }}>
            <div className="container">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, ease }}
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wider)",
                        marginBottom: "var(--space-8)",
                    }}
                >
                    NAME
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.8, delay: 0.1, ease }}
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(var(--text-xl), 3vw, var(--text-2xl))",
                        fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                        marginBottom: "var(--space-16)",
                    }}
                >
                    글씨인이라는 이름
                </motion.h2>

                {/* 1px gap divider grid */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: "var(--ink-100)" }}>
                    {meanings.map((item, i) => (
                        <motion.div
                            key={item.key}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.6, delay: i * 0.08, ease }}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "72px 1fr",
                                gap: "var(--space-8)",
                                padding: "var(--space-8) 0",
                                backgroundColor: "var(--paper-100)",
                                alignItems: "baseline",
                            }}
                        >
                            <span style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "var(--text-xl)",
                                fontWeight: 300,
                                color: "var(--ink-300)",
                                letterSpacing: "var(--ls-snug)",
                            }}>
                                {item.key}
                            </span>
                            <div>
                                <p style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-sm)",
                                    color: "var(--ink-950)",
                                    letterSpacing: "var(--ls-normal)",
                                    marginBottom: "var(--space-2)",
                                }}>
                                    {item.label}
                                </p>
                                <p style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-sm)",
                                    color: "var(--ink-500)",
                                    lineHeight: "var(--lh-relaxed)",
                                    letterSpacing: "var(--ls-normal)",
                                }}>
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
