# PRD: API Keys Management

## 1. Introduction/Overview

This feature adds a new **API Keys** section within the Settings area of the application. Users will be able to manage API keys for external services (Apify, OpenAI, SerpAPI, ScreenshotOne) that the application depends on for various functionalities like web scraping, AI processing, SEO analysis, and screenshot generation.

The primary goal is to allow users to add, switch, and manage multiple API keys per service while maintaining only one active key at a time. This flexibility supports users who want to rotate between free-tier accounts across different email addresses to maximize free usage.

This feature directly integrates with the existing **Billings & Usage** section, which requires an active API key for each service to display usage data.

## 2. Goals

1. **Enable API key management** - Users can add, delete, and switch between API keys for each supported service
2. **Support multiple keys per service** - Allow unlimited API keys per service with exactly one active at any time
3. **Validate keys on creation** - Ensure only valid API keys are stored by validating against each service's API
4. **Integrate with Billings & Usage** - Display appropriate messaging when no active key is configured for a service
5. **Secure storage** - Store API keys securely with encryption in the backend

## 3. User Stories

### US-1: View API Keys Overview
**As a** user  
**I want to** see all my configured API keys organized by service  
**So that** I can understand which services are configured and which key is currently active

### US-2: Add New API Key
**As a** user  
**I want to** add a new API key for a specific service  
**So that** I can configure or rotate my API credentials

### US-3: Set Active API Key
**As a** user  
**I want to** change which API key is active for a service  
**So that** I can switch between different accounts/keys as needed

### US-4: Delete API Key
**As a** user  
**I want to** remove an API key I no longer need  
**So that** I can keep my keys organized and remove compromised/expired keys

### US-5: View Other Keys
**As a** user  
**I want to** see all non-active keys for a service  
**So that** I can manage my full collection of keys

## 4. Functional Requirements

### 4.1 API Keys Page

| ID | Requirement |
|----|-------------|
| FR-1 | The system must display a new "API Keys" menu item in the Settings sidebar navigation |
| FR-2 | The page must display a header with title "API Keys" and description "Manage your API keys for various services. Active keys will be used for billing and usage tracking." |
| FR-3 | The page must display an "Add Key" button in the header area |
| FR-4 | The page must display a card for each supported service: Apify, OpenAI, SerpAPI, ScreenshotOne |

### 4.2 Service Card Display

| ID | Requirement |
|----|-------------|
| FR-5 | Each service card must display: service icon, service name, and status badge (Active/Inactive) |
| FR-6 | If a service has an active key, the card must display a highlighted "Current Active Key" section showing: masked key (e.g., `*********a3f2`), label (if provided), and a checkmark icon |
| FR-7 | If a service has no active key, the card must display a dashed border placeholder with text "No active API key configured" |
| FR-8 | If a service has additional (non-active) keys, the card must display "OTHER KEYS (N)" with a "Show all" / "Hide" toggle link |
| FR-9 | When "Show all" is clicked, the card must expand to show all non-active keys in a list |
| FR-10 | Each non-active key in the list must display: masked key and label |
| FR-11 | On hover over a non-active key, the system must display "Set Active" button and delete (trash) icon |

### 4.3 Add Key Flow

| ID | Requirement |
|----|-------------|
| FR-12 | Clicking "Add Key" button must open a sheet/modal dialog |
| FR-13 | Step 1: The modal must display "Select a service to add an API key" with a list of all 4 services |
| FR-14 | Each service option must display: service icon, service name, and count of currently configured keys (e.g., "2 key(s) configured") |
| FR-15 | Clicking a service must advance to Step 2 |
| FR-16 | Step 2: The modal must display the selected service with a "Change service" link to go back to Step 1 |
| FR-17 | Step 2: The modal must display a "Label (Optional)" input field with placeholder "e.g. Personal Account" |
| FR-18 | Step 2: The modal must display an "API Key" input field with placeholder "Paste your API key here" |
| FR-19 | Step 2: The modal must display "Cancel" and "Add Key" buttons |
| FR-20 | The "Add Key" button must be disabled until the API Key field has a value |
| FR-21 | Clicking "Add Key" must trigger API key validation before saving |

### 4.4 API Key Validation

