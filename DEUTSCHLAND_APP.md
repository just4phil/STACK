# Deutschland-App: Die Verwaltungs-Super-App

> **Version:** 1.0 · **Stand:** Februar 2026  
> **Kontext:** Funktionale Struktur, Machbarkeitseinschätzung, dezentrale Umsetzungsarchitektur

---

## 1  Analyse: Super-App vs. Multi-App – Ist das sinnvoll?

### 1.1  Warum eine Super-App die richtige Antwort ist

Die Frage ist nicht ob, sondern wie. Die Evidenz ist eindeutig:

| Faktor | Multi-App (Status quo) | Super-App (Zielbild) |
|--------|----------------------|---------------------|
| **Nutzererlebnis** | App-Sprünge, verschiedene Logins, inkonsistente UX | Ein Einstiegspunkt, ein Login, ein Design |
| **Adoption** | Nutzer installieren nur die 1–2 meistbenutzten | Eine App → sie ist immer schon da |
| **Auffindbarkeit** | Welche App für welche Leistung? | „Alles in der Deutschland-App" |
| **Authentifizierung** | Pro App neu identifizieren oder SSO konfigurieren | Einmal anmelden → fertig |
| **Datensouveränität** | Consent pro App, verteilte Datenhaltung | Zentrales Consent-Center, ein Dashboard |
| **Wartung** | Nutzer muss 5+ Apps updaten | Eine App |
| **Vertrauen** | „Ist diese App offiziell?" | Eine bekannte Marke |

**Internationale Belege:**
- 🇪🇪 **Estland (mRiik)**: Zentraler Zugang zu 99% aller Verwaltungsleistungen
- 🇸🇬 **Singapur (Singpass)**: Super-App mit eID, Wallet, 2.000+ Services, 97% Adoption
- 🇺🇦 **Ukraine (Diia)**: Super-App mit Wallet, Anträge, Postfach, 20 Mio. Nutzer
- 🇮🇳 **Indien (UMANG)**: 1.700+ Services von 300+ Behörden in einer App
- 🇦🇹 **Österreich (Digitales Amt)**: Gebündelte Verwaltungsservices

### 1.2  Ist das realistisch?

**Ja**, unter folgenden Voraussetzungen:

1. **Native App-Shell + Micro-Frontend-Architektur**: Die App ist technisch ein Container mit gemeinsamer Shell; einzelne Funktionsmodule werden von verschiedenen Teams entwickelt und zur Laufzeit integriert.

2. **API-First-Architektur**: Alle Building Blocks bieten standardisierte APIs. Die App ist eine Darstellungsschicht – die Logik lebt in den BBs.

3. **Strenge UX-Governance**: Ein zentrales Design-System sorgt für einheitliches Look & Feel, auch wenn Module dezentral entwickelt werden.

4. **Inkrementeller Rollout**: Start mit Kern-Features (eID, Postfach, 10 Top-Services), sukzessive Erweiterung.

### 1.3  Risiken und Mitigationsstrategien

| Risiko | Mitigation |
|--------|-----------|
| **App wird zu komplex** | Modularer Aufbau; Nutzer sehen nur aktive Module; KI-gestützte Navigation |
| **Single Point of Failure** | Offline-Fähigkeit; Graceful Degradation; BB-Ausfälle beeinflussen nur einzelne Module |
| **Datenschutzbedenken** | On-Device Processing; Consent-Center; kein zentrales Nutzerprofil sondern Token-basierte Abrufe |
| **Store-Abhängigkeit** | PWA als Fallback; Open Source ermöglicht F-Droid-Distribution |
| **Dezentrale Teams liefern inkonsistente UX** | Verpflichtendes Design-System; UX-Review-Gate; automatisierte UI-Tests |
| **Performance bei vielen Modulen** | Lazy Loading; Module nur bei Bedarf herunterladen; CDN für Assets |

---

## 2  Funktionale Struktur der Deutschland-App

### 2.1  Übersicht der App-Ebenen

