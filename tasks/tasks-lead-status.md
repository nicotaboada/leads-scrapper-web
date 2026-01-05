# Tasks: Lead Status para Contactos

## Relevant Files

**Backend:**
- `prisma/schema.prisma` - Agregar enum LeadStatus y campo al modelo Contact
- `src/contacts/entities/lead-status.enum.ts` - Nuevo enum GraphQL para LeadStatus
- `src/contacts/entities/person-contact.entity.ts` - Agregar campo leadStatus a la entidad
- `src/contacts/entities/company-contact.entity.ts` - Agregar campo leadStatus a la entidad
- `src/contacts/dto/contacts-filter.input.ts` - Agregar filtro por leadStatus
- `src/contacts/dto/update-lead-status.input.ts` - Nuevo DTO para la mutación
- `src/contacts/contacts.resolver.ts` - Nueva mutación updateContactLeadStatus
- `src/contacts/contacts.service.ts` - Lógica de actualización de leadStatus

**Frontend:**
- `modules/contacts/types/contact.ts` - Agregar enum y tipo LeadStatus
- `modules/contacts/components/lead-status-selector.tsx` - Nuevo componente selector de estado
- `modules/contacts/components/lead-status-filter.tsx` - Nuevo componente filtro de estado
- `modules/contacts/components/contacts-table.tsx` - Agregar columna de estado
- `modules/contacts/graphql/queries.ts` - Agregar campo leadStatus a queries
- `modules/contacts/graphql/mutations.ts` - Nueva mutación updateContactLeadStatus
- `modules/contacts/hooks/use-update-lead-status.ts` - Nuevo hook para actualizar estado
- `app/(authenticated)/contacts/page.tsx` - Integrar filtro de estado

### Notes

- La migración de Prisma debe ejecutarse después de modificar el schema
- El enum debe definirse tanto en Prisma como en GraphQL con los mismos valores
- El componente LeadStatusSelector debe ser reutilizable para futuros usos
- Los colores de los estados son: NEW (yellow-500), CONTACTED (pink-500), IN_CONVERSATIONS (gray-500), CLOSED (green-500)

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Crear y checkout una nueva rama: `git checkout -b feature/lead-status`

- [ ] 1.0 Backend: Schema de base de datos y migración Prisma
  - [ ] 1.1 Agregar enum `LeadStatus` en `prisma/schema.prisma` con valores: NEW, CONTACTED, IN_CONVERSATIONS, CLOSED
  - [ ] 1.2 Agregar campo `leadStatus` al modelo `Contact` con valor por defecto `NEW`
  - [ ] 1.3 Ejecutar `npx prisma migrate dev --name add-lead-status` para crear la migración
  - [ ] 1.4 Verificar que la migración se aplicó correctamente y el campo existe en la base de datos

- [ ] 2.0 Backend: Entidades y enum GraphQL
  - [ ] 2.1 Crear archivo `src/contacts/entities/lead-status.enum.ts` con el enum GraphQL LeadStatus usando `registerEnumType`
  - [ ] 2.2 Agregar campo `leadStatus` a `src/contacts/entities/person-contact.entity.ts` con decorador `@Field(() => LeadStatus)`
  - [ ] 2.3 Agregar campo `leadStatus` a `src/contacts/entities/company-contact.entity.ts` con decorador `@Field(() => LeadStatus)`
  - [ ] 2.4 Verificar que el schema GraphQL se genera correctamente ejecutando `npm run start:dev`

- [ ] 3.0 Backend: Resolver y Service - mutación updateContactLeadStatus
  - [ ] 3.1 Crear DTO `src/contacts/dto/update-lead-status.input.ts` con campo `leadStatus` de tipo LeadStatus
  - [ ] 3.2 Agregar método `updateLeadStatus(id: string, leadStatus: LeadStatus)` en `contacts.service.ts`
  - [ ] 3.3 Agregar mutación `updateContactLeadStatus` en `contacts.resolver.ts` que reciba id y leadStatus
  - [ ] 3.4 La mutación debe retornar el tipo union `Contact` para manejar ambos tipos de contacto
  - [ ] 3.5 Probar la mutación en GraphQL Playground

