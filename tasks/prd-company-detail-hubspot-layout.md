# PRD: Company Detail Page - HubSpot-Style Layout with Contacts Tab

## Introduction/Overview

This feature redesigns the Company Contact detail page to follow a HubSpot-inspired layout, similar to the Person Contact detail page. The new design features a **fixed left sidebar** with company information and quick action buttons, alongside a **right content area with tabbed navigation**. 

The key differentiator from the Person detail page is the addition of a **"Contacts" tab** that displays a paginated table of all Person contacts associated with that company (employees).

## Goals

1. Create a consistent HubSpot-style layout matching the Person contact detail page
2. Provide quick-action buttons (WhatsApp, Email, LinkedIn, More) for immediate engagement with the company
3. Display company information including emails, WhatsApp, LinkedIn, website, and address in the sidebar
4. Implement a tabbed interface with "Overview" and "Contacts" tabs
5. Show a paginated table of company employees/contacts in the Contacts tab
6. Allow navigation to individual contact detail pages from the contacts table

## User Stories

1. **As a user**, I want to see a company's logo/avatar and name prominently displayed, so I can quickly identify which company I'm viewing.

2. **As a user**, I want to click a WhatsApp button that opens WhatsApp directly with the company's number, so I can message them immediately.

3. **As a user**, I want to click an Email button that opens my email client with the company's primary email pre-filled, so I can compose a message quickly.

4. **As a user**, I want to click a LinkedIn button that opens the company's LinkedIn profile in a new tab, so I can view their professional information.

5. **As a user**, I want to see all company details (emails, WhatsApp, LinkedIn, website, address) in an "About this company" section, so I have all information at a glance.

6. **As a user**, I want to view a table of all contacts (employees) associated with this company, so I can see who works there.

7. **As a user**, I want to click on a contact's name in the table to navigate to their detail page, so I can view their full information.

8. **As a user**, I want the contacts table to be paginated, so I can browse through large lists of employees efficiently.

## Functional Requirements

### Layout Structure

1. The page must have a **two-column layout**:
   - **Left sidebar** (fixed width, ~280-320px): Contains company header and "About this company" section
   - **Right content area** (flexible width): Contains tabbed navigation with content panels

2. The layout must be **responsive**:
   - On desktop: Side-by-side columns
   - On mobile/tablet: Stacked layout (sidebar on top, tabs below)

### Left Sidebar - Company Header

3. The sidebar header must display:
   - A large avatar (64x64px or 80x80px) with the company's first letter as fallback (or a Building icon)
   - The company name as a heading

4. Below the avatar/name, display a row of **action buttons**:
   - **WhatsApp button**: Icon button that opens `https://wa.me/{phoneNumber}` in a new tab
   - **Email button**: Icon button that opens `mailto:{primaryEmail}` to compose an email
   - **LinkedIn button**: Icon button that opens the LinkedIn URL in a new tab
   - **More button**: Icon button (three dots) that opens a dropdown menu

5. Action buttons must be **conditionally displayed**:
   - WhatsApp button: Only show if `whatsapp` field has a value
   - Email button: Only show if `companyEmails` has at least one email
   - LinkedIn button: Only show if `linkedinUrl` field has a value
   - More button: Always visible

6. The **More dropdown menu** must contain:
   - "Editar empresa" option - triggers the existing edit company sheet
   - "Eliminar empresa" option - triggers the existing delete contact dialog

### Left Sidebar - About This Company

7. Display an **"About this company"** section

8. The section must display the following fields (if available):
   - **Emails**: Display all company emails with Mail icons, each clickable (mailto links)
   - **WhatsApp**: Displayed with a Phone/MessageCircle icon, clickable (wa.me link)
   - **LinkedIn**: Displayed with a LinkedIn icon, clickable (external link)
   - **Website**: Displayed with a Globe icon, clickable (external link) - *Note: Requires backend field addition*
   - **Dirección/Address**: Displayed with a MapPin icon - *Note: Requires backend field addition*

9. If a field is empty/null, it should not be displayed (no empty rows)

### Right Content Area - Tabs

10. The right content area must use the existing `CardTabs` component pattern

11. Implement two tabs:
    - **"Overview"** tab: Placeholder content (same as Person detail)
    - **"Contacts"** tab: Paginated table of employees

### Contacts Tab - Table Requirements

12. The contacts table must display the following columns:
    - **Name**: Full name (`firstName lastName`), clickable link to person detail page
    - **Job Title**: The contact's job title (or empty if not set)
    - **Email Address**: The contact's email
    - **Mobile**: The contact's phone number (`celular`)

13. The table must be **paginated**:
    - Show 10 contacts per page by default
    - Display pagination controls at the bottom
    - Show "Showing X-Y of Z entries" text

14. Clicking on a contact's **name** must navigate to `/contacts/person/{id}`

