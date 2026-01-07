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
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-md bg-neutral-900 border border-white/10 p-6 md:p-8 rounded-xl shadow-2xl z-10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-serif font-bold text-white mb-8 text-center">Contact Us</h3>

                        <div className="space-y-4">
                            <a
                                href="tel:01024974310"
                                className="flex items-center gap-4 p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                    <Phone size={20} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Phone</p>
                                    <p className="text-lg text-white font-medium">010-2497-4310</p>
                                </div>
                            </a>

                            <a
                                href="https://pf.kakao.com/_xkETdn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 border border-white/10 rounded-lg hover:bg-[#FEE500]/10 transition-colors group"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#FEE500] flex items-center justify-center text-black/80 group-hover:bg-[#FEE500]/90 transition-colors">
                                    <MessageCircle size={20} fill="currentColor" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Kakao Channel</p>
                                    <p className="text-lg text-white font-medium">글씨인아트센터</p>
                                </div>
                            </a>
                        </div>

                        <p className="text-center text-gray-500 text-sm mt-8">
                            수업 중에는 통화가 어려울 수 있으니<br />
                            문자나 카카오톡 남겨주세요.
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
