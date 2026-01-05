# PRD: Contact Channels (Canales de Contacto)

## 1. Introducción/Overview

Esta feature agrega un sistema para rastrear a través de qué canales se ha contactado a un lead. Los canales disponibles son: LinkedIn, WhatsApp y Email. Solo se mostrarán los canales para los cuales tenemos información del contacto (ej: si solo tenemos WhatsApp, solo se mostrará ese icono).

**Problema que resuelve:** Los usuarios necesitan saber y registrar por qué canales han contactado a cada lead para evitar contactar por el mismo canal múltiples veces y para tener un historial de los medios de comunicación utilizados.

## 2. Goals

- Permitir registrar qué canales se han utilizado para contactar a un lead
- Mostrar visualmente el estado de cada canal (contactado/no contactado)
- Mostrar solo los canales disponibles basado en la información del contacto
- Persistir la información en la base de datos

## 3. User Stories

### US-1: Ver canales disponibles
**Como** usuario del sistema  
**Quiero** ver qué canales de contacto están disponibles para cada lead  
**Para** saber por qué medios puedo comunicarme

### US-2: Marcar canal como contactado
**Como** usuario del sistema  
**Quiero** marcar un canal cuando lo use para contactar al lead  
**Para** llevar registro de los canales utilizados

### US-3: Desmarcar canal contactado
**Como** usuario del sistema  
**Quiero** poder desmarcar un canal si lo marqué por error  
**Para** mantener el registro preciso

## 4. Functional Requirements

### 4.1 Modelo de Datos

1. **FR-1:** Agregar campo `contactedChannels` al modelo `Contact` en Prisma como array de strings con valor por defecto vacío `[]`

2. **FR-2:** Los valores válidos del array son: `"LINKEDIN"`, `"WHATSAPP"`, `"EMAIL"`

### 4.2 Backend (GraphQL API)

3. **FR-3:** Exponer el campo `contactedChannels` en las entidades GraphQL `PersonContact` y `CompanyContact` como `[String!]!`

4. **FR-4:** Crear una mutación `toggleContactChannel(id: String!, channel: ContactChannel!): Contact` que agregue o quite el canal del array

5. **FR-5:** Crear enum GraphQL `ContactChannel` con valores: `LINKEDIN`, `WHATSAPP`, `EMAIL`

### 4.3 Frontend - Lógica de Canales Disponibles

6. **FR-6:** Un canal está disponible si:
   - `LINKEDIN`: el contacto tiene `linkedinUrl` no vacío
   - `WHATSAPP`: el contacto tiene `whatsapp` (Company) o `celular` (Person) no vacío
   - `EMAIL`: el contacto tiene `email` (Person) o `companyEmails.length > 0` (Company)

7. **FR-7:** Solo mostrar los iconos de canales disponibles

### 4.4 Frontend - Componente Visual

8. **FR-8:** Crear componente `ContactChannelsToggle` que muestre iconos de los canales disponibles

9. **FR-9:** Iconos a utilizar:
   - LinkedIn: icono de LinkedIn
   - WhatsApp: icono de MessageCircle o similar
   - Email: icono de Mail

10. **FR-10:** Estados visuales:
    - No contactado: icono gris (`text-gray-400`)
    - Contactado: icono verde (`text-green-500`)

11. **FR-11:** Al hacer click en un icono, toggle inmediato del estado (gris ↔ verde)

12. **FR-12:** Mostrar loading state mientras se procesa la mutación

### 4.5 Frontend - Integración

13. **FR-13:** Agregar el componente `ContactChannelsToggle` en la sección "Lead" del sidebar, debajo del selector de Status

14. **FR-14:** El componente debe recibir el contacto y un callback para refrescar datos

## 5. Non-Goals (Out of Scope)

- **No** se registrará historial de cuándo se contactó por cada canal
- **No** se mostrarán los canales en la tabla de contactos
- **No** habrá integración real con los canales (solo registro manual)
- **No** se enviarán notificaciones o recordatorios

## 6. Design Considerations

### 6.1 Referencia Visual

Similar a la imagen proporcionada:
- Iconos en línea horizontal
- Tamaño compacto
- Transición suave entre estados (gris ↔ verde)

### 6.2 Layout en Sección Lead

```
Lead
├── Status: [🟡 Nuevo ▼]
└── Channels: [LinkedIn] [WhatsApp] [Email]
                 ⚫        🟢         ⚫
```

### 6.3 Componentes UI

- Usar `Button` variant="ghost" size="icon" para cada canal
- Transición CSS para el cambio de color

## 7. Technical Considerations

### 7.1 Backend

- El campo `contactedChannels` es un array de strings en PostgreSQL
- La mutación `toggleContactChannel` debe ser atómica (agregar si no existe, quitar si existe)

### 7.2 Frontend

- Crear función helper para determinar canales disponibles basado en el tipo de contacto
- El toggle debe ser optimista (actualizar UI inmediatamente, revertir si falla)

### 7.3 Archivos a Modificar/Crear

**Backend:**
- `prisma/schema.prisma` - Agregar campo contactedChannels
- `src/contacts/entities/contact-channel.enum.ts` - Nuevo enum
- `src/contacts/entities/person-contact.entity.ts` - Agregar campo
- `src/contacts/entities/company-contact.entity.ts` - Agregar campo
- `src/contacts/contacts.resolver.ts` - Nueva mutación
- `src/contacts/contacts.service.ts` - Lógica de toggle

**Frontend:**
- `modules/contacts/types/contact.ts` - Agregar tipo y helpers
- `modules/contacts/components/contact-channels-toggle.tsx` - Nuevo componente
- `modules/contacts/components/lead-section.tsx` - Integrar componente
- `modules/contacts/graphql/queries.ts` - Agregar campo a queries
- `modules/contacts/graphql/mutations.ts` - Nueva mutación
- `modules/contacts/hooks/use-toggle-contact-channel.ts` - Nuevo hook

## 8. Success Metrics

- Los usuarios pueden ver qué canales están disponibles para cada contacto
- Los usuarios pueden marcar/desmarcar canales con un solo click
- El estado persiste correctamente en la base de datos

## 9. Decisiones Confirmadas

1. **Persistencia en BD** - Los canales contactados se guardan en un array en el modelo Contact
2. **Canales basados en datos** - Solo se muestran canales para los que tenemos información
3. **Toggle inmediato** - Sin confirmación, cambio instantáneo al hacer click
4. **Toggle bidireccional** - Se puede marcar y desmarcar libremente
5. **Solo en detalle** - Se muestra únicamente en la sección Lead del sidebar

