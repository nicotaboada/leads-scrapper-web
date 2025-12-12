# Product Requirements Document: Breadcrumb Navigation Component

## Introduction/Overview

Este documento describe el desarrollo de un componente de navegación breadcrumb para usar en páginas de detalle y subrutas de la aplicación. El componente reemplazará el `SectionHeader` en contextos de subrutas (como `students/[id]`, `teachers/[id]`, `invoices/[id]`, etc.) y proporcionará navegación contextual con acciones opcionales.

El problema que resuelve es la necesidad de contexto de navegación y orientación del usuario cuando está visualizando detalles de un recurso específico, permitiéndole saber dónde está y navegar fácilmente de vuelta a la vista principal.

## Goals

1. Crear un componente breadcrumb reutilizable que muestre la ruta de navegación actual
2. Permitir navegación clickeable en los elementos del breadcrumb para volver a niveles superiores
3. Soportar la visualización de acciones contextuales junto al breadcrumb
4. Proporcionar una experiencia responsive que funcione en dispositivos móviles y desktop
5. Mantener consistencia visual con el sistema de diseño existente usando componentes de shadcn
6. Ser suficientemente flexible para soportar 2-4 niveles de profundidad de navegación

## User Stories

**Como usuario navegando en una página de detalle de estudiante:**
- Quiero ver claramente dónde estoy en la aplicación (ej: "Estudiantes > Nicolás Taboada")
- Quiero poder hacer clic en "Estudiantes" para volver a la lista completa
- Quiero ver las acciones disponibles para ese estudiante en el mismo encabezado

**Como usuario en un dispositivo móvil:**
- Quiero que el breadcrumb y las acciones sean visibles sin overflow horizontal
- Quiero que el layout se adapte mostrando el breadcrumb arriba y las acciones abajo

**Como desarrollador implementando una nueva página de detalle:**
- Quiero poder usar un componente pre-construido sin reimplementar lógica de breadcrumb
- Quiero poder pasar acciones opcionales de forma sencilla
- Quiero que el componente infiera información de la ruta automáticamente cuando sea posible

## Functional Requirements

### Componente Principal: DetailHeader

1. **El sistema debe proporcionar un componente `DetailHeader`** que actúe como wrapper y contenga tanto el breadcrumb como las acciones opcionales.

2. **El `DetailHeader` debe aceptar las siguientes props:**
   - `breadcrumbItems`: Array de objetos que definen los elementos del breadcrumb
   - `actions` (opcional): React nodes o componentes para renderizar botones de acción
   - `className` (opcional): Clases CSS adicionales para personalización

3. **El `DetailHeader` debe distribuir el contenido horizontalmente en desktop:**
   - Breadcrumb alineado a la izquierda
   - Actions alineados a la derecha
   - Espacio flexible entre ambos

4. **El `DetailHeader` debe apilar verticalmente en móvil:**
   - Breadcrumb en la primera fila (arriba)
   - Actions en la segunda fila (abajo)

### Componente Breadcrumb

5. **El sistema debe proporcionar un componente `Breadcrumb`** independiente que renderice la navegación.

6. **Cada elemento del breadcrumb debe incluir:**
   - `icon` (opcional): Icono de Lucide React
   - `label`: Texto a mostrar (ej: "Estudiantes", "Nicolás Taboada")
   - `href` (opcional): URL de navegación cuando es clickeable

7. **Los elementos del breadcrumb deben ser clickeables cuando tienen `href`:**
   - El primer elemento (ruta principal) debe siempre ser clickeable
   - Los elementos intermedios deben ser clickeables si tienen href
   - El último elemento (actual) debe ser visual solamente, sin href

8. **El breadcrumb debe renderizar un separador visual** entre elementos (usar ">" o chevron).

9. **El breadcrumb debe soportar de 2 a 4 niveles de profundidad:**
   - 2 niveles: `Principal > Detalle`
   - 3 niveles: `Principal > Categoría > Detalle`
   - 4 niveles: `Principal > Categoría > Subcategoría > Detalle`

10. **El breadcrumb debe mantener el ícono solo en el primer elemento** (ruta principal).

11. **Los elementos clickeables deben mostrar hover state** para indicar interactividad.

12. **El último elemento del breadcrumb debe tener estilo diferenciado** (ej: color más prominente, font-weight medium).

### Comportamiento de Navegación

13. **Al hacer clic en un elemento clickeable, el sistema debe navegar** usando Next.js Link/navigation (client-side navigation).

14. **El componente NO debe manejar navegación automática basada en la URL actual** - la configuración del breadcrumb debe ser explícita vía props.

### Responsive Design

15. **En viewport desktop (≥768px):**
    - Layout horizontal: breadcrumb izquierda, actions derecha
    - Una sola fila

16. **En viewport móvil (<768px):**
    - Layout vertical (stack)
    - Breadcrumb en fila superior
    - Actions en fila inferior
    - Ambas filas ocupan el ancho completo

17. **En móvil, si el breadcrumb es muy largo, debe truncarse** con ellipsis o wrap según sea necesario.

### Integración

18. **El componente debe ubicarse en** `components/layouts/detail-header.tsx` como componente wrapper.

19. **El breadcrumb interno debe poder exportarse** como `Breadcrumb` para casos de uso avanzados.

20. **El componente debe reemplazar el uso de `SectionHeader`** en páginas de detalle/subrutas.

21. **El componente debe usar componentes de shadcn/ui** existentes donde sea apropiado (Button, Separator, etc.).

## Non-Goals (Out of Scope)

