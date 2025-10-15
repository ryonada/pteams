// script.js
// burger menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// animasi smooth scroll
function smoothScrollTo(targetY, duration = 1200) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuad(progress);
    window.scrollTo(0, startY + diff * eased);
    if (elapsed < duration) requestAnimationFrame(animateScroll);
  }
  requestAnimationFrame(animateScroll);
}

function scrollToSection(id){
  // Tutup menu burger jika terbuka (untuk mobile)
  if (navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
  
  const target = document.getElementById(id);
  if (target){
    const targetY = target.offsetTop - 60;
    smoothScrollTo(targetY);
  }
}

// animasi fade-in (scroll)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
    else entry.target.classList.remove('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(sec => {
  if (!sec.classList.contains('hero')) observer.observe(sec);
});

// form whatsapp
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const nama = document.getElementById('nama').value.trim();
  const email = document.getElementById('email').value.trim();
  const pesan = document.getElementById('pesan').value.trim();
  const nomor = '6283111499336';
  const text = `Halo, saya ${nama}%0AEmail: ${email}%0A%0APesan: ${pesan}`;
  const url = `https://wa.me/${nomor}?text=${text}`;
  window.open(url, '_blank');
});

// tombol musik play/pause
const music = document.getElementById("backsound");
const musicBtn = document.getElementById("music-btn");
let isPlaying = false;

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      music.pause();
      musicBtn.textContent = "🎵 Putar Musik";
    } else {
      music.play();
      musicBtn.textContent = "⏸️ Hentikan Musik";
    }
    isPlaying = !isPlaying;
  });
}

// Prevent default behavior for nav links and use smooth scroll instead
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const targetId = href.substring(1); // Remove the # character
    scrollToSection(targetId);
  });
});

// Toggle mode terang/gelap dengan tombol on/off
const themeCheckbox = document.getElementById('theme-checkbox');

// Cek preferensi tema pengguna
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

// Set tema awal - DEFAULT MODE GELAP
if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  themeCheckbox.checked = true;
} else {
  // Default mode gelap
  document.documentElement.setAttribute('data-theme', 'dark');
  themeCheckbox.checked = false;
  localStorage.setItem('theme', 'dark');
}

// Toggle tema
themeCheckbox.addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});