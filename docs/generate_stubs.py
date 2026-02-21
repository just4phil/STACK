"""Generate stub HTML pages for all building blocks and architecture sections."""

import os

DOCS_DIR = r"e:\00_DATEN\_DEVELOPMENT\google_Antigravity\STACK\docs"

def stub_page(title, section_type, breadcrumb_path, css_depth, prev_link, next_link, description, tag, tag_class, body_content):
    css_prefix = "../" * css_depth
    return f"""<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} – VerwDigiStack Spezifikation</title>
  <meta name="description" content="{description}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{css_prefix}assets/css/tokens.css">
  <link rel="stylesheet" href="{css_prefix}assets/css/main.css">
</head>
<body>
<script>window.PAGE_META = {{ title: '{title}', section: '{section_type}' }};</script>

<div class="layout">

  <main class="content">
    <article class="content__main prose">

      <div class="prose-header">
        <div class="prose-header__breadcrumb">
          {breadcrumb_path}
        </div>
        <div class="prose-header__meta">
          <span class="prose-header__tag {tag_class}">{tag}</span>
          <span class="prose-header__tag prose-header__tag--draft">DRAFT</span>
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      <div class="callout callout--warning">
        <div class="callout__icon">✏</div>
        <div class="callout__content">
          <div class="callout__title">Seite wird ausgefüllt</div>
          <div class="callout__body">
            Dieser Abschnitt ist als Platzhalter angelegt und wird sukzessive befüllt.
            Die Struktur folgt dem einheitlichen BB-Template (11 Abschnitte).
          </div>
        </div>
      </div>

      {body_content}

      <div class="pagination">
        <a class="pagination__link pagination__link--prev" href="{prev_link['url']}">
          <span class="pagination__dir">← Zurück</span>
          <span class="pagination__title">{prev_link['title']}</span>
        </a>
        <a class="pagination__link pagination__link--next" href="{next_link['url']}">
          <span class="pagination__dir">Weiter →</span>
          <span class="pagination__title">{next_link['title']}</span>
        </a>
      </div>

      <div class="page-footer">
        <div class="page-footer__meta">Apache-2.0 · Version 0.1 DRAFT</div>
        <div class="page-footer__feedback">
          <span class="page-footer__feedback-label">Hilfreich?</span>
          <div class="page-footer__feedback-btns">
            <button class="feedback-btn">👍</button>
            <button class="feedback-btn">👎</button>
          </div>
        </div>
      </div>

    </article>
    <aside class="content__toc">
      <div class="toc" id="toc">
        <div class="toc__title">Auf dieser Seite</div>
        <ul class="toc__list"></ul>
      </div>
    </aside>
  </main>

</div>

<script src="{css_prefix}assets/js/shell.js"></script>
<script src="{css_prefix}assets/js/site.js"></script>
</body>
</html>"""


BB_STUB_BODY = """
      <h2 id="beschreibung">2  Beschreibung</h2>
      <p style="color:var(--color-text-secondary)">Inhalte werden ergänzt.</p>

      <h2 id="schluessel-funktionalitaeten">4  Schlüsselfunktionalitäten</h2>
      <p style="color:var(--color-text-secondary)">Inhalte werden ergänzt.</p>

      <h2 id="funktionale-anforderungen">6  Funktionale Anforderungen</h2>
      <p style="color:var(--color-text-secondary)">Inhalte werden ergänzt.</p>

      <h2 id="service-apis">8  Service-APIs</h2>
      <p style="color:var(--color-text-secondary)">OpenAPI-Spezifikation wird ergänzt.</p>
"""

ARCH_STUB_BODY = """
      <h2 id="uebersicht">Übersicht</h2>
      <p style="color:var(--color-text-secondary)">Inhalte werden ergänzt.</p>
"""


# ── Building Block stubs ──────────────────────────────────────────────────────

