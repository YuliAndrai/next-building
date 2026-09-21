# Problem Spec: euro-tour-dates-late-nov-dec

## What problem exists
En la plataforma oficial de ANDHRAY (`andhray.com`), las fechas del tour a Europa 2026 (Italia y Alemania) se promocionan actualmente de forma genérica como `"NOV - DIC"` o `"NOV - DEC 2026"`.
La artista ha definido un ajuste específico en el calendario de booking y presentaciones: el tour europeo no inicia a comienzos de mes, sino a finales de noviembre, abarcando hasta diciembre.
Actualmente:
- En español se muestra `"EURO TOUR (NOV - DIC)"` y `"NOV - DIC 2026"`, cuando debe especificar `"Final Nov - Diciembre"`.
- En inglés se muestra `"EURO TOUR (NOV - DEC)"` y `"NOV - DEC 2026"`, cuando debe especificar `"Late Nov - Dec"`.
- Este desfase temporal existe en múltiples capas y archivos:
  1. En los 10 diccionarios i18n (`apps/web/src/messages/*.json`: `badge`, `featuredTitle`, `tourDate2Month`, `cardTourDescription`).
  2. En la configuración global de datos (`apps/web/src/data/site-config.ts`: `artist.heroBanner`, `announcement.text`, `tourConfig.featuredTour.title`, `tourDates[1].date`, `tourDates[1].month`).

## Why it matters
1. **Precisión para Promotores y Clubes (Booking)**: ANDHRAY tiene abierta la agenda para promotores y clubes en Europa (Italia y Alemania). Mostrar un rango impreciso ("Nov - Dic") genera solicitudes de booking para principios/mediados de noviembre cuando la artista aún no se encuentra en el continente, afectando la logística internacional.
2. **Consistencia Global Multilingüe**: El sitio web ofrece soporte completo en 10 idiomas (`es`, `en`, `de`, `fr`, `it`, `pt`, `nl`, `pl`, `ja`, `zh`). La actualización debe ser coherente y nativa en todos los idiomas sin omitir ninguna vista o etiqueta.
3. **Coherencia Visual y Experiencia de Usuario**: Tanto en la cabecera / hero banner como en la sección de "Siguientes Eventos" (`TourDatesSection`) y el módulo de booking / contacto, la información debe ser 100% homogénea para evitar confusiones al visitante.

## What outcome is expected
1. **Español (`es`)**:
   - Hero Badge / Banners: `"EURO TOUR (FINAL NOV - DICIEMBRE)"`
   - Tour Featured Title: `"EURO TOUR (FINAL NOV - DICIEMBRE)"`
   - Tour Date Month: `"FINAL NOV - DICIEMBRE 2026"`
   - Tour Card Description: `"Agenda abierta para fechas en Italia, Alemania y resto de Europa (Finales de Noviembre – Diciembre 2026)."`
2. **Inglés (`en`)**:
   - Hero Badge / Banners: `"EURO TOUR (LATE NOV - DEC)"`
   - Tour Featured Title: `"EURO TOUR (LATE NOV - DEC)"`
   - Tour Date Month: `"LATE NOV - DEC 2026"`
   - Tour Card Description: `"Open routing for dates in Italy, Germany, and the rest of Europe (Late November – December 2026)."`
3. **8 Idiomas Adicionales**:
   - `de` (Alemán): `"EUROPA-TOUR (ENDE NOV - DEZ)"`, `"ENDE NOV - DEZ 2026"`
   - `fr` (Francés): `"TOURNÉE EUROPÉENNE (FIN NOV - DÉC)"`, `"FIN NOV - DÉC 2026"`
   - `it` (Italiano): `"EURO TOUR (FINE NOV - DIC)"`, `"FINE NOV - DIC 2026"`
   - `pt` (Portugués): `"EURO TOUR (FINAL NOV - DEZ)"`, `"FINAL NOV - DEZ 2026"`
   - `nl` (Neerlandés): `"EURO TOUR (EIND NOV - DEC)"`, `"EIND NOV - DEC 2026"`
   - `pl` (Polaco): `"EURO TOUR (KONIEC LIS - GRU)"`, `"KONIEC LIS - GRU 2026"`
   - `ja` (Japonés): `"EURO TOUR 2026 (11月下旬〜12月)"`, `"2026年11月下旬〜12月"`
   - `zh` (Chino): `"2026欧洲巡演 (11月下旬 - 12月)"`, `"2026年11月下旬 - 12月"`
4. **Capa de Configuración del Sitio (`site-config.ts`)**:
   - Sincronizar los fallbacks y constantes canónicas con el nuevo formato.
5. **Gobernanza & TDD**:
   - Crear suite de tests TDD que verifique la presencia exacta del nuevo texto en todas las claves de traducción y datos.
   - `pnpm validate` pasa al 100% en verde (0 errores, 0 warnings).

## What gaps exist today
1. Los 10 archivos de traducción en `apps/web/src/messages/` contienen las cadenas antiguas con `"NOV - DIC"`, `"NOV - DEC"`, etc.
2. `apps/web/src/data/site-config.ts` mantiene cadenas con formato antiguo sin especificar el inicio a finales de mes.
3. No existe un test automatizado que verifique la sincronización de las fechas del Euro Tour a través de todos los diccionarios.

## What questions remain open
- Ninguna pregunta abierta; el requerimiento del usuario es preciso y explícito en el formato para español e inglés, extendible de forma unívoca a los demás 8 idiomas.
