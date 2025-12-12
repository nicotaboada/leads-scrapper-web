# PRD: FilterBy Component

## Introduction/Overview

The FilterBy component is a reusable, generic filter UI component designed to provide a consistent filtering experience across different tables in the application. It serves as a visual container and interaction pattern for applying filters, while remaining flexible enough to accommodate any type of filter content (text inputs, dropdowns, date pickers, multi-selects, etc.).

### Problem Statement
Currently, the application lacks a standardized way to add filters to tables. The `SearchFiltersRow` component only handles text search, but users need to filter by multiple criteria like dates, card types, amounts, statuses, etc. Each time a new filter is needed, developers would need to rebuild the same UI patterns (button states, dropdown menus, apply logic, clear functionality).

### Solution
Create a FilterBy component that provides the complete UI shell and interaction pattern for filters, allowing developers to simply pass in the specific filter controls as children. This component will handle the visual states (empty, active, selected) and user interactions (open/close, apply, clear), while delegating the actual filter logic to parent components.

## Goals

1. **Consistency**: Provide a unified filter UI/UX across all tables in the application
2. **Reusability**: Create a generic component that works with any filter type (date, dropdown, multi-select, etc.)
3. **Simplicity**: Make it easy for developers to add new filters without rebuilding UI patterns
4. **Flexibility**: Support multiple simultaneous filters on the same table
5. **Accessibility**: Ensure keyboard navigation and screen reader support
6. **Maintainability**: Centralize filter UI logic in one place for easier updates

## User Stories

### Primary User Story
**As a user**, I want to filter table data by various criteria (dates, types, statuses, amounts, etc.) so that I can quickly find the specific records I'm looking for.

### Detailed User Stories

1. **Adding a Filter**
   - As a user, when I see an inactive filter button with a plus icon, I should be able to click it to open a dropdown menu
   - As a user, when the dropdown opens, I should see a header indicating what I'm filtering by, the filter controls, and an "Aplicar" button
   - As a user, when I select filter criteria and click "Aplicar", the dropdown should close and the filter should become active

2. **Viewing Active Filters**
   - As a user, when a filter is active, I should see the plus icon change to an X icon
   - As a user, when a filter is active, I should see the border style change from dashed to solid
   - As a user, when a filter is active, I should see the selected filter value displayed on the right side of the button
   - As a user, I should be able to see all active filters at a glance

3. **Removing a Filter**
   - As a user, when I click the X icon on an active filter, the filter should be cleared immediately
   - As a user, when a filter is cleared, the button should return to its initial empty state
   - As a user, when a filter is cleared, the table should refresh with the filter removed

4. **Multiple Filters**
   - As a user, I should be able to have multiple filters active simultaneously
   - As a user, when multiple filters are active, the table should show only records matching all filter criteria (AND logic)

5. **Reapplying a Filter**
   - As a user, when I click an active filter button (not the X icon), I should be able to modify the filter criteria
   - As a user, when I change the filter and click "Aplicar" again, the table should update with the new criteria

## Functional Requirements

### Core Component Structure

1. **FR-1**: The FilterBy component MUST be a controlled component that receives filter state via props
2. **FR-2**: The component MUST accept a `label` prop for the filter name (e.g., "Correo electrónico", "Tarjeta", "Fecha de creación")
3. **FR-3**: The component MUST accept `children` as a render prop or React node containing the actual filter UI (inputs, dropdowns, etc.)
4. **FR-4**: The component MUST accept an `isActive` boolean prop to determine its visual state
5. **FR-5**: The component MUST accept a `selectedValue` prop (string or React node) to display the current filter selection
6. **FR-6**: The component MUST accept an `onApply` callback that fires when the user clicks "Aplicar"
7. **FR-7**: The component MUST accept an `onClear` callback that fires when the user clicks the X icon

### Visual States

8. **FR-8**: In the EMPTY state (no filter applied), the component MUST:
   - Display a Plus icon on the left
   - Display the filter label text
   - Use a dashed border style
   - Have a subtle background (using Empty component pattern)

9. **FR-9**: In the ACTIVE state (filter applied), the component MUST:
   - Display an X icon on the left (replacing the Plus icon)
   - Display the filter label text
   - Use a solid border style
   - Display the selected filter value on the right side
   - Maintain the same background

10. **FR-10**: The component MUST use the existing `Empty` component as the base container with `border-dashed` class

