"use client";

import { motion } from "framer-motion";

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

export function CTASection() {
    return (
        <section className="section-lg" style={{ backgroundColor: "var(--primary)" }}>
            <div className="container">
                <div style={{ maxWidth: "480px" }}>
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, ease }}
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-xs)",
                            color: "rgba(255,255,255,0.7)",
                            letterSpacing: "var(--ls-wider)",
                            marginBottom: "var(--space-6)",
                        }}
                    >
                        CONTACT
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.8, delay: 0.1, ease }}
                        style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "clamp(var(--text-xl), 3vw, var(--text-3xl))",
                            fontWeight: 400,
                            color: "#ffffff",
                            letterSpacing: "var(--ls-snug)",
                            lineHeight: "var(--lh-snug)",
                            marginBottom: "var(--space-5)",
                        }}
                    >
                        궁금한 게 있으신가요?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, delay: 0.15, ease }}
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-base)",
                            color: "rgba(255,255,255,0.85)",
                            letterSpacing: "var(--ls-normal)",
                            lineHeight: "var(--lh-relaxed)",
                            marginBottom: "var(--space-10)",
                        }}
                    >
                        부담 없이 물어보세요.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, delay: 0.25, ease }}
                        style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}
                    >
                        <a
                            href="/contact"
                            style={{
                                padding: "14px 28px",
                                backgroundColor: "var(--paper-50)",
                                color: "var(--ink-950)",
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-sm)",
                                fontWeight: 500,
                                letterSpacing: "var(--ls-wide)",
                                textDecoration: "none",
                                borderRadius: "8px",
                                transition: "opacity var(--duration-base) var(--ease-default)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                        >
                            수업 신청하기
                        </a>
                        <button
                            type="button"
                            onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
                            style={{
                                padding: "14px 28px",
                                backgroundColor: "rgba(255,255,255,0.14)",
                                color: "#ffffff",
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-sm)",
                                fontWeight: 500,
                                letterSpacing: "var(--ls-wide)",
                                textDecoration: "none",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                transition: "background-color var(--duration-base) var(--ease-default)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.22)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.14)"; }}
                        >
                            도우미에게 물어보기
                        </button>
                        <a
                            href="tel:010-2497-4310"
                            style={{
                                padding: "14px 28px",
                                backgroundColor: "transparent",
                                color: "#ffffff",
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-sm)",
                                fontWeight: 500,
                                letterSpacing: "var(--ls-wide)",
                                textDecoration: "none",
                                borderRadius: "8px",
                                border: "1px solid rgba(255,255,255,0.45)",
                                transition: "opacity var(--duration-base) var(--ease-default)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                        >
                            전화 문의
                        </a>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, delay: 0.4, ease }}
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-xs)",
                            color: "rgba(255,255,255,0.6)",
                            letterSpacing: "var(--ls-normal)",
                            marginTop: "var(--space-6)",
                        }}
                    >
                        수업 중에는 통화가 어려울 수 있으니 문자나 카카오톡을 남겨주세요
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
