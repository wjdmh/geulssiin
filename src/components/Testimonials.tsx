"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

const testimonials = [
    { quote: "이 나이에 전시도 하고, 공모전에도 참여하며, 내 작품을 팔기도 했다. 삶에 활력이 돋는다.", age: 69 },
    { quote: "내 글씨로 이것저것 만들어서 지인들에게 선물하는 것이 너무 행복하다.", age: 65 },
    { quote: "글씨를 쓰며 나를 돌아보게 된다. 나에게 온전히 집중할 수 있어서 좋다.", age: 45 },
    { quote: "이렇게 한 분야를 꾸준히 파고든 적은 없는데, 이런 취미활동을 가지게 되어 기쁘다.", age: 49 },
];

export function Testimonials() {
    return (
        <section className="section-lg" style={{ borderBottom: "var(--line-default)", backgroundColor: "var(--paper-100)" }}>
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
                        VOICES
                    </p>
                    <h2 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(var(--text-xl), 3vw, var(--text-3xl))",
                        fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                        lineHeight: "var(--lh-snug)",
                    }}>
                        수강생의 이야기
                    </h2>
                </motion.div>

                {/* Testimonial grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1px",
                    backgroundColor: "var(--ink-100)",
                    border: "var(--line-default)",
                    marginBottom: "var(--space-10)",
                }}>
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.6, delay: i * 0.08, ease }}
                            style={{
                                backgroundColor: "var(--paper-50)",
                                padding: "var(--space-8)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                gap: "var(--space-6)",
                            }}
                        >
                            <p style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "var(--text-base)",
                                fontWeight: 300,
                                color: "var(--ink-800)",
                                lineHeight: "var(--lh-loose)",
                                letterSpacing: "var(--ls-normal)",
                            }}>
                                {t.quote}
                            </p>
                            <p style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-xs)",
                                color: "var(--ink-300)",
                                letterSpacing: "var(--ls-wide)",
                            }}>
                                수강생 · {t.age}세
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, delay: 0.3, ease }}
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wide)",
                    }}
                >
                    1,000명 이상의 수강생이 함께하고 있습니다
                </motion.p>
            </div>
        </section>
    );
}
