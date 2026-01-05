/**
 * Selection mode for bulk actions
 */
export type SelectionMode = 'none' | 'page' | 'all' | 'manual'

/**
 * State for managing bulk selection
 */
export interface SelectionState {
	mode: SelectionMode
	selectedIds: Set<string>
	deselectedIds: Set<string>
}

/**
 * Header checkbox visual state
 */
export type HeaderCheckboxState = 'empty' | 'indeterminate' | 'checked'

/**
 * Selection mode enum matching backend (uppercase)
 */
export enum BulkSelectionMode {
	ALL = 'ALL',
	SELECTED = 'SELECTED',
	PAGE = 'PAGE',
}

/**
 * Input for bulk create companies mutation
 */
export interface BulkCreateCompaniesInput {
	runId: string
	selectionMode: BulkSelectionMode
	selectedIds?: string[]
	deselectedIds?: string[]
	page?: number
	pageSize?: number
}

/**
 * Error detail for bulk create operation
 */
export interface BulkCreateError {
	index: number
	message: string
}

/**
 * Response from bulk create companies mutation
 */
export interface BulkCreateCompaniesResponse {
	createdCount: number
	errorCount: number
	errors: BulkCreateError[]
}

/**
 * GraphQL response wrapper
 */
export interface BulkCreateCompaniesFromRunResponse {
	bulkCreateCompaniesFromRun: BulkCreateCompaniesResponse
}

/**
 * Payload to send to the mutation
 */
export interface SelectionPayload {
	selectionMode: BulkSelectionMode
	selectedIds: string[]
	deselectedIds: string[]
}
