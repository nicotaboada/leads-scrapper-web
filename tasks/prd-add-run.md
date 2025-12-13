# PRD: Add Run Feature

## Introduction/Overview

This feature adds the ability to create new scraping runs from the Runs page. Users will be able to configure and create runs for different actor types (starting with Google Maps Scraper). The run will be created in a "pending" state and can be started manually later by the user.

**Problem Statement:** Currently, users cannot create new scraping runs from the frontend. This feature provides a user-friendly interface to configure and create runs without requiring direct API interaction.

**Goal:** Enable users to create scraping runs with proper configuration through an intuitive form interface.

## Goals

1. Provide a simple and intuitive interface for creating new scraping runs
2. Support multiple actor types with dynamic form inputs based on selection
3. Implement proper validation for required fields and data formats
4. Create runs in a "pending" state for manual execution
5. Ensure the UI is consistent with the existing Students page pattern

## User Stories

**As a user, I want to:**
- Click an "Add Run" button on the Runs page to open a creation form
- Give my run a meaningful name to identify it later
- Select the type of scraper (actor) I want to use
- See relevant configuration inputs based on my actor selection
- Add multiple search terms easily using a chip-based input
- Specify a location and optional number of places for Google Maps scraping
- Save my run configuration and see it appear in the runs list
- Receive clear feedback when the run is successfully created

## Functional Requirements

### FR1: Add Run Button
1.1. Display an "Add Run" button in the header section of the Runs page  
1.2. Button should match the styling pattern of the "Nuevo Estudiante" button on the Students page  
1.3. Button should include a PlusIcon from lucide-react  
1.4. Clicking the button opens the "Add Run" sheet

### FR2: Add Run Sheet Component
2.1. Create a Sheet component that slides in from the right side of the screen  
2.2. Sheet header should display "Create New Run" as the title  
2.3. Sheet should have a close button (X) in the top-right corner  
2.4. Sheet should close when clicking outside of it or pressing ESC key  
2.5. Sheet body should contain the run configuration form

### FR3: Run Name Input
3.1. Display a text input labeled "Run Name"  
3.2. Input is required (cannot submit without a value)  
3.3. Input should have placeholder text: "e.g., Coffee Shops in Manhattan"  
3.4. Show validation error if user attempts to submit with empty name

### FR4: Actor Type Selection
4.1. Display a select dropdown labeled "Actor Type"  
4.2. Initially include only one option: "Google Maps Scraper"  
4.3. "Google Maps Scraper" should be selected by default  
4.4. Component should be built to support additional actor types in the future  
4.5. Changing the actor type should show/hide relevant configuration inputs

### FR5: Google Maps Scraper Configuration

#### FR5.1: Search Terms Input (Chip Component)
5.1.1. Display a chip-based input labeled "Search Terms" (required field)  
5.1.2. Include helper text: "Press Enter or click Add to create a search term"  
5.1.3. User can type a term in the input field  
5.1.4. Pressing Enter or clicking an "Add" button adds the term as a chip  
5.1.5. Clear the input field after adding a chip  
5.1.6. Display chips horizontally, wrapping to new rows as needed  
5.1.7. Each chip displays the search term text and an X button  
5.1.8. Clicking the X button removes that chip  
5.1.9. Minimum 1 search term required (show validation error if none)  
5.1.10. Prevent adding empty or whitespace-only search terms  
5.1.11. Prevent duplicate search terms (case-insensitive)

#### FR5.2: Location Input
5.2.1. Display a text input labeled "Location" (required field)  
5.2.2. Input should have placeholder text: "e.g., New York, NY"  
5.2.3. Show validation error if user attempts to submit without location

#### FR5.3: Number of Places Input
5.3.1. Display a number input labeled "Number of Places" (optional field)  
5.3.2. Input should have placeholder text: "e.g., 50"  
5.3.3. If provided, value must be a positive integer greater than 0  
5.3.4. Show validation error if user enters invalid number (negative or zero)  
5.3.5. Allow field to be empty (will use system default)

### FR6: Form Actions
6.1. Display two buttons at the bottom of the sheet: "Cancel" and "Create Run"  
6.2. "Cancel" button should close the sheet without saving  
6.3. "Create Run" button should be disabled if form is invalid  
6.4. "Create Run" button should show loading state during submission  
6.5. Validate all required fields before allowing submission

### FR7: Form Submission & Success Handling
7.1. On successful creation, close the sheet  
7.2. Show a success toast/notification message: "Run created successfully"  
7.3. Refresh the runs list to display the newly created run  
7.4. Reset the form fields for next use  
7.5. The new run should appear with "pending" status in the runs list

