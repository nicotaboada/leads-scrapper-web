# Tasks: Run Detail Page

## Relevant Files

### Backend Files
- `leads-scrapper-backend/src/runs/runs.resolver.ts` - Add new query and subscription resolvers for run results
- `leads-scrapper-backend/src/runs/runs.service.ts` - Implement business logic for fetching and streaming run results
- `leads-scrapper-backend/src/runs/entities/run-result.entity.ts` - Create entity for run results
- `leads-scrapper-backend/src/runs/dto/run-result.dto.ts` - Create DTO for run result responses
- `leads-scrapper-backend/prisma/schema.prisma` - Verify/update schema for run results storage

### Frontend Files
- `leads-scrapper-web/app/(authenticated)/runs/[id]/page.tsx` - Main run detail page route
- `leads-scrapper-web/modules/runs/components/run-detail-header.tsx` - Header component with breadcrumb and actions
- `leads-scrapper-web/modules/runs/components/run-status-section.tsx` - Status indicator component
- `leads-scrapper-web/modules/runs/components/run-results-table.tsx` - Paginated results table component
- `leads-scrapper-web/modules/runs/hooks/use-run-detail.ts` - Hook for fetching run details
- `leads-scrapper-web/modules/runs/hooks/use-run-results.ts` - Hook for fetching paginated results with subscription
- `leads-scrapper-web/modules/runs/graphql/run-detail.queries.ts` - GraphQL queries for run details and results
- `leads-scrapper-web/modules/runs/graphql/run-detail.subscriptions.ts` - GraphQL subscription for real-time result updates
- `leads-scrapper-web/modules/runs/types/run-result.ts` - Type definitions for run results
- `leads-scrapper-web/modules/runs/components/runs-table.tsx` - Update to add navigation link

### Notes
- Backend must be implemented first to support frontend GraphQL queries
- Reuse existing `useRunSubscription` pattern for real-time updates
- Follow existing pagination patterns from runs table
- Use existing UI components from `components/ui/`

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature (e.g., `git checkout -b feature/run-detail-page`)

- [x] 1.0 Backend Implementation - GraphQL queries and subscriptions for run results
  - [x] 1.1 Read `leads-scrapper-backend/src/runs/runs.resolver.ts` to understand current resolver structure
  - [x] 1.2 Read `leads-scrapper-backend/src/runs/runs.service.ts` to understand current service structure
  - [x] 1.3 Create `leads-scrapper-backend/src/runs/dto/run-results-page.dto.ts` with pagination types (results, totalCount, pageInfo)
  - [x] 1.4 Add `getRunResults` query to `runs.resolver.ts` with parameters (runId, page, pageSize)
  - [x] 1.5 Add `runResultsUpdated` subscription to `runs.resolver.ts` that emits when new results arrive
  - [x] 1.6 Update the existing polling mechanism in `runs.resolver.ts` to publish to `runResultsUpdated` channel when results change

- [x] 2.0 Backend - Run Results Storage and Retrieval
  - [x] 2.1 Add `getRunResults` method to `runs.service.ts` that fetches paginated results from database
  - [x] 2.2 Implement pagination logic (calculate offset, limit, totalPages, etc.)
  - [x] 2.3 Update `storeRunResults` method to handle incremental result storage (if not already done)
  - [x] 2.4 Add method to get result count for a run
  - [ ] 2.5 Test backend queries using GraphQL playground to verify pagination works correctly

- [x] 3.0 Frontend - Types and GraphQL Definitions
  - [x] 3.1 Read `leads-scrapper-web/modules/runs/types/run.ts` to understand existing types
  - [x] 3.2 Create `leads-scrapper-web/modules/runs/types/run-result.ts` with types: `GoogleMapsResult` (placeName, website, city), `RunResultsPage` (results, totalCount, pageInfo)
  - [x] 3.3 Create `leads-scrapper-web/modules/runs/graphql/run-detail.queries.ts` with `GET_RUN` and `GET_RUN_RESULTS` queries
  - [x] 3.4 Create `leads-scrapper-web/modules/runs/graphql/run-detail.subscriptions.ts` with `RUN_RESULTS_UPDATED` subscription
  - [x] 3.5 Update existing `leads-scrapper-web/modules/runs/graphql/index.ts` to export new queries/subscriptions

- [x] 4.0 Frontend - Create Run Detail Page Route Structure
  - [x] 4.1 Create directory `leads-scrapper-web/app/(authenticated)/runs/[id]/`
  - [x] 4.2 Create `leads-scrapper-web/app/(authenticated)/runs/[id]/page.tsx` with basic page structure
  - [x] 4.3 Add page metadata (title, description)
  - [x] 4.4 Implement loading.tsx for page-level loading state (optional but recommended)
  - [x] 4.5 Add basic error boundary or error handling

