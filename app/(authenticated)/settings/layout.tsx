import { type ReactNode } from 'react'
import { SettingsSidebar } from 'components/layouts/settings-sidebar'

interface SettingsLayoutProps {
	children: ReactNode
}

/**
 * Layout for the Settings section with dual sidebar navigation.
 *
 * This layout wraps all routes inside /settings/* and provides:
 * - Secondary sidebar for settings navigation
 * - Main content area for settings pages
 *
 * The settings sidebar appears alongside the main app sidebar,
 * creating a dual-sidebar layout for the configuration section.
 *
 * @example
 * ```tsx
 * // This layout is automatically applied to:
 * // - /settings
 * // - /settings/tags
 * // - /settings/[future-sections]
 * ```
 */
export default function SettingsLayout({ children }: SettingsLayoutProps) {
	return (
		<div className="flex h-full flex-1">
			<SettingsSidebar />
			<div className="flex flex-1 flex-col overflow-hidden">
				<main className="flex-1 overflow-y-auto bg-background">
					<div className="w-full p-8">{children}</div>
				</main>
			</div>
		</div>
	)
}

