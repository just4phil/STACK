# Schnittstellen zu Fachverfahren – Vollständige Integrationsstrategie

> **Version:** 1.0 · **Stand:** Februar 2026
> **Kontext:** Wie werden Fachverfahren über ein zentrales API-Gateway in die digitale Verwaltungsinfrastruktur eingebunden?

---

## 1  Ausgangslage

Fachverfahren sind die **operative Kernschicht** der deutschen Verwaltung. In ihnen werden Bürgeranträge bearbeitet, Bescheide erstellt und Verwaltungsentscheidungen getroffen. Aktuell arbeiten die meisten der 300+ Fachverfahren **isoliert**:

| Problem | Auswirkung |
|---------|-----------|
| **Keine standardisierten Schnittstellen** | Proprietäre Import-/Export-Mechanismen (CSV, XML, OSCI, Dateisystem) |
| **Kein Echtzeit-Status** | Bürger:innen können den Bearbeitungsstand nicht abfragen |
| **Kein digitaler Kommunikationskanal** | Rückfragen erfolgen per Brief oder Telefon |
| **Keine Registeranbindung** | Nachweise müssen vom Bürger manuell beigebracht werden |
| **Kein zentrales Routing** | Anträge werden per E-Mail, Fax oder Post an die Behörde übermittelt |
| **Kein Consent-Management** | Registerabfragen ohne nachvollziehbare Einwilligung |
| **Keine digitale Signatur** | Bescheide nur per Papier rechtsverbindlich |

---

## 2  Zielbild: API-Gateway als Vermittlungsschicht

```
┌──────────────────────────────────────────────────────────────────────┐
│  BÜRGER:INNEN                                                        │
│  Deutschland-App · Portal · Chatbot                                  │
└───────────────────────────┬──────────────────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    DIGITALE INFRASTRUKTUR                              │
│  ┌──────────┬───────────┬────────┬────────┬────────┬─────────┐       │
│  │ Identity │ Formulare │Postfach│Register│Consent │ Payment │       │
│  │ (BundID) │ (BB-02)   │(BB-03) │(NOOTS) │(BB-09) │ (BB-04) │       │
│  └──────────┴───────────┴────────┴────────┴────────┴─────────┘       │
│                            │                                          │
│                    ┌───────┴────────┐                                 │
│                    │  API-GATEWAY   │ ← Routing, Auth, Consent,       │
│                    │  (BB-07)       │   Rate-Limiting, Audit,         │
│                    └───────┬────────┘   Protokoll-Translation         │
│                            │                                          │
└────────────────────────────┼─────────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
     ┌──────────────┐ ┌────────────┐ ┌────────────┐
     │ Fachverfahren│ │ Fachverf.  │ │ Fachverf.  │
     │ A (nativ)    │ │ B (+Adapt.)│ │ C (Legacy) │
     │ Stack-Native │ │ Connected  │ │ + Adapter  │
     └──────────────┘ └────────────┘ └────────────┘
```

**Kernprinzip:** Fachverfahren kommunizieren **ausschließlich** über das API-Gateway mit der digitalen Infrastruktur. Sie sprechen nie direkt mit Registern, dem Postfach oder anderen Building Blocks.

---

## 3  Europäische Best Practices

### 3.1  Estland: X-Road – Das Referenzmodell

Estlands **X-Road** ist das weltweit erfolgreichste System für staatlichen Datenaustausch.

| Prinzip | Umsetzung |
|---------|-----------|
| **Dezentral** | Kein zentraler Datenspeicher. Jedes System behält seine Daten. X-Road vermittelt nur Abfragen. |
| **Bilateral verschlüsselt** | mTLS zwischen allen Teilnehmern. Jede Nachricht signiert und verschlüsselt. |
| **Auditierbar** | Jede Transaktion erhält einen Zeitstempel und wird in einem unveränderlichen Log gespeichert. |
| **Open Source** | X-Road ist vollständig Open Source (MIT-Lizenz). |
| **Föderierbar** | Trust Federation mit Finnland für grenzüberschreitenden Datenaustausch. |

**Übertragbar auf Deutschland:**
- API-Gateway als dezentraler Vermittler (kein zentraler Datenpool)
- Pflicht zu mTLS + Signierung aller Nachrichten
- Unveränderliches Audit-Log für jede Transaktion
- Open-Source-Referenzimplementierung

