# Tasks: Dashboard Leads Summary Card

## Relevant Files

### Backend (leads-scrapper-backend)
- `src/contacts/contacts.resolver.ts` - Add new GraphQL query for leads status summary
- `src/contacts/contacts.service.ts` - Add service method to count contacts by leadStatus
- `src/contacts/entities/leads-status-summary.entity.ts` - New entity for the summary response

### Frontend (leads-scrapper-web)
- `modules/dashboard/types/leads-summary.ts` - TypeScript types for leads summary
- `modules/dashboard/graphql/leads-summary-queries.ts` - GraphQL query for leads summary
- `modules/dashboard/hooks/use-leads-status-summary.ts` - Hook to fetch leads summary
- `modules/dashboard/components/leads-status-donut.tsx` - Donut chart component using Recharts
- `modules/dashboard/components/leads-status-card.tsx` - Main card component with donut and stats
- `app/(authenticated)/dashboard/page.tsx` - Dashboard page to integrate the new card

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Recharts is already installed (v3.6.0)
- Follow existing patterns from `modules/dashboard/` (follow-up feature)
- Backend uses NestJS + GraphQL + Prisma

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/dashboard-leads-summary`

- [x] 1.0 Backend: Create GraphQL query for leads status summary
  - [x] 1.1 Create new entity `src/contacts/entities/leads-status-summary.entity.ts` with fields: total, new, contacted, inConversations, closed (all Int)
  - [x] 1.2 Add method `getLeadsStatusSummary()` in `contacts.service.ts` using Prisma `groupBy` to count contacts by `leadStatus`
  - [x] 1.3 Add new Query `leadsStatusSummary` in `contacts.resolver.ts` that returns `LeadsStatusSummary`
  - [ ] 1.4 Test the query using GraphQL Playground to verify it returns correct counts

- [x] 2.0 Frontend: Setup types and GraphQL queries
  - [x] 2.1 Create `modules/dashboard/types/leads-summary.ts` with `LeadStatus` enum and `LeadsStatusSummary` interface
  - [x] 2.2 Create `modules/dashboard/graphql/leads-summary-queries.ts` with `GET_LEADS_STATUS_SUMMARY` query
  - [x] 2.3 Export new types and queries from `modules/dashboard/index.ts`

- [x] 3.0 Frontend: Create custom hook for fetching leads summary
  - [x] 3.1 Create `modules/dashboard/hooks/use-leads-status-summary.ts` following the pattern from `use-follow-up-summary.ts`
  - [x] 3.2 Hook should return: summary data, loading state, error, and refetch function
  - [x] 3.3 Use `cache-and-network` fetch policy for fresh data

- [x] 4.0 Frontend: Create donut chart component
  - [x] 4.1 Create `modules/dashboard/components/leads-status-donut.tsx`
  - [x] 4.2 Use Recharts `PieChart` with `Pie` component configured as donut (innerRadius/outerRadius)
  - [x] 4.3 Implement color mapping for each status: NEW (blue #3B82F6), CONTACTED (orange #F59E0B), IN_CONVERSATIONS (purple #8B5CF6), CLOSED (green #10B981)
  - [x] 4.4 Add center label showing total leads count
  - [x] 4.5 Implement custom tooltip showing: status name (in Spanish), count, and percentage

- [x] 5.0 Frontend: Create leads status card component
  - [x] 5.1 Create `modules/dashboard/components/leads-status-card.tsx`
  - [x] 5.2 Implement card layout with title "Resumen de Leads"
  - [x] 5.3 Add donut chart on the left side
  - [x] 5.4 Add stats list on the right side with colored indicators for each status
  - [x] 5.5 Implement skeleton loader state while data is loading
  - [x] 5.6 Implement empty state when total leads is 0 with message: "No hay leads aún. Crea un run para comenzar a generar leads."
  - [x] 5.7 Use Spanish translations: NEW→"Nuevos", CONTACTED→"Contactados", IN_CONVERSATIONS→"En conversación", CLOSED→"Cerrados"

- [x] 6.0 Frontend: Integrate card into dashboard page
  - [x] 6.1 Import `LeadsStatusCard` in `app/(authenticated)/dashboard/page.tsx`
  - [x] 6.2 Replace placeholder cards with the new `LeadsStatusCard`
  - [x] 6.3 Configure card to span 2 columns in desktop grid (md:col-span-2)
  - [x] 6.4 Ensure responsive layout works on mobile (full width)

- [ ] 7.0 Testing and validation
  - [ ] 7.1 Verify backend query returns correct counts matching database
  - [ ] 7.2 Test card renders correctly with sample data
  - [ ] 7.3 Test loading state displays skeleton
  - [ ] 7.4 Test empty state when no contacts exist
  - [ ] 7.5 Test tooltip appears on hover with correct information
  - [ ] 7.6 Test responsive layout on different screen sizes
