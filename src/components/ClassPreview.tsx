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
    "서예 클래스": "전통의 뿌리",
};

const regularClasses = classCurriculum.filter(c => c.title !== "원데이 클래스");
const onedayClass = classCurriculum.find(c => c.title === "원데이 클래스");

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
                        fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                        lineHeight: "var(--lh-snug)",
                    }}>
                        나에게 맞는 수업 찾기
                    </h2>
                </motion.div>

                {/* Regular Classes */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "1px",
                    backgroundColor: "var(--ink-100)",
                    border: "var(--line-default)",
                    marginBottom: "var(--space-2)",
                }}>
                    {regularClasses.map((cls, i) => (
                        <motion.div
                            key={cls.title}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.6, delay: i * 0.08, ease }}
                            style={{
                                backgroundColor: "var(--paper-50)",
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
                                fontFamily: "var(--font-serif)",
                                fontSize: "var(--text-lg)",
                                fontWeight: 300,
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
                                    월 150,000원 · 주 1회 · 120분
                                </p>
                                <a
                                    href="https://pf.kakao.com/_xkETdn"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "var(--text-sm)",
                                        color: "var(--ink-500)",
                                        textDecoration: "none",
                                        transition: "opacity var(--duration-fast) var(--ease-default)",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.4"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                >
                                    수업 문의하기 →
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* One-day Class */}
                {onedayClass && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, ease }}
                        style={{
                            border: "var(--line-default)",
                            padding: "var(--space-10)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "var(--space-4)",
                            marginBottom: "var(--space-10)",
                        }}
                    >
                        <p style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-xs)",
                            color: "var(--ink-300)",
                            letterSpacing: "var(--ls-wider)",
                        }}>
                            한 번 체험해보고 싶은 분들을 위해
                        </p>
                        <h3 style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "var(--text-xl)",
                            fontWeight: 300,
                            color: "var(--ink-950)",
                            letterSpacing: "var(--ls-snug)",
                        }}>
                            원데이 클래스
                        </h3>
                        <p style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-sm)",
                            color: "var(--ink-500)",
                            letterSpacing: "var(--ls-normal)",
                        }}>
                            2시간 · 50,000원 · 재료 포함<br />
                            부채, 캘리액자, 엽서 & 족자 등 계절별 소품 제작
                        </p>
                        <a
                            href="https://pf.kakao.com/_xkETdn"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: "12px 28px",
                                backgroundColor: "var(--ink-950)",
                                color: "var(--paper-50)",
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-sm)",
                                fontWeight: 400,
                                letterSpacing: "var(--ls-wide)",
                                textDecoration: "none",
                                borderRadius: 0,
                                marginTop: "var(--space-2)",
                                transition: "opacity var(--duration-base) var(--ease-default)",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                        >
                            일정 문의
                        </a>
                    </motion.div>
                )}

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
