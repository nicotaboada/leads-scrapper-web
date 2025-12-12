# Task List: Section Header Component

## Relevant Files

- `components/layouts/section-header.tsx` - New reusable section header component
- `lib/utils/merge.ts` - Utility function for merging classNames (already exists)
- `components/ui/button.tsx` - Button component used for actions (already exists)
- `app/(authenticated)/dashboard/page.tsx` - First integration point, replace existing header markup

### Notes

- This component will be reused across all authenticated pages (Users, Classes, Teachers, Students, Settings, Finanzas)
- The component uses Tailwind CSS for styling and must support dark mode
- Custom classNames should merge with defaults using the `merge()` utility
- The component must be fully responsive with mobile-first design

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch named `feature/section-header`
- [x] 1.0 Create the SectionHeader component with core structure
  - [x] 1.1 Create new file `components/layouts/section-header.tsx`
  - [x] 1.2 Define TypeScript interface `SectionHeaderProps` with all required props (title, subtitle?, actions?, className?, titleClassName?, subtitleClassName?)
  - [x] 1.3 Create basic component structure with function declaration
  - [x] 1.4 Implement title rendering with default styling (`text-3xl font-bold text-gray-900 dark:text-white`)
  - [x] 1.5 Implement conditional subtitle rendering with default styling (`mt-2 text-sm text-gray-600 dark:text-gray-400`)
  - [x] 1.6 Add container div with default `mb-8` styling
  - [x] 1.7 Import and use `merge()` utility for className merging
- [x] 2.0 Implement responsive layout behavior
  - [x] 2.1 Create flex container for horizontal layout on desktop
  - [x] 2.2 Add responsive classes for mobile stacking (flex-col on mobile, flex-row on md+)
  - [x] 2.3 Implement left-aligned content section (title + subtitle)
  - [x] 2.4 Implement right-aligned actions section with proper spacing
  - [x] 2.5 Add vertical center alignment for desktop layout
  - [x] 2.6 Test responsive behavior at breakpoints (mobile < 768px, desktop >= 768px)
- [x] 3.0 Add TypeScript types and JSDoc documentation
  - [x] 3.1 Export `SectionHeaderProps` interface for external use
  - [x] 3.2 Add JSDoc comment to the component explaining its purpose
  - [x] 3.3 Add JSDoc comments for each prop explaining expected usage
  - [x] 3.4 Verify TypeScript strict mode compliance
- [x] 4.0 Integrate component into Dashboard page
  - [x] 4.1 Import `SectionHeader` component in `app/(authenticated)/dashboard/page.tsx`
  - [x] 4.2 Replace existing header markup (lines 28-35) with `<SectionHeader>` component
  - [x] 4.3 Pass `title="Dashboard"` prop
  - [x] 4.4 Pass `subtitle` prop with user email using template literal
  - [x] 4.5 Verify the page renders correctly with the new component
- [x] 5.0 Validate implementation against PRD requirements
  - [x] 5.1 Verify all 18 functional requirements from PRD are met
  - [x] 5.2 Test component with all prop variations (title only, title + subtitle, title + actions, all props)
  - [x] 5.3 Test custom className merging works correctly
  - [x] 5.4 Test dark mode styling
  - [x] 5.5 Test responsive behavior on mobile and desktop viewports
  - [x] 5.6 Check for any linter errors and fix if needed

