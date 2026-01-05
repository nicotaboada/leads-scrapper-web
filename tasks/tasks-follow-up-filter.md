## Relevant Files

### Backend (leads-scrapper-backend)

- `src/contacts/entities/follow-up-filter-type.enum.ts` - New enum for follow-up filter options (OVERDUE, TODAY, NEXT_3_DAYS, NO_FOLLOW_UP)
- `src/contacts/dto/contacts-filter.input.ts` - Add followUpFilter field to existing DTO
- `src/contacts/contacts.service.ts` - Implement filter logic with date comparisons

### Frontend (leads-scrapper-web)

- `modules/contacts/types/follow-up-filter.ts` - New type for FollowUpFilterValue enum
- `modules/contacts/types/index.ts` - Export new follow-up filter types
- `modules/contacts/components/follow-up-filter.tsx` - New filter component following LeadStatusFilter pattern
- `modules/contacts/graphql/queries.ts` - Verify filter input is passed correctly (no changes needed, uses ContactsFilterInput)
- `app/(authenticated)/contacts/page.tsx` - Integrate FollowUpFilter component

### Notes

- This feature spans both frontend (leads-scrapper-web) and backend (leads-scrapper-backend) repositories
- Follow the existing pattern from LeadStatusFilter for consistency
- Date comparisons should consider only the date portion (start/end of day)
- The filter uses single selection (not multiple)

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/follow-up-filter`

- [x] 1.0 Create FollowUpFilterType enum in backend
  - [x] 1.1 Create new file `src/contacts/entities/follow-up-filter-type.enum.ts`
  - [x] 1.2 Define enum with values: `OVERDUE`, `TODAY`, `NEXT_3_DAYS`, `NO_FOLLOW_UP`
  - [x] 1.3 Register enum with GraphQL using `registerEnumType` (follow LeadStatus pattern)
  - [x] 1.4 Add Spanish descriptions for each enum value

- [x] 2.0 Add followUpFilter to ContactsFilterInput DTO
  - [x] 2.1 Import `FollowUpFilterType` enum in `contacts-filter.input.ts`
  - [x] 2.2 Add `followUpFilter` field of type `FollowUpFilterType` with `@Field` decorator
  - [x] 2.3 Add `@IsOptional()` and `@IsEnum()` validators
  - [x] 2.4 Add descriptive comment for the field

- [x] 3.0 Implement filter logic in ContactsService
  - [x] 3.1 Locate the `findAll` or equivalent method that handles contact queries
  - [x] 3.2 Create helper function `applyFollowUpFilter` to generate Prisma where clause
  - [x] 3.3 Implement OVERDUE logic: `followUp.dueDate < startOfToday`
  - [x] 3.4 Implement TODAY logic: `followUp.dueDate >= startOfToday AND <= endOfToday`
  - [x] 3.5 Implement NEXT_3_DAYS logic: `followUp.dueDate >= startOfTomorrow AND <= endOfDay+3`
  - [x] 3.6 Implement NO_FOLLOW_UP logic: `followUp IS NULL`
  - [x] 3.7 Integrate the filter condition into the main query where clause
  - [ ] 3.8 Rebuild the backend to verify no compilation errors: `pnpm build`

- [x] 4.0 Create FollowUpFilter component in frontend
  - [x] 4.1 Create new file `modules/contacts/types/follow-up-filter.ts` with `FollowUpFilterValue` type
  - [x] 4.2 Export the new type from `modules/contacts/types/index.ts`
  - [x] 4.3 Create new file `modules/contacts/components/follow-up-filter.tsx`
  - [x] 4.4 Define FOLLOW_UP_FILTER_CONFIG with labels and emoji indicators (🔴🟡🟢⚪)
  - [x] 4.5 Implement component using FilterBy and Select (follow LeadStatusFilter pattern)
  - [x] 4.6 Add props interface: `value: FollowUpFilterValue | null`, `onApply: (value) => void`
  - [x] 4.7 Implement handleApply, handleClear, and getDisplayValue functions

- [x] 5.0 Integrate filter into contacts page
  - [x] 5.1 Import `FollowUpFilter` component in `app/(authenticated)/contacts/page.tsx`
  - [x] 5.2 Import `FollowUpFilterValue` type
  - [x] 5.3 Add state: `const [followUpFilter, setFollowUpFilter] = useState<FollowUpFilterValue | null>(null)`
  - [x] 5.4 Add `followUpFilter` to the filter object in `queryVariables`
  - [x] 5.5 Add `<FollowUpFilter value={followUpFilter} onApply={setFollowUpFilter} />` after CityFilter
  - [ ] 5.6 Verify the frontend compiles without errors: `pnpm build`

- [ ] 6.0 Test and verify the complete flow
  - [ ] 6.1 Start the backend server and verify GraphQL schema includes new filter
  - [ ] 6.2 Start the frontend and navigate to contacts page
  - [ ] 6.3 Verify the FollowUpFilter appears in the filter row with correct styling
  - [ ] 6.4 Test OVERDUE filter with contacts that have past due dates
  - [ ] 6.5 Test TODAY filter with contacts that have today's date
  - [ ] 6.6 Test NEXT_3_DAYS filter with contacts in the upcoming 3-day window
  - [ ] 6.7 Test NO_FOLLOW_UP filter shows contacts without any follow-up
  - [ ] 6.8 Verify clearing the filter resets the contact list
  - [ ] 6.9 Verify the filter works in combination with other existing filters
