# PRD: Create Contact Feature

## 1. Introduction/Overview

Este documento describe los requisitos para implementar la funcionalidad de **Crear Contacto** en el frontend. La feature permitirá crear contactos de tipo Persona a través de un Sheet/modal con un formulario que incluye la posibilidad de asociar o crear una empresa en el mismo flujo.

### Problema que resuelve

Actualmente el botón "Crear Contacto" en la página de contactos no tiene funcionalidad. Esta feature habilitará la creación de contactos tipo Persona directamente desde el frontend.

---

## 2. Goals

1. Implementar un Sheet con formulario para crear contactos tipo Persona
2. Integrar búsqueda de empresas existentes con opción de crear nueva empresa inline
3. Ejecutar las mutations de GraphQL necesarias (`createCompany` y `createContact`)
4. Manejar errores y estados de carga apropiadamente

---

## 3. User Stories

### US-1: Crear contacto sin empresa
**Como** usuario del sistema  
**Quiero** crear un contacto con solo nombre y apellido  
**Para** registrar rápidamente un nuevo contacto

**Criterios de aceptación:**
- Puedo abrir el Sheet haciendo clic en "Crear Contacto"
- Solo nombre y apellido son requeridos
- Al guardar, se crea el contacto y se muestra toast de éxito
- El Sheet se cierra automáticamente

### US-2: Crear contacto con empresa existente
**Como** usuario del sistema  
**Quiero** asociar un contacto a una empresa existente  
**Para** mantener la relación entre personas y empresas

**Criterios de aceptación:**
- Puedo buscar empresas escribiendo en el campo "Empresa"
- Las opciones se filtran a medida que escribo
- Al seleccionar una empresa, se asocia al contacto

### US-3: Crear contacto con nueva empresa
**Como** usuario del sistema  
**Quiero** crear una nueva empresa mientras creo un contacto  
**Para** no tener que salir del flujo de creación

**Criterios de aceptación:**
- Si busco y no encuentro la empresa, aparece opción "Crear nueva empresa"
- Al seleccionar esa opción, aparecen campos adicionales (email y teléfono de empresa)
- Al guardar, primero se crea la empresa, luego el contacto asociado

---

## 4. Functional Requirements

### 4.1 Formulario de Contacto

#### FR-1: Campos del formulario
| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| Nombre | Input text | ✅ Sí | Nombre del contacto |
| Apellido | Input text | ✅ Sí | Apellido del contacto |
| Email | Input email | ❌ No | Email del contacto |
| Teléfono | Input text | ❌ No | Número de teléfono/celular |
| Empresa | SearchSelect | ❌ No | Búsqueda de empresa existente o crear nueva |
| LinkedIn Profile | Input URL | ❌ No | URL del perfil de LinkedIn |
| Job Title | Input text | ❌ No | Cargo/puesto del contacto |

#### FR-2: Validación
- Nombre: mínimo 1 caracter
- Apellido: mínimo 1 caracter
- Email: formato válido (si se ingresa)
- LinkedIn Profile: formato URL válido (si se ingresa)

### 4.2 Campo Empresa (SearchSelect)

#### FR-3: Búsqueda de empresas
- Input de búsqueda que filtra empresas existentes
- Búsqueda desde el primer caracter (sin mínimo)
- Mostrar resultados en dropdown mientras se escribe
- Query GraphQL: usar `contacts` con filtro `type: COMPANY` y `search`

#### FR-4: Opción "Crear nueva empresa"
- Si la búsqueda no tiene resultados exactos, mostrar opción: `"Crear nueva empresa: [texto ingresado]"`
- Esta opción aparece al final de la lista de resultados
- Al seleccionarla:
  - El nombre de la empresa se autocompleta con el texto buscado
  - Se muestran 2 campos adicionales debajo:
    - Company Email (opcional)
    - Company Phone (opcional)

#### FR-5: Estados del campo empresa
1. **Sin selección**: Input de búsqueda vacío
2. **Empresa seleccionada**: Mostrar nombre de empresa con opción de limpiar (X)
3. **Creando nueva empresa**: Mostrar campos adicionales de empresa

### 4.3 Mutations GraphQL

#### FR-6: Flujo de creación
```
1. Usuario llena formulario y hace clic en "Guardar"
2. IF (creando nueva empresa):
   a. Ejecutar mutation createCompany
   b. IF (error): Mostrar error, NO crear contacto, detener flujo
   c. IF (éxito): Obtener companyId del response
3. Ejecutar mutation createContact con companyId (si aplica)
4. IF (error): Mostrar error
5. IF (éxito): Cerrar Sheet, mostrar toast de éxito, refrescar lista
```

#### FR-7: Mutation createCompany
```graphql
mutation CreateCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    id
    companyName
  }
}

input CreateCompanyInput {
  companyName: String!
  companyEmail: String
  companyPhone: String
}
```

#### FR-8: Mutation createContact (Persona)
```graphql
mutation CreateContact($input: CreatePersonContactInput!) {
  createPersonContact(input: $input) {
    id
    firstName
    lastName
  }
}

input CreatePersonContactInput {
  firstName: String!
  lastName: String!
  email: String
  celular: String
  linkedinUrl: String
  jobTitle: String
  companyId: String
}
```

