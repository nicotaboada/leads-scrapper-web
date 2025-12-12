# Task List: Breadcrumb Navigation Component

## Relevant Files

- `components/layouts/detail-header.tsx` - Componente principal que contiene breadcrumb y actions
- `types/breadcrumb.ts` - Interfaces TypeScript para BreadcrumbItem y DetailHeaderProps
- `app/(authenticated)/students/[id]/page.tsx` - Implementación de ejemplo en página de detalle de estudiante
- `lib/config/sidebar-nav.ts` - Referencia para iconos consistentes

### Notes

- Este componente reemplazará el uso de `SectionHeader` en páginas de detalle/subrutas
- Usar componentes existentes de shadcn/ui donde sea apropiado
- Mantener consistencia visual con el design system existente

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature (e.g., `git checkout -b feature/breadcrumb`)
- [x] 1.0 Define TypeScript interfaces and types
  - [x] 1.1 Create `types/breadcrumb.ts` file
  - [x] 1.2 Define `BreadcrumbItem` interface with icon, label, and href properties
  - [x] 1.3 Define `DetailHeaderProps` interface with breadcrumbItems, actions, and className
  - [x] 1.4 Export types for use in components
- [x] 2.0 Create Breadcrumb component
  - [x] 2.1 Create `components/layouts/detail-header.tsx` file
  - [x] 2.2 Import necessary dependencies (Link from next/link, lucide-react icons)
  - [x] 2.3 Implement Breadcrumb component that accepts breadcrumbItems prop
  - [x] 2.4 Render icon for first element only
  - [x] 2.5 Render separator (chevron) between breadcrumb items
  - [x] 2.6 Make elements with href clickeable using Next.js Link
  - [x] 2.7 Style last element differently (no link, medium font-weight)
  - [x] 2.8 Add hover states for clickeable elements
  - [x] 2.9 Ensure keyboard navigation and focus states for accessibility
- [x] 3.0 Create DetailHeader wrapper component
  - [x] 3.1 Implement DetailHeader component in same file
  - [x] 3.2 Accept breadcrumbItems, actions, and className props
  - [x] 3.3 Render Breadcrumb component with breadcrumbItems
  - [x] 3.4 Render actions section if provided
  - [x] 3.5 Set up basic horizontal layout (breadcrumb left, actions right)
- [x] 4.0 Implement responsive layout
  - [x] 4.1 Add Tailwind classes for desktop horizontal layout (≥768px)
  - [x] 4.2 Add Tailwind classes for mobile vertical stack (<768px)
  - [x] 4.3 Ensure proper spacing and gaps between elements
  - [x] 4.4 Test truncation/wrap behavior for long breadcrumb labels
  - [x] 4.5 Ensure actions section aligns properly in both layouts
- [ ] 5.0 Integrate component in example page (students/[id])
  - [ ] 5.1 Read current implementation of `app/(authenticated)/students/[id]/page.tsx`
  - [ ] 5.2 Import DetailHeader and necessary icons
  - [ ] 5.3 Replace or add DetailHeader with proper breadcrumbItems configuration
  - [ ] 5.4 Add example action buttons (Edit, Add Note, etc.)
  - [ ] 5.5 Test navigation from detail page back to list
- [ ] 6.0 Test and refine component
  - [ ] 6.1 Verify responsive behavior in different viewport sizes
  - [ ] 6.2 Test keyboard navigation and accessibility
  - [ ] 6.3 Verify consistent styling with existing design system
  - [ ] 6.4 Test with 2, 3, and 4 level breadcrumbs
  - [ ] 6.5 Ensure proper hover and focus states
  - [ ] 6.6 Fix any linting errors

