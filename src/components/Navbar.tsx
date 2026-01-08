"use client";

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
];

interface NavbarProps {
    user?: any;
    profile?: any;
}

export function Navbar({ user, profile }: NavbarProps) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                    <Link href="/" className={cn(
                        "text-2xl font-serif font-bold tracking-tight transition-colors duration-300 group",
                        useSolidTheme ? "text-black" : "text-white"
                    )}>
                        글씨인<span className={cn(
                            "transition-colors duration-300",
                            useSolidTheme ? "text-gray-500 group-hover:text-black" : "text-white/80 group-hover:text-white"
                        )}>아트센터</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={cn(
                                "text-sm font-medium transition-colors relative py-1",
                                useSolidTheme
                                    ? (pathname === "/" ? "text-black font-bold" : "text-gray-500 hover:text-black")
                                    : (pathname === "/" ? "text-white font-bold" : "text-white/80 hover:text-white")
                            )}
                        >
                            홈
                            {pathname === "/" && (
                                <motion.div
                                    layoutId="underline"
                                    className={cn(
                                        "absolute left-0 bottom-0 w-full h-[1px]",
                                        useSolidTheme ? "bg-black" : "bg-white"
                                    )}
                                />
                            )}
                        </Link>

                        {navLinks.filter(link => link.href !== '/').map((link) => (
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

                        <Link
                            href="/board"
                            className={cn(
                                "text-sm font-medium transition-colors relative py-1",
                                useSolidTheme
                                    ? (pathname === "/board" ? "text-black font-bold" : "text-gray-500 hover:text-black")
                                    : "text-white/80 hover:text-white" // If transparent theme (which means we are at Home and not scrolled), we are definitely NOT at /board, so no need to check.
                            )}>
                            게시판
                            {pathname === "/board" && (
                                <motion.div
                                    layoutId="underline"
                                    className={cn(
                                        "absolute left-0 bottom-0 w-full h-[1px]",
                                        useSolidTheme ? "bg-black" : "bg-white"
                                    )}
                                />
                            )}
                        </Link>

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

                    {/* Mobile Menu Button - Placeholder */}
                    <div className="md:hidden">
                        {/* Mobile menu implementation would go here */}
                    </div>
                </div>
            </nav >

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}
