/**
 * Stats Bar Component
 *
 * Displays a horizontal bar of statistics as individual colored cards
 */

import type { LucideIcon } from 'lucide-react'

export interface Stat {
	value: number | string
	label: string
	icon?: LucideIcon
	color?: 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'yellow'
}

interface StatsBarProps {
	stats: Stat[]
}

const colorVariants = {
	blue: 'bg-blue-50 text-blue-700',
	green: 'bg-green-50 text-green-700',
	orange: 'bg-orange-50 text-orange-700',
	purple: 'bg-purple-50 text-purple-700',
	pink: 'bg-pink-50 text-pink-700',
	yellow: 'bg-yellow-50 text-yellow-700',
}

const defaultColors: Array<
	'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'yellow'
> = ['blue', 'green', 'orange', 'purple', 'pink', 'yellow']

export function StatsBar({ stats }: StatsBarProps) {
	return (
		<div
			className="grid w-full gap-4"
			style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
		>
			{stats.map((stat, index) => {
				const color = stat.color || defaultColors[index % defaultColors.length]!
				const Icon = stat.icon

				return (
					<div
						key={stat.label}
						className={`flex items-center justify-center rounded-lg p-4 ${colorVariants[color]}`}
					>
						<span className="mr-6 text-3xl font-semibold">{stat.value}</span>
						{Icon && <Icon className="mr-1 h-5 w-5" />}
						<span className="text-sm font-medium">{stat.label}</span>
					</div>
				)
			})}
		</div>
	)
}
