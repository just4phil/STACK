# IT-Landschaft der digitalen Verwaltung in Deutschland – GAP-Analyse

> **Version:** 1.0 · **Stand:** Februar 2026  
> **Zweck:** Ist-Zustand der digitalen Verwaltungs-IT (Bund, Länder, Kommunen) und Ableitung einer GAP-Analyse zum Zielbild 2031

---

## 1  IT-Landschaft: Ist-Zustand 2026

### 1.1  Föderale Struktur der Verwaltungs-IT

Die deutsche Verwaltungs-IT ist geprägt durch die föderale Struktur:

| Ebene | Anzahl | IT-Verantwortung | Typische IT-Dienstleister |
|-------|--------|------------------|--------------------------|
| **Bund** | 1 | BMI (CIO Bund), ITZBund, BWI | ITZBund, BWI, FITKO |
| **Länder** | 16 | Landes-CIOs, Landes-IT-Dienstleister | Dataport, AKDB, IT.NRW, ekom21, ITDZ Berlin, etc. |
| **Kommunen** | ~11.000 | Eigene IT-Abteilungen oder kommunale IT-DL | Kommunale Rechenzentren, Zweckverbände |

**Ergebnis:** Ca. 60+ verschiedene IT-Dienstleister, hunderte Fachverfahren, keine einheitliche Plattform.

### 1.2  Bestehende Systeme und Plattformen

#### Identität & Authentifizierung

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **eID (Online-Ausweisfunktion)** | BSI / Bundesdruckerei | ✅ Produktiv seit 2010 | ~15% Aktivierungsquote; geringe tatsächliche Nutzung |
| **BundID** | BMI / ITZBund | ✅ Produktiv | Zentrales Bürgerkonto Bund; Elster-Login, eID, Benutzername/Passwort |
| **Servicekonten der Länder** | 16 Länder, jeweils eigene | ✅ Produktiv (heterogen) | Bayern: BayernID; NRW: Servicekonto.NRW; etc. |
| **ELSTER-Zertifikat** | Bayerisches Landesamt für Steuern | ✅ Produktiv | Steuer-Authentifizierung; ~40 Mio. Zertifikate |
| **Unternehmenskonto** | FITKO | ⚠️ Pilotbetrieb | ELSTER-basiert; Anbindung an Handelsregister |

**Problem:** Mindestens 18 verschiedene Authentifizierungssysteme (BundID + 16 Länder + ELSTER). Kein einheitliches SSO. Nutzer:innen brauchen je nach Behörde verschiedene Konten.

#### Portal-Landschaft

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **Verwaltung.bund.de (Bundesportal)** | BMI / FITKO | ✅ Produktiv | Transaktionsportal; 620+ Bundesleistungen online beantragbar |
| **Landesportale** | 16 Länder | ✅ Produktiv (heterogen) | service.berlin.de, service.bund.de, etc. |
| **Kommunale Portale** | ~11.000 Kommunen | ⚠️ Teilweise | Oft nur Informationsseiten, selten echte Transaktionen |
| **ELSTER (Steuer)** | BayLfSt | ✅ Produktiv | ~42 Mio. Einkommensteuererklärungen/Jahr |
| **Zoll-Portal** | ITZBund | ✅ Produktiv | Import/Export, Kraftfahrzeugsteuer |

**Problem:** Fragmentiert. Nutzer:innen müssen wissen, welche Ebene zuständig ist. Kein einheitliches Design, keine gemeinsame Suche, keine gemeinsame Navigation.

#### Register & Datenaustausch

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **Registermodernisierung (IDNr)** | BMI / BVA | 🔴 Im Aufbau | Steuer-IDNr als registerübergreifende Kennung (Registermodernisierungsgesetz 2021) |
| **NOOTS (Nat. Once-Only Technical System)** | FITKO | 🔴 Pilotphase | Noch kein Produktivbetrieb |
| **XÖV-Standards** | KoSIT | ✅ Standard-Familie | XMeld, XPersonenstand, XBau, XFinanz – heterogene Umsetzung |
| **DVDV (Deutsches Verwaltungsdiensteverzeichnis)** | FITKO | ✅ Produktiv | Routing für XÖV-Nachrichten |
| **OSCI/Governikus** | Governikus | ✅ Produktiv | Verschlüsselte Behördenkommunikation |

**Problem:** Registermodernisierung massiv verzögert. Ohne registerübergreifende Kennung und NOOTS ist Once-Only nicht möglich. XÖV-Standards existieren, werden aber inkonsistent umgesetzt.

