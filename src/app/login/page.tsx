'use client'

import { login, signup } from './actions'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const MOTIVATION_OPTIONS = ['기존 회원', '캘리그라피 소통', '작가 활동', '단순 구경', '기타']
const REFERRAL_OPTIONS = ['인스타그램', '블로그/검색', '지인 추천', '기타']

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Survey State
    const [motivation, setMotivation] = useState<string>('')
    const [referral, setReferral] = useState<string>('')

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)
        setMessage(null)

        if (isLogin) {
            const res = await login(formData)
            if (res?.error) setError(res.error)
        } else {
            // Validation for Signup
            const name = formData.get('name') as string
            const birthdate = formData.get('birthdate') as string

            if (!motivation || !referral || !name || !birthdate) {
                setError('모든 정보를 입력하고 선택해주세요.')
                setIsLoading(false)
                return
            }
            // Append survey data
            formData.append('join_motivation', motivation)
            formData.append('referral_source', referral)

            const res = await signup(formData)
            if (res?.error) setError(res.error)
            if (res?.message) setMessage(res.message)
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg"
            >
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold text-black mb-3">
                        {isLogin ? '로그인' : '회원가입'}
                    </h1>
                    <p className="text-gray-500 font-light text-lg">
                        {isLogin ? '글씨인아트센터에 오신 것을 환영합니다.' : '나만의 감성을 기록하는 공간'}
                    </p>
                </div>

                <form action={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors bg-gray-50/50"
                                placeholder="example@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                            <input
                                name="password"
                                type="password"
                                required
                                minLength={6}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors bg-gray-50/50"
                                placeholder="••••••"
                            />
                        </div>

                        {/* Additional Fields for Signup */}
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors bg-gray-50/50"
                                            placeholder="홍길동"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">생년월일</label>
                                        <input
                                            name="birthdate"
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors bg-gray-50/50"
                                            placeholder="YYYYMMDD"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <AnimatePresence>
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6 overflow-hidden"
                            >
                                <div className="pt-4 border-t border-gray-100">
                                    <label className="block text-sm font-medium text-black mb-3">
                                        가입 동기가 무엇인가요?
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {MOTIVATION_OPTIONS.map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setMotivation(opt)}
                                                className={cn(
                                                    "px-4 py-2 rounded-full text-sm transition-all border",
                                                    motivation === opt
                                                        ? "bg-black text-white border-black font-medium"
                                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                                )}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-black mb-3">
                                        어떻게 방문하게 되셨나요?
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {REFERRAL_OPTIONS.map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setReferral(opt)}
                                                className={cn(
                                                    "px-4 py-2 rounded-full text-sm transition-all border",
                                                    referral === opt
                                                        ? "bg-black text-white border-black font-medium"
                                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                                                )}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <div className="p-4 text-sm text-red-500 bg-red-50 rounded-lg">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="p-4 text-sm text-green-600 bg-green-50 rounded-lg">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-200"
                    >
                        {isLoading ? '처리 중...' : (isLogin ? '로그인하기' : '가입 완료하기')}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-500">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin)
                            setError(null)
                            setMessage(null)
                        }}
                        className="underline underline-offset-4 hover:text-black transition-colors"
                    >
                        {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
