# PRD: Login Form Implementation

## Introduction/Overview

Implementar un formulario de login funcional en la página `/login` usando componentes de Shadcn UI y autenticación con Supabase. Este formulario permitirá a los usuarios autenticarse con email y password, reemplazando el placeholder actual y completando el flujo de autenticación básico de la aplicación.

**Problema que resuelve:** Actualmente la página de login solo muestra un placeholder, los usuarios no pueden autenticarse en la aplicación para acceder a rutas protegidas como `/dashboard`.

**Objetivo principal:** Crear un formulario de login funcional, visualmente atractivo y con validación básica que permita a los usuarios autenticarse usando Supabase Auth.

## Goals

1. Implementar formulario de login con email y password en `/login`
2. Integrar componentes de Shadcn UI para una UI consistente y moderna
3. Conectar el formulario con Supabase Auth para autenticación real
4. Redirigir al usuario a `/dashboard` después de un login exitoso
5. Mostrar errores de autenticación usando toast notifications de Shadcn
6. Mantener estados de loading durante el proceso de autenticación
7. Implementar validación básica de campos (email válido, password requerido)

## User Stories

### Como usuario no autenticado
- Quiero ver un formulario de login moderno y claro cuando visito `/login`
- Quiero ingresar mi email y password para autenticarme
- Quiero ver un indicador de loading mientras se procesa mi autenticación
- Quiero recibir feedback claro si mis credenciales son incorrectas
- Quiero ser redirigido automáticamente a `/dashboard` cuando el login sea exitoso
- Quiero que el formulario valide que mi email tenga formato correcto
- Quiero que el formulario me indique si olvido llenar algún campo

### Como desarrollador
- Necesito usar Server Actions para manejar la lógica de autenticación de forma segura
- Necesito componentes reutilizables de Shadcn UI para mantener consistencia
- Necesito que el código sea fácil de mantener y extender
- Necesito que los errores de Supabase se manejen correctamente

## Functional Requirements

### 1. Componentes de Shadcn UI

**FR-1.1:** Instalar componentes necesarios de Shadcn UI
- Button component
- Input component
- Label component
- Form component (con React Hook Form)
- Toast component (para notificaciones)
- Card component (para el contenedor del formulario)

**FR-1.2:** Configurar Toaster provider
- Agregar `<Toaster />` al layout principal de la aplicación
- Importar desde `components/ui/sonner` (Shadcn usa Sonner para toasts)

### 2. Formulario de Login

**FR-2.1:** Estructura del formulario
- Campo de email (type="email", required)
- Campo de password (type="password", required)
- Botón de submit con texto "Sign in"
- Loading state en el botón durante autenticación
- Diseño centrado y responsive

**FR-2.2:** Validación básica
- Email: Validar formato de email válido
- Password: Campo requerido, mínimo 6 caracteres
- Mostrar mensajes de error inline si los campos están vacíos
- Deshabilitar botón de submit mientras hay validación pendiente

**FR-2.3:** Estilo y UX
- Usar Card component como contenedor principal
- Título "Login" o "Sign in to your account"
- Campos con labels claros
- Diseño responsive (mobile-first)
- Mantener el link "Back to home" existente
- Dark mode support (ya implementado en Tailwind)

### 3. Server Action para Autenticación

**FR-3.1:** Crear Server Action `loginAction`
- Ubicación: `app/login/actions.ts`
- Recibe FormData con email y password
- Usa el cliente de Supabase server (`lib/supabase/server.ts`)
- Ejecuta `supabase.auth.signInWithPassword()`

**FR-3.2:** Manejo de respuesta
- Si login exitoso: `redirect('/dashboard')`
- Si error: Retornar objeto con error message
- Tipos de errores a manejar:
  - Invalid credentials (email/password incorrectos)
  - Email not confirmed (si usas confirmación de email)
  - Network errors
  - Otros errores de Supabase

**FR-3.3:** Validación server-side
- Verificar que email y password no estén vacíos
- Validar formato de email en el servidor también
- Retornar errores descriptivos

### 4. Client Component

**FR-4.1:** Modificar `/app/login/page.tsx`
- Convertir a Client Component (`'use client'`)
- Importar y usar componentes de Shadcn
- Manejar estado local (loading, errors)
- Llamar al Server Action cuando se envíe el formulario

**FR-4.2:** Estados del componente
- `isPending` o `isLoading`: Boolean para loading state
- Usar `useFormStatus` de React para detectar estado del formulario
- Deshabilitar campos durante el proceso de login

**FR-4.3:** Manejo de errores
- Mostrar toast notification cuando hay error
- Toast debe desaparecer automáticamente (4-5 segundos)
- Toast tipo "error" (rojo) para errores
- Toast tipo "success" (verde) si el login es exitoso

### 5. Tipos TypeScript

