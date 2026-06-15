"use client";

import { X, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0"
                        style={{ backgroundColor: "rgba(15,14,13,0.6)" }}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.97, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: 10 }}
                        className="relative w-full max-w-md p-6 md:p-8 z-10"
                        style={{
                            backgroundColor: "var(--paper-50)",
                            border: "1px solid var(--ink-100)",
                            borderRadius: "24px",
                            boxShadow: "0 12px 48px rgba(15,14,13,0.18)",
                            fontFamily: "var(--font-sans)",
                        }}
                    >
                        <button
                            onClick={onClose}
                            aria-label="닫기"
                            className="absolute top-4 right-4"
                            style={{ color: "var(--ink-500)", background: "none", border: "none", cursor: "pointer" }}
                        >
                            <X size={22} />
                        </button>

                        <h3
                            className="mb-8 text-center"
                            style={{ fontFamily: "var(--font-sans)", fontSize: "20px", fontWeight: 600, color: "var(--ink-950)" }}
                        >
                            문의하기
                        </h3>

                        <div className="flex flex-col gap-3">
                            <ContactRow
                                href="/contact"
                                icon={<span style={{ color: "#fff", fontSize: "16px" }}>✍</span>}
                                iconBg="var(--seal)"
                                eyebrow="APPLY"
                                label="수업 신청서 작성"
                            />
                            <ContactRow
                                href="tel:01024974310"
                                icon={<Phone size={18} style={{ color: "var(--ink-800)" }} />}
                                iconBg="var(--paper-100)"
                                eyebrow="PHONE"
                                label="010-2497-4310"
                            />
                            <ContactRow
                                href="https://pf.kakao.com/_xkETdn"
                                external
                                icon={<MessageCircle size={18} fill="currentColor" style={{ color: "#3C1E1E" }} />}
                                iconBg="#FEE500"
                                eyebrow="KAKAO CHANNEL"
                                label="글씨인아트센터"
                            />
                        </div>

                        <p className="text-center mt-8" style={{ fontSize: "13px", color: "var(--ink-500)", lineHeight: 1.6 }}>
                            수업 중에는 통화가 어려울 수 있으니<br />
                            문자나 카카오톡 남겨주세요.
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function ContactRow({
    href,
    icon,
    iconBg,
    eyebrow,
    label,
    external,
}: {
    href: string;
    icon: React.ReactNode;
    iconBg: string;
    eyebrow: string;
    label: string;
    external?: boolean;
}) {
    return (
        <a
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex items-center gap-4 p-4 transition-colors"
            style={{
                backgroundColor: "#fff",
                border: "1px solid var(--ink-100)",
                borderRadius: "16px",
                textDecoration: "none",
            }}
        >
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: iconBg }}
            >
                {icon}
            </div>
            <div>
                <p style={{ fontSize: "11px", color: "var(--ink-500)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "2px" }}>
                    {eyebrow}
                </p>
                <p style={{ fontSize: "16px", color: "var(--ink-950)", fontWeight: 500 }}>{label}</p>
            </div>
        </a>
    );
}
