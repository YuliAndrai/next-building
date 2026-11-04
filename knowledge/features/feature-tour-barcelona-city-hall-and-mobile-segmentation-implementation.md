# Solution Spec: tour-barcelona-city-hall-and-mobile-segmentation

## Context
Actualización de la agenda internacional de ANDHRAY (gira "Closing 2026 // Opening 2027") incorporando la nueva fecha en Barcelona (09.12.2026 en City Hall para el 7mo Aniversario de Industrial Girls con Nalgotika), actualización del resumen móvil en `NewsSection` y refactorización del componente `TourDatesSection` para incorporar segmentación por mes y layout móvil ultra-compacto.

## Architecture & Layer Isolation
- **Layer 1 (Presentation Layer)**:
  - `apps/web/src/components/home/tour-dates-section.tsx`: Controles segmentados (`TourSegment`), layout horizontal compacto en móvil (`~44px` vs `~140px`), y divisores mensuales sticky.
  - `apps/web/src/components/home/news-section.tsx`: Actualización de la síntesis del itinerario en el card principal de novedades para destacar `Barcelona (M7 & City Hall), Spain`.
- **Layer 2 (Data / Configuration Layer)**:
  - `apps/web/src/data/site-config.ts`: Adición del objeto `TourDate` para Barcelona City Hall el `09.12.2026` con status `tickets` y tipo `show`.
- **Layer 3 (Test & Quality Layer)**:
  - `tests/tour-dates-2026-2027.test.ts`: Actualización de aserciones de `Nalgotika` validando que la fecha `09.12.2026` en `Barcelona` esté definida y verifique `City Hall`.

## Test Strategy (TDD)
1. **RED**: Modificación de prueba en `tests/tour-dates-2026-2027.test.ts` para exigir que `Nalgotika` esté presente en Barcelona el 09.12.2026 en City Hall.
2. **GREEN**: Registro de la fecha en `upcomingTourDates` en `apps/web/src/data/site-config.ts` y ejecución de tests hasta pase completo.
3. **REFACTOR**: Implementación de controles segmentados (`nov-2026`, `dic-2026`, `ene-2027`, `past`, `upcoming`, `all`) y compactación responsiva de fila única en `TourDatesSection`.

## Verification Results
- `pnpm test`: 130 tests pasando en verde a lo largo de 19 archivos de prueba.
- `pnpm typecheck`: 0 errores de TypeScript con generación exitosa de tipos Next.js.
