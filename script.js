// ===========================
// ODONTECK — SCRIPT FUTURISTA
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // --- PARTÍCULAS CANVAS (sin espacio en blanco) ---
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0;transition:opacity 1s ease;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${this.alpha})`;
      ctx.fill();
    }
  }

  const particles = [];
  for (let i = 0; i < 80; i++) particles.push(new Particle());

  const animateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,212,255,${0.08*(1-dist/100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  };
  animateParticles();
  // Fade in canvas después de que cargue la página
  setTimeout(() => { canvas.style.opacity = '1'; }, 300);

  // --- HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  }

  // --- SCROLL TOP ---
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('visible', window.scrollY > 400));
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // --- REVEAL ON SCROLL ---
  const reveals = document.querySelectorAll('.servicio-card, .beneficio-card, .razon-card, .curso-card, .mv-card, .valor-item, .contacto-card');
  reveals.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  // --- CONTADORES ---
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length) {
    const animateCount = (el) => {
      const target = +el.getAttribute('data-target');
      let count = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) { el.textContent = target + '+'; clearInterval(timer); }
        else { el.textContent = Math.floor(count) + '+'; }
      }, 25);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { animateCount(entry.target); observer.unobserve(entry.target); } });
    }, { threshold: 0.4 });
    statNums.forEach(num => observer.observe(num));
  }

  // --- MODAL DETALLES CURSO ---
  const modal = document.createElement('div');
  modal.id = 'cursoModal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;z-index:9999;align-items:center;justify-content:center;padding:20px;';
  modal.innerHTML = `
    <div class="modal-overlay" id="modalOverlay"></div>
    <div class="modal-box" id="modalBox">
      <button class="modal-close" id="modalClose">✕</button>
      <img id="modalImg" src="" alt="" />
      <div class="modal-body">
        <span id="modalArea" class="curso-area"></span>
        <h3 id="modalNombre"></h3>
        <p id="modalPonente" class="curso-ponente"></p>
        <div class="modal-temario">
          <p class="temario-titulo">📋 Temario del curso</p>
          <ul id="modalTemario"></ul>
        </div>
        <div class="modal-footer">
          <span id="modalCosto" class="curso-costo"></span>
          <a id="modalWA" href="#" target="_blank" class="btn-inscribete">Inscríbete →</a>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const openModal = (c, isPage) => {
    const imgPrefix = isPage ? '../' : '';
    document.getElementById('modalImg').src = imgPrefix + c.img;
    document.getElementById('modalArea').textContent = c.area;
    document.getElementById('modalNombre').textContent = c.nombre;
    document.getElementById('modalPonente').textContent = '👩‍⚕️ ' + c.ponente;
    document.getElementById('modalCosto').textContent = c.costo;
    document.getElementById('modalWA').href = `https://wa.me/5212381479365?text=Hola,%20me%20interesa%20inscribirme%20al%20curso:%20${encodeURIComponent(c.nombre)}`;
    const ul = document.getElementById('modalTemario');
    ul.innerHTML = '';
    (c.temario || []).forEach(t => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="temario-check">✓</span>${t}`;
      ul.appendChild(li);
    });
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // --- HELPER: crear card de curso ---
  const crearCard = (c, isPage) => {
    const imgPrefix = isPage ? '../' : '';
    const card = document.createElement('div');
    card.className = 'curso-card';
    card.innerHTML = `
      <div class="curso-card-img-wrap">
        <img src="${imgPrefix}${c.img}" alt="${c.nombre}" class="curso-card-img" loading="lazy"
             onerror="this.src='${imgPrefix}assets/img/banner/hero-doctors.png'"/>
      </div>
      <div class="curso-card-body">
        <span class="curso-area">${c.area}</span>
        <h3>${c.nombre}</h3>
        <p class="curso-ponente">👩‍⚕️ ${c.ponente}</p>
        <div class="curso-card-footer">
          <span class="curso-costo">${c.costo}</span>
          <div class="curso-btns">
            <button class="btn-detalles" data-id="${c.id}">Detalles</button>
            <a href="https://wa.me/5212381479365?text=Hola,%20me%20interesa%20inscribirme%20al%20curso:%20${encodeURIComponent(c.nombre)}"
               class="btn-inscribete" target="_blank">Inscríbete</a>
          </div>
        </div>
      </div>`;
    card.querySelector('.btn-detalles').addEventListener('click', () => openModal(c, isPage));
    return card;
  };

  // --- SLIDER DE CURSOS (index) ---
  const cursosTrack = document.getElementById('cursosTrack');
  if (cursosTrack && typeof cursos !== 'undefined') {
    cursos.forEach(c => cursosTrack.appendChild(crearCard(c, false)));

    let currentSlide = 0;
    const cardWidth = 320;
    const maxSlide = () => Math.max(0, cursos.length - Math.floor(cursosTrack.parentElement.offsetWidth / cardWidth));

    document.getElementById('prevCurso')?.addEventListener('click', () => {
      currentSlide = Math.max(0, currentSlide - 1);
      cursosTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    });
    document.getElementById('nextCurso')?.addEventListener('click', () => {
      currentSlide = Math.min(maxSlide(), currentSlide + 1);
      cursosTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    });
  }

  // --- GALERÍA AUTO-SCROLL (una sola fila) ---
  const galleryLeft = document.getElementById('galleryLeft');
  if (galleryLeft && typeof alumnos !== 'undefined') {
    [...alumnos, ...alumnos].forEach(src => {
      const img = document.createElement('img');
      img.src = src; img.alt = 'Alumno OdonTeck'; img.loading = 'lazy';
      galleryLeft.appendChild(img);
    });
  }

  // --- RESEÑAS AUTO-SCROLL (una sola fila) ---
  const resenasLeft = document.getElementById('resenasLeft');
  if (resenasLeft && typeof resenas !== 'undefined') {
    [...resenas, ...resenas].forEach(src => {
      const img = document.createElement('img');
      img.src = src; img.alt = 'Reseña OdonTeck'; img.loading = 'lazy';
      resenasLeft.appendChild(img);
    });
  }

  // --- CURSOS PAGE ---
  const cursosPageGrid = document.getElementById('cursosPageGrid');
  if (cursosPageGrid && typeof cursos !== 'undefined') {
    const renderCursos = (filter = 'Todos') => {
      cursosPageGrid.innerHTML = '';
      const filtered = filter === 'Todos' ? cursos : cursos.filter(c => c.area === filter);
      filtered.forEach(c => cursosPageGrid.appendChild(crearCard(c, true)));
    };
    renderCursos();
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCursos(btn.dataset.filter);
      });
    });
  }

  // --- GALERÍA PAGE ---
  const galeriaPageGrid = document.getElementById('galeriaPageGrid');
  if (galeriaPageGrid && typeof alumnos !== 'undefined') {
    alumnos.forEach(src => {
      const img = document.createElement('img');
      img.src = '../' + src; img.alt = 'Galería OdonTeck'; img.loading = 'lazy';
      galeriaPageGrid.appendChild(img);
    });
  }
  const resenasPageGrid = document.getElementById('resenasPageGrid');
  if (resenasPageGrid && typeof resenas !== 'undefined') {
    resenas.forEach(src => {
      const img = document.createElement('img');
      img.src = '../' + src; img.alt = 'Reseña OdonTeck'; img.loading = 'lazy';
      resenasPageGrid.appendChild(img);
    });
  }

});
