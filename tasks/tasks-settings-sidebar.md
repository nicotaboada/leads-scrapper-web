## Relevant Files

### Files to Create
- `lib/config/settings-nav.ts` - Configuration for settings sidebar navigation items
- `components/layouts/settings-sidebar.tsx` - Settings sidebar component with navigation
- `app/(authenticated)/settings/layout.tsx` - Layout wrapper for settings section with dual sidebar
- `app/(authenticated)/settings/tags/page.tsx` - Tags page moved to settings section

### Files to Modify
- `lib/config/routes.ts` - Update TAGS route to `/settings/tags`
- `lib/config/sidebar-nav.ts` - Remove Tags from main sidebar navigation
- `app/(authenticated)/settings/page.tsx` - Implement redirect to `/settings/tags`

### Files to Delete
- `app/(authenticated)/tags/page.tsx` - Old tags page (after migration)
- `app/(authenticated)/tags/` - Old tags directory

### Notes

- The settings sidebar should follow the same styling patterns as the main sidebar (Shadcn UI)
- Use `usePathname()` from Next.js to determine active state
- The redirect in settings page should be server-side using `redirect()` from `next/navigation`
- Ensure all existing Tags functionality (CRUD operations) works after migration

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/settings-sidebar`

- [ ] 1.0 Create settings navigation configuration
  - [ ] 1.1 Create new file `lib/config/settings-nav.ts`
  - [ ] 1.2 Import necessary icons from `lucide-react` (Tag icon)
  - [ ] 1.3 Import `NavItem` type from `types/sidebar`
  - [ ] 1.4 Define `settingsNavigationItems` array with Tags as first item
  - [ ] 1.5 Configure Tags item with id, label, href (`/settings/tags`), and icon

- [ ] 2.0 Create settings sidebar component
  - [ ] 2.1 Create new file `components/layouts/settings-sidebar.tsx`
  - [ ] 2.2 Add `'use client'` directive for client-side hooks
  - [ ] 2.3 Import `settingsNavigationItems` from config
  - [ ] 2.4 Import `usePathname` from `next/navigation`
  - [ ] 2.5 Import `Link` from `next/link`
  - [ ] 2.6 Create `SettingsSidebar` component with proper JSDoc documentation
  - [ ] 2.7 Implement sidebar container with fixed width (220-250px)
  - [ ] 2.8 Add header section with "Configuración" title
  - [ ] 2.9 Implement navigation list mapping over `settingsNavigationItems`
  - [ ] 2.10 Add active state detection using `pathname`
  - [ ] 2.11 Style navigation items with hover and active states
  - [ ] 2.12 Add right border to separate from content area

- [ ] 3.0 Create settings layout with dual sidebar structure
  - [ ] 3.1 Create new file `app/(authenticated)/settings/layout.tsx`
  - [ ] 3.2 Define `SettingsLayout` component accepting `children` prop
  - [ ] 3.3 Import `SettingsSidebar` component
  - [ ] 3.4 Implement flex container for sidebar + content layout
  - [ ] 3.5 Render `SettingsSidebar` as first child
  - [ ] 3.6 Render `children` in main content area with proper padding
  - [ ] 3.7 Ensure layout takes full height of available space

- [ ] 4.0 Move Tags page to settings section
  - [ ] 4.1 Create directory `app/(authenticated)/settings/tags/`
  - [ ] 4.2 Copy content from `app/(authenticated)/tags/page.tsx` to `app/(authenticated)/settings/tags/page.tsx`
  - [ ] 4.3 Review and update any relative imports if necessary
  - [ ] 4.4 Update metadata title to reflect new location (e.g., "Tags - Configuración")
  - [ ] 4.5 Verify all Tag-related imports resolve correctly

- [ ] 5.0 Update routes and navigation configuration
  - [ ] 5.1 Open `lib/config/routes.ts`
  - [ ] 5.2 Update `ROUTES.TAGS` value from `/tags` to `/settings/tags`
  - [ ] 5.3 Verify `PROTECTED_ROUTE_PREFIXES` includes `/settings`
  - [ ] 5.4 Open `lib/config/sidebar-nav.ts`
  - [ ] 5.5 Remove the Tags navigation item from `navigationItems` array
  - [ ] 5.6 Ensure Settings item remains with correct href

- [ ] 6.0 Implement redirect and cleanup
  - [ ] 6.1 Open `app/(authenticated)/settings/page.tsx`
  - [ ] 6.2 Import `redirect` from `next/navigation`
  - [ ] 6.3 Replace current page content with `redirect('/settings/tags')`
  - [ ] 6.4 Remove unnecessary imports and components from settings page
  - [ ] 6.5 Delete the old `app/(authenticated)/tags/` directory and its contents

- [ ] 7.0 Test and verify functionality
  - [ ] 7.1 Start development server and navigate to `/settings`
  - [ ] 7.2 Verify automatic redirect to `/settings/tags`
  - [ ] 7.3 Confirm settings sidebar is visible with "Configuración" header
  - [ ] 7.4 Verify Tags item shows as active in settings sidebar
  - [ ] 7.5 Confirm main sidebar shows "Configuración" as active
  - [ ] 7.6 Test creating a new tag
  - [ ] 7.7 Test editing an existing tag
  - [ ] 7.8 Test deleting a tag
  - [ ] 7.9 Verify `/tags` route no longer exists (should 404)
  - [ ] 7.10 Test sidebar navigation on mobile/responsive views