### 3.2  Finnland: Suomi.fi – API-First per Gesetz

Finnlands **Suomi.fi** ist eine Microservice-basierte Plattform (.NET, Docker), die konsequent auf REST-APIs setzt.

| Maßnahme | Wirkung |
|----------|---------|
| **REST-API-Pflicht ab 2025** | Neue Anbindungen nur noch über REST-API (WS, SFTP, SMTP eingestellt). Alle Systeme müssen bis 2027 migrieren. |
| **API-Manifesto** | Strategisches Dokument, das offene Standards, Developer Portals und API-Economy als staatliche Ziele definiert. |
| **Ontologie-Service** | Zentrale Ontologie sichert kohärente Datenstrukturen über alle Dienste. |
| **EU-Förderung** | Migration finanziert über Recovery and Resilience Facility. |

**Übertragbar auf Deutschland:**
- Harte Deadline für API-Migration
- API-Manifesto als strategisches Signal an Hersteller
- Nutzung von EU-Fördermitteln für Migration

### 3.3  Dänemark: NemLog-in – Federated Identity

Dänemarks **NemLog-in** ist ein zentraler Authentication-Broker für alle öffentlichen Dienste.

| Maßnahme | Wirkung |
|----------|---------|
| **Zentraler Broker** | Alle Behörden und Fachverfahren nutzen denselben Identity-Provider. |
| **NSIS-Compliance** | National Standard for Information Security als Pflicht für alle Anbindungen. |
| **Einfache + Erweiterte Integration** | Zwei Integrationspfade: Standard (einfach) oder Advanced (individualisierbare UX). |

**Übertragbar auf Deutschland:**
- BundID als zentraler Authentication-Broker (bereits vorhanden)
- Sicherheitsstandard als Pflichtvoraussetzung für API-Anbindung

### 3.4  Österreich: USP.gv.at – One-Stop-Shop

Österreichs **Unternehmensserviceportal (USP)** bietet über 150 Dienste über ein zentrales Portal.

| Maßnahme | Wirkung |
|----------|---------|
| **"Digital Austria Act" (2023)** | Gesetzliche Grundlage für Digitalisierungspflicht. |
| **USP als Identity Provider** | Einheitliche Unternehmens-Identität für alle Behördenkontakte. |
| **100% eID-Verfügbarkeit** | Bereits erreicht – jede:r kann sich digital identifizieren. |

**Übertragbar auf Deutschland:**
- Gesetzliche Grundlage für API-Pflicht schaffen (analog Digital Austria Act)
- eID flächendeckend verfügbar machen (BundID + EUDI Wallet)

### 3.5  Spanien: cl@ve – eIDAS-Federation seit 2015

Spaniens **cl@ve** ist eine föderierte Identity-Plattform, die seit 2015 verpflichtend für alle staatlichen Online-Dienste ist.

| Maßnahme | Wirkung |
|----------|---------|
| **Pflicht seit 2015** | Alle nationalen Online-Dienste müssen cl@ve nutzen. |
| **Cloud-basiertes Signing** | QES ohne Kartenleser – dramatisch niedrigere Hürde. |
| **eIDAS-Integration** | Grenzüberschreitende Identitätserkennung direkt eingebaut. |

**Übertragbar auf Deutschland:**
- Verpflichtende Nutzung des zentralen Identity-Systems für alle Fachverfahren
- Cloud-basierte Signatur senkt die Hürde für QES

### 3.6  EU: Interoperable Europe Act – Die neue Pflicht

Seit **Januar 2025** gilt: Alle öffentlichen Verwaltungen müssen bei neuen oder wesentlich geänderten digitalen Diensten eine **Interoperabilitätsbewertung** durchführen.

**Übertragbar auf Deutschland:**
- Fachverfahren, die nach 2025 beschafft oder geändert werden, **müssen** interoperable APIs anbieten – wegen EU-Recht.
- Dies ist der stärkste verfügbare regulatorische Hebel.

### 3.7  Zusammenfassung: Europäische Erfolgsformel

```
Erfolg = Gesetzliche Pflicht + Harte Deadline + Kostenlose Tools + Marktplatz + Open-Source-Alternativen
```

---

## 4  Die 5 Schnittstellengruppen

Jedes Fachverfahren, das über das API-Gateway angebunden wird, muss folgende Schnittstellengruppen implementieren:

### ① Antrags-Schnittstelle

