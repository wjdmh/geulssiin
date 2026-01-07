'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.' }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const origin = (await headers()).get('origin')
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Extract Survey & Personal Data
    const join_motivation = formData.get('join_motivation') as string
    const referral_source = formData.get('referral_source') as string
    const name = formData.get('name') as string
    const birthdate = formData.get('birthdate') as string

    // 1. Sign Up
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                join_motivation,
                referral_source,
                name,
                birthdate,
                role: 'user' // Default role
            }
        }
    })

    if (error) {
        return { error: '회원가입 중 오류가 발생했습니다: ' + error.message }
    }

    // 2. Auto Login attempt (Supabase might require email confirmation first, depending on settings. 
    // If "Confirm email" is disabled in Supabase, this works. If enabled, text requires update.)
    // We will assume 'Confirm Email' is OFF for better UX as requested "Member check message delete".
    // If it's ON, we can't auto-login easily without them clicking the link.
    // For now, let's try to sign in immediately.

    const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (!signInError) {
        revalidatePath('/', 'layout')
        redirect('/')
    }

    // If auto-login failed (likely due to email confirmation required), fall back to message
    // But user specifically asked to remove "Check Email".
    // Best bet: Redirect to home or login with success message.
    return { message: '회원가입이 완료되었습니다! 로그인해주세요.' }
}
