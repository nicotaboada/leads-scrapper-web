# PRD: Tag Multiselect Component

## 1. Introduction/Overview

The Tag Multiselect component is a reusable UI element that allows users to select multiple tags from a dropdown list. This component will be used in two main contexts:

1. **Contact Detail Page**: To assign/remove tags from a contact with auto-save functionality
2. **Contacts Table Filter**: To filter contacts by selected tags

The component displays selected tags as chips with color indicators and provides a searchable dropdown for selecting available tags.

---

## 2. Goals

1. **Provide a reusable multiselect component** for tags across the application
2. **Enable quick tag assignment** to contacts with minimal clicks
3. **Support filtering contacts by tags** in the contacts table
4. **Maintain visual consistency** with existing UI patterns (similar to the reference images)

---

## 3. User Stories

### US-1: Select Tags from Dropdown
**As a** user  
**I want to** see a dropdown with all available tags  
**So that** I can select multiple tags to assign or filter by

**Acceptance Criteria:**
- Clicking the select opens a dropdown with all available tags
- Each tag shows its name and color indicator (colored square)
- Tags are sorted alphabetically by name
- Checkboxes indicate selected/unselected state
- Multiple tags can be selected simultaneously

### US-2: Search/Filter Tags
**As a** user  
**I want to** search for tags by name  
**So that** I can quickly find the tag I'm looking for

**Acceptance Criteria:**
- A search input is visible at the top of the dropdown
- Typing filters the tag list in real-time
- Search is case-insensitive
- If no results, show "No tags found" message

### US-3: View Selected Tags as Chips
**As a** user  
**I want to** see my selected tags as chips in the input area  
**So that** I can easily see what's selected

**Acceptance Criteria:**
- Selected tags appear as chips inside the select area
- Each chip shows the tag name and color
- Each chip has an "X" button to remove the selection
- Chips wrap to multiple lines if needed

### US-4: Remove Tag Selection
**As a** user  
**I want to** remove a tag from my selection  
**So that** I can adjust my choices

**Acceptance Criteria:**
- Clicking the "X" on a chip removes the tag from selection
- Unchecking a tag in the dropdown removes it from selection
- The change is reflected immediately in the UI

### US-5: Auto-save Tags on Contact (Detail Page Context)
**As a** user  
**I want to** have my tag selections saved automatically  
**So that** I don't have to click a save button

**Acceptance Criteria:**
- When used in contact detail page, selections are saved automatically
- A loading indicator shows while saving
- Success/error feedback is displayed via toast

---

## 4. Functional Requirements

### 4.1 Component Structure
1. The component must be a self-contained, reusable React component
2. The component must accept props for:
   - `selectedTagIds`: Array of selected tag IDs
   - `onChange`: Callback when selection changes
   - `placeholder`: Optional placeholder text
   - `disabled`: Optional disabled state
3. The component must fetch available tags internally using GraphQL

### 4.2 Dropdown Behavior
4. Clicking the select area must open the dropdown
5. Clicking outside the dropdown must close it
6. The dropdown must show all available tags with checkboxes
7. Tags must be sorted alphabetically by name
8. Each tag row must display:
   - Checkbox (checked if selected)
   - Tag name
   - Color indicator (small colored square)

### 4.3 Search Functionality
9. A search input must be visible at the top of the dropdown
10. Typing must filter tags by name (case-insensitive)
11. Clearing the search must show all tags again
12. If no tags match the search, show "No se encontraron tags"

### 4.4 Selected Tags Display
13. Selected tags must appear as chips in the select area
14. Each chip must show:
    - Tag color (small colored circle/square)
    - Tag name
    - Remove button (X icon)
15. Clicking the X on a chip must deselect that tag
16. When no tags are selected, show the placeholder text

### 4.5 Auto-save Context (Contact Detail)
17. The component must accept an optional `onSave` callback for auto-save behavior
18. When `onSave` is provided, changes trigger the save callback
19. Loading state must be shown during save operations
20. Toast notifications must show success/error feedback

---

## 5. Non-Goals (Out of Scope)

The following are explicitly **NOT** part of this feature:

1. **Creating new tags from the multiselect** - Users must go to Tags page to create
2. **Drag-and-drop reordering of selected tags** - Order is not significant
3. **Tag grouping or categories** - All tags are flat
4. **Maximum selection limit** - Users can select any number of tags
5. **Backend implementation for contact-tag relationship** - This PRD covers only the frontend component

---

## 6. Design Considerations

### UI Components
- Use existing `Popover` component for the dropdown
- Use existing `Checkbox` component for selection
- Use existing `Input` component for search
- Use existing `Badge` or custom chip component for selected tags

### Visual Design (based on reference images)
- Selected tags as rounded chips with background color matching tag color or neutral
- Color indicator as small square (like in the reference) next to tag name
- Hover states on dropdown items
- Focus states for accessibility

### Color Display
| Tag Color | Hex Code  |
|-----------|-----------|
| Red       | `#C0392B` |
| Orange    | `#E67E22` |
| Green     | `#27AE60` |
| Blue      | `#2980B9` |
| Purple    | `#8E44AD` |

---

## 7. Technical Considerations

### Component Location
- Create at `modules/tags/components/tag-multiselect.tsx`
- Export from `modules/tags/components/index.ts`

### GraphQL
- Use existing `GET_TAGS` query to fetch available tags
- May need to create `GET_ALL_TAGS` query without pagination for this component

### Props Interface
```typescript
interface TagMultiselectProps {
  selectedTagIds: string[]
  onChange: (tagIds: string[]) => void
  onSave?: (tagIds: string[]) => Promise<void>
  placeholder?: string
  disabled?: boolean
  className?: string
}
```

### State Management
- Internal state for dropdown open/close
- Internal state for search query
- Tags data fetched via Apollo useQuery
- Selected state controlled by parent via props

### Integration Points
1. **Contact Detail Page**: Add component to contact sidebar/detail view
2. **Contacts Table**: Add as a filter option in the filters area

---

## 8. Success Metrics

1. **Usability**: Users can select/deselect tags in under 3 seconds
2. **Performance**: Dropdown opens in under 200ms
3. **Reliability**: Auto-save succeeds 99%+ of the time
4. **Adoption**: Component is used in at least 2 different contexts

---

## 9. Open Questions

1. Should the dropdown have a maximum height with scroll, or expand to fit all tags?
   - **Suggested**: Max height of ~300px with scroll
2. Should there be a "Clear all" option to deselect all tags at once?
   - **Suggested**: Yes, add a "Clear" link when tags are selected
3. When used as a filter, should it show the count of contacts per tag?
   - **Suggested**: No, keep it simple for now (future enhancement)

---

## 10. Implementation Order

Suggested order for implementation:

1. Create the base `TagMultiselect` component with static data
2. Add GraphQL query integration to fetch tags
3. Implement search/filter functionality
4. Add selected tags chip display with remove functionality
5. Implement auto-save behavior with loading states
6. Integrate into Contact Detail page
7. Integrate as filter in Contacts Table
8. Add accessibility improvements (keyboard navigation, ARIA)

