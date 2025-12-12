import 'styles/tailwind.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/common/sonner'
import { ApolloWrapper } from 'lib/apollo/apollo-wrapper'

/**
 * Root layout for the entire application.
 * This layout provides global providers and configurations.
 *
 * Features:
 * - Theme provider for dark/light mode
 * - Apollo GraphQL client wrapper
 * - Toast notifications
 *
 * Note: The sidebar and header are NOT included here.
 * They are only shown in authenticated routes via (authenticated)/layout.tsx
 *
 * Public routes (no sidebar/header):
 * - / (landing page)
 * - /login
 * - /forgot-pass (future)
 *
 * Authenticated routes (with sidebar/header):
 * - Routes inside (authenticated)/ route group
 */
export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<ApolloWrapper>
						{children}
						<Toaster position="top-center" />
					</ApolloWrapper>
				</ThemeProvider>
			</body>
		</html>
	)
}
