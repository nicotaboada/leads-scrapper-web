# PRD: Activities para Contactos

## 1. Introducción/Overview

Esta feature agrega un sistema de registro de actividades (Activity Log) a los contactos del sistema, permitiendo a los usuarios documentar todas las interacciones y eventos relevantes que ocurren con cada lead a lo largo del tiempo. Las actividades se mostrarán en una nueva pestaña "Activities" dentro de las páginas de detalle de contactos (tanto Person como Company).

**Problema que resuelve:** Actualmente no existe una forma de registrar ni visualizar el historial de interacciones con un lead. Los usuarios necesitan documentar llamadas, mensajes, notas y cambios de estado para tener un contexto completo del lead y facilitar el seguimiento del proceso de ventas.

## 2. Goals

- Permitir a los usuarios registrar manualmente actividades de interacción con leads
- Registrar automáticamente los cambios de estado del lead (STATUS_CHANGED)
- Proporcionar una visualización cronológica de todas las actividades de un contacto
- Facilitar la búsqueda de actividades dentro del log
- Establecer las bases para filtrado futuro por tipo de actividad y rango de fechas

## 3. User Stories

### US-1: Ver historial de actividades
**Como** usuario del sistema  
**Quiero** ver el historial de actividades de un contacto  
**Para** entender el contexto completo de las interacciones con el lead

### US-2: Registrar actividad manual
**Como** usuario del sistema  
**Quiero** poder agregar una nueva actividad a un contacto  
**Para** documentar una interacción que acabo de realizar (ej: envié un WhatsApp)

### US-3: Agregar notas
**Como** usuario del sistema  
**Quiero** poder agregar notas a un contacto  
**Para** registrar información relevante o recordatorios sobre el lead

### US-4: Ver cambios de estado automáticos
**Como** usuario del sistema  
**Quiero** que los cambios de estado se registren automáticamente  
**Para** tener un historial completo sin necesidad de registrarlos manualmente

### US-5: Buscar actividades
**Como** usuario del sistema  
**Quiero** buscar dentro de las actividades de un contacto  
**Para** encontrar rápidamente una interacción específica

## 4. Functional Requirements

### 4.1 Modelo de Datos

1. **FR-1:** Crear un nuevo enum `ActivityType` con los valores:
   - `WHATSAPP_SENT` - Mensaje de WhatsApp enviado
   - `EMAIL_SENT` - Email enviado
   - `LINKEDIN_MESSAGE_SENT` - Mensaje de LinkedIn enviado
   - `LEAD_REPLIED` - El lead respondió
   - `NOTE` - Nota general
   - `STATUS_CHANGED` - Cambio de estado (automático)

2. **FR-2:** Crear una nueva tabla `Activity` con los campos:
   - `id` (UUID, PK)
   - `contactId` (FK a Contact, required)
   - `activityType` (ActivityType enum, required)
   - `summary` (String, opcional) - Descripción o contenido de la actividad
   - `metadata` (JSON, opcional) - Para datos adicionales (ej: fromStatus, toStatus)
   - `authorId` (FK a User, nullable) - Null para actividades del sistema
   - `authorName` (String, required) - "Sistema" para automáticas, nombre del usuario para manuales
   - `createdAt` (DateTime)

3. **FR-3:** La tabla `Activity` debe tener índices en `contactId` y `createdAt` para optimizar consultas

### 4.2 Backend (GraphQL API)

4. **FR-4:** Crear entidad GraphQL `Activity` con todos los campos del modelo

5. **FR-5:** Crear query `activities(contactId: String!, page: Int, limit: Int, search: String): ActivitiesResponse` para obtener actividades paginadas de un contacto

6. **FR-6:** Crear mutation `createActivity(input: CreateActivityInput!): Activity` para crear actividades manuales
   - Input: `contactId`, `activityType`, `summary` (opcional)
   - El `authorId` y `authorName` se obtienen del contexto de autenticación

7. **FR-7:** Modificar la mutation `updateContactLeadStatus` para que automáticamente cree una actividad de tipo `STATUS_CHANGED`:
   - `authorName`: "Sistema"
   - `authorId`: null
   - `metadata`: `{ fromStatus: "NEW", toStatus: "CONTACTED" }`

8. **FR-8:** La query de activities debe soportar búsqueda por texto en el campo `summary`

### 4.3 Frontend - Pestaña Activities

9. **FR-9:** Agregar una nueva pestaña "Activities" en `CardTabs` de:
   - `/contacts/person/[id]/page.tsx`
   - `/contacts/company/[id]/page.tsx`

