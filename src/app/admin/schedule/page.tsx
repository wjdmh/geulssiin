"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Edit2, X } from "lucide-react";

interface ClassItem {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    class_name: string;
    description: string;
    max_capacity: number;
    current_enrollment: number;
}

const DAYS = ['월', '화', '수', '목', '금', '토'];

export default function AdminSchedulePage() {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editingItem, setEditingItem] = useState<ClassItem | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        fetchClasses();
    }, []);

    async function fetchClasses() {
        const { data } = await supabase.from('classes').select('*').order('day'); // Basic sort, refine if needed
        // Custom sort for DAYS array
        if (data) {
            const sorted = (data as ClassItem[]).sort((a, b) => {
                const dayA = DAYS.indexOf(a.day);
                const dayB = DAYS.indexOf(b.day);
                if (dayA !== dayB) return dayA - dayB;
                return a.start_time.localeCompare(b.start_time);
            });
            setClasses(sorted);
        }
        setLoading(false);
    }

    // Prepare form for Edit
    function startEdit(item: ClassItem) {
        setEditingItem(item);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
    }

    function cancelEdit() {
        setEditingItem(null);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSaving(true);

        const form = e.currentTarget;
        const formData = new FormData(form);

        const day = formData.get('day') as string;
        const start_time = formData.get('start_time') as string;
        const end_time = formData.get('end_time') as string;
        const class_name = formData.get('class_name') as string;
        const description = formData.get('description') as string;
        const max_capacity = parseInt(formData.get('max_capacity') as string) || 0;
        const current_enrollment = parseInt(formData.get('current_enrollment') as string) || 0;

        // Upsert logic (Insert or Update)
        if (editingItem) {
            // Update
            const { error } = await supabase.from('classes').update({
                day,
                start_time,
                end_time,
                class_name,
                description,
                max_capacity,
                current_enrollment
            }).eq('id', editingItem.id);

            if (error) alert('수정 실패: ' + error.message);
            else alert('수정되었습니다.');
        } else {
            // Insert
            const { error } = await supabase.from('classes').insert({
                day,
                start_time,
                end_time,
                class_name,
                description,
                max_capacity,
                current_enrollment
            });

            if (error) alert('추가 실패: ' + error.message);
            else alert('추가되었습니다.');
        }

        form.reset();
        setEditingItem(null);
        fetchClasses();
        router.refresh();
        setSaving(false);
    }

    async function handleDelete(id: number) {
        if (!confirm('이 수업을 삭제하시겠습니까?')) return;

        const { error } = await supabase.from('classes').delete().eq('id', id);
        if (error) {
            alert('삭제 실패: ' + error.message);
        } else {
            fetchClasses();
            router.refresh();
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-serif font-bold mb-8">수업 시간표 관리</h1>

                <div className="grid md:grid-cols-12 gap-8">
                    {/* Form Section (Fixed or Sticky) */}
                    <div className="md:col-span-4">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-32">
                            <h2 className="text-lg font-bold mb-4 flex items-center justify-between">
                                {editingItem ? (
                                    <span className="flex items-center gap-2 text-blue-600"><Edit2 size={18} /> 수업 수정</span>
                                ) : (
                                    <span className="flex items-center gap-2"><Plus size={18} /> 새 수업 추가</span>
                                )}
                                {editingItem && (
                                    <button onClick={cancelEdit} className="text-gray-400 hover:text-black">
                                        <X size={18} />
                                    </button>
                                )}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">요일</label>
                                    <select
                                        name="day"
                                        defaultValue={editingItem?.day}
                                        className="w-full px-3 py-2 border rounded-md bg-white"
                                        required
                                    >
                                        {DAYS.map(d => <option key={d} value={d}>{d}요일</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">시작 시간</label>
                                        <input
                                            type="time"
                                            name="start_time"
                                            defaultValue={editingItem?.start_time}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">종료 시간</label>
                                        <input
                                            type="time"
                                            name="end_time"
                                            defaultValue={editingItem?.end_time}
                                            className="w-full px-3 py-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">수업명</label>
                                    <input
                                        name="class_name"
                                        defaultValue={editingItem?.class_name}
                                        placeholder="예: 문인화 기초반"
                                        className="w-full px-3 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">설명</label>
                                    <textarea
                                        name="description"
                                        defaultValue={editingItem?.description}
                                        placeholder="설명 (선택사항)"
                                        rows={2}
                                        className="w-full px-3 py-2 border rounded-md"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">최대 인원</label>
                                        <input
                                            type="number"
                                            name="max_capacity"
                                            defaultValue={editingItem?.max_capacity || 0}
                                            min={0}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">현재 인원</label>
                                        <input
                                            type="number"
                                            name="current_enrollment"
                                            defaultValue={editingItem?.current_enrollment || 0}
                                            min={0}
                                            className="w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className={`w-full py-3 text-white rounded-md transition-colors disabled:opacity-50 ${editingItem ? 'bg-blue-600 hover:bg-blue-700' : 'bg-black hover:bg-gray-800'}`}
                                >
                                    {saving ? '저장 중...' : (editingItem ? '수정 내용 저장' : '수업 추가하기')}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* List Section */}
                    <div className="md:col-span-8 space-y-6">
                        <h2 className="text-xl font-bold">등록된 수업 목록</h2>
                        {loading ? (
                            <p className="text-gray-400">로딩 중...</p>
                        ) : classes.length === 0 ? (
                            <p className="text-gray-400 py-12 text-center border rounded-lg bg-gray-50">등록된 수업이 없습니다. 왼쪽에서 수업을 추가해주세요.</p>
                        ) : (
                            // Use a card layout for better readability of details
                            <div className="grid gap-4">
                                {classes.map(cls => (
                                    <div
                                        key={cls.id}
                                        className={`p-4 border rounded-lg bg-white flex flex-col sm:flex-row gap-4 justify-between group transition-all ${editingItem?.id === cls.id ? 'border-2 border-blue-500 ring-2 ring-blue-50' : 'hover:border-gray-300'}`}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="bg-gray-100 rounded-lg p-3 text-center min-w-[80px]">
                                                <div className="text-lg font-bold text-black">{cls.day}</div>
                                                <div className="text-xs text-gray-500 font-mono mt-1">
                                                    {cls.start_time}<br />~<br />{cls.end_time}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-black">{cls.class_name}</h3>
                                                {cls.description && <p className="text-sm text-gray-500 mt-1">{cls.description}</p>}
                                                <div className="mt-3 flex items-center gap-3 text-xs">
                                                    <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                                        정원: {cls.current_enrollment} / {cls.max_capacity > 0 ? cls.max_capacity : '제한없음'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex sm:flex-col gap-2 justify-end sm:justify-start">
                                            <button
                                                onClick={() => startEdit(cls)}
                                                className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                                            >
                                                <Edit2 size={14} /> 수정
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cls.id)}
                                                className="flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                                            >
                                                <Trash2 size={14} /> 삭제
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
