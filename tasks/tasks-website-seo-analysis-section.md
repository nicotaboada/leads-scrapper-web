# Tasks: Website & SEO Analysis Section (Frontend)

## Relevant Files

### Components
- `modules/contacts/components/website-seo-tab.tsx` - Main tab component that orchestrates all sections
- `modules/contacts/components/website-seo-scores.tsx` - Section with 3 circular progress indicators
- `modules/contacts/components/website-seo-issues.tsx` - Section with issue cards grid
- `modules/contacts/components/website-seo-metrics.tsx` - Section with 4 horizontal progress bars
- `modules/contacts/components/website-seo-empty.tsx` - Empty state when no analysis exists

### GraphQL
- `modules/contacts/graphql/website-analysis.ts` - Queries and mutations for website analysis

### Types
- `modules/contacts/types/website-analysis.ts` - TypeScript types for website analysis data

### Page Integration
- `app/(authenticated)/contacts/[id]/page.tsx` - Company contact detail page (add new tab)

### Existing Components to Use
- `components/ui/card.tsx` - shadcn Card component
- `components/ui/progress.tsx` - shadcn Progress component
- `components/ui/button.tsx` - shadcn Button component
- `components/ui/tabs.tsx` - shadcn Tabs component

### Notes

- Use shadcn/ui components for consistency with the existing design system.
- Use `sonner` for toast notifications (already configured in the project).
- Circular progress charts can be implemented with Recharts RadialBarChart or custom SVG.
- Follow existing patterns in the codebase for GraphQL queries and component structure.

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/website-seo-analysis-section`

- [ ] 1.0 Setup GraphQL queries and mutations for Website Analysis
  - [ ] 1.1 Create `modules/contacts/graphql/website-analysis.ts` file
  - [ ] 1.2 Define `GET_CONTACT_ANALYSIS` query with fields: id, websiteUrl, websiteScore, seoScore, overallScore, professionalismScore, freshnessScore, loadTimeScore, primaryIssues, analyzedAt
  - [ ] 1.3 Define `ANALYZE_CONTACT_WEBSITE` mutation with contactId input
  - [ ] 1.4 Create `modules/contacts/types/website-analysis.ts` with TypeScript interfaces
  - [ ] 1.5 Define `WebsiteAnalysis` interface matching the GraphQL response
  - [ ] 1.6 Define helper type for score color mapping (low/medium/high)

- [ ] 2.0 Create Score Circles component (Card 1)
  - [ ] 2.1 Create `modules/contacts/components/website-seo-scores.tsx` file
  - [ ] 2.2 Create `CircularProgress` sub-component using Recharts RadialBarChart or custom SVG
  - [ ] 2.3 Implement color logic: 0-40 red, 41-70 amber, 71-100 green
  - [ ] 2.4 Create layout with large circle (Global Score) on left
  - [ ] 2.5 Create layout with two medium circles (Web Design, SEO Health) on right
  - [ ] 2.6 Add labels below each circle
  - [ ] 2.7 Wrap in shadcn Card component
  - [ ] 2.8 Make component responsive (stack on mobile)

- [ ] 3.0 Create Issues section component (Card 2)
  - [ ] 3.1 Create `modules/contacts/components/website-seo-issues.tsx` file
  - [ ] 3.2 Create `IssueCard` sub-component with warning icon and text
  - [ ] 3.3 Implement grid layout (2 columns desktop, 1 column mobile)
  - [ ] 3.4 Map `primaryIssues` array to IssueCard components
  - [ ] 3.5 Handle empty state: show "No issues detected" with check icon
  - [ ] 3.6 Wrap in shadcn Card with title "Main Issues Detected"

- [ ] 4.0 Create Metrics bars component (Card 3)
  - [ ] 4.1 Create `modules/contacts/components/website-seo-metrics.tsx` file
  - [ ] 4.2 Create `MetricBar` sub-component with label, Progress bar, and value
  - [ ] 4.3 Implement color logic for Progress bar (same as circles)
  - [ ] 4.4 Add 4 MetricBar components: Professionalism, Freshness, Load Time, SEO Position
  - [ ] 4.5 Style with proper spacing between bars
  - [ ] 4.6 Wrap in shadcn Card with title "Detailed Metrics"

- [ ] 5.0 Create Empty state component
  - [ ] 5.1 Create `modules/contacts/components/website-seo-empty.tsx` file
  - [ ] 5.2 Add icon (Search, Globe, or BarChart3 from Lucide)
  - [ ] 5.3 Add title: "No website analysis available"
  - [ ] 5.4 Add description: "Run an analysis to get insights about this company's website and SEO performance."
  - [ ] 5.5 Add "Run Analysis" button (primary variant)
  - [ ] 5.6 Implement onClick handler that accepts a callback function
  - [ ] 5.7 Add loading state for button while analysis is running

- [ ] 6.0 Create main Website & SEO tab component
  - [ ] 6.1 Create `modules/contacts/components/website-seo-tab.tsx` file
  - [ ] 6.2 Import and use the GraphQL query `GET_CONTACT_ANALYSIS`
  - [ ] 6.3 Import and use the GraphQL mutation `ANALYZE_CONTACT_WEBSITE`
  - [ ] 6.4 Add section header: "Website & SEO Analysis" with subtitle
  - [ ] 6.5 Implement conditional rendering: empty state vs analysis results
  - [ ] 6.6 Compose the 3 card sections (Scores, Issues, Metrics)
  - [ ] 6.7 Implement `handleRunAnalysis` function:
    - [ ] 6.7.1 Call mutation
    - [ ] 6.7.2 Show toast "Analysis started - you can continue browsing"
    - [ ] 6.7.3 On success: show success toast and refetch data
    - [ ] 6.7.4 On error: show error toast
  - [ ] 6.8 Add "Last analyzed: {date}" footer
  - [ ] 6.9 Add optional "Re-run Analysis" button
  - [ ] 6.10 Handle loading and error states

- [ ] 7.0 Integrate tab into Company Contact detail page
  - [ ] 7.1 Locate the company contact detail page component
  - [ ] 7.2 Import `WebsiteSeoTab` component
  - [ ] 7.3 Add "Website & SEO" to the tabs navigation (only for COMPANY type)
  - [ ] 7.4 Add TabsContent with WebsiteSeoTab component
  - [ ] 7.5 Test navigation between tabs
  - [ ] 7.6 Verify responsive behavior on mobile
  - [ ] 7.7 Test the full flow: empty state → run analysis → view results

