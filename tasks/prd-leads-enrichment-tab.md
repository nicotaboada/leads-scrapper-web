# PRD: Leads Enrichment Tab in Run Details

## Introduction/Overview

This feature adds a tabbed navigation system to the Run Details page (`/runs/[id]`), similar to Apify's interface. The existing content becomes the "Overview" tab, and a new "Leads Enrichment" tab is added to display person leads (employees/contacts) extracted from the scraped companies.

When enabled via a new checkbox in the Create Run sheet, Apify's scraper will collect person leads (employees with LinkedIn profiles, emails, phones) associated with each scraped business. These leads can then be viewed in a paginated table with multi-selection support to create them as Person contacts in the CRM.

**Problem solved:** Users need visibility into the person-level leads captured during scraping runs and a way to import them as contacts in the system, enabling direct outreach to decision-makers within scraped companies.

## Goals

1. Add tabbed navigation to Run Details page with "Overview" and "Leads Enrichment" tabs
2. Display leads enrichment data in a paginated table with fullname, job title, company, and contact icons
3. Enable multi-selection of leads with bulk "Add Contacts" functionality
4. Add a new checkbox in Create Run sheet to enable leads enrichment scraping
5. Show appropriate validation/warning when creating contacts without pre-existing company records

## User Stories

### US-1: View Leads from Run
As a user, I want to see a separate tab for leads (person contacts) extracted from my scraping run, so I can review the people associated with the scraped companies.

### US-2: Enable Leads Enrichment
As a user, I want to enable leads enrichment when creating a run, so the scraper collects person-level data (LinkedIn profiles, emails, etc.) from the businesses.

### US-3: Bulk Create Person Contacts
As a user, I want to select multiple leads and add them as contacts in my CRM, so I can start outreach to relevant people.

### US-4: Company Association Warning
As a user, I want to be warned if some leads' companies haven't been created yet, so I understand the contacts will be created without a company association.

### US-5: Quick Access to Lead Information
As a user, I want to quickly access a lead's LinkedIn, send an email, or open WhatsApp from the table, so I can reach out without extra clicks.

## Functional Requirements

### FR-1: Create Run Sheet - Leads Enrichment Checkbox

1.1. Add a new checkbox field `scrapeLeads` (or `leadsEnrichment`) in the Create Run form, below the existing "Company Contacts Enrichment" checkbox.

1.2. The checkbox should have:
   - Label: "Leads Enrichment (People)"
   - Tooltip with pricing info: "Extract employee/contact information from LinkedIn profiles found on business websites. Pricing: $8.00 per 1,000 profiles ($0.008/profile). Charges based on total profiles enriched."
   - Description: "Extract person leads with LinkedIn, email and phone"

1.3. The checkbox should be disabled and unchecked by default.

1.4. Update the `CreateRunInput` and `createRunSchema` to include the new field.

1.5. Send `scrapeLeads: boolean` to the backend when creating the run.

### FR-2: Run Details Page - Tab Navigation

2.1. Replace the current single-view layout with a tabbed navigation component.

2.2. Implement two tabs:
   - **Overview** (default): Contains all current content (status section, results table)
   - **Leads Enrichment**: Contains the new leads table

2.3. Tab navigation should:
   - Use URL query parameter to persist tab state (e.g., `/runs/[id]?tab=leads`)
   - Default to "Overview" tab when no parameter is present
   - Match the visual style shown in Apify's interface (horizontal tabs above content)

2.4. The "Leads Enrichment" tab should be always visible but show an empty state message if:
   - Leads enrichment was not enabled for this run
   - Message: "Leads enrichment was not enabled for this run. Enable it when creating a new run to collect person leads."

### FR-3: Leads Enrichment Table

