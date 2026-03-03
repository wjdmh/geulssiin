"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X, Phone, MessageCircle } from "lucide-react";
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

            if (data) {
                setImages(data as GalleryItem[]);
            }
            setLoading(false);
        }

        fetchGallery();
    }, [activeTab]);

    const tabDescriptions = {
        director: "그리운 — 글씨인아트센터 대표 작가",
        member: "글씨인아트센터 수강생들의 작품 공간"
    };

    return (
        <section className="py-24 md:py-32 bg-white relative">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-4 block">Gallery</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">갤러리</h2>
                    <div className="w-12 h-[1px] bg-black/20 mx-auto mb-10"></div>

                    {/* Tabs */}
                    <div className="flex justify-center gap-12 md:gap-16">
                        <button
                            onClick={() => setActiveTab('director')}
                            className="group relative pb-4"
                        >
                            <span className={`text-base md:text-lg font-serif tracking-wide transition-colors duration-300 ${activeTab === 'director' ? 'text-black' : 'text-gray-300 hover:text-gray-500'}`}>
                                그리운 갤러리
                            </span>
                            {activeTab === 'director' && (
                                <motion.div layoutId="gallery-tab" className="absolute left-0 bottom-0 w-full h-[2px] bg-black" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('member')}
                            className="group relative pb-4"
                        >
                            <span className={`text-base md:text-lg font-serif tracking-wide transition-colors duration-300 ${activeTab === 'member' ? 'text-black' : 'text-gray-300 hover:text-gray-500'}`}>
                                글씨인 회원 갤러리
                            </span>
                            {activeTab === 'member' && (
                                <motion.div layoutId="gallery-tab" className="absolute left-0 bottom-0 w-full h-[2px] bg-black" />
                            )}
                        </button>
                    </div>

                    {/* Tab Description */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={activeTab}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm text-gray-400 font-light mt-4 tracking-wide"
                        >
                            {tabDescriptions[activeTab]}
                        </motion.p>
                    </AnimatePresence>
                </motion.div>

                {/* Gallery Content — Masonry Layout */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : images.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-10">
                            {images.map((art, index) => (
                                <motion.div
                                    key={art.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.08 }}
                                    className="break-inside-avoid mb-8 md:mb-10 group cursor-pointer"
                                    onClick={() => setSelectedImage(art)}
                                >
                                    {/* Image — natural aspect ratio */}
                                    <div className="relative overflow-hidden bg-gray-50 shadow-sm group-hover:shadow-lg transition-shadow duration-500">
                                        <Image
                                            src={art.image_url}
                                            alt={art.title}
                                            width={600}
                                            height={800}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                                        {/* Sale badge */}
                                        {art.is_for_sale && !art.is_sold && (
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase text-black font-medium">
                                                Available
                                            </div>
                                        )}
                                        {art.is_sold && (
                                            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1 text-[10px] tracking-widest uppercase text-white font-medium">
                                                Sold
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="mt-4 px-1">
                                        <h3 className="text-lg font-serif font-medium text-black group-hover:text-gray-600 transition-colors duration-300">
                                            {art.title}
                                        </h3>
                                        {(art.medium || art.dimensions) && (
                                            <p className="text-xs text-gray-400 font-light mt-1 tracking-wide">
                                                {[art.medium, art.dimensions, art.year].filter(Boolean).join(' · ')}
                                            </p>
                                        )}
                                        {art.is_for_sale && !art.is_sold && (
                                            <p className="text-sm text-black/70 font-light mt-2">
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
                            className="flex flex-col items-center justify-center py-24 text-gray-300"
                        >
                            <p className="font-serif text-xl mb-2">등록된 작품이 없습니다.</p>
                            <p className="font-light text-sm">곧 업데이트 될 예정입니다.</p>
                        </motion.div>
                    )}
                </div>

            </div>

            {/* Lightbox Modal — Gallery Detail View */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-white/98 backdrop-blur-md overflow-y-auto"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="fixed top-6 right-6 md:top-8 md:right-8 text-black/40 hover:text-black transition-colors z-50 p-2"
                        >
                            <X size={28} strokeWidth={1.5} />
                        </button>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4 }}
                            className="min-h-full w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 p-6 md:p-12 lg:p-16"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image */}
                            <div className="relative flex-1 w-full md:w-auto h-[50vh] md:h-[80vh] min-h-0">
                                <Image
                                    src={selectedImage.image_url}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                            </div>

                            {/* Info Panel */}
                            <div className="w-full md:w-80 lg:w-96 shrink-0 md:self-center pb-8 md:pb-0">
                                <div className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-black leading-tight">
                                            {selectedImage.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 font-light mt-2 tracking-wide">
                                            {selectedImage.category === 'director' ? '그리운 작가' : '회원 작품'}
                                        </p>
                                    </div>

                                    {/* Details */}
                                    {(selectedImage.medium || selectedImage.dimensions || selectedImage.year) && (
                                        <div className="border-t border-black/5 pt-5 space-y-2">
                                            {selectedImage.medium && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400 font-light">재료</span>
                                                    <span className="text-black/70">{selectedImage.medium}</span>
                                                </div>
                                            )}
                                            {selectedImage.dimensions && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400 font-light">크기</span>
                                                    <span className="text-black/70">{selectedImage.dimensions}</span>
                                                </div>
                                            )}
                                            {selectedImage.year && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400 font-light">제작</span>
                                                    <span className="text-black/70">{selectedImage.year}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Description */}
                                    {selectedImage.description && (
                                        <div className="border-t border-black/5 pt-5">
                                            <p className="text-sm text-gray-500 font-light leading-relaxed">
                                                {selectedImage.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Price & Inquiry */}
                                    {selectedImage.is_for_sale && (
                                        <div className="border-t border-black/5 pt-5">
                                            {!selectedImage.is_sold ? (
                                                <>
                                                    <p className="text-lg font-serif text-black mb-4">
                                                        {selectedImage.price === '미정' ? '가격 문의' : selectedImage.price}
                                                    </p>
                                                    <div className="space-y-3">
                                                        <a
                                                            href="tel:01024974310"
                                                            className="flex items-center gap-3 px-4 py-3 border border-black/10 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                                        >
                                                            <Phone size={16} className="text-gray-400" />
                                                            <span className="text-black/70">010-2497-4310</span>
                                                        </a>
                                                        <a
                                                            href="https://pf.kakao.com/_xkETdn"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-3 px-4 py-3 border border-black/10 rounded-lg hover:bg-[#FEE500]/5 transition-colors text-sm"
                                                        >
                                                            <MessageCircle size={16} className="text-[#3C1E1E]" fill="#FEE500" />
                                                            <span className="text-black/70">카카오톡 문의</span>
                                                        </a>
                                                    </div>
                                                </>
                                            ) : (
                                                <p className="text-sm text-gray-400 font-light">이 작품은 판매가 완료되었습니다.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
