# Tasks: Leads Enrichment Tab in Run Details

## Relevant Files

- `modules/runs/types/create-run.ts` - Add `scrapeLeads` field to schema and form input type
- `modules/runs/components/create-run-sheet.tsx` - Add Leads Enrichment checkbox with tooltip
- `modules/runs/types/lead.ts` - New file for Lead interface and related types
- `modules/runs/graphql/queries.ts` - Add query for fetching paginated leads
- `modules/runs/graphql/mutations.ts` - Add mutation for bulk creating person contacts from leads
- `app/(authenticated)/runs/[id]/page.tsx` - Modify to add tab navigation
- `modules/runs/components/run-detail-tabs.tsx` - New component for tab navigation
- `modules/runs/components/leads-enrichment-table.tsx` - New component for leads table
- `modules/runs/components/lead-contact-icons-cell.tsx` - New component for LinkedIn/Email/WhatsApp icons
- `modules/runs/components/leads-bulk-action-header.tsx` - New component for leads bulk actions
- `modules/runs/components/leads-company-warning-modal.tsx` - New component for company validation warning
- `modules/runs/hooks/use-run-leads.ts` - New hook for fetching paginated leads
- `modules/runs/hooks/use-bulk-create-person-contacts.ts` - New hook for bulk creating person contacts
- `modules/runs/types/run.ts` - Add `scrapeLeads` field to Run interface if needed

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- This feature spans frontend only; backend GraphQL changes are assumed to be ready.
- Reference existing components like `SocialIconsCell`, `RunResultsTable`, `BulkActionHeader` for patterns.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature (`git checkout -b feature/leads-enrichment-tab`)

- [x] 1.0 Add Leads Enrichment checkbox to Create Run Sheet
  - [x] 1.1 Read `modules/runs/types/create-run.ts` to understand current schema
  - [x] 1.2 Add `scrapeLeads: z.boolean().default(false)` to `createRunSchema`
  - [x] 1.3 Add `scrapeLeads: boolean` to `CreateRunFormInput` interface
  - [x] 1.4 Read `modules/runs/components/create-run-sheet.tsx` to understand current structure
  - [x] 1.5 Add `scrapeLeads: false` to form default values in `useForm`
  - [x] 1.6 Create new FormField for `scrapeLeads` checkbox below "Company Contacts Enrichment"
  - [x] 1.7 Add FormLabel with text "Leads Enrichment (People)" and HelpCircle icon with Tooltip
  - [x] 1.8 Add Tooltip content with pricing info: "$8.00 per 1,000 profiles ($0.008/profile)"
  - [x] 1.9 Add FormDescription: "Extract person leads with LinkedIn, email and phone"
  - [x] 1.10 Update `handleSubmit` to include `scrapeLeads: data.scrapeLeads ?? false` in input object

- [x] 2.0 Create Lead types and GraphQL operations
  - [x] 2.1 Create new file `modules/runs/types/lead.ts`
  - [x] 2.2 Define `Lead` interface with fields: id, title (company), firstName, lastName, fullName, linkedinProfile, email, mobileNumber, headline
  - [x] 2.3 Define `PageInfo` type for leads pagination (or reuse existing)
  - [x] 2.4 Define `PaginatedLeadsResponse` interface
  - [x] 2.5 Read `modules/runs/graphql/queries.ts` for query patterns
  - [x] 2.6 Add `GET_RUN_LEADS` query with pagination (runId, page, pageSize) returning leads and pageInfo
  - [x] 2.7 Read `modules/runs/graphql/mutations.ts` for mutation patterns
  - [x] 2.8 Add `BULK_CREATE_PERSON_CONTACTS` mutation accepting lead IDs and returning created count
  - [x] 2.9 Define input and response types for the bulk create mutation
  - [x] 2.10 Export all new types from `modules/runs/types/index.ts` if it exists

- [x] 3.0 Add Tab Navigation to Run Details page
  - [x] 3.1 Read `app/(authenticated)/runs/[id]/page.tsx` to understand current structure
  - [x] 3.2 Read `components/ui/tabs.tsx` or check if shadcn tabs component exists
  - [x] 3.3 Create `modules/runs/components/run-detail-tabs.tsx` component
  - [x] 3.4 Define props: `activeTab`, `onTabChange`, `leadsCount` (optional for badge)
  - [x] 3.5 Implement two tabs: "Overview" and "Leads Enrichment"
  - [x] 3.6 Style tabs to match Apify's horizontal tab design
  - [x] 3.7 Modify `app/(authenticated)/runs/[id]/page.tsx` to use `useSearchParams` for tab state
  - [x] 3.8 Add state for active tab with default "overview"
  - [x] 3.9 Integrate `RunDetailTabs` component above content area
  - [x] 3.10 Conditionally render Overview content (RunStatusSection + RunResultsTable) or Leads content based on tab
  - [x] 3.11 Update URL query parameter when tab changes (e.g., `?tab=leads`)

