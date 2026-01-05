# PRD: Bulk Actions - Run Results Table

## 1. Introduction/Overview

Este documento describe los requisitos para implementar la funcionalidad de **Bulk Actions** en la tabla de resultados de runs (`RunResultsTable`). La feature permitirá seleccionar múltiples resultados de Google Maps y ejecutar acciones masivas sobre ellos.

### Problema que resuelve

Actualmente, los resultados de un run de Google Maps solo se pueden visualizar. Los usuarios necesitan poder convertir estos resultados en contactos tipo EMPRESA de forma masiva, sin tener que crear cada contacto manualmente uno por uno.

### Primera Bulk Action: Crear Contactos (Empresas)

La primera acción masiva a implementar es la creación de contactos tipo EMPRESA a partir de los resultados seleccionados de un run de Google Maps.

---

## 2. Goals

1. Implementar sistema de selección múltiple en la tabla de resultados con checkboxes
2. Agregar header checkbox con opciones: Select None, Select Page, Select All
3. Implementar bulk action "Crear Contactos" para crear empresas desde resultados de Google Maps
4. Mostrar modal de confirmación antes de ejecutar la acción
5. Redirigir a la lista de contactos después de la creación exitosa

---

## 3. User Stories

### US-1: Seleccionar resultados individuales
**Como** usuario del sistema  
**Quiero** poder marcar checkboxes en filas individuales de la tabla  
**Para** seleccionar qué resultados quiero incluir en la bulk action

**Criterios de aceptación:**
- Cada fila tiene un checkbox a la izquierda
- Al marcar/desmarcar, se actualiza el contador de seleccionados
- Los checkboxes mantienen su estado al navegar entre páginas

### US-2: Seleccionar múltiples resultados con opciones del header
**Como** usuario del sistema  
**Quiero** poder usar el checkbox del header para seleccionar grupos de resultados  
**Para** acelerar la selección de muchos items

**Criterios de aceptación:**
- Al hacer clic en el checkbox del header, aparece un dropdown con 3 opciones:
  - "Select None (X)" - Deselecciona todo
  - "Select Page (Y)" - Selecciona solo los items de la página actual
  - "Select All (Z)" - Selecciona TODOS los resultados del run
- El checkbox del header muestra estado: vacío, parcial (indeterminate), o completo
- El contador muestra "X selected" en el header de la tabla

### US-3: Crear empresas desde resultados seleccionados
**Como** usuario del sistema  
**Quiero** crear contactos tipo EMPRESA a partir de los resultados de Google Maps seleccionados  
**Para** convertir leads de scraping en contactos del CRM

**Criterios de aceptación:**
- El botón "Create Contacts" aparece cuando hay items seleccionados
- Al hacer clic, se muestra un modal de confirmación
- El modal muestra cuántos contactos se van a crear
- Al confirmar, se crean las empresas y se muestra resumen de éxito/errores
- Se redirige a la lista de contactos

### US-4: Ver resumen de operación masiva
**Como** usuario del sistema  
**Quiero** ver un resumen de cuántos contactos se crearon exitosamente y cuántos fallaron  
**Para** saber el resultado de la operación

**Criterios de aceptación:**
- Se muestra toast con resumen: "X contactos creados. Y errores."
- Si hay errores, se indican cuáles fallaron (opcional: log en consola)
- La operación continúa aunque algunos fallen

---

## 4. Functional Requirements

### 4.1 Sistema de Selección

#### FR-1: Checkbox por fila
- Cada fila de la tabla tiene un checkbox en la primera columna
- El checkbox tiene el `id` del resultado como valor
- Estado controlado por el componente padre

#### FR-2: Estado de selección
El estado de selección debe manejar 3 modos:
```typescript
type SelectionMode = 'none' | 'page' | 'all'

interface SelectionState {
  mode: SelectionMode
  selectedIds: Set<string>      // IDs seleccionados manualmente
  deselectedIds: Set<string>    // IDs deseleccionados cuando mode='all'
}
```

#### FR-3: Checkbox del Header con Dropdown
| Opción | Acción | Muestra |
|--------|--------|---------|
| Select None | Limpia toda la selección | "Select None (0)" |
| Select Page | Selecciona los IDs de la página actual | "Select Page (10)" donde 10 es el pageSize |
| Select All | Marca flag para seleccionar todos | "Select All (1116)" donde 1116 es totalCount |

