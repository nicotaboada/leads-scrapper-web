'use client'

/**
 * Problem Selector Component
 *
 * List of problems with checkboxes for selection
 */

import { Badge } from 'components/ui/badge'
import { Checkbox } from 'components/ui/checkbox'
import { cn } from 'lib/utils/merge'
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
								'hover:shadow-md',
								disabled && 'cursor-not-allowed opacity-50',
								isSelected
									? 'border-zinc-900 bg-zinc-50/50 ring-1 ring-zinc-900 dark:border-zinc-100 dark:bg-zinc-900/20 dark:ring-zinc-100'
									: 'border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950'
							)}
						>
							<Checkbox
								checked={isSelected}
								disabled={disabled}
								onCheckedChange={() => handleToggle(problem.id)}
								className="mt-0.5 border-zinc-300 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50 dark:border-zinc-700 dark:data-[state=checked]:bg-zinc-100 dark:data-[state=checked]:text-zinc-900"
							/>
							<div className="flex-1 space-y-1">
								<div className="flex items-center gap-2">
									<span className="font-bold text-zinc-900 dark:text-zinc-100">
										{problem.title}
									</span>
									<Badge
										variant={
											problem.severity === 'critical' ? 'default' : 'outline'
										}
										className={cn(
											'px-1.5 py-0 text-[10px] font-bold uppercase',
											problem.severity === 'critical'
												? 'border-transparent bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900'
												: 'border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400'
										)}
									>
										{problem.severity === 'critical' ? 'Crítico' : 'Mejorable'}
									</Badge>
								</div>
								<p className="text-xs leading-relaxed font-medium text-zinc-500 dark:text-zinc-400">
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
