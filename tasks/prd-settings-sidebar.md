# PRD: Settings Section with Secondary Sidebar Navigation

## 1. Introduction/Overview

Esta feature introduce una nueva sección de "Configuración" (Settings) con un layout de doble sidebar. Cuando el usuario navega a la sección de configuración, se muestra un sidebar secundario dedicado a la navegación dentro de settings, similar al patrón de UI utilizado por aplicaciones como "La Pyme".

El objetivo es crear una estructura escalable para las configuraciones del sistema, comenzando con la migración de "Tags" como primera sección dentro de Configuración.

### Problema que resuelve

- Actualmente "Tags" está en el sidebar principal como un ítem independiente
- No existe una estructura clara para agrupar configuraciones del sistema
- A medida que se agreguen más opciones de configuración, el sidebar principal se volverá desordenado

## 2. Goals

1. Crear un layout de doble sidebar para la sección de Configuración
2. Migrar la funcionalidad de Tags a `/settings/tags`
3. Establecer una estructura escalable para futuras secciones de configuración
4. Mantener una experiencia de usuario consistente con el resto de la aplicación

## 3. User Stories

### US-1: Navegación a Configuración
**Como** usuario autenticado  
**Quiero** hacer click en "Configuración" en el sidebar principal  
**Para** acceder a la sección de configuración del sistema

**Criterios de aceptación:**
- Al hacer click en "Configuración", el usuario es redirigido a `/settings`
- La página `/settings` redirige automáticamente a `/settings/tags`
- El sidebar principal permanece visible

### US-2: Sidebar secundario de Settings
**Como** usuario en la sección de Configuración  
**Quiero** ver un sidebar secundario con las opciones de configuración  
**Para** navegar fácilmente entre las diferentes secciones de settings

**Criterios de aceptación:**
- Se muestra un sidebar secundario a la derecha del sidebar principal
- El sidebar secundario muestra "Tags" como primera opción
- El sidebar secundario siempre está visible (no colapsable)
- El ítem activo está visualmente resaltado

### US-3: Gestión de Tags desde Settings
**Como** usuario  
**Quiero** gestionar Tags desde `/settings/tags`  
**Para** mantener todas las configuraciones organizadas en un solo lugar

**Criterios de aceptación:**
- La funcionalidad completa de Tags está disponible en `/settings/tags`
- La página mantiene toda la funcionalidad existente (crear, editar, eliminar tags)
- La ruta `/tags` ya no existe o redirige a `/settings/tags`

## 4. Functional Requirements

### FR-1: Layout de Configuración
1. Crear un layout específico para `/settings/*` que incluya el sidebar secundario
2. El sidebar secundario debe renderizarse entre el sidebar principal y el contenido
3. El ancho del sidebar secundario debe ser aproximadamente 220-250px
4. El sidebar secundario debe tener un header con el título "Configuración"

### FR-2: Sidebar Secundario de Settings
1. Mostrar una lista de navegación con las secciones de settings
2. Inicialmente solo incluir "Tags" en la lista
3. Cada ítem debe tener un icono y un label
4. El ítem activo debe tener un estilo visual distintivo (background highlight)
5. El sidebar debe ser siempre visible (no colapsable)

### FR-3: Estructura de Rutas
1. Mantener `/settings` como ruta base
2. Implementar redirect automático de `/settings` a `/settings/tags`
3. Crear la ruta `/settings/tags` con la funcionalidad de tags
4. Remover `/tags` del sidebar principal
5. Opcional: Crear redirect de `/tags` a `/settings/tags` para URLs legacy

### FR-4: Actualización del Sidebar Principal
1. Mantener "Configuración" como ítem en el sidebar principal
2. Al hacer click, navegar a `/settings` (que redirige a `/settings/tags`)
3. Remover "Tags" como ítem independiente del sidebar principal
4. El ítem "Configuración" debe mostrarse como activo cuando el usuario está en cualquier ruta `/settings/*`

## 5. Non-Goals (Out of Scope)

- **No** implementar otras secciones de configuración (solo Tags por ahora)
- **No** hacer el sidebar secundario colapsable
- **No** implementar breadcrumbs dentro de settings
- **No** cambiar la funcionalidad interna de Tags (solo mover ubicación)
- **No** implementar búsqueda dentro del sidebar de settings
- **No** implementar permisos/roles para secciones de settings

