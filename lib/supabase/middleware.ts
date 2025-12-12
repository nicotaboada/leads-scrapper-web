import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'
import { env } from '../../env.mjs'

/**
 * Creates a Supabase client for use in Next.js Middleware.
 * This client handles cookie management and session refresh in middleware.
 *
 * Use this client when:
 * - Protecting routes (checking authentication)
 * - Refreshing sessions before they expire
 * - Redirecting users based on auth state
 *
 * @param request - The Next.js request object
 * @returns Object containing the Supabase client and the response
 *
 * @example
 * ```ts
 * // middleware.ts
 * import { createClient } from 'lib/supabase/middleware'
 *
 * export async function middleware(request: NextRequest) {
 *   const { supabase, response } = await createClient(request)
 *   const { data: { session } } = await supabase.auth.getSession()
 *
 *   if (!session) {
 *     return NextResponse.redirect('/login')
 *   }
 *
 *   return response
 * }
 * ```
 */
export async function createClient(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	const supabase = createServerClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll()
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value)
					)
					response = NextResponse.next({
						request,
					})
					cookiesToSet.forEach(({ name, value, options }) =>
						response.cookies.set(name, value, options)
					)
				},
			},
		}
	)

	return { supabase, response }
}