```
┌──────────────────────────────────────────────────────────────────┐
│                     DEUTSCHLAND-APP                              │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    APP-SHELL                              │   │
│  │  Splash · Tab-Bar · Navigation · Auth-Gate · Push        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                 5 HAUPT-TABS                               │ │
│  │  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐           │ │
│  │  │Start│  │Serv.│  │Post-│  │Wallet│  │Konto│           │ │
│  │  │     │  │     │  │fach │  │     │  │     │           │ │
│  │  └─────┘  └─────┘  └─────┘  └─────┘  └─────┘           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                 FUNKTIONSMODULE                             │ │
│  │  eID · Anträge · Postfach · Wallet · Payment · Consent    │ │
│  │  Termine · Status-Tracker · Chatbot · Lebenslage-Engine   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                 PLATTFORM-LAYER (On-Device)                │ │
│  │  Secure Enclave · Offline-DB · Push · Biometrie · Crypto  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           │                                      │
│                    API-Gateway (BB-07)                           │
│                           │                                      │
│              ┌────────────┴────────────┐                        │
│              │    Building Block APIs   │                        │
│              │  BB-01 … BB-17           │                        │
│              └─────────────────────────┘                        │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2  Die 5 Haupt-Tabs

#### Tab 1 · 🏠 Start (Dashboard)

Das persönliche Startbild – kontextbezogen, proaktiv, aktuell.

| Element | Beschreibung | Datenquelle (BB) |
|---------|-------------|------------------|
| **Begrüßung** | „Guten Tag, [Vorname]" + aktuelle Uhrzeit/Datum | Identity (BB-01) |
| **Proaktive Karten** | „Ihnen steht Kindergeld zu" · „Personalausweis läuft ab in 90 Tagen" | Lebenslage-Engine + Knowledge Graph (BB-17) |
| **Offene Vorgänge** | Laufende Anträge mit Status-Ampel und geschätzter Restzeit | BPM (BB-11) |
| **Letzte Nachrichten** | Vorschau der neuesten Postfach-Nachrichten | Postfach (BB-03) |
| **Quick Actions** | 4 personalisierbare Schnellzugriffe (z.B. „Umzug melden", „Termin buchen") | App-lokal; CMS (BB-13) |
| **KI-Assistent-Banner** | „Wie kann ich helfen?" – Chatbot-Einstieg | KI/AI-Gateway (BB-12) |

#### Tab 2 · 📋 Services (Leistungen)

Alle Verwaltungsleistungen – suchbar, filterbar, KI-kuratiert.

| Element | Beschreibung | Datenquelle (BB) |
|---------|-------------|------------------|
| **Suchfeld** | Freitextsuche + KI-Vorschläge: „Meinten Sie: Elterngeld?" | Knowledge Graph (BB-17), KI (BB-12) |
| **Lebenslagen-Navigation** | Geburt · Umzug · Heirat · Gründung · Rente · … | CMS (BB-13) |
| **Leistungskatalog** | Alle ~575 OZG-Leistungen, filterbar nach Kommune/Land/Bund | Knowledge Graph (BB-17) |
| **Favoriten** | Selbst gepinnte Leistungen | App-lokal |
| **Service-Karte** | Zuständige Behörde, Dauer, benötigte Unterlagen, „Jetzt beantragen" | CMS (BB-13), Portal (BB-02) |
| **Fachportal-Links** | Bei hoch-spezialisierten Services: Deep-Link zur WebView des Fachportals | In-App-WebView, SSO |

#### Tab 3 · 📬 Postfach & Kommunikation

Alle Behördenkommunikation an einem Ort – kein separater E-Mail-Client nötig.

| Element | Beschreibung | Datenquelle (BB) |
|---------|-------------|------------------|
| **Eingang** | Bescheide, Benachrichtigungen, Erinnerungen, sortiert nach Datum | Postfach (BB-03) |
| **Nachricht öffnen** | Inline-Viewer für Bescheide (PDF/HTML), Anhänge, QES-Signaturprüfung | Postfach (BB-03), E-Signatur (BB-10) |
| **Antwort-Funktion** | Auf Behördennachrichten antworten (Nachfragen, Unterlagen nachreichen) | Postfach (BB-03) |
| **Behörden-Chat** | Echtzeit-Messaging mit zuständiger Sachbearbeitung (wenn verfügbar) | Notification (BB-14) |
| **Push-Einstellungen** | Granulare Kontrolle: Welche Nachrichten als Push? Welche nur im Postfach? | Notification (BB-14) |
| **Archiv** | Alle Bescheide dauerhaft abrufbar, durchsuchbar | DMS (BB-16) |

#### Tab 4 · 👛 Wallet

Alle digitalen Nachweise und Ausweise – lokal, sicher, sofort vorlegbar.

| Element | Beschreibung | Datenquelle (BB) |
|---------|-------------|------------------|
| **Personalausweis** | PID (eID) als Verifiable Credential; NFC/QR-Vorzeigung | EUDI Wallet (BB-05) |
| **Führerschein** | mDL nach ISO 18013-5 | EUDI Wallet (BB-05) |
| **Bescheide als VCs** | Elterngeld-Bewilligung, Gewerbeschein, etc. als kryptografisch signierte Credentials | EUDI Wallet (BB-05), BB-10 |
| **Impfpass / ePA** | Gesundheitscredentials (FHIR-basiert) | Fachportal Gesundheit |
| **Qualifikationen** | Bildungsabschlüsse als European Learning Credentials | EUDI Wallet (BB-05) |
| **QR-/NFC-Scanner** | Credential teilen oder Behörden-QR scannen | On-Device |
| **Selective Disclosure** | Nur relevante Felder freigeben (z.B. „Ich bin über 18" ohne Geburtsdatum) | EUDI Wallet (BB-05) |
| **Backup & Recovery** | Verschlüsseltes Cloud-Backup der Wallet (opt-in) | EUDI Wallet (BB-05) |

#### Tab 5 · ⚙ Konto (Mein Bereich)

Selbstverwaltung, Datensouveränität, Einstellungen.

| Element | Beschreibung | Datenquelle (BB) |
|---------|-------------|------------------|
| **Profil** | Name, Adresse, Kontaktdaten (aus Melderegister, editierbar) | Identity (BB-01), NOOTS (BB-06) |
| **Consent-Center** | Alle Einwilligungen: pro Zweck, Behörde, Datenkategorie; Widerruf per Toggle | Consent (BB-09) |
| **Datenabruf-Protokoll** | „Wer hat wann welche Daten abgerufen?" – DSGVO Art. 15 live | Consent (BB-09), Audit-Logs |
| **Datenexport** | Alle eigenen Daten als JSON-LD herunterladen | NOOTS (BB-06) |
| **Löschanträge** | Löschung beantragen; Prüfung gegen Aufbewahrungsfristen | Consent (BB-09) |
| **Vollmachten** | Vertretungen verwalten (Eltern, Betreuung, Bevollmächtigte) | Identity (BB-01) |
| **Zahlungsmittel** | SEPA-Mandat, Kreditkarte, PayPal für Gebührenzahlung | Payment (BB-04) |
| **Sicherheit** | PIN ändern, Biometrie, 2FA, Geräteverwaltung, Lösch-Fernbefehl | On-Device + Identity (BB-01) |
| **Barrierefreiheit** | Schriftgröße, Kontrast, Leichte Sprache, Gebärdensprache | App-lokal |
| **Sprache** | Deutsch, Englisch, weitere; Leichte Sprache | App-lokal + KI (BB-12) |

### 2.3  Übergreifende Funktionen (nicht an Tab gebunden)

| Funktion | Beschreibung | Auslöser |
|----------|-------------|----------|
| **KI-Chatbot** | Floating Action Button auf jeder Seite; Freitext-Fragen zu Leistungen, Antragsstatus, Formularhilfe | KI (BB-12) |
| **Formular-Engine** | Adaptive Formulare mit Vorausfüllung, Validierung, Zwischenspeicher | Portal & Formular (BB-02) |
| **Authentifizierung** | Biometrisch (Fingerabdruck/Face ID) + PIN-Fallback; App startet im Auth-Gate | Identity (BB-01), EUDI Wallet (BB-05) |
| **Zahlung** | In-App-Payment bei gebührenpflichtigen Leistungen (Inline, kein App-Wechsel) | Payment (BB-04) |
| **E-Signatur** | Qualifizierte Signatur direkt in der App (Biometrie + PIN bestätigen) | E-Signatur (BB-10), EUDI Wallet (BB-05) |
| **Termin buchen** | Terminwahl bei Behörden, Erinnerung, Kalender-Integration | Scheduler (BB-15) |
| **Deep Links** | Jeder Service, jeder Antrag hat eine URL → teilbar, bookmarkbar | App-Routing |
| **Offline-Modus** | Wallet, letzte Bescheide, Entwürfe → offline verfügbar | On-Device |

---

## 3  Dezentrale Umsetzungsarchitektur

### 3.1  Das Kernproblem

> *Wie baut man eine einheitliche App, wenn 50+ Teams an 17+ Building Blocks arbeiten, jeder sein eigenes Release-Tempo hat und niemand auf niemanden warten soll?*

**Antwort: App-Shell + Module Federation + API-Integration**

### 3.2  Architekturmodell

```
┌──────────────────────────────────────────────────────────────────────┐
│                     NUTZER-GERÄT (iOS / Android)                     │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                     APP-SHELL (zentral)                       │   │
│  │                                                              │   │
│  │  · Navigation (Tab-Bar, Deep-Links, Routing)                │   │
│  │  · Auth-Gate (Biometrie, PIN, Session-Management)           │   │
│  │  · Design-System (alle UI-Komponenten)                      │   │
│  │  · Push-Handler (FCM/APNs → Module-Router)                  │   │
│  │  · Offline-Layer (SQLite, Secure Enclave)                   │   │
│  │  · Module-Loader (dynamisch, versioniert)                   │   │
│  │  · Shared APIs (Consent-Dialog, Payment-Sheet, Signatur)    │   │
│  └────────┬──────────────┬──────────────┬───────────────────────┘   │
│           │              │              │                            │
│  ┌────────▼───┐  ┌───────▼──────┐  ┌───▼───────────────┐          │
│  │  Modul:    │  │  Modul:      │  │  Modul:           │  …       │
│  │  Postfach  │  │  Formular-   │  │  Wallet           │          │
│  │            │  │  Engine      │  │                    │          │
│  │ Team: BB-03│  │ Team: BB-02  │  │ Team: BB-05       │          │
│  └────────────┘  └──────────────┘  └────────────────────┘          │
│           │              │              │                            │
│           └──────────────┼──────────────┘                           │
│                          │ HTTPS / mTLS                              │
│                          ▼                                           │
│                  API-Gateway (BB-07)                                 │
│                          │                                           │
│            ┌─────────────┼─────────────┐                            │
│            ▼             ▼             ▼                            │
│       BB-03 API     BB-02 API     BB-05 API    …                    │
│       (Postfach)    (Formular)    (Wallet)                          │
└──────────────────────────────────────────────────────────────────────┘
```

### 3.3  Drei Integrationsmuster

#### Muster 1: Native Module (für Kern-Features)

```
Einsatz: Wallet, eID/PID, Biometrie, Offline-Funktionen
Warum: Benötigen Zugang zu Hardware (NFC, Secure Enclave, Kamera)

