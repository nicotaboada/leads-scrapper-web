/**
 * Application routes configuration
 *
 * Centralized route definitions for type-safe navigation across the application.
 * Use these constants instead of hardcoding routes to ensure consistency and
 * make refactoring easier.
 *
 * @example
 * ```tsx
 * import { ROUTES } from 'lib/config/routes'
 *
 * // In components
 * <Link href={ROUTES.CONTACTS}>Contacts</Link>
 *
 * // Dynamic routes
 * router.push(ROUTES.CONTACT_COMPANY_DETAIL('123'))
 *
 * // In middleware or guards
 * if (PUBLIC_ROUTES.includes(pathname)) { ... }
 * ```
 */

/**
 * Main application routes
 */
export const ROUTES = {
	// Public routes
	HOME: '/',
	LOGIN: '/login',

	// Authenticated routes
	DASHBOARD: '/dashboard',

	// Runs module
	RUNS: '/runs',
	RUN_DETAIL: (id: string) => `/runs/${id}`,

	// Contacts module
	CONTACTS: '/contacts',
	CONTACT_PERSON_DETAIL: (id: string) => `/contacts/person/${id}`,
	CONTACT_COMPANY_DETAIL: (id: string) => `/contacts/company/${id}`,

	// Settings and configuration
	SETTINGS: '/settings',
	SETTINGS_TAGS: '/settings/tags',
	SETTINGS_BILLING: '/settings/billing',
} as const

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN] as const

/**
 * Protected route prefixes that require authentication
 * Used in middleware to check if a route needs auth
 */
export const PROTECTED_ROUTE_PREFIXES = [
	ROUTES.DASHBOARD,
	ROUTES.RUNS,
	ROUTES.CONTACTS,
	ROUTES.SETTINGS,
] as const

/**
 * Type helper for route values
 */
export type Route = (typeof ROUTES)[keyof typeof ROUTES]

/**
 * Type helper for public routes
 */
export type PublicRoute = (typeof PUBLIC_ROUTES)[number]

/**
 * Type helper for protected route prefixes
 */
export type ProtectedRoutePrefix = (typeof PROTECTED_ROUTE_PREFIXES)[number]
