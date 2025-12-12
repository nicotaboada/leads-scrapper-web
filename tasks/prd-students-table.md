# PRD: Tabla de Estudiantes

## Introduction/Overview

Este documento describe la implementación de la tabla principal de estudiantes que se mostrará en la ruta `/estudiantes`. Esta tabla será el componente central de la página y permitirá a los usuarios visualizar información clave de todos los estudiantes registrados en el sistema, incluyendo sus datos personales, contacto, cursos asignados y estado.

**Problema que resuelve:** Actualmente no existe una interfaz centralizada para visualizar y gestionar la lista completa de estudiantes. Esta tabla proporcionará una vista consolidada de todos los estudiantes con acceso rápido a sus detalles y opciones de gestión.

## Goals

1. Crear una tabla responsive y visualmente clara que muestre todos los estudiantes del sistema
2. Proporcionar acceso rápido a la información de contacto y cursos de cada estudiante
3. Permitir navegación fluida al detalle de cada estudiante
4. Implementar paginación eficiente para manejar grandes volúmenes de datos
5. Facilitar acciones rápidas de gestión (editar, eliminar, activar/desactivar) desde la tabla

## User Stories

**Como administrador del sistema:**
- Quiero ver una lista de todos los estudiantes para tener una vista general del sistema
- Quiero ver los datos de contacto de cada estudiante para poder comunicarme con ellos rápidamente
- Quiero ver los cursos asignados a cada estudiante para entender su carga académica
- Quiero acceder al detalle de un estudiante haciendo click en su nombre
- Quiero poder editar, eliminar o cambiar el estado de un estudiante desde la tabla

**Como usuario del sistema:**
- Quiero que la información sea fácil de leer y escanear visualmente
- Quiero entender rápidamente el estado de cada estudiante (activo/inactivo)
- Quiero navegar entre páginas de resultados de forma intuitiva

## Functional Requirements

### FR-1: Estructura de la Tabla
La tabla debe incluir las siguientes columnas en este orden:
1. **Estudiante** - Avatar + Nombre completo
2. **Datos de contacto** - Email y teléfono
3. **Cursos** - Lista de cursos asignados
4. **Estado** - Estado activo/desactivado
5. **Fecha de creación** - Fecha de registro
6. **Acciones** - Menú de opciones

### FR-2: Columna Estudiante
- Debe mostrar un componente Avatar con las iniciales o foto del estudiante
- Debe mostrar el nombre completo del estudiante (nombre + apellido)
- El nombre debe ser clickeable y tener cursor pointer
- Al hacer click en el nombre, debe navegar a `/students/[id]`
- El resto de la fila NO debe ser clickeable

### FR-3: Columna Datos de Contacto
- Debe mostrar el email en una fila con un icono de email
- Debe mostrar el teléfono en otra fila con un icono de teléfono
- Formato:
  ```
  📧 email@ejemplo.com
  📱 00000
  ```
- Si el email no existe, NO mostrar la fila del email
- Si el teléfono no existe, NO mostrar la fila del teléfono
- Si ambos no existen, mostrar celda vacía o mensaje apropiado

### FR-4: Columna Cursos
- Debe mostrar chips/badges con los nombres de los cursos
- Cada chip debe incluir:
  - Un icono representativo del curso (a definir por el desarrollador)
  - El nombre del curso
- Un estudiante puede pertenecer a múltiples cursos, mostrar todos los chips necesarios
- Los chips deben estar organizados de forma horizontal y wrappear si son muchos

### FR-5: Columna Estado
- Debe mostrar un chip/badge con el estado del estudiante
- Dos posibles estados:
  - **Activo**: Chip con fondo verde/tono verde
  - **Desactivado**: Chip con fondo gris
- El estado debe ser claramente diferenciable visualmente

### FR-6: Columna Fecha de Creación
- Debe mostrar la fecha en formato legible (DD/MM/YYYY o formato local apropiado)
- Debe representar la fecha en que el estudiante fue registrado en el sistema

### FR-7: Columna Acciones
- Debe incluir un botón con icono de tres puntos verticales (⋮)
- Al hacer click debe mostrar un menú dropdown con las siguientes opciones:
  1. **Editar** - Permite editar los datos del estudiante
  2. **Eliminar** - Permite eliminar el estudiante del sistema
  3. **Activar/Desactivar** - Permite cambiar el estado del estudiante

### FR-8: Paginación
- La tabla debe mostrar 25 estudiantes por página
- Debe incluir controles de paginación en la parte inferior
- Formato de paginación:
  - **Lado izquierdo**: "Mostrando X de Y resultados"
  - **Lado derecho**: "Página X de Y" + controles de navegación
- Controles de navegación:
  - `<<` Primera página
  - `<` Página anterior
  - `>` Página siguiente
  - `>>` Última página
- Los controles deben estar deshabilitados cuando no sean aplicables (ej: `<<` y `<` en la primera página)

### FR-9: Datos Mock
- Por ahora, la tabla debe utilizar datos hardcodeados/mock
- Crear al menos 3-5 estudiantes de ejemplo con datos variados para probar todos los casos:
  - Estudiante con email y teléfono
  - Estudiante solo con email
  - Estudiante solo con teléfono
  - Estudiante sin datos de contacto
  - Estudiante con múltiples cursos
  - Estudiante con un solo curso
  - Estudiantes activos e inactivos

