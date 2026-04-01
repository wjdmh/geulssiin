"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

export function DirectorPreview() {
    return (
        <section className="section-lg" style={{ borderBottom: "var(--line-default)", backgroundColor: "var(--paper-50)" }}>
            <div className="container">

                {/* Header */}
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
                        marginBottom: "var(--space-12)",
                    }}
                >
                    DIRECTOR
                </motion.p>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-12)",
                }}
                    className="md:flex-row md:items-start md:gap-16"
                >
                    {/* Portrait */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.7, ease }}
                        style={{ flexShrink: 0, width: "200px" }}
                        className="w-40 md:w-52"
                    >
                        <div style={{
                            position: "relative",
                            aspectRatio: "3/4",
                            overflow: "hidden",
                            border: "var(--line-default)",
                            backgroundColor: "var(--paper-100)",
                        }}>
                            <Image
                                src="/profile.jpeg"
                                alt="그리운 작가"
                                fill
                                style={{ objectFit: "cover" }}
                                sizes="208px"
                            />
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.7, delay: 0.1, ease }}
                    >
                        <h3 style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "var(--text-xl)",
                            fontWeight: 300,
                            color: "var(--ink-950)",
                            letterSpacing: "var(--ls-snug)",
                            marginBottom: "var(--space-2)",
                        }}>
                            그리운
                        </h3>
                        <p style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-sm)",
                            color: "var(--ink-300)",
                            letterSpacing: "var(--ls-normal)",
                            marginBottom: "var(--space-8)",
                        }}>
                            글씨인아트센터 대표 작가
                        </p>

                        <div style={{ marginBottom: "var(--space-8)" }}>
                            {[
                                "사범대 미술교육학과 졸업",
                                "대한민국 미술대전(국전) 특선 외 다수",
                                "KCDA 교육위원",
                                "대한민국 서예술대전 초대작가",
                            ].map((item, i) => (
                                <p key={i} style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-sm)",
                                    color: "var(--ink-500)",
                                    letterSpacing: "var(--ls-normal)",
                                    lineHeight: "var(--lh-relaxed)",
                                    paddingBlock: "var(--space-2)",
                                    borderBottom: i < 3 ? "var(--line-subtle)" : "none",
                                }}>
                                    {item}
                                </p>
                            ))}
                        </div>

                        <p style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "var(--text-base)",
                            fontWeight: 300,
                            color: "var(--ink-500)",
                            lineHeight: "var(--lh-loose)",
                            letterSpacing: "var(--ls-normal)",
                            borderLeft: "var(--line-default)",
                            paddingLeft: "var(--space-5)",
                            marginBottom: "var(--space-8)",
                        }}>
                            글씨는 마음의 거울입니다.<br />
                            진실된 마음으로 쓰고, 아름답게 표현하는 길을 함께 걷겠습니다.
                        </p>

                        <Link
                            href="/about"
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-sm)",
                                color: "var(--ink-500)",
                                textDecoration: "none",
                                letterSpacing: "var(--ls-wide)",
                                borderBottom: "var(--line-default)",
                                paddingBottom: "2px",
                                transition: "opacity var(--duration-fast) var(--ease-default)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.4"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                        >
                            더 알아보기 →
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
