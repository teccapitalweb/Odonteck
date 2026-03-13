document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const scrollTopBtn = document.getElementById('scrollTop');

  const setNavbarState = () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  setNavbarState();
  window.addEventListener('scroll', setNavbarState);

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  if (scrollTopBtn) {
    const toggleScrollBtn = () => {
      scrollTopBtn.classList.toggle('show', window.scrollY > 500);
    };
    toggleScrollBtn();
    window.addEventListener('scroll', toggleScrollBtn);
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const revealItems = document.querySelectorAll('.reveal-up');
  if (revealItems.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    revealItems.forEach(item => revealObserver.observe(item));
  }

  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length) {
    const animateCount = (el) => {
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '+';
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 60));
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = `${target}${suffix}`;
          clearInterval(timer);
        } else {
          el.textContent = `${current}${suffix}`;
        }
      }, 24);
    };

    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.55 });

    statNums.forEach(num => statObserver.observe(num));
  }

  const cursosTrack = document.getElementById('cursosTrack');
  const prevCurso = document.getElementById('prevCurso');
  const nextCurso = document.getElementById('nextCurso');

  if (cursosTrack && typeof cursos !== 'undefined') {
    const isInnerPage = window.location.pathname.includes('/pages/');
    const prefix = isInnerPage ? '../' : '';

    cursos.forEach(c => {
      const card = document.createElement('div');
      card.className = 'curso-card reveal-up';
      card.innerHTML = `
        <img src="${prefix}${c.img}" alt="${c.nombre}" class="curso-card-img" loading="lazy" />
        <div class="curso-card-body">
          <span class="curso-area">${c.area}</span>
          <h3>${c.nombre}</h3>
          <p class="curso-ponente">${c.ponente}</p>
          <div class="curso-card-footer">
            <span class="curso-costo">${c.costo}</span>
            <a href="https://wa.me/5212381479365?text=${encodeURIComponent('Hola, me interesa el curso: ' + c.nombre)}" class="btn-informes" target="_blank">Informes</a>
          </div>
        </div>
      `;
      cursosTrack.appendChild(card);
    });

    let currentSlide = 0;
    let autoSlide;

    const cardWidth = () => {
      const firstCard = cursosTrack.querySelector('.curso-card');
      if (!firstCard) return 0;
      const style = getComputedStyle(cursosTrack);
      const gap = parseFloat(style.gap || 0);
      return firstCard.getBoundingClientRect().width + gap;
    };

    const visibleCards = () => {
      const width = cursosTrack.parentElement.getBoundingClientRect().width;
      const singleCard = cardWidth();
      return singleCard ? Math.max(1, Math.floor(width / singleCard)) : 1;
    };

    const maxSlide = () => Math.max(0, cursos.length - visibleCards());

    const updateSlider = () => {
      currentSlide = Math.min(currentSlide, maxSlide());
      cursosTrack.style.transform = `translateX(-${currentSlide * cardWidth()}px)`;
    };

    const startAutoSlide = () => {
      if (!prevCurso || !nextCurso) return;
      stopAutoSlide();
      autoSlide = setInterval(() => {
        currentSlide = currentSlide >= maxSlide() ? 0 : currentSlide + 1;
        updateSlider();
      }, 3600);
    };

    const stopAutoSlide = () => {
      if (autoSlide) clearInterval(autoSlide);
    };

    prevCurso?.addEventListener('click', () => {
      currentSlide = currentSlide <= 0 ? maxSlide() : currentSlide - 1;
      updateSlider();
      startAutoSlide();
    });

    nextCurso?.addEventListener('click', () => {
      currentSlide = currentSlide >= maxSlide() ? 0 : currentSlide + 1;
      updateSlider();
      startAutoSlide();
    });

    window.addEventListener('resize', updateSlider);
    cursosTrack.addEventListener('mouseenter', stopAutoSlide);
    cursosTrack.addEventListener('mouseleave', startAutoSlide);

    updateSlider();
    startAutoSlide();
  }

  const populateImageTrack = (trackId, items, altText) => {
    const track = document.getElementById(trackId);
    if (!track || !items) return;
    const isInnerPage = window.location.pathname.includes('/pages/');
    const prefix = isInnerPage ? '../' : '';
    [...items, ...items].forEach(src => {
      const img = document.createElement('img');
      img.src = `${prefix}${src}`;
      img.alt = altText;
      img.loading = 'lazy';
      track.appendChild(img);
    });
  };

  if (typeof alumnos !== 'undefined') {
    populateImageTrack('galleryLeft', alumnos, 'Alumno OdonTeck');
    populateImageTrack('galleryRight', alumnos, 'Comunidad OdonTeck');
  }

  if (typeof resenas !== 'undefined') {
    populateImageTrack('resenasLeft', resenas, 'Reseña OdonTeck');
  }

  const cursosPageGrid = document.getElementById('cursosPageGrid');
  if (cursosPageGrid && typeof cursos !== 'undefined') {
    const renderCursos = (filter = 'Todos') => {
      cursosPageGrid.innerHTML = '';
      const filtered = filter === 'Todos' ? cursos : cursos.filter(c => c.area === filter);
      filtered.forEach(c => {
        const card = document.createElement('div');
        card.className = 'curso-card';
        card.innerHTML = `
          <img src="../${c.img}" alt="${c.nombre}" class="curso-card-img" loading="lazy" />
          <div class="curso-card-body">
            <span class="curso-area">${c.area}</span>
            <h3>${c.nombre}</h3>
            <p class="curso-ponente">${c.ponente}</p>
            <div class="curso-card-footer">
              <span class="curso-costo">${c.costo}</span>
              <a href="https://wa.me/5212381479365?text=${encodeURIComponent('Hola, me interesa el curso: ' + c.nombre)}" class="btn-informes" target="_blank">Informes</a>
            </div>
          </div>
        `;
        cursosPageGrid.appendChild(card);
      });
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

  const galeriaPageGrid = document.getElementById('galeriaPageGrid');
  if (galeriaPageGrid && typeof alumnos !== 'undefined') {
    alumnos.forEach(src => {
      const img = document.createElement('img');
      img.src = `../${src}`;
      img.alt = 'Galería OdonTeck';
      img.loading = 'lazy';
      galeriaPageGrid.appendChild(img);
    });
  }

  const resenasPageGrid = document.getElementById('resenasPageGrid');
  if (resenasPageGrid && typeof resenas !== 'undefined') {
    resenas.forEach(src => {
      const img = document.createElement('img');
      img.src = `../${src}`;
      img.alt = 'Reseña OdonTeck';
      img.loading = 'lazy';
      resenasPageGrid.appendChild(img);
    });
  }
});
