import { redirect } from 'next/navigation'
import { ROUTES } from 'lib/config/routes'

/**
 * Settings index page.
 *
 * This page automatically redirects to the first settings section (Tags).
 * As more settings sections are added, this redirect can be updated
 * or replaced with a settings overview page.
 *
 * @route /settings -> redirects to /settings/tags
 */
export default function SettingsPage() {
	redirect(ROUTES.SETTINGS_TAGS)
}
