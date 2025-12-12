# Tasks: User Avatar Menu Component

## Relevant Files

- `modules/auth/components/user-avatar-menu.tsx` - Main user avatar menu component with popover and theme switcher
- `components/ui/avatar.tsx` - Shadcn UI Avatar component for displaying user initials
- `components/ui/popover.tsx` - Shadcn UI Popover component for the dropdown menu
- `app/login/actions.ts` - Server actions for authentication (add logout action)
- `components/layouts/app-header.tsx` - Application header where avatar will be integrated
- `hooks/use-current-user.ts` - Existing hook to get current user data

### Notes

- Shadcn UI components will be added using the CLI: `npx shadcn@latest add [component-name]`
- The component uses next-themes for theme management (already configured in the project)
- Avatar will use the first two letters of the user's email as initials
- Logout will redirect to /login page after successful sign out

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch `feature/user-avatar-menu`
- [ ] 1.0 Add required Shadcn UI components
  - [x] 1.1 Add Avatar component using `npx shadcn@latest add avatar`
  - [x] 1.2 Add Popover component using `npx shadcn@latest add popover`
  - [x] 1.3 Verify components were added correctly in `components/ui/`
- [x] 2.0 Create logout server action
  - [x] 2.1 Open `app/login/actions.ts`
  - [x] 2.2 Create `logoutAction` server action that signs out user and redirects to /login
  - [x] 2.3 Add proper JSDoc documentation to the logout action
  - [x] 2.4 Export the action for use in client components
- [x] 3.0 Create UserAvatarMenu component
  - [x] 3.1 Create file `modules/auth/components/user-avatar-menu.tsx`
  - [x] 3.2 Add 'use client' directive and import necessary dependencies
  - [x] 3.3 Implement helper function to get user initials from email
  - [x] 3.4 Create main component structure with Avatar and Popover
  - [x] 3.5 Implement Section 1: User information display (name and email)
  - [x] 3.6 Implement Section 2: Theme selector with three options (Light, Dark, System)
  - [x] 3.7 Implement Section 3: Logout button with icon
  - [x] 3.8 Add proper TypeScript types and interfaces
  - [x] 3.9 Add JSDoc documentation to the component
  - [x] 3.10 Style the component following Shadcn UI patterns
- [x] 4.0 Integrate component into AppHeader
  - [x] 4.1 Import UserAvatarMenu component in `components/layouts/app-header.tsx`
  - [x] 4.2 Add component to the right side of header (ml-auto section)
  - [x] 4.3 Remove TODO comment placeholder
- [x] 5.0 Test and verify functionality
  - [x] 5.1 Start development server and navigate to dashboard
  - [x] 5.2 Verify avatar displays with correct initials
  - [x] 5.3 Test popover opens/closes on click
  - [x] 5.4 Verify user name and email display correctly
  - [x] 5.5 Test theme switching (Light, Dark, System)
  - [x] 5.6 Test logout functionality and redirect to /login
  - [x] 5.7 Check responsive behavior on mobile viewport
  - [x] 5.8 Test keyboard navigation (Tab, Enter, Escape)