#### Postfach & Zustellung

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **beBPo (besonderes elektronisches Behördenpostfach)** | Governikus | ✅ Produktiv | Behörde-zu-Behörde |
| **beA (besonderes elektronisches Anwaltspostfach)** | BRAK | ✅ Produktiv (Pflicht) | Anwälte-Gerichte |
| **De-Mail** | T-Systems, GMX, etc. | ⚠️ Abgekündigt 2024 | Gescheitert; kaum Nutzung |
| **Postfach in BundID** | ITZBund | ⚠️ Rudimentär | Nur einfache Nachrichten, kein Bescheid-Viewer |

**Problem:** De-Mail gescheitert. BundID-Postfach rudimentär. Kein zentrales, leistungsfähiges Bürger-Postfach.

#### Payment

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **ePayBL** | Bund/Länder | ✅ Produktiv | Verwaltungsgebühren; Integration variiert |
| **PAYONE / giropay** | Verschiedene | ⚠️ Punktuell | Einzelne Kommunen nutzen kommerzielle Anbieter |
| **pmPayment** | Governikus | ✅ Produktiv | In einigen Bundesländern |

**Problem:** Kein einheitliches Payment. Jede Behörde hat eigene Lösungen. Apple Pay / Google Pay selten integriert.

#### Elektronische Signatur

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **Fernsignatur (QES)** | D-Trust, sign-me | ✅ Produktiv | Geringe Verbreitung bei Bürger:innen |
| **eIDAS-QES via EUDI Wallet** | EU / BSI | 🔴 In Entwicklung | eIDAS 2.0 erfordert kostenlose QES via Wallet bis 2027 |
| **Qualifizierte Siegel (Verwaltung)** | Bundesdruckerei | ✅ Produktiv | Für Verwaltungs-interne Nutzung |

**Problem:** Bürger:innen haben kaum Zugang zu QES. Papier-Unterschrift ist oft noch erforderlich.

#### EUDI Wallet

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **EUDI Wallet Prototyp** | BSI / Bundesdruckerei | 🔴 Prototyp | eIDAS 2.0 Pilotprojekte (POTENTIAL, EWC) |
| **Smart-eID** | BSI / Samsung / Google | ⚠️ Pilotbetrieb | eID auf dem Smartphone (begrenzte Gerätekompatibilität) |
| **AusweisApp** | Governikus | ✅ Produktiv | eID-Funktion am Smartphone; ~5 Mio. Downloads |

**Problem:** EUDI Wallet noch nicht produktiv. Smart-eID nur auf wenigen Geräten. AusweisApp ist funktional, aber kein vollständiges Wallet.

#### Prozessautomatisierung / BPM

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **Fachverfahren (>300 verschiedene)** | Diverse Hersteller | ✅ Produktiv | Prosoz, Civento, VOIS, OK.* – jeweils Insel-Lösungen |
| **FIM (Föderales Informationsmanagement)** | FITKO | ⚠️ Teilweise | Leistungs-, Prozess- und Datenfeld-Katalog; geringe maschinelle Nutzung |
| **XProzess** | KoSIT | ⚠️ Standard definiert | Kaum produktive Umsetzung |

**Problem:** Hunderte Insellösungen. Kein übergreifendes BPM. Prozesse sind nicht standardisiert.

#### KI / AI

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **Normen-Screening (BMJ)** | BMJ | ⚠️ Pilotprojekt | KI für Gesetzesfolgenabschätzung |
| **Chatbots (vereinzelt)** | Verschiedene Kommunen | ⚠️ Pilotprojekte | München, Hamburg – einzelne Chatbots; nicht vernetzt |
| **KI-Strategie der Bundesregierung** | Bundeskabinett | 📋 Strategiedokument | Keine zentrale KI-Plattform für Verwaltung |

**Problem:** Keine zentrale KI-Infrastruktur. Vereinzelte Piloten. Keine KI-Governance für Verwaltungs-KI.

#### Infrastruktur & Cloud

| System | Betreiber | Status | Nutzung |
|--------|-----------|--------|---------|
| **Deutsche Verwaltungscloud (DVC)** | IT-Planungsrat | 🔴 Im Aufbau | Multi-Cloud-Strategie; noch kein einheitlicher Betrieb |
| **Sovereign Cloud Stack (SCS)** | OSB Alliance | ⚠️ Open-Source-Basis | Referenzimplementierung für souveräne Cloud |
| **ITZBund Cloud** | ITZBund | ⚠️ Aufbau | Private Cloud für Bundesbehörden |
| **Dataport Cloud** | Dataport | ✅ Produktiv | Für Schleswig-Holstein, Hamburg, Bremen, etc. |

