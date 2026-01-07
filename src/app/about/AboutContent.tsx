"use client";

import { motion } from "framer-motion";

interface AboutContentProps {
    title: string;
    content: string;
}

export function AboutContent({ title, content }: AboutContentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="text-center mb-20">
                <span className="inline-block py-1 px-3 mb-4 border border-black/10 rounded-full text-[10px] tracking-widest text-gray-500 uppercase">
                    글씨인아트센터
                </span>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6">센터 소개</h1>
                <div className="w-12 h-[1px] bg-black/20 mx-auto"></div>
            </div>

            <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-serif font-medium leading-relaxed text-black/80">
                    {title}
                </h2>
            </div>

            <div className="space-y-12 text-lg font-light leading-relaxed text-gray-600 border-t border-black/10 pt-12">
                {content.split('\n\n').map((block, index) => {
                    if (block.includes('**')) {
                        const parts = block.split('**');
                        if (parts.length >= 3) {
                            return (
                                <div key={index} className="text-left md:text-center">
                                    <h3 className="text-xl font-bold text-black mb-3 inline-block">
                                        {parts[1]}
                                    </h3>
                                    <p>{parts[2]}</p>
                                </div>
                            );
                        }
                    }
                    return <p key={index} className="text-left md:text-center whitespace-pre-line">{block}</p>;
                })}
            </div>
        </motion.div>
    );
}