3.1. Create a paginated table displaying lead/person data with the following columns:
   - **Checkbox**: For multi-selection (same pattern as Overview tab)
   - **Full Name**: Display full name of the lead
   - **Position**: Job title/role at the company (cargo)
   - **Company**: Name of the company this lead belongs to (from the run results)
   - **Contact Icons**: Icons column (similar to Overview's social icons)

3.2. Contact Icons column should display 3 icons:
   - **LinkedIn**: Opens LinkedIn profile URL in new tab (enabled if `linkedinProfile` exists)
   - **Email**: Opens `mailto:` link (enabled if `email` exists)
   - **WhatsApp**: Opens `wa.me` link with phone number (enabled if `mobileNumber` or phone exists)

3.3. Icons should be:
   - Colored/enabled when the contact method is available
   - Grayed out/disabled when the contact method is not available
   - Use the same icon styling pattern as `SocialIconsCell` component

3.4. Table must support pagination (same pattern as `RunResultsTable`):
   - Page size selector (10, 20, 50, 100)
   - Previous/Next buttons
   - "Page X of Y (Z total results)" display

### FR-4: Leads Data Source

4.1. Leads data comes from Apify API response, likely in a field like `leadsEnrichment` within each run result.

4.2. Expected lead data structure (based on Apify screenshots):
```typescript
interface Lead {
  id: string
  title: string           // Company name (from run result)
  firstName: string
  lastName: string
  fullName: string
  linkedinProfile: string | null
  email: string | null
  mobileNumber: string | null
  headline: string        // Job title/position
}
```

4.3. Create appropriate GraphQL query to fetch paginated leads for a run.

4.4. If leads data is nested within results, create a separate query/endpoint or transform the data appropriately.

### FR-5: Bulk Selection for Leads

5.1. Implement the same multi-selection pattern used in the Overview tab:
   - Header checkbox with dropdown (None, Page, All)
   - Individual row checkboxes
   - Selection count display

5.2. Show "Add Contacts" button when leads are selected (same pattern as `BulkActionHeader`).

5.3. Use the existing `useBulkSelection` hook pattern for state management.

### FR-6: Create Person Contacts from Leads

6.1. When "Add Contacts" is clicked, call a mutation to create Person contacts from selected leads.

6.2. Map lead data to `PersonContact` type:
   - `firstName` → from lead
   - `lastName` → from lead
   - `jobTitle` → from lead's headline/position
   - `email` → from lead's email
   - `celular` → from lead's mobileNumber
   - `linkedinUrl` → from lead's linkedinProfile
   - `company` → match with existing Company contact if it was created from Overview tab

6.3. Before creating contacts, check if the associated companies exist in the system.

### FR-7: Company Association Validation

7.1. When the user clicks "Add Contacts" for leads:
   - Check if the associated companies (from the run) have already been created as Company contacts
   - If ALL companies exist: proceed with creation (toast success)
   - If SOME companies don't exist: show a warning toast/alert before proceeding

7.2. Warning message format:
   - "Some companies have not been created yet. The following contacts will be created without a company association: [X contacts]. Do you want to proceed?"
   - Buttons: "Cancel" | "Proceed Anyway"

7.3. If the user clicks "Proceed Anyway", create the contacts with `company: null`.

7.4. Show toast notification with results:
   - Success: "X contacts created successfully"
   - Partial: "X contacts created. Y contacts created without company."
   - Error: Handle errors gracefully

## Non-Goals (Out of Scope)

- Auto-creating companies when leads are added (companies must be created from Overview tab first)
- Editing lead data before creating contacts
- Filtering or searching within the leads table (can be added later)
- Exporting leads to CSV/Excel
- Lead deduplication logic
- Real-time subscription for leads table (static data after run completes)

## Design Considerations

### Tab Navigation Component
- Use a horizontal tab bar similar to Apify's design
- Tabs should have clear active/inactive states
- Consider using `shadcn/ui` Tabs component or create a custom one matching existing design

### Leads Table
- Follow the same visual style as `RunResultsTable`
- Contact icons should use the same styling pattern as `SocialIconsCell`
- Empty state should be informative and guide users to enable the feature

### Warning Modal
- Use existing modal/dialog patterns in the codebase
- Keep the message concise but informative
- Clear action buttons (Cancel, Proceed)

## Technical Considerations

### Frontend Components to Create/Modify
1. **Modify** `app/(authenticated)/runs/[id]/page.tsx` - Add tab navigation
2. **Create** `modules/runs/components/run-detail-tabs.tsx` - Tab navigation component
3. **Create** `modules/runs/components/leads-enrichment-table.tsx` - Leads table
4. **Create** `modules/runs/components/lead-contact-icons-cell.tsx` - Icons for leads
5. **Modify** `modules/runs/components/create-run-sheet.tsx` - Add leads enrichment checkbox
6. **Modify** `modules/runs/types/create-run.ts` - Add `scrapeLeads` field to schema

### GraphQL
1. Add `scrapeLeads` field to `CreateRunInput`
2. Create query for fetching leads from a run (paginated)
3. Create mutation for bulk creating person contacts from leads
4. The Run type may need to include `leadsEnrichmentEnabled` boolean

### Hooks to Create
1. `useRunLeads(runId, page, pageSize)` - Fetch paginated leads
2. `useBulkCreatePersonContacts()` - Create person contacts from leads

### Types to Create/Modify
1. Add `Lead` interface in `modules/runs/types/lead.ts`
2. Add `scrapeLeads` to `CreateRunFormInput` and schema
3. Add response types for leads queries

## Success Metrics

1. Users can successfully view leads captured from runs with enrichment enabled
2. Users can create person contacts from leads with proper company associations
3. Clear feedback provided when companies are missing
4. No regression in existing Overview tab functionality
5. Tab navigation persists state correctly through URL

## Open Questions

1. What is the exact field name in the Apify response for leads data? (Need to verify: `leadsEnrichment`, `socialMediaProfiles`, etc.)
2. Is there a separate API endpoint for leads or are they nested in results?
3. Should we show a count badge on the "Leads Enrichment" tab showing number of leads?
4. What should happen if a lead's company name doesn't exactly match a created company? (Fuzzy matching?)
5. Should we track which leads have already been imported as contacts to avoid duplicates?