**Problem:** Keine einheitliche Cloud-Infrastruktur. Jeder Dienstleister baut eigene Cloud. DVC ist noch Konzept.

### 1.3  Zusammenfassung Ist-Zustand

| Dimension | Reifegrad | Beschreibung |
|-----------|-----------|-------------|
| **Identität** | ⚠️ Fragmentiert | 18+ Konten; eID geringe Nutzung; kein einheitliches SSO |
| **Portal** | ⚠️ Fragmentiert | Bundesportal mit 620+ Leistungen; aber 16 Landesportale + tausende Kommunalportale uneinheitlich |
| **Register** | 🔴 Kritischer Gap | NOOTS Pilotphase; Registermodernisierung verzögert |
| **Postfach** | 🔴 Kritischer Gap | De-Mail gescheitert; kein funktionierendes Bürger-Postfach |
| **Payment** | ⚠️ Fragmentiert | ePayBL existiert; keine einheitliche UX |
| **Wallet** | 🔴 Kritischer Gap | EUDI Wallet nur Prototyp; Smart-eID eingeschränkt |
| **API-Management** | 🔴 Kritischer Gap | Kein zentrales API-Gateway; XÖV-Punkt-zu-Punkt |
| **Event-Architektur** | 🔴 Nicht vorhanden | Keine eventbasierte Kommunikation |
| **Consent-Management** | 🔴 Nicht vorhanden | DSGVO wird dezentral, inkonsistent umgesetzt |
| **E-Signatur** | ⚠️ Kaum verbreitet | QES für Bürger:innen praktisch nicht verfügbar |
| **BPM** | 🔴 Kritischer Gap | 300+ Fachverfahren; kein übergreifendes BPM |
| **KI** | 🔴 Kritischer Gap | Einzelne Piloten; keine Plattform |
| **Cloud** | ⚠️ Im Aufbau | DVC geplant; noch kein einheitlicher Betrieb |

---

## 2  GAP-Analyse: Ist-Zustand → Zielbild 2031

### 2.1  Methodik

Für jeden Building Block des Zielbilds wird bewertet:

- **Ist-Zustand:** Was existiert heute? (Systeme, Reifegrad)
- **Soll-Zustand:** Was braucht das Zielbild? (aus ZIELBILD_2031.md und DEUTSCHLAND_APP.md)
- **GAP:** Welche Lücke besteht?
- **Aufwand:** Geschätzter Aufwand zur Schließung (S/M/L/XL)
- **Priorität:** Kritisch / Hoch / Mittel / Niedrig
- **Abhängigkeiten:** Andere BBs, die Voraussetzung sind

### 2.2  GAP-Übersicht

| BB | Ist-Reifegrad | Gap-Größe | Aufwand | Priorität |
|----|-------------|-----------|---------|-----------|
| BB-01 Identity | ⚠️ 30% | 🔴 Groß | XL | 🔴 Kritisch |
| BB-02 Portal & Formular | ⚠️ 25% | 🔴 Groß | XL | 🔴 Kritisch |
| BB-03 Postfach | 🔴 10% | 🔴 Sehr groß | L | 🔴 Kritisch |
| BB-04 Payment | ⚠️ 40% | ⚠️ Mittel | M | ⚠️ Hoch |
| BB-05 EUDI Wallet | 🔴 10% | 🔴 Sehr groß | XL | 🔴 Kritisch |
| BB-06 NOOTS (Register) | 🔴 5% | 🔴 Sehr groß | XL | 🔴 Kritisch |
| BB-07 API-Gateway | 🔴 5% | 🔴 Sehr groß | L | 🔴 Kritisch |
| BB-08 Event-Bus | 🔴 0% | 🔴 Neu | L | ⚠️ Hoch |
| BB-09 Consent | 🔴 0% | 🔴 Neu | L | 🔴 Kritisch |
| BB-10 E-Signatur | ⚠️ 20% | 🔴 Groß | M | ⚠️ Hoch |
| BB-11 BPM/Workflow | 🔴 10% | 🔴 Sehr groß | XL | ⚠️ Hoch |
| BB-12 KI/AI-Gateway | 🔴 5% | 🔴 Sehr groß | L | ⚠️ Hoch |
| BB-13 CMS | ⚠️ 30% | ⚠️ Mittel | M | ⚠️ Mittel |
| BB-14 Notification | 🔴 10% | 🔴 Groß | M | ⚠️ Hoch |
| BB-15 Scheduler | ⚠️ 20% | ⚠️ Mittel | S | ⚠️ Mittel |
| BB-16 DMS/E-Akte | ⚠️ 25% | 🔴 Groß | L | ⚠️ Hoch |
| BB-17 Knowledge Graph | 🔴 5% | 🔴 Sehr groß | L | ⚠️ Hoch |

