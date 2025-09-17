tailwind.config={theme:{extend:{colors:{primary:'#6366f1',secondary:'#ec4899'},borderRadius:{'none':'0px','sm':'4px',DEFAULT:'8px','md':'12px','lg':'16px','xl':'20px','2xl':'24px','3xl':'32px','full':'9999px','button':'8px'}}}}

document.addEventListener('DOMContentLoaded', function() {
const branchBtn = document.getElementById('branchBtn');
const branchDropdown = document.getElementById('branchDropdown');

branchBtn.addEventListener('click', function(e) {
e.stopPropagation();
branchDropdown.classList.toggle('hidden');
});

branchDropdown.addEventListener('click', function(e) {
if (e.target === branchDropdown) {
branchDropdown.classList.add('hidden');
}
});

document.addEventListener('click', function() {
branchDropdown.classList.add('hidden');
});
});

document.addEventListener('DOMContentLoaded', function() {
const fileItems = document.querySelectorAll('.file-item');
const Tabs = document.querySelectorAll('.-tab');

fileItems.forEach(item => {
item.addEventListener('click', function() {
const fileName = this.querySelector('span').textContent;
console.log('igating to:', fileName);
});
});

Tabs.forEach(tab => {
tab.addEventListener('click', function(e) {
e.preventDefault();
Tabs.forEach(t => t.classList.remove('active'));
this.classList.add('active');
});
});
});

tailwind.config={theme:{extend:{colors:{primary:'#6366f1',secondary:'#ec4899'},borderRadius:{'none':'0px','sm':'4px',DEFAULT:'8px','md':'12px','lg':'16px','xl':'20px','2xl':'24px','3xl':'32px','full':'9999px','button':'8px'}}}}

document.addEventListener('DOMContentLoaded', function() {
const previewDots = document.querySelectorAll('.preview-dot');
const previewImage = document.querySelector('.preview-container img');
const images = [
'https://readdy.ai/api/search-image?query=modern%20e-commerce%20platform%20interface%20showcase%2C%20clean%20product%20listing%20page%2C%20shopping%20cart%20functionality%2C%20professional%20web%20application%20design%2C%20blue%20and%20white%20color%20scheme%2C%20responsive%20layout%2C%20modern%20UI%20elements%2C%20high%20quality%20web%20design&width=1200&height=700&seq=ecommerce001&orientation=landscape',
'https://readdy.ai/api/search-image?query=e-commerce%20product%20detail%20page%20interface%2C%20product%20gallery%20view%2C%20add%20to%20cart%20functionality%2C%20customer%20reviews%20section%2C%20modern%20web%20design%2C%20clean%20layout%2C%20professional%20online%20store&width=1200&height=700&seq=ecommerce002&orientation=landscape',
'https://readdy.ai/api/search-image?query=shopping%20cart%20checkout%20process%20interface%2C%20payment%20form%20design%2C%20secure%20checkout%20page%2C%20order%20summary%20layout%2C%20modern%20e-commerce%20design%2C%20user%20friendly%20interface&width=1200&height=700&seq=ecommerce003&orientation=landscape',
'https://readdy.ai/api/search-image?query=e-commerce%20admin%20dashboard%20interface%2C%20sales%20analytics%20charts%2C%20inventory%20management%20system%2C%20order%20tracking%20interface%2C%20modern%20admin%20panel%20design%2C%20data%20visualization&width=1200&height=700&seq=ecommerce004&orientation=landscape'
];
previewDots.forEach((dot, index) => {
dot.addEventListener('click', function() {
previewDots.forEach(d => {
d.classList.remove('bg-primary');
d.classList.add('bg-gray-300');
});
this.classList.add('bg-primary');
this.classList.remove('bg-gray-300');
previewImage.src = images[index];
});
});
});

document.addEventListener('DOMContentLoaded', function() {
const fullscreenBtn = document.getElementById('fullscreenBtn');
const fullscreenModal = document.getElementById('fullscreenModal');
const fullscreenImage = document.getElementById('fullscreenImage');
const closeFullscreen = document.getElementById('closeFullscreen');
const previewImage = document.querySelector('.preview-container img');
fullscreenBtn.addEventListener('click', function() {
fullscreenImage.src = previewImage.src;
fullscreenModal.classList.remove('hidden');
});
closeFullscreen.addEventListener('click', function() {
fullscreenModal.classList.add('hidden');
});
fullscreenModal.addEventListener('click', function(e) {
if (e.target === fullscreenModal) {
fullscreenModal.classList.add('hidden');
}
});
document.addEventListener('keydown', function(e) {
if (e.key === 'Escape') {
fullscreenModal.classList.add('hidden');
}
});
});
tailwind.config={theme:{extend:{colors:{primary:'#6366f1',secondary:'#ec4899'},borderRadius:{'none':'0px','sm':'4px',DEFAULT:'8px','md':'12px','lg':'16px','xl':'20px','2xl':'24px','3xl':'32px','full':'9999px','button':'8px'}}}}

