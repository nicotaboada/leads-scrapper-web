# Tasks: Editar y Eliminar Contactos

## Relevant Files

### Backend (leads-scrapper-backend)
- `src/contacts/dto/update-person-contact.input.ts` - DTO para actualizar contacto persona
- `src/contacts/dto/update-company.input.ts` - DTO para actualizar empresa
- `src/contacts/contacts.service.ts` - Agregar métodos updatePersonContact, updateCompany, deleteContact
- `src/contacts/contacts.resolver.ts` - Agregar mutations de update y delete

### Frontend (leads-scrapper-web)
- `modules/contacts/graphql/mutations.ts` - Agregar mutations UPDATE_PERSON_CONTACT, UPDATE_COMPANY, DELETE_CONTACT
- `modules/contacts/types/edit-contact.ts` - Tipos y schemas para edición
- `modules/contacts/hooks/use-update-person-contact.ts` - Hook para mutation updatePersonContact
- `modules/contacts/hooks/use-update-company.ts` - Hook para mutation updateCompany
- `modules/contacts/hooks/use-delete-contact.ts` - Hook para mutation deleteContact
- `modules/contacts/components/contact-actions-menu.tsx` - Menú dropdown con opciones Editar/Eliminar
- `modules/contacts/components/edit-contact-sheet.tsx` - Sheet para editar contacto persona
- `modules/contacts/components/edit-company-sheet.tsx` - Sheet para editar empresa
- `modules/contacts/components/delete-contact-dialog.tsx` - Modal de confirmación para eliminar
- `modules/contacts/components/contacts-table.tsx` - Integrar columna de acciones y componentes

### Notes

- Las mutations del backend deben validar que el contacto existe antes de actualizar/eliminar
- El EditContactSheet reutiliza la lógica visual del CreateContactSheet pero con datos pre-llenados
- El EditCompanySheet es un componente separado más simple (solo campos de empresa)
- Usar `AlertDialog` de shadcn/ui para el modal de confirmación

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 Crear y checkout una nueva rama: `git checkout -b feature/contacts-edit-delete`

- [x] 1.0 Backend - Crear DTOs de Update
  - [x] 1.1 Crear `src/contacts/dto/update-person-contact.input.ts` con campos: id, firstName, lastName, email, celular, linkedinUrl, jobTitle, companyId (todos opcionales excepto id)
  - [x] 1.2 Crear `src/contacts/dto/update-company.input.ts` con campos: id, companyName, companyEmails, whatsapp, linkedinUrl (todos opcionales excepto id)
  - [x] 1.3 Agregar validaciones con class-validator en ambos DTOs

- [x] 2.0 Backend - Implementar mutations de Update y Delete
  - [x] 2.1 Agregar método `updatePersonContact(id, input)` en `contacts.service.ts`
  - [x] 2.2 Agregar método `updateCompany(id, input)` en `contacts.service.ts`
  - [x] 2.3 Agregar método `deleteContact(id)` en `contacts.service.ts`
  - [x] 2.4 Agregar mutation `updatePersonContact` en `contacts.resolver.ts`
  - [x] 2.5 Agregar mutation `updateCompany` en `contacts.resolver.ts`
  - [x] 2.6 Agregar mutation `deleteContact` en `contacts.resolver.ts`
  - [x] 2.7 Manejar errores (contacto no encontrado, validación fallida)

- [x] 3.0 Frontend - Crear mutations GraphQL
  - [x] 3.1 Agregar mutation `UPDATE_PERSON_CONTACT` en `modules/contacts/graphql/mutations.ts`
  - [x] 3.2 Agregar mutation `UPDATE_COMPANY` en `modules/contacts/graphql/mutations.ts`
  - [x] 3.3 Agregar mutation `DELETE_CONTACT` en `modules/contacts/graphql/mutations.ts`

- [x] 4.0 Frontend - Crear tipos y hooks
  - [x] 4.1 Crear tipos en `modules/contacts/types/edit-contact.ts` (UpdatePersonContactInput, UpdateCompanyInput, schemas zod)
  - [x] 4.2 Exportar nuevos tipos desde `modules/contacts/types/index.ts`
  - [x] 4.3 Crear hook `use-update-person-contact.ts`
  - [x] 4.4 Crear hook `use-update-company.ts`
  - [x] 4.5 Crear hook `use-delete-contact.ts`

- [x] 5.0 Frontend - Crear componente ContactActionsMenu
  - [x] 5.1 Crear `modules/contacts/components/contact-actions-menu.tsx`
  - [x] 5.2 Implementar botón con icono MoreHorizontal
  - [x] 5.3 Implementar DropdownMenu con opciones "Editar" (icono Pencil) y "Eliminar" (icono Trash2, texto rojo)
  - [x] 5.4 Recibir props: contact, onEdit, onDelete

- [x] 6.0 Frontend - Crear EditContactSheet (para Personas)
  - [x] 6.1 Crear `modules/contacts/components/edit-contact-sheet.tsx`
  - [x] 6.2 Reutilizar estructura visual de CreateContactSheet
  - [x] 6.3 Pre-llenar campos con datos del contacto existente
  - [x] 6.4 Cambiar título a "Editar Contacto" y botón a "Guardar cambios"
  - [x] 6.5 Implementar submit con hook useUpdatePersonContact
  - [x] 6.6 Mostrar toast de éxito y cerrar sheet al guardar

- [x] 7.0 Frontend - Crear EditCompanySheet (para Empresas)
  - [x] 7.1 Crear `modules/contacts/components/edit-company-sheet.tsx`
  - [x] 7.2 Mostrar solo campos de empresa: nombre, emails, teléfono, linkedin
  - [x] 7.3 Pre-llenar campos con datos de la empresa existente
  - [x] 7.4 Título "Editar Empresa" y botón "Guardar cambios"
  - [x] 7.5 Implementar submit con hook useUpdateCompany
  - [x] 7.6 Mostrar toast de éxito y cerrar sheet al guardar

- [x] 8.0 Frontend - Crear DeleteContactDialog
  - [x] 8.1 Crear `modules/contacts/components/delete-contact-dialog.tsx`
  - [x] 8.2 Usar AlertDialog de shadcn/ui
  - [x] 8.3 Mostrar título "¿Eliminar contacto?" y mensaje con nombre del contacto
  - [x] 8.4 Botones "Cancelar" y "Eliminar" (variant destructive)
  - [x] 8.5 Implementar eliminación con hook useDeleteContact
  - [x] 8.6 Mostrar toast de éxito, cerrar modal y refrescar tabla

- [x] 9.0 Frontend - Integrar componentes en la tabla de contactos
  - [x] 9.1 Agregar columna de acciones (sin header) en ContactsTable
  - [x] 9.2 Renderizar ContactActionsMenu en cada fila
  - [x] 9.3 Agregar estados para controlar apertura de EditContactSheet, EditCompanySheet y DeleteContactDialog
  - [x] 9.4 Pasar contacto seleccionado a cada componente
  - [x] 9.5 Implementar callback onContactUpdated/onContactDeleted para refrescar la tabla
  - [ ] 9.6 Probar flujo completo: editar persona, editar empresa, eliminar contacto
