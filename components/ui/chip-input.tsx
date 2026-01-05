/**
 * Chip Input Component
 *
 * A reusable input component that allows users to add and remove chips (tags).
 * Users can type text and press Enter or click Add to create a new chip.
 * Each chip has an X button to remove it.
 */

import { X } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/lib/utils/merge'
import { Button } from './button'
import { Input } from './input'

export interface ChipInputProps {
	/**
	 * Array of chip values
	 */
	value: string[]
	/**
	 * Callback when the chip array changes
	 */
	onChange: (value: string[]) => void
	/**
	 * Placeholder text for the input
	 */
	placeholder?: string
	/**
	 * Whether the input is disabled
	 */
	disabled?: boolean
	/**
	 * Optional label for accessibility
	 */
	label?: string
	/**
	 * Helper text to display below the input
	 */
	helperText?: string
	/**
	 * Whether the input has an error
	 */
	error?: boolean
	/**
	 * Error message to display
	 */
	errorMessage?: string
}

/**
 * ChipInput component
 *
 * Allows users to add multiple text values as chips with add/remove functionality
 */
export function ChipInput({
	value = [],
	onChange,
	placeholder = 'Type and press Enter...',
	disabled = false,
	label,
	helperText,
	error = false,
	errorMessage,
}: ChipInputProps) {
	const [inputValue, setInputValue] = React.useState('')
	const inputRef = React.useRef<HTMLInputElement>(null)

	/**
	 * Validates and adds a new chip
	 * Prevents empty values and duplicates (case-insensitive)
	 */
	const handleAddChip = React.useCallback(() => {
		const trimmedValue = inputValue.trim()

		// Prevent empty or whitespace-only values
		if (!trimmedValue) {
			return
		}

		// Prevent duplicate values (case-insensitive)
		const isDuplicate = value.some(
			(chip) => chip.toLowerCase() === trimmedValue.toLowerCase()
		)

		if (isDuplicate) {
			return
		}

		// Add the new chip
		onChange([...value, trimmedValue])
		setInputValue('')

		// Focus back on input for better UX
		inputRef.current?.focus()
	}, [inputValue, value, onChange])

	/**
	 * Removes a chip by index
	 */
	const handleRemoveChip = React.useCallback(
		(indexToRemove: number) => {
			onChange(value.filter((_, index) => index !== indexToRemove))
		},
		[value, onChange]
	)

	/**
	 * Handles keyboard events
	 * - Enter: Add chip
	 * - Backspace: Remove last chip if input is empty
	 */
	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') {
				e.preventDefault()
				handleAddChip()
			} else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
				// Remove last chip when backspace is pressed on empty input
				handleRemoveChip(value.length - 1)
			}
		},
		[handleAddChip, handleRemoveChip, inputValue, value.length]
	)

	return (
		<div className="w-full space-y-2">
			{label && (
				<label
					className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					htmlFor="chip-input"
				>
					{label}
				</label>
			)}

			<div className="space-y-2">
				{/* Input field */}
				<div className="flex gap-2">
					<Input
						ref={inputRef}
						id="chip-input"
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						disabled={disabled}
						aria-label={label || 'Chip input'}
						aria-invalid={error}
						aria-describedby={
							helperText
								? 'chip-input-helper'
								: errorMessage
									? 'chip-input-error'
									: undefined
						}
						className={cn(
							error && 'border-destructive focus-visible:ring-destructive/20'
						)}
					/>
					<Button
						type="button"
						onClick={handleAddChip}
						disabled={disabled || !inputValue.trim()}
						size="sm"
						variant="outline"
						className="shrink-0"
					>
						Add
					</Button>
				</div>

				{/* Helper text */}
				{helperText && !error && (
					<p id="chip-input-helper" className="text-muted-foreground text-xs">
						{helperText}
					</p>
				)}

				{/* Error message */}
				{error && errorMessage && (
					<p
						id="chip-input-error"
						className="text-destructive text-xs font-medium"
					>
						{errorMessage}
					</p>
				)}

				{/* Chips container */}
				{value.length > 0 && (
					<div
						className="flex flex-wrap gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-2"
						role="list"
						aria-label="Selected chips"
					>
						{value.map((chip, index) => (
							<div
								key={`${chip}-${index}`}
								className="bg-primary text-primary-foreground inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-sm font-medium transition-colors"
								role="listitem"
							>
								<span>{chip}</span>
								<button
									type="button"
									onClick={() => handleRemoveChip(index)}
									disabled={disabled}
									className="hover:bg-primary/80 -mr-1 ml-1 rounded-sm p-0.5 transition-colors focus:ring-2 focus:ring-white/50 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
									aria-label={`Remove ${chip}`}
								>
									<X className="h-3 w-3" />
								</button>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
