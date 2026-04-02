"use client";

import Link from "next/link";
import {
    MapPin, Play, Camera,
    MessageCircle, Users, PenLine, AtSign, Phone
} from "lucide-react";

const internalLinks = [
    { href: "/", label: "Home" },
    { href: "/gallery", label: "Gallery" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
];

const externalLinks = [
    { href: "http://blog.naver.com/griuncalli", label: "블로그", icon: PenLine },
    { href: "http://pf.kakao.com/_xkETdn", label: "카카오 채널", icon: MessageCircle },
    { href: "https://www.threads.com/@gulssiin_artcenter", label: "쓰레드", icon: AtSign },
    { href: "https://www.youtube.com/@gulssiin_artcenter", label: "유튜브", icon: Play },
    { href: "https://new.smartplace.naver.com/bizes/place/3759133?bookingBusinessId=947861", label: "오는길", icon: MapPin },
    { href: "https://wa.me/821024974310", label: "문의하기", icon: Phone },
    { href: "https://www.instagram.com/griun_callidrawing", label: "작가 계정", icon: Camera },
    { href: "https://www.instagram.com/gulssiin", label: "커뮤니티", icon: Users },
];

export function Footer() {
    return (
        <footer style={{ borderTop: "var(--line-default)", backgroundColor: "var(--paper-50)" }}>
            <div className="container" style={{ paddingBlock: "var(--space-16)" }}>

                <div
                    className="grid grid-cols-1 md:grid-cols-3"
                    style={{ gap: "var(--space-10)", alignItems: "start" }}
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
                    <div
                        className="flex md:flex-col flex-row flex-wrap"
                        style={{ gap: "var(--space-3)" }}
                    >
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
                    <div
                        className="border-t md:border-t-0"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            borderColor: "var(--line-subtle)",
                            paddingTop: "var(--space-2)",
                        }}
                    >
                        {externalLinks.map(({ href, label, icon: Icon }, i) => (
                            <a
                                key={i}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "flex", alignItems: "center", gap: "6px",
                                    padding: "9px 0",
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