| Endpunkt | Beschreibung |
|----------|-------------|
| `POST /antraege` | Antrag einreichen (strukturiertes JSON-LD, QES-signiert) |
| `GET /antraege/{id}` | Antragsstatus abfragen (inkl. Bearbeitungsstand) |
| `POST /antraege/{id}/docs` | Dokumente nachreichen (mit Hash-Validierung) |
| `GET /antraege/{id}/bescheid` | Bescheid abrufen (QES-signiertes PDF + VC) |

### ② Register-Schnittstelle

| Endpunkt | Beschreibung |
|----------|-------------|
| `POST /register/abfrage` | Registerabfrage initiieren (Once-Only-Prinzip) |
| `POST /register/antwort` | Register-Antwort empfangen (über NOOTS) |
| `POST /consent/validate` | Consent-Token des Bürgers validieren (DSGVO Art. 6/7) |

### ③ Status- & Event-Schnittstelle

| Endpunkt | Beschreibung |
|----------|-------------|
| `POST /callbacks` | Webhook für Statusänderungen registrieren |
| `POST /events` | CloudEvents publizieren (Status, Bescheid, Rückfrage) |
| `GET /health` | Verfügbarkeit und SLA-Status prüfen |

### ④ Kommunikations-Schnittstelle

| Endpunkt | Beschreibung |
|----------|-------------|
| `POST /nachrichten` | Nachricht vom Bürger empfangen (Rückfrage, Nachreichung) |
| `POST /nachrichten/{id}/antwort` | Behördenantwort an Bürger senden |
| `GET /nachrichten/{antragsId}` | Nachrichtenverlauf zu einem Antrag abrufen |

### ⑤ Verwaltungs-Schnittstelle

| Endpunkt | Beschreibung |
|----------|-------------|
| `GET /leistungen` | Angebotene Verwaltungsleistungen (FIM-IDs) |
| `GET /statistiken` | Bearbeitungszeiten und Auslastung |

---

## 5  Datenfluss: Antrag Ende-zu-Ende

```
Bürger:in                  API-Gateway              Fachverfahren
    │                          │                          │
    │  1. Antrag ausfüllen     │                          │
    │  2. Consent erteilen     │                          │
    │  3. QES signieren        │                          │
    │─────────────────────────►│                          │
    │                          │  4. Auth (mTLS+OAuth2.0) │
    │                          │  5. Routing (FIM-ID→DVDV)│
    │                          │─────────────────────────►│
    │                          │                          │
    │                          │  6. Registerabfrage      │
    │                          │◄─────────────────────────│
    │                          │──► Register (NOOTS)       │
    │                          │◄── Register-Antwort       │
    │                          │─────────────────────────►│
    │                          │                          │
    │                          │  7. Bearbeitung           │
    │                          │     (ggf. Sachbearbeiter)  │
    │                          │                          │
    │                          │  8. Status-Update         │
    │                          │◄─────────────────────────│
    │  9. Push-Notification    │     (CloudEvent)          │
    │◄─────────────────────────│                          │
    │                          │                          │
    │                          │  10. Bescheid (QES)       │
    │                          │◄─────────────────────────│
    │  11. Bescheid+VC→Wallet  │                          │
    │◄─────────────────────────│                          │
```

| Schritt | Akteur | Aktion | Building Block |
|---------|--------|--------|---------------|
| 1 | Bürger:in | Antrag ausfüllen (adaptives Formular) | BB-02 |
| 2 | Bürger:in | Consent erteilen (Registerabfrage) | BB-09 |
| 3 | Bürger:in | Antrag qualifiziert signieren (QES via EUDI Wallet) | BB-10, BB-05 |
| 4 | API-Gateway | Authentifizierung (mTLS + OAuth 2.0) | BB-07 |
| 5 | API-Gateway | Routing: FIM-ID + DVDV → zuständiges Fachverfahren | BB-07 |
| 6 | FV → Gateway → Register | Registerabfrage mit Consent-Token (Once-Only) | BB-06, BB-09 |
| 7 | Fachverfahren | Sachbearbeitung (ggf. mit Rückfragen über ④) | — |
| 8 | FV → Gateway | CloudEvent: Status geändert | BB-08 |
| 9 | System → Bürger:in | Push-Notification + E-Mail + Postfach | BB-03 |
| 10 | Fachverfahren | Bescheid erstellen (QES-signiert) | BB-10 |
| 11 | System → Bürger:in | Bescheid ins Postfach + Verifiable Credential ins Wallet | BB-03, BB-05 |

