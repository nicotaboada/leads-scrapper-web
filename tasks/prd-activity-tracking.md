# PRD: Activity Tracking System

## 1. Introduction/Overview

Esta feature introduce un sistema de seguimiento de actividades (Activity Tracking) que registra las acciones clave realizadas por los usuarios en la plataforma. Las actividades se mostrarán en una nueva card en el dashboard, proporcionando visibilidad sobre las acciones recientes del equipo.

El objetivo principal es mantener un log centralizado de las actividades importantes para mejorar la transparencia y el seguimiento del trabajo realizado por el equipo.

---

## 2. Goals

1. **Centralizar el registro de actividades** - Capturar automáticamente las 5 acciones clave definidas en el sistema.
2. **Mejorar la visibilidad del equipo** - Permitir que todos los usuarios vean las actividades de todo el equipo (feed compartido).
3. **Facilitar el seguimiento** - Proveer filtros por usuario y rango de fechas para encontrar actividades específicas.
4. **Navegación contextual** - Permitir acceso rápido a los recursos relacionados (contactos, runs) mediante hipervínculos.

---

## 3. User Stories

### US-01: Ver actividades recientes en el dashboard
**Como** usuario de la plataforma  
**Quiero** ver las últimas 10 actividades del equipo en una card del dashboard  
**Para** estar al tanto de las acciones recientes sin necesidad de navegar a otras secciones

### US-02: Filtrar actividades por usuario
**Como** usuario de la plataforma  
**Quiero** filtrar las actividades por un usuario específico  
**Para** ver solo las acciones realizadas por esa persona

### US-03: Filtrar actividades por fecha
**Como** usuario de la plataforma  
**Quiero** filtrar las actividades por rango de tiempo (24h, 7 días, 30 días)  
**Para** enfocarme en las actividades más relevantes según el período de tiempo

### US-04: Ver todas las actividades en un sheet expandido
**Como** usuario de la plataforma  
**Quiero** hacer clic en "Ver más" para abrir un sheet con la lista completa de actividades  
**Para** explorar el historial completo con scroll infinito y filtros

### US-05: Navegar a recursos desde la actividad
**Como** usuario de la plataforma  
**Quiero** hacer clic en el nombre de un contacto o run dentro de una actividad  
**Para** navegar directamente a ese recurso

---

## 4. Functional Requirements

### 4.1 Tipos de Actividades a Trackear

| ID | Tipo de Actividad | Descripción | Mensaje de Display |
|----|-------------------|-------------|-------------------|
| ACT-01 | `CONTACT_CREATED` | Cuando se crea un contacto individual | "{Usuario} ha creado un contacto nuevo **{Nombre Contacto}**" |
| ACT-02 | `RUN_CREATED` | Cuando se crea un nuevo run | "{Usuario} ha creado un nuevo run **{Nombre Run}**" |
| ACT-03 | `BULK_CONTACTS_CREATED` | Cuando se crean contactos desde un run | "{Usuario} ha agregado {cantidad} contactos a partir del run **{Nombre Run}**" |
| ACT-04 | `LEAD_STATUS_CHANGED` | Cuando cambia el leadStatus de un contacto | "{Usuario} ha cambiado el estado del contacto **{Nombre Contacto}** de {Estado Anterior} a {Estado Nuevo}" |
| ACT-05 | `FOLLOWUP_ADDED` | Cuando se agrega un followup a un contacto | "{Usuario} ha agregado un seguimiento al contacto **{Nombre Contacto}**" |

### 4.2 Modelo de Datos - Activity

```
Activity {
  id: String (UUID)
  type: ActivityType (enum de los 5 tipos)
  userId: String (referencia al usuario que ejecutó la acción)
  createdAt: DateTime
  
  // Metadata específica por tipo (JSON o campos relacionales)
  metadata: {
    // Para CONTACT_CREATED:
    contactId: String
    contactName: String
    
    // Para RUN_CREATED:
    runId: String
    runName: String
    
    // Para BULK_CONTACTS_CREATED:
    runId: String
    runName: String
    contactsCount: Number
    
    // Para LEAD_STATUS_CHANGED:
    contactId: String
    contactName: String
    previousStatus: String
    newStatus: String
    
    // Para FOLLOWUP_ADDED:
    contactId: String
    contactName: String
    followupId: String
  }
}
```

### 4.3 Dashboard Card - Actividades Recientes

