# PRD: Lead Status para Contactos

## 1. Introducción/Overview

Esta feature agrega un sistema de estados (LeadStatus) a todos los contactos del sistema, permitiendo a los usuarios rastrear en qué etapa del proceso de ventas se encuentra cada lead. El estado será visualizado mediante círculos de colores distintivos y podrá ser modificado directamente desde la tabla de contactos.

**Problema que resuelve:** Actualmente no existe una forma de categorizar o rastrear el progreso de los contactos a través del pipeline de ventas. Los usuarios necesitan identificar rápidamente en qué estado se encuentra cada lead para priorizar sus acciones.

## 2. Goals

- Permitir categorizar contactos según su estado en el pipeline de ventas
- Proporcionar una visualización clara y rápida del estado de cada contacto
- Facilitar el cambio de estado directamente desde la lista de contactos
- Permitir filtrar contactos por estado

## 3. User Stories

### US-1: Ver estado del lead en la tabla
**Como** usuario del sistema  
**Quiero** ver el estado actual de cada contacto en la tabla de contactos  
**Para** identificar rápidamente en qué etapa se encuentra cada lead

### US-2: Cambiar estado desde la tabla
**Como** usuario del sistema  
**Quiero** poder cambiar el estado de un contacto directamente desde la tabla  
**Para** actualizar el estado sin tener que entrar al detalle del contacto

### US-3: Filtrar contactos por estado
**Como** usuario del sistema  
**Quiero** filtrar la lista de contactos por estado  
**Para** enfocarme en los leads de una etapa específica del pipeline

### US-4: Estado por defecto en nuevos contactos
**Como** usuario del sistema  
**Quiero** que los nuevos contactos tengan el estado "New" automáticamente  
**Para** identificarlos como leads recién agregados

## 4. Functional Requirements

### 4.1 Modelo de Datos

1. **FR-1:** Crear un nuevo enum `LeadStatus` con los valores:
   - `NEW` - Lead nuevo (estado por defecto)
   - `CONTACTED` - Lead contactado
   - `IN_CONVERSATIONS` - En conversaciones
   - `CLOSED` - Cerrado

2. **FR-2:** Agregar el campo `leadStatus` al modelo `Contact` en Prisma con valor por defecto `NEW`

3. **FR-3:** El campo `leadStatus` debe aplicar tanto a contactos de tipo `PERSON` como `COMPANY`

### 4.2 Backend (GraphQL API)

4. **FR-4:** Exponer el campo `leadStatus` en las entidades GraphQL `PersonContact` y `CompanyContact`

5. **FR-5:** Crear una mutación `updateContactLeadStatus(id: String!, leadStatus: LeadStatus!): Contact` para actualizar solo el estado

6. **FR-6:** Agregar filtro por `leadStatus` en la query de contactos (`contacts`)

7. **FR-7:** Incluir `leadStatus` en las mutaciones de creación existentes (con valor por defecto `NEW`)

### 4.3 Frontend - Componente de Estado

8. **FR-8:** Crear un componente `LeadStatusSelector` que muestre el estado actual como un círculo de color con el nombre del estado

9. **FR-9:** Al hacer click en el selector, debe abrirse un dropdown/popover con todos los estados disponibles

10. **FR-10:** Cada opción del dropdown debe mostrar un círculo de color + nombre del estado

11. **FR-11:** Colores de los estados:
    - `NEW`: Amarillo (`#EAB308` / yellow-500)
    - `CONTACTED`: Rosa (`#EC4899` / pink-500)
    - `IN_CONVERSATIONS`: Gris (`#6B7280` / gray-500)
    - `CLOSED`: Verde (`#22C55E` / green-500)

### 4.4 Frontend - Tabla de Contactos

12. **FR-12:** Agregar una columna "Estado" en la tabla de contactos entre "Teléfono" y el menú de acciones

13. **FR-13:** El `LeadStatusSelector` debe ser interactivo en la tabla, permitiendo cambiar el estado con un click