┌─────────────────────────┐
│  Native Module (Swift/  │
│  Kotlin)                │
│  · Eigener Lifecycle    │    ← Team entwickelt als Library
│  · Shared Design System │    ← Nutzt zentrale Komponenten
│  · Definierte API       │    ← Module Interface Contract
│  · Eigenes Release      │    ← Via App-Update oder Hot-Module
└─────────────────────────┘
```

**Umsetzung:**
- Module werden als **native Libraries** (Swift Package / Kotlin Module) gebaut
- App-Shell bindet sie über ein **Module Interface Protocol** ein
- Zentrale **Design-System-Library** wird von allen Modulen genutzt
- Updates über **App Store Release** oder (soweit Store-Regeln erlauben) **dynamisches Nachladen**

#### Muster 2: WebView-Module (für Formular-/Content-heavy Features)

```
Einsatz: Formulare, Leistungskatalog, Informationsseiten, Fachportal-Integration
Warum: Formulare ändern sich häufig; HTML-Rendering ist flexibler

┌─────────────────────────┐
│  WebView Module         │
│  · React/Vue Micro-     │    ← Team deployt auf eigenem Server
│    Frontend             │    ← Updates sofort, ohne App-Release
│  · Läuft in der App     │    ← App injiziert Auth-Token + Theme
│  · Nutzt JS-Bridge      │    ← Zugriff auf native Features
│  · Design-System via CSS│    ← Nutzt Design-Tokens der App
└─────────────────────────┘
```

**Umsetzung:**
- Module werden als **Micro-Frontends** auf CDN/Server deployt
- App lädt sie in einen **eingebetteten WebView**
- **JavaScript Bridge** ermöglicht Zugriff auf native Features:
  - `AppBridge.requestConsent({ scope, purpose })` → öffnet nativen Consent-Dialog
  - `AppBridge.signDocument(hash)` → triggert QES per Biometrie
  - `AppBridge.pay({ amount, reference })` → öffnet Payment-Sheet
  - `AppBridge.showCredential(type)` → zeigt Wallet-Credential
- **Vorteil:** Module-Teams können täglich deployen, ohne App-Update

#### Muster 3: API-only (für Daten-Features)

```
Einsatz: Postfach-Nachrichten, Antragsstatus, Termine, Consent-Dashboard
Warum: Reine Datenanzeige, kein komplexes UI nötig