### 2.3  Detaillierte GAP-Analyse pro Building Block

---

#### BB-01 · Identity & Authentifizierung

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **SSO** | 18+ verschiedene Konten | Ein Login für alle Behörden |
| **eID** | ~15% Aktivierung; umständlich | Biometrische Identifizierung in Sekunden |
| **Unternehmensidentität** | ELSTER-basiert; kein SSO | Einheitliches Unternehmenskonto mit SSO |
| **LoA-Stufen** | eID = hoch; Benutzername = niedrig; keine Abstufung | Risikoadaptive Auth: LoA niedrig/substanziell/hoch je nach Service |
| **Session-Management** | Pro Portal getrennt | Geräteübergreifendes SSO; „Einmal anmelden für alles" |

**GAP:**
- ❌ Kein einheitliches SSO über Bund/Länder/Kommunen
- ❌ BundID und 16 Landeskonten müssen konsolidiert werden
- ❌ Risikoadaptive Authentifizierung nicht implementiert
- ❌ Biometrische Auth nur in AusweisApp, nicht übergreifend
- ⚠️ ELSTER-Unternehmensauthentifizierung nicht in SSO integriert

**Aufwand:** XL – Erfordert politischen Konsens und migrationsfähige Architektur
**Abhängigkeiten:** BB-05 (Wallet für eID), BB-07 (API-Gateway für SSO)

---

#### BB-02 · Portal & Formular-Engine

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Zentrales Portal** | verwaltung.bund.de (Bundesportal, 620+ Leistungen); 16 Landesportale; tausende Kommunalportale | Ein Deutschland-Portal + Deutschland-App |
| **Formulare** | PDF-Download, vereinzelt Online-Formulare (FIT-Connect) | Adaptive, vorausgefüllte Formulare mit Validierung |
| **Vorausfüllung** | Nicht vorhanden (kein NOOTS) | Automatisch über NOOTS + Consent |
| **Design** | Inkonsistent; jede Behörde eigenes Design | Einheitliches Design-System |
| **Barrierefreiheit** | Teilweise WCAG 2.1 AA; oft nicht geprüft | 100% WCAG 2.2 AA; Leichte Sprache |

**GAP:**
- ⚠️ Bundesportal (verwaltung.bund.de) mit 620+ Leistungen vorhanden, aber kein einheitliches Deutschland-Portal über alle Ebenen
- ❌ Formulare nicht vorausgefüllt (NOOTS fehlt)
- ❌ Kein einheitliches Design-System über alle Ebenen
- ❌ FIT-Connect rudimentär; wenige angebundene Fachverfahren
- ⚠️ Barrierefreiheit inkonsistent

**Aufwand:** XL – Kern des gesamten Vorhabens
**Abhängigkeiten:** BB-01 (SSO), BB-06 (NOOTS für Vorausfüllung), BB-09 (Consent)

---

#### BB-03 · Postfach

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Zentrales Postfach** | BundID-Postfach (rudimentär); De-Mail gescheitert | Zentrales Bürger-Postfach mit Bescheid-Viewer |
| **Behörden-Chat** | Nicht vorhanden | Echtzeit-Messaging mit Sachbearbeitung |
| **Push** | Nicht vorhanden | Multi-Kanal: Push, SMS, E-Mail |
| **Archiv** | Nicht vorhanden | Durchsuchbares, dauerhaftes Bescheid-Archiv |
| **Anhänge / QES** | Nicht vorhanden | PDF-Viewer mit QES-Signaturprüfung |

**GAP:**
- ❌ De-Mail gescheitert – es gibt kein funktionierendes System
- ❌ BundID-Postfach hat keine Bescheid-Viewer, keine Anhänge, keinen Chat
- ❌ Push-Benachrichtigungen nicht implementiert
- ❌ Kein behördenübergreifendes Postfach
- 🔴 Komplett neu aufzubauen

**Aufwand:** L – Neuentwicklung, aber technisch gut machbar
**Abhängigkeiten:** BB-01 (Auth), BB-14 (Notification), BB-10 (QES-Prüfung)

---

#### BB-04 · Payment

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Gebührenzahlung** | ePayBL vorhanden; Anbindung variiert | Einheitliches In-App-Payment |
| **Zahlungs-Methoden** | Überweisung, SEPA-Lastschrift; selten Kreditkarte | Apple Pay, Google Pay, SEPA, Kreditkarte |
| **Erstattungen** | Manuell per Banküberweisung | Automatisierte Erstattung |
| **UX** | Oft Weiterleitung auf externe Zahlungsseite | Inline in App/Portal; kein Medienbruch |