### 4.4 Estados y Feedback

#### FR-9: Estados de carga
- Botón "Guardar" deshabilitado mientras se ejecutan mutations
- Mostrar texto "Guardando..." o spinner en el botón
- Deshabilitar todos los campos durante el submit

#### FR-10: Manejo de errores
- Error en createCompany: Mostrar toast de error, no crear contacto
- Error en createContact: Mostrar toast de error
- Errores de validación: Mostrar mensajes inline bajo cada campo

#### FR-11: Éxito
- Mostrar toast: "Contacto creado exitosamente"
- Cerrar el Sheet automáticamente
- Refrescar la lista de contactos

---

## 5. Non-Goals (Out of Scope)

1. **Crear contacto tipo Empresa**: Solo se crean contactos tipo Persona
2. **Editar contacto**: Esta feature es solo para creación
3. **Subir avatar/imagen**: No incluido en esta versión
4. **Validación de LinkedIn URL**: Solo validar formato, no verificar existencia
5. **Autocompletado de datos desde LinkedIn**: No incluido

---

## 6. Design Considerations

### Estructura de archivos

```
modules/contacts/
├── components/
│   ├── create-contact-sheet.tsx      # Nuevo: Sheet principal
│   └── company-search-select.tsx     # Nuevo: Componente de búsqueda de empresa
├── graphql/
│   ├── queries.ts                    # Existente: agregar query para buscar empresas
│   └── mutations.ts                  # Nuevo: mutations para crear
├── hooks/
│   ├── use-create-contact.ts         # Nuevo: hook para mutation
│   └── use-search-companies.ts       # Nuevo: hook para buscar empresas
└── types/
    └── create-contact.ts             # Nuevo: tipos y schema Zod
```

### Componentes UI a reutilizar
- `Sheet`, `SheetContent`, `SheetHeader`, etc.
- `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`
- `Input`
- `Button`
- `Command`, `CommandInput`, `CommandList`, `CommandItem` (para SearchSelect)

### Layout del formulario
```
┌─────────────────────────────────────┐
│ Crear Contacto                    X │
├─────────────────────────────────────┤
│                                     │
│  Nombre *                           │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Apellido *                         │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Email                              │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Teléfono                           │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Empresa                            │
│  ┌─────────────────────────────┐    │
│  │ 🔍 Buscar empresa...        │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │ Tech Solutions              │    │
│  │ Marketing Pro               │    │
│  │ ➕ Crear "Nueva Emp..."     │    │
│  └─────────────────────────────┘    │
│                                     │
│  [Si se selecciona crear empresa]   │
│  ┌─────────────────────────────────┐│
│  │ Company Email                   ││
│  │ ┌─────────────────────────────┐ ││
│  │ │                             │ ││
│  │ └─────────────────────────────┘ ││
│  │ Company Phone                   ││
│  │ ┌─────────────────────────────┐ ││
│  │ │                             │ ││
│  │ └─────────────────────────────┘ ││
│  └─────────────────────────────────┘│
│                                     │
│  LinkedIn Profile                   │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  Cargo                              │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
├─────────────────────────────────────┤
│           [Cancelar] [Guardar]      │
└─────────────────────────────────────┘
```

---

## 7. Technical Considerations

### 7.1 Backend - Nuevas Mutations necesarias

Se necesitan crear las siguientes mutations en el backend:

```typescript
// contacts.resolver.ts

@Mutation(() => CompanyContact)
async createCompany(@Args('input') input: CreateCompanyInput) {
  return this.contactsService.createCompany(input);
}

@Mutation(() => PersonContact)
async createPersonContact(@Args('input') input: CreatePersonContactInput) {
  return this.contactsService.createPersonContact(input);
}
```

### 7.2 Debounce en búsqueda
- Aplicar debounce de 300ms en la búsqueda de empresas
- Evitar requests excesivos mientras el usuario escribe

### 7.3 Caché de Apollo
- Después de crear empresa, actualizar caché para que aparezca inmediatamente
- Después de crear contacto, refetch de la lista de contactos

### 7.4 Zod Schema

```typescript
const createContactSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().optional(),
  linkedinUrl: z.string().url('URL inválida').optional().or(z.literal('')),
  jobTitle: z.string().optional(),
  // Empresa
  companyId: z.string().optional(),
  isCreatingNewCompany: z.boolean().default(false),
  newCompanyName: z.string().optional(),
  newCompanyEmail: z.string().email('Email inválido').optional().or(z.literal('')),
  newCompanyPhone: z.string().optional(),
});
```

---

## 8. Success Metrics

1. **Funcionalidad**: El contacto se crea correctamente con todos los campos
2. **Empresa inline**: Se puede crear empresa y contacto en un solo flujo
3. **Búsqueda**: La búsqueda de empresas funciona con debounce
4. **UX**: El flujo es intuitivo y los errores son claros
5. **Performance**: La búsqueda responde en menos de 500ms

---

## 9. Open Questions

1. ~~¿Se debe validar que el email del contacto no exista ya?~~ → No, emails pueden repetirse
2. ¿Mostrar loading skeleton en el dropdown mientras se buscan empresas?
3. ¿Limitar cantidad de resultados de empresas en el dropdown? (ej: máximo 10)

