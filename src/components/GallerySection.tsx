"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image_url: string;
    category: string;
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
                // Map DB snake_case to component structure if needed, or just use as is.
                // Our DB has title, description, image_url.
                setImages(data as GalleryItem[]);
            }
            setLoading(false);
        }

        fetchGallery();
    }, [activeTab]);

    return (
        <section className="py-32 bg-white relative">
            <div className="container mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-gray-400 text-sm tracking-widest uppercase mb-2 block">Gallery</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6">갤러리</h2>
                    <p className="text-gray-500 font-light max-w-lg mx-auto mb-8">
                        글씨인아트센터의 작품들을 만나보세요.
                    </p>

                    {/* Tabs */}
                    <div className="flex justify-center space-x-8 border-b border-gray-100 max-w-md mx-auto">
                        <button
                            onClick={() => setActiveTab('director')}
                            className={`pb-4 text-lg font-serif transition-colors relative ${activeTab === 'director' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            그리운 갤러리
                            {activeTab === 'director' && (
                                <motion.div layoutId="underline" className="absolute left-0 bottom-0 w-full h-0.5 bg-black" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('member')}
                            className={`pb-4 text-lg font-serif transition-colors relative ${activeTab === 'member' ? 'text-black font-medium' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            회원 갤러리
                            {activeTab === 'member' && (
                                <motion.div layoutId="underline" className="absolute left-0 bottom-0 w-full h-0.5 bg-black" />
                            )}
                        </button>
                    </div>
                </motion.div>

                {/* Content */}
                <div className="min-h-[400px]">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : images.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {images.map((art, index) => (
                                <motion.div
                                    key={art.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                    onClick={() => setSelectedImage(art)}
                                >
                                    <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                        <Image
                                            src={art.image_url}
                                            alt={art.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-xl font-serif font-bold text-black mb-1 group-hover:text-gray-600 transition-colors">{art.title}</h3>
                                        <p className="text-sm text-gray-400 font-light">{art.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-20 text-gray-400"
                        >
                            <p className="font-serif text-xl mb-2">등록된 작품이 없습니다.</p>
                            <p className="font-light text-sm">곧 업데이트 될 예정입니다.</p>
                        </motion.div>
                    )}
                </div>

            </div>

            {/* Modal for Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm p-4 md:p-10">
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 text-black hover:text-gray-500 transition-colors z-50 p-2"
                    >
                        <X size={32} />
                    </button>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-full max-w-5xl max-h-[90vh] flex flex-col justify-center"
                    >
                        <div className="relative w-full h-full flex-1 min-h-0">
                            <Image
                                src={selectedImage.image_url}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="text-center mt-6">
                            <h3 className="text-2xl font-serif font-bold text-black">{selectedImage.title}</h3>
                            <p className="text-gray-500 mt-1">{selectedImage.description}</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
