# Tasks: Dashboard Follow-up Card

## Relevant Files

### Backend (leads-scrapper-backend)

- `src/contacts/entities/follow-up-category.enum.ts` - Enum for follow-up categories (OVERDUE, TODAY, UPCOMING)
- `src/contacts/entities/follow-up-summary.entity.ts` - GraphQL entity for follow-up summary counts
- `src/contacts/entities/contact-with-follow-up.entity.ts` - GraphQL entity for contact with follow-up data
- `src/contacts/entities/contacts-with-follow-up-response.entity.ts` - GraphQL response with cursor pagination
- `src/contacts/contacts.service.ts` - Add methods for follow-up summary and paginated contacts
- `src/contacts/contacts.resolver.ts` - Add queries for followUpSummary and contactsWithFollowUp

### Frontend (leads-scrapper-web)

- `modules/dashboard/index.ts` - Module barrel export
- `modules/dashboard/types/follow-up.ts` - TypeScript types for follow-up summary and contacts
- `modules/dashboard/graphql/follow-up-queries.ts` - GraphQL queries for dashboard follow-ups
- `modules/dashboard/hooks/use-follow-up-summary.ts` - Hook to fetch follow-up summary counts
- `modules/dashboard/hooks/use-contacts-with-follow-up.ts` - Hook with infinite scroll for contacts list
- `modules/dashboard/components/follow-up-card.tsx` - Card component showing summary counters
- `modules/dashboard/components/follow-up-sheet.tsx` - Sheet component with contact list
- `modules/dashboard/components/follow-up-contact-list.tsx` - List component with infinite scroll
- `modules/dashboard/components/follow-up-contact-item.tsx` - Individual contact item in the list
- `modules/dashboard/components/follow-up-empty-state.tsx` - Empty state for when no contacts match filter
- `app/(authenticated)/dashboard/page.tsx` - Dashboard page integration

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- This feature spans both backend (leads-scrapper-backend) and frontend (leads-scrapper-web) repositories
- The backend uses NestJS with GraphQL (code-first approach)
- The frontend uses Next.js with Apollo Client

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature: `git checkout -b feature/dashboard-followup-card`

- [x] 1.0 Backend: Create GraphQL types and enums for follow-up queries
  - [x] 1.1 Create `follow-up-category.enum.ts` in `src/contacts/entities/` with enum `FollowUpCategory` (OVERDUE, TODAY, UPCOMING)
  - [x] 1.2 Create `follow-up-summary.entity.ts` in `src/contacts/entities/` with fields: `overdueCount`, `todayCount`, `upcomingCount` (all Int)
  - [x] 1.3 Create `contact-with-follow-up.entity.ts` in `src/contacts/entities/` with fields: `id`, `type` (ContactType), `displayName` (String), `followUpDueDate` (DateTime)
  - [x] 1.4 Create `contacts-with-follow-up-response.entity.ts` in `src/contacts/entities/` with cursor-based pagination structure: `edges` (array with node and cursor), `pageInfo` (hasNextPage, endCursor), `totalCount`

- [x] 2.0 Backend: Implement FollowUp service methods for summary and paginated list
  - [x] 2.1 Add `getFollowUpSummary()` method in `contacts.service.ts` that returns counts for overdue, today, and upcoming follow-ups using Prisma count queries
  - [x] 2.2 Add helper method `getDateRanges()` to calculate date ranges for each category
  - [x] 2.3 Add `getContactsWithFollowUp(category, first, after)` method in `contacts.service.ts` that returns paginated contacts with cursor-based pagination
  - [x] 2.4 Implement cursor encoding/decoding for pagination (use base64 encoded date + id)
  - [x] 2.5 Build the `displayName` field by concatenating firstName + lastName for PERSON or returning companyName for COMPANY

- [x] 3.0 Backend: Create GraphQL resolver with followUpSummary and contactsWithFollowUp queries
  - [x] 3.1 Add `followUpSummary` query in `contacts.resolver.ts` that returns `FollowUpSummary`
  - [x] 3.2 Add `contactsWithFollowUp(category, first, after)` query in `contacts.resolver.ts` that returns `ContactsWithFollowUpResponse`
  - [x] 3.3 Run `pnpm build` to verify GraphQL schema generation
  - [ ] 3.4 Test queries using GraphQL playground to verify they work correctly

