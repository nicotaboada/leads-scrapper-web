# PRD: Sidebar Navigation Menu (Desktop/Web)

## Introduction/Overview

Este documento describe la implementación de un sidebar de navegación principal para la aplicación web. El sidebar será el componente de navegación principal que permitirá a los usuarios moverse entre las diferentes secciones de la plataforma. El componente estará diseñado con capacidad de expansión/colapso y será responsive para desktop. La versión mobile será implementada en una fase posterior como un componente separado.

### Problema que resuelve

Actualmente la aplicación necesita un sistema de navegación consistente y accesible que permita a los usuarios moverse eficientemente entre las diferentes secciones de la plataforma (Dashboard, Students, Teachers, Classes, Finanzas, Settings).

### Goal

Crear un sidebar de navegación moderno, accesible y fácil de usar que sirva como la columna vertebral de la navegación en la aplicación, con capacidad de expandirse/colapsarse para optimizar el espacio de pantalla.

## Goals

1. Implementar un sidebar completamente funcional con todas las rutas de navegación principales
2. Proporcionar una experiencia de usuario fluida con animaciones suaves
3. Incluir soporte para sub-menús colapsables (acordeón) para organización jerárquica
4. Mostrar indicadores visuales claros de la ruta activa
5. Optimizar el espacio de pantalla con funcionalidad de expansión/colapso
6. Preparar la arquitectura para soportar permisos basados en roles en el futuro
7. Mantener accesibilidad y usabilidad con tooltips cuando el sidebar está colapsado

## User Stories

### Historia 1: Navegación Básica
**Como** usuario de la plataforma
**Quiero** ver todas las opciones de navegación disponibles en un sidebar lateral
**Para que** pueda acceder rápidamente a cualquier sección de la aplicación

**Criterios de Aceptación:**
- El sidebar muestra todas las rutas principales con íconos y labels
- Al hacer click en una ruta, navego a la página correspondiente
- La ruta activa está visualmente resaltada (fondo verde + texto destacado)

### Historia 2: Expansión y Colapso
**Como** usuario trabajando con contenido que requiere espacio
**Quiero** poder colapsar el sidebar a una versión minimizada
**Para que** pueda tener más espacio de pantalla para el contenido principal

**Criterios de Aceptación:**
- Hay un botón visible para expandir/colapsar el sidebar
- Al colapsar, solo se muestran los íconos
- Al expandir, se muestran íconos + labels
- La transición es suave y animada
- Cuando está colapsado, aparece un tooltip con el nombre al hacer hover sobre un ícono

### Historia 3: Sub-menús (Finanzas)
**Como** usuario que necesita acceder a opciones de finanzas
**Quiero** ver las sub-opciones organizadas bajo "Finanzas"
**Para que** pueda navegar a Facturación o Invoices sin saturar el menú principal

**Criterios de Aceptación:**
- "Finanzas" muestra un indicador de que tiene sub-items (chevron/arrow)
- Al hacer click en "Finanzas", se expande/colapsa el acordeón
- Se muestran las sub-rutas: Facturación e Invoices
- Las sub-rutas son navegables y también muestran estado activo
- El acordeón funciona tanto en estado expandido como colapsado del sidebar

### Historia 4: Identidad Visual
**Como** usuario de la escuela
**Quiero** ver el logo de la escuela en la parte superior del sidebar
**Para que** tenga una referencia visual clara de la plataforma en la que estoy trabajando

**Criterios de Aceptación:**
- El logo está visible en la parte superior del sidebar
- El logo se adapta al estado expandido/colapsado (versión completa vs. versión reducida)
- El logo es clickeable y redirige al dashboard o home

## Functional Requirements

### FR-1: Estructura del Sidebar
1.1. El sidebar debe estar fijo en el lado izquierdo de la pantalla
1.2. El sidebar debe tener un ancho de ~240px cuando está expandido
1.3. El sidebar debe tener un ancho de ~64px cuando está colapsado
1.4. El sidebar debe extenderse verticalmente en toda la altura de la viewport

### FR-2: Logo de la Escuela
2.1. Debe mostrarse un logo en la parte superior del sidebar
2.2. El logo debe adaptarse al estado expandido/colapsado
2.3. El logo debe ser clickeable y redirigir a `/dashboard` o `/`
2.4. Debe haber espacio/padding adecuado alrededor del logo

### FR-3: Botón de Expansión/Colapso
3.1. Debe existir un botón claramente visible para expandir/colapsar el sidebar
3.2. El botón debe tener un ícono que indique la acción (ej: Menu, ChevronLeft/Right)
3.3. Al hacer click, el sidebar debe cambiar entre estado expandido y colapsado
3.4. La transición debe ser suave con animación (duración ~200-300ms)
3.5. El sidebar debe iniciar siempre en estado expandido

