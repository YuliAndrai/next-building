# Solution Spec: euro-tour-dates-late-nov-dec Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La solución actualiza de forma atómica y consistente todas las referencias a las fechas de la gira europea (Final Nov - Diciembre) a través de las 4 capas funcionales:
1. **Presentation Layer (`apps/web/src/components/home/hero-section.tsx`, `tour-dates-section.tsx`, `apps/web/src/app/page.tsx`, `eventos/page.tsx`)**:
   - Consume los diccionarios i18n (`useTranslations("home")`, `useTranslations("tour")`, `useTranslations("contact")`). No requiere modificaciones estructurales en JSX porque ya está desacoplado mediante i18n keys.
2. **Application/Consumption Layer (`apps/web/src/messages/*.json`)**:
   - Actualización de las cadenas en los 10 diccionarios:
     - `home.badge`
     - `tour.featuredTitle`
     - `tour.tourDate2Month`
     - `contact.cardTourDescription`
3. **Domain/Pipelines Layer (`apps/web/src/data/site-config.ts`)**:
   - Sincronización de constantes canónicas del artista:
     - `siteConfig.artist.heroBanner`
     - `siteConfig.announcement.text`
     - `siteConfig.tourConfig.featuredTour.title`
     - `siteConfig.tourDates[1].date`
     - `siteConfig.tourDates[1].month`
4. **Infrastructure Layer**: Sin cambios (no interactúa con RPC, DB ni servicios externos).

## 3. Atomic Slices & Logical Sequence
- **SPEC-1: Actualización Integral de Fechas del Euro Tour (i18n & Site Config)**:
  - **Fase RED (TDD)**: Crear `tests/euro-tour-dates.test.ts` con pruebas que afirmen la presencia del texto "Final Nov - Diciembre" / "Late Nov - Dec" en `site-config.ts` y en todos los 10 archivos i18n (`home.badge`, `tour.featuredTitle`, `tour.tourDate2Month`, `contact.cardTourDescription`). Las pruebas fallarán inicialmente (RED).
  - **Fase GREEN (Implementación)**: Actualizar `apps/web/src/data/site-config.ts` y los 10 archivos `apps/web/src/messages/*.json` con comentarios explicativos y sin placeholders. Ejecutar vitest hasta que 100% de los tests pasen (GREEN).
  - **Fase REFACTOR & GATE 2**: Auditar paridad entre los 10 idiomas, verificar que no hay cadenas huérfanas ni inconsistencias ortográficas, y validar que `pnpm validate` pasa con 0 errores.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `tests/euro-tour-dates.test.ts`
- **Command**: `pnpm test tests/euro-tour-dates.test.ts`
- **Assertion Goals**:
  1. Validar que `site-config.ts` contiene "FINAL NOV - DICIEMBRE" en `artist.heroBanner`, `announcement.text`, `tourConfig.featuredTour.title`, `tourDates[1].date`, `tourDates[1].month`.
  2. Validar que `es.json` contiene "FINAL NOV - DICIEMBRE" en `home.badge`, `tour.featuredTitle`, y "FINAL NOV - DICIEMBRE 2026" en `tour.tourDate2Month`.
  3. Validar que `en.json` contiene "LATE NOV - DEC" en `home.badge`, `tour.featuredTitle`, y "LATE NOV - DEC 2026" en `tour.tourDate2Month`.
  4. Validar que los 8 idiomas restantes (`de`, `fr`, `it`, `pt`, `nl`, `pl`, `ja`, `zh`) tienen las traducciones calibradas para "Final Nov - Dic" sin omitir ninguna clave.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] La documentación de arquitectura local y de base de datos está actualizada.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-app-euro-tour-dates-late-nov-dec.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-euro-tour-dates-late-nov-dec.md)
- **Solution Spec**: [fix-app-euro-tour-dates-late-nov-dec-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-euro-tour-dates-late-nov-dec-implementation.md)
- **Branch**: `fix/app-euro-tour-dates-late-nov-dec`
- **Base Branch**: `develop`
