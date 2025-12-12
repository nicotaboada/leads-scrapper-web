import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env } from '../../env.mjs'

/**
 * Creates a Supabase client for use in Server Components and Server Actions.
 * This client handles cookie management for server-side authentication.
 *
 * Use this client when:
 * - Working with Server Components (default in App Router)
 * - Using Server Actions ('use server')
 * - Fetching data on the server (SSR)
 * - Verifying authentication server-side
 *
 * @returns Supabase client instance for server-side usage
 *
 * @example
 * ```tsx
 * // Server Component
 * import { createClient } from 'lib/supabase/server'
 *
 * export default async function Dashboard() {
 *   const supabase = await createClient()
 *   const { data } = await supabase.from('users').select()
 *   return <div>{data}</div>
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Server Action
 * 'use server'
 * import { createClient } from 'lib/supabase/server'
 *
 * export async function loginAction(formData: FormData) {
 *   const supabase = await createClient()
 *   const { error } = await supabase.auth.signInWithPassword(...)
 * }
 * ```
 */
export async function createClient() {
	const cookieStore = await cookies()

	return createServerClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll()
				},
				setAll(cookiesToSet) {
					try {
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options)
						)
					} catch {
						// The `setAll` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		}
	)
}
