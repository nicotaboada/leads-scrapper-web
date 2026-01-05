# Tasks: Billings & Usage Settings Section

## Relevant Files

### Backend (leads-scrapper-backend)

- `src/billing/billing.module.ts` - Main billing module that imports all billing services
- `src/billing/billing.resolver.ts` - GraphQL resolver for billing queries
- `src/billing/billing.service.ts` - Main service that orchestrates all service usage fetchers
- `src/billing/services/apify-usage.service.ts` - Service to fetch Apify usage data
- `src/billing/services/openai-usage.service.ts` - Service to fetch OpenAI usage data
- `src/billing/services/serpapi-usage.service.ts` - Service to fetch SerpAPI usage data
- `src/billing/services/screenshotone-usage.service.ts` - Service to fetch ScreenshotOne usage data
- `src/billing/dto/billing-usage.output.ts` - GraphQL output DTOs for billing data
- `src/billing/entities/service-usage.entity.ts` - GraphQL entity for service usage
- `src/app.module.ts` - Update to import BillingModule

### Frontend (leads-scrapper-web)

- `app/(authenticated)/settings/billing/page.tsx` - Billing settings page
- `lib/config/routes.ts` - Update to add SETTINGS_BILLING route
- `lib/config/settings-nav.ts` - Update to add billing navigation item
- `modules/billing/types/index.ts` - TypeScript types for billing data
- `modules/billing/graphql/queries.ts` - GraphQL queries for billing
- `modules/billing/hooks/use-billing-usage.ts` - Hook to fetch billing data
- `modules/billing/components/billing-page.tsx` - Main billing page component
- `modules/billing/components/service-usage-card.tsx` - Card component for each service
- `modules/billing/components/usage-progress-bar.tsx` - Progress bar with threshold colors
- `modules/billing/components/billing-skeleton.tsx` - Loading skeleton for billing page

### Notes

- The backend services need to call external APIs (Apify, OpenAI, SerpAPI, ScreenshotOne) to fetch usage data
- Each service should gracefully handle cases where API keys are not configured
- The frontend should display disabled states for unconfigured services
- Use `npx jest [optional/path/to/test/file]` to run tests

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature: `git checkout -b feature/billing-usage` (skipped - no git repo)

- [x] 1.0 Backend: Create billing module structure and GraphQL schema
  - [x] 1.1 Create the billing module directory structure: `src/billing/`, `src/billing/services/`, `src/billing/dto/`, `src/billing/entities/`
  - [x] 1.2 Create `service-usage.entity.ts` with GraphQL ObjectType for ServiceUsage (serviceName, serviceKey, isEnabled, accountEmail, isFreeTier, usage, costUsd, status)
  - [x] 1.3 Create `billing-usage.output.ts` with GraphQL ObjectType for BillingUsageOutput (services array, lastUpdated)
  - [x] 1.4 Create `billing.service.ts` with method `getBillingUsage()` that will orchestrate fetching from all services
  - [x] 1.5 Create `billing.resolver.ts` with Query `billingUsage` that returns BillingUsageOutput
  - [x] 1.6 Create `billing.module.ts` that imports ConfigModule and exports BillingService
  - [x] 1.7 Update `app.module.ts` to import BillingModule
  - [ ] 1.8 Verify GraphQL schema generates correctly by running the backend

- [x] 2.0 Backend: Implement service usage fetchers
  - [x] 2.1 Create `apify-usage.service.ts` - fetch account info and usage from Apify API
    - [x] 2.1.1 Inject ConfigService and get APIFY_API_TOKEN
    - [x] 2.1.2 Check if API token exists, return disabled state if not
    - [x] 2.1.3 Call Apify API to get account info (email, usage limits)
    - [x] 2.1.4 Calculate usage percentage and determine status (normal/warning/critical)
    - [x] 2.1.5 Return ServiceUsage object
  - [x] 2.2 Create `openai-usage.service.ts` - fetch usage from OpenAI API
    - [x] 2.2.1 Inject ConfigService and get OPENAI_API_KEY
    - [x] 2.2.2 Check if API key exists, return disabled state if not
    - [x] 2.2.3 Call OpenAI API to get usage data (credits/tokens consumed)
    - [x] 2.2.4 Calculate usage and determine status
    - [x] 2.2.5 Return ServiceUsage object
  - [x] 2.3 Create `serpapi-usage.service.ts` - fetch usage from SerpAPI
    - [x] 2.3.1 Inject ConfigService and get SERPAPI_API_KEY
    - [x] 2.3.2 Check if API key exists, return disabled state if not
    - [x] 2.3.3 Call SerpAPI account endpoint to get searches used/limit
    - [x] 2.3.4 Calculate usage percentage and determine status
    - [x] 2.3.5 Return ServiceUsage object
  - [x] 2.4 Create `screenshotone-usage.service.ts` - fetch usage from ScreenshotOne API
    - [x] 2.4.1 Inject ConfigService and get SCREENSHOTONE_ACCESS_KEY
    - [x] 2.4.2 Check if API key exists, return disabled state if not
    - [x] 2.4.3 Research and implement ScreenshotOne usage API call (if available)
    - [x] 2.4.4 If no usage API available, return a basic enabled/disabled state
    - [x] 2.4.5 Return ServiceUsage object
  - [x] 2.5 Update `billing.service.ts` to inject all usage services and aggregate results
  - [x] 2.6 Update `billing.module.ts` to provide all usage services
  - [ ] 2.7 Test the GraphQL query with sample data