15. The table must handle **empty states**:
    - If no contacts are associated with the company, show a friendly message like "No hay contactos asociados a esta empresa"

16. The table must show a **loading skeleton** while fetching data

### Integration with Existing Components

17. Reuse the existing `EditCompanySheet` component for the "Editar empresa" action

18. Reuse the existing `DeleteContactDialog` component for the "Eliminar empresa" action

19. Create or modify GraphQL queries to fetch:
    - Company details
    - Paginated list of contacts (employees) for that company

20. Maintain the existing data fetching logic using Apollo Client

21. Keep the existing error and loading states

### Navigation

22. Include a breadcrumb navigation at the top of the page:
    - Format: `Contactos > {Company Name}`
    - Use the existing `DetailHeader` component

23. The breadcrumb "Contactos" link should navigate to `/contacts`

## Non-Goals (Out of Scope)

1. **Search functionality** in the contacts table - only pagination
2. **Filtering** contacts by job title or other fields
3. **Inline editing** of contacts from the table
4. **Adding new contacts** directly from this page (will be done via the main contacts page)
5. **Bulk actions** on contacts (select multiple, delete, etc.)
6. **Website and Address fields**: These require backend schema changes and are documented but may not be implemented in Phase 1

## Design Considerations

### Visual Reference

- Primary inspiration: HubSpot company detail page
- Secondary reference: The contacts table screenshot provided (simple table with Name, Job Title, Email, Mobile columns)
- Match the Person contact detail page layout for consistency

### Component Structure

```
CompanyDetailPage
├── DetailHeader (breadcrumb)
└── Container (flex, responsive)
    ├── CompanySidebar (left, fixed width)
    │   ├── CompanyHeader
    │   │   ├── Avatar (Building icon or first letter)
    │   │   ├── Company Name
    │   │   └── ActionButtons (WhatsApp, Email, LinkedIn, More)
    │   └── AboutCompanySection
    │       └── CompanyFields (emails, whatsapp, linkedin, website, address)
    └── CardTabs (right, flexible)
        ├── OverviewTab (placeholder)
        └── ContactsTab
            └── CompanyContactsTable (paginated)
```

### Table Styling

- Use existing table styles from the application
- Header row with dark background (matching the screenshot)
- Sortable column headers (optional, can be added later)
- Hover state on rows
- Name column styled as link (blue, underline on hover)

## Technical Considerations

### Backend Changes Required

1. **New fields for Company** (optional for Phase 1):
   - `website: String?` - Company website URL
   - `address: String?` - Company address

2. **GraphQL Query for Company Employees**:
   - Create or modify a query to fetch employees of a company with pagination
   - Query should accept `companyId` and pagination parameters (`page`, `limit`)

### Frontend Query Example

```graphql
query GetCompanyEmployees($companyId: String!, $page: Int, $limit: Int) {
  companyEmployees(companyId: $companyId, page: $page, limit: $limit) {
    data {
      id
      firstName
      lastName
      jobTitle
      email
      celular
    }
    meta {
      total
      page
      limit
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
}
```

### File Structure

New/modified files:
- `modules/contacts/components/company-sidebar.tsx` - New sidebar component for companies
- `modules/contacts/components/company-action-buttons.tsx` - Action buttons (can reuse/extend ContactActionButtons)
- `modules/contacts/components/about-company-section.tsx` - About section for companies
- `modules/contacts/components/company-overview-tab.tsx` - Overview tab content
- `modules/contacts/components/company-contacts-tab.tsx` - Contacts table tab
- `modules/contacts/components/company-contacts-table.tsx` - Paginated table component
- `modules/contacts/graphql/queries.ts` - Add query for company employees
- `modules/contacts/hooks/use-company-employees.ts` - Hook for fetching employees
- `app/(authenticated)/contacts/company/[id]/page.tsx` - Modified page layout
- `modules/contacts/types/contact.ts` - Add `getCompanyInitial` helper function

### Dependencies on Backend

- A new GraphQL query `companyEmployees` or modification to existing queries
- Optional: Schema migration for `website` and `address` fields

## Success Metrics

1. **Functional**: All action buttons work correctly (WhatsApp, Email, LinkedIn)
2. **Navigation**: Clicking on employee names navigates to their detail pages
3. **Pagination**: Table pagination works correctly and updates URL/state
4. **Visual**: Layout matches Person detail page and is consistent with app design
5. **Responsive**: Page is usable on both desktop and mobile devices
6. **Performance**: No regression in page load time; table loads efficiently

## Open Questions

1. Should the contacts table show a count badge on the "Contacts" tab (e.g., "Contacts (12)")?
2. For the company avatar, should we use a Building icon or the first letter of the company name?
3. Should we add the ability to sort columns in the contacts table (click on headers)?
4. What is the priority of adding `website` and `address` fields to the backend?
5. Should the GET_CONTACT query be modified to optionally include employees, or use a separate query?

