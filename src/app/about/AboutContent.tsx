"use client";

import { motion } from "framer-motion";

interface AboutContentProps {
    title: string;
    content: string;
}

function renderBlock(block: string) {
    // Replace **text** with bold spans, remove any stray quotes
    const cleaned = block.replace(/[""]/g, '');
    const parts = cleaned.split(/\*\*(.*?)\*\*/g);

    if (parts.length <= 1) {
        return <>{cleaned}</>;
    }

    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1
                    ? <span key={i} className="font-bold text-black">{part}</span>
                    : <span key={i}>{part}</span>
            )}
        </>
    );
}

export function AboutContent({ title, content }: AboutContentProps) {
    const blocks = content.split('\n\n').filter(b => b.trim());
    // Remove quotes from title
    const cleanTitle = title.replace(/[""「」『』]/g, '');

    return (
        <div>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <span className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-6 block">
                    About
                </span>
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-black mb-8 leading-tight">
                    {cleanTitle}
                </h1>
                <div className="w-16 h-[1px] bg-black/15 mx-auto"></div>
            </motion.div>

            {/* Content Blocks */}
            <div className="space-y-10 max-w-2xl mx-auto">
                {blocks.map((block, index) => (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="text-center text-base md:text-lg text-gray-600 font-light leading-relaxed"
                    >
                        {renderBlock(block.trim())}
                    </motion.p>
                ))}
            </div>
        </div>
    );
}
