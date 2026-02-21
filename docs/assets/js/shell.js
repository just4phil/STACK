/**
 * shell.js – injects topbar + sidebar HTML into every page.
 * Include AFTER site.js with type="module" or defer.
 *
 * Each page defines window.PAGE_META = { title, section, breadcrumb }
 */

const SHELL_HTML = `
<!-- TOPBAR -->
<header class="topbar">
  <button class="topbar__menu-btn" id="menuBtn" aria-label="Menü öffnen">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
  <a class="topbar__logo" href="${ROOT}index.html">
    <div class="topbar__logo-icon">VS</div>
    <div class="topbar__logo-text">
      VerwDigiStack
      <span class="topbar__logo-sub">Spezifikation</span>
    </div>
  </a>
  <div class="topbar__divider"></div>
  <nav class="topbar__nav">
    <a class="topbar__nav-link" href="${ROOT}zielbild/index.html">Zielbild</a>
    <a class="topbar__nav-link" href="${ROOT}architecture/index.html">Architektur</a>
    <a class="topbar__nav-link" href="${ROOT}building-blocks/index.html">Building Blocks</a>
    <a class="topbar__nav-link" href="${ROOT}implementation-playbook/index.html">Playbook</a>
  </nav>
  <div class="topbar__actions">
    <span class="topbar__version-badge">DRAFT&nbsp;v0.1</span>
    <button class="topbar__search-btn" id="searchBtn" aria-label="Suche">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      Suche …
      <kbd>⌘K</kbd>
    </button>
    <a class="topbar__github" href="https://github.com/" target="_blank" title="GitHub" rel="noopener">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
    </a>
  </div>
</header>

<!-- SIDEBAR -->
<nav class="sidebar" id="sidebar" aria-label="Seitennavigation">

  <div class="sidebar__section">
    <ul class="sidebar__nav-list">
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link" href="${ROOT}index.html">
          <span class="sidebar__nav-link-icon">⬡</span> Übersicht
        </a>
      </li>
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link" href="${ROOT}zielbild/index.html">
          <span class="sidebar__nav-link-icon">🎯</span> Zielbild 2031
        </a>
      </li>
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link" href="${ROOT}deutschland-app/index.html">
          <span class="sidebar__nav-link-icon">📱</span> Deutschland-App
        </a>
      </li>
      <li class="sidebar__nav-item">
        <a class="sidebar__nav-link" href="${ROOT}gap-analyse/index.html">
          <span class="sidebar__nav-link-icon">📊</span> GAP-Analyse
        </a>
      </li>
    </ul>
  </div>

  <div class="sidebar__section">
    <p class="sidebar__section-title">Spezifikation</p>
    <ul class="sidebar__nav-list">

      <li class="sidebar__nav-group">
        <button class="sidebar__nav-group-toggle">
          <span class="sidebar__nav-link-icon">⚙</span>
          Architektur
          <svg class="sidebar__nav-group-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <ul class="sidebar__nav-sub">
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/index.html">Übersicht</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/01-hintergrund.html">1 · Hintergrund & Ziele</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/02-prinzipien.html">2 · Architekturprinzipien</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/03-schichtenmodell.html">3 · Schichtenmodell</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/04-cross-cutting.html">4 · Cross-Cutting Req.</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/05-api-guidelines.html">5 · API-Design-Guidelines</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/06-sicherheit.html">6 · Sicherheitsarchitektur</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/07-semantik.html">7 · Semantik & Daten</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/08-ki-framework.html">8 · KI-Framework</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}architecture/09-konformitaet.html">9 · Konformitätsprogramm</a></li>
        </ul>
      </li>

      <li class="sidebar__nav-group">
        <button class="sidebar__nav-group-toggle">
          <span class="sidebar__nav-link-icon">◈</span>
          Building Blocks
          <svg class="sidebar__nav-group-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <ul class="sidebar__nav-sub">
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/index.html">Alle Building Blocks</a></li>
          <li style="padding: 4px 12px 2px; font-size:10px; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:.07em; font-weight:600;">Bestehend</li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-identity/index.html">BB-01 · Identity <span class="sidebar__nav-link-badge badge--done">✓</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-portal/index.html">BB-02 · Portal & Formular <span class="sidebar__nav-link-badge badge--done">✓</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-postfach/index.html">BB-03 · Postfach <span class="sidebar__nav-link-badge badge--done">✓</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-payment/index.html">BB-04 · Payment <span class="sidebar__nav-link-badge badge--done">✓</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-wallet/index.html">BB-05 · EUDI Wallet <span class="sidebar__nav-link-badge badge--done">✓</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-noots/index.html">BB-06 · Register (NOOTS) <span class="sidebar__nav-link-badge badge--done">✓</span></a></li>
          <li style="padding: 4px 12px 2px; font-size:10px; color:var(--color-text-muted); text-transform:uppercase; letter-spacing:.07em; font-weight:600; margin-top:4px;">Neu zu definieren</li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-api-gateway/index.html">BB-07 · API-Gateway <span class="sidebar__nav-link-badge badge--critical">KRIT</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-event-bus/index.html">BB-08 · Event-Bus <span class="sidebar__nav-link-badge badge--critical">KRIT</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-consent/index.html">BB-09 · Consent <span class="sidebar__nav-link-badge badge--critical">KRIT</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-esignatur/index.html">BB-10 · E-Signatur <span class="sidebar__nav-link-badge badge--high">HOCH</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-bpm/index.html">BB-11 · BPM / Workflow <span class="sidebar__nav-link-badge badge--high">HOCH</span></a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}building-blocks/bb-ai-gateway/index.html">BB-12 · KI / AI-Gateway <span class="sidebar__nav-link-badge badge--high">HOCH</span></a></li>
        </ul>
      </li>

      <li class="sidebar__nav-group">
        <button class="sidebar__nav-group-toggle">
          <span class="sidebar__nav-link-icon">▷</span>
          Implementation Playbook
          <svg class="sidebar__nav-group-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
        <ul class="sidebar__nav-sub">
          <li><a class="sidebar__nav-link" href="${ROOT}implementation-playbook/index.html">Übersicht</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}implementation-playbook/phase1.html">Phase 1 · Governance</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}implementation-playbook/phase2.html">Phase 2 · Gap-Analyse</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}implementation-playbook/phase3.html">Phase 3 · Querschnittsspec</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}implementation-playbook/phase4.html">Phase 4 · BB-Spezifikation</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}implementation-playbook/phase5.html">Phase 5 · Zertifizierung</a></li>
          <li><a class="sidebar__nav-link" href="${ROOT}implementation-playbook/phase6.html">Phase 6 · Pilotierung</a></li>
        </ul>
      </li>

    </ul>
  </div>

  <div class="sidebar__section">
    <p class="sidebar__section-title">Referenzen</p>
    <ul class="sidebar__nav-list">
      <li><a class="sidebar__nav-link" href="https://specs.govstack.global/" target="_blank" rel="noopener">
        <span class="sidebar__nav-link-icon">↗</span> GovStack Specs
      </a></li>
      <li><a class="sidebar__nav-link" href="https://www.xoev.de/" target="_blank" rel="noopener">
        <span class="sidebar__nav-link-icon">↗</span> XÖV-Standards
      </a></li>
      <li><a class="sidebar__nav-link" href="https://fimportal.de/" target="_blank" rel="noopener">
        <span class="sidebar__nav-link-icon">↗</span> FIM-Portal
      </a></li>
    </ul>
  </div>

</nav>

<!-- SIDEBAR OVERLAY (mobile) -->
<div class="sidebar-overlay" id="sidebarOverlay"></div>

<!-- SEARCH MODAL -->
<div class="search-modal" id="searchModal" role="dialog" aria-modal="true" aria-label="Suche">
  <div class="search-modal__backdrop"></div>
  <div class="search-modal__box">
    <div class="search-modal__input-row">
      <svg class="search-modal__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input class="search-modal__input" id="searchInput" type="text" placeholder="Spezifikation durchsuchen …" autocomplete="off" spellcheck="false">
      <button class="search-modal__esc" id="searchEsc">ESC</button>
    </div>
    <div class="search-modal__results" id="searchResults">
      <span style="color:var(--color-text-muted);font-size:var(--text-sm)">Suchbegriff eingeben …</span>
    </div>
  </div>
</div>
`;

// Compute relative root from current page depth
function computeRelativeRoot() {
  if (window.location.protocol === 'file:') {
    const parts = window.location.pathname.split('/');
    const docsIdx = parts.findIndex(p => p === 'docs');
    if (docsIdx !== -1) {
      const depth = parts.length - docsIdx - 2; // files below docs/
      return depth > 0 ? '../'.repeat(depth) : './';
    }
  }
  // For a web server: count path segments below /docs/
  const pathParts = window.location.pathname.replace(/\/+$/, '').split('/');
  const docsIdx = pathParts.findIndex(p => p === 'docs');
  const depth = docsIdx !== -1 ? pathParts.length - docsIdx - 2 : 0;
  return depth > 0 ? '../'.repeat(depth) : './';
}

// Inject shell into .layout
(function () {
  const layout = document.querySelector('.layout');
  if (!layout) return;

  const ROOT = computeRelativeRoot();
  const html = SHELL_HTML.replace(/\${ROOT}/g, ROOT);

  layout.insertAdjacentHTML('afterbegin', html);

  // Update document title
  const meta = window.PAGE_META || {};
  if (meta.title) {
    document.title = `${meta.title} | VerwDigiStack Spec`;
  }
})();
