"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ContactModal } from "./ContactModal";
import { signout } from "@/app/auth/signout/actions";

const navLinks = [
    { href: "/", label: "홈" },
    { href: "/gallery", label: "갤러리" },
    { href: "/about", label: "센터 소개" },
    { href: "/class", label: "수업 안내" },
    { href: "/board", label: "게시판" },
];

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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    const isHome = pathname === "/";
    const useSolidTheme = !isHome || isScrolled;

    const getRoleBadge = () => {
        if (!profile) return null;
        if (profile.is_admin) return <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">관리자</span>;
        if (profile.role === 'student') return <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">수강생</span>;
        return <span className="bg-gray-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">일반회원</span>;
    };

    const handleLogout = async () => {
        await signout();
    };

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                    useSolidTheme ? "bg-white/95 backdrop-blur-md border-gray-200 py-4 shadow-sm" : "py-6 bg-transparent"
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="relative h-12 w-auto flex items-center">
                        <Image
                            src="/logo_transparent.png"
                            alt="글씨인아트센터"
                            width={200}
                            height={60}
                            className={cn(
                                "h-full w-auto object-contain transition-all duration-300",
                                useSolidTheme ? "" : "brightness-0 invert"
                            )}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors relative py-1",
                                    useSolidTheme
                                        ? (pathname === link.href ? "text-black font-bold" : "text-gray-500 hover:text-black")
                                        : (pathname === link.href ? "text-white font-bold" : "text-white/80 hover:text-white")
                                )}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="underline"
                                        className={cn(
                                            "absolute left-0 bottom-0 w-full h-[1px]",
                                            useSolidTheme ? "bg-black" : "bg-white"
                                        )}
                                    />
                                )}
                            </Link>
                        ))}

                        <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className={cn("flex flex-col items-end text-xs", useSolidTheme ? "text-black" : "text-white")}>
                                    <div className="flex items-center gap-2">
                                        {getRoleBadge()}
                                        <span className="opacity-90 font-medium">
                                            {profile?.name || user.email?.split('@')[0]}님
                                        </span>
                                    </div>
                                    {profile?.is_admin && (
                                        <Link href="/admin" className="hover:underline opacity-70 hover:opacity-100 transition-opacity mt-0.5">
                                            관리자 페이지 &rarr;
                                        </Link>
                                    )}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className={cn(
                                        "text-xs font-medium transition-colors border px-3 py-1.5 rounded-full hover:bg-black hover:border-black hover:text-white",
                                        useSolidTheme
                                            ? "border-gray-200 text-gray-500"
                                            : "border-white/30 text-white/80 hover:border-white hover:bg-white hover:text-black"
                                    )}
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className={cn(
                                    "text-sm font-medium transition-colors hover:opacity-70",
                                    useSolidTheme ? "text-gray-600" : "text-white"
                                )}
                            >
                                로그인
                            </Link>
                        )}

                        <button
                            onClick={() => setIsContactOpen(true)}
                            className={cn(
                                "px-5 py-2 text-sm font-medium rounded-full transition-colors",
                                useSolidTheme
                                    ? "bg-black text-white hover:bg-gray-800"
                                    : "bg-white text-black hover:bg-white/90"
                            )}
                        >
                            문의하기
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="메뉴"
                    >
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                            className={cn("block w-6 h-[1.5px] transition-colors", useSolidTheme ? "bg-black" : "bg-white")}
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className={cn("block w-6 h-[1.5px] transition-colors", useSolidTheme ? "bg-black" : "bg-white")}
                        />
                        <motion.span
                            animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                            className={cn("block w-6 h-[1.5px] transition-colors", useSolidTheme ? "bg-black" : "bg-white")}
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
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 pb-12 md:hidden"
                    >
                        <nav className="flex flex-col gap-1 flex-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.3 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "block py-4 text-2xl font-light border-b border-gray-100 transition-colors",
                                            pathname === link.href ? "text-black font-medium" : "text-gray-400"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="space-y-4 mt-auto">
                            {user ? (
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        {getRoleBadge()}
                                        <span className="text-gray-700">{profile?.name || user.email?.split('@')[0]}님</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {profile?.is_admin && (
                                            <Link href="/admin" className="text-xs text-gray-500 underline">관리자</Link>
                                        )}
                                        <button onClick={handleLogout} className="text-xs text-gray-400">로그아웃</button>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login" className="block text-center py-3 text-sm text-gray-500 border border-gray-200 rounded-full">
                                    로그인
                                </Link>
                            )}
                            <button
                                onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
                                className="w-full py-3.5 bg-black text-white text-sm font-medium rounded-full"
                            >
                                문의하기
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}
