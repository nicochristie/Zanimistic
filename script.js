// ── Starfield
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');
let W, H, stars = [];
const N = 180;

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
function initStars() {
  stars = Array.from({ length: N }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.2 + 0.2,
    a: Math.random(),
    da: (Math.random() - 0.5) * 0.004
  }));
}
function drawStars() {
  ctx.clearRect(0, 0, W, H);
  for (const s of stars) {
    s.a = Math.max(0.05, Math.min(1, s.a + s.da));
    if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220, 200, 140, ${s.a * 0.55})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
window.addEventListener('resize', () => { resize(); initStars(); });
resize(); initStars(); drawStars();

// ── Nav scroll state
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ── Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));
