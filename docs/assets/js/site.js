/**
 * Site JavaScript
 * Verwaltungsdigitalisierungs-Stack Specification
 */

// ============================================================
// NAVIGATION DATA
// ============================================================

const NAV = {
  overview: { title: 'Übersicht', url: 'index.html', icon: '⬡' },
  architecture: {
    title: 'Architektur & Querschnittsanforderungen',
    url: 'architecture/index.html',
    icon: '⚙',
    children: [
      { title: '1  Hintergrund & Ziele',        url: 'architecture/01-hintergrund.html' },
      { title: '2  Architekturprinzipien',       url: 'architecture/02-prinzipien.html' },
      { title: '3  Schichtenmodell',             url: 'architecture/03-schichtenmodell.html' },
      { title: '4  Cross-Cutting Requirements',  url: 'architecture/04-cross-cutting.html' },
      { title: '5  API-Design-Guidelines',       url: 'architecture/05-api-guidelines.html' },
      { title: '6  Sicherheitsarchitektur',      url: 'architecture/06-sicherheit.html' },
      { title: '7  Semantik & Datenstandards',   url: 'architecture/07-semantik.html' },
      { title: '8  KI-Framework',                url: 'architecture/08-ki-framework.html' },
      { title: '9  Konformitätsprogramm',        url: 'architecture/09-konformitaet.html' },
    ]
  },
  buildingBlocks: {
    title: 'Building Blocks',
    url: 'building-blocks/index.html',
    icon: '◈',
    children: [
      // Bestehend
      { title: 'BB-01 · Identity',            url: 'building-blocks/bb-identity/index.html',   status: 'done' },
      { title: 'BB-02 · Portal & Formular',   url: 'building-blocks/bb-portal/index.html',     status: 'done' },
      { title: 'BB-03 · Postfach',            url: 'building-blocks/bb-postfach/index.html',   status: 'done' },
      { title: 'BB-04 · Payment',             url: 'building-blocks/bb-payment/index.html',    status: 'done' },
      { title: 'BB-05 · EUDI Wallet',         url: 'building-blocks/bb-wallet/index.html',     status: 'done' },
      { title: 'BB-06 · Register (NOOTS)',     url: 'building-blocks/bb-noots/index.html',      status: 'done' },
      // Neu
      { title: 'BB-07 · API-Gateway',         url: 'building-blocks/bb-api-gateway/index.html', status: 'draft' },
      { title: 'BB-08 · Event-Bus',           url: 'building-blocks/bb-event-bus/index.html',   status: 'draft' },
      { title: 'BB-09 · Consent Management',  url: 'building-blocks/bb-consent/index.html',     status: 'draft' },
      { title: 'BB-10 · E-Signatur',          url: 'building-blocks/bb-esignatur/index.html',   status: 'draft' },
      { title: 'BB-11 · BPM / Workflow',      url: 'building-blocks/bb-bpm/index.html',         status: 'draft' },
      { title: 'BB-12 · KI / AI-Gateway',     url: 'building-blocks/bb-ai-gateway/index.html',  status: 'draft' },
    ]
  },
  playbook: {
    title: 'Implementation Playbook',
    url: 'implementation-playbook/index.html',
    icon: '▷',
    children: [
      { title: 'Phase 1 · Governance',         url: 'implementation-playbook/phase1.html' },
      { title: 'Phase 2 · Gap-Analyse',        url: 'implementation-playbook/phase2.html' },
      { title: 'Phase 3 · Querschnittsspec',   url: 'implementation-playbook/phase3.html' },
      { title: 'Phase 4 · BB-Spezifikation',   url: 'implementation-playbook/phase4.html' },
      { title: 'Phase 5 · Zertifizierung',     url: 'implementation-playbook/phase5.html' },
      { title: 'Phase 6 · Pilotierung',        url: 'implementation-playbook/phase6.html' },
    ]
  }
};

// ============================================================
// SIDEBAR INIT
// ============================================================