**GAP:**
- ⚠️ ePayBL existiert, muss aber modernisiert werden
- ❌ Keine Apple Pay / Google Pay Integration
- ❌ Keine einheitliche UX; oft Medienbruch
- ⚠️ Erstattungen nicht automatisiert

**Aufwand:** M – ePayBL als Basis nutzbar; UX-Modernisierung + Wallet-Integration
**Abhängigkeiten:** BB-02 (Portal-Integration), BB-07 (API-Gateway)

---

#### BB-05 · EUDI Wallet

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **PID (Personalausweis)** | AusweisApp (NFC); Smart-eID (wenige Geräte) | PID als Verifiable Credential im EUDI Wallet |
| **Führerschein (mDL)** | Nicht vorhanden | mDL nach ISO 18013-5 |
| **Bescheide als VCs** | Nicht vorhanden | Verwaltungsbescheide als kryptografisch signierte Credentials |
| **Selective Disclosure** | Nicht vorhanden | Nur relevante Attribute freigeben |
| **Offline-Vorzeigen** | Nicht vorhanden | NFC/QR offline vorlegbar |

**GAP:**
- 🔴 EUDI Wallet nur als Prototyp (EU-Pilotprojekte POTENTIAL, EWC)
- ❌ AusweisApp ist kein vollständiges Wallet (nur eID)
- ❌ Kein Credential-Ökosystem für Verwaltungsbescheide
- ❌ Selective Disclosure nicht implementiert
- ❌ mDL-Infrastruktur fehlt komplett (Kraftfahrt-Bundesamt)

**Aufwand:** XL – Abhängig von eIDAS 2.0 Rollout (EU-Timeline: 2026–2027)
**Abhängigkeiten:** EU-Regulierung (eIDAS 2.0), BB-01 (Identity), BB-10 (QES für VC-Signatur)

---

#### BB-06 · NOOTS (Register / Once-Only)

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Registermodernisierung** | IDNr als Kennung beschlossen (2021); Umsetzung massiv verzögert | Alle Kernregister über IDNr verknüpft |
| **NOOTS** | FITKO-Pilotprojekt; kein Produktivbetrieb | Produktives, flächendeckendes Once-Only |
| **Angebundene Register** | <5 in Pilotphase | 20+ Kernregister (Melde, Steuer, Kfz, Handelsregister, etc.) |
| **Consent-basierte Abrufe** | Nicht vorhanden | Jeder Abruf nur mit Consent-Token |

**GAP:**
- 🔴 Registermodernisierung 3+ Jahre hinter Zeitplan
- 🔴 NOOTS nicht produktiv; keine Flächen-Anbindung
- ❌ Ohne NOOTS keine Vorausfüllung; ohne Vorausfüllung keine gute UX
- ❌ Consent-basierte Abrufe nicht spezifiziert

**Aufwand:** XL – Technisch anspruchsvoll; politisch sensibel (Datenschutz-Diskussion)
**Abhängigkeiten:** Registermodernisierungsgesetz; BB-09 (Consent), BB-07 (API-Gateway)

---

#### BB-07 · API-Gateway

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Zentrales API-Management** | Nicht vorhanden | Zentraler API-Gateway mit Routing, Rate-Limiting, Governance |
| **API-Standards** | XÖV (XML-basiert); FIT-Connect (REST, aber rudimentär) | OpenAPI 3.1; REST/gRPC; OAuth 2.0 |
| **API-Katalog** | DVDV (nur Behörden-Routing) | Öffentlicher API-Katalog mit alle BB-APIs |
| **Developer Portal** | Nicht vorhanden | Self-Service-Portal für Entwickler |

**GAP:**
- 🔴 Kein zentrales API-Management – jeder BB kommuniziert Punkt-zu-Punkt
- ❌ XÖV ist XML-basiert und nicht für moderne API-Clients geeignet
- ❌ FIT-Connect ist ein Anfang, aber kein vollständiger API-Gateway
- ❌ Kein API-Katalog, kein Developer Portal

**Aufwand:** L – Technisch gut machbar (Kong, Gravitee, etc.); organisatorisch komplex
**Abhängigkeiten:** Basis für alle anderen BBs

---

#### BB-08 · Event-Bus

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Event-Architektur** | Nicht vorhanden | CloudEvents-basierter Event-Bus |
| **Asynchrone Kommunikation** | Batch-Verarbeitung; OSCI-Messages | Echtzeit-Events für Statusupdates, Proaktive Services |
| **Publish/Subscribe** | Nicht vorhanden | Behörden publizieren Events; App abonniert |

