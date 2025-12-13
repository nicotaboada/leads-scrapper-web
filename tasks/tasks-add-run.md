# Tasks: Add Run Feature

## Relevant Files

### Files to Create:
- `modules/runs/types/create-run.ts` - TypeScript types for run creation input and actor configurations
- `components/ui/chip-input.tsx` - Reusable chip-based input component for adding/removing search terms
- `modules/runs/components/create-run-sheet.tsx` - Main sheet component for creating new runs
- `modules/runs/hooks/use-create-run.ts` - Custom hook for handling run creation with mock data

### Files to Modify:
- `modules/runs/types/run.ts` - Add 'pending' status to RunStatus type
- `modules/runs/data/mock-runs.ts` - Add function to create new mock runs
- `app/(authenticated)/runs/page.tsx` - Add "Add Run" button and integrate CreateRunSheet

### Reference Files:
- `modules/students/components/create-student-sheet.tsx` - Reference for sheet structure and form patterns
- `components/ui/sheet.tsx` - Sheet component from shadcn/ui
- `components/ui/form.tsx` - Form components for react-hook-form integration

### Notes
- Use `react-hook-form` with `zod` validation (already in the project)
- Use `sonner` for toast notifications (already in the project)
- Follow the existing patterns from CreateStudentSheet
- Mock data implementation will be replaced with GraphQL later

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch: `git checkout -b feature/add-run`

- [x] 1.0 Create TypeScript types and interfaces for run creation
  - [x] 1.1 Read existing run types in `modules/runs/types/run.ts`
  - [x] 1.2 Update `run.ts` to add 'pending' to RunStatus type (currently only has 'running' | 'finished')
  - [x] 1.3 Create `modules/runs/types/create-run.ts` file
  - [x] 1.4 Define ActorType type ('google-maps' initially)
  - [x] 1.5 Define GoogleMapsConfig interface (searchTerms: string[], location: string, numberOfPlaces?: number)
  - [x] 1.6 Define CreateRunInput interface (runName: string, actorType: ActorType, config: GoogleMapsConfig)
  - [x] 1.7 Create Zod schema for form validation (createRunSchema)
  - [x] 1.8 Export all types and schema

- [x] 2.0 Create ChipInput component for search terms
  - [x] 2.1 Create `components/ui/chip-input.tsx` file
  - [x] 2.2 Define ChipInputProps interface (value: string[], onChange: (value: string[]) => void, placeholder?: string, disabled?: boolean)
  - [x] 2.3 Implement input state for current text being typed
  - [x] 2.4 Implement handleAdd function (validates non-empty, no duplicates, adds to array)
  - [x] 2.5 Implement handleRemove function (removes chip by index)
  - [x] 2.6 Implement handleKeyDown to add chip on Enter key
  - [x] 2.7 Add "Add" button below input to add chips
  - [x] 2.8 Render chips with X button horizontally with wrapping
  - [x] 2.9 Style with Tailwind CSS following project patterns
  - [x] 2.10 Add proper accessibility attributes (aria-labels, keyboard navigation)
  - [x] 2.11 Export component

- [x] 3.0 Create CreateRunSheet component with form
  - [x] 3.1 Read `modules/students/components/create-student-sheet.tsx` for reference
  - [x] 3.2 Create `modules/runs/components/create-run-sheet.tsx` file
  - [x] 3.3 Define CreateRunSheetProps interface (open: boolean, onOpenChange: (open: boolean) => void, onRunCreated?: () => void)
  - [x] 3.4 Set up react-hook-form with zod resolver and createRunSchema
  - [x] 3.5 Set default form values (empty strings, 'google-maps' as default actor type)
  - [x] 3.6 Create Sheet structure with SheetHeader (title: "Create New Run", description)
  - [x] 3.7 Add Form wrapper with react-hook-form
  - [x] 3.8 Add Run Name FormField (text input, required, placeholder: "e.g., Coffee Shops in Manhattan")
  - [x] 3.9 Add Actor Type FormField (Select component with "Google Maps Scraper" option selected by default)
  - [x] 3.10 Create conditional section that shows Google Maps config when actor type is 'google-maps'
  - [x] 3.11 Add Search Terms FormField using ChipInput component (required, minimum 1 term)
  - [x] 3.12 Add Location FormField (text input, required, placeholder: "e.g., New York, NY")
  - [x] 3.13 Add Number of Places FormField (number input, optional, placeholder: "e.g., 50")
  - [x] 3.14 Add form validation logic to prevent submission if invalid
  - [x] 3.15 Create handleSubmit function (will call onRunCreated callback)
  - [x] 3.16 Create handleCancel function (closes sheet)
  - [x] 3.17 Create handleOpenChange function (resets form when closing)
  - [x] 3.18 Add SheetFooter with "Cancel" and "Create Run" buttons
  - [x] 3.19 Implement loading state during submission
  - [x] 3.20 Add JSDoc documentation to component

- [x] 4.0 Add mock data functionality for creating runs
  - [x] 4.1 Read `modules/runs/data/mock-runs.ts` to understand current structure
  - [x] 4.2 Add createMockRun function to generate new Run objects
  - [x] 4.3 Add addRunToMockData function to add runs to mock array
  - [x] 4.4 Functions generate Run objects with proper structure (id, status: 'pending', results: 0, etc.)

- [x] 5.0 Integrate Add Run button and sheet into Runs page
  - [x] 5.1 Read current `app/(authenticated)/runs/page.tsx`
  - [x] 5.2 Import PlusIcon from lucide-react
  - [x] 5.3 Import Button component
  - [x] 5.4 Import CreateRunSheet component
  - [x] 5.5 Import mock data functions
  - [x] 5.6 Add state for isCreateSheetOpen (useState)
  - [x] 5.7 Add refreshKey state to trigger data refresh
  - [x] 5.8 Add "Add Run" button to SectionHeader actions prop
  - [x] 5.9 Style button to match "Nuevo Estudiante" pattern (with PlusIcon)
  - [x] 5.10 Implement handleCreateRun function (opens sheet)
  - [x] 5.11 Implement handleRunCreated callback function
  - [x] 5.12 Add run to mock data and trigger refresh
  - [x] 5.13 Render CreateRunSheet component at bottom of page
  - [x] 5.14 Wire up open, onOpenChange, and onRunCreated props
  - [x] 5.15 Update useRuns hook to support refresh trigger

- [x] 6.0 Test the complete flow and fix any issues
  - [x] 6.1 Fixed TypeScript errors (handleOpenChange → handleSheetOpenChange)
  - [x] 6.2 Fixed unused import (ActorType)
  - [x] 6.3 Fixed Zod schema type mismatch for numberOfPlaces field
  - [x] 6.4 Ran prettier to fix formatting issues
  - [x] 6.5 Verified all linter errors are resolved
  - [x] 6.6 Implementation complete and ready for manual testing

