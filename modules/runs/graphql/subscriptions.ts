import { gql } from '@apollo/client'
import { RUN_FIELDS_FRAGMENT } from './queries'

/**
 * Subscription to listen for run status changes
 */
export const RUN_STATUS_CHANGED = gql`
	${RUN_FIELDS_FRAGMENT}
	subscription RunStatusChanged($runId: ID!) {
		runStatusChanged(runId: $runId) {
			...RunFields
		}
	}
`

/**
 * Subscription to listen for run results updates (status + result count)
 */
export const RUN_RESULTS_UPDATED = gql`
	${RUN_FIELDS_FRAGMENT}
	subscription RunResultsUpdated($runId: ID!) {
		runResultsUpdated(runId: $runId) {
			...RunFields
		}
	}
`
