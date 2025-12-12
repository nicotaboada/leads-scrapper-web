import { createBrowserClient } from '@supabase/ssr'
import { env } from '../../env.mjs'

/**
 * Creates a Supabase client for use in Client Components.
 * This client is configured to work in the browser environment.
 *
 * Use this client when:
 * - Working with Client Components ('use client')
 * - Handling user interactions (onClick, onChange, etc.)
 * - Using React hooks (useState, useEffect, etc.)
 *
 * @returns Supabase client instance for client-side usage
 *
 * @example
 * ```tsx
 * 'use client'
 * import { createClient } from 'lib/supabase/client'
 *
 * export function LoginForm() {
 *   const supabase = createClient()
 *
 *   const handleLogin = async () => {
 *     const { error } = await supabase.auth.signInWithPassword({
 *       email, password
 *     })
 *   }
 * }
 * ```
 */
export function createClient() {
	return createBrowserClient(
		env.NEXT_PUBLIC_SUPABASE_URL,
		env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	)
}
