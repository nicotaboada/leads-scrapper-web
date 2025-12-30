'use client'

/**
 * Activity List Component
 *
 * Displays activities grouped by relative date with timeline styling
 */

import { motion } from 'motion/react'
import type { Activity } from '../types/activity'
import { groupActivitiesByDate } from '../types/activity'
import { ActivityItem } from './activity-item'

interface ActivityListProps {
	activities: Activity[]
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, x: -10 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
		},
	},
}

export function ActivityList({ activities }: ActivityListProps) {
	const groups = groupActivitiesByDate(activities)

	return (
		<div className="space-y-10">
			{groups.map((group) => (
				<div key={group.label} className="space-y-6">
					{/* Date label */}
					<div className="flex items-center gap-4">
						<span className="text-xs font-semibold uppercase text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
							{group.label}
						</span>
						<div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />
					</div>

					{/* Activities in group */}
					<motion.div 
						className="ml-1 space-y-2"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{group.activities.map((activity, index) => (
							<motion.div key={activity.id} variants={itemVariants}>
								<ActivityItem
									activity={activity}
									isLast={index === group.activities.length - 1}
								/>
							</motion.div>
						))}
					</motion.div>
				</div>
			))}
		</div>
	)
}

