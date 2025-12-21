# Tasks: Contacts Frontend Module

## Relevant Files

### Types and GraphQL
- `modules/contacts/types/contact.ts` - TypeScript types for Person and Company contacts
- `modules/contacts/types/index.ts` - Central export point for contact types
- `modules/contacts/graphql/queries.ts` - GraphQL queries for contacts list and detail

### Components
- `modules/contacts/components/contacts-table.tsx` - Table component showing both Person and Company contacts
- `modules/contacts/components/person-detail.tsx` - Detail view component for Person contact
- `modules/contacts/components/company-detail.tsx` - Detail view component for Company contact

### Pages
- `app/(authenticated)/contacts/page.tsx` - Contacts list page
- `app/(authenticated)/contacts/person/[id]/page.tsx` - Person detail page
- `app/(authenticated)/contacts/company/[id]/page.tsx` - Company detail page

### Configuration
- `lib/config/routes.ts` - Add contacts routes
- `lib/config/sidebar-nav.ts` - Add contacts navigation item

### Notes

- Follow existing patterns from `modules/students/` for consistency
- Reuse existing UI components: `TablePagination`, `TableEmptyState`, `TableSkeletonRows`, `SectionHeader`
- Use Lucide icons: `User`, `Building2`, `Mail`, `Phone`, `Linkedin`
- Union types from GraphQL require type discrimination using the `type` field

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/contacts-frontend`

- [x] 1.0 Create TypeScript types and GraphQL queries
  - [x] 1.1 Create `modules/contacts/types/contact.ts` with `ContactType` enum (PERSON, COMPANY)
  - [x] 1.2 Add `PersonContact` interface with fields: id, type, firstName, lastName, jobTitle, celular, email, linkedinUrl, createdAt, updatedAt
  - [x] 1.3 Add `CompanyContact` interface with fields: id, type, companyName, companyEmails (string[]), whatsapp, linkedinUrl, createdAt, updatedAt
  - [x] 1.4 Add `Contact` union type: `PersonContact | CompanyContact`
  - [x] 1.5 Add helper functions: `getContactName()`, `getContactEmail()`, `getContactPhone()`, `isPersonContact()`, `isCompanyContact()`
  - [x] 1.6 Add `PaginatedContactsResponse` interface matching GraphQL response
  - [x] 1.7 Create `modules/contacts/types/index.ts` exporting all types
  - [x] 1.8 Create `modules/contacts/graphql/queries.ts` with `GET_CONTACTS` query (paginated with search filter)
  - [x] 1.9 Add `GET_CONTACT` query for fetching single contact by ID with union type fragments

- [x] 2.0 Create contacts table component
  - [x] 2.1 Create `modules/contacts/components/contacts-table.tsx` following `students-table.tsx` structure
  - [x] 2.2 Define table columns: Avatar, Nombre, Email, Teléfono
  - [x] 2.3 Implement avatar rendering: `User` icon for Person, `Building2` icon for Company
  - [x] 2.4 Implement name column with Link that navigates to correct detail page based on type
  - [x] 2.5 Implement email column showing `email` for Person, first `companyEmails` for Company
  - [x] 2.6 Implement phone column showing `celular` for Person, `whatsapp` for Company
  - [x] 2.7 Add loading state using `TableSkeletonRows`
  - [x] 2.8 Add empty state using `TableEmptyState` with `Users` icon
  - [x] 2.9 Add search empty state "No hay resultados para la búsqueda"
  - [x] 2.10 Integrate `TablePagination` component

- [x] 3.0 Create contacts list page with search and pagination
  - [x] 3.1 Create `app/(authenticated)/contacts/page.tsx`
  - [x] 3.2 Add `SectionHeader` with title "Contactos" and "Crear Contacto" button (disabled)
  - [x] 3.3 Add search input with debounce (300ms) using existing pattern
  - [x] 3.4 Implement `useQuery` with `GET_CONTACTS` query
  - [x] 3.5 Pass search and pagination params to query variables
  - [x] 3.6 Handle loading and error states
  - [x] 3.7 Render `ContactsTable` component with data and pagination handlers

- [x] 4.0 Create person detail component and page
  - [x] 4.1 Create `modules/contacts/components/person-detail.tsx`
  - [x] 4.2 Add Avatar with initials from firstName + lastName
  - [x] 4.3 Display full name (firstName + lastName) as title
  - [x] 4.4 Display jobTitle as subtitle (if exists)
  - [x] 4.5 Display email with `Mail` icon
  - [x] 4.6 Display celular with `Phone` icon
  - [x] 4.7 Display linkedinUrl with `Linkedin` icon (opens in new tab)
  - [x] 4.8 Create `app/(authenticated)/contacts/person/[id]/page.tsx`
  - [x] 4.9 Implement `useQuery` with `GET_CONTACT` query passing id param
  - [x] 4.10 Add breadcrumb: Contactos > [Nombre del contacto]
  - [x] 4.11 Handle loading state with skeleton
  - [x] 4.12 Handle not found error with redirect or message

- [x] 5.0 Create company detail component and page
  - [x] 5.1 Create `modules/contacts/components/company-detail.tsx`
  - [x] 5.2 Add Avatar with `Building2` icon
  - [x] 5.3 Display companyName as title
  - [x] 5.4 Display list of companyEmails, each with `Mail` icon
  - [x] 5.5 Display whatsapp with `Phone` icon
  - [x] 5.6 Display linkedinUrl with `Linkedin` icon (opens in new tab)
  - [x] 5.7 Create `app/(authenticated)/contacts/company/[id]/page.tsx`
  - [x] 5.8 Implement `useQuery` with `GET_CONTACT` query passing id param
  - [x] 5.9 Add breadcrumb: Contactos > [Nombre de empresa]
  - [x] 5.10 Handle loading state with skeleton
  - [x] 5.11 Handle not found error with redirect or message

- [x] 6.0 Update routes and sidebar navigation
  - [x] 6.1 Add `CONTACTS: '/contacts'` to `lib/config/routes.ts`
  - [x] 6.2 Add `CONTACT_PERSON_DETAIL: (id: string) => \`/contacts/person/${id}\`` to routes
  - [x] 6.3 Add `CONTACT_COMPANY_DETAIL: (id: string) => \`/contacts/company/${id}\`` to routes
  - [x] 6.4 Add `/contacts` to `PROTECTED_ROUTE_PREFIXES` array
  - [x] 6.5 Import `Users` or `Contact` icon from lucide-react in `sidebar-nav.ts`
  - [x] 6.6 Add contacts navigation item to `navigationItems` array with label "Contactos"

- [ ] 7.0 Test all pages and navigation flows
  - [ ] 7.1 Start development server and navigate to `/contacts`
  - [ ] 7.2 Verify table displays both Person and Company contacts correctly
  - [ ] 7.3 Verify avatars show correct icons (User vs Building)
  - [ ] 7.4 Test search functionality with debounce
  - [ ] 7.5 Test pagination controls (next/previous page)
  - [ ] 7.6 Click on a Person name and verify navigation to `/contacts/person/[id]`
  - [ ] 7.7 Click on a Company name and verify navigation to `/contacts/company/[id]`
  - [ ] 7.8 Verify Person detail page shows all fields correctly
  - [ ] 7.9 Verify Company detail page shows all fields correctly
  - [ ] 7.10 Verify breadcrumb navigation works
  - [ ] 7.11 Verify sidebar "Contactos" link works
  - [ ] 7.12 Test empty states (no contacts, no search results)