### FR8: Error Handling
8.1. Display inline validation errors below each field  
8.2. Show error toast if creation fails  
8.3. Keep the sheet open on error to allow user to correct and retry  
8.4. Preserve user input when validation fails

## Non-Goals (Out of Scope)

1. **Backend Integration:** This feature will use mock data initially. GraphQL mutations and actual backend integration are out of scope for this phase.
2. **Run Execution:** Starting or stopping runs is not part of this feature. Runs are created in "pending" state only.
3. **Multiple Actor Types:** Only Google Maps Scraper is in scope. Additional actors (LinkedIn, Instagram, etc.) will be added later.
4. **Advanced Configuration:** Features like scheduling, webhooks, or advanced scraping options are not included.
5. **Bulk Run Creation:** Creating multiple runs at once is out of scope.
6. **Run Templates:** Saving and reusing run configurations as templates is not included.
7. **Edit Existing Runs:** This feature only handles creation, not editing existing runs.

## Design Considerations

### UI/UX Requirements

1. **Consistency:** Follow the same patterns used in the Students page (CreateStudentSheet component)
2. **Component Library:** Use existing UI components from `components/ui/`
3. **Sheet Width:** Use standard sheet width (similar to student creation sheet)
4. **Form Layout:** Stack inputs vertically with consistent spacing
5. **Responsive Design:** Ensure the sheet works on different screen sizes

### Key Components Needed

- `CreateRunSheet`: Main sheet component (similar to `CreateStudentSheet`)
- `ChipInput`: Reusable chip-based input component for search terms
- `ActorTypeSelect`: Select component for choosing actor type
- Form validation using React Hook Form or similar
- Toast notifications for success/error feedback

### Visual Reference

Follow the visual style and interaction patterns established in:
- `leads-scrapper-web/app/(authenticated)/students/page.tsx`
- `leads-scrapper-web/modules/students/components/create-student-sheet.tsx`

## Technical Considerations

### Data Structure

```typescript
interface CreateRunInput {
  runName: string
  actorType: 'google-maps' | string // Extensible for future actors
  config: GoogleMapsConfig | OtherActorConfig
}

interface GoogleMapsConfig {
  searchTerms: string[]
  location: string
  numberOfPlaces?: number
}
```

### Mock Data Implementation

1. Use `useState` to manage the list of runs locally
2. Generate unique IDs using `crypto.randomUUID()` or similar
3. Set `status: 'pending'` for newly created runs
4. Set `author` to current user's name (or "Current User" if not available)
5. Set `createdAt` to current timestamp
6. Set `results` to 0 for new runs

### State Management

- Use local component state for form inputs
- Update parent component's runs list when new run is created
- Consider using `useRuns` hook to manage runs data consistently

### Validation Libraries

- Consider using `zod` or `yup` for schema validation
- Integrate with `react-hook-form` for form state management
- Use `class-validator` decorators if needed for consistency with backend

### File Structure

```
modules/runs/
├── components/
│   ├── create-run-sheet.tsx
│   └── chip-input.tsx (or in components/ui/ if reusable)
├── hooks/
│   └── use-create-run.ts (mock implementation)
└── types/
    └── create-run.ts (input types)
```

## Success Metrics

1. **User Adoption:** 80%+ of users who view the Runs page discover and use the "Add Run" button
2. **Completion Rate:** 90%+ of users who open the sheet successfully create a run
3. **Error Rate:** Less than 5% of submissions result in validation errors
4. **User Satisfaction:** Positive feedback on the ease of creating runs
5. **Time to Create:** Users can create a run in under 60 seconds

## Open Questions

1. Should we limit the maximum number of search terms? (e.g., max 10)
2. Should we provide default values for "Number of Places" if not specified?
3. Should we show a preview of what will be scraped before creating the run?
4. Do we need to implement draft/auto-save functionality for partially filled forms?
5. Should we add tooltips or help text explaining what each actor type does?
6. When backend integration is added, what should the GraphQL mutation look like?
7. Should we validate location input (e.g., suggest locations via Google Places API)?

## Future Enhancements

1. Add more actor types (LinkedIn Scraper, Instagram Scraper, etc.)
2. Backend integration with GraphQL mutations
3. Run templates for quick configuration
4. Bulk run creation from CSV
5. Scheduling runs for future execution
6. Clone/duplicate existing runs
7. Advanced configuration options per actor type

