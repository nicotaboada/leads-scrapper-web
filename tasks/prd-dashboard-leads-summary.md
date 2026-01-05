# PRD: Dashboard Leads Summary Card

## 1. Introduction/Overview

Esta feature agrega una card de resumen de leads al dashboard principal de la aplicación. La card mostrará el total de contactos y su distribución por estado de lead (`leadStatus`), acompañada de un gráfico de donut para visualizar las proporciones de cada estado.

**Problema que resuelve:** Actualmente el dashboard no ofrece visibilidad sobre el estado general del pipeline de leads. Los usuarios necesitan navegar a la sección de contactos para entender cuántos leads tienen y en qué estado se encuentran.

## 2. Goals

1. Proveer una vista rápida del total de leads en el sistema
2. Mostrar la distribución de leads por estado de manera visual
3. Permitir al usuario entender el estado de su pipeline de un vistazo
4. Ofrecer tooltips informativos al interactuar con el gráfico

## 3. User Stories

### US-1: Ver resumen de leads
**Como** usuario autenticado  
**Quiero** ver un resumen de mis leads en el dashboard  
**Para** entender rápidamente el estado de mi pipeline sin navegar a otras secciones

### US-2: Visualizar distribución por estado
**Como** usuario autenticado  
**Quiero** ver un gráfico de donut con la distribución de leads por estado  
**Para** identificar visualmente qué proporción de leads están en cada etapa

### US-3: Ver detalles en tooltip
**Como** usuario autenticado  
**Quiero** ver información detallada al hacer hover sobre cada sección del gráfico  
**Para** conocer el número exacto y porcentaje de leads en cada estado

## 4. Functional Requirements

### 4.1 Backend (GraphQL)

1. **FR-B1:** Crear un nuevo query `getLeadsStatusSummary` que retorne:
   ```graphql
   type LeadStatusSummary {
     total: Int!
     new: Int!
     contacted: Int!
     inConversations: Int!
     closed: Int!
   }
   ```

2. **FR-B2:** El query debe contar todos los contactos agrupados por `leadStatus`

3. **FR-B3:** El query debe ser accesible sin parámetros (cuenta todos los contactos del sistema)

### 4.2 Frontend - Card de Resumen

4. **FR-F1:** Crear un componente `LeadsStatusCard` que se renderice en el dashboard

5. **FR-F2:** La card debe mostrar:
   - Título: "Resumen de Leads"
   - Total de leads (número grande y prominente)
   - Lista de estados con sus conteos:
     - 🆕 Nuevos: X
     - 📧 Contactados: Y
     - 💬 En conversación: Z
     - ✅ Cerrados: T

6. **FR-F3:** Cada estado debe tener un color distintivo consistente:
   - NEW: Azul (`#3B82F6`)
   - CONTACTED: Amarillo/Naranja (`#F59E0B`)
   - IN_CONVERSATIONS: Púrpura (`#8B5CF6`)
   - CLOSED: Verde (`#10B981`)

### 4.3 Frontend - Gráfico Donut

7. **FR-F4:** Implementar un gráfico de donut usando una librería de gráficos (Recharts recomendado)

8. **FR-F5:** El gráfico debe mostrar la distribución proporcional de cada estado

9. **FR-F6:** El centro del donut debe mostrar el total de leads

10. **FR-F7:** Al hacer hover sobre cada segmento del donut, mostrar un tooltip con:
    - Nombre del estado (traducido al español)
    - Cantidad de leads
    - Porcentaje del total

### 4.4 Frontend - Estados Vacíos y Carga

11. **FR-F8:** Mostrar un skeleton loader mientras se cargan los datos

12. **FR-F9:** Si no hay leads (total = 0), mostrar un estado vacío con mensaje: "No hay leads aún. Crea un run para comenzar a generar leads."

### 4.5 Traducciones de Estados

13. **FR-F10:** Los estados deben mostrarse en español:
    - NEW → "Nuevos"
    - CONTACTED → "Contactados"
    - IN_CONVERSATIONS → "En conversación"
    - CLOSED → "Cerrados"

## 5. Non-Goals (Out of Scope)

- ❌ Comparación con períodos anteriores (ej: "+5 vs semana pasada")
- ❌ Navegación/redirección al hacer click en los estados
- ❌ Filtros por fecha o rango de tiempo
- ❌ Gráficos de tendencia temporal
- ❌ Exportación de datos

## 6. Design Considerations

### Layout
- La card debe ocupar el espacio de 2 columnas en desktop (en el grid actual de 3 columnas)
- En mobile, debe ocupar el ancho completo
- Altura sugerida: ~300px para acomodar el gráfico

### Estructura Visual
```
┌─────────────────────────────────────────────────┐
│  Resumen de Leads                               │
├─────────────────────────────────────────────────┤
│                                                 │
│   ┌─────────────┐      Total Leads              │
│   │             │           124                 │
│   │   DONUT     │                               │
│   │    124      │      🆕 Nuevos: 45            │
│   │             │      📧 Contactados: 32       │
│   └─────────────┘      💬 En conversación: 28   │
│                        ✅ Cerrados: 19          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Colores por Estado
| Estado           | Color     | Hex       |
|------------------|-----------|-----------|
| NEW              | Azul      | `#3B82F6` |
| CONTACTED        | Naranja   | `#F59E0B` |
| IN_CONVERSATIONS | Púrpura   | `#8B5CF6` |
| CLOSED           | Verde     | `#10B981` |

## 7. Technical Considerations

### Backend
- Agregar el query al módulo de `contacts` existente
- Usar Prisma `groupBy` para contar por `leadStatus`
- El query debería verse similar a:
  ```typescript
  const counts = await this.prisma.contact.groupBy({
    by: ['leadStatus'],
    _count: { id: true }
  });
  ```

### Frontend
- Usar **Recharts** para el gráfico de donut (ya que es una librería popular y bien documentada)
- Crear el componente en `modules/dashboard/components/`
- Crear un hook `useLeadsStatusSummary` en `modules/dashboard/hooks/`
- Crear las queries GraphQL en `modules/dashboard/graphql/`

### Estructura de Archivos Sugerida
```
modules/
  dashboard/
    components/
      leads-status-card.tsx
      leads-status-donut.tsx
    graphql/
      queries.ts
    hooks/
      use-leads-status-summary.ts
    types/
      leads-summary.types.ts
```

## 8. Success Metrics

1. **Funcionalidad:** La card se renderiza correctamente con datos reales del backend
2. **Precisión:** Los números mostrados coinciden con los conteos reales en la base de datos
3. **UX:** El tooltip se muestra al hacer hover sobre el gráfico
4. **Performance:** El query responde en menos de 500ms
5. **Responsive:** La card se adapta correctamente a diferentes tamaños de pantalla

## 9. Open Questions

1. ¿Se debe cachear el resultado del query de resumen? ¿Con qué TTL?
2. ¿Debería haber un botón de refresh manual para actualizar los datos?
3. ¿El gráfico debe tener animación al cargar los datos?