10. **FR-10:** Crear componente `ActivitiesTab` que contenga:
    - Barra superior con: botón "Add Activity" y campo de búsqueda
    - Lista de actividades ordenada por fecha (más recientes primero)
    - Estado vacío cuando no hay actividades

### 4.4 Frontend - Lista de Actividades

11. **FR-11:** Crear componente `ActivityList` que muestre actividades agrupadas por fecha relativa:
    - "Today" para actividades de hoy
    - "Yesterday" para actividades de ayer
    - Fecha formateada (ej: "Dec 17") para otras fechas

12. **FR-12:** Crear componente `ActivityItem` que muestre:
    - Icono correspondiente al tipo de actividad (lateral izquierdo)
    - Tipo de actividad en formato legible (ej: "WHATSAPP SENT", "PHONE CALL")
    - Sufijo "added by [authorName]" o información del cambio
    - Summary/descripción en cursiva si existe
    - Línea de tiempo vertical conectando actividades (timeline style)

13. **FR-13:** Iconos por tipo de actividad:
    - `WHATSAPP_SENT`: Icono de mensaje/WhatsApp (verde)
    - `EMAIL_SENT`: Icono de email
    - `LINKEDIN_MESSAGE_SENT`: Icono de LinkedIn
    - `LEAD_REPLIED`: Icono de respuesta/chat
    - `NOTE`: Icono de nota/documento
    - `STATUS_CHANGED`: Icono de refresh/cambio

### 4.5 Frontend - Agregar Actividad

14. **FR-14:** Crear componente `AddActivitySheet` (Sheet/Drawer lateral) con:
    - Header "Add Activity" con botón de cerrar (X)
    - Sección "CONTACT": Mostrar avatar + nombre del contacto (solo lectura)
    - Sección "ACTIVITY TYPE": Botones de selección para cada tipo (excluyendo STATUS_CHANGED)
    - Sección "SUMMARY (OPTIONAL)": Textarea para descripción
    - Footer con botón "Submit"

15. **FR-15:** Los botones de tipo de actividad deben ser:
    - `In-Person` → `NOTE` (para visitas presenciales, mapeado a NOTE)
    - `Phone Call` → `WHATSAPP_SENT` (o nuevo tipo si se prefiere)
    - `Video Call` → `LINKEDIN_MESSAGE_SENT` (o nuevo tipo si se prefiere)
    - `Other` → `NOTE`
    
    **Nota:** Los tipos mostrados en la UI pueden diferir de los enum internos para mejor UX. Mapear según corresponda.

16. **FR-16:** Al enviar el formulario:
    - Ejecutar mutation `createActivity`
    - Mostrar loading en el botón Submit
    - Cerrar el sheet al completar
    - Refrescar la lista de actividades
    - Mostrar toast de éxito/error

### 4.6 Frontend - Estado Vacío

17. **FR-17:** Cuando no hay actividades, mostrar:
    - Mensaje: "There are no Activities logged for this contact."
    - Botón: "Log an Activity" (abre el AddActivitySheet)

### 4.7 Frontend - Búsqueda

18. **FR-18:** El campo de búsqueda debe:
    - Tener placeholder "Search for activities"
    - Aplicar debounce de 300ms
    - Filtrar actividades por el campo summary
    - La búsqueda se ejecuta en el backend

## 5. Non-Goals (Out of Scope)

- **No** se implementará edición de actividades (son inmutables)
- **No** se implementará eliminación de actividades
- **No** se implementará filtro por tipo de actividad en esta iteración (preparar para futuro)
- **No** se implementará filtro por rango de fechas en esta iteración (preparar para futuro)
- **No** se implementará paginación infinita (usar paginación estándar)
- **No** se agregarán adjuntos/archivos a las actividades
- **No** se implementarán menciones o notificaciones

## 6. Design Considerations

### 6.1 Referencia Visual

El diseño debe seguir el estilo de las imágenes de referencia proporcionadas:

- **Layout de lista:** Timeline vertical con iconos a la izquierda
- **Agrupación por fecha:** Etiquetas de fecha (Today, Yesterday, Dec 17, etc.)
- **Items de actividad:** Cards con tipo en negrita + autor, y descripción en cursiva
- **Sheet de agregar:** Formulario limpio con secciones claramente separadas

### 6.2 Componentes UI a Utilizar

- `Sheet` de shadcn/ui para AddActivitySheet
- `Button` para tipos de actividad (variant toggle/outline cuando seleccionado)
- `Textarea` para el summary
- `Input` para búsqueda
- Cards/divs personalizados para ActivityItem

