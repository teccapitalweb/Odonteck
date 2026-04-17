# Cambios v1.5 — Drip Content (retención de usuarios)

**Archivo modificado:** `pages/club-miembro.html`

**Lo que NO se tocó:**
- Admin panel (sigue igual)
- Backend / webhook (sigue igual)
- Diseño, colores, tipografía
- Firestore schema (no se añaden campos nuevos)

---

## 🎯 Qué hace

Sistema de **contenido goteado** para retener usuarios del plan mensual.

### Plan Mensual ($199)
- **Día 0** (al pagar): solo 1 curso desbloqueado
- **Cada 7 días**: se desbloquea 1 curso nuevo automáticamente
- **9 cursos × 7 días = 63 días** (~2 meses de contenido)
- Los cursos bloqueados se ven con 🔒 candado + texto "Se desbloquea en X días"

### Plan Anual ($1,788)
- **Acceso TOTAL** desde el día 1
- Sin banner de drip, sin bloqueos
- Premium real

### Admin (email `odontckconsul@gmail.com`)
- Acceso total siempre (tratado como anual)

---

## 📋 Orden de desbloqueo (básico → avanzado)

| Semana | Día | Curso | Nivel |
|--------|-----|-------|-------|
| 1 | 0 | Técnicas de Detartraje y Profilaxis | Básico |
| 2 | 7 | Extracciones Simples | Básico |
| 3 | 14 | Diagnóstico Pulpar (Urgencias) | Intermedio |
| 4 | 21 | Restauración Dental en Niños | Intermedio |
| 5 | 28 | Terapias Periodontales No Quirúrgicas | Intermedio |
| 6 | 35 | Manejo Integral Endodóntico | Intermedio |
| 7 | 42 | Reducción de Bolsas Periodontales | Avanzado |
| 8 | 49 | Carillas Ultrafinas | Avanzado |
| 9 | 56 | Rehabilitación sobre Implantes | Experto |

**Si publicas cursos nuevos** que no estén en esa lista → van al final de la cola automáticamente (por fecha de creación).

---

## 🎨 Qué ve el usuario

### Banner arriba de la biblioteca
> 🔓 Llevas **3 de 9 cursos** desbloqueados · Próximo curso en 4 días

### Card bloqueada
- Imagen con filtro gris/oscurecido
- Candado 🔒 en el centro
- Texto "Se desbloquea en X días" o "el 23 de abril"
- Botón "Próximamente" deshabilitado
- Al hacer clic → toast discreto: "🔒 Se desbloquea en X días. ¡Mantén tu racha para acceder!"

### Card desbloqueada
- Igual que antes, sin cambios

---

## 🔐 Seguridad del drip

**Doble protección:**
1. **Visual**: las cards bloqueadas se ven con candado
2. **Funcional**: `openCurso()` verifica antes de abrir — aunque alguien haga click programáticamente, no pasa

**No es impenetrable al 100%:** un usuario técnico podría abrir DevTools y saltarse la validación JS (no hay enforcement en Firestore rules). Si en el futuro quieres cerrar esta puerta, habría que agregar reglas de Firestore que validen `planInicio` en el cliente. Pero para 99% de usuarios con la validación JS es suficiente.

---

## ⚠️ Consideraciones importantes

### Para tu cuenta de testing
Si tu cuenta tiene `planInicio` reciente (ej. hoy), verás solo 1 curso desbloqueado. Si tu email es el ADMIN (`odontckconsul@gmail.com`) → verás todos.

### Si alguien cancela y vuelve a pagar
El `planInicio` se actualiza con el nuevo pago → el contador empieza de cero. Esto puede ser bueno (retiene de nuevo) o malo (el usuario reclamará que perdió cursos). **Decide tu política** y avísame si quieres que sea de otra forma.

### Plan anual
Detecta el campo `planTipo === 'anual'` de Firestore. Como el backend actual detecta el plan por el título del producto Shopify (`includes('anual')`), asegúrate de que el producto anual tenga la palabra "anual" en su nombre.

---

## 🚀 Cómo subirlo

1. Descarga ZIP
2. GitHub → repo `Odonteck` → carpeta `pages/`
3. Click en `club-miembro.html` → lápiz ✏️
4. Ctrl+A → Delete
5. Copia todo el contenido del archivo del ZIP → pégalo
6. Commit changes
7. Listo (redeploy automático en 1-2 min)

---

## 🧪 Cómo probar después de subirlo

1. Entra como miembro al dashboard
2. Ve a "Biblioteca de cursos"
3. Si tu `planInicio` es reciente verás:
   - Solo 1-2 cursos desbloqueados
   - El resto con candado 🔒 y "Se desbloquea en X días"
   - Banner azul arriba con tu progreso
4. Haz clic en un curso bloqueado → toast con mensaje
5. Si eres admin → todos desbloqueados (banner oculto)
