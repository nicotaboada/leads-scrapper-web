import { type Metadata } from 'next'
import Link from 'next/link'
import { ROUTES } from '@/lib/config/routes'
import { LoginForm } from 'modules/auth/components/login-form'

export const metadata: Metadata = {
	title: 'Login - Next.js Enterprise',
	description: 'Sign in to your account',
}

/**
 * Login page component.
 * This page renders the LoginForm component and provides a link back to home.
 * It's a Server Component that imports the Client Component LoginForm.
 *
 * @returns The login page
 */
export default function LoginPage() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
			<div className="flex w-full max-w-md flex-col gap-4">
				<LoginForm />

				<div className="text-center">
					<Link
						href={ROUTES.HOME}
						className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
					>
						← Back to home
					</Link>
				</div>
			</div>
		</main>
	)
}
