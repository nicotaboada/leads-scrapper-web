'use client'

/**
 * Icon component for activity types
 */

import {
  UserPlus,
  Play,
  Users,
  ArrowRightLeft,
  CalendarPlus,
  CalendarCheck,
  Globe,
  type LucideIcon,
} from 'lucide-react'
import { UserActivityType } from '../types/activity'

interface ActivityIconProps {
  type: UserActivityType
  className?: string
}

const ACTIVITY_ICONS: Record<UserActivityType, LucideIcon> = {
  [UserActivityType.CONTACT_CREATED]: UserPlus,
  [UserActivityType.RUN_CREATED]: Play,
  [UserActivityType.BULK_CONTACTS_CREATED]: Users,
  [UserActivityType.LEAD_STATUS_CHANGED]: ArrowRightLeft,
  [UserActivityType.FOLLOWUP_ADDED]: CalendarPlus,
  [UserActivityType.FOLLOWUP_COMPLETED]: CalendarCheck,
  [UserActivityType.WEBSITE_ANALYZED]: Globe,
}

const ACTIVITY_COLORS: Record<UserActivityType, string> = {
  [UserActivityType.CONTACT_CREATED]: 'text-emerald-400',
  [UserActivityType.RUN_CREATED]: 'text-blue-400',
  [UserActivityType.BULK_CONTACTS_CREATED]: 'text-violet-400',
  [UserActivityType.LEAD_STATUS_CHANGED]: 'text-amber-400',
  [UserActivityType.FOLLOWUP_ADDED]: 'text-cyan-400',
  [UserActivityType.FOLLOWUP_COMPLETED]: 'text-green-400',
  [UserActivityType.WEBSITE_ANALYZED]: 'text-pink-400',
}

/**
 * Renders the appropriate icon for an activity type
 */
export function ActivityIcon({ type, className = '' }: ActivityIconProps) {
  const Icon = ACTIVITY_ICONS[type] ?? UserPlus
  const colorClass = ACTIVITY_COLORS[type] ?? 'text-muted-foreground'

  return <Icon className={`h-4 w-4 ${colorClass} ${className}`} />
}

