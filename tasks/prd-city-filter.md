# PRD: Filtro de Ciudad para Contactos

## 1. Introduction/Overview

Esta feature añade un filtro de ciudad a la tabla de contactos, permitiendo a los usuarios filtrar contactos por una o más ciudades específicas. El filtro obtendrá dinámicamente las ciudades disponibles desde la base de datos, mostrando solo aquellas que tienen contactos asociados.

**Problema que resuelve:** Los usuarios necesitan filtrar contactos por ubicación geográfica para segmentar mejor sus leads y gestionar contactos por zona.

## 2. Goals

1. Permitir a los usuarios filtrar contactos por ciudad de manera visual y consistente con otros filtros existentes.
2. Obtener dinámicamente las ciudades disponibles desde la base de datos.
3. Soportar selección múltiple de ciudades para filtrados más flexibles.
4. Mantener la consistencia visual con el diseño actual de filtros (LeadStatusFilter, TagsFilter).

## 3. User Stories

### US-1: Filtrar por una ciudad
**Como** usuario del sistema  
**Quiero** poder filtrar contactos por una ciudad específica  
**Para** ver solo los leads de una ubicación geográfica determinada.

### US-2: Filtrar por múltiples ciudades
**Como** usuario del sistema  
**Quiero** poder seleccionar múltiples ciudades a la vez  
**Para** ver contactos de varias zonas geográficas simultáneamente.

### US-3: Ver ciudades disponibles
**Como** usuario del sistema  
**Quiero** ver solo las ciudades que tienen contactos en el sistema  
**Para** no perder tiempo con opciones vacías.

## 4. Functional Requirements

### Frontend (leads-scrapper-web)

#### FR-1: Componente CityFilter
1. Crear componente `CityFilter` en `modules/contacts/components/city-filter.tsx`.
2. El componente debe usar el componente base `FilterBy` de `components/common/filter-by.tsx`.
3. Debe permitir selección múltiple de ciudades (similar a `TagsFilter`).
4. El label del filtro debe ser "Ciudad".
5. El placeholder del select debe ser "Filtrar por ciudad".

#### FR-2: Obtención de ciudades disponibles
6. Crear query GraphQL `GET_AVAILABLE_CITIES` para obtener las ciudades únicas de la base de datos.
7. Crear hook `useAvailableCities` para consumir la query y manejar el estado de carga.
8. Las ciudades deben mostrarse ordenadas alfabéticamente.
9. Si no hay ciudades disponibles, mostrar mensaje "No hay ciudades disponibles" dentro del select.
10. La query debe usar cache de Apollo Client para evitar llamadas repetidas al servidor.

#### FR-3: Búsqueda dentro del selector
11. El selector debe incluir un campo de búsqueda para filtrar ciudades.
12. La búsqueda debe ser case-insensitive y filtrar en tiempo real.
13. Si no hay resultados de búsqueda, mostrar mensaje "No se encontraron ciudades".

#### FR-4: Integración en página de contactos
14. Agregar el componente `CityFilter` en la página `app/(authenticated)/contacts/page.tsx`.
15. Agregar estado `cityFilter` de tipo `string[]` (array de ciudades seleccionadas).
16. Pasar el filtro de ciudades al query `GET_CONTACTS` a través de `queryVariables.filter`.
17. El filtro debe ubicarse junto a los filtros existentes (LeadStatusFilter, TagsFilter).

### Backend (leads-scrapper-backend)

#### FR-5: Query de ciudades disponibles
18. Crear query GraphQL `availableCities` en el resolver de contactos.
19. La query debe retornar un array de strings con las ciudades únicas no nulas.
20. Las ciudades deben estar ordenadas alfabéticamente.

#### FR-6: Filtro por ciudad en GET_CONTACTS
21. Agregar campo `cities` (array de strings) al input type `ContactsFilterInput`.
22. Modificar el servicio de contactos para filtrar por ciudades cuando se proporcione el filtro.
23. El filtro debe usar lógica OR: contactos que pertenezcan a cualquiera de las ciudades seleccionadas.

## 5. Non-Goals (Out of Scope)

- **No** se incluirá opción "Sin ciudad" para filtrar contactos sin ciudad asignada.
- **No** se agrupará por país o región.
- **No** se agregará el campo `city` a contactos tipo PERSON en este PRD (se hará en feature separada).

## 6. Design Considerations

### Diseño Visual
- El filtro debe verse idéntico al `LeadStatusFilter` y `TagsFilter` existentes.
- Usar el componente `FilterBy` como base para mantener consistencia.
- Para selección múltiple, seguir el patrón de `TagsFilter`:
  - Mostrar checkboxes para cada ciudad.
  - Mostrar el número de ciudades seleccionadas en el badge del filtro.
- Incluir campo de búsqueda en la parte superior del dropdown:
  - Input con placeholder "Buscar ciudad..."
  - Filtrar lista de ciudades en tiempo real mientras el usuario escribe.
  - Mostrar estado vacío si no hay coincidencias.

### Referencia de componentes existentes
- `components/common/filter-by.tsx` - Componente base de filtros
- `modules/contacts/components/lead-status-filter.tsx` - Ejemplo de filtro simple
- `modules/contacts/components/tags-filter.tsx` - Ejemplo de filtro con selección múltiple

## 7. Technical Considerations

### Frontend

```typescript
// Nuevo tipo para el response de ciudades
interface AvailableCitiesResponse {
  availableCities: string[]
}

// Query GraphQL con cache
const GET_AVAILABLE_CITIES = gql`
  query GetAvailableCities {
    availableCities
  }
`

// Hook con cache policy
const { data, loading } = useQuery(GET_AVAILABLE_CITIES, {
  fetchPolicy: 'cache-first' // Usar cache para evitar llamadas repetidas
})

// Modificación del filtro existente
interface ContactsFilterInput {
  search?: string
  leadStatus?: LeadStatus
  tagIds?: string[]
  cities?: string[]  // NUEVO
}
```

### Backend

```typescript
// Nuevo resolver
@Query(() => [String])
async availableCities(): Promise<string[]> {
  // Obtener ciudades únicas no nulas de contactos
}

// Modificación del input type
@InputType()
class ContactsFilterInput {
  @Field(() => [String], { nullable: true })
  cities?: string[]
}
```

### Dependencias
- Requiere modificación del schema GraphQL en backend.
- Requiere regeneración de tipos si se usa codegen.

## 8. Success Metrics

1. **Funcionalidad:** El filtro permite seleccionar múltiples ciudades y filtra correctamente los contactos.
2. **Performance:** La query de ciudades disponibles responde en menos de 500ms.
3. **UX:** El filtro mantiene consistencia visual con los filtros existentes.
4. **Cobertura:** Tests unitarios para el componente CityFilter y el hook useAvailableCities.

## 9. Open Questions

*Todas las preguntas han sido resueltas:*

1. ~~¿Se debería cachear la lista de ciudades disponibles?~~ **Sí**, usar cache de Apollo Client.
2. ~~¿Cuántas ciudades máximo se esperan?~~ **Muchas**, por lo tanto se incluirá búsqueda en el selector.

