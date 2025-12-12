# PRD: Supabase Authentication Setup

## Introduction/Overview

Implementar la integración de autenticación con Supabase en la aplicación Next.js Enterprise, estableciendo la infraestructura base para el sistema de autenticación. Este feature conectará el botón "Get started" de la landing page con un flujo de login usando email y password, y protegerá rutas específicas requiriendo autenticación.

**Problema que resuelve:** Actualmente la aplicación no tiene sistema de autenticación, lo que impide proteger contenido y personalizar la experiencia del usuario.

**Objetivo principal:** Establecer la infraestructura de autenticación con Supabase y crear el flujo básico de redirección desde la landing hacia el login.

## Goals

1. Integrar Supabase Auth en la aplicación Next.js
2. Configurar el cliente de Supabase con las credenciales correctas
3. Crear la estructura de rutas para autenticación (/login, /dashboard)
4. Implementar middleware para protección de rutas
5. Conectar el botón "Get started" de la landing con el flujo de autenticación
6. Establecer el flujo de redirección: Landing → Login → Dashboard

## User Stories

### Como usuario no autenticado
- Quiero hacer click en "Get started" en la landing page para ser redirigido a la página de login
- Quiero que se me redirija automáticamente al login si intento acceder a /dashboard sin estar autenticado
- Quiero poder navegar libremente por la landing page sin necesidad de autenticación

### Como desarrollador
- Necesito tener un cliente de Supabase configurado y listo para usar en toda la aplicación
- Necesito poder verificar fácilmente el estado de autenticación del usuario
- Necesito que las rutas protegidas rechacen automáticamente accesos no autorizados

## Functional Requirements

### 1. Configuración de Supabase

**FR-1.1:** Instalar las dependencias necesarias de Supabase
- `@supabase/supabase-js`
- `@supabase/auth-helpers-nextjs` (para integración con Next.js 14+)
- `@supabase/ssr` (para Server Components)

**FR-1.2:** Crear archivo de configuración de variables de entorno
- Agregar `NEXT_PUBLIC_SUPABASE_URL` en `.env.local`
- Agregar `NEXT_PUBLIC_SUPABASE_ANON_KEY` en `.env.local`
- Actualizar `env.mjs` para validar estas variables usando Zod

**FR-1.3:** Crear cliente de Supabase
- Ubicación: `lib/supabase/client.ts` (para Client Components)
- Ubicación: `lib/supabase/server.ts` (para Server Components y Server Actions)
- Ubicación: `lib/supabase/middleware.ts` (para Middleware)

### 2. Estructura de Rutas

**FR-2.1:** Crear la página de login
- Ruta: `app/login/page.tsx`
- Debe ser una página pública (no requiere autenticación)
- De momento solo debe mostrar un placeholder indicando "Login Page - To be implemented"
- Incluir metadata apropiado (título, descripción)

**FR-2.2:** Crear la página de dashboard
- Ruta: `app/dashboard/page.tsx`
- Debe ser una página protegida (requiere autenticación)
- De momento solo debe mostrar un placeholder indicando "Dashboard - Protected Route"
- Incluir metadata apropiado

**FR-2.3:** Modificar el botón "Get started" en la landing
- Cambiar el comportamiento del botón para redirigir a `/login`
- Usar el componente `Link` de Next.js para navegación client-side
- Mantener el mismo estilo visual del botón actual

### 3. Protección de Rutas

**FR-3.1:** Crear middleware de autenticación
- Archivo: `middleware.ts` en la raíz del proyecto
- Debe interceptar requests a rutas protegidas
- Verificar si el usuario tiene una sesión activa de Supabase
- Si no está autenticado, redirigir a `/login`
- Incluir el parámetro `redirectTo` en la URL para retornar después del login

**FR-3.2:** Configurar matcher del middleware
- Proteger la ruta `/dashboard` y todas sus subrutas (`/dashboard/:path*`)
- Excluir rutas públicas: `/`, `/login`, archivos estáticos, `/_next`, `/api`

**FR-3.3:** Implementar lógica de redirección después del login
- Si existe el parámetro `redirectTo` en la URL, redirigir ahí después del login exitoso
- Si no existe, redirigir por defecto a `/dashboard`

### 4. Utilidades y Helpers

**FR-4.1:** Crear hooks personalizados
- `hooks/use-user.ts`: Hook para obtener el usuario actual en Client Components
- Debe retornar el objeto user de Supabase o null
- Debe incluir un estado de loading

**FR-4.2:** Crear funciones helper de autenticación
- `lib/supabase/auth.ts`: Funciones para verificar autenticación en Server Components
- Función `getUser()`: obtener usuario actual desde el servidor
- Función `getSession()`: obtener sesión actual desde el servidor

### 5. Tipos TypeScript

**FR-5.1:** Definir tipos para el usuario autenticado
- Ubicación: `types/auth.ts`
- Extender el tipo `User` de Supabase si es necesario
- Definir tipo para el estado de autenticación

## Non-Goals (Out of Scope)

