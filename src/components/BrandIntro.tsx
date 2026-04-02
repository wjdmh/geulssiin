"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

export function BrandIntro() {
    return (
        <section className="section-lg" style={{ borderBottom: "var(--line-default)" }}>
            <div className="container">
                <div style={{ maxWidth: "560px" }}>
                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.8, ease }}
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
                        글씨는 가장 느린 방법으로<br />
                        나를 표현하는 것이다.
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        whileInView={{ opacity: 1, scaleX: 1 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, delay: 0.1, ease }}
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
                        transition={{ duration: 0.8, delay: 0.2, ease }}
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-base)",
                            color: "var(--ink-500)",
                            lineHeight: "var(--lh-relaxed)",
                            letterSpacing: "var(--ls-normal)",
                            marginBottom: "var(--space-10)",
                        }}
                    >
                        빠르게 변하는 세상 속에서 우리가 온전히 통제할 수 있는 건 결국 나 자신입니다.
                        직접 쓰는 글씨는 그 나를 가장 솔직하게 드러내는 행위입니다.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, delay: 0.3, ease }}
                    >
                        <Link
                            href="/about"
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-xs)",
                                color: "var(--ink-500)",
                                letterSpacing: "var(--ls-wider)",
                                textDecoration: "none",
                                borderBottom: "1px solid var(--ink-100)",
                                paddingBottom: "2px",
                                transition: "opacity var(--duration-fast) var(--ease-default)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                        >
                            ABOUT →
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
