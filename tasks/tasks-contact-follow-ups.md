# Tasks: Contact Follow-ups

## Relevant Files

### Backend (leads-scrapper-backend)

- `prisma/schema.prisma` - Add FollowUp model and relation to Contact
- `prisma/migrations/XXXXXX_add_follow_up/migration.sql` - Database migration for follow-up table
- `src/contacts/entities/follow-up.entity.ts` - GraphQL entity for FollowUp
- `src/contacts/entities/follow-up-status.enum.ts` - Enum for follow-up status (PENDING, DONE)
- `src/contacts/entities/company-contact.entity.ts` - Add followUp field to CompanyContact
- `src/contacts/entities/person-contact.entity.ts` - Add followUp field to PersonContact
- `src/contacts/dto/create-follow-up.input.ts` - DTO for creating a follow-up
- `src/contacts/dto/update-follow-up.input.ts` - DTO for updating a follow-up
- `src/contacts/contacts.resolver.ts` - Add follow-up mutations and field resolver
- `src/contacts/contacts.service.ts` - Add follow-up CRUD methods

### Frontend (leads-scrapper-web)

- `modules/contacts/types/follow-up.ts` - TypeScript types for FollowUp
- `modules/contacts/types/contact.ts` - Update Contact interfaces to include followUp
- `modules/contacts/graphql/follow-up-mutations.ts` - GraphQL mutations for follow-up operations
- `modules/contacts/graphql/queries.ts` - Update contact queries to include followUp field
- `modules/contacts/hooks/use-create-follow-up.ts` - Hook for creating follow-ups
- `modules/contacts/hooks/use-update-follow-up.ts` - Hook for updating follow-ups
- `modules/contacts/hooks/use-complete-follow-up.ts` - Hook for completing follow-ups
- `modules/contacts/hooks/use-delete-follow-up.ts` - Hook for deleting follow-ups
- `modules/contacts/components/follow-up-modal.tsx` - Modal for create/edit follow-up
- `modules/contacts/components/follow-up-section.tsx` - Follow-up section for sidebars
- `modules/contacts/components/follow-up-card.tsx` - Follow-up card for Overview tab
- `modules/contacts/components/follow-up-badge.tsx` - Badge indicator for contacts list
- `modules/contacts/components/contact-sidebar.tsx` - Integrate FollowUpSection
- `modules/contacts/components/company-sidebar.tsx` - Integrate FollowUpSection
- `modules/contacts/components/person-overview-tab.tsx` - Integrate FollowUpCard
- `modules/contacts/components/company-overview-tab.tsx` - Integrate FollowUpCard
- `modules/contacts/components/contacts-table.tsx` - Integrate FollowUpBadge

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- This feature spans both backend (`leads-scrapper-backend`) and frontend (`leads-scrapper-web`) repositories
- Follow-up status is calculated on frontend: if `dueDate < today` → Overdue, else → Pending
- The backend only stores `PENDING` status; `DONE` triggers deletion

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

---

## Tasks

### Phase 0: Setup

- [x] 0.0 Create feature branch
  - [x] 0.1 Skipped - working directly on main/current branch

---

### Phase 1: Backend - Database Model

- [x] 1.0 Backend: Create Prisma model and migration for FollowUp
  - [x] 1.1 Add `FollowUp` model to `prisma/schema.prisma` with fields: `id`, `contactId`, `dueDate`, `note`, `createdAt`, `updatedAt`
  - [x] 1.2 Add relation from `Contact` to `FollowUp` (one-to-one optional: `followUp FollowUp?`)
  - [x] 1.3 Add `@unique` constraint on contactId to ensure one follow-up per contact
  - [x] 1.4 SQL migration provided for manual execution
  - [x] 1.5 Run `npx prisma generate` to update Prisma Client (manual step)

---

### Phase 2: Backend - GraphQL Module

