"use client";

import { motion } from "framer-motion";

interface AboutContentProps {
    title: string;
    content: string;
}

const ease = [0.25, 0.0, 0.0, 1.0] as const;

export function AboutContent({ title, content }: AboutContentProps) {
    const blocks = content.split('\n\n').filter(b => b.trim());

    return (
        <div>
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-xs)",
                    color: "var(--ink-300)",
                    letterSpacing: "var(--ls-wider)",
                    marginBottom: "var(--space-8)",
                }}
            >
                ABOUT
            </motion.p>

            <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease }}
                style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(var(--text-xl), 3.5vw, var(--text-3xl))",
                    fontWeight: 300,
                    color: "var(--ink-950)",
                    letterSpacing: "var(--ls-snug)",
                    lineHeight: "var(--lh-snug)",
                    marginBottom: "var(--space-8)",
                }}
            >
                {title}
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                style={{
                    width: "32px",
                    height: "1px",
                    backgroundColor: "var(--ink-100)",
                    transformOrigin: "left",
                    marginBottom: "var(--space-10)",
                }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
                {blocks.map((block, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
                        style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-base)",
                            color: "var(--ink-500)",
                            lineHeight: "var(--lh-relaxed)",
                            letterSpacing: "var(--ls-normal)",
                        }}
                    >
                        {block.trim()}
                    </motion.p>
                ))}
            </div>
        </div>
    );
}
