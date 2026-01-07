import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface BoardDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function BoardDetailPage({ params }: BoardDetailPageProps) {
    // Await params first as per Next.js 15+ requirements
    const { id } = await params;

    const supabase = await createClient();

    // Fetch Post with Author Info
    const { data: post, error } = await supabase
        .from("posts")
        .select(`
            *,
            profiles (
                email,
                name,
                role
            )
        `)
        .eq("id", id)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white px-4">
            <div className="container mx-auto max-w-3xl">
                {/* Header Navigation */}
                <div className="mb-8">
                    <Link href="/board" className="inline-flex items-center text-gray-500 hover:text-black transition-colors">
                        ← 목록으로 돌아가기
                    </Link>
                </div>

                {/* Post Header */}
                <div className="mb-10 pb-6 border-b border-black">
                    <div className="flex gap-2 mb-4">
                        {post.access_level === 'student' ? (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-sm">수강생 전용</span>
                        ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-sm">전체 공개</span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-black mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-black">
                                {post.profiles?.name || post.profiles?.email?.split('@')[0] || '익명'}
                            </span>
                            {post.profiles?.role === 'student' && <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">수강생</span>}
                            {post.profiles?.role === 'admin' && <span className="text-[10px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded">관리자</span>}
                        </div>
                        <time>{new Date(post.created_at).toLocaleDateString()} {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                    </div>
                </div>

                {/* Post Content */}
                <div className="prose prose-lg max-w-none prose-p:leading-relaxed text-gray-800 whitespace-pre-wrap min-h-[300px]">
                    {post.content}
                </div>
            </div>
        </div>
    );
}