document.addEventListener('DOMContentLoaded', function() {
const particleContainer = document.getElementById('particleContainer');
function createParticle() {
const particle = document.createElement('div');
particle.className = 'particle';
const size = Math.random() * 4 + 2;
const x = Math.random() * window.innerWidth;
const y = Math.random() * window.innerHeight;
const duration = Math.random() * 3 + 3;
particle.style.width = size + 'px';
particle.style.height = size + 'px';
particle.style.left = x + 'px';
particle.style.top = y + 'px';
particle.style.animationDuration = duration + 's';
particleContainer.appendChild(particle);
setTimeout(() => {
if (particle.parentNode) {
particle.parentNode.removeChild(particle);
}
}, duration * 1000);
}
function initParticles() {
for (let i = 0; i < 20; i++) {
setTimeout(createParticle, i * 200);
}
}
initParticles();
setInterval(createParticle, 300);
});

document.addEventListener('DOMContentLoaded', function() {
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
let isDark = false;
themeToggle.addEventListener('click', function() {
isDark = !isDark;
if (isDark) {
body.classList.add('dark');
themeToggle.innerHTML = '<i class="ri-moon-line text-lg"></i>';
} else {
body.classList.remove('dark');
themeToggle.innerHTML = '<i class="ri-sun-line text-lg"></i>';
}
});
});

document.addEventListener('DOMContentLoaded', function() {
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
settingsBtn.addEventListener('click', function() {
settingsPanel.classList.add('open');
});
closeSettings.addEventListener('click', function() {
settingsPanel.classList.remove('open');
});
document.addEventListener('click', function(e) {
if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
settingsPanel.classList.remove('open');
}
});
});

document.addEventListener('DOMContentLoaded', function() {
const aboutFilters = document.querySelectorAll('.about-filter');
const aboutContents = document.querySelectorAll('.about-content');
aboutFilters.forEach(filter => {
filter.addEventListener('click', function() {
const target = this.dataset.filter;
aboutFilters.forEach(f => {
f.classList.remove('active', 'bg-primary', 'text-white');
f.classList.add('text-gray-600');
});
this.classList.add('active', 'bg-primary', 'text-white');
this.classList.remove('text-gray-600');
aboutContents.forEach(content => {
content.classList.add('hidden');
});
document.getElementById(target).classList.remove('hidden');
if (target === 'overview') {
startTypingEffect();
}
});
});
/* ================================
   JOURNEY FILTER
================================ */
const journeyFilters = document.querySelectorAll('.journey-filter');
const journeyContents = document.querySelectorAll('.journey-content');

journeyFilters.forEach(filter => {
  filter.addEventListener('click', function () {
    const target = this.dataset.filter;

    // Reset button states
    journeyFilters.forEach(f => f.classList.remove('active', 'bg-primary', 'text-white'));
    this.classList.add('active', 'bg-primary', 'text-white');

    // Switch content with small animation
    journeyContents.forEach(content => {
      content.classList.add('hidden', 'opacity-0', 'translate-y-6');
      setTimeout(() => content.classList.remove('opacity-0', 'translate-y-6'), 100);
    });
    document.getElementById(target).classList.remove('hidden');
  });
});

/* ================================
   PROGRESS BAR SCROLL (Education)
================================ */
const progressFill = document.getElementById('progressFill');
if (progressFill) {
  window.addEventListener('scroll', () => {
    const section = document.getElementById('journey');
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      const totalHeight = rect.height - window.innerHeight;
      const scrollY = Math.min(Math.max(0, -rect.top), totalHeight);
      const progress = (scrollY / totalHeight) * 100;
      progressFill.style.height = `${progress}%`;
    }
  });
}

/* ================================
   MODAL EDUCATION & EXPERIENCE
================================ */
document.querySelectorAll('[data-modal]').forEach(item => {
  item.addEventListener('click', () => {
    const modalId = item.dataset.modal + 'Modal';
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
      modal.classList.remove('hidden');
    }
  });
});

document.querySelectorAll('.journey-modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => modal.classList.add('hidden'), 300);
    }
  });
});
function closeJourneyModal(id) {
  const modal = document.getElementById(id);
  const content = modal.querySelector('.modal-content');

  // animasi keluar
  content.classList.remove('opacity-100', 'scale-100');
  content.classList.add('opacity-0', 'scale-95');

  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300); // tunggu animasi selesai
}
/* ================================
   HOBBY MODAL (with igation)
================================ */
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

// Map ikon per hobby
const hobbyIcons = {
  Photography: "ri-camera-line text-blue-500",
  Traveling: "ri-map-pin-line text-green-500",
  Music: "ri-music-2-line text-purple-500",
  Gaming: "ri-gamepad-line text-red-500"
};

