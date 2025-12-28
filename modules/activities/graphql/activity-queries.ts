import { gql } from '@apollo/client'

/**
 * Fragment for user activity fields
 */
export const USER_ACTIVITY_FRAGMENT = gql`
  fragment UserActivityFields on UserActivity {
    id
    type
    userId
    userName
    metadata
    createdAt
  }
`

/**
 * Query to get paginated user activities
 */
export const GET_USER_ACTIVITIES = gql`
  ${USER_ACTIVITY_FRAGMENT}
  query GetUserActivities($filters: UserActivitiesFilterInput) {
    userActivities(filters: $filters) {
      edges {
        node {
          ...UserActivityFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`

/**
 * Query to get all users for filter dropdown
 */
export const GET_USERS_LIST = gql`
  query GetUsersList {
    users {
      id
      email
      name
    }
  }
`

