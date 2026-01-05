# PRD: Contacts Frontend Module

## 1. Introduction/Overview

Este documento describe los requisitos para implementar el módulo de **Contactos** en el frontend. El módulo permitirá visualizar una lista de contactos (Personas y Empresas) en una tabla paginada, y ver el detalle de cada contacto en una página dedicada según su tipo.

### Problema que resuelve

Actualmente no existe una interfaz para visualizar y gestionar los contactos almacenados en el sistema. Este módulo proporcionará las páginas y componentes necesarios para listar contactos y ver sus detalles.

---

## 2. Goals

1. Crear una página de lista de contactos con tabla paginada y búsqueda
2. Mostrar ambos tipos de contactos (Persona y Empresa) en la misma tabla con avatares diferenciados
3. Implementar páginas de detalle separadas para cada tipo de contacto
4. Reutilizar componentes y patrones existentes del módulo de Students

---

## 3. User Stories

### US-1: Listar contactos
**Como** usuario del sistema  
**Quiero** ver una lista de todos los contactos  
**Para** encontrar rápidamente la información de contacto que necesito

**Criterios de aceptación:**
- La tabla muestra: Avatar, Nombre, Email, Teléfono
- El avatar es diferente para Persona (icono de usuario) vs Empresa (icono de edificio)
- Puedo buscar por nombre o email
- La lista está paginada
- Al hacer clic en el nombre, navego a la página de detalles

### US-2: Ver detalle de Persona
**Como** usuario del sistema  
**Quiero** ver los detalles de un contacto tipo Persona  
**Para** obtener toda su información de contacto

**Criterios de aceptación:**
- Muestra: firstName, lastName, jobTitle, celular, email, linkedinUrl
- La URL es `/contacts/person/[id]`

### US-3: Ver detalle de Empresa
**Como** usuario del sistema  
**Quiero** ver los detalles de un contacto tipo Empresa  
**Para** obtener toda su información de contacto

**Criterios de aceptación:**
- Muestra: companyName, companyEmails (lista), whatsapp, linkedinUrl
- La URL es `/contacts/company/[id]`

---

## 4. Functional Requirements

### 4.1 Página de Lista de Contactos (`/contacts`)

#### FR-1: Tabla de Contactos
La tabla debe mostrar las siguientes columnas:
- **Avatar**: Icono de usuario para Persona, icono de edificio para Empresa
- **Nombre**: `firstName lastName` para Persona, `companyName` para Empresa (clickeable, navega al detalle)
- **Email**: `email` para Persona, primer email de `companyEmails` para Empresa
- **Teléfono**: `celular` para Persona, `whatsapp` para Empresa

#### FR-2: Búsqueda
- Input de búsqueda que filtra por nombre o email
- Debounce de 300ms antes de ejecutar la búsqueda
- La búsqueda se envía como parámetro `search` a la query GraphQL

#### FR-3: Paginación
- Mostrar controles de paginación (anterior/siguiente)
- Mostrar información de página actual y total de resultados
- Usar el patrón existente de `TablePagination`

#### FR-4: Botón Crear Contacto
- Mostrar botón "Crear Contacto" en el header de la sección
- El botón NO tiene funcionalidad en esta versión (disabled o muestra toast "Próximamente")

#### FR-5: Estados vacíos
- Si no hay contactos: mostrar mensaje "No hay contactos registrados"
- Si la búsqueda no tiene resultados: mostrar mensaje "No hay resultados para la búsqueda"

### 4.2 Página de Detalle de Persona (`/contacts/person/[id]`)

#### FR-6: Información de Persona
Mostrar los siguientes campos:
- Avatar con iniciales
- Nombre completo (`firstName` + `lastName`)
- Job Title
- Email (con ícono de mail)
- Celular (con ícono de teléfono)
- LinkedIn URL (con ícono, abre en nueva pestaña)

#### FR-7: Navegación
- Breadcrumb: Contactos > [Nombre del contacto]
- Botón para volver a la lista

### 4.3 Página de Detalle de Empresa (`/contacts/company/[id]`)

#### FR-8: Información de Empresa
Mostrar los siguientes campos:
- Avatar con ícono de edificio
- Nombre de empresa (`companyName`)
- Lista de emails (cada uno con ícono de mail)
- WhatsApp (con ícono de teléfono)
- LinkedIn URL (con ícono, abre en nueva pestaña)

#### FR-9: Navegación
- Breadcrumb: Contactos > [Nombre de empresa]
- Botón para volver a la lista

