'use client'

import { ChevronDownIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { HeaderCheckboxState } from '../types/bulk-actions'

interface SelectionDropdownProps {
	headerState: HeaderCheckboxState
	pageCount: number
	totalCount: number
	selectedCount: number
	onSelectNone: () => void
	onSelectPage: () => void
	onSelectAll: () => void
}

/**
 * Dropdown menu for bulk selection options in table header
 */
export function SelectionDropdown({
	headerState,
	pageCount,
	totalCount,
	selectedCount,
	onSelectNone,
	onSelectPage,
	onSelectAll,
}: SelectionDropdownProps) {
	const getCheckboxCheckedState = (): boolean | 'indeterminate' => {
		if (headerState === 'checked') return true
		if (headerState === 'indeterminate') return 'indeterminate'
		return false
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-1 rounded p-1 hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					aria-label="Selection options"
				>
					<Checkbox
						checked={getCheckboxCheckedState()}
						onCheckedChange={() => {
							// Handled by dropdown items
						}}
						className="pointer-events-none"
					/>
					<ChevronDownIcon className="size-3 text-muted-foreground" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-[160px]">
				<DropdownMenuItem onClick={onSelectNone}>
					Deseleccionar todo ({selectedCount})
				</DropdownMenuItem>
				<DropdownMenuItem onClick={onSelectPage}>
					Seleccionar página ({pageCount})
				</DropdownMenuItem>
				<DropdownMenuItem onClick={onSelectAll}>
					Seleccionar todos ({totalCount})
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

