// Toggle menu burger
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Custom smooth scroll animation
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
  const target = document.getElementById(id);
  if (target){
    const targetY = target.offsetTop - 60;
    smoothScrollTo(targetY);
  }
}

// Fade-in animation saat scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
    else entry.target.classList.remove('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(sec => {
  if (!sec.classList.contains('hero')) observer.observe(sec);
});

// Form kirim ke WhatsApp
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

    // Anti inspect & klik kanan
document.addEventListener("contextmenu", e => e.preventDefault());
document.onkeydown = function(e) {
  if(e.keyCode == 123) return false;
  if(e.ctrlKey && e.shiftKey && ['I','J'].includes(String.fromCharCode(e.keyCode))) return false;
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

// Custom scroll animation (ease in-out)
function smoothScrollTo(targetY, duration = 1000) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  function easeInOutQuad(t) {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutQuad(progress);
    window.scrollTo(0, startY + diff * eased);
    if (elapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
}

// Apply scroll animation when navbar link clicked
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      smoothScrollTo(target.offsetTop, 1000); // 1000ms = 1.2s scroll duration
    }
  });
});