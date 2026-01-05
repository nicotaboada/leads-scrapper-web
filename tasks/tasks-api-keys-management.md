# Tasks: API Keys Management

## Relevant Files

### Backend (leads-scrapper-backend)

- `prisma/schema.prisma` - Add ApiKey model and ApiKeyService enum
- `src/api-keys/api-keys.module.ts` - Main module for API keys feature
- `src/api-keys/api-keys.resolver.ts` - GraphQL resolver for API keys
- `src/api-keys/api-keys.service.ts` - Business logic for API keys CRUD
- `src/api-keys/dto/create-api-key.input.ts` - Input DTO for creating API keys
- `src/api-keys/entities/api-key.entity.ts` - GraphQL entity for API key
- `src/api-keys/services/encryption.service.ts` - AES-256 encryption/decryption service
- `src/api-keys/services/api-key-validator.service.ts` - Validates keys against external services
- `src/scraping/scraping.service.ts` - Update to read Apify key from database
- `src/ai-messages/ai-messages.service.ts` - Update to read OpenAI key from database
- `src/seo/seo.service.ts` - Update to read SerpAPI key from database
- `src/website-analysis/services/screenshot.service.ts` - Update to read ScreenshotOne key from database
- `src/app.module.ts` - Register ApiKeysModule

### Frontend (leads-scrapper-web)

- `modules/api-keys/types/api-key.types.ts` - TypeScript types for API keys
- `modules/api-keys/graphql/queries.ts` - GraphQL queries for fetching keys
- `modules/api-keys/graphql/mutations.ts` - GraphQL mutations for CRUD operations
- `modules/api-keys/hooks/use-api-keys.ts` - Hook to fetch all API keys
- `modules/api-keys/hooks/use-create-api-key.ts` - Hook to create new API key
- `modules/api-keys/hooks/use-set-active-key.ts` - Hook to set active key
- `modules/api-keys/hooks/use-delete-api-key.ts` - Hook to delete API key
- `modules/api-keys/components/api-keys-page.tsx` - Main page component
- `modules/api-keys/components/service-card.tsx` - Card component for each service
- `modules/api-keys/components/active-key-display.tsx` - Display active key section
- `modules/api-keys/components/other-keys-list.tsx` - List of non-active keys
- `modules/api-keys/components/add-key-sheet.tsx` - Sheet/modal for adding keys
- `modules/api-keys/components/service-selector.tsx` - Step 1: service selection
- `modules/api-keys/components/key-form.tsx` - Step 2: key input form
- `modules/api-keys/index.ts` - Module exports
- `app/(authenticated)/settings/api-keys/page.tsx` - Next.js page route
- `lib/config/settings-nav.ts` - Add API Keys to settings navigation
- `modules/billing/components/` - Update to show "No active key" message

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- This feature spans both backend (`leads-scrapper-backend`) and frontend (`leads-scrapper-web`) repositories
- Backend tasks should be completed before frontend tasks that depend on them
- Remember to add `API_KEYS_ENCRYPTION_SECRET` to `.env` files

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

---

## Tasks

### Phase 0: Setup

- [x] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch in backend repo: `git checkout -b feature/api-keys-management`
  - [ ] 0.2 Create and checkout a new branch in frontend repo: `git checkout -b feature/api-keys-management`

---

### Phase 1: Backend - Database & Core Services

- [x] 1.0 Database Schema & Prisma Migration
  - [x] 1.1 Add `ApiKeyService` enum to `prisma/schema.prisma` with values: `APIFY`, `OPENAI`, `SERPAPI`, `SCREENSHOTONE`
  - [x] 1.2 Add `ApiKey` model to `prisma/schema.prisma` with fields: `id`, `userId`, `service`, `label`, `encryptedKey`, `keyLastFour`, `isActive`, `createdAt`, `updatedAt`
  - [x] 1.3 Add relation from `ApiKey` to `User` model
  - [x] 1.4 Add index on `[userId, service]` for efficient queries
  - [ ] 1.5 Run SQL script manually to create table (user will do this)
  - [ ] 1.6 Run `npx prisma generate` to update Prisma client

- [x] 2.0 Backend Encryption Service
  - [ ] 2.1 Add `API_KEYS_ENCRYPTION_SECRET` to `.env` file (generate a 32+ character secret)
  - [x] 2.2 Create `src/api-keys/services/encryption.service.ts`
  - [x] 2.3 Implement `encrypt(plainText: string): string` method using AES-256-GCM
  - [x] 2.4 Implement `decrypt(encryptedText: string): string` method
  - [x] 2.5 Add error handling for decryption failures
  - [ ] 2.6 Write unit tests for encryption/decryption round-trip

