"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryItem } from "./GallerySection";

const ease = [0.25, 0.0, 0.0, 1.0] as const;
const KAKAO_URL = "https://pf.kakao.com/_xkETdn";

// 실사 합성 전시실 뷰어 — 실제 벽 사진을 어둡게 깔고 작품에만 스포트라이트.
// 배경: /public/images/gallery-room.avif. 없으면 폴백으로 graceful degrade.
const ROOM_BG = "/images/gallery-room.avif";

// 작품이 걸리는 위치(벤치 위 뒷벽 상단-중앙). 스포트라이트도 이 좌표에 맞춘다.
const FOCUS_X = "50%";
const FOCUS_Y = "33%";

interface GalleryRoomProps {
    artworks: GalleryItem[];
    exhibitionTitle?: string;
    exhibitionEyebrow?: string;
}

export function GalleryRoom({
    artworks,
    exhibitionTitle = "상설 컬렉션",
    exhibitionEyebrow = "전시",
}: GalleryRoomProps) {
    const [index, setIndex] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [bgOk, setBgOk] = useState(true);

    const count = artworks.length;
    const art = artworks[index];

    const go = useCallback(
        (dir: 1 | -1) => {
            setZoom(false);
            setIndex((i) => (i + dir + count) % count);
        },
        [count],
    );

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (zoom) {
                if (e.key === "Escape") setZoom(false);
                return; // 확대 중에는 화살표로 작품 이동하지 않음
            }
            if (e.key === "ArrowRight") go(1);
            else if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go, zoom]);

    if (!art) {
        return (
            <div style={{ padding: "var(--space-24)", textAlign: "center", color: "var(--ink-500)" }}>
                전시 준비 중입니다.
            </div>
        );
    }

    const statusLabel = art.is_sold ? "판매완료" : art.is_for_sale ? "판매중" : "비매품";
    const statusColor = art.is_sold ? "#d98a8a" : art.is_for_sale ? "#9ec48a" : "#d9b15a";

    return (
        <section
            aria-label={`${exhibitionTitle} 전시 뷰어`}
            style={{
                position: "relative",
                width: "100%",
                minHeight: "560px",
                height: "78vh",
                maxHeight: "820px",
                overflow: "hidden",
                backgroundColor: "#141110",
            }}
        >
            {/* 배경: 실제 전시실 사진 (어둡게) */}
            {bgOk ? (
                <Image
                    src={ROOM_BG}
                    alt=""
                    aria-hidden="true"
                    fill
                    priority
                    sizes="100vw"
                    onError={() => setBgOk(false)}
                    style={{ objectFit: "cover", filter: "brightness(0.66) saturate(0.94)" }}
                />
            ) : (
                <div aria-hidden="true" style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(180deg,#1d1a17 0%,#1a1714 62%,#0f0c0a 62%,#15110d 100%)",
                }} />
            )}

            {/* 어둠 스크림: 가장자리만 어둡게, 중앙은 넓게 열려 벽까지 빛이 닿게 */}
            <div aria-hidden="true" style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `radial-gradient(ellipse 64% 68% at ${FOCUS_X} ${FOCUS_Y}, rgba(0,0,0,0) 42%, rgba(8,6,5,0.68) 86%)`,
            }} />
            {/* 따뜻한 스포트라이트 풀 (작품 + 주변 벽까지 은은히) */}
            <div aria-hidden="true" style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `radial-gradient(ellipse 40% 46% at ${FOCUS_X} ${FOCUS_Y}, rgba(255,244,224,0.32) 0%, rgba(255,244,224,0.12) 38%, rgba(255,244,224,0) 70%)`,
            }} />

            {/* 상단 전시 정보 */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 3 }}>
                <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.14em", color: "rgba(236,231,223,0.8)", textShadow: "0 1px 3px rgba(0,0,0,0.55)" }}>{exhibitionEyebrow}</div>
                    <h1 style={{ fontFamily: "var(--font-sans)", fontSize: "15px", fontWeight: 500, color: "#f5f1ea", margin: "2px 0 0", letterSpacing: "var(--ls-snug)", textShadow: "0 1px 3px rgba(0,0,0,0.55)" }}>{exhibitionTitle}</h1>
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "rgba(236,231,223,0.8)", textShadow: "0 1px 3px rgba(0,0,0,0.55)" }}>
                    {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                </div>
            </div>

            {/* 작품 (벤치 위 뒷벽 상단-중앙) */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: "16%", zIndex: 2 }}>
                <AnimatePresence mode="wait">
                    <motion.button
                        key={art.id}
                        onClick={() => setZoom(true)}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.5, ease }}
                        aria-label={`${art.title} 확대해서 보기`}
                        style={{
                            position: "relative",
                            background: "#f4f0e8",
                            padding: "10px",
                            border: "3px solid #1b1815",
                            boxShadow: "0 26px 50px rgba(0,0,0,0.5)",
                            cursor: "zoom-in",
                            maxWidth: "min(72vw, 290px)",
                            maxHeight: "52%",
                        }}
                    >
                        <Image
                            src={art.image_url}
                            alt={art.title}
                            width={600}
                            height={800}
                            sizes="(max-width: 768px) 72vw, 290px"
                            style={{ display: "block", width: "100%", height: "auto", maxHeight: "44vh", objectFit: "contain" }}
                        />
                        <span aria-hidden="true" style={{ position: "absolute", right: "16px", bottom: "16px", color: "#fff", background: "rgba(0,0,0,0.35)", borderRadius: "9999px", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <ZoomIn size={16} />
                        </span>
                    </motion.button>
                </AnimatePresence>
            </div>

            {count > 1 && (
                <>
                    <NavBtn side="left" onClick={() => go(-1)} />
                    <NavBtn side="right" onClick={() => go(1)} />
                </>
            )}

            {/* 캡션 패널 (어두운 톤) */}
            <div style={{
                position: "absolute", left: "24px", bottom: "24px", zIndex: 3,
                maxWidth: "min(420px, calc(100% - 48px))",
                background: "rgba(16,13,11,0.82)", backdropFilter: "blur(8px)",
                border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: "14px",
                padding: "16px 18px",
            }}>
                <div style={{ marginBottom: "6px" }}>
                    <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.06em", color: statusColor, border: `0.5px solid ${statusColor}66`, borderRadius: "9999px", padding: "2px 9px" }}>{statusLabel}</span>
                </div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "17px", fontWeight: 500, color: "#f5f1ea" }}>{art.title}</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#c7c1b7", marginTop: "4px" }}>
                    {[art.medium, art.dimensions, art.year].filter(Boolean).join(" · ")}
                </div>
                {art.description && (
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#d6cfc4", marginTop: "10px", lineHeight: 1.7 }}>{art.description}</div>
                )}
                <div style={{ display: "flex", gap: "8px", marginTop: "14px" }}>
                    <button onClick={() => setZoom(true)} style={{ background: "transparent", color: "#cfc8bd", border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: "9999px", padding: "8px 14px", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                        <ZoomIn size={15} /> 확대
                    </button>
                    <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" style={{ background: "var(--seal)", color: "#fff", borderRadius: "9999px", padding: "8px 16px", fontSize: "13px", textDecoration: "none" }}>
                        작품 문의
                    </a>
                </div>
            </div>

            {/* 썸네일 필름스트립 */}
            {count > 1 && (
                <div style={{ position: "absolute", bottom: "24px", right: "24px", zIndex: 3, display: "flex", gap: "8px" }}>
                    {artworks.map((a, i) => (
                        <button key={a.id} onClick={() => { setZoom(false); setIndex(i); }} aria-label={`${a.title}로 이동`}
                            style={{ width: "40px", height: "52px", padding: 0, border: i === index ? "2px solid var(--seal)" : "0.5px solid rgba(255,255,255,0.25)", borderRadius: "3px", overflow: "hidden", cursor: "pointer", opacity: i === index ? 1 : 0.5, background: "#2a2622" }}>
                            <Image src={a.image_url} alt="" width={80} height={104} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </button>
                    ))}
                </div>
            )}

            {/* 확대(딥줌 라이트박스) */}
            <AnimatePresence>
                {zoom && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setZoom(false)}
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${art.title} 확대 보기`}
                        style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(10,9,8,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px", cursor: "zoom-out", overflow: "auto" }}
                    >
                        <button onClick={() => setZoom(false)} aria-label="닫기" style={{ position: "absolute", top: "16px", right: "16px", background: "transparent", border: "none", color: "#cfc8bd", cursor: "pointer" }}>
                            <X size={26} />
                        </button>
                        <Image src={art.image_url} alt={art.title} width={1400} height={1800}
                            style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }} />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

function NavBtn({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            aria-label={side === "left" ? "이전 작품" : "다음 작품"}
            style={{
                position: "absolute", top: "50%", transform: "translateY(-50%)",
                [side]: "20px", zIndex: 4,
                width: "44px", height: "44px", borderRadius: "9999px",
                background: "rgba(18,15,12,0.5)", color: "#e8e3db",
                border: "0.5px solid rgba(255,255,255,0.2)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
            } as React.CSSProperties}
        >
            {side === "left" ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
        </button>
    );
}