**GAP:**
- 🔴 Komplett neu – es gibt keinerlei eventbasierte Infrastruktur in der Verwaltung
- ❌ Ohne Event-Bus keine proaktive Verwaltung, keine Echtzeit-Statusupdates

**Aufwand:** L – Technisch Standard (Kafka, NATS); organisatorische Einführung aufwändig
**Abhängigkeiten:** BB-07 (API-Gateway), BB-14 (Notification)

---

#### BB-09 · Consent-Management

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **DSGVO-Consent** | Je Behörde eigene Datenschutzerklärung; keine zentrale Verwaltung | Zentrales Consent-Center mit granularen Checkboxen |
| **Consent-Token** | Nicht vorhanden | Maschinenlesbare Consent-Token mit Scope, Zweck, TTL |
| **Widerruf** | Formular per E-Mail/Post | Ein-Klick-Widerruf im Konto |
| **Audit-Trail** | Nicht einheitlich; oft nur Papier | Lückenloser digitaler Audit-Trail |

**GAP:**
- 🔴 Komplett neu – es gibt kein zentrales Consent-Management in der Verwaltung
- ❌ DSGVO-Compliance ist dezentral und inkonsistent
- ❌ Bürger:innen haben keinen Überblick über ihre Einwilligungen
- 🔴 Ohne Consent keine Once-Only-Abrufe aus Registern

**Aufwand:** L – Technisch machbar; rechtlich komplex (Abstimmung mit Datenschutzbeauftragten)
**Abhängigkeiten:** BB-06 (NOOTS braucht Consent), BB-01 (Identity)

---

#### BB-10 · E-Signatur

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **QES für Bürger:innen** | D-Trust/sign-me (kostenpflichtig; geringe Verbreitung) | Kostenlose QES via EUDI Wallet |
| **Signatur in App** | Nicht vorhanden | QES per Biometrie in der Deutschland-App |
| **Verwaltungs-Siegel** | Bundesdruckerei-Siegel produktiv | Automatisierte QES für Bescheide |

**GAP:**
- ❌ Bürger:innen haben keinen einfachen, kostenlosen Zugang zu QES
- ❌ Signatur in App erfordert EUDI Wallet mit QES-Fähigkeit
- ⚠️ Verwaltungs-Siegel vorhanden, aber nicht flächendeckend

**Aufwand:** M – Abhängig von EUDI Wallet; QES-Backend existiert
**Abhängigkeiten:** BB-05 (EUDI Wallet), eIDAS 2.0

---

#### BB-11 · BPM / Workflow-Engine

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Prozessmodellierung** | FIM-Prozesskatalog (teilweise); nicht maschinenlesbar | BPMN 2.0 Prozesse; maschinenlesbar; automatisierbar |
| **Workflow-Engine** | 300+ verschiedene Fachverfahren | Zentrale BPM-Engine mit Standard-Prozessen |
| **Parallelbearbeitung** | Nicht vorhanden | Parallele Submission (z.B. 4 Anträge gleichzeitig bei Geburt) |
| **Human-in-Loop** | Manuell; keine KI-Unterstützung | KI prüft vor; Sachbearbeiter:in entscheidet |

**GAP:**
- 🔴 300+ Fachverfahren-Insellösungen – keine Standardisierung
- ❌ FIM-Prozesse sind nicht maschinenlesbar
- ❌ Keine behördenübergreifende Orchestrierung
- ❌ Kein Human-in-Loop mit KI-Unterstützung

**Aufwand:** XL – Erfordert Standardisierung von Verwaltungsprozessen
**Abhängigkeiten:** BB-06 (NOOTS), BB-07 (API-Gateway), BB-12 (KI)

---

#### BB-12 · KI / AI-Gateway

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **KI-Plattform** | Nicht vorhanden | Zentraler AI-Gateway mit Modell-Routing und Governance |
| **Chatbot** | Vereinzelte Kommunal-Chatbots | Zentraler KI-Assistent für alle Leistungen |
| **Leichte Sprache** | Manuell erstellt | KI-generierte Leichte Sprache |
| **Anspruchsprüfung** | Manuell durch Sachbearbeiter:innen | KI-gestützte Vorprüfung |

**GAP:**
- 🔴 Keine zentrale KI-Infrastruktur
- ❌ Chatbots vereinzelt und nicht vernetzt
- ❌ Kein KI-Governance-Framework für Verwaltungs-KI
- ❌ Leichte Sprache per KI nicht produktiv

