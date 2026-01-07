import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Create a minimal Supabase client used for auth state
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        request.cookies.set(name, value)
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname;

    // 1. Admin Routes Protection (/admin)
    if (path.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        const { data: profile } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single()

        if (!profile?.is_admin) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // 2. Student-Only Routes (Example placeholder, future use)
    // if (path.startsWith('/student')) { ... }

    // 3. Member Routes Protection (/board)
    // Board is accessible to 'user', 'student', 'admin' (Authenticated users)
    if (path.startsWith('/board')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // 4. Guest Routes (Public)
    // Home, Gallery, About, Class are public. No logic needed.

    // 5. Auth Logic (Skip login if already logged in)
    if (path.startsWith('/login')) {
        if (user) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return response
}
