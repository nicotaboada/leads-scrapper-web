# Tasks: FilterBy Component

## Relevant Files

- `components/common/filter-by.tsx` - Main FilterBy reusable component
- `components/common/search-filters-row.tsx` - Updated to support FilterBy children slots
- `components/ui/button.tsx` - Existing button component (verify exists)
- `components/ui/dropdown-menu.tsx` - Existing dropdown component (verify exists or install from shadcn)
- `components/ui/empty.tsx` - Existing empty component for base styling

### Notes

- The FilterBy component will be placed in `components/common/` as specified in the PRD
- Future specific filter implementations will go in `components/filters/` directory
- Component uses shadcn/ui primitives (DropdownMenu, Button, Empty)
- Component is fully controlled - parent manages filter state

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch (feature/filter-by-component)
- [x] 1.0 Set up component foundation and verify dependencies
  - [x] 1.1 Check if DropdownMenu component exists in components/ui/
  - [x] 1.2 If not exists, install DropdownMenu from shadcn/ui CLI
  - [x] 1.3 Verify Button component exists in components/ui/
  - [x] 1.4 Verify Empty component structure is compatible
  - [x] 1.5 Verify lucide-react icons (Plus, X) are available
- [x] 2.0 Create FilterBy core component structure
  - [x] 2.1 Create components/common/filter-by.tsx file
  - [x] 2.2 Define TypeScript interface FilterByProps with all required props
  - [x] 2.3 Create basic functional component structure
  - [x] 2.4 Add comprehensive JSDoc documentation
  - [x] 2.5 Set up component state for dropdown open/close
- [x] 3.0 Implement visual states (empty and active)
  - [x] 3.1 Implement EMPTY state: Plus icon, dashed border, label text
  - [x] 3.2 Implement ACTIVE state: X icon, solid border, label, selectedValue display
  - [x] 3.3 Add conditional rendering logic based on isActive prop
  - [x] 3.4 Style with Tailwind CSS following Empty component pattern
  - [x] 3.5 Ensure proper spacing and alignment
- [x] 4.0 Implement dropdown menu and interactions
  - [x] 4.1 Integrate DropdownMenu component from shadcn/ui
  - [x] 4.2 Create dropdown trigger (the filter button itself)
  - [x] 4.3 Implement dropdown header with "filtrar por: {label}" text
  - [x] 4.4 Add children render area inside dropdown for filter controls
  - [x] 4.5 Add "Aplicar" button at bottom of dropdown
  - [x] 4.6 Connect onApply callback to "Aplicar" button
  - [x] 4.7 Connect onClear callback to X icon button
  - [x] 4.8 Implement close dropdown on apply
  - [x] 4.9 Add proper dropdown positioning and width
- [x] 5.0 Integrate with SearchFiltersRow component
  - [x] 5.1 Read current SearchFiltersRow implementation
  - [x] 5.2 Update SearchFiltersRow to accept and render children
  - [x] 5.3 Add proper layout/spacing for filter buttons after search input
  - [x] 5.4 Test with a simple example FilterBy instance
- [x] 6.0 Add accessibility features and polish
  - [x] 6.1 Add aria-label to main filter button
  - [x] 6.2 Add aria-label to X icon clear button
  - [x] 6.3 Ensure keyboard navigation works (Tab, Enter, Escape)
  - [x] 6.4 Test and verify dark mode support
  - [x] 6.5 Add subtle animations for state transitions (150-200ms)
  - [x] 6.6 Test responsive behavior on mobile
  - [x] 6.7 Final code review and cleanup
