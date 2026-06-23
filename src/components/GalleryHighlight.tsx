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
                .limit(6);
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
                    <Link href="/gallery" style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", fontWeight: 500, color: "var(--ink-950)", textDecoration: "none", borderBottom: "1px solid var(--ink-950)", paddingBottom: "2px", whiteSpace: "nowrap" }}>
                        갤러리 전체 보기 →
                    </Link>
                </motion.div>

                {/* 모바일=스냅 가로 스크롤 / 데스크톱=3-up 그리드 (.gallery-rail) */}
                <div className="gallery-rail" role="region" aria-label="대표 작품">
                    {items.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.6, delay: i * 0.05, ease }}
                        >
                            <Link
                                href="/gallery"
                                aria-label={`${item.title} — 갤러리에서 보기`}
                                style={{ display: "block", textDecoration: "none" }}
                                onMouseEnter={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1.03)"; }}
                                onMouseLeave={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1)"; }}
                            >
                                <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", backgroundColor: "var(--paper-50)" }}>
                                    <Image
                                        src={item.image_url}
                                        alt={item.title}
                                        fill
                                        style={{ objectFit: "contain", padding: "7%", transition: "transform var(--duration-slow) var(--ease-default)" }}
                                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 44vw, 33vw"
                                    />
                                </div>
                                <div style={{ paddingTop: "var(--space-5)" }}>
                                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-lg)", fontWeight: 600, color: "var(--ink-950)", letterSpacing: "var(--ls-snug)", marginBottom: "var(--space-1)" }}>
                                        {item.title}
                                    </p>
                                    {item.medium && (
                                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)", letterSpacing: "var(--ls-wide)" }}>
                                            {item.medium}{item.year && ` · ${item.year}`}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
