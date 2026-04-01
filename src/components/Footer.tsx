"use client";

import Link from "next/link";
import {
    MapPin, Mail, Play, Camera,
    MessageCircle, Users, PenLine, AtSign
} from "lucide-react";

const internalLinks = [
    { href: "/", label: "홈" },
    { href: "/gallery", label: "갤러리" },
    { href: "/shop", label: "상품" },
    { href: "/about", label: "어바웃" },
];

const externalLinks = [
    { href: "#", label: "블로그", icon: PenLine },
    { href: "#", label: "카카오 채널", icon: MessageCircle },
    { href: "#", label: "쓰레드", icon: AtSign },
    { href: "#", label: "유튜브", icon: Play },
    { href: "#", label: "오는길", icon: MapPin },
    { href: "#", label: "문의하기", icon: Mail },
    { href: "#", label: "작가 계정", icon: Camera },
    { href: "#", label: "커뮤니티", icon: Users },
];

export function Footer() {
    return (
        <footer style={{ borderTop: "var(--line-default)", backgroundColor: "var(--paper-50)" }}>
            <div className="container" style={{ paddingBlock: "var(--space-16)" }}>

                {/* Desktop layout */}
                <div
                    className="hidden md:grid"
                    style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--space-10)", alignItems: "start" }}
                >
                    {/* Brand */}
                    <div>
                        <p style={{
                            fontFamily: "var(--font-serif)",
                            fontSize: "var(--text-lg)", fontWeight: 300,
                            color: "var(--ink-950)",
                            letterSpacing: "var(--ls-snug)",
                            marginBottom: "var(--space-3)",
                        }}>
                            글씨인아트센터
                        </p>
                        <p style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-xs)",
                            color: "var(--ink-300)",
                            lineHeight: "var(--lh-relaxed)",
                            letterSpacing: "var(--ls-normal)",
                        }}>
                            경기도 김포시 김포한강9로 75번길 158<br />
                            A동 308호<br />
                            캘리그라피 · 펜드로잉 · 서예
                        </p>
                    </div>

                    {/* Internal Links */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                        {internalLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-sm)",
                                    color: "var(--ink-500)",
                                    textDecoration: "none",
                                    letterSpacing: "var(--ls-normal)",
                                    transition: "opacity var(--duration-fast) var(--ease-default)",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.4"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* External Links */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        {externalLinks.map(({ href, label, icon: Icon }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    padding: "7px 0",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-xs)",
                                    color: "var(--ink-300)",
                                    textDecoration: "none",
                                    letterSpacing: "var(--ls-wide)",
                                    transition: "opacity var(--duration-fast) var(--ease-default)",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.4"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                            >
                                <Icon size={12} strokeWidth={1.5} />
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Mobile layout */}
                <div className="md:hidden" style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
                    <p style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-lg)", fontWeight: 300,
                        color: "var(--ink-950)",
                        letterSpacing: "var(--ls-snug)",
                    }}>
                        글씨인아트센터
                    </p>
                    <div style={{ display: "flex", gap: "var(--space-6)", flexWrap: "wrap" }}>
                        {internalLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-sm)",
                                    color: "var(--ink-500)",
                                    textDecoration: "none",
                                }}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "var(--space-2)", borderTop: "var(--line-subtle)" }}>
                        {externalLinks.map(({ href, label, icon: Icon }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    padding: "10px 0",
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-xs)",
                                    color: "var(--ink-300)",
                                    textDecoration: "none",
                                    letterSpacing: "var(--ls-wide)",
                                }}
                            >
                                <Icon size={12} strokeWidth={1.5} />
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    marginTop: "var(--space-12)",
                    paddingTop: "var(--space-6)",
                    borderTop: "var(--line-subtle)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <p style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wide)",
                    }}>
                        © {new Date().getFullYear()} 글씨인아트센터
                    </p>
                    <p style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "var(--text-xs)",
                        color: "var(--ink-300)",
                        letterSpacing: "var(--ls-wide)",
                    }}>
                        書如其人
                    </p>
                </div>
            </div>
        </footer>
    );
}
