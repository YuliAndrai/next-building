# Solution Spec: Internacionalización (i18n) Multilingüe Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture

La implementación sigue la estricta separación de 4 capas funcionales del proyecto y utiliza `next-intl` (compatible con Next.js 16 App Router y React 19) para la carga y resolución de mensajes en Server y Client Components:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Presentation Layer                                       │
│    - apps/web/src/app/[locale]/layout.tsx                   │
│    - apps/web/src/app/[locale]/page.tsx                     │
│    - apps/web/src/app/[locale]/[slug]/page.tsx              │
│    - apps/web/src/components/ui/language-switcher.tsx      │
│    - apps/web/src/components/layout/header.tsx (localized)  │
│    - apps/web/src/components/layout/footer.tsx (localized)  │
├─────────────────────────────────────────────────────────────┤
│ 2. Application / Consumption Layer                          │
│    - apps/web/src/i18n/navigation.ts (Link, useRouter, etc.)│
│    - apps/web/src/i18n/hooks.ts                             │
│    - apps/web/src/i18n/routing.ts                           │
├─────────────────────────────────────────────────────────────┤
│ 3. Domain / Pipelines / Services Layer                      │
│    - apps/web/src/i18n/request.ts (dynamic message loader)  │
│    - apps/web/src/i18n/constants.ts (locales, labels)       │
│    - apps/web/src/messages/{locale}.json (8 diccionarios)   │
├─────────────────────────────────────────────────────────────┤
│ 4. Infrastructure / Request Proxy Layer                     │
│    - apps/web/src/proxy.ts (Next.js 16 Proxy convention)    │
│    - NextIntlClientProvider (React 19 context boundary)      │
└─────────────────────────────────────────────────────────────┘
```

### 1. Presentation Layer
- **`apps/web/src/components/ui/language-switcher.tsx`**: Componente de cliente con popover/dropdown oscuro minimalista que permite conmutar entre los 8 idiomas respetando la ruta actual.
- **`apps/web/src/app/[locale]/layout.tsx`**: Layout raíz localizado que provee `NextIntlClientProvider` y configura `<html lang={locale}>`.
- **`apps/web/src/app/[locale]/page.tsx`**: Home page de ANDHRAY con textos reactivos a las traducciones.
- Componentes de Home adaptados: `HeroSection`, `BioSection`, `NewsSection`, `TourDatesSection`, `BookingSection`.

### 2. Application / Consumption Layer
- **`apps/web/src/i18n/routing.ts`**: Definición de la configuración de rutas con `defineRouting`, especificando `locales: ['en', 'es', 'de', 'it', 'fr', 'pt', 'zh', 'ja']`, `defaultLocale: 'en'` y tabla de `pathnames` para la traducción de slugs.
- **`apps/web/src/i18n/navigation.ts`**: Componentes `Link`, `redirect`, `usePathname`, `useRouter` creados a través de `createNavigation(routing)`.

### 3. Domain / Pipelines Layer
- **`apps/web/src/i18n/request.ts`**: Controlador con `getRequestConfig` que valida el parámetro `locale` contra la lista permitida y carga dinámicamente el archivo `messages/${locale}.json`.
- **`apps/web/src/i18n/constants.ts`**: Metadatos de idiomas con nombres nativos (English, Deutsch, Italiano, Português, Français, Español, 简体中文, 日本語) y códigos ISO.
- **`apps/web/src/messages/*.json`**: Catálogo de 8 archivos JSON con traducciones completas para las secciones:
  - `nav`: Home, Música, Fechas de Tour & Contacto, Press Kit.
  - `home`: Hero subtítulos, badges, slogan.
  - `bio`: Biografía completa, declaración artística, colectivo Industrial Girls, métricas clave.
  - `tour`: Textos descriptivos de fechas y convocatorias de booking en Europa y América Latina.
  - `news`: Encabezados de releases y podcasts.
  - `booking`: Formulario interactivo, credenciales de management (Laura, email, teléfono).
  - `footer`: Derechos reservados, sello discográfico, enlaces legales.

### 4. Infrastructure Layer
- **`apps/web/src/proxy.ts`**: Convención oficial de Next.js 16 (`proxy.ts` en reemplazo del middleware deprecado) que implementa la función `proxy()` para interceptar solicitudes, analizar `Accept-Language`, reescribir slugs localizados y redirigir a la URL canónica correspondiente.

---

## 3. Atomic Slices & Logical Sequence

- **Slice 1 (Scaffolding & Types)**: Definición de contratos, interfaces de i18n, constantes de los 8 idiomas y configuración de enrutamiento con stubs.
- **Slice 2 (TDD Red)**: Pruebas unitarias en Vitest para validar:
  1. Configuración de idiomas y validación de locales permitidos.
  2. Integridad de claves de traducción entre los 8 diccionarios (cero claves faltantes).
  3. Mapeo de slugs de rutas para cada idioma.
- **Slice 3 (Traducciones & Diccionarios)**: Creación de los 8 archivos de mensajes JSON completos y verificación de paridad semántica.
- **Slice 4 (Proxy & Enrutamiento Dinámico)**: Configuración de Next.js 16 `proxy.ts` y reorganización de carpetas de App Router bajo `[locale]`.
- **Slice 5 (Componentes UI & Integración)**: Implementación de `LanguageSwitcher` en `Header` y menú móvil, e integración de hooks `useTranslations` en componentes de presentación.
- **Slice 6 (Refactor & Gate 2)**: Auditoría de código limpio, comentarios obligatorios por capa y validación general (`pnpm validate`).

---

## 4. TDD (Test-Driven Development) Strategy

### Unit/Integration Tests (Fase RED)
- **Test File Path**: `tests/i18n/i18n-routing.test.ts` y `tests/i18n/translations-parity.test.ts`
- **Command**: `pnpm test tests/i18n`
- **Assertion Goals**:
  1. `SUPPORTED_LOCALES` contiene exactamente los 8 idiomas esperados (`['en', 'es', 'de', 'it', 'fr', 'pt', 'zh', 'ja']`).
  2. Todos los archivos de traducción en `apps/web/src/messages/{locale}.json` contienen el 100% de las claves maestras definidas en el catálogo de referencia (`en.json` y `es.json`).
  3. Los mapeos de pathnames para `/contacto`, `/musica`, `/eventos`, etc. resuelven correctamente según el locale especificado.

---

## 5. Local Definition of Done (DoD)
- [x] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [x] La suite de pruebas de regresión pasa al 100% (verde) en Vitest (87/87 tests pasados).
- [x] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [x] Los 8 idiomas son accesibles mediante `/[locale]/...` con traducción de slugs.
- [x] El selector desplegable de idiomas funciona tanto en desktop como en dispositivos móviles.
- [x] Aprobación explícita del humano registrada (Human Acceptance otorgado por el usuario el 2026-09-19).

---

## 6. Spec Artifact Traceability
- **Problem Spec**: [feature-app-internacionalizacion.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/features/feature-app-internacionalizacion.md)
- **Solution Spec**: [feature-app-internacionalizacion-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/features/feature-app-internacionalizacion-implementation.md)
