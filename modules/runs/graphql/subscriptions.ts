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