bbs = [
    ("bb-identity",   "BB-01 · Identity",           "Authentifizierung, Autorisierung, Identitätsmanagement. OIDC/SAML, eIDAS 2.0, BundID.", "BB-06 · Register (NOOTS)", "bb-noots/index.html",   "BB-02 · Portal & Formular", "bb-portal/index.html"),
    ("bb-portal",     "BB-02 · Portal & Formular",  "OZG-Portal, Formularmanagement, Antragstellung, Native App.", "BB-01 · Identity", "bb-identity/index.html", "BB-03 · Postfach", "bb-postfach/index.html"),
    ("bb-postfach",   "BB-03 · Postfach",            "Sicheres Behördenpostfach. Messaging, Benachrichtigungen, Multi-Kanal.", "BB-02 · Portal", "bb-portal/index.html",   "BB-04 · Payment", "bb-payment/index.html"),
    ("bb-payment",    "BB-04 · Payment",             "e-Payment für Verwaltungsgebühren. XFinanz, XRechnung, Multi-PSP.", "BB-03 · Postfach", "bb-postfach/index.html", "BB-05 · Wallet", "bb-wallet/index.html"),
    ("bb-wallet",     "BB-05 · EUDI Wallet",         "EU Digital Identity Wallet nach eIDAS 2.0. Verifiable Credentials, SD-JWT.", "BB-04 · Payment", "bb-payment/index.html",  "BB-06 · Register", "bb-noots/index.html"),
    ("bb-noots",      "BB-06 · Register (NOOTS)",    "Registerabruf via NOOTS/OOTS. Registermodernisierungsgesetz, Once-Only.", "BB-05 · EUDI Wallet", "bb-wallet/index.html",  "BB-07 · API-Gateway", "bb-api-gateway/index.html"),
    # Gateway already created
    ("bb-event-bus",  "BB-08 · Event-Bus",           "Asynchrone Entkopplung via CloudEvents. AMQP/Kafka, Pub/Sub, Event Sourcing.", "BB-07 · API-Gateway", "bb-api-gateway/index.html", "BB-09 · Consent",   "bb-consent/index.html"),
    ("bb-consent",    "BB-09 · Consent Management",  "DSGVO-konforme Einwilligungsverwaltung. Granulare Zweckbindung, Widerruf, Audit.", "BB-08 · Event-Bus", "bb-event-bus/index.html",  "BB-10 · E-Signatur","bb-esignatur/index.html"),
    ("bb-esignatur",  "BB-10 · E-Signatur",          "QES/FES gemäß eIDAS. Integration EUDI Wallet, VDG, XTA.", "BB-09 · Consent", "bb-consent/index.html",    "BB-11 · BPM",       "bb-bpm/index.html"),
    ("bb-bpm",        "BB-11 · BPM / Workflow",      "BPMN 2.0-Prozessorchestrierung. DMN, Human Tasks, Prozessmonitor.", "BB-10 · E-Signatur", "bb-esignatur/index.html", "BB-12 · KI/AI",    "bb-ai-gateway/index.html"),
    ("bb-ai-gateway", "BB-12 · KI / AI-Gateway",     "Zentrale Inference-API, Guardrails, Human-in-the-Loop, AI-Audit.", "BB-11 · BPM", "bb-bpm/index.html",       "Übersicht",        "../index.html"),
]

bb_dir = os.path.join(DOCS_DIR, "building-blocks")

for folder, title, desc, prev_name, prev_url, next_name, next_url in bbs:
    out_file = os.path.join(bb_dir, folder, "index.html")
    if os.path.exists(out_file):
        print(f"SKIP (exists): {out_file}")
        continue
    bread = f'<a href="../../index.html">VerwDigiStack</a><span class="prose-header__breadcrumb-sep">/</span><a href="../index.html">Building Blocks</a><span class="prose-header__breadcrumb-sep">/</span><span>{title}</span>'
    html = stub_page(
        title, "Building Block", bread, 2,
        {"url": prev_url, "title": prev_name}, {"url": next_url, "title": next_name},
        desc, "◈ Building Block", "prose-header__tag--building-block", BB_STUB_BODY
    )
    os.makedirs(os.path.dirname(out_file), exist_ok=True)
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"CREATED: {out_file}")


# ── Architecture section stubs ────────────────────────────────────────────────