function showHobby(index) {
  const item = hobbyItems[index];
  currentHobbyIndex = index;

  hobbyTitle.textContent = item.dataset.title;
  hobbyDesc.innerHTML = "";

  const iconClass = hobbyIcons[item.dataset.title] || "ri-check-line text-primary";
  hobbyIcon.className = iconClass + " text-2xl";

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
      hobbyDesc.appendChild(li);
    });
  } catch {
    const li = document.createElement('li');
    li.innerHTML = `<i class="${iconClass}"></i> <span>${item.dataset.desc}</span>`;
    hobbyDesc.appendChild(li);
  }

  hobbyModal.classList.remove('hidden');
  setTimeout(() => {
    hobbyContent.classList.remove('opacity-0', 'scale-95');
    hobbyContent.classList.add('opacity-100', 'scale-100');
  }, 10);
}

// Klik hobby
hobbyItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    showHobby(index);
  });
});

// igasi hobby
prevHobbyBtn.addEventListener('click', () => {
  const newIndex = (currentHobbyIndex - 1 + hobbyItems.length) % hobbyItems.length;
  showHobby(newIndex);
});
nextHobbyBtn.addEventListener('click', () => {
  const newIndex = (currentHobbyIndex + 1) % hobbyItems.length;
  showHobby(newIndex);
});

// Tutup modal hobby
function closeHobby() {
  hobbyContent.classList.remove('opacity-100', 'scale-100');
  hobbyContent.classList.add('opacity-0', 'scale-95');
  setTimeout(() => hobbyModal.classList.add('hidden'), 300);
}
closeHobbyModal.addEventListener('click', closeHobby);
hobbyModal.addEventListener('click', (e) => {
  if (e.target === hobbyModal) closeHobby();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeHobby();
  if (e.key === 'ArrowRight') nextHobbyBtn.click();
  if (e.key === 'ArrowLeft') prevHobbyBtn.click();
});

/*==============================================*/

const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryContents = document.querySelectorAll('.gallery-content');
galleryFilters.forEach(filter => {
filter.addEventListener('click', function() {
const target = this.dataset.filter;
galleryFilters.forEach(f => {
f.classList.remove('active', 'bg-primary', 'text-white');
f.classList.add('text-gray-600');
});
this.classList.add('active', 'bg-primary', 'text-white');
this.classList.remove('text-gray-600');
galleryContents.forEach(content => {
content.classList.add('hidden');
});
document.getElementById(target).classList.remove('hidden');
});
});
});