1. **FR-01**: La card debe mostrar el título "Actividades Recientes" con un ícono identificativo.
2. **FR-02**: La card debe mostrar las últimas 10 actividades ordenadas por fecha descendente (más reciente primero).
3. **FR-03**: Cada actividad debe mostrar:
   - Avatar del usuario (con iniciales como fallback, ej: "NT")
   - Nombre completo del usuario (primera aparición) o iniciales (apariciones subsiguientes en el feed)
   - Mensaje descriptivo de la actividad
   - Hipervínculo azul al recurso relacionado (contacto o run)
   - Tiempo relativo (ej: "1h ago", "2h ago")
   - Ícono específico según el tipo de actividad
4. **FR-04**: La card debe tener un link "Ver más" al final que abra el sheet expandido.
5. **FR-05**: El diseño debe mantener tonos oscuros/negros consistentes con el tema actual.

### 4.4 Íconos por Tipo de Actividad

| Tipo | Ícono Sugerido | Descripción |
|------|----------------|-------------|
| `CONTACT_CREATED` | `UserPlus` | Usuario con símbolo + |
| `RUN_CREATED` | `Play` o `Rocket` | Indicador de inicio/ejecución |
| `BULK_CONTACTS_CREATED` | `Users` | Grupo de usuarios |
| `LEAD_STATUS_CHANGED` | `ArrowRightLeft` o `RefreshCw` | Cambio/transición |
| `FOLLOWUP_ADDED` | `MessageSquarePlus` o `Calendar` | Mensaje o recordatorio |

### 4.5 Sheet Expandido de Actividades

1. **FR-06**: El sheet debe abrirse al hacer clic en "Ver más" desde la card del dashboard.
2. **FR-07**: El sheet debe contener dos selectores de filtro:
   - **Filtro por Usuario**: Dropdown con todos los usuarios disponibles + opción "Todos"
   - **Filtro por Fecha**: Dropdown con opciones:
     - "Últimas 24 horas"
     - "Últimos 7 días"
     - "Último mes"
3. **FR-08**: La lista de actividades debe implementar scroll infinito (lazy loading).
4. **FR-09**: La lista debe mostrar el mismo formato de actividades que la card del dashboard.
5. **FR-10**: Los filtros deben aplicarse inmediatamente al cambiar su valor.
6. **FR-11**: Debe haber un estado vacío cuando no hay actividades que coincidan con los filtros.

### 4.6 Backend - API GraphQL

1. **FR-12**: Crear mutation o lógica interna para registrar actividades cuando ocurran los eventos.
2. **FR-13**: Crear query `activities` con los siguientes parámetros:
   - `userId` (opcional): Filtrar por usuario específico
   - `dateRange` (opcional): Enum con valores `LAST_24_HOURS`, `LAST_7_DAYS`, `LAST_30_DAYS`
   - `first` (opcional): Cantidad de registros (para paginación)
   - `after` (opcional): Cursor para paginación
3. **FR-14**: La query debe retornar:
   - Lista de actividades con toda la información necesaria
   - Información de paginación (hasNextPage, endCursor)
   - Información del usuario incluida (nombre, avatar)
4. **FR-15**: Implementar job/cron para eliminar actividades con más de 90 días de antigüedad.

### 4.7 Registro Automático de Actividades

1. **FR-16**: Al crear un contacto individual → Registrar actividad `CONTACT_CREATED`
2. **FR-17**: Al crear un run → Registrar actividad `RUN_CREATED`
3. **FR-18**: Al finalizar un run que creó contactos → Registrar actividad `BULK_CONTACTS_CREATED` con el conteo total (una sola entrada agregada, no individual por contacto)
4. **FR-19**: Al cambiar el leadStatus de un contacto → Registrar actividad `LEAD_STATUS_CHANGED`
5. **FR-20**: Al agregar un followup a un contacto → Registrar actividad `FOLLOWUP_ADDED`

---

## 5. Non-Goals (Out of Scope)

1. **Notificaciones push o en tiempo real** - Las actividades solo se actualizan al refrescar la página.
2. **Actividades individuales por contacto en bulk** - Para runs que crean múltiples contactos, solo se registra una actividad agregada.
3. **Edición o eliminación de actividades** - El log es inmutable (solo se eliminan automáticamente después de 90 días).
4. **Filtro por tipo de actividad** - En esta versión solo se filtra por usuario y fecha.
5. **Exportación del log de actividades** - No se incluye funcionalidad de export.
6. **Actividades de login/logout** - No se trackean accesos de usuarios.
7. **Historial ilimitado** - Solo se mantienen los últimos 90 días.

