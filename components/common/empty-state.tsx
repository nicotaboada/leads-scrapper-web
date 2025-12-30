'use client'

import { LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from 'lib/utils/merge'

interface EmptyStateProps {
	icon: LucideIcon
	title: string
	description?: string
	className?: string
}

export function EmptyState({
	icon: Icon,
	title,
	description,
	className,
}: EmptyStateProps) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			className={cn(
				'flex flex-col items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/30 py-10 px-6 text-center dark:border-zinc-800 dark:bg-zinc-900/10',
				className
			)}
		>
			<div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
				<Icon className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
			</div>
			<h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
				{title}
			</h3>
			{description && (
				<p className="mt-1 text-xs font-medium text-zinc-500 max-w-[200px]">
					{description}
				</p>
			)}
		</motion.div>
	)
}

