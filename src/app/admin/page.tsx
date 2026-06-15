import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
    new: "신규",
    contacted: "상담중",
    registered: "등록",
    closed: "종료",
};

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
    if (!profile?.is_admin) redirect("/");

    // ── 요약 통계 (한눈에 보이는 숫자) ──
    const [newInqRes, totalInqRes, galleryRes, classRes, memberRes, recentRes, sourceRes] = await Promise.all([
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
        supabase.from("classes").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id,name,interest,status,created_at").order("created_at", { ascending: false }).limit(3),
        supabase.from("inquiries").select("source,status"),
    ]);

    const newInquiries = newInqRes.count ?? 0;
    const totalInquiries = totalInqRes.count ?? 0;
    const galleryCount = galleryRes.count ?? 0;
    const classCount = classRes.count ?? 0;
    const memberCount = memberRes.count ?? 0;
    const recent = recentRes.data ?? [];

    // 유입경로 집계 (정량 활용 — 어디서 신청이 들어오는가)
    const sourceCounts = (sourceRes.data ?? []).reduce<Record<string, number>>((acc, r) => {
        const key = (r.source as string) || "미입력";
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
    }, {});
    const sourceEntries = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1]);

    // 상태별 전환 퍼널 (신규 → 상담중 → 등록)
    const statusCounts = (sourceRes.data ?? []).reduce<Record<string, number>>((acc, r) => {
        const key = (r.status as string) || "new";
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
    }, {});
    const funnel = [
        { key: "new", label: "신규" },
        { key: "contacted", label: "상담중" },
        { key: "registered", label: "등록" },
        { key: "closed", label: "종료" },
    ].map((s) => ({ ...s, count: statusCounts[s.key] ?? 0 }));

    const stats = [
        { label: "신규 문의", value: newInquiries, href: "/admin/inquiries", highlight: newInquiries > 0, suffix: "건" },
        { label: "전체 문의", value: totalInquiries, href: "/admin/inquiries", highlight: false, suffix: "건" },
        { label: "갤러리 작품", value: galleryCount, href: "/admin/gallery", highlight: false, suffix: "점" },
        { label: "운영 수업", value: classCount, href: "/admin/schedule", highlight: false, suffix: "개" },
        { label: "회원", value: memberCount, href: "/admin/users", highlight: false, suffix: "명" },
    ];

    const iconChip = "bg-stone-100 text-stone-700";
    const menuItems = [
        { title: "신청·문의 관리", description: "수업 신청서 확인 및 상담 진행 상태 관리", href: "/admin/inquiries", icon: "📨", color: iconChip },
        { title: "회원 관리", description: "회원 목록 조회 및 등급(수강생) 변경", href: "/admin/users", icon: "👥", color: iconChip },
        { title: "갤러리 관리", description: "작품 사진 업로드 및 삭제", href: "/admin/gallery", icon: "🖼️", color: iconChip },
        { title: "시간표 수정", description: "수업 시간 및 커리큘럼 내용 편집", href: "/admin/schedule", icon: "📅", color: iconChip },
        { title: "문구(텍스트) 관리", description: "메인 화면 및 소개글 텍스트 수정", href: "/admin/texts", icon: "📝", color: iconChip },
        { title: "게시판 바로가기", description: "공지사항 작성 및 게시글 관리", href: "/board", icon: "📢", color: iconChip },
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50/30">
            <div className="container mx-auto max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-bold mb-2">관리자 대시보드</h1>
                    <p className="text-gray-500">사이트 현황을 한눈에 확인하고 콘텐츠를 관리하세요.</p>
                </div>

                {/* ── 요약 통계 줄 ── */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                    {stats.map((s) => (
                        <Link
                            key={s.label}
                            href={s.href}
                            className="relative bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                            style={s.highlight ? { borderColor: "var(--seal)" } : undefined}
                        >
                            {s.highlight && (
                                <span
                                    className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: "var(--seal)" }}
                                    aria-label="신규"
                                />
                            )}
                            <p className="text-xs text-gray-500 mb-2">{s.label}</p>
                            <p
                                className="text-3xl font-bold tabular-nums"
                                style={s.highlight ? { color: "var(--seal)" } : { color: "#111" }}
                            >
                                {s.value}
                                <span className="text-base font-normal text-gray-400 ml-1">{s.suffix}</span>
                            </p>
                        </Link>
                    ))}
                </div>

                {/* ── 전환 퍼널 (상태별) ── */}
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm mb-4">
                    <h2 className="text-sm font-bold text-gray-900 mb-4">상담 전환 현황</h2>
                    <div className="flex items-center gap-2">
                        {funnel.map((f, i) => (
                            <div key={f.key} className="flex items-center gap-2 flex-1">
                                <div className="flex-1 text-center">
                                    <p className="text-2xl font-bold tabular-nums text-gray-900">{f.count}</p>
                                    <p className="text-xs text-gray-500 mt-1">{f.label}</p>
                                </div>
                                {i < funnel.length - 1 && <span className="text-gray-300">→</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── 최근 문의 + 유입경로 ── */}
                <div className="grid md:grid-cols-2 gap-4 mb-10">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-gray-900">최근 신청·문의</h2>
                            <Link href="/admin/inquiries" className="text-xs text-gray-400 hover:text-black">전체 보기 →</Link>
                        </div>
                        {recent.length > 0 ? (
                            <ul className="space-y-3">
                                {recent.map((r) => (
                                    <li key={r.id} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-800">
                                            {r.name}
                                            {r.interest ? <span className="text-gray-400"> · {r.interest}</span> : null}
                                        </span>
                                        <span
                                            className="text-xs px-2 py-0.5 rounded-full"
                                            style={r.status === "new"
                                                ? { backgroundColor: "var(--seal)", color: "#fff" }
                                                : { backgroundColor: "#f3f4f6", color: "#6b7280" }}
                                        >
                                            {STATUS_LABEL[r.status as string] ?? r.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400">아직 들어온 신청이 없습니다.</p>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-900 mb-4">유입 경로 (신청 기준)</h2>
                        {sourceEntries.length > 0 ? (
                            <ul className="space-y-2">
                                {sourceEntries.map(([src, cnt]) => {
                                    const pct = totalInquiries > 0 ? Math.round((cnt / totalInquiries) * 100) : 0;
                                    return (
                                        <li key={src} className="text-sm">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-gray-700">{src}</span>
                                                <span className="text-gray-400 tabular-nums">{cnt}건 · {pct}%</span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: "#111" }} />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-400">신청이 쌓이면 어디서 왔는지 집계됩니다.</p>
                        )}
                    </div>
                </div>

                {/* ── 관리 메뉴 ── */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                        >
                            {item.href === "/admin/inquiries" && newInquiries > 0 && (
                                <span
                                    className="absolute top-4 right-4 text-xs font-bold text-white px-2 py-0.5 rounded-full"
                                    style={{ backgroundColor: "var(--seal)" }}
                                >
                                    {newInquiries}
                                </span>
                            )}
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 ${item.color}`}>
                                {item.icon}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black">{item.title}</h2>
                            <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