### FR-4: Rutas de Navegación
4.1. El sidebar debe mostrar las siguientes rutas principales:
   - Dashboard (`/dashboard`) - Label: "Dashboard"
   - Students (`/students`) - Label: "Estudiantes"
   - Teachers (`/teachers`) - Label: "Profesores"
   - Classes (`/classes`) - Label: "Clases"
   - Finanzas (acordeón, no es ruta directa)
     - Facturación (`/finanzas/facturacion`) - Label: "Facturación"
     - Invoices (`/finanzas/invoices`) - Label: "Facturas"
   - Settings (`/settings`) - Label: "Configuración"

4.2. Cada ruta debe tener un ícono representativo de Lucide React
4.3. En estado expandido, cada ruta muestra ícono + label
4.4. En estado colapsado, cada ruta muestra solo el ícono
4.5. Los labels deben estar en español según la especificación de FR-4.1

### FR-5: Íconos (Lucide React)
5.1. Todos los íconos deben provenir de la librería `lucide-react`
5.2. Sugerencias de íconos para cada ruta:
   - Dashboard: `LayoutDashboard` o `PieChart`
   - Students: `GraduationCap` o `Users`
   - Teachers: `UserCheck` o `Briefcase`
   - Classes: `BookOpen` o `Library`
   - Finanzas: `DollarSign` o `Wallet`
   - Facturación: `FileText` o `Receipt`
   - Invoices: `FileSpreadsheet` o `ScrollText`
   - Settings: `Settings` o `Cog`
5.3. Los íconos deben tener un tamaño consistente (ej: 20x20px)

### FR-6: Sub-menús (Acordeón)
6.1. El item "Finanzas" debe funcionar como un acordeón
6.2. Debe mostrar un indicador visual (chevron/arrow) que indique si está expandido o colapsado
6.3. Al hacer click en "Finanzas", debe expandir/colapsar las sub-rutas
6.4. Las sub-rutas deben tener indentación visual cuando el sidebar está expandido
6.5. Cuando el sidebar está colapsado, el hover sobre "Finanzas" puede mostrar las sub-rutas en un tooltip/popover
6.6. Solo un acordeón puede estar expandido a la vez (opcional, según diseño)

### FR-7: Indicador de Ruta Activa
7.1. La ruta activa debe tener un fondo de color distintivo (verde según las imágenes de referencia)
7.2. El texto e ícono de la ruta activa deben tener un color que contraste con el fondo
7.3. Si estoy en una sub-ruta (ej: `/finanzas/facturacion`), tanto "Finanzas" como "Facturación" deben mostrar indicadores de estado activo
7.4. El indicador debe actualizarse automáticamente al navegar entre rutas

### FR-8: Tooltips (Estado Colapsado)
8.1. Cuando el sidebar está colapsado, al hacer hover sobre un ícono debe aparecer un tooltip
8.2. El tooltip debe mostrar el label de la ruta en español
8.3. El tooltip debe aparecer al lado derecho del ícono
8.4. El tooltip debe tener un pequeño delay antes de aparecer (~200ms)
8.5. Los tooltips deben usar un componente accesible (ej: Shadcn Tooltip)

### FR-9: Animaciones
9.1. La expansión/colapso del sidebar debe tener una animación suave
9.2. La apertura/cierre de acordeones debe tener animación
9.3. El hover sobre items debe tener una transición suave de color/fondo
9.4. Las animaciones deben respetar `prefers-reduced-motion` para accesibilidad

### FR-10: Navegación Activa
10.1. Al hacer click en un item de navegación, debe navegar a la ruta correspondiente usando Next.js Link
10.2. La navegación debe ser instantánea (client-side navigation)
10.3. No debe haber refresh de página completa

### FR-11: Preparación para Roles y Permisos
11.1. Aunque todas las rutas son visibles para todos los usuarios inicialmente, la estructura del código debe permitir fácilmente agregar lógica de permisos
11.2. Cada item de navegación debe tener una estructura de datos que pueda incluir campos como `roles`, `permissions` en el futuro
11.3. Considerar una estructura de configuración centralizada para las rutas del sidebar

## Non-Goals (Out of Scope)

1. **Versión Mobile del Sidebar**: La implementación mobile con overlay será una task separada futura
2. **Lógica de Permisos/Roles**: Solo se prepara la estructura, no se implementa la lógica de autorización
3. **Páginas de destino**: Este PRD solo cubre el sidebar, no las páginas a las que navega
4. **Búsqueda en el Sidebar**: No se incluye funcionalidad de búsqueda de rutas
5. **Favoritos o Pins**: No se permite marcar rutas como favoritas
6. **Drag & Drop**: No se permite reordenar items del sidebar
7. **Temas/Skins personalizables**: Solo se implementa el tema base con soporte para dark mode estándar
8. **Multi-nivel profundo**: Solo se soporta un nivel de sub-menús (Finanzas → sub-items), no anidación mayor

## Design Considerations

### Componentes UI
- Utilizar **Shadcn UI** como base para componentes (Tooltip, Sheet si es necesario)
- Utilizar **Lucide React** para todos los íconos
- Utilizar **Tailwind CSS** para estilos

