'use client'

/**
 * Problem Selector Component
 *
 * List of problems with checkboxes for selection
 */

import { cn } from 'lib/utils/merge'
import { Badge } from 'components/ui/badge'
import { Checkbox } from 'components/ui/checkbox'
import type { ProblemForMessage } from '../../types/ai-message'

interface ProblemSelectorProps {
	problems: ProblemForMessage[]
	selectedIds: string[]
	onSelectionChange: (ids: string[]) => void
	disabled?: boolean
}

export function ProblemSelector({
	problems,
	selectedIds,
	onSelectionChange,
	disabled,
}: ProblemSelectorProps) {
	const selectedCount = selectedIds.length

	function handleToggle(problemId: string) {
		if (disabled) return
		const isSelected = selectedIds.includes(problemId)
		if (isSelected) {
			onSelectionChange(selectedIds.filter((id) => id !== problemId))
		} else {
			onSelectionChange([...selectedIds, problemId])
		}
	}

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
					Problemas a mencionar ({selectedCount} seleccionados)
				</label>
			</div>
			<div className="space-y-3">
				{problems.map((problem) => {
					const isSelected = selectedIds.includes(problem.id)
					return (
						<div
							key={problem.id}
							onClick={() => handleToggle(problem.id)}
							className={cn(
								'flex cursor-pointer gap-4 rounded-xl border p-4 transition-all',
								'hover:shadow-sm',
								disabled && 'cursor-not-allowed opacity-50',
								isSelected
									? 'border-indigo-300 bg-indigo-50/50 ring-1 ring-indigo-200 dark:border-indigo-600 dark:bg-indigo-950/20 dark:ring-indigo-800'
									: 'border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900'
							)}
						>
							<Checkbox
								checked={isSelected}
								disabled={disabled}
								onCheckedChange={() => handleToggle(problem.id)}
								className="mt-0.5"
							/>
							<div className="flex-1 space-y-1">
								<div className="flex items-center gap-2">
									<span className="font-medium text-zinc-900 dark:text-zinc-100">
										{problem.title}
									</span>
									<Badge
										variant="outline"
										className={cn(
											'text-xs font-normal',
											problem.severity === 'critical'
												? 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400'
												: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400'
										)}
									>
										{problem.severity === 'critical' ? 'Crítico' : 'Mejorable'}
									</Badge>
								</div>
								<p className="text-sm text-zinc-500 dark:text-zinc-400">
									{problem.description}
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

