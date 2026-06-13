import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, Image, Calendar, Type, LayoutTemplate } from "lucide-react"; // Assuming lucide-react is installed or use text

export default async function AdminDashboardPage() {
    const supabase = await createClient();

    // Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');
    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();
    if (!profile?.is_admin) redirect('/');

    const menuItems = [
        {
            title: "신청·문의 관리",
            description: "수업 신청서 확인 및 상담 진행 상태 관리",
            href: "/admin/inquiries",
            icon: "📨",
            color: "bg-red-50 text-red-700"
        },
        {
            title: "회원 관리",
            description: "회원 목록 조회 및 등급(수강생) 변경",
            href: "/admin/users",
            icon: "👥",
            color: "bg-blue-50 text-blue-700"
        },
        {
            title: "갤러리 관리",
            description: "작품 사진 업로드 및 삭제",
            href: "/admin/gallery",
            icon: "🖼️",
            color: "bg-purple-50 text-purple-700"
        },
        {
            title: "시간표 수정",
            description: "수업 시간 및 커리큘럼 내용 편집",
            href: "/admin/schedule",
            icon: "📅",
            color: "bg-green-50 text-green-700"
        },
        {
            title: "문구(텍스트) 관리",
            description: "메인 화면 및 소개글 텍스트 수정",
            href: "/admin/texts",
            icon: "📝",
            color: "bg-orange-50 text-orange-700"
        },
        {
            title: "게시판 바로가기",
            description: "공지사항 작성 및 게시글 관리",
            href: "/board",
            icon: "📢",
            color: "bg-gray-100 text-gray-700"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-gray-50/30">
            <div className="container mx-auto max-w-5xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-serif font-bold mb-2">관리자 대시보드</h1>
                    <p className="text-gray-500">
                        사이트의 주요 콘텐츠를 한곳에서 관리하세요.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-4 ${item.color}`}>
                                {item.icon}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black">
                                {item.title}
                            </h2>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {item.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