- [x] 3.0 Backend API Keys Module (NestJS + GraphQL)
  - [x] 3.1 Create module folder structure: `src/api-keys/`
  - [x] 3.2 Create `src/api-keys/entities/api-key.entity.ts` with GraphQL ObjectType decorator
  - [x] 3.3 Create `src/api-keys/dto/create-api-key.input.ts` with class-validator decorators
  - [x] 3.4 Create `src/api-keys/api-keys.service.ts` with methods:
    - [x] 3.4.1 `findAllByUser(userId: string): Promise<ApiKey[]>`
    - [x] 3.4.2 `findByService(userId: string, service: ApiKeyService): Promise<ApiKey[]>`
    - [x] 3.4.3 `findActiveKey(userId: string, service: ApiKeyService): Promise<ApiKey | null>`
    - [x] 3.4.4 `create(userId: string, input: CreateApiKeyInput): Promise<ApiKey>`
    - [x] 3.4.5 `setActive(userId: string, id: string): Promise<ApiKey>`
    - [x] 3.4.6 `delete(userId: string, id: string): Promise<boolean>`
    - [x] 3.4.7 `getDecryptedKey(userId: string, service: ApiKeyService): Promise<string>` (for internal use)
  - [x] 3.5 Create `src/api-keys/api-keys.resolver.ts` with:
    - [x] 3.5.1 Query `apiKeys`: returns all keys for current user
    - [x] 3.5.2 Query `apiKeysByService(service)`: returns keys for specific service
    - [x] 3.5.3 Mutation `createApiKey(input)`: creates new key (with validation)
    - [x] 3.5.4 Mutation `setActiveApiKey(id)`: sets key as active
    - [x] 3.5.5 Mutation `deleteApiKey(id)`: deletes key
  - [x] 3.6 Create `src/api-keys/api-keys.module.ts` and register services
  - [x] 3.7 Import `ApiKeysModule` in `src/app.module.ts`
  - [ ] 3.8 Test GraphQL queries/mutations in GraphQL Playground

- [x] 4.0 Backend API Key Validation Service
  - [x] 4.1 Create `src/api-keys/services/api-key-validator.service.ts`
  - [x] 4.2 Implement `validateApifyKey(apiKey: string): Promise<boolean>` - call `https://api.apify.com/v2/users/me?token={key}`
  - [x] 4.3 Implement `validateOpenAIKey(apiKey: string): Promise<boolean>` - call `https://api.openai.com/v1/models` with Bearer token
  - [x] 4.4 Implement `validateSerpApiKey(apiKey: string): Promise<boolean>` - call `https://serpapi.com/account.json?api_key={key}`
  - [x] 4.5 Implement `validateScreenshotOneKey(apiKey: string): Promise<boolean>` - call ScreenshotOne API
  - [x] 4.6 Implement `validate(service: ApiKeyService, apiKey: string): Promise<boolean>` dispatcher method
  - [x] 4.7 Integrate validation in `createApiKey` mutation (reject invalid keys)
  - [x] 4.8 Add proper error messages for validation failures

---

### Phase 2: Frontend - Module Setup

- [x] 5.0 Frontend Module Structure & Types
  - [x] 5.1 Create folder structure: `modules/api-keys/` with subfolders: `components`, `graphql`, `hooks`, `types`
  - [x] 5.2 Create `modules/api-keys/types/index.ts` with:
    - [x] 5.2.1 `ApiKeyService` enum
    - [x] 5.2.2 `ApiKey` interface
    - [x] 5.2.3 `CreateApiKeyInput` interface
    - [x] 5.2.4 `ServiceConfig` type (icon, name, description for each service)
  - [x] 5.3 Create `modules/api-keys/index.ts` with module exports

- [x] 6.0 Frontend GraphQL Queries & Mutations
  - [x] 6.1 Create `modules/api-keys/graphql/queries.ts` with:
    - [x] 6.1.1 `GET_API_KEYS` query
    - [x] 6.1.2 `GET_API_KEYS_BY_SERVICE` query
  - [x] 6.2 Create `modules/api-keys/graphql/mutations.ts` with:
    - [x] 6.2.1 `CREATE_API_KEY` mutation
    - [x] 6.2.2 `SET_ACTIVE_API_KEY` mutation
    - [x] 6.2.3 `DELETE_API_KEY` mutation
  - [x] 6.3 Create `modules/api-keys/hooks/use-api-keys.ts` - fetch all keys
  - [x] 6.4 Create `modules/api-keys/hooks/use-create-api-key.ts` - create mutation hook
  - [x] 6.5 Create `modules/api-keys/hooks/use-set-active-key.ts` - set active mutation hook
  - [x] 6.6 Create `modules/api-keys/hooks/use-delete-api-key.ts` - delete mutation hook

---

### Phase 3: Frontend - Components & UI