---

## 6  Datenformate

### 6.1  Antrags-Format (JSON-LD)

```json
{
  "@context": "https://schema.verwdigistack.de/v1/antrag",
  "@type": "Antrag",
  "fimLeistungsId": "99345001002000",
  "antragsteller": {
    "pid": "urn:eudi:pid:DE:...",
    "consentToken": "eyJhbGciOiJFUzI1NiJ9..."
  },
  "formData": { "...fachspezifische Daten..." },
  "anhaenge": [
    {
      "typ": "Vermieterbestätigung",
      "url": "https://dms.verwdigistack.de/docs/abc123",
      "hash": "sha256:a1b2c3..."
    }
  ],
  "signatur": {
    "typ": "QES",
    "signedHash": "...",
    "zertifikat": "urn:eudi:wallet:DE:qes:..."
  },
  "metadaten": {
    "eingangsdatum": "2031-03-15T10:30:00Z",
    "kanal": "deutschland-app",
    "zielBehoerde": "urn:dvdv:bund:bmi:bva:meldewesen:berlin-mitte"
  }
}
```

### 6.2  Status-Event (CloudEvents)

```json
{
  "specversion": "1.0",
  "type": "de.verwdigistack.antrag.status.geaendert",
  "source": "urn:fachverfahren:meldewesen:berlin-mitte",
  "id": "evt-2031-03-17-001",
  "time": "2031-03-17T14:00:00Z",
  "datacontenttype": "application/json",
  "data": {
    "antragsId": "ANT-2031-03-15-4711",
    "statusAlt": "in_bearbeitung",
    "statusNeu": "beschieden",
    "bescheidVerfuegbar": true
  }
}
```

### 6.3  Nachrichten-Format

```json
{
  "@context": "https://schema.verwdigistack.de/v1/nachricht",
  "@type": "Nachricht",
  "antragsId": "ANT-2031-03-15-4711",
  "absender": { "typ": "buerger", "pid": "urn:eudi:pid:DE:..." },
  "betreff": "Rückfrage zu fehlender Vermieterbestätigung",
  "inhalt": "Ich habe die Bestätigung nun hochgeladen.",
  "anhaenge": [],
  "zeitstempel": "2031-03-16T09:15:00Z",
  "kanal": "deutschland-app"
}
```

---

## 7  Das API-Gateway als Orchestrator

Das API-Gateway (BB-07) übernimmt die zentrale Vermittlung zwischen digitaler Infrastruktur und Fachverfahren:

| Funktion | Beschreibung |
|----------|-------------|
| **Routing** | FIM-Leistungs-ID + DVDV-Eintrag → zuständiges Fachverfahren |
| **Authentifizierung** | mTLS + OAuth 2.0-Token-Validierung. Nur registrierte Fachverfahren dürfen kommunizieren. |
| **Autorisierung** | RBAC/ABAC: Darf dieses Fachverfahren dieses Register abfragen? |
| **Consent-Enforcement** | Vor jeder Registerabfrage: gültiger Consent-Token vorhanden? |
| **Protokoll-Translation** | XÖV/OSCI → REST/JSON-LD für Legacy-Systeme (über Adapter) |
| **Rate-Limiting** | Schutz vor Überlastung einzelner Systeme |
| **Retry & Circuit-Breaker** | Automatische Wiederholung bei temporären Fehlern. Dead-Letter-Queue bei dauerhaften Fehlern. |
| **Audit-Logging** | Jede Transaktion revisionssicher protokolliert (BSI TR-ESOR) |
| **Monitoring** | OpenTelemetry-Traces für jede Transaktion. Echtzeit-Dashboard für Verfügbarkeit. |

### Sicherheitsregeln

1. **Kein Fachverfahren darf direkt auf Register zugreifen** – nur über das API-Gateway.
2. **Jede Registerabfrage erfordert einen Consent-Token** – das Gateway validiert.
3. **Alle Kommunikation ist mTLS-verschlüsselt** – kein unverschlüsselter Traffic.
4. **Jede Transaktion wird auditiert** – unveränderliches Log mit Zeitstempel.
5. **Fehlende Autorisierung = HTTP 403** – kein Silent Fail.

### Sicherheitsarchitektur

