# Tasks: AI Message Generator Feature

## Relevant Files

### Backend (NestJS)

- `src/ai-messages/ai-messages.module.ts` - New module for AI message generation
- `src/ai-messages/ai-messages.resolver.ts` - GraphQL resolver with generateAIMessage mutation
- `src/ai-messages/ai-messages.service.ts` - Service with OpenAI integration and prompt engineering
- `src/ai-messages/dto/generate-message.input.ts` - Input DTO for the mutation
- `src/ai-messages/entities/generated-message.entity.ts` - Output entity for generated messages
- `src/ai-messages/entities/message-channel.enum.ts` - Enum: WHATSAPP | EMAIL
- `src/ai-messages/entities/message-tone.enum.ts` - Enum: FORMAL | FRIENDLY | PERSUASIVE
- `src/ai-messages/entities/problem-for-message.entity.ts` - Problem structure for AI context
- `src/shared/openai/openai.module.ts` - Shared OpenAI provider module
- `src/shared/openai/openai.service.ts` - OpenAI SDK wrapper service
- `src/app.module.ts` - Update to include new module
- `.env` - Add OPENAI_API_KEY environment variable

### Frontend (Next.js)

- `modules/contacts/types/ai-message.ts` - TypeScript types for AI messages
- `modules/contacts/graphql/mutations/generate-ai-message.ts` - GraphQL mutation
- `modules/contacts/hooks/use-generate-ai-message.ts` - React hook for mutation
- `modules/contacts/components/ai-messages/index.ts` - Barrel export
- `modules/contacts/components/ai-messages/channel-selector.tsx` - WhatsApp/Email toggle
- `modules/contacts/components/ai-messages/tone-selector.tsx` - Formal/Amigable/Persuasivo toggle
- `modules/contacts/components/ai-messages/problem-selector.tsx` - Problem list with checkboxes
- `modules/contacts/components/ai-messages/message-preview.tsx` - Generated message display area
- `modules/contacts/components/ai-messages/ai-message-generator-tab.tsx` - Full tab component
- `modules/contacts/components/ai-messages/ai-message-card.tsx` - Simplified card for Overview
- `modules/contacts/components/ai-messages/empty-states.tsx` - Empty state components for different scenarios
- `modules/contacts/components/company-overview-tab.tsx` - Update to include AI Message Card
- `app/(authenticated)/contacts/company/[id]/page.tsx` - Update to add new tab

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- The backend uses Prisma ORM but this feature doesn't require database changes (no persistence)
- OpenAI SDK should be added: `pnpm add openai`

---

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

