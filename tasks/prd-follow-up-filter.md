# PRD: Filtro de Follow-Up para Contactos

## 1. Introducción/Overview

Esta funcionalidad agrega un nuevo filtro a la lista de contactos que permite filtrar por el estado del follow-up (recordatorio de seguimiento). El filtro seguirá el mismo estilo visual y patrón de interacción que los filtros existentes (`LeadStatusFilter`, `TagsFilter`, `CityFilter`), utilizando el componente `FilterBy` con un Select dropdown.

El objetivo es permitir a los usuarios identificar rápidamente qué contactos requieren atención inmediata, cuáles tienen seguimiento programado para hoy o los próximos días, y cuáles no tienen ningún seguimiento programado.

## 2. Goals

- Permitir filtrar contactos por el estado de su follow-up basado en la fecha `dueDate`
- Mantener consistencia visual y de UX con los filtros existentes
- Facilitar la priorización del trabajo del usuario mostrando contactos que requieren atención

## 3. User Stories

1. **Como usuario**, quiero filtrar contactos con follow-ups vencidos para poder atender primero los casos más urgentes.

2. **Como usuario**, quiero ver los contactos que tengo que contactar hoy para organizar mi día de trabajo.

3. **Como usuario**, quiero ver los contactos programados para los próximos 3 días para planificar mi semana.

4. **Como usuario**, quiero identificar contactos sin follow-up programado para poder asignarles un seguimiento.

## 4. Functional Requirements

### 4.1 Frontend

1. **FR-01**: Crear un nuevo componente `FollowUpFilter` en `/modules/contacts/components/follow-up-filter.tsx`

2. **FR-02**: El componente debe usar el componente `FilterBy` existente con un `Select` dropdown, siguiendo el mismo patrón que `LeadStatusFilter`

3. **FR-03**: El filtro debe tener las siguientes 4 opciones con emojis como indicadores visuales:
   | Valor | Label | Emoji | Descripción |
   |-------|-------|-------|-------------|
   | `OVERDUE` | Vencido | 🔴 | Contactos con `dueDate` anterior a hoy |
   | `TODAY` | Hoy | 🟡 | Contactos con `dueDate` igual a hoy |
   | `NEXT_3_DAYS` | Próximos 3 días | 🟢 | Contactos con `dueDate` desde mañana hasta 3 días adelante |
   | `NO_FOLLOW_UP` | Sin seguimiento | ⚪ | Contactos sin ningún follow-up programado |

4. **FR-04**: Agregar el filtro `FollowUpFilter` a la página de contactos (`/app/(authenticated)/contacts/page.tsx`) junto a los filtros existentes

5. **FR-05**: El estado del filtro debe ser de tipo `FollowUpFilterValue | null` (selección única, no múltiple)

6. **FR-06**: Actualizar la query GraphQL `GET_CONTACTS` para incluir el nuevo parámetro de filtro

### 4.2 Backend

7. **FR-07**: Crear un nuevo enum `FollowUpFilterType` en el backend con los valores: `OVERDUE`, `TODAY`, `NEXT_3_DAYS`, `NO_FOLLOW_UP`

8. **FR-08**: Agregar el campo `followUpFilter` de tipo `FollowUpFilterType` al DTO `ContactsFilterInput`

9. **FR-09**: Implementar la lógica de filtrado en `ContactsService`:
   - `OVERDUE`: `followUp.dueDate < inicio del día actual`
   - `TODAY`: `followUp.dueDate >= inicio del día actual AND followUp.dueDate < fin del día actual`
   - `NEXT_3_DAYS`: `followUp.dueDate >= inicio de mañana AND followUp.dueDate <= fin del día actual + 3 días`
   - `NO_FOLLOW_UP`: `followUp IS NULL`

10. **FR-10**: Las comparaciones de fechas deben hacerse considerando solo la fecha (sin hora) para evitar inconsistencias

## 5. Non-Goals (Out of Scope)

- **No** se implementará selección múltiple de opciones de filtro
- **No** se modificará la lógica existente de follow-up (crear, editar, eliminar)
- **No** se agregarán notificaciones o alertas automáticas
- **No** se implementará ordenamiento por fecha de follow-up (solo filtrado)
- **No** se modificará el badge de follow-up existente en la tabla

## 6. Design Considerations

### Componente Visual

El filtro debe verse exactamente igual a los filtros existentes:

```
[📅 Follow-up ▼]  ← Botón del filtro (estado inactivo)
[📅 Follow-up: Vencido ▼]  ← Botón del filtro (estado activo con valor seleccionado)
```

### Opciones del Select

```
┌─────────────────────────┐
│ 🔴 Vencido              │
│ 🟡 Hoy                  │
│ 🟢 Próximos 3 días      │
│ ⚪ Sin seguimiento      │
└─────────────────────────┘
```

### Ubicación

El filtro se ubicará después del filtro `CityFilter` en la fila de filtros:

```
[Buscar...] [Estado Lead ▼] [Tags ▼] [Ciudad ▼] [Follow-up ▼]
```

## 7. Technical Considerations

### Frontend

- Seguir el patrón exacto del componente `LeadStatusFilter` como referencia
- Crear un tipo `FollowUpFilterValue` en `/modules/contacts/types/`
- El estado se manejará con `useState<FollowUpFilterValue | null>(null)`

### Backend

- El enum `FollowUpFilterType` debe registrarse en GraphQL
- La lógica de fechas debe usar el timezone del servidor o UTC consistentemente
- Usar Prisma para las queries con los operadores `lt`, `gte`, `lte` para comparaciones de fechas

### Estructura de archivos a crear/modificar

**Frontend (leads-scrapper-web):**
- `modules/contacts/components/follow-up-filter.tsx` (nuevo)
- `modules/contacts/types/follow-up-filter.ts` (nuevo)
- `app/(authenticated)/contacts/page.tsx` (modificar)
- `modules/contacts/graphql/queries.ts` (modificar)

**Backend (leads-scrapper-backend):**
- `src/contacts/entities/follow-up-filter-type.enum.ts` (nuevo)
- `src/contacts/dto/contacts-filter.input.ts` (modificar)
- `src/contacts/contacts.service.ts` (modificar)

## 8. Success Metrics

- El filtro funciona correctamente mostrando solo los contactos que corresponden a cada opción
- El filtro se integra visualmente sin problemas con los filtros existentes
- No hay regresiones en la funcionalidad existente de la tabla de contactos
- El tiempo de carga de la tabla no se ve afectado significativamente

## 9. Open Questions

1. ¿Debería el filtro "Próximos 3 días" incluir o excluir el día de hoy? 
   - **Respuesta**: Excluye hoy (desde mañana hasta 3 días adelante)

2. ¿Cómo manejar contactos que tienen múltiples follow-ups? 
   - **Nota**: Actualmente el modelo solo permite un follow-up por contacto (relación 1:1), por lo que no aplica.

3. ¿Qué timezone usar para las comparaciones de fecha?
   - **Pendiente**: Confirmar si usar timezone del servidor o UTC

