"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminTextsPage() {
    const [config, setConfig] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        fetchConfig();
    }, []);

    async function fetchConfig() {
        const { data } = await supabase.from('site_config').select('*');
        if (data) {
            const map = data.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>);
            setConfig(map);
        }
        setLoading(false);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);
        const form = e.currentTarget;
        const formData = new FormData(form);

        const updates = [
            { key: 'hero_title', value: formData.get('hero_title') },
            { key: 'hero_subtitle', value: formData.get('hero_subtitle') },
            { key: 'about_title', value: formData.get('about_title') },
            { key: 'about_content', value: formData.get('about_content') },
        ];

        for (const update of updates) {
            await supabase.from('site_config').upsert({
                key: update.key,
                value: update.value,
                description: 'Updated by admin'
            });
        }

        // Force refresh
        router.refresh();
        alert('저장되었습니다. 홈페이지에서 변경사항을 확인하세요.');
        setSaving(false);
    }

    if (loading) return <div className="min-h-screen pt-32 text-center">로딩 중...</div>;

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 bg-white">
            <div className="container mx-auto max-w-3xl">
                <h1 className="text-3xl font-serif font-bold mb-8">문구(텍스트) 관리</h1>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Section 1: Main Home */}
                    <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            🏠 메인 홈페이지 (Home)
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">메인 타이틀 (큰 글씨)</label>
                                <input
                                    name="hero_title"
                                    defaultValue={config['hero_title'] || ''}
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">서브 타이틀 (작은 글씨)</label>
                                <input
                                    name="hero_subtitle"
                                    defaultValue={config['hero_subtitle'] || ''}
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Section 2: About Page */}
                    <section className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            📖 소개 페이지 (About)
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">소개 제목</label>
                                <input
                                    name="about_title"
                                    defaultValue={config['about_title'] || ''}
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">소개 본문</label>
                                <textarea
                                    name="about_content"
                                    defaultValue={config['about_content'] || ''}
                                    rows={8}
                                    className="w-full px-4 py-2 border rounded-md"
                                />
                                <p className="text-xs text-gray-500 mt-1">줄바꿈이 적용됩니다.</p>
                            </div>
                        </div>
                    </section>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-md disabled:opacity-50"
                        >
                            {saving ? '저장 중...' : '변경사항 저장하기'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