function startTypingEffect() {
const text = "Portofolio ini adalah jejak langkah dari imajinasi yang tumbuh menjadi karya, setiap detailnya bercerita tentang dedikasi dan cinta pada proses berkarya. Di dalamnya tersimpan percikan rasa ingin tahu, keberanian untuk mencoba, dan keyakinan bahwa setiap langkah kecil dapat meninggalkan jejak yang bermakna.";
const typingElement = document.getElementById('typingText');
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
document.addEventListener('DOMContentLoaded', function() {
setTimeout(startTypingEffect, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
const playPauseBtn = document.getElementById('playPauseBtn');
let isPlaying = false;
playPauseBtn.addEventListener('click', function() {
isPlaying = !isPlaying;
if (isPlaying) {
this.innerHTML = '<i class="ri-pause-line"></i>';
} else {
this.innerHTML = '<i class="ri-play-line"></i>';
}
});
});

document.addEventListener('DOMContentLoaded', function() {
  // === PROFILE MODAL ===
  const profilePhoto = document.getElementById('profilePhoto');
  const profileModal = document.getElementById('profileModal');
  const closeModal = document.getElementById('closeModal');

  if (profilePhoto && profileModal && closeModal) {
    profilePhoto.addEventListener('click', () => profileModal.classList.remove('hidden'));
    closeModal.addEventListener('click', () => profileModal.classList.add('hidden'));
    profileModal.addEventListener('click', e => { if (e.target === profileModal) profileModal.classList.add('hidden'); });
  }

  // === CERTIFICATE MODAL with IGATION ===
  const certificates = Array.from(document.querySelectorAll('.certificate-item'));
  const certificateModal = document.getElementById('certificateModal');
  const certificateContent = document.getElementById('certificateContent');
  const closeCertificateModal = document.getElementById('closeCertificateModal');
  const prevBtn = document.getElementById('prevCertificate');
  const nextBtn = document.getElementById('nextCertificate');

  // elements inside modal
  const certImage = document.getElementById('certificateImage');
  const certTitle = document.getElementById('certificateTitle');
  const certOrg = document.getElementById('certificateOrg');
  const certDate = document.getElementById('certificateDate');
  const certSkills = document.getElementById('certificateSkills');
  const certID = document.getElementById('certificateID');
  const certVerification = document.getElementById('certificateVerification');

  let currentIndex = 0;

  function showCertificate(index) {
    const cert = certificates[index];
    if (!cert) return;
    currentIndex = index;

    certImage.src = cert.dataset.img;
    certTitle.textContent = cert.dataset.title;
    certOrg.textContent = cert.dataset.org;
    certDate.textContent = cert.dataset.date;
    certID.textContent = cert.dataset.id;
    certVerification.textContent = cert.dataset.verification;

    // skills
    certSkills.innerHTML = '';
    cert.dataset.skills.split(',').forEach(skill => {
      const span = document.createElement('span');
      span.className = "px-3 py-1 bg-primary/10 text-primary rounded-full text-sm";
      span.textContent = skill.trim();
      certSkills.appendChild(span);
    });

    certificateModal.classList.remove('hidden');
    setTimeout(() => {
      certificateContent.classList.remove('opacity-0', 'scale-95');
      certificateContent.classList.add('opacity-100', 'scale-100');
    }, 10);
  }

  certificates.forEach((cert, index) => {
    cert.addEventListener('click', () => showCertificate(index));
  });

  function closeCertModal() {
    certificateContent.classList.remove('opacity-100', 'scale-100');
    certificateContent.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
      certificateModal.classList.add('hidden');
    }, 300);
  }

  closeCertificateModal?.addEventListener('click', closeCertModal);
  certificateModal?.addEventListener('click', e => { if (e.target === certificateModal) closeCertModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCertModal();
    if (e.key === 'ArrowLeft') showCertificate((currentIndex - 1 + certificates.length) % certificates.length);
    if (e.key === 'ArrowRight') showCertificate((currentIndex + 1) % certificates.length);
  });

  prevBtn?.addEventListener('click', () => {
    showCertificate((currentIndex - 1 + certificates.length) % certificates.length);
  });
  nextBtn?.addEventListener('click', () => {
    showCertificate((currentIndex + 1) % certificates.length);
  });

  // === LIGHTBOX ZOOM ===
  const lightbox = document.getElementById('lightboxZoom');
  const lightboxImg = document.getElementById('lightboxImage');

  certImage?.addEventListener('click', () => {
    lightboxImg.src = certImage.src;
    lightbox.classList.remove('hidden');
  });

  lightbox?.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });

  // === FILTER ANIMATION ===
  const filters = document.querySelectorAll('.gallery-filter');
  const contents = document.querySelectorAll('.gallery-content');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-white');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active', 'bg-primary', 'text-white');
      btn.setAttribute('aria-pressed', 'true');

      const target = btn.getAttribute('data-filter');
      contents.forEach(section => {
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
});

document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');

  // === TOAST FUNCTION ===
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

  // === FORM SUBMIT HANDLER ===
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;

    // Cek input kosong
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('border-red-500');
        isValid = false;
      } else {
        input.classList.remove('border-red-500');
      }
    });

    // Validasi email format
    const emailInput = this.querySelector('input[type="email"]');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailInput.classList.add('border-red-500');
      isValid = false;
      showToast("Please enter a valid email address", "error");
      return;
    }

if (isValid) {
  const submitBtn = this.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  const oldText = submitBtn.innerHTML;

  // Animasi loading spinner
  submitBtn.innerHTML = `
    <span class="loader"></span> Sending...
  `;

  // Kirim ke kamu (Template utama via EmailJS)
  emailjs.sendForm("service_r2acb9x", "template_gf7e27s", contactForm)
    .then(() => {
      // Kirim auto-reply ke pengisi form
      return emailjs.sendForm("service_r2acb9x", "template_g1f1mpf", contactForm);
    })
    .then(() => {
      // === Kirim Notifikasi ke Telegram ===
      const name = contactForm.querySelector("input[name='name']").value;
      const email = contactForm.querySelector("input[name='email']").value;
      const subject = contactForm.querySelector("input[name='subject']").value;
      const message = contactForm.querySelector("textarea[name='message']").value;

      const botToken = "8294737965:AAGg_NMieO1nxetiZwY_SuY4vIgmdjqqE14"; // 🔹 ganti dengan token bot kamu
      const chatId = "8296869559";     // 🔹 ganti dengan chat_id kamu

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
      // Animasi sukses ✔
      submitBtn.innerHTML = `<span style="font-size:18px;">✔</span> Sent!`;
      submitBtn.style.backgroundColor = "#22c55e"; // hijau

      showToast("Message sent! Email + Telegram notification sent 🚀", "success");

      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = ""; // reset
        submitBtn.innerHTML = oldText;
      }, 2000);
    })
    .catch((error) => {
      console.error("FAILED...", error);

      // Animasi error ✖
      submitBtn.innerHTML = `<span style="font-size:18px;">✖</span> Failed`;
      submitBtn.style.backgroundColor = "#ef4444"; // merah

      showToast("Failed to send message. Try again later.", "error");

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = ""; // reset
        submitBtn.innerHTML = oldText;
      }, 2000);
    });
}
    else {
      showToast("Please fill in all fields", "error");
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
const downloadCvBtn = document.getElementById('downloadCvBtn');
const downloadToast = document.getElementById('downloadToast');

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

downloadToast.classList.remove('translate-y-full', 'opacity-0');
setTimeout(() => {
downloadToast.classList.add('translate-y-full', 'opacity-0');
}, 3000);
}
catch (error) {
console.error('Download failed:', error);
} finally {
downloadCvBtn.innerHTML = originalContent;
downloadCvBtn.disabled = false;
}
});
});