### Interaction Behavior

11. **FR-11**: When the user clicks the filter button (but not the X icon), a dropdown menu MUST open
12. **FR-12**: The dropdown menu MUST contain:
    - A header section with text "filtrar por: [filter name]"
    - The filter content area (children)
    - An "Aplicar" button at the bottom

13. **FR-13**: When the user clicks "Aplicar" with a filter selected:
    - The dropdown MUST close
    - The `onApply` callback MUST be fired
    - The component MUST transition to ACTIVE state
    - The selected value MUST be displayed

14. **FR-14**: When the user clicks the X icon on an active filter:
    - The `onClear` callback MUST be fired immediately
    - The component MUST transition back to EMPTY state
    - The dropdown MUST remain closed

15. **FR-15**: When the user clicks outside the dropdown menu, it MUST close without applying changes

16. **FR-16**: When the dropdown is open and the user presses Escape key, it MUST close without applying changes

### Accessibility Requirements

17. **FR-17**: The filter button MUST have proper ARIA labels indicating its purpose
18. **FR-18**: The X icon button MUST have an aria-label like "Eliminar filtro de [filter name]"
19. **FR-19**: The component MUST support keyboard navigation (Tab, Enter, Escape)
20. **FR-20**: The dropdown MUST have proper focus management (focus trap when open)
21. **FR-21**: Screen readers MUST announce filter state changes (active/inactive)

### Integration Requirements

22. **FR-22**: The component MUST be placed in `components/common/` directory
23. **FR-23**: The component MUST integrate seamlessly with `SearchFiltersRow` component
24. **FR-24**: The component MUST work independently (not depend on specific table implementations)
25. **FR-25**: The component MUST use existing UI primitives (Button, DropdownMenu, Empty) from shadcn/ui
26. **FR-26**: The component MUST follow the project's TypeScript and naming conventions

### Styling Requirements

27. **FR-27**: The component MUST use Tailwind CSS for all styling
28. **FR-28**: The component MUST be responsive and work on mobile devices
29. **FR-29**: The component MUST support dark mode
30. **FR-30**: The filter label MUST use consistent typography with other UI elements
31. **FR-31**: The selected value text MUST be visually distinct (e.g., different color or weight)

## Non-Goals (Out of Scope)

The following are explicitly **NOT** part of this feature:

