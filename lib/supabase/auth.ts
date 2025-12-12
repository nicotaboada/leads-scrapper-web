import { createClient } from './server'

/**
 * Gets the current authenticated user from Supabase.
 * This function should be used in Server Components and Server Actions.
 *
 * @returns The current user or null if not authenticated
 *
 * @example
 * ```tsx
 * // Server Component
 * import { getUser } from 'lib/supabase/auth'
 *
 * export default async function Dashboard() {
 *   const user = await getUser()
 *
 *   if (!user) {
 *     redirect('/login')
 *   }
 *
 *   return <div>Welcome, {user.email}</div>
 * }
 * ```
 */
export async function getUser() {
	const supabase = await createClient()
	const {
		data: { user },
	} = await supabase.auth.getUser()
	return user
}

/**
 * Gets the current session from Supabase.
 * This function should be used in Server Components and Server Actions.
 *
 * @returns The current session or null if not authenticated
 *
 * @example
 * ```tsx
 * // Server Component
 * import { getSession } from 'lib/supabase/auth'
 *
 * export default async function Profile() {
 *   const session = await getSession()
 *
 *   if (!session) {
 *     redirect('/login')
 *   }
 *
 *   return <div>Access Token: {session.access_token}</div>
 * }
 * ```
 */
export async function getSession() {
	const supabase = await createClient()
	const {
		data: { session },
	} = await supabase.auth.getSession()
	return session
}
