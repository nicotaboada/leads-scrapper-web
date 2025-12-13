import { useEffect, useState } from 'react'

/**
 * Custom hook that debounces a value
 *
 * @template T - The type of the value to debounce
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 800ms)
 * @returns The debounced value
 *
 * @example
 * ```tsx
 * const [searchQuery, setSearchQuery] = useState('')
 * const debouncedSearch = useDebounce(searchQuery, 800)
 *
 * useEffect(() => {
 *   // This will only run 800ms after the user stops typing
 *   fetchResults(debouncedSearch)
 * }, [debouncedSearch])
 * ```
 */
export function useDebounce<T>(value: T, delay: number = 800): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		// Set up a timeout to update the debounced value after the delay
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		// Clean up the timeout if value changes before delay completes
		// or if the component unmounts
		return () => {
			clearTimeout(timeoutId)
		}
	}, [value, delay])

	return debouncedValue
}
