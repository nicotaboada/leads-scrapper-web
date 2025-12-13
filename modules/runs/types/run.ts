/**
 * Run status enum matching backend
 */
export enum RunStatus {
	PAUSED = 'PAUSED',
	PENDING = 'PENDING',
	RUNNING = 'RUNNING',
	SUCCEEDED = 'SUCCEEDED',
	FAILED = 'FAILED',
}

/**
 * Run result from Apify
 */
export interface RunResult {
	id: string
	raw: Record<string, any>
	normalized?: Record<string, any> | null
	createdAt: string
}

/**
 * Run entity
 */
export interface Run {
	id: string
	name: string
	actorName: string
	actorId: string
	runId?: string | null
	status: RunStatus
	input?: Record<string, any> | null
	resultCount: number
	createdAt: string
	updatedAt: string
	results?: RunResult[]
}

/**
 * Input for creating a run
 */
export interface CreateRunInput {
	name: string
	actorType: string
	input: Record<string, any>
}

/**
 * Input for playing a run
 */
export interface PlayRunInput {
	runId: string
}

/**
 * Input for pausing a run
 */
export interface PauseRunInput {
	runId: string
}

/**
 * Input for deleting a run
 */
export interface DeleteRunInput {
	runId: string
}

/**
 * Filters for querying runs
 */
export interface RunFiltersInput {
	status?: RunStatus
	limit?: number
	offset?: number
}

/**
 * GraphQL Query/Mutation responses
 */
export interface GetRunsResponse {
	runs: Run[]
}

export interface GetRunResponse {
	run: Run | null
}

export interface CreateRunResponse {
	createRun: Run
}

export interface PlayRunResponse {
	playRun: Run
}

export interface PauseRunResponse {
	pauseRun: Run
}

export interface DeleteRunResponse {
	deleteRun: Run
}

export interface RunStatusChangedResponse {
	runStatusChanged: Run
}
