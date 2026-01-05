# PRD: Generador de Mensajes con IA para Leads

## 1. Introduction/Overview

Esta feature permite generar mensajes personalizados con Inteligencia Artificial para contactar leads, basándose en los problemas detectados en el análisis de su sitio web y SEO. El objetivo es agilizar el proceso de outreach, eliminando la necesidad de redactar mensajes manualmente.

El sistema ofrece dos puntos de acceso:
1. **Card en Overview**: Generación rápida con selección automática de problemas
2. **Pestaña dedicada "Mensajes IA"**: Control total sobre qué problemas mencionar

Los mensajes se generan bajo demanda (nunca automáticamente) y no se almacenan, ya que están pensados para uso inmediato (copiar y enviar).

---

## 2. Goals

1. Reducir el tiempo de redacción de mensajes de outreach a menos de 10 segundos
2. Generar mensajes personalizados basados en problemas reales detectados en el sitio del lead
3. Soportar múltiples canales (WhatsApp y Email) con longitudes apropiadas para cada uno
4. Ofrecer diferentes tonos de comunicación según la estrategia del usuario
5. Economizar recursos de IA ejecutando solo cuando el usuario lo solicita explícitamente

---

## 3. User Stories

### US-01: Generación rápida desde Overview
**Como** usuario de la plataforma  
**Quiero** generar un mensaje rápidamente desde la card de Overview  
**Para** contactar al lead sin perder tiempo navegando a otras secciones

### US-02: Generación personalizada desde pestaña
**Como** usuario de la plataforma  
**Quiero** seleccionar específicamente qué problemas mencionar en el mensaje  
**Para** tener control total sobre el contenido del mensaje generado

### US-03: Selección de canal
**Como** usuario de la plataforma  
**Quiero** elegir si el mensaje es para WhatsApp o Email  
**Para** obtener un mensaje con la longitud y formato apropiados

### US-04: Selección de tono
**Como** usuario de la plataforma  
**Quiero** elegir el tono del mensaje (Formal, Amigable, Persuasivo)  
**Para** adaptar la comunicación a mi estrategia de ventas

### US-05: Copiar mensaje
**Como** usuario de la plataforma  
**Quiero** copiar el mensaje generado con un solo clic  
**Para** pegarlo rápidamente en WhatsApp o mi cliente de email

### US-06: Lead sin sitio web
**Como** usuario de la plataforma  
**Quiero** generar un mensaje para leads que no tienen sitio web  
**Para** ofrecerles la creación de uno como servicio

### US-07: Lead con web optimizada
**Como** usuario de la plataforma  
**Quiero** generar un mensaje para leads que tienen su web bien optimizada  
**Para** felicitarlos y ofrecer otros servicios complementarios

---

## 4. Functional Requirements

### 4.1 Ubicación y Navegación

**FR-01:** La pestaña "Mensajes IA" debe aparecer como segunda pestaña en el detalle del contacto, inmediatamente después de "Overview".

**FR-02:** La pestaña debe mostrar un ícono de IA (sparkles/magic wand) junto al texto "Mensajes IA".

**FR-03:** En la sección Overview, debe existir una card de "Generador de Mensajes" con funcionalidad simplificada.

### 4.2 Componentes de la Pestaña "Mensajes IA"

**FR-04:** Selector de canal con dos opciones: "WhatsApp" y "Email" (botones toggle, uno activo a la vez).

**FR-05:** Selector de tono con tres opciones: "Formal", "Amigable", "Persuasivo" (botones toggle, uno activo a la vez, default: "Amigable").

**FR-06:** Lista de problemas detectados con checkboxes para seleccionar cuáles incluir en el mensaje.

**FR-07:** Cada problema debe mostrar:
- Checkbox para selección
- Título del problema
- Badge de severidad ("Crítico" en rojo, "Mejorable" en amarillo)
- Descripción breve del problema

**FR-08:** Contador de problemas seleccionados en el header de la sección (ej: "Problemas a mencionar (3 seleccionados)").

**FR-09:** Área de preview del mensaje generado (textarea de solo lectura con scroll).

**FR-10:** Botón "Generar Mensaje con IA" (disabled si no hay problemas seleccionados).

**FR-11:** Botón "Copiar" que aparece solo cuando hay un mensaje generado.

**FR-12:** Al copiar, mostrar feedback visual (toast notification o cambio de texto del botón a "¡Copiado!").

### 4.3 Card en Overview

**FR-13:** La card de Overview debe mostrar:
- Selector de canal (WhatsApp/Email)
- Área de preview del mensaje
- Botón "Generar Mensaje con IA"
- Botón "Copiar"

**FR-14:** En Overview, los problemas se seleccionan automáticamente de forma aleatoria (cantidad y cuáles).

**FR-15:** La card debe incluir un link/texto indicando "Para personalizar, ir a la pestaña Mensajes IA".

### 4.4 Manejo de Escenarios

