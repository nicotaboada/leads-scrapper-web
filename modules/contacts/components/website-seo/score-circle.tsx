'use client'

/**
 * Score Circle Component
 *
 * Displays a circular progress indicator with score value using Recharts
 */

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

interface ScoreCircleProps {
	score: number
	label: string
	size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
	sm: { container: 100, innerRadius: 32, outerRadius: 42, fontSize: 'text-lg' },
	md: {
		container: 140,
		innerRadius: 45,
		outerRadius: 58,
		fontSize: 'text-2xl',
	},
	lg: {
		container: 180,
		innerRadius: 60,
		outerRadius: 76,
		fontSize: 'text-3xl',
	},
}

// Monochrome color scheme
const FILL_COLOR = '#18181b' // zinc-900
const TRACK_COLOR = '#f4f4f5' // zinc-100

export function ScoreCircle({ score, label, size = 'md' }: ScoreCircleProps) {
	const dimensions = SIZES[size]

	const data = [
		{ name: 'score', value: score },
		{ name: 'remaining', value: 100 - score },
	]

	return (
		<div className="flex flex-col items-center gap-3">
			<div
				className="relative drop-shadow-sm"
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
							<Cell fill={FILL_COLOR} className="dark:fill-zinc-100" />
							<Cell fill={TRACK_COLOR} className="dark:fill-zinc-800" />
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				<div className="absolute inset-0 flex items-center justify-center">
					<span
						className={`font-black tracking-tighter text-zinc-900 dark:text-zinc-100 ${dimensions.fontSize}`}
					>
						{score}
					</span>
				</div>
			</div>
			<span className="text-xs font-bold text-zinc-500 uppercase">
				{label}
			</span>
		</div>
	)
}
