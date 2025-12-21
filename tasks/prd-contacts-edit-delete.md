# PRD: Editar y Eliminar Contactos

## 1. Introduction/Overview

Esta feature agrega funcionalidad de edición y eliminación de contactos desde la tabla de contactos. Se implementará un menú de acciones (3 puntos) en cada fila de la tabla que permitirá a los usuarios editar o eliminar contactos de forma rápida y segura.

**Problema que resuelve:** Actualmente los usuarios pueden crear contactos pero no pueden modificarlos ni eliminarlos, lo que limita la gestión efectiva de la base de contactos.

## 2. Goals

- Permitir editar contactos existentes (Persona y Empresa) desde la tabla
- Permitir eliminar contactos con confirmación previa
- Mantener consistencia visual con el resto de la aplicación
- Proveer feedback claro al usuario sobre las acciones realizadas

## 3. User Stories

### US1: Editar Contacto Persona
**Como** usuario del sistema  
**Quiero** poder editar los datos de un contacto persona desde la tabla  
**Para** mantener la información actualizada sin tener que eliminarlo y crearlo nuevamente

### US2: Editar Contacto Empresa
**Como** usuario del sistema  
**Quiero** poder editar los datos de una empresa desde la tabla  
**Para** actualizar información de la empresa (nombre, email, teléfono)

### US3: Eliminar Contacto
**Como** usuario del sistema  
**Quiero** poder eliminar un contacto desde la tabla  
**Para** mantener mi base de contactos limpia y actualizada

### US4: Confirmación de Eliminación
**Como** usuario del sistema  
**Quiero** ver una confirmación antes de eliminar un contacto  
**Para** evitar eliminaciones accidentales

## 4. Functional Requirements

### 4.1 Backend - Mutations GraphQL

#### FR-BE-1: Mutation updatePersonContact
El sistema debe proveer una mutation `updatePersonContact` que reciba:
- `id: String!` - ID del contacto a editar
- `input: UpdatePersonContactInput!` - Datos a actualizar (todos opcionales excepto firstName y lastName)

Campos del input:
- `firstName: String`
- `lastName: String`
- `email: String`
- `celular: String`
- `linkedinUrl: String`
- `jobTitle: String`
- `companyId: String` (puede ser null para desvincular)

#### FR-BE-2: Mutation updateCompany
El sistema debe proveer una mutation `updateCompany` que reciba:
- `id: String!` - ID de la empresa a editar
- `input: UpdateCompanyInput!` - Datos a actualizar

Campos del input:
- `companyName: String`
- `companyEmails: [String]`
- `whatsapp: String`
- `linkedinUrl: String`

#### FR-BE-3: Mutation deleteContact
El sistema debe proveer una mutation `deleteContact` que reciba:
- `id: String!` - ID del contacto a eliminar

La mutation debe:
- Eliminar el contacto de la base de datos (hard delete)
- Si es una empresa, los contactos asociados quedan desvinculados automáticamente (ya configurado con `onDelete: SetNull`)
- Retornar `true` si se eliminó exitosamente

### 4.2 Frontend - Tabla de Contactos

#### FR-FE-1: Columna de Acciones
La tabla de contactos debe incluir una columna adicional (sin header visible) con un botón de 3 puntos (`MoreHorizontal` icon) en cada fila.

#### FR-FE-2: Menú Dropdown
Al hacer click en el botón de 3 puntos, debe desplegarse un menú dropdown con dos opciones:
- **Editar** - Con icono de lápiz (`Pencil`)
- **Eliminar** - Con icono de papelera (`Trash2`) y texto en color rojo

### 4.3 Frontend - Editar Contacto Persona

#### FR-FE-3: EditContactSheet
Al seleccionar "Editar" en un contacto tipo PERSON:
- Se abre un sheet similar a `CreateContactSheet`
- Los campos vienen pre-llenados con los datos actuales del contacto
- El título cambia a "Editar Contacto"
- El botón de acción cambia a "Guardar cambios"

#### FR-FE-4: Campos editables (Persona)
- Nombre (requerido)
- Apellido (requerido)
- Email
- Teléfono
- Empresa (search-select, puede cambiar o desvincular)
- LinkedIn
- Cargo

