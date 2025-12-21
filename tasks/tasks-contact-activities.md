## Relevant Files

### Backend (`leads-scrapper-backend`)

- `prisma/schema.prisma` - Add ActivityType enum and Activity model
- `src/contacts/entities/activity-type.enum.ts` - New GraphQL enum for activity types
- `src/contacts/entities/activity.entity.ts` - New GraphQL entity for Activity
- `src/contacts/entities/activities-response.entity.ts` - Paginated response type
- `src/contacts/dto/create-activity.input.ts` - Input DTO for creating activities
- `src/contacts/dto/activities-filter.input.ts` - Input DTO for filtering activities
- `src/contacts/contacts.resolver.ts` - Add activities query and createActivity mutation
- `src/contacts/contacts.service.ts` - Add activity-related business logic

### Frontend (`leads-scrapper-web`)

- `modules/contacts/types/activity.ts` - TypeScript types for Activity
- `modules/contacts/graphql/activity-queries.ts` - GraphQL queries for activities
- `modules/contacts/graphql/activity-mutations.ts` - GraphQL mutations for activities
- `modules/contacts/hooks/use-activities.ts` - Hook to fetch activities
- `modules/contacts/hooks/use-create-activity.ts` - Hook to create activities
- `modules/contacts/components/activity-list.tsx` - List component with timeline
- `modules/contacts/components/activity-item.tsx` - Individual activity item
- `modules/contacts/components/activity-empty-state.tsx` - Empty state component
- `modules/contacts/components/add-activity-sheet.tsx` - Sheet for adding activities
- `modules/contacts/components/activities-tab.tsx` - Main tab component
- `components/ui/textarea.tsx` - Textarea component (newly created)
- `app/(authenticated)/contacts/person/[id]/page.tsx` - Add Activities tab
- `app/(authenticated)/contacts/company/[id]/page.tsx` - Add Activities tab

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- This feature spans both backend (`leads-scrapper-backend`) and frontend (`leads-scrapper-web`) repositories.
- Backend changes must be completed and deployed before frontend can fully integrate.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [ ] 0.1 In `leads-scrapper-backend`: Create and checkout branch `feature/contact-activities`
  - [ ] 0.2 In `leads-scrapper-web`: Create and checkout branch `feature/contact-activities`

- [x] 1.0 Backend: Create Activity model and enum in Prisma schema
  - [x] 1.1 Open `prisma/schema.prisma` and add `ActivityType` enum with values: `WHATSAPP_SENT`, `EMAIL_SENT`, `LINKEDIN_MESSAGE_SENT`, `LEAD_REPLIED`, `NOTE`, `STATUS_CHANGED`
  - [x] 1.2 Create `Activity` model with fields: `id` (UUID), `contactId` (FK), `activityType`, `summary` (optional String), `metadata` (optional Json), `authorId` (optional Int FK to User), `authorName` (String), `createdAt`
  - [x] 1.3 Add relation from Activity to Contact (many-to-one)
  - [x] 1.4 Add relation from Activity to User (many-to-one, optional)
  - [x] 1.5 Add indexes on `contactId` and `createdAt` for query optimization
  - [ ] 1.6 Run `npx prisma migrate dev --name add-activity-model` to create migration
  - [ ] 1.7 Run `npx prisma generate` to update Prisma client

- [x] 2.0 Backend: Create GraphQL entities, DTOs, and response types for Activity
  - [x] 2.1 Create `src/contacts/entities/activity-type.enum.ts` with GraphQL enum registration using `@nestjs/graphql`
  - [x] 2.2 Create `src/contacts/entities/activity.entity.ts` with `@ObjectType()` decorator and all fields (id, contactId, activityType, summary, metadata, authorId, authorName, createdAt)
  - [x] 2.3 Create `src/contacts/dto/create-activity.input.ts` with `@InputType()` containing: `contactId` (required), `activityType` (required, excluding STATUS_CHANGED), `summary` (optional)
  - [x] 2.4 Create `src/contacts/dto/activities-filter.input.ts` with `@InputType()` containing: `contactId` (required), `page`, `limit`, `search` (optional)
  - [x] 2.5 Create `src/contacts/entities/activities-response.entity.ts` with `data: Activity[]` and `meta` pagination fields

- [x] 3.0 Backend: Implement Activity queries and mutations in resolver/service
  - [x] 3.1 In `contacts.service.ts`: Create `findActivities(params)` method to fetch paginated activities for a contact with optional search filter on `summary`
  - [x] 3.2 In `contacts.service.ts`: Create `createActivity(input, authorId, authorName)` method to create a new activity
  - [x] 3.3 In `contacts.service.ts`: Create helper method `createSystemActivity(contactId, activityType, metadata)` for automatic activities
  - [x] 3.4 In `contacts.resolver.ts`: Add `@Query(() => ActivitiesResponse)` for `activities` query
  - [x] 3.5 In `contacts.resolver.ts`: Add `@Mutation(() => Activity)` for `createActivity` mutation
  - [x] 3.6 For `createActivity` mutation, extract user info from context (or use hardcoded user for now until auth context is available)

