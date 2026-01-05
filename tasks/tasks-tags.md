# Tasks: Tags Module

## Relevant Files

### Backend (leads-scrapper-backend)

- `prisma/schema.prisma` - Add Tag model with TagColor enum
- `prisma/migrations/XXXXXX_add_tags/migration.sql` - Database migration for tags table
- `src/tags/tags.module.ts` - NestJS module for tags
- `src/tags/tags.service.ts` - Business logic for tag CRUD operations
- `src/tags/tags.resolver.ts` - GraphQL resolver for tags
- `src/tags/dto/create-tag.input.ts` - Input DTO for creating tags
- `src/tags/dto/update-tag.input.ts` - Input DTO for updating tags
- `src/tags/dto/tags-filter.input.ts` - Input DTO for filtering/pagination
- `src/tags/entities/tag.entity.ts` - GraphQL entity type for Tag
- `src/tags/entities/tag-color.enum.ts` - GraphQL enum for tag colors
- `src/tags/entities/tags-response.entity.ts` - Paginated response entity
- `src/app.module.ts` - Register TagsModule

### Frontend (leads-scrapper-web)

- `app/(authenticated)/tags/page.tsx` - Tags page component
- `modules/tags/components/tags-table.tsx` - Tags table with actions
- `modules/tags/components/tag-sheet.tsx` - Sheet form for create/edit tag
- `modules/tags/components/tag-color-picker.tsx` - Color selection component
- `modules/tags/components/delete-tag-dialog.tsx` - Delete confirmation dialog
- `modules/tags/components/tag-actions-menu.tsx` - More options dropdown menu
- `modules/tags/graphql/queries.ts` - GraphQL queries for tags
- `modules/tags/graphql/mutations.ts` - GraphQL mutations for tags
- `modules/tags/hooks/use-tags.ts` - Hook for fetching tags
- `modules/tags/hooks/use-create-tag.ts` - Hook for creating tags
- `modules/tags/hooks/use-update-tag.ts` - Hook for updating tags
- `modules/tags/hooks/use-delete-tag.ts` - Hook for deleting tags
- `modules/tags/types/tag.ts` - TypeScript types for tags
- `modules/tags/types/index.ts` - Types barrel export
- `lib/config/routes.ts` - Add TAGS route
- `lib/config/sidebar-nav.ts` - Add Tags navigation item

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Backend is in `/Users/nicolastaboada/Desktop/leads-scrapper-backend`
- Frontend is in `/Users/nicolastaboada/Desktop/leads-scrapper-web`
- Follow existing patterns from contacts/runs modules

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

---

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Create and checkout a new branch for this feature: `git checkout -b feature/tags-module`

- [x] 1.0 Backend: Create Prisma model and database migration for Tag entity
  - [x] 1.1 Add `TagColor` enum to `prisma/schema.prisma` with values: RED, ORANGE, GREEN, BLUE, PURPLE
  - [x] 1.2 Add `Tag` model to `prisma/schema.prisma` with fields: id (uuid), name (String, required), color (TagColor, optional), description (String, optional), createdAt, updatedAt
  - [x] 1.3 Add `@@map("tags")` to the Tag model for table naming convention
  - [x] 1.4 Run `npx prisma migrate dev --name add_tags` to create migration
  - [x] 1.5 Run `npx prisma generate` to update Prisma client

- [x] 2.0 Backend: Create NestJS Tags module with resolver, service, DTOs and entities
  - [x] 2.1 Create `src/tags/` directory structure
  - [x] 2.2 Create `src/tags/entities/tag-color.enum.ts` with GraphQL enum registration
  - [x] 2.3 Create `src/tags/entities/tag.entity.ts` with GraphQL ObjectType decorators
  - [x] 2.4 Create `src/tags/entities/tags-response.entity.ts` for paginated response (data + meta)
  - [x] 2.5 Create `src/tags/dto/create-tag.input.ts` with class-validator decorators (name required, color optional, description optional)
  - [x] 2.6 Create `src/tags/dto/update-tag.input.ts` with all fields optional
  - [x] 2.7 Create `src/tags/dto/tags-filter.input.ts` for pagination (page, limit)
  - [x] 2.8 Create `src/tags/tags.service.ts` with methods: create, findAll (paginated), findOne, update, delete
  - [x] 2.9 Create `src/tags/tags.resolver.ts` with Query (tags, tag) and Mutations (createTag, updateTag, deleteTag)
  - [x] 2.10 Create `src/tags/tags.module.ts` and register service/resolver
  - [x] 2.11 Import `TagsModule` in `src/app.module.ts`
  - [ ] 2.12 Start backend and verify GraphQL schema includes new Tag types

