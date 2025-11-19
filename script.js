// Set year in footer
document.getElementById('yr').textContent = new Date().getFullYear();

// Skill bars animate on scroll
const bars = document.querySelectorAll('.bar-fill');
const skillObs = new IntersectionObserver((ents) => {
  ents.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.width = en.target.dataset.width + '%';
    }
  });
}, { threshold: 0.5 });
bars.forEach(b => skillObs.observe(b));

// Fade-up animations
const fade = document.querySelectorAll('.fade-up');
const fadeObs = new IntersectionObserver((ents) => {
  ents.forEach(en => en.target.classList.toggle('visible', en.isIntersecting));
}, { threshold: 0.2 });
fade.forEach(el => fadeObs.observe(el));

// Particle canvas animation
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, particles;

function initParticles() {
  W = canvas.width = innerWidth;
  H = canvas.height = innerHeight;
  particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 1,
      d: Math.random() * 0.5 + 0.1
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(0, 201, 255, 0.6)';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y -= p.d;
    if (p.y < 0) p.y = H;
  });
  requestAnimationFrame(drawParticles);
}

initParticles();
drawParticles();
addEventListener('resize', initParticles);

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') {
  html.classList.add('light-mode');
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('light-mode');
  const isLightMode = html.classList.contains('light-mode');
  themeToggle.innerHTML = isLightMode ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});
