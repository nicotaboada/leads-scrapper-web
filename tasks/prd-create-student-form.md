# PRD: Crear Estudiante

## 1. Introduction/Overview

Esta funcionalidad permite a los usuarios del sistema crear nuevos estudiantes mediante un formulario modal. El objetivo es proporcionar una interfaz intuitiva y validada para ingresar la información básica de un estudiante antes de que sean dados de alta en el sistema.

Actualmente, el botón "Nuevo Estudiante" ya existe en la página de estudiantes (`app/(authenticated)/students/page.tsx`), pero no tiene funcionalidad implementada. Esta feature completará la implementación del flujo de creación.

**Problema que resuelve:** Permitir a los administradores/usuarios agregar nuevos estudiantes al sistema de manera rápida y con validación adecuada de datos.

## 2. Goals

1. Implementar un formulario modal (Sheet) para crear estudiantes
2. Validar los datos del estudiante antes de intentar guardarlos
3. Proporcionar feedback visual claro sobre el estado de la operación (éxito/error)
4. Preparar la estructura para integración futura con el backend
5. Mantener una experiencia de usuario fluida y sin interrupciones

## 3. User Stories

**Como** administrador del sistema
**Quiero** poder crear nuevos estudiantes desde la página de estudiantes
**Para** dar de alta rápidamente a los estudiantes que se inscriben en la institución

**Como** usuario del sistema
**Quiero** recibir validación inmediata de los datos que ingreso
**Para** corregir errores antes de intentar guardar el estudiante

**Como** usuario del sistema
**Quiero** ver confirmación visual cuando un estudiante se crea exitosamente
**Para** saber que la operación se completó correctamente

## 4. Functional Requirements

### 4.1 UI/UX Requirements

1. **Sheet Component**: El formulario debe mostrarse en un Sheet de shadcn/ui que se desliza desde el lado derecho de la pantalla.

2. **Trigger**: El Sheet debe abrirse cuando se hace click en el botón "Nuevo Estudiante" existente en la página de estudiantes.

3. **Título del Sheet**: Debe mostrar "Crear Estudiante" como título principal.

### 4.2 Form Fields

El formulario debe contener los siguientes campos:

4. **Nombre** (firstName)
   - Tipo: Input de texto
   - Validación: Requerido
   - Label: "Nombre"
   - Placeholder: "Ingrese el nombre"

5. **Apellido** (lastName)
   - Tipo: Input de texto
   - Validación: Requerido
   - Label: "Apellido"
   - Placeholder: "Ingrese el apellido"

6. **Email**
   - Tipo: Input de email
   - Validación:
     - Requerido
     - Formato de email válido
   - Label: "Email"
   - Placeholder: "estudiante@ejemplo.com"

7. **Curso** (course)
   - Tipo: Select dropdown
   - Validación: Opcional
   - Label: "Curso"
   - Opciones (mock data):
     - "Curso 1"
     - "Curso 2"
     - "Curso 3"
   - Placeholder: "Seleccione un curso (opcional)"

### 4.3 Validation

8. La validación debe ejecutarse:
   - En tiempo real mientras el usuario escribe (mostrar errores dinámicamente)
   - Al hacer submit del formulario (validación final antes de procesar)

9. Los mensajes de error deben mostrarse debajo de cada campo con el error correspondiente:
   - Nombre vacío: "El nombre es requerido"
   - Apellido vacío: "El apellido es requerido"
   - Email vacío: "El email es requerido"
   - Email inválido: "Ingrese un email válido"

10. El botón de "Guardar" debe estar habilitado solo cuando el formulario sea válido.

### 4.4 Form Submission

11. Al hacer click en "Guardar", el sistema debe:
    - Validar todos los campos
    - Si hay errores, mostrarlos y no proceder
    - Si todo es válido, ejecutar la lógica de guardado

12. **Lógica de guardado (temporal - sin API)**:
    - Loguear los datos del formulario en la consola
    - Simular un delay de 500ms para imitar una llamada API
    - Simular éxito (no implementar lógica de error por ahora)

13. **En caso de éxito**:
    - Cerrar el Sheet
    - Resetear todos los campos del formulario
    - Mostrar un toast de éxito con el mensaje: "Estudiante creado exitosamente"

14. **En caso de error** (para implementación futura):
    - Mantener el Sheet abierto
    - Mostrar un toast de error con el mensaje: "Error al crear el estudiante. Intente nuevamente"
    - Mantener los datos ingresados en el formulario

### 4.5 Form Actions

