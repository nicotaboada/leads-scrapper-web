# Tasks: Create Contact Feature

## Relevant Files

### Backend
- `leads-scrapper-backend/src/contacts/dto/create-company.input.ts` - DTO for createCompany mutation
- `leads-scrapper-backend/src/contacts/dto/create-person-contact.input.ts` - DTO for createPersonContact mutation
- `leads-scrapper-backend/src/contacts/contacts.service.ts` - Add createCompany and createPersonContact methods
- `leads-scrapper-backend/src/contacts/contacts.resolver.ts` - Add createCompany and createPersonContact mutations

### Frontend Types and GraphQL
- `modules/contacts/types/create-contact.ts` - Zod schema and TypeScript types for form
- `modules/contacts/graphql/mutations.ts` - GraphQL mutations for createCompany and createPersonContact

### Frontend Components
- `modules/contacts/components/company-search-select.tsx` - SearchSelect component for companies
- `modules/contacts/components/create-contact-sheet.tsx` - Main Sheet component with form

### Frontend Hooks
- `modules/contacts/hooks/use-create-contact.ts` - Hook for createPersonContact mutation
- `modules/contacts/hooks/use-create-company.ts` - Hook for createCompany mutation
- `modules/contacts/hooks/use-search-companies.ts` - Hook for searching companies

### Page Integration
- `app/(authenticated)/contacts/page.tsx` - Integrate CreateContactSheet

### Notes

- Backend mutations must be created first before frontend can call them
- Use existing patterns from `modules/students/` and `modules/runs/` for consistency
- The company search uses the existing `contacts` query with `type: COMPANY` filter

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Create and checkout a new branch: `git checkout -b feature/create-contact`

- [x] 1.0 Create backend mutations (createCompany, createPersonContact)
  - [x] 1.1 Create `src/contacts/dto/create-company.input.ts` with fields: companyName (required), companyEmail (optional), companyPhone (optional)
  - [x] 1.2 Add class-validator decorators (@IsString, @IsOptional, @IsEmail) to CreateCompanyInput
  - [x] 1.3 Create `src/contacts/dto/create-person-contact.input.ts` with fields: firstName, lastName (required), email, celular, linkedinUrl, jobTitle, companyId (all optional)
  - [x] 1.4 Add class-validator decorators to CreatePersonContactInput
  - [x] 1.5 Add `createCompany(input: CreateCompanyInput)` method to ContactsService
  - [x] 1.6 Implement createCompany: create Contact with type=COMPANY, create CompanyEmail if provided
  - [x] 1.7 Add `createPersonContact(input: CreatePersonContactInput)` method to ContactsService
  - [x] 1.8 Implement createPersonContact: create Contact with type=PERSON, link to company if companyId provided
  - [x] 1.9 Add `@Mutation(() => CompanyContact) createCompany()` to ContactsResolver
  - [x] 1.10 Add `@Mutation(() => PersonContact) createPersonContact()` to ContactsResolver
  - [ ] 1.11 Test mutations in GraphQL Playground

- [x] 2.0 Create frontend types, schemas, and GraphQL mutations
  - [x] 2.1 Create `modules/contacts/types/create-contact.ts`
  - [x] 2.2 Define `CreateContactFormInput` interface with all form fields
  - [x] 2.3 Define `CreateCompanyInput` interface for mutation
  - [x] 2.4 Define `CreatePersonContactInput` interface for mutation
  - [x] 2.5 Create Zod schema `createContactSchema` with validation rules
  - [x] 2.6 Create `modules/contacts/graphql/mutations.ts`
  - [x] 2.7 Add `CREATE_COMPANY` mutation
  - [x] 2.8 Add `CREATE_PERSON_CONTACT` mutation
  - [x] 2.9 Update `modules/contacts/types/index.ts` to export new types

- [x] 3.0 Create company search select component
  - [x] 3.1 Create `modules/contacts/hooks/use-search-companies.ts`
  - [x] 3.2 Implement hook using GET_CONTACTS query with type=COMPANY and search filter
  - [x] 3.3 Add debounce (300ms) to search query
  - [x] 3.4 Create `modules/contacts/components/company-search-select.tsx`
  - [x] 3.5 Implement search input with Command/Combobox pattern
  - [x] 3.6 Display filtered company results as options
  - [x] 3.7 Add "Crear nueva empresa: [searchText]" option when no exact match
  - [x] 3.8 Handle selection: existing company returns companyId, new company triggers isCreatingNew state
  - [x] 3.9 Show selected company with clear (X) button
  - [x] 3.10 When isCreatingNew, render additional fields: Company Email, Company Phone
  - [x] 3.11 Add loading state while searching
  - [x] 3.12 Add empty state when no results and no search text

- [x] 4.0 Create contact sheet component with form
  - [x] 4.1 Create `modules/contacts/hooks/use-create-company.ts` with useMutation
  - [x] 4.2 Create `modules/contacts/hooks/use-create-contact.ts` with useMutation
  - [x] 4.3 Create `modules/contacts/components/create-contact-sheet.tsx`
  - [x] 4.4 Set up Sheet with header "Crear Contacto"
  - [x] 4.5 Set up React Hook Form with Zod resolver
  - [x] 4.6 Add Nombre field (required)
  - [x] 4.7 Add Apellido field (required)
  - [x] 4.8 Add Email field (optional, validate format)
  - [x] 4.9 Add Teléfono field (optional)
  - [x] 4.10 Integrate CompanySearchSelect component
  - [x] 4.11 Add LinkedIn Profile field (optional, validate URL format)
  - [x] 4.12 Add Cargo/Job Title field (optional)
  - [x] 4.13 Add footer with Cancel and Guardar buttons
  - [x] 4.14 Implement handleSubmit: if creating new company, call createCompany first
  - [x] 4.15 On createCompany success, call createPersonContact with companyId
  - [x] 4.16 On createCompany error, show toast error and stop
  - [x] 4.17 On createPersonContact success, show toast, close sheet, call onContactCreated
  - [x] 4.18 On createPersonContact error, show toast error
  - [x] 4.19 Disable form fields and button while submitting
  - [x] 4.20 Reset form when sheet closes

- [x] 5.0 Integrate sheet in contacts page
  - [x] 5.1 Import CreateContactSheet in `app/(authenticated)/contacts/page.tsx`
  - [x] 5.2 Add state for sheet open/close: `useState(false)`
  - [x] 5.3 Update "Crear Contacto" button to open the sheet
  - [x] 5.4 Add CreateContactSheet component with open, onOpenChange, onContactCreated props
  - [x] 5.5 Implement onContactCreated callback to refetch contacts list

- [ ] 6.0 Test complete flow
  - [ ] 6.1 Test creating contact with only required fields (nombre, apellido)
  - [ ] 6.2 Test creating contact with all fields filled
  - [ ] 6.3 Test selecting existing company from search
  - [ ] 6.4 Test creating new company inline (with and without email/phone)
  - [ ] 6.5 Test validation errors display correctly
  - [ ] 6.6 Test error handling when mutation fails
  - [ ] 6.7 Verify contact appears in list after creation
  - [ ] 6.8 Verify new company appears in search after creation
  - [ ] 6.9 Test cancel button resets form
  - [ ] 6.10 Test sheet close resets form