### Estructura de Componentes Sugerida
```
components/layouts/
  ├── sidebar/
  │   ├── sidebar.tsx              # Componente principal (Web/Desktop)
  │   ├── sidebar-header.tsx       # Logo y botón de toggle
  │   ├── sidebar-nav.tsx          # Lista de navegación
  │   ├── sidebar-nav-item.tsx     # Item individual de navegación
  │   ├── sidebar-nav-accordion.tsx # Sub-menú acordeón
  │   └── sidebar-context.tsx      # Context para estado expandido/colapsado
```

### Referencias Visuales
- Las imágenes proporcionadas muestran:
  - Sidebar expandido con fondo claro/oscuro
  - Item activo con fondo verde
  - Logo en la parte superior
  - Sub-items con indentación
  - Íconos de Lucide React

### Dark Mode
- El sidebar debe soportar dark mode usando `next-themes`
- Los colores deben adaptarse automáticamente al tema activo
- El fondo, texto, y colores de hover deben tener versiones para light/dark

### Accesibilidad
- Todos los botones e items de navegación deben ser accesibles por teclado
- Usar atributos ARIA apropiados (`aria-expanded`, `aria-current`, etc.)
- Asegurar contraste de colores adecuado
- Soportar navegación con `Tab`, `Enter`, `Space`, `Arrow keys`

## Technical Considerations

### Dependencias
- `lucide-react` - Para íconos (verificar si ya está instalado)
- `next/link` - Para navegación (ya incluido en Next.js)
- `next-themes` - Para dark mode (verificar si ya está instalado)
- Shadcn UI components: `tooltip`, potencialmente `popover` o `sheet`

### Estado del Sidebar
- Usar un Context (`SidebarContext`) para manejar el estado expandido/colapsado
- El estado inicial debe ser `expanded: true`
- No persistir el estado en localStorage (según requerimiento)

### Rutas y Configuración
- Crear un archivo de configuración centralizado (ej: `lib/config/sidebar-nav.ts`) con la estructura de todas las rutas
- Esto facilitará agregar/modificar rutas y preparar para permisos futuros

Ejemplo de estructura de datos:
```typescript
interface NavItem {
  id: string
  label: string
  href?: string
  icon: LucideIcon
  children?: NavItem[]
  roles?: string[] // Para futuro
  permissions?: string[] // Para futuro
}
```

### Routing
- Usar `usePathname()` de `next/navigation` para determinar la ruta activa
- Comparar pathname con las rutas definidas para aplicar estilos activos

### Performance
- Usar `React.memo` para optimizar re-renders de items de navegación
- Lazy load de íconos si es necesario (aunque Lucide es bastante liviano)

### Testing
- Asegurar que la navegación funciona correctamente
- Verificar que el estado expandido/colapsado se actualiza
- Probar acordeones y sub-menús
- Verificar indicadores de ruta activa
- Probar tooltips en estado colapsado
- Verificar accesibilidad con teclado

## Success Metrics

1. **Funcionalidad completa**: Todas las rutas definidas son navegables
2. **Usabilidad**: El sidebar se puede expandir/colapsar sin problemas
3. **Rendimiento**: Las animaciones son fluidas (60fps)
4. **Accesibilidad**: Pasa auditoría de accesibilidad (Lighthouse, axe)
5. **Código limpio**: Pasa linter sin errores, sigue las convenciones del proyecto
6. **Responsive**: Funciona correctamente en tamaños de desktop (>768px)
7. **Mantenibilidad**: La estructura permite agregar/modificar rutas fácilmente
8. **Preparación futura**: La arquitectura soporta agregar lógica de roles/permisos sin refactor mayor

## Open Questions

1. **Color exacto del indicador activo**: ¿Hay un color específico de la paleta del proyecto o usar un verde genérico?
2. **Comportamiento del logo colapsado**: ¿Mostrar una versión reducida del logo o solo un ícono?
3. **Ancho breakpoint**: ¿A partir de qué ancho se considera "desktop" y se muestra este sidebar? (ej: `md:768px`, `lg:1024px`)
4. **Posición del botón toggle**: ¿Dentro del sidebar en el header, o en el navbar principal?
5. **Backdrop/Overlay**: ¿Se necesita un backdrop cuando el sidebar está abierto en tablets?
6. **Sub-menús en colapsado**: ¿Mostrar sub-items en tooltip/popover o solo navegar al padre?
7. **Traducción de "Invoices"**: ¿Se prefiere "Invoices" o "Facturas" en español?
8. **Separadores visuales**: ¿Se deben incluir líneas divisoras entre secciones (como en la segunda imagen)?

## Implementation Notes

- Este PRD se enfoca exclusivamente en la versión **Desktop/Web** del sidebar
- La versión mobile será un componente separado que se implementará en una fase posterior
- El componente padre puede hacer un check de tamaño de pantalla para decidir qué versión mostrar
- Mantener la lógica de negocio del sidebar web limpia y separada del mobile
- Considerar crear una abstracción compartida para la configuración de rutas que ambas versiones puedan usar

