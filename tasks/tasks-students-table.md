# Tasks: Tabla de Estudiantes

## Relevant Files

- `modules/students/components/students-table.tsx` - Componente principal de la tabla de estudiantes
- `modules/students/types/student.ts` - Definición de tipos TypeScript para estudiantes
- `modules/students/utils/mock-data.ts` - Datos mock para desarrollo y testing
- `app/(authenticated)/students/page.tsx` - Página principal que integra la tabla
- `components/ui/table.tsx` - Componente base de shadcn/ui (si no existe)
- `components/ui/badge.tsx` - Componente Badge para chips de cursos y estado (si no existe)
- `components/ui/dropdown-menu.tsx` - Componente para menú de acciones (si no existe)

### Notes

- Los componentes de shadcn/ui pueden necesitar ser instalados si no existen
- La tabla debe seguir la arquitectura del proyecto: feature modules en `modules/`
- Usar Tailwind CSS para todos los estilos
- Mantener consistencia con el design system existente

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch `feature/students-table`

- [x] 1.0 Set up TypeScript types and interfaces for students
  - [x] 1.1 Create directory `modules/students/types/` if it doesn't exist
  - [x] 1.2 Create `student.ts` file with Student interface
  - [x] 1.3 Define Course type for course information
  - [x] 1.4 Define StudentStatus type ('active' | 'inactive')
  - [x] 1.5 Define ContactInfo interface for email and phone
  - [x] 1.6 Export all types from the file

- [x] 2.0 Create mock data for development
  - [x] 2.1 Create directory `modules/students/utils/` if it doesn't exist
  - [x] 2.2 Create `mock-data.ts` file
  - [x] 2.3 Generate mock data with at least 30 students (for pagination testing)
  - [x] 2.4 Include varied test cases: with/without email, with/without phone, multiple courses, different statuses
  - [x] 2.5 Export mock students array

- [x] 3.0 Install and verify shadcn/ui components
  - [x] 3.1 Check if Table component exists in `components/ui/`
  - [x] 3.2 Install Table component if needed using shadcn CLI
  - [x] 3.3 Check if Badge component exists
  - [x] 3.4 Install Badge component if needed
  - [x] 3.5 Check if Avatar component exists
  - [x] 3.6 Install Avatar component if needed
  - [x] 3.7 Check if DropdownMenu component exists
  - [x] 3.8 Install DropdownMenu component if needed

- [x] 4.0 Create base table component structure
  - [x] 4.1 Create directory `modules/students/components/` if it doesn't exist
  - [x] 4.2 Create `students-table.tsx` file
  - [x] 4.3 Import necessary dependencies (React, types, UI components)
  - [x] 4.4 Define component props interface (if needed)
  - [x] 4.5 Create basic component structure with Table wrapper
  - [x] 4.6 Define table headers for all 6 columns
  - [x] 4.7 Set up state for pagination (currentPage)
  - [x] 4.8 Implement basic pagination logic to slice data

- [x] 5.0 Implement student column (Avatar + Name)
  - [x] 5.1 Import Avatar component from shadcn/ui
  - [x] 5.2 Create table cell for student column
  - [x] 5.3 Implement Avatar with initials fallback
  - [x] 5.4 Add student full name next to avatar
  - [x] 5.5 Make name clickeable with Link component
  - [x] 5.6 Add cursor-pointer style to name
  - [x] 5.7 Configure navigation to `/students/[id]`

- [x] 6.0 Implement contact data column (Email + Phone)
  - [x] 6.1 Import Mail and Phone icons from lucide-react
  - [x] 6.2 Create ContactCell component or inline logic
  - [x] 6.3 Conditionally render email row with icon if email exists
  - [x] 6.4 Conditionally render phone row with icon if phone exists
  - [x] 6.5 Handle case when both are missing (show empty or dash)
  - [x] 6.6 Style with proper spacing between rows

- [x] 7.0 Implement courses column with chips
  - [x] 7.1 Import Badge component
  - [x] 7.2 Import appropriate course icon from lucide-react (e.g., BookOpen, GraduationCap)
  - [x] 7.3 Map through student courses array
  - [x] 7.4 Render Badge for each course with icon + course name
  - [x] 7.5 Add flex wrap layout for multiple chips
  - [x] 7.6 Style chips with appropriate spacing

- [x] 8.0 Implement status and creation date columns
  - [x] 8.1 Create status Badge with conditional styling
  - [x] 8.2 Apply green background for 'active' status
  - [x] 8.3 Apply gray background for 'inactive' status
  - [x] 8.4 Format creation date to DD/MM/YYYY or locale format
  - [x] 8.5 Display formatted date in table cell

- [x] 9.0 Implement actions dropdown menu
  - [x] 9.1 Import DropdownMenu components
  - [x] 9.2 Import MoreVertical icon for trigger button
  - [x] 9.3 Create dropdown trigger with three dots icon
  - [x] 9.4 Add "Editar" menu item (no functionality yet, just UI)
  - [x] 9.5 Add "Eliminar" menu item (no functionality yet, just UI)
  - [x] 9.6 Add "Activar/Desactivar" menu item (no functionality yet, just UI)
  - [x] 9.7 Add appropriate icons to each menu item

- [x] 10.0 Implement pagination controls
  - [x] 10.1 Create pagination footer container
  - [x] 10.2 Add "Mostrando X de Y resultados" text on the left
  - [x] 10.3 Add "Página X de Y" text on the right
  - [x] 10.4 Implement first page button (<<) with disabled state
  - [x] 10.5 Implement previous page button (<) with disabled state
  - [x] 10.6 Implement next page button (>) with disabled state
  - [x] 10.7 Implement last page button (>>) with disabled state
  - [x] 10.8 Wire up buttons to update currentPage state
  - [x] 10.9 Style pagination controls to match reference image

- [x] 11.0 Integrate table into students page
  - [x] 11.1 Read current `app/(authenticated)/students/page.tsx`
  - [x] 11.2 Import StudentsTable component
  - [x] 11.3 Replace or add table component to page
  - [x] 11.4 Verify page renders correctly
  - [x] 11.5 Check that SectionHeader or layout components are properly used

- [ ] 12.0 Test and validate complete implementation
  - [ ] 12.1 Test navigation by clicking student names
  - [ ] 12.2 Test pagination controls (all 4 buttons)
  - [ ] 12.3 Verify pagination shows correct page numbers
  - [ ] 12.4 Test dropdown menu opens and shows all options
  - [ ] 12.5 Verify all columns render correctly with mock data
  - [ ] 12.6 Test edge cases (no email, no phone, multiple courses, etc.)
  - [ ] 12.7 Verify styling matches reference images
  - [ ] 12.8 Check responsive behavior on different screen sizes
  - [ ] 12.9 Run linter to ensure code quality

