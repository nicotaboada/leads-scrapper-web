'use client'

/**
 * Company Search Select Component
 *
 * A searchable dropdown for selecting an existing company
 * or creating a new one inline.
 */

import { Building2, Check, Loader2, Plus, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback } from 'components/ui/avatar'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { cn } from 'lib/utils/merge'
import { useSearchCompanies } from '../hooks/use-search-companies'
import type { CompanyContact } from '../types'

interface CompanySearchSelectProps {
	value?: string // companyId if selected
	selectedCompanyName?: string
	isCreatingNew: boolean
	newCompanyName?: string
	onSelectCompany: (companyId: string, companyName: string) => void
	onCreateNew: (companyName: string) => void
	onClear: () => void
	disabled?: boolean
	hideCreateOption?: boolean
}

export function CompanySearchSelect({
	value,
	selectedCompanyName,
	isCreatingNew,
	newCompanyName,
	onSelectCompany,
	onCreateNew,
	onClear,
	disabled = false,
	hideCreateOption = false,
}: CompanySearchSelectProps) {
	const [searchText, setSearchText] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const { companies, loading } = useSearchCompanies({
		search: searchText,
		enabled: isOpen,
	})

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// Check if search text matches any company exactly
	const hasExactMatch = companies.some(
		(c) => c.companyName.toLowerCase() === searchText.toLowerCase()
	)

	function handleSelectCompany(company: CompanyContact) {
		onSelectCompany(company.id, company.companyName)
		setSearchText('')
		setIsOpen(false)
	}

	function handleCreateNew() {
		if (searchText.trim()) {
			onCreateNew(searchText.trim())
			setSearchText('')
			setIsOpen(false)
		}
	}

	function handleClear() {
		onClear()
		setSearchText('')
	}

	// If a company is selected or creating new, show the selected state
	if (value || isCreatingNew) {
		const displayName = isCreatingNew ? newCompanyName : selectedCompanyName

		return (
			<div className="flex items-center gap-2 rounded-md border px-3 py-2">
				<Avatar className="h-6 w-6">
					<AvatarFallback className="bg-blue-100 text-xs text-blue-700">
						<Building2 className="h-3 w-3" />
					</AvatarFallback>
				</Avatar>
				<span className="flex-1 truncate text-sm">
					{displayName}
					{isCreatingNew && (
						<span className="text-muted-foreground ml-1">(nueva)</span>
					)}
				</span>
				<Button
					type="button"
					variant="ghost"
					size="sm"
					className="h-6 w-6 p-0"
					onClick={handleClear}
					disabled={disabled}
				>
					<X className="h-4 w-4" />
				</Button>
			</div>
		)
	}

	return (
		<div ref={containerRef} className="relative">
			<Input
				placeholder="Buscar empresa..."
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
				onFocus={() => setIsOpen(true)}
				disabled={disabled}
			/>

			{isOpen && (
				<div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg">
					{loading && (
						<div className="flex items-center justify-center py-4">
							<Loader2 className="text-muted-foreground h-5 w-5 animate-spin" />
						</div>
					)}

					{!loading && companies.length === 0 && !searchText && (
						<div className="text-muted-foreground py-4 text-center text-sm">
							Escribe para buscar empresas
						</div>
					)}

					{!loading && (
						<>
							{companies.map((company) => (
								<button
									key={company.id}
									type="button"
									className={cn(
										'flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-gray-100',
										value === company.id && 'bg-gray-100'
									)}
									onClick={() => handleSelectCompany(company)}
								>
									<Avatar className="h-8 w-8">
										<AvatarFallback className="bg-blue-100 text-blue-700">
											<Building2 className="h-4 w-4" />
										</AvatarFallback>
									</Avatar>
									<span className="flex-1 truncate text-sm">
										{company.companyName}
									</span>
									{value === company.id && (
										<Check className="h-4 w-4 text-blue-600" />
									)}
								</button>
							))}

							{/* Create new option */}
							{searchText.trim() && !hasExactMatch && !hideCreateOption && (
								<button
									type="button"
									className="flex w-full items-center gap-3 border-t px-3 py-2 text-left text-blue-600 hover:bg-blue-50"
									onClick={handleCreateNew}
								>
									<Plus className="h-5 w-5" />
									<span className="text-sm">
										Crear nueva empresa &quot;{searchText.trim()}&quot;
									</span>
								</button>
							)}
						</>
					)}
				</div>
			)}
		</div>
	)
}
