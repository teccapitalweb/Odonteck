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