**FR-5.1:** Definir tipos para la acción
- Type para el retorno del Server Action
- Type para el estado de error
- Exportar desde `types/auth.ts` o en el mismo archivo de actions

### 6. Accesibilidad

**FR-6.1:** Cumplir con estándares de accesibilidad
- Labels asociados correctamente con inputs (htmlFor)
- Aria labels apropiados
- Mensajes de error accesibles
- Focus management adecuado
- Navegación por teclado funcional

## Non-Goals (Out of Scope)

1. **Funcionalidad de registro (Sign up)** - Se implementará en un PRD separado
2. **Recuperación de contraseña** - Se agregará más adelante
3. **"Recordarme" (Remember me)** - Usar comportamiento por defecto de Supabase
4. **OAuth providers (Google, GitHub, etc.)** - No incluido en esta fase
5. **Two-factor authentication (2FA)** - Fuera del alcance inicial
6. **Captcha o rate limiting** - Confiar en las protecciones de Supabase
7. **Link a página de registro** - Agregar en próximo PRD
8. **Confirmación de email** - Usar configuración por defecto de Supabase
9. **Validación compleja de password** - Solo validación básica (mínimo 6 caracteres)
10. **Animaciones elaboradas** - Mantener simple y funcional

## Design Considerations

### UI/UX

**Layout:**
- Card centrado en la pantalla con max-width de 400-450px
- Padding generoso para breathing room
- Shadow sutil para dar profundidad
- Background gradient (ya existente en el placeholder actual)

**Componentes:**
```
Card
├── CardHeader
│   ├── CardTitle: "Sign in to your account"
│   └── CardDescription: "Enter your credentials to access your dashboard"
├── CardContent
│   └── Form
│       ├── FormField (Email)
│       │   ├── Label
│       │   ├── Input
│       │   └── FormMessage (error)
│       ├── FormField (Password)
│       │   ├── Label
│       │   ├── Input
│       │   └── FormMessage (error)
│       └── Button (Submit)
└── CardFooter (opcional para "Back to home")
```

**Estados visuales:**
- Normal: Campos con border gris
- Focus: Border azul/primario
- Error: Border rojo + mensaje de error
- Loading: Button con spinner + disabled inputs
- Success: Toast verde (breve, antes de redirect)

### Responsive Design
- Mobile (< 640px): Full width con padding lateral
- Tablet/Desktop (> 640px): Card centrado con max-width

### Dark Mode
- Usar variables CSS de Shadcn
- Card background adapta al tema
- Inputs con borders apropiados para dark mode
- Text colors adecuados para ambos temas

## Technical Considerations

### Stack Tecnológico
- **Next.js 14+**: App Router, Server Actions
- **Supabase**: Auth con email/password
- **Shadcn UI**: Componentes pre-construidos
- **React Hook Form**: Manejo de formularios (ya incluido en Shadcn Form)
- **Zod**: Validación de esquemas (básica por ahora)
- **TypeScript**: Tipado estricto
- **Tailwind CSS**: Estilos

### Arquitectura del Login Flow

```
Client Component (login/page.tsx)
    ↓ Usuario llena form
    ↓ onClick Submit
    ↓
Server Action (login/actions.ts)
    ↓ Recibe FormData
    ↓ Valida campos
    ↓ Llama a Supabase
    ↓
Supabase Auth
    ↓ Verifica credenciales
    ↓ Crea sesión + cookies
    ↓
Response
    ├─ Success → redirect('/dashboard')
    └─ Error → return { error: 'message' }
          ↓
     Client muestra Toast error
```

### Estructura de Archivos

```
app/login/
├── page.tsx           ← Client Component con formulario
├── actions.ts         ← Server Action para login
└── login-form.tsx     ← (Opcional) Componente separado del formulario

components/ui/         ← Componentes de Shadcn (se instalarán)
├── button.tsx         ← Ya existe
├── card.tsx           ← Nuevo
├── form.tsx           ← Nuevo
├── input.tsx          ← Nuevo
├── label.tsx          ← Nuevo
└── sonner.tsx         ← Nuevo (Toast)

app/layout.tsx         ← Agregar <Toaster />
```

### Instalación de Shadcn Components

Comando para instalar todos los componentes necesarios:
```bash
npx shadcn@latest add card form input label button sonner
```

Si `button.tsx` ya existe, puede requerirse ajuste o merge.

### Dependencias Adicionales

Las siguientes dependencias se instalan automáticamente con Shadcn:
- `react-hook-form` - Manejo de formularios
- `@hookform/resolvers` - Integración con Zod
- `zod` - Ya instalado en el proyecto
- `sonner` - Toast notifications

### Server Action Implementation

**Ejemplo de estructura:**
```typescript
// app/login/actions.ts
'use server'

import { createClient } from 'lib/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function loginAction(formData: FormData) {
  // Validación
  // Autenticación con Supabase
  // Manejo de errores
  // Redirect o return error
}
```

### Manejo de Errores

