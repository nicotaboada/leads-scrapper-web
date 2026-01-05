'use client'

import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover'
import { Skeleton } from 'components/ui/skeleton'
import { cn } from 'lib/utils/merge'
import { TagChip } from './tag-chip'
import { useAllTags } from '../hooks/use-all-tags'
import { TAG_COLOR_CONFIG, type TagColor } from '../types'

interface TagMultiselectProps {
	selectedTagIds: string[]
	onChange: (tagIds: string[]) => void
	onSave?: (tagIds: string[]) => Promise<void>
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
	 * Pre-fetched tags to use instead of fetching internally.
	 * When provided, the component won't call useAllTags hook.
	 */
	availableTags?: Array<{ id: string; name: string; color?: string | null }>
}

/**
 * Unified multiselect component for tags
 * Shows chips + input in a single container with dropdown options
 */
export function TagMultiselect({
	selectedTagIds,
	onChange,
	onSave,
	placeholder = 'Agregar tags...',
	disabled = false,
	className,
	autoOpen = true,
	availableTags,
}: TagMultiselectProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [isSaving, setIsSaving] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	// Only fetch tags if not provided externally - avoids unnecessary queries
	const shouldFetch = !availableTags
	const { tags: fetchedTags, loading: fetchLoading } = useAllTags({
		skip: !shouldFetch,
	})
	const tags = availableTags ?? fetchedTags
	const loading = shouldFetch && fetchLoading

	// Filter tags by search query
	const filteredTags = useMemo(() => {
		if (!searchQuery.trim()) return tags
		const query = searchQuery.toLowerCase()
		return tags.filter((tag) => tag.name.toLowerCase().includes(query))
	}, [tags, searchQuery])

	// Get selected tag objects
	const selectedTags = useMemo(() => {
		return tags.filter((tag) => selectedTagIds.includes(tag.id))
	}, [tags, selectedTagIds])

	// Handle tag toggle
	const handleToggleTag = useCallback(
		async (tagId: string) => {
			const isSelected = selectedTagIds.includes(tagId)
			const newSelectedIds = isSelected
				? selectedTagIds.filter((id) => id !== tagId)
				: [...selectedTagIds, tagId]

			onChange(newSelectedIds)
			setSearchQuery('')

			if (onSave) {
				setIsSaving(true)
				try {
					await onSave(newSelectedIds)
				} catch (error) {
					console.error('Error saving tags:', error)
				} finally {
					setIsSaving(false)
				}
			}
		},
		[selectedTagIds, onChange, onSave]
	)

	// Handle remove tag from chip
	const handleRemoveTag = useCallback(
		async (tagId: string) => {
			const newSelectedIds = selectedTagIds.filter((id) => id !== tagId)
			onChange(newSelectedIds)

			if (onSave) {
				setIsSaving(true)
				try {
					await onSave(newSelectedIds)
				} catch (error) {
					console.error('Error saving tags:', error)
				} finally {
					setIsSaving(false)
				}
			}
		},
		[selectedTagIds, onChange, onSave]
	)

	// Handle container click - focus input and optionally open dropdown
	const handleContainerClick = () => {
		if (!disabled && !isSaving) {
			if (autoOpen) {
				setIsOpen(true)
			}
			inputRef.current?.focus()
		}
	}

	// Handle input focus - optionally open dropdown
	const handleInputFocus = () => {
		if (!disabled && !isSaving && autoOpen) {
			setIsOpen(true)
		}
	}

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsOpen(false)
			inputRef.current?.blur()
		}
		if (e.key === 'Backspace' && !searchQuery && selectedTags.length > 0) {
			// Remove last selected tag on backspace with empty input
			const lastTag = selectedTags[selectedTags.length - 1]
			if (lastTag) {
				handleRemoveTag(lastTag.id)
			}
		}
	}

	const isDisabled = disabled || isSaving

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<div
					onClick={handleContainerClick}
					className={cn(
						'border-input bg-background ring-offset-background flex min-h-10 w-full cursor-text flex-wrap items-center gap-1 rounded-md border px-3 py-2 text-sm',
						'focus-within:ring-ring focus-within:ring-2 focus-within:ring-offset-2',
						isDisabled && 'cursor-not-allowed opacity-50',
						className
					)}
				>
					{/* Selected Tags as Chips */}
					{selectedTags.map((tag) => (
						<TagChip
							key={tag.id}
							tag={tag}
							onRemove={handleRemoveTag}
							disabled={isDisabled}
							variant="neutral"
						/>
					))}

					{/* Inline Input */}
					<input
						ref={inputRef}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onFocus={handleInputFocus}
						onKeyDown={handleKeyDown}
						placeholder={selectedTags.length === 0 ? placeholder : ''}
						disabled={isDisabled}
						className={cn(
							'placeholder:text-muted-foreground flex-1 bg-transparent outline-none',
							'min-w-[80px]'
						)}
					/>

					{/* Toggle Icon */}
					<div
						className={cn(
							'text-muted-foreground hover:text-foreground ml-auto shrink-0 cursor-pointer',
							isDisabled && 'pointer-events-none'
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
				<div className="max-h-[180px] overflow-y-auto py-1">
					{loading ? (
						<div className="space-y-2 p-2">
							{Array.from({ length: 4 }).map((_, i) => (
								<Skeleton key={i} className="h-8 w-full" />
							))}
						</div>
					) : filteredTags.length === 0 ? (
						<div className="text-muted-foreground py-4 text-center text-sm">
							{searchQuery
								? 'No se encontraron tags'
								: 'No hay tags disponibles'}
						</div>
					) : (
						filteredTags.map((tag) => {
							const isSelected = selectedTagIds.includes(tag.id)
							const colorConfig = tag.color
								? TAG_COLOR_CONFIG[tag.color as TagColor]
								: null

							return (
								<div
									key={tag.id}
									role="option"
									tabIndex={0}
									aria-selected={isSelected}
									onClick={() => !isDisabled && handleToggleTag(tag.id)}
									onKeyDown={(e) => {
										if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
											e.preventDefault()
											handleToggleTag(tag.id)
										}
									}}
									className={cn(
										'hover:bg-accent flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-sm',
										isSelected && 'bg-accent/50',
										isDisabled && 'pointer-events-none opacity-50'
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
									<span className="flex-1 text-left">{tag.name}</span>
									{colorConfig && (
										<span
											className="h-4 w-4 shrink-0 rounded"
											style={{ backgroundColor: colorConfig.hex }}
										/>
									)}
								</div>
							)
						})
					)}
				</div>
			</PopoverContent>
		</Popover>
	)
}
