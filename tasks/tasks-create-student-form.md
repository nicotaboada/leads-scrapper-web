# Tasks: Crear Estudiante Form

## Relevant Files

- `modules/students/components/create-student-sheet.tsx` - Main Sheet component with student creation form
- `modules/students/types/student.ts` - Student type definitions (may need to add CreateStudentInput type)
- `app/(authenticated)/students/page.tsx` - Students page that will trigger the sheet
- `components/ui/sheet.tsx` - Shadcn Sheet component (verify exists)
- `components/ui/form.tsx` - Shadcn Form components (verify exists)
- `components/ui/input.tsx` - Shadcn Input component (verify exists)
- `components/ui/select.tsx` - Shadcn Select component (may need to add)
- `package.json` - To verify/add dependencies

### Notes

- The Sheet component will be a client component using React Hook Form and Zod
- No actual API integration - just console logging and toast notifications
- Toast component (Sonner) should already be configured in the project
- Follow project architecture: feature-specific components go in `modules/students/components/`

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch `feature/create-student-form`
- [x] 1.0 Verify and install dependencies
  - [x] 1.1 Read package.json to check existing dependencies
  - [x] 1.2 Verify react-hook-form is installed (v7.66.1 ✓)
  - [x] 1.3 Verify @hookform/resolvers is installed (v5.2.2 ✓)
  - [x] 1.4 Verify zod is installed (v3.24.4 ✓)
  - [x] 1.5 Verify sonner is installed (v2.0.7 ✓)
  - [x] 1.6 Install any missing dependencies (none needed ✓)
- [x] 2.0 Add missing shadcn/ui components
  - [x] 2.1 Verify Sheet component exists (✓)
  - [x] 2.2 Verify Form components exist (✓)
  - [x] 2.3 Verify Input component exists (✓)
  - [x] 2.4 Verify Select component exists (✓)
  - [x] 2.5 Add missing Select component if needed (✓ installed)
  - [x] 2.6 Verify Toaster component is configured (✓ in app/layout.tsx)
- [x] 3.0 Create form types and validation schema
  - [x] 3.1 Read existing student types file
  - [x] 3.2 Create CreateStudentInput type
  - [x] 3.3 Create Zod validation schema
  - [x] 3.4 Define mock courses data
- [x] 4.0 Implement CreateStudentSheet component
  - [x] 4.1 Create the component file
  - [x] 4.2 Set up React Hook Form with Zod resolver
  - [x] 4.3 Implement Sheet structure (trigger, content, header, footer)
  - [x] 4.4 Add form fields (firstName, lastName, email, course)
  - [x] 4.5 Implement form submission logic with mock API call
  - [x] 4.6 Add toast notifications for success/error
  - [x] 4.7 Handle Sheet open/close state
  - [x] 4.8 Test the component and fix any linter errors (✓ no errors)
- [x] 5.0 Integrate Sheet with Students page
  - [x] 5.1 Read the students page file
  - [x] 5.2 Import CreateStudentSheet component
  - [x] 5.3 Add state to control Sheet open/close
  - [x] 5.4 Update handleCreateStudent to open the Sheet
  - [x] 5.5 Render CreateStudentSheet in the page
  - [x] 5.6 Test and fix any linter errors (✓ no errors)
- [x] 6.0 Add toast notifications setup
  - [x] 6.1 Verify Toaster is configured (already done in app/layout.tsx)
- [x] 7.0 Integrate GraphQL mutation for creating students
  - [x] 7.1 Create GraphQL mutation file in modules/students/graphql/
  - [x] 7.2 Create backend-compatible CreateStudentInput type (without course)
  - [x] 7.3 Keep form type with course field (frontend only)
  - [x] 7.4 Update create-student-sheet to use the GraphQL mutation
  - [x] 7.5 Handle loading and error states from mutation
  - [x] 7.6 Implement refetch callback (placeholder for now)
  - [x] 7.7 Use real mutation instead of mock
- [x] 8.0 Implement GetStudents query and replace mock data
  - [x] 8.1 Create GetStudents query in graphql/queries.ts
  - [x] 8.2 Update Student type to match backend schema
  - [x] 8.3 Update students page to use real query
  - [x] 8.4 Implement refetch after student creation
  - [x] 8.5 Remove mock data usage
  - [x] 8.6 Handle loading and empty states
- [ ] 9.0 Test the complete flow with real API