| ID | Requirement |
|----|-------------|
| FR-22 | The system must validate API keys by making a test request to each service's API |
| FR-23 | During validation, the "Add Key" button must show a loading state with text "Validating..." |
| FR-24 | If validation succeeds, the key must be saved and a success toast must be displayed |
| FR-25 | If validation fails, an inline error message must be displayed: "Invalid API key. Please check and try again." |
| FR-26 | On validation failure, the modal must remain open and the key must not be saved |
| FR-27 | If a service has no active key, a newly added valid key must automatically become the active key |

### 4.5 Set Active Key

| ID | Requirement |
|----|-------------|
| FR-28 | Clicking "Set Active" on a non-active key must set that key as the active key for the service |
| FR-29 | The previously active key (if any) must become a non-active key |
| FR-30 | A success toast must be displayed: "API key set as active" |

### 4.6 Delete Key

| ID | Requirement |
|----|-------------|
| FR-31 | Clicking the delete icon must show a confirmation dialog |
| FR-32 | If the user confirms deletion, the key must be removed |
| FR-33 | If the deleted key was the active key and other keys exist for that service, the most recently added remaining key must automatically become active |
| FR-34 | A success toast must be displayed: "API key deleted" |

### 4.7 Integration with Billings & Usage

| ID | Requirement |
|----|-------------|
| FR-35 | When a service has no active API key, the Billings & Usage card for that service must display a message: "No active key configured" with a link to "Configure API Key" |
| FR-36 | Clicking "Configure API Key" must navigate to the API Keys settings page |

## 5. Non-Goals (Out of Scope)

1. **Key rotation reminders** - No automatic notifications for key expiration or rotation
2. **Usage limits per key** - No tracking of usage limits or quotas per individual key
3. **Key sharing between users** - Keys are per-user only, no team sharing
4. **Bulk import/export** - No CSV or bulk key management
5. **Key history/audit log** - No tracking of when keys were added, modified, or deleted
6. **Migration from .env** - Existing keys in `.env` will not be auto-migrated; users will add keys fresh from the frontend

## 6. Design Considerations

### 6.1 UI Components

- **Service Cards**: Use existing Card component with consistent styling
- **Sheet/Modal**: Use existing Sheet component for the add key flow
- **Status Badge**: Green "Active" badge for services with active keys
- **Masked Keys**: Display format `*********XXXX` showing only last 4 characters
- **Icons**: Each service should have a distinctive icon:
  - Apify: Calendar/robot icon
  - OpenAI: Sparkles/stars icon
  - SerpAPI: Search/magnifying glass icon
  - ScreenshotOne: Camera icon

### 6.2 Responsive Design

- Cards should display in a 2-column grid on desktop
- Single column on mobile
- Sheet should be full-width on mobile

### 6.3 Visual States

- **Active key section**: Green border/highlight
- **Inactive keys**: Gray/neutral styling
- **Hover on inactive keys**: Show action buttons (Set Active, Delete)
- **Empty state**: Dashed border with placeholder text

## 7. Technical Considerations

### 7.1 Backend (NestJS)

#### New Module: `api-keys`

```
src/api-keys/
├── api-keys.module.ts
├── api-keys.resolver.ts
├── api-keys.service.ts
├── dto/
│   ├── create-api-key.input.ts
│   └── update-api-key.input.ts
├── entities/
│   └── api-key.entity.ts
└── services/
    └── api-key-validator.service.ts
```

#### Prisma Schema Addition

```prisma
model ApiKey {
  id          String    @id @default(cuid())
  userId      String
  service     ApiKeyService
  label       String?
  encryptedKey String   // Encrypted API key
  keyLastFour String    // Last 4 chars for display
  isActive    Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, service, isActive], name: "one_active_per_service")
  @@index([userId, service])
}

enum ApiKeyService {
  APIFY
  OPENAI
  SERPAPI
  SCREENSHOTONE
}
```

#### GraphQL Schema

```graphql
type ApiKey {
  id: ID!
  service: ApiKeyService!
  label: String
  keyLastFour: String!
  isActive: Boolean!
  createdAt: DateTime!
}

enum ApiKeyService {
  APIFY
  OPENAI
  SERPAPI
  SCREENSHOTONE
}

type Query {
  apiKeys: [ApiKey!]!
  apiKeysByService(service: ApiKeyService!): [ApiKey!]!
}

type Mutation {
  createApiKey(input: CreateApiKeyInput!): ApiKey!
  setActiveApiKey(id: ID!): ApiKey!
  deleteApiKey(id: ID!): Boolean!
}

input CreateApiKeyInput {
  service: ApiKeyService!
  key: String!
  label: String
}
```

