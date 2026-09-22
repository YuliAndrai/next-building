# Problem Spec: redirect-known-google-links

## What problem exists
Al realizar búsquedas de la artista ANDHRAY en Google, los motores de búsqueda mantienen indexadas tres URLs correspondientes a la versión anterior de la plataforma:
1. `https://andhray.com/biografia`
2. `https://andhray.com/galeria`
3. `https://andhray.com/nuevos-lanzamientos`

Al acceder a cualquiera de estas tres rutas en el dominio actual, el servidor devuelve un error HTTP 404 (Not Found) debido a que no existen rutas estáticas ni dinámicas con esos nombres en la nueva arquitectura de Next.js App Router.

## Why it matters
1. **Preservación del Link Equity y Autoridad SEO**: Estas tres URLs indexadas por Google ya cuentan con historial, impresiones orgánicas y tráfico entrante. Un error 404 continuo ocasiona que Googlebot las desindexe y se pierda el posicionamiento acumulado de la marca ANDHRAY.
2. **Experiencia de Usuario (Evitar Rebote)**: Los usuarios que buscan la biografía, fotos/videos o lanzamientos de la artista terminan en una página de error, lo que eleva drásticamente la tasa de rebote y transmite una imagen descuidada.
3. **Conversión y Retención**: Redirigir el tráfico existente hacia los contenidos equivalentes actuales (`/#bio`, `/press-kit` y `/musica`) permite capturar visitantes y conducirlos directamente a la experiencia multimedia, biografía para prensa, reproductores de música y fechas de tour.

## What outcome is expected
1. **Redirecciones HTTP 301 (Moved Permanently)**:
   - Cualquier solicitud a `/biografia` o `/biografia/` debe responder con un HTTP 301 redirigiendo a `/#bio`.
   - Cualquier solicitud a `/galeria` o `/galeria/` debe responder con un HTTP 301 redirigiendo a `/press-kit`.
   - Cualquier solicitud a `/nuevos-lanzamientos` o `/nuevos-lanzamientos/` debe responder con un HTTP 301 redirigiendo a `/musica`.
2. **Preservación de Query Parameters**:
   - Parámetros adicionales (ej. UTM tags de tracking) deben preservarse o transferirse limpiamente al destino.
3. **Manejo a Nivel de Servidor / Edge**:
   - Las redirecciones deben resolverse en el archivo de configuración `next.config.ts` mediante la función canónica `redirects()`, evitando ciclos de procesamiento innecesarios en el cliente o llamadas a componentes no existentes.
4. **Validación Automatizada (TDD)**:
   - Crear una suite de pruebas unitarias que evalúe exhaustivamente la configuración de redirecciones devuelta por `nextConfig.redirects()`, verificando `source`, `destination`, `permanent: true` (HTTP 301).

## What gaps exist today
1. En `next.config.ts` no existe la propiedad `async redirects()`.
2. No existen alias ni rewrites para las rutas legadas indexadas por Google.
3. No existe una suite de pruebas automatizadas que prevenga la eliminación accidental de estas reglas de redirección en futuros despliegues.

## What questions remain open
- Todas las preguntas han sido resueltas y aprobadas por el usuario:
  - Destino de `/biografia`: `/#bio` (sección editorial en Home).
  - Destino de `/galeria`: `/press-kit` (prensa y material audiovisual oficial).
  - Destino de `/nuevos-lanzamientos`: `/musica`.
  - Mecanismo de implementación: Opción 1 (`next.config.ts` con código HTTP 301 permanente).
