'use client'

/**
 * Score Circle Component
 *
 * Displays a circular progress indicator with score value using Recharts
 */

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface ScoreCircleProps {
	score: number
	label: string
	size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
	sm: { container: 100, innerRadius: 32, outerRadius: 42, fontSize: 'text-lg' },
	md: { container: 140, innerRadius: 45, outerRadius: 58, fontSize: 'text-2xl' },
	lg: { container: 180, innerRadius: 60, outerRadius: 76, fontSize: 'text-3xl' },
}

// Monochrome color scheme
const FILL_COLOR = '#27272a' // zinc-800
const TRACK_COLOR = '#e4e4e7' // zinc-200

export function ScoreCircle({ score, label, size = 'md' }: ScoreCircleProps) {
	const dimensions = SIZES[size]

	const data = [
		{ name: 'score', value: score },
		{ name: 'remaining', value: 100 - score },
	]

	return (
		<div className="flex flex-col items-center gap-2">
			<div
				className="relative"
				style={{ width: dimensions.container, height: dimensions.container }}
			>
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							innerRadius={dimensions.innerRadius}
							outerRadius={dimensions.outerRadius}
							startAngle={90}
							endAngle={-270}
							paddingAngle={0}
							dataKey="value"
							stroke="none"
						>
							<Cell fill={FILL_COLOR} />
							<Cell fill={TRACK_COLOR} />
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className={`font-bold text-zinc-800 dark:text-zinc-200 ${dimensions.fontSize}`}>
						{score}
					</span>
				</div>
			</div>
			<span className="text-muted-foreground text-sm font-medium">{label}</span>
		</div>
	)
}