#### API Key Validation Endpoints

| Service | Validation Method | Endpoint |
|---------|-------------------|----------|
| Apify | GET with token param | `https://api.apify.com/v2/users/me?token={API_KEY}` |
| OpenAI | GET with Bearer header | `https://api.openai.com/v1/models` |
| SerpAPI | GET with api_key param | `https://serpapi.com/account.json?api_key={API_KEY}` |
| ScreenshotOne | GET simple request | `https://api.screenshotone.com/take?access_key={API_KEY}&url=https://example.com` |

### 7.2 Frontend (Next.js)

#### New Module: `api-keys`

```
modules/api-keys/
├── components/
│   ├── api-keys-page.tsx
│   ├── service-card.tsx
│   ├── active-key-display.tsx
│   ├── other-keys-list.tsx
│   ├── add-key-sheet.tsx
│   ├── service-selector.tsx
│   └── key-form.tsx
├── graphql/
│   ├── queries.ts
│   └── mutations.ts
├── hooks/
│   ├── use-api-keys.ts
│   ├── use-create-api-key.ts
│   ├── use-set-active-key.ts
│   └── use-delete-api-key.ts
├── types/
│   └── api-key.types.ts
└── index.ts
```

#### New Route

- Add page at `app/(authenticated)/settings/api-keys/page.tsx`
- Add to settings sidebar navigation

### 7.3 Security

1. **Encryption**: API keys must be encrypted at rest using AES-256-GCM
2. **Master encryption key**: A secret key stored in `.env` as `API_KEYS_ENCRYPTION_SECRET` (32+ characters) is used to encrypt/decrypt all API keys
3. **Never expose full key**: Only return `keyLastFour` to frontend, never the full key
4. **Backend decryption**: Full key only decrypted when making API calls to external services
5. **User isolation**: Users can only access their own API keys (enforced by userId filter)

```env
# .env - Master key for encrypting API keys in database
API_KEYS_ENCRYPTION_SECRET=your-32-character-secret-key-here
```

### 7.4 Existing Service Integration

**Important**: Existing services currently read API keys from `.env`. They must be updated to read from the database instead.

When the scraping/SEO/screenshot services need an API key, they should:
1. Query the `ApiKey` table for the user's active key for that service
2. Decrypt the key using `API_KEYS_ENCRYPTION_SECRET`
3. Use it for the API call
4. Handle the case where no active key exists (throw appropriate error with message like "No active API key configured for {service}")

**Services to update**:
- Scraping service (Apify)
- AI/Messages service (OpenAI)
- SEO service (SerpAPI)
- Screenshot service (ScreenshotOne)

## 8. Success Metrics

| Metric | Target |
|--------|--------|
| API Keys page loads without errors | 100% |
| Users can successfully add a valid API key | 95%+ success rate |
| Invalid keys are rejected with clear error message | 100% |
| Key switching works correctly (only 1 active per service) | 100% |
| Billings & Usage correctly reflects active key status | 100% |

## 9. Open Questions

1. ~~**Key encryption strategy**~~: ✅ Resolved - Use environment-based encryption key (`API_KEYS_ENCRYPTION_SECRET`)
2. **Rate limiting**: Should we rate limit key validation attempts to prevent abuse? (Low priority)
3. ~~**OpenAI handling**~~: ✅ Resolved - OpenAI works like all other services, fully manageable from frontend
4. ~~**Migration**~~: ✅ Resolved - No migration needed, users will add keys fresh from frontend

## 10. Service Icons Reference

For consistent implementation, use these icon mappings:

| Service | Lucide Icon | Description |
|---------|-------------|-------------|
| Apify | `CalendarCheck` or `Bot` | Represents automation/scheduling |
| OpenAI | `Sparkles` | Represents AI/magic |
| SerpAPI | `Search` | Represents search functionality |
| ScreenshotOne | `Camera` | Represents screenshot capture |

## 11. Implementation Priority

### Phase 1: Core Functionality
1. Prisma schema and migration
2. Backend module with CRUD operations
3. API key validation service
4. Frontend API Keys page with cards

### Phase 2: Full Features
5. Add Key sheet with 2-step flow
6. Set Active functionality
7. Delete with confirmation
8. Integration with Billings & Usage

### Phase 3: Polish
9. Loading states and error handling
10. Toast notifications
11. Responsive design refinements