arch_sections = [
    ("01-hintergrund",   "1 · Hintergrund & Ziele",         "Ausgangslage, Treiber und strategische Ziele des Verwaltungsdigitalisierungs-Stacks.",     "Architektur Übersicht", "index.html",         "2 · Architekturprinzipien", "02-prinzipien.html"),
    ("02-prinzipien",    "2 · Architekturprinzipien",       "API First, Zero Trust, Cloud Native, Lose Kopplung, Digitale Souveränität u.a.",             "1 · Hintergrund", "01-hintergrund.html",   "3 · Schichtenmodell",       "03-schichtenmodell.html"),
    ("03-schichtenmodell","3 · Schichtenmodell",            "6-Schichtenmodell: Cloud, Plattform, BBs, Integration, KI/Semantik, Fachverfahren.",          "2 · Prinzipien", "02-prinzipien.html",    "4 · Cross-Cutting Req.",    "04-cross-cutting.html"),
    ("04-cross-cutting", "4 · Cross-Cutting Requirements",  "Verbindliche Querschnittsanforderungen für alle Building Blocks (Sicherheit, Datenschutz…).", "3 · Schichtenmodell", "03-schichtenmodell.html", "5 · API-Guidelines", "05-api-guidelines.html"),
    ("05-api-guidelines","5 · API-Design-Guidelines",       "REST-Konventionen, HTTP-Statuscodes, Fehlerformat, Paginierung, Versionierung.",              "4 · Cross-Cutting", "04-cross-cutting.html", "6 · Sicherheit",            "06-sicherheit.html"),
    ("06-sicherheit",    "6 · Sicherheitsarchitektur",      "Zero-Trust-Modell, OAuth/OIDC, mTLS, Secret Management, BSI-Grundschutz, C5.",               "5 · API-Guidelines", "05-api-guidelines.html","7 · Semantik",              "07-semantik.html"),
    ("07-semantik",      "7 · Semantik & Datenstandards",   "JSON-LD, Knowledge Graph, FIM, XÖV, SPARQL-Endpoint, DCAT-AP.de.",                           "6 · Sicherheit", "06-sicherheit.html",    "8 · KI-Framework",          "08-ki-framework.html"),
    ("08-ki-framework",  "8 · KI-Framework",                "AI-Ethics, Guardrails, Human-in-the-Loop, Audit-Trail, Modellregistry.",                      "7 · Semantik", "07-semantik.html",      "9 · Konformität",           "09-konformitaet.html"),
    ("09-konformitaet",  "9 · Konformitätsprogramm",         "3-stufiges Konformitätsmodell: API-Compliant, Feature-Complete, Fully Certified.",            "8 · KI-Framework", "08-ki-framework.html", "Building Blocks",           "../building-blocks/index.html"),
]

arch_dir = os.path.join(DOCS_DIR, "architecture")

for fname, title, desc, prev_name, prev_url, next_name, next_url in arch_sections:
    out_file = os.path.join(arch_dir, f"{fname}.html")
    if os.path.exists(out_file):
        print(f"SKIP (exists): {out_file}")
        continue
    bread = f'<a href="../index.html">VerwDigiStack</a><span class="prose-header__breadcrumb-sep">/</span><a href="index.html">Architektur</a><span class="prose-header__breadcrumb-sep">/</span><span>{title}</span>'
    html = stub_page(
        title, "Architektur", bread, 1,
        {"url": prev_url, "title": prev_name}, {"url": next_url, "title": next_name},
        desc, "⚙ Architektur", "prose-header__tag--architecture", ARCH_STUB_BODY
    )
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"CREATED: {out_file}")


# ── Implementation Playbook stubs ─────────────────────────────────────────────

playbook_sections = [
    ("phase1", "Phase 1 · Governance",        "Governance-Struktur, Architekturboard, Stakeholder-Management, Spezifikationsprozess.", "Playbook Übersicht", "index.html",  "Phase 2 · Gap-Analyse", "phase2.html"),
    ("phase2", "Phase 2 · Bestandsaufnahme & Gap-Analyse", "Ist-Analyse bestehender Komponenten, Gap-Analyse gegen GovStack.", "Phase 1", "phase1.html",   "Phase 3 · Querschnittsspec", "phase3.html"),
    ("phase3", "Phase 3 · Querschnittsarchitektur", "Cross-Cutting Spec, API-Guidelines, Semantik-Framework, KI-Framework.", "Phase 2", "phase2.html",   "Phase 4 · BB-Spezifikation", "phase4.html"),
    ("phase4", "Phase 4 · BB-Spezifikation",  "Iterative Spezifikation aller Building Blocks in 5 Waves.", "Phase 3", "phase3.html",   "Phase 5 · Zertifizierung", "phase5.html"),
    ("phase5", "Phase 5 · Zertifizierungsprogramm", "Test-Suite, Referenzumgebung, Zertifizierungsprozess, Produkt-Marketplace.", "Phase 4", "phase4.html",   "Phase 6 · Pilotierung", "phase6.html"),
    ("phase6", "Phase 6 · Pilotierung & Iteration", "Pilot-Fachverfahren, Community-Events, Release-Zyklus.", "Phase 5", "phase5.html",   "Übersicht", "../index.html"),
]

