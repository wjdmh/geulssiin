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
        <section className="py-24 md:py-32 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <p className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4">Gallery</p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">작품으로 말하다</h2>
                </motion.div>

                {/* Asymmetric layout: 1 large + 3 small */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Large featured image */}
                    {items[0] && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7 }}
                            className="md:row-span-2 group cursor-pointer"
                        >
                            <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
                                <Image
                                    src={items[0].image_url}
                                    alt={items[0].title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            <div className="mt-3">
                                <p className="font-serif text-base text-gray-900">{items[0].title}</p>
                                {items[0].medium && <p className="text-xs text-gray-400 mt-1">{items[0].medium}{items[0].year && ` · ${items[0].year}`}</p>}
                            </div>
                        </motion.div>
                    )}

                    {/* Smaller images */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        {items.slice(1, 4).map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.7, delay: (i + 1) * 0.1 }}
                                className={`group cursor-pointer ${i === 2 ? 'col-span-2' : ''}`}
                            >
                                <div className={`relative overflow-hidden bg-gray-50 ${i === 2 ? 'aspect-[2/1]' : 'aspect-square'}`}>
                                    <Image
                                        src={item.image_url}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                </div>
                                <div className="mt-2">
                                    <p className="font-serif text-sm text-gray-900">{item.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/gallery"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-1"
                    >
                        갤러리 전체 보기
                        <span>&rarr;</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
