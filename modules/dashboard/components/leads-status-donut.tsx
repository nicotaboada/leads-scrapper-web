'use client'

/**
 * Donut chart component for visualizing leads distribution by status
 */

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import {
	LEAD_STATUS_COLORS,
	LEAD_STATUS_LABELS,
	type LeadsStatusSummary,
	LeadStatus,
} from '../types/leads-summary'

interface LeadsStatusDonutProps {
	summary: LeadsStatusSummary
}

interface ChartDataItem {
	name: string
	value: number
	status: LeadStatus
	color: string
	[key: string]: string | number | boolean | null | undefined | LeadStatus
}

interface CustomTooltipProps {
	active?: boolean
	payload?: Array<{
		payload: ChartDataItem
	}>
	total: number
}

/**
 * Custom tooltip component for the donut chart
 */
function CustomTooltip({ active, payload, total }: CustomTooltipProps) {
	if (!active || !payload || payload.length === 0 || !payload[0]) {
		return null
	}

	const data = payload[0].payload
	const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : '0'

	return (
		<div className="border-border rounded-xl border bg-white p-3 shadow-xl dark:bg-zinc-950">
			<div className="mb-1 flex items-center gap-2">
				<div
					className="h-2 w-2 rounded-full"
					style={{ backgroundColor: data.color }}
				/>
				<p className="text-muted-foreground text-[11px] font-semibold">
					{data.name}
				</p>
			</div>
			<p className="text-base leading-none font-semibold text-zinc-900 dark:text-zinc-100">
				{data.value}{' '}
				<span className="text-muted-foreground ml-0.5 text-[11px] font-normal">
					leads
				</span>
			</p>
			<div className="mt-2 flex items-center justify-between gap-4">
				<span className="text-muted-foreground text-[10px] font-medium">
					{percentage}% del total
				</span>
			</div>
		</div>
	)
}

/**
 * Donut chart component showing leads distribution by status
 */
export function LeadsStatusDonut({ summary }: LeadsStatusDonutProps) {
	const chartData: ChartDataItem[] = [
		{
			name: LEAD_STATUS_LABELS[LeadStatus.NEW],
			value: summary.new,
			status: LeadStatus.NEW,
			color: LEAD_STATUS_COLORS[LeadStatus.NEW],
		},
		{
			name: LEAD_STATUS_LABELS[LeadStatus.CONTACTED],
			value: summary.contacted,
			status: LeadStatus.CONTACTED,
			color: LEAD_STATUS_COLORS[LeadStatus.CONTACTED],
		},
		{
			name: LEAD_STATUS_LABELS[LeadStatus.IN_CONVERSATIONS],
			value: summary.inConversations,
			status: LeadStatus.IN_CONVERSATIONS,
			color: LEAD_STATUS_COLORS[LeadStatus.IN_CONVERSATIONS],
		},
		{
			name: LEAD_STATUS_LABELS[LeadStatus.CLOSED],
			value: summary.closed,
			status: LeadStatus.CLOSED,
			color: LEAD_STATUS_COLORS[LeadStatus.CLOSED],
		},
	].filter((item) => item.value > 0)

	// If all values are 0, show a placeholder
	if (chartData.length === 0) {
		return (
			<div className="flex h-[180px] w-[180px] items-center justify-center">
				<div className="flex h-[130px] w-[130px] items-center justify-center rounded-full border-[8px] border-zinc-100 dark:border-zinc-800/50">
					<span className="text-2xl font-bold text-zinc-300 dark:text-zinc-700">
						0
					</span>
				</div>
			</div>
		)
	}

	return (
		<div className="relative h-[200px] w-[200px]">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={chartData}
						cx="50%"
						cy="50%"
						innerRadius={65}
						outerRadius={90}
						paddingAngle={5}
						dataKey="value"
						stroke="none"
						cornerRadius={6}
						animationDuration={1000}
						animationBegin={0}
					>
						{chartData.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={entry.color}
								className="outline-none"
							/>
						))}
					</Pie>
					<Tooltip
						content={<CustomTooltip total={summary.total} />}
						cursor={false}
					/>
				</PieChart>
			</ResponsiveContainer>
			{/* Center label overlay */}
			<div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1">
				<span className="text-4xl leading-none font-semibold text-zinc-900 dark:text-zinc-100">
					{summary.total}
				</span>
				<span className="text-muted-foreground/60 mt-1 text-[10px] font-medium">
					Leads
				</span>
			</div>
		</div>
	)
}
