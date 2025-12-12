# Tasks: Student Search Feature

## Relevant Files

- `modules/students/components/search-filters-row.tsx` - Main search component with debounced input
- `hooks/use-debounce.ts` - Custom hook for debouncing values
- `hooks/use-backend-pagination.ts` - Update to support search parameter and reset on search change
- `modules/students/graphql/queries.ts` - Update GET_STUDENTS query to include search parameter
- `app/(authenticated)/students/page.tsx` - Integrate search component and manage search state
- `modules/students/types/student.ts` - Update types if needed for search parameters
- `components/ui/empty.tsx` - Empty state component for no search results (if doesn't exist)

### Notes

- The backend GraphQL endpoint already accepts the `$search` parameter, so no backend changes are needed
- Debounce time is set to 800ms as specified in the PRD
- Search should reset pagination to page 1 automatically
- Use existing Shadcn UI Input component for consistency

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch: `git checkout -b feature/students-search`
- [x] 1.0 Create debounce hook
  - [x] 1.1 Create new file `hooks/use-debounce.ts`
  - [x] 1.2 Implement useDebounce hook with generic type support
  - [x] 1.3 Add 800ms default delay parameter (configurable)
  - [x] 1.4 Use useEffect and useState to handle debounced value
  - [x] 1.5 Add cleanup function to clear timeout on unmount
  - [x] 1.6 Add JSDoc documentation explaining usage and parameters
- [x] 2.0 Update useBackendPagination hook to support search
  - [x] 2.1 Read current `hooks/use-backend-pagination.ts` implementation
  - [x] 2.2 Add logic to reset page to 1 when queryVariables change
  - [x] 2.3 Use useEffect to detect changes in queryVariables (excluding page/limit)
  - [x] 2.4 Update hook to call resetPage() internally when search changes
  - [x] 2.5 Test that pagination resets correctly when search query changes
- [x] 3.0 Update GraphQL query to include search parameter
  - [x] 3.1 Read current `modules/students/graphql/queries.ts`
  - [x] 3.2 Update GET_STUDENTS query signature to include `$search: String`
  - [x] 3.3 Pass search parameter to the students query
  - [x] 3.4 Verify query syntax is correct
- [x] 4.0 Create search filters row component
  - [x] 4.1 Create new file `modules/students/components/search-filters-row.tsx`
  - [x] 4.2 Import necessary components (Input, Search icon, X icon)
  - [x] 4.3 Create SearchFiltersRow component with controlled input
  - [x] 4.4 Add search icon on the left side of input
  - [x] 4.5 Add conditional clear button (X) on the right side when input has value
  - [x] 4.6 Implement onChange handler to update parent state
  - [x] 4.7 Implement clear button handler to reset search
  - [x] 4.8 Add placeholder: "Buscar por nombre, apellido o email..."
  - [x] 4.9 Add proper ARIA labels for accessibility
  - [x] 4.10 Style component to match existing design (responsive, proper spacing)
  - [x] 4.11 Add JSDoc documentation
- [x] 5.0 Integrate search component in Students page
  - [x] 5.1 Read current `app/(authenticated)/students/page.tsx`
  - [x] 5.2 Import SearchFiltersRow component
  - [x] 5.3 Import useDebounce hook
  - [x] 5.4 Add search state with useState (empty string initial value)
  - [x] 5.5 Apply useDebounce to search state (800ms delay)
  - [x] 5.6 Pass debounced search value to useBackendPagination via queryVariables
  - [x] 5.7 Insert SearchFiltersRow between SectionHeader and stats section
  - [x] 5.8 Pass search state and setState handler to SearchFiltersRow
  - [x] 5.9 Trim whitespace from search value before passing to query
  - [x] 5.10 Test that search triggers query correctly
- [x] 6.0 Handle empty search results state
  - [x] 6.1 Check if Empty component exists in `components/ui/empty.tsx`
  - [x] 6.2 If doesn't exist, create Empty component with icon, title, and description props
  - [x] 6.3 Update StudentsTable component to handle empty results
  - [x] 6.4 Show Empty component when students array is empty and search is active
  - [x] 6.5 Display message: "No se encontraron estudiantes" with search query
  - [x] 6.6 Add clear search action/button in empty state
  - [x] 6.7 Test empty state displays correctly
- [ ] 7.0 Testing and QA
  - [ ] 7.1 Test search with various queries (short, long, special characters)
  - [ ] 7.2 Verify debounce works (no request until 800ms after typing stops)
  - [ ] 7.3 Test that pagination resets to page 1 when searching
  - [ ] 7.4 Test that clear button works and returns full list
  - [ ] 7.5 Test loading states display correctly during search
  - [ ] 7.6 Test empty results state
  - [ ] 7.7 Test that search persists when navigating between pages of results
  - [ ] 7.8 Test responsive design on mobile/tablet
  - [ ] 7.9 Test keyboard navigation and accessibility
  - [ ] 7.10 Verify no console errors or warnings
  - [ ] 7.11 Check linter for any errors or warnings

