# Task List: Card Tabs Component

## Relevant Files

- `components/ui/card-tabs.tsx` - Main CardTabs component with card container, tab navigation, and animations
- `components/ui/card.tsx` - Card component for container styling (may need to be created or verified)
- `app/(authenticated)/students/[id]/page.tsx` - Student detail page where the component will be used first
- `components/ui/tabs.tsx` - Existing tabs component for reference
- `components/ui/motion-tabs.tsx` - Existing motion tabs for animation patterns reference
- `modules/students/components/student-info-tab.tsx` - Tab content component (existing)
- `modules/students/components/student-progress-tab.tsx` - Tab content component (existing)
- `modules/students/components/student-payments-tab.tsx` - Tab content component (existing)

### Notes

- The component should be built using Radix UI Tabs primitives for accessibility
- Use motion/framer-motion for smooth animations
- Follow the shadcn/ui design pattern with full-width border separator
- Ensure the component is reusable across different detail pages
- Test keyboard navigation and accessibility features

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature (e.g., `git checkout -b feature/card-tabs`)
- [x] 1.0 Analyze existing implementations and setup
  - [x] 1.1 Read `components/ui/tabs.tsx` to understand current tabs implementation
  - [x] 1.2 Read `components/ui/motion-tabs.tsx` to understand animation patterns
  - [x] 1.3 Check if `components/ui/card.tsx` exists, if not check what card styling is available
  - [x] 1.4 Review current student detail page implementation to understand usage context
- [x] 2.0 Create CardTabs component structure and TypeScript types
  - [x] 2.1 Create new file `components/ui/card-tabs.tsx`
  - [x] 2.2 Define TypeScript interface for tab items: `{ value: string, label: string, content: ReactNode }`
  - [x] 2.3 Define TypeScript interface for CardTabs props (tabs, defaultValue, value, onValueChange, className)
  - [x] 2.4 Set up basic component structure with proper imports (React, Radix UI, motion)
  - [x] 2.5 Add JSDoc documentation for the component and its props
- [x] 3.0 Implement card container with proper styling
  - [x] 3.1 Create card wrapper div with proper Tailwind classes (border, shadow, rounded corners, background)
  - [x] 3.2 Apply proper padding to card container
  - [x] 3.3 Ensure card is responsive across mobile, tablet, and desktop
  - [x] 3.4 Support custom className prop for additional styling
- [x] 4.0 Implement tab navigation with full-width border separator
  - [x] 4.1 Integrate Radix UI Tabs.Root with controlled/uncontrolled state support
  - [x] 4.2 Create tabs list container with proper layout (flexbox, left-aligned)
  - [x] 4.3 Add full-width border-bottom separator using Tailwind border utilities
  - [x] 4.4 Implement tab triggers using Radix UI Tabs.Trigger
  - [x] 4.5 Style tab triggers (text color, spacing, hover states)
  - [x] 4.6 Ensure inactive tabs have muted text, active tabs have foreground text
- [x] 5.0 Implement animated underline indicator
  - [x] 5.1 Set up state and refs for tracking tab positions (useState, useRef)
  - [x] 5.2 Create useLayoutEffect to measure active tab position and width
  - [x] 5.3 Create motion.div for animated underline with layoutId
  - [x] 5.4 Position underline absolutely below active tab
  - [x] 5.5 Configure spring animation (stiffness: 400, damping: 40)
  - [x] 5.6 Style underline with primary color and proper height (h-0.5 or similar)
  - [x] 5.7 Ensure underline animates smoothly when switching tabs
- [x] 6.0 Implement tab content rendering and state management
  - [x] 6.1 Map through tabs array to render Radix UI Tabs.Content for each tab
  - [x] 6.2 Render tab content with proper spacing and padding
  - [x] 6.3 Ensure only active tab content is displayed
  - [x] 6.4 Handle controlled state (value/onValueChange props)
  - [x] 6.5 Handle uncontrolled state (defaultValue prop)
- [x] 7.0 Replace existing tabs implementation in student detail page
  - [x] 7.1 Update imports in `app/(authenticated)/students/[id]/page.tsx`
  - [x] 7.2 Replace current tabs implementation with CardTabs component
  - [x] 7.3 Transform current tabs structure to match CardTabs API (tabs array format)
  - [x] 7.4 Remove now-unused tab-related code (TabsList, TabsTrigger wrappers, motion underline logic)
  - [x] 7.5 Verify student tab content components still render correctly
- [ ] 8.0 Test component functionality and accessibility
  - [ ] 8.1 Start dev server and navigate to student detail page
  - [ ] 8.2 Verify card renders with proper styling (border, shadow, padding)
  - [ ] 8.3 Verify full-width border separator spans entire card width
  - [ ] 8.4 Verify animated underline appears under active tab
  - [ ] 8.5 Test tab switching by clicking different tabs
  - [ ] 8.6 Verify underline animates smoothly when switching tabs
  - [ ] 8.7 Test keyboard navigation (Tab key, Arrow keys, Enter/Space)
  - [ ] 8.8 Verify tab content changes when switching tabs
  - [ ] 8.9 Test responsive behavior on mobile, tablet, desktop
  - [ ] 8.10 Verify no console errors or warnings
- [x] 9.0 Documentation and cleanup
  - [x] 9.1 Add usage example in component JSDoc comments
  - [x] 9.2 Verify all TypeScript types are properly defined
  - [x] 9.3 Run linter and fix any errors
  - [x] 9.4 Remove any console.logs or debug code
  - [x] 9.5 Verify code follows project style guidelines (tabs, naming conventions)

