'use client'

import { type User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { createClient } from 'lib/supabase/client'

/**
 * Hook return type
 */
interface UseCurrentUserReturn {
	/** The current authenticated user, or null if not authenticated */
	user: User | null
	/** Loading state while fetching user data */
	isLoading: boolean
	/** Error message if user fetch failed */
	error: string | null
}

/**
 * Custom hook to get the current authenticated user in Client Components.
 * Automatically subscribes to auth state changes and updates when the user logs in/out.
 *
 * This hook should only be used in Client Components (with 'use client' directive).
 * For Server Components, use the getUser() function from 'lib/supabase/auth' instead.
 *
 * @returns Object containing user, isLoading, and error states
 *
 * @example
 * ```tsx
 * 'use client'
 * import { useCurrentUser } from 'hooks/use-current-user'
 *
 * function MyComponent() {
 *   const { user, isLoading, error } = useCurrentUser()
 *
 *   if (isLoading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error}</div>
 *   if (!user) return <div>Not authenticated</div>
 *
 *   return <div>Hello, {user.email}</div>
 * }
 * ```
 */
export function useCurrentUser(): UseCurrentUserReturn {
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const supabase = createClient()

		// Get initial user
		const getUser = async () => {
			try {
				setIsLoading(true)
				setError(null)

				const {
					data: { user: currentUser },
					error: userError,
				} = await supabase.auth.getUser()

				if (userError) {
					throw userError
				}

				setUser(currentUser)
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Failed to fetch user')
				setUser(null)
			} finally {
				setIsLoading(false)
			}
		}

		getUser()

		// Subscribe to auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null)
			setIsLoading(false)
		})

		// Cleanup subscription on unmount
		return () => {
			subscription.unsubscribe()
		}
	}, [])

	return { user, isLoading, error }
}