- [ ] 4.0 Backend: Filtro por leadStatus en query de contactos
  - [ ] 4.1 Agregar campo `leadStatus` de tipo `LeadStatus` (nullable) a `ContactsFilterInput`
  - [ ] 4.2 Modificar el método `findAll` en `contacts.service.ts` para filtrar por leadStatus cuando se proporcione
  - [ ] 4.3 Actualizar la llamada en `contacts.resolver.ts` para pasar el parámetro leadStatus al service
  - [ ] 4.4 Probar el filtro en GraphQL Playground con diferentes valores de leadStatus

- [ ] 5.0 Frontend: Tipos TypeScript y operaciones GraphQL
  - [ ] 5.1 Agregar enum `LeadStatus` en `modules/contacts/types/contact.ts` con valores NEW, CONTACTED, IN_CONVERSATIONS, CLOSED
  - [ ] 5.2 Agregar campo `leadStatus: LeadStatus` a interfaces `PersonContact` y `CompanyContact`
  - [ ] 5.3 Agregar campo `leadStatus` a la query `GET_CONTACTS` en ambos fragments (PersonContact y CompanyContact)
  - [ ] 5.4 Agregar campo `leadStatus` a la query `GET_CONTACT` en ambos fragments
  - [ ] 5.5 Crear mutación `UPDATE_CONTACT_LEAD_STATUS` en `modules/contacts/graphql/mutations.ts`
  - [ ] 5.6 Crear hook `useUpdateLeadStatus` en `modules/contacts/hooks/use-update-lead-status.ts`

- [ ] 6.0 Frontend: Componente LeadStatusSelector
  - [ ] 6.1 Crear archivo `modules/contacts/components/lead-status-selector.tsx`
  - [ ] 6.2 Definir constante `LEAD_STATUS_CONFIG` con label y color para cada estado (NEW: yellow, CONTACTED: pink, IN_CONVERSATIONS: gray, CLOSED: green)
  - [ ] 6.3 Implementar componente con Popover de shadcn/ui como dropdown
  - [ ] 6.4 El trigger debe mostrar un círculo de color + nombre del estado actual
  - [ ] 6.5 Las opciones del dropdown deben mostrar círculo de color + nombre para cada estado
  - [ ] 6.6 Implementar props: `value`, `onChange`, `disabled`, `loading`
  - [ ] 6.7 Agregar estado de loading visual mientras se actualiza
  - [ ] 6.8 Usar el hook `useUpdateLeadStatus` para hacer la mutación al cambiar

- [ ] 7.0 Frontend: Integrar columna de estado en tabla de contactos
  - [ ] 7.1 Agregar nueva columna "Estado" en el TableHeader de `contacts-table.tsx` (entre Teléfono y Acciones)
  - [ ] 7.2 Agregar TableCell con el componente `LeadStatusSelector` para cada contacto
  - [ ] 7.3 Pasar el `contact.leadStatus` como value y manejar el onChange
  - [ ] 7.4 Agregar la columna al skeleton de carga con un skeleton circular
  - [ ] 7.5 Ajustar anchos de columnas para acomodar la nueva columna (Estado ~160px)
  - [ ] 7.6 Verificar que el cambio de estado funciona correctamente y se refleja en la UI

- [ ] 8.0 Frontend: Componente LeadStatusFilter y página de contactos
  - [ ] 8.1 Crear archivo `modules/contacts/components/lead-status-filter.tsx`
  - [ ] 8.2 Implementar filtro usando el componente `FilterBy` existente similar a `StatusFilter`
  - [ ] 8.3 El filtro debe permitir seleccionar un estado para filtrar
  - [ ] 8.4 Importar y agregar `LeadStatusFilter` en `app/(authenticated)/contacts/page.tsx`
  - [ ] 8.5 Agregar estado `leadStatusFilter` y conectarlo con el hook de paginación
  - [ ] 8.6 Pasar el filtro al queryVariables del useBackendPagination
  - [ ] 8.7 Verificar que el filtro funciona correctamente filtrando contactos por estado
  - [ ] 8.8 Test end-to-end: crear contacto, verificar estado NEW, cambiar estado, filtrar por estado
