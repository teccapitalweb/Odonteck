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

  // Generic track controls and drag behavior
  document.querySelectorAll('[data-track]').forEach((button) => {
    button.addEventListener('click', () => {
      const track = document.getElementById(button.dataset.track);
      if (!track) return;
      const amount = Math.min(380, track.clientWidth * 0.9);
      const dir = button.dataset.dir === 'prev' ? -1 : 1;
      track.scrollBy({ left: dir * amount, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.course-scroller').forEach((scroller) => {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    scroller.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX;
      startScroll = scroller.scrollLeft;
      scroller.style.cursor = 'grabbing';
    });

    ['mouseleave', 'mouseup'].forEach(evt => scroller.addEventListener(evt, () => {
      isDown = false;
      scroller.style.cursor = 'grab';
    }));

    scroller.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const walk = e.pageX - startX;
      scroller.scrollLeft = startScroll - walk;
    });
  });

  // Modal
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

  // Course renderers
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

  const coursesPageGrid = document.getElementById('coursesPageGrid');
  const courseFilters = document.getElementById('courseFilters');
  if (coursesPageGrid && courseFilters && typeof cursos !== 'undefined') {
    const areas = ['Todos', ...new Set(cursos.map(course => course.area))];
    courseFilters.innerHTML = areas.map(area => `<button class="filter-btn ${area === 'Todos' ? 'active' : ''}" data-area="${area}">${area}</button>`).join('');

    const paint = (area = 'Todos') => {
      const list = area === 'Todos' ? cursos : cursos.filter(course => course.area === area);
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

  // Images
  const homeGallery = document.getElementById('homeGallery');
  if (homeGallery && typeof alumnos !== 'undefined') {
    homeGallery.innerHTML = alumnos.slice(0, 8).map(src => `<img src="${resolvePath(src)}" alt="Alumno OdonTeck">`).join('');
  }

  const galleryPageGrid = document.getElementById('galleryPageGrid');
  if (galleryPageGrid && typeof alumnos !== 'undefined') {
    galleryPageGrid.innerHTML = alumnos.map(src => `<img src="${resolvePath(src)}" alt="Alumno OdonTeck">`).join('');
  }

  const renderReviews = (targetId) => {
    const el = document.getElementById(targetId);
    if (el && typeof resenas !== 'undefined') {
      el.innerHTML = resenas.map(src => `<img src="${resolvePath(src)}" alt="Reseña OdonTeck">`).join('');
    }
  };
  renderReviews('homeReviews');
  renderReviews('reviewsPageGrid');
});
