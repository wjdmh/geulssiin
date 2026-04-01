import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "상품 | 글씨인아트센터",
    description: "글씨인아트센터의 작품과 용품을 만나보세요.",
};

export default function ShopPage() {
    return (
        <main style={{ paddingTop: "80px" }}>
            <section className="container" style={{ paddingBlock: "var(--space-40)" }}>
                <div style={{ maxWidth: "480px" }}>
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wider)",
                        marginBottom: "var(--space-5)",
                    }}>
                        SHOP
                    </p>
                    <h1 style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-3xl)",
                        fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-tight)",
                        lineHeight: "var(--lh-snug)",
                        marginBottom: "var(--space-6)",
                    }}>
                        상품
                    </h1>
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-base)",
                        color: "var(--ink-500)",
                        lineHeight: "var(--lh-relaxed)",
                        letterSpacing: "var(--ls-normal)",
                    }}>
                        준비 중입니다.<br />
                        곧 글씨인의 작품과 용품을 만나볼 수 있습니다.
                    </p>
                </div>
            </section>
        </main>
    );
}
