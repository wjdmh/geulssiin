"use client";

import { useState, useTransition } from "react";
import type { CSSProperties, FormEvent } from "react";
import { motion } from "framer-motion";
import { submitInquiry } from "./actions";

const ease = [0.25, 0.0, 0.0, 1.0] as const;

const INTERESTS = ["붓 캘리그라피", "붓펜 캘리그라피", "펜드로잉", "서예", "원데이 클래스", "상담 후 결정"];
const TIMES = ["평일 오전 (10시~12시)", "평일 오후 (15시~19시)", "목요일 저녁 (19시~21시)", "토요일 (10시~14시)", "상담 후 결정"];
const SOURCES = ["인스타그램", "네이버 블로그", "네이버 검색", "지인 소개", "기타"];

const labelStyle: CSSProperties = {
    display: "block",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    color: "var(--ink-500)",
    letterSpacing: "var(--ls-wide)",
    marginBottom: "var(--space-2)",
};

const inputStyle: CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    backgroundColor: "var(--paper-50)",
    border: "1px solid var(--ink-100)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-base)",
    color: "var(--ink-950)",
    outline: "none",
};

export function ContactForm() {
    const [isPending, startTransition] = useTransition();
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setError(null);
        startTransition(async () => {
            const result = await submitInquiry(formData);
            if (result.error) setError(result.error);
            else setDone(true);
        });
    }

    if (done) {
        return (
            <section className="section-lg">
                <div className="container" style={{ maxWidth: "560px", textAlign: "center", paddingTop: "var(--space-24)" }}>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)", letterSpacing: "var(--ls-wider)", marginBottom: "var(--space-6)" }}>
                            THANK YOU
                        </p>
                        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-2xl)", fontWeight: 300, color: "var(--ink-950)", marginBottom: "var(--space-6)" }}>
                            신청이 접수되었습니다
                        </h1>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--ink-500)", lineHeight: "var(--lh-relaxed)" }}>
                            남겨주신 연락처로 하루 이내에 연락드리겠습니다.<br />
                            급하신 경우 전화(010-2497-4310)나 카카오톡으로 문의해 주세요.
                        </p>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="section-lg">
            <div className="container" style={{ maxWidth: "560px" }}>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} style={{ marginBottom: "var(--space-12)" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)", letterSpacing: "var(--ls-wider)", marginBottom: "var(--space-4)" }}>
                        APPLY
                    </p>
                    <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(var(--text-xl), 3vw, var(--text-2xl))", fontWeight: 300, color: "var(--ink-950)", marginBottom: "var(--space-4)" }}>
                        수업 신청 · 상담 문의
                    </h1>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-base)", color: "var(--ink-500)", lineHeight: "var(--lh-relaxed)" }}>
                        아래 내용을 남겨주시면 확인 후 연락드립니다.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                    style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}
                >
                    {/* 허니팟 (봇 차단용, 화면에 보이지 않음) */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", left: "-9999px", height: 0, opacity: 0 }} aria-hidden="true" />

                    <div>
                        <label htmlFor="name" style={labelStyle}>이름 *</label>
                        <input id="name" name="name" required maxLength={30} placeholder="성함을 입력해 주세요" style={inputStyle} />
                    </div>

                    <div>
                        <label htmlFor="phone" style={labelStyle}>연락처 *</label>
                        <input id="phone" name="phone" required type="tel" placeholder="010-0000-0000" style={inputStyle} />
                    </div>

                    <div>
                        <label htmlFor="interest" style={labelStyle}>관심 클래스</label>
                        <select id="interest" name="interest" defaultValue="" style={inputStyle}>
                            <option value="">선택해 주세요</option>
                            {INTERESTS.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="preferred_time" style={labelStyle}>희망 시간대</label>
                        <select id="preferred_time" name="preferred_time" defaultValue="" style={inputStyle}>
                            <option value="">선택해 주세요</option>
                            {TIMES.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="source" style={labelStyle}>글씨인을 알게 된 경로</label>
                        <select id="source" name="source" defaultValue="" style={inputStyle}>
                            <option value="">선택해 주세요</option>
                            {SOURCES.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="message" style={labelStyle}>문의 내용</label>
                        <textarea id="message" name="message" rows={5} maxLength={1000} placeholder="궁금하신 점을 편하게 남겨주세요" style={{ ...inputStyle, resize: "vertical" }} />
                    </div>

                    {error && (
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-sm)", color: "var(--seal)" }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        style={{
                            padding: "16px 0",
                            backgroundColor: "var(--ink-950)",
                            color: "var(--paper-50)",
                            fontFamily: "var(--font-sans)",
                            fontSize: "var(--text-sm)",
                            letterSpacing: "var(--ls-wide)",
                            border: "none",
                            cursor: isPending ? "wait" : "pointer",
                            opacity: isPending ? 0.6 : 1,
                            transition: "opacity var(--duration-fast) var(--ease-default)",
                        }}
                    >
                        {isPending ? "접수 중..." : "신청서 보내기"}
                    </button>

                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-xs)", color: "var(--ink-300)", lineHeight: "var(--lh-relaxed)" }}>
                        남겨주신 연락처는 수업 상담 목적으로만 사용됩니다.
                        전화 문의: 010-2497-4310
                    </p>
                </motion.form>
            </div>
        </section>
    );
}
