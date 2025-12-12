# PRD: Student Search Feature

## Introduction/Overview

This feature adds a search functionality to the Students page, allowing users to quickly find specific students by searching across multiple fields (name, last name, email). The search will be implemented with a debounced input to optimize performance and reduce unnecessary API calls. This search bar will be part of a larger filter row that will eventually include additional filters.

**Problem it solves:** Currently, users must manually scroll through paginated student lists to find specific students. With potentially hundreds or thousands of students, this becomes inefficient and time-consuming. A search feature provides instant access to relevant student records.

**Goal:** Enable users to quickly locate students by typing search queries with real-time, debounced search results.

---

## Goals

1. Implement a search input that filters the students table in real-time
2. Optimize API calls using debounce (800ms) to prevent excessive requests
3. Provide clear visual feedback during search operations
4. Maintain a clean, intuitive UI that aligns with existing design patterns
5. Reset pagination to page 1 when a search query is entered
6. Prepare the UI structure for future filter additions (date, amount, etc.)

---

## User Stories

**As a user**, I want to search for students by name, last name, or email so that I can quickly find specific student records without scrolling through multiple pages.

**As a user**, I want the search to happen automatically as I type (with a slight delay) so that I don't have to press Enter or click a search button.

**As a user**, I want to see a loading state while the search is processing so that I know the system is working on my request.

**As a user**, I want the search results to start from page 1 so that I don't miss relevant results on earlier pages.

**As a user**, I want to easily clear my search to return to the full student list.

---

## Functional Requirements

### UI Components

1. **Search Row Component**
   - Must be positioned between the section header ("Estudiantes") and the statistics bar (StatsBar)
   - Must contain a search input field with appropriate styling
   - Must have a search icon (magnifying glass) inside the input
   - Must include a clear button (X icon) when search has text
   - Must have a placeholder text: "Buscar por factura o cliente..." (as shown in the reference image)
   - Must be responsive and match the existing design system (Shadcn UI)

2. **Search Input**
   - Must accept text input from the user
   - Must show a search icon on the left side
   - Must show a clear button (X) on the right side when input has text
   - Must implement 800ms debounce before triggering search
   - Must trigger search automatically as user types (after debounce)
   - Must clear search when X button is clicked
   - Must be accessible (proper ARIA labels)

### Backend Integration

3. **GraphQL Query Update**
   - Must update the existing `GET_STUDENTS` query to accept a `$search` parameter
   - Query signature: `query GetStudents($page: Int, $limit: Int, $search: String)`
   - Must pass the search string to the backend
   - Must handle empty/null search strings (return all students)

4. **Search Logic**
   - Must search across: firstName, lastName, and email fields
   - Must be case-insensitive
   - Must support partial matches
   - Must trim whitespace from search query before sending to backend
   - Backend responsibility: The actual search implementation is handled by the backend

### State Management

5. **Search State**
   - Must maintain search query state in the Students page component
   - Must implement debounce logic (800ms delay)
   - Must reset to page 1 whenever search query changes
   - Must preserve search query when navigating between pages of results
   - Must clear search state when clear button is clicked

6. **Loading States**
   - Must show the existing table skeleton during search operations
   - Must maintain stats skeleton independently (stats query not affected by search)
   - Must not block the UI while search is debouncing

### Pagination Behavior

7. **Pagination Reset**
   - Must automatically reset to page 1 when a new search query is entered
   - Must maintain current page when navigating results of a search
   - Must show appropriate pagination based on filtered results
   - Must disable "next page" button if no more filtered results exist

### User Feedback

8. **Visual Feedback**
   - Must show table skeleton while search request is in progress
   - Must show "No results found" state if search returns empty results
   - Must show appropriate pagination information (e.g., "Showing 1-25 of 150 results")

---

## Non-Goals (Out of Scope)

1. **Advanced Filters** - Date filters, amount filters, and other filter options will be added in future iterations. This PRD focuses only on the search input.
2. **Search Suggestions/Autocomplete** - No dropdown with suggested results while typing
3. **Search History** - Not storing or showing previous search queries
4. **Highlighting Matches** - Not highlighting matched text in the results table
5. **Search Analytics** - Not tracking what users search for
6. **Export Filtered Results** - Export functionality remains unchanged (exports all, not just filtered)
7. **Saved Searches** - Users cannot save or bookmark search queries
8. **Backend Search Implementation** - The backend search logic is already implemented; this PRD focuses on frontend integration only

---

## Design Considerations

### UI/UX Requirements

