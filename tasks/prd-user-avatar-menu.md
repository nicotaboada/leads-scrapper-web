# PRD: User Avatar Menu Component

## Introduction/Overview

Create a user avatar component that displays in the application header. The avatar will show the logged user's initials and, when clicked, open a popover menu with user information, theme selection options, and a logout button. This component provides quick access to user account settings and session management.

**Problem it solves:** Users need a quick and intuitive way to:
- See who is currently logged in
- Switch between light/dark themes
- Log out of the application

**Goal:** Implement a polished, accessible user avatar menu that integrates seamlessly with the existing header and follows modern UI/UX patterns.

## Goals

1. Create a visually appealing avatar component that displays user initials
2. Implement a popover menu with user information, theme controls, and logout functionality
3. Provide seamless theme switching (light, dark, system)
4. Enable quick logout functionality
5. Ensure the component is accessible and follows the project's design system (Shadcn UI)

## User Stories

**As a logged-in user:**
- I want to see my avatar in the header so I know I'm logged in and can quickly identify my account
- I want to click on my avatar to see my account information (name and email)
- I want to switch between light and dark themes easily without going to a settings page
- I want to log out of the application with a single click

## Functional Requirements

### 1. Avatar Display
1.1. The avatar must be positioned in the top-right corner of the header
1.2. The avatar must display the first two letters of the user's email address as initials
1.3. The avatar must be circular and follow Shadcn UI design patterns
1.4. The avatar must have appropriate hover and active states for visual feedback
1.5. The avatar must be clickable to open the popover menu

### 2. Popover Menu Structure
2.1. The popover must appear below the avatar when clicked
2.2. The popover must use Shadcn UI's Popover component
2.3. The popover must contain three distinct sections separated by visual dividers

### 3. User Information Section (Section 1)
3.1. Must display the user's full name (from user.user_metadata.first_name and user.user_metadata.last_name)
3.2. Must display the user's email address
3.3. This section must not be clickable/interactive
3.4. Must handle cases where name metadata might not be available (fallback to email)

### 4. Theme Selection Section (Section 2)
4.1. Must have a "Theme" label or subtitle
4.2. Must display three theme options:
   - Light mode (with sun icon)
   - Dark mode (with moon icon)
   - System mode (with monitor/computer icon)
4.3. Each theme option must show an icon and label
4.4. The currently selected theme must be visually indicated
4.5. Clicking a theme option must immediately apply that theme
4.6. Theme selection must integrate with the existing next-themes provider

### 5. Logout Section (Section 3)
5.1. Must display a "Log out" option with a logout icon
5.2. Must be clearly visually separated from other sections
5.3. Clicking logout must immediately sign out the user
5.4. After logout, must redirect to /login page
5.5. Must handle logout errors gracefully

### 6. Component Integration
6.1. The component must be integrated into the AppHeader component
6.2. Must be positioned in the `ml-auto` section (right side) of the header
6.3. Must work in a client component context (use 'use client' directive)
6.4. Must use the useCurrentUser hook to fetch user data

## Non-Goals (Out of Scope)

- Profile editing functionality (name, email changes)
- User settings beyond theme selection
- Profile picture upload
- Notifications or badges on the avatar
- Multiple user account switching
- Remember theme preference in database (next-themes handles localStorage)
- Loading user profile from database (use Supabase auth user data only)

## Design Considerations

### Visual Design
- Follow Shadcn UI design system for consistency
- Use existing components: Avatar, Popover, Separator
- Icons from lucide-react library (Sun, Moon, Monitor, LogOut)
- Ensure proper spacing and visual hierarchy in the popover
- Use appropriate text sizes (smaller for email, normal for name)

### Responsive Design
- Avatar size should be appropriate for mobile and desktop
- Popover should be responsive and not overflow on small screens
- Touch targets should be at least 44x44px for mobile

### Accessibility
- Avatar button must have proper aria-label
- Keyboard navigation must work (Tab, Enter, Escape)
- Screen readers must announce the popover content correctly
- Focus management when opening/closing popover

## Technical Considerations

### Architecture
- Create component at: `modules/auth/components/user-avatar-menu.tsx`
- Create logout server action at: `app/login/actions.ts` (add to existing file)
- Import and use in: `components/layouts/app-header.tsx`

### Dependencies
- Use existing: `useCurrentUser` hook from `hooks/use-current-user`
- Use existing: `next-themes` (already configured in layout)
- Use Shadcn UI components (need to add Avatar and Popover if not present)
- Use `lucide-react` for icons (Sun, Moon, Monitor, LogOut)

### State Management
- Use next-themes' `useTheme` hook for theme management
- User state managed by useCurrentUser hook
- Popover open/close state managed locally

### Performance
- Avatar component should be optimized for re-renders
- Consider memoization if needed
- Lazy load theme switcher if heavy

### Error Handling
- Handle missing user metadata gracefully (fallback to email initials)
- Handle logout errors with toast notifications
- Handle loading states appropriately

## Success Metrics

1. **Functionality:** All three sections work correctly (user info display, theme switching, logout)
2. **Visual Quality:** Component matches design reference and integrates seamlessly with header
3. **User Experience:** Users can switch themes and logout without friction
4. **Accessibility:** Component is fully keyboard navigable and screen reader friendly
5. **Performance:** Component renders quickly and doesn't cause layout shifts

## Open Questions

1. Should we add any analytics tracking for theme changes and logout events?
2. Do we need to handle cases where user metadata (first_name, last_name) is missing differently?
3. Should there be a visual loading state while logging out?
4. Should the popover close automatically when clicking outside?
5. Should we add any transition animations to the theme changes?

## Implementation Notes

### Initial Component Structure
```typescript
// modules/auth/components/user-avatar-menu.tsx
'use client'

import { useCurrentUser } from 'hooks/use-current-user'
import { useTheme } from 'next-themes'
// ... other imports

export function UserAvatarMenu() {
  const { user } = useCurrentUser()
  const { theme, setTheme } = useTheme()

  // Implementation...
}
```

### Integration in Header
```typescript
// components/layouts/app-header.tsx
import { UserAvatarMenu } from 'modules/auth/components/user-avatar-menu'

export function AppHeader() {
  return (
    <header>
      <SidebarTrigger />
      <div className="ml-auto flex items-center gap-4">
        <UserAvatarMenu />
      </div>
    </header>
  )
}
```

### Logout Action
```typescript
// app/login/actions.ts (add to existing file)
export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

