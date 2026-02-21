# Zielbild 2031: Nutzerzentrierte Digitale Verwaltung

> **Version:** 1.0 · **Stand:** Februar 2026  
> **Perspektive:** Bürger:innen, Unternehmen, Verwaltungsmitarbeitende  
> **Zeithorizont:** 5 Jahre (2031)

---

## 1  Vision

> *Im Jahr 2031 erledigen Bürger:innen und Unternehmen alle Behördenangelegenheiten digital – jederzeit, von überall, in Minuten statt Wochen. Der Staat kommt zu den Menschen, nicht umgekehrt.*

Digitale Verwaltung 2031 bedeutet:

- **Ein Portal, eine App – alles drin.** Das *Deutschland-Portal* und die *Deutschland-App* sind der zentrale Zugang zu allen staatlichen Leistungen. Egal ob Geburtsurkunde, Gewerbeanmeldung, Baugenehmigung oder Elterngeld – alles startet am selben Ort.
- **Proaktiv statt reaktiv.** Der Staat meldet sich, wenn Leistungen zustehen – nicht die Bürger:innen müssen wissen, was sie beantragen können.
- **Einmal sagen reicht.** Daten, die der Verwaltung bereits vorliegen, werden nie erneut abgefragt. Das Once-Only-Prinzip ist vollständig umgesetzt.
- **Datensouverän und transparent.** Bürger:innen kontrollieren jederzeit, wer welche Daten warum nutzt – und können Einwilligungen granular steuern.
- **Barrierefrei und inklusiv.** Jeder Dienst ist WCAG 2.2 AA-konform, in Leichter Sprache verfügbar und funktioniert auch mit assistiven Technologien.

---

## 2  Nutzererlebnis – „Ein Tag im Jahr 2031"

### 2.1  Szenario: Geburt eines Kindes