**Aufwand:** L – LLMs verfügbar; Governance und Datenschutz sind die Herausforderung
**Abhängigkeiten:** BB-17 (Knowledge Graph für Kontext), BB-07 (API-Gateway)

---

#### BB-13 · CMS (Content Management System)

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **CMS-Systeme** | Hunderte verschiedene (WordPress, TYPO3, Liferay, etc.) | Mandantenfähiges CMS; einheitliche Content-API |
| **Leistungsbeschreibungen** | FIM-Leistungskatalog (teilweise) | Maschinenlesbare, barrierefreie Leistungsinformationen |
| **Multi-Kanal** | Nur Web | Web, App, KI-Chatbot, Terminals |

**GAP:**
- ⚠️ CMS-Systeme existieren, aber fragmentiert
- ❌ Kein einheitlicher Content-Standard für Multi-Kanal
- ⚠️ FIM als Basis nutzbar, aber nicht maschinenlesbar genug

**Aufwand:** M – Headless CMS aufbauen; Content migrieren
**Abhängigkeiten:** BB-17 (Knowledge Graph), BB-12 (KI für Leichte Sprache)

---

#### BB-14 · Notification-Service

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Push-Notifications** | Nicht vorhanden | Push, SMS, E-Mail, In-App über ein System |
| **Proaktive Benachrichtigungen** | Nicht vorhanden | „Ihr Ausweis läuft ab"; „Ihnen steht X zu" |
| **Nutzer-Präferenzen** | Nicht vorhanden | Granulare Steuerung: Welcher Kanal für was? |

**GAP:**
- 🔴 Es gibt keinen Notification-Service in der Verwaltung
- ❌ Proaktive Verwaltung erfordert Push-Fähigkeit
- ❌ Ohne Notification keine Deutschland-App

**Aufwand:** M – Technisch Standard; in App-Shell integrierbar
**Abhängigkeiten:** BB-03 (Postfach), BB-08 (Event-Bus)

---

#### BB-15 · Scheduler (Terminbuchung)

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Terminbuchung** | Vereinzelt (Tevis, netappoint); je Kommune anders | Einheitliche Terminbuchung über App/Portal |
| **Kalender-Integration** | Nicht vorhanden | iCal/CalDAV Export |

**GAP:**
- ⚠️ Lösungen existieren, aber fragmentiert
- ❌ Keine einheitliche API; keine App-Integration
- ⚠️ Kleiner Gap; vergleichsweise einfach zu schließen

**Aufwand:** S – APIs standardisieren; bestehende Systeme anbinden
**Abhängigkeiten:** BB-07 (API-Gateway)

---

#### BB-16 · DMS / E-Akte

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **E-Akte Bund** | E-Akte Bund (teilweise eingeführt) | Behördenübergreifende E-Akte |
| **E-Akte Länder** | Unterschiedlich (nscale, VIS, etc.) | Interoperabel über alle Ebenen |
| **Bürger-Zugang** | Nicht vorhanden | Bürger:innen sehen ihre Dokumente im Konto |

**GAP:**
- ⚠️ E-Akte Bund existiert, aber nicht flächendeckend
- ❌ Keine Interoperabilität zwischen Bund/Ländern/Kommunen
- ❌ Kein Bürger-Zugang zu eigenen Akten

**Aufwand:** L – Standards definieren; bestehende Systeme vernetzen
**Abhängigkeiten:** BB-01 (Zugriffskontrolle), BB-09 (Consent)

---

#### BB-17 · Knowledge Graph

| Dimension | Ist | Soll (Zielbild) |
|-----------|-----|-----------------|
| **Leistungskatalog** | FIM (Leistungen, Prozesse, Datenfelder); LeiKa | Semantischer Knowledge Graph mit RDF/OWL |
| **Maschinenlesbarkeit** | FIM teilweise; nicht linked data | Vollständig maschinenlesbar; Linked Data |
| **KI-Fähigkeit** | Nicht vorhanden | KI kann Leistungen finden und zuordnen |

**GAP:**
- ⚠️ FIM und LeiKa sind gute Ausgangsbasis
- ❌ Nicht als Knowledge Graph modelliert; keine Linked-Data-Fähigkeit
- ❌ Keine semantische Suche möglich

**Aufwand:** L – FIM als Basis; Modellierung als RDF/OWL; SPARQL-Endpunkt
**Abhängigkeiten:** BB-13 (CMS), BB-12 (KI benötigt Knowledge Graph)

---

## 3  Priorisierte Handlungsfelder

### 3.1  Kritischer Pfad (ohne diese geht nichts)