```
┌───────────────┐     mTLS      ┌───────────────┐     mTLS      ┌───────────────┐
│ Fachverfahren │◄─────────────►│  API-Gateway   │◄─────────────►│   Register    │
│               │  OAuth 2.0    │                │  OAuth 2.0    │   (NOOTS)     │
│               │  Consent-Tok. │  ┌──────────┐  │  Consent-Tok. │               │
│               │               │  │ Policy   │  │               │               │
│               │               │  │ Engine   │  │               │               │
│               │               │  └──────────┘  │               │               │
└───────────────┘               └───────┬────────┘               └───────────────┘
                                        │
                                  Audit-Log
                                  (BSI TR-ESOR)
```

---

## 8  Querschnittsanforderungen

Neben den Schnittstellengruppen gelten folgende übergreifende Anforderungen für jede Fachverfahren-Anbindung:

| Anforderung | Standard | Beschreibung |
|-------------|----------|-------------|
| **Once-Only-Prinzip** | OZG 2.0, SDG-VO | Daten aus Registern automatisch vorausfüllen, nie erneut abfragen |
| **Qualifizierte Elektronische Signatur** | eIDAS 2.0, VDG | Bescheide als QES-signierte PDFs. Cloud-QES über EUDI Wallet. |
| **Verifiable Credentials** | W3C VC, eIDAS 2.0 | Bescheide zusätzlich als VC ins EUDI-Wallet ausstellen |
| **e-Payment** | XFinanz, ePayBL | Gebührenpflichtige Leistungen über Payment-BB abrechnen |
| **Privacy by Design** | DSGVO | Datensparsamkeit, Zweckbindung, Löschfristen in der API verankert |
| **Barrierefreiheit** | WCAG 2.2 AA, BFSG | Alle UI-Anteile der Kommunikation barrierefrei |
| **Multi-Kanal-Benachrichtigungen** | — | Push, E-Mail, SMS, Postfach – proaktive Benachrichtigung bei Statusänderungen |
| **Maschinenlesbare Datenformate** | JSON-LD, XÖV | Verwaltungs-Ontologie (FIM) für interoperable Datenstrukturen |
| **Event-Driven Architecture** | CloudEvents 1.0 | Statusänderungen als Events statt Polling |
| **Interoperabilitätsbewertung** | Interoperable Europe Act | Ab 2025 Pflicht bei neuen oder geänderten digitalen Diensten |

---

## 9  Herstellermotivation: 5 Strategische Hebel

### Das Problem

Fachverfahrenshersteller haben heute **keinen wirtschaftlichen Anreiz**, standardisierte APIs zu implementieren:
- Bestehende Kunden können nicht wechseln (Lock-in)
- API-Integration wird als Extra-Kostenstelle behandelt (50.000–500.000 EUR)
- Modernisierung kannibalisiert das Lizenzmodell

### Die europäische Erkenntnis

| Ansatz | Länder | Funktioniert? |
|--------|--------|--------------|
| **Gesetzliche Pflicht + Tools** | 🇫🇮 Finnland, 🇪🇸 Spanien, 🇪🇺 EU | ✅ Ja – mit Fristen und Unterstützung |
| **Zentrale Plattform** | 🇪🇪 Estland, 🇫🇮 Finnland | ✅ Ja – senkt Integrationskosten |
| **Open Source als Druckmittel** | 🇪🇪 Estland | ✅ Ja – schafft Alternativen |
| **Nur Regulierung ohne Enabler** | Diverse EU-Versuche | ❌ Nein – bleibt auf Papier |

### Die 5 Hebel

#### 📜 Hebel 1: Rechtliche Basis

> **Interoperable Europe Act** (seit Jan. 2025): Alle neuen digitalen Dienste müssen interoperabel sein – EU-Recht, nicht optional.

- Stack-Konformität als **MUSS-Kriterium** bei Neubeschaffungen (Vergaberecht)
- Übergangsfrist: 3 Jahre für Stufe 1, 5 Jahre für Stufe 2
- Klare Definition: Was genau bedeutet "Stack-konform"? → Die 5 Schnittstellengruppen

#### 🔧 Hebel 2: Kostenlose Enabler-Tools

> „Wir machen es so einfach wie möglich, konform zu werden."

