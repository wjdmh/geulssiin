"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface GalleryItem {
    id: number;
    title: string;
    description: string | null;
    image_url: string;
    category: string;
    created_at: string;
    price: string | null;
    is_for_sale: boolean;
    is_sold: boolean;
    medium: string | null;
    dimensions: string | null;
    year: string | null;
}

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const viewport = { once: true, margin: "-60px" };

export function GallerySection() {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [activeTab, setActiveTab] = useState<'director' | 'member'>('director');
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchGallery() {
            setLoading(true);
            const { data } = await supabase
                .from('gallery')
                .select('*')
                .eq('category', activeTab)
                .order('created_at', { ascending: false });
            if (data) setImages(data as GalleryItem[]);
            setLoading(false);
        }
        fetchGallery();
    }, [activeTab]);

    const tabs: { key: 'director' | 'member'; label: string; sub: string }[] = [
        { key: 'director', label: '그리운 갤러리', sub: '글씨인아트센터 대표 작가' },
        { key: 'member', label: '회원 갤러리', sub: '글씨인아트센터 수강생 작품' },
    ];

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
                        GALLERY
                    </p>
                    <h1 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(var(--text-xl), 3vw, var(--text-2xl))",
                        fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                        marginBottom: "var(--space-12)",
                    }}>
                        작품
                    </h1>

                    {/* Tabs */}
                    <div style={{
                        display: "flex",
                        gap: "0",
                        borderBottom: "var(--line-default)",
                    }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    padding: "var(--space-4) var(--space-6) var(--space-4) 0",
                                    marginRight: "var(--space-8)",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-sm)",
                                    color: activeTab === tab.key ? "var(--ink-950)" : "var(--ink-300)",
                                    letterSpacing: "var(--ls-normal)",
                                    borderBottom: activeTab === tab.key ? "1px solid var(--ink-950)" : "1px solid transparent",
                                    marginBottom: "-1px",
                                    transition: "color var(--duration-fast) var(--ease-default)",
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                fontFamily: "var(--font-sans)",
                                fontSize: "var(--text-xs)",
                                color: "var(--ink-300)",
                                letterSpacing: "var(--ls-wide)",
                                marginTop: "var(--space-4)",
                            }}
                        >
                            {tabs.find(t => t.key === activeTab)?.sub}
                        </motion.p>
                    </AnimatePresence>
                </motion.div>

                {/* Gallery Grid */}
                <div style={{ minHeight: "400px" }}>
                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-20) 0" }}>
                            <div style={{
                                width: "24px", height: "24px",
                                border: "1px solid var(--ink-100)",
                                borderTop: "1px solid var(--ink-500)",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                            }} />
                        </div>
                    ) : images.length > 0 ? (
                        <div style={{
                            columns: "1",
                            columnGap: "var(--space-6)",
                        }}
                            className="md:columns-2 lg:columns-3"
                        >
                            {images.map((art, i) => (
                                <motion.div
                                    key={art.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.05, ease }}
                                    style={{
                                        breakInside: "avoid",
                                        marginBottom: "var(--space-6)",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setSelectedImage(art)}
                                >
                                    <div
                                        style={{ position: "relative", overflow: "hidden", backgroundColor: "var(--paper-100)" }}
                                        onMouseEnter={(e) => { (e.currentTarget.firstChild as HTMLElement).style.opacity = "0.85"; }}
                                        onMouseLeave={(e) => { (e.currentTarget.firstChild as HTMLElement).style.opacity = "1"; }}
                                    >
                                        <Image
                                            src={art.image_url}
                                            alt={art.title}
                                            width={600}
                                            height={800}
                                            style={{ width: "100%", height: "auto", objectFit: "cover", display: "block", transition: "opacity var(--duration-base) var(--ease-default)" }}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        {art.is_for_sale && !art.is_sold && (
                                            <div style={{
                                                position: "absolute", top: "var(--space-4)", right: "var(--space-4)",
                                                backgroundColor: "var(--paper-50)",
                                                padding: "4px 10px",
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "var(--text-xs)",
                                                color: "var(--ink-950)",
                                                letterSpacing: "var(--ls-wider)",
                                            }}>
                                                Available
                                            </div>
                                        )}
                                        {art.is_sold && (
                                            <div style={{
                                                position: "absolute", top: "var(--space-4)", right: "var(--space-4)",
                                                backgroundColor: "var(--ink-950)",
                                                padding: "4px 10px",
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "var(--text-xs)",
                                                color: "var(--paper-50)",
                                                letterSpacing: "var(--ls-wider)",
                                            }}>
                                                Sold
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: "var(--space-4) 0 var(--space-2)" }}>
                                        <p style={{
                                            fontFamily: "var(--font-serif)",
                                            fontSize: "var(--text-base)",
                                            color: "var(--ink-950)",
                                            letterSpacing: "var(--ls-snug)",
                                            marginBottom: "var(--space-1)",
                                        }}>
                                            {art.title}
                                        </p>
                                        {(art.medium || art.dimensions || art.year) && (
                                            <p style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "var(--text-xs)",
                                                color: "var(--ink-300)",
                                                letterSpacing: "var(--ls-wide)",
                                            }}>
                                                {[art.medium, art.dimensions, art.year].filter(Boolean).join(' · ')}
                                            </p>
                                        )}
                                        {art.is_for_sale && !art.is_sold && (
                                            <p style={{
                                                fontFamily: "var(--font-sans)",
                                                fontSize: "var(--text-xs)",
                                                color: "var(--ink-500)",
                                                marginTop: "var(--space-1)",
                                            }}>
                                                {art.price === '미정' ? '가격 문의' : art.price}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "var(--space-24) 0", gap: "var(--space-3)" }}
                        >
                            <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-lg)", color: "var(--ink-300)", fontWeight: 300 }}>
                                등록된 작품이 없습니다.
                            </p>
                            <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--ink-300)" }}>
                                곧 업데이트 될 예정입니다.
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        style={{
                            position: "fixed", inset: 0, zIndex: 200,
                            backgroundColor: "var(--paper-50)",
                            overflowY: "auto",
                        }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            style={{
                                position: "fixed", top: "var(--space-8)", right: "var(--space-8)", zIndex: 201,
                                background: "none", border: "none", cursor: "pointer",
                                color: "var(--ink-300)",
                                transition: "color var(--duration-fast) var(--ease-default)",
                                padding: "var(--space-2)",
                            }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-950)"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-300)"; }}
                        >
                            <X size={24} strokeWidth={1.5} />
                        </button>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease }}
                            style={{
                                minHeight: "100vh", display: "flex",
                                flexDirection: "column", alignItems: "center",
                                justifyContent: "center",
                                padding: "var(--space-20) var(--space-6)",
                                maxWidth: "960px",
                                margin: "0 auto",
                                gap: "var(--space-10)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="md:flex-row"
                        >
                            {/* Image */}
                            <div style={{ position: "relative", flex: 1, width: "100%", maxHeight: "80vh" }}>
                                <Image
                                    src={selectedImage.image_url}
                                    alt={selectedImage.title}
                                    width={800}
                                    height={1000}
                                    style={{ width: "100%", height: "auto", maxHeight: "80vh", objectFit: "contain" }}
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                            </div>

                            {/* Info */}
                            <div style={{ width: "100%", maxWidth: "320px", flexShrink: 0 }}>
                                <h3 style={{
                                    fontFamily: "var(--font-serif)",
                                    fontSize: "var(--text-xl)",
                                    fontWeight: 300,
                                    color: "var(--ink-950)",
                                    letterSpacing: "var(--ls-snug)",
                                    marginBottom: "var(--space-3)",
                                }}>
                                    {selectedImage.title}
                                </h3>
                                <p style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-xs)",
                                    color: "var(--ink-300)",
                                    letterSpacing: "var(--ls-wide)",
                                    marginBottom: "var(--space-8)",
                                }}>
                                    {selectedImage.category === 'director' ? '그리운 작가' : '회원 작품'}
                                </p>

                                {(selectedImage.medium || selectedImage.dimensions || selectedImage.year) && (
                                    <div style={{ borderTop: "var(--line-default)", paddingTop: "var(--space-6)", marginBottom: "var(--space-6)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                                        {[
                                            { label: "재료", val: selectedImage.medium },
                                            { label: "크기", val: selectedImage.dimensions },
                                            { label: "제작", val: selectedImage.year },
                                        ].filter(d => d.val).map(d => (
                                            <div key={d.label} style={{ display: "flex", justifyContent: "space-between" }}>
                                                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)" }}>{d.label}</span>
                                                <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-500)" }}>{d.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {selectedImage.description && (
                                    <p style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "var(--text-sm)",
                                        color: "var(--ink-500)",
                                        lineHeight: "var(--lh-relaxed)",
                                        marginBottom: "var(--space-8)",
                                    }}>
                                        {selectedImage.description}
                                    </p>
                                )}

                                {selectedImage.is_for_sale && !selectedImage.is_sold && (
                                    <div style={{ borderTop: "var(--line-default)", paddingTop: "var(--space-6)" }}>
                                        <p style={{
                                            fontFamily: "var(--font-serif)",
                                            fontSize: "var(--text-lg)",
                                            color: "var(--ink-950)",
                                            marginBottom: "var(--space-6)",
                                        }}>
                                            {selectedImage.price === '미정' ? '가격 문의' : selectedImage.price}
                                        </p>
                                        <a
                                            href="https://pf.kakao.com/_xkETdn"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                display: "block",
                                                padding: "12px 24px",
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
                                            카카오톡 문의
                                        </a>
                                    </div>
                                )}
                                {selectedImage.is_sold && (
                                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)", paddingTop: "var(--space-6)", borderTop: "var(--line-default)" }}>
                                        이 작품은 판매가 완료되었습니다.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
