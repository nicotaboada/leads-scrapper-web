'use client'

/**
 * Donut chart component for visualizing leads distribution by status
 */

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import {
	LeadStatus,
	LEAD_STATUS_COLORS,
	LEAD_STATUS_LABELS,
	type LeadsStatusSummary,
} from '../types/leads-summary'

interface LeadsStatusDonutProps {
	summary: LeadsStatusSummary
}

interface ChartDataItem {
	name: string
	value: number
	status: LeadStatus
	color: string
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
	if (!active || !payload || payload.length === 0) {
		return null
	}

	const data = payload[0].payload
	const percentage = total > 0 ? ((data.value / total) * 100).toFixed(1) : '0'

	return (
		<div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
			<p className="text-sm font-medium text-gray-900 dark:text-white">
				{data.name}
			</p>
			<p className="text-sm text-gray-600 dark:text-gray-300">
				{data.value} leads ({percentage}%)
			</p>
		</div>
	)
}

/**
 * Custom label component for the center of the donut
 */
function CenterLabel({ total }: { total: number }) {
	return (
		<text
			x="50%"
			y="50%"
			textAnchor="middle"
			dominantBaseline="middle"
			className="fill-gray-900 text-2xl font-bold dark:fill-white"
		>
			{total}
		</text>
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
				<div className="flex h-[140px] w-[140px] items-center justify-center rounded-full border-8 border-gray-200 dark:border-gray-700">
					<span className="text-2xl font-bold text-gray-400">0</span>
				</div>
			</div>
		)
	}

	return (
		<div className="relative h-[180px] w-[180px]">
			<ResponsiveContainer width="100%" height="100%">
				<PieChart>
					<Pie
						data={chartData}
						cx="50%"
						cy="50%"
						innerRadius={55}
						outerRadius={80}
						paddingAngle={2}
						dataKey="value"
						stroke="none"
					>
						{chartData.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>
					<Tooltip
						content={<CustomTooltip total={summary.total} />}
						cursor={false}
					/>
				</PieChart>
			</ResponsiveContainer>
			{/* Center label overlay */}
			<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
				<span className="text-2xl font-bold text-gray-900 dark:text-white">
					{summary.total}
				</span>
			</div>
		</div>
	)
}

