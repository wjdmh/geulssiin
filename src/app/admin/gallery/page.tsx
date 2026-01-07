"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface GalleryItem {
    id: number;
    title: string;
    description: string;
    image_url: string;
    category?: string;
}

export default function GalleryUploadPage() {
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<GalleryItem[]>([]);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        fetchImages();
    }, []);

    async function fetchImages() {
        const { data } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
        if (data) setImages(data);
    }

    // Populate form when Edit button is clicked
    function startEdit(item: GalleryItem) {
        setEditingItem(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function cancelEdit() {
        setEditingItem(null);
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUploading(true);

        const form = e.currentTarget;
        const fileInput = form.elements.namedItem('file') as HTMLInputElement;
        const titleInput = form.elements.namedItem('title') as HTMLInputElement;
        const descInput = form.elements.namedItem('description') as HTMLTextAreaElement;
        const categoryInput = form.elements.namedItem('category') as HTMLSelectElement;

        const file = fileInput.files?.[0];

        let targetImageUrl = editingItem?.image_url || '';

        // 1. If File Uploaded (New or Update with file change)
        if (file) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('gallery_images')
                .upload(fileName, file);

            if (uploadError) {
                alert('Upload failed: ' + uploadError.message);
                setUploading(false);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('gallery_images')
                .getPublicUrl(fileName);

            targetImageUrl = publicUrl;

            // If updating and there was an old image from basic storage (not external), try to delete it?
            // Optional: Skip complex cleanup for now to avoid accidental deletion of shared assets.
        } else if (!editingItem) {
            // Creating new but no file?
            alert('이미지를 선택해주세요.');
            setUploading(false);
            return;
        }

        // 2. Insert or Update Database
        if (editingItem) {
            // UPDATE
            const { error } = await supabase.from('gallery').update({
                title: titleInput.value,
                description: descInput.value,
                category: categoryInput.value,
                image_url: targetImageUrl
            }).eq('id', editingItem.id);

            if (error) alert('수정 실패: ' + error.message);
            else alert('수정되었습니다.');
        } else {
            // INSERT
            const { error } = await supabase.from('gallery').insert({
                title: titleInput.value,
                description: descInput.value,
                image_url: targetImageUrl,
                category: categoryInput.value
            });

            if (error) alert('등록 실패: ' + error.message);
            else alert('등록되었습니다.');
        }

        form.reset();
        setEditingItem(null);
        fetchImages();
        router.refresh();
        setUploading(false);
    }

    async function handleDelete(id: number, imageUrl: string) {
        if (!confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) return;

        try {
            const urlParts = imageUrl.split('/gallery_images/');
            if (urlParts.length > 1) {
                const fileName = urlParts[1];
                await supabase.storage.from('gallery_images').remove([fileName]);
            }
        } catch (e) {
            console.error('Error parsing URL:', e);
        }

        const { error } = await supabase.from('gallery').delete().eq('id', id);

        if (error) alert('삭제 실패: ' + error.message);
        else {
            alert('삭제되었습니다.');
            fetchImages();
            router.refresh();
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-serif font-bold">gallery 관리</h1>
                {/* Optional: Add Go Back or Dashboard link */}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Upload/Edit Form */}
                <div className="bg-gray-50 p-6 rounded-xl h-fit border border-gray-100">
                    <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
                        {editingItem ? '작품 수정' : '새 작품 등록'}
                        {editingItem && (
                            <button onClick={cancelEdit} className="text-xs text-gray-400 underline font-normal">
                                취소하고 새 등록
                            </button>
                        )}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Hidden ID for reference if needed, though state handles it */}

                        {/* Image Preview if Editing */}
                        {editingItem && (
                            <div className="mb-4 p-2 bg-white border rounded text-center">
                                <p className="text-xs text-gray-500 mb-2">현재 이미지</p>
                                <img src={editingItem.image_url} alt="Current" className="h-24 mx-auto object-contain" />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                작품 이미지 {editingItem && <span className="text-gray-400 font-normal">(변경시에만 선택)</span>}
                            </label>
                            <input
                                type="file"
                                name="file"
                                accept="image/*"
                                required={!editingItem} // Required only for new
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">작품명</label>
                            <input
                                name="title"
                                required
                                defaultValue={editingItem?.title || ''}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="예: 묵향"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">설명</label>
                            <textarea
                                name="description"
                                rows={3}
                                defaultValue={editingItem?.description || ''}
                                className="w-full px-4 py-2 border rounded-md"
                                placeholder="설명을 입력하세요"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">카테고리</label>
                            <select
                                name="category"
                                defaultValue={editingItem?.category || 'director'}
                                className="w-full px-4 py-2 border rounded-md"
                            >
                                <option value="director">그리운 갤러리 (Director)</option>
                                <option value="member">회원 갤러리 (Member)</option>
                            </select>
                        </div>
                        <button disabled={uploading} type="submit" className="w-full py-3 bg-black text-white rounded-md disabled:opacity-50 hover:bg-gray-800 transition-colors">
                            {uploading ? (editingItem ? '수정 중...' : '업로드 중...') : (editingItem ? '수정 완료' : '등록하기')}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div>
                    <h2 className="text-xl font-bold mb-4">등록된 작품 목록</h2>
                    <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
                        {images.length > 0 ? (
                            images.map((img) => (
                                <div key={img.id} className={`flex items-center gap-4 p-4 border rounded-lg bg-white transition-all ${editingItem?.id === img.id ? 'border-2 border-black ring-1 ring-black/5' : ''}`}>
                                    <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                        <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium truncate">{img.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${img.category === 'member' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {img.category === 'member' ? '회원' : '그리운'}
                                            </span>
                                            {img.category === 'member' && img.description && (
                                                <span className="text-xs text-gray-400 truncate max-w-[100px]">{img.description}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => startEdit(img)}
                                            className="px-3 py-1 text-xs text-black border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDelete(img.id, img.image_url)}
                                            className="px-3 py-1 text-xs text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">등록된 작품이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
