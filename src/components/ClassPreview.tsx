"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { classCurriculum } from "@/lib/data";

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

const classKeywords: Record<string, string> = {
    "붓 캘리그라피 클래스": "전통의 깊이",
    "붓펜 캘리그라피 클래스": "일상의 실용",
    "펜드로잉 클래스": "선으로 보는 세상",
    "수묵 드로잉 클래스": "먹과 여백",
    "서예 클래스": "전통의 뿌리",
    "글씨교정 클래스": "바른 손글씨",
    "필사 클래스": "마음을 적다",
    "원데이 클래스": "한 번의 체험",
};

// 원데이 포함 전체를 그리드로 (그리드 빈 칸 채움)
const allClasses = classCurriculum;

export function ClassPreview() {
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
                        CLASSES
                    </p>
                    <h2 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(var(--text-xl), 3vw, var(--text-3xl))",
                        fontWeight: 400,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                        lineHeight: "var(--lh-snug)",
                    }}>
                        나에게 맞는 수업 찾기
                    </h2>
                </motion.div>

                {/* Classes (원데이 포함 전체) */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1px",
                    backgroundColor: "var(--ink-100)",
                    border: "var(--line-default)",
                    marginBottom: "var(--space-2)",
                }}>
                    {allClasses.map((cls, i) => (
                        <motion.div
                            key={cls.title}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.6, delay: i * 0.08, ease }}
                            style={{
                                backgroundColor: "var(--paper-100)",
                                padding: "var(--space-8)",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <p style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-xs)",
                                color: "var(--ink-300)",
                                letterSpacing: "var(--ls-wider)",
                                marginBottom: "var(--space-4)",
                            }}>
                                {classKeywords[cls.title] || ""}
                            </p>
                            <h3 style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-lg)",
                                fontWeight: 500,
                                color: "var(--ink-950)",
                                letterSpacing: "var(--ls-snug)",
                                marginBottom: "var(--space-4)",
                            }}>
                                {cls.title.replace(" 클래스", "")}
                            </h3>
                            <p style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-sm)",
                                color: "var(--ink-500)",
                                lineHeight: "var(--lh-relaxed)",
                                letterSpacing: "var(--ls-normal)",
                                marginBottom: "var(--space-6)",
                            }}>
                                {cls.description}
                            </p>

                            {/* Level tags */}
                            <div style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "var(--space-2)",
                                marginBottom: "var(--space-6)",
                            }}>
                                {cls.details.map((d) => (
                                    <span key={d.level} style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "var(--text-xs)",
                                        color: "var(--ink-300)",
                                        border: "var(--line-default)",
                                        borderRadius: "var(--radius-xs)",
                                        padding: "3px 10px",
                                        letterSpacing: "var(--ls-wide)",
                                    }}>
                                        {d.level}
                                    </span>
                                ))}
                            </div>

                            <div style={{
                                marginTop: "auto",
                                paddingTop: "var(--space-5)",
                                borderTop: "var(--line-default)",
                            }}>
                                <p style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-xs)",
                                    color: "var(--ink-300)",
                                    letterSpacing: "var(--ls-normal)",
                                    marginBottom: "var(--space-3)",
                                }}>
                                    {cls.meta}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        alignSelf: "flex-start",
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "var(--text-sm)",
                                        fontWeight: 500,
                                        color: "var(--ink-950)",
                                        background: "transparent",
                                        border: "1px solid var(--ink-950)",
                                        borderRadius: "9999px",
                                        padding: "9px 18px",
                                        cursor: "pointer",
                                        transition: "background-color var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default)",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ink-950)"; e.currentTarget.style.color = "var(--paper-50)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink-950)"; }}
                                >
                                    수업 문의하기 →
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* More link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, delay: 0.3, ease }}
                >
                    <Link
                        href="/class"
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
                        수업 안내 전체 보기 →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