```
Phase 1 (Monat 0–6): Fundamentale Infrastruktur
├── BB-01 Identity → Einheitliches SSO (BundID als Basis)
├── BB-07 API-Gateway → Zentrales API-Management
├── BB-09 Consent → Consent-Framework spezifizieren
└── BB-05 EUDI Wallet → Prototyp mit PID erweitern

Phase 2 (Monat 6–12): Kernerlebnis
├── BB-02 Portal & Formular → Deutschland-Portal MVP
├── BB-03 Postfach → Zentrales Postfach aufbauen
├── BB-06 NOOTS → Erste Register anbinden
└── BB-14 Notification → Push-Service

Phase 3 (Monat 12–18): Erweiterung
├── BB-11 BPM → Standard-Prozesse modellieren
├── BB-10 E-Signatur → QES via Wallet
├── BB-08 Event-Bus → Echtzeit-Events
└── BB-04 Payment → Apple Pay / Google Pay

Phase 4 (Monat 18–24): Intelligence & Proaktivität
├── BB-12 KI/AI-Gateway → Chatbot, Leichte Sprache
├── BB-17 Knowledge Graph → Semantischer Leistungskatalog
├── BB-16 DMS/E-Akte → Behördenübergreifende E-Akte
├── BB-13 CMS → Headless CMS
└── BB-15 Scheduler → Einheitliche Terminbuchung
```

### 3.2  Quick Wins (sofort umsetzbar)

| Maßnahme | Aufwand | Nutzereffekt |
|----------|---------|-------------|
| BundID als SSO für alle Bundesportale | M | Nutzer:innen brauchen nur noch 1 Konto auf Bundesebene |
| Design-System erstellen und verpflichten | S | Konsistente UX sofort sichtbar |
| FIT-Connect zu einem echten API-Gateway ausbauen | M | Erste standardisierte APIs |
| FIM-Leistungskatalog maschinenlesbar machen | S | Basis für Suche und KI |
| AusweisApp um Wallet-Grundfunktionen erweitern | M | Bürger:innen können erste Credentials speichern |
| ePayBL mit Apple Pay / Google Pay ergänzen | S | Moderne Bezahlung |

### 3.3  Größte Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Mitigation |
|--------|-------------------|-----------|-----------|
| **Registermodernisierung scheitert** | Hoch | Katastrophal – ohne Register kein Once-Only | Parallelen Ansatz verfolgen (freiwillige Datenfreigabe) |
| **Föderale Blockade** | Hoch | Hoch – politischer Widerstand gegen Zentralisierung | Kooperationsmodell statt Zentralisierung; Opt-in für Länder |
| **EUDI Wallet verzögert sich** | Mittel | Hoch – eIDAS 2.0 ist externe Abhängigkeit | AusweisApp als Fallback ausbauen |
| **Datenschutzdiskussion blockiert Consent** | Mittel | Hoch – ohne Consent kein NOOTS | Datenschutzbeauftragte früh einbinden; Privacy by Design demonstrieren |
| **Fehlende Fachkräfte** | Hoch | Hoch – öffentlicher Dienst kann schwer rekrutieren | Open Source; externe Entwickler; attraktive Arbeitsbedingungen |
| **Fachverfahrens-Hersteller kooperieren nicht** | Mittel | Mittel – 300+ Hersteller müssen APIs implementieren | Standardisierung + Zertifizierungspflicht |

---

## 4  Zusammenfassung

### Gesamtbewertung

| Kategorie | Einschätzung |
|-----------|-------------|
| **Ist-Reifegrad (Durchschnitt)** | ~15% des Zielbilds |
| **Größte Gaps** | NOOTS, Postfach, Consent, Event-Bus, EUDI Wallet |
| **Stärkste Basis** | ePayBL, FIM/LeiKa, XÖV-Standards, AusweisApp, ELSTER |
| **Kritischer Pfad** | Identity → API-Gateway → Consent → NOOTS → Portal |
| **Zeithorizont** | 4–5 Jahre bei konsequenter Umsetzung |
| **Geschätztes Investitionsvolumen** | 2–4 Mrd. EUR (Bund + Länder + EU-Mittel) |

### Fazit

Deutschland hat durchaus eine Basis – ELSTER, AusweisApp, XÖV, FIM, ePayBL – aber sie ist **fragmentiert, föderalisiert und nicht nutzerorientiert**. Die größten Lücken sind nicht technisch, sondern **organisatorisch und politisch**: Registermodernisierung, Consent-Framework, behördenübergreifende Prozesse.

Das Zielbild 2031 ist **technisch realistisch** – die Technologien existieren (EUDI Wallet, Cloud Native, LLMs, Event-Driven Architecture). Die Herausforderung ist **Governance, Standardisierung und politischer Wille**.