---

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/ai-message-generator`

- [ ] 1.0 Backend: Set up OpenAI integration and configuration
  - [ ] 1.1 Install OpenAI SDK: `pnpm add openai` in the backend project
  - [ ] 1.2 Add `OPENAI_API_KEY` to `.env` file (and `.env.example` if exists)
  - [ ] 1.3 Create `src/shared/openai/openai.module.ts` as a global shared module
  - [ ] 1.4 Create `src/shared/openai/openai.service.ts` with OpenAI client initialization and `generateChatCompletion` method
  - [ ] 1.5 Export OpenAI module in `src/shared/openai/index.ts`
  - [ ] 1.6 Import OpenAI module as global in `app.module.ts`

- [ ] 2.0 Backend: Create AI message generation module with GraphQL mutation
  - [ ] 2.1 Create `src/ai-messages/` directory structure (entities/, dto/)
  - [ ] 2.2 Create `src/ai-messages/entities/message-channel.enum.ts` with WHATSAPP, EMAIL values
  - [ ] 2.3 Create `src/ai-messages/entities/message-tone.enum.ts` with FORMAL, FRIENDLY, PERSUASIVE values
  - [ ] 2.4 Create `src/ai-messages/entities/problem-for-message.entity.ts` with id, title, description, severity fields
  - [ ] 2.5 Create `src/ai-messages/entities/generated-message.entity.ts` with content, channel, tone, generatedAt fields
  - [ ] 2.6 Create `src/ai-messages/dto/generate-message.input.ts` with contactId, channel, tone, problemIds, isNoWebsite, isAllOk fields
  - [ ] 2.7 Create `src/ai-messages/ai-messages.service.ts` with:
    - [ ] 2.7.1 Method `generateMessage` that receives input and returns generated message
    - [ ] 2.7.2 Method `buildPrompt` that constructs the OpenAI prompt based on channel, tone, problems
    - [ ] 2.7.3 Method `getContactContext` that fetches contact info (name, company, website) for personalization
    - [ ] 2.7.4 Handle special scenarios: no website, all OK (no problems)
    - [ ] 2.7.5 Adjust message length based on channel (short for WhatsApp, longer for Email)
  - [ ] 2.8 Create `src/ai-messages/ai-messages.resolver.ts` with `generateAIMessage` mutation
  - [ ] 2.9 Create `src/ai-messages/ai-messages.module.ts` importing PrismaService and OpenAIService
  - [ ] 2.10 Import AiMessagesModule in `app.module.ts`
  - [ ] 2.11 Run `pnpm build` to regenerate `schema.gql` and verify no errors

- [ ] 3.0 Frontend: Create types, enums, and GraphQL mutation
  - [ ] 3.1 Create `modules/contacts/types/ai-message.ts` with:
    - [ ] 3.1.1 `MessageChannel` enum (WHATSAPP, EMAIL)
    - [ ] 3.1.2 `MessageTone` enum (FORMAL, FRIENDLY, PERSUASIVE)
    - [ ] 3.1.3 `ProblemForMessage` interface with id, title, description, severity
    - [ ] 3.1.4 `GeneratedMessage` interface with content, channel, tone, generatedAt
    - [ ] 3.1.5 `GenerateAIMessageInput` interface matching backend input
  - [ ] 3.2 Create `modules/contacts/graphql/mutations/generate-ai-message.ts` with GENERATE_AI_MESSAGE mutation
  - [ ] 3.3 Create `modules/contacts/hooks/use-generate-ai-message.ts` hook using useMutation
  - [ ] 3.4 Export new types from `modules/contacts/types/index.ts`

- [ ] 4.0 Frontend: Create shared components (ChannelSelector, ToneSelector, ProblemSelector, MessagePreview)
  - [ ] 4.1 Create `modules/contacts/components/ai-messages/` directory
  - [ ] 4.2 Create `channel-selector.tsx`:
    - [ ] 4.2.1 Two toggle buttons: WhatsApp (with MessageSquare icon) and Email (with Mail icon)
    - [ ] 4.2.2 Props: `value`, `onChange`, optional `disabled`
    - [ ] 4.2.3 WhatsApp selected shows green border, Email shows blue border
  - [ ] 4.3 Create `tone-selector.tsx`:
    - [ ] 4.3.1 Three toggle buttons: Formal, Amigable, Persuasivo
    - [ ] 4.3.2 Props: `value`, `onChange`, optional `disabled`
    - [ ] 4.3.3 Selected button shows filled background (dark)
  - [ ] 4.4 Create `problem-selector.tsx`:
    - [ ] 4.4.1 List of problems with checkboxes
    - [ ] 4.4.2 Each item shows: checkbox, title, severity badge (Crítico/Mejorable), description
    - [ ] 4.4.3 Props: `problems`, `selectedIds`, `onSelectionChange`
    - [ ] 4.4.4 Counter in header: "Problemas a mencionar (X seleccionados)"
    - [ ] 4.4.5 Selected items have purple/blue border highlight
  - [ ] 4.5 Create `message-preview.tsx`:
    - [ ] 4.5.1 Card with "Mensaje generado" header and optional Copy button
    - [ ] 4.5.2 Textarea-like area (read-only) showing the message
    - [ ] 4.5.3 Empty state when no message: icon + "Selecciona al menos un problema"
    - [ ] 4.5.4 Loading state with skeleton animation
    - [ ] 4.5.5 Copy button with toast feedback "¡Copiado!"
  - [ ] 4.6 Create `empty-states.tsx`:
    - [ ] 4.6.1 `NoWebsiteState` - shows "Sin sitio web" problem pre-selected
    - [ ] 4.6.2 `AnalysisPendingState` - shows message to run analysis first with link to Website & SEO tab
    - [ ] 4.6.3 `AllOkState` - shows congratulatory message with option to generate complementary services message
  - [ ] 4.7 Create `index.ts` barrel export for all components

- [ ] 5.0 Frontend: Create AI Message Generator tab (full page with all controls)
  - [ ] 5.1 Create `ai-message-generator-tab.tsx` with two-column layout:
    - [ ] 5.1.1 Left column: ChannelSelector, ToneSelector, ProblemSelector
    - [ ] 5.1.2 Right column: MessagePreview, Generate button
  - [ ] 5.2 Implement state management:
    - [ ] 5.2.1 `channel` state (default: WHATSAPP)
    - [ ] 5.2.2 `tone` state (default: FRIENDLY/Amigable)
    - [ ] 5.2.3 `selectedProblemIds` state (array)
    - [ ] 5.2.4 `generatedMessage` state (string | null)
  - [ ] 5.3 Transform `websiteAnalysis.primaryIssues` to `ProblemForMessage[]` using the existing `parseIssueToDetail` logic
  - [ ] 5.4 Implement scenario detection:
    - [ ] 5.4.1 Check if contact has no website → show NoWebsiteState
    - [ ] 5.4.2 Check if has website but no analysis → show AnalysisPendingState
    - [ ] 5.4.3 Check if analysis exists but no problems → show AllOkState
    - [ ] 5.4.4 Otherwise show normal problem selection
  - [ ] 5.5 Implement Generate button:
    - [ ] 5.5.1 Disabled when no problems selected (unless special scenario)
    - [ ] 5.5.2 Loading state while generating
    - [ ] 5.5.3 Call `useGenerateAIMessage` mutation on click
    - [ ] 5.5.4 Update `generatedMessage` on success
    - [ ] 5.5.5 Show error toast on failure
  - [ ] 5.6 Style the tab header: "Generador de Mensajes IA" with subtitle

- [ ] 6.0 Frontend: Create AI Message Card for Overview section
  - [ ] 6.1 Create `ai-message-card.tsx` as a simplified version:
    - [ ] 6.1.1 Card with header "Generador de Mensajes" and Copiar button
    - [ ] 6.1.2 ChannelSelector (WhatsApp/Email only)
    - [ ] 6.1.3 MessagePreview area
    - [ ] 6.1.4 Generate button
    - [ ] 6.1.5 Link text: "Para personalizar → Mensajes IA"
  - [ ] 6.2 Implement random problem selection:
    - [ ] 6.2.1 On mount or when problems change, randomly select 1-3 problems
    - [ ] 6.2.2 Use the same tone (default: Amigable) - no tone selector in card
  - [ ] 6.3 Handle same scenarios as full tab (no website, pending analysis, all OK)
  - [ ] 6.4 Clicking "Para personalizar" link should navigate/scroll to Mensajes IA tab

- [ ] 7.0 Frontend: Integrate "Mensajes IA" tab into contact detail page
  - [ ] 7.1 Update `app/(authenticated)/contacts/company/[id]/page.tsx`:
    - [ ] 7.1.1 Import `AiMessageGeneratorTab` component
    - [ ] 7.1.2 Add new tab in `HubSpotTabs` array at position 2 (after Overview):
      ```tsx
      {
        value: 'ai-messages',
        label: 'Mensajes IA',
        icon: Sparkles,
        content: <AiMessageGeneratorTab contact={companyContact} />
      }
      ```
    - [ ] 7.1.3 Update tab order: Overview, Mensajes IA, Contacts, Activities, Website & SEO
  - [ ] 7.2 Update `modules/contacts/components/company-overview-tab.tsx`:
    - [ ] 7.2.1 Import `AiMessageCard` component
    - [ ] 7.2.2 Add `AiMessageCard` after FollowUpCard (or as first card if preferred)
    - [ ] 7.2.3 Pass necessary props: `contact`, `onNavigateToTab` (for "personalizar" link)
  - [ ] 7.3 Verify tab navigation works correctly between Overview and Mensajes IA

- [ ] 8.0 Testing and validation
  - [ ] 8.1 Test backend mutation using GraphQL Playground:
    - [ ] 8.1.1 Test with valid contactId and problems
    - [ ] 8.1.2 Test with empty problemIds
    - [ ] 8.1.3 Test with isNoWebsite flag
    - [ ] 8.1.4 Test with isAllOk flag
    - [ ] 8.1.5 Verify message length differs for WhatsApp vs Email
    - [ ] 8.1.6 Verify tone affects message style
  - [ ] 8.2 Test frontend UI:
    - [ ] 8.2.1 Navigate to a company contact with website and analysis
    - [ ] 8.2.2 Verify "Mensajes IA" tab appears as 2nd tab
    - [ ] 8.2.3 Test problem selection and deselection
    - [ ] 8.2.4 Test channel switching (WhatsApp/Email)
    - [ ] 8.2.5 Test tone switching (Formal/Amigable/Persuasivo)
    - [ ] 8.2.6 Click Generate and verify message appears
    - [ ] 8.2.7 Test Copy button and verify toast
    - [ ] 8.2.8 Refresh page and verify message is gone (no persistence)
  - [ ] 8.3 Test empty states:
    - [ ] 8.3.1 Test with contact without website
    - [ ] 8.3.2 Test with contact with website but no analysis run
    - [ ] 8.3.3 Test with contact with analysis but no problems
  - [ ] 8.4 Test Overview card:
    - [ ] 8.4.1 Verify card appears in Overview
    - [ ] 8.4.2 Verify random problems are selected
    - [ ] 8.4.3 Test Generate button in card
    - [ ] 8.4.4 Test "Para personalizar" link navigates to tab
  - [ ] 8.5 Test error handling:
    - [ ] 8.5.1 Simulate network error and verify error toast
    - [ ] 8.5.2 Verify Generate button is disabled when no problems selected
  - [ ] 8.6 Run linting and type checking: `pnpm lint && pnpm typecheck`

