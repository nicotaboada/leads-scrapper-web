# PRD: Tags Module

## 1. Introduction/Overview

The Tags module introduces a new section in the application that allows users to create, manage, and organize tags. These tags can later be assigned to contacts to help categorize and organize them effectively.

A tag consists of:
- **Name**: Required identifier for the tag
- **Color**: Optional visual indicator (predefined palette)
- **Description**: Optional text describing the tag's purpose
- **Created Date**: Automatically set when the tag is created

This feature provides users with a flexible way to label and categorize their contacts for better organization and management.

---

## 2. Goals

1. **Enable tag management**: Allow users to create, edit, and delete tags
2. **Provide visual organization**: Support color-coded tags for quick visual identification
3. **Maintain simplicity**: Keep the interface clean and easy to use with pagination
4. **Prepare for contact tagging**: Build the foundation for assigning tags to contacts (future feature)

---

## 3. User Stories

### US-1: View Tags List
**As a** user  
**I want to** see a paginated list of all my tags  
**So that** I can manage and organize my tag collection

**Acceptance Criteria:**
- Tags are displayed in a table format
- Table shows columns: Name, Color, Description, Created Date, Actions
- Pagination controls are available at the bottom of the table
- Default page size follows application standards

### US-2: Create a New Tag
**As a** user  
**I want to** create a new tag with a name, optional color, and optional description  
**So that** I can use it to categorize my contacts

**Acceptance Criteria:**
- Clicking "Create New Tag" button opens a sheet/drawer
- Name field is required
- Color selection is optional (5 predefined colors: red, orange, green, blue, purple)
- Description field is optional
- "Clear" option available to deselect color
- Save button creates the tag and closes the sheet
- Cancel button closes the sheet without saving
- New tag appears in the table after creation

### US-3: Edit an Existing Tag
**As a** user  
**I want to** edit an existing tag's details  
**So that** I can update or correct tag information

**Acceptance Criteria:**
- Each row has a "more options" menu (three dots icon)
- Menu contains "Edit" option
- Clicking Edit opens the same sheet as create, pre-filled with tag data
- User can modify name, color, and description
- Save button updates the tag
- Cancel button discards changes

### US-4: Delete a Tag
**As a** user  
**I want to** delete a tag I no longer need  
**So that** I can keep my tag list clean and relevant

**Acceptance Criteria:**
- Each row has a "more options" menu (three dots icon)
- Menu contains "Delete" option
- Clicking Delete shows a confirmation dialog
- Confirming deletes the tag permanently
- Tag is removed from the table after deletion

---

## 4. Functional Requirements

### 4.1 Navigation
1. The "Tags" section must appear as a top-level item in the main sidebar navigation
2. The route for the Tags page must be `/tags`

### 4.2 Tags Table
3. The table must display the following columns:
   - **Name**: Tag name (text)
   - **Color**: Visual color indicator (colored circle/badge)
   - **Description**: Tag description (text, truncated if too long)
   - **Created**: Creation date (formatted date)
   - **Actions**: More options menu (three dots icon)

4. The table must support server-side pagination
5. Empty state must be shown when no tags exist

### 4.3 Create Tag
6. A "Create New Tag" button must be visible in the page header
7. Clicking the button must open a Sheet component (slide-in drawer)
8. The sheet must contain a form with:
   - **Name** field (required, text input)
   - **Color** field (optional, 5 color options + clear option)
   - **Description** field (optional, textarea)
9. Color options must be: red, orange, green, blue, purple
10. The sheet must have "Cancel" and "Save" buttons
11. Form validation must prevent saving without a name
12. On successful save, the sheet must close and the table must refresh

### 4.4 Edit Tag
13. Clicking the "Edit" option in the more menu must open the sheet
14. The sheet must be pre-populated with the selected tag's data
15. User must be able to modify all fields (name, color, description)
16. On successful update, the sheet must close and the table must refresh

### 4.5 Delete Tag
17. Clicking the "Delete" option in the more menu must show a confirmation dialog
18. The dialog must ask for confirmation before deleting
19. On confirmation, the tag must be deleted from the database
20. The table must refresh after deletion

