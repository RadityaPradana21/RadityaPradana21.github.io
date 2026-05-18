/**
 * LADITTO PORTFOLIO — Main App Script
 * File: js/app.js
 * Depends on: DB (data.js) loaded before this script
 */

/* ═══════════════════════════════════════════
   SVG ICONS for social links
═══════════════════════════════════════════ */
const SOCIAL_ICONS = {
  linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  github:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  youtube:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.4a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#050510"/></svg>`,
  twitter:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
  tiktok:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z"/></svg>`,
};

/* ═══════════════════════════════════════════
   RENDER ALL SECTIONS FROM DB
═══════════════════════════════════════════ */
function renderAll() {

  /* ── Nav logo ── */
  document.getElementById('nav-logo').textContent = DB.initials;
  document.title = DB.name + ' | Portfolio';

  /* ── Hero ── */
  document.getElementById('hero-name-span').textContent =
    DB.name.split(' ').slice(-2).join(' ');
  document.getElementById('hero-bio').textContent = DB.bio;

  /* floating cards */
  document.getElementById('card-gpa').textContent  = DB.gpa;
  document.getElementById('card-loc').textContent  = DB.location;

  /* socials (hero + footer) */
  const socialsHTML = Object.entries(DB.socials)
    .map(([k, v]) => `<a class="social-link" href="${v}" target="_blank" rel="noopener" aria-label="${k}">${SOCIAL_ICONS[k] || k}</a>`)
    .join('');
  document.getElementById('hero-socials').innerHTML   = socialsHTML;
  document.getElementById('footer-socials').innerHTML = socialsHTML;

  /* ── Stats bar ── */
  document.getElementById('stats-bar').innerHTML = DB.stats
    .map(s => `<div class="stat-item">
      <div class="stat-number">${s.number}</div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  /* ── About ── */
  const aboutImg = document.getElementById('about-img');
  const aboutPh  = document.getElementById('about-img-placeholder');
  if (DB.photo2 && DB.photo2.trim() !== '') {
    aboutImg.src = DB.photo2;
    aboutImg.style.display = 'block';
    aboutImg.style.objectFit = 'contain';
    aboutImg.style.objectPosition = 'center bottom';
    if (aboutPh) aboutPh.style.display = 'none';
    aboutImg.onerror = () => {
      aboutImg.style.display = 'none';
      if (aboutPh) aboutPh.style.display = 'flex';
    };
  } else {
    aboutImg.style.display = 'none';
    if (aboutPh) aboutPh.style.display = 'flex';
  }
  document.getElementById('about-bio').textContent =
    `Halo! Saya ${DB.name.split(' ')[0]}. ${DB.bio}`;
  document.getElementById('about-details').innerHTML = `
    <div class="detail-item"><span class="detail-icon"></span>
      <span class="detail-text">${DB.university}</span></div>
    <div class="detail-item"><span class="detail-icon"></span>
      <span class="detail-text">${DB.location}</span></div>
    <div class="detail-item"><span class="detail-icon"></span>
      <span class="detail-text">IPK: <strong>${DB.gpa}</strong></span></div>
    <div class="detail-item"><span class="detail-icon"></span>
      <span class="detail-text">Semester: <strong>${DB.semester}</strong></span></div>`;

  /* ── Experience ── */
  document.getElementById('exp-grid').innerHTML = DB.experiences.map(e => `
    <div class="exp-card reveal">
      <div class="exp-period">${e.period}</div>
      <div class="exp-title">${e.title}</div>
      <div class="exp-company">${e.company}</div>
      <div class="exp-desc">${e.desc}</div>
    </div>`).join('');

  /* ── Skills ── */
  document.getElementById('skills-grid').innerHTML = DB.skills.map(s => `
    <div class="skill-card">
      <img class="skill-icon" src="${s.icon}" alt="${s.name}"
           onerror="this.outerHTML='<div class=skill-icon-placeholder>⚙️</div>'">
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar">
        <div class="skill-progress" data-level="${s.level}" style="width:0%"></div>
      </div>
    </div>`).join('');

  /* ── Certificates ── */
  document.getElementById('cert-grid').innerHTML = DB.certificates.map(c => `
    <div class="cert-card">
      ${c.img && c.img.trim()
        ? `<img class="cert-img" src="${c.img}" alt="${c.name}"
             onerror="this.outerHTML='<div class=cert-img-placeholder>${c.emoji}</div>'">`
        : `<div class="cert-img-placeholder">${c.emoji}</div>`}
      <div class="cert-body">
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-name">${c.name}</div>
        <a class="cert-link" href="${c.link}" target="_blank" rel="noopener">
          Lihat Kredensial →
        </a>
      </div>
    </div>`).join('');

  /* ── Projects ── */
  document.getElementById('proj-grid').innerHTML = DB.projects.map(p => `
    <div class="proj-card">
      ${p.img && p.img.trim()
        ? `<img class="proj-img" src="${p.img}" alt="${p.title}"
             onerror="this.outerHTML='<div class=proj-img-placeholder>${p.emoji}</div>'">`
        : `<div class="proj-img-placeholder">${p.emoji}</div>`}
      <div class="proj-body">
        <div class="proj-title">${p.title}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-footer">
          <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
          ${p.link && p.link !== '#'
            ? `<a class="proj-link" href="${p.link}" target="_blank" rel="noopener">Demo →</a>`
            : ''}
        </div>
      </div>
    </div>`).join('');

  /* ── Footer ── */
  document.getElementById('footer-copy').textContent =
    `© ${new Date().getFullYear()} ${DB.name} · All Rights Reserved`;
}

/* ═══════════════════════════════════════════
   TYPING ANIMATION
═══════════════════════════════════════════ */
function initTyping() {
  const typedEl  = document.getElementById('role-typed');
  if (!typedEl || !DB.roleList || !DB.roleList.length) return;

  const roles    = DB.roleList;
  let   ri       = 0;   // role index
  let   ci       = 0;   // char index
  let   deleting = false;

  const SPEED_TYPE   = 80;
  const SPEED_DELETE = 40;
  const HOLD_MS      = 2000;
  const PAUSE_MS     = 400;

  function tick() {
    const current = roles[ri];

    if (!deleting) {
      typedEl.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) {
        deleting = true;
        setTimeout(tick, HOLD_MS);
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    } else {
      typedEl.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        setTimeout(tick, PAUSE_MS);
        return;
      }
      setTimeout(tick, SPEED_DELETE);
    }
  }
  tick();
}

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursor-ring');
  if (!cursor || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function loop() {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  const hoverEls = 'a, button, .skill-card, .proj-card, .cert-card, .exp-card, .stat-item';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ═══════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════ */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(r => obs.observe(r));
  /* Hero is always visible */
  document.querySelectorAll('#home .reveal').forEach(r => r.classList.add('visible'));
}

/* ═══════════════════════════════════════════
   SKILL BAR ANIMATION
═══════════════════════════════════════════ */
function initSkillBars() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      grid.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = bar.dataset.level + '%';
      });
    }
  }, { threshold: 0.3 }).observe(grid);
}

/* ═══════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════════ */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* ═══════════════════════════════════════════
   MOBILE NAV TOGGLE
═══════════════════════════════════════════ */
function initMobileNav() {
  const btn    = document.getElementById('nav-menu-btn');
  const mobile = document.getElementById('nav-mobile');
  if (!btn || !mobile) return;

  btn.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    btn.innerHTML = open ? '✕' : '☰';
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobile.classList.remove('open');
      btn.innerHTML = '☰';
      document.body.style.overflow = '';
    });
  });
}

/* ═══════════════════════════════════════════
   AVATAR PHOTO PLACEHOLDER visibility
═══════════════════════════════════════════ */
function initAvatarPlaceholder() {
  const ph = document.getElementById('avatar-placeholder');
  if (!ph) return;

  if (DB.photo && DB.photo.trim() !== '') {
    const ring = ph.querySelector('.avatar-ring');
    const hint  = ph.querySelector('p');
    if (ring) {
      ring.innerHTML = `<img id="avatar-ring-photo" src="${DB.photo}" alt="${DB.name}" onerror="this.style.display='none'">`;
    }
    if (hint) hint.style.display = 'none';
  }
  /* three-avatar.js will hide the placeholder once the 3D texture is ready */
}

/* ═══════════════════════════════════════════
   BOOT
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initTyping();
  initCursor();
  initReveal();
  initSkillBars();
  initActiveNav();
  initMobileNav();
  initAvatarPlaceholder();
});
