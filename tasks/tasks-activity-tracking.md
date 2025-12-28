## Relevant Files

### Backend (leads-scrapper-backend)

- `prisma/schema.prisma` - Add UserActivity model and UserActivityType enum
- `src/user-activities/user-activities.module.ts` - Module definition for user activities
- `src/user-activities/user-activities.service.ts` - Service with business logic for creating and querying activities
- `src/user-activities/user-activities.resolver.ts` - GraphQL resolver for activities queries
- `src/user-activities/entities/user-activity.entity.ts` - GraphQL entity for UserActivity
- `src/user-activities/entities/user-activity-type.enum.ts` - Enum for activity types
- `src/user-activities/entities/date-range-filter.enum.ts` - Enum for date range filter options
- `src/user-activities/entities/user-activity-connection.entity.ts` - Connection type for cursor pagination
- `src/user-activities/dto/user-activities-filter.input.ts` - DTO for filtering activities
- `src/contacts/contacts.service.ts` - Integrate activity logging on contact creation, lead status change, follow-up creation
- `src/runs/runs.service.ts` - Integrate activity logging on run creation and bulk contacts creation
- `src/users/users.service.ts` - Add method to list all users for filter dropdown

### Frontend (leads-scrapper-web)

- `modules/activities/types/activity.ts` - TypeScript types for activities
- `modules/activities/graphql/activity-queries.ts` - GraphQL queries and fragments
- `modules/activities/hooks/use-activities.ts` - Hook for fetching activities for card
- `modules/activities/hooks/use-infinite-activities.ts` - Hook for infinite scroll in sheet
- `modules/activities/hooks/use-users-list.ts` - Hook for users filter dropdown
- `modules/activities/components/activity-card.tsx` - Dashboard card component
- `modules/activities/components/activity-item.tsx` - Individual activity row component
- `modules/activities/components/activity-icon.tsx` - Icon component per activity type
- `modules/activities/components/activity-sheet.tsx` - Sheet with filters and infinite scroll
- `modules/activities/components/activity-empty-state.tsx` - Empty state component
- `modules/activities/index.ts` - Module exports
- `app/(authenticated)/dashboard/page.tsx` - Integrate ActivityCard in dashboard

### Notes

- The existing `Activity` model in Prisma is for contact-specific activities (emails, calls, notes). We need a NEW `UserActivity` model for system-wide activity tracking.
- Unit tests should be placed alongside the code files they are testing.
- Use `npx jest [optional/path/to/test/file]` to run tests.
- This feature spans both backend and frontend repositories.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branches (SKIPPED - working directly on main)

- [x] 1.0 Backend: Create UserActivity model and Prisma schema
  - [x] 1.1 Add `UserActivityType` enum to `prisma/schema.prisma`
  - [x] 1.2 Add `UserActivity` model to `prisma/schema.prisma`
  - [x] 1.3 Add indexes on `UserActivity`
  - [ ] 1.4 Run migration SQL manually (provided in conversation)
  - [ ] 1.5 Run `npx prisma generate` to regenerate Prisma client

- [x] 2.0 Backend: Create UserActivities module (service + resolver)
  - [x] 2.1 Create `src/user-activities/` directory structure
  - [x] 2.2 Create `entities/user-activity-type.enum.ts`
  - [x] 2.3 Create `entities/date-range-filter.enum.ts`
  - [x] 2.4 Create `entities/user-activity.entity.ts`
  - [x] 2.5 Create `entities/user-activity-connection.entity.ts`
  - [x] 2.6 Create `dto/user-activities-filter.input.ts`
  - [x] 2.7 Create `user-activities.service.ts`
  - [x] 2.8 Create `user-activities.resolver.ts`
  - [x] 2.9 Create `user-activities.module.ts` and register in `app.module.ts`
  - [x] 2.10 Query `users` already exists in UsersResolver

- [x] 3.0 Backend: Integrate activity logging in existing services
  - [x] 3.1 Inject `UserActivitiesService` into `ContactsService`
  - [x] 3.2 Log `CONTACT_CREATED` activity in `createCompany()` and `createPersonContact()`
  - [x] 3.3 Log `LEAD_STATUS_CHANGED` activity in `updateLeadStatus()`
  - [x] 3.4 Log `FOLLOWUP_ADDED` activity in `createFollowUp()`
  - [x] 3.5 Inject `UserActivitiesService` into `RunsService`
  - [x] 3.6 Log `RUN_CREATED` activity in `createRun()`
  - [x] 3.7 Log `BULK_CONTACTS_CREATED` activity in `bulkCreateCompaniesFromRun()`
  - [x] 3.8 Update methods to accept `author` parameter

- [x] 4.0 Frontend: Create activities module structure and GraphQL queries
  - [x] 4.1 Create `modules/activities/` directory structure
  - [x] 4.2 Create `types/activity.ts`
  - [x] 4.3 Create `graphql/activity-queries.ts`
  - [x] 4.4 Create `hooks/use-users-list.ts`
  - [x] 4.5 Create `hooks/use-activities.ts`
  - [x] 4.6 Create `hooks/use-infinite-activities.ts`
  - [x] 4.7 Create `modules/activities/index.ts`

- [x] 5.0 Frontend: Create ActivityCard component for dashboard
  - [x] 5.1 Create `components/activity-icon.tsx`
  - [x] 5.2 Create `components/activity-item.tsx`
  - [x] 5.3 ActivityMessage component handles message formatting with links
  - [x] 5.4 Create `components/activity-empty-state.tsx`
  - [x] 5.5 Create `components/activity-card.tsx`
  - [x] 5.6 Styled with dark theme (consistent with existing cards)

- [x] 6.0 Frontend: Create ActivitySheet with filters and infinite scroll
  - [x] 6.1 Create `components/activity-sheet.tsx`
  - [x] 6.2 Add user filter Select dropdown
  - [x] 6.3 Add date range filter Select dropdown
  - [x] 6.4 Implement infinite scroll using intersection observer
  - [x] 6.5 Connect filters to `useInfiniteActivities` hook
  - [x] 6.6 Add loading states and empty state handling
  - [x] 6.7 Wire up sheet trigger from ActivityCard's "Ver más" button

- [x] 7.0 Frontend: Integrate ActivityCard in dashboard
  - [x] 7.1 Import `ActivityCard` in `app/(authenticated)/dashboard/page.tsx`
  - [x] 7.2 Add `ActivityCard` to the dashboard grid layout
  - [ ] 7.3 Verify card displays correctly (requires running app)

- [x] 8.0 Backend: Implement cleanup job for 90-day retention
  - [x] 8.1 Add `deleteOldActivities()` method in `UserActivitiesService`
  - [x] 8.2 Add `cleanupOldActivities` mutation for manual execution
  - [ ] 8.3 (Optional) Install `@nestjs/schedule` and add @Cron decorator for automatic daily cleanup

- [ ] 9.0 Integration and testing
  - [ ] 9.1 Test activity creation by manually creating contacts, runs, and changing lead statuses
  - [ ] 9.2 Verify activities appear correctly in dashboard card
  - [ ] 9.3 Test filters in sheet (by user, by date range)
  - [ ] 9.4 Test infinite scroll in sheet
  - [ ] 9.5 Test navigation links in activities (to contacts and runs)
  - [ ] 9.6 Test edge cases: deleted contacts/runs referenced in activities
  - [ ] 9.7 Verify 90-day cleanup job works correctly