---

## 5. Non-Goals (Out of Scope)

Las siguientes funcionalidades **NO** están incluidas en esta versión:

1. **Crear contactos**: El botón estará visible pero sin funcionalidad
2. **Editar contactos**: No hay formularios de edición
3. **Eliminar contactos**: No hay acciones de eliminación
4. **Filtro por tipo**: Solo búsqueda, no filtro por Persona/Empresa
5. **Ver empresa asociada**: En detalle de Persona, no se muestra la empresa
6. **Ver empleados**: En detalle de Empresa, no se muestran las personas asociadas

---

## 6. Design Considerations

### Estructura de archivos

```
app/(authenticated)/
├── contacts/
│   ├── page.tsx                    # Lista de contactos
│   ├── person/
│   │   └── [id]/
│   │       └── page.tsx            # Detalle de persona
│   └── company/
│       └── [id]/
│           └── page.tsx            # Detalle de empresa

modules/
└── contacts/
    ├── components/
    │   ├── contacts-table.tsx      # Tabla de contactos
    │   ├── person-detail.tsx       # Componente de detalle persona
    │   └── company-detail.tsx      # Componente de detalle empresa
    ├── graphql/
    │   ├── contacts.query.ts       # Query para lista
    │   └── contact.query.ts        # Query para detalle
    ├── hooks/
    │   └── use-contacts.ts         # Hook para obtener contactos
    └── types/
        └── contact.ts              # Tipos TypeScript
```

### Componentes UI a reutilizar
- `TablePagination` - Paginación existente
- `TableEmptyState` - Estados vacíos
- `TableSkeletonRows` - Loading skeleton
- `SectionHeader` - Header con título y botón de acción
- `Avatar` - Para mostrar iniciales o iconos
- `Badge` - Para mostrar tipo de contacto (opcional)

### Iconos sugeridos (Lucide)
- Persona: `User` o `UserCircle`
- Empresa: `Building2` o `Building`
- Email: `Mail`
- Teléfono: `Phone`
- LinkedIn: `Linkedin`
- WhatsApp: `MessageCircle`

---

## 7. Technical Considerations

### 7.1 GraphQL Queries

Usar las queries existentes del backend:

```graphql
# Lista de contactos
query GetContacts($filter: ContactsFilterInput) {
  contacts(filter: $filter) {
    data {
      ... on PersonContact {
        id
        type
        firstName
        lastName
        email
        celular
      }
      ... on CompanyContact {
        id
        type
        companyName
        companyEmails
        whatsapp
      }
    }
    meta {
      total
      page
      limit
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
}

# Detalle de contacto
query GetContact($id: ID!) {
  contact(id: $id) {
    ... on PersonContact {
      id
      type
      firstName
      lastName
      jobTitle
      celular
      email
      linkedinUrl
    }
    ... on CompanyContact {
      id
      type
      companyName
      companyEmails
      whatsapp
      linkedinUrl
    }
  }
}
```

### 7.2 Manejo de Union Types
- El response de GraphQL usa union types (`PersonContact | CompanyContact`)
- Usar el campo `type` para discriminar y renderizar el componente correcto
- En la tabla, usar `type` para determinar qué campos mostrar

### 7.3 Rutas
Actualizar `lib/config/routes.ts`:
```typescript
CONTACTS: '/contacts',
CONTACT_PERSON_DETAIL: (id: string) => `/contacts/person/${id}`,
CONTACT_COMPANY_DETAIL: (id: string) => `/contacts/company/${id}`,
```

### 7.4 Sidebar
Agregar item "Contactos" en el sidebar navigation (`lib/config/sidebar-nav.ts`)

---

## 8. Success Metrics

1. **Funcionalidad**: La tabla muestra contactos de ambos tipos correctamente
2. **Navegación**: Click en nombre navega al detalle correcto según tipo
3. **Búsqueda**: El filtro de búsqueda funciona con debounce
4. **Paginación**: Los controles de paginación funcionan correctamente
5. **Loading states**: Se muestran skeletons mientras carga
6. **Empty states**: Se muestran mensajes apropiados cuando no hay datos

---

## 9. Open Questions

1. ¿Qué colores usar para diferenciar visualmente Persona vs Empresa en la tabla?
2. ¿Mostrar badge con "Persona" / "Empresa" o solo el ícono diferente es suficiente?
3. ¿El botón "Crear Contacto" debería estar deshabilitado o mostrar un toast al hacer clic?

