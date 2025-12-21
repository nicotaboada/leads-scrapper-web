# Tasks: Company Detail Page - HubSpot-Style Layout with Contacts Tab

## Relevant Files

### Backend (leads-scrapper-backend)
- `src/contacts/contacts.resolver.ts` - Add new query for company employees
- `src/contacts/contacts.service.ts` - Add service method for fetching employees by company
- `src/contacts/dto/company-employees.input.ts` - DTO for company employees query input
- `prisma/schema.prisma` - Optional: Add website and address fields to Contact model

### Frontend (leads-scrapper-web)
- `modules/contacts/graphql/queries.ts` - Add GET_COMPANY_EMPLOYEES query
- `modules/contacts/hooks/use-company-employees.ts` - Hook for fetching company employees
- `modules/contacts/components/company-action-buttons.tsx` - Action buttons for company
- `modules/contacts/components/about-company-section.tsx` - About section for companies
- `modules/contacts/components/company-sidebar.tsx` - Left sidebar component
- `modules/contacts/components/company-overview-tab.tsx` - Overview tab content
- `modules/contacts/components/company-contacts-table.tsx` - Paginated table component
- `modules/contacts/components/company-contacts-tab.tsx` - Contacts tab wrapper
- `modules/contacts/types/contact.ts` - Add helper functions for company
- `app/(authenticated)/contacts/company/[id]/page.tsx` - Refactored page layout

### Notes