┌─────────────────────────┐
│  API-only Module        │
│  · UI in der App-Shell  │    ← Shell rendert die Daten
│  · Standardisierte API  │    ← OpenAPI 3.1 Contract
│  · Kein eigenes UI      │    ← BB-Team pflegt nur Backend
│  · Caching & Offline    │    ← App-Shell cached Daten lokal
└─────────────────────────┘
```

**Umsetzung:**
- App-Shell enthält die UI-Komponenten (Listen, Karten, Detail-Views)
- BB-Teams liefern nur die **API** (OpenAPI 3.1 Spec)
- App ruft APIs via **API-Gateway (BB-07)** auf
- **Lokales Caching** für Offline-Zugang (z.B. letzte Postfach-Nachrichten)

### 3.4  Modulzuordnung nach Integrationsmuster

| Modul | Integrationsmuster | Verantwortliches BB-Team | Begründung |
|-------|-------------------|------------------------|-----------|
| **eID / Authentifizierung** | Native | BB-01 + BB-05 | Hardware-Zugang (NFC, Secure Enclave) |
| **Wallet (Credentials)** | Native | BB-05 | Kryptografie, Biometrie, Offline |
| **E-Signatur** | Native | BB-10 | Secure Enclave für Schlüssel |
| **Biometrie-Gate** | Native | Shell-Team | Face ID / Fingerabdruck |
| **Formular-Engine** | WebView | BB-02 | Häufige Änderungen, komplexe Formulare |
| **Leistungskatalog** | WebView | BB-13 + BB-17 | Content-heavy, häufig aktualisiert |
| **Fachportal-Views** | WebView | Fachportal-Teams | Bestehende Web-UIs einbetten |
| **KI-Chatbot** | WebView | BB-12 | Schnelle Iteration, NLP-Modelle |
| **Postfach** | API-only | BB-03 | Standard-Listenansicht |
| **Antragstracker** | API-only | BB-11 | Standard-Statusanzeige |
| **Termine** | API-only | BB-15 | Kalenderansicht |
| **Consent-Center** | API-only | BB-09 | Liste + Toggles |
| **Datenabruf-Protokoll** | API-only | BB-09 | Chronologische Liste |
| **Payment** | Native | BB-04 | Apple Pay / Google Pay Integration |
| **Push-Notifications** | Native | BB-14 | FCM/APNs |

### 3.5  Module Interface Contract

Damit dezentrale Teams Module liefern können, braucht es einen verbindlichen Vertrag:

```typescript
// Module Interface Contract (vereinfacht)
interface DeutschlandAppModule {
  // Identifikation
  moduleId: string;                    // z.B. "postfach", "wallet"
  version: string;                     // SemVer
  integrationType: 'native' | 'webview' | 'api-only';
  
