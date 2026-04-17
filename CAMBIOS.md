# Cambios v1.4 — Gestión de miembros + Logros

**Archivos modificados:**
- `pages/admin-club.html` → mejoras en gestión de miembros y botón editar
- `pages/club-miembro.html` → sistema de logros/badges

**Lo que NO se tocó:** Paleta de colores, tipografía (Inter + #005187), estructura, funcionalidad existente.

---

## 🎯 PARTE 1 — ADMIN (`pages/admin-club.html`)

### 🔍 Buscador y filtros en Miembros
- Input para buscar por **nombre o email**
- 5 filtros con contadores automáticos:
  - **Todos** — todos los miembros
  - **Activos** — plan vigente y más de 7 días restantes
  - **Por vencer** — plan vence en ≤7 días
  - **Cancelados** — miembros que cancelaron
  - **Vencidos** — ya pasaron los 3 días de tolerancia

### 📊 Exportar CSV
Botón verde que descarga un CSV con **11 columnas**: Nombre, Email, Teléfono, Especialidad, Plan, Inicio, Vence, Racha, Estado, Monto último pago, Shopify Order ID.

Nombre del archivo: `miembros-odonteck-YYYY-MM-DD.csv`

### 🔥 Columna Racha
Se ve la racha de cada miembro (el campo que creamos en v1.3). Emoji cambia según racha:
- 0 días → `·`
- 1-6 días → `✨`
- 7+ días → `🔥`

### 👤 Modal de detalle del miembro
Click en cualquier fila → modal con:
- Plan, fecha inicio, fecha vencimiento (con "en X días")
- Racha actual
- Teléfono y especialidad (si los tiene)
- Última clase abierta
- **Historial completo de pagos** con fechas y montos
- Cantidad de logros desbloqueados

### ✏️ Botón Editar en items
En noticias, videos, PDFs y lives aparece botón **Editar** junto al de Eliminar:
- Click → carga los datos en el formulario de esa sección
- Banner naranja "Editando: [título]" con botón Cancelar
- Al guardar, hace UPDATE en lugar de CREATE (mantiene el ID y la fecha de creación)

**Nota:** Cursos no tienen botón editar todavía porque tienen estructura compleja de módulos. Si lo necesitas, podemos agregarlo después.

---

## 🏅 PARTE 2 — CLUB MIEMBRO (`pages/club-miembro.html`)

### 🎮 Sistema de logros (6 logros)

| Emoji | Nombre | Cómo se desbloquea |
|-------|--------|---------------------|
| 🎯 | **Primer paso** | Abrir la primera clase |
| 🔥 | **Semana perfecta** | Alcanzar 7 días de racha |
| 📚 | **Estudioso** | Completar 10 clases |
| 🏆 | **Maestro** | Completar un curso al 100% |
| 🌟 | **Leyenda** | Alcanzar 30 días de racha |
| 📅 | **Constante** | Completar 50 clases |

### 🎉 Toast animado al desbloquear
Cuando el doctor desbloquea uno:
- Toast dorado aparece arriba a la derecha con animación de rebote
- Emoji gigante girando
- "¡Logro desbloqueado!" + nombre + descripción
- Se dispara confeti breve
- Se queda 2.4 segundos y desaparece solo

### 🏅 Sección "Mis logros" en el Perfil
En la pestaña Perfil aparece:
- Grid con los 6 badges
- **Desbloqueados:** fondo dorado, emoji a todo color, fecha de desbloqueo
- **Bloqueados:** grises con candado 🔒
- Barra de progreso: "X de 6 desbloqueados"

---

## 📊 Datos nuevos en Firestore

Nuevos campos en `miembros/{uid}`:

```js
{
  // ...campos existentes intactos...

  // v1.3 (ya estaban)
  rachaDias: 12,
  ultimoAcceso: "2026-04-16",
  ultimaClase: { ... },

  // v1.4 NUEVOS
  logrosDesbloqueados: ['primer_paso', 'semana_perfecta'],
  logrosFechas: {
    'primer_paso': '2026-04-16T14:22:00.000Z',
    'semana_perfecta': '2026-04-23T09:15:00.000Z'
  },
  clasesCompletadas: 15,   // contador global de clases marcadas completas
  cursosCompletados: 2     // contador global de cursos al 100%
}
```

**Si no existen** (miembros viejos) → se inicializan en 0/vacío y todo funciona normal.

---

## ⚠️ Importante

- **Zero cambios destructivos.** Todo lo existente sigue funcionando igual.
- **Campos viejos intactos** (`planActivo`, `planVence`, `progresoCursos`, etc.)
- **Sin librerías externas.** Todo es CSS/JS puro.
- Los cambios están marcados con `═══ NUEVO v1.4 ═══` en el código.

---

## 🚀 Cómo subirlo

### Opción A — Reemplazar los 2 archivos

1. Descarga el ZIP y descomprime
2. GitHub → repo `Odonteck` → carpeta `pages/`
3. Borra o sobrescribe `admin-club.html` y `club-miembro.html`
4. Sube los 2 archivos nuevos del ZIP (dentro de la carpeta `pages/`)
5. Commit & push
6. GitHub Pages redeploya solo en 1-2 minutos

### Opción B — Editar uno por uno

1. Abre `pages/admin-club.html` en GitHub → ícono lápiz ✏️
2. Selecciona todo (Ctrl+A) → pega el nuevo contenido
3. Commit
4. Mismo proceso con `pages/club-miembro.html`

---

## 🧪 Cómo probar

### Admin
- Entra al panel admin
- Ve a pestaña "Miembros"
- Prueba buscador escribiendo un email parcial
- Haz clic en los filtros y mira cómo cambian los contadores
- Click en un miembro → se abre el modal con su detalle
- Click en "Exportar CSV" → descarga el archivo
- Ve a Noticias, haz clic en "Editar" sobre alguna → verifica que el form se llene y que al guardar se actualice en lugar de duplicarse

### Club miembro
- Entra como miembro
- Ve a pestaña "Mi perfil"
- Deberías ver la sección "🏅 Mis logros" con algunos ya desbloqueados (según tu actividad)
- Marca una clase como completada → confeti + si es la décima → toast "¡Estudioso desbloqueado!"
- Si llevas 7+ días entrando → al entrar hoy, toast "¡Semana perfecta!"