| Tool | Beschreibung |
|------|-------------|
| **Stack-Connect-Adapter-SDK** | Open Source (Apache 2.0), Legacy-Anbindung per YAML, kein Programmieraufwand |
| **Conformance-Test-Suite** | CLI-Tool (`stack-test run --level 2`), automatischer Test aller APIs |
| **Sandbox-Umgebung** | Vollständige Testumgebung mit Mock-APIs aller Building Blocks |
| **Developer-Portal** | Dokumentation, Tutorials, Referenzimplementierungen, API-Explorer |

#### 🏪 Hebel 3: Stack-Marktplatz

> „Stack-konform = Zugang zu 11.000 Behörden."

- Nur zertifizierte Fachverfahren werden gelistet
- Bewertungssystem durch Behörden → Transparenz und Wettbewerb
- Behörden können erstmals **Alternativen vergleichen**

#### 💰 Hebel 4: Wirtschaftliche Anreize

| Altes Modell | Neues Modell |
|-------------|-------------|
| Lizenz + individuelle Anbindungen | SaaS + Pay-per-Transaction |
| Jede Behörde einzeln angebunden | Einmal zertifizieren → alle erreichbar |
| On-Premises (50-60% Marge) | SaaS/Cloud (70-80% Marge) |

- **Migrationszuschüsse:** 50% der Kosten für die ersten 3 Jahre (Bund + Länder)
- **EU-Förderung** über Digital Europe Programme und Recovery and Resilience Facility

#### 🌱 Hebel 5: Open-Source-Referenzimplementierungen

> „Wir bauen funktionierende Alternativen – die Hersteller müssen besser sein."

Für die 10 häufigsten Fachverfahrensdomänen werden vollständig funktionsfähige Open-Source-Fachverfahren bereitgestellt. Diese können von Behörden direkt eingesetzt werden → Wettbewerbsdruck.

---

## 10  Migrationspfad: 3 Konformitätsstufen

| Stufe | Name | Anforderungen | Zeitrahmen |
|-------|------|---------------|-----------|
| **🥉 Stufe 1** | Stack-Connected | Adapter-Layer (SDK-basiert). 5 Kern-Endpunkte via Adapter. YAML-Konfiguration. | 2026–2027 |
| **🥈 Stufe 2** | Stack-Native | APIs nativ implementiert. CloudEvents, Consent, Kommunikationskanal integriert. Echtzeit-Status. | 2027–2029 |
| **🥇 Stufe 3** | Stack-Cloud-Native | SaaS, Multi-Tenant, API-First. Container (K8s), Auto-Scaling. SLA 99,9%. | 2029–2031 |

### Zeitplan

```
2026          2027          2028          2029          2030          2031
 │             │             │             │             │             │
 ├─ Specs + SDK veröff.      │             │             │             │
 ├─ Sandbox live             │             │             │             │
 │             ├─ Marktplatz live          │             │             │
 │             ├─ Vergabe: Stufe 1 Pflicht │             │             │
 │             │             ├─ 30% konform│             │             │
 │             │             ├─ Vergabe: Stufe 2 Pflicht │             │
 │             │             │             ├─ 60% konform│             │
 │             │             │             │             ├─ 80% konform│
 │             │             │             │             │   ├─ Stufe 3│
 │             │             │             │             │   │  empfohl.│
```

---

## 11  Zusammenfassung

| Dimension | Ergebnis |
|-----------|---------|
| **Architektur** | API-Gateway als einziger Kommunikationsweg für Fachverfahren. Kein direkter Register-Zugriff. |
| **Sicherheit** | mTLS + OAuth 2.0 + Consent-Enforcement + QES + Audit-Logging (BSI TR-ESOR) |
| **Schnittstellen** | 5 Gruppen: Antrag, Register, Status/Events, Kommunikation, Verwaltung |
| **Datenformate** | JSON-LD mit Verwaltungs-Ontologie (FIM), CloudEvents für Status, XÖV-Kompatibilität |
| **Querschnitt** | Once-Only, e-Payment, VCs, Barrierefreiheit, Privacy by Design, Interoperable Europe Act |
| **Europa zeigt** | Erfolg = Gesetzliche Pflicht + kostenlose Tools + Marktplatz + Open-Source-Alternativen |
| **Motivation** | 5 Hebel: Recht, Enabler-Tools, Marktplatz, Wirtschaft, Open Source |
| **Migration** | 3 Stufen: Connected → Native → Cloud-Native (2026–2031) |
