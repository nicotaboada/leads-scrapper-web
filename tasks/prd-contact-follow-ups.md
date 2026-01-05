# PRD: Contact Follow-ups

## 1. Introduction/Overview

Esta feature permite a los usuarios crear **follow-ups** (recordatorios) para contactos. El objetivo principal es ayudar a los usuarios a recordar cuándo deben volver a contactar a un Company o Person específico.

Un follow-up es un recordatorio simple con una fecha de vencimiento y una nota opcional. Cada contacto puede tener como máximo un follow-up activo a la vez. Una vez que el follow-up se marca como completado, desaparece y el usuario puede crear uno nuevo si lo desea.

## 2. Goals

1. Permitir a los usuarios crear recordatorios para volver a contactar a Companies y Persons
2. Proporcionar visibilidad clara sobre qué contactos tienen follow-ups pendientes o vencidos
3. Facilitar el flujo de trabajo de seguimiento de leads/contactos
4. Mantener un sistema simple: máximo 1 follow-up por contacto

## 3. User Stories

### US-1: Crear un Follow-up
**Como** usuario del sistema  
**Quiero** poder crear un follow-up para un contacto  
**Para** recordar cuándo debo volver a contactarlo

### US-2: Ver Follow-up Existente
**Como** usuario del sistema  
**Quiero** ver el follow-up existente de un contacto en su sidebar  
**Para** saber cuándo debo contactarlo y qué nota dejé

### US-3: Editar un Follow-up
**Como** usuario del sistema  
**Quiero** poder editar la fecha y nota de un follow-up existente  
**Para** ajustar el recordatorio si mis planes cambian

### US-4: Marcar Follow-up como Hecho
**Como** usuario del sistema  
**Quiero** poder marcar un follow-up como completado  
**Para** indicar que ya contacté a esa persona/empresa

### US-5: Identificar Contactos con Follow-ups en la Lista
**Como** usuario del sistema  
**Quiero** ver un indicador visual en la lista de contactos  
**Para** identificar rápidamente qué contactos tienen follow-ups pendientes o vencidos

### US-6: Ver Estado del Follow-up en Overview
**Como** usuario del sistema  
**Quiero** ver una card en el Overview del contacto que muestre el estado del follow-up  
**Para** saber si está vencido o aún tengo tiempo

## 4. Functional Requirements

### 4.1 Modelo de Datos

1. Un follow-up debe tener los siguientes campos:
   - `id`: Identificador único
   - `contactId`: Referencia al contacto (Company o Person)
   - `dueDate`: Fecha de vencimiento (obligatorio, solo fechas futuras)
   - `note`: Nota/texto del recordatorio (opcional)
   - `status`: Estado del follow-up (`PENDING` | `DONE`)
   - `createdAt`: Fecha de creación
   - `updatedAt`: Fecha de última actualización

2. Un contacto (Company o Person) puede tener como máximo 1 follow-up con status `PENDING`

3. Cuando un follow-up se marca como `DONE`, se elimina de la base de datos (o se archiva, según implementación)

### 4.2 Backend API (GraphQL)

4. Crear mutation `createFollowUp(input: CreateFollowUpInput!)` que:
   - Reciba `contactId`, `dueDate`, y `note` (opcional)
   - Valide que la fecha sea estrictamente en el futuro (no hoy)
   - Valide que el contacto no tenga ya un follow-up pendiente
   - Retorne el follow-up creado

5. Crear mutation `updateFollowUp(id: ID!, input: UpdateFollowUpInput!)` que:
   - Permita actualizar `dueDate` y `note`
   - Valide que la nueva fecha sea estrictamente en el futuro

6. Crear mutation `completeFollowUp(id: ID!)` que:
   - Marque el follow-up como `DONE`
   - Elimine el registro (o lo archive)

7. Crear mutation `deleteFollowUp(id: ID!)` que:
   - Elimine el follow-up sin marcarlo como completado

8. Extender el query de `company` y `person` para incluir el campo `followUp` (nullable) en la respuesta

9. Crear query `contactsWithFollowUps(filter: FollowUpFilterInput)` para listar contactos con follow-ups, permitiendo filtrar por:
   - `status`: PENDING | OVERDUE (calculado: PENDING + dueDate < hoy)
   - `contactType`: COMPANY | PERSON | ALL

### 4.3 UI - Contact Sidebar

10. En el sidebar de detalle del contacto (Company y Person), agregar una sección "Follow-up":
    - Si NO hay follow-up: mostrar botón "+ Agregar follow-up"
    - Si HAY follow-up: mostrar la información del follow-up

11. El botón "+ Agregar follow-up" debe abrir un modal con:
    - Campo de fecha (date picker) - obligatorio, solo fechas futuras
    - Campo de nota (textarea) - opcional
    - Botón "Cancelar"
    - Botón "Crear" (submit)

12. Cuando existe un follow-up, mostrar:
    - La fecha de vencimiento con formato legible (ej: "22 Dic")
    - La nota (si existe)
    - Indicador visual si está vencido (fecha pasada)
    - Botón/link "✓ Marcar como hecho"
    - Botón/link "✏️ Editar" (abre el mismo modal en modo edición)

13. El modal de edición debe:
    - Pre-cargar los valores actuales
    - Permitir modificar fecha y nota
    - Tener botones "Cancelar" y "Guardar"
    - Opcionalmente incluir botón "Eliminar" para borrar el follow-up