document.addEventListener('DOMContentLoaded', function() {
const Links = document.querySelectorAll(' a[href^="#"]');
const contactMeBtn = document.getElementById('contactMeBtn');
const contactForm = document.getElementById('contactForm');
function scrollToContact() {
const contactSection = document.getElementById('contact');
if (contactSection) {
contactSection.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
contactForm.classList.add('animate-form');
setTimeout(() => {
contactForm.classList.remove('animate-form');
}, 1000);
const firstInput = contactForm.querySelector('input');
if (firstInput) {
setTimeout(() => {
firstInput.focus();
}, 1000);
}
}
}
contactMeBtn.addEventListener('click', scrollToContact);
Links.forEach(link => {
link.addEventListener('click', function(e) {
e.preventDefault();
const targetId = this.getAttribute('href').substring(1);
const targetElement = document.getElementById(targetId);
if (targetElement) {
targetElement.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});
});

document.addEventListener('DOMContentLoaded', function() {
const particleToggle = document.getElementById('particleToggle');
const toggleBg = particleToggle.nextElementSibling;
const toggleDot = toggleBg.querySelector('.toggle-dot');
toggleBg.addEventListener('click', function() {
particleToggle.checked = !particleToggle.checked;
if (particleToggle.checked) {
toggleBg.classList.add('bg-primary');
toggleBg.classList.remove('bg-gray-300');
toggleDot.classList.add('translate-x-6');
toggleDot.classList.remove('translate-x-0');
} else {
toggleBg.classList.remove('bg-primary');
toggleBg.classList.add('bg-gray-300');
toggleDot.classList.remove('translate-x-6');
toggleDot.classList.add('translate-x-0');
}
});
});

tailwind.config={theme:{extend:{colors:{primary:'#6366f1',secondary:'#ec4899'},borderRadius:{'none':'0px','sm':'4px',DEFAULT:'8px','md':'12px','lg':'16px','xl':'20px','2xl':'24px','3xl':'32px','full':'9999px','button':'8px'}}}}

document.addEventListener('DOMContentLoaded', function() {
const particleContainer = document.getElementById('particleContainer');
function createParticle() {
const particle = document.createElement('div');
particle.className = 'particle';
const size = Math.random() * 4 + 2;
const x = Math.random() * window.innerWidth;
const y = Math.random() * window.innerHeight;
const duration = Math.random() * 3 + 3;
particle.style.width = size + 'px';
particle.style.height = size + 'px';
particle.style.left = x + 'px';
particle.style.top = y + 'px';
particle.style.animationDuration = duration + 's';
particleContainer.appendChild(particle);
setTimeout(() => {
if (particle.parentNode) {
particle.parentNode.removeChild(particle);
}
}, duration * 1000);
}
function initParticles() {
for (let i = 0; i < 15; i++) {
setTimeout(createParticle, i * 200);
}
}
initParticles();
setInterval(createParticle, 400);
});

document.addEventListener('DOMContentLoaded', function() {
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const restartBtn = document.getElementById('restartBtn');
const currentScoreEl = document.getElementById('currentScore');
const highScoreEl = document.getElementById('highScore');
const snakeLengthEl = document.getElementById('snakeLength');
const bestLengthEl = document.getElementById('bestLength');
const gameStatusEl = document.getElementById('gameStatus');
const gameLevelEl = document.getElementById('gameLevel');
const gameOverModal = document.getElementById('gameOverModal');
const pauseModal = document.getElementById('pauseModal');
const finalScoreEl = document.getElementById('finalScore');
const newHighScoreEl = document.getElementById('newHighScore');
const playAgainBtn = document.getElementById('playAgainBtn');
const resumeBtn = document.getElementById('resumeBtn');
const quitBtn = document.getElementById('quitBtn');
const controlBtns = document.querySelectorAll('.control-btn');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{x: 10, y: 10}];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let gameRunning = false;
let gamePaused = false;
let gameSpeed = 200;
let level = 1;

let highScore = localStorage.getItem('snakeHighScore') || 0;
let bestLength = localStorage.getItem('snakeBestLength') || 1;
highScoreEl.textContent = highScore;
bestLengthEl.textContent = bestLength;

function generateFood() {
food = {
x: Math.floor(Math.random() * tileCount),
y: Math.floor(Math.random() * tileCount)
};
for (let segment of snake) {
if (segment.x === food.x && segment.y === food.y) {
generateFood();
return;
}
}
}

function drawGame() {
ctx.fillStyle = '#1e293b';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = '#10b981';
for (let i = 1; i < snake.length; i++) {
ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
}

ctx.fillStyle = '#6366f1';
ctx.fillRect(snake[0].x * gridSize, snake[0].y * gridSize, gridSize - 2, gridSize - 2);

ctx.fillStyle = '#ef4444';
ctx.beginPath();
ctx.arc(food.x * gridSize + gridSize/2, food.y * gridSize + gridSize/2, gridSize/2 - 1, 0, 2 * Math.PI);
ctx.fill();
}

function moveSnake() {
const head = {x: snake[0].x + dx, y: snake[0].y + dy};

if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
gameOver();
return;
}

for (let segment of snake) {
if (head.x === segment.x && head.y === segment.y) {
gameOver();
return;
}
}

snake.unshift(head);

if (head.x === food.x && head.y === food.y) {
score += 10;
level = Math.floor(score / 50) + 1;
gameSpeed = Math.max(100, 200 - (level - 1) * 20);
generateFood();
updateScore();
} else {
snake.pop();
}
}

function updateScore() {
currentScoreEl.textContent = score;
snakeLengthEl.textContent = snake.length;
gameLevelEl.textContent = level;
}

function gameOver() {
gameRunning = false;
gameStatusEl.textContent = 'Game Over';
gameStatusEl.className = 'text-lg font-medium text-red-500';

finalScoreEl.textContent = score;
if (score > highScore) {
highScore = score;
bestLength = snake.length;
localStorage.setItem('snakeHighScore', highScore);
localStorage.setItem('snakeBestLength', bestLength);
highScoreEl.textContent = highScore;
bestLengthEl.textContent = bestLength;
newHighScoreEl.classList.remove('hidden');
} else {
newHighScoreEl.classList.add('hidden');
}
gameOverModal.classList.remove('hidden');
}

function startGame() {
snake = [{x: 10, y: 10}];
dx = 0;
dy = 0;
score = 0;
level = 1;
gameSpeed = 200;
gameRunning = true;
gamePaused = false;
generateFood();
updateScore();
gameStatusEl.textContent = 'Playing';
gameStatusEl.className = 'text-lg font-medium text-green-500';
startBtn.innerHTML = '<i class="ri-refresh-line"></i><span>Restart</span>';
startBtn.classList.remove('pulse-animation');
gameLoop();
}

function pauseGame() {
if (gameRunning && !gamePaused) {
gamePaused = true;
gameStatusEl.textContent = 'Paused';
gameStatusEl.className = 'text-lg font-medium text-yellow-500';
pauseModal.classList.remove('hidden');
}
}

function resumeGame() {
if (gameRunning && gamePaused) {
gamePaused = false;
gameStatusEl.textContent = 'Playing';
gameStatusEl.className = 'text-lg font-medium text-green-500';
pauseModal.classList.add('hidden');
gameLoop();
}
}

function resetGame() {
gameRunning = false;
gamePaused = false;
snake = [{x: 10, y: 10}];
dx = 0;
dy = 0;
score = 0;
level = 1;
gameSpeed = 200;
updateScore();
generateFood();
drawGame();
gameStatusEl.textContent = 'Ready to Play';
gameStatusEl.className = 'text-lg font-medium text-green-500';
startBtn.innerHTML = '<i class="ri-play-line"></i><span>Start Game</span>';
startBtn.classList.add('pulse-animation');
gameOverModal.classList.add('hidden');
pauseModal.classList.add('hidden');
}

function gameLoop() {
if (!gameRunning || gamePaused) return;
moveSnake();
drawGame();
setTimeout(gameLoop, gameSpeed);
}

function changeDirection(newDx, newDy) {
if (!gameRunning || gamePaused) return;
if ((dx === 0 && newDx !== 0) || (dy === 0 && newDy !== 0)) {
dx = newDx;
dy = newDy;
}
}

startBtn.addEventListener('click', function() {
if (gameRunning) {
resetGame();
} else {
startGame();
}
});

pauseBtn.addEventListener('click', pauseGame);
restartBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', function() {
gameOverModal.classList.add('hidden');
startGame();
});
resumeBtn.addEventListener('click', resumeGame);
quitBtn.addEventListener('click', function() {
pauseModal.classList.add('hidden');
resetGame();
});

document.addEventListener('keydown', function(e) {
switch(e.key) {
case 'ArrowUp':
e.preventDefault();
changeDirection(0, -1);
break;
case 'ArrowDown':
e.preventDefault();
changeDirection(0, 1);
break;
case 'ArrowLeft':
e.preventDefault();
changeDirection(-1, 0);
break;
case 'ArrowRight':
e.preventDefault();
changeDirection(1, 0);
break;
case ' ':
e.preventDefault();
if (gameRunning && !gamePaused) {
pauseGame();
} else if (gamePaused) {
resumeGame();
}
break;
}
});

controlBtns.forEach(btn => {
btn.addEventListener('click', function() {
const direction = this.dataset.direction;
switch(direction) {
case 'up':
changeDirection(0, -1);
break;
case 'down':
changeDirection(0, 1);
break;
case 'left':
changeDirection(-1, 0);
break;
case 'right':
changeDirection(1, 0);
break;
}
});
});

generateFood();
drawGame();
});
// === FADE SLIDE-IN ON SCROLL ===
const fadeElements = document.querySelectorAll('.fade-slide-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // animasi sekali aja
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));
// AOS init
AOS.init({ duration: 1000, once: true });