#### FR-4: Indicador visual del header checkbox
- **Vacío**: Ningún item seleccionado
- **Indeterminate (-)**: Algunos items seleccionados (no todos)
- **Checked (✓)**: Todos los items seleccionados (mode='all' sin deselecciones)

#### FR-5: Contador de selección
- Mostrar "X selected" en el área superior de la tabla
- X = número de items seleccionados
- Cuando mode='all': X = totalCount - deselectedIds.size

### 4.2 Bulk Action: Crear Contactos

#### FR-6: Botón de acción
- Botón "Create Contacts" visible cuando hay selección > 0
- Ubicado en el área superior derecha de la tabla (junto al contador)
- Deshabilitado durante operaciones en curso

#### FR-7: Modal de confirmación
```
┌─────────────────────────────────────────────┐
│ Create Contacts                           X │
├─────────────────────────────────────────────┤
│                                             │
│  You are about to create X company          │
│  contacts from the selected results.        │
│                                             │
│  This action cannot be undone.              │
│                                             │
├─────────────────────────────────────────────┤
│                    [Cancel]  [Create]       │
└─────────────────────────────────────────────┘
```

#### FR-8: Mapeo de datos Google Maps → Company
| Campo Google Maps (raw) | Campo Company |
|------------------------|---------------|
| `title` / `name` / `placeName` | `companyName` |
| `website` | (no se mapea aún, pero se podría en futuro) |
| `phone` / `phoneNumber` | `companyPhone` |
| `email` | `companyEmail` |

#### FR-9: Mutation Backend (Nueva)
Se necesita crear una mutation para bulk create:

```graphql
mutation BulkCreateCompaniesFromRun($input: BulkCreateCompaniesInput!) {
  bulkCreateCompaniesFromRun(input: $input) {
    createdCount
    errorCount
    errors {
      index
      message
    }
  }
}

input BulkCreateCompaniesInput {
  runId: String!
  selectionMode: SelectionMode!   # 'all' | 'selected' | 'page'
  selectedIds: [String!]          # IDs seleccionados (cuando mode != 'all')
  deselectedIds: [String!]        # IDs excluidos (cuando mode = 'all')
  page: Int                       # Página actual (cuando mode = 'page')
  pageSize: Int                   # Tamaño de página (cuando mode = 'page')
}

type BulkCreateCompaniesResponse {
  createdCount: Int!
  errorCount: Int!
  errors: [BulkCreateError!]
}

type BulkCreateError {
  index: Int!
  message: String!
}
```

#### FR-10: Flujo de creación
```
1. Usuario selecciona resultados
2. Usuario hace clic en "Create Contacts"
3. Se muestra modal de confirmación
4. Usuario confirma
5. Se muestra loading en el botón del modal
6. Se ejecuta mutation bulkCreateCompaniesFromRun
7. Backend:
   a. Obtiene los resultados según selectionMode
   b. Para cada resultado, crea un Company contact
   c. Si falla uno, continúa con los demás
   d. Retorna resumen de creados/errores
8. Frontend recibe respuesta
9. Se cierra el modal
10. Se muestra toast con resumen
11. Se redirige a /contacts
```

### 4.3 Estados y Feedback

#### FR-11: Estados del botón Create
- **Normal**: "Create Contacts" habilitado
- **Loading**: "Creating..." con spinner, deshabilitado
- **Disabled**: Cuando selección = 0

#### FR-12: Toast de resultado
- Éxito total: "✓ X contacts created successfully"
- Éxito parcial: "⚠ X contacts created. Y failed."
- Error total: "✗ Failed to create contacts. Please try again."

#### FR-13: Persistencia de selección entre páginas
- Los IDs seleccionados se mantienen al cambiar de página
- El contador se actualiza correctamente
- Al volver a una página, los checkboxes reflejan el estado guardado

---

## 5. Non-Goals (Out of Scope)

1. **Otras bulk actions**: Solo se implementa "Create Contacts" en esta iteración
2. **Editar contactos creados**: Solo creación, no edición
3. **Deshacer operación**: No hay rollback de la creación masiva
4. **Filtrar antes de bulk action**: Se usa la selección, no filtros adicionales
5. **Exportar a CSV**: No incluido en esta feature
6. **Bulk action para runs que no son de Google Maps**: Solo aplica a actorName de Google Maps
7. **Progress bar detallado**: Solo loading state simple, sin barra de progreso

