import Link from "next/link";

const footerLinks = [
    { href: "/class", label: "수업 안내" },
    { href: "/gallery", label: "갤러리" },
    { href: "/board", label: "게시판" },
    { href: "/about", label: "센터 소개" },
];

export function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-serif font-bold text-white">글씨인아트센터</h3>
                        <p className="text-sm text-gray-500 mt-2">캘리그라피 & 펜 드로잉 스튜디오</p>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-6">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-gray-500 hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-1 md:text-right text-sm text-gray-600">
                        <span className="text-gray-500">경기도 김포시 김포한강9로 75번길 158 A동 308호</span>
                        <span>&copy; {new Date().getFullYear()} Geulssiin. All rights reserved.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