// IntersectionObserver untuk staggered form
document.addEventListener("DOMContentLoaded", () => {
  // Staggered form animation
  const staggerEls = document.querySelectorAll("#contact .stagger");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 200);
      }
    });
  }, { threshold: 0.2 });

  staggerEls.forEach(el => observer.observe(el));

  // Ripple effect button
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
});
document.addEventListener("DOMContentLoaded", () => {
  const underline = document.getElementById("contact-underline");

  if (underline) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          underline.classList.remove("animate-underline-swipe-bounce"); 
          void underline.offsetWidth; // reset animasi
          underline.classList.add("animate-underline-swipe-bounce");
        }
      });
    }, { threshold: 0.5 });

    observer.observe(underline);
  }
});
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNav = document.getElementById('mobileNav');
  const closeMobileNav = document.getElementById('closeMobileNav');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  // Safety checks — jangan lanjut kalau elemen penting tidak ada
  if (!hamburgerBtn || !mobileNav) {
    console.warn('Drawer init skipped: missing #hamburgerBtn or #mobileNav');
    return;
  }

  // Attach link click handlers ONCE (toggle active + close drawer)
  if (drawerLinks && drawerLinks.length) {
    drawerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // set active state
        drawerLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // close drawer after click
        closeDrawer();
      });
    });
  }

  // Open drawer: remove hidden class and stagger-show links
  function openDrawer() {
    // show drawer (using Tailwind classes -translate-x-full / translate-x-0)
    mobileNav.classList.remove('-translate-x-full');
    mobileNav.classList.add('translate-x-0');

    // mark body so hamburger -> X css works (your CSS uses .open #hamburgerBtn)
    document.body.classList.add('open');

    // stagger animate links in
    drawerLinks.forEach((link, i) => {
      setTimeout(() => link.classList.add('show'), i * 80);
    });

    // accessibility
    hamburgerBtn.setAttribute('aria-expanded', 'true');
  }

  // Close drawer: hide links then hide drawer
  function closeDrawer() {
    // stagger hide links quickly
    drawerLinks.forEach((link, i) => {
      setTimeout(() => link.classList.remove('show'), i * 30);
    });

    // hide drawer
    mobileNav.classList.add('-translate-x-full');
    mobileNav.classList.remove('translate-x-0');

    // remove open body class
    document.body.classList.remove('open');

    // accessibility
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  // Toggle on hamburger click
  hamburgerBtn.addEventListener('click', (e) => {
    const hidden = mobileNav.classList.contains('-translate-x-full');
    if (hidden) openDrawer();
    else closeDrawer();
  });

  // Close button (the ×)
  if (closeMobileNav) {
    closeMobileNav.addEventListener('click', closeDrawer);
  }

  // Click outside to close (useful because we removed overlay)
  document.addEventListener('click', (e) => {
    // if drawer is open and click is outside both nav and hamburger -> close
    const isOpen = !mobileNav.classList.contains('-translate-x-full');
    if (!isOpen) return;

    if (!mobileNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeDrawer();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("galleryPreview_x9");
  const img = document.getElementById("galleryImg_x9");
  const title = document.getElementById("galleryTitle_x9");
  const desc = document.getElementById("galleryDesc_x9");
  const closeBtn = document.getElementById("galleryClose_x9");
  const prevBtn = document.getElementById("galleryPrev_x9");
  const nextBtn = document.getElementById("galleryNext_x9");

  let currentIndex = 0;
  let data = [];

  // Simpan data gallery
  items.forEach((item, i) => {
    const imgEl = item.querySelector("img");
    const titleEl = item.querySelector("h3");
    const descEl = item.querySelector("p");
    data.push({
      src: imgEl.src,
      title: titleEl ? titleEl.textContent : "",
      desc: descEl ? descEl.textContent : ""
    });

    item.addEventListener("click", () => {
      currentIndex = i;
      showPreview(currentIndex);
    });
  });

  function showPreview(i) {
    modal.classList.add("active");
    img.src = data[i].src;
    title.textContent = data[i].title;
    desc.textContent = data[i].desc;
  }

  function closePreview() {
    modal.classList.remove("active");
  }

  function next() {
    currentIndex = (currentIndex + 1) % data.length;
    showPreview(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    showPreview(currentIndex);
  }

  closeBtn.addEventListener("click", closePreview);
  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  // Tutup modal kalau klik area hitam
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePreview();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".tech-track");
  if (track) {
    // Gandakan isi agar tidak ada gap
    track.innerHTML += track.innerHTML;
  }
});
(() => {
  const PAGE_SIZE = 3;
  const JSON_URL = 'sertifikat.json';

  const grid = document.getElementById('certificatesGrid');
  const loadMoreBtn = document.getElementById('loadMoreCertificates');
  if (!grid || !loadMoreBtn) return; // keluar jika section tidak ada

  let certs = [];
  let renderedCount = 0;
  let currentModalIndex = -1;

  // Elements modal
  const modal = document.getElementById('certificateModal');
  const modalContent = document.getElementById('certificateContent');
  const imgEl = document.getElementById('certificateImage');
  const titleEl = document.getElementById('certificateTitle');
  const orgEl = document.getElementById('certificateOrg');
  const dateEl = document.getElementById('certificateDate');
  const skillsEl = document.getElementById('certificateSkills');
  const idEl = document.getElementById('certificateID');
  const verifEl = document.getElementById('certificateVerification');

  const closeBtn = document.getElementById('closeCertificateModal');
  const prevBtn = document.getElementById('prevCertificate');
  const nextBtn = document.getElementById('nextCertificate');

  // Utility kecil
  const escapeHtml = (s = '') =>
    String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;', "'":'&#39;'}[m]));

  const normUrl = (u = '') => u.startsWith('http') ? u : `https://${u}`;

  // Fetch & init
  fetch(JSON_URL)
    .then(r => r.json())
    .then(data => {
      certs = Array.isArray(data) ? data : (data.certificates || []);
      // (opsional) urut terbaru ke lama
      certs.sort((a, b) => new Date(b.date) - new Date(a.date));
      renderNext();
    })
    .catch(err => {
      console.error('Gagal memuat sertifikat:', err);
      loadMoreBtn.disabled = true;
      loadMoreBtn.textContent = 'Gagal memuat';
    });

  // Render batch berikutnya
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
      card.addEventListener('click', () => openModal(idx));
      frag.appendChild(card);
    });

    grid.appendChild(frag);
    renderedCount += slice.length;

    // Toggle tombol
    if (renderedCount >= certs.length) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  }

  loadMoreBtn.addEventListener('click', renderNext);

  // Modal logic
  function openModal(index) {
    currentModalIndex = index;
    fillModal(certs[index]);

    modal.classList.remove('hidden');
    // animasi in
    requestAnimationFrame(() => {
      modalContent.classList.remove('opacity-0', 'scale-95');
    });
  }

  function closeModal() {
    // animasi out
    modalContent.classList.add('opacity-0', 'scale-95');
    setTimeout(() => modal.classList.add('hidden'), 200);
  }

  function fillModal(c) {
    if (!c) return;
    imgEl.src = c.img || '';
    imgEl.alt = `Certificate: ${c.title || ''}`;
    titleEl.textContent = c.title || '';
    orgEl.textContent = c.org || '';
    dateEl.textContent = c.date || '';
    idEl.textContent = c.id || '';

    // Verification link/teks
    verifEl.innerHTML = '';
    if (c.verification) {
      const a = document.createElement('a');
      a.href = normUrl(c.verification);
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'text-primary underline';
      a.textContent = c.verification;
      verifEl.appendChild(a);
    }

    // Skills chips
    skillsEl.innerHTML = '';
    const skills = Array.isArray(c.skills)
      ? c.skills
      : String(c.skills || '').split(',').map(s => s.trim()).filter(Boolean);
    skills.forEach(s => {
      const chip = document.createElement('span');
      chip.className = 'px-2 py-1 text-xs rounded-full bg-gray-100';
      chip.textContent = s;
      skillsEl.appendChild(chip);
    });
  }

  function showPrev() {
    if (!certs.length) return;
    currentModalIndex = (currentModalIndex - 1 + certs.length) % certs.length;
    fillModal(certs[currentModalIndex]);
  }

  function showNext() {
    if (!certs.length) return;
    currentModalIndex = (currentModalIndex + 1) % certs.length;
    fillModal(certs[currentModalIndex]);
  }

  // Bind modal events
  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden') && e.key === 'Escape') closeModal();
  });
  prevBtn?.addEventListener('click', showPrev);
  nextBtn?.addEventListener('click', showNext);

  // Lightbox zoom
  const lightbox = document.getElementById('lightboxZoom');
  const lightboxImg = document.getElementById('lightboxImage');
  imgEl?.addEventListener('click', () => {
    lightboxImg.src = imgEl.src;
    lightbox.classList.remove('hidden');
  });
  lightbox?.addEventListener('click', () => lightbox.classList.add('hidden'));
})();