- [x] 7.0 Frontend Components & UI
  - [x] 7.1 Create `modules/api-keys/components/active-key-display.tsx`
    - [x] 7.1.1 Display masked key (`*********XXXX`)
    - [x] 7.1.2 Display label if exists
    - [x] 7.1.3 Green border/highlight styling
    - [x] 7.1.4 Checkmark icon
  - [x] 7.2 Create `modules/api-keys/components/other-keys-list.tsx`
    - [x] 7.2.1 "OTHER KEYS (N)" header with Show all/Hide toggle
    - [x] 7.2.2 List of non-active keys
    - [x] 7.2.3 Hover state with "Set Active" button and delete icon
    - [x] 7.2.4 Confirmation dialog for delete action
  - [x] 7.3 Create `modules/api-keys/components/service-card.tsx`
    - [x] 7.3.1 Service icon and name in header
    - [x] 7.3.2 "Active" badge when service has active key
    - [x] 7.3.3 ActiveKeyDisplay component when active key exists
    - [x] 7.3.4 Empty state with dashed border when no active key
    - [x] 7.3.5 OtherKeysList component when additional keys exist
  - [x] 7.4 Create `modules/api-keys/components/service-selector.tsx` (Step 1 of Add Key)
    - [x] 7.4.1 List all 4 services with icons
    - [x] 7.4.2 Show "N key(s) configured" count for each
    - [x] 7.4.3 Click handler to advance to Step 2
  - [x] 7.5 Create `modules/api-keys/components/key-form.tsx` (Step 2 of Add Key)
    - [x] 7.5.1 Selected service display with "Change service" link
    - [x] 7.5.2 Label input field (optional)
    - [x] 7.5.3 API Key input field (required)
    - [x] 7.5.4 Cancel and Add Key buttons
    - [x] 7.5.5 Loading state during validation ("Validating...")
    - [x] 7.5.6 Error state for invalid keys
  - [x] 7.6 Create `modules/api-keys/components/add-key-sheet.tsx`
    - [x] 7.6.1 Sheet component with proper header
    - [x] 7.6.2 Step state management (step 1 or step 2)
    - [x] 7.6.3 Render ServiceSelector or KeyForm based on step
    - [x] 7.6.4 Handle successful creation (close sheet, show toast, refetch keys)
  - [x] 7.7 Create `modules/api-keys/components/api-keys-page.tsx`
    - [x] 7.7.1 Page header with title and description
    - [x] 7.7.2 "Add Key" button that opens AddKeySheet
    - [x] 7.7.3 2-column grid of ServiceCards (responsive: 1 column on mobile)
    - [x] 7.7.4 Loading skeleton state
    - [x] 7.7.5 Toast notifications for all actions
  - [x] 7.8 Create `app/(authenticated)/settings/api-keys/page.tsx`
    - [x] 7.8.1 Import and render ApiKeysPage component
  - [x] 7.9 Add "API Keys" to settings navigation in `lib/config/settings-nav.ts`
    - [x] 7.9.1 Add nav item with Key icon
    - [x] 7.9.2 Route to `/settings/api-keys`

---

### Phase 4: Integration & Polish

- [x] 8.0 Update Existing Services to Read Keys from Database
  - [x] 8.1 Create shared method `getDecryptedKey(userId, service)` in ApiKeysService (already done in task 3.0)
  - [x] 8.2 Update `src/scraping/scraping.service.ts`:
    - [x] 8.2.1 Inject ApiKeysService
    - [x] 8.2.2 Add `getApiToken(userId)` method with fallback to env var
    - [x] 8.2.3 Update `scrapeGoogleMaps` to accept optional `userId` parameter
  - [x] 8.3 Update `src/ai-messages/ai-messages.service.ts`:
    - [x] 8.3.1 Inject ApiKeysService
    - [x] 8.3.2 Add `getOpenAIApiKey(userId)` method with fallback to env var
    - [x] 8.3.3 Update `generateMessage` to accept optional `userId` parameter
  - [x] 8.4 Update `src/shared/serp-api/serp-api.service.ts`:
    - [x] 8.4.1 Inject ApiKeysService
    - [x] 8.4.2 Add `getApiKey(userId)` method with fallback to env var
    - [x] 8.4.3 Update `search` to accept optional `userId` parameter
  - [x] 8.5 Update `src/website-analysis/services/screenshot.service.ts`:
    - [x] 8.5.1 Inject ApiKeysService
    - [x] 8.5.2 Add `getAccessKey(userId)` method with fallback to env var
    - [x] 8.5.3 Update `captureScreenshot` to accept optional `userId` parameter
  - [ ] 8.6 Update resolvers to pass userId to service methods (gradual migration)

- [x] 9.0 Integration with Billings & Usage Section
  - [x] 9.1 Update Billings & Usage cards to check for active API key
  - [x] 9.2 When no active key, display message: "No active key configured"
  - [x] 9.3 Add "Configure API Key" link that navigates to `/settings/api-keys`
  - [x] 9.4 Update empty state with button to configure API keys
  - [ ] 9.5 Test integration between both sections

---

### Phase 5: Testing & Finalization

- [ ] 10.0 Testing & Documentation
  - [ ] 10.1 Test complete flow: add key → validate → save → set active → delete
  - [ ] 10.2 Test error cases: invalid key, network error, no active key
  - [ ] 10.3 Test responsive design on mobile
  - [ ] 10.4 Verify encryption/decryption works correctly
  - [ ] 10.5 Verify existing services work with keys from database
  - [ ] 10.6 Update README if needed with new environment variable
  - [ ] 10.7 Create PR for backend changes
  - [ ] 10.8 Create PR for frontend changes