- [x] 4.0 Frontend: Setup dashboard module structure and GraphQL queries
  - [x] 4.1 Create directory structure: `modules/dashboard/`, `modules/dashboard/components/`, `modules/dashboard/hooks/`, `modules/dashboard/graphql/`, `modules/dashboard/types/`
  - [x] 4.2 Create `types/follow-up.ts` with TypeScript interfaces: `FollowUpSummary`, `ContactWithFollowUp`, `FollowUpCategory` enum, `ContactsWithFollowUpConnection`
  - [x] 4.3 Create `graphql/follow-up-queries.ts` with `GET_FOLLOW_UP_SUMMARY` query
  - [x] 4.4 Create `graphql/follow-up-queries.ts` with `GET_CONTACTS_WITH_FOLLOW_UP` query (include cursor pagination variables)
  - [x] 4.5 Create `modules/dashboard/index.ts` barrel export file

- [x] 5.0 Frontend: Create hooks for data fetching
  - [x] 5.1 Create `hooks/use-follow-up-summary.ts` hook that fetches follow-up summary counts using `useQuery`
  - [x] 5.2 Create `hooks/use-contacts-with-follow-up.ts` hook using Apollo's `fetchMore` pattern for infinite scroll
  - [x] 5.3 Add `loadMore` function in the infinite scroll hook that calls `fetchMore` with the next cursor
  - [x] 5.4 Handle loading, error, and empty states in both hooks

- [x] 6.0 Frontend: Create FollowUpCard component with summary counters
  - [x] 6.1 Create `components/follow-up-card.tsx` with card structure matching design reference
  - [x] 6.2 Add title "Follow-ups pendientes" at the top
  - [x] 6.3 Add three counter rows with colored indicators: 🔴 Vencidos, 🟡 Hoy, 🟢 Próximos
  - [x] 6.4 Add "Ver contactos" button/link that opens the sheet
  - [x] 6.5 Implement loading skeleton state for the card
  - [x] 6.6 Use `useFollowUpSummary` hook to fetch and display data

- [x] 7.0 Frontend: Create FollowUpSheet component with contact list and filters
  - [x] 7.1 Create `components/follow-up-sheet.tsx` using shadcn/ui Sheet component
  - [x] 7.2 Add sheet header with title "Contactos con follow-up" and close button
  - [x] 7.3 Create category filter using pill buttons with options: Vencidos, Hoy, Próximos
  - [x] 7.4 Create `components/follow-up-contact-item.tsx` with Avatar (Building2/User icon) and displayName
  - [x] 7.5 Create `components/follow-up-contact-list.tsx` with scroll container and intersection observer for infinite scroll
  - [x] 7.6 Create `components/follow-up-empty-state.tsx` for when no contacts match the filter
  - [x] 7.7 Implement navigation to `/contacts/{id}` on contact click using Next.js router
  - [x] 7.8 Use `useContactsWithFollowUp` hook with category state to fetch and display data
  - [x] 7.9 Add loading skeleton for the contact list

- [x] 8.0 Frontend: Integrate components into Dashboard page
  - [x] 8.1 Import and add `FollowUpCard` component to the dashboard page grid
  - [x] 8.2 Replace placeholder cards with the new FollowUpCard
  - [x] 8.3 Ensure responsive layout works on mobile, tablet, and desktop
  - [ ] 8.4 Test the complete flow: view card → open sheet → filter → click contact → navigate

- [ ] 9.0 Testing and refinement
  - [ ] 9.1 Test backend queries with different scenarios (no follow-ups, only overdue, mixed)
  - [ ] 9.2 Test frontend infinite scroll behavior with many contacts
  - [ ] 9.3 Verify date calculations work correctly across timezones
  - [ ] 9.4 Test empty states and loading states
  - [ ] 9.5 Review and fix any console errors or warnings
