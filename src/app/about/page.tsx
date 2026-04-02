import { Metadata } from "next";
import { getSiteConfig } from "@/lib/getSiteConfig";
import { AboutContent } from "./AboutContent";
import { DirectorProfile } from "@/components/DirectorProfile";
import { NameMeaning } from "@/components/NameMeaning";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
    title: "About",
    description: "書如其人 — 글씨는 곧 그 사람이다. 글씨인아트센터의 철학과 대표 소개.",
};

export default async function AboutPage() {
    const config = await getSiteConfig();

    return (
        <div style={{ paddingTop: "80px" }}>
            {/* Philosophy / About Content */}
            <section className="section-lg" style={{ borderBottom: "var(--line-default)" }}>
                <div className="container">
                    <div style={{ maxWidth: "560px" }}>
                        <AboutContent
                            title={config.about_title}
                            content={config.about_content}
                        />
                    </div>
                </div>
            </section>

            {/* Name Meaning */}
            <NameMeaning />

            {/* Director */}
            <DirectorProfile />

            {/* CTA */}
            <CTASection />
        </div>
    );
}
