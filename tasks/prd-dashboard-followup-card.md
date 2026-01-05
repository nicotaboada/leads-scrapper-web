# PRD: Dashboard Follow-up Card

## 1. Introduction/Overview

Esta feature introduce la primera card funcional en el dashboard: un resumen de follow-ups pendientes de contactos. La card proporciona una vista rápida del estado de los follow-ups categorizados por urgencia (vencidos, hoy, próximos), permitiendo a los usuarios identificar rápidamente qué contactos requieren atención inmediata.

Al hacer click en "Ver contactos", se abre un sheet lateral con un listado de contactos filtrable por categoría de follow-up, con infinite scroll y navegación directa al detalle del contacto.

## 2. Goals

- Proporcionar visibilidad inmediata del estado de follow-ups al entrar al dashboard
- Reducir el tiempo necesario para identificar contactos que requieren seguimiento urgente
- Facilitar el acceso rápido a contactos con follow-ups pendientes sin navegar a la sección de contactos completa
- Establecer el patrón de diseño para futuras cards del dashboard

## 3. User Stories

### US-1: Ver resumen de follow-ups
**Como** usuario del sistema  
**Quiero** ver un resumen de mis follow-ups pendientes al entrar al dashboard  
**Para** saber rápidamente cuántos contactos requieren mi atención

### US-2: Acceder a lista de follow-ups
**Como** usuario del sistema  
**Quiero** poder ver un listado de contactos con follow-ups pendientes  
**Para** revisar quiénes son y decidir a quién contactar primero

### US-3: Filtrar follow-ups por urgencia
**Como** usuario del sistema  
**Quiero** filtrar los contactos por categoría de urgencia (vencidos, hoy, próximos)  
**Para** enfocarme en los más urgentes primero

### US-4: Navegar al detalle del contacto
**Como** usuario del sistema  
**Quiero** hacer click en un contacto del listado y ver su detalle  
**Para** tomar acción sobre el follow-up

## 4. Functional Requirements

### 4.1 Card de Follow-ups Pendientes

1. **FR-1.1**: La card debe mostrar el título "Follow-ups pendientes"
2. **FR-1.2**: La card debe mostrar tres contadores con indicadores visuales:
   - 🔴 Vencidos: cantidad de follow-ups con `dueDate` anterior a hoy
   - 🟡 Hoy: cantidad de follow-ups con `dueDate` igual a hoy
   - 🟢 Próximos: cantidad de follow-ups con `dueDate` en los próximos 7 días (excluyendo hoy)
3. **FR-1.3**: La card debe incluir un botón/link "Ver contactos" que abre el sheet
4. **FR-1.4**: Los contadores deben actualizarse al cargar el dashboard
5. **FR-1.5**: La card debe mostrar un estado de loading mientras se cargan los datos

### 4.2 Sheet de Contactos con Follow-ups

6. **FR-2.1**: El sheet debe abrirse desde el lado derecho de la pantalla
7. **FR-2.2**: El sheet debe incluir un título "Contactos con follow-up"
8. **FR-2.3**: El sheet debe incluir un filtro tipo "selectable" con las opciones:
   - Vencidos
   - Hoy
   - Próximos
9. **FR-2.4**: Por defecto, el filtro debe estar en "Vencidos" al abrir el sheet
10. **FR-2.5**: Cada item del listado debe mostrar:
    - Avatar: icono de empresa si `type === 'COMPANY'`, icono de persona si `type === 'PERSON'`
    - Nombre completo: `companyName` si es empresa, `firstName + lastName` si es persona
11. **FR-2.6**: Al hacer click en un contacto, debe navegar a `/contacts/{id}`
12. **FR-2.7**: El listado debe implementar infinite scroll (cargar más al hacer scroll)
13. **FR-2.8**: El sheet debe mostrar un estado vacío si no hay contactos en la categoría seleccionada
14. **FR-2.9**: El sheet debe mostrar loading skeleton mientras carga los datos

### 4.3 Backend - GraphQL Query

15. **FR-3.1**: Crear query `followUpSummary` que retorne:
    ```graphql
    type FollowUpSummary {
      overdueCount: Int!
      todayCount: Int!
      upcomingCount: Int!
    }
    ```

16. **FR-3.2**: Crear query `contactsWithFollowUp` con parámetros:
    ```graphql
    contactsWithFollowUp(
      category: FollowUpCategory! # OVERDUE | TODAY | UPCOMING
      first: Int
      after: String
    ): ContactsWithFollowUpConnection!
    ```
    