- [x] 2.0 Backend: Create FollowUp GraphQL module (DTOs, entities, resolver, service)
  - [x] 2.1 Create `src/contacts/entities/follow-up.entity.ts` with GraphQL ObjectType containing: `id`, `contactId`, `dueDate`, `note`, `createdAt`, `updatedAt`
  - [x] 2.2 Create `src/contacts/dto/create-follow-up.input.ts` with fields: `contactId` (required), `dueDate` (required, must be future date), `note` (optional, max 500 chars)
  - [x] 2.3 Create `src/contacts/dto/update-follow-up.input.ts` with fields: `dueDate` (optional), `note` (optional)
  - [x] 2.4 Add `createFollowUp` method to `contacts.service.ts` that validates: contact exists, no existing follow-up, date is in future
  - [x] 2.5 Add `updateFollowUp` method to `contacts.service.ts` that validates: follow-up exists, new date (if provided) is in future
  - [x] 2.6 Add `completeFollowUp` method to `contacts.service.ts` that deletes the follow-up record
  - [x] 2.7 Add `deleteFollowUp` method to `contacts.service.ts` that deletes the follow-up record
  - [x] 2.8 Add `getFollowUpByContactId` method to `contacts.service.ts` for fetching follow-up by contact

---

### Phase 3: Backend - Integrate with Contact Queries

- [x] 3.0 Backend: Extend Company and Person queries to include followUp field
  - [x] 3.1 Add `followUp` field (nullable) to `CompanyContact` entity in `company-contact.entity.ts`
  - [x] 3.2 Add `followUp` field (nullable) to `PersonContact` entity in `person-contact.entity.ts`
  - [x] 3.3 Add GraphQL query `followUp(contactId)` to resolver
  - [x] 3.4 Add GraphQL mutations to resolver: `createFollowUp`, `updateFollowUp`, `completeFollowUp`, `deleteFollowUp`
  - [x] 3.5 Update Prisma queries in service to include `followUp` relation when fetching contacts
  - [ ] 3.6 Test mutations via GraphQL playground: create, update, complete, delete follow-up

---

### Phase 4: Frontend - GraphQL Operations

- [x] 4.0 Frontend: Create GraphQL operations for FollowUp (queries and mutations)
  - [x] 4.1 Create `modules/contacts/types/follow-up.ts` with TypeScript interface for FollowUp
  - [x] 4.2 Update `modules/contacts/types/contact.ts` to add optional `followUp` field to `PersonContact` and `CompanyContact` interfaces
  - [x] 4.3 Update `modules/contacts/types/index.ts` to export follow-up types
  - [x] 4.4 Create `modules/contacts/graphql/follow-up-mutations.ts` with mutations: `CREATE_FOLLOW_UP`, `UPDATE_FOLLOW_UP`, `COMPLETE_FOLLOW_UP`, `DELETE_FOLLOW_UP`
  - [x] 4.5 Update `GET_CONTACTS` query in `queries.ts` to include `followUp { id dueDate note }` for both PersonContact and CompanyContact
  - [x] 4.6 Update `GET_CONTACT` query in `queries.ts` to include `followUp { id dueDate note createdAt updatedAt }` for both types

---

### Phase 5: Frontend - Follow-up Hooks

- [x] 5.0 Frontend: Create FollowUp modal component (create/edit)
  - [x] 5.1 Create `modules/contacts/hooks/use-create-follow-up.ts` hook using Apollo useMutation
  - [x] 5.2 Create `modules/contacts/hooks/use-update-follow-up.ts` hook using Apollo useMutation
  - [x] 5.3 Create `modules/contacts/hooks/use-complete-follow-up.ts` hook using Apollo useMutation
  - [x] 5.4 Create `modules/contacts/hooks/use-delete-follow-up.ts` hook using Apollo useMutation
  - [x] 5.5 Create `modules/contacts/components/follow-up-modal.tsx` with: date picker (only future dates), note textarea (max 500 chars), cancel/submit buttons
  - [x] 5.6 Add edit mode to modal: pre-populate fields, change button text to "Guardar", add delete option
  - [x] 5.7 Add date shortcuts: "Mañana", "En 1 semana", "En 1 mes" buttons below date picker

---

### Phase 6: Frontend - Sidebar Section