  // Lifecycle
  initialize(context: AppContext): Promise<void>;
  activate(): void;
  deactivate(): void;
  dispose(): void;
  
  // Navigation
  routes: RouteDefinition[];           // Welche Pfade registriert das Modul?
  tabConfig?: TabConfiguration;        // Optionale Tab-Zuordnung
  deepLinks: DeepLinkPattern[];        // z.B. "deutschland://postfach/{messageId}"
  
  // Capabilities
  capabilities: ModuleCapability[];    // Was kann das Modul? (für Shell-Integration)
  requiredPermissions: Permission[];   // z.B. NFC, Kamera, Biometrie
  offlineCapable: boolean;
  
  // Badges & Notifications
  getBadgeCount(): Promise<number>;    // z.B. "3 neue Nachrichten"
  
  // Health
  healthCheck(): Promise<HealthStatus>;
}

// App-Shell stellt bereit:
interface AppContext {
  authToken: string;                   // OIDC Access Token
  userId: string;
  locale: string;                      // "de" | "en" | "de-leicht"
  theme: ThemeTokens;                  // Design-System Tokens
  bridge: AppBridge;                   // Native Bridge APIs
  apiGateway: string;                  // API-Gateway Base URL
  consentService: ConsentBridge;       // Consent-Dialoge
  paymentService: PaymentBridge;       // Payment-Sheet
  signatureService: SignatureBridge;   // QES
}
```

### 3.6  Governance-Modell

```
┌─────────────────────────────────────────────────────────────┐
│                   APP-GOVERNANCE-BOARD                       │
│                                                             │
│  Entscheidet über: Modul-Zulassung, Design-System,         │
│  Release-Zyklen, Qualitätsgates, API-Contracts              │
└─────────────┬───────────────────────────────────────────────┘
              │
     ┌────────┼────────┐
     │        │        │
     ▼        ▼        ▼
