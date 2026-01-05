# PRD: Website & SEO Analysis Section (Frontend)

## 1. Introduction/Overview

Esta feature agrega una nueva sección **"Website & SEO Analysis"** dentro de la página de detalle de contacto tipo COMPANY. La sección muestra los resultados del análisis de sitio web y SEO, permitiendo al usuario entender la calidad del sitio web del lead y su posicionamiento en Google.

**Problema que resuelve:** Actualmente los usuarios pueden ejecutar el análisis pero no tienen una forma visual clara de interpretar los resultados. Esta sección presenta los datos de manera comprensible con gráficos y métricas claras.

## 2. Goals

1. **Visualizar scores** de manera clara con gráficos circulares (overallScore, websiteScore, seoScore)
2. **Mostrar problemas detectados** en cards individuales para fácil lectura
3. **Desglosar métricas** con barras de progreso para cada componente del análisis
4. **Permitir ejecutar análisis** si no existe, con ejecución en background
5. **Integrar con shadcn/ui** usando componentes Progress y Charts

## 3. User Stories

### US-1: Ver análisis existente
**Como** usuario del sistema  
**Quiero** ver el análisis de website y SEO de una empresa  
**Para** entender la calidad de su presencia digital y priorizar mis leads

### US-2: Ejecutar nuevo análisis
**Como** usuario del sistema  
**Quiero** ejecutar un análisis de website si no existe  
**Para** obtener información sobre la calidad del sitio del lead

### US-3: Interpretar resultados
**Como** usuario del sistema  
**Quiero** ver los resultados en gráficos visuales claros  
**Para** entender rápidamente las fortalezas y debilidades del sitio

## 4. Functional Requirements

### 4.1 Ubicación y Navegación

**FR-1.1** Agregar un nuevo tab "Website & SEO" en la navegación de la página de detalle de contacto empresa (junto a Overview, Contacts, Activities).

**FR-1.2** El tab solo debe aparecer para contactos de tipo `COMPANY`.

**FR-1.3** El tab debe mostrar el contenido de análisis o el estado vacío según corresponda.

### 4.2 Estado Vacío (Sin Análisis)

**FR-2.1** Si el contacto no tiene `websiteAnalysis`, mostrar un estado vacío con:
- Ícono representativo (ej: Search, Globe, o BarChart)
- Título: "No website analysis available"
- Descripción: "Run an analysis to get insights about this company's website and SEO performance."
- Botón primario: "Run Analysis"

**FR-2.2** Al hacer click en "Run Analysis":
- Ejecutar la mutation `analyzeContactWebsite`
- Mostrar toast de "Analysis started" inmediatamente
- Permitir al usuario seguir navegando en la app
- Cuando termine, mostrar toast de éxito y refrescar los datos si el usuario sigue en la página

### 4.3 Sección 1: Score Circles (Gráficos Circulares)

**FR-3.1** Mostrar una card con 3 gráficos circulares:
- **Global Score** (grande, a la izquierda): `overallScore` (0-100)
- **Web Design** (mediano, arriba derecha): `websiteScore` (0-100)
- **SEO Health** (mediano, abajo derecha): `seoScore` (0-100)

**FR-3.2** Los círculos deben mostrar:
- Número en el centro
- Arco de progreso proporcional al valor
- Label debajo de cada círculo

**FR-3.3** Usar colores según el valor:
- 0-40: Rojo/Naranja (malo)
- 41-70: Amarillo/Dorado (regular)
- 71-100: Verde (bueno)

### 4.4 Sección 2: Problemas Principales Detectados

**FR-4.1** Mostrar una card con título "Main Issues Detected" (o "Problemas principales detectados").

**FR-4.2** Renderizar una card por cada item en el array `primaryIssues`.

**FR-4.3** Cada card de problema debe mostrar:
- Ícono de warning/error (rojo o naranja)
- El texto del issue (tal como viene del backend)

**FR-4.4** Si `primaryIssues` está vacío, mostrar mensaje: "No issues detected" con ícono de check verde.

**FR-4.5** Layout: Grid de 2 columnas en desktop, 1 columna en mobile.

### 4.5 Sección 3: Barras de Métricas Detalladas

**FR-5.1** Mostrar una card con título "Detailed Metrics" (o "Métricas detalladas").

**FR-5.2** Mostrar 4 barras de progreso horizontales:
- **Professionalism**: `professionalismScore` (0-100)
- **Freshness**: `freshnessScore` (0-100)
- **Load Time**: `loadTimeScore` (0-100)
- **SEO Position**: `seoScore` (0-100)

**FR-5.3** Cada barra debe mostrar:
- Label a la izquierda
- Barra de progreso (usar `Progress` de shadcn)
- Valor numérico a la derecha

**FR-5.4** Usar colores según el valor (mismo esquema que FR-3.3).

### 4.6 Layout General

**FR-6.1** Título de la sección: "Website & SEO Analysis"
**FR-6.2** Subtítulo: "AI-powered insights to improve conversion and visibility"

