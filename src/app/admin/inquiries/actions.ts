'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateInquiryStatus(formData: FormData) {
    const id = Number(formData.get('id'))
    const status = formData.get('status') as string
    const admin_note = (formData.get('admin_note') as string)?.trim() || null

    if (!id || !['new', 'contacted', 'registered', 'closed'].includes(status)) return

    const supabase = await createClient()
    // RLS가 admin만 update 허용 — 비admin 호출은 자동으로 0행 갱신
    await supabase.from('inquiries').update({ status, admin_note }).eq('id', id)
    revalidatePath('/admin/inquiries')
}