- Unit tests should be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Reuse existing components: `EditCompanySheet`, `DeleteContactDialog`, `CardTabs`, `Avatar`, `Button`, `DropdownMenu`
- Reuse phone utility from `modules/contacts/utils/phone.ts`
- Icons from `lucide-react`: `Mail`, `Phone`, `Linkedin`, `MessageCircle`, `MoreHorizontal`, `Building2`, `Globe`, `MapPin`

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/company-detail-hubspot-layout`

- [x] 1.0 Backend: Add GraphQL query for company employees
  - [x] 1.1 Read and understand current `contacts.resolver.ts` and `contacts.service.ts` implementation
  - [x] 1.2 Create `CompanyEmployeesInput` DTO with `companyId: string`, `page?: number`, `limit?: number`
  - [x] 1.3 Add `findEmployeesByCompany(companyId, page, limit)` method to `ContactsService`
  - [x] 1.4 Implement Prisma query to find contacts where `companyId` matches and `type = PERSON`
  - [x] 1.5 Return paginated response with `data` and `meta` (total, page, limit, totalPages, hasNextPage, hasPreviousPage)
  - [x] 1.6 Add `companyEmployees` query to `ContactsResolver` that calls the service method
  - [ ] 1.7 Test the query using GraphQL playground with a valid company ID

- [x] 2.0 Create CompanyActionButtons component
  - [x] 2.1 Create `modules/contacts/components/company-action-buttons.tsx` file
  - [x] 2.2 Define `CompanyActionButtonsProps` interface with `contact: CompanyContact`, `onEdit: () => void`, `onDelete: () => void`
  - [x] 2.3 Implement WhatsApp icon button using `buildWhatsAppUrl` from phone utils (conditional on `whatsapp` field)
  - [x] 2.4 Implement Email icon button that opens `mailto:{firstEmail}` (conditional on `companyEmails.length > 0`)
  - [x] 2.5 Implement LinkedIn icon button that opens LinkedIn URL in new tab (conditional on `linkedinUrl`)
  - [x] 2.6 Implement "More" dropdown button with "Editar empresa" and "Eliminar empresa" options
  - [x] 2.7 Add tooltips to each action button
  - [x] 2.8 Style buttons consistently with `ContactActionButtons` (person version)

- [x] 3.0 Create AboutCompanySection component
  - [x] 3.1 Create `modules/contacts/components/about-company-section.tsx` file
  - [x] 3.2 Define `AboutCompanySectionProps` interface with `contact: CompanyContact`
  - [x] 3.3 Create section header with "About this company" title
  - [x] 3.4 Implement Emails field - show all company emails, each with mailto link
  - [x] 3.5 Implement WhatsApp field row with MessageCircle icon and wa.me link (conditional)
  - [x] 3.6 Implement LinkedIn field row with Linkedin icon and external link (conditional)
  - [x] 3.7 Handle empty state when no company info is available
  - [x] 3.8 Style consistently with `AboutContactSection` (person version)

- [x] 4.0 Create CompanySidebar component
  - [x] 4.1 Create `modules/contacts/components/company-sidebar.tsx` file
  - [x] 4.2 Define `CompanySidebarProps` interface with `contact: CompanyContact`, `onEdit`, `onDelete`
  - [x] 4.3 Add helper function `getCompanyInitial(contact: CompanyContact): string` to types file
  - [x] 4.4 Implement company header with Avatar (Building2 icon or first letter), company name
  - [x] 4.5 Integrate `CompanyActionButtons` below the header
  - [x] 4.6 Integrate `AboutCompanySection` below action buttons
  - [x] 4.7 Add separator between header and about section
  - [x] 4.8 Style sidebar with fixed width (~280-320px), border, and proper padding
  - [x] 4.9 Create `CompanySidebarSkeleton` component for loading state

- [x] 5.0 Create CompanyOverviewTab component
  - [x] 5.1 Create `modules/contacts/components/company-overview-tab.tsx` file
  - [x] 5.2 Define `CompanyOverviewTabProps` interface with `contact: CompanyContact`
  - [x] 5.3 Implement placeholder content similar to PersonOverviewTab
  - [x] 5.4 Structure component to be easily extendable for future content

- [x] 6.0 Create CompanyContactsTable component
  - [x] 6.1 Create `modules/contacts/components/company-contacts-table.tsx` file
  - [x] 6.2 Define `CompanyContactsTableProps` interface with `employees: PersonContact[]`, `isLoading: boolean`
  - [x] 6.3 Create table with columns: Name, Job Title, Email Address, Mobile
  - [x] 6.4 Style table header with dark background matching the design reference
  - [x] 6.5 Make Name column a clickable link to `/contacts/person/{id}`
  - [x] 6.6 Handle empty cells gracefully (show "-" or empty)
  - [x] 6.7 Add hover state on table rows
  - [x] 6.8 Create `CompanyContactsTableSkeleton` for loading state

- [x] 7.0 Create CompanyContactsTab component with pagination
  - [x] 7.1 Create `modules/contacts/hooks/use-company-employees.ts` hook
  - [x] 7.2 Implement hook with Apollo useQuery for `GET_COMPANY_EMPLOYEES` query
  - [x] 7.3 Add pagination state management (page, limit)
  - [x] 7.4 Create `modules/contacts/components/company-contacts-tab.tsx` file
  - [x] 7.5 Define `CompanyContactsTabProps` with `companyId: string`
  - [x] 7.6 Use `useCompanyEmployees` hook to fetch data
  - [x] 7.7 Integrate `CompanyContactsTable` component
  - [x] 7.8 Add pagination controls at the bottom (Previous/Next buttons, page info)
  - [x] 7.9 Show "Showing X-Y of Z entries" text
  - [x] 7.10 Handle empty state: "No hay contactos asociados a esta empresa"
  - [x] 7.11 Handle loading state with skeleton

- [x] 8.0 Refactor CompanyDetailPage with new HubSpot-style layout
  - [x] 8.1 Read and understand current `app/(authenticated)/contacts/company/[id]/page.tsx`
  - [x] 8.2 Update imports to include new components (`CompanySidebar`, `CompanyOverviewTab`, `CompanyContactsTab`, `CardTabs`)
  - [x] 8.3 Add state management for edit sheet (`isEditOpen`) and delete dialog (`isDeleteOpen`)
  - [x] 8.4 Replace current layout with two-column flex container
  - [x] 8.5 Add `CompanySidebar` in left column with edit/delete handlers
  - [x] 8.6 Add `CardTabs` in right column with Overview and Contacts tabs
  - [x] 8.7 Pass `companyId` to `CompanyContactsTab` for fetching employees
  - [x] 8.8 Integrate existing `EditCompanySheet` component with open state
  - [x] 8.9 Integrate existing `DeleteContactDialog` component with open state and redirect on delete
  - [x] 8.10 Update `DetailHeader` with proper breadcrumb (Contactos > Company Name)
  - [x] 8.11 Maintain error and loading state handling
  - [x] 8.12 Update loading state to use `CompanySidebarSkeleton` + tabs skeleton

- [ ] 9.0 Add responsive styles and testing
  - [ ] 9.1 Add responsive breakpoints: stack layout on mobile (sidebar on top, tabs below)
  - [ ] 9.2 Ensure table is horizontally scrollable on small screens
  - [ ] 9.3 Test all action buttons work correctly (WhatsApp, Email, LinkedIn)
  - [ ] 9.4 Test Edit and Delete flows through the More menu
  - [ ] 9.5 Test pagination in Contacts tab (navigate between pages)
  - [ ] 9.6 Test clicking on employee name navigates to person detail
  - [ ] 9.7 Test with company that has no employees (empty state)
  - [ ] 9.8 Test with company that has many employees (pagination)
  - [ ] 9.9 Verify consistent styling with Person detail page
  - [ ] 9.10 Final visual review and adjustments