17. **FR-3.3**: La respuesta debe seguir el patrón de cursor-based pagination:
    ```graphql
    type ContactsWithFollowUpConnection {
      edges: [ContactWithFollowUpEdge!]!
      pageInfo: PageInfo!
      totalCount: Int!
    }
    
    type ContactWithFollowUpEdge {
      node: ContactWithFollowUp!
      cursor: String!
    }
    
    type ContactWithFollowUp {
      id: ID!
      type: ContactType!
      displayName: String!
      followUpDueDate: DateTime!
    }
    ```

## 5. Non-Goals (Out of Scope)

- **No** se implementarán acciones rápidas desde el sheet (marcar completado, cambiar fecha)
- **No** se mostrará información adicional del contacto (teléfono, email, etc.) en el listado
- **No** se permitirá crear nuevos follow-ups desde esta vista
- **No** se implementarán notificaciones o alertas de follow-ups vencidos
- **No** se agregará sorting al listado (se ordena por fecha de follow-up ascendente por defecto)

## 6. Design Considerations

### 6.1 Card Design

La card debe seguir el estilo visual de referencia (imagen adjunta):
- Fondo blanco con borde sutil
- Título en la parte superior izquierda
- Contadores apilados verticalmente con iconos de color (puntos o círculos)
- Botón/link "Ver contactos" en la parte inferior

### 6.2 Sheet Design

- Ancho del sheet: ~400px (o responsivo en móvil)
- Header con título y botón de cerrar
- Filtro selectable debajo del header
- Lista con items de altura fija (~56px)
- Avatar circular a la izquierda (40px)
- Nombre del contacto a la derecha del avatar
- Hover state para indicar clickeabilidad

### 6.3 Componentes UI a utilizar

- `Sheet` de shadcn/ui para el panel lateral
- `ToggleGroup` o `Tabs` de shadcn/ui para el filtro de categorías
- `Avatar` de shadcn/ui para los iconos de contacto
- `Skeleton` de shadcn/ui para loading states

### 6.4 Iconos

- Empresa: `Building2` de lucide-react
- Persona: `User` de lucide-react
- Indicadores de estado: círculos de colores (red-500, yellow-500, green-500)

## 7. Technical Considerations

### 7.1 Frontend

- Crear componente `FollowUpCard` en `/modules/dashboard/components/`
- Crear componente `FollowUpSheet` en `/modules/dashboard/components/`
- Crear componente `FollowUpContactList` para el listado con infinite scroll
- Usar `useInfiniteQuery` o patrón similar para infinite scroll
- Crear hooks personalizados:
  - `useFollowUpSummary` - para obtener los contadores
  - `useContactsWithFollowUp` - para el listado paginado

### 7.2 Backend

- Agregar queries en el resolver de Contacts o crear un nuevo resolver para Dashboard
- Implementar lógica de filtrado por fecha en el servicio:
  - OVERDUE: `dueDate < startOfToday`
  - TODAY: `dueDate >= startOfToday AND dueDate < startOfTomorrow`
  - UPCOMING: `dueDate >= startOfTomorrow AND dueDate <= startOfToday + 7 days`
- Implementar cursor-based pagination para el listado

### 7.3 Performance

- Los contadores deben ser queries eficientes usando `count()` de Prisma
- El listado debe cargar inicialmente 20 items
- Implementar caching apropiado en Apollo Client

## 8. Success Metrics

- El usuario puede ver el resumen de follow-ups en menos de 2 segundos al cargar el dashboard
- El sheet se abre en menos de 500ms
- El infinite scroll carga nuevos items sin lag perceptible
- Reducción del tiempo promedio para acceder a un contacto con follow-up pendiente

## 9. Open Questions

1. ¿Se debe implementar un refresh automático de los contadores mientras el dashboard está abierto?
2. ¿Qué sucede si un contacto no tiene nombre? ¿Mostrar "Sin nombre" o el ID?
3. ¿El sheet debe cerrarse automáticamente al navegar a un contacto o mantenerse abierto?
4. ¿Se debe mostrar la fecha del follow-up en el listado como información secundaria?

---

## Anexo: Definición de Categorías de Follow-up

| Categoría | Criterio | Color |
|-----------|----------|-------|
| Vencidos | `dueDate < hoy 00:00:00` | 🔴 Red |
| Hoy | `dueDate >= hoy 00:00:00 AND dueDate < mañana 00:00:00` | 🟡 Yellow |
| Próximos | `dueDate >= mañana 00:00:00 AND dueDate <= hoy + 7 días` | 🟢 Green |

