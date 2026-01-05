# PRD: Run Detail Page

## Introduction/Overview

This feature creates a dedicated detail page for individual runs, accessible by clicking on a run name in the runs table. The page displays real-time run status, metadata, and a paginated table of scraped results. Initially, this will support Google Maps scraper results, with the architecture designed to accommodate multiple actor types in the future.

The problem this solves is providing users with visibility into individual run execution and results without navigating away from the application to Apify's console.

## Goals

1. Allow users to view detailed information about a specific run
2. Display real-time run status updates (PENDING, RUNNING, SUCCEEDED, FAILED)
3. Show paginated results as they are scraped (real-time updates)
4. Provide quick access to the Apify console for the run
5. Create an extensible architecture that supports multiple actor types in the future

## User Stories

1. As a user, I want to click on a run name in the runs table to see its details
2. As a user, I want to see the current status of my run with clear visual indicators
3. As a user, I want to see results appear in real-time as the scraper runs
4. As a user, I want to access the Apify console directly from the run detail page
5. As a user, I want to navigate through paginated results efficiently
6. As a user, I want to see a loading state while the run is processing

## Functional Requirements

### Navigation & Routing

1. Clicking on a run name in the runs table must navigate to `/runs/{runId}`
2. The page must display a breadcrumb navigation: "Runs > {Run Name}"
3. The breadcrumb "Runs" link must navigate back to the runs list page

### Header Section

4. The header must display "Runs > {Run Name}" on the left side
5. The header must display an "Acciones" section on the right side
6. The "Acciones" section must contain placeholder action buttons (non-functional for now)
7. The Apify URL must be displayed prominently (in header or status section)
8. The Apify URL must be a clickable link that opens in a new tab

### Status Section

9. The status section must display a visual indicator based on run state:
   - **PENDING/RUNNING**: Loading spinner + neutral background + "Processing..." text
   - **SUCCEEDED**: Check icon + green background + "Completed successfully" text
   - **FAILED**: X icon + red background + "Run failed" text
10. The status section must update in real-time as the run status changes
11. The status section must use the existing `useRunSubscription` hook for real-time updates
12. The status section must display while the page is loading with appropriate loading state

### Results Table

13. The results table must display three columns: Place Name, Website, City
14. The results table must support backend pagination (similar to runs table)
15. The results table must show page size selector (10, 20, 50, 100 items per page)
16. The results table must show current page and total pages
17. The results table must have Previous/Next navigation buttons
18. The results table must subscribe to real-time updates when run status is PENDING or RUNNING
19. New results must appear automatically as they are scraped (via subscription)
20. The table must stop subscribing when run status is SUCCEEDED or FAILED
21. When there are no results yet (PENDING/RUNNING), the table must show an empty state with loading message
22. When run has failed with no results, the table must show appropriate empty state
23. Clicking on a table row must do nothing (data is display-only)

### Data Loading & Error Handling

24. The page must fetch run details on initial load
25. The page must display a loading state while fetching initial data
26. The page must handle cases where the run ID is invalid or not found
27. The page must display error messages if data fetching fails
28. The page must handle network errors gracefully

### Real-Time Updates

29. The page must use the same subscription mechanism as `runs-table.tsx`
30. The subscription must be active when run status is PENDING or RUNNING
31. The subscription must automatically disconnect when run completes (SUCCEEDED/FAILED)
32. Status updates must be reflected immediately in the UI
33. New results must be appended/updated in the table as they arrive

## Non-Goals (Out of Scope)

1. Implementing functional action buttons in the header (placeholder only)
2. Supporting actor types other than Google Maps scraper (architecture should allow, but not implemented)
3. Export functionality (CSV/JSON)
4. Row selection or bulk actions on results
5. Filtering or searching within results
6. Editing or modifying results
7. Inline actions on table rows (edit, delete, etc.)
8. Detail view or modal for individual results
9. Manual refresh button (real-time updates handle this)

## Design Considerations

### Visual Design

- Follow the same design patterns as existing runs table and dashboard pages
- Use existing UI components from `/components/ui/`
- Status section should visually match the reference images (Apify-like)
- Status indicators:
  - **Loading**: Spinner icon, neutral/blue background, "Processing..." text
  - **Success**: Check icon, green background, success message
  - **Failure**: X icon (alert triangle), red background, error message

### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Header: Runs > Run Name              [Acciones]         │
├─────────────────────────────────────────────────────────┤
│ Status Section:                                         │
│ [Icon] Status Message                                   │
│ Apify URL: [link]                                       │
├─────────────────────────────────────────────────────────┤
│ Results Table:                                          │
│ ┌───────────────┬────────────┬────────────┐            │
│ │ Place Name    │ Website    │ City       │            │
│ ├───────────────┼────────────┼────────────┤            │
│ │ ...           │ ...        │ ...        │            │
│ └───────────────┴────────────┴────────────┘            │
│ Pagination controls                                     │
└─────────────────────────────────────────────────────────┘
```

### Component Architecture

- Create a new route: `/app/(authenticated)/runs/[id]/page.tsx`
- Components to create:
  - `run-detail-header.tsx` - Breadcrumb + Actions
  - `run-status-section.tsx` - Status indicator with icon and message
  - `run-results-table.tsx` - Paginated results table
- Hooks to create:
  - `use-run-detail.ts` - Fetch run details
  - `use-run-results.ts` - Fetch paginated results with subscription support
- GraphQL queries/subscriptions to create:
  - `GET_RUN_DETAIL` - Query for run details
  - `GET_RUN_RESULTS` - Query for paginated results
  - `RUN_RESULTS_UPDATED` - Subscription for real-time result updates

## Technical Considerations

### Backend Requirements

1. GraphQL query `getRun(id: String!)` must return:
   - `id`, `name`, `status`, `runId`, `actorName`, `resultCount`
   - (Verify this query exists or needs to be created)

2. GraphQL query `getRunResults(runId: String!, page: Int!, pageSize: Int!)` must return:
   - `results: [RunResult!]!`
   - `totalCount: Int!`
   - `pageInfo: { currentPage, totalPages, hasNextPage, hasPreviousPage }`
   - (This query needs to be created in backend)

3. GraphQL subscription `runResultsUpdated(runId: String!)` must emit:
   - Updated run status
   - New results as they are scraped
   - Updated result count
   - (This subscription needs to be created in backend)

### Frontend Implementation

1. Reuse existing hooks and patterns:
   - `useRunSubscription` from `runs-table.tsx`
   - `useBackendPagination` hook pattern
   - Apollo Client subscription utilities

2. Type definitions needed:
   - `RunResult` type with `placeName`, `website`, `city` fields
   - `RunResultsPage` type for paginated response
   - Extend existing `Run` type if needed

3. Route implementation:
   - Dynamic route: `/app/(authenticated)/runs/[id]/page.tsx`
   - Use Next.js 15 App Router conventions
   - Implement proper loading and error states

4. Real-time updates:
   - Subscribe when status is PENDING or RUNNING
   - Unsubscribe when status is SUCCEEDED or FAILED
   - Handle reconnection gracefully if connection drops

### Dependencies

- No new dependencies required
- Uses existing Apollo Client setup
- Uses existing UI components (shadcn/ui)
- Uses existing hooks patterns

## Success Metrics

1. Users can access run details by clicking run name (100% navigation success)
2. Real-time status updates appear within 2 seconds of backend changes
3. New results appear in the table within 2 seconds of being scraped
4. Page load time < 1 second for initial render
5. No subscription memory leaks (proper cleanup on unmount)
6. Pagination performs smoothly with no delays
7. Zero console errors related to subscription management

## Open Questions

1. **Backend Implementation Status**: Does the backend already support `getRunResults` query and `runResultsUpdated` subscription? If not, these need to be implemented first.

2. **Result Data Structure**: What is the exact shape of the `RunResult` entity in the database? Are `placeName`, `website`, and `city` the correct field names?

3. **Subscription Scalability**: For runs with thousands of results, should we batch the subscription updates or emit individual result updates?

4. **Future Actor Types**: What other actor types are planned? Should we create an abstraction layer now or wait until the second actor type is needed?

5. **Error Recovery**: If the subscription drops during a long-running operation, should we automatically reconnect and resume from the last known state?

6. **Apify URL Placement**: Should the Apify URL be in the header, status section, or both?

7. **Action Buttons**: What actions should eventually be implemented in the "Acciones" section? (Delete, Re-run, Export, etc.)

8. **Empty State for Completed Runs**: If a run completes with zero results, should we show a different message than "Processing..."?

---

**Next Steps After PRD Approval:**
1. Review and confirm backend API availability
2. Create technical task breakdown document
3. Implement backend queries/subscriptions if needed
4. Implement frontend components and routes
5. Test real-time subscription behavior thoroughly
6. Test pagination with various result set sizes

