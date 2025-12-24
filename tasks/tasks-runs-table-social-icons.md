# Tasks: Runs Table Social Icons & Company Contacts Enrichment

## Relevant Files

### Backend (leads-scrapper-backend)

- `src/shared/utils/social-url-detector.ts` - New utility to detect Facebook/Instagram URLs in website field
- `src/shared/utils/social-url-detector.spec.ts` - Unit tests for social URL detection utility
- `src/shared/apify/apify.config.ts` - Update to include `scrapeContacts` in input transformation and normalize social fields
- `src/runs/dto/create-run.input.ts` - Add `scrapeContacts` boolean field to input DTO
- `src/runs/runs.service.ts` - Update `storeRunResults` to apply URL validation and reclassification
- `prisma/schema.prisma` - Add `scrapeContacts` field to Run model (optional)

### Frontend (leads-scrapper-web)

- `modules/runs/components/social-icons-cell.tsx` - New component to render social presence icons
- `modules/runs/components/run-results-table.tsx` - Update table columns and integrate SocialIconsCell
- `modules/runs/types/run-result.ts` - Update GoogleMapsResult interface to include social fields
- `modules/runs/types/create-run.ts` - Add `scrapeContacts` field to form schema and types
- `modules/runs/components/create-run-sheet.tsx` - Add Company Contacts Enrichment checkbox with tooltip
- `modules/runs/graphql/queries.ts` - Ensure social fields are included in result queries (if needed)

### Notes

- Unit tests should be placed alongside the code files they are testing
- This feature spans both `leads-scrapper-backend` and `leads-scrapper-web` repositories
- Use `npx jest [optional/path/to/test/file]` to run tests
- The `scrapeContacts` field maps to Apify's Company Contacts Enrichment add-on

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch: `git checkout -b feature/runs-table-social-icons`

- [x] 1.0 Backend: Create URL validation utility for social media detection
  - [x] 1.1 Create new file `src/shared/utils/social-url-detector.ts`
  - [x] 1.2 Implement `isFacebookUrl(url: string): boolean` function with patterns: `facebook.com`, `fb.com`, `fb.me`
  - [x] 1.3 Implement `isInstagramUrl(url: string): boolean` function with patterns: `instagram.com`, `instagr.am`
  - [x] 1.4 Implement `detectSocialPlatform(url: string): 'facebook' | 'instagram' | null` function
  - [x] 1.5 Export all functions from the utility file
  - [x] 1.6 Create unit tests in `src/shared/utils/social-url-detector.spec.ts` covering all URL patterns and edge cases

- [x] 2.0 Backend: Update Run schema and GraphQL mutation for scrapeContacts flag
  - [x] 2.1 Update `src/runs/dto/create-run.input.ts` to add optional `scrapeContacts: boolean` field with `@IsOptional()` and `@IsBoolean()` decorators
  - [x] 2.2 Update `src/shared/apify/apify.config.ts` `GoogleMapsInput` interface to include `scrapeContacts?: boolean`
  - [x] 2.3 Update `transformInput` function in `apify.config.ts` to pass `scrapeContacts` to Apify API call
  - [ ] 2.4 Verify GraphQL schema regenerates correctly with new field

- [x] 3.0 Backend: Modify Apify result processing to validate and reclassify social URLs
  - [x] 3.1 Update `NormalizedResult` interface in `apify.config.ts` to include `instagram`, `facebook`, `linkedin` fields
  - [x] 3.2 Import social URL detector utility in `apify.config.ts`
  - [x] 3.3 Update `normalizeResult` function to:
    - [x] 3.3.1 Extract `instagrams[0]`, `facebooks[0]`, `linkedIns[0]` from raw result
    - [x] 3.3.2 Check if `website` field contains Facebook URL → move to `facebook` field, set `website` to null
    - [x] 3.3.3 Check if `website` field contains Instagram URL → move to `instagram` field, set `website` to null
    - [x] 3.3.4 Return normalized result with all social fields populated
  - [ ] 3.4 Add unit tests for the updated `normalizeResult` function covering URL reclassification scenarios

