'use server'

import { createClient } from '@/lib/supabase/server'

export type InquiryResult = { success?: boolean; error?: string }

export async function submitInquiry(formData: FormData): Promise<InquiryResult> {
    // 허니팟 — 봇이 채우는 숨은 필드. 값이 있으면 조용히 성공 처리(스팸 차단)
    if ((formData.get('website') as string)?.trim()) {
        return { success: true }
    }

    const name = (formData.get('name') as string)?.trim()
    const phone = (formData.get('phone') as string)?.trim()
    const interest = (formData.get('interest') as string)?.trim() || null
    const preferred_time = (formData.get('preferred_time') as string)?.trim() || null
    const message = (formData.get('message') as string)?.trim() || null
    const source = (formData.get('source') as string)?.trim() || null

    if (!name || name.length > 30) {
        return { error: '이름을 확인해 주세요.' }
    }
    if (!phone || !/^[0-9\-\s+()]{9,20}$/.test(phone)) {
        return { error: '연락처를 확인해 주세요. (예: 010-1234-5678)' }
    }
    if (message && message.length > 1000) {
        return { error: '문의 내용은 1,000자 이내로 작성해 주세요.' }
    }

    const supabase = await createClient()
    const { error } = await supabase.from('inquiries').insert({
        name, phone, interest, preferred_time, message, source,
    })

    if (error) {
        console.error('Inquiry insert error:', error.message)
        return { error: '접수 중 오류가 발생했습니다. 전화나 카카오톡으로 문의해 주세요.' }
    }
    return { success: true }
}