### 6.3 Colores/Estilos de Iconos

```
WHATSAPP_SENT:        bg-green-100 text-green-600 (WhatsApp green)
EMAIL_SENT:           bg-blue-100 text-blue-600
LINKEDIN_MESSAGE_SENT: bg-sky-100 text-sky-600 (LinkedIn blue)
LEAD_REPLIED:         bg-purple-100 text-purple-600
NOTE:                 bg-gray-100 text-gray-600
STATUS_CHANGED:       bg-amber-100 text-amber-600 (refresh icon)
```

### 6.4 Timeline Styling

- Línea vertical gris claro conectando los iconos
- Iconos dentro de círculos/cuadrados redondeados
- Fecha relativa en texto muted sobre cada grupo

## 7. Technical Considerations

### 7.1 Backend

- Crear migración Prisma para la tabla `Activity`
- El enum `ActivityType` debe definirse tanto en Prisma como en GraphQL
- La mutation de `updateContactLeadStatus` debe crear la actividad en una transacción
- Considerar el modelo User existente para la relación con `authorId`

### 7.2 Frontend

- Crear hook `useActivities` para la query de actividades
- Crear hook `useCreateActivity` para la mutation
- El componente `ActivitiesTab` debe manejar su propio estado de paginación
- Actualizar los tipos TypeScript en el módulo contacts o crear nuevo módulo activities

### 7.3 Archivos a Modificar/Crear

**Backend:**
- `prisma/schema.prisma` - Agregar enum ActivityType y modelo Activity
- `src/contacts/entities/activity-type.enum.ts` - Nuevo enum GraphQL
- `src/contacts/entities/activity.entity.ts` - Nueva entidad GraphQL
- `src/contacts/dto/create-activity.input.ts` - Input para crear actividad
- `src/contacts/dto/activities-filter.input.ts` - Input para filtros
- `src/contacts/entities/activities-response.entity.ts` - Response paginada
- `src/contacts/contacts.resolver.ts` - Nuevas queries y mutations
- `src/contacts/contacts.service.ts` - Lógica de actividades

**Frontend:**
- `modules/contacts/types/activity.ts` - Tipos de Activity
- `modules/contacts/graphql/activity-queries.ts` - Queries GraphQL
- `modules/contacts/graphql/activity-mutations.ts` - Mutations GraphQL
- `modules/contacts/hooks/use-activities.ts` - Hook para obtener actividades
- `modules/contacts/hooks/use-create-activity.ts` - Hook para crear actividad
- `modules/contacts/components/activities-tab.tsx` - Componente de pestaña
- `modules/contacts/components/activity-list.tsx` - Lista de actividades
- `modules/contacts/components/activity-item.tsx` - Item individual
- `modules/contacts/components/add-activity-sheet.tsx` - Sheet para agregar
- `modules/contacts/components/activity-empty-state.tsx` - Estado vacío
- `app/(authenticated)/contacts/person/[id]/page.tsx` - Agregar tab Activities
- `app/(authenticated)/contacts/company/[id]/page.tsx` - Agregar tab Activities

## 8. Success Metrics

- Los usuarios pueden ver el historial completo de actividades de un contacto
- Los usuarios pueden agregar una nueva actividad en menos de 3 clicks
- Los cambios de estado se registran automáticamente sin intervención del usuario
- Los usuarios pueden buscar actividades por contenido
- La UI de actividades carga en menos de 500ms

## 9. Decisiones Confirmadas

1. **Actividades inmutables** - Una vez creadas, las actividades no pueden editarse ni eliminarse para mantener integridad del historial

2. **Autor del sistema** - Las actividades automáticas (STATUS_CHANGED) tendrán `authorName: "Sistema"` y `authorId: null`

3. **Tabla independiente** - Activity es una tabla independiente que referencia Contact y User, no embedded

4. **Filtros futuros** - Se prepara la infraestructura para soportar filtros por tipo de actividad y rango de fechas en futuras iteraciones

5. **Tipos de actividad en UI** - La UI puede mostrar labels amigables (Phone Call, Video Call, etc.) que se mapean a los enum internos según corresponda

## 10. Open Questions

1. ¿Se debe mostrar el avatar del autor en cada ActivityItem o solo el nombre?
2. ¿El metadata de STATUS_CHANGED debe mostrar el motivo de cierre cuando el estado es CLOSED?
3. ¿Se necesita agregar más tipos de actividad en el futuro (ej: PHONE_CALL, VIDEO_CALL como tipos separados)?

