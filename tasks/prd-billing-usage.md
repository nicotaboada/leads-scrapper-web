# PRD: Billings & Usage Settings Section

## 1. Introduction/Overview

This feature adds a new **"Billings & Usage"** section to the Settings area of the application. The purpose is to provide real-time visibility into the usage and costs of external services that power the leads-scrapper platform.

Currently, the application relies on several third-party APIs (Apify, OpenAI, SerpAPI, ScreenshotOne), and there's no centralized way to monitor their consumption or costs. This feature solves that by fetching usage data directly from each service's API and displaying it in a unified dashboard.

## 2. Goals

1. **Visibility**: Provide a single view to monitor usage and spending across all external services.
2. **Cost Control**: Enable users to identify when they're approaching usage limits or budget thresholds.
3. **Proactive Alerts**: Visually warn users when usage reaches 80% (warning) or 100% (critical) of limits.
4. **Real-time Data**: Display current usage data fetched directly from service APIs on each page load.

## 3. User Stories

### US-1: View Service Usage Dashboard
**As a** user  
**I want to** see a dashboard with all external services and their current usage  
**So that** I can monitor costs and consumption in one place

### US-2: Identify Free Tier Status
**As a** user  
**I want to** see which services are operating under a free tier  
**So that** I know which services incur costs vs. which are free

### US-3: Receive Visual Warnings
**As a** user  
**I want to** see visual indicators when approaching usage limits  
**So that** I can take action before running out of quota or exceeding budgets

### US-4: View Associated Accounts
**As a** user  
**I want to** see which account/email is associated with each service  
**So that** I can identify the correct account for billing purposes

## 4. Functional Requirements

### 4.1 Navigation & UI Structure

| ID | Requirement |
|----|-------------|
| FR-01 | Add a new navigation item "Billings & Usage" to the settings sidebar |
| FR-02 | The navigation item should use an appropriate icon (e.g., `CreditCard` or `Receipt` from lucide-react) |
| FR-03 | Create a new page at route `/settings/billing` |
| FR-04 | Add the route `SETTINGS_BILLING` to the routes configuration |

### 4.2 Service Usage Cards

| ID | Requirement |
|----|-------------|
| FR-05 | Display a card for each service: **Apify**, **OpenAI**, **SerpAPI**, **ScreenshotOne** |
| FR-06 | Each card must display: service name, service logo/icon, associated account (email) |
| FR-07 | Each card must show usage as a progress bar with format: `current / limit` |
| FR-08 | Each card must display the monetary cost in USD (e.g., `$2.50 USD` or `FREE`) |
| FR-09 | If the service is on a free tier, display a `FREE` badge instead of monetary cost |

### 4.3 Usage Visualization

| ID | Requirement |
|----|-------------|
| FR-10 | Implement a progress bar for each service showing usage percentage |
| FR-11 | Progress bar colors must follow threshold rules: |
|        | - **Default (0-79%)**: neutral gray color |
|        | - **Warning (80-99%)**: amber/yellow indicator |
|        | - **Critical (100%+)**: red indicator |
| FR-12 | Display numeric usage alongside progress bar (e.g., `85/100 requests`) |

### 4.4 Data Fetching

| ID | Requirement |
|----|-------------|
| FR-13 | Fetch usage data from each service's API when the page loads |
| FR-14 | Show loading skeleton while data is being fetched |
| FR-15 | Handle API errors gracefully with error states per service card |
| FR-16 | Provide a "Refresh" button to manually re-fetch all data |

### 4.5 Disabled Service State

| ID | Requirement |
|----|-------------|
| FR-17 | If an API key is not configured for a service, display the card in a "disabled" state |
| FR-18 | Disabled cards should be visually grayed out (reduced opacity, muted colors) |
| FR-19 | Disabled cards should display a message: "Not configured" or "API key not set" |
| FR-20 | Disabled cards should not attempt to fetch data from the API |
| FR-21 | Future integration: Check API key configuration from the upcoming "API Keys" settings section |

### 4.6 Service-Specific Data Points

#### Apify
| ID | Requirement |
|----|-------------|
| FR-22 | Fetch from Apify API: account email, usage (USD spent), monthly limit |
| FR-23 | Display format: `$X / $Y USD` or `FREE` if on free plan |

#### OpenAI
| ID | Requirement |
|----|-------------|
| FR-24 | Fetch from OpenAI API: usage credits/tokens consumed, cost in USD |
| FR-25 | Display format: tokens used and `$X USD` spent |

#### SerpAPI
| ID | Requirement |
|----|-------------|
| FR-26 | Fetch from SerpAPI: searches used, monthly search limit, account email |
| FR-27 | Display format: `X / Y searches` |
| FR-28 | If on free tier, show `FREE` badge |

#### ScreenshotOne
| ID | Requirement |
|----|-------------|
| FR-29 | Fetch from ScreenshotOne API: screenshots taken, monthly limit |
| FR-30 | Display format: `X / Y screenshots` |
| FR-31 | If on free tier (100 screenshots), show `FREE` badge |

## 5. Non-Goals (Out of Scope)

The following are explicitly **NOT** part of this feature:

1. **Historical data/trends**: No graphs or charts showing usage over time
2. **Email notifications**: No alert emails when approaching limits
3. **Multiple accounts per service**: Support only one account per service
4. **Billing management**: No ability to upgrade plans or manage payment methods
5. **Budget setting**: No ability to set custom budget limits or alerts
6. **API key management**: No ability to add/edit/remove API keys (this is done via environment variables)

## 6. Design Considerations

### 6.1 Visual Theme
- Follow the existing dark theme (gray/black aesthetic)
- Use the existing design system variables from `tailwind.css`
- Cards should use `bg-card` with subtle borders

