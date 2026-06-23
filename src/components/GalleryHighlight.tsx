"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface GalleryItem {
    id: number;
    title: string;
    image_url: string;
    medium: string | null;
    year: string | null;
}

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-80px" };

export function GalleryHighlight() {
    const [items, setItems] = useState<GalleryItem[]>([]);

    useEffect(() => {
        async function fetchHighlights() {
            const supabase = createClient();
            const { data } = await supabase
                .from("gallery")
                .select("id, title, image_url, medium, year")
                .eq("category", "director")
                .order("created_at", { ascending: false })
                .limit(8);
            if (data) setItems(data);
        }
        fetchHighlights();
    }, []);

    if (items.length === 0) return null;

    return (
        <section className="section-lg" style={{ borderBottom: "var(--line-default)", backgroundColor: "var(--paper-100)" }}>
            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewport}
                    transition={{ duration: 0.6, ease }}
                    style={{ marginBottom: "var(--space-10)", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-4)", flexWrap: "wrap" }}
                >
                    <div>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)", letterSpacing: "var(--ls-wider)", marginBottom: "var(--space-5)" }}>
                            GALLERY
                        </p>
                        <h2 style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(var(--text-xl), 3vw, var(--text-3xl))", fontWeight: 700, color: "var(--ink-950)", letterSpacing: "var(--ls-snug)", lineHeight: "var(--lh-snug)" }}>
                            작품
                        </h2>
                    </div>
                    <Link href="/gallery" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--ink-950)", textDecoration: "none", borderBottom: "1px solid var(--ink-950)", paddingBottom: "2px" }}>
                        갤러리 전체 보기 →
                    </Link>
                </motion.div>
            </div>

            {/* 가로 스크롤 — 작품을 크게 하나씩 */}
            <div
                role="region"
                aria-label="작품 가로 스크롤"
                tabIndex={0}
                style={{
                    display: "flex",
                    gap: "var(--space-6)",
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    padding: "0 var(--container-pad-mobile) var(--space-4)",
                    WebkitOverflowScrolling: "touch",
                }}
                className="hl-scroll"
            >
                {items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.6, delay: i * 0.05, ease }}
                        style={{
                            flex: "0 0 auto",
                            width: "clamp(280px, 78vw, 420px)",
                            scrollSnapAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", backgroundColor: "var(--paper-50)" }}>
                            <Image
                                src={item.image_url}
                                alt={item.title}
                                fill
                                style={{ objectFit: "contain", padding: "6%" }}
                                sizes="(max-width: 768px) 78vw, 420px"
                            />
                        </div>
                        <div style={{ paddingTop: "var(--space-5)" }}>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--ink-950)", letterSpacing: "var(--ls-snug)", marginBottom: "var(--space-1)" }}>
                                {item.title}
                            </p>
                            {item.medium && (
                                <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)", letterSpacing: "var(--ls-wide)", marginBottom: "var(--space-4)" }}>
                                    {item.medium}{item.year && ` · ${item.year}`}
                                </p>
                            )}
                            <Link
                                href="/gallery"
                                aria-label={`${item.title} — 갤러리에서 보기`}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-sm)",
                                    fontWeight: 500,
                                    color: "var(--ink-950)",
                                    textDecoration: "none",
                                    border: "1px solid var(--ink-950)",
                                    borderRadius: "9999px",
                                    padding: "8px 16px",
                                    transition: "background-color var(--duration-fast) var(--ease-default), color var(--duration-fast) var(--ease-default)",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--ink-950)"; e.currentTarget.style.color = "var(--paper-50)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink-950)"; }}
                            >
                                갤러리에서 보기 →
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
