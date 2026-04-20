/* ============================================================
   ForageWild — Global JavaScript
   ============================================================ */

/* ── Dark Mode ── */
function initTheme() {
  const saved = localStorage.getItem('fw-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateDarkBtn(saved);
}
function toggleDark() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('fw-theme', next);
  updateDarkBtn(next);
}
function updateDarkBtn(theme) {
  document.querySelectorAll('.dk-icon').forEach(el => {
    el.className = 'dk-icon bi ' + (theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill');
  });
}

/* ── RTL ── */
function initDir() {
  const saved = localStorage.getItem('fw-dir') || 'ltr';
  document.documentElement.setAttribute('dir', saved);
  updateDirBtn(saved);
}
function toggleRTL() {
  const cur = document.documentElement.getAttribute('dir');
  const next = cur === 'rtl' ? 'ltr' : 'rtl';
  document.documentElement.setAttribute('dir', next);
  localStorage.setItem('fw-dir', next);
  updateDirBtn(next);
}
function updateDirBtn(dir) {
  document.querySelectorAll('.rtl-btn').forEach(el => {
    el.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* ── Active Nav ── */
function setActiveNav() {
  const page = document.body.getAttribute('data-page');
  if (!page) return;
  document.querySelectorAll('.nl[data-page], .ddi[data-page]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-page') === page);
  });
}

/* ── Dropdown ── */
function toggleDD(id) {
  const dd = document.getElementById(id);
  const trigger = dd ? dd.previousElementSibling : null;
  const isOpen = dd && dd.classList.contains('show');
  closeAllDD();
  if (!isOpen && dd) {
    dd.classList.add('show');
    if (trigger) trigger.classList.add('open');
  }
}
function closeAllDD() {
  document.querySelectorAll('.ddmenu').forEach(d => {
    d.classList.remove('show');
    const t = d.previousElementSibling;
    if (t) t.classList.remove('open');
  });
}
document.addEventListener('click', e => {
  if (!e.target.closest('.ddwrap')) closeAllDD();
});

/* ── Mobile Menu ── */
let mOpen = false;
function toggleMob() {
  mOpen = !mOpen;
  const menu = document.getElementById('mmenu');
  const ico  = document.getElementById('hico');
  if (menu) menu.classList.toggle('open', mOpen);
  if (ico)  ico.className = mOpen ? 'bi bi-x-lg' : 'bi bi-list';
}
function closeMob() {
  mOpen = false;
  const menu = document.getElementById('mmenu');
  const ico  = document.getElementById('hico');
  if (menu) { menu.classList.remove('open'); }
  if (ico)  { ico.className = 'bi bi-list'; }
  closeAllDD();
}

/* ── Mobile Dropdown (inside mobile menu) ── */
function toggleMobDD(id) {
  const dd = document.getElementById(id);
  if (!dd) return;
  const isOpen = dd.style.display === 'block';
  dd.style.display = isOpen ? 'none' : 'block';
}

/* ── Password Eye Toggle ── */
function initEyes() {
  document.querySelectorAll('.finput-eye').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap  = btn.closest('.finput-wrap');
      const input = wrap.querySelector('input');
      const ico   = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        ico.className = 'bi bi-eye-slash';
      } else {
        input.type = 'password';
        ico.className = 'bi bi-eye';
      }
    });
  });
}

/* ── Accordion ── */
function initAccordion() {
  document.querySelectorAll('.ach').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const body = hdr.nextElementSibling;
      const isOpen = body.classList.contains('open');
      // close all
      document.querySelectorAll('.acb').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.ach').forEach(h => h.classList.remove('open'));
      if (!isOpen) {
        body.classList.add('open');
        hdr.classList.add('open');
      }
    });
  });
}

/* ── Init on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDir();
  setActiveNav();
  initEyes();
  initAccordion();
  initScrollTop();
  initCountUp();
});

/* ── Count-Up Animation ── */
function initCountUp() {
  const els = document.querySelectorAll('.stat-num');
  if (!els.length) return;

  function animateCount(el) {
    const raw = el.textContent.trim();
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
    const suffix = raw.replace(/[0-9.,]/g, '');
    if (isNaN(num)) return;
    const duration = 1800;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    let step = 0;
    const isDecimal = raw.includes('.');
    const timer = setInterval(function () {
      step++;
      current = increment * step;
      if (step >= steps) { current = num; clearInterval(timer); }
      el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
    }, duration / steps);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  els.forEach(function (el) { observer.observe(el); });
}

/* ── Scroll To Top ── */
function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      btn.style.display = 'flex';
      requestAnimationFrame(function () {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
      });
    } else {
      btn.style.opacity = '0';
      btn.style.transform = 'translateY(10px)';
      setTimeout(function () { if (window.scrollY <= 300) btn.style.display = 'none'; }, 300);
    }
  });
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
