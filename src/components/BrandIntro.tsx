"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

export function BrandIntro() {
    return (
        <section className="section-lg" style={{ borderBottom: "var(--line-default)" }}>
            <div className="container">
                <div style={{ maxWidth: "560px" }}>
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
                        PHILOSOPHY
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(var(--text-xl), 3.5vw, var(--text-3xl))",
                            fontWeight: 300,
                            color: "var(--ink-950)",
                            letterSpacing: "var(--ls-snug)",
                            lineHeight: "var(--lh-snug)",
                            marginBottom: "var(--space-8)",
                        }}
                    >
                        마음이 담긴 글씨,<br />
                        그것이 글씨인이 걷는 길입니다.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, delay: 0.2, ease }}
                        style={{
                            width: "32px",
                            height: "1px",
                            backgroundColor: "var(--ink-100)",
                            transformOrigin: "left",
                            marginBottom: "var(--space-8)",
                        }}
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.8, delay: 0.3, ease }}
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-base)",
                            color: "var(--ink-500)",
                            lineHeight: "var(--lh-relaxed)",
                            letterSpacing: "var(--ls-normal)",
                        }}
                    >
                        붓끝에서 시작되는 당신만의 시간을 경험해보세요.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
