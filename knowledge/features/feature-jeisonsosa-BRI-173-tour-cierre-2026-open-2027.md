# Problem Spec: tour-cierre-2026-open-2027

## What problem exists
En la plataforma oficial de ANDHRAY (`andhray.com`), la sección de eventos y novedades presenta un calendario desactualizado del Euro Tour previo y carece del anuncio oficial del primer tramo de la gira internacional **"Closing 2026 // Opening 2027"**.

La artista ha confirmado el siguiente calendario oficial:
- **LATAM**:
  - `24.10.2026`: Pereira, Colombia (Tunnel x Station Group) ☑️ (Fecha pasada)
  - `31.10.2026`: Pasto, Colombia (Void Psy x Macabro) (Fecha pasada)
  - `06.11.2026`: Quito, Ecuador (Kønqüeêr x Antrum) (Próxima)
  - `07.11.2026`: Cuenca, Ecuador (Hideout) (Próxima)
  - `18.11.2026`: 💿 EP RELEASE: 02 ++GATTA (Lanzamiento especial)
- **EUROPE & MIDDLE EAST**:
  - `27.11.2026`: Barcelona, Spain (M7 Club) (Próxima)
  - `05.12.2026`: Spain (Nøir Secret Rave) (Próxima)
  - `11.12.2026`: Florence, Italy (Warehouse 303) (Próxima)
  - `12.12.2026`: Padua, Italy (Loco Club x Industrial Girls 7th Anniv.) (Próxima)
  - `19.12.2026`: Barcelona, Spain (Meet & Greet x Nalgotika) (Próxima)
  - `25.12.2026`: Tenerife, Spain (ElDiabloCanario x Industrial Girls 7th Anniv.) (Próxima)
  - `06.01.2027`: 🎂 BIRTHDAY TRACK RELEASE (Lanzamiento especial)
  - `09.01.2027`: Dubai, UAE (Próxima)
  - `15.01.2027`: Madrid, Spain (UnderHell x LegionTechno, Sala Muv) (Próxima)
- **MORE DATES TO BE ANNOUNCED**:
  - Bookings: `industrialgirls.techno@gmail.com`

Además:
1. Las fechas que ya sucedieron (Pereira y Pasto) deben mostrarse claramente como fechas pasadas/concluidas para mantener el historial del tour sin confundir a los promotores o asistentes.
2. En la página de inicio debe presentarse una sección de Novedades y Noticias destacando el anuncio del tour junto con el flyer oficial ubicado en `apps/web/public/primeras-fechas-confirmadas-tour-cierre-2026/ANDHRAY_TOUR 2026 2027.jpg`.
3. La sección de siguientes shows (`TourDatesSection` en Home y `/eventos`) debe presentar la agenda completa de shows futuros y enlace a booking.

## Why it matters
1. **Veracidad y Precisión de Booking Internacional**: Los promotores de Colombia, Ecuador, España, Italia y Emiratos Árabes Unidos consultan la web para corroborar la disponibilidad de fechas y contactar a la agencia (`industrialgirls.techno@gmail.com`).
2. **Impacto Visual y Difusión de Marca**: El lanzamiento visual del afiche oficial y los hitos discográficos (EP Release 02 ++GATTA y Birthday Track) en la portada del sitio maximiza el engagement y la asistencia a los eventos.
3. **Claridad Temporal (Pasadas vs. Próximas)**: Separar las fechas concluidas de las vigentes evita dudas en asistentes sobre venta de tickets y demuestra el dinamismo de la gira.

## What outcome is expected
1. **Configuración Centralizada (`site-config.ts`)**:
   - Estructuración de `tourDates` con todas las fechas próximas (Quito, Cuenca, Barcelona, España Nøir, Florence, Padua, Barcelona Meet & Greet, Tenerife, Dubai, Madrid) e hitos especiales (EP Release, Birthday Track).
   - Estructuración de `pastTourDates` con las fechas concluidas (Pereira ☑️, Pasto).
   - Actualización de `featuredTour` con el título "Closing 2026 // Opening 2027" y referencia al flyer.
2. **Sección de Novedades en Home (`NewsSection`)**:
   - Incorporación del anuncio oficial del tour con imagen del flyer oficial, descripción de la gira y llamado a reservas.
3. **Sección de Shows y Eventos (`TourDatesSection` y `/eventos`)**:
   - Listado interactivo de próximas fechas con badges informativos (Tickets, Booking, Concluido, Especial).
   - Bloque o selector de fechas pasadas para visualizar el historial completado del tour.
4. **Soporte de Localización (i18n)**:
   - Claves de traducción actualizadas para reflejar "CLOSING 2026 // OPENING 2027", "FECHAS PASADAS" y descripciones en español e inglés como base, con compatibilidad para los demás idiomas.
5. **Calidad y TDD**:
   - Suite de pruebas automatizadas en `tests/tour-dates-2026-2027.test.ts` que asegure la integridad de fechas pasadas y próximas.
   - `pnpm validate` pasando al 100% con 0 errores de TypeScript y linting.

## What gaps exist today
1. `site-config.ts` solo contiene 2 fechas genéricas obsoletas de octubre y noviembre/diciembre 2026.
2. No existe separación de fechas pasadas vs próximas en el tipo `TourDate` ni en `TourDatesSection`.
3. `NewsSection` solo muestra HÖR Berlin y Memento, sin destacar el afiche oficial ni la gira 2026-2027.
4. Falta test automatizado que garantice que las 11+ fechas próximas y las 2 fechas pasadas estén correctamente indexadas.

## What questions remain open
- Ninguna pregunta abierta; los datos del tour, las salas, los países, las fechas pasadas y el afiche fueron provistos íntegramente por el usuario.