1. **Filter Logic**: This component does NOT handle actual data filtering, querying, or API calls
2. **Filter State Management**: This component does NOT manage filter state internally (it's a controlled component)
3. **URL Synchronization**: This component does NOT sync filter state to URL query parameters (this will be handled by parent or future hooks)
4. **Specific Filter Types**: This component does NOT include built-in date pickers, dropdowns, or other specific filter controls (those are passed as children)
5. **Multi-Table State**: This component does NOT manage state across multiple tables (a future hook may handle this)
6. **Validation**: This component does NOT validate filter inputs (parent components handle validation)
7. **Loading States**: This component does NOT show loading spinners while data is being filtered
8. **Filter Presets**: This component does NOT support saving/loading filter presets
9. **Advanced Logic**: This component does NOT support OR logic, nested conditions, or complex filter combinations
10. **Mobile-Specific UI**: This component does NOT provide a different mobile-specific UI (it adapts the same component)

## Design Considerations

### UI/UX Reference
The design follows the pattern shown in the provided screenshots (Stripe-like filter interface):
- Pill-shaped buttons with icons
- Dropdown menus with header, content, and action button
- Clean, minimal design with clear visual states
- Consistent spacing and typography

### Component Composition
```tsx
<FilterBy
  label="Tarjeta"
  isActive={hasCardFilter}
  selectedValue={cardFilter ? "tiene una tarjeta activa" : undefined}
  onApply={() => handleApplyFilter(cardFilter)}
  onClear={() => handleClearCardFilter()}
>
  <Select value={cardFilter} onValueChange={setCardFilter}>
    <SelectTrigger>
      <SelectValue placeholder="Seleccionar estado" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="active">tiene una tarjeta activa</SelectItem>
      <SelectItem value="inactive">no tiene tarjeta</SelectItem>
    </SelectContent>
  </Select>
</FilterBy>
```

### Integration with SearchFiltersRow
The FilterBy components will be placed after the search input within the SearchFiltersRow component:

```tsx
<SearchFiltersRow searchValue={search} onSearchChange={setSearch}>
  <FilterBy label="Correo electrónico" {...emailFilterProps}>
    {/* Email filter UI */}
  </FilterBy>

  <FilterBy label="Tarjeta" {...cardFilterProps}>
    {/* Card filter UI */}
  </FilterBy>

  <FilterBy label="Fecha de creación" {...dateFilterProps}>
    {/* Date filter UI */}
  </FilterBy>
</SearchFiltersRow>
```

### Visual States Diagram
```
EMPTY STATE:
┌─────────────────────────┐
│ ⊕ Correo electrónico    │ (dashed border)
└─────────────────────────┘

ACTIVE STATE:
┌─────────────────────────────────────┐
│ ⊗ Correo electrónico  es example@... │ (solid border)
└─────────────────────────────────────┘

DROPDOWN OPEN:
┌─────────────────────────┐
│ ⊕ Correo electrónico    │
└─────────────────────────┘
        ↓
┌───────────────────────────────┐
│ filtrar por: correo electr... │ (header)
├───────────────────────────────┤
│ [Filter UI Component Here]    │ (content)
│                               │
├───────────────────────────────┤
│         [Aplicar]             │ (button)
└───────────────────────────────┘
```

### Shadcn/UI Components to Use
- **DropdownMenu**: For the filter dropdown functionality
- **Button**: For the "Aplicar" button
- **Empty**: For the base container styling (dashed border)
- **Icons** (from lucide-react): Plus, X

## Technical Considerations

### Dependencies
- React 18+ (for event handling and hooks)
- Tailwind CSS (for styling)
- Radix UI Dropdown Menu (via shadcn/ui)
- lucide-react (for icons)
- class-variance-authority (for variant management, if needed)

### Project Structure
```
components/
├── common/
│   ├── filter-by.tsx          # New FilterBy component
│   ├── search-filters-row.tsx # Updated to include FilterBy slots
│   └── table-empty-state.tsx  # Existing
└── ui/
    ├── empty.tsx              # Existing
    └── input.tsx              # Existing
```

Future structure for specific filters:
```
components/
├── common/
│   └── filter-by.tsx
└── filters/                   # Future directory for specific filter implementations
    ├── email-filter.tsx       # Uses FilterBy internally
    ├── date-filter.tsx        # Uses FilterBy internally
    ├── card-filter.tsx        # Uses FilterBy internally
    └── amount-filter.tsx      # Uses FilterBy internally
```

### TypeScript Interface
```typescript
interface FilterByProps {
  /** The display name of the filter (e.g., "Correo electrónico") */
  label: string

  /** Whether the filter is currently active/applied */
  isActive: boolean

  /** The display value when filter is active (e.g., "es ejemplo@mail.com") */
  selectedValue?: string | React.ReactNode

  /** Callback fired when user clicks "Aplicar" */
  onApply: () => void

  /** Callback fired when user clicks the X icon to clear */
  onClear: () => void

  /** The filter UI content (inputs, dropdowns, etc.) */
  children: React.ReactNode

  /** Additional CSS classes for customization */
  className?: string

  /** Accessible label for screen readers */
  ariaLabel?: string
}
```

### State Management Pattern
The FilterBy component is **controlled** - it doesn't manage filter values internally. Parent components (or future custom hooks) manage the actual filter state:

```typescript
// Parent component example
const [cardFilterValue, setCardFilterValue] = useState<string>('')

const handleApplyCardFilter = () => {
  // Update URL params, trigger API call, etc.
  applyFilter('card', cardFilterValue)
}

const handleClearCardFilter = () => {
  setCardFilterValue('')
  removeFilter('card')
}

return (
  <FilterBy
    label="Tarjeta"
    isActive={!!cardFilterValue}
    selectedValue={cardFilterValue}
    onApply={handleApplyCardFilter}
    onClear={handleClearCardFilter}
  >
    {/* Filter UI */}
  </FilterBy>
)
```

### Future Enhancement: Filter Management Hook
A future `useTableFilters` hook could be created to manage multiple filters for a table:

```typescript
// Future implementation
const {
  filters,
  setFilter,
  clearFilter,
  clearAllFilters,
  activeFiltersCount
} = useTableFilters({
  table: 'students',
  syncWithUrl: true
})
```

### Performance Considerations
- Use `React.memo` if the component re-renders unnecessarily
- The dropdown should only render when open (lazy rendering)
- Avoid inline function definitions in props (use useCallback if needed)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Keyboard navigation support required

## Success Metrics

### Development Metrics
1. **Developer Adoption**: New filters should be implementable in < 10 minutes
2. **Code Reduction**: Reduce filter UI code by 70% compared to building from scratch
3. **Consistency**: 100% of new table filters use this component

### User Experience Metrics
1. **Usability**: Users can successfully apply a filter within 3 clicks
2. **Discoverability**: 80%+ of users find and use filters without instruction
3. **Satisfaction**: Positive feedback on filter UX in user testing

### Technical Metrics
1. **Performance**: Filter UI renders in < 50ms
2. **Accessibility**: WCAG 2.1 AA compliance (score 100 on Lighthouse Accessibility)
3. **Bundle Size**: Component adds < 2KB to bundle (gzipped)

### Validation Criteria
- [ ] Component passes all unit tests
- [ ] Component works with at least 3 different filter types (text, dropdown, date)
- [ ] Component supports keyboard navigation
- [ ] Component works in light and dark modes
- [ ] Component is responsive on mobile devices
- [ ] Documentation and usage examples are complete

## Implementation Phases

### Phase 1: Core Component (Week 1)
- Create FilterBy component structure
- Implement empty and active states
- Implement dropdown menu with header and apply button
- Add icon switching (Plus/X)
- Add border style changes

### Phase 2: Interactions (Week 1)
- Implement onApply callback
- Implement onClear callback
- Add click-outside-to-close behavior
- Add Escape key support
- Handle focus management

### Phase 3: Integration (Week 2)
- Update SearchFiltersRow to support FilterBy children
- Create example implementations (email, card, date filters)
- Test with existing tables (Students table)
- Add TypeScript types and documentation

### Phase 4: Polish & Testing (Week 2)
- Add accessibility features (ARIA labels, keyboard nav)
- Test on mobile devices
- Add dark mode support
- Write unit tests
- Create usage documentation

## Open Questions

1. **Dropdown Width**: Should the dropdown menu:
   - Match the trigger button width?
   - Have a fixed minimum/maximum width?
   - Auto-size based on content?

   **Recommendation**: Fixed width (e.g., 280px) for consistency, adjustable via prop if needed

2. **Multiple Value Display**: For filters with multiple selections (e.g., "Active, Inactive, Pending"), how should we display the selected value?
   - Comma-separated: "Active, Inactive, Pending"
   - Count: "3 seleccionados"
   - First + count: "Active y 2 más"

   **Recommendation**: Let parent control via `selectedValue` prop (flexible)

3. **Empty State Message**: Should there be a message when no filter criteria is selected inside the dropdown?

   **Recommendation**: Not in the component itself - let children handle their own empty states

4. **Animation**: Should state transitions be animated?
   - Border style change (dashed to solid)
   - Icon change (Plus to X)
   - Dropdown open/close

   **Recommendation**: Yes, subtle animations (150-200ms) for better UX

5. **Mobile Behavior**: On mobile, should the dropdown be a full-screen modal or remain a dropdown?

   **Recommendation**: Keep as dropdown on mobile, but ensure touch targets are large enough (min 44x44px)

6. **Filter Validation**: If a user opens the dropdown but doesn't select anything, should "Aplicar" be disabled?

   **Recommendation**: No - let parent components handle validation. "Aplicar" always enabled.

7. **Keyboard Shortcuts**: Should there be keyboard shortcuts for common actions?
   - Enter to apply (when dropdown is open)
   - Delete/Backspace to clear (when button is focused)

   **Recommendation**: Yes, Enter to apply is expected. Clear via keyboard needs careful implementation to avoid conflicts.

## References

- **Design Pattern**: Stripe's filter UI pattern (as shown in provided screenshots)
- **Similar Components**:
  - Shadcn/ui Command component (for inspiration on dropdown patterns)
  - Shadcn/ui Popover component (for positioning and interaction)
- **Accessibility Guidelines**:
  - [ARIA Authoring Practices - Dropdown](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
  - [WCAG 2.1 - Keyboard Accessible](https://www.w3.org/WAI/WCAG21/Understanding/keyboard-accessible)

---

**Document Version**: 1.0
**Created**: November 30, 2025
**Last Updated**: November 30, 2025
**Status**: Draft - Ready for Implementation
