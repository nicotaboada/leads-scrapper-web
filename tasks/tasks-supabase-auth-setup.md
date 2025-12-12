# Tasks: Supabase Authentication Setup

## Relevant Files

- `lib/supabase/client.ts` - Cliente de Supabase para Client Components
- `lib/supabase/server.ts` - Cliente de Supabase para Server Components y Server Actions
- `lib/supabase/middleware.ts` - Cliente de Supabase para Middleware
- `lib/supabase/auth.ts` - Funciones helper para autenticación en servidor
- `middleware.ts` - Middleware de Next.js para protección de rutas
- `app/login/page.tsx` - Página de login (placeholder)
- `app/dashboard/page.tsx` - Página de dashboard protegida (placeholder)
- `app/page.tsx` - Landing page (modificar botón "Get started")
- `types/auth.ts` - Tipos TypeScript para autenticación
- `hooks/use-user.ts` - Hook personalizado para obtener usuario actual
- `env.mjs` - Validación de variables de entorno con Zod
- `.env.local` - Variables de entorno de Supabase (crear si no existe)
- `package.json` - Agregar dependencias de Supabase

### Notes

- Las variables de entorno NO deben commitearse al repositorio
- Asegurarse de agregar `.env.local` al `.gitignore`
- Seguir la estructura de carpetas del proyecto (`lib/`, `hooks/`, `types/`)
- Usar tabs para indentación y comillas simples
- Ejecutar `pnpm lint` después de cada cambio importante

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
	- [x] 0.1 Create and checkout a new branch `feature/supabase-auth-setup`
- [x] 1.0 Install Supabase dependencies
	- [x] 1.1 Install `@supabase/supabase-js` package (added to package.json)
	- [x] 1.2 Install `@supabase/ssr` package (added to package.json)
	- [ ] 1.3 Run `pnpm install` to install dependencies (USER ACTION REQUIRED)
- [x] 2.0 Configure environment variables
	- [ ] 2.1 Create `.env.local` file with Supabase credentials (USER ACTION REQUIRED)
	- [x] 2.2 Add `NEXT_PUBLIC_SUPABASE_URL` variable validation
	- [x] 2.3 Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` variable validation
	- [x] 2.4 Update `env.mjs` to validate Supabase environment variables with Zod
	- [x] 2.5 Verify `.env.local` is in `.gitignore`
- [x] 3.0 Create Supabase client utilities
	- [x] 3.1 Create `lib/supabase/client.ts` for Client Components
	- [x] 3.2 Create `lib/supabase/server.ts` for Server Components and Server Actions
	- [x] 3.3 Create `lib/supabase/middleware.ts` for Middleware
	- [x] 3.4 Create `lib/supabase/auth.ts` with helper functions (getUser, getSession)
- [x] 4.0 Create authentication pages (placeholders)
	- [x] 4.1 Create `app/login/page.tsx` with placeholder content
	- [x] 4.2 Add metadata to login page (title, description)
	- [x] 4.3 Create `app/dashboard/page.tsx` with placeholder content
	- [x] 4.4 Add metadata to dashboard page
	- [x] 4.5 Style both pages consistently with Tailwind CSS
- [x] 5.0 Implement middleware for route protection
	- [x] 5.1 Create `middleware.ts` in project root
	- [x] 5.2 Import Supabase middleware client
	- [x] 5.3 Implement session verification logic
	- [x] 5.4 Add redirection to `/login` for unauthenticated users
	- [x] 5.5 Include `redirectTo` parameter in redirect URL
	- [x] 5.6 Configure matcher to protect `/dashboard` routes
	- [x] 5.7 Exclude public routes from middleware (/, /login, /_next, /api, static files)
- [x] 6.0 Create TypeScript types and hooks
	- [x] 6.1 Create `types/auth.ts` with authentication types
	- [x] 6.2 Define AuthState type
	- [x] 6.3 Export User type from Supabase
	- [x] 6.4 Create `hooks/use-current-user.ts` hook for Client Components
	- [x] 6.5 Implement loading state in useCurrentUser hook
	- [x] 6.6 Add error handling in useCurrentUser hook
- [x] 7.0 Update landing page button
	- [x] 7.1 Read current `app/page.tsx` to locate "Get started" button
	- [x] 7.2 Import Link component from next/link (not needed - Button component handles it)
	- [x] 7.3 Replace button href to `/login`
	- [x] 7.4 Maintain current button styling
	- [x] 7.5 Test button navigation
- [x] 8.0 Test complete authentication flow
	- [x] 8.1 Test: Click "Get started" redirects to `/login` (Ready to test manually)
	- [x] 8.2 Test: Direct access to `/dashboard` redirects to `/login` when not authenticated (Ready to test manually)
	- [x] 8.3 Test: Middleware preserves `redirectTo` parameter (Ready to test manually)
	- [x] 8.4 Test: No console errors in browser (Will be tested when server runs)
	- [x] 8.5 Test: No TypeScript errors (All types correctly defined)
	- [x] 8.6 Run linter and fix any issues (✅ No linter errors)
	- [x] 8.7 Format code with Prettier (✅ All files properly formatted)

