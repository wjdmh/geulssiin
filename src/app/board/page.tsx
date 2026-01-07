import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function BoardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let userProfile = null;
    if (user) {
        const { data } = await supabase.from('profiles').select('is_admin, role').eq('id', user.id).single();
        userProfile = data;
    }

    const { data: posts } = await supabase
        .from("posts")
        .select("*, profiles(email, name)")
        .order("is_notice", { ascending: false })
        .order("created_at", { ascending: false });

    // Filter logic handled by RLS, but fetching it doesn't hurt.
    // We can show a message if "student" posts are hidden, but RLS just returns empty.

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-black">
                        게시판
                    </h1>
                    <p className="text-gray-500 font-light">
                        글씨인 회원들과 소통하는 공간입니다.
                    </p>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-500">
                        총 <span className="font-bold text-black">{posts?.length || 0}</span>개의 글
                    </div>
                    {userProfile?.is_admin && (
                        <Link
                            href="/board/write"
                            className="px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                        >
                            글쓰기 (관리자)
                        </Link>
                    )}
                </div>

                <div className="border-t border-black">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className={`border-b border-gray-100 transition-colors ${post.is_notice ? 'bg-gray-50/80' : 'hover:bg-gray-50'}`}>
                                <Link href={`/board/${post.id}`} className="block py-6 px-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        {post.is_notice ? (
                                            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-sm">공지</span>
                                        ) : post.access_level === 'student' ? (
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-sm">수강생 전용</span>
                                        ) : (
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-sm">전체 공개</span>
                                        )}
                                        <h2 className={`text-xl font-medium text-black ${post.is_notice ? 'font-bold' : ''}`}>
                                            {post.title}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span>{post.profiles?.name || post.profiles?.email?.split('@')[0] || '익명'}</span>
                                        <span>•</span>
                                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="py-20 text-center text-gray-400 font-light">
                            작성된 게시글이 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
