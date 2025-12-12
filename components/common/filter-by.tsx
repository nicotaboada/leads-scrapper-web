'use client'

import { PlusCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils/merge'
import { Button } from 'components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import { Separator } from 'components/ui/separator'

/**
 * Props for the FilterBy component
 */
interface FilterByProps {
	/**
	 * The display name of the filter
	 * @example "Correo electrónico", "Tarjeta", "Fecha de creación"
	 */
	label: string

	/**
	 * Whether the filter is currently active/applied
	 */
	isActive: boolean

	/**
	 * The display value when filter is active
	 * @example "es ejemplo@mail.com", "tiene una tarjeta activa"
	 */
	selectedValue?: string | React.ReactNode

	/**
	 * Callback fired when user clicks "Aplicar" button
	 */
	onApply: () => void

	/**
	 * Callback fired when user clicks the X icon to clear the filter
	 */
	onClear: () => void

	/**
	 * The filter UI content (inputs, dropdowns, date pickers, etc.)
	 */
	children: React.ReactNode

	/**
	 * Additional CSS classes for customization
	 */
	className?: string

	/**
	 * Accessible label for screen readers
	 */
	ariaLabel?: string
}

/**
 * FilterBy Component
 *
 * A reusable filter component that provides a consistent UI pattern for filtering
 * table data. The component handles visual states (empty/active) and dropdown
 * interactions, while delegating the actual filter logic to parent components.
 *
 * @example
 * ```tsx
 * <FilterBy
 *   label="Tarjeta"
 *   isActive={hasCardFilter}
 *   selectedValue="tiene una tarjeta activa"
 *   onApply={() => handleApplyFilter()}
 *   onClear={() => handleClearFilter()}
 * >
 *   <Select value={cardFilter} onValueChange={setCardFilter}>
 *     <SelectTrigger>
 *       <SelectValue placeholder="Seleccionar estado" />
 *     </SelectTrigger>
 *     <SelectContent>
 *       <SelectItem value="active">tiene una tarjeta activa</SelectItem>
 *       <SelectItem value="inactive">no tiene tarjeta</SelectItem>
 *     </SelectContent>
 *   </Select>
 * </FilterBy>
 * ```
 */
export function FilterBy({
	label,
	isActive,
	selectedValue,
	onApply,
	onClear,
	children,
	className,
	ariaLabel,
}: FilterByProps) {
	const [isOpen, setIsOpen] = useState(false)

	const handleApply = () => {
		onApply()
		setIsOpen(false)
	}

	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation()
		onClear()
	}

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<span
					className={cn(
						'flex min-w-0 cursor-pointer items-center gap-2 rounded-lg border px-2 py-1 text-sm transition-all duration-200',
						'hover:bg-accent/50 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
						isActive
							? 'bg-background border-solid'
							: 'bg-background/50 border-dashed',
						className
					)}
					aria-label={ariaLabel || `Filtrar por ${label}`}
				>
					{isActive ? (
						<span
							onClick={handleClear}
							onPointerDown={(e) => e.stopPropagation()}
							className="hover:bg-accent flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm transition-colors"
							aria-label={`Eliminar filtro de ${label}`}
							role="button"
							tabIndex={0}
						>
							<XCircle className="size-4" />
						</span>
					) : (
						<PlusCircle className="size-4 shrink-0" />
					)}

					{/* Label */}
					<span>{label}</span>

					{/* Selected Value (only shown when active) */}
					{isActive && selectedValue && (
						<>
							<Separator orientation="vertical" className="!h-[15px]" />
							<span className="text-muted-foreground truncate text-sm font-bold">
								{selectedValue}
							</span>
						</>
					)}
				</span>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				className="w-[280px]"
				align="start"
				onCloseAutoFocus={(e) => e.preventDefault()}
			>
				{/* Header */}
				<div className="border-border mt-4 mb-2 px-2 pb-2">
					<p className="text-muted-foreground text-sm">
						Filtrar por: <span className="font-bold">{label}</span>
					</p>
				</div>

				{/* Filter Content (children) */}
				<div className="px-2 py-2">{children}</div>

				{/* Apply Button */}
				<div className="border-border mt-2 mb-4 px-2 pt-2">
					<Button
						onClick={handleApply}
						className="w-full cursor-pointer"
						size="sm"
						type="button"
					>
						Aplicar
					</Button>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