## 6. Design Considerations

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                           Header                                 │
├──────────┬──────────────┬───────────────────────────────────────┤
│          │              │                                        │
│  Main    │  Settings    │                                        │
│ Sidebar  │  Sidebar     │         Content Area                   │
│          │              │                                        │
│ - Dash   │ Configuración│         (Tags Table, etc.)             │
│ - Runs   │ ──────────── │                                        │
│ - Cont.  │ • Tags       │                                        │
│ - Config │              │                                        │
│          │              │                                        │
│          │              │                                        │
└──────────┴──────────────┴───────────────────────────────────────┘
```

### UI/UX Requirements

1. **Sidebar secundario:**
   - Background: Similar al sidebar principal o ligeramente diferente para diferenciación
   - Border: Línea sutil separando del contenido principal
   - Padding consistente con el diseño existente

2. **Header del sidebar secundario:**
   - Título "Configuración" en la parte superior
   - Tipografía: Font weight semi-bold, tamaño similar a títulos de sección

3. **Items de navegación:**
   - Hover state con background highlight
   - Active state con background más prominente
   - Iconos a la izquierda del texto
   - Transiciones suaves en hover/active states

### Referencia Visual
- Seguir el patrón de la imagen de referencia de "La Pyme" proporcionada
- Mantener consistencia con el design system existente (Shadcn UI)

## 7. Technical Considerations

### Archivos a Crear/Modificar

1. **Nuevo: `app/(authenticated)/settings/layout.tsx`**
   - Layout wrapper para todas las rutas de settings
   - Incluye el sidebar secundario de settings

2. **Nuevo: `components/layouts/settings-sidebar.tsx`**
   - Componente del sidebar secundario
   - Configuración de navegación para settings

3. **Nuevo: `lib/config/settings-nav.ts`**
   - Configuración de items de navegación para settings
   - Similar a `sidebar-nav.ts` pero para settings

4. **Mover: `app/(authenticated)/tags/page.tsx` → `app/(authenticated)/settings/tags/page.tsx`**
   - Mover la página de tags a la nueva ubicación

5. **Modificar: `lib/config/sidebar-nav.ts`**
   - Remover "Tags" del array de navegación

6. **Modificar: `lib/config/routes.ts`**
   - Actualizar `ROUTES.TAGS` a `/settings/tags`
   - Agregar rutas de settings si es necesario

7. **Modificar: `app/(authenticated)/settings/page.tsx`**
   - Implementar redirect a `/settings/tags`

### Dependencias
- No se requieren nuevas dependencias
- Utilizar componentes existentes de Shadcn UI
- Reutilizar estilos del sidebar principal donde sea posible

### Consideraciones de Routing
- Next.js App Router con route groups
- Redirect server-side en `/settings/page.tsx`

## 8. Success Metrics

1. **Funcionalidad completa:** Tags funciona correctamente en `/settings/tags`
2. **Navegación fluida:** El usuario puede navegar a configuración y ver el sidebar secundario sin problemas
3. **Consistencia visual:** El nuevo sidebar secundario se integra visualmente con el diseño existente
4. **Zero regressions:** Toda la funcionalidad existente de Tags sigue funcionando

## 9. Open Questions

1. ¿Se debe implementar un redirect de `/tags` a `/settings/tags` para mantener compatibilidad con URLs compartidas?
2. ¿El título del header debería ser "Configuración" o "Settings"?
3. ¿Se necesita algún tipo de animación/transición al entrar a la sección de settings?

---

## Implementation Checklist

- [ ] Crear `lib/config/settings-nav.ts` con configuración de navegación
- [ ] Crear `components/layouts/settings-sidebar.tsx`
- [ ] Crear `app/(authenticated)/settings/layout.tsx` con el nuevo layout
- [ ] Mover tags page a `app/(authenticated)/settings/tags/page.tsx`
- [ ] Actualizar `lib/config/routes.ts`
- [ ] Actualizar `lib/config/sidebar-nav.ts` (remover Tags)
- [ ] Implementar redirect en `app/(authenticated)/settings/page.tsx`
- [ ] Eliminar carpeta `app/(authenticated)/tags/`
- [ ] Probar navegación completa
- [ ] Verificar que Tags funciona correctamente en nueva ubicación

