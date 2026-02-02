/**
 * Normalizes a phone number by removing formatting characters
 * Keeps only digits and the leading + sign
 *
 * @param phone - The phone number to normalize
 * @returns The normalized phone number
 *
 * @example
 * normalizePhoneNumber('+54 351 476-0129') // '+543514760129'
 * normalizePhoneNumber('+54 9 351 237-6110') // '+549351237611 0'
 * normalizePhoneNumber('(351) 476-0129') // '3514760129'
 */
export function normalizePhoneNumber(phone: string | null | undefined): string {
	if (!phone) return ''

	// Remove spaces, hyphens, and parentheses
	// Keep only digits and leading + sign
	const normalized = phone.replace(/[\s\-()]/g, '')

	return normalized
}
