# Problem Spec: tour-barcelona-city-hall-and-mobile-segmentation

## What problem exists
En el sitio web oficial de ANDHRAY (`andhray.com`), la sección de calendario de fechas de gira (`TourDatesSection`) y el anuncio en `NewsSection`:
1. No incluían la fecha recientemente confirmada en Barcelona: **9 de Diciembre de 2026 en City Hall (Industrial Girls 7mo Aniversario x Nalgotika)**.
2. En dispositivos móviles, la lista de fechas se mostraba como un bloque vertical continuo sin segmentación por mes ni período, lo que generaba un scroll excesivamente largo y consumía demasiado espacio en pantalla.
3. Las tarjetas de fecha en móvil apilaban fecha, detalles y botón a ancho completo ocupando hasta ~140px de altura vertical por evento, perjudicando la experiencia de navegación táctil.

## Why it matters
1. **Veracidad y Asistencia en Barcelona**: La confirmación de la fecha en City Hall Barcelona con Nalgotika y el 7mo aniversario de Industrial Girls es un hito clave de la gira internacional. Los promotores y fanáticos requieren información precisa y actualizada.
2. **Ergonomía y UX Móvil**: La mayoría de seguidores y usuarios del circuito de música electrónica consultan la web desde teléfonos móviles. Segmentar las fechas por mes y compactar las tarjetas en una sola fila horizontal permite consultar el itinerario en segundos sin scroll interminable.
3. **Conversión y Claridad de Fechas**: Agrupar y filtrar por mes (`NOV '26`, `DIC '26`, `ENE '27`, `PASADAS`) facilita que los usuarios encuentren inmediatamente los eventos de su ciudad o mes de interés.

## What outcome is expected
1. **Inclusión de la Fecha 09.12.2026**:
   - Fecha registrada en `upcomingTourDates` en `apps/web/src/data/site-config.ts`: `09.12.2026`, Barcelona, Spain, `City Hall x Industrial Girls 7th Anniv. x Nalgotika`.
   - Estado `tickets` y botón funcional hacia `/contacto`.
   - Resumen del itinerario en `NewsSection` actualizado con mención explícita a ambas fechas de Barcelona (`M7 & City Hall`).
2. **Segmentación de Fechas**:
   - Pestañas de control segmentado con scroll horizontal táctil: `PRÓXIMOS (12)`, `NOV '26 (4)`, `DIC '26 (5)`, `ENE '27 (3)`, `PASADAS (2)` y `TODAS (14)`.
   - Divisores visuales sticky por mes (`// NOVIEMBRE 2026`, `// DICIEMBRE 2026`, `// ENERO 2027`) en vistas combinadas.
3. **Compactación Móvil**:
   - Tarjetas responsivas en una sola fila horizontal en móvil (`~44px` de alto frente a `~140px` anterior), ahorrando más del 65% de espacio vertical.
   - Botón de tickets en pastilla compacta a la derecha sin saltos de línea innecesarios.
   - Tarjeta destacada de gira optimizada para pantallas pequeñas con botones de contacto en cuadrícula de 2 columnas.
4. **Calidad y TDD**:
   - Suite `tests/tour-dates-2026-2027.test.ts` actualizada para verificar que `Nalgotika` / `City Hall` esté definida el `09.12.2026` en Barcelona.
   - 130 tests pasando en verde y `pnpm typecheck` con 0 errores.

## What gaps exist today
1. La fecha de 09.12 en City Hall Barcelona no estaba dada de alta en `site-config.ts`.
2. Las pruebas unitarias previamente esperaban que `Nalgotika` fuera `undefined`.
3. `TourDatesSection` solo permitía filtrar entre "Próximos Shows" y "Fechas Pasadas", sin segmentación por mes.
4. El layout móvil apilaba verticalmente los elementos de cada fecha ocupando demasiado espacio.

## What questions remain open
- Ninguna pregunta abierta; los requerimientos de la fecha, sala, colaboración y segmentación móvil fueron provistos con exactitud.