┌─────────┐ ┌──────┐ ┌──────────┐
│ Shell-  │ │ UX-  │ │ Security │
│ Team    │ │ Team │ │ Team     │
│         │ │      │ │          │
│ · Shell │ │ · DS │ │ · Review │
│ · CI/CD │ │ · A11y│ │ · Pen-  │
│ · Infra │ │ · QA │ │   test   │
└─────────┘ └──────┘ └──────────┘
     ▲         ▲         ▲
     │         │         │
     └────┬────┘         │
          │              │
   ┌──────▼──────────────▼──────────────┐
   │       MODULE-TEAMS (dezentral)     │
   │  BB-02 · BB-03 · BB-05 · BB-09 …  │
   │  Entwickeln, testen, deployen      │
   │  eigenständig nach Contract        │
   └────────────────────────────────────┘
```

**Governance-Regeln:**

1. **Modul-Zulassung**: Jedes neue Modul durchläuft ein Review (UX, Security, Performance, A11y)
2. **Design-System-Pflicht**: Module MÜSSEN die zentrale Component Library nutzen – keine Custom-Designs
3. **API-Contract-First**: Bevor ein Modul entwickelt wird, wird der Interface Contract definiert und abgenommen
4. **Automatisierte Quality Gates**: CI/CD prüft bei jedem Modul-Release:
   - Design-Conformance (Screenshot-Diff-Testing)
   - Accessibility (automatisierter WCAG-Scan)
   - Performance (Ladezeit < 2s, Memory-Budget)
   - Security (SAST, Dependency-Scan)
5. **Release-Entkopplung**: WebView-Module deployen unabhängig; Native Module im 2-Wochen-Zyklus

### 3.7  Technologie-Stack (Empfehlung)

| Ebene | Technologie | Begründung |
|-------|------------|-----------|
| **App-Shell (iOS)** | Swift / SwiftUI | Native Performance, Apple-Ökosystem |
| **App-Shell (Android)** | Kotlin / Jetpack Compose | Native Performance, Google-Ökosystem |
| **Cross-Platform Option** | Kotlin Multiplatform (KMP) | Shared Business Logic, native UI |
| **WebView-Engine** | WKWebView (iOS) / WebView (Android) | Standard, performant |
| **Micro-Frontends** | React + Module Federation | Bewährt für dezentrale Teams |
| **JS-Bridge** | Eigenes Protocol (JSON-RPC) | Typsicher, versioniert |
| **Design-System** | Eigene Library (Swift/Kotlin + Web) | Konsistenz, native Widgets |
| **Offline-DB** | SQLite / Realm | Mature, performant |
| **Kryptografie** | Secure Enclave / StrongBox | Hardware-gesicherte Schlüssel |
| **Push** | FCM (Android) / APNs (iOS) | Standard |
| **Analytics** | Matomo (self-hosted) | DSGVO-konform, kein Drittland |

---

## 4  Release-Strategie

### 4.1  Inkrementeller Rollout

| Phase | Zeitraum | Features |
|-------|---------|---------|
| **MVP (v1.0)** | Monat 0–6 | eID/PID, Wallet (Personalausweis), Postfach, 10 Top-Services (Umzug, Kfz, Personalausweis), KI-Assistent (Beta) |
| **v1.5** | Monat 6–9 | Payment, E-Signatur, Consent-Center, 50 weitere Services, Termine |
| **v2.0** | Monat 9–14 | Proaktive Services (Lebenslage-Engine), Behörden-Chat, Führerschein im Wallet, Vollmachten |
| **v2.5** | Monat 14–18 | Alle OZG-Services, Fachportal-WebViews, Datenexport, Offline-Bescheide |
| **v3.0** | Monat 18–24 | Gesundheitscredentials, Bildungscredentials, KI-Leichte-Sprache, Barrierefreiheits-Audit AA |

### 4.2  Erfolgskennzahlen

| KPI | Zielwert (nach 2 Jahren) |
|-----|-------------------------|
| **Downloads** | 30 Mio. (≈ 35% der Bevölkerung) |
| **Monatlich aktive Nutzer** | 15 Mio. |
| **App-Store-Bewertung** | ≥ 4,2 Sterne |
| **Durchschn. Antragsdauer** | < 5 Minuten |
| **Absprungrate** | < 15% |
| **Barrierefreiheit** | 100% WCAG 2.2 AA |
| **NPS** | ≥ 55 |

---

## 5  Abgrenzung: App vs. Web-Portal vs. Fachportale

```
                    ┌─────────────────────────────────┐
                    │     DEUTSCHLAND-APP              │
                    │     (Primärkanal Mobile)          │
                    │     · 100% Funktionsumfang       │
                    │     · Native UX                   │
                    │     · Offline-Fähigkeit           │
                    │     · Push, Wallet, Biometrie     │
                    └─────────────────┬───────────────┘
                                      │ identische APIs
                    ┌─────────────────▼───────────────┐
                    │     DEUTSCHLAND-PORTAL (Web)    │
                    │     · 100% Funktionsumfang       │
                    │     · Desktop-optimiert           │
                    │     · Barrierefreier Fallback     │
                    │     · Ohne App-Installation       │
                    └─────────────────┬───────────────┘
                                      │ SSO + APIs
              ┌───────────┬───────────┼───────────┐
              ▼           ▼           ▼           ▼
         ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐
         │ Steuer  │ │ Justiz  │ │ Gesund- │ │ Bildung │
         │ portal  │ │ portal  │ │ heits-  │ │ portal  │
         │         │ │         │ │ portal  │ │         │
         │ ELSTER  │ │         │ │ ePA etc │ │ BAföG   │
         └─────────┘ └─────────┘ └─────────┘ └─────────┘
                   Spezialisierte Fachportale
                   (via WebView in App integrierbar)
