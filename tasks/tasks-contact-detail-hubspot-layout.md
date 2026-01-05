# Tasks: Contact Detail Page - HubSpot-Style Layout

## Relevant Files

- `modules/contacts/utils/phone.ts` - Utility function to clean phone numbers for WhatsApp links (remove spaces, dashes, special characters)
- `modules/contacts/utils/phone.test.ts` - Unit tests for phone utility functions
- `modules/contacts/components/contact-action-buttons.tsx` - Action buttons component (WhatsApp, Email, LinkedIn, More dropdown)
- `modules/contacts/components/about-contact-section.tsx` - "About this contact" section with contact fields
- `modules/contacts/components/contact-sidebar.tsx` - Left sidebar component combining header, action buttons, and about section
- `modules/contacts/components/person-overview-tab.tsx` - Overview tab content component (placeholder for now)
- `app/(authenticated)/contacts/person/[id]/page.tsx` - Main page component, refactored with new layout
- `modules/contacts/types/contact.ts` - May need to add helper types for action buttons

### Notes

- Unit tests should be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Reuse existing components: `EditContactSheet`, `DeleteContactDialog`, `CardTabs`, `Avatar`, `Button`, `DropdownMenu`
- Icons from `lucide-react`: `Mail`, `Phone`, `Linkedin`, `MessageCircle` (for WhatsApp), `MoreHorizontal`, `Briefcase`, `Building2`

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/contact-detail-hubspot-layout`

- [x] 1.0 Create phone number utility for WhatsApp links
  - [x] 1.1 Create `modules/contacts/utils/phone.ts` file
  - [x] 1.2 Implement `cleanPhoneForWhatsApp(phone: string): string` function that removes all non-digit characters except leading `+`
  - [x] 1.3 Implement `buildWhatsAppUrl(phone: string): string` function that returns `https://wa.me/{cleanedNumber}`
  - [x] 1.4 Export both functions from the utils file
  - [ ] 1.5 Create unit tests in `modules/contacts/utils/phone.test.ts` covering various phone formats (e.g., `+54 11 1234-5678`, `(011) 1234-5678`, `11-1234-5678`)

- [x] 2.0 Create ContactActionButtons component
  - [x] 2.1 Create `modules/contacts/components/contact-action-buttons.tsx` file
  - [x] 2.2 Define `ContactActionButtonsProps` interface with `contact: PersonContact`, `onEdit: () => void`, `onDelete: () => void`
  - [x] 2.3 Implement WhatsApp icon button that opens `wa.me` link in new tab (conditionally rendered if `celular` exists)
  - [x] 2.4 Implement Email icon button that opens `mailto:` link (conditionally rendered if `email` exists)
  - [x] 2.5 Implement LinkedIn icon button that opens LinkedIn URL in new tab (conditionally rendered if `linkedinUrl` exists)
  - [x] 2.6 Implement "More" dropdown button using `DropdownMenu` component with "Editar contacto" and "Eliminar contacto" options
  - [x] 2.7 Add tooltips to each action button explaining its purpose
  - [x] 2.8 Style buttons as icon-only with consistent sizing and hover states

- [x] 3.0 Create AboutContactSection component
  - [x] 3.1 Create `modules/contacts/components/about-contact-section.tsx` file
  - [x] 3.2 Define `AboutContactSectionProps` interface with `contact: PersonContact`
  - [x] 3.3 Create section header with "About this contact" title
  - [x] 3.4 Implement Email field row with Mail icon and mailto link (conditional)
  - [x] 3.5 Implement Phone field row with Phone icon and tel link (conditional)
  - [x] 3.6 Implement LinkedIn field row with Linkedin icon and external link (conditional)
  - [x] 3.7 Implement Job Title field row with Briefcase icon (conditional)
  - [x] 3.8 Implement Company field row with Building2 icon, optionally linking to company detail page (conditional)
  - [x] 3.9 Style with consistent spacing, icons, and typography matching existing design system

- [x] 4.0 Create ContactSidebar component
  - [x] 4.1 Create `modules/contacts/components/contact-sidebar.tsx` file
  - [x] 4.2 Define `ContactSidebarProps` interface with `contact: PersonContact`, `onEdit: () => void`, `onDelete: () => void`
  - [x] 4.3 Implement contact header section with large Avatar (64-80px) displaying initials
  - [x] 4.4 Display contact full name as heading and job title as subtitle
  - [x] 4.5 Integrate `ContactActionButtons` component below the header
  - [x] 4.6 Integrate `AboutContactSection` component below the action buttons
  - [x] 4.7 Add separator/divider between header and about section
  - [x] 4.8 Style sidebar with fixed width (~280-320px), subtle background differentiation, and proper padding
  - [x] 4.9 Create `ContactSidebarSkeleton` component for loading state

- [x] 5.0 Create PersonOverviewTab component
  - [x] 5.1 Create `modules/contacts/components/person-overview-tab.tsx` file
  - [x] 5.2 Define `PersonOverviewTabProps` interface with `contact: PersonContact`
  - [x] 5.3 Implement placeholder content (e.g., "Contenido de resumen próximamente" or summary cards)
  - [x] 5.4 Structure component to be easily extendable for future content

- [x] 6.0 Refactor PersonDetailPage with new HubSpot-style layout
  - [x] 6.1 Read and understand current `app/(authenticated)/contacts/person/[id]/page.tsx` implementation
  - [x] 6.2 Update imports to include new components (`ContactSidebar`, `PersonOverviewTab`, `CardTabs`)
  - [x] 6.3 Add state management for edit sheet (`isEditOpen`) and delete dialog (`isDeleteOpen`)
  - [x] 6.4 Replace current layout with two-column flex container
  - [x] 6.5 Add `ContactSidebar` component in left column with edit/delete handlers
  - [x] 6.6 Add `CardTabs` component in right column with Overview tab
  - [x] 6.7 Integrate existing `EditContactSheet` component with open state
  - [x] 6.8 Integrate existing `DeleteContactDialog` component with open state
  - [x] 6.9 Keep `DetailHeader` with breadcrumb navigation at the top
  - [x] 6.10 Maintain existing error and loading state handling
  - [x] 6.11 Update loading state to use `ContactSidebarSkeleton` + tabs skeleton

- [ ] 7.0 Add responsive styles and polish
  - [ ] 7.1 Add responsive breakpoints: stack layout on mobile (sidebar on top, tabs below)
  - [ ] 7.2 Adjust sidebar width for tablet screens
  - [ ] 7.3 Test all action buttons work correctly (WhatsApp, Email, LinkedIn open proper links)
  - [ ] 7.4 Test Edit and Delete flows work correctly through the More menu
  - [ ] 7.5 Verify consistent styling with rest of application
  - [ ] 7.6 Test with contacts that have missing fields (no phone, no email, etc.)
  - [ ] 7.7 Final visual review and adjustments