```
┌──────────────────────────────────────────────────────────────────┐
│                        LEBENSEREIGNIS                            │
│                    „Geburt eines Kindes"                         │
│                                                                  │
│  1. Standesamt meldet Geburt digital                             │
│  2. Deutschland-App sendet Push-Benachrichtigung:                │
│     „Herzlichen Glückwunsch! Folgende Leistungen stehen Ihnen   │
│      zu. Möchten Sie diese jetzt beantragen?"                   │
│     ☑ Elterngeld    ☑ Kindergeld    ☑ Kinderreisepass           │
│     ☑ Kinderzuschlag (einkommensabhängig prüfen)                │
│                                                                  │
│  3. Ein Klick → EUDI Wallet bestätigt Identität (Fingerabdruck)│
│  4. Consent-Dialog: „Folgende Daten werden für den Antrag       │
│     verwendet: [Name, Geburtsdatum Kind, Einkommen, Steuer-ID]. │
│     Quelle: Melderegister, Finanzamt. Gültig für: diesen Antrag.│
│     [Alle bestätigen] [Einzeln prüfen] [Ablehnen]"             │
│  5. Im Hintergrund:                                              │
│     · NOOTS ruft Daten aus Registern ab (Once-Only)              │
│     · BPM-Engine orchestriert 4 parallele Anträge               │
│     · KI prüft Anspruchsberechtigung und schlägt Beträge vor   │
│     · Sachbearbeiter:in prüft KI-Vorschlag (Human-in-Loop)    │
│  6. Nach 48h: Bescheide im Deutschland-Postfach                 │
│     · QES-signierte PDF-Bescheide                                │
│     · Elterngeld-Credential im EUDI Wallet                      │
│     · Kindergeld startet automatisch ab Folgemonat               │
│                                                                  │
│  Gesamtdauer Bürgerperspektive: 5 Minuten aktive Interaktion    │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2  Szenario: Gewerbeanmeldung

| Schritt | Nutzererlebnis | Im Hintergrund |
|---------|---------------|----------------|
| 1 | Nutzer:in öffnet Deutschland-App → „Gewerbe anmelden" | – |
| 2 | Identifizierung per EUDI Wallet (Personalausweis-Credential) | Identity-BB validiert VCs |
| 3 | Formular ist vorausgefüllt (Name, Adresse, Steuer-ID) | NOOTS ruft Melde- & Finanzregister ab |
| 4 | Consent-Dialog: „Gewerbeamt erhält [Daten]. Gültig: 30 Tage." | Consent-BB speichert Record |
| 5 | Nutzer:in ergänzt nur: Tätigkeit, Betriebsstätte, Rechtsform | Portal-BB: adaptives Formular |
| 6 | Qualifizierte Signatur via EUDI Wallet | E-Signatur-BB (QES) |
| 7 | Push: „Gewerbeschein liegt im Postfach vor" (nach 24h) | BPM orchestriert; KI prüft |

### 2.3  Szenario: Umzug

1. **Deutschland-App** → „Umzug melden"
2. **Neue Adresse** eingeben – das ist die *einzige* neue Information
3. **Consent**: „Folgende Stellen werden informiert: Einwohnermeldeamt, Finanzamt, Kfz-Zulassung, Rundfunkbeitrag, gesetzl. Krankenkasse"
4. **Ein Klick** → alle Behörden erhalten die neue Adresse automatisch
5. **Neuer Personalausweis**: Adress-Update im EUDI Wallet (Remote-Update, kein Behördengang)
6. **Optional**: Ummeldung Kfz, Schulwechsel-Antrag – werden proaktiv angeboten

---

## 3  Zentrale Nutzerprinzipien

### 3.1  Kanal-Strategie

```
┌──────────────────────────────────────────────────────────────────────┐
│                         KANAL-ARCHITEKTUR                            │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │              DEUTSCHLAND-PORTAL (Web)                         │   │
│  │     Vollzugang zu ALLEN staatlichen Leistungen               │   │
│  │     Desktop-optimiert, Responsive, WCAG 2.2 AA               │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │              DEUTSCHLAND-APP (iOS / Android)                  │   │
│  │     Selbe Inhalte wie Portal, optimiert für Mobile           │   │
│  │     Push-Benachrichtigungen, Wallet-Integration, Biometrie   │   │
│  │     Offline-Fähigkeit für wichtige Dokumente/Credentials     │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │              SPEZIALISIERTE FACHPORTALE (max. 5–8)           │   │
│  │     · Justizportal (Klagen, Registerauszüge)                 │   │
│  │     · ELSTER/Steuerportal (Steuererklärung)                  │   │
│  │     · Gesundheitsportal (ePA, Impfpass)                      │   │
│  │     · Unternehmensportal (komplexe Genehmigungen)            │   │
│  │     · Bildungsportal (BAföG, Studienplatz)                   │   │
│  │     ─────────────────────────────────────────                │   │
│  │     Alle via SSO + Identity-BB angebunden                    │   │
│  │     Gleiche UX-Patterns, gleiche Datenquellen                │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │              ASSISTENZSYSTEME                                 │   │
│  │     · KI-Chatbot (im Portal + App)                           │   │
│  │     · Telefonische Auskunft (KI-unterstützt)                 │   │
│  │     · Vor-Ort-Terminale (für digitale Teilhabe)              │   │
│  └───────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

### 3.2  Nutzerkonto – „Mein Deutschland-Konto"

Jede/r Bürger:in und jedes Unternehmen hat ein zentrales Konto mit:

| Bereich | Funktionalität |
|---------|---------------|
| **Dashboard** | Übersicht laufender Anträge, Fristen, ausstehende Aktionen |
| **Postfach** | Alle Behördennachrichten und Bescheide an einem Ort |
| **Wallet** | EUDI Wallet mit Personalausweis, Führerschein, Qualifikationen, Bescheide als VCs |
| **Datenübersicht** | Welche Behörde hat welche Daten? Wann abgerufen? (DSGVO-Auskunft live) |
| **Consent-Center** | Alle erteilten Einwilligungen einsehen, widerrufen, granular anpassen |
| **Dokumentenablage** | Eigene Dokumente hochladen; ausgestellte Bescheide archivieren |
| **Vollmachten** | Digitale Vertretungsvollmachten (Eltern↔Kinder, Betreuung, Unternehmen) |
| **Lebenslage-Finder** | „Was steht mir zu?" – KI-gestützter Lebenslage-Assistent |

### 3.3  DSGVO – Datenschutz als Feature, nicht als Hindernis

Die DSGVO wird konsequent als **Vertrauens-Feature** implementiert:

| DSGVO-Prinzip | Umsetzung im Zielbild |
|---------------|----------------------|
| **Zweckbindung** (Art. 5(1)b) | Jede Datenverwendung zeigt **exakt** den Zweck; Daten werden nach Zweckerfüllung automatisch gelöscht |
| **Datenminimierung** (Art. 5(1)c) | Formulare fragen nur das gesetzlich Notwendige; NOOTS ruft nur die minimal erforderlichen Registerfelder ab |
| **Transparenz** (Art. 12–14) | Live-Dashboard: „Wer hat wann welche Daten von mir abgerufen?" im Mein-Konto |
| **Auskunftsrecht** (Art. 15) | Ein-Klick-Datenauskunft: vollständige Übersicht aller gespeicherten Daten in Sekundenbruchteilen |
| **Berichtigung** (Art. 16) | Fehlerhafte Daten direkt im Konto melden → automatisierter Korrektur-Workflow |
| **Löschung** (Art. 17) | Lösch-Anträge im Konto; automatische Prüfung gegen Aufbewahrungsfristen → sofortige Löschung wo möglich |
| **Einwilligung** (Art. 7) | Consent-Center: granulare Checkboxen pro Zweck, pro Behörde, pro Datenkategorie; jederzeit widerrufbar |
| **Datenübertragbarkeit** (Art. 20) | Export aller eigenen Daten in maschinenlesbarem Format (JSON-LD) |
| **Privacy by Design** (Art. 25) | Alle BBs sind von Grund auf datenschutzfreundlich; Verschlüsselung, Pseudonymisierung, minimale Zugriffsrechte |
| **Auftragsverarbeitung** (Art. 28) | Vollständige Transparenz über Unterauftragnehmer; kein Datenabfluss in Drittstaaten |

### 3.4  Proaktive Verwaltung

```
       ┌─────────────────────────────┐
       │   LEBENSEREIGNIS-ENGINE     │
       │                             │
       │  Registerdaten → KI-Analyse │
       │         ↓                   │
       │  „Welche Leistungen stehen  │
       │   dieser Person zu?"        │
       │         ↓                   │
       │  Proaktive Benachrichtigung │
       │  via App / Postfach         │
       │         ↓                   │
       │  Vorausgefüllter Antrag     │
       │  (1-Klick-Einreichung)      │
       └─────────────────────────────┘
```

**Beispiele proaktiver Dienste:**
- **Geburt**: Automatischer Hinweis auf Elterngeld, Kindergeld, Kinderzuschlag
- **18. Geburtstag**: Wahlbenachrichtigung, Hinweis auf Personalausweis-Erneuerung
- **Umzug**: Angebot zur automatischen Ummeldung bei allen relevanten Stellen
- **Renteneintritt**: Frühzeitige Information über Rentenansprüche, Formulare vorausgefüllt
- **Unternehmensgründung**: Checkliste aller Pflichten, vorbereitete Anträge
- **Ablaufende Dokumente**: Rechtzeitige Erinnerung (Ausweis, Führerschein, Genehmigungen)

---

## 4  Erforderliche Komponenten

