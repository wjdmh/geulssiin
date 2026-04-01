"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MapPin, Mail, Play, Camera,
    MessageCircle, Users, PenLine, AtSign
} from "lucide-react";
import { ContactModal } from "./ContactModal";
import { signout } from "@/app/auth/signout/actions";

const navLinks = [
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
    { href: "#", label: "작가 계정", icon: Camera },
    { href: "#", label: "커뮤니티", icon: Users },
];

const ease = [0.25, 0.0, 0.0, 1.0] as const;

interface NavbarProps {
    user?: any;
    profile?: any;
}

export function Navbar({ user, profile }: NavbarProps) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    const isHome = pathname === "/";
    const isTransparent = isHome && !isScrolled;

    return (
        <>
            <nav
                style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0,
                    zIndex: 100,
                    padding: "20px 0",
                    backgroundColor: isTransparent ? "transparent" : "var(--paper-50)",
                    borderBottom: isTransparent ? "1px solid transparent" : "var(--line-default)",
                    transition: "background-color var(--duration-base) var(--ease-default), border-color var(--duration-base) var(--ease-default)",
                }}
            >
                <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    {/* Logo */}
                    <Link href="/" style={{ display: "flex", alignItems: "center" }}>
                        <Image
                            src="/logo_transparent.png"
                            alt="글씨인아트센터"
                            width={160}
                            height={48}
                            style={{
                                height: "38px",
                                width: "auto",
                                objectFit: "contain",
                                filter: isTransparent ? "brightness(0) invert(1)" : "none",
                                transition: "filter var(--duration-base) var(--ease-default)",
                            }}
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex" style={{ alignItems: "center", gap: "40px" }}>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            const color = isTransparent
                                ? (isActive ? "var(--paper-50)" : "rgba(250,248,245,0.6)")
                                : (isActive ? "var(--ink-950)" : "var(--ink-500)");
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "var(--text-sm)",
                                        fontWeight: isActive ? 500 : 400,
                                        letterSpacing: "var(--ls-wide)",
                                        color,
                                        textDecoration: "none",
                                        transition: "opacity var(--duration-fast) var(--ease-default)",
                                    }}
                                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.opacity = "0.5"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        <div style={{
                            width: "1px", height: "14px",
                            backgroundColor: isTransparent ? "rgba(250,248,245,0.2)" : "var(--ink-100)",
                        }} />

                        {user ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <span style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-xs)",
                                    color: isTransparent ? "rgba(250,248,245,0.6)" : "var(--ink-500)",
                                }}>
                                    {profile?.name || user.email?.split("@")[0]}
                                    {profile?.is_admin && (
                                        <Link href="/admin" style={{ marginLeft: "8px", opacity: 0.5, textDecoration: "underline" }}>
                                            관리자
                                        </Link>
                                    )}
                                </span>
                                <button
                                    onClick={() => signout()}
                                    style={{
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "var(--text-xs)",
                                        color: isTransparent ? "rgba(250,248,245,0.4)" : "var(--ink-300)",
                                        background: "none", border: "none", cursor: "pointer", padding: 0,
                                        transition: "opacity var(--duration-fast) var(--ease-default)",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                style={{
                                    fontFamily: "var(--font-sans)",
                                    fontSize: "var(--text-xs)",
                                    color: isTransparent ? "rgba(250,248,245,0.6)" : "var(--ink-500)",
                                    textDecoration: "none",
                                    letterSpacing: "var(--ls-normal)",
                                    transition: "opacity var(--duration-fast) var(--ease-default)",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.5"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                            >
                                로그인
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="메뉴"
                        style={{
                            background: "none", border: "none", cursor: "pointer",
                            padding: "4px", display: "flex", flexDirection: "column",
                            gap: "5px", alignItems: "center", justifyContent: "center",
                        }}
                    >
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3, ease }}
                            style={{ display: "block", width: "22px", height: "1px", backgroundColor: isTransparent ? "var(--paper-50)" : "var(--ink-950)" }}
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: "block", width: "22px", height: "1px", backgroundColor: isTransparent ? "var(--paper-50)" : "var(--ink-950)" }}
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.3, ease }}
                            style={{ display: "block", width: "22px", height: "1px", backgroundColor: isTransparent ? "var(--paper-50)" : "var(--ink-950)" }}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="md:hidden"
                        style={{
                            position: "fixed", inset: 0, zIndex: 99,
                            backgroundColor: "var(--paper-50)",
                            display: "flex", flexDirection: "column",
                            paddingTop: "80px", overflowY: "auto",
                        }}
                    >
                        {/* Main Nav */}
                        <div style={{ padding: "0 var(--container-pad-mobile)", flex: 1 }}>
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.4, ease }}
                                    style={{ borderBottom: "var(--line-default)" }}
                                >
                                    <Link
                                        href={link.href}
                                        style={{
                                            display: "block", padding: "20px 0",
                                            fontFamily: "var(--font-serif)",
                                            fontSize: "var(--text-xl)", fontWeight: 300,
                                            letterSpacing: "var(--ls-snug)",
                                            color: pathname === link.href ? "var(--ink-950)" : "var(--ink-300)",
                                            textDecoration: "none",
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* External Links + Auth */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            style={{ padding: "24px var(--container-pad-mobile) 48px", borderTop: "var(--line-default)" }}
                        >
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", marginBottom: "20px" }}>
                                {externalLinks.map(({ href, label, icon: Icon }, i) => (
                                    <a
                                        key={i}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex", alignItems: "center", gap: "7px",
                                            padding: "11px 0",
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
                                <button
                                    onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
                                    style={{
                                        display: "flex", alignItems: "center", gap: "7px",
                                        padding: "11px 0",
                                        fontFamily: "var(--font-sans)",
                                        fontSize: "var(--text-xs)",
                                        color: "var(--ink-300)",
                                        background: "none", border: "none", cursor: "pointer",
                                        letterSpacing: "var(--ls-wide)", textAlign: "left",
                                        transition: "opacity var(--duration-fast) var(--ease-default)",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.4"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                >
                                    <Mail size={12} strokeWidth={1.5} />
                                    문의하기
                                </button>
                            </div>

                            {/* Auth */}
                            <div style={{ paddingTop: "16px", borderTop: "var(--line-subtle)" }}>
                                {user ? (
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-500)" }}>
                                            {profile?.name || user.email?.split("@")[0]}
                                            {profile?.is_admin && (
                                                <Link href="/admin" style={{ marginLeft: "8px", opacity: 0.5, textDecoration: "underline" }}>관리자</Link>
                                            )}
                                        </span>
                                        <button
                                            onClick={() => signout()}
                                            style={{
                                                fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
                                                color: "var(--ink-300)", background: "none", border: "none", cursor: "pointer", padding: 0,
                                            }}
                                        >
                                            로그아웃
                                        </button>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        style={{
                                            fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)",
                                            color: "var(--ink-300)", textDecoration: "none", letterSpacing: "var(--ls-wide)",
                                        }}
                                    >
                                        로그인
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}
