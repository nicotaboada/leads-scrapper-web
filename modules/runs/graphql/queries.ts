import { gql } from '@apollo/client'

/**
 * Fragment with common Run fields
 */
export const RUN_FIELDS_FRAGMENT = gql`
	fragment RunFields on Run {
		id
		name
		actorName
		actorId
		runId
		status
		input
		resultCount
		createdAt
		updatedAt
	}
`

/**
 * Query to get all runs with optional filters
 */
export const GET_RUNS = gql`
	${RUN_FIELDS_FRAGMENT}
	query GetRuns($filters: RunFiltersInput) {
		runs(filters: $filters) {
			...RunFields
		}
	}
`

/**
 * Query to get a single run by ID
 */
export const GET_RUN = gql`
	${RUN_FIELDS_FRAGMENT}
	query GetRun($id: ID!) {
		run(id: $id) {
			...RunFields
			results {
				id
				raw
				normalized
				createdAt
			}
		}
	}
`

/**
 * Test query for smoke testing
 */
export const TEST_RUNS_MODULE = gql`
	query TestRunsModule {
		adminTestRuns
	}
`