**FR-6.3** Layout de las 3 secciones:
```
┌─────────────────────────────────────────────────────────────┐
│  Website & SEO Analysis                                     │
│  AI-powered insights to improve conversion and visibility   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────── Card 1: Scores ─────────────────────────┐ │
│  │  [Circle Grande]     [Circle Mediano]                  │ │
│  │   Global Score        Web Design                       │ │
│  │       67                  72                           │ │
│  │                      [Circle Mediano]                  │ │
│  │                       SEO Health                       │ │
│  │                          62                            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────── Card 2: Issues ─────────────────────────┐ │
│  │  Main Issues Detected                                  │ │
│  │  ┌──────────────┐  ┌──────────────┐                    │ │
│  │  │ ⚠ Issue 1    │  │ ⚠ Issue 2    │                    │ │
│  │  └──────────────┘  └──────────────┘                    │ │
│  │  ┌──────────────┐  ┌──────────────┐                    │ │
│  │  │ ⚠ Issue 3    │  │ ⚠ Issue 4    │                    │ │
│  │  └──────────────┘  └──────────────┘                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────── Card 3: Metrics ────────────────────────┐ │
│  │  Detailed Metrics                                      │ │
│  │                                                        │ │
│  │  Professionalism  ████████████░░░░░░░░  72             │ │
│  │  Freshness        ██████████████░░░░░░  85             │ │
│  │  Load Time        ██████░░░░░░░░░░░░░░  45             │ │
│  │  SEO Position     ████████████████░░░░  80             │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 4.7 Información Adicional

**FR-7.1** Mostrar fecha del último análisis: "Last analyzed: {analyzedAt}"

**FR-7.2** Opcionalmente mostrar botón "Re-run Analysis" para ejecutar un nuevo análisis.

## 5. Non-Goals (Out of Scope)

1. **Toggle Simple/Advanced** - No se implementará, siempre se muestra toda la información
2. **Edición de resultados** - Los resultados son de solo lectura
3. **Comparación histórica** - No se guardará histórico de análisis
4. **Análisis de personas** - Solo aplica a contactos tipo COMPANY
5. **Traducción automática de issues** - Se muestran tal como vienen del backend
6. **Exportar resultados** - No habrá opción de exportar a PDF/imagen

## 6. Design Considerations

### Componentes shadcn/ui a utilizar:
- `Card` - Para las 3 secciones principales
- `Progress` - Para las barras de métricas
- `Button` - Para "Run Analysis" y "Re-run Analysis"
- `Tabs` / `TabsList` / `TabsTrigger` - Para la navegación de tabs
- Custom circular progress (puede usar Chart de Recharts o similar)

### Colores sugeridos:
- Score bajo (0-40): `text-red-500`, `bg-red-500`
- Score medio (41-70): `text-amber-500`, `bg-amber-500`
- Score alto (71-100): `text-green-500`, `bg-green-500`

### Iconos (Lucide):
- Warning/Error: `AlertCircle`, `XCircle`
- Success: `CheckCircle`
- Analysis: `Search`, `Globe`, `BarChart3`

## 7. Technical Considerations

### GraphQL Query
```graphql
query GetContactAnalysis($contactId: String!) {
  contactAnalysis(contactId: $contactId) {
    id
    websiteUrl
    websiteScore
    seoScore
    overallScore
    professionalismScore
    freshnessScore
    loadTimeScore
    primaryIssues
    analyzedAt
  }
}
```

### GraphQL Mutation
```graphql
mutation AnalyzeContactWebsite($contactId: String!) {
  analyzeContactWebsite(contactId: $contactId) {
    id
    websiteScore
    seoScore
    overallScore
    # ... resto de campos
  }
}
```

### Archivos a crear/modificar:
- `modules/contacts/components/website-seo-tab.tsx` - Componente principal del tab
- `modules/contacts/components/website-seo-scores.tsx` - Sección de círculos
- `modules/contacts/components/website-seo-issues.tsx` - Sección de problemas
- `modules/contacts/components/website-seo-metrics.tsx` - Sección de barras
- `modules/contacts/components/website-seo-empty.tsx` - Estado vacío
- `modules/contacts/graphql/website-analysis.graphql` - Queries y mutations
- Modificar la página de detalle de contacto para agregar el tab

### Dependencias:
- `recharts` - Para gráficos circulares (ya debería estar instalado)
- `sonner` - Para toast notifications (ya debería estar instalado)

## 8. Success Metrics

1. **Usabilidad** - Los usuarios pueden ver y entender los scores sin explicación adicional
2. **Performance** - La sección carga en menos de 500ms
3. **Adopción** - Los usuarios ejecutan análisis para sus leads principales

## 9. Open Questions

1. ~~¿El análisis se ejecuta automáticamente al crear una empresa o solo manualmente?~~ → Solo manualmente por ahora

2. ¿Debería haber un límite de ejecuciones de análisis por día/mes? (Por costos de API de OpenAI y SERPApi)

3. ¿Mostrar el screenshot capturado del sitio web? (Ya se guarda en `screenshotUrl`)