**FR-16:** **Escenario: Lead sin sitio web**
- Mostrar un problema default: "Sin sitio web"
- Descripción: "El lead no tiene presencia online. Oportunidad de ofrecer creación de sitio web."
- Este problema debe estar pre-seleccionado
- El usuario puede generar mensaje ofreciendo creación de sitio web

**FR-17:** **Escenario: Tiene web pero no se corrió el análisis**
- Mostrar estado vacío con mensaje: "Análisis pendiente"
- Descripción: "Primero debes ejecutar el análisis del sitio web para detectar problemas"
- Botón/link para ir a la pestaña de Website & SEO
- El botón "Generar Mensaje" debe estar deshabilitado

**FR-18:** **Escenario: Análisis corrido con problemas detectados**
- Mostrar lista de todos los problemas detectados (Website + SEO)
- Permitir seleccionar uno o más problemas
- Generar mensaje basado en los problemas seleccionados

**FR-19:** **Escenario: Análisis corrido sin problemas (todo OK)**
- Mostrar mensaje de estado: "¡Excelente! No se detectaron problemas"
- Mostrar opción de generar un mensaje default
- El mensaje default debe felicitar al lead por su web optimizada y ofrecer servicios complementarios (ej: mantenimiento, nuevas funcionalidades, marketing digital)

### 4.5 Generación de Mensajes con IA

**FR-20:** Usar OpenAI (GPT-4/GPT-4o) para la generación de mensajes.

**FR-21:** El mensaje NUNCA debe generarse automáticamente. Solo al hacer clic en "Generar Mensaje con IA".

**FR-22:** Mostrar estado de loading mientras se genera el mensaje (spinner + texto "Generando...").

**FR-23:** **Longitud de mensajes por canal:**
- WhatsApp: Mensaje corto (50-100 palabras), directo, con emoji ocasional
- Email: Mensaje más elaborado (150-250 palabras), estructura con saludo, cuerpo y despedida

**FR-24:** El mensaje debe incluir:
- Saludo personalizado (si tenemos nombre del contacto)
- Mención de los problemas seleccionados
- Propuesta de valor/solución
- Call to action

**FR-25:** Al refrescar la página, el mensaje generado se pierde (no se persiste).

**FR-26:** Si ocurre un error en la generación, mostrar mensaje de error amigable con opción de reintentar.

### 4.6 Fuente de Problemas

**FR-27:** Los problemas deben provenir del análisis de Website y SEO existente, incluyendo:
- Problemas de Website (velocidad, mobile, CTAs, propuesta de valor, etc.)
- Problemas de SEO (meta tags, alt texts, headings, etc.)

**FR-28:** Cada problema debe mapearse a una descripción user-friendly para el mensaje generado.

---

## 5. Non-Goals (Out of Scope)

1. **NO** guardar historial de mensajes generados
2. **NO** enviar mensajes directamente desde la plataforma (solo generar y copiar)
3. **NO** integración con WhatsApp Business API o email client
4. **NO** templates predefinidos editables por el usuario
5. **NO** generación automática al cargar la página
6. **NO** programar envíos futuros
7. **NO** tracking de mensajes enviados
8. **NO** personalización del prompt de IA por parte del usuario

---

## 6. Design Considerations

### 6.1 Layout de la Pestaña "Mensajes IA"

```
┌─────────────────────────────────────────────────────────────────────┐
│  Generador de Mensajes IA                                           │
│  Selecciona los problemas, elige el tono y genera mensajes          │
│  personalizados al instante                                         │
├─────────────────────────┬───────────────────────────────────────────┤
│                         │                                           │
│  Canal de envío         │  Mensaje generado                         │
│  ┌─────────┐ ┌────────┐ │  ┌─────────────────────────────────┐     │
│  │WhatsApp │ │ Email  │ │  │                                 │     │
│  └─────────┘ └────────┘ │  │  [Área de preview del mensaje]  │     │
│                         │  │                                 │     │
│  Tono del mensaje       │  │                                 │     │
│  ┌──────┐┌────────┐┌───┐│  │                                 │     │
│  │Formal││Amigable││Per││  │                                 │     │
│  └──────┘└────────┘└───┘│  │                                 │     │
│                         │  └─────────────────────────────────┘     │
│  Problemas a mencionar  │                                           │
│  (X seleccionados)      │  ┌─────────────────────────────────┐     │
│                         │  │ ✨ Generar Mensaje con IA       │     │
│  ☐ Problema 1 [Crítico] │  └─────────────────────────────────┘     │
│  ☐ Problema 2 [Mejorable]│                                          │
│  ☐ Problema 3 [Crítico] │                                           │
│                         │                                           │
└─────────────────────────┴───────────────────────────────────────────┘
```

### 6.2 Card en Overview

```
┌───────────────────────────────────────────┐
│  Generador de Mensajes         [Copiar]   │
├───────────────────────────────────────────┤
│  Canal: [WhatsApp] [Email]                │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │                                     │  │
│  │  [Preview del mensaje generado]     │  │
│  │                                     │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ ✨ Generar Mensaje con IA           │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  Para personalizar → Mensajes IA          │
└───────────────────────────────────────────┘
```