function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const menuBtn = document.getElementById('menuBtn');
  const overlay = document.getElementById('sidebarOverlay');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Collapsible groups
  document.querySelectorAll('.sidebar__nav-group-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const group = toggle.closest('.sidebar__nav-group');
      const sub   = group.querySelector('.sidebar__nav-sub');
      toggle.classList.toggle('open');
      sub.classList.toggle('open');
    });
  });

  // Auto-open group containing active link
  document.querySelectorAll('.sidebar__nav-sub .sidebar__nav-link.active').forEach(link => {
    const sub    = link.closest('.sidebar__nav-sub');
    const toggle = sub.previousElementSibling;
    if (sub && toggle) {
      sub.classList.add('open');
      toggle.classList.add('open');
    }
  });
}

// ============================================================
// TABLE OF CONTENTS (inline, auto-generated)
// ============================================================

function initToc() {
  const toc = document.getElementById('toc');
  if (!toc) return;

  const headings = document.querySelectorAll('.prose h2, .prose h3');
  if (!headings.length) return;

  const list = toc.querySelector('.toc__list');
  if (!list) return;

  headings.forEach((h) => {
    if (!h.id) {
      h.id = h.textContent.trim().toLowerCase()
        .replace(/[^a-z0-9äöüß ]/g, '')
        .replace(/\s+/g, '-')
        .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss');
    }

    const li   = document.createElement('li');
    li.className = 'toc__item';
    const a   = document.createElement('a');
    a.href    = `#${h.id}`;
    a.className = `toc__link${h.tagName === 'H3' ? ' toc__link--sub' : ''}`;
    a.textContent = h.textContent.replace(/^\d+\s+/, '');
    li.appendChild(a);
    list.appendChild(li);
  });

  // Intersection observer for active state
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const link = list.querySelector(`a[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', entry.isIntersecting);
      }
    });
  }, { rootMargin: '-10% 0% -80% 0%', threshold: 0 });

  headings.forEach(h => observer.observe(h));
}

// ============================================================
// SEARCH
// ============================================================

const SEARCH_INDEX = [
  { title: 'Übersicht', url: 'index.html', section: 'Home', excerpt: 'Verwaltungsdigitalisierungs-Stack Spezifikation' },
  { title: 'Architekturprinzipien', url: 'architecture/02-prinzipien.html', section: 'Architektur', excerpt: 'API First, Zero Trust, Cloud Native, Lose Kopplung' },
  { title: 'BB-01 Identity', url: 'building-blocks/bb-identity/index.html', section: 'Building Blocks', excerpt: 'BundID, OIDC, eIDAS 2.0, Authentifizierung' },
  { title: 'BB-02 Portal & Formular', url: 'building-blocks/bb-portal/index.html', section: 'Building Blocks', excerpt: 'OZG-Portal, Formularmanagement, Native App' },
  { title: 'BB-07 API-Gateway', url: 'building-blocks/bb-api-gateway/index.html', section: 'Building Blocks', excerpt: 'Routing, Rate-Limiting, Versionierung, Information Mediator' },
  { title: 'BB-09 Consent Management', url: 'building-blocks/bb-consent/index.html', section: 'Building Blocks', excerpt: 'DSGVO, Einwilligungsverwaltung, Zweckbindung' },
  { title: 'BB-12 KI / AI-Gateway', url: 'building-blocks/bb-ai-gateway/index.html', section: 'Building Blocks', excerpt: 'Guardrails, Human-in-the-Loop, Explainability' },
  { title: 'Konformitätsprogramm', url: 'architecture/09-konformitaet.html', section: 'Architektur', excerpt: 'Level 1-3 Zertifizierung, Test-Suite, Compliance' },
  { title: 'Semantik & Datenstandards', url: 'architecture/07-semantik.html', section: 'Architektur', excerpt: 'JSON-LD, Knowledge Graph, FIM, XÖV, SPARQL' },
  { title: 'Phase 1 · Governance', url: 'implementation-playbook/phase1.html', section: 'Playbook', excerpt: 'Architekturboard, Stakeholder, Governance-Struktur' },
];

function initSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchInput  = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const escBtn = document.getElementById('searchEsc');
  const backdrop = searchModal?.querySelector('.search-modal__backdrop');

  if (!searchModal) return;

  const openSearch = () => {
    searchModal.classList.add('open');
    setTimeout(() => searchInput?.focus(), 50);
    renderSearchResults('');
  };

  const closeSearch = () => {
    searchModal.classList.remove('open');
    if (searchInput) searchInput.value = '';
  };

  searchBtn?.addEventListener('click', openSearch);
  escBtn?.addEventListener('click', closeSearch);
  backdrop?.addEventListener('click', closeSearch);

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') closeSearch();
  });

  searchInput?.addEventListener('input', () => {
    renderSearchResults(searchInput.value.trim());
  });

  function renderSearchResults(query) {
    if (!searchResults) return;

    const results = query.length < 2
      ? SEARCH_INDEX.slice(0, 6)
      : SEARCH_INDEX.filter(item =>
          [item.title, item.section, item.excerpt].some(t =>
            t.toLowerCase().includes(query.toLowerCase())
          )
        ).slice(0, 8);

    if (!results.length) {
      searchResults.innerHTML = `<span style="color:var(--color-text-muted);font-size:var(--text-sm)">Keine Ergebnisse für "${query}"</span>`;
      return;
    }

    const root = computeRoot();
    searchResults.innerHTML = '';
    searchResults.style.display = 'flex';
    searchResults.style.flexDirection = 'column';
    searchResults.style.gap = '2px';
    searchResults.style.alignItems = 'stretch';
    searchResults.style.justifyContent = 'flex-start';
    searchResults.style.padding = 'var(--space-2)';

    results.forEach(item => {
      const a = document.createElement('a');
      a.className = 'search-result';
      a.href = root + item.url;
      a.innerHTML = `
        <div style="flex:1;min-width:0">
          <div style="font-weight:600;font-size:var(--text-sm);color:var(--color-text-primary);margin-bottom:2px">${item.title}</div>
          <div style="font-size:var(--text-xs);color:var(--color-text-muted)">${item.section} · ${item.excerpt}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0;opacity:0.3">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>`;
      a.addEventListener('click', closeSearch);
      searchResults.appendChild(a);
    });
  }
}