- [x] 4.0 Create Lead Contact Icons Cell component
  - [x] 4.1 Read `modules/runs/components/social-icons-cell.tsx` for reference patterns
  - [x] 4.2 Create `modules/runs/components/lead-contact-icons-cell.tsx` component
  - [x] 4.3 Define props: `linkedinUrl`, `email`, `phone`
  - [x] 4.4 Import LinkedIn, Mail, and Phone (or MessageCircle for WhatsApp) icons from lucide-react
  - [x] 4.5 Implement LinkedIn icon that opens URL in new tab when available, disabled style when not
  - [x] 4.6 Implement Email icon that opens `mailto:` link when available, disabled style when not
  - [x] 4.7 Implement WhatsApp icon that opens `https://wa.me/{phone}` when available, disabled style when not
  - [x] 4.8 Use consistent icon sizing and spacing (match SocialIconsCell)
  - [x] 4.9 Add appropriate hover states and cursor styles
  - [x] 4.10 Export component

- [x] 5.0 Create Leads Enrichment Table component
  - [x] 5.1 Read `modules/runs/components/run-results-table.tsx` for table patterns
  - [x] 5.2 Create `modules/runs/components/leads-enrichment-table.tsx` component
  - [x] 5.3 Define props interface: leads, pageInfo, loading, onPageChange, onPageSizeChange, bulk selection props
  - [x] 5.4 Create table structure with TableHeader and columns: Checkbox, Full Name, Position, Company, Contact Icons
  - [x] 5.5 Implement TableBody with lead data rows
  - [x] 5.6 Integrate `LeadContactIconsCell` for the contact icons column
  - [x] 5.7 Add SelectionDropdown in header for bulk selection
  - [x] 5.8 Add individual row checkboxes with selection state
  - [x] 5.9 Implement pagination controls (page size selector, prev/next buttons, page info display)
  - [x] 5.10 Add loading state with spinner (similar to RunResultsTable)
  - [x] 5.11 Add empty state for when leads enrichment was not enabled
  - [x] 5.12 Add empty state for when no leads were found
  - [x] 5.13 Export component

- [x] 6.0 Create hooks for leads data fetching
  - [x] 6.1 Read `modules/runs/hooks/use-run-results.ts` for hook patterns
  - [x] 6.2 Create `modules/runs/hooks/use-run-leads.ts` hook
  - [x] 6.3 Define hook parameters: runId, page, pageSize, enabled
  - [x] 6.4 Use `useQuery` from Apollo Client with `GET_RUN_LEADS` query
  - [x] 6.5 Return leads array, pageInfo, loading, and error states
  - [x] 6.6 Handle skip condition when not enabled or no runId
  - [x] 6.7 Export hook

- [x] 7.0 Implement bulk selection and create contacts for leads
  - [x] 7.1 Read `modules/runs/hooks/use-bulk-selection.ts` for selection patterns
  - [x] 7.2 Read `modules/runs/components/bulk-action-header.tsx` for action header patterns
  - [x] 7.3 Create `modules/runs/components/leads-bulk-action-header.tsx` component
  - [x] 7.4 Display selected count and "Add Contacts" button
  - [x] 7.5 Create `modules/runs/hooks/use-bulk-create-person-contacts.ts` hook
  - [x] 7.6 Implement mutation call with selection payload (selectionMode, selectedIds, deselectedIds)
  - [x] 7.7 Return bulkCreate function, loading state, and result
  - [x] 7.8 Integrate `useBulkSelection` hook in run detail page for leads tab
  - [x] 7.9 Wire up "Add Contacts" button to trigger company validation flow
  - [x] 7.10 Show toast notifications for success/partial/error results

- [x] 8.0 Add company association validation
  - [x] 8.1 Read `modules/runs/components/bulk-create-modal.tsx` for modal patterns
  - [x] 8.2 Create `modules/runs/components/leads-company-warning-modal.tsx` component
  - [x] 8.3 Define props: open, onOpenChange, missingCompanyCount, totalCount, onCancel, onProceed, loading
  - [x] 8.4 Display warning message: "Some companies have not been created yet. X contacts will be created without a company association."
  - [x] 8.5 Add "Cancel" and "Proceed Anyway" buttons
  - [x] 8.6 Implement logic to check if companies exist before creating contacts
  - [x] 8.7 If all companies exist: skip modal, create contacts directly
  - [x] 8.8 If some companies missing: show warning modal
  - [x] 8.9 Handle "Proceed Anyway" action to create contacts with company: null
  - [x] 8.10 Show appropriate toast messages based on result (success, partial with company info, error)
  - [x] 8.11 Export component and integrate into run detail page

- [ ] 9.0 Integration and Testing
  - [ ] 9.1 Verify tab navigation works and persists state via URL
  - [ ] 9.2 Verify Create Run sheet sends `scrapeLeads` field correctly
  - [ ] 9.3 Test leads table pagination
  - [ ] 9.4 Test bulk selection across pages
  - [ ] 9.5 Test Add Contacts flow with all companies existing
  - [ ] 9.6 Test Add Contacts flow with some companies missing (warning modal)
  - [ ] 9.7 Verify contact icons open correct URLs (LinkedIn, mailto, wa.me)
  - [ ] 9.8 Test empty states for both scenarios (not enabled, no results)
  - [ ] 9.9 Verify no regression in Overview tab functionality

**Note:** Testing requires backend GraphQL support for `getRunLeads` query and `bulkCreatePersonContactsFromLeads` mutation.
