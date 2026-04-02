"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { classCurriculum } from "@/lib/data";

const SCHEDULE_COLS = ['월', '화', '수', '목', '금', '토'];

interface ClassItem {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    class_name: string;
    description: string;
    max_capacity: number;
    current_enrollment: number;
}

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-60px" };

export function TimetableSection() {
    const [openCurriculum, setOpenCurriculum] = useState<number | null>(null);
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
    const supabase = createClient();

    useEffect(() => {
        async function fetchClasses() {
            const { data } = await supabase.from('classes').select('*');
            if (data) {
                const sorted = (data as ClassItem[]).sort((a, b) => a.start_time.localeCompare(b.start_time));
                setClasses(sorted);
            }
        }
        fetchClasses();
    }, []);

    const getClassesForDay = (day: string) => classes.filter(c => c.day === day);

    return (
        <section className="section-lg">
            <div className="container">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    style={{ marginBottom: "var(--space-16)" }}
                >
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wider)",
                        marginBottom: "var(--space-4)",
                    }}>
                        CLASS
                    </p>
                    <h1 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(var(--text-xl), 3vw, var(--text-2xl))",
                        fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                        marginBottom: "var(--space-4)",
                    }}>
                        수업 안내
                    </h1>
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-base)",
                        color: "var(--ink-500)",
                        lineHeight: "var(--lh-relaxed)",
                        letterSpacing: "var(--ls-normal)",
                    }}>
                        붓 캘리그라피 · 붓펜 캘리그라피 · 펜드로잉 · 서예
                    </p>
                </motion.div>

                {/* Timetable */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, ease }}
                    style={{ marginBottom: "var(--space-24)" }}
                >
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wider)",
                        marginBottom: "var(--space-6)",
                    }}>
                        SCHEDULE
                    </p>

                    <div style={{ overflowX: "auto" }}>
                        <div style={{
                            minWidth: "640px",
                            display: "grid",
                            gridTemplateColumns: `repeat(${SCHEDULE_COLS.length}, 1fr)`,
                            backgroundColor: "var(--ink-100)",
                            gap: "1px",
                            border: "var(--line-default)",
                        }}>
                            {/* Header */}
                            {SCHEDULE_COLS.map(day => (
                                <div key={day} style={{
                                    padding: "var(--space-4)",
                                    backgroundColor: "var(--paper-100)",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-xs)",
                                    color: "var(--ink-500)",
                                    letterSpacing: "var(--ls-wide)",
                                    textAlign: "center",
                                }}>
                                    {day}
                                </div>
                            ))}

                            {/* Content */}
                            {SCHEDULE_COLS.map((day) => {
                                const dayClasses = getClassesForDay(day);
                                return (
                                    <div key={day} style={{
                                        minHeight: "200px",
                                        padding: "var(--space-3)",
                                        backgroundColor: "var(--paper-50)",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "var(--space-2)",
                                    }}>
                                        {dayClasses.length > 0 ? dayClasses.map((cls) => (
                                            <button
                                                key={cls.id}
                                                onClick={() => setSelectedClass(cls)}
                                                style={{
                                                    width: "100%",
                                                    textAlign: "left",
                                                    padding: "var(--space-3)",
                                                    backgroundColor: "var(--paper-100)",
                                                    border: "var(--line-default)",
                                                    cursor: "pointer",
                                                    transition: "background-color var(--duration-fast) var(--ease-default)",
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ink-950)"; e.currentTarget.style.color = "var(--paper-50)"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--paper-100)"; e.currentTarget.style.color = "var(--ink-950)"; }}
                                            >
                                                <p style={{
                                                    fontFamily: "var(--font-sans)",
                                                    fontSize: "var(--text-xs)",
                                                    letterSpacing: "var(--ls-normal)",
                                                    marginBottom: "var(--space-1)",
                                                    color: "inherit",
                                                }}>
                                                    {cls.class_name}
                                                </p>
                                                <p style={{
                                                    fontFamily: "var(--font-sans)",
                                                    fontSize: "10px",
                                                    color: "var(--ink-300)",
                                                    letterSpacing: "var(--ls-wide)",
                                                }}>
                                                    {cls.start_time}–{cls.end_time}
                                                </p>
                                            </button>
                                        )) : (
                                            <div style={{
                                                flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                                                fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-100)",
                                            }}>
                                                —
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Curriculum */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, ease }}
                >
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wider)",
                        marginBottom: "var(--space-8)",
                    }}>
                        CURRICULUM
                    </p>

                    {/* 1px gap accordion */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: "var(--ink-100)" }}>
                        {classCurriculum.map((cls, index) => {
                            const isOpen = openCurriculum === index;
                            return (
                                <div key={cls.title} style={{ backgroundColor: "var(--paper-50)" }}>
                                    <button
                                        onClick={() => setOpenCurriculum(isOpen ? null : index)}
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
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-6)" }}>
                                            <span style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "var(--text-xs)",
                                                color: "var(--ink-300)",
                                                letterSpacing: "var(--ls-wider)",
                                                minWidth: "24px",
                                            }}>
                                                0{index + 1}
                                            </span>
                                            <span style={{
                                                fontFamily: "var(--font-serif)",
                                                fontSize: "clamp(var(--text-base), 2vw, var(--text-lg))",
                                                fontWeight: 300,
                                                color: isOpen ? "var(--ink-950)" : "var(--ink-500)",
                                                letterSpacing: "var(--ls-snug)",
                                                transition: "color var(--duration-fast) var(--ease-default)",
                                            }}>
                                                {cls.title}
                                            </span>
                                        </div>
                                        <span style={{
                                            fontFamily: "var(--font-sans)",
                                            fontSize: "var(--text-lg)",
                                            color: "var(--ink-300)",
                                            lineHeight: 1,
                                            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                                            transition: "transform var(--duration-base) var(--ease-default)",
                                            display: "inline-block",
                                        }}>
                                            +
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease }}
                                                style={{ overflow: "hidden" }}
                                            >
                                                <div style={{
                                                    paddingBottom: "var(--space-8)",
                                                    paddingLeft: "calc(24px + var(--space-6))",
                                                }}>
                                                    <p style={{
                                                        fontFamily: "var(--font-sans)",
                                                        fontSize: "var(--text-sm)",
                                                        color: "var(--ink-500)",
                                                        lineHeight: "var(--lh-relaxed)",
                                                        marginBottom: "var(--space-6)",
                                                    }}>
                                                        {cls.description}
                                                    </p>
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "1px",
                                                        backgroundColor: "var(--ink-100)",
                                                        maxWidth: "480px",
                                                    }}>
                                                        {cls.details.map((d, i) => (
                                                            <div key={i} style={{
                                                                display: "grid",
                                                                gridTemplateColumns: "100px 1fr",
                                                                backgroundColor: "var(--paper-100)",
                                                                padding: "var(--space-4) var(--space-4)",
                                                                gap: "var(--space-4)",
                                                            }}>
                                                                <span style={{
                                                                    fontFamily: "var(--font-sans)",
                                                                    fontSize: "var(--text-xs)",
                                                                    color: "var(--ink-950)",
                                                                    letterSpacing: "var(--ls-normal)",
                                                                }}>
                                                                    {d.level}
                                                                </span>
                                                                <span style={{
                                                                    fontFamily: "var(--font-sans)",
                                                                    fontSize: "var(--text-xs)",
                                                                    color: "var(--ink-500)",
                                                                    lineHeight: "var(--lh-relaxed)",
                                                                }}>
                                                                    {d.content}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Class Detail Modal */}
            <AnimatePresence>
                {selectedClass && (
                    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-6)" }}>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(15,14,13,0.5)" }}
                            onClick={() => setSelectedClass(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.4, ease }}
                            style={{
                                position: "relative", zIndex: 201,
                                width: "100%", maxWidth: "400px",
                                backgroundColor: "var(--paper-50)",
                                border: "var(--line-default)",
                                padding: "var(--space-10)",
                            }}
                        >
                            <button
                                onClick={() => setSelectedClass(null)}
                                style={{
                                    position: "absolute", top: "var(--space-6)", right: "var(--space-6)",
                                    background: "none", border: "none", cursor: "pointer",
                                    color: "var(--ink-300)",
                                    transition: "color var(--duration-fast) var(--ease-default)",
                                }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-950)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-300)"; }}
                            >
                                <X size={20} strokeWidth={1.5} />
                            </button>

                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)", letterSpacing: "var(--ls-wider)", marginBottom: "var(--space-4)" }}>
                                CLASS DETAIL
                            </p>
                            <h3 style={{
                                fontFamily: "var(--font-serif)",
                                fontSize: "var(--text-xl)", fontWeight: 300,
                                color: "var(--ink-950)",
                                marginBottom: "var(--space-8)",
                            }}>
                                {selectedClass.class_name}
                            </h3>

                            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", paddingTop: "var(--space-6)", borderTop: "var(--line-default)" }}>
                                {[
                                    { label: "요일", val: `${selectedClass.day}요일` },
                                    { label: "시간", val: `${selectedClass.start_time} – ${selectedClass.end_time}` },
                                    { label: "정원", val: `${selectedClass.current_enrollment} / ${selectedClass.max_capacity || '∞'}` },
                                ].map(item => (
                                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)", letterSpacing: "var(--ls-wide)" }}>{item.label}</span>
                                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-950)" }}>{item.val}</span>
                                    </div>
                                ))}
                            </div>

                            {selectedClass.description && (
                                <p style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-sm)",
                                    color: "var(--ink-500)",
                                    lineHeight: "var(--lh-relaxed)",
                                    paddingTop: "var(--space-6)",
                                    borderTop: "var(--line-subtle)",
                                    marginTop: "var(--space-6)",
                                }}>
                                    {selectedClass.description}
                                </p>
                            )}

                            <a
                                href="https://pf.kakao.com/_xkETdn"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "block",
                                    marginTop: "var(--space-8)",
                                    padding: "14px 0",
                                    backgroundColor: "var(--ink-950)",
                                    color: "var(--paper-50)",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-sm)",
                                    letterSpacing: "var(--ls-wide)",
                                    textDecoration: "none",
                                    textAlign: "center",
                                    transition: "opacity var(--duration-fast) var(--ease-default)",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                            >
                                수강 문의
                            </a>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