- [x] 3.0 Frontend: Create Tags page route and module structure
  - [x] 3.1 Add `TAGS: '/tags'` to `lib/config/routes.ts`
  - [x] 3.2 Add `/tags` to `PROTECTED_ROUTE_PREFIXES` array in `lib/config/routes.ts`
  - [x] 3.3 Create `modules/tags/` directory structure (components/, graphql/, hooks/, types/)
  - [x] 3.4 Create `modules/tags/types/tag.ts` with Tag interface and TagColor enum
  - [x] 3.5 Create `modules/tags/types/index.ts` barrel export
  - [x] 3.6 Create `app/(authenticated)/tags/page.tsx` with basic page structure (use 'use client')

- [x] 4.0 Frontend: Implement Tags table with pagination
  - [x] 4.1 Create `modules/tags/graphql/queries.ts` with GET_TAGS query (paginated)
  - [x] 4.2 Create `modules/tags/hooks/use-tags.ts` hook using useBackendPagination
  - [x] 4.3 Create `modules/tags/components/tag-color-badge.tsx` to display colored circle/badge
  - [x] 4.4 Create `modules/tags/components/tags-table.tsx` with columns: Name, Color, Description, Created, Actions
  - [x] 4.5 Integrate tags table in `app/(authenticated)/tags/page.tsx`
  - [x] 4.6 Add empty state when no tags exist
  - [x] 4.7 Add loading skeleton while fetching

- [x] 5.0 Frontend: Implement Create/Edit Tag sheet form
  - [x] 5.1 Create `modules/tags/graphql/mutations.ts` with CREATE_TAG and UPDATE_TAG mutations
  - [x] 5.2 Create `modules/tags/hooks/use-create-tag.ts` mutation hook
  - [x] 5.3 Create `modules/tags/hooks/use-update-tag.ts` mutation hook
  - [x] 5.4 Create `modules/tags/components/tag-color-picker.tsx` with 5 color circles + Clear option
  - [x] 5.5 Create `modules/tags/components/tag-sheet.tsx` with form: Name (required), Color (optional), Description (optional)
  - [x] 5.6 Add form validation using Zod (name required, max lengths)
  - [x] 5.7 Add "Create New Tag" button to page header that opens the sheet
  - [x] 5.8 Implement create mode: empty form, save creates new tag
  - [x] 5.9 Implement edit mode: pre-filled form, save updates existing tag
  - [x] 5.10 Refresh table after successful create/update

- [x] 6.0 Frontend: Implement Delete Tag functionality with confirmation
  - [x] 6.1 Add DELETE_TAG mutation to `modules/tags/graphql/mutations.ts`
  - [x] 6.2 Create `modules/tags/hooks/use-delete-tag.ts` mutation hook
  - [x] 6.3 Create `modules/tags/components/tag-actions-menu.tsx` with Edit and Delete options (three dots icon)
  - [x] 6.4 Create `modules/tags/components/delete-tag-dialog.tsx` confirmation dialog using AlertDialog
  - [x] 6.5 Wire up actions menu in table rows
  - [x] 6.6 Connect Edit action to open sheet in edit mode
  - [x] 6.7 Connect Delete action to show confirmation dialog
  - [x] 6.8 Refresh table after successful delete

- [x] 7.0 Add Tags to sidebar navigation
  - [x] 7.1 Import Tag icon from lucide-react in `lib/config/sidebar-nav.ts`
  - [x] 7.2 Add Tags navigation item to `navigationItems` array with id, label, href (ROUTES.TAGS), and icon
  - [ ] 7.3 Verify Tags appears in sidebar and navigates correctly
  - [ ] 7.4 Test full flow: navigate to Tags, create tag, edit tag, delete tag