### 4.1  Komponentenübersicht

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           NUTZER-LAYER                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────────────┐  │
│  │ Deutschland-     │  │ Deutschland-App  │  │ Spezialisierte       │  │
│  │ Portal (Web)     │  │ (iOS / Android)  │  │ Fachportale          │  │
│  └────────┬─────────┘  └───────┬──────────┘  └──────────┬────────────┘  │
│           └──────────────┬─────┘                        │               │
│                          │ einheitliche API-Schicht      │               │
├──────────────────────────┴───────────────────────────────┴───────────────┤
│                          ERLEBNIS-LAYER                                  │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │  Lebenslage-Engine          KI-Assistent / Chatbot                 │ │
│  │  Proaktiver Service         Personalisierung (mit Consent)         │ │
│  │  Dashboard & Antragstracker UX-Design-System (gemeinsame Patterns)│ │
│  └─────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────┤
│                          BUILDING-BLOCK-LAYER                           │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────┐ ┌─────────────────┐ │
│  │ Identity│ │ Portal &│ │Postfach │ │ Payment  │ │ EUDI Wallet     │ │
│  │ (BundID)│ │ Formular│ │         │ │(ePayment)│ │                 │ │
│  ├─────────┤ ├─────────┤ ├─────────┤ ├──────────┤ ├─────────────────┤ │
│  │ NOOTS   │ │ Consent │ │E-Signat.│ │ BPM /    │ │ DMS / E-Akte    │ │
│  │(Register│ │ Mgmt    │ │ (QES)   │ │ Workflow │ │                 │ │
│  ├─────────┤ ├─────────┤ ├─────────┤ ├──────────┤ ├─────────────────┤ │
│  │ KI/AI-  │ │Semantik/│ │ CMS    │ │Benachr.- │ │ Termin / Sched. │ │
│  │ Gateway │ │Knowl.Gr.│ │         │ │ Service  │ │                 │ │
│  └─────────┘ └─────────┘ └─────────┘ └──────────┘ └─────────────────┘ │
├──────────────────────────────────────────────────────────────────────────┤
│                          INTEGRATION-LAYER                               │
│  ┌─────────────────┐ ┌──────────────┐ ┌────────────────────────────────┐│
│  │ API-Gateway /   │ │ Event-Bus    │ │ Semantic Mediator /            ││
│  │ Info. Mediator   │ │ (CloudEvents)│ │ Linked Data Service            ││
│  └─────────────────┘ └──────────────┘ └────────────────────────────────┘│
├──────────────────────────────────────────────────────────────────────────┤
│                          PLATTFORM-LAYER                                 │
│  IAM · Secret Mgmt · Policy Engine · SIEM · Monitoring (OTel)          │
├──────────────────────────────────────────────────────────────────────────┤
│                          INFRASTRUKTUR-LAYER                             │
│  Kubernetes · Container Runtime · Sovereign Cloud (SCS/Gaia-X)          │
└──────────────────────────────────────────────────────────────────────────┘
```

### 4.2  Komponentendetails

#### Nutzer-Layer (Frontend-Komponenten)

| Komponente | Beschreibung | Besonderes |
|-----------|-------------|------------|
| **Deutschland-Portal** | Zentrales Webportal für alle Verwaltungsleistungen | Single Page Application; Design-System; WCAG 2.2 AA |
| **Deutschland-App** | Native App (iOS/Android) mit identischem Leistungsumfang | Offline-Fähigkeit; Push; Wallet-Integration; Biometrie |
| **Fachportale** (5–8) | Spezialisierte Portale für Justiz, Steuern, Gesundheit, Wirtschaft, Bildung | Eingebettet via SSO; gleiche UX-Patterns und BB-APIs |
| **KI-Assistent** | Conversational AI im Portal und in der App | Lebenslage-Beratung; Formularausfüllhilfe; Statusauskunft |
| **Vor-Ort-Terminale** | Digitale Terminals in Bürgerämtern, Bibliotheken etc. | Für digitale Teilhabe; betreute Nutzung; Barcode/QR-Scan |
| **UX-Design-System** | Einheitliche Komponentenbibliothek (Buttons, Forms, Farben, Patterns) | Sichert konsistente Nutzererfahrung über alle Kanäle |

#### Erlebnis-Layer (Experience-Komponenten)

| Komponente | Beschreibung | Besonderes |
|-----------|-------------|------------|
| **Lebenslage-Engine** | Orchestriert proaktive Dienste auf Basis von Lebensereignissen | Rules-Engine + KI; erkennt Ansprüche; triggert Anträge |
| **Personalisierungsservice** | Personalisierte Dashboards, kontextbezogene Vorschläge | Consent-basiert; keine Profilbildung ohne Einwilligung |
| **Antragstracker** | Statusverfolgung aller laufenden Anträge in Echtzeit | Push-Updates; geschätzte Bearbeitungszeit; nächste Schritte |
| **Barrierefreiheits-Layer** | Leichte Sprache, Gebärdensprache-Video, Screen Reader-Optimierung | Automatische Übersetzung in Leichte Sprache via KI |

#### Building-Block-Layer (Die bestehenden + zu ergänzenden BBs)

| BB | Rolle im Zielbild | Nutzereffekt |
|----|-------------------|-------------|
| **BB-01 Identity** | Single Sign-On, eID, Unternehmensidentität | Eine Anmeldung für alles |
| **BB-02 Portal & Formular** | Adaptive Formulare, Vorausfüllung aus Registern | Kurze, intelligente Formulare |
| **BB-03 Postfach** | Zentraler Bescheideingang, Multi-Kanal-Benachrichtigung | Alle Behördenpost an einem Ort |
| **BB-04 Payment** | Gebührenbezahlung, Erstattungen | Sofort bezahlen, Erstattung aufs Konto |
| **BB-05 EUDI Wallet** | Personalausweis, Führerschein, Bescheide als VCs | Ausweisen per Smartphone |
| **BB-06 NOOTS** | Registerabruf (Once-Only) | Keine doppelte Dateneingabe |
| **BB-07 API-Gateway** | Routing, Rate-Limiting, Service-Governance | Schnelle, stabile Antwortzeiten |
| **BB-08 Event-Bus** | Asynchrone Entkopplung, Echtzeit-Events | Sofortige Statusupdates |
| **BB-09 Consent** | Granulare Einwilligungsverwaltung | Volle Kontrolle über eigene Daten |
| **BB-10 E-Signatur** | QES für Anträge und Bescheide | Rechtsgültig unterschreiben per App |
| **BB-11 BPM/Workflow** | Antragsorchestrierung, parallele Bearbeitung | Schnellere Bearbeitung |
| **BB-12 KI/AI-Gateway** | Chatbot, Formularassistenz, Anspruchsprüfung | Intelligente Hilfe, weniger Fehler |
| **BB-13 CMS** *(neu)* | Content-Plattform für Portal und App | Aktuelle, barrierefreie Informationen |
| **BB-14 Notification** *(neu)* | Push, SMS, E-Mail, Postfach – Multi-Kanal | Proaktive Erinnerungen |
| **BB-15 Scheduler** *(neu)* | Terminbuchung bei Behörden | Online-Terminvergabe |
| **BB-16 DMS/E-Akte** *(neu)* | Dokumentenmanagement, Behördenakte | Alle Dokumente digital, revisionssicher |
| **BB-17 Knowledge Graph** *(neu)* | Semantische Vernetzung, Leistungskatalog, FIM/XÖV | KI-Readiness, automatische Zuordnung |

#### Integration-Layer

| Komponente | Rolle | Warum zwingend |
|-----------|-------|---------------|
| **API-Gateway / Info. Mediator** | Einheitlicher Zugangspunkt für alle BBs | Sicherheit, Governance, Observability |
| **Event-Bus** | Asynchrone Kommunikation zwischen BBs | Entkopplung, Echtzeit-Updates |
| **Semantic Mediator** | Übersetzt zwischen verschiedenen Datenstandards | FIM ↔ XÖV ↔ OOTS ↔ EU-Formate |

#### Plattform- & Infrastruktur-Layer

| Komponente | Rolle |
|-----------|-------|
| **IAM** | Zentrale Zugriffsverwaltung für alle Services |
| **Secret Management** | Sichere Schlüssel- und Zertifikatsverwaltung |
| **Policy Engine** | Zero-Trust-Policies, DSGVO-Regeln |
| **SIEM & Monitoring** | Sicherheitsmonitoring, Angriffserkennung |
| **OpenTelemetry** | End-to-End-Tracing über alle BBs |
| **Sovereign Cloud** | Souveräne Cloud-Infrastruktur (SCS/Gaia-X) |

---

## 5  DSGVO-Architektur im Detail

### 5.1  Consent-Architektur

```
  Nutzer:in                  Consent-BB              BB-06 NOOTS
     │                           │                        │
     ├── "Elterngeld beantragen" │                        │
     │                           │                        │
     │◄─ Consent-Dialog ─────────┤                        │
     │   „Benötigte Daten:       │                        │
     │    - Name, Geburt (Melde- │                        │
     │      register)            │                        │
     │    - Einkommen (Finanzamt)│                        │
     │    Zweck: Elterngeld-     │                        │
     │    berechnung             │                        │
     │    Gültigkeit: 90 Tage"   │                        │
     │                           │                        │
     ├── [Bestätigen] ──────────►│                        │
     │                           ├── Consent-Token ──────►│
     │                           │   (enthält Scope,      │
     │                           │    Zweck, TTL)         │
     │                           │                        │
     │                           │◄── Daten (minimal) ────┤
     │                           │    (nur bewilligte     │
     │                           │     Felder)            │
     │                           │                        │
     │◄── Audit-Eintrag ─────────┤                        │
     │   „Register X hat Daten Y │                        │
     │    für Zweck Z abgerufen  │                        │
     │    am TT.MM.JJJJ"        │                        │
```

### 5.2  Datensouveränitäts-Dashboard

Im „Mein Konto"-Bereich sehen Bürger:innen jederzeit:

- ✅ **Erteilte Einwilligungen** – pro Zweck, Behörde, Datenkategorie; mit Widerrufbutton
- 📋 **Datenabruf-Protokoll** – Welche Behörde hat wann welche Daten abgerufen?
- 🗑 **Lösch-Anträge** – Status offener Löschanfragen; Aufbewahrungsfristen anzeigen
- 📤 **Datenexport** – Alle eigenen Daten als JSON-LD herunterladen
- 🔔 **Benachrichtigungen** – Alert bei jedem neuen Datenzugriff (optional konfigurierbar)

---

## 6  Nutzererlebnis-Qualitätskriterien

| Kriterium | Zielwert 2031 | Messmethode |
|-----------|--------------|-------------|
| **Time-to-Service** | < 5 min für Standardanträge | Median der Antragsdauer |
| **Einmal-Interaktion** | 80% aller Anträge ohne Nachforderung | Nachforderungsquote |
| **Proaktive Angebote** | Für 20 Lebensereignisse verfügbar | Lebensereignis-Katalog |
| **Barrierefreiheit** | 100% WCAG 2.2 AA; 50% AAA | Automatisierter + manueller Audit |
| **Nutzerzufriedenheit** | NPS ≥ 60 | Halbjährliche Befragung |
| **Erreichbarkeit** | 99,9% Verfügbarkeit | Uptime-Monitoring |
| **Mobile Nutzung** | ≥ 60% Anträge über App | Analytics (anonymisiert) |
| **Consent-Transparenz** | 100% der Datenzugriffe protokolliert | Audit-Log-Vollständigkeit |
| **Bearbeitungsdauer** | Median < 5 Werktage | End-to-End-Tracking |

---

## 7  Von Heute zum Zielbild – Enabler

| # | Enabler | Warum nötig |
|---|---------|-------------|
| 1 | **Einheitliches Design-System** | Konsistente UX über alle Kanäle und Fachportale |
| 2 | **Vollständige NOOTS-Anbindung** aller relevanten Register | Once-Only nur wenn alle Register angeschlossen |
| 3 | **Lebensereignis-Katalog** (standardisiert, maschinenlesbar) | Basis für proaktive Dienste und KI |
| 4 | **EUDI Wallet-Rollout** (breite Nutzerbasis) | Identifizierung und Credentials in der App |
| 5 | **Consent-Management** als Infrastrukturdienst | DSGVO-Compliance; Nutzervertrauen |
| 6 | **KI-Modelle** für Leichte Sprache, Anspruchsprüfung, Chatbot | Inklusion und Proaktivität |
| 7 | **BPM-Engine** mit Standard-Fachverfahrensprozessen | Automatisierung und Parallelisierung |
| 8 | **Semantischer Leistungskatalog** (Knowledge Graph) | KI kann Leistungen finden und zuordnen |
| 9 | **Mandantenfähige Plattform** | Ein Portal, eine Codebasis, alle „Mandanten" (Bund/Land/Kommune) |
| 10 | **Organisationsübergreifende E-Akte** | Behördenübergreifende Bearbeitung ohne Medienbruch |

---

## 8  Zusammenfassung

Das Zielbild 2031 beschreibt eine Verwaltung, die:

1. **Unsichtbar wird** – Bürger:innen interagieren mit einem einzigen digitalen Zugang
2. **Proaktiv handelt** – Der Staat erkennt Ansprüche und bietet sie an
3. **Daten schützt** – DSGVO wird zur Vertrauensgrundlage, nicht zum Hindernis
4. **Schnell reagiert** – Minuten statt Wochen für Standardvorgänge
5. **Niemanden ausschließt** – Barrierefrei, mehrsprachig, assistenztechnologie-kompatibel
6. **Wettbewerb ermöglicht** – Offene Schnittstellen, austauschbare Komponenten, Open Source

Die 17 Building Blocks des Verwaltungsdigitalisierungs-Stacks sind das technische Fundament, das dieses Nutzererlebnis ermöglicht. Jeder Block trägt zu einer spezifischen Eigenschaft des Zielbilds bei – und ist durch offene, verbindliche Schnittstellen jederzeit austauschbar.
