'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { loginAction } from 'app/login/actions'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from 'components/ui/card'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'

/**
 * Login form component that handles user authentication.
 * This is a client component that uses Shadcn UI components and
 * integrates with the loginAction Server Action.
 *
 * Features:
 * - Email and password inputs with labels
 * - Loading state during authentication
 * - Error handling with toast notifications
 * - Responsive design with dark mode support
 * - Accessible form fields
 *
 * @returns The login form component
 *
 * @example
 * ```tsx
 * import { LoginForm } from 'modules/auth/components/login-form'
 *
 * export default function LoginPage() {
 *   return <LoginForm />
 * }
 * ```
 */
export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)

	/**
	 * Handles form submission
	 * Calls the loginAction Server Action and shows appropriate feedback
	 */
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setIsLoading(true)

		try {
			const formData = new FormData(event.currentTarget)
			const result = await loginAction(formData)

			// If there's an error, show toast
			if (result?.error) {
				toast.error(result.error)
				setIsLoading(false)
				return
			}

			// Success case - loginAction will redirect to /dashboard
			// This code won't execute due to redirect, but we keep it for clarity
			toast.success('Login successful!')
		} catch {
			// Catch any unexpected errors
			toast.error('An unexpected error occurred')
			setIsLoading(false)
		}
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email and password to access your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email Field */}
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							required
							disabled={isLoading}
							autoComplete="email"
						/>
					</div>

					{/* Password Field */}
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="••••••••"
							required
							disabled={isLoading}
							autoComplete="current-password"
						/>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isLoading}
						className="inline-flex h-full min-h-12 w-full items-center justify-center rounded-xl border border-blue-400 bg-blue-400 px-6 py-2.5 text-center text-lg text-white transition-colors delay-50 hover:enabled:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ? 'Logging in...' : 'Login'}
					</button>
				</form>
			</CardContent>
		</Card>
	)
}