- [x] 3.0 Frontend: Create billing module structure
  - [x] 3.1 Create directory structure: `modules/billing/`, `modules/billing/types/`, `modules/billing/graphql/`, `modules/billing/hooks/`, `modules/billing/components/`
  - [x] 3.2 Create `types/index.ts` with TypeScript interfaces (ServiceUsage, BillingUsageResponse)
  - [x] 3.3 Create `graphql/queries.ts` with GET_BILLING_USAGE query
  - [x] 3.4 Create `hooks/use-billing-usage.ts` hook that uses Apollo useQuery to fetch billing data

- [x] 4.0 Frontend: Build billing page and UI components
  - [x] 4.1 Create `components/usage-progress-bar.tsx`
    - [x] 4.1.1 Accept props: current, limit, status
    - [x] 4.1.2 Calculate percentage (current/limit * 100)
    - [x] 4.1.3 Apply color based on status: gray (normal), amber (warning), red (critical)
    - [x] 4.1.4 Display numeric value alongside bar (e.g., "85/100")
  - [x] 4.2 Create `components/service-usage-card.tsx`
    - [x] 4.2.1 Accept ServiceUsage as prop
    - [x] 4.2.2 Render enabled state: icon, service name, account email, progress bar, cost
    - [x] 4.2.3 Render disabled state: grayed out, "Not configured" message
    - [x] 4.2.4 Display FREE badge when isFreeTier is true
    - [x] 4.2.5 Add appropriate service icons for each service
  - [x] 4.3 Create `components/billing-skeleton.tsx`
    - [x] 4.3.1 Create skeleton cards matching the layout of service-usage-card
    - [x] 4.3.2 Use existing Skeleton component from UI library
  - [x] 4.4 Create `components/billing-page.tsx`
    - [x] 4.4.1 Use useBillingUsage hook to fetch data
    - [x] 4.4.2 Display SectionHeader with "Billings & Usage" title and Refresh button
    - [x] 4.4.3 Render grid of ServiceUsageCard components (2 cols desktop, 1 col mobile)
    - [x] 4.4.4 Show BillingSkeleton while loading
    - [x] 4.4.5 Handle error states gracefully

- [x] 5.0 Frontend: Update navigation and routes configuration
  - [x] 5.1 Update `lib/config/routes.ts`
    - [x] 5.1.1 Add `SETTINGS_BILLING: '/settings/billing'` to ROUTES object
  - [x] 5.2 Update `lib/config/settings-nav.ts`
    - [x] 5.2.1 Import CreditCard or Receipt icon from lucide-react
    - [x] 5.2.2 Add new navigation item for "Billings & Usage" pointing to /settings/billing
  - [x] 5.3 Create `app/(authenticated)/settings/billing/page.tsx`
    - [x] 5.3.1 Import and render BillingPage component
    - [x] 5.3.2 Add 'use client' directive
    - [x] 5.3.3 Add appropriate JSDoc comments

- [ ] 6.0 Integration testing and final verification
  - [ ] 6.1 Start backend and verify GraphQL query works in playground
  - [ ] 6.2 Start frontend and navigate to /settings/billing
  - [ ] 6.3 Verify navigation item appears in settings sidebar
  - [ ] 6.4 Verify loading skeleton displays while fetching
  - [ ] 6.5 Verify enabled services display correct data
  - [ ] 6.6 Verify disabled services (no API key) show disabled state
  - [ ] 6.7 Verify Refresh button re-fetches data
  - [ ] 6.8 Verify responsive layout (2 cols → 1 col on mobile)
  - [ ] 6.9 Verify warning/critical colors appear at correct thresholds (80%/100%)
  - [ ] 6.10 Test error handling when an API call fails
