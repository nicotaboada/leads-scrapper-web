'use client'

import { BillingPage } from 'modules/billing/components/billing-page'

/**
 * Billing & Usage settings page.
 *
 * Displays usage information and costs for all external services:
 * - Apify
 * - OpenAI
 * - SerpAPI
 * - ScreenshotOne
 *
 * @route /settings/billing
 */
export default function SettingsBillingPage() {
	return <BillingPage />
}