### 4.6 Data Model
21. A tag must have the following properties:
    - `id`: Unique identifier (UUID/cuid)
    - `name`: String, required
    - `color`: String, optional (enum: RED, ORANGE, GREEN, BLUE, PURPLE)
    - `description`: String, optional
    - `createdAt`: DateTime, auto-generated
    - `updatedAt`: DateTime, auto-updated

---

## 5. Non-Goals (Out of Scope)

The following are explicitly **NOT** part of this feature:

1. **Assigning tags to contacts** - This will be implemented in a future iteration
2. **Contact count per tag** - Not showing how many contacts use each tag
3. **Search or filter functionality** - Just pagination for now
4. **Drag-and-drop reordering** - Tags will be ordered by creation date
5. **Tag hierarchy/nesting** - All tags are flat, no parent-child relationships
6. **Custom color picker** - Only predefined colors are available
7. **Bulk operations** - No multi-select or bulk delete
8. **Tag import/export** - No CSV or file-based operations

---

## 6. Design Considerations

### UI Components
- Use existing `Sheet` component for create/edit form
- Use existing `Table` component for tags list
- Use existing `DropdownMenu` component for more options menu
- Use existing `AlertDialog` component for delete confirmation
- Use existing pagination component

### Color Palette
| Color  | Hex Code  | Use Case |
|--------|-----------|----------|
| Red    | `#C0392B` | High priority/urgent |
| Orange | `#E67E22` | Warning/attention |
| Green  | `#27AE60` | Success/active |
| Blue   | `#2980B9` | Information/default |
| Purple | `#8E44AD` | Special/custom |

### Layout
- Follow the existing page layout pattern (header with title + action button, table below)
- Sheet should slide in from the right side
- Table should match the visual style of existing tables in the app

---

## 7. Technical Considerations

### Frontend (Next.js)
- Create new route at `app/(authenticated)/tags/page.tsx`
- Create module folder at `modules/tags/` with:
  - Components (table, sheet form, etc.)
  - GraphQL operations (queries, mutations)
  - Types
- Add "Tags" item to sidebar navigation config
- Use existing hooks for pagination (`use-backend-pagination`)
- Use React Hook Form for form management
- Use Zod for form validation

### Backend (NestJS + Prisma)
- Create new `Tag` model in Prisma schema
- Create new `tags` module with:
  - `tags.module.ts`
  - `tags.service.ts`
  - `tags.resolver.ts`
  - DTOs for create/update operations
  - Entity type for GraphQL
- Implement GraphQL queries and mutations:
  - `tags(pagination)` - List tags with pagination
  - `createTag(input)` - Create a new tag
  - `updateTag(id, input)` - Update an existing tag
  - `deleteTag(id)` - Delete a tag

### Database
- Add `Tag` table to the database schema
- Create migration for the new table

---

## 8. Success Metrics

1. **Feature Completion**: All CRUD operations work correctly
2. **Performance**: Table loads in under 500ms
3. **Usability**: Users can create a tag in under 30 seconds
4. **Reliability**: No errors when creating, editing, or deleting tags

---

## 9. Open Questions

1. Should there be a maximum length for tag names? (Suggested: 50 characters)
2. Should there be a maximum length for descriptions? (Suggested: 200 characters)
3. Should tag names be unique? (Suggested: Yes, to avoid confusion)
4. What should happen to contacts when a tag is deleted? (Future consideration when contact tagging is implemented)

---

## 10. Implementation Order

Suggested order for implementation:

1. **Backend**: Create Prisma model and migration
2. **Backend**: Create NestJS module (service, resolver, DTOs)
3. **Frontend**: Add route and basic page structure
4. **Frontend**: Implement tags table with pagination
5. **Frontend**: Add sidebar navigation item
6. **Frontend**: Implement create tag sheet
7. **Frontend**: Implement edit tag functionality
8. **Frontend**: Implement delete tag with confirmation
9. **Testing**: Write unit and integration tests