// ============================================================
// UTILITY: compute root path relative to current page
// ============================================================

function computeRoot() {
  const depth = (window.location.pathname.match(/\//g) || []).length;
  // local file: always start from docs/
  if (window.location.protocol === 'file:') {
    const parts = window.location.pathname.split('/');
    const docsIdx = parts.findIndex(p => p === 'docs');
    if (docsIdx !== -1) {
      const relDepth = parts.length - docsIdx - 2;
      return relDepth > 0 ? '../'.repeat(relDepth) : './';
    }
  }
  return './';
}

// ============================================================
// ACTIVE SIDEBAR LINK
// ============================================================

function markActiveLink() {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const currentDir  = window.location.pathname;

  document.querySelectorAll('.sidebar__nav-link, .topbar__nav-link').forEach(link => {
    const href     = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    const match    = linkFile === currentFile || (href && currentDir.includes(href.replace('../', '')));
    link.classList.toggle('active', match);
  });
}

// ============================================================
// FEEDBACK BUTTONS
// ============================================================

function initFeedback() {
  document.querySelectorAll('.feedback-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.page-footer__feedback');
      if (parent) {
        parent.innerHTML = '<span style="color:var(--color-success)">✓ Danke für dein Feedback!</span>';
      }
    });
  });
}

// ============================================================
// MAIN INIT
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initToc();
  initSearch();
  markActiveLink();
  initFeedback();

  // Smooth anchor scrolling with offset for sticky header
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--topbar-height')) + 24;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });
});