---

## 6. Design Considerations

### 6.1 Diseño Visual

- **Tema**: Mantener consistencia con el tema oscuro actual (tonos negros y grises oscuros).
- **Avatares**: Usar el componente Avatar existente con iniciales como fallback.
- **Hipervínculos**: Color azul para links a contactos y runs, con hover state.
- **Íconos**: Usar íconos de Lucide React, tamaño consistente (16px o 20px).
- **Tipografía**: 
  - Nombre de usuario: Semi-bold
  - Mensaje: Regular
  - Tiempo relativo: Muted/secondary color, tamaño menor

### 6.2 Referencia Visual

La UI debe seguir el patrón mostrado en la imagen de referencia:
- Lista vertical de actividades
- Ícono a la izquierda indicando el tipo
- Texto descriptivo con links inline
- Timestamp a la derecha

### 6.3 Componentes a Crear/Utilizar

- `ActivityCard` - Card del dashboard
- `ActivityItem` - Componente individual de actividad
- `ActivitySheet` - Sheet expandido con filtros
- `ActivityIcon` - Componente que renderiza el ícono según el tipo
- Reutilizar: `Sheet`, `Select`, `Avatar`, `ScrollArea` de shadcn/ui

---

## 7. Technical Considerations

### 7.1 Backend (NestJS + Prisma)

- Crear modelo `Activity` en Prisma schema
- Crear módulo `activities` con:
  - `ActivitiesService` - Lógica de negocio y persistencia
  - `ActivitiesResolver` - Queries GraphQL
- Integrar registro de actividades en los servicios existentes:
  - `ContactsService`
  - `RunsService`
  - (donde corresponda para followups y lead status)
- Implementar Prisma middleware o eventos para capturar las acciones

### 7.2 Frontend (Next.js + Apollo)

- Crear módulo `activities` en `/modules/activities/`
- Implementar hook `useActivities` para fetch con filtros
- Implementar hook `useInfiniteActivities` para scroll infinito en el sheet
- Agregar la card de actividades al layout del dashboard

### 7.3 Paginación

- Usar cursor-based pagination para el scroll infinito
- Page size sugerido: 20 actividades por request

### 7.4 Performance

- Índices en la tabla Activity: `createdAt`, `userId`, `type`
- Considerar índice compuesto: `(userId, createdAt)`

---

## 8. Success Metrics

1. **Adopción**: >80% de usuarios activos visualizan la card de actividades al menos una vez por semana.
2. **Engagement**: Tasa de clics en "Ver más" > 20% de las visualizaciones de la card.
3. **Navegación contextual**: >30% de las actividades mostradas reciben clics en los hipervínculos.
4. **Rendimiento**: Tiempo de carga de la card < 500ms.
5. **Data integrity**: 100% de las acciones definidas son registradas correctamente.

---

## 9. Open Questions

1. ¿Se debe mostrar el avatar/foto del usuario si está disponible, o solo las iniciales?
2. ¿Qué hacer si un contacto o run referenciado en una actividad es eliminado? ¿Mantener el texto sin link o indicar "[Eliminado]"?
3. ¿Se necesita un endpoint adicional para obtener la lista de usuarios para el filtro, o se reutiliza uno existente?
4. ¿El job de limpieza de 90 días debe ser configurable o hardcodeado?
5. ¿Se requiere algún tipo de rate limiting para evitar spam de actividades (ej: cambios masivos de estado)?

---

## 10. Implementation Phases (Sugerido)

### Phase 1: Backend Core
- Modelo de datos y migraciones
- Servicio de actividades (crear, listar, filtrar)
- Resolver GraphQL

### Phase 2: Integración de Eventos
- Hooks en ContactsService
- Hooks en RunsService
- Hooks en servicios de followup/lead status

### Phase 3: Frontend Dashboard Card
- Componente ActivityCard
- Componente ActivityItem
- Integración en dashboard

### Phase 4: Sheet Expandido
- Componente ActivitySheet
- Filtros (usuario, fecha)
- Scroll infinito

### Phase 5: Polish & Cleanup Job
- Job de limpieza de 90 días
- Estados vacíos y edge cases
- Testing E2E

