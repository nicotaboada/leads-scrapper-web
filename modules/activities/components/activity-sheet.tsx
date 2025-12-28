'use client'

/**
 * Sheet component showing all activities with filters and infinite scroll
 */

import { useEffect, useCallback, useRef, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from 'components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'
import { ScrollArea } from 'components/ui/scroll-area'
import { Loader2 } from 'lucide-react'
import { useInfiniteActivities } from '../hooks/use-infinite-activities'
import { useUsersList } from '../hooks/use-users-list'
import { ActivityItem } from './activity-item'
import { ActivityEmptyState } from './activity-empty-state'
import { DateRangeFilter } from '../types/activity'

interface ActivitySheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DATE_RANGE_OPTIONS = [
  { value: 'ALL', label: 'Todas las fechas' },
  { value: DateRangeFilter.LAST_24_HOURS, label: 'Últimas 24 horas' },
  { value: DateRangeFilter.LAST_7_DAYS, label: 'Últimos 7 días' },
  { value: DateRangeFilter.LAST_30_DAYS, label: 'Último mes' },
] as const

/**
 * Sheet displaying all activities with filters and infinite scroll
 */
export function ActivitySheet({ open, onOpenChange }: ActivitySheetProps) {
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>(
    undefined
  )
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRangeFilter | undefined
  >(undefined)

  const { users } = useUsersList()
  const {
    activities,
    loading,
    hasNextPage,
    loadMore,
    refetch,
  } = useInfiniteActivities({
    userId: selectedUserId,
    dateRange: selectedDateRange,
  })

  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  // Intersection observer for infinite scroll
  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !loading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }
  }, [hasNextPage, loading, loadMore])

  useEffect(() => {
    if (open) {
      setupObserver()
    }
    return () => {
      observerRef.current?.disconnect()
    }
  }, [open, setupObserver])

  // Refetch when sheet opens
  useEffect(() => {
    if (open) {
      refetch()
    }
  }, [open, refetch])

  // Refetch when filters change
  useEffect(() => {
    if (open) {
      refetch()
    }
  }, [selectedUserId, selectedDateRange, open, refetch])

  const handleUserChange = (value: string) => {
    setSelectedUserId(value === 'ALL' ? undefined : Number(value))
  }

  const handleDateRangeChange = (value: string) => {
    setSelectedDateRange(
      value === 'ALL' ? undefined : (value as DateRangeFilter)
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader className="pb-4">
          <SheetTitle>Todas las actividades</SheetTitle>
        </SheetHeader>

        {/* Filters */}
        <div className="flex gap-3 px-6 pb-4">
          <Select
            value={selectedUserId?.toString() ?? 'ALL'}
            onValueChange={handleUserChange}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Todos los usuarios" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos los usuarios</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.name ?? user.email}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedDateRange ?? 'ALL'}
            onValueChange={handleDateRangeChange}
          >
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Todas las fechas" />
            </SelectTrigger>
            <SelectContent>
              {DATE_RANGE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Activity list */}
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="px-6">
            {activities.length === 0 && !loading ? (
              <ActivityEmptyState message="No hay actividades que coincidan con los filtros" />
            ) : (
              <div className="divide-y divide-border/50">
                {activities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    showFullName={true}
                  />
                ))}
              </div>
            )}

            {/* Load more trigger */}
            <div ref={loadMoreRef} className="py-4">
              {loading && (
                <div className="flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

