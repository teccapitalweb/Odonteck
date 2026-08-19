/* ═══════════════════════════════════════════════════════════════════════════
   OdonTeck · Capa PWA
   1. Registra el service worker (sw.js) en todas las páginas que lo carguen.
      Funciona igual desde la raíz que desde /pages y /tools: la ruta se
      calcula sola, como hace script.js.
   2. Solo en la portada: ofrece instalar el sitio como app.
      · Android / Chrome / Edge → botón nativo vía beforeinstallprompt
      · iPhone / iPad (Safari)  → instrucción "Compartir → Añadir a inicio",
                                  que es la única vía que permite iOS.
   El aviso no reaparece si el usuario lo cierra, ni si ya está instalada.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var ruta = window.location.pathname;
  var enSubcarpeta = /\/(pages|tools)\//.test(ruta);
  var base = enSubcarpeta ? '../' : '';

  /* ── 1. Service worker ─────────────────────────────────────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      // El sw.js vive en la raíz, así que su alcance cubre todo el sitio
      // aunque lo registre una página de /pages.
      navigator.serviceWorker.register(base + 'sw.js').catch(function () {
        /* silencioso: sin SW el sitio funciona igual, solo sin modo offline */
      });
    });
  }

  /* ── 2. Invitación a instalar (solo portada) ───────────────────────────── */

  var enPortada = /(^\/?$|\/index\.html$)/.test(ruta);
  if (!enPortada) return;

  var CLAVE = 'odonteck_install_cerrado';
  var yaInstalada =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  if (yaInstalada) return;
  try { if (localStorage.getItem(CLAVE)) return; } catch (e) { /* modo privado */ }

  var esIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  var promptDiferido = null;

  function estilos() {
    if (document.getElementById('ot-install-css')) return;
    var s = document.createElement('style');
    s.id = 'ot-install-css';
    s.textContent = [
      '#ot-install{position:fixed;left:12px;right:12px;z-index:60;',
      '  bottom:calc(12px + env(safe-area-inset-bottom,0px));',
      '  display:flex;align-items:center;gap:12px;padding:12px 14px;',
      '  background:rgba(255,255,255,.97);border:1px solid #dbe4ef;border-radius:18px;',
      '  box-shadow:0 18px 44px rgba(13,27,47,.18);',
      '  font-family:Inter,system-ui,sans-serif;color:#0d1b2f;',
      '  transform:translateY(140%);transition:transform .35s cubic-bezier(.16,1,.3,1)}',
      '#ot-install.ot-visible{transform:translateY(0)}',
      '#ot-install img{width:42px;height:42px;border-radius:12px;flex:0 0 auto;object-fit:contain}',
      '#ot-install .ot-txt{flex:1;min-width:0}',
      '#ot-install strong{display:block;font-size:.94rem;font-weight:800;line-height:1.25}',
      '#ot-install span{display:block;font-size:.8rem;color:#5f6f86;line-height:1.35;margin-top:2px}',
      '#ot-install button{font-family:inherit;cursor:pointer;border:none;border-radius:12px}',
      '#ot-install .ot-ok{min-height:44px;padding:0 16px;font-weight:800;font-size:.9rem;',
      '  color:#fff;background:#005187;flex:0 0 auto}',
      '#ot-install .ot-no{min-width:44px;min-height:44px;background:none;color:#5f6f86;',
      '  font-size:1.5rem;line-height:1;flex:0 0 auto}',
      '@media (min-width:821px){#ot-install{left:auto;right:18px;max-width:400px}}',
      '@media (prefers-reduced-motion:reduce){#ot-install{transition:none}}'
    ].join('');
    document.head.appendChild(s);
  }

  function cerrar(banner) {
    banner.classList.remove('ot-visible');
    try { localStorage.setItem(CLAVE, '1'); } catch (e) {}
    setTimeout(function () { banner.remove(); }, 400);
  }

  function mostrar(titulo, detalle, textoBoton, alPulsar) {
    estilos();
    var b = document.createElement('div');
    b.id = 'ot-install';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Instalar OdonTeck');

    var icono = document.createElement('img');
    icono.src = base + 'assets/img/odonteck-favicon.png';
    icono.alt = '';

    var txt = document.createElement('div');
    txt.className = 'ot-txt';
    var t = document.createElement('strong'); t.textContent = titulo;
    var d = document.createElement('span'); d.textContent = detalle;
    txt.appendChild(t); txt.appendChild(d);

    b.appendChild(icono);
    b.appendChild(txt);

    if (textoBoton) {
      var ok = document.createElement('button');
      ok.className = 'ot-ok';
      ok.type = 'button';
      ok.textContent = textoBoton;
      ok.addEventListener('click', function () { alPulsar(b); });
      b.appendChild(ok);
    }

    var no = document.createElement('button');
    no.className = 'ot-no';
    no.type = 'button';
    no.setAttribute('aria-label', 'Cerrar');
    no.textContent = '×';
    no.addEventListener('click', function () { cerrar(b); });
    b.appendChild(no);

    document.body.appendChild(b);
    // setTimeout en vez de requestAnimationFrame: si la pestaña está en
    // segundo plano rAF no corre y el aviso se quedaría fuera de pantalla.
    setTimeout(function () { b.classList.add('ot-visible'); }, 60);
  }

  /* Android / escritorio: el navegador avisa cuando la app es instalable */
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    promptDiferido = e;
    mostrar(
      'Instala OdonTeck',
      'Ábrelo desde tu pantalla de inicio, como una app.',
      'Instalar',
      function (banner) {
        banner.classList.remove('ot-visible');
        promptDiferido.prompt();
        promptDiferido.userChoice.then(function () {
          try { localStorage.setItem(CLAVE, '1'); } catch (e) {}
          banner.remove();
          promptDiferido = null;
        });
      }
    );
  });

  /* iOS no expone beforeinstallprompt: solo queda explicar el gesto */
  if (esIOS) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        if (document.getElementById('ot-install')) return;
        mostrar(
          'Añádelo a tu pantalla de inicio',
          'Toca Compartir y luego "Añadir a pantalla de inicio".',
          null,
          null
        );
      }, 2500);
    });
  }

  /* Si termina instalándose, no volvemos a insistir */
  window.addEventListener('appinstalled', function () {
    try { localStorage.setItem(CLAVE, '1'); } catch (e) {}
    var b = document.getElementById('ot-install');
    if (b) b.remove();
  });
})();