**Tipos de errores esperados de Supabase:**
- `Invalid login credentials` - Email o password incorrectos
- `Email not confirmed` - Usuario no ha confirmado email
- `User not found` - Email no existe en la BD
- Network errors - Problemas de conexión

**Mapeo de errores user-friendly:**
```typescript
const errorMessages = {
  'Invalid login credentials': 'Email or password is incorrect',
  'Email not confirmed': 'Please confirm your email before logging in',
  'User not found': 'No account found with this email',
}
```

### Seguridad

**Consideraciones implementadas:**
- ✅ Server Actions ejecutan en el servidor (no exponen lógica)
- ✅ Supabase maneja rate limiting automáticamente
- ✅ Cookies http-only para sesiones (manejadas por Supabase)
- ✅ Validación tanto client como server-side
- ✅ Passwords nunca se muestran en logs o consola

**Consideraciones futuras:**
- CAPTCHA para prevenir bots (próximo PRD)
- Rate limiting custom en middleware
- Logs de intentos de login fallidos

## Success Metrics

### Métricas Funcionales
1. **Formulario visible y funcional** - Usuario puede ver e interactuar con el form
2. **Login exitoso** - Usuario puede autenticarse con credenciales válidas
3. **Redirección correcta** - Usuario llega a `/dashboard` después del login
4. **Errores manejados** - Credenciales incorrectas muestran mensaje de error
5. **Loading states** - Botón muestra spinner durante autenticación
6. **Validación funciona** - Emails inválidos son detectados
7. **Toast aparece** - Notificaciones se muestran en caso de error

### Métricas Técnicas
1. **Zero errores TypeScript** - Código compila sin errores
2. **Zero errores de linter** - Pasa ESLint sin warnings
3. **Componentes de Shadcn integrados** - Sin errores de importación
4. **Server Action funciona** - Autenticación se ejecuta correctamente
5. **Responsive design** - Funciona en mobile y desktop
6. **Dark mode compatible** - Se ve bien en ambos temas

### Criterios de Aceptación
- ✅ Puedo visitar `/login` y ver un formulario de login
- ✅ Puedo ingresar email y password en los campos
- ✅ El botón de submit muestra loading mientras procesa
- ✅ Con credenciales válidas, soy redirigido a `/dashboard`
- ✅ Con credenciales inválidas, veo un toast de error
- ✅ El formulario valida que el email tenga formato correcto
- ✅ El formulario requiere password de al menos 6 caracteres
- ✅ El formulario es responsive y se ve bien en mobile
- ✅ El formulario funciona en dark mode
- ✅ No hay errores en consola del navegador
- ✅ El código pasa linter y TypeScript sin errores

## Open Questions

1. **Tiempo de expiración de sesión**: ¿Usar el default de Supabase (1 hora) o configurar custom?
2. **Mensaje de bienvenida**: ¿Mostrar toast de "Welcome back" después del login exitoso o solo redirigir?
3. **Persistencia**: ¿Queremos que la sesión persista después de cerrar el navegador? (Por defecto sí con Supabase)
4. **Email case-sensitivity**: ¿Normalizar emails a lowercase antes de enviar a Supabase?
5. **Retry después de error**: ¿Cuántos intentos fallidos permitir antes de mostrar mensaje adicional?
6. **Logo o branding**: ¿Agregar logo de la app en el formulario de login?

## Implementation Notes

### Orden Sugerido de Implementación

1. **Instalar componentes de Shadcn UI**
   ```bash
   npx shadcn@latest add card form input label sonner
   ```

2. **Agregar Toaster al layout**
   - Modificar `app/layout.tsx`
   - Importar y agregar `<Toaster />` al body

3. **Crear Server Action**
   - Crear `app/login/actions.ts`
   - Implementar `loginAction` con Supabase
   - Agregar validación con Zod

4. **Modificar página de login**
   - Convertir a Client Component
   - Importar componentes de Shadcn
   - Crear estructura del formulario

5. **Implementar lógica del formulario**
   - Estado de loading
   - Llamada al Server Action
   - Manejo de errores con toast

6. **Styling y responsive**
   - Ajustar spacing y tamaños
   - Probar en diferentes pantallas
   - Verificar dark mode

7. **Testing**
   - Probar con credenciales válidas
   - Probar con credenciales inválidas
   - Probar validación de campos
   - Probar estados de loading

### Referencias Útiles
- [Shadcn UI Form](https://ui.shadcn.com/docs/components/form)
- [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [React Hook Form](https://react-hook-form.com/get-started)

## Related PRDs
- **PRD-Supabase-Auth-Setup** (Completed): Configuración base de autenticación
- **PRD-User-Registration** (Future): Funcionalidad de registro de usuarios
- **PRD-Password-Recovery** (Future): Recuperación de contraseña
- **PRD-Dashboard-Content** (Future): Contenido real del dashboard


