import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AgentConsole } from "./AgentConsole";

export const dynamic = "force-dynamic";

export default async function AdminAgentPage() {
    const supabase = await createClient();

    // 미들웨어 1차 보호 + 페이지 이중 확인
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/login");
    const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();
    if (!profile?.is_admin) redirect("/");

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="mb-8">
                <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-900">← 관리자 홈</Link>
                <h1 className="text-2xl font-bold mt-2">글씨인 에이전트</h1>
                <p className="text-sm text-gray-500 mt-1">
                    마케팅 콘텐츠 제작·회고·자료 검색을 대화로 지시합니다. 요청은 큐에 쌓이고
                    로컬 워커가 처리해 결과를 돌려줍니다.
                </p>
            </div>
            <AgentConsole userId={user.id} />
        </div>
    );
}
