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
