// ===========================
// ODONTECK - SCRIPT.JS
// ===========================

document.addEventListener('DOMContentLoaded', () => {

  // --- HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // --- NAVBAR SCROLL SHADOW ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(10,61,143,0.15)'
        : '0 2px 12px rgba(10,61,143,0.1)';
    }
  });

  // --- SCROLL TOP ---
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- ANIMACIÓN CONTADORES ---
  const statNums = document.querySelectorAll('.stat-num');
  if (statNums.length) {
    const animateCount = (el) => {
      const target = +el.getAttribute('data-target');
      let count = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          el.textContent = target + (el.dataset.suffix || '+');
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(count) + (el.dataset.suffix || '+');
        }
      }, 25);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    statNums.forEach(num => observer.observe(num));
  }

  // --- SLIDER DE CURSOS ---
  const cursosTrack = document.getElementById('cursosTrack');
  if (cursosTrack && typeof cursos !== 'undefined') {
    cursos.forEach(c => {
      const card = document.createElement('div');
      card.className = 'curso-card';
      card.innerHTML = `
        <img src="${c.img}" alt="${c.nombre}" class="curso-card-img" loading="lazy" onerror="this.src='assets/img/banner/hero-banner.png'"/>
        <div class="curso-card-body">
          <span class="curso-area">${c.area}</span>
          <h3>${c.nombre}</h3>
          <p class="curso-ponente">👩‍⚕️ ${c.ponente}</p>
          <div class="curso-card-footer">
            <span class="curso-costo">${c.costo}</span>
            <div class="curso-btns">
              <a href="https://wa.me/5212381479365?text=Hola, me interesa el curso: ${encodeURIComponent(c.nombre)}" 
                 class="btn-informes" target="_blank">Informes</a>
            </div>
          </div>
        </div>
      `;
      cursosTrack.appendChild(card);
    });

    let currentSlide = 0;
    const cardWidth = 324; // 300px + 24px gap
    const visibleCards = () => Math.floor(cursosTrack.parentElement.offsetWidth / cardWidth);
    const maxSlide = () => cursos.length - visibleCards();

    document.getElementById('prevCurso')?.addEventListener('click', () => {
      currentSlide = Math.max(0, currentSlide - 1);
      cursosTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    });
    document.getElementById('nextCurso')?.addEventListener('click', () => {
      currentSlide = Math.min(maxSlide(), currentSlide + 1);
      cursosTrack.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    });
  }

  // --- GALERÍA AUTO-SCROLL ---
  const galleryLeft = document.getElementById('galleryLeft');
  const galleryRight = document.getElementById('galleryRight');

  if (galleryLeft && typeof alumnos !== 'undefined') {
    const imgs = [...alumnos, ...alumnos]; // duplicar para loop
    imgs.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Alumno OdonTeck';
      img.loading = 'lazy';
      galleryLeft.appendChild(img);
    });
  }

  if (galleryRight && typeof alumnos !== 'undefined') {
    const imgs = [...alumnos, ...alumnos];
    imgs.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Alumno OdonTeck';
      img.loading = 'lazy';
      galleryRight.appendChild(img);
    });
  }

  // --- RESEÑAS AUTO-SCROLL ---
  const resenasLeft = document.getElementById('resenasLeft');
  if (resenasLeft && typeof resenas !== 'undefined') {
    const imgs = [...resenas, ...resenas];
    imgs.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Reseña OdonTeck';
      img.loading = 'lazy';
      resenasLeft.appendChild(img);
    });
  }

  // --- CURSOS PAGE - FILTROS Y GRID ---
  const cursosPageGrid = document.getElementById('cursosPageGrid');
  if (cursosPageGrid && typeof cursos !== 'undefined') {
    const renderCursos = (filter = 'Todos') => {
      cursosPageGrid.innerHTML = '';
      const filtered = filter === 'Todos' ? cursos : cursos.filter(c => c.area === filter);
      filtered.forEach(c => {
        const card = document.createElement('div');
        card.className = 'curso-card';
        card.innerHTML = `
          <img src="../${c.img}" alt="${c.nombre}" class="curso-card-img" loading="lazy" onerror="this.src='../assets/img/banner/hero-banner.png'"/>
          <div class="curso-card-body">
            <span class="curso-area">${c.area}</span>
            <h3>${c.nombre}</h3>
            <p class="curso-ponente">👩‍⚕️ ${c.ponente}</p>
            <div class="curso-card-footer">
              <span class="curso-costo">${c.costo}</span>
              <div class="curso-btns">
                <a href="https://wa.me/5212381479365?text=Hola, me interesa el curso: ${encodeURIComponent(c.nombre)}" 
                   class="btn-informes" target="_blank">Informes</a>
              </div>
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

  // --- GALERÍA PAGE GRID ---
  const galeriaPageGrid = document.getElementById('galeriaPageGrid');
  if (galeriaPageGrid && typeof alumnos !== 'undefined') {
    alumnos.forEach(src => {
      const img = document.createElement('img');
      img.src = '../' + src;
      img.alt = 'Galería OdonTeck';
      img.loading = 'lazy';
      galeriaPageGrid.appendChild(img);
    });
  }

  // Reseñas page
  const resenasPageGrid = document.getElementById('resenasPageGrid');
  if (resenasPageGrid && typeof resenas !== 'undefined') {
    resenas.forEach(src => {
      const img = document.createElement('img');
      img.src = '../' + src;
      img.alt = 'Reseña OdonTeck';
      img.loading = 'lazy';
      resenasPageGrid.appendChild(img);
    });
  }

});
