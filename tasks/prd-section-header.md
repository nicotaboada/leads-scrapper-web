# Product Requirements Document: Section Header Component

## Introduction/Overview

Create a reusable section header component that will be used across multiple authenticated layouts to provide consistent page titles, subtitles, and action buttons. This component will replace the current header implementation in the Dashboard page and be used in all other sections (Users, Classes, Finanzas, etc.).

The component standardizes the visual presentation of page headers while maintaining flexibility for different use cases through optional props and custom styling.

## Goals

1. Create a reusable, consistent header component for all authenticated sections
2. Reduce code duplication across different page layouts
3. Provide a responsive design that works seamlessly on mobile and desktop
4. Support optional action buttons with icons for common page actions
5. Maintain the existing visual design established in the Dashboard page
6. Allow styling customization through className props

## User Stories

1. As a developer, I want to use a single header component across all pages so that I don't have to rewrite the same layout structure repeatedly.

2. As a user, I want to see consistent page headers across all sections so that the application feels cohesive and professional.

3. As a mobile user, I want the header to adapt to my screen size so that all information and actions are easily accessible.

4. As a developer, I want to add action buttons (like "Nueva Venta", "Add User", "Export") to page headers so that users can access primary actions quickly.

5. As a developer, I want to customize the styling of specific headers when needed so that I can handle edge cases without creating new components.

## Functional Requirements

### Core Functionality

1. The component must accept a required `title` prop (string) that displays as the main heading.

2. The component must accept an optional `subtitle` prop (string) that displays below the title when provided.

3. The component must accept optional `actions` prop that can render multiple action buttons.

4. The component must use the following styling from the Dashboard page:
   - Title: `text-3xl font-bold text-gray-900 dark:text-white`
   - Subtitle: `mt-2 text-sm text-gray-600 dark:text-gray-400`
   - Container: `mb-8`

5. The component must be located in `components/layouts/` directory and named `section-header.tsx`.

### Responsive Behavior

6. On mobile devices (< 768px):
   - The title and actions must stack vertically
   - The title section must take full width
   - Action buttons must appear below the title/subtitle

7. On desktop devices (≥ 768px):
   - The title and actions must be displayed horizontally
   - The title section must be aligned to the left
   - Action buttons must be aligned to the right
   - Both sections must be vertically centered

### Action Buttons

8. The action buttons must support icons alongside text.

9. Multiple action buttons must be supported (e.g., "Export" and "Add New").

10. Action buttons must be optional - the component works without any actions.

11. Action buttons should use the existing Button component from `components/ui/button.tsx`.

### Customization

12. The component must accept a `className` prop to customize the container styling.

13. The component must accept a `titleClassName` prop to customize the title styling.

14. The component must accept a `subtitleClassName` prop to customize the subtitle styling.

15. Custom classNames should merge with default classNames, not replace them entirely.

### TypeScript

16. The component must have a properly typed TypeScript interface defining all props.

17. All props except `title` must be optional.

18. The component must export its props interface for reuse.

## Non-Goals (Out of Scope)

1. **Breadcrumb navigation** - This component does not include breadcrumbs. A separate component should be created if needed.

2. **Tab navigation** - This component does not handle tab-based navigation within a section.

3. **Search functionality** - Any search bars should be implemented separately.

4. **Dropdown menus in the header** - While action buttons are supported, complex dropdown menus should be handled by the consumer.

5. **Dynamic subtitle with React nodes** - Subtitle only accepts strings. If complex content is needed, consumers can build their own header.

6. **Animation or transitions** - The component is static; no animations are included.

7. **Different size variants** - The component uses a single size variant matching the dashboard design.

## Design Considerations

### Visual Design

- **Current reference**: The styling matches the header in `app/(authenticated)/dashboard/page.tsx` (lines 28-35)
- **Typography**: Uses Tailwind's text size and weight utilities
- **Dark mode**: Fully supports dark mode with appropriate color variants
- **Spacing**: Consistent margin bottom (`mb-8`) to separate from page content

### Component Structure

```
<SectionHeader>
  <Content (title + subtitle)>     <Actions (buttons)>

  Mobile: Stacked
  ┌─────────────────────┐
  │ Title               │
  │ Subtitle            │
  │ [Button] [Button]   │
  └─────────────────────┘

  Desktop: Horizontal
  ┌───────────────────────────────────┐
  │ Title              [Button] [Btn] │
  │ Subtitle                          │
  └───────────────────────────────────┘
```

### Usage Example

```typescript
// Simple header with just a title
<SectionHeader title="Dashboard" />

// Header with title and subtitle
<SectionHeader
  title="Dashboard"
  subtitle="Welcome back, user@example.com"
/>

// Header with title and action buttons
<SectionHeader
  title="Ventas"
  actions={
    <>
      <Button variant="outline">
        <DownloadIcon className="mr-2 h-4 w-4" />
        Exportar
      </Button>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" />
        Nueva Venta
      </Button>
    </>
  }
/>

// Header with custom styling
<SectionHeader
  title="Users"
  subtitle="Manage system users"
  className="mb-12"
  titleClassName="text-4xl"
  actions={<Button>Add User</Button>}
/>
```

## Technical Considerations

### Dependencies

- Must use existing `components/ui/button.tsx` component
- Should use Tailwind CSS utility classes for styling
- Must follow the project's naming conventions (kebab-case for files, PascalCase for components)

### File Structure

```
components/
  layouts/
    app-header.tsx        # (existing)
    app-layout.tsx        # (existing)
    app-sidebar.tsx       # (existing)
    section-header.tsx    # (NEW)
```

### Integration Points

1. **Dashboard page**: Replace existing header markup with `<SectionHeader>`
2. **Other pages**: Use `<SectionHeader>` in Users, Classes, Teachers, Students, Settings, Finanzas pages
3. **Future pages**: All new authenticated pages should use this component

### Utility Function

- Use the `merge()` utility from `lib/utils/merge.ts` to combine custom classNames with defaults

### TypeScript Interface Example

```typescript
interface SectionHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}
```

## Success Metrics

1. **Code Reduction**: Reduce header-related code duplication by at least 80% across pages
2. **Consistency**: All authenticated pages use the same header component
3. **Developer Adoption**: New pages use `<SectionHeader>` instead of custom markup
4. **Accessibility**: Component passes accessibility checks (proper heading hierarchy, keyboard navigation)
5. **Responsive Design**: Component works correctly on mobile (320px), tablet (768px), and desktop (1024px+) viewports

## Open Questions

1. Should the component support different heading levels (h1, h2, h3) or always use h1?
   - **Recommendation**: Default to h1, but add an optional `as` prop for flexibility

2. Should action buttons have a maximum number or layout restriction?
   - **Recommendation**: No hard limit, but document that too many buttons will cause layout issues

3. Should we add loading states for the action buttons?
   - **Recommendation**: No, button loading states should be handled by the Button component itself

4. Should the component include a divider/separator after the header?
   - **Recommendation**: No, this should be handled by consumers if needed

5. Do we need to support right-to-left (RTL) languages?
   - **Recommendation**: Not in initial version, but ensure the layout structure allows for future RTL support






