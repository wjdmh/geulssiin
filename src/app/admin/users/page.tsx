import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface AdminUsersPageProps {
    searchParams: Promise<{ q?: string }>;
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
    const supabase = await createClient();

    // Require Admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    // Await searchParams
    const resolvedParams = await searchParams;
    const query = resolvedParams.q || '';

    // Build Query
    let dbQuery = supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

    if (query) {
        dbQuery = dbQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%`);
    }

    const { data: profiles } = await dbQuery;

    // Action to update role
    async function updateRole(formData: FormData) {
        "use server";
        const supabase = await createClient();
        const id = formData.get("id") as string;
        const newRole = formData.get("role") as string;

        const { error } = await supabase.from("profiles").update({ role: newRole }).eq("id", id);

        if (error) {
            console.error("Role Update Error:", error);
        }
        revalidatePath("/admin/users");
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold mb-2">회원 관리</h1>
                        <p className="text-gray-500">
                            회원들의 등급을 관리하고 가입 정보를 확인할 수 있습니다.
                        </p>
                    </div>

                    {/* Search Form */}
                    <form className="flex gap-2 w-full md:w-auto">
                        <input
                            name="q"
                            defaultValue={query}
                            placeholder="이름 또는 이메일 검색"
                            className="px-4 py-2 border rounded-md text-sm min-w-[200px] focus:ring-1 focus:ring-black focus:outline-none"
                        />
                        <button type="submit" className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800">
                            검색
                        </button>
                    </form>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">이름 (이메일)</th>
                                    <th className="px-6 py-4">생년월일</th>
                                    <th className="px-6 py-4">등급</th>
                                    <th className="px-6 py-4">가입 동기 / 경로</th>
                                    <th className="px-6 py-4">가입일</th>
                                    <th className="px-6 py-4">관리</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {profiles?.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            검색 결과가 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    profiles?.map((profile) => (
                                        <tr key={profile.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {profile.name || '-'}
                                                    {profile.is_admin && (
                                                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-black text-white">
                                                            ADMIN
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-400">{profile.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {profile.birthdate || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={
                                                    profile.role === 'student'
                                                        ? "text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-full text-xs"
                                                        : "text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-xs"
                                                }>
                                                    {profile.role === 'student' ? '수강생' : '일반회원'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <div className="flex flex-col gap-1 text-xs">
                                                    <span className="font-medium text-gray-800">{profile.join_motivation || '-'}</span>
                                                    <span className="text-gray-400">{profile.referral_source || '-'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 text-xs">
                                                {new Date(profile.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                {!profile.is_admin && (
                                                    <form action={updateRole} className="flex gap-2 items-center">
                                                        <input type="hidden" name="id" value={profile.id} />
                                                        <select
                                                            name="role"
                                                            defaultValue={profile.role}
                                                            className="border border-gray-200 rounded px-2 py-1 text-xs bg-white focus:ring-1 focus:ring-black focus:border-black"
                                                        >
                                                            <option value="user">일반회원</option>
                                                            <option value="student">수강생</option>
                                                        </select>
                                                        <button
                                                            type="submit"
                                                            className="px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-800 transition-colors whitespace-nowrap"
                                                        >
                                                            변경
                                                        </button>
                                                    </form>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
