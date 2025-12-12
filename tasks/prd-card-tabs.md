# PRD: Card Tabs Component

## Introduction/Overview

The Card Tabs component is a reusable UI component that combines a card container with an integrated tab navigation system. This component addresses the need for a consistent, visually appealing way to organize tabbed content within detail pages (such as student details, teacher details, etc.).

The key visual requirement is that the tab navigation includes a full-width border separator that spans the entire card width, with an animated underline indicator showing the active tab - matching the shadcn/ui design pattern shown in the reference image.

**Problem it solves:** Currently, tabs and card containers are separate components. This leads to inconsistent styling and manual work to achieve the full-width border effect on tab navigation within cards. This component provides a unified, reusable solution.

## Goals

1. Create a reusable `CardTabs` component that can be used across detail pages in the application
2. Implement a card container that seamlessly integrates tab navigation with proper styling
3. Ensure the tab border separator spans the full width of the card
4. Maintain smooth animations for the active tab indicator
5. Follow shadcn/ui design patterns and the project's design system
6. Provide a developer-friendly API that's easy to use and understand

## User Stories

1. **As a developer**, I want to use a single component that handles both card styling and tab navigation, so I don't have to manually configure the layout each time.

2. **As a developer**, I want the full-width border to automatically span the card width, so I don't have to write custom CSS for each implementation.

3. **As a user**, I want to see smooth animations when switching between tabs, so the interface feels responsive and modern.

4. **As a user**, I want clear visual indication of which tab is active, so I always know what content I'm viewing.

5. **As a developer**, I want to pass custom content for each tab, so I can display different information sections (info, progress, payments, etc.).

## Functional Requirements

### Core Functionality

1. The component **must** render a card container with proper padding, borders, and shadows matching the existing design system.

2. The component **must** display a horizontal tab navigation at the top of the card.

3. The component **must** render a full-width border separator that spans the entire card width below the tab triggers.

4. The component **must** display an animated underline indicator under the active tab.

5. The component **must** animate the underline indicator smoothly when switching tabs using motion/framer-motion.

6. The component **must** allow developers to define multiple tabs with labels and content.

7. The component **must** support controlled tab state (value/onValueChange props).

8. The component **must** support uncontrolled tab state (defaultValue prop).

9. The component **must** render the content of the active tab below the tab navigation.

10. The component **must** be keyboard accessible (arrow keys to navigate tabs, Enter/Space to select).

### Styling Requirements

11. The card **must** use standard card styling from the design system (border, shadow, rounded corners, background).

12. The tabs **must** align to the left by default.

13. The active tab **must** have a colored underline indicator (using the primary color).

14. The full-width border separator **must** be a subtle color (border color from the design system).

15. The component **must** be responsive and work on mobile, tablet, and desktop.

16. Inactive tabs **must** have muted text color; active tab **must** have primary/foreground text color.

### API Requirements

17. The component **must** accept a `tabs` prop: an array of objects with `{ value: string, label: string, content: ReactNode }`.

18. The component **must** accept a `defaultValue` prop to set the initial active tab (uncontrolled).

19. The component **must** accept `value` and `onValueChange` props for controlled tab state.

20. The component **must** accept a `className` prop to allow custom styling of the card container.

21. The component **should** accept additional card props (e.g., padding variants) if needed.

### Animation Requirements

22. The underline indicator **must** animate smoothly when switching tabs (spring animation).

23. The animation **must** use `motion.div` from motion/framer-motion with layoutId for smooth transitions.

24. The animation timing **should** use: `{ type: 'spring', stiffness: 400, damping: 40 }` (or similar values for smooth feel).

## Non-Goals (Out of Scope)

1. **Custom tab icons** - The initial version will support text labels only. Icons can be added in a future iteration if needed.

2. **Vertical tabs** - Only horizontal tab layout is required.

3. **Scrollable tabs** - For the initial version, all tabs should fit in the available width. Horizontal scrolling for many tabs is out of scope.

4. **Nested tabs** - Tabs within tabs are not supported.

5. **Tab badges or notifications** - No support for badges (e.g., notification counts) on tabs in v1.

6. **Lazy loading of tab content** - All tab content will render; lazy loading is out of scope.

7. **Custom animations** - Only the specified spring animation is required; additional animation options are out of scope.

