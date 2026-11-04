# Solution Spec: tour-dates-tickets-button Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La solución actualiza la capa de presentación y datos para desacoplar el canal de booking corporativo de la compra de entradas de eventos individuales:
1. **Presentation Layer (`apps/web/src/components/home/tour-dates-section.tsx`, `news-section.tsx`)**:
   - `tour-dates-section.tsx`:
     - Se elimina la condición `show.status === "booking"` que renderizaba el botón de contratación en cada fila.
     - Se actualiza el botón de tickets con clases responsivas (`w-full md:w-auto text-center justify-center`) y soporte de enlaces internos/externos.
     - Se añade el badge `t.tour.bookingOpenBadge` en la cabecera de la tarjeta de "Gira Destacada" (`featuredTour`).
   - `news-section.tsx`:
     - Se sincroniza la tarjeta de anuncio con el badge `t.tour.bookingOpenBadge`.
2. **Application/Consumption Layer (`apps/web/src/messages/es.json`)**:
   - Se actualiza `tour.ticketsBadge` a `"TICKETS"` para alineación estándar con la escena electrónica y requerimiento explícito.
3. **Domain/Pipelines Layer (`apps/web/src/data/site-config.ts`)**:
   - Se actualiza el estado de las fechas de `upcomingTourDates` de `"booking"` a `"tickets"`.
4. **Infrastructure Layer**: Sin cambios (sin llamadas a RPC ni DB).

## 3. Atomic Slices & Logical Sequence
- **SPEC-1: Calibración de Botones de Tickets y Booking en Tour Dates (Desktop & Mobile)**:
  - **Fase RED (TDD)**: Ejecutar suite de pruebas de fechas de gira (`tests/tour-dates-2026-2027.test.ts`).
  - **Fase GREEN (Implementación)**:
    - Actualizar `apps/web/src/data/site-config.ts` (`status: "tickets"`).
    - Actualizar `apps/web/src/messages/es.json` (`ticketsBadge: "TICKETS"`).
    - Actualizar `apps/web/src/components/home/tour-dates-section.tsx` y `news-section.tsx`.
    - Adaptar clases móviles (`w-full md:w-auto`, `justify-center`).
  - **Fase REFACTOR & GATE 2**:
    - Validar paridad responsive mobile y desktop.
    - Ejecutar `pnpm validate` asegurando 100% de cumplimiento.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests
- **Test File Path**: `tests/tour-dates-2026-2027.test.ts`
- **Command**: `pnpm test tests/tour-dates-2026-2027.test.ts`
- **Assertion Goals**:
  1. Validar que las fechas activas están registradas con su venue, ciudad y país.
  2. Validar que la configuración de la gira destacada mantiene los badges correspondientes.
  3. Validar que los diccionarios conservan integridad y paridad multilingüe.

## 5. Local Definition of Done (DoD)
- [x] El botón de cada fecha dice "TICKETS" y redirige adecuadamente.
- [x] "BOOKING ABIERTO" se mantiene exclusivamente en la tarjeta de "Gira Destacada".
- [x] La versión móvil adapta ergonómicamente los botones a ancho completo y centrado táctil.
- [x] Suite de pruebas automatizadas en verde (`pnpm test`).
- [x] Verificación de tipos TypeScript (`pnpm typecheck`) sin errores.
- [x] Linter (`pnpm lint`) sin errores.
- [x] Validación de gobernanza de documentación (`validate-doc-governance.sh`) aprobada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-app-tour-dates-tickets-button.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-tour-dates-tickets-button.md)
- **Solution Spec**: [fix-app-tour-dates-tickets-button-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-tour-dates-tickets-button-implementation.md)
- **Branch**: `fix/app-tour-dates-tickets-button`
- **Base Branch**: `develop`