```

**Prinzip:** Die App kann alles, was das Web-Portal kann – und zusätzlich native Features (Wallet, NFC, Biometrie, Push, Offline). Fachportale werden in der App als WebView-Module eingebettet, sodass Nutzer:innen die App **niemals verlassen müssen**.

---

## 6  Zusammenfassung

Die Deutschland-App als Super-App ist **sinnvoll, realistisch und international erprobt**. Der Schlüssel liegt in:

1. **App-Shell + Module Federation**: Zentrale Shell für Navigation, Auth, Design; dezentrale Module für Funktionen
2. **Drei Integrationsmuster**: Native (Hardware), WebView (Content), API-only (Daten) – je nach Modul
3. **Strenger UX-Governance**: Design-System, Quality Gates, automatisierte Tests
4. **API-First**: Alle Logik lebt in den Building Blocks; die App ist eine Darstellungsschicht
5. **Inkrementeller Rollout**: MVP in 6 Monaten, Vollausbau in 24 Monaten
6. **Kein App-Sprung**: Fachportale werden als WebViews eingebettet; Payment, Signatur, Consent als native Sheets

Die dezentrale Pflege funktioniert über **verbindliche Module Interface Contracts**, ein **zentrales Design-System** und **automatisierte Quality Gates** – ähnlich wie große Plattform-Apps (Singpass, WeChat, Alipay) ihre Ökosysteme organisieren, aber **mit voller DSGVO-Compliance und Open Source**.
