'use client'

import { LogOut, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { logoutAction } from 'app/login/actions'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Separator } from 'components/ui/separator'
import { useCurrentUser } from 'hooks/use-current-user'

/**
 * Extracts the first two letters from an email address to use as avatar initials.
 *
 * @param email - The user's email address
 * @returns Two uppercase letters from the email (before the @ symbol)
 *
 * @example
 * ```ts
 * getInitialsFromEmail('john.doe@example.com') // Returns 'JO'
 * getInitialsFromEmail('a@test.com') // Returns 'A'
 * ```
 */
function getInitialsFromEmail(email: string): string {
	const username = email.split('@')[0] || ''
	return username.slice(0, 2).toUpperCase()
}

/**
 * User avatar menu component that displays in the application header.
 * Shows the logged-in user's avatar with their initials and provides a popover menu
 * with user information, theme selection, and logout functionality.
 *
 * Features:
 * - Avatar with user initials (first two letters of email)
 * - User information display (full name and email)
 * - Theme switcher (Light, Dark, System)
 * - Logout button
 *
 * @example
 * ```tsx
 * import { UserAvatarMenu } from 'modules/auth/components/user-avatar-menu'
 *
 * export function AppHeader() {
 *   return (
 *     <header>
 *       <div className="ml-auto">
 *         <UserAvatarMenu />
 *       </div>
 *     </header>
 *   )
 * }
 * ```
 */
export function UserAvatarMenu() {
	const { user, isLoading } = useCurrentUser()
	const { theme, setTheme } = useTheme()

	if (isLoading || !user) {
		return null
	}

	const initials = getInitialsFromEmail(user.email || '')
	// TODO: Replace hardcoded name with actual user data from database
	const fullName = 'Nicolas Taboada'

	const handleLogout = async () => {
		await logoutAction()
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					className="ring-offset-background focus-visible:ring-ring cursor-pointer transition-opacity outline-none hover:opacity-80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
					aria-label="Open user menu"
				>
					<Avatar className="size-9">
						<AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
							{initials}
						</AvatarFallback>
					</Avatar>
				</button>
			</PopoverTrigger>

			<PopoverContent className="w-64" align="end" sideOffset={8}>
				{/* Section 1: User Information */}
				<div className="flex flex-col space-y-1">
					<p className="text-sm leading-none font-medium">{fullName}</p>
					<p className="text-muted-foreground text-xs leading-none">
						{user.email}
					</p>
				</div>

				<Separator className="my-3" />

				{/* Section 2: Theme Selector */}
				<div className="space-y-1">
					<p className="text-muted-foreground mb-2 text-xs font-medium">
						Theme
					</p>

					<button
						onClick={() => setTheme('light')}
						className={`hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors ${
							theme === 'light' ? 'bg-accent text-accent-foreground' : ''
						}`}
					>
						<Sun className="size-4" />
						<span>Light</span>
					</button>

					<button
						onClick={() => setTheme('dark')}
						className={`hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors ${
							theme === 'dark' ? 'bg-accent text-accent-foreground' : ''
						}`}
					>
						<Moon className="size-4" />
						<span>Dark</span>
					</button>

					<button
						onClick={() => setTheme('system')}
						className={`hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors ${
							theme === 'system' ? 'bg-accent text-accent-foreground' : ''
						}`}
					>
						<Monitor className="size-4" />
						<span>System</span>
					</button>
				</div>

				<Separator className="my-3" />

				{/* Section 3: Logout */}
				<button
					onClick={handleLogout}
					className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors"
				>
					<LogOut className="size-4" />
					<span>Log out</span>
				</button>
			</PopoverContent>
		</Popover>
	)
}
