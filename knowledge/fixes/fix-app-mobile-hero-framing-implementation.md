# Solution Spec: mobile-hero-framing Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La solución ajusta la presentación responsiva del componente Hero en la capa de presentación de Next.js App Router:
1. **Presentation Layer (`apps/web/src/app/page.tsx` & `apps/web/src/components/home/hero-section.tsx`)**:
   - Modificar la propiedad `className` del componente `<Image />` en `apps/web/src/app/page.tsx` para incorporar clases de `object-position` responsivas.
   - En pantallas móviles (`< md`), aplicar una posición focal precisa orientada a la posición del rostro en la fotografía original (`object-[70%_15%]` o `object-[68%_top]`), evitando que el recorte horizontal excluya la cabeza y rostro de la artista.
   - En pantallas medianas y grandes (`md:` en adelante), preservar `md:object-top` para mantener el encuadre editorial panorámico actual.
2. **Application/Consumption Layer**: No requiere cambios (se consumen los mismos metadatos y configuración del artista).
3. **Domain/Pipelines Layer**: No requiere lógica de negocio adicional.
4. **Infrastructure Layer**: Mantiene los assets estáticos en `public/hero-bg.jpg`.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Calibración responsiva de encuadre en `apps/web/src/app/page.tsx` y test de regresión responsive de layout.
  - Red: Escribir prueba unitaria que verifique que el elemento `<Image />` del hero renderiza clases responsivas diferenciadas para mobile y desktop.
  - Green: Implementar las clases Tailwind responsivas `object-[70%_top] md:object-top` en `apps/web/src/app/page.tsx`.
  - Refactor: Auditar limpieza de código, verificar que no hay regresiones en breakpoints mayores (`lg`, `xl`) y que los comentarios de capa cumplen la gobernanza.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `tests/unit/mobile-hero-framing.test.ts`
- **Command**: `pnpm test tests/unit/mobile-hero-framing.test.ts`
- **Assertion Goals**:
  - Validar que el componente o la página principal define la clase responsiva de punto focal para móvil (por ejemplo `object-[70%_` o clase calibrada) y la preservación de `md:object-top` en desktop.
  - Validar que la jerarquía de capas z-index y degradados se mantiene íntegra.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] La documentación de arquitectura local está sincronizada.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-app-mobile-hero-framing.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-mobile-hero-framing.md)
- **Solution Spec**: [fix-app-mobile-hero-framing-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-mobile-hero-framing-implementation.md)
- **Branch**: `fix/app-mobile-hero-framing`
- **Base Branch**: `develop`