playbook_overview = """<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Implementation Playbook – VerwDigiStack Spezifikation</title>
  <meta name="description" content="6-Phasen-Vorgehensmodell zur Implementierung des Verwaltungsdigitalisierungs-Stacks.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/tokens.css">
  <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
<script>window.PAGE_META = { title: 'Implementation Playbook', section: 'Playbook' };</script>
<div class="layout">
  <main class="content">
    <article class="content__main prose">
      <div class="prose-header">
        <div class="prose-header__breadcrumb">
          <a href="../index.html">VerwDigiStack</a>
          <span class="prose-header__breadcrumb-sep">/</span>
          <span>Implementation Playbook</span>
        </div>
        <div class="prose-header__meta">
          <span class="prose-header__tag prose-header__tag--architecture">▷ Playbook</span>
          <span class="prose-header__tag prose-header__tag--draft">DRAFT</span>
        </div>
        <h1>Implementation Playbook</h1>
        <p>6-Phasen-Vorgehensmodell zur Einführung des Verwaltungsdigitalisierungs-Stacks – von der Governance-Gründung bis zur produktiven Pilotierung.</p>
      </div>

      <div class="spec-nav">
        <a class="spec-nav__item" href="phase1.html"><span class="spec-nav__num">1</span>Governance & Setup<span class="spec-nav__wip">IN ARBEIT</span></a>
        <a class="spec-nav__item" href="phase2.html"><span class="spec-nav__num">2</span>Bestandsaufnahme & Gap-Analyse<span class="spec-nav__wip">IN ARBEIT</span></a>
        <a class="spec-nav__item" href="phase3.html"><span class="spec-nav__num">3</span>Querschnittsarchitektur<span class="spec-nav__wip">IN ARBEIT</span></a>
        <a class="spec-nav__item" href="phase4.html"><span class="spec-nav__num">4</span>BB-Spezifikation (iterativ)<span class="spec-nav__wip">IN ARBEIT</span></a>
        <a class="spec-nav__item" href="phase5.html"><span class="spec-nav__num">5</span>Zertifizierungsprogramm<span class="spec-nav__wip">IN ARBEIT</span></a>
        <a class="spec-nav__item" href="phase6.html"><span class="spec-nav__num">6</span>Pilotierung & Iteration<span class="spec-nav__wip">IN ARBEIT</span></a>
      </div>

      <h2 id="timeline">Gesamttimeline</h2>
      <div class="table-wrapper">
        <table>
          <thead><tr><th>Phase</th><th>Zeitraum</th><th>Meilenstein</th></tr></thead>
          <tbody>
            <tr><td>Phase 1 · Governance</td><td>Monat 1–2</td><td>Architekturboard konstituiert, Spezifikationsprozess definiert</td></tr>
            <tr><td>Phase 2 · Gap-Analyse</td><td>Monat 2–4</td><td>Ist-Analyse abgeschlossen, BB-Priorisierung finalisiert</td></tr>
            <tr><td>Phase 3 · Querschnittsspec</td><td>Monat 3–6</td><td>Cross-Cutting-Spec veröffentlicht, API-Guidelines in Kraft</td></tr>
            <tr><td>Phase 4 · BB-Spezifikation</td><td>Monat 4–12</td><td>Wave-1-BBs spezifiziert und Referenzimplementierung verfügbar</td></tr>
            <tr><td>Phase 5 · Zertifizierung</td><td>Monat 6–12</td><td>Test-Suite für Wave-1-BBs; erste zertifizierte Produkte</td></tr>
            <tr><td>Phase 6 · Pilotierung</td><td>Monat 10–18</td><td>2–3 Pilot-Fachverfahren produktiv auf Stack</td></tr>
          </tbody>
        </table>
      </div>

      <div class="page-footer">
        <div class="page-footer__meta">Apache-2.0 · Version 0.1 DRAFT</div>
        <div class="page-footer__feedback">
          <span>Hilfreich?</span>
          <div class="page-footer__feedback-btns">
            <button class="feedback-btn">👍</button><button class="feedback-btn">👎</button>
          </div>
        </div>
      </div>
    </article>
    <aside class="content__toc"><div class="toc" id="toc"><div class="toc__title">Auf dieser Seite</div><ul class="toc__list"></ul></div></aside>
  </main>
</div>
<script src="../assets/js/shell.js"></script>
<script src="../assets/js/site.js"></script>
</body>
</html>"""

playbook_dir = os.path.join(DOCS_DIR, "implementation-playbook")
overview_path = os.path.join(playbook_dir, "index.html")
with open(overview_path, "w", encoding="utf-8") as f:
    f.write(playbook_overview)
print(f"CREATED: {overview_path}")

for fname, title, desc, prev_name, prev_url, next_name, next_url in playbook_sections:
    out_file = os.path.join(playbook_dir, f"{fname}.html")
    if os.path.exists(out_file):
        print(f"SKIP (exists): {out_file}")
        continue
    bread = f'<a href="../index.html">VerwDigiStack</a><span class="prose-header__breadcrumb-sep">/</span><a href="index.html">Playbook</a><span class="prose-header__breadcrumb-sep">/</span><span>{title}</span>'
    html = stub_page(
        title, "Playbook", bread, 1,
        {"url": prev_url, "title": prev_name}, {"url": next_url, "title": next_name},
        desc, "▷ Playbook", "prose-header__tag--architecture", ARCH_STUB_BODY
    )
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"CREATED: {out_file}")

print("\nDone!")