15. El formulario debe tener dos botones en el footer:
    - **Cancelar**: Cierra el Sheet sin guardar y resetea el formulario
    - **Guardar**: Ejecuta la validación y el guardado

### 4.6 Integration Points

16. El componente debe conectarse con el handler `handleCreateStudent` existente en `app/(authenticated)/students/page.tsx`.

17. Preparar la estructura para que cuando se implemente el backend:
    - Se ejecute un refetch de la tabla de estudiantes
    - Se maneje correctamente la lógica de error del servidor
    - Se pueda integrar fácilmente la mutation de GraphQL o REST API

## 5. Non-Goals (Out of Scope)

1. **No** implementar la integración real con el backend/API
2. **No** agregar el estudiante a la tabla después de crearlo (esto se hará cuando haya API real con refetch)
3. **No** implementar validaciones avanzadas (ej: verificar si el email ya existe)
4. **No** implementar carga de avatar o foto del estudiante
5. **No** implementar campos adicionales más allá de los especificados
6. **No** implementar edición de estudiantes (esto será otra feature)
7. **No** guardar los datos en localStorage o cualquier persistencia local

## 6. Design Considerations

### Component Structure

Crear el siguiente componente:
- **Location**: `modules/students/components/create-student-sheet.tsx`
- **Purpose**: Componente Sheet con el formulario de creación

### Form Library

- Usar **React Hook Form** para el manejo del formulario
- Usar **Zod** para la validación de esquemas
- Integrar con los componentes de shadcn/ui Form

### Styling

- Utilizar los componentes existentes de shadcn/ui:
  - `Sheet` (SheetTrigger, SheetContent, SheetHeader, etc.)
  - `Form` (FormField, FormItem, FormLabel, FormControl, FormMessage)
  - `Input` para los campos de texto
  - `Select` para el dropdown de cursos
  - `Button` para las acciones
- Usar `Sonner` (toast) para las notificaciones

### Type Safety

- Definir un type `CreateStudentInput` con los campos del formulario
- Crear un schema de Zod que coincida con este type

## 7. Technical Considerations

### Dependencies

Las siguientes librerías ya deben estar instaladas (verificar):
- `react-hook-form`
- `@hookform/resolvers`
- `zod`
- `sonner` (para toasts)

### Form Schema Example

```typescript
const createStudentSchema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  email: z.string().min(1, 'El email es requerido').email('Ingrese un email válido'),
  course: z.string().optional(),
})
```

### Mock Courses Data

Por ahora, definir las opciones de curso directamente en el componente:

```typescript
const MOCK_COURSES = [
  { id: '1', name: 'Curso 1' },
  { id: '2', name: 'Curso 2' },
  { id: '3', name: 'Curso 3' },
]
```

### Future API Integration

Dejar comentarios en el código indicando dónde se integrará la API:

```typescript
// TODO: Replace with actual API call
const handleSubmit = async (data: CreateStudentInput) => {
  console.log('Student data:', data)

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // TODO: Call GraphQL mutation or REST endpoint
  // await createStudent(data)
  // await refetchStudents()

  // Show success toast
  toast.success('Estudiante creado exitosamente')
}
```

## 8. Success Metrics

1. **Usabilidad**: El usuario puede completar el formulario en menos de 30 segundos
2. **Validación**: El 100% de los datos inválidos son capturados antes del submit
3. **Feedback**: El usuario recibe confirmación visual clara del resultado de la operación
4. **Preparación**: La estructura del código permite integración con API sin refactorización mayor

## 9. Open Questions

1. ¿Debería el campo "Curso" permitir selección múltiple desde el inicio, o mantener single-select por ahora?
   - **Decisión**: Mantener single-select por ahora para simplificar

2. ¿Se debe validar el formato del nombre/apellido (ej: solo letras, sin números)?
   - **Decisión pendiente**: Por defecto, permitir cualquier caracter por ahora

3. ¿Qué debe pasar si el usuario cierra el Sheet con datos sin guardar? ¿Mostrar confirmación?
   - **Decisión pendiente**: Por ahora, permitir cerrar sin confirmación

4. ¿El Sheet debe tener un ancho específico?
   - **Decisión**: Usar el ancho por defecto del componente Sheet de shadcn

---

## Implementation Notes

- El componente debe ser **client component** (`'use client'`)
- Debe seguir la arquitectura del proyecto (ver `project-structure.mdc`)
- Debe usar las convenciones de código establecidas (tabs, single quotes, etc.)
- Debe incluir JSDoc para documentar el componente y sus props
- Los tipos deben estar bien definidos y exportados si son reutilizables