### FR-10: Implementación Técnica
- Utilizar el componente Table de shadcn/ui
- Seguir la arquitectura del proyecto: componente en `modules/students/components/`
- El componente debe llamarse `students-table.tsx`
- Usar TypeScript con tipos bien definidos
- Implementar el componente siguiendo los principios de clean code del proyecto

## Non-Goals (Out of Scope)

1. **NO** incluir funcionalidad de búsqueda en esta fase
2. **NO** incluir filtros por estado, curso, etc. en esta fase
3. **NO** implementar ordenamiento de columnas (sortable) en esta fase
4. **NO** integrar con backend real (usar datos mock)
5. **NO** implementar las acciones del menú (Editar, Eliminar, Activar/Desactivar) - solo la UI
6. **NO** incluir selección múltiple de filas
7. **NO** incluir exportación de datos
8. **NO** incluir vista de tabla responsive/mobile diferente

## Design Considerations

### Referencia Visual
- Usar como inspiración la primera imagen adjunta para el diseño general de la tabla
- Usar la segunda imagen como referencia para el formato de datos de contacto (email/teléfono en filas separadas)
- Usar la tercera imagen como referencia para el diseño de paginación

### Componentes UI
- **Table**: Componente base de shadcn/ui
- **Avatar**: Componente de shadcn/ui para fotos/iniciales
- **Badge/Chip**: Para cursos y estado
- **DropdownMenu**: Para el menú de acciones
- **Button**: Para controles de paginación

### Estilos
- Mantener consistencia con el design system existente
- Usar Tailwind CSS para estilos
- El chip de "Activo" debe usar tonos verdes (ej: `bg-green-100 text-green-800`)
- El chip de "Desactivado" debe usar tonos grises (ej: `bg-gray-100 text-gray-800`)
- Los iconos de email y teléfono deben ser de lucide-react o el set de iconos del proyecto

### Accesibilidad
- Todos los botones deben tener aria-labels apropiados
- El nombre del estudiante debe ser claramente identificable como enlace
- Los estados de paginación deshabilitados deben ser visualmente claros

## Technical Considerations

### Estructura de Carpetas
```
modules/
  students/
    components/
      students-table.tsx     # Componente principal
    types/
      student.ts             # Tipos TypeScript
```

### Tipos TypeScript
Definir interfaces para:
- `Student`: Datos del estudiante
- `Course`: Información del curso
- `ContactInfo`: Email y teléfono (opcionales)
- `StudentStatus`: 'active' | 'inactive'

### Integración Futura
- El componente debe estar preparado para recibir datos via props
- Facilitar la futura integración con GraphQL/Supabase
- Los callbacks de acciones (edit, delete, toggle status) deben ser props

### Performance
- Considerar memoización si la tabla crece en complejidad
- La paginación debe ser eficiente incluso con muchos estudiantes

## Success Metrics

1. **Funcionalidad Completa**: Todas las columnas se renderizan correctamente con datos mock
2. **Navegación Funcional**: Click en nombre de estudiante navega correctamente a página de detalle
3. **Paginación Operativa**: Controles de paginación funcionan correctamente
4. **UI Consistente**: El diseño sigue las referencias visuales proporcionadas
5. **Código Limpio**: El código pasa linters y sigue las convenciones del proyecto
6. **Responsive**: La tabla es usable en diferentes tamaños de pantalla

## Open Questions

1. ¿Qué icono específico usar para los cursos en los chips? (Desarrollador puede decidir)
2. ¿Mostrar tooltip con información adicional al hacer hover sobre los cursos?
3. ¿Qué mensaje mostrar cuando no hay datos de contacto disponibles?
4. ¿Implementar skeleton loading para futura integración con datos reales?
5. ¿Agregar animaciones/transiciones en las interacciones?

## Implementation Notes

### Datos Mock Sugeridos
```typescript
const mockStudents = [
  {
    id: '1',
    firstName: 'Juan',
    lastName: 'Pérez',
    avatar: null,
    email: 'juan.perez@email.com',
    phone: '+54 11 1234-5678',
    courses: ['Inglés Básico', 'Conversación'],
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    firstName: 'María',
    lastName: 'González',
    avatar: null,
    email: 'maria.gonzalez@email.com',
    phone: null,
    courses: ['Inglés Avanzado'],
    status: 'active',
    createdAt: '2024-02-20'
  },
  {
    id: '3',
    firstName: 'Carlos',
    lastName: 'Rodríguez',
    avatar: null,
    email: null,
    phone: '+54 11 9876-5432',
    courses: ['Inglés Intermedio', 'Business English', 'TOEFL Prep'],
    status: 'inactive',
    createdAt: '2023-12-10'
  }
  // ... más estudiantes
]
```

### Próximos Pasos (Fuera del Alcance Actual)
1. Integración con backend real
2. Implementación de búsqueda y filtros
3. Funcionalidad real de editar/eliminar/activar-desactivar
4. Ordenamiento de columnas
5. Acciones masivas (bulk actions)






