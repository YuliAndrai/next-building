# Solution Spec: redirect-known-google-links Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
La solución implementa reglas de redirección canónica permanente HTTP 301 a nivel de configuración del framework (Next.js), alineada con la arquitectura funcional del repositorio:

1. **Presentation Layer (app, components)**:
   - Los destinos de aterrizaje ya existen y están verificados:
     - Home Page con ancla `<section id="bio">` en `apps/web/src/app/page.tsx` y `apps/web/src/components/home/bio-section.tsx`.
     - Kit de prensa oficial y material audiovisual en `apps/web/src/app/press-kit/page.tsx`.
     - Catálogo discográfico en `apps/web/src/app/musica/page.tsx`.
2. **Application / Routing Layer (`next.config.ts`)**:
   - Incorporación del hook asíncrono `redirects()` en `nextConfig`.
   - Definición estricta de las tuplas de redirección:
     - `{ source: "/biografia", destination: "/#bio", permanent: true }`
     - `{ source: "/galeria", destination: "/press-kit", permanent: true }`
     - `{ source: "/nuevos-lanzamientos", destination: "/musica", permanent: true }`
3. **Domain / Validation Layer (`tests/redirects.test.ts`)**:
   - Pruebas unitarias automatizadas en Vitest que importan la configuración de Next.js y validan:
     - Existencia de la función `redirects`.
     - Presencia exacta de cada origen (`source`).
     - Presencia exacta de cada destino (`destination`).
     - Verificación del flag `permanent: true` (código HTTP 301).
4. **Infrastructure Layer (Edge Routing / Vercel Platform)**:
   - Next.js compila estas reglas a nivel de manifiesto de enrutamiento (`routes-manifest.json`), delegando la ejecución a la capa Edge de Vercel antes de que la solicitud alcance el runtime de React Server Components.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1**: Configuración de Redirecciones Canónicas para URLs Indexadas de Google
  - **Fase RED (TDD)**: Diseñar y escribir la suite de tests en `tests/redirects.test.ts` asegurando que falle inicialmente (RED) al no existir aún el método `redirects()` en `next.config.ts`.
  - **Fase GREEN (Implementación)**: Incorporar `redirects()` en `next.config.ts` con tipado estricto `NextConfig` y comentarios explicativos por capa hasta que todos los tests pasen a verde.
  - **Fase REFACTOR (Clean Code)**: Auditar la estructura de `next.config.ts` y tests para asegurar adherencia a Clean Code, in-code commentary y 0 warnings en `pnpm validate`.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `tests/redirects.test.ts`
- **Command**: `pnpm test tests/redirects.test.ts`
- **Assertion Goals**:
  1. Verificar que `nextConfig.redirects` sea una función asíncrona definida.
  2. Ejecutar `redirects()` y comprobar que retorna una lista que contiene las 3 reglas requeridas.
  3. Validar que cada regla tiene `source`, `destination` y `permanent === true`.
  4. Validar que no existan redirecciones circulares o destinos inexistentes.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde), incluyendo `tests/redirects.test.ts`.
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] La documentación de arquitectura local está actualizada.
- [ ] Aprobación explícita del humano registrada (Human Design y Human Acceptance).

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-app-redirect-known-google-links.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-redirect-known-google-links.md)
- **Solution Spec**: [fix-app-redirect-known-google-links-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-redirect-known-google-links-implementation.md)
- **Status Tracker**: [.agents/active_task_state.json](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/.agents/active_task_state.json)
