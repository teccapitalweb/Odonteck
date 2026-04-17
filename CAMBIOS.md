# Cambios v1.6 — Responsive mobile + Noticias 15 días

**Archivo modificado:** `pages/club-miembro.html`

**Lo que NO se tocó:**
- Admin panel
- Backend
- Firestore schema
- Lógica de drip content v1.5
- Sistema de logros v1.4
- Funcionalidad en desktop (solo mejoras, no rompe nada)

---

## 📱 MEJORA 1 — Adaptación móvil

### Qué se optimizó para pantallas chicas (<700px):

**Header y saludo:**
- Saludo más compacto (17px en móvil)
- Píldora de racha 🔥 reducida
- Campana de notificaciones más discreta

**Card "Continúa donde te quedaste":**
- Layout compacto horizontal
- Botón "Reanudar" más pequeño y alineado
- Ya no se desborda ni se corta

**Banner VIP de WhatsApp:**
- Ícono ya no se corta (era el bug que viste)
- Padding ajustado
- Texto más legible

**Grid de cursos:**
- **2 columnas en móvil mediano** (antes era 1 — ahora se ve más catálogo)
- 1 columna en pantallas muy chicas (iPhone SE)
- Cards con imagen, título y botón adaptados
- Candados 🔒 de cursos bloqueados más visibles

**Noticias:**
- Texto del cuerpo con truncado inteligente (3 líneas + "...")
- Iconos más pequeños
- Espaciado optimizado

**Logros:**
- 3 columnas en móvil mediano
- 2 columnas en pantallas muy chicas
- Emojis y textos reducidos para mejor densidad

**Reproductor de video:**
- **Pantalla completa en móvil** — antes tenía márgenes que hacían perder espacio
- Videos se ven al 100% del ancho

**Otros ajustes:**
- Modal de cancelación adaptado
- Sección perfil en 1 columna en móvil
- Sección suscripción en 1 columna
- Padding general reducido para aprovechar espacio

### Breakpoints:
- `<800px`: Reproductor de cursos a pantalla completa
- `<700px`: Todos los ajustes principales
- `<400px`: Optimización extrema para pantallas pequeñas

---

## 📰 MEJORA 2 — Noticias con auto-expiración de 15 días

### Cómo funciona:

**Al cargar el dashboard:**
1. Se traen todas las noticias de Firestore (como antes)
2. Se aplica filtro: `si la noticia tiene más de 15 días, se oculta`
3. Solo se muestran las noticias recientes
4. Las viejas **siguen en Firestore** (no se borran)

**Si no hay noticias recientes:**
El mensaje cambia de *"Sin noticias aún"* a *"Sin noticias recientes"*.

### Ventajas:
- ✅ Feed siempre fresco
- ✅ No tienes que borrar noticias manualmente
- ✅ Los datos viejos quedan guardados (por si los quieres auditar desde el admin)
- ✅ Si quieres "resucitar" una noticia, solo editas la fecha desde el admin

### Cómo detecta la fecha:
Usa el campo `creadoEn` de Firestore (que ya se genera automáticamente al publicar). Si por alguna razón una noticia no tiene `creadoEn` (legacy), se sigue mostrando.

### Para cambiar el intervalo:
Si algún día quieres cambiarlo de 15 días a otro valor, busca esta línea en el código:
```js
const LIMITE_MS = 15 * 86400000; // 15 días
```
Y cambias el `15` por lo que quieras. Pero tú pediste fijo, así que queda así.

---

## 🚀 Cómo subirlo

1. Descarga el ZIP
2. Descomprime
3. GitHub → `Odonteck` → `pages/` → `club-miembro.html`
4. Lápiz ✏️ → Ctrl+A → Delete
5. Abre el archivo del ZIP con Bloc de notas → Ctrl+A → Ctrl+C
6. Pega en GitHub (Ctrl+V)
7. Commit changes
8. Espera 1-2 min

---

## 🧪 Cómo probar después de subir

**Mobile:**
1. Abre el dashboard en tu celular (o Chrome DevTools modo mobile)
2. Verifica:
   - Saludo compacto y legible
   - Card "Continúa" bien alineado
   - 2 cursos por fila en el grid
   - Cursos bloqueados con candado visible
   - Banner VIP con ícono de WhatsApp completo
3. Abre un curso → el video debe tomar toda la pantalla

**Noticias 15 días:**
1. Como miembro, ve a "Inicio"
2. Las noticias publicadas en los últimos 15 días se ven
3. Las más viejas desaparecen del feed
4. Las viejas siguen en Firestore (puedes verlas desde el admin si vas a `Noticias`)
