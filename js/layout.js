/* ============================================================
   ForageWild — Header & Footer Injector
   ============================================================ */

const NAV_LINKS = [
  { label: 'Home',         page: 'home1',   href: 'index.html',    dropdown: [
      { label: 'Home Classic', href: 'index.html',   page: 'home1' },
      { label: 'Home Modern',  href: 'home2.html',   page: 'home2' },
  ]},
  { label: 'About Us',     page: 'about',   href: 'about.html'    },
  { label: 'Tours',        page: 'tours',   href: 'tours.html'    },
  { label: 'Season Guide', page: 'season',  href: 'season.html'   },
  { label: 'Safety',       page: 'safety',  href: 'safety.html'   },
  { label: 'Species',      page: 'species', href: 'species.html'  },
  { label: 'Contact',      page: 'contact', href: 'contact.html'  },
];

function injectHeader() {
  const curPage = document.body.getAttribute('data-page') || '';

  let deskLinks = NAV_LINKS.map(link => {
    if (link.dropdown) {
      const isActive = link.dropdown.some(d => d.page === curPage);
      const items = link.dropdown.map(d =>
        `<a class="ddi${d.page === curPage ? ' active' : ''}" href="${d.href}" data-page="${d.page}">${d.label}</a>`
      ).join('');
      return `
        <div class="ddwrap">
          <span class="nl nl-dd${isActive ? ' active' : ''}" onclick="toggleDD('hdd-home')" data-page="${link.page}">
            ${link.label} <i class="bi bi-chevron-down"></i>
          </span>
          <div class="ddmenu" id="hdd-home">${items}</div>
        </div>`;
    }
    return `<a class="nl${link.page === curPage ? ' active' : ''}" href="${link.href}" data-page="${link.page}">${link.label}</a>`;
  }).join('');

  let mobLinks = NAV_LINKS.map(link => {
    if (link.dropdown) {
      const items = link.dropdown.map(d =>
        `<a class="ddi${d.page === curPage ? ' active' : ''}" href="${d.href}" data-page="${d.page}" onclick="closeMob()">${d.label}</a>`
      ).join('');
      return `
        <div class="mob-dd ddwrap">
          <span class="nl nl-dd" onclick="toggleMobDD('mdd-home')">
            ${link.label} <i class="bi bi-chevron-down"></i>
          </span>
          <div id="mdd-home" class="ddmenu" style="display:none;">${items}</div>
        </div>`;
    }
    return `<a class="nl${link.page === curPage ? ' active' : ''}" href="${link.href}" data-page="${link.page}" onclick="closeMob()">${link.label}</a>`;
  }).join('');

  const html = `
  <nav class="nbar">
    <div class="container">
      <a class="nbrand" href="index.html">
        <img src="images/logo.png">
      </a>
      <div class="dnav">${deskLinks}</div>
      <div class="nctrl">
        <button class="ibtn rtl-btn" onclick="toggleRTL()" title="Toggle RTL/LTR">RTL</button>
        <button class="ibtn" onclick="toggleDark()" title="Toggle Dark Mode">
          <i class="dk-icon bi bi-moon-fill"></i>
        </button>
        <a class="btn-login" href="login.html">Login</a>
        <div class="hbtn" onclick="toggleMob()" id="hbtn">
          <i class="bi bi-list" id="hico"></i>
        </div>
      </div>
    </div>
    <!-- Mobile Menu -->
    <div class="mmenu" id="mmenu">
      ${mobLinks}
      <div class="mctrl">
        <button class="ibtn rtl-btn" onclick="toggleRTL()">RTL</button>
        <button class="ibtn" onclick="toggleDark()">
          <i class="dk-icon bi bi-moon-fill"></i>
        </button>
        <a class="btn-login" href="login.html" onclick="closeMob()">Login</a>
      </div>
    </div>
  </nav>`;

  const placeholder = document.getElementById('header-placeholder');
  if (placeholder) placeholder.outerHTML = html;
}

function injectFooter() {
  const html = `
  <footer class="foot">
    <div class="container">
      <div class="row g-4">
        <!-- Brand -->
        <div class="col-lg-4 col-md-6">
          <div class="flogo"><a href="index.html"><img src="images/logo.png" alt="ForageWild" style="width:110px;filter:brightness(0) invert(1);"></a></div>
          <p class="fdesc">South India's most trusted guided mushroom foraging and wild edible tours. Safe, educational, transformative.</p>
          <div style="margin-top:1.4rem;display:flex;flex-direction:column;gap:.7rem;">
            <div style="display:flex;align-items:flex-start;gap:.7rem;color:rgba(255,255,255,.7);">
              <i class="bi bi-geo-alt-fill" style="color:var(--accent);margin-top:3px;flex-shrink:0;"></i>
              <span>12 Forest Lane, Ooty, Tamil Nadu 643001</span>
            </div>
            <div style="display:flex;align-items:center;gap:.7rem;color:rgba(255,255,255,.7);">
              <i class="bi bi-telephone-fill" style="color:var(--accent);flex-shrink:0;"></i>
              <a href="tel:+919876543210" style="color:rgba(255,255,255,.7);">+91 98765 43210</a>
            </div>
            <div style="display:flex;align-items:center;gap:.7rem;color:rgba(255,255,255,.7);">
              <i class="bi bi-envelope-fill" style="color:var(--accent);flex-shrink:0;"></i>
              <a href="mailto:hello@foragewild.in" style="color:rgba(255,255,255,.7);">hello@foragewild.in</a>
            </div>
            
          </div>
        </div>
        <!-- Explore -->
        <div class="col-lg-2 col-md-3 col-6">
          <p class="ftitle">Explore</p>
          <ul class="flinks">
            <li><a href="index.html">Home Classic</a></li>
            <li><a href="home2.html">Home Modern</a></li>
            <li><a href="tours.html">All Tours</a></li>
            <li><a href="season.html">Season Guide</a></li>
            <li><a href="gallery.html">Gallery</a></li>
          </ul>
        </div>
        <!-- Company -->
        <div class="col-lg-2 col-md-3 col-6">
          <p class="ftitle">Company</p>
          <ul class="flinks">
            <li><a href="about.html">About Us</a></li>
            <li><a href="safety.html">Safety</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="species.html">Species Guide</a></li>
            <li><a href="maintenance.html">Status</a></li>
          </ul>
        </div>
        <!-- Newsletter -->
        <div class="col-lg-4 col-md-6">
          <p class="ftitle">Stay Updated</p>
          <p style="color:rgba(255,255,255,.55);margin-bottom:1rem;">Get seasonal guides and tour alerts in your inbox.
Discover rare finds, expert tips, and foraging safety insights.</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <input type="email" class="fnews-input" placeholder="your@email.com">
            <button class="btn-a" style="padding:.6rem 1.2rem;font-size:17px!important;">Subscribe</button>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="fbot">
        <p>© 2026 ForageWild. All rights reserved.</p>
        <div class="social-icons">
          <a class="sicon" href="#" title="Facebook"><i class="bi bi-facebook"></i></a>
          <a class="sicon" href="#" title="Instagram"><i class="bi bi-instagram"></i></a>
          <a class="sicon" href="#" title="Twitter/X"><i class="bi bi-twitter-x"></i></a>
          <a class="sicon" href="#" title="YouTube"><i class="bi bi-youtube"></i></a>
          <a class="sicon" href="#" title="WhatsApp"><i class="bi bi-whatsapp"></i></a>
        </div>
      </div>
    </div>
  </footer>`;

  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) placeholder.outerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  injectHeader();
  injectFooter();
});