- [x] 6.0 Frontend: Create FollowUp section component for Contact Sidebar
  - [x] 6.1 Create `modules/contacts/components/follow-up-section.tsx` component
  - [x] 6.2 Implement "no follow-up" state: show section title "Follow-up" with "+ Agregar follow-up" button
  - [x] 6.3 Implement "has follow-up" state: show date (formatted as "22 Dic"), note text, overdue indicator if applicable
  - [x] 6.4 Add "✓ Marcar como hecho" action button that calls completeFollowUp mutation
  - [x] 6.5 Add "✏️ Editar" action button that opens modal in edit mode
  - [x] 6.6 Add visual indicator (red text/icon) when follow-up is overdue (dueDate < today)
  - [x] 6.7 Create helper functions in `types/follow-up.ts`: `isFollowUpOverdue`, `formatFollowUpDate`, `getFollowUpRelativeTime`

---

### Phase 7: Frontend - Overview Card

- [x] 7.0 Frontend: Create FollowUp card component for Overview tab
  - [x] 7.1 Create `modules/contacts/components/follow-up-card.tsx` component styled as a Card
  - [x] 7.2 Implement "no follow-up" state: "Sin follow-up pendiente" message with "Agregar" button
  - [x] 7.3 Implement "has follow-up" state: show date, note, and status badge
  - [x] 7.4 Add status badge: 🟢 "Pendiente" (green) if date >= today, 🔴 "Vencido" (red) if date < today
  - [x] 7.5 Add relative time indicator: "En X días" or "Hace X días" based on due date
  - [x] 7.6 Add quick actions: "Marcar como hecho" and "Editar" buttons

---

### Phase 8: Frontend - List Badge

- [x] 8.0 Frontend: Create FollowUp badge component for contacts list
  - [x] 8.1 Create `modules/contacts/components/follow-up-badge.tsx` component
  - [x] 8.2 Implement badge with calendar icon for pending follow-ups (amber color)
  - [x] 8.3 Implement badge with alert icon and red color for overdue follow-ups
  - [x] 8.4 Add tooltip on hover showing due date and note preview
  - [x] 8.5 Ensure badge is compact and doesn't disrupt table layout

---

### Phase 9: Frontend - Integration

- [x] 9.0 Frontend: Integrate FollowUp components into existing pages
  - [x] 9.1 Update `contact-sidebar.tsx`: add FollowUpSection between LeadSectionReadonly and TagsSectionReadonly
  - [x] 9.2 Update `company-sidebar.tsx`: add FollowUpSection between LeadSectionReadonly and TagsSectionReadonly
  - [x] 9.3 Update `person-overview-tab.tsx`: add FollowUpCard component
  - [x] 9.4 Update `company-overview-tab.tsx`: add FollowUpCard component
  - [x] 9.5 Update `contacts-table.tsx`: add FollowUpBadge next to contact name
  - [x] 9.6 Add `onFollowUpChanged` prop to sidebars and overview tabs
  - [x] 9.7 Wire up refetch after create/update/complete/delete operations in detail pages

---

### Phase 10: Testing and Validation

- [ ] 10.0 Testing and validation (manual testing required)
  - [ ] 10.1 Test backend: Create follow-up for a Company contact
  - [ ] 10.2 Test backend: Create follow-up for a Person contact
  - [ ] 10.3 Test backend: Attempt to create follow-up with past date (should fail)
  - [ ] 10.4 Test backend: Attempt to create second follow-up for same contact (should fail)
  - [ ] 10.5 Test backend: Update follow-up date and note
  - [ ] 10.6 Test backend: Complete follow-up and verify it's deleted
  - [ ] 10.7 Test frontend: Open modal from sidebar "Agregar follow-up" button
  - [ ] 10.8 Test frontend: Create follow-up with future date and optional note
  - [ ] 10.9 Test frontend: Verify follow-up appears in sidebar after creation
  - [ ] 10.10 Test frontend: Edit follow-up via sidebar "Editar" button
  - [ ] 10.11 Test frontend: Complete follow-up via "Marcar como hecho" button
  - [ ] 10.12 Test frontend: Verify FollowUpCard displays correctly in Overview tab
  - [ ] 10.13 Test frontend: Verify FollowUpBadge displays in contacts list
  - [ ] 10.14 Test frontend: Verify overdue indicator shows correctly (set past date via DB)
  - [ ] 10.15 Run linter and fix any issues: `npm run lint`