### 4.4 UI - Overview Card

14. En la pestaña Overview del contacto, agregar una card "Follow-up" que muestre:
    - Si NO hay follow-up: mensaje "Sin follow-up pendiente" y botón para crear
    - Si HAY follow-up:
      - Fecha de vencimiento
      - Nota (si existe)
      - Indicador de estado:
        - 🟢 "Pendiente" si la fecha aún no llegó
        - 🔴 "Vencido" si la fecha ya pasó
      - Días restantes o días de atraso (ej: "En 3 días" o "Hace 2 días")

### 4.5 UI - Lista de Contactos

15. En la tabla/lista de contactos (Companies y Persons), mostrar un indicador visual:
    - Badge/icono para contactos con follow-up pendiente (ej: 🔔 o icono de calendario)
    - Badge/icono diferente o con color rojo para follow-ups vencidos
    - Sin indicador si no hay follow-up

16. El indicador debe ser visible pero no intrusivo (no ocupar demasiado espacio)

### 4.6 Validaciones

17. La fecha de vencimiento debe ser estrictamente mayor a la fecha actual (mañana como mínimo)

18. No se puede crear un follow-up si el contacto ya tiene uno pendiente

19. La nota es opcional pero si se proporciona, puede tener un límite de caracteres (ej: 500)

## 5. Non-Goals (Out of Scope)

1. **Notificaciones push o por email**: No se implementarán alertas automáticas
2. **Múltiples follow-ups por contacto**: Solo se permite 1 follow-up activo
3. **Historial de follow-ups completados**: Los follow-ups marcados como hechos se eliminan
4. **Asignación de follow-ups a otros usuarios**: El follow-up pertenece al contacto, no a un usuario específico
5. **Filtro avanzado por follow-ups en la lista**: Solo indicador visual, no filtro por ahora
6. **Recurrencia de follow-ups**: No hay follow-ups repetitivos/automáticos

## 6. Design Considerations

### UI Components a Utilizar/Crear

- **Modal**: Usar componente `Dialog` existente de shadcn/ui
- **Date Picker**: Usar o crear componente de selección de fecha
- **Textarea**: Componente existente para la nota
- **Badge**: Para indicadores en la lista de contactos
- **Card**: Componente existente para la card en Overview

### Ubicación en el Sidebar

La sección de Follow-up debe ubicarse en el sidebar del contacto, sugerido entre la sección de "Lead" (Status/Channels) y la sección de "Tags".

### Colores/Estados Visuales

- **Pendiente (a tiempo)**: Color neutro o verde suave
- **Vencido**: Color rojo o naranja para indicar urgencia
- **Sin follow-up**: Estado neutro, solo mostrar botón de acción

## 7. Technical Considerations

### Backend (NestJS + Prisma)

- Crear modelo `FollowUp` en Prisma schema
- Relación: `Contact` tiene un `FollowUp` opcional (1:1)
- Considerar si el campo `status` es necesario o si simplemente se elimina el registro al completar
- Agregar campo `followUp` al resolver de Company y Person

### Frontend (Next.js + Apollo)

- Crear queries y mutations en `/modules/contacts/graphql/`
- Crear componentes en `/modules/contacts/components/`:
  - `follow-up-section.tsx` (para el sidebar)
  - `follow-up-card.tsx` (para overview)
  - `follow-up-modal.tsx` (modal de crear/editar)
  - `follow-up-badge.tsx` (indicador para la lista)
- Actualizar queries existentes de company/person para incluir followUp

### Cálculo de Estado

El estado "vencido" se calcula en el frontend comparando `dueDate` con la fecha actual:
- Si `dueDate < today`: Vencido
- Si `dueDate >= today`: Pendiente

## 8. Success Metrics

1. **Adopción**: % de contactos que tienen follow-ups creados
2. **Completación**: % de follow-ups marcados como completados vs abandonados
3. **Usabilidad**: Los usuarios pueden crear un follow-up en menos de 10 segundos
4. **Visibilidad**: Los usuarios pueden identificar contactos con follow-ups vencidos de un vistazo en la lista

## 9. Open Questions

1. ¿Debería existir un límite de caracteres para la nota del follow-up? (Sugerido: 500 caracteres)
2. ¿El date picker debería mostrar shortcuts como "Mañana", "En 1 semana", "En 1 mes"?
3. ¿Se debería mostrar el conteo total de follow-ups pendientes/vencidos en algún lugar del dashboard?
4. ¿Los follow-ups completados deberían archivarse para historial futuro o eliminarse definitivamente?

---

## Anexo: Mockups de Referencia (del usuario)

### Sidebar - Con Follow-up Existente
```
Follow-up
──────────────────
📅 22 Dic
📝 Esperar respuesta WhatsApp

[ ✓ Marcar como hecho ]
[ ✏️ Cambiar ]
```

### Sidebar - Sin Follow-up
```
Follow-up
──────────────────
Sin follow-ups pendientes

[ + Agregar follow-up ]
```

### Modal de Creación
- Campo: Título/Descripción (input text)
- Campo: Notify who? (chip input - fuera de scope inicial)
- Campo: When? (date picker con shortcuts: Tomorrow, In a week, In a month, In a year)
- Campo: Repeat (select - fuera de scope inicial)
- Botones: Cancel | Create