- **Component Library:** Use Shadcn UI Input component with icon slots
- **Icons:** Use Lucide React icons (Search, X)
- **Layout:** The search row should be a separate component for reusability
- **Spacing:** Maintain consistent spacing with existing page elements (space-y-6 pattern)
- **Responsive Design:** Search input should be full-width on mobile, auto-width on desktop
- **Visual Hierarchy:** Search row should not compete with page header or stats

### Component Structure

```
<SearchFiltersRow>
  <SearchInput
    - icon: Search (left)
    - clearButton: X (right, conditional)
    - placeholder: "Buscar por nombre, apellido o email..."
    - debounce: 800ms
  />
  // Future: Additional filter components will go here
</SearchFiltersRow>
```

### Reference Image
The user provided a reference image showing the desired layout with search and filter buttons (Fecha, Monto, Otros filtros, Exportar). For this iteration, only implement the search input.

---

## Technical Considerations

### Implementation Approach

1. **Create Search Component**
   - Location: `components/common/search-input.tsx` (reusable) or `modules/students/components/search-filters-row.tsx` (feature-specific)
   - Use controlled input with React state
   - Implement debounce using `useCallback` + `useEffect` or a custom `useDebounce` hook

2. **Update `useBackendPagination` Hook**
   - Add support for additional query variables (search)
   - Ensure page resets when search changes
   - Consider adding a `resetOnVariableChange` option

3. **Update Students Page**
   - Add search state (`useState` for search query)
   - Pass search query to `useBackendPagination` hook via `queryVariables`
   - Insert `<SearchFiltersRow>` between header and stats

4. **GraphQL Integration**
   - The query already accepts `$search: String` parameter
   - Ensure TypeScript types are updated to include optional search parameter
   - Update `PaginatedStudentsResponse` types if needed

### Dependencies

- **Existing:** Shadcn UI Input component
- **Existing:** Lucide React icons
- **Potential New:** Debounce utility (or use lodash.debounce)
- **Existing:** Apollo Client `useQuery` (already integrated in `useBackendPagination`)

### Performance Considerations

- **Debounce:** 800ms strikes a balance between responsiveness and API efficiency
- **Caching:** Leverage Apollo Client's cache-first policy for repeated searches
- **Request Cancellation:** Apollo Client handles cancellation of in-flight requests automatically
- **Empty Search:** Handle empty search strings gracefully (don't send request or send with null)

### Error Handling

- **Network Errors:** Show error toast if search request fails
- **Empty Results:** Display "No students found matching your search" message
- **Invalid Input:** Trim whitespace, handle special characters appropriately

---

## Success Metrics

1. **Functional Success:**
   - Users can search for students by name, last name, or email
   - Search results appear within 1 second of stopping typing (800ms debounce + request time)
   - Pagination resets correctly when search query changes
   - No unnecessary API calls are made while user is actively typing

2. **User Experience Success:**
   - Search input is intuitive and discoverable
   - Loading states provide clear feedback
   - Search results are accurate and relevant
   - Users can easily clear search and return to full list

3. **Technical Success:**
   - Code follows existing architecture patterns
   - Component is reusable for future features
   - No performance degradation on the Students page
   - Proper error handling is implemented
   - TypeScript types are complete and accurate

---

## Open Questions

1. **Search Scope:** Should the search also include phone number field if available?
   - *Recommendation:* Yes, if `phoneNumber` is displayed in the table, include it in search

2. **Empty State:** What should display when search returns 0 results?
   - *Recommendation:* Empty state component with "No students found" message and "Clear search" button

3. **Search on Initial Load:** Should the search parameter persist in URL query params?
   - *Recommendation:* Not required for MVP, but nice-to-have for future iteration (shareable search URLs)

4. **Minimum Search Length:** Should there be a minimum character requirement before searching?
   - *Recommendation:* No minimum (backend should handle efficiently), but consider 2-character minimum if performance issues arise

5. **Special Characters:** How should special characters be handled in search?
   - *Recommendation:* Allow all characters, backend should sanitize/escape as needed

---

## Implementation Checklist

- [ ] Create `search-filters-row.tsx` component with search input
- [ ] Implement debounce logic (800ms)
- [ ] Update `useBackendPagination` hook to support search parameter
- [ ] Modify Students page to integrate search row
- [ ] Update GraphQL query types to include search parameter
- [ ] Implement page reset logic when search changes
- [ ] Add clear button functionality
- [ ] Test with various search queries (empty, special chars, long strings)
- [ ] Verify loading states work correctly
- [ ] Ensure pagination works with filtered results
- [ ] Test responsive design on mobile/tablet
- [ ] Add proper accessibility attributes (ARIA labels)
- [ ] Document the search feature in code comments
- [ ] Manual QA testing with real data

---

**Document Version:** 1.0
**Created:** 2024
**Target Completion:** TBD





