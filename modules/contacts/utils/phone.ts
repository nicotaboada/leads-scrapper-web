/**
 * Phone Utility Functions
 *
 * Utilities for formatting and handling phone numbers,
 * particularly for WhatsApp integration.
 */

/**
 * Cleans a phone number for WhatsApp links by removing all non-digit characters.
 * Keeps the leading + sign if present (converted to country code).
 *
 * @param phone - The phone number string to clean
 * @returns A cleaned phone number with only digits
 *
 * @example
 * cleanPhoneForWhatsApp('+54 11 1234-5678') // '5411123456789'
 * cleanPhoneForWhatsApp('(011) 1234-5678') // '01112345678'
 * cleanPhoneForWhatsApp('11-1234-5678') // '1112345678'
 */
export function cleanPhoneForWhatsApp(phone: string): string {
	if (!phone) {
		return ''
	}
	// Remove the + sign and all non-digit characters
	return phone.replace(/\D/g, '')
}

/**
 * Builds a WhatsApp URL from a phone number.
 * Uses the wa.me format for universal compatibility.
 *
 * @param phone - The phone number to create a WhatsApp link for
 * @returns A complete WhatsApp URL (https://wa.me/{number})
 *
 * @example
 * buildWhatsAppUrl('+54 11 1234-5678') // 'https://wa.me/5411123456789'
 */
export function buildWhatsAppUrl(phone: string): string {
	const cleanedPhone = cleanPhoneForWhatsApp(phone)
	return `https://wa.me/${cleanedPhone}`
}

/**
 * Checks if a phone number is valid for WhatsApp (has at least some digits).
 *
 * @param phone - The phone number to validate
 * @returns True if the phone number has digits, false otherwise
 */
export function isValidPhoneForWhatsApp(
	phone: string | undefined | null
): boolean {
	if (!phone) {
		return false
	}
	const cleaned = cleanPhoneForWhatsApp(phone)
	return cleaned.length >= 8 // Minimum reasonable phone length
}
