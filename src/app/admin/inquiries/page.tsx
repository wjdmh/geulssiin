import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { updateInquiryStatus } from "./actions";

const STATUS_LABEL: Record<string, string> = {
    new: "🔴 신규",
    contacted: "🟡 연락완료",
    registered: "🟢 등록",
    closed: "⚪ 종료",
};

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
    const supabase = await createClient();

    // 미들웨어가 1차 보호하지만 페이지에서도 확인 (이중 안전망)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');
    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();
    if (!profile?.is_admin) redirect('/');

    const { data: inquiries } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

    const newCount = inquiries?.filter(i => i.status === 'new').length ?? 0;

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-900">← 관리자 홈</Link>
                <h1 className="text-2xl font-bold mt-2">수업 신청·문의 관리</h1>
                <p className="text-sm text-gray-500 mt-1">
                    총 {inquiries?.length ?? 0}건 · 신규 {newCount}건
                </p>
            </div>

            <div className="space-y-4">
                {(!inquiries || inquiries.length === 0) && (
                    <p className="text-gray-500 py-12 text-center border rounded-lg">아직 접수된 신청이 없습니다.</p>
                )}

                {inquiries?.map((inq) => (
                    <div key={inq.id} className="border rounded-lg p-5 bg-white">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                            <div>
                                <span className="font-bold text-lg">{inq.name}</span>
                                <a href={`tel:${inq.phone}`} className="ml-3 text-blue-600 hover:underline">{inq.phone}</a>
                                <span className="ml-3 text-sm">{STATUS_LABEL[inq.status] ?? inq.status}</span>
                            </div>
                            <span className="text-xs text-gray-400">
                                {new Date(inq.created_at).toLocaleString('ko-KR')}
                            </span>
                        </div>

                        <div className="text-sm text-gray-700 grid gap-1 mb-3">
                            {inq.interest && <p>관심 클래스: <b>{inq.interest}</b></p>}
                            {inq.preferred_time && <p>희망 시간대: {inq.preferred_time}</p>}
                            {inq.source && <p>유입 경로: <b>{inq.source}</b></p>}
                            {inq.message && <p className="mt-2 p-3 bg-gray-50 rounded whitespace-pre-wrap">{inq.message}</p>}
                        </div>

                        <form action={updateInquiryStatus} className="flex flex-wrap items-center gap-2 pt-3 border-t">
                            <input type="hidden" name="id" value={inq.id} />
                            <select name="status" defaultValue={inq.status} className="border rounded px-2 py-1.5 text-sm">
                                <option value="new">신규</option>
                                <option value="contacted">연락완료</option>
                                <option value="registered">등록</option>
                                <option value="closed">종료</option>
                            </select>
                            <input
                                name="admin_note"
                                defaultValue={inq.admin_note ?? ''}
                                placeholder="메모 (예: 6/15 통화, 수요반 희망)"
                                className="border rounded px-2 py-1.5 text-sm flex-1 min-w-[200px]"
                            />
                            <button type="submit" className="px-4 py-1.5 bg-gray-900 text-white text-sm rounded hover:bg-gray-700">
                                저장
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
}
