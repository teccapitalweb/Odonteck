# Cambios v1.7 — Responsive fixes del sitio público

**Archivo modificado:** `styles.css` (solo al FINAL, sin tocar código existente)

**Archivos NO tocados:**
- `index.html`
- `pages/cursos.html`, `pages/servicios.html`, `pages/nosotros.html`, `pages/galeria.html`, `pages/contacto.html`
- `pages/privacidad.html`, `pages/terminos.html`, `pages/club.html`, `pages/club-login.html`
- `script.js`, `data.js`
- Todo lo del Club Dental (admin-club, club-miembro)
- Imágenes, contenido, colores, estructura

---

## 🎯 El problema que arreglamos

En móvil el título hero *"Una propuesta educativa diseñada para elevar tu nivel clínico."* se veía así:

```
Una
propuesta
educativa
diseñada para
elevar tu nivel
clínico.
```

**La causa:** La regla original del CSS tenía `font-size: clamp(2.7rem, 12vw, 4rem)` — ese **12vw** es desproporcionado. En una pantalla de 400px eso da letras de 48px, casi ingobernables.

Además, un `max-width: 10.5ch` en el h1 forzaba a que se partiera en muchas líneas.

---

## 🔧 Qué se corrigió

### Desktop (pantallas >1100px)
- `max-width` del h1 ampliado de `10.5ch` → `16ch` (título más horizontal, más respirado)
- Tamaño reducido a clamp realista
- Padding navbar más cómodo

### Tablet (1100px - 821px)
- Título con `clamp(2.2rem, 5.6vw, 3.6rem)` — simétrico en pantallas medianas

### Mobile mediano (<820px) — **EL FIX PRINCIPAL**
- Font-size bajado de `12vw` a `8vw` con tope en 2.8rem
- Line-height ajustado a 1.08 para compactar
- Padding lateral reducido para aprovechar ancho
- Botones hero más cómodos (flex: 1, min-width 140px)
- **Floating socials** (FB/IG/WA) movidos un poco para no chocar con scroll-top
- Socials más pequeños (44px en vez de 52px)

### Mobile pequeño (<560px)
- Título `clamp(1.75rem, 7.5vw, 2.4rem)` — perfecto en iPhone SE
- Botones altura 46px (más cómodo al tap)
- Stats cards compactos
- Brand del nav compacto
- CTA final con padding adaptado

### Mobile muy pequeño (<380px)
- Título aún más pequeño
- Se oculta el tagline del nav para dar aire

---

## 🎨 Lo que NO se cambió

- ✅ Paleta de colores (`--primary: #005187` y todos los demás)
- ✅ Tipografía (Inter)
- ✅ Estructura HTML de todas las páginas
- ✅ Textos y copys
- ✅ Imágenes
- ✅ Iconos flotantes en la derecha (quedaron ahí, solo más pequeños en móvil)
- ✅ Funcionalidad JS (hamburger, carruseles, modales, scroll-top)

---

## 🚀 Cómo subirlo

Es **SÚPER fácil** — solo reemplazas 1 archivo.

1. Descarga el ZIP
2. Descomprime → obtienes `styles.css`
3. GitHub → repo **`Odonteck`** → click en `styles.css` en la raíz
4. Ícono del lápiz ✏️ → Ctrl+A → Delete
5. Abre el `styles.css` del ZIP con Bloc de notas → Ctrl+A → Ctrl+C
6. Pega en GitHub (Ctrl+V)
7. **Commit changes**
8. Espera 1-2 min y ya

---

## 🧪 Cómo probar

### Mobile
1. Abre `odonteckconsulting.com` en tu celular
2. El título ahora se ve en 2-3 líneas máximo
3. Los botones llenan mejor el ancho
4. Los iconos flotantes no chocan con nada
5. Navega a Cursos, Servicios, Nosotros, Galería, Contacto — todas heredan los mismos estilos responsive

### Desktop
1. Abre en navegador
2. El hero se ve más respirado, con el título en menos líneas
3. Redimensiona la ventana — observa cómo se adapta suavemente

---

## ⚠️ Si no te gusta algún ajuste

Todo el bloque nuevo está al FINAL del archivo con el comentario:
```css
/* ═══ NUEVO v1.7 — Responsive fixes ═══ */
```

Si quieres revertir algo específico, puedes editar solo ese bloque sin afectar el resto del CSS original.

---

# Cambios v2.0 — Acabado premium del INDEX

**Archivos nuevos:** `premium.css` (capa de estilo cargada SOLO en index.html)
**Archivos modificados:** `index.html` (3 cambios: fuentes display en <head>, link a premium.css, mini-script de reveal-on-scroll al final)

