'use client'

/**
 * Activity List Component
 *
 * Displays activities grouped by relative date with timeline styling
 */

import type { Activity } from '../types/activity'
import { groupActivitiesByDate } from '../types/activity'
import { ActivityItem } from './activity-item'

interface ActivityListProps {
	activities: Activity[]
}

export function ActivityList({ activities }: ActivityListProps) {
	const groups = groupActivitiesByDate(activities)

	return (
		<div className="space-y-6">
			{groups.map((group) => (
				<div key={group.label}>
					{/* Date label */}
					<p className="text-muted-foreground mb-4 text-sm font-medium">
						{group.label}
					</p>

					{/* Activities in group */}
					<div className="ml-1">
						{group.activities.map((activity, index) => (
							<ActivityItem
								key={activity.id}
								activity={activity}
								isLast={index === group.activities.length - 1}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	)
}

