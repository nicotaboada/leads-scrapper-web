'use client'

/**
 * Hook for fetching activities with infinite scroll and filters
 */

import { useCallback, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { GET_USER_ACTIVITIES } from '../graphql/activity-queries'
import type {
  UserActivity,
  UserActivityConnection,
  DateRangeFilter,
} from '../types/activity'

interface ActivitiesResponse {
  userActivities: UserActivityConnection
}

interface UseInfiniteActivitiesParams {
  userId?: number
  dateRange?: DateRangeFilter
  pageSize?: number
}

interface UseInfiniteActivitiesReturn {
  activities: UserActivity[]
  totalCount: number
  loading: boolean
  error: Error | undefined
  hasNextPage: boolean
  loadMore: () => void
  refetch: () => void
}

const DEFAULT_PAGE_SIZE = 20

/**
 * Hook for infinite scroll activities with filters
 */
export function useInfiniteActivities(
  params: UseInfiniteActivitiesParams = {}
): UseInfiniteActivitiesReturn {
  const { userId, dateRange, pageSize = DEFAULT_PAGE_SIZE } = params
  const [loadingMore, setLoadingMore] = useState(false)

  const { data, loading, error, refetch, fetchMore } =
    useQuery<ActivitiesResponse>(GET_USER_ACTIVITIES, {
      variables: {
        filters: {
          userId,
          dateRange,
          first: pageSize,
        },
      },
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    })

  const activities = data?.userActivities.edges.map((edge) => edge.node) ?? []
  const hasNextPage = data?.userActivities.pageInfo.hasNextPage ?? false
  const endCursor = data?.userActivities.pageInfo.endCursor

  const loadMore = useCallback(() => {
    if (!hasNextPage || loadingMore || !endCursor) return

    setLoadingMore(true)
    fetchMore({
      variables: {
        filters: {
          userId,
          dateRange,
          first: pageSize,
          after: endCursor,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setLoadingMore(false)
        if (!fetchMoreResult) return prev

        return {
          userActivities: {
            ...fetchMoreResult.userActivities,
            edges: [
              ...prev.userActivities.edges,
              ...fetchMoreResult.userActivities.edges,
            ],
          },
        }
      },
    }).catch(() => {
      setLoadingMore(false)
    })
  }, [hasNextPage, loadingMore, endCursor, fetchMore, userId, dateRange, pageSize])

  return {
    activities,
    totalCount: data?.userActivities.totalCount ?? 0,
    loading: loading || loadingMore,
    error,
    hasNextPage,
    loadMore,
    refetch,
  }
}

