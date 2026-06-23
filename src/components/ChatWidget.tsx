"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Phone, MessageCircle } from "lucide-react";

type Msg = { role: "user" | "model"; text: string };

const KAKAO_URL = "https://pf.kakao.com/_xkETdn";
const PHONE = "010-2497-4310";

const GREETING =
  "안녕하세요, 글씨인아트센터 안내 도우미예요. 수업·시간표·위치 등 궁금한 점을 편하게 물어봐 주세요.";

const SUGGESTIONS = [
  "어떤 수업이 있나요?",
  "수업 시간표가 어떻게 되나요?",
  "위치가 어디인가요?",
  "글씨를 처음인데 괜찮을까요?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 다른 컴포넌트(문의 CTA)에서 열 수 있도록 전역 이벤트 수신
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  // 처음 방문 시 살짝 말풍선으로 "대화형"임을 알림 (한 번만)
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1600);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (open) setShowHint(false);
  }, [open]);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      if (messages.length === 0) inputRef.current?.focus();
    }
  }, [open, messages, loading]);

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim().slice(0, 500);
      if (!clean || loading) return;
      setErrored(false);
      const next: Msg[] = [...messages, { role: "user", text: clean }];
      setMessages(next);
      setInput("");
      setLoading(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });
        const data = await res.json();
        if (!res.ok) {
          setMessages((m) => [
            ...m,
            { role: "model", text: data?.error ?? "잠시 후 다시 시도해 주세요." },
          ]);
          setErrored(true);
        } else {
          setMessages((m) => [...m, { role: "model", text: data.reply }]);
        }
      } catch {
        setMessages((m) => [
          ...m,
          { role: "model", text: "연결이 불안정해요. 전화나 카카오톡으로 문의해 주세요." },
        ]);
        setErrored(true);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading],
  );

  return (
    <>
      {/* ── 런처 (말풍선형 챗봇 버튼 + 첫 인사 힌트) ── */}
      {!open && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            zIndex: 60,
            display: "flex",
            alignItems: "flex-end",
            gap: "10px",
          }}
        >
          {/* 첫 방문 힌트 말풍선 */}
          <AnimatePresence>
            {showHint && (
              <motion.button
                key="hint"
                onClick={() => setOpen(true)}
                initial={{ opacity: 0, x: 8, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
                style={{
                  marginBottom: "8px",
                  maxWidth: "190px",
                  textAlign: "left",
                  backgroundColor: "#fff",
                  color: "var(--ink-800)",
                  border: "1px solid var(--ink-100)",
                  borderRadius: "14px",
                  boxShadow: "0 6px 24px rgba(15,14,13,0.14)",
                  padding: "11px 15px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  lineHeight: 1.5,
                  cursor: "pointer",
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--ink-950)" }}>글씨인 도우미</span>
                <br />
                무엇이든 편하게 물어보세요
              </motion.button>
            )}
          </AnimatePresence>

          {/* 챗봇 런처: 미니멀 원형 + 라인 아이콘 */}
          <motion.button
            aria-label="글씨인 안내 도우미 열기"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "9999px",
              backgroundColor: "var(--ink-950)",
              color: "#fff",
              boxShadow: "0 10px 28px rgba(15,14,13,0.30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <MessageCircle size={23} strokeWidth={1.75} />
          </motion.button>
        </div>
      )}

      {/* ── 패널 ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.25, 0, 0, 1] }}
            role="dialog"
            aria-label="글씨인 안내 도우미"
            style={{
              position: "fixed",
              right: "20px",
              bottom: "20px",
              zIndex: 60,
              width: "min(380px, calc(100vw - 32px))",
              height: "min(560px, calc(100vh - 96px))",
              backgroundColor: "var(--paper-50)",
              borderRadius: "16px",
              border: "1px solid var(--ink-100)",
              boxShadow: "0 12px 48px rgba(15,14,13,0.18)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              fontFamily: "var(--font-sans)",
            }}
          >
            {/* 헤더 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                borderBottom: "1px solid var(--ink-100)",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "9999px",
                    backgroundColor: "var(--seal)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                  }}
                >
                  ✍
                </span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink-950)", lineHeight: 1.2 }}>
                    글씨인 안내 도우미
                  </p>
                  <p style={{ fontSize: "11px", color: "var(--ink-500)", lineHeight: 1.2 }}>
                    수업·시간표·위치 안내
                  </p>
                </div>
              </div>
              <button
                aria-label="닫기"
                onClick={() => setOpen(false)}
                style={{ background: "none", border: "none", color: "var(--ink-500)", cursor: "pointer", padding: "4px" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* 메시지 영역 */}
            <div
              ref={scrollRef}
              style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {/* 인사 */}
              <Bubble role="model">{GREETING}</Bubble>

              {/* 추천 질문 (대화 시작 전) */}
              {messages.length === 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "2px" }}>
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      style={{
                        fontSize: "12.5px",
                        color: "var(--ink-800)",
                        backgroundColor: "#fff",
                        border: "1px solid var(--ink-100)",
                        borderRadius: "9999px",
                        padding: "7px 12px",
                        cursor: "pointer",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) => (
                <Bubble key={i} role={m.role}>
                  {m.text}
                </Bubble>
              ))}

              {loading && (
                <Bubble role="model">
                  <span style={{ color: "var(--ink-500)" }}>답변을 준비하고 있어요…</span>
                </Bubble>
              )}

              {/* 해결 안 될 때 직접 문의 CTA */}
              {(errored || messages.length >= 4) && (
                <div
                  style={{
                    marginTop: "4px",
                    padding: "12px",
                    backgroundColor: "#fff",
                    border: "1px solid var(--ink-100)",
                    borderRadius: "12px",
                  }}
                >
                  <p style={{ fontSize: "12px", color: "var(--ink-500)", marginBottom: "8px" }}>
                    바로 사람과 상담하고 싶으시면
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <FallbackLink href={KAKAO_URL} external icon={<MessageCircle size={15} />} label="카카오톡 채널 문의" />
                    <FallbackLink href={`tel:${PHONE.replace(/-/g, "")}`} icon={<Phone size={15} />} label={`전화 ${PHONE}`} />
                    <FallbackLink href="/contact" icon={<span style={{ fontSize: "13px" }}>✍</span>} label="수업 신청서 작성" seal />
                  </div>
                </div>
              )}
            </div>

            {/* 입력 */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              style={{ display: "flex", gap: "8px", padding: "12px", borderTop: "1px solid var(--ink-100)", backgroundColor: "#fff" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="궁금한 점을 입력해 주세요"
                style={{
                  flex: 1,
                  border: "1px solid var(--ink-100)",
                  borderRadius: "9999px",
                  padding: "10px 14px",
                  fontSize: "14px",
                  color: "var(--ink-950)",
                  outline: "none",
                  backgroundColor: "var(--paper-50)",
                  fontFamily: "var(--font-sans)",
                }}
              />
              <button
                type="submit"
                aria-label="보내기"
                disabled={loading || !input.trim()}
                style={{
                  width: "42px",
                  height: "42px",
                  flexShrink: 0,
                  borderRadius: "9999px",
                  backgroundColor: input.trim() && !loading ? "var(--seal)" : "var(--ink-100)",
                  color: input.trim() && !loading ? "#fff" : "var(--ink-300)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: input.trim() && !loading ? "pointer" : "default",
                  transition: "background-color 0.2s",
                }}
              >
                <Send size={17} />
              </button>
            </form>

            <p style={{ fontSize: "10.5px", color: "var(--ink-300)", textAlign: "center", padding: "0 12px 10px" }}>
              AI 안내 도우미예요. 정확한 안내는 전화·카카오톡으로 확인해 주세요.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, children }: { role: "user" | "model"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
      <div
        style={{
          maxWidth: "82%",
          padding: "10px 13px",
          borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
          backgroundColor: isUser ? "var(--ink-950)" : "#fff",
          color: isUser ? "#fff" : "var(--ink-800)",
          border: isUser ? "none" : "1px solid var(--ink-100)",
          fontSize: "14px",
          lineHeight: 1.55,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FallbackLink({
  href,
  label,
  icon,
  external,
  seal,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  seal?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "9px 12px",
        borderRadius: "9999px",
        fontSize: "13px",
        fontWeight: 500,
        textDecoration: "none",
        backgroundColor: seal ? "var(--seal)" : "var(--paper-100)",
        color: seal ? "#fff" : "var(--ink-800)",
        border: seal ? "none" : "1px solid var(--ink-100)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      {label}
    </a>
  );
}
