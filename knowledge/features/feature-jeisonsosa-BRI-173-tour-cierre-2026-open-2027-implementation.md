# Solution Spec: tour-cierre-2026-open-2027 Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La solución actualiza la estructura de datos y presentación de la gira internacional **"ANDHRAY Closing 2026 // Opening 2027"** en el sitio web:

1. **Presentation Layer (`apps/web/src/components/home/`, `apps/web/src/app/`)**:
   - `TourDatesSection`: visualización de las fechas próximas ordenadas cronológicamente, soporte visual para eventos especiales (lanzamientos de música), y sección colapsable / visual para "Fechas Pasadas (Concluidas)".
   - `NewsSection`: integración de tarjeta visual con el flyer oficial del tour (`primeras-fechas-confirmadas-tour-cierre-2026/ANDHRAY_TOUR 2026 2027.jpg`), detalle del itinerario y enlace de booking.
   - `Header` / `HeroSection`: actualización de badges y textos de gira en `site-config.ts` y mensajes i18n ("CLOSING 2026 // OPENING 2027").
2. **Application/Consumption Layer (`apps/web/src/data/site-config.ts`, `apps/web/src/i18n/`)**:
   - Extensión del modelo `TourDate` para soportar categorías o flags de evento especial (`type: "show" | "release" | "past"`).
   - Definición de `tourDates` (próximas) y `pastTourDates` (concluidas).
   - Inyección de las cadenas en los 10 diccionarios en `apps/web/src/messages/*.json`.
3. **Domain/Pipelines/Services Layer**:
   - Formateo de fechas, filtros por búsqueda y ordenación temporal para garantizar coherencia en la presentación.
4. **Infrastructure Layer**:
   - Assets estáticos en `apps/web/public/primeras-fechas-confirmadas-tour-cierre-2026/ANDHRAY_TOUR 2026 2027.jpg`, renderizado optimizado con Next.js `<Image />`.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Actualización de Datos y Modelo de Gira (`site-config.ts`, `tests/tour-dates-2026-2027.test.ts`, `messages/*.json`)
  - Sub-rama: `SPEC/jeisonsosa-BRI-173-s01-tour-data-model`
  - Inclusión de fechas pasadas (Pereira, Pasto) y fechas próximas (Ecuador, Europa, Medio Oriente, Lanzamientos).
  - Ciclo RED (TDD test en fallo) -> GREEN (Datos actualizados) -> REFACTOR (Optimización y clean code).
- **SPEC-2**: Componentes de UI: Anuncio de Tour en Noticias y Visualización de Fechas Pasadas/Próximas
  - Sub-rama: `SPEC/jeisonsosa-BRI-173-s02-tour-ui-components`
  - Renderizado del flyer oficial en `NewsSection` y división de fechas próximas vs. pasadas en `TourDatesSection`.
  - Ciclo RED -> GREEN -> REFACTOR.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `tests/tour-dates-2026-2027.test.ts`
- **Command**: `pnpm test`
- **Assertion Goals**:
  - Validar que las fechas pasadas (`pastTourDates`) contienen exactamente Pereira (24.10) y Pasto (31.10) con estatus de realizado/completado.
  - Validar que las fechas próximas (`tourDates`) contienen los shows de Quito, Cuenca, Barcelona, España Nøir, Florence, Padua, Barcelona M&G, Tenerife, Dubai, Madrid y los lanzamientos de EP y Birthday track.
  - Validar que el flyer del tour existe y está configurado en `siteConfig.tourConfig`.
  - Validar que los textos principales de gira reflejan "Closing 2026 // Opening 2027".

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde) con `tests/tour-dates-2026-2027.test.ts`.
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] La imagen del flyer se visualiza nítidamente y de forma responsiva en móvil y desktop.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-jeisonsosa-BRI-173-tour-cierre-2026-open-2027.md](file:///knowledge/features/feature-jeisonsosa-BRI-173-tour-cierre-2026-open-2027.md)
- **Solution Spec**: [feature-jeisonsosa-BRI-173-tour-cierre-2026-open-2027-implementation.md](file:///knowledge/features/feature-jeisonsosa-BRI-173-tour-cierre-2026-open-2027-implementation.md)
- **Linear Issue**: BRI-173 (Local execution, Linear MCP not attached)
