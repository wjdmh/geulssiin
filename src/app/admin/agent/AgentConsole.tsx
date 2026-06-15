"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

type AgentEvent = {
    type: string;
    name?: string;
    text?: string;
    summary?: string;
    args?: Record<string, unknown>;
};

type Job = {
    id: string;
    created_at: string;
    kind: string;
    prompt: string;
    status: "pending" | "running" | "done" | "error";
    reply: string | null;
    events: AgentEvent[];
};

const STATUS: Record<Job["status"], { label: string; cls: string }> = {
    pending: { label: "대기 중", cls: "bg-gray-100 text-gray-600" },
    running: { label: "처리 중", cls: "bg-amber-100 text-amber-700" },
    done: { label: "완료", cls: "bg-emerald-100 text-emerald-700" },
    error: { label: "오류", cls: "bg-red-100 text-red-700" },
};

export function AgentConsole({ userId }: { userId: string }) {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [input, setInput] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [supabase] = useState(() => createClient());
    const bottomRef = useRef<HTMLDivElement>(null);

    // 초기 로드 + 실시간 구독
    useEffect(() => {
        let active = true;
        supabase
            .from("agent_jobs")
            .select("*")
            .order("created_at", { ascending: true })
            .limit(100)
            .then(({ data }) => {
                if (active && data) setJobs(data as Job[]);
            });

        const channel = supabase
            .channel("agent_jobs_admin")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "agent_jobs" },
                (payload) => {
                    setJobs((prev) => {
                        const row = payload.new as Job;
                        if (payload.eventType === "DELETE") {
                            return prev.filter((j) => j.id !== (payload.old as Job).id);
                        }
                        const idx = prev.findIndex((j) => j.id === row.id);
                        if (idx === -1) return [...prev, row];
                        const copy = [...prev];
                        copy[idx] = row;
                        return copy;
                    });
                },
            )
            .subscribe();

        return () => {
            active = false;
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [jobs]);

    const submit = useCallback(async () => {
        const prompt = input.trim();
        if (!prompt || submitting) return;
        setSubmitting(true);
        setError(null);
        const { error } = await supabase
            .from("agent_jobs")
            .insert({ kind: "chat", prompt, created_by: userId, status: "pending" });
        if (error) {
            setError("요청 전송에 실패했어요: " + error.message);
        } else {
            setInput("");
        }
        setSubmitting(false);
    }, [input, submitting, supabase, userId]);

    const hasPending = jobs.some((j) => j.status === "pending" || j.status === "running");

    return (
        <div className="flex flex-col gap-4">
            {/* 대화 영역 */}
            <div className="border border-gray-200 rounded-xl bg-white p-4 min-h-[360px] max-h-[60vh] overflow-y-auto flex flex-col gap-4">
                {jobs.length === 0 && (
                    <p className="text-sm text-gray-400 text-center my-12">
                        아직 대화가 없어요. 아래에 지시를 입력해 보세요.<br />
                        예: &ldquo;신규 수강생 모집 인스타 카드 만들어줘&rdquo; · &ldquo;지난주 회고 정리해줘&rdquo;
                    </p>
                )}

                {jobs.map((job) => (
                    <div key={job.id} className="flex flex-col gap-2">
                        {/* 사용자 메시지 */}
                        <div className="flex justify-end">
                            <div className="max-w-[80%] bg-gray-900 text-white text-sm rounded-2xl rounded-br-sm px-4 py-2.5 whitespace-pre-wrap break-words">
                                {job.prompt}
                            </div>
                        </div>

                        {/* 에이전트 응답 */}
                        <div className="flex justify-start">
                            <div className="max-w-[85%] flex flex-col gap-2">
                                <span className={`self-start text-xs px-2 py-0.5 rounded-full ${STATUS[job.status].cls}`}>
                                    {STATUS[job.status].label}
                                </span>

                                {/* 진행 로그(도구 호출) */}
                                {job.events?.length > 0 && (
                                    <div className="text-xs text-gray-500 bg-gray-50 border border-gray-100 rounded-lg p-2 flex flex-col gap-1">
                                        {job.events.map((e, i) => (
                                            <EventLine key={i} e={e} />
                                        ))}
                                    </div>
                                )}

                                {job.reply && (
                                    <div className="bg-white border border-gray-200 text-gray-800 text-sm rounded-2xl rounded-bl-sm px-4 py-2.5 whitespace-pre-wrap break-words">
                                        {job.reply}
                                    </div>
                                )}

                                {(job.status === "pending" || job.status === "running") && !job.reply && (
                                    <div className="text-sm text-gray-400">에이전트가 작업하고 있어요…</div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {hasPending && (
                <p className="text-xs text-gray-400">
                    응답이 오지 않으면 로컬 워커가 실행 중인지 확인해 주세요
                    (<code>python3 -m agents.admin_bridge.worker</code>).
                </p>
            )}

            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* 입력 */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
                className="flex gap-2"
            >
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submit();
                        }
                    }}
                    rows={2}
                    maxLength={2000}
                    placeholder="에이전트에게 지시하기 (Enter 전송 · Shift+Enter 줄바꿈)"
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-gray-400"
                />
                <button
                    type="submit"
                    disabled={submitting || !input.trim()}
                    className="px-5 rounded-xl text-sm font-medium text-white disabled:opacity-40"
                    style={{ backgroundColor: "var(--seal)" }}
                >
                    전송
                </button>
            </form>
        </div>
    );
}

function EventLine({ e }: { e: AgentEvent }) {
    if (e.type === "tool_call") {
        return <div>🛠 <span className="font-medium">{e.name}</span> 실행…</div>;
    }
    if (e.type === "tool_result") {
        return <div>✅ {e.name} 결과 받음</div>;
    }
    if (e.type === "memory") {
        return <div>🧠 기억 저장: {e.name}</div>;
    }
    if (e.type === "error") {
        return <div className="text-red-500">⚠ {e.text}</div>;
    }
    return null;
}