### 6.2 Layout
- Grid layout: 2 columns on desktop, 1 column on mobile
- Each service in its own card component
- Page header with title "Billings & Usage" and refresh button

### 6.3 Progress Bar Colors (Dark Theme)
```
Default:  bg-zinc-700 (track) / bg-zinc-400 (progress)
Warning:  bg-amber-500/20 (track) / bg-amber-500 (progress)  
Critical: bg-red-500/20 (track) / bg-red-500 (progress)
```

### 6.4 Card Anatomy

**Enabled State:**
```
┌─────────────────────────────────────────────┐
│  [Icon]  Service Name              [FREE]   │
│                                             │
│  account@email.com                          │
│                                             │
│  ████████████░░░░░░░░░░░░░░  85/100        │
│                                             │
│  $2.50 USD                                  │
└─────────────────────────────────────────────┘
```

**Disabled State:**
```
┌─────────────────────────────────────────────┐
│  [Icon]  Service Name         (opacity: 50%)│
│                                             │
│  ⚠️ Not configured                          │
│                                             │
│  Set up this service in API Keys settings   │
│                                             │
└─────────────────────────────────────────────┘
```

### 6.5 Disabled Card Styling
- Entire card at `opacity-50`
- Background: `bg-muted/30`
- No interactive hover states
- Icon and text in `text-muted-foreground`

## 7. Technical Considerations

### 7.1 Backend (NestJS)

| Consideration | Details |
|---------------|---------|
| New Module | Create a `billing` module in the backend |
| GraphQL Schema | Add `BillingUsage` type and `billingUsage` query |
| Service Integration | Create services to call each external API's usage endpoint |
| Environment Variables | Reuse existing API keys: `APIFY_API_TOKEN`, `OPENAI_API_KEY`, `SCREENSHOTONE_ACCESS_KEY`, `SERPAPI_API_KEY` |
| Account Emails | Fetch from each service's API when available |
| Enabled Check | Check if environment variable is set to determine if service is enabled |

### 7.2 Future Integration: API Keys Settings

A future "API Keys" section in Settings will allow users to configure API keys via the UI instead of environment variables. When implemented:
- The billing module should check the database for API key configuration instead of env vars
- Each service's enabled state will be determined by whether an API key exists in the database
- This PRD assumes env vars for now, with easy migration path to database-backed keys

### 7.3 Frontend (Next.js)

| Consideration | Details |
|---------------|---------|
| New Page | `/app/(authenticated)/settings/billing/page.tsx` |
| New Module | Create `modules/billing/` with components, hooks, graphql, types |
| GraphQL Query | Single query to fetch all services usage at once |
| Loading States | Use skeleton components for loading |
| Error Handling | Per-service error states (one failing shouldn't break others) |

### 7.4 External API Documentation
- **Apify**: [Account API](https://docs.apify.com/api/v2#/reference/users/account-information)
- **OpenAI**: [Usage API](https://platform.openai.com/docs/api-reference/usage)
- **SerpAPI**: [Account API](https://serpapi.com/account-api)
- **ScreenshotOne**: Check API documentation for usage endpoints

### 7.5 Data Types (TypeScript)

```typescript
interface ServiceUsage {
  serviceName: string;
  serviceKey: 'apify' | 'openai' | 'serpapi' | 'screenshotone';
  isEnabled: boolean; // false if API key not configured
  accountEmail: string | null; // null if not enabled
  isFreeTier: boolean;
  usage: {
    current: number;
    limit: number;
    unit: string; // 'USD', 'requests', 'screenshots', 'searches'
  } | null; // null if not enabled
  costUsd: number | null; // null if free tier or not enabled
  status: 'normal' | 'warning' | 'critical' | 'disabled';
}

interface BillingUsageResponse {
  services: ServiceUsage[];
  lastUpdated: string;
}
```

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| Feature Adoption | 100% of users access billing page at least once per month |
| Data Accuracy | Usage data matches actual service dashboards within 5% margin |
| Page Load Time | Billing page loads in under 3 seconds |
| Error Rate | Less than 1% of page loads result in errors |

## 9. Resolved Questions

| Question | Resolution |
|----------|------------|
| **API Keys & Accounts** | A future "API Keys" section in Settings will handle configuration. If an API key is configured there, the service is considered "enabled". The billing page will check this configuration. |
| **Caching** | No caching. Fetch fresh data from APIs on every page load. |
| **Disabled services** | If an API key is not configured, show the service card in a "disabled" state (grayed out, with message like "Not configured"). |
| **Auto-refresh** | No auto-refresh. Manual refresh button only. |

## 10. Open Questions

1. **ScreenshotOne API**: Need to verify if ScreenshotOne has a usage/account API endpoint available.

---

## Appendix: File Structure

```
leads-scrapper-web/
├── app/(authenticated)/settings/
│   └── billing/
│       └── page.tsx
├── lib/config/
│   ├── routes.ts (update)
│   └── settings-nav.ts (update)
└── modules/billing/
    ├── components/
    │   ├── billing-page.tsx
    │   ├── service-usage-card.tsx
    │   ├── usage-progress-bar.tsx
    │   └── billing-skeleton.tsx
    ├── graphql/
    │   └── queries.ts
    ├── hooks/
    │   └── use-billing-usage.ts
    └── types/
        └── index.ts

leads-scrapper-backend/
└── src/billing/
    ├── billing.module.ts
    ├── billing.resolver.ts
    ├── billing.service.ts
    ├── services/
    │   ├── apify-usage.service.ts
    │   ├── openai-usage.service.ts
    │   ├── serpapi-usage.service.ts
    │   └── screenshotone-usage.service.ts
    ├── dto/
    │   └── billing-usage.output.ts
    └── entities/
        └── service-usage.entity.ts
```

