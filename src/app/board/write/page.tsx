import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function BoardWritePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Verify Admin
    if (!user) redirect('/login');
    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();
    if (!profile?.is_admin) redirect('/board');

    async function createPost(formData: FormData) {
        "use server";
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const access_level = formData.get("access_level") as string;
        const is_notice = formData.get("is_notice") === 'on';

        await supabase.from("posts").insert({
            title,
            content,
            author_id: user.id,
            access_level,
            is_notice
        });

        revalidatePath("/board");
        redirect("/board");
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white px-4">
            <div className="container mx-auto max-w-2xl">
                <h1 className="text-3xl font-serif font-bold mb-8">게시글 작성 (관리자)</h1>

                <form action={createPost} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                        <input name="title" required className="w-full px-4 py-2 border rounded-md" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">공개 범위</label>
                        <select name="access_level" className="w-full px-4 py-2 border rounded-md bg-white">
                            <option value="general">전체 공개 (일반회원 이상)</option>
                            <option value="student">수강생 전용 (수강생 이상)</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="is_notice" id="is_notice" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black" />
                        <label htmlFor="is_notice" className="text-sm font-medium text-gray-700 select-none">
                            공지사항으로 등록 (최상단 고정)
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
                        <textarea name="content" required rows={10} className="w-full px-4 py-2 border rounded-md" />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button type="submit" className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
                            작성완료
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
