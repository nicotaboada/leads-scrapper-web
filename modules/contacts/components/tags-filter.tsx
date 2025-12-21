'use client'

/**
 * Tags Filter Component
 *
 * Filter component for filtering contacts by tags
 */

import { Tag, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from 'components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from 'components/ui/popover'
import { TagMultiselect } from 'modules/tags/components/tag-multiselect'

interface TagsFilterProps {
	value: string[]
	onApply: (tagIds: string[]) => void
}

export function TagsFilter({ value, onApply }: TagsFilterProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedTags, setSelectedTags] = useState<string[]>(value)

	const hasFilters = value.length > 0

	function handleApply() {
		onApply(selectedTags)
		setIsOpen(false)
	}

	function handleClear() {
		setSelectedTags([])
		onApply([])
		setIsOpen(false)
	}

	function handleOpenChange(open: boolean) {
		setIsOpen(open)
		if (open) {
			setSelectedTags(value)
		}
	}

	return (
		<Popover open={isOpen} onOpenChange={handleOpenChange}>
			<PopoverTrigger asChild>
				<Button
					variant={hasFilters ? 'secondary' : 'outline'}
					size="sm"
					className="h-9 gap-2"
				>
					<Tag className="h-4 w-4" />
					<span>Tags</span>
					{hasFilters && (
						<span className="bg-primary text-primary-foreground ml-1 rounded-full px-1.5 py-0.5 text-xs font-medium">
							{value.length}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80 p-4" align="start">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h4 className="text-sm font-medium">Filtrar por tags</h4>
						{hasFilters && (
							<Button
								variant="ghost"
								size="sm"
								className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
								onClick={handleClear}
							>
								<X className="mr-1 h-3 w-3" />
								Limpiar
							</Button>
						)}
					</div>
					<TagMultiselect
						selectedTagIds={selectedTags}
						onChange={setSelectedTags}
						placeholder="Seleccionar tags..."
					/>
					<div className="flex justify-end gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsOpen(false)}
						>
							Cancelar
						</Button>
						<Button size="sm" onClick={handleApply}>
							Aplicar
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

