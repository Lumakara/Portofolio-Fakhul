/* ============================================================
   script.js — index.html only (production build)
   ============================================================ */

// 1. Tailwind config (ONCE)
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#ec4899'
      },
      borderRadius: {
        'none': '0px',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'full': '9999px',
        'button': '8px'
      }
    }
  }
};

// 2. Single DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {

  // ──────────────────────────────────────
  // 2a. Init AOS
  // ──────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: true });
  }

  // ──────────────────────────────────────
  // 2b. Particles (single optimized instance)
  // ──────────────────────────────────────
  const particleContainer = document.getElementById('particleContainer');
  let particleVariant = 'v2';
  const MAX_PARTICLES = 20;

  function createParticle() {
    if (particleVariant === 'none' || !particleContainer) return;
    if (particleContainer.children.length >= MAX_PARTICLES) return;

    const particle = document.createElement('div');
    particle.className = `particle ${particleVariant}`;
    const size = Math.random() * 4 + 2;
    particle.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 3 + 3}s;
    `;
    particleContainer.appendChild(particle);

    const duration = parseFloat(particle.style.animationDuration) * 1000;
    setTimeout(() => particle.remove(), duration);
  }

  // Init particles
  for (let i = 0; i < 15; i++) {
    setTimeout(createParticle, i * 200);
  }
  setInterval(createParticle, 500);

  // ──────────────────────────────────────
  // 2c. Scroll progress bar
  // ──────────────────────────────────────
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // ──────────────────────────────────────
  // 2d. Header / Navigation — (reserved)
  // ──────────────────────────────────────

  // ──────────────────────────────────────
  // 2e. Settings panel
  // ──────────────────────────────────────
  const settingsBtn = document.getElementById('settingsBtn');
  const settingsPanel = document.getElementById('settingsPanel');
  const closeSettings = document.getElementById('closeSettings');

  if (settingsBtn && settingsPanel) {
    settingsBtn.addEventListener('click', function() {
      settingsPanel.classList.add('open');
    });

    if (closeSettings) {
      closeSettings.addEventListener('click', function() {
        settingsPanel.classList.remove('open');
      });
    }

    document.addEventListener('click', function(e) {
      if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
        settingsPanel.classList.remove('open');
      }
    });
  }

  // ──────────────────────────────────────
  // ──────────────────────────────────────
  // 2f. Settings Manager (Theme, Particles, Performance, Language)
  // ──────────────────────────────────────
  const settingsManager = {
    state: {
      theme: localStorage.getItem('pref_theme') || 'light',
      particles: localStorage.getItem('pref_particles') || 'v2',
      perf: localStorage.getItem('pref_perf') || 'medium',
      lang: localStorage.getItem('pref_lang') || 'en'
    },
    
    init() {
      // Migrate old boolean particle state
      if (this.state.particles === 'true') this.state.particles = 'v2';
      if (this.state.particles === 'false') this.state.particles = 'none';

      this.bindEvents();
      this.applyTheme(this.state.theme);
      this.applyParticles(this.state.particles);
      this.applyPerformance(this.state.perf);
      this.applyLanguage(this.state.lang);
    },
    
    bindEvents() {
      // Theme
      const themeBtns = document.querySelectorAll('.theme-btn');
      themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.applyTheme(btn.dataset.theme);
        });
      });
      
      // Particles
      const particleBtns = document.querySelectorAll('.particle-btn');
      particleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.applyParticles(btn.dataset.particle);
        });
      });
      
      // Performance
      const perfRadios = document.querySelectorAll('input[name="performance"]');
      perfRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.checked) this.applyPerformance(e.target.value);
        });
        // Select custom radio UI
        radio.parentElement.addEventListener('click', () => {
          radio.checked = true;
          this.applyPerformance(radio.value);
        });
      });
      
      // Language
      const langBtns = document.querySelectorAll('.lang-btn');
      langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.applyLanguage(btn.dataset.lang);
        });
      });
    },
    
    applyTheme(theme) {
      this.state.theme = theme;
      localStorage.setItem('pref_theme', theme);
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        document.body.classList.remove('bg-gray-50');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        document.body.classList.add('bg-gray-50');
      }
      
      document.querySelectorAll('.theme-btn').forEach(b => {
        if (b.dataset.theme === theme) {
          b.classList.add('border-primary', 'bg-primary/10');
          b.classList.remove('border-gray-300', 'dark:border-gray-700');
        } else {
          b.classList.remove('border-primary', 'bg-primary/10');
          b.classList.add('border-gray-300', 'dark:border-gray-700');
        }
      });
    },
    
    applyParticles(variant) {
      this.state.particles = variant;
      localStorage.setItem('pref_particles', variant);
      particleVariant = variant;
      
      if (particleContainer) particleContainer.innerHTML = '';

      document.querySelectorAll('.particle-btn').forEach(b => {
        if (b.dataset.particle === variant) {
          b.classList.add('border-primary', 'bg-primary/10');
          b.classList.remove('border-gray-300', 'dark:border-gray-700');
        } else {
          b.classList.remove('border-primary', 'bg-primary/10');
          b.classList.add('border-gray-300', 'dark:border-gray-700');
        }
      });
    },
    
    applyPerformance(level) {
      this.state.perf = level;
      localStorage.setItem('pref_perf', level);
      
      document.querySelectorAll('input[name="performance"]').forEach(radio => {
        const dot = radio.nextElementSibling;
        if (radio.value === level) {
          radio.checked = true;
          dot.classList.add('border-primary', 'bg-primary');
          dot.classList.remove('border-gray-300');
        } else {
          dot.classList.remove('border-primary', 'bg-primary');
          dot.classList.add('border-gray-300');
        }
      });
      
      document.body.classList.remove('perf-low', 'perf-high');
      if (level === 'low') {
        document.body.classList.add('perf-low');
        this.applyParticles('none');
      } else if (level === 'high') {
        document.body.classList.add('perf-high');
      }
    },
    
    applyLanguage(lang) {
      this.state.lang = lang;
      localStorage.setItem('pref_lang', lang);
      
      document.querySelectorAll('.lang-btn').forEach(b => {
        if (b.dataset.lang === lang) {
          b.classList.add('border-primary', 'bg-primary/10');
          b.classList.remove('border-gray-300', 'dark:border-gray-700');
        } else {
          b.classList.remove('border-primary', 'bg-primary/10');
          b.classList.add('border-gray-300', 'dark:border-gray-700');
        }
      });
      
      const dict = {
        en: {
          nav_home: "Home", nav_about: "About", nav_journey: "Journey", nav_gallery: "Gallery", nav_contact: "Contact",
          welcome_title: "Welcome To My Portfolio",
          welcome_desc: "No limits to create, no stopping to keep growing",
          about_title: "About Me",
          journey_title: "My Journey",
          gallery_title: "Gallery & Projects",
          contact_title: "Let’s Work Together",
          contact_desc: "Ready to bring your ideas to life? Let’s discuss your project and create something amazing together."
        },
        id: {
          nav_home: "Beranda", nav_about: "Tentang", nav_journey: "Perjalanan", nav_gallery: "Galeri", nav_contact: "Kontak",
          welcome_title: "Selamat Datang di Portofolio Saya",
          welcome_desc: "Tanpa batas untuk berkarya, tanpa henti untuk terus berkembang",
          about_title: "Tentang Saya",
          journey_title: "Perjalanan Saya",
          gallery_title: "Galeri & Penghargaan",
          contact_title: "Mari Bekerja Sama",
          contact_desc: "Siap mewujudkan ide Anda? Mari diskusikan proyek Anda dan ciptakan sesuatu yang luar biasa bersama."
        }
      };
      
      const t = dict[lang];
      if (!t) return;
      
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
      });
    }
  };
  
  settingsManager.init();

  // ──────────────────────────────────────
  // ──────────────────────────────────────
  // 2g. About section tabs (iOS Style)
  // ──────────────────────────────────────
  const aboutFilters = document.querySelectorAll('.about-filter');
  const aboutContents = document.querySelectorAll('.about-content');
  const tabIndicator = document.getElementById('aboutTabIndicator');

  aboutFilters.forEach((filter, index) => {
    filter.addEventListener('click', function() {
      const target = this.dataset.filter;
      
      // Move indicator
      if(tabIndicator) {
        tabIndicator.style.left = `calc(${index * 33.333}% + 4px)`;
        tabIndicator.style.width = 'calc(33.333% - 8px)';
        tabIndicator.style.transform = 'none';
      }

      // Update button styles
      aboutFilters.forEach(f => {
        f.classList.remove('active', 'text-primary', 'dark:text-white');
        f.classList.add('text-gray-600', 'dark:text-gray-400');
      });
      this.classList.add('active', 'text-primary', 'dark:text-white');
      this.classList.remove('text-gray-600', 'dark:text-gray-400');
      
      // Update contents with smooth animation
      aboutContents.forEach(content => {
        content.classList.remove('translate-y-0', 'opacity-100', 'z-10');
        content.classList.add('translate-y-8', 'opacity-0', 'pointer-events-none', 'z-0');
      });
      
      const targetEl = document.getElementById(target);
      if (targetEl) {
        // small delay for smooth transition
        setTimeout(() => {
          targetEl.classList.remove('translate-y-8', 'opacity-0', 'pointer-events-none', 'z-0');
          targetEl.classList.add('translate-y-0', 'opacity-100', 'z-10');
        }, 50);
      }
    });
  });

  // ──────────────────────────────────────
  // 2h. Journey section tabs + modals
  // ──────────────────────────────────────
  const journeyFilters = document.querySelectorAll('.journey-filter');
  const journeyContents = document.querySelectorAll('.journey-content');

  journeyFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const target = this.dataset.filter;

      // Reset button states
      journeyFilters.forEach(f => f.classList.remove('active', 'bg-primary', 'text-white'));
      this.classList.add('active', 'bg-primary', 'text-white');

      // Switch content with small animation
      journeyContents.forEach(content => {
        content.classList.add('hidden', 'opacity-0', 'translate-y-6');
        setTimeout(() => content.classList.remove('opacity-0', 'translate-y-6'), 100);
      });
      const targetEl = document.getElementById(target);
      if (targetEl) targetEl.classList.remove('hidden');
    });
  });

  // Progress bar scroll (Education section)
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    window.addEventListener('scroll', () => {
      const section = document.getElementById('journey');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        const totalHeight = rect.height - window.innerHeight;
        if (totalHeight <= 0) return;
        const scrollY = Math.min(Math.max(0, -rect.top), totalHeight);
        const progress = (scrollY / totalHeight) * 100;
        progressFill.style.height = `${progress}%`;
      }
    }, { passive: true });
  }

  // Journey modal open/close
  // Global close helper for journey modals
  window.closeJourneyModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.classList.add('hidden'), 300);
      if (typeof sfx !== 'undefined') sfx.playClick();
    }
  };

  // Event delegation to open journey modals dynamically
  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-modal]');
    if (trigger) {
      // Don't intercept if it's an about filter
      if (trigger.classList.contains('about-filter')) return;
      const modalId = trigger.dataset.modal + 'Modal';
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 50);
        if (typeof sfx !== 'undefined') sfx.playOpenModal();
      }
    }
  });

  // Event delegation to close modals on backdrop click
  document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('journey-modal')) {
      const modal = e.target;
      modal.classList.remove('show');
      setTimeout(() => modal.classList.add('hidden'), 300);
      if (typeof sfx !== 'undefined') sfx.playClick();
    }
  });

  // ──────────────────────────────────────
  // 2i. Hobby modal (with navigation)
  // ──────────────────────────────────────
  const hobbyItems = document.querySelectorAll('.hobby-item');
  const hobbyModal = document.getElementById('hobbyModal');
  const hobbyContent = document.getElementById('hobbyContent');
  const closeHobbyModal = document.getElementById('closeHobbyModal');
  const prevHobbyBtn = document.getElementById('prevHobby');
  const nextHobbyBtn = document.getElementById('nextHobby');
  const hobbyTitle = document.getElementById('hobbyTitle');
  const hobbyDesc = document.getElementById('hobbyDesc');
  const hobbyIcon = document.getElementById('hobbyIcon');

  let currentHobbyIndex = 0;

  const hobbyIcons = {
    Photography: "ri-camera-line text-blue-500",
    Traveling: "ri-map-pin-line text-green-500",
    Music: "ri-music-2-line text-purple-500",
    Gaming: "ri-gamepad-line text-red-500"
  };

  function showHobby(index) {
    if (!hobbyItems.length || !hobbyModal || !hobbyContent) return;
    const item = hobbyItems[index];
    if (!item) return;
    currentHobbyIndex = index;

    if (hobbyTitle) hobbyTitle.textContent = item.dataset.title;
    if (hobbyDesc) hobbyDesc.innerHTML = "";

    const iconClass = hobbyIcons[item.dataset.title] || "ri-check-line text-primary";
    if (hobbyIcon) hobbyIcon.className = iconClass + " text-2xl";

    try {
      const descArray = JSON.parse(item.dataset.desc);
      descArray.forEach((point, idx) => {
        const li = document.createElement('li');
        const icon = document.createElement('i');
        icon.className = iconClass;
        const text = document.createElement('span');
        text.textContent = point;
        li.appendChild(icon);
        li.appendChild(text);
        li.style.animationDelay = `${idx * 0.15}s`;
        if (hobbyDesc) hobbyDesc.appendChild(li);
      });
    } catch {
      if (hobbyDesc) {
        const li = document.createElement('li');
        li.innerHTML = `<i class="${iconClass}"></i> <span>${item.dataset.desc}</span>`;
        hobbyDesc.appendChild(li);
      }
    }

    hobbyModal.classList.remove('hidden');
    setTimeout(() => {
      hobbyContent.classList.remove('opacity-0', 'scale-95');
      hobbyContent.classList.add('opacity-100', 'scale-100');
    }, 10);
  }

  hobbyItems.forEach((item, index) => {
    item.addEventListener('click', () => showHobby(index));
  });

  if (prevHobbyBtn) {
    prevHobbyBtn.addEventListener('click', () => {
      const newIndex = (currentHobbyIndex - 1 + hobbyItems.length) % hobbyItems.length;
      showHobby(newIndex);
    });
  }

  if (nextHobbyBtn) {
    nextHobbyBtn.addEventListener('click', () => {
      const newIndex = (currentHobbyIndex + 1) % hobbyItems.length;
      showHobby(newIndex);
    });
  }

  function closeHobby() {
    if (!hobbyContent || !hobbyModal) return;
    hobbyContent.classList.remove('opacity-100', 'scale-100');
    hobbyContent.classList.add('opacity-0', 'scale-95');
    setTimeout(() => hobbyModal.classList.add('hidden'), 300);
  }

  if (closeHobbyModal) closeHobbyModal.addEventListener('click', closeHobby);
  if (hobbyModal) {
    hobbyModal.addEventListener('click', (e) => {
      if (e.target === hobbyModal) closeHobby();
    });
  }

  // ──────────────────────────────────────
  // 2j. Gallery tabs
  // ──────────────────────────────────────
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  const galleryContents = document.querySelectorAll('.gallery-content');

  galleryFilters.forEach(filter => {
    filter.addEventListener('click', function() {
      const target = this.dataset.filter;
      galleryFilters.forEach(f => {
        f.classList.remove('active', 'bg-primary', 'text-white');
        f.classList.add('text-gray-600');
        f.setAttribute('aria-pressed', 'false');
      });
      this.classList.add('active', 'bg-primary', 'text-white');
      this.classList.remove('text-gray-600');
      this.setAttribute('aria-pressed', 'true');

      galleryContents.forEach(section => {
        if (section.id === target) {
          section.classList.remove('hidden');
          const items = section.querySelectorAll('.gallery-item');
          items.forEach((item, i) => {
            item.classList.remove('show');
            setTimeout(() => item.classList.add('show'), i * 100);
          });
        } else {
          section.classList.add('hidden');
        }
      });
    });
  });

  // ──────────────────────────────────────
  // 2k. Certificate loading from JSON + modal
  // ──────────────────────────────────────
  (function initCertificates() {
    const PAGE_SIZE = 3;
    const JSON_URL = 'sertifikat.json';

    const grid = document.getElementById('certificatesGrid');
    const loadMoreBtn = document.getElementById('loadMoreCertificates');
    if (!grid || !loadMoreBtn) return;

    let certs = [];
    let renderedCount = 0;
    let currentModalIndex = -1;

    // Modal elements
    const certModal = document.getElementById('certificateModal');
    const certModalContent = document.getElementById('certificateContent');
    const certImgEl = document.getElementById('certificateImage');
    const certTitleEl = document.getElementById('certificateTitle');
    const certOrgEl = document.getElementById('certificateOrg');
    const certDateEl = document.getElementById('certificateDate');
    const certSkillsEl = document.getElementById('certificateSkills');
    const certIDEl = document.getElementById('certificateID');
    const certVerifEl = document.getElementById('certificateVerification');
    const certCloseBtn = document.getElementById('closeCertificateModal');
    const certPrevBtn = document.getElementById('prevCertificate');
    const certNextBtn = document.getElementById('nextCertificate');

    const escapeHtml = (s = '') =>
      String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'": '&#39;'}[m]));
    const normUrl = (u = '') => u.startsWith('http') ? u : `https://${u}`;

    // Fetch & init
    fetch(JSON_URL)
      .then(r => r.json())
      .then(data => {
        certs = Array.isArray(data) ? data : (data.certificates || []);
        certs.sort((a, b) => new Date(b.date) - new Date(a.date));
        renderNext();
      })
      .catch(err => {
        console.error('Failed to load certificates:', err);
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Failed to load';
      });

    function renderNext() {
      const frag = document.createDocumentFragment();
      const slice = certs.slice(renderedCount, renderedCount + PAGE_SIZE);

      slice.forEach((c, i) => {
        const idx = renderedCount + i;
        const card = document.createElement('article');
        card.className = 'certificate-item gallery-item bg-white rounded-xl shadow-lg overflow-hidden card-hover cursor-pointer';
        card.setAttribute('data-index', String(idx));
        card.innerHTML = `
          <img src="${escapeHtml(c.img)}"
               alt="Preview of ${escapeHtml(c.title || 'Certificate')}"
               class="w-full h-48 object-cover object-top blur-sm transition duration-300 ease-in-out"
               loading="lazy" onload="this.classList.remove('blur-sm')">
          <div class="p-6">
            <h3 class="text-lg font-bold">${escapeHtml(c.title || '')}</h3>
            <p class="text-gray-600">${escapeHtml(c.org || '')}</p>
          </div>
        `;
        card.addEventListener('click', () => openCertModal(idx));
        frag.appendChild(card);
      });

      grid.appendChild(frag);
      renderedCount += slice.length;

      if (renderedCount >= certs.length) {
        loadMoreBtn.classList.add('hidden');
      } else {
        loadMoreBtn.classList.remove('hidden');
      }
    }

    loadMoreBtn.addEventListener('click', renderNext);

    function openCertModal(index) {
      if (!certModal || !certModalContent) return;
      currentModalIndex = index;
      fillCertModal(certs[index]);
      certModal.classList.remove('hidden');
      requestAnimationFrame(() => {
        certModalContent.classList.remove('opacity-0', 'scale-95');
      });
    }

    function closeCertModal() {
      if (!certModalContent || !certModal) return;
      certModalContent.classList.add('opacity-0', 'scale-95');
      setTimeout(() => certModal.classList.add('hidden'), 200);
    }

    function fillCertModal(c) {
      if (!c) return;
      if (certImgEl) { certImgEl.src = c.img || ''; certImgEl.alt = `Certificate: ${c.title || ''}`; }
      if (certTitleEl) certTitleEl.textContent = c.title || '';
      if (certOrgEl) certOrgEl.textContent = c.org || '';
      if (certDateEl) certDateEl.textContent = c.date || '';
      if (certIDEl) certIDEl.textContent = c.id || '';

      if (certVerifEl) {
        certVerifEl.innerHTML = '';
        if (c.verification) {
          const a = document.createElement('a');
          a.href = normUrl(c.verification);
          a.target = '_blank';
          a.rel = 'noopener';
          a.className = 'text-primary underline';
          a.textContent = c.verification;
          certVerifEl.appendChild(a);
        }
      }

      if (certSkillsEl) {
        certSkillsEl.innerHTML = '';
        const skills = Array.isArray(c.skills)
          ? c.skills
          : String(c.skills || '').split(',').map(s => s.trim()).filter(Boolean);
        skills.forEach(s => {
          const chip = document.createElement('span');
          chip.className = 'px-2 py-1 text-xs rounded-full bg-gray-100';
          chip.textContent = s;
          certSkillsEl.appendChild(chip);
        });
      }
    }

    function showPrevCert() {
      if (!certs.length) return;
      currentModalIndex = (currentModalIndex - 1 + certs.length) % certs.length;
      fillCertModal(certs[currentModalIndex]);
    }

    function showNextCert() {
      if (!certs.length) return;
      currentModalIndex = (currentModalIndex + 1) % certs.length;
      fillCertModal(certs[currentModalIndex]);
    }

    // Bind modal events
    certCloseBtn?.addEventListener('click', closeCertModal);
    certModal?.addEventListener('click', (e) => { if (e.target === certModal) closeCertModal(); });
    document.addEventListener('keydown', (e) => {
      if (certModal && !certModal.classList.contains('hidden') && e.key === 'Escape') closeCertModal();
    });
    certPrevBtn?.addEventListener('click', showPrevCert);
    certNextBtn?.addEventListener('click', showNextCert);

    // Lightbox zoom
    const lightbox = document.getElementById('lightboxZoom');
    const lightboxImg = document.getElementById('lightboxImage');
    certImgEl?.addEventListener('click', () => {
      if (lightboxImg && lightbox) {
        lightboxImg.src = certImgEl.src;
        lightbox.classList.remove('hidden');
      }
    });
    lightbox?.addEventListener('click', () => lightbox.classList.add('hidden'));
  })();

  // ──────────────────────────────────────
  // 2l. Gallery preview modal
  // ──────────────────────────────────────
  (function initGalleryPreview() {
    const items = document.querySelectorAll(".gallery-item");
    const modal = document.getElementById("galleryPreview_x9");
    const img = document.getElementById("galleryImg_x9");
    const title = document.getElementById("galleryTitle_x9");
    const desc = document.getElementById("galleryDesc_x9");
    const closeBtn = document.getElementById("galleryClose_x9");
    const prevBtn = document.getElementById("galleryPrev_x9");
    const nextBtn = document.getElementById("galleryNext_x9");

    if (!modal) return;

    let currentIndex = 0;
    let data = [];

    items.forEach((item, i) => {
      const imgEl = item.querySelector("img");
      const titleEl = item.querySelector("h3");
      const descEl = item.querySelector("p");
      data.push({
        src: imgEl ? imgEl.src : '',
        title: titleEl ? titleEl.textContent : "",
        desc: descEl ? descEl.textContent : ""
      });

      item.addEventListener("click", () => {
        currentIndex = i;
        showPreview(currentIndex);
      });
    });

    function showPreview(i) {
      if (!data[i]) return;
      modal.classList.add("active");
      if (img) img.src = data[i].src;
      if (title) title.textContent = data[i].title;
      if (desc) desc.textContent = data[i].desc;
    }

    function closePreview() {
      modal.classList.remove("active");
    }

    function next() {
      if (!data.length) return;
      currentIndex = (currentIndex + 1) % data.length;
      showPreview(currentIndex);
    }

    function prev() {
      if (!data.length) return;
      currentIndex = (currentIndex - 1 + data.length) % data.length;
      showPreview(currentIndex);
    }

    if (closeBtn) closeBtn.addEventListener("click", closePreview);
    if (nextBtn) nextBtn.addEventListener("click", next);
    if (prevBtn) prevBtn.addEventListener("click", prev);

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closePreview();
      });
    }
  })();

  // ──────────────────────────────────────
  // 2m. Contact form (EmailJS + Telegram)
  // ──────────────────────────────────────
  const contactForm = document.getElementById('contactForm');

  function showToast(message, type = "success") {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className =
        "fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 z-50";
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.className =
      `fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 z-50 ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`;

    setTimeout(() => {
      toast.classList.remove("opacity-0");
      toast.classList.add("opacity-100");
    }, 50);

    setTimeout(() => {
      toast.classList.remove("opacity-100");
      toast.classList.add("opacity-0");
    }, 3000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const inputs = this.querySelectorAll('input, textarea');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('border-red-500');
          isValid = false;
        } else {
          input.classList.remove('border-red-500');
        }
      });

      const emailInput = this.querySelector('input[type="email"]');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailInput && !emailPattern.test(emailInput.value.trim())) {
        emailInput.classList.add('border-red-500');
        isValid = false;
        showToast("Please enter a valid email address", "error");
        return;
      }

      if (isValid) {
        const submitBtn = this.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        submitBtn.disabled = true;
        const oldText = submitBtn.innerHTML;

        submitBtn.innerHTML = `<span class="loader"></span> Sending...`;

        emailjs.sendForm("service_r2acb9x", "template_gf7e27s", contactForm)
          .then(() => {
            return emailjs.sendForm("service_r2acb9x", "template_g1f1mpf", contactForm);
          })
          .then(() => {
            const name = contactForm.querySelector("input[name='name']")?.value || '';
            const email = contactForm.querySelector("input[name='email']")?.value || '';
            const subject = contactForm.querySelector("input[name='subject']")?.value || '';
            const message = contactForm.querySelector("textarea[name='message']")?.value || '';

            const botToken = "8294737965:AAGg_NMieO1nxetiZwY_SuY4vIgmdjqqE14";
            const chatId = "8296869559";

            const text = `📩 *New Contact Form Message*
      
👤 Name: ${name}
📧 Email: ${email}
📝 Subject: ${subject}
💬 Message: ${message}`;

            return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: "Markdown"
              })
            });
          })
          .then(() => {
            submitBtn.innerHTML = `<span style="font-size:18px;">✔</span> Sent!`;
            submitBtn.style.backgroundColor = "#22c55e";
            showToast("Message sent! Email + Telegram notification sent 🚀", "success");

            setTimeout(() => {
              contactForm.reset();
              submitBtn.disabled = false;
              submitBtn.style.backgroundColor = "";
              submitBtn.innerHTML = oldText;
            }, 2000);
          })
          .catch((error) => {
            console.error("FAILED...", error);
            submitBtn.innerHTML = `<span style="font-size:18px;">✖</span> Failed`;
            submitBtn.style.backgroundColor = "#ef4444";
            showToast("Failed to send message. Try again later.", "error");

            setTimeout(() => {
              submitBtn.disabled = false;
              submitBtn.style.backgroundColor = "";
              submitBtn.innerHTML = oldText;
            }, 2000);
          });
      } else {
        showToast("Please fill in all fields", "error");
      }
    });
  }

  // ──────────────────────────────────────
  // 2n. Download CV
  // ──────────────────────────────────────
  const downloadCvBtn = document.getElementById('downloadCvBtn');
  const downloadToast = document.getElementById('downloadToast');

  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', async function() {
      const originalContent = downloadCvBtn.innerHTML;
      downloadCvBtn.innerHTML = `
        <i class="ri-loader-4-line animate-spin"></i>
        <span>Downloading...</span>
      `;
      downloadCvBtn.disabled = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        const link = document.createElement('a');
        link.href = 'Alex_Johnson_CV.pdf';
        link.download = 'Alex_Johnson_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (downloadToast) {
          downloadToast.classList.remove('translate-y-full', 'opacity-0');
          setTimeout(() => {
            downloadToast.classList.add('translate-y-full', 'opacity-0');
          }, 3000);
        }
      } catch (error) {
        console.error('Download failed:', error);
      } finally {
        downloadCvBtn.innerHTML = originalContent;
        downloadCvBtn.disabled = false;
      }
    });
  }

  // ──────────────────────────────────────
  // 2o. Smooth scroll + Contact Me button
  // ──────────────────────────────────────
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const contactMeBtn = document.getElementById('contactMeBtn');

  function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (contactForm) {
        contactForm.classList.add('animate-form');
        setTimeout(() => contactForm.classList.remove('animate-form'), 1000);
        const firstInput = contactForm.querySelector('input');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 1000);
        }
      }
    }
  }

  if (contactMeBtn) {
    contactMeBtn.addEventListener('click', scrollToContact);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ──────────────────────────────────────
  // 2p. Mobile drawer (hamburger)
  // ──────────────────────────────────────
  (function initMobileDrawer() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const closeMobileNav = document.getElementById('closeMobileNav');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    if (!hamburgerBtn || !mobileNav) {
      return;
    }

    if (drawerLinks && drawerLinks.length) {
      drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
          drawerLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          closeDrawer();
        });
      });
    }

    function openDrawer() {
      mobileNav.classList.remove('-translate-x-full');
      mobileNav.classList.add('translate-x-0');
      document.body.classList.add('open');
      drawerLinks.forEach((link, i) => {
        setTimeout(() => link.classList.add('show'), i * 80);
      });
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawerLinks.forEach((link, i) => {
        setTimeout(() => link.classList.remove('show'), i * 30);
      });
      mobileNav.classList.add('-translate-x-full');
      mobileNav.classList.remove('translate-x-0');
      document.body.classList.remove('open');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    hamburgerBtn.addEventListener('click', () => {
      const hidden = mobileNav.classList.contains('-translate-x-full');
      if (hidden) openDrawer();
      else closeDrawer();
    });

    if (closeMobileNav) {
      closeMobileNav.addEventListener('click', closeDrawer);
    }

    document.addEventListener('click', (e) => {
      const isOpen = !mobileNav.classList.contains('-translate-x-full');
      if (!isOpen) return;
      if (!mobileNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        closeDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
  })();

  // ──────────────────────────────────────
  // 2q. Scroll animations (IntersectionObserver)
  // ──────────────────────────────────────

  // Single observer for fade-slide-up + stagger + underline
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // Fade slide-up elements
      if (el.classList.contains('fade-slide-up')) {
        el.classList.add('show');
        scrollObserver.unobserve(el);
      }

      // Staggered form fields
      if (el.classList.contains('stagger')) {
        // Use index-based delay from dataset if available
        const idx = el.dataset.staggerIndex || 0;
        setTimeout(() => el.classList.add('visible'), idx * 200);
      }

      // Underline swipe animation
      if (el.id === 'contact-underline') {
        el.classList.remove('animate-underline-swipe-bounce');
        void el.offsetWidth; // reset animation
        el.classList.add('animate-underline-swipe-bounce');
      }
    });
  }, { threshold: 0.2 });

  // Observe fade-slide-up elements
  document.querySelectorAll('.fade-slide-up').forEach(el => scrollObserver.observe(el));

  // Observe stagger elements
  document.querySelectorAll('#contact .stagger').forEach((el, i) => {
    el.dataset.staggerIndex = i;
    scrollObserver.observe(el);
  });

  // Observe underline element
  const contactUnderline = document.getElementById('contact-underline');
  if (contactUnderline) scrollObserver.observe(contactUnderline);

  // Ripple effect on buttons
  document.querySelectorAll(".ripple").forEach(btn => {
    btn.addEventListener("click", function(e) {
      const circle = document.createElement("span");
      circle.classList.add("ripple-circle");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = size + "px";
      circle.style.left = e.clientX - rect.left - size / 2 + "px";
      circle.style.top = e.clientY - rect.top - size / 2 + "px";
      circle.style.position = "absolute";
      circle.style.borderRadius = "50%";
      circle.style.background = "rgba(255,255,255,0.5)";
      circle.style.transform = "scale(0)";
      circle.style.animation = "rippleAnim 0.6s linear";
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // ──────────────────────────────────────
  // 2r. Typing effect
  // ──────────────────────────────────────
  setTimeout(startTypingEffect, 1000);

  // ──────────────────────────────────────
  // Profile photo modal
  // ──────────────────────────────────────
  const profilePhoto = document.getElementById('profilePhoto');
  const profileModal = document.getElementById('profileModal');
  const closeProfileModal = document.getElementById('closeModal');

  if (profilePhoto && profileModal && closeProfileModal) {
    profilePhoto.addEventListener('click', () => profileModal.classList.remove('hidden'));
    closeProfileModal.addEventListener('click', () => profileModal.classList.add('hidden'));
    profileModal.addEventListener('click', e => {
      if (e.target === profileModal) profileModal.classList.add('hidden');
    });
  }

  // ──────────────────────────────────────
  // Keyboard shortcuts (hobby modal)
  // ──────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hobbyModal && !hobbyModal.classList.contains('hidden')) closeHobby();
    if (e.key === 'ArrowRight' && hobbyModal && !hobbyModal.classList.contains('hidden') && nextHobbyBtn) nextHobbyBtn.click();
    if (e.key === 'ArrowLeft' && hobbyModal && !hobbyModal.classList.contains('hidden') && prevHobbyBtn) prevHobbyBtn.click();
  });

  // ============================================================
  // PREMIUM UI/UX INTEGRATIONS
  // ============================================================

  // 1. VanillaTilt Card Initialization (Exp & Org)
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('.exp-card, .org-card'), {
      max: 12,
      speed: 600,
      glare: true,
      'max-glare': 0.3,
      scale: 1.02,
      perspective: 1000,
      gyroscope: true
    });
  }

  // 2. GSAP + ScrollTrigger Premium Text Reveal & Parallax
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Dynamic Text Reveal (char-by-char)
    document.querySelectorAll('[data-gsap-reveal]').forEach(el => {
      const text = el.innerText.trim();
      el.innerHTML = '';
      
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'inline-block overflow-hidden';
        const inner = document.createElement('span');
        inner.className = 'text-reveal-char';
        inner.innerText = char === ' ' ? '\u00A0' : char;
        span.appendChild(inner);
        el.appendChild(span);
      });

      gsap.fromTo(el.querySelectorAll('.text-reveal-char'), 
        { y: '115%', opacity: 0 },
        { 
          y: '0%', 
          opacity: 1,
          duration: 1.1, 
          ease: 'power4.out',
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Parallax Scrolling Decorators
    const welcome = document.getElementById('welcome');
    if (welcome) {
      const shape1 = document.createElement('div');
      shape1.className = 'absolute top-1/4 left-10 w-24 h-24 border border-blue-500/10 rounded-full pointer-events-none hidden md:block z-0';
      shape1.setAttribute('data-speed', '0.12');
      const shape2 = document.createElement('div');
      shape2.className = 'absolute bottom-1/4 right-12 w-32 h-32 border border-purple-500/10 rounded-full pointer-events-none hidden md:block z-0';
      shape2.setAttribute('data-speed', '-0.08');
      welcome.appendChild(shape1);
      welcome.appendChild(shape2);
    }

    const about = document.getElementById('about');
    if (about) {
      const shape = document.createElement('div');
      shape.className = 'absolute top-10 right-20 w-44 h-44 border border-green-500/5 rounded-full pointer-events-none hidden md:block z-0';
      shape.setAttribute('data-speed', '0.06');
      about.appendChild(shape);
    }

    gsap.utils.toArray('[data-speed]').forEach(el => {
      const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });
  }

  // 4. Web Audio API Sound Effects Synthesizer
  class UI_SFX {
    constructor() {
      this.audioCtx = null;
    }
    init() {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }
    playHover() {
      try {
        this.init();
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(850, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1150, this.audioCtx.currentTime + 0.04);
        
        gain.gain.setValueAtTime(0.007, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.04);
        
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.04);
      } catch (err) {}
    }
    playClick() {
      try {
        this.init();
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, this.audioCtx.currentTime + 0.07);
        
        gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.07);
        
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.07);
      } catch (err) {}
    }
    playTab() {
      try {
        this.init();
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const playTone = (freq, delay, dur) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + delay);
          
          gain.gain.setValueAtTime(0.02, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);
          
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + dur);
        };
        playTone(523.25, 0, 0.12); // C5
        playTone(659.25, 0.04, 0.15); // E5
      } catch (err) {}
    }
    playOpenModal() {
      try {
        this.init();
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const playTone = (freq, delay, dur) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + delay);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + delay + dur);
          
          gain.gain.setValueAtTime(0.022, now + delay);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);
          
          osc.connect(gain);
          gain.connect(this.audioCtx.destination);
          osc.start(now + delay);
          osc.stop(now + delay + dur);
        };
        playTone(392.00, 0, 0.22); // G4 -> D5
      } catch (err) {}
    }
  }
  const sfx = new UI_SFX();

  // 5. Global Click Ripple and UI sounds
  window.addEventListener('click', (e) => {
    // Generate Ripple
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    
    // Play synthesizer pop audio
    sfx.playClick();
    
    setTimeout(() => ripple.remove(), 700);
  });

  // Sound Bindings
  document.querySelectorAll('.about-filter').forEach(tab => {
    tab.addEventListener('click', () => sfx.playTab());
  });

  document.querySelectorAll('.glow-button, .about-filter, .nav-item, .exp-card, .org-card, .drawer-link, .lang-btn, .theme-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => sfx.playHover());
  });

  document.querySelectorAll('[data-modal]').forEach(item => {
    item.addEventListener('click', () => sfx.playOpenModal());
  });

  // 6. Lottie Icon Binding for Paperplane
  const lottieContainer = document.getElementById('lottie-paperplane');
  if (lottieContainer && typeof lottie !== 'undefined') {
    const lottieAnim = lottie.loadAnimation({
      container: lottieContainer,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: 'https://assets5.lottiefiles.com/packages/lf20_myejio2g.json'
    });
    
    const submitBtn = lottieContainer.closest('button');
    if (submitBtn) {
      submitBtn.addEventListener('mouseenter', () => {
        lottieAnim.setDirection(1);
        lottieAnim.play();
      });
      submitBtn.addEventListener('mouseleave', () => {
        lottieAnim.stop();
      });
    }
  }

  // 7. Seamless Page Transitions Sweep
  const pageTransition = document.createElement('div');
  pageTransition.className = 'page-transition-overlay';
  document.body.appendChild(pageTransition);

  // Exit transition on load
  window.addEventListener('load', () => {
    pageTransition.classList.add('exit');
    setTimeout(() => {
      pageTransition.classList.remove('exit');
    }, 750);
  });

  // Transition on html links
  document.querySelectorAll('a').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('#')) {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        pageTransition.classList.remove('exit');
        pageTransition.classList.add('active');
        sfx.playOpenModal(); // springy sweep chime
        setTimeout(() => {
          window.location.href = href;
        }, 750);
      });
    }
  });

  // ============================================================
  // DYNAMIC PORTFOLIO & CRUD ADMIN SYSTEM (PRD COMPLIANT)
  // ============================================================

  const defaultPortfolioData = {
    profile: {
      name: "Fakhul Rohman Nurokhim",
      bio: "Perkenalkan, saya Fakhul Rohman Nurokhim. Dengan rasa ingin tahu yang besar, saya terbuka pada hal-hal baru serta tantangan yang mendukung pengembangan diri."
    },
    education: [
      { year: "2013 - 2019", title: "MI HAYATUL ISLAMIYAH", desc: "Madrasah Ibtidaiyah <b>(MI)</b>", icon: "ri-school-line", iconBg: "bg-blue-100 dark:bg-blue-900", iconColor: "text-blue-600 dark:text-blue-400" },
      { year: "2019 - 2022", title: "SMP ISLAM YAPKUM", desc: "Sekolah Menengah Pertama <b>(SMP)</b>", icon: "ri-book-open-line", iconBg: "bg-green-100 dark:bg-green-900", iconColor: "text-green-600 dark:text-green-400" },
      { year: "2022 - 2025", title: "SMK AL-HIDAYAH", desc: "Sekolah Menengah Kejuruan <b>(SMK) AKUNTANSI</b>", icon: "ri-bank-line", iconBg: "bg-purple-100 dark:bg-purple-900", iconColor: "text-purple-600 dark:text-purple-400" }
    ],
    experience: [
      { id: "expWork1", year: "2024 - Present", title: "Frontend Developer", desc: "Membangun antarmuka interaktif dan responsif menggunakan teknologi modern seperti React dan TailwindCSS.", icon: "ri-code-box-line", color: "blue", details: ["Membangun antarmuka interaktif dan responsif menggunakan React, Vue.js, dan Tailwind CSS.", "Mengoptimalkan performa rendering halaman dan aksesibilitas untuk memberikan pengalaman pengguna yang lebih baik.", "Berkolaborasi dengan desainer UI/UX untuk mengimplementasikan desain pixel-perfect."] },
      { id: "expWork2", year: "2023 - 2024", title: "UI/UX Designer", desc: "Merancang prototipe aplikasi dan website yang berpusat pada pengalaman pengguna menggunakan Figma.", icon: "ri-brush-line", color: "purple", details: ["Merancang wireframe, mockup, dan prototipe interaktif menggunakan Figma.", "Melakukan riset pengguna untuk mengidentifikasi pain points.", "Memastikan konsistensi design system di seluruh produk digital."] },
      { id: "expWork3", year: "2022 - 2023", title: "Backend Intern", desc: "Membantu pengembangan RESTful API dan manajemen database menggunakan Node.js dan MongoDB.", icon: "ri-server-line", color: "green", details: ["Membantu pengembangan RESTful API menggunakan Node.js dan Express.", "Mengintegrasikan database NoSQL (MongoDB) dan relasional.", "Menulis unit test dan berpartisipasi dalam proses code review."] }
    ],
    organization: [
      { title: "OSIS", role: "Bendahara Pria (2024-2025)", desc: "Mengelola keuangan kegiatan siswa, memastikan laporan transparan, dan mendukung kelancaran program sekolah.", icon: "ri-team-line", color: "indigo" },
      { title: "Pramuka", role: "Ketua (2 Periode)", desc: "Memimpin berbagai kegiatan perkemahan, melatih kedisiplinan anggota, dan meningkatkan partisipasi aktif hingga 40%.", icon: "ri-fire-line", color: "orange" },
      { title: "IT Club", role: "Koordinator Web (2023-2024)", desc: "Mengadakan workshop pemrograman dasar, mengelola website komunitas, dan memfasilitasi diskusi teknologi terbaru.", icon: "ri-code-s-slash-line", color: "emerald" }
    ]
  };

  let portfolioData = JSON.parse(localStorage.getItem('portfolio_data_v2')) || defaultPortfolioData;

  function saveToLocalStorage() {
    localStorage.setItem('portfolio_data_v2', JSON.stringify(portfolioData));
  }

  function renderProfile() {
    const bios = document.querySelectorAll('.text-xl.text-gray-600.dark\\:text-gray-300');
    
    // Update Profile Name globally
    const nameHeaders = document.querySelectorAll('h3.text-2xl.font-bold.mb-4, h2.text-3xl.font-bold.mb-4');
    nameHeaders.forEach(el => {
      if(el.textContent.includes("Fakhul Rohman") || el.textContent.includes("Fatkul")) {
        el.textContent = portfolioData.profile.name;
      }
    });

    bios.forEach(el => {
      if (el.innerHTML.includes("Perkenalkan") || el.innerHTML.includes("saya")) {
        el.innerHTML = `Perkenalkan, saya <b>${portfolioData.profile.name}</b>. ${portfolioData.profile.bio.replace("Perkenalkan, saya Fakhul Rohman Nurokhim.", "")}`;
      }
    });
  }

  function renderEducation() {
    const container = document.getElementById('educationContainer');
    if (!container) return;
    container.innerHTML = '';
    
    portfolioData.education.forEach((edu, index) => {
      const isLeft = index % 2 === 0;
      const alignClass = isLeft ? 'timeline-item-left' : 'timeline-item-right';
      const animClass = isLeft ? 'fade-right' : 'fade-left';
      const gapClass = isLeft ? 'justify-end' : 'justify-start';
      
      const eduHtml = `
        <div class="${alignClass}" data-aos="${animClass}">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
            <div class="flex items-center ${gapClass} gap-3 mb-2">
              ${isLeft ? `<span class="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-sm">${edu.year}</span>` : ''}
              <div class="w-10 h-10 rounded-full ${edu.iconBg || 'bg-blue-100 dark:bg-blue-900'} flex items-center justify-center">
                <i class="${edu.icon} ${edu.iconColor || 'text-blue-600 dark:text-blue-400'}"></i>
              </div>
              ${!isLeft ? `<span class="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full text-sm">${edu.year}</span>` : ''}
            </div>
            <h3 class="text-xl font-bold dark:text-white">${edu.title}</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">${edu.desc}</p>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', eduHtml);
    });
  }

  // Mapped Tailwind classes helper to avoid string interpolation (Tailwind dynamic classes bug)
  function getColorClasses(color) {
    const maps = {
      blue: {
        cardBgDeco: 'bg-blue-500/10',
        iconBg: 'bg-blue-100 dark:bg-blue-900/40',
        iconText: 'text-blue-600 dark:text-blue-400',
        yearText: 'text-blue-500',
        titleHover: 'group-hover:text-blue-500',
        arrowText: 'text-blue-500',
        buttonBg: 'bg-blue-500 hover:bg-blue-600',
        orgBg: 'bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-gray-800 dark:to-blue-950/20 border-blue-100 dark:border-gray-700',
        orgIconBg: 'bg-blue-500',
        orgRoleText: 'text-blue-500 dark:text-blue-400'
      },
      purple: {
        cardBgDeco: 'bg-purple-500/10',
        iconBg: 'bg-purple-100 dark:bg-purple-900/40',
        iconText: 'text-purple-600 dark:text-purple-400',
        yearText: 'text-purple-500',
        titleHover: 'group-hover:text-purple-500',
        arrowText: 'text-purple-500',
        buttonBg: 'bg-purple-500 hover:bg-purple-600',
        orgBg: 'bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-gray-800 dark:to-purple-950/20 border-purple-100 dark:border-gray-700',
        orgIconBg: 'bg-purple-500',
        orgRoleText: 'text-purple-500 dark:text-purple-400'
      },
      green: {
        cardBgDeco: 'bg-green-500/10',
        iconBg: 'bg-green-100 dark:bg-green-900/40',
        iconText: 'text-green-600 dark:text-green-400',
        yearText: 'text-green-500',
        titleHover: 'group-hover:text-green-500',
        arrowText: 'text-green-500',
        buttonBg: 'bg-green-500 hover:bg-green-600',
        orgBg: 'bg-gradient-to-br from-green-50 to-green-100/50 dark:from-gray-800 dark:to-green-950/20 border-green-100 dark:border-gray-700',
        orgIconBg: 'bg-green-500',
        orgRoleText: 'text-green-500 dark:text-green-400'
      },
      indigo: {
        cardBgDeco: 'bg-indigo-500/10',
        iconBg: 'bg-indigo-100 dark:bg-indigo-900/40',
        iconText: 'text-indigo-600 dark:text-indigo-400',
        yearText: 'text-indigo-500',
        titleHover: 'group-hover:text-indigo-500',
        arrowText: 'text-indigo-500',
        buttonBg: 'bg-indigo-500 hover:bg-indigo-600',
        orgBg: 'bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-gray-800 dark:to-indigo-950/20 border-indigo-100 dark:border-gray-700',
        orgIconBg: 'bg-indigo-500',
        orgRoleText: 'text-indigo-500 dark:text-indigo-400'
      },
      orange: {
        cardBgDeco: 'bg-orange-500/10',
        iconBg: 'bg-orange-100 dark:bg-orange-900/40',
        iconText: 'text-orange-600 dark:text-orange-400',
        yearText: 'text-orange-500',
        titleHover: 'group-hover:text-orange-500',
        arrowText: 'text-orange-500',
        buttonBg: 'bg-orange-500 hover:bg-orange-600',
        orgBg: 'bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-gray-800 dark:to-orange-950/20 border-orange-100 dark:border-gray-700',
        orgIconBg: 'bg-orange-500',
        orgRoleText: 'text-orange-500 dark:text-orange-400'
      },
      emerald: {
        cardBgDeco: 'bg-emerald-500/10',
        iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
        iconText: 'text-emerald-600 dark:text-emerald-400',
        yearText: 'text-emerald-500',
        titleHover: 'group-hover:text-emerald-500',
        arrowText: 'text-emerald-500',
        buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
        orgBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-gray-800 dark:to-emerald-950/20 border-emerald-100 dark:border-gray-700',
        orgIconBg: 'bg-emerald-500',
        orgRoleText: 'text-emerald-500 dark:text-emerald-400'
      },
      pink: {
        cardBgDeco: 'bg-pink-500/10',
        iconBg: 'bg-pink-100 dark:bg-pink-900/40',
        iconText: 'text-pink-600 dark:text-pink-400',
        yearText: 'text-pink-500',
        titleHover: 'group-hover:text-pink-500',
        arrowText: 'text-pink-500',
        buttonBg: 'bg-pink-500 hover:bg-pink-600',
        orgBg: 'bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-gray-800 dark:to-pink-950/20 border-pink-100 dark:border-gray-700',
        orgIconBg: 'bg-pink-500',
        orgRoleText: 'text-pink-500 dark:text-pink-400'
      },
      cyan: {
        cardBgDeco: 'bg-cyan-500/10',
        iconBg: 'bg-cyan-100 dark:bg-cyan-900/40',
        iconText: 'text-cyan-600 dark:text-cyan-400',
        yearText: 'text-cyan-500',
        titleHover: 'group-hover:text-cyan-500',
        arrowText: 'text-cyan-500',
        buttonBg: 'bg-cyan-500 hover:bg-cyan-600',
        orgBg: 'bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-gray-800 dark:to-cyan-950/20 border-cyan-100 dark:border-gray-700',
        orgIconBg: 'bg-cyan-500',
        orgRoleText: 'text-cyan-500 dark:text-cyan-400'
      }
    };
    return maps[color] || maps.blue;
  }

  function renderExperience() {
    const cardContainer = document.getElementById('experienceContainer');
    const modalContainer = document.getElementById('dynamicExperienceModals');
    if (!cardContainer || !modalContainer) return;
    
    cardContainer.innerHTML = '';
    modalContainer.innerHTML = '';
    
    portfolioData.experience.forEach(exp => {
      const cls = getColorClasses(exp.color || 'blue');
      const cardHtml = `
        <div class="exp-card group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700" data-modal="${exp.id}">
          <div class="absolute top-0 right-0 w-24 h-24 ${cls.cardBgDeco} rounded-bl-full -z-10 transition-transform group-hover:scale-150"></div>
          <div class="w-14 h-14 ${cls.iconBg} rounded-xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform duration-300">
            <i class="${exp.icon} text-3xl ${cls.iconText}"></i>
          </div>
          <span class="text-sm font-bold ${cls.yearText} mb-2 block">${exp.year}</span>
          <h3 class="text-xl font-bold mb-2 dark:text-white ${cls.titleHover} transition-colors">${exp.title}</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">${exp.desc}</p>
          <div class="mt-4 flex items-center ${cls.arrowText} text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            Lihat Detail <i class="ri-arrow-right-line ml-1"></i>
          </div>
        </div>
      `;
      cardContainer.insertAdjacentHTML('beforeend', cardHtml);

      // Modal render
      const detailItems = exp.details ? exp.details.map(d => `<li>${d}</li>`).join('') : `<li>${exp.desc}</li>`;
      const modalHtml = `
        <div id="${exp.id}Modal" class="journey-modal hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="modal-content bg-white dark:bg-gray-800 rounded-xl p-8 max-w-2xl mx-4 relative transform opacity-0 scale-95 transition-all duration-300 ease-out border border-gray-100 dark:border-gray-700">
            <button class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onclick="window.closeJourneyModal('${exp.id}Modal')">
              <i class="ri-close-line text-xl"></i>
            </button>
            <h2 class="text-2xl font-bold mb-4 dark:text-white flex items-center gap-2">
              <i class="${exp.icon} ${cls.iconText}"></i> ${exp.title}
            </h2>
            <p class="text-sm ${cls.yearText} font-semibold mb-4">${exp.year}</p>
            <ul class="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
              ${detailItems}
            </ul>
            <div class="flex justify-end mt-6">
              <button class="px-6 py-2 rounded-lg ${cls.buttonBg} text-white transition-colors" onclick="window.closeJourneyModal('${exp.id}Modal')">Tutup</button>
            </div>
          </div>
        </div>
      `;
      modalContainer.insertAdjacentHTML('beforeend', modalHtml);
    });
  }

  function renderOrganization() {
    const container = document.getElementById('orgContainer');
    if (!container) return;
    container.innerHTML = '';
    
    portfolioData.organization.forEach(org => {
      const cls = getColorClasses(org.color || 'indigo');
      const orgHtml = `
        <div class="org-card ${cls.orgBg} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 ${cls.orgIconBg} text-white rounded-full flex items-center justify-center shadow-md">
              <i class="${org.icon || 'ri-team-line'} text-xl"></i>
            </div>
            <div>
              <h3 class="font-bold text-lg dark:text-white leading-tight">${org.title}</h3>
              <span class="${cls.orgRoleText} text-sm font-medium">${org.role}</span>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300 text-sm">${org.desc}</p>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', orgHtml);
    });
  }

  function renderAll() {
    renderProfile();
    renderEducation();
    renderExperience();
    renderOrganization();
    
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelectorAll('.exp-card, .org-card'), {
        max: 12,
        speed: 600,
        glare: true,
        'max-glare': 0.3,
        scale: 1.02,
        perspective: 1000,
        gyroscope: true
      });
    }
  }

  // Initial Render call
  renderAll();

  // Event delegation to play hover sounds dynamically on all interactive/hoverable items
  document.body.addEventListener('mouseover', (e) => {
    const hoverable = e.target.closest('.exp-card, .org-card, .glow-button, .about-filter, .nav-item, .drawer-link, .lang-btn, .theme-btn, .setting-btn, #closeSettings, #closeMobileNav, #downloadCvBtn, #contactMeBtn');
    if (hoverable && !hoverable.dataset.hoverSoundPlayed) {
      if (typeof sfx !== 'undefined') sfx.playHover();
      hoverable.dataset.hoverSoundPlayed = 'true';
      hoverable.addEventListener('mouseleave', () => {
        delete hoverable.dataset.hoverSoundPlayed;
      }, { once: true });
    }
  });

  // Admin Dashboard open/close
  const openAdminBtn = document.getElementById('openAdminBtn');
  const adminModal = document.getElementById('adminModal');
  const closeAdminModal = document.getElementById('closeAdminModal');
  const cancelAdminBtn = document.getElementById('cancelAdminBtn');
  const saveAdminBtn = document.getElementById('saveAdminBtn');

  if (openAdminBtn && adminModal) {
    openAdminBtn.addEventListener('click', () => {
      document.getElementById('adminProfileName').value = portfolioData.profile.name;
      document.getElementById('adminProfileBio').value = portfolioData.profile.bio;
      
      populateAdminEducation();
      populateAdminExperiences();
      populateAdminOrgs();

      adminModal.classList.remove('hidden');
      setTimeout(() => {
        adminModal.querySelector('.bg-white, .bg-gray-900').classList.remove('scale-95', 'opacity-0');
        adminModal.querySelector('.bg-white, .bg-gray-900').classList.add('scale-100', 'opacity-100');
      }, 50);
      sfx.playOpenModal();
    });
  }

  function closeAdmin() {
    if (adminModal) {
      const inner = adminModal.querySelector('.bg-white, .bg-gray-900');
      if (inner) {
        inner.classList.remove('scale-100', 'opacity-100');
        inner.classList.add('scale-95', 'opacity-0');
      }
      setTimeout(() => adminModal.classList.add('hidden'), 300);
    }
  }

  if (closeAdminModal) closeAdminModal.addEventListener('click', closeAdmin);
  if (cancelAdminBtn) cancelAdminBtn.addEventListener('click', closeAdmin);

  // Admin tab switching
  const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
  const adminTabContents = document.querySelectorAll('.admin-tab-content');

  adminTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetTab = this.dataset.tab;
      
      adminTabBtns.forEach(b => {
        b.classList.remove('active', 'bg-white', 'dark:bg-gray-700', 'dark:text-white', 'shadow');
        b.classList.add('text-gray-600', 'dark:text-gray-400');
      });
      this.classList.add('active', 'bg-white', 'dark:bg-gray-700', 'dark:text-white', 'shadow');
      this.classList.remove('text-gray-600', 'dark:text-gray-400');

      adminTabContents.forEach(c => {
        c.classList.add('hidden');
        c.classList.remove('block');
      });
      document.getElementById(targetTab).classList.remove('hidden');
      document.getElementById(targetTab).classList.add('block');
      
      sfx.playTab();
    });
  });

  // Admin lists population
  function populateAdminEducation() {
    const list = document.getElementById('adminEducationList');
    if (!list) return;
    list.innerHTML = '';
    
    portfolioData.education.forEach((edu, i) => {
      const itemHtml = `
        <div class="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-800 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-primary px-2 py-0.5 rounded bg-primary/10">Education Item #${i+1}</span>
            <button class="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1" onclick="deleteAdminEdu(${i})">
              <i class="ri-delete-bin-line"></i> Delete
            </button>
          </div>
          <div class="grid sm:grid-cols-3 gap-3">
            <input type="text" placeholder="Year (e.g. 2019-2022)" value="${edu.year}" class="edu-input-year px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm bg-transparent text-gray-800 dark:text-white">
            <input type="text" placeholder="Title/School" value="${edu.title}" class="edu-input-title px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm sm:col-span-2 bg-transparent text-gray-800 dark:text-white">
          </div>
          <input type="text" placeholder="Description/Degree" value="${edu.desc}" class="edu-input-desc px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm bg-transparent text-gray-800 dark:text-white">
        </div>
      `;
      list.insertAdjacentHTML('beforeend', itemHtml);
    });
  }

  function populateAdminExperiences() {
    const list = document.getElementById('adminExperienceList');
    if (!list) return;
    list.innerHTML = '';
    
    portfolioData.experience.forEach((exp, i) => {
      const detailsText = exp.details ? exp.details.join('\n') : exp.desc;
      const itemHtml = `
        <div class="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-800 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-purple-500 px-2 py-0.5 rounded bg-purple-500/10">Experience Card #${i+1}</span>
            <button class="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1" onclick="deleteAdminExp(${i})">
              <i class="ri-delete-bin-line"></i> Delete
            </button>
          </div>
          <div class="grid sm:grid-cols-3 gap-3">
            <input type="text" placeholder="Year (e.g. 2024 - Present)" value="${exp.year}" class="exp-input-year px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm bg-transparent text-gray-800 dark:text-white">
            <input type="text" placeholder="Role Title" value="${exp.title}" class="exp-input-title px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm sm:col-span-2 bg-transparent text-gray-800 dark:text-white">
          </div>
          <input type="text" placeholder="Short Description" value="${exp.desc}" class="exp-input-desc px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm bg-transparent text-gray-800 dark:text-white">
          <textarea placeholder="Bullet details (one per line)" rows="3" class="exp-input-details px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm bg-transparent text-gray-800 dark:text-white">${detailsText}</textarea>
        </div>
      `;
      list.insertAdjacentHTML('beforeend', itemHtml);
    });
  }

  function populateAdminOrgs() {
    const list = document.getElementById('adminOrgList');
    if (!list) return;
    list.innerHTML = '';
    
    portfolioData.organization.forEach((org, i) => {
      const itemHtml = `
        <div class="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border dark:border-gray-800 flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-orange-500 px-2 py-0.5 rounded bg-orange-500/10">Org Card #${i+1}</span>
            <button class="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1" onclick="deleteAdminOrg(${i})">
              <i class="ri-delete-bin-line"></i> Delete
            </button>
          </div>
          <div class="grid sm:grid-cols-2 gap-3">
            <input type="text" placeholder="Organization Title" value="${org.title}" class="org-input-title px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm bg-transparent text-gray-800 dark:text-white">
            <input type="text" placeholder="Role / Periode" value="${org.role}" class="org-input-role px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm bg-transparent text-gray-800 dark:text-white">
          </div>
          <input type="text" placeholder="Description of your contributions" value="${org.desc}" class="org-input-desc px-3 py-1.5 rounded-lg border dark:bg-gray-900 dark:border-gray-800 text-sm bg-transparent text-gray-800 dark:text-white">
        </div>
      `;
      list.insertAdjacentHTML('beforeend', itemHtml);
    });
  }

  window.deleteAdminEdu = function(index) {
    portfolioData.education.splice(index, 1);
    populateAdminEducation();
    sfx.playClick();
  };

  window.deleteAdminExp = function(index) {
    portfolioData.experience.splice(index, 1);
    populateAdminExperiences();
    sfx.playClick();
  };

  window.deleteAdminOrg = function(index) {
    portfolioData.organization.splice(index, 1);
    populateAdminOrgs();
    sfx.playClick();
  };

  // Add Item buttons
  const addEducationBtn = document.getElementById('addEducationBtn');
  if (addEducationBtn) {
    addEducationBtn.addEventListener('click', () => {
      portfolioData.education.push({
        year: "2025",
        title: "New Education Title",
        desc: "Academic Description",
        icon: "ri-school-line",
        iconBg: "bg-blue-100 dark:bg-blue-900",
        iconColor: "text-blue-600 dark:text-blue-400"
      });
      populateAdminEducation();
      sfx.playClick();
    });
  }

  const addExperienceBtn = document.getElementById('addExperienceBtn');
  if (addExperienceBtn) {
    addExperienceBtn.addEventListener('click', () => {
      const newId = 'expWork' + (portfolioData.experience.length + 1);
      portfolioData.experience.push({
        id: newId,
        year: "2025",
        title: "New Professional Title",
        desc: "Short role overview...",
        icon: "ri-code-box-line",
        color: "blue",
        details: ["Key bullet achievement 1", "Key bullet achievement 2"]
      });
      populateAdminExperiences();
      sfx.playClick();
    });
  }

  const addOrgBtn = document.getElementById('addOrgBtn');
  if (addOrgBtn) {
    addOrgBtn.addEventListener('click', () => {
      portfolioData.organization.push({
        title: "New Organization",
        role: "Role (2025)",
        desc: "Brief summary of contributions...",
        icon: "ri-team-line",
        color: "indigo"
      });
      populateAdminOrgs();
      sfx.playClick();
    });
  }

  // Save changes
  if (saveAdminBtn) {
    saveAdminBtn.addEventListener('click', () => {
      portfolioData.profile.name = document.getElementById('adminProfileName').value;
      portfolioData.profile.bio = document.getElementById('adminProfileBio').value;

      // Read education blocks
      const eduBlocks = document.querySelectorAll('#adminEducationList > div');
      portfolioData.education = [];
      eduBlocks.forEach((block, index) => {
        const colors = ['blue', 'green', 'purple', 'indigo', 'orange'];
        const chosenColor = colors[index % colors.length];
        portfolioData.education.push({
          year: block.querySelector('.edu-input-year').value,
          title: block.querySelector('.edu-input-title').value,
          desc: block.querySelector('.edu-input-desc').value,
          icon: index % 2 === 0 ? "ri-school-line" : "ri-book-open-line",
          iconBg: `bg-${chosenColor}-100 dark:bg-${chosenColor}-900`,
          iconColor: `text-${chosenColor}-600 dark:text-${chosenColor}-400`
        });
      });

      // Read experience blocks
      const expBlocks = document.querySelectorAll('#adminExperienceList > div');
      portfolioData.experience = [];
      expBlocks.forEach((block, index) => {
        const detailsText = block.querySelector('.exp-input-details').value;
        const detailsArr = detailsText.split('\n').filter(line => line.trim() !== '');
        const colors = ['blue', 'purple', 'green', 'indigo', 'pink', 'orange'];
        const chosenColor = colors[index % colors.length];
        
        portfolioData.experience.push({
          id: 'expWork' + (index + 1),
          year: block.querySelector('.exp-input-year').value,
          title: block.querySelector('.exp-input-title').value,
          desc: block.querySelector('.exp-input-desc').value,
          icon: index % 3 === 0 ? "ri-code-box-line" : (index % 3 === 1 ? "ri-brush-line" : "ri-server-line"),
          color: chosenColor,
          details: detailsArr
        });
      });

      // Read organization blocks
      const orgBlocks = document.querySelectorAll('#adminOrgList > div');
      portfolioData.organization = [];
      orgBlocks.forEach((block, index) => {
        const colors = ['indigo', 'orange', 'emerald', 'blue', 'pink'];
        const chosenColor = colors[index % colors.length];
        portfolioData.organization.push({
          title: block.querySelector('.org-input-title').value,
          role: block.querySelector('.org-input-role').value,
          desc: block.querySelector('.org-input-desc').value,
          icon: index % 3 === 0 ? "ri-team-line" : (index % 3 === 1 ? "ri-fire-line" : "ri-code-s-slash-line"),
          color: chosenColor
        });
      });

      saveToLocalStorage();
      renderAll();
      closeAdmin();
      sfx.playTab();
      
      if (typeof confetti !== 'undefined') {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 }
        });
      }
    });
  }

  // Export JSON
  const exportBtn = document.getElementById('exportDataBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "portfolio_data.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      sfx.playTab();
    });
  }

  // Import JSON
  const importBtn = document.getElementById('importDataBtn');
  const importFileInput = document.getElementById('importFileInput');
  if (importBtn && importFileInput) {
    importBtn.addEventListener('click', () => {
      importFileInput.click();
    });
    
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const parsed = JSON.parse(evt.target.result);
          if (parsed.profile && parsed.education && parsed.experience) {
            portfolioData = parsed;
            saveToLocalStorage();
            renderAll();
            closeAdmin();
            sfx.playTab();
            
            if (typeof confetti !== 'undefined') {
              confetti({ particleCount: 120, spread: 80 });
            }
          } else {
            alert("Format JSON tidak valid!");
          }
        } catch (err) {
          alert("Gagal membaca file JSON!");
        }
      };
      reader.readAsText(file);
    });
  }

}); // end DOMContentLoaded


// ──────────────────────────────────────
// 3. Global functions needed by onclick handlers in HTML
// ──────────────────────────────────────
window.closeJourneyModal = function(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  const content = modal.querySelector('.modal-content');
  if (content) {
    content.classList.remove('opacity-100', 'scale-100');
    content.classList.add('opacity-0', 'scale-95');
  }
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
};

// Typing effect (global so about-filter tab can call it)
function startTypingEffect() {
  const text = "Portofolio ini adalah jejak langkah dari imajinasi yang tumbuh menjadi karya, setiap detailnya bercerita tentang dedikasi dan cinta pada proses berkarya. Di dalamnya tersimpan percikan rasa ingin tahu, keberanian untuk mencoba, dan keyakinan bahwa setiap langkah kecil dapat meninggalkan jejak yang bermakna.";
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;
  let index = 0;
  typingElement.textContent = '';
  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 50);
    }
  }
  type();
}