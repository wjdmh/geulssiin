"use client";

import { motion } from "framer-motion";

interface AboutContentProps {
    title: string;
    content: string;
}

export function AboutContent({ title, content }: AboutContentProps) {
    const blocks = content.split('\n\n').filter(b => b.trim());

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
            >
                <span className="inline-block py-1 px-3 mb-6 border border-black/10 rounded-full text-[10px] tracking-[0.3em] text-gray-400 uppercase">
                    글씨인아트센터
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-8 leading-tight">
                    {title}
                </h1>
                <div className="w-16 h-[1px] bg-black/15 mx-auto"></div>
            </motion.div>

            {/* Content Blocks */}
            <div className="space-y-16 max-w-2xl mx-auto">
                {blocks.map((block, index) => {
                    if (block.includes('**')) {
                        const parts = block.split('**');
                        if (parts.length >= 3) {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    className="text-center"
                                >
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-black mb-4 inline-block">
                                        {parts[1]}
                                    </h3>
                                    <p className="text-base text-gray-500 font-light leading-relaxed">
                                        {parts[2].trim()}
                                    </p>
                                </motion.div>
                            );
                        }
                    }
                    return (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-center text-base text-gray-500 font-light leading-relaxed whitespace-pre-line"
                        >
                            {block.trim()}
                        </motion.p>
                    );
                })}
            </div>
        </div>
    );
}
