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
                .limit(4);
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
                    style={{ marginBottom: "var(--space-12)" }}
                >
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wider)",
                        marginBottom: "var(--space-5)",
                    }}>
                        GALLERY
                    </p>
                    <h2 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(var(--text-xl), 3vw, var(--text-3xl))",
                        fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                        lineHeight: "var(--lh-snug)",
                    }}>
                        작품
                    </h2>
                </motion.div>

                {/* Grid: 1 large + 3 small */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "1px",
                    backgroundColor: "var(--ink-100)",
                    border: "var(--line-default)",
                    marginBottom: "var(--space-10)",
                }}>
                    {/* Large featured */}
                    {items[0] && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.7, ease }}
                            style={{
                                gridRow: "span 2",
                                backgroundColor: "var(--paper-100)",
                                overflow: "hidden",
                            }}
                        >
                            <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden" }}>
                                <Image
                                    src={items[0].image_url}
                                    alt={items[0].title}
                                    fill
                                    style={{ objectFit: "cover", transition: "opacity var(--duration-slow) var(--ease-default)" }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                />
                            </div>
                            <div style={{ padding: "var(--space-5) var(--space-6)" }}>
                                <p style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "var(--text-base)",
                                    fontWeight: 300,
                                    color: "var(--ink-950)",
                                    letterSpacing: "var(--ls-snug)",
                                    marginBottom: "var(--space-1)",
                                }}>
                                    {items[0].title}
                                </p>
                                {items[0].medium && (
                                    <p style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "var(--text-xs)",
                                        color: "var(--ink-300)",
                                        letterSpacing: "var(--ls-wide)",
                                    }}>
                                        {items[0].medium}{items[0].year && ` · ${items[0].year}`}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Smaller images */}
                    {items.slice(1, 4).map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={viewport}
                            transition={{ duration: 0.7, delay: (i + 1) * 0.08, ease }}
                            style={{
                                backgroundColor: "var(--paper-100)",
                                overflow: "hidden",
                                gridColumn: i === 2 ? "span 1" : undefined,
                            }}
                        >
                            <div style={{
                                position: "relative",
                                aspectRatio: "1/1",
                                overflow: "hidden",
                            }}>
                                <Image
                                    src={item.image_url}
                                    alt={item.title}
                                    fill
                                    style={{ objectFit: "cover", transition: "opacity var(--duration-slow) var(--ease-default)" }}
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                />
                            </div>
                            <div style={{ padding: "var(--space-4) var(--space-5)" }}>
                                <p style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "var(--text-sm)",
                                    fontWeight: 300,
                                    color: "var(--ink-950)",
                                    letterSpacing: "var(--ls-snug)",
                                }}>
                                    {item.title}
                                </p>
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
                        href="/gallery"
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
                        갤러리 전체 보기 →
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