### 4.4 Frontend - Editar Contacto Empresa

#### FR-FE-5: EditCompanySheet
Al seleccionar "Editar" en un contacto tipo COMPANY:
- Se abre un sheet específico `EditCompanySheet`
- Solo muestra los campos de empresa
- El título es "Editar Empresa"
- El botón de acción es "Guardar cambios"

#### FR-FE-6: Campos editables (Empresa)
- Nombre de empresa (requerido)
- Email(s) de empresa
- Teléfono/WhatsApp
- LinkedIn

### 4.5 Frontend - Eliminar Contacto

#### FR-FE-7: Modal de Confirmación
Al seleccionar "Eliminar":
- Se abre un modal de confirmación
- Título: "¿Eliminar contacto?"
- Mensaje: "Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar a [nombre del contacto]?"
- Botones: "Cancelar" (secundario) y "Eliminar" (destructivo/rojo)

#### FR-FE-8: Comportamiento post-eliminación
- Al confirmar eliminación exitosa:
  - Cerrar el modal
  - Mostrar toast de éxito: "Contacto eliminado exitosamente"
  - Refrescar la tabla de contactos

### 4.6 Feedback y Estados

#### FR-FE-9: Estados de carga
- Durante la edición: botón "Guardar cambios" muestra "Guardando..."
- Durante la eliminación: botón "Eliminar" muestra "Eliminando..." y se deshabilita

#### FR-FE-10: Manejo de errores
- Si falla la operación, mostrar toast de error con mensaje descriptivo
- No cerrar el modal/sheet si hay error

## 5. Non-Goals (Out of Scope)

- Edición en línea (inline editing) en la tabla
- Eliminación múltiple (bulk delete)
- Historial de cambios / auditoría
- Soft delete (se usa hard delete)
- Editar/Eliminar desde la página de detalle del contacto

## 6. Design Considerations

### Componentes a reutilizar
- `Sheet`, `SheetContent`, `SheetHeader`, etc. de shadcn/ui
- `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem` de shadcn/ui
- `AlertDialog` para el modal de confirmación
- `Button`, `Input`, `Form` components existentes

### Iconos
- `MoreHorizontal` para el botón de acciones
- `Pencil` para editar
- `Trash2` para eliminar

### Colores
- Opción eliminar: texto rojo (`text-destructive`)
- Botón eliminar en modal: variant `destructive`

## 7. Technical Considerations

### Backend
- Los DTOs de update deben usar `PartialType` de NestJS para heredar del create
- Usar transacciones si se actualiza empresa + emails
- Validar que el ID existe antes de actualizar/eliminar

### Frontend
- Crear hooks separados: `useUpdatePersonContact`, `useUpdateCompany`, `useDeleteContact`
- El `EditCompanySheet` es un componente separado (no reutiliza CreateContactSheet)
- Considerar usar un componente `ContactActionsMenu` reutilizable

### Estructura de archivos sugerida

**Backend:**
```
src/contacts/
├── dto/
│   ├── update-person-contact.input.ts
│   └── update-company.input.ts
```

**Frontend:**
```
modules/contacts/
├── components/
│   ├── contact-actions-menu.tsx
│   ├── edit-contact-sheet.tsx
│   ├── edit-company-sheet.tsx
│   └── delete-contact-dialog.tsx
├── hooks/
│   ├── use-update-person-contact.ts
│   ├── use-update-company.ts
│   └── use-delete-contact.ts
├── graphql/
│   └── mutations.ts (agregar nuevas mutations)
```

## 8. Success Metrics

- Los usuarios pueden editar contactos sin errores
- Los usuarios pueden eliminar contactos con confirmación
- El tiempo de implementación no supera 2-3 días de desarrollo
- No se introducen regresiones en la funcionalidad existente

## 9. Open Questions

- ~~¿Se debe poder editar/eliminar desde la página de detalle también?~~ → No, solo desde la tabla
- ~~¿Soft delete o hard delete?~~ → Hard delete
- ~~¿Qué pasa con contactos asociados al eliminar empresa?~~ → Se desvinculan automáticamente