- [x] 4.0 Frontend: Create SocialIconsCell component for the icons column
  - [x] 4.1 Create new file `modules/runs/components/social-icons-cell.tsx`
  - [x] 4.2 Define props interface with `website`, `instagram`, `facebook`, `linkedin` URL fields (all optional/nullable)
  - [x] 4.3 Import Lucide icons: `Globe`, `Instagram`, `Facebook`, `Linkedin`
  - [x] 4.4 Implement icon rendering logic:
    - [x] 4.4.1 Each icon shows enabled (full opacity, colored) if URL exists
    - [x] 4.4.2 Each icon shows disabled (gray, 30-40% opacity) if URL is null/undefined
    - [x] 4.4.3 Enabled icons are clickable and open URL in new tab
    - [x] 4.4.4 Disabled icons have `cursor-default` and no click handler
    - [x] 4.4.5 Enabled icons show `cursor-pointer` and hover effect
  - [x] 4.5 Add proper spacing between icons (gap-2 or similar)
  - [x] 4.6 Export the component

- [x] 5.0 Frontend: Update Runs table with new column structure
  - [x] 5.1 Update `modules/runs/types/run-result.ts`:
    - [x] 5.1.1 Add `instagram`, `facebook`, `linkedin` fields to `GoogleMapsResult` interface
    - [x] 5.1.2 Update `extractGoogleMapsResult` function to extract social fields from `raw.instagrams[0]`, `raw.facebooks[0]`, `raw.linkedIns[0]`
  - [x] 5.2 Update `modules/runs/components/run-results-table.tsx`:
    - [x] 5.2.1 Import `SocialIconsCell` component
    - [x] 5.2.2 Remove "Website" column header and cell
    - [x] 5.2.3 Reorder columns to: Checkbox, Place Name, City, [Icons]
    - [x] 5.2.4 Add new column header for icons (empty or no text)
    - [x] 5.2.5 Add `SocialIconsCell` in table body passing extracted social URLs
    - [x] 5.2.6 Update loading state table headers to match new column structure
    - [x] 5.2.7 Update `colSpan` values for empty/loading states

- [x] 6.0 Frontend: Add Company Contacts Enrichment checkbox to run creation form
  - [x] 6.1 Update `modules/runs/types/create-run.ts`:
    - [x] 6.1.1 Add `scrapeContacts?: boolean` to `GoogleMapsConfig` interface
    - [x] 6.1.2 Add `scrapeContacts?: boolean` to `CreateRunFormInput` interface
    - [x] 6.1.3 Add `scrapeContacts` field to `createRunSchema` as optional boolean with default `false`
    - [x] 6.1.4 Update `transformFormToInput` to include `scrapeContacts`
  - [x] 6.2 Update `modules/runs/components/create-run-sheet.tsx`:
    - [x] 6.2.1 Add `scrapeContacts: false` to form `defaultValues`
    - [x] 6.2.2 Import `Checkbox` component and `Tooltip` components
    - [x] 6.2.3 Import `HelpCircle` icon from Lucide for tooltip trigger
    - [x] 6.2.4 Add new `FormField` for `scrapeContacts` checkbox inside Google Maps Configuration section
    - [x] 6.2.5 Implement checkbox with label "Company Contacts Enrichment"
    - [x] 6.2.6 Add tooltip icon (?) next to label with content explaining the feature and pricing
    - [x] 6.2.7 Update `handleSubmit` to include `scrapeContacts` in the input object passed to mutation
  - [ ] 6.3 Update `modules/runs/types/run.ts` (if exists) to include `scrapeContacts` in `CreateRunInput` type

- [ ] 7.0 Testing and validation
  - [ ] 7.1 Run backend unit tests to verify social URL detection utility works correctly
  - [ ] 7.2 Run backend to verify GraphQL schema includes new `scrapeContacts` field
  - [ ] 7.3 Test creating a new run with `scrapeContacts` enabled and verify it's passed to Apify
  - [ ] 7.4 Test run results display with various combinations of social URLs
  - [ ] 7.5 Verify clicking enabled icons opens URLs in new tab
  - [ ] 7.6 Verify disabled icons are not clickable
  - [ ] 7.7 Test URL reclassification: create a run result with Facebook URL in website field and verify it's moved to facebook field
  - [ ] 7.8 Verify tooltip displays correctly on hover over the (?) icon