1. **Generación automática de breadcrumbs basada en la URL** - La configuración será explícita
2. **Soporte para breadcrumbs con menús dropdown** en niveles intermedios
3. **Migración automática de páginas existentes** - Cada página deberá adoptar el componente manualmente
4. **Breadcrumbs estructurados para SEO** (schema.org) - Puede añadirse en futuras iteraciones
5. **Animaciones complejas** entre navegaciones de breadcrumb
6. **Internacionalización (i18n)** en esta primera versión - Los labels serán strings estáticos

## Design Considerations

### Inspiración Visual
- El diseño debe tomar inspiración de las imágenes de referencia proporcionadas por el usuario
- Estilo limpio y moderno, consistente con el resto de la aplicación

### Componentes shadcn Recomendados
- Usar componentes de shadcn donde aplique (buttons para actions, separator si es necesario)
- Mantener la paleta de colores y espaciado del design system existente

### Tipografía
- Label de ruta principal: texto normal
- Label de elemento actual (último): font-weight medium o semibold
- Separadores: color muted

### Espaciado
- Padding interno del header: consistente con otros headers de la app
- Gap entre breadcrumb y actions: espacio flexible
- Gap entre elementos del breadcrumb: apropiado para legibilidad

### Estados Interactivos
- Hover en elementos clickeables: cambio de color sutil + cursor pointer
- Focus visible para accesibilidad de teclado
- El elemento actual (último) no debe tener hover state

## Technical Considerations

### Stack Tecnológico
- **React/Next.js**: Componente funcional con TypeScript
- **Tailwind CSS**: Para estilos
- **shadcn/ui**: Componentes base
- **Lucide React**: Para iconos
- **Next.js Link**: Para navegación client-side

### Estructura de Archivos
```
components/
  layouts/
    detail-header.tsx  (Componente principal exportado)
```

### Props TypeScript Interfaces

```typescript
interface BreadcrumbItem {
  icon?: LucideIcon
  label: string
  href?: string
}

interface DetailHeaderProps {
  breadcrumbItems: BreadcrumbItem[]
  actions?: React.ReactNode
  className?: string
}
```

### Dependencias con Otros Módulos
- Debe integrarse bien con el layout existente (`AppLayout`)
- Debe respetar el comportamiento de navegación de Next.js
- Los iconos deben ser consistentes con los usados en `sidebar-nav.ts`

### Consideraciones de Performance
- Evitar re-renders innecesarios con memoización si es necesario
- Los iconos deben cargarse eficientemente (ya son parte de lucide-react)

## Success Metrics

1. **Implementación exitosa**: El componente funciona correctamente en al menos 3 páginas de detalle diferentes (students/[id], teachers/[id], etc.)

2. **Usabilidad**: Los usuarios pueden navegar de vuelta a la lista principal haciendo clic en el breadcrumb sin confusión

3. **Responsive**: El componente se visualiza correctamente en móvil y desktop sin overflow o problemas de layout

4. **Consistencia**: El componente mantiene el look & feel de la aplicación y es visualmente coherente

5. **Developer Experience**: Los desarrolladores pueden implementar el componente en una nueva página en menos de 5 minutos

6. **Accesibilidad**: El componente es navegable por teclado y tiene estados focus visibles

## Open Questions

1. ¿Debemos incluir un separador visual (línea horizontal) debajo del DetailHeader similar al SectionHeader?

2. ¿Los action buttons deben tener un tamaño o variante específica por defecto?

3. ¿Hay algún caso de uso específico donde se necesiten más de 4 niveles de breadcrumb?

4. ¿El componente debe manejar estados de loading para el título dinámico (ej: mientras se carga el nombre del estudiante)?

5. ¿Necesitamos soporte para breadcrumbs truncados con tooltip en móvil si los nombres son muy largos?

## Example Usage

### Caso de Uso: Página de Detalle de Estudiante

```tsx
import { DetailHeader } from 'components/layouts/detail-header'
import { GraduationCap } from 'lucide-react'
import { Button } from 'components/ui/button'

export default function StudentDetailPage({ params }) {
  const student = await getStudent(params.id)

  return (
    <div>
      <DetailHeader
        breadcrumbItems={[
          {
            icon: GraduationCap,
            label: 'Estudiantes',
            href: '/students'
          },
          {
            label: student.name // 'Nicolás Taboada'
          }
        ]}
        actions={
          <>
            <Button variant="outline">Editar</Button>
            <Button>Agregar Nota</Button>
          </>
        }
      />

      {/* Rest of page content */}
    </div>
  )
}
```

### Caso de Uso: Navegación de 3 Niveles

```tsx
<DetailHeader
  breadcrumbItems={[
    {
      icon: Receipt,
      label: 'Finanzas',
      href: '/finanzas'
    },
    {
      label: 'Facturas',
      href: '/finanzas/invoices'
    },
    {
      label: 'FAC-2024-001'
    }
  ]}
  actions={
    <Button variant="destructive">Anular Factura</Button>
  }
/>
```

## Implementation Priority

**Fase 1 (Must Have):**
- Componente DetailHeader con layout responsive
- Breadcrumb de 2 niveles funcional
- Navegación clickeable
- Soporte para actions opcionales

**Fase 2 (Should Have):**
- Soporte para 3-4 niveles
- Refinamiento de estilos responsive
- Estados hover/focus optimizados

**Fase 3 (Nice to Have):**
- Tooltips para elementos truncados
- Animaciones sutiles
- Variantes de estilos (si se necesitan)