14. **FR-14:** Al cambiar el estado, hacer la mutación inmediatamente y mostrar feedback visual (loading/success)

### 4.5 Frontend - Filtros

15. **FR-15:** Agregar un componente `LeadStatusFilter` en la página de contactos

16. **FR-16:** El filtro debe permitir seleccionar uno o más estados para filtrar

17. **FR-17:** Mostrar indicador visual cuando el filtro está activo

## 5. Non-Goals (Out of Scope)

- **No** se implementará historial de cambios de estado
- **No** se agregarán notas o comentarios a los cambios de estado
- **No** se permitirá personalizar los colores de los estados
- **No** se agregarán estados personalizados (solo los 4 predefinidos)
- **No** se mostrará el estado en la vista de detalle del contacto (solo en la tabla)
- **No** se implementarán estadísticas o dashboard de estados

## 6. Design Considerations

### 6.1 Referencia Visual

El selector de estado debe verse similar a la imagen de referencia proporcionada:
- Círculos de color compactos
- Dropdown con opciones claramente diferenciadas
- Animación suave al abrir/cerrar el dropdown

### 6.2 Componentes UI a Utilizar

- Usar `Popover` de shadcn/ui para el dropdown
- Usar `Button` variant="ghost" para el trigger
- Círculos implementados con `div` y `rounded-full`

### 6.3 Layout de la Tabla

```
| Contacto | Email | Teléfono | Estado | Acciones |
```

La columna "Estado" debe tener un ancho fijo de aproximadamente 160px.

## 7. Technical Considerations

### 7.1 Backend

- Crear migración Prisma para agregar el campo `leadStatus`
- El enum debe definirse tanto en Prisma como en GraphQL
- La mutación de actualización debe ser atómica y retornar el contacto actualizado

### 7.2 Frontend

- Crear un hook `useUpdateContactLeadStatus` para la mutación
- El componente `LeadStatusSelector` debe ser reutilizable
- Actualizar los tipos TypeScript en `modules/contacts/types/contact.ts`
- Agregar el campo a las queries GraphQL existentes

### 7.3 Archivos a Modificar/Crear

**Backend:**
- `prisma/schema.prisma` - Agregar enum y campo
- `src/contacts/entities/lead-status.enum.ts` - Nuevo enum GraphQL
- `src/contacts/entities/person-contact.entity.ts` - Agregar campo
- `src/contacts/entities/company-contact.entity.ts` - Agregar campo
- `src/contacts/dto/contacts-filter.input.ts` - Agregar filtro
- `src/contacts/contacts.resolver.ts` - Nueva mutación
- `src/contacts/contacts.service.ts` - Lógica de actualización

**Frontend:**
- `modules/contacts/types/contact.ts` - Agregar tipo LeadStatus
- `modules/contacts/components/lead-status-selector.tsx` - Nuevo componente
- `modules/contacts/components/lead-status-filter.tsx` - Nuevo componente
- `modules/contacts/components/contacts-table.tsx` - Agregar columna
- `modules/contacts/graphql/queries.ts` - Agregar campo a queries
- `modules/contacts/graphql/mutations.ts` - Nueva mutación
- `modules/contacts/hooks/use-update-lead-status.ts` - Nuevo hook
- `app/(authenticated)/contacts/page.tsx` - Agregar filtro

## 8. Success Metrics

- Los usuarios pueden ver el estado de todos los contactos en la tabla
- Los usuarios pueden cambiar el estado de un contacto en menos de 2 clicks
- Los usuarios pueden filtrar contactos por estado
- Los nuevos contactos se crean con estado "New" automáticamente

## 9. Decisiones Confirmadas

1. **Cambio de estado inmediato** - Sin diálogo de confirmación para mayor fluidez en la experiencia de usuario

2. **Estado "Closed" simple** - Se mantiene un solo estado "Closed" sin subdivisiones (Closed-Won/Closed-Lost). Se puede considerar para futuras iteraciones si surge la necesidad