**NO se tocó:**
- `styles.css` (intacto, las subpáginas siguen igual)
- `script.js`, `data.js` (lógica intacta: carruseles, modal, contadores, menú)
- Imágenes y assets (ninguno movido ni renombrado)
- pages/* (no cargan premium.css, quedan como estaban)

## Qué mejora
- Hero oscuro premium (navy OdonTeck) con aurora animada, grid sutil, titular con gradiente, eyebrow tipo pill con punto pulsante, botones con glow y checks tipo chip
- Stats en tarjetas glass flotando sobre el hero con barra shimmer superior y contadores intactos
- Eyebrows de sección como pills monoespaciadas
- Cards (mini-features, why, cursos) con hover lift, zoom sutil de imagen y detalles de borde
- Carruseles de galería/reseñas con desvanecido en los bordes
- CTA final con glows y patrón de grid
- Footer con labels mono y línea de luz superior
- Reveal-on-scroll aditivo (si JS no corre, todo queda visible)
- Tipografía display Plus Jakarta Sans + acentos JetBrains Mono (misma identidad que el panel VIP)

Paleta intacta: #005187 / #0c74c4 / #7fd3ff.

## v2.1 — Diente 3D en hero + stats móvil
- `index.html`: +1 div decorativo `.hero-tooth` (aria-hidden) dentro del hero
- `premium.css`: diente 3D con el asset EXISTENTE `assets/img/banner/tooth-hero.png` (PNG alfa, sin tocar imágenes) — flotando a la derecha en desktop con glow y animación suave; en móvil asoma arriba a la derecha al 45-50% de opacidad detrás del texto
- Stats en móvil: cuadrícula 2×2 compacta (antes 1 columna); contadores animados intactos en todos los tamaños

## v2.2 — Video 3D de fondo en el hero (imagen completa)
- `index.html`: el div .hero-tooth se sustituye por <video> de fondo con el asset EXISTENTE `assets/img/banner/animacion_3D.mp4` (loop 8s, muted, playsinline) + poster `hero-banner.png` + div .hero-veil
- `premium.css`: video cubre todo el hero (object-fit: cover), velo navy encima para legibilidad, grid sutil sobre el velo; en móvil el encuadre apunta al diente (object-position 74%)
- Si el navegador bloquea el autoplay o el video no carga, se ve el poster (la imagen completa del diente) bajo el mismo velo — nunca queda vacío
- Clase .hero-video propia para NO chocar con la regla vieja .hero-bg-video de styles.css

## v3.0 — Hero con FOTO de fondo (reemplaza al video)
- `index.html`: se elimina el <video> del hero; el fondo ahora es una foto vía CSS
- `premium.css`: el hero usa `assets/img/banner/hero-foto.jpg` como fondo cover (toda la imagen, adaptable a móvil/tablet/PC vía --hero-pos) + velo navy suave para que el texto blanco siempre sea legible encima. Si la foto faltara, queda un degradado navy de respaldo
- `assets/img/banner/hero-foto.jpg`: NUEVA. Por ahora es una provisional (derivada del asset existente hero-doctors.png). Para usar la foto definitiva del cliente: guardar su imagen con ESTE MISMO nombre y subirla a esta misma ruta, reemplazando la provisional. No hay que tocar código.

## v3.1 — Botón "Cómo registrarte" + modal de video tutorial
- `index.html`: botón en el hero con icono play, modal lightbox 16:9, y script que acepta link de Google Drive O YouTube (pegar el link en la constante VIDEO_URL, claramente marcada)
- `premium.css`: estilos del botón (glass con play pulsante) y del modal (backdrop blur, cierre con ✕ o Esc, corta la reproducción al cerrar)
- Mientras no se pegue el link, el botón se OCULTA solo — se puede subir ya sin riesgo
- El iframe carga solo al abrir el modal (no pesa nada en la carga de la página)

---

# Cambios v4.0 — Herramienta "Expediente Clínico" en el panel VIP

**Archivo modificado:** `vip-panel.html` (3 inserciones):
1. Nav sidebar: item "Expediente Clínico" (badge NUEVO) al inicio de Herramientas pro
2. Drawer móvil: mismo item
3. Módulo completo (CSS con prefijo hc- + JS) insertado antes del bloque Sprint 7

**Qué hace:**
- Lista de pacientes agrupada por fecha de última visita (Hoy/Ayer/fechas), buscador por nombre/teléfono, filtros Hoy/Semana/Mes/Todos, badges de alerta médica visibles desde la lista
- Expediente por pestañas: Ficha · Antecedentes (toggles) · Exploración/Odontograma (32 piezas FDI, tap para ciclar estado) · Evolución (notas con fecha, reordena la lista) · Documentos (conexión futura)
- Autoguardado con debounce en Firestore miembros/{uid}/pacientes/{id} + indicador Guardando/Guardado/Sin conexión
- Consentimiento opcional en 3 modos: sin registrar / papel / firma digital (canvas táctil, se guarda como PNG en el doc)
- PDF profesional con jsPDF: membrete, folio, alertas en rojo, antecedentes, hallazgos del odontograma, notas paginadas, firma incrustada, pie NOM-004 + numeración. Botones Descargar e Imprimir
- Paywall toolEsVIP() como las demás herramientas; textos escapados (esc) contra XSS
- Responsive: móvil/tablet/PC

**REQUIERE:** desplegar las reglas de Firestore (ver REGLAS-FIRESTORE-EXPEDIENTE.txt)
**NO tocado:** el resto del panel; clases con prefijo hc- sin colisiones

---

## v4.1 — fix 404 registro

**Archivo modificado:** `vip-auth.html` (3 líneas del bloque REGISTER)

Las redirecciones post-registro apuntaban a `vip-checkout.html`, página que no existe en el repo: los usuarios nuevos caían en un 404 antes de poder pagar. Ahora van a `vip-panel.html`, que ya maneja el estado sin-membresía y ofrece el checkout en su sección Suscripción. La rama de admin (`vip-admin.html`) queda igual.

**NO tocado:** estilos, textos, flujo de Google, y el resto de `vip-auth.html`

---

## v4.3 — gate de sesión (evita el flash del login)

**Archivo modificado:** `vip-auth.html` (4 inserciones, 94 líneas, 0 borrados)

El formulario de login/registro se renderizaba visible de inmediato, pero `onAuthStateChanged` es asíncrono: espera a que Firebase Auth restaure la sesión persistida (`browserLocalPersistence`) antes de decidir el redirect. Un usuario que YA tenía sesión alcanzaba a ver el formulario parpadear antes de que lo mandara al panel. Ahora una pantalla de carga de marca tapa el contenido desde el primer paint y solo se retira si Firebase confirma que NO hay sesión.

**Qué se agregó:**
1. CSS del gate (prefijo nuevo `auth-gate` / `ag-` para no colisionar): overlay full-screen con logo, spinner y "Verificando tu sesión…", en modo noche y día, responsive 375/768/1280 y con `prefers-reduced-motion`. El control son dos reglas: `body:not(.auth-ready) .auth-shell{display:none}` y `body.auth-ready .auth-gate{display:none}` — el gate es el estado por default, no requiere JS para mostrarse
2. Markup del `div#auth-gate` justo antes de `.auth-shell`, con `role="status"` y `aria-live="polite"`
3. Un `else` en `onAuthStateChanged` que llama `revealAuthShell()` cuando no hay usuario
4. Dos salvavidas para que nadie quede atrapado en el spinner: uno de 2.5s dentro del módulo (con guarda `auth.currentUser` para no interrumpir un redirect en curso) y uno de 5s en script clásico que solo dispara si el módulo de Firebase nunca arrancó (CDN caído), apoyado en la bandera `window.__odtAuthBooted`

**Verificado:** con sesión activa el formulario nunca se pinta — solo el gate y luego `vip-panel.html`; sin sesión el formulario aparece igual que antes. Login, registro, "olvidé mi contraseña" y Google sin cambios.

**Riesgo conocido:** si en una red lenta Firebase tarda más de 2.5s en restaurar la sesión, `auth.currentUser` sigue `null`, el salvavidas revela el formulario y el redirect llega después — flash. Es el trade-off deliberado contra dejar al usuario atrapado viendo solo el spinner.

**NO tocado:** la lógica interna del bloque `if (user)` (quedó idéntica), `index.html`, y los flujos de login / registro / forgot-password / Google

---

## v4.4 — Odontograma del Expediente: arcadas siempre alineadas en móvil

**Archivo modificado:** `vip-panel.html` (módulo Expediente Clínico, prefijo `hc-`)

En la pestaña "Exploración / Odontograma", las dos filas de 16 dientes usaban `display:flex; flex-wrap:wrap`. En pantallas angostas (≤400px) las 16 piezas no cabían, se envolvían y las arcadas superior/inferior quedaban desalineadas (el 11 dejaba de estar sobre el 41).

**Qué se cambió (solo CSS + un wrapper de presentación):**
1. `.hc-odo__row` pasó de flex-wrap a `display:grid; grid-template-columns:repeat(16, var(--hc-tw))` — 16 columnas fijas del mismo ancho, así ambas arcadas comparten la misma cuadrícula y nunca se parten
2. Nuevo wrapper `.hc-odo__scroll` (prefijo nuevo, sin colisión) alrededor de las dos filas, con `overflow-x:auto` + `-webkit-overflow-scrolling:touch`: en pantallas muy angostas hay scroll horizontal en vez de romper la cuadrícula
3. `.hc-tooth` recibió `width/min-width: var(--hc-tw)` para no aplastarse ilegible
4. Media queries: `--hc-tw` baja a 26px (≤560px) y 20px (≤400px) para que las 16 quepan; por debajo de eso el scroll horizontal lo resuelve sin desalinear

**Verificado (responsive 375/768/1280):** en los 3 anchos el diente 11 queda exactamente sobre el 41 (delta 0px medido en el DOM), 16 piezas por fila; a 375px aparece el scroll horizontal y ambos extremos (18 y 28) son alcanzables; el tap sigue ciclando el estado y disparando el guardado (`persistir`/`p.odo`).

**NO tocado:** la lógica de click ni el guardado del odontograma (`p.odo`), la estructura de las piezas, el resto del módulo Expediente, y el odontograma pro standalone (`.odo-tool` / `tool-odontograma`, que es otro módulo).
