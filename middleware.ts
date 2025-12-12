import { type NextRequest, NextResponse } from 'next/server'
import { PROTECTED_ROUTE_PREFIXES, ROUTES } from './lib/config/routes'
import { createClient } from './lib/supabase/middleware'

/**
 * Next.js Middleware to protect routes that require authentication.
 * This middleware runs on the Edge Runtime before requests reach your pages.
 *
 * Flow:
 * 1. Creates a Supabase client configured for middleware
 * 2. Checks if the user has an active session
 * 3. If accessing protected routes without auth, redirects to login
 * 4. Preserves the original URL to redirect back after login
 * 5. Automatically refreshes expired sessions
 *
 * Protected routes are defined in lib/config/routes.ts (PROTECTED_ROUTE_PREFIXES)
 * Public routes are defined in lib/config/routes.ts (PUBLIC_ROUTES)
 *
 * @param request - The incoming Next.js request
 * @returns NextResponse - Either allows the request or redirects to login
 */
export async function middleware(request: NextRequest) {
	const { supabase, response } = await createClient(request)

	// Refresh session if expired - required for Server Components
	const {
		data: { session },
	} = await supabase.auth.getSession()

	// Check if trying to access protected routes without authentication
	const isProtectedRoute = PROTECTED_ROUTE_PREFIXES.some((route) =>
		request.nextUrl.pathname.startsWith(route)
	)

	if (!session && isProtectedRoute) {
		// Redirect to login with the original URL to return after auth
		const redirectUrl = new URL(ROUTES.LOGIN, request.url)
		redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
		return NextResponse.redirect(redirectUrl)
	}

	// Allow the request to proceed
	return response
}

/**
 * Matcher configuration to specify which routes the middleware should run on.
 *
 * This middleware will run on all routes EXCEPT:
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 * - Images and other static assets (.svg, .png, .jpg, .jpeg, .gif, .webp)
 * - api routes (if you have any)
 * - login page (to avoid redirect loops)
 * - root page (/) - public landing page
 *
 * Note: The regex pattern matches all routes except those listed above.
 * Protected routes are checked against PROTECTED_ROUTE_PREFIXES from lib/config/routes.ts
 */
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - Static assets (svg, png, jpg, jpeg, gif, webp)
		 * - api (API routes)
		 * - login (login page)
		 * - Root path (/)
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api|login|^/$).*)',
	],
}
