import { gql } from '@apollo/client'
import { RUN_FIELDS_FRAGMENT } from './queries'

/**
 * Mutation to create a new run
 */
export const CREATE_RUN = gql`
	${RUN_FIELDS_FRAGMENT}
	mutation CreateRun($input: CreateRunInput!) {
		createRun(input: $input) {
			...RunFields
		}
	}
`

/**
 * Mutation to play (start) a paused run
 */
export const PLAY_RUN = gql`
	${RUN_FIELDS_FRAGMENT}
	mutation PlayRun($input: PlayRunInput!) {
		playRun(input: $input) {
			...RunFields
		}
	}
`

/**
 * Mutation to pause (stop) a running run
 */
export const PAUSE_RUN = gql`
	${RUN_FIELDS_FRAGMENT}
	mutation PauseRun($input: PauseRunInput!) {
		pauseRun(input: $input) {
			...RunFields
		}
	}
`

/**
 * Mutation to delete a run
 */
export const DELETE_RUN = gql`
	${RUN_FIELDS_FRAGMENT}
	mutation DeleteRun($input: DeleteRunInput!) {
		deleteRun(input: $input) {
			...RunFields
		}
	}
`

/**
 * Mutation to bulk create companies from run results
 */
export const BULK_CREATE_COMPANIES_FROM_RUN = gql`
	mutation BulkCreateCompaniesFromRun($input: BulkCreateCompaniesInput!) {
		bulkCreateCompaniesFromRun(input: $input) {
			createdCount
			errorCount
			errors {
				index
				message
			}
		}
	}
`

/**
 * Mutation to bulk create person contacts from leads
 */
export const BULK_CREATE_PERSON_CONTACTS_FROM_LEADS = gql`
	mutation BulkCreatePersonContactsFromLeads(
		$input: BulkCreatePersonContactsInput!
	) {
		bulkCreatePersonContactsFromLeads(input: $input) {
			createdCount
			createdWithoutCompanyCount
			errorCount
			errors {
				index
				message
			}
		}
	}
`

/**
 * Mutation to update a run result's data
 */
export const UPDATE_RUN_RESULT = gql`
	mutation UpdateRunResult($id: ID!, $input: UpdateRunResultInput!) {
		updateRunResult(id: $id, input: $input) {
			id
			runId
			raw
			normalized
			createdAt
		}
	}
`
