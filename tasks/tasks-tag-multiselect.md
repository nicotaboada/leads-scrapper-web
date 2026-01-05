# Tasks: Tag Multiselect Component

## Relevant Files

### New Files to Create
- `modules/tags/components/tag-multiselect.tsx` - Main multiselect component
- `modules/tags/components/tag-chip.tsx` - Individual tag chip component
- `modules/tags/hooks/use-all-tags.ts` - Hook to fetch all tags (no pagination)
- `modules/tags/graphql/queries.ts` - Add GET_ALL_TAGS query

### Files to Modify
- `modules/contacts/components/contact-sidebar.tsx` - Add tag multiselect
- `modules/contacts/components/person-detail.tsx` - Integrate tags section
- `modules/contacts/components/company-detail.tsx` - Integrate tags section
- `app/(authenticated)/contacts/page.tsx` - Add tag filter
- `modules/contacts/components/contacts-table.tsx` - Support tag filtering

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- This feature is frontend-only (component development)
- Backend relationship between contacts and tags will be a separate feature

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

---

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch: `git checkout -b feature/tag-multiselect`

- [x] 1.0 Create base TagMultiselect component structure
  - [x] 1.1 Create `modules/tags/components/tag-multiselect.tsx` with basic structure
  - [x] 1.2 Define TypeScript interface `TagMultiselectProps` with: selectedTagIds, onChange, onSave?, placeholder?, disabled?, className?
  - [x] 1.3 Implement basic Popover structure with trigger button and content area
  - [x] 1.4 Add dropdown state management (open/close)
  - [x] 1.5 Style the trigger to show placeholder when no tags selected
  - [x] 1.6 Add click outside to close dropdown behavior

- [x] 2.0 Implement tag fetching and search functionality
  - [x] 2.1 Add `GET_ALL_TAGS` query to `modules/tags/graphql/queries.ts` (fetch all tags without pagination)
  - [x] 2.2 Create `modules/tags/hooks/use-all-tags.ts` hook using useQuery
  - [x] 2.3 Integrate useAllTags hook in TagMultiselect component
  - [x] 2.4 Add search input at the top of the dropdown
  - [x] 2.5 Implement local filtering of tags by search query (case-insensitive)
  - [x] 2.6 Display filtered tags as list with checkboxes
  - [x] 2.7 Show tag color indicator (small colored square) next to each tag name
  - [x] 2.8 Sort tags alphabetically by name
  - [x] 2.9 Show "No se encontraron tags" when search has no results
  - [x] 2.10 Show loading skeleton while fetching tags

- [x] 3.0 Implement selected tags chip display with remove functionality
  - [x] 3.1 Create `modules/tags/components/tag-chip.tsx` component
  - [x] 3.2 Style chip with tag color, name, and X button
  - [x] 3.3 Display selected tags as chips in the trigger area
  - [x] 3.4 Implement chip X button to remove tag from selection
  - [x] 3.5 Handle checkbox toggle in dropdown to add/remove tags
  - [x] 3.6 Call onChange callback when selection changes
  - [x] 3.7 Style chips to wrap to multiple lines if needed
  - [x] 3.8 Add "Clear" button to remove all selected tags at once

- [x] 4.0 Implement auto-save behavior and loading states
  - [x] 4.1 Implement onSave callback trigger when selection changes
  - [x] 4.2 Add loading state during save operation
  - [x] 4.3 Show loading indicator on the component during save
  - [x] 4.4 Disable interactions while saving
  - [ ] 4.5 Show success toast after successful save (to be added when integrated)
  - [ ] 4.6 Show error toast if save fails (to be added when integrated)
  - [x] 4.7 Handle optimistic updates (update UI before save completes)

- [ ] 5.0 Integrate component into Contact Detail page
  - [ ] 5.1 Review current contact detail page structure (person-detail.tsx, company-detail.tsx)
  - [ ] 5.2 Add TagMultiselect to contact sidebar or appropriate section
  - [ ] 5.3 Wire up selectedTagIds from contact data (placeholder for now, backend not ready)
  - [ ] 5.4 Implement onSave to call future mutation (stub for now)
  - [ ] 5.5 Add "Tags" label/section header above the multiselect
  - [ ] 5.6 Test create, select, and remove tags flow

- [ ] 6.0 Integrate component as filter in Contacts Table
  - [ ] 6.1 Review current contacts page filter structure
  - [ ] 6.2 Add TagMultiselect as a filter option in the filters area
  - [ ] 6.3 Wire up filter state to selectedTagIds
  - [ ] 6.4 Update contacts query variables to include tag filter (when backend supports it)
  - [ ] 6.5 Do NOT use onSave for filter context (only onChange)
  - [ ] 6.6 Test filtering contacts by tags
