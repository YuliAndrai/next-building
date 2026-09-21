# Problem Spec: mobile-hero-framing

## What problem exists
En dispositivos móviles (smartphones y pantallas estrechas con viewport < 768px), la fotografía principal del artista (`/hero-bg.jpg`) en el Hero de la página principal (`apps/web/src/app/page.tsx`) queda severamente desencuadrada y cortada.
Actualmente se utiliza la clase `object-cover object-top` sobre la imagen dentro de un contenedor de `h-[160vh]`. Debido a la relación de aspecto vertical extrema en móviles (9:19.5) y al hecho de que la fotografía original (`2486x2848`) ubica el rostro, ojos y cabello de ANDHRAY hacia el cuadrante superior derecho (`x ≈ 70%`, `y ≈ 25%`), la propiedad `object-top` (que centra horizontalmente al 50%) desplaza el encuadre hacia el fondo oscuro y corta más de la mitad del rostro por el borde derecho, dejando únicamente visible el cuello y el choker.

## Why it matters
1. **Impacto Visual y Branding de la Artista**: El Hero es el punto de contacto visual primordial para promotores, fanáticos y medios de prensa. Una fotografía cortada donde no se aprecia el rostro de la artista degrada la estética editorial minimalista y la percepción de calidad de la plataforma oficial.
2. **Experiencia Móvil Mayoritaria**: Más del 70% del tráfico de fans de música electrónica, redes sociales (Instagram, TikTok, Resident Advisor, SoundCloud) y promotores accede desde smartphones. El encuadre debe lucir impecable y equilibrado en cualquier pantalla móvil.
3. **Preservación del Diseño Editorial**: El contenido textual y badges del Hero están anclados en la esquina inferior izquierda (`HeroSection`), por lo que el rostro de ANDHRAY en el cuadrante superior/central derecho debe respirar sin ser tapado por el header ni cortado lateralmente.

## What outcome is expected
1. **Encuadre Centrado en el Rostro en Móvil**: La fotografía debe ajustar su `object-position` responsivo en pantallas móviles (`object-[70%_top]` o calibración precisa) para que la mirada, el rostro completo, el cabello y el estilo editorial de ANDHRAY queden claramente visibles y centrados en el viewport móvil.
2. **Preservación de la Experiencia Desktop**: En pantallas de escritorio y tablets (`md:` en adelante), el encuadre actual `md:object-top` debe mantenerse intacto sin alteraciones.
3. **Validación Visual y Responsive**: Comprobación con tests unitarios/Playwright y verificación visual en resoluciones móviles estándar (390px, 375px, 412px).
4. **Cumplimiento de Gobernanza**: `pnpm validate` debe ejecutarse con 0 errores y 0 advertencias.

## What gaps exist today
1. `apps/web/src/app/page.tsx` utiliza una clase fija `object-cover object-top` sin variantes responsivas para `object-position` según el breakpoint de pantalla.
2. La relación de aspecto vertical en móviles amplifica el zoom por altura (`h-[160vh]`), requiriendo que el punto focal horizontal esté explícitamente fijado en las coordenadas del rostro (`70%`).

## What questions remain open
- Ninguna pregunta abierta; la solución técnica consiste en desacoplar el `object-position` por breakpoint usando Tailwind CSS (`object-[70%_top] md:object-top` o `object-[68%_12%] md:object-top`) manteniendo el degradado y estructura de capas.
