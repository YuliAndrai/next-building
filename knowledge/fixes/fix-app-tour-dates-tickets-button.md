# Problem Spec: tour-dates-tickets-button

## What problem exists
En el sitio web oficial de ANDHRAY (`andhray.com`), en la sección interactiva de calendario de fechas de gira (`TourDatesSection` en Home y `/eventos`), cada una de las fechas de shows en vivo (Quito, Cuenca, Barcelona, España, Padua, Lyon, Tenerife, Dubai, Madrid) presentaba un botón que decía `"BOOKING ABIERTO"` que abría un chat de WhatsApp para solicitar contratación de la fecha.

Esto generaba una experiencia confusa y contradictoria para los fanáticos y asistentes generales, dado que:
1. Las fechas individuales de gira ya son eventos confirmados donde la audiencia busca comprar o reservar entradas (`TICKETS`), no contratar al artista para dicha fecha.
2. La disponibilidad de contratación ("Booking abierto") únicamente corresponde a la gira destacada a nivel de promotores, salas y clubes (`CLOSING 2026 // OPENING 2027`).
3. En la versión mobile, los botones de acción requerían calibración responsive (`w-full md:w-auto`, `justify-center`) para permitir interacción táctil ergonómica y visualización consistente en dispositivos móviles.

## Why it matters
1. **Experiencia de Usuario y Conversión de Entradas**: Los fanáticos que asisten a la web para ver las fechas de conciertos necesitan un botón claro de "TICKETS" para acceder a las entradas de cada show, eliminando fricción.
2. **Claridad para Promotores vs. Audiencia**: Mantener "Booking Abierto" de forma prominente en el banner de la "Gira Destacada" preserva el canal corporativo para promotores y agencias, mientras el calendario de fechas atiende a la audiencia.
3. **Consistencia Responsive Mobile & Desktop**: Garantiza que tanto en pantallas móviles como en escritorio la interfaz sea fluida, accesible y fiel a la identidad visual de ANDHRAY.

## What outcome is expected
1. **Reemplazo en Fechas de Shows**:
   - Cada fecha activa en el calendario (`upcomingTourDates`) muestra un botón con ícono de ticket que dice `"TICKETS"` (localizado en español vía `t.tour.ticketsBadge`).
   - Las fechas de lanzamientos discográficos (`type: "release"`) mantienen su botón `"DISCOGRAFÍA"`.
   - Las fechas concluidas mantienen el badge `"COMPLETADO"`.
2. **Booking Exclusivo en Gira Destacada**:
   - El badge `"BOOKING ABIERTO"` se exhibe con pulso animado en la cabecera de la tarjeta de "Gira Destacada" tanto en `TourDatesSection` como en `NewsSection`.
   - Los botones de "WhatsApp Booking" y "Email Booking" permanecen en la tarjeta de gira destacada para atención a promotores.
3. **Calibración Mobile**:
   - Los botones en la vista móvil se adaptan a ancho completo y centrado táctil (`w-full md:w-auto text-center justify-center`).
4. **Gobernanza & Calidad**:
   - `pnpm validate` pasa con 0 errores y todas las pruebas automatizadas se mantienen en verde.

## What gaps exist today
1. `apps/web/src/data/site-config.ts` tenía `status: "booking"` en todas las fechas de `upcomingTourDates`.
2. `apps/web/src/components/home/tour-dates-section.tsx` contenía una bifurcación que forzaba el botón de WhatsApp Booking en cada fecha de la tabla.
3. `apps/web/src/messages/es.json` tenía `"ticketsBadge": "ENTRADAS"` en lugar de `"TICKETS"`.

## What questions remain open
- Ninguna pregunta abierta; los requerimientos fueron especificados con precisión por el usuario.