### 6.3 Estados visuales

- **Botón deshabilitado**: Cuando no hay problemas seleccionados (pestaña) o no se puede generar
- **Loading**: Spinner con texto "Generando mensaje..."
- **Éxito**: Mensaje aparece en el preview
- **Error**: Toast con mensaje de error y opción de reintentar
- **Copiado**: Feedback visual temporal ("¡Copiado!" o toast)

### 6.4 Colores de badges de severidad

- **Crítico**: Background rojo claro (#FEE2E2), texto rojo (#DC2626)
- **Mejorable**: Background amarillo claro (#FEF3C7), texto amarillo oscuro (#D97706)

---

## 7. Technical Considerations

### 7.1 Backend (NestJS)

1. **Nuevo módulo**: `ai-messages` o extender el módulo de `contacts`
2. **Endpoint GraphQL**: Mutation `generateAIMessage`
3. **Input**:
   ```typescript
   input GenerateAIMessageInput {
     contactId: ID!
     channel: MessageChannel! # WHATSAPP | EMAIL
     tone: MessageTone! # FORMAL | FRIENDLY | PERSUASIVE
     problemIds: [String!]! # IDs de los problemas seleccionados
   }
   ```
4. **Output**:
   ```typescript
   type GeneratedMessage {
     content: String!
     channel: MessageChannel!
     tone: MessageTone!
     generatedAt: DateTime!
   }
   ```

### 7.2 Integración con OpenAI

1. Usar el SDK oficial de OpenAI
2. Configurar API key en variables de entorno
3. Implementar manejo de rate limits y errores
4. Usar modelo GPT-4o para mejor relación costo/calidad

### 7.3 Prompt Engineering

El prompt debe incluir:
- Contexto del negocio del usuario
- Información del lead (nombre, empresa, website)
- Problemas seleccionados con sus descripciones
- Canal de destino (para ajustar longitud)
- Tono deseado
- Instrucciones de formato

### 7.4 Frontend (Next.js)

1. **Nuevos componentes**:
   - `AIMessageGenerator` (pestaña completa)
   - `AIMessageCard` (card para Overview)
   - `ChannelSelector`
   - `ToneSelector`
   - `ProblemSelector`
   - `MessagePreview`

2. **Nuevo hook**: `useGenerateAIMessage`

3. **GraphQL mutation**: `GENERATE_AI_MESSAGE`

### 7.5 Dependencias

- `openai` - SDK oficial de OpenAI
- Posiblemente un provider/service para manejar la configuración de IA

---

## 8. Success Metrics

1. **Adopción**: % de usuarios que usan la feature al menos una vez por semana
2. **Generaciones**: Número promedio de mensajes generados por usuario por semana
3. **Ratio de copia**: % de mensajes generados que son copiados (indica utilidad)
4. **Tiempo ahorrado**: Encuesta de satisfacción sobre tiempo de redacción
5. **Tasa de error**: % de generaciones fallidas (objetivo: <1%)

---

## 9. Open Questions

1. ~~¿Qué proveedor de IA usar?~~ → **Resuelto: OpenAI (GPT-4/GPT-4o)**

2. ¿Se debe incluir el nombre del negocio del usuario en el mensaje generado (como firma)?

3. ¿Hay un límite de generaciones por usuario para controlar costos de API?

4. ¿El prompt debe estar hardcodeado o configurable desde settings?

5. ¿Se debe trackear analytics de uso de esta feature?

6. ¿En el Overview, cuántos problemas se seleccionan aleatoriamente? (sugerencia: 1-3)

---

## 10. Anexo: Mapeo de Problemas a Mensajes

### Problemas de Website
| Problema | Badge | Descripción para el mensaje |
|----------|-------|----------------------------|
| Sin propuesta de valor clara | Crítico | La página principal no comunica claramente qué ofrece el negocio |
| Sin llamada a la acción | Crítico | No hay botones o CTAs visibles que guíen al usuario |
| Velocidad de carga lenta | Crítico | El sitio tarda más de 3 segundos en cargar |
| Sin optimización móvil | Crítico | El diseño no se adapta a dispositivos móviles |
| Sin formulario de contacto | Mejorable | No hay forma fácil de que los visitantes se comuniquen |

### Problemas de SEO
| Problema | Badge | Descripción para el mensaje |
|----------|-------|----------------------------|
| Meta descripción faltante | Mejorable | Afecta el CTR en resultados de búsqueda |
| Títulos no optimizados | Mejorable | Los títulos no incluyen palabras clave relevantes |
| Sin alt text en imágenes | Mejorable | Las imágenes no son accesibles ni indexables |
| Sin HTTPS | Crítico | El sitio no es seguro, afecta confianza y SEO |

### Escenarios especiales
| Escenario | Tipo de mensaje |
|-----------|-----------------|
| Sin sitio web | Oferta de creación de sitio web profesional |
| Todo OK | Felicitación + oferta de servicios complementarios |

