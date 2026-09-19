# Problem Spec: Internacionalización Multilingüe (8 Idiomas)

## What problem exists
La web oficial de la artista ANDHRAY (`apps/web`) actualmente cuenta con todos sus textos, navegación, biografía y páginas internas (Home, Contacto, Música, Eventos, Fotos/Videos, Live, Press Kit) codificados de forma fija en idioma español. 
Dado el alcance internacional de la artista (giras en Europa: Italia, Alemania, y proyección global en festivales, clubes y plataformas de streaming), los promotores internacionales, agencias de booking, periodistas y fanáticos que no dominan el idioma español encuentran una barrera lingüística que reduce la conversión de reservas de fechas, la accesibilidad de su prensa oficial (EPK) y la experiencia de usuario.

## Why it matters
1. **Booking & Expansión Internacional**: La artista tiene un tour europeo activo (Italia y Alemania en 2026/2027) y demanda global. Contar con versiones nativas en Inglés (`en`), Alemán (`de`) e Italiano (`it`) facilita la comunicación directa con promotores de clubes como HÖR Berlin, Berghain, Tresor y promotores de todo el continente europeo.
2. **Alcance en Mercados Clave**: La incorporación de Francés (`fr`), Portugués (`pt`), Chino Simplificado (`zh`) y Japonés (`ja`) abre canales directos en mercados clave de música electrónica asiática y latinoamericana/europea.
3. **Indexación y SEO Global**: El uso de URLs localizadas con sub-rutas dinámicas (`/[locale]/...`) y slugs traducidos permite que los motores de búsqueda (Google, Bing, Baidu, Yahoo Japan) indexen las páginas de ANDHRAY en cada idioma respectivo, mejorando el posicionamiento orgánico.

## What outcome is expected
1. **Soporte de 8 Idiomas**: Inglés (`en`, fallback general), Español (`es`), Alemán (`de`), Italiano (`it`), Francés (`fr`), Portugués (`pt`), Chino Simplificado (`zh`), Japonés (`ja`).
2. **Detección Automática**: Al entrar a `/`, el sistema detecta la cabecera `Accept-Language` del visitante y redirige a su idioma correspondiente si está soportado, o a `/en` por defecto.
3. **Sub-rutas y Slugs Localizados**: Cada idioma tiene su prefijo (`/es`, `/de`, etc.) y las rutas internas se traducen a sus términos locales (ej: `/es/contacto` vs `/de/kontakt` vs `/en/contact`).
4. **Selector de Idiomas UI Minimalista**: Selector desplegable oscuro en el Header (junto a los enlaces de redes sociales) y en el drawer de navegación móvil, con estética editorial, mostrando el código activo y nombres nativos.
5. **Preservación de Términos Techno**: El nombre de la artista (**ANDHRAY**), colectivo/sello (**Industrial Girls**), títulos de tracks (**MEMENTO**, **EN NAPL**, etc.) y géneros clave (**HARD DANCE**, **ACID**, **GROOVE**) se mantienen inmutables en su forma original.
6. **Pruebas y Validación**: Suite de pruebas unitarias cubriendo la resolución de rutas, la carga de mensajes y la integridad de los diccionarios, con `pnpm validate` pasando al 100%.

## What gaps exist today
1. **Ausencia de Motor i18n**: No existe una librería ni infraestructura configurada en `apps/web` para gestionar localización en Next.js 16 App Router.
2. **Textos Acoplados en Componentes**: Las páginas y componentes de `apps/web/src/components` y `apps/web/src/data/site-config.ts` contienen cadenas de texto fijas en español sin abstracción de claves de traducción.
3. **Estructura de Rutas Plana**: Las rutas residen directamente en `apps/web/src/app/*` en lugar de estar contenidas bajo el segmento de ruta dinámico `apps/web/src/app/[locale]/*`.
4. **Falta de Diccionarios de Idioma**: No existen los archivos de traducción para los 8 idiomas requeridos.

## What questions remain open
Todas las preguntas de diseño fueron resueltas y consensuadas con el usuario en la sesión `/grill-me`:
- Detección automática en navegador con fallback a `en`.
- Estructura de sub-rutas `/[locale]/...` con slugs traducidos mediante middleware.
- Selector minimalista en navbar y menú móvil.
- Alcance técnico enfocado en Next.js 16 + React 19 mediante `next-intl`.