---

## 6. Design Considerations

### Estructura de archivos

```
modules/runs/
├── components/
│   ├── run-results-table.tsx          # Modificar: agregar checkboxes
│   ├── bulk-action-header.tsx         # Nuevo: header con checkbox y acciones
│   ├── bulk-create-modal.tsx          # Nuevo: modal de confirmación
│   └── selection-dropdown.tsx         # Nuevo: dropdown del checkbox header
├── hooks/
│   ├── use-bulk-selection.ts          # Nuevo: hook para manejar selección
│   └── use-bulk-create-companies.ts   # Nuevo: hook para mutation
├── graphql/
│   └── mutations.ts                   # Modificar: agregar mutation bulk
└── types/
    └── bulk-actions.ts                # Nuevo: tipos para bulk actions
```

### Componentes UI a utilizar
- `Checkbox` (de shadcn/ui o custom)
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`
- `AlertDialog` para el modal de confirmación
- `Button`
- Toast (sonner)

### Layout actualizado de la tabla

```
┌─────────────────────────────────────────────────────────────────────┐
│                                      12 selected    [Create Contacts]│
├─────────────────────────────────────────────────────────────────────┤
│ [☐▾]  CONTACT              EMAIL              MOBILE              ✎ │
├─────────────────────────────────────────────────────────────────────┤
│ [☐]   AB  aaa Big Boys...                    (609) 300-1863       ✎ │
│ [☐]   AB  AA Blocked email  blocked@...      (903) 555-8686       ✎ │
│ [☐]   AB  AA Blocked sms... yay@email.com    (903) 555-8888       ✎ │
│ ...                                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 7. Technical Considerations

### 7.1 Backend - Nueva Mutation

Se necesita crear en el backend:

```typescript
// runs.resolver.ts o contacts.resolver.ts

@Mutation(() => BulkCreateCompaniesResponse)
async bulkCreateCompaniesFromRun(
  @Args('input') input: BulkCreateCompaniesInput
): Promise<BulkCreateCompaniesResponse> {
  return this.service.bulkCreateCompaniesFromRun(input);
}
```

El servicio debe:
1. Obtener los resultados del run según el modo de selección
2. Extraer datos de cada resultado (placeName, phone, email)
3. Crear cada Company, capturando errores individuales
4. Retornar conteo de éxitos y lista de errores

### 7.2 Optimización para "Select All"

Cuando `selectionMode = 'all'`:
- NO traer todos los IDs al frontend
- El backend procesa directamente todos los resultados del run
- Solo enviar `deselectedIds` si el usuario deseleccionó algunos

### 7.3 Manejo de duplicados

Si un contacto con el mismo nombre ya existe:
- Opción A: Crear de todos modos (pueden haber empresas con mismo nombre)
- Opción B: Saltar y contar como "error"
- **Decisión**: Opción A - Crear de todos modos, empresas pueden tener nombres duplicados

### 7.4 Redirección con router

```typescript
import { useRouter } from 'next/navigation'

const router = useRouter()
// Después de éxito:
router.push('/contacts')
```

---

## 8. Success Metrics

1. **Funcionalidad**: Los checkboxes funcionan correctamente en todas las páginas
2. **Selección masiva**: Select All funciona con miles de resultados sin problemas de performance
3. **Creación bulk**: Se pueden crear 100+ contactos en una sola operación
4. **Feedback claro**: El usuario siempre sabe cuántos items tiene seleccionados
5. **Manejo de errores**: Los errores parciales no impiden la creación de los demás

---

## 9. Open Questions

1. ¿Qué otros campos del raw de Google Maps deberían mapearse a Company en el futuro? (address, category, rating, etc.)
2. ¿Debería haber un límite máximo de items para crear en una sola operación? (ej: max 500)
3. ¿Se debería verificar duplicados por nombre de empresa antes de crear?
4. ¿Agregar campo `sourceRunId` a Company para saber de qué run se creó?

---

## 10. Future Bulk Actions (Roadmap)

Para futuras iteraciones, se podrían agregar:
- **Delete Results**: Eliminar resultados seleccionados del run
- **Export to CSV**: Exportar resultados seleccionados
- **Add Label**: Agregar etiqueta a contactos creados
- **Send to Integration**: Enviar a CRM externo (HubSpot, etc.)

