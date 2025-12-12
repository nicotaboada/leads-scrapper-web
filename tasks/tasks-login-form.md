# Tasks: Login Form Implementation

## Relevant Files

- `components/ui/card.tsx` - Card component de Shadcn (se instalará)
- `components/ui/form.tsx` - Form component de Shadcn con React Hook Form (se instalará)
- `components/ui/input.tsx` - Input component de Shadcn (se instalará)
- `components/ui/label.tsx` - Label component de Shadcn (se instalará)
- `components/ui/sonner.tsx` - Toast component (Sonner) de Shadcn (se instalará)
- `app/layout.tsx` - Layout principal (agregar Toaster provider)
- `app/login/actions.ts` - Server Action para autenticación (nuevo)
- `app/login/page.tsx` - Página de login (modificar placeholder existente)
- `types/auth.ts` - Tipos TypeScript (puede necesitar extensión)
- `package.json` - Dependencias adicionales de Shadcn

### Notes

- Los componentes de Shadcn se instalan con el CLI y crean archivos automáticamente
- React Hook Form y Zod ya están en el proyecto
- El componente Button ya existe, puede requerir ajuste si Shadcn lo sobrescribe
- Server Actions requieren 'use server' directive
- Client Components requieren 'use client' directive

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
	- [x] 0.1 Create and checkout a new branch `feature/login-form`
- [x] 1.0 Install and configure Shadcn UI components
	- [x] 1.1 Install Shadcn Card component (`npx shadcn@latest add card`)
	- [x] 1.2 Install Shadcn Form component (`npx shadcn@latest add form`)
	- [x] 1.3 Install Shadcn Input component (`npx shadcn@latest add input`)
	- [x] 1.4 Install Shadcn Label component (`npx shadcn@latest add label`)
	- [x] 1.5 Install Shadcn Sonner (Toast) component (`npx shadcn@latest add sonner`)
	- [x] 1.6 Verify all components installed correctly in `components/ui/`
	- [x] 1.7 Add Toaster provider and ThemeProvider to `app/layout.tsx`
	- [x] 1.8 Fix import paths to use 'lib/utils/merge' instead of '@/lib/utils'
	- [x] 1.9 Format all components with Prettier (tabs, single quotes)
	- [x] 1.10 Verify no linter errors
- [x] 2.0 Create Server Action for authentication
	- [x] 2.1 Create file `app/login/actions.ts`
	- [x] 2.2 Add 'use server' directive at the top
	- [x] 2.3 Import Supabase server client from `lib/supabase/server`
	- [x] 2.4 Import necessary Next.js functions (redirect)
	- [x] 2.5 Define Zod schema for login validation (email + password)
	- [x] 2.6 Create `loginAction` function that receives FormData
	- [x] 2.7 Extract email and password from FormData
	- [x] 2.8 Validate data with Zod schema
	- [x] 2.9 Call Supabase `signInWithPassword` method
	- [x] 2.10 Handle success case with redirect to `/dashboard`
	- [x] 2.11 Handle error cases and return error messages
	- [x] 2.12 Add TypeScript types for return value
- [x] 3.0 Implement login form UI
	- [x] 3.1 Create LoginForm Client Component in `modules/auth/components/login-form.tsx`
	- [x] 3.2 Import Shadcn components (Card, Input, Label)
	- [x] 3.3 Create Card structure (CardHeader, CardContent, CardDescription)
	- [x] 3.4 Add CardTitle and CardDescription
	- [x] 3.5 Create form element with email field
	- [x] 3.6 Create form element with password field
	- [x] 3.7 Add submit button with proper styling
	- [x] 3.8 Add loading state during submission
	- [x] 3.9 Update `app/login/page.tsx` to import and use LoginForm
	- [x] 3.10 Maintain "Back to home" link
	- [x] 3.11 Ensure responsive design (mobile-first)
- [x] 4.0 Integrate form with authentication logic
	- [x] 4.1 Import loginAction from `modules/auth/actions`
	- [x] 4.2 Add state for loading (`isLoading`)
	- [x] 4.3 Create onSubmit handler function
	- [x] 4.4 Call loginAction with form data in onSubmit
	- [x] 4.5 Disable form fields during submission
	- [x] 4.6 Show loading text on submit button during authentication
	- [x] 4.7 Handle successful login (redirect happens automatically)
- [x] 5.0 Add error handling and user feedback
	- [x] 5.1 Import toast from `sonner`
	- [x] 5.2 Handle error response from loginAction
	- [x] 5.3 Show error toast when authentication fails
	- [x] 5.4 Display user-friendly error messages
	- [x] 5.5 Map Supabase error codes to readable messages in Server Action
	- [x] 5.6 Ensure toast auto-dismisses (default behavior)
	- [x] 5.7 Add try-catch for unexpected errors
	- [x] 5.8 Reset loading state on errors
- [ ] 6.0 Test and validate complete login flow
	- [ ] 6.1 Test form renders correctly on `/login`
	- [ ] 6.2 Test email validation (format check)
	- [ ] 6.3 Test password validation (minimum 6 characters)
	- [ ] 6.4 Test submit button disabled when form invalid
	- [ ] 6.5 Test loading state during authentication
	- [ ] 6.6 Test successful login with valid credentials
	- [ ] 6.7 Test redirect to `/dashboard` after login
	- [ ] 6.8 Test error toast with invalid credentials
	- [ ] 6.9 Test responsive design on mobile and desktop
	- [ ] 6.10 Test dark mode appearance
	- [ ] 6.11 Run linter and fix any issues (`pnpm lint`)
	- [ ] 6.12 Check TypeScript errors (`pnpm tsc --noEmit`)
	- [ ] 6.13 Format code with Prettier (`pnpm prettier:fix`)