- [x] 5.0 Frontend - Implement Data Fetching Hooks
  - [x] 5.1 Create `leads-scrapper-web/modules/runs/hooks/use-run-detail.ts` - hook to fetch single run by ID
  - [x] 5.2 Implement loading, error, and data states in `use-run-detail.ts`
  - [x] 5.3 Create `leads-scrapper-web/modules/runs/hooks/use-run-results.ts` - hook to fetch paginated results
  - [x] 5.4 Add pagination parameters (page, pageSize) to `use-run-results.ts`
  - [x] 5.5 Implement real-time subscription support in `use-run-results.ts` (subscribe when PENDING/RUNNING)
  - [x] 5.6 Add auto-unsubscribe logic when run completes (SUCCEEDED/FAILED)

- [x] 6.0 Frontend - Build Status Section Component
  - [x] 6.1 Create `leads-scrapper-web/modules/runs/components/run-status-section.tsx`
  - [x] 6.2 Import necessary icons from `lucide-react` (Loader2, CheckCircle, XCircle)
  - [x] 6.3 Implement status indicator logic (show different icon/color based on status)
  - [x] 6.4 Add status message text ("Processing...", "Completed successfully", "Run failed")
  - [x] 6.5 Add Apify URL display with external link icon
  - [x] 6.6 Style the component with Tailwind classes (green for success, red for failure, blue for loading)
  - [x] 6.7 Add loading skeleton state for when run data is still loading

- [x] 7.0 Frontend - Build Results Table with Pagination
  - [x] 7.1 Create `leads-scrapper-web/modules/runs/components/run-results-table.tsx`
  - [x] 7.2 Import Table components from `@/components/ui/table`
  - [x] 7.3 Add table columns: Place Name, Website, City
  - [x] 7.4 Implement empty state with loading message (when no results yet)
  - [x] 7.5 Implement empty state for failed runs with no results
  - [x] 7.6 Add pagination controls at bottom (page size selector, prev/next buttons)
  - [x] 7.7 Import and use pagination components from existing UI library or create new ones
  - [x] 7.8 Display current page, total pages, and total results count
  - [x] 7.9 Handle pagination state changes (update page, pageSize)
  - [x] 7.10 Add loading spinner overlay when fetching new page

- [x] 8.0 Frontend - Build Header Component
  - [x] 8.1 Create `leads-scrapper-web/modules/runs/components/run-detail-header.tsx`
  - [x] 8.2 Implement breadcrumb navigation: "Runs > {Run Name}"
  - [x] 8.3 Make "Runs" link navigate back to `/runs` page
  - [x] 8.4 Add "Acciones" section on the right side
  - [x] 8.5 Add placeholder action buttons (non-functional, just UI for now)
  - [x] 8.6 Style header with flex layout (space-between for left/right sections)

- [x] 9.0 Frontend - Integrate Real-Time Subscriptions
  - [x] 9.1 Read `leads-scrapper-web/modules/runs/hooks/use-run-subscription.ts` to understand subscription pattern
  - [x] 9.2 Integrate `useRunSubscription` in `page.tsx` for status updates
  - [x] 9.3 Update `use-run-results.ts` to subscribe to result updates
  - [x] 9.4 Implement subscription enable/disable logic based on run status
  - [x] 9.5 Test subscription connection/disconnection in browser dev tools
  - [x] 9.6 Add visual indicator (like red dot) when subscription is active
  - [x] 9.7 Ensure subscription properly cleans up on component unmount

- [x] 10.0 Frontend - Add Navigation from Runs Table
  - [x] 10.1 Read `leads-scrapper-web/modules/runs/components/runs-table.tsx`
  - [x] 10.2 Import Next.js Link component
  - [x] 10.3 Wrap run name in TableCell with Link component pointing to `/runs/{run.id}`
  - [x] 10.4 Add hover styles to indicate clickability (underline, cursor-pointer)
  - [x] 10.5 Test navigation flow: click run name → detail page → back to runs

- [ ] 11.0 Testing and Polish
  - [ ] 11.1 Test full user flow: navigate to run detail, see status, view results
  - [ ] 11.2 Test pagination: change page size, navigate between pages
  - [ ] 11.3 Test real-time updates: start a run, watch status change, see results appear
  - [ ] 11.4 Test edge cases: invalid run ID, run with no results, failed run
  - [ ] 11.5 Test subscription cleanup: navigate away during active run, ensure no memory leaks
  - [ ] 11.6 Verify Apify URL links work correctly (open in new tab)
  - [ ] 11.7 Check responsive design on mobile/tablet
  - [ ] 11.8 Run linter and fix any errors: `npm run lint`
  - [ ] 11.9 Review code for any console.log statements and remove them
  - [ ] 11.10 Commit changes with descriptive commit message

