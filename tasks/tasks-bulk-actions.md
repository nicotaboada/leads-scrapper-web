## Relevant Files

### Frontend (leads-scrapper-web)

- `modules/runs/types/bulk-actions.ts` - New file with types for selection state, bulk action inputs/responses
- `modules/runs/hooks/use-bulk-selection.ts` - New hook to manage checkbox selection state across pages
- `modules/runs/hooks/use-bulk-create-companies.ts` - New hook for bulk create mutation
- `modules/runs/graphql/mutations.ts` - Add bulk create mutation
- `modules/runs/components/run-results-table.tsx` - Modify to add checkboxes and selection logic
- `modules/runs/components/bulk-action-header.tsx` - New component for selection counter and action buttons
- `modules/runs/components/selection-dropdown.tsx` - New component for header checkbox dropdown menu
- `modules/runs/components/bulk-create-modal.tsx` - New modal for confirming bulk create action
- `app/(authenticated)/runs/[id]/page.tsx` - Modify to integrate bulk actions flow

### Backend (leads-scrapper-backend)

- `src/runs/dto/bulk-create-companies.input.ts` - New DTO for bulk create input
- `src/runs/entities/bulk-create-response.entity.ts` - New entity for bulk create response
- `src/runs/runs.resolver.ts` - Add bulkCreateCompaniesFromRun mutation
- `src/runs/runs.service.ts` - Implement bulk create logic
- `src/schema.gql` - Auto-generated, will update with new types

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- The backend mutation should be implemented first (Task 5.0) so frontend can integrate against it.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/bulk-actions`

- [x] 1.0 Create types and interfaces for bulk selection and bulk actions
  - [x] 1.1 Create `modules/runs/types/bulk-actions.ts` file
  - [x] 1.2 Define `SelectionMode` type: `'none' | 'page' | 'all' | 'manual'`
  - [x] 1.3 Define `SelectionState` interface with `mode`, `selectedIds` (Set), and `deselectedIds` (Set)
  - [x] 1.4 Define `BulkCreateCompaniesInput` type matching backend mutation input
  - [x] 1.5 Define `BulkCreateCompaniesResponse` type with `createdCount`, `errorCount`, and `errors` array
  - [x] 1.6 Define `BulkCreateError` type with `index` and `message` fields

- [x] 2.0 Implement bulk selection hook (use-bulk-selection.ts)
  - [x] 2.1 Create `modules/runs/hooks/use-bulk-selection.ts` file
  - [x] 2.2 Implement state management for `SelectionState` using useState
  - [x] 2.3 Implement `toggleItem(id: string)` - toggles individual checkbox
  - [x] 2.4 Implement `selectNone()` - clears all selection
  - [x] 2.5 Implement `selectPage(pageIds: string[])` - selects only current page items
  - [x] 2.6 Implement `selectAll()` - sets mode to 'all'
  - [x] 2.7 Implement `isSelected(id: string): boolean` - checks if item is selected based on mode
  - [x] 2.8 Implement `getSelectedCount(totalCount: number): number` - returns count based on mode
  - [x] 2.9 Implement `getSelectionPayload()` - returns data for mutation (mode, selectedIds, deselectedIds)
  - [x] 2.10 Implement `getHeaderCheckboxState(): 'empty' | 'indeterminate' | 'checked'`

- [x] 3.0 Create selection UI components
  - [x] 3.1 Create `modules/runs/components/selection-dropdown.tsx`
  - [x] 3.2 Implement dropdown with three options: Select None, Select Page, Select All
  - [x] 3.3 Display counts in each option (0, pageSize, totalCount)
  - [x] 3.4 Style checkbox to show empty/indeterminate/checked states
  - [x] 3.5 Create `modules/runs/components/bulk-action-header.tsx`
  - [x] 3.6 Display selection counter: "X selected"
  - [x] 3.7 Add "Create Contacts" button (disabled when selection is 0)
  - [x] 3.8 Pass onClick handler for Create Contacts button as prop

- [x] 4.0 Integrate checkboxes into RunResultsTable component
  - [x] 4.1 Add checkbox column as first column in table header
  - [x] 4.2 Add SelectionDropdown component in header checkbox cell
  - [x] 4.3 Add checkbox to each table row
  - [x] 4.4 Wire up checkbox onChange to `toggleItem` from hook
  - [x] 4.5 Wire up checkbox checked state to `isSelected` from hook
  - [x] 4.6 Add BulkActionHeader above the table
  - [x] 4.7 Update RunResultsTable props interface to accept selection-related props
  - [x] 4.8 Ensure selection state persists when navigating between pages

- [x] 5.0 Implement backend mutation for bulk create companies from run
  - [x] 5.1 Create `src/runs/dto/bulk-create-companies.input.ts` with input DTO
  - [x] 5.2 Add fields: `runId`, `selectionMode`, `selectedIds`, `deselectedIds`, `page`, `pageSize`
  - [x] 5.3 Create `src/runs/entities/bulk-create-response.entity.ts` with response entity
  - [x] 5.4 Add fields: `createdCount`, `errorCount`, `errors` array
  - [x] 5.5 Add `bulkCreateCompaniesFromRun` mutation to `runs.resolver.ts`
  - [x] 5.6 Implement service method to fetch run results based on selection mode
  - [x] 5.7 For mode 'all': get all results, exclude `deselectedIds`
  - [x] 5.8 For mode 'page': get results for specified page
  - [x] 5.9 For mode 'manual': get results by `selectedIds`
  - [x] 5.10 Extract company data from each result: placeName → companyName, phone, email
  - [x] 5.11 Create Company contacts using existing `contactsService.createCompany()`
  - [x] 5.12 Wrap each creation in try/catch to continue on individual failures
  - [x] 5.13 Return summary with `createdCount`, `errorCount`, and error details

- [x] 6.0 Create bulk create modal and mutation hook in frontend
  - [x] 6.1 Add `BULK_CREATE_COMPANIES_FROM_RUN` mutation to `modules/runs/graphql/mutations.ts`
  - [x] 6.2 Create `modules/runs/hooks/use-bulk-create-companies.ts`
  - [x] 6.3 Implement hook using useMutation from Apollo Client
  - [x] 6.4 Return `bulkCreate` function, `loading`, and `error` state
  - [x] 6.5 Create `modules/runs/components/bulk-create-modal.tsx`
  - [x] 6.6 Use AlertDialog component for modal structure
  - [x] 6.7 Display confirmation message with count of contacts to create
  - [x] 6.8 Add Cancel and Create buttons
  - [x] 6.9 Show loading state on Create button during mutation
  - [x] 6.10 Handle mutation response and call onSuccess/onError callbacks

- [x] 7.0 Wire up complete flow and add redirect after success
  - [x] 7.1 Modify run detail page to manage modal open/close state
  - [x] 7.2 Pass `runId` and selection state to bulk create modal
  - [x] 7.3 On successful bulk create, show toast with summary (X created, Y failed)
  - [x] 7.4 Use `useRouter` from Next.js to redirect to `/contacts` after success
  - [x] 7.5 Clear selection state after successful operation
  - [x] 7.6 Handle error case: show error toast, keep modal open or close based on error type
  - [ ] 7.7 Test complete flow: select items → click Create → confirm → see toast → redirect
  - [ ] 7.8 Test edge cases: select all with deselections, select page, partial failures