- [x] 4.0 Backend: Modify updateContactLeadStatus to auto-create STATUS_CHANGED activity
  - [x] 4.1 In `contacts.service.ts`: Modify `updateLeadStatus` method to fetch current status before update
  - [x] 4.2 In `contacts.service.ts`: After status update, call `createSystemActivity` with metadata `{ fromStatus, toStatus }`
  - [x] 4.3 Wrap the status update and activity creation in a Prisma transaction to ensure atomicity
  - [ ] 4.4 Test the automatic activity creation by changing a contact's lead status

- [x] 5.0 Frontend: Create Activity types and GraphQL operations
  - [x] 5.1 Create `modules/contacts/types/activity.ts` with TypeScript types: `ActivityType` enum, `Activity` interface, `ActivitiesResponse` interface
  - [x] 5.2 Create `modules/contacts/graphql/activity-queries.ts` with `GET_ACTIVITIES` query (contactId, page, limit, search)
  - [x] 5.3 Create `modules/contacts/graphql/activity-mutations.ts` with `CREATE_ACTIVITY` mutation
  - [x] 5.4 Create `modules/contacts/hooks/use-activities.ts` hook using `useQuery` to fetch activities with pagination and search
  - [x] 5.5 Create `modules/contacts/hooks/use-create-activity.ts` hook using `useMutation` to create activities

- [x] 6.0 Frontend: Create Activity components (ActivityList, ActivityItem, EmptyState)
  - [x] 6.1 Create `modules/contacts/components/activity-empty-state.tsx` with message "There are no Activities logged for this contact." and "Log an Activity" button
  - [x] 6.2 Create utility function to group activities by relative date (Today, Yesterday, formatted date)
  - [x] 6.3 Create `modules/contacts/components/activity-item.tsx` with: icon based on type, activity type label, "added by [author]" text, summary in italics, timeline connector line
  - [x] 6.4 Define icon and color mapping for each ActivityType (WHATSAPP_SENT: green, EMAIL_SENT: blue, etc.)
  - [x] 6.5 Create `modules/contacts/components/activity-list.tsx` that renders grouped activities with date headers and ActivityItems
  - [x] 6.6 Add timeline vertical line styling connecting activity items

- [x] 7.0 Frontend: Create AddActivitySheet component
  - [x] 7.1 Create `modules/contacts/components/add-activity-sheet.tsx` using shadcn Sheet component
  - [x] 7.2 Add header section with "Add Activity" title and close button (X)
  - [x] 7.3 Add "CONTACT" section displaying contact avatar and name (read-only)
  - [x] 7.4 Add "ACTIVITY TYPE" section with toggle buttons for types (exclude STATUS_CHANGED): map UI labels to enum values
  - [x] 7.5 Add "SUMMARY (OPTIONAL)" section with Textarea input
  - [x] 7.6 Add footer with "Submit" button
  - [x] 7.7 Implement form state management and validation (activityType required)
  - [x] 7.8 On submit: call createActivity mutation, show loading state, close sheet on success, show toast feedback
  - [x] 7.9 Add `onActivityCreated` callback prop to trigger list refresh

- [x] 8.0 Frontend: Create ActivitiesTab component with search functionality
  - [x] 8.1 Create `modules/contacts/components/activities-tab.tsx` component
  - [x] 8.2 Add top bar with search input (placeholder "Search for activities") and "Add Activity" button
  - [x] 8.3 Implement search with 300ms debounce using existing `useDebounce` hook
  - [x] 8.4 Integrate `useActivities` hook to fetch activities for the contact
  - [x] 8.5 Render ActivityList when activities exist, ActivityEmptyState when empty
  - [x] 8.6 Add loading skeleton state while fetching
  - [x] 8.7 Manage AddActivitySheet open/close state
  - [x] 8.8 Implement refetch after activity creation

- [x] 9.0 Frontend: Integrate Activities tab in Person and Company detail pages
  - [x] 9.1 Open `app/(authenticated)/contacts/person/[id]/page.tsx`
  - [x] 9.2 Import `ActivitiesTab` component
  - [x] 9.3 Add new tab object to CardTabs: `{ value: 'activities', label: 'Activities', content: <ActivitiesTab contactId={...} contactName={...} /> }`
  - [x] 9.4 Open `app/(authenticated)/contacts/company/[id]/page.tsx`
  - [x] 9.5 Import `ActivitiesTab` component
  - [x] 9.6 Add new tab object to CardTabs: `{ value: 'activities', label: 'Activities', content: <ActivitiesTab contactId={...} contactName={...} /> }`
  - [ ] 9.7 Verify tab navigation works correctly on both pages

- [ ] 10.0 Testing and verification
  - [ ] 10.1 Start backend server and verify GraphQL schema includes Activity types
  - [ ] 10.2 Test `activities` query in GraphQL playground with a valid contactId
  - [ ] 10.3 Test `createActivity` mutation in GraphQL playground
  - [ ] 10.4 Test that changing lead status auto-creates STATUS_CHANGED activity
  - [ ] 10.5 Start frontend and navigate to a Person contact detail page
  - [ ] 10.6 Verify Activities tab appears and shows empty state initially
  - [ ] 10.7 Test adding a new activity via AddActivitySheet
  - [ ] 10.8 Verify activity appears in the list after creation
  - [ ] 10.9 Test search functionality filters activities by summary
  - [ ] 10.10 Repeat verification steps for Company contact detail page
  - [ ] 10.11 Test that STATUS_CHANGED activities appear after changing lead status from the UI
