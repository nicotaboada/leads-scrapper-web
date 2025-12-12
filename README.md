# Next.js Enterprise Starter

Un starter moderno y completo para aplicaciones empresariales construido con Next.js, Apollo Client, y Supabase.

## 🚀 Stack Tecnológico

### Core
- **[Next.js 16](https://nextjs.org/)** - App Router con Turbopack para desarrollo ultra rápido
- **[React 19](https://react.dev/)** - Última versión con mejoras de rendimiento
- **[TypeScript](https://www.typescriptlang.org/)** - Configuración strict para máxima seguridad de tipos
- **[Apollo Client](https://www.apollographql.com/docs/react/)** - Cliente GraphQL con integración para Next.js

### Backend & Autenticación
- **[Supabase](https://supabase.com/)** - Autenticación y base de datos
- **[GraphQL](https://graphql.org/)** - API con tipado fuerte

### UI & Estilos
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework utility-first
- **[Radix UI](https://www.radix-ui.com/)** - Componentes accesibles sin estilos
- **[Motion (Framer Motion)](https://motion.dev/)** - Animaciones fluidas y profesionales
- **[Lucide React](https://lucide.dev/)** - Iconos modernos

### State Management & Formularios
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management simple y escalable
- **[React Hook Form](https://react-hook-form.com/)** - Formularios performantes
- **[Zod](https://zod.dev/)** - Validación de esquemas con TypeScript

### Desarrollo & Calidad
- **[Vitest](https://vitest.dev/)** - Testing ultra rápido
- **[Storybook](https://storybook.js.org/)** - Documentación de componentes
- **[ESLint 9](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Code quality
- **[OpenTelemetry](https://opentelemetry.io/)** - Observabilidad integrada
- **[T3 Env](https://env.t3.gg/)** - Variables de entorno type-safe

## 📁 Estructura del Proyecto

```
src/
├── app/                     # App Router - páginas y layouts
│   ├── (authenticated)/    # Rutas protegidas
│   ├── login/              # Autenticación
│   └── layout.tsx          # Layout raíz
│
├── components/              # Componentes globales reutilizables
│   ├── ui/                 # Primitivos (buttons, inputs, cards, etc.)
│   └── layouts/            # Layouts (header, sidebar, breadcrumb)
│
├── modules/                 # Features organizadas por dominio
│   ├── auth/
│   │   ├── components/     # Componentes específicos de auth
│   │   ├── hooks/          # Hooks de auth
│   │   └── graphql/        # Queries/mutations de auth
│   ├── students/
│   └── users/
│
├── lib/                     # Configuración y clientes
│   ├── apollo/             # Apollo Client setup
│   ├── supabase/           # Supabase client y auth
│   ├── config/             # Configuraciones de la app
│   └── utils/              # Utilidades globales
│
├── hooks/                   # Custom hooks globales
├── types/                   # TypeScript types globales
└── styles/                  # Estilos globales
```

### Principios de Arquitectura

1. **Separación de responsabilidades**: Las páginas solo importan desde `modules/` o `components/`
2. **Colocation**: Features contienen todo lo relacionado (componentes, hooks, GraphQL, utils)
3. **Reusabilidad**: Componentes UI genéricos en `components/`, específicos en `modules/`
4. **Type-safety**: Todo tipado con TypeScript strict mode

## 🛠️ Comandos

### Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo (con Turbopack)
pnpm dev

# Desarrollo con UI de Vitest
pnpm test:ui

# Storybook
pnpm storybook
```

### Build & Deploy

```bash
# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Analizar bundle
pnpm analyze
```

### Code Quality

```bash
# Linting
pnpm lint
pnpm lint:fix

# Formatting
pnpm prettier
pnpm prettier:fix

# Testing
pnpm test
pnpm test:watch
pnpm test:coverage
```

### Herramientas

```bash
# Visualizar dependencias entre módulos
pnpm coupling-graph

# Generar changelog automático
npx semantic-release
```

## ⚙️ Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# GraphQL
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/graphql

# OpenTelemetry (opcional)
OTEL_SERVICE_NAME=next-enterprise
```

## 🎨 Componentes UI

El proyecto incluye una colección completa de componentes UI construidos con Radix UI y Tailwind CSS:

- **Layouts**: `AppLayout`, `AppHeader`, `AppSidebar`, `Breadcrumb`, `SectionHeader`, `DetailHeader`
- **Primitivos**: `Button`, `Input`, `Card`, `Avatar`, `Tabs`, `Tooltip`, `Sheet`, `Popover`
- **Especializados**: `CardTabs`, `MotionTabs`, `UserAvatarMenu`

Todos documentados en Storybook: `pnpm storybook`

## 🔐 Autenticación

El proyecto usa Supabase para autenticación con middleware de Next.js:

```typescript
// Obtener usuario actual
import { useCurrentUser } from 'hooks/use-current-user'

function Component() {
  const { data: user, isLoading } = useCurrentUser()
  // ...
}
```

## 📊 GraphQL con Apollo

```typescript
// Definir query en modules/{feature}/graphql/queries.ts
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`

// Usar en componente
import { useQuery } from '@apollo/client'
import { GET_USERS } from 'modules/users/graphql/queries'

function UsersPage() {
  const { data, loading } = useQuery(GET_USERS)
  // ...
}
```

## 🧪 Testing

```bash
# Ejecutar tests
pnpm test

# Con UI interactiva
pnpm test:ui

# Con coverage
pnpm test:coverage
```

## 📦 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo)

### Docker

```bash
# Build
docker build -t next-enterprise .

# Run
docker run -p 3000:3000 next-enterprise
```

## 🔧 Configuración Adicional

### ESLint

La configuración de ESLint sigue las mejores prácticas con:
- Reglas de Next.js
- TypeScript strict
- Import organization
- Tailwind CSS class sorting

### Prettier

Configuración personalizada para mantener consistencia en el código.

### Bundle Analyzer

Analiza el tamaño de tu bundle:

```bash
pnpm analyze
```

## 📚 Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

## 🤝 Contribuir

Este es un proyecto privado/empresarial. Para contribuir, por favor sigue las convenciones establecidas y crea un pull request.

## 📄 Licencia

MIT

---

**Requisitos del sistema:**
- Node.js >= 20.0.0
- pnpm 10.0.0 (gestionado con Corepack)