1. **Implementación del formulario de login** - Se creará en un PRD separado
2. **Funcionalidad de registro (sign up)** - Se implementará más adelante
3. **Recuperación de contraseña** - Fuera del alcance inicial
4. **OAuth providers (Google, GitHub, etc.)** - No se incluye en esta fase
5. **Personalización del email de confirmación** - Se usará el template por defecto de Supabase
6. **Gestión de roles y permisos** - Se implementará posteriormente
7. **Página de perfil de usuario** - No incluida en este feature
8. **Persistencia de sesión en local storage** - Se usará el comportamiento por defecto de Supabase
9. **Refresh token automático** - Se usará el comportamiento por defecto de Supabase

## Design Considerations

### UI/UX
- El botón "Get started" debe mantener su estilo actual (componente `Button` existente)
- La transición a `/login` debe ser suave (usar `Link` de Next.js)
- Las páginas placeholder deben tener un estilo consistente con el resto de la app
- Usar los componentes UI existentes (`components/ui/`)

### Layout
- Landing page: Mantener el layout actual
- Login page: Layout simple, centrado, sin navegación compleja
- Dashboard page: Puede incluir navegación lateral (básica por ahora)

### Responsividad
- Todas las páginas deben ser responsive
- Seguir los breakpoints de Tailwind CSS establecidos en el proyecto

## Technical Considerations

### Stack Tecnológico
- **Next.js 14+**: App Router, Server Components, Server Actions
- **Supabase**: Auth, Database (PostgreSQL)
- **TypeScript**: Tipado estricto
- **Tailwind CSS**: Para estilos

### Arquitectura
```
app/
├── login/
│   └── page.tsx
├── dashboard/
│   └── page.tsx
└── page.tsx (landing - modificar botón)

lib/
└── supabase/
    ├── client.ts
    ├── server.ts
    ├── middleware.ts
    └── auth.ts

middleware.ts

types/
└── auth.ts

hooks/
└── use-user.ts
```

### Dependencias
- `@supabase/supabase-js`: ^2.x
- `@supabase/auth-helpers-nextjs`: ^0.10.x
- `@supabase/ssr`: ^0.5.x

### Variables de Entorno Requeridas
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
```

### Consideraciones de Seguridad
- Nunca exponer `SUPABASE_SERVICE_ROLE_KEY` en el cliente
- Usar Row Level Security (RLS) en Supabase para proteger datos
- Validar todas las entradas con Zod antes de usar
- Implementar rate limiting en Supabase para prevenir ataques de fuerza bruta

### Integración con el Proyecto Actual
- Respetar la estructura de carpetas del proyecto (`modules/`, `lib/`, etc.)
- Usar los componentes UI existentes cuando sea posible
- Seguir las convenciones de código establecidas (tabs, single quotes, etc.)
- Integrar con el sistema de linting y formateo (ESLint + Prettier)

## Success Metrics

### Métricas Técnicas
1. **Configuración completa**: Cliente de Supabase configurado y funcionando
2. **Middleware funcional**: Rutas protegidas rechazando acceso no autenticado
3. **Redirección correcta**: Flujo completo de Landing → Login → Dashboard funcionando
4. **Zero errores de TypeScript**: Todos los tipos correctamente definidos
5. **Tests pasando**: Linter y formateo sin errores

### Métricas Funcionales
1. **Click en "Get started"** → Usuario redirigido a `/login`
2. **Acceso directo a `/dashboard` sin auth** → Usuario redirigido a `/login`
3. **Parámetro redirectTo preservado** → Después del login, usuario regresa a la página solicitada
4. **Session persistence** → Sesión se mantiene después de reload

### Criterios de Aceptación
- ✅ Puedo hacer click en "Get started" y llegar a `/login`
- ✅ No puedo acceder a `/dashboard` sin estar autenticado
- ✅ Soy redirigido automáticamente al login si intento acceder a dashboard
- ✅ Las páginas placeholder se muestran correctamente
- ✅ No hay errores en consola del navegador
- ✅ No hay errores de TypeScript
- ✅ El código pasa el linter sin errores

## Open Questions

1. **Supabase Project**: ¿Ya tienes un proyecto de Supabase creado o hay que crear uno nuevo?
2. **URL del proyecto**: ¿Tienes las credenciales de Supabase listas (URL y ANON_KEY)?
3. **Estilo del Dashboard**: ¿Preferís un dashboard con sidebar, topbar, o simple por ahora?
4. **Mensaje de error**: ¿Qué mensaje mostrar si falla la autenticación en el middleware?
5. **Loading states**: ¿Implementar un loading spinner durante las redirecciones?
6. **Manejo de sesión expirada**: ¿Qué hacer cuando la sesión expira mientras el usuario está en el dashboard?

## Implementation Notes

### Orden Sugerido de Implementación
1. Instalar dependencias de Supabase
2. Configurar variables de entorno
3. Crear clientes de Supabase (client, server, middleware)
4. Crear páginas placeholder (/login, /dashboard)
5. Implementar middleware de protección
6. Modificar botón "Get started"
7. Probar flujo completo de redirección
8. Agregar tipos TypeScript
9. Crear hooks y utilidades
10. Testing y refinamiento

### Referencias Útiles
- [Supabase Auth with Next.js 14](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)

## Related PRDs
- **PRD-Login-Form** (To be created): Implementación del formulario de login en `/login`
- **PRD-Dashboard-Layout** (To be created): Diseño e implementación del dashboard completo
- **PRD-User-Registration** (Future): Funcionalidad de registro de usuarios





