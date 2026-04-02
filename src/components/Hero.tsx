"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ease = [0.25, 0.0, 0.0, 1.0] as const;

export function Hero() {
    return (
        <section style={{
            position: "relative",
            height: "100svh",
            minHeight: "600px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
        }}>
            {/* Background Image */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Image
                    src="/images/hero_bg.png"
                    alt="글씨인아트센터"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                />
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundColor: "rgba(15, 14, 13, 0.6)",
                }} />
            </div>

            {/* Content */}
            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease }}
                    style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "rgba(250,248,245,0.4)",
                        letterSpacing: "var(--ls-wider)",
                        marginBottom: "var(--space-6)",
                    }}
                >
                    KCDA 인증 교육기관
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease }}
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(48px, 8vw, var(--text-5xl))",
                        fontWeight: 300,
                        color: "var(--paper-50)",
                        letterSpacing: "var(--ls-tight)",
                        lineHeight: "var(--lh-tight)",
                        marginBottom: "var(--space-6)",
                        maxWidth: "640px",
                    }}
                >
                    글씨 쓰는 사람들
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease }}
                    style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-base)",
                        color: "rgba(250,248,245,0.55)",
                        letterSpacing: "var(--ls-normal)",
                        lineHeight: "var(--lh-relaxed)",
                        marginBottom: "var(--space-10)",
                        maxWidth: "400px",
                    }}
                >
                    書如其人&nbsp;&nbsp;글씨는 곧 그 사람이다
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease }}
                    style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}
                >
                    <a
                        href="https://pf.kakao.com/_xkETdn"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: "14px 32px",
                            backgroundColor: "var(--paper-50)",
                            color: "var(--ink-950)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 400,
                            letterSpacing: "var(--ls-wide)",
                            textDecoration: "none",
                            borderRadius: 0,
                            border: "1px solid transparent",
                            transition: "opacity var(--duration-base) var(--ease-default)",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                    >
                        체험 수업 문의
                    </a>
                    <Link
                        href="/class"
                        style={{
                            padding: "14px 32px",
                            backgroundColor: "transparent",
                            color: "var(--paper-50)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-sm)",
                            fontWeight: 400,
                            letterSpacing: "var(--ls-wide)",
                            textDecoration: "none",
                            borderRadius: 0,
                            border: "1px solid rgba(250,248,245,0.3)",
                            transition: "opacity var(--duration-base) var(--ease-default)",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.6"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                    >
                        수업 안내
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease }}
                style={{
                    position: "absolute",
                    bottom: "var(--space-8)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--space-2)",
                }}
            >
                <span style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-xs)",
                    color: "rgba(250,248,245,0.3)",
                    letterSpacing: "var(--ls-wider)",
                }}>
                    scroll
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                    style={{
                        width: "1px",
                        height: "32px",
                        backgroundColor: "rgba(250,248,245,0.2)",
                    }}
                />
            </motion.div>
        </section>
    );
}
