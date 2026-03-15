document.addEventListener('DOMContentLoaded', () => {
  const isSubpage = window.location.pathname.includes('/pages/');
  const basePath = isSubpage ? '../' : '';
  const resolvePath = (path) => /^https?:/.test(path) ? path : basePath + path;

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open') ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // Scroll top
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    const toggleScroll = () => scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    toggleScroll();
    window.addEventListener('scroll', toggleScroll);
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Counters
  document.querySelectorAll('.stat-number').forEach((item) => {
    const target = Number(item.dataset.target || 0);
    const suffix = item.dataset.suffix || '';
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 45));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            item.textContent = `${target}${suffix}`;
            clearInterval(timer);
          } else {
            item.textContent = `${current}${suffix}`;
          }
        }, 26);
        observer.disconnect();
      });
    }, { threshold: 0.5 });
    observer.observe(item);
  });

  // ── DRAG helper ──────────────────────────────────────────────
  const initDrag = (scroller) => {
    let isDown = false, startX = 0, startScroll = 0;
    scroller.addEventListener('mousedown', (e) => {
      isDown = true; startX = e.pageX; startScroll = scroller.scrollLeft;
      scroller.style.cursor = 'grabbing';
    });
    ['mouseleave', 'mouseup'].forEach(evt => scroller.addEventListener(evt, () => {
      isDown = false; scroller.style.cursor = 'grab';
    }));
    scroller.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      scroller.scrollLeft = startScroll - (e.pageX - startX);
    });
    let touchStartX = 0, touchScroll = 0;
    scroller.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX; touchScroll = scroller.scrollLeft;
    }, { passive: true });
    scroller.addEventListener('touchmove', (e) => {
      scroller.scrollLeft = touchScroll - (e.touches[0].pageX - touchStartX);
    }, { passive: true });
  };

  // ── AUTO-SCROLL helper (CSS animation — funciona bien en móvil) ──
  const initAutoScroll = (scroller, trackId, durationSecs) => {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.style.animation = `carousel-slide ${durationSecs}s linear infinite`;
    // Pausa al hover o toque
    scroller.addEventListener('mouseenter', () => { track.style.animationPlayState = 'paused'; });
    scroller.addEventListener('mouseleave', () => { track.style.animationPlayState = 'running'; });
    scroller.addEventListener('touchstart', () => { track.style.animationPlayState = 'paused'; }, { passive: true });
    scroller.addEventListener('touchend',   () => { setTimeout(() => { track.style.animationPlayState = 'running'; }, 1200); }, { passive: true });
  };

  // ── Course carousel (manual nav buttons + drag) ───────────────
  document.querySelectorAll('[data-track]').forEach((button) => {
    button.addEventListener('click', () => {
      const scroller = document.getElementById(button.dataset.track);
      if (!scroller) return;
      const amount = Math.min(380, scroller.clientWidth * 0.85);
      scroller.scrollBy({ left: button.dataset.dir === 'prev' ? -amount : amount, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.course-scroller').forEach(initDrag);

  // ── Render course cards ───────────────────────────────────────
  const renderCourseCard = (course) => `
    <article class="course-card">
      <img src="${resolvePath(course.img)}" alt="${course.nombre}">
      <div class="course-card-body">
        <span class="course-badge">${course.area}</span>
        <h3>${course.nombre}</h3>
        <p class="course-mentor">${course.ponente}</p>
        <p class="course-price">${course.costo}</p>
        <div class="course-actions">
          <button class="small-btn" type="button" data-course-id="${course.id}">Ver temario</button>
          <a class="small-btn primary" href="https://wa.me/5212381479365?text=${encodeURIComponent(`Hola, me interesa el curso: ${course.nombre}`)}" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </article>
  `;

  const attachCourseButtons = (scope = document) => {
    scope.querySelectorAll('[data-course-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const course = cursos.find(c => String(c.id) === btn.dataset.courseId);
        if (course) openModal(course);
      });
    });
  };

  const homeCoursesTrack = document.getElementById('homeCoursesTrack');
  if (homeCoursesTrack && typeof cursos !== 'undefined') {
    homeCoursesTrack.innerHTML = cursos.map(renderCourseCard).join('');
    attachCourseButtons(homeCoursesTrack);
  }

  // ── Modal ─────────────────────────────────────────────────────
  const modal = document.getElementById('courseModal');
  const modalContent = document.getElementById('courseModalContent');
  const modalClose = document.getElementById('modalClose');
  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  const openModal = (course) => {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = `
      <div>
        <img src="${resolvePath(course.img)}" alt="${course.nombre}" />
      </div>
      <div class="modal-meta">
        <span class="modal-topline">${course.area}</span>
        <h3>${course.nombre}</h3>
        <p class="modal-mentor"><strong>Ponente:</strong> ${course.ponente}<br><strong>Inversión:</strong> ${course.costo}</p>
        <div class="modal-columns">
          <div class="modal-panel">
            <h4>Pequeño temario</h4>
            <ul>${course.temario.map(item => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div class="modal-panel">
            <h4>Beneficios</h4>
            <ul>${course.beneficios.map(item => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>
        <div class="modal-actions">
          <a class="btn btn-primary" href="https://wa.me/5212381479365?text=${encodeURIComponent(`Hola, me interesa el curso: ${course.nombre}`)}" target="_blank" rel="noopener">Inscribirme por WhatsApp</a>
          <button class="btn btn-secondary" type="button" data-close-modal>Cerrar</button>
        </div>
      </div>
    `;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalContent.querySelector('[data-close-modal]')?.addEventListener('click', closeModal);
  };

  modalClose?.addEventListener('click', closeModal);
  modal?.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // ── Courses page grid + filters ───────────────────────────────
  const coursesPageGrid = document.getElementById('coursesPageGrid');
  const courseFilters = document.getElementById('courseFilters');
  if (coursesPageGrid && courseFilters && typeof cursos !== 'undefined') {
    const areas = ['Todos', ...new Set(cursos.map(c => c.area))];
    courseFilters.innerHTML = areas.map(area =>
      `<button class="filter-btn ${area === 'Todos' ? 'active' : ''}" data-area="${area}">${area}</button>`
    ).join('');
    const paint = (area = 'Todos') => {
      const list = area === 'Todos' ? cursos : cursos.filter(c => c.area === area);
      coursesPageGrid.innerHTML = list.map(renderCourseCard).join('');
      attachCourseButtons(coursesPageGrid);
    };
    paint();
    courseFilters.querySelectorAll('[data-area]').forEach(btn => {
      btn.addEventListener('click', () => {
        courseFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        paint(btn.dataset.area);
      });
    });
  }

  // ── Gallery carousel (auto-scroll CSS) ───────────────────────
  const homeGalleryTrack = document.getElementById('homeGalleryTrack');
  const homeGalleryScroller = document.getElementById('homeGallery');
  if (homeGalleryTrack && homeGalleryScroller && typeof alumnos !== 'undefined') {
    const doubled = [...alumnos, ...alumnos];
    homeGalleryTrack.innerHTML = doubled.map(src =>
      `<img src="${resolvePath(src)}" alt="Alumno OdonTeck" loading="lazy">`
    ).join('');
    initDrag(homeGalleryScroller);
    initAutoScroll(homeGalleryScroller, 'homeGalleryTrack', 22);
  }

  // ── Reviews carousel (auto-scroll CSS) ───────────────────────
  const homeReviewsTrack = document.getElementById('homeReviewsTrack');
  const homeReviewsScroller = document.getElementById('homeReviews');
  if (homeReviewsTrack && homeReviewsScroller && typeof resenas !== 'undefined') {
    const renderReviewCard = (r) => {
      const initials = r.nombre.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      const stars = '★'.repeat(r.estrellas) + '☆'.repeat(5 - r.estrellas);
      return `
        <article class="review-card">
          <div class="review-header">
            <div class="review-avatar">${initials}</div>
            <div class="review-info">
              <strong>${r.nombre}</strong>
              <span>${r.fecha}</span>
            </div>
          </div>
          <div class="review-stars">${stars}</div>
          <p class="review-text">${r.texto}</p>
        </article>`;
    };
    const doubled = [...resenas, ...resenas];
    homeReviewsTrack.innerHTML = doubled.map(renderReviewCard).join('');
    initDrag(homeReviewsScroller);
    initAutoScroll(homeReviewsScroller, 'homeReviewsTrack', 32);
  }

  // ── Gallery page (static grid) ────────────────────────────────
  const galleryPageGrid = document.getElementById('galleryPageGrid');
  if (galleryPageGrid && typeof alumnos !== 'undefined') {
    galleryPageGrid.innerHTML = alumnos.map(src =>
      `<img src="${resolvePath(src)}" alt="Alumno OdonTeck">`
    ).join('');
  }

  // ── Reviews page (static grid) ────────────────────────────────
  const reviewsPageGrid = document.getElementById('reviewsPageGrid');
  if (reviewsPageGrid && typeof resenas !== 'undefined') {
    const renderReviewCard = (r) => {
      const initials = r.nombre.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      const stars = '★'.repeat(r.estrellas) + '☆'.repeat(5 - r.estrellas);
      return `
        <article class="review-card">
          <div class="review-header">
            <div class="review-avatar">${initials}</div>
            <div class="review-info">
              <strong>${r.nombre}</strong>
              <span>${r.fecha}</span>
            </div>
          </div>
          <div class="review-stars">${stars}</div>
          <p class="review-text">${r.texto}</p>
        </article>`;
    };
    reviewsPageGrid.innerHTML = resenas.map(renderReviewCard).join('');
  }
});
