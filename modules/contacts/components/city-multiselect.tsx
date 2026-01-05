'use client'

/**
 * City Multiselect Component
 *
 * A multiselect component for cities with search functionality.
 * Similar to TagMultiselect but for cities.
 */

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Skeleton } from 'components/ui/skeleton'
import { cn } from 'lib/utils/merge'
import { useAvailableCities } from '../hooks/use-available-cities'

interface CityMultiselectProps {
	selectedCities: string[]
	onChange: (cities: string[]) => void
	placeholder?: string
	disabled?: boolean
	className?: string
	/**
	 * Whether to auto-open the dropdown on container click/input focus.
	 * Set to false when used inside a filter popover to prevent auto-opening.
	 * @default true
	 */
	autoOpen?: boolean
	/**
	 * Callback to notify parent when dropdown open state changes
	 */
	onOpenChange?: (isOpen: boolean) => void
	/**
	 * Pre-fetched cities to use instead of fetching internally.
	 * When provided, the component won't call useAvailableCities hook.
	 */
	availableCities?: string[]
}

/**
 * Unified multiselect component for cities
 * Shows selected cities + input in a single container with dropdown options
 */
export function CityMultiselect({
	selectedCities,
	onChange,
	placeholder = 'Seleccionar ciudades...',
	disabled = false,
	className,
	autoOpen = true,
	onOpenChange,
	availableCities,
}: CityMultiselectProps) {
	const [isOpen, setIsOpenState] = useState(false)

	// Wrapper to notify parent of open state changes
	const setIsOpen = (open: boolean) => {
		setIsOpenState(open)
		onOpenChange?.(open)
	}
	const [searchQuery, setSearchQuery] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)

	// Use pre-fetched cities if provided, otherwise fetch internally
	const { cities: fetchedCities, loading: fetchLoading } = useAvailableCities()
	const cities = availableCities ?? fetchedCities
	const loading = availableCities ? false : fetchLoading

	// Filter cities by search query
	const filteredCities = useMemo(() => {
		if (!searchQuery.trim()) return cities
		const query = searchQuery.toLowerCase()
		return cities.filter((city) => city.toLowerCase().includes(query))
	}, [cities, searchQuery])

	// Handle city toggle
	const handleToggleCity = useCallback(
		(city: string) => {
			const isSelected = selectedCities.includes(city)
			const newSelectedCities = isSelected
				? selectedCities.filter((c) => c !== city)
				: [...selectedCities, city]
			onChange(newSelectedCities)
			setSearchQuery('')
		},
		[selectedCities, onChange]
	)

	// Handle remove city
	const handleRemoveCity = useCallback(
		(city: string) => {
			const newSelectedCities = selectedCities.filter((c) => c !== city)
			onChange(newSelectedCities)
		},
		[selectedCities, onChange]
	)

	// Handle container click - focus input and optionally open dropdown
	const handleContainerClick = () => {
		if (!disabled) {
			if (autoOpen) {
				setIsOpen(true)
			}
			inputRef.current?.focus()
		}
	}

	// Handle input focus - optionally open dropdown
	const handleInputFocus = () => {
		if (!disabled && autoOpen) {
			setIsOpen(true)
		}
	}

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsOpen(false)
			inputRef.current?.blur()
		}
		if (e.key === 'Backspace' && !searchQuery && selectedCities.length > 0) {
			// Remove last selected city on backspace with empty input
			const lastCity = selectedCities[selectedCities.length - 1]
			if (lastCity) {
				handleRemoveCity(lastCity)
			}
		}
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<div
					onClick={handleContainerClick}
					className={cn(
						'border-input bg-background ring-offset-background flex min-h-10 w-full cursor-text flex-wrap items-center gap-1 rounded-md border px-3 py-2 text-sm',
						'focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2',
						disabled && 'cursor-not-allowed opacity-50',
						className
					)}
				>
					{/* Selected Cities as Chips */}
					{selectedCities.map((city) => (
						<span
							key={city}
							className="bg-secondary text-secondary-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium"
						>
							{city}
							<button
								type="button"
								onClick={(e) => {
									e.stopPropagation()
									handleRemoveCity(city)
								}}
								disabled={disabled}
								className="hover:text-foreground ml-1 rounded-full text-current opacity-70 hover:opacity-100"
							>
								×
							</button>
						</span>
					))}

					{/* Inline Input */}
					<input
						ref={inputRef}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onFocus={handleInputFocus}
						onKeyDown={handleKeyDown}
						placeholder={selectedCities.length === 0 ? placeholder : ''}
						disabled={disabled}
						className={cn(
							'placeholder:text-muted-foreground flex-1 bg-transparent outline-none',
							'min-w-[80px]'
						)}
					/>

					{/* Toggle Icon */}
					<div
						className={cn(
							'text-muted-foreground hover:text-foreground ml-auto shrink-0 cursor-pointer',
							disabled && 'pointer-events-none'
						)}
					>
						{isOpen ? (
							<ChevronUp className="h-4 w-4" />
						) : (
							<ChevronDown className="h-4 w-4" />
						)}
					</div>
				</div>
			</PopoverTrigger>

			<PopoverContent
				className="w-[var(--radix-popover-trigger-width)] min-w-[250px] p-0"
				align="start"
				sideOffset={4}
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				<div className="max-h-[300px] overflow-y-auto py-1">
					{loading ? (
						<div className="space-y-2 p-2">
							{Array.from({ length: 4 }).map((_, i) => (
								<Skeleton key={i} className="h-8 w-full" />
							))}
						</div>
					) : filteredCities.length === 0 ? (
						<div className="text-muted-foreground py-4 text-center text-sm">
							{searchQuery
								? 'No se encontraron ciudades'
								: 'No hay ciudades disponibles'}
						</div>
					) : (
						filteredCities.map((city) => {
							const isSelected = selectedCities.includes(city)
							return (
								<div
									key={city}
									role="option"
									tabIndex={0}
									aria-selected={isSelected}
									onClick={() => !disabled && handleToggleCity(city)}
									onKeyDown={(e) => {
										if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
											e.preventDefault()
											handleToggleCity(city)
										}
									}}
									className={cn(
										'hover:bg-accent flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-sm',
										isSelected && 'bg-accent/50',
										disabled && 'pointer-events-none opacity-50'
									)}
								>
									<div
										className={cn(
											'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
											isSelected
												? 'border-primary bg-primary text-primary-foreground'
												: 'border-input'
										)}
									>
										{isSelected && <Check className="h-3 w-3" />}
									</div>
									<span className="flex-1 text-left">{city}</span>
								</div>
							)
						})
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}
