# Tasks: Contact Channels (Canales de Contacto)

## Relevant Files

**Backend:**
- `prisma/schema.prisma` - Agregar campo contactedChannels al modelo Contact
- `src/contacts/entities/contact-channel.enum.ts` - Nuevo enum GraphQL para ContactChannel
- `src/contacts/entities/person-contact.entity.ts` - Agregar campo contactedChannels
- `src/contacts/entities/company-contact.entity.ts` - Agregar campo contactedChannels
- `src/contacts/contacts.resolver.ts` - Nueva mutación toggleContactChannel
- `src/contacts/contacts.service.ts` - Lógica de toggle de canales

**Frontend:**
- `modules/contacts/types/contact.ts` - Agregar enum ContactChannel y helpers
- `modules/contacts/components/contact-channels-toggle.tsx` - Nuevo componente toggle de canales
- `modules/contacts/components/lead-section.tsx` - Integrar componente de canales
- `modules/contacts/graphql/queries.ts` - Agregar campo contactedChannels a queries
- `modules/contacts/graphql/mutations.ts` - Nueva mutación toggleContactChannel
- `modules/contacts/hooks/use-toggle-contact-channel.ts` - Nuevo hook para toggle

### Notes

- La migración de Prisma debe ejecutarse después de modificar el schema
- Los canales disponibles se determinan dinámicamente basándose en los datos del contacto
- El toggle debe ser optimista para mejor UX
- Canales: LINKEDIN, WHATSAPP, EMAIL

## Instructions for Completing Tasks

**IMPORTANT:** As you complete each task, you must check it off in this markdown file by changing `- [ ]` to `- [x]`. This helps track progress and ensures you don't skip any steps.

Example:
- `- [ ] 1.1 Read file` → `- [x] 1.1 Read file` (after completing)

Update the file after completing each sub-task, not just after completing an entire parent task.

## Tasks

- [ ] 1.0 Backend: Schema de base de datos y migración Prisma
  - [ ] 1.1 Agregar campo `contactedChannels` al modelo `Contact` en `prisma/schema.prisma` como `String[]` con valor por defecto `[]`
  - [ ] 1.2 Ejecutar `npx prisma migrate dev --name add-contacted-channels` para crear la migración
  - [ ] 1.3 Verificar que la migración se aplicó correctamente

- [ ] 2.0 Backend: Enum GraphQL y entidades
  - [ ] 2.1 Crear archivo `src/contacts/entities/contact-channel.enum.ts` con enum `ContactChannel` (LINKEDIN, WHATSAPP, EMAIL) usando `registerEnumType`
  - [ ] 2.2 Agregar campo `contactedChannels` a `src/contacts/entities/person-contact.entity.ts` como `@Field(() => [String])`
  - [ ] 2.3 Agregar campo `contactedChannels` a `src/contacts/entities/company-contact.entity.ts` como `@Field(() => [String])`
  - [ ] 2.4 Actualizar interface `ContactWithRelations` en `contacts.service.ts` para incluir `contactedChannels`
  - [ ] 2.5 Actualizar métodos `transformToPerson` y `transformToCompany` para mapear el campo

- [ ] 3.0 Backend: Resolver y Service - mutación toggleContactChannel
  - [ ] 3.1 Agregar método `toggleContactChannel(id: string, channel: ContactChannel)` en `contacts.service.ts`
  - [ ] 3.2 Implementar lógica: si el canal existe en el array → quitarlo, si no existe → agregarlo
  - [ ] 3.3 Agregar mutación `toggleContactChannel` en `contacts.resolver.ts` que reciba id y channel
  - [ ] 3.4 La mutación debe retornar el tipo union `Contact`
  - [ ] 3.5 Probar la mutación en GraphQL Playground

- [ ] 4.0 Frontend: Tipos TypeScript y operaciones GraphQL
  - [ ] 4.1 Agregar enum `ContactChannel` en `modules/contacts/types/contact.ts` con valores LINKEDIN, WHATSAPP, EMAIL
  - [ ] 4.2 Agregar campo `contactedChannels: ContactChannel[]` a interfaces `PersonContact` y `CompanyContact`
  - [ ] 4.3 Crear función helper `getAvailableChannels(contact: Contact): ContactChannel[]` que retorne canales disponibles basado en datos
  - [ ] 4.4 Agregar campo `contactedChannels` a queries `GET_CONTACTS` y `GET_CONTACT` en ambos fragments
  - [ ] 4.5 Crear mutación `TOGGLE_CONTACT_CHANNEL` en `modules/contacts/graphql/mutations.ts`
  - [ ] 4.6 Crear hook `useToggleContactChannel` en `modules/contacts/hooks/use-toggle-contact-channel.ts`

- [ ] 5.0 Frontend: Componente ContactChannelsToggle
  - [ ] 5.1 Crear archivo `modules/contacts/components/contact-channels-toggle.tsx`
  - [ ] 5.2 Definir constante `CHANNEL_CONFIG` con icono (Linkedin, MessageCircle, Mail) para cada canal
  - [ ] 5.3 Implementar props: `contact: Contact`, `onChannelToggle?: () => void`
  - [ ] 5.4 Usar helper `getAvailableChannels` para determinar qué iconos mostrar
  - [ ] 5.5 Renderizar iconos con Button variant="ghost" size="icon"
  - [ ] 5.6 Aplicar color gris (`text-gray-400`) para no contactado, verde (`text-green-500`) para contactado
  - [ ] 5.7 Implementar toggle con el hook `useToggleContactChannel`
  - [ ] 5.8 Agregar transición CSS suave para el cambio de color
  - [ ] 5.9 Mostrar loading state mientras se procesa (opcional: icono con opacity reducida)

- [ ] 6.0 Frontend: Integrar en LeadSection
  - [ ] 6.1 Importar `ContactChannelsToggle` en `lead-section.tsx`
  - [ ] 6.2 Agregar fila "Channels" debajo de "Status" con el componente
  - [ ] 6.3 Pasar el contacto y callback de refresh al componente
  - [ ] 6.4 Verificar que el toggle funciona correctamente y se refleja en la UI
  - [ ] 6.5 Test: marcar canal, recargar página, verificar persistencia