8. **Right-aligned or centered tabs** - Tabs will be left-aligned only.

## Design Considerations

### Reference Design

The component should replicate the shadcn/ui tab design shown in the reference image:
- Clean, minimal tab buttons with no background in inactive state
- Full-width gray border line under all tabs
- Colored underline indicator (only width of active tab text) positioned above the full-width border
- Proper spacing between tabs
- Card container with subtle shadow and border

### Visual Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ Card Container (border, shadow, padding)                │
│                                                          │
│ [Tab 1]  [Tab 2*]  [Tab 3]  [Tab 4]                    │
│          ▔▔▔▔▔▔▔   ← Active indicator (colored)        │
│ ──────────────────────────────────────────────────────  │ ← Full-width border
│                                                          │
│ [Tab Content Here]                                      │
│                                                          │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Component Composition

The component should be built using:
- `Card` component from shadcn/ui (or create a simple card wrapper)
- Radix UI Tabs primitives for accessibility
- Motion/framer-motion for animations
- Tailwind CSS for styling

### Usage Example

```tsx
<CardTabs
  defaultValue="info"
  tabs={[
    {
      value: 'info',
      label: 'Información',
      content: <StudentInfoTab student={student} />
    },
    {
      value: 'progress',
      label: 'Progreso',
      content: <StudentProgressTab student={student} />
    },
    {
      value: 'payments',
      label: 'Pagos',
      content: <StudentPaymentsTab />
    }
  ]}
/>
```

## Technical Considerations

### Dependencies

- `@radix-ui/react-tabs` - For accessible tab primitives (already in project)
- `motion/react` (framer-motion) - For animations (already in project)
- Tailwind CSS - For styling (already in project)

### File Location

- **Component file:** `components/ui/card-tabs.tsx`
- **Type definitions:** Define inline or in the component file

### Integration Points

- Should integrate with existing design system (colors, borders, shadows)
- Should work alongside existing components (Button, Card, etc.)
- Will be used initially in detail pages: `/students/[id]`, but designed to be reusable

### Performance Considerations

- Use `useLayoutEffect` for measuring tab positions (to avoid layout shift)
- Use `useRef` to store tab element references
- Memoize tab position calculations if needed
- Keep animations performant (avoid layout thrashing)

### Accessibility Requirements

- Must be keyboard navigable (Left/Right arrows, Home/End keys)
- Must have proper ARIA attributes (handled by Radix UI)
- Must have proper focus states
- Active tab must be clearly indicated for screen readers

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Support for CSS Grid and Flexbox required
- Support for CSS custom properties (CSS variables)

## Success Metrics

1. **Developer adoption:** Component is used in at least 3 different detail pages within 2 weeks of implementation.

2. **Code reduction:** Reduces code duplication by consolidating card + tabs pattern into a single component.

3. **Consistency:** All detail pages using tabs have consistent styling and behavior.

4. **Accessibility:** Component passes keyboard navigation tests and screen reader tests.

5. **Performance:** Tab switching animation feels smooth (60fps) on mid-range devices.

6. **Visual accuracy:** Component matches the reference shadcn/ui design (validated by design review or side-by-side comparison).

## Open Questions

1. Should the card padding be configurable (e.g., compact vs. default vs. spacious)?

2. Should we support a variant without the card container (just tabs with underline)?

3. Do we need to support disabled tabs in the initial version?

4. Should the component export sub-components (CardTabsTrigger, CardTabsContent) for more flexibility, or keep it simple with just the main component?

5. Should we add support for loading states while tab content is being fetched?

6. Do we need to handle very long tab labels (truncation or wrapping)?

---

## Implementation Notes for Developer

- Start by examining the current `motion-tabs.tsx` implementation for animation patterns
- Use the existing `Card` component from shadcn/ui if available, or create a simple wrapper with proper styling
- The full-width border should be a `border-b` on the tabs container
- The animated indicator should be positioned absolutely and use `layoutId` for smooth transitions
- Test with the student detail page first, then refactor other pages to use it
- Ensure TypeScript types are properly defined for the `tabs` prop

## Related Files

- Current implementation: `app/(authenticated)/students/[id]/page.tsx` (lines 68-88)
- Existing tabs: `components/ui/tabs.tsx`
- Motion tabs: `components/ui/motion-tabs.tsx`
- Student tab contents: `modules/students/components/`






