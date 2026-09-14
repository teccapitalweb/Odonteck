(function () {
  'use strict';

  const VERSION = 'v1';
  const STORAGE_PREFIX = 'odonteck:onboarding:' + VERSION + ':';
  const MOBILE_BREAKPOINT = 880;
  const config = {
    brand: 'OdonTeck',
    eyebrow: 'Primeros pasos',
    steps: [
      {
        title: 'Bienvenido a tu consultorio digital',
        text: 'Este panel reúne tu formación, recursos clínicos y herramientas para acompañarte en la práctica diaria.',
        selectors: ['#inicio-content .banner', '.topbar']
      },
      {
        title: 'Tu formación odontológica',
        text: 'En Mis cursos encontrarás tus programas, el avance de cada clase y los contenidos disponibles para tu cuenta.',
        selectors: ['.sidebar .nav-item[data-section="cursos"]', '.mobile-nav__item[data-section="cursos"]']
      },
      {
        title: 'Clases en vivo',
        text: 'Consulta aquí las próximas sesiones con especialistas y vuelve a las transmisiones que queden disponibles.',
        selectors: ['.sidebar .nav-item[data-section="webinars"]', '.mobile-nav__item[data-section="webinars"]']
      },
      {
        title: 'Material clínico descargable',
        text: 'En PDFs y material tendrás guías, presentaciones y formatos de apoyo vinculados con tus cursos.',
        selectors: ['.sidebar .nav-item[data-section="pdfs"]', '.mobile-drawer__item[data-section="pdfs"]'],
        mobileDrawer: true
      },
      {
        title: 'Herramientas para tu práctica',
        text: 'El panel Pro incluye expediente clínico, cálculo de anestésico, prescripción, cotizador y planes de tratamiento.',
        selectors: ['.sidebar .nav-item[data-tool="expediente"]', '.mobile-drawer__item[data-tool="expediente"]'],
        mobileDrawer: true
      },
      {
        title: 'Tu perfil y configuración',
        text: 'Desde Mi perfil puedes revisar tus datos y preferencias. En Suscripción encontrarás la información de tu membresía.',
        selectors: ['.sidebar .nav-item[data-section="perfil"]', '.mobile-drawer__item[data-section="perfil"]'],
        mobileDrawer: true
      },
      {
        title: 'Todo listo para comenzar',
        text: 'Puedes repetir este recorrido cuando quieras con el botón de ayuda de la barra superior o desde Mi perfil.',
        selectors: ['#odonteck-tour-help']
      }
    ]
  };

  let root;
  let spotlight;
  let card;
  let currentTarget = null;
  let stepIndex = 0;
  let running = false;
  let previousFocus = null;
  let renderToken = 0;

  function addStyles() {
    if (document.getElementById('odonteck-tour-styles')) return;
    const style = document.createElement('style');
    style.id = 'odonteck-tour-styles';
    style.textContent = `
      .odt-tour-root{position:fixed;inset:0;z-index:2147483000;pointer-events:auto;font-family:'Inter',system-ui,sans-serif}
      .odt-tour-root[hidden]{display:none!important}
      .odt-tour-shade{position:absolute;inset:0;background:transparent}
      .odt-tour-spotlight{position:fixed;border:2px solid #6fb8b0;border-radius:14px;box-shadow:0 0 0 9999px rgba(4,10,20,.78),0 0 0 5px rgba(111,184,176,.18),0 16px 44px rgba(0,0,0,.34);pointer-events:none;transition:top .2s ease,left .2s ease,width .2s ease,height .2s ease;z-index:1}
      .odt-tour-card{position:fixed;z-index:2;width:min(390px,calc(100vw - 28px));padding:22px;border:1px solid rgba(143,188,230,.28);border-radius:18px;background:linear-gradient(145deg,#18233a,#10192b);color:#f0f4fa;box-shadow:0 24px 70px rgba(0,0,0,.55);outline:none}
      .odt-tour-top{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:15px}
      .odt-tour-brand{display:flex;align-items:center;gap:9px;color:#8fbce6;font:700 10px/1.2 'JetBrains Mono',monospace;letter-spacing:1.4px;text-transform:uppercase}
      .odt-tour-brand::before{content:'';width:9px;height:9px;border-radius:50%;background:#6fb8b0;box-shadow:0 0 0 5px rgba(111,184,176,.12)}
      .odt-tour-skip{min-height:36px;padding:7px 9px;border-radius:9px;color:#b6c2d8;font-size:12px}
      .odt-tour-skip:hover,.odt-tour-skip:focus-visible{background:#212e48;color:#fff;outline:2px solid #6fb8b0;outline-offset:2px}
      .odt-tour-title{margin:0 0 8px;font:800 clamp(20px,4vw,25px)/1.18 'Plus Jakarta Sans','Inter',sans-serif;letter-spacing:-.5px;color:#fff}
      .odt-tour-text{margin:0;color:#b6c2d8;font-size:14px;line-height:1.65}
      .odt-tour-progress{display:flex;align-items:center;gap:10px;margin:19px 0 17px;color:#8997b0;font:600 10px/1 'JetBrains Mono',monospace;letter-spacing:.7px;text-transform:uppercase}
      .odt-tour-track{height:4px;flex:1;overflow:hidden;border-radius:20px;background:#2a3852}
      .odt-tour-track span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#5b92c8,#6fb8b0);transition:width .25s ease}
      .odt-tour-actions{display:flex;justify-content:flex-end;gap:9px}
      .odt-tour-btn{min-height:42px;padding:10px 16px;border-radius:11px;border:1px solid rgba(143,188,230,.22);font-weight:700;font-size:13px}
      .odt-tour-btn:focus-visible{outline:3px solid rgba(111,184,176,.45);outline-offset:2px}
      .odt-tour-prev{margin-right:auto;color:#b6c2d8;background:#10192b}
      .odt-tour-prev[hidden]{display:none}
      .odt-tour-next{color:#07131f;border-color:transparent;background:linear-gradient(135deg,#8fbce6,#6fb8b0);box-shadow:0 8px 24px rgba(91,146,200,.25)}
      .odt-tour-help{position:relative;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:15px}
      .odt-tour-profile-btn{display:inline-flex;align-items:center;gap:8px;align-self:flex-start}
      .odt-tour-profile-btn::before{content:'?';display:grid;place-items:center;width:18px;height:18px;border:1px solid currentColor;border-radius:50%;font-size:12px}
      @media (max-width:880px){
        .odt-tour-card{left:14px!important;right:14px!important;bottom:calc(14px + env(safe-area-inset-bottom))!important;top:auto!important;width:auto;padding:19px;border-radius:17px}
        .odt-tour-spotlight{border-radius:12px}
        .odt-tour-title{font-size:20px}.odt-tour-text{font-size:13px;line-height:1.55}.odt-tour-progress{margin:16px 0 14px}
      }
      @media (max-width:380px){.odt-tour-card{left:9px!important;right:9px!important;bottom:calc(9px + env(safe-area-inset-bottom))!important;padding:16px}.odt-tour-actions{gap:6px}.odt-tour-btn{padding:9px 12px}}
      @media (prefers-reduced-motion:reduce){.odt-tour-spotlight,.odt-tour-track span{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function identity() {
    const state = window.UserState || {};
    return state.uid || (state.email && state.email.toLowerCase()) || (state.modo === 'invitado' ? 'invitado' : '');
  }

  function storageKey() {
    return STORAGE_PREFIX + encodeURIComponent(identity() || 'local');
  }

  function wasSeen() {
    try { return localStorage.getItem(storageKey()) === 'complete'; } catch (_) { return false; }
  }

  function markSeen() {
    try { localStorage.setItem(storageKey(), 'complete'); } catch (_) {}
  }

  function isVisible(element) {
    if (!element || !element.isConnected) return false;
    const styles = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return styles.display !== 'none' && styles.visibility !== 'hidden' && rect.width > 1 && rect.height > 1;
  }

  function firstVisible(selectors) {
    for (const selector of selectors || []) {
      const candidates = Array.from(document.querySelectorAll(selector));
      const match = candidates.find(isVisible);
      if (match) return match;
    }
    return null;
  }

  function onMobile() {
    return window.matchMedia('(max-width:' + MOBILE_BREAKPOINT + 'px)').matches;
  }

  function setMobileDrawer(open) {
    if (!onMobile()) return;
    const drawer = document.getElementById('mobile-drawer');
    if (!drawer) return;
    const opened = drawer.classList.contains('is-open');
    if (open && !opened) document.getElementById('mobile-nav-more')?.click();
    if (!open && opened) document.getElementById('mobile-drawer-close')?.click();
  }

  function createRoot() {
    if (root) return;
    root = document.createElement('div');
    root.className = 'odt-tour-root';
    root.hidden = true;
    root.innerHTML = `
      <div class="odt-tour-shade" aria-hidden="true"></div>
      <div class="odt-tour-spotlight" aria-hidden="true"></div>
      <section class="odt-tour-card" role="dialog" aria-modal="true" aria-labelledby="odt-tour-title" aria-describedby="odt-tour-text" tabindex="-1">
        <div class="odt-tour-top">
          <div class="odt-tour-brand">${config.brand} · ${config.eyebrow}</div>
          <button class="odt-tour-skip" type="button" data-tour-action="skip">Omitir</button>
        </div>
        <h2 class="odt-tour-title" id="odt-tour-title"></h2>
        <p class="odt-tour-text" id="odt-tour-text"></p>
        <div class="odt-tour-progress" aria-live="polite">
          <span data-tour-count></span>
          <div class="odt-tour-track" aria-hidden="true"><span></span></div>
        </div>
        <div class="odt-tour-actions">
          <button class="odt-tour-btn odt-tour-prev" type="button" data-tour-action="prev">Anterior</button>
          <button class="odt-tour-btn odt-tour-next" type="button" data-tour-action="next">Siguiente</button>
        </div>
      </section>`;
    document.body.appendChild(root);
    spotlight = root.querySelector('.odt-tour-spotlight');
    card = root.querySelector('.odt-tour-card');
    root.addEventListener('click', function (event) {
      const action = event.target.closest('[data-tour-action]')?.dataset.tourAction;
      if (action === 'skip') stop(true);
      if (action === 'prev') go(stepIndex - 1);
      if (action === 'next') stepIndex === config.steps.length - 1 ? stop(true) : go(stepIndex + 1);
    });
  }

  function place() {
    if (!running || !card || !spotlight) return;
    const gap = 16;
    if (!currentTarget || !isVisible(currentTarget)) {
      spotlight.style.cssText = 'display:none';
      card.style.left = Math.max(14, (innerWidth - card.offsetWidth) / 2) + 'px';
      card.style.top = Math.max(14, (innerHeight - card.offsetHeight) / 2) + 'px';
      return;
    }
    const raw = currentTarget.getBoundingClientRect();
    const pad = 8;
    const rect = {
      left: Math.max(6, raw.left - pad),
      top: Math.max(6, raw.top - pad),
      width: Math.min(innerWidth - 12, raw.width + pad * 2),
      height: Math.min(innerHeight - 12, raw.height + pad * 2)
    };
    spotlight.style.display = 'block';
    spotlight.style.left = rect.left + 'px';
    spotlight.style.top = rect.top + 'px';
    spotlight.style.width = rect.width + 'px';
    spotlight.style.height = rect.height + 'px';
    if (onMobile()) return;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    let left = rect.left;
    let top = rect.top + rect.height + gap;
    if (left + cardWidth > innerWidth - 14) left = innerWidth - cardWidth - 14;
    if (top + cardHeight > innerHeight - 14) top = rect.top - cardHeight - gap;
    if (top < 14) {
      left = rect.left + rect.width + gap;
      top = Math.min(Math.max(14, rect.top), innerHeight - cardHeight - 14);
      if (left + cardWidth > innerWidth - 14) left = Math.max(14, rect.left - cardWidth - gap);
    }
    card.style.left = Math.max(14, left) + 'px';
    card.style.top = Math.max(14, top) + 'px';
  }

  function go(nextIndex) {
    if (!running) return;
    stepIndex = Math.max(0, Math.min(config.steps.length - 1, nextIndex));
    const token = ++renderToken;
    const step = config.steps[stepIndex];
    setMobileDrawer(Boolean(step.mobileDrawer));
    window.setTimeout(function () {
      if (!running || token !== renderToken) return;
      currentTarget = firstVisible(step.selectors);
      if (currentTarget) currentTarget.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'auto' });
      card.querySelector('#odt-tour-title').textContent = step.title;
      card.querySelector('#odt-tour-text').textContent = step.text;
      card.querySelector('[data-tour-count]').textContent = (stepIndex + 1) + ' de ' + config.steps.length;
      card.querySelector('.odt-tour-track span').style.width = (((stepIndex + 1) / config.steps.length) * 100) + '%';
      card.querySelector('[data-tour-action="prev"]').hidden = stepIndex === 0;
      const next = card.querySelector('[data-tour-action="next"]');
      next.textContent = stepIndex === config.steps.length - 1 ? 'Finalizar' : 'Siguiente';
      window.setTimeout(place, 40);
    }, onMobile() ? 190 : 20);
  }

  function focusable() {
    return Array.from(card.querySelectorAll('button:not([hidden]):not([disabled]),[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(isVisible);
  }

  function onKeydown(event) {
    if (!running) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      stop(true);
      return;
    }
    if (event.key !== 'Tab') return;
    const nodes = focusable();
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }

  function start(options) {
    options = options || {};
    if (running || (!options.force && wasSeen())) return;
    if (typeof window.navigateToSection === 'function') window.navigateToSection('inicio');
    previousFocus = document.activeElement;
    running = true;
    root.hidden = false;
    document.documentElement.classList.add('odt-tour-active');
    document.addEventListener('keydown', onKeydown);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    go(0);
    window.setTimeout(function () { card?.focus(); }, 80);
  }

  function stop(remember) {
    if (!running) return;
    running = false;
    renderToken += 1;
    if (remember) markSeen();
    setMobileDrawer(false);
    root.hidden = true;
    document.documentElement.classList.remove('odt-tour-active');
    document.removeEventListener('keydown', onKeydown);
    window.removeEventListener('resize', place);
    window.removeEventListener('scroll', place, true);
    currentTarget = null;
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
  }

  function installEntryPoints() {
    const topbar = document.querySelector('.topbar__right');
    if (topbar && !document.getElementById('odonteck-tour-help')) {
      const button = document.createElement('button');
      button.id = 'odonteck-tour-help';
      button.className = 'icon-btn odt-tour-help';
      button.type = 'button';
      button.textContent = '?';
      button.title = 'Recorrido por OdonTeck';
      button.setAttribute('aria-label', 'Repetir recorrido guiado');
      button.addEventListener('click', function () { start({ force: true }); });
      topbar.insertBefore(button, topbar.firstChild);
    }
    const profile = document.querySelector('.perfil-hero');
    if (profile && !document.getElementById('odonteck-tour-profile')) {
      const button = document.createElement('button');
      button.id = 'odonteck-tour-profile';
      button.className = 'btn btn--ghost odt-tour-profile-btn';
      button.type = 'button';
      button.textContent = 'Repetir recorrido';
      button.addEventListener('click', function () { start({ force: true }); });
      profile.appendChild(button);
    }
  }

  function userReady() {
    const state = window.UserState;
    return Boolean(state && state.modo && state.modo !== 'cargando' && identity());
  }

  function blockingDialogOpen() {
    return Boolean(document.querySelector('.modal.is-open,.paywall-modal.is-open,#odonteck-install-pop.show'));
  }

  function autoStart(attempt) {
    installEntryPoints();
    if (userReady() && !blockingDialogOpen()) {
      if (!wasSeen()) start();
      return;
    }
    if (attempt < 80) window.setTimeout(function () { autoStart(attempt + 1); }, 250);
  }

  function init() {
    addStyles();
    createRoot();
    installEntryPoints();
    const dynamic = document.getElementById('dynamic-section');
    if (dynamic) new MutationObserver(installEntryPoints).observe(dynamic, { childList: true, subtree: true });
    window.OdonteckGuidedTour = { start: function () { start({ force: true }); }, stop: stop };
    window.setTimeout(function () { autoStart(0); }, 700);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
