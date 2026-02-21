# Fachverfahren-Strategie: Ende-zu-Ende-Digitalisierung & Ökosystem-Design

> **Version:** 1.0 · **Stand:** Februar 2026  
> **Kontext:** Wie integriert man 300+ Fachverfahren in den VerwDigiStack und motiviert Hersteller zur Konformität?

---

## 1  Problemanalyse: Warum Fachverfahren der eigentliche Engpass sind

### 1.1  Der Status quo

Die Fachverfahrenslandschaft in Deutschland ist das **größte Hindernis** für eine nutzerzentrierte Verwaltung:

| Problem | Auswirkung |
|---------|-----------|
| **300+ verschiedene Fachverfahren** | Prosoz (Soziales), VOIS (Meldewesen), OK.* (Finanzen), Civento, TevisGo (Termine), ADVIS (Ausländerbehörde), FriVer (Friedhof), etc. |
| **Veraltete Technologie** | Client-Server (Windows-Fat-Clients), On-Premises, proprietäre Datenbanken, keine APIs |
| **Vendor Lock-in** | Hersteller kontrollieren Datenformate, Schnittstellen und Betriebsumgebung |
| **Kein Wettbewerb** | Wechselkosten prohibitiv hoch → Behörden sind gefangen |
| **Schnittstellen als Profit-Center** | Hersteller verlangen 5- bis 6-stellige Beträge für API-Anbindungen |
| **Heterogener Betrieb** | IT-Dienstleister müssen für jedes Fachverfahren eigene Server, VMs, Netzwerke betreiben |
| **Medienbrüche** | Antrag kommt digital, wird ausgedruckt, im Fachverfahren manuell erfasst, Bescheid per Post |

### 1.2  Der Medienbruch visualisiert

```
HEUTE (mit Medienbruch):
Bürger:in ──► Online-Formular ──► E-Mail/PDF ──► Sachbearbeiter:in ──► DRUCKT AUS
                                                                          │
                                                        tippt in Fachverfahren ein
                                                                          │
                                                              Bescheid drucken
                                                                          │
                                                                  Brief per Post
                                                                          │
                                                                    Bürger:in 📬

ZIELBILD (Ende-zu-Ende digital):
Bürger:in ──► Deutschland-App ──► API-Gateway ──► BPM-Engine ──► Fachverfahren-API
                                                                         │
                                                              Automatische Prüfung
                                                                         │
                                                              Bescheid (QES-signiert)
                                                                         │
                                                               API-Gateway ──► Postfach
                                                                         │
                                                           Bürger:in 📱 (Push-Notification)
```

### 1.3  Warum „einfach APIs vorschreiben" nicht funktioniert

1. **Kein Marktdruck**: Behörden können nicht wechseln → Hersteller haben keinen Anreiz
2. **Investitionsschutz**: Behörden haben Millionen in bestehende Systeme investiert
3. **Kapazitätsengpass**: Hersteller haben nicht die Entwicklerkapazität für schnelle Umstellung
4. **Fehlende Standards**: Ohne klare API-Specs weiß niemand, was „API-fähig" heißt
5. **Regulierungslücke**: Es gibt keine Rechtsgrundlage, Hersteller zu API-Konformität zu verpflichten

---

## 2  Die Lösung: Stack-Konformitätsmodell

### 2.1  Kernidee

> **Wir machen Stack-Konformität zum Wettbewerbsvorteil, nicht zur Pflicht.**
> Das Ökosystem erzeugt den Druck: Nur Stack-konforme Produkte können am Deutschland-Portal und der Deutschland-App teilnehmen.

### 2.2  Das Schichtenmodell der Integration

```
┌──────────────────────────────────────────────────────────────────────┐
│  SCHICHT 1: STACK-CONNECT-ADAPTER (Übergangslösung)                 │
│  Für Bestandssysteme: Adapter-Layer vor das Fachverfahren            │
│  · Screen-Scraping / RPA als Notlösung                              │
│  · Datenbankbrücke (read-only) für Statusabfragen                   │
│  · OSCI/XÖV → REST-Translator                                       │
│  · Betrieb durch IT-DL oder Hersteller                              │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│  SCHICHT 2: STACK-NATIVE-API (Zielzustand)                          │
│  Fachverfahren implementiert Stack-APIs direkt                       │
│  · OpenAPI 3.1 Endpunkte                                            │
│  · CloudEvents für Status-Updates                                    │
│  · OAuth 2.0 / mTLS                                                 │
│  · Consent-Token-Validierung                                        │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│  SCHICHT 3: STACK-CLOUD-NATIVE (Optimal)                            │
│  Fachverfahren ist Cloud-native, Container-basiert, Multi-Tenant     │
│  · SaaS-Modell mit API-First-Architektur                            │
│  · Automatisches Scaling                                             │
│  · Zentrale Bereitstellung über DVC                                  │
└──────────────────────────────────────────────────────────────────────┘
```

### 2.3  Die drei Konformitätsstufen

| Stufe | Name | Anforderung | Nutzererlebnis | Betrieb |
|-------|------|-------------|----------------|---------|
| **🥉 Stufe 1** | Stack-Connected | Adapter-Layer; Antrag rein, Bescheid raus | ⚠️ Teilweise digital; Rückmeldung verzögert | Legacy-Betrieb + Adapter |
| **🥈 Stufe 2** | Stack-Native | Implementiert Stack-APIs direkt; Echtzeit-Status | ✅ Ende-zu-Ende digital; Statusverfolgung | Flexibel (On-Prem oder Cloud) |
| **🥇 Stufe 3** | Stack-Cloud-Native | SaaS, Multi-Tenant, Containerized, API-First | ✅ Optimale UX; Skalierung; proaktive Features | DVC oder zugelassene Cloud |

---

## 3  Stack-Connect-API: Die universelle Fachverfahrens-Schnittstelle

### 3.1  Die 7 Pflicht-APIs

Jedes Fachverfahren, das am Stack teilnehmen will, muss mindestens 7 standardisierte API-Endpunkte implementieren:

```
┌──────────────────────────────────────────────────────────────┐
│              STACK-CONNECT API (Pflicht-APIs)                │
│                                                              │
│  1. POST /antraege            ← Antrag einreichen           │
│  2. GET  /antraege/{id}       ← Antragsstatus abfragen      │
│  3. POST /antraege/{id}/docs  ← Dokumente nachreichen       │
│  4. GET  /antraege/{id}/bescheid  ← Bescheid abrufen        │
│  5. POST /callbacks           ← Webhook für Statusänderung  │
│  6. GET  /leistungen          ← Leistungskatalog (FIM-ID)   │
│  7. GET  /health              ← Verfügbarkeit               │
│                                                              │
│  Optional (Stufe 2+):                                        │
│  8. POST /antraege/{id}/nachfrage  ← Rückfrage an Bürger    │
│  9. GET  /statistiken         ← Bearbeitungszeiten          │
│  10. POST /consent/validate   ← Consent-Token prüfen        │
│  11. POST /events             ← CloudEvents publizieren     │
└──────────────────────────────────────────────────────────────┘
```

### 3.2  Der Ende-zu-Ende-Flow

```
┌──────┐    ┌────────┐    ┌────────┐    ┌────────┐    ┌────────────────┐
│Bürger│───►│Deutsch- │───►│  API-  │───►│  BPM-  │───►│ Fachverfahren  │
│:in   │    │land-App │    │Gateway │    │Engine  │    │ (Stack-Connect)│
└──────┘    └────────┘    └────────┘    └────────┘    └───────┬────────┘
                                                              │
   Schritt 1: Antrag ausfüllen (Formular-Engine BB-02)        │
   Schritt 2: Consent erteilen (Consent BB-09)                │
   Schritt 3: Daten aus Registern abrufen (NOOTS BB-06)       │
   Schritt 4: Antrag signieren (QES BB-10)                    │
   Schritt 5: Antrag an BPM-Engine (BB-11)                    │
   Schritt 6: BPM ruft POST /antraege beim Fachverfahren      │
   Schritt 7: Fachverfahren verarbeitet ◄─────────────────────┘
   Schritt 8: Fachverfahren sendet Webhook → BPM-Engine
   Schritt 9: BPM sendet Bescheid → Postfach (BB-03)
   Schritt 10: Push-Notification → Bürger:in (BB-14)

  ┌──────────────────────────────────────────────────────┐
  │ Ergebnis: Bürger:in macht 5 Min. aktive Interaktion │
  │ Fachverfahren bekommt strukturierten Antrag via API  │
  │ Kein Medienbruch. Kein PDF. Kein Ausdruck.          │
  └──────────────────────────────────────────────────────┘
```

### 3.3  Antrags-Datenformat

Statt proprietärer Formate ein einheitliches JSON-LD-Schema:

```json
{
  "@context": "https://schema.verwdigistack.de/v1/antrag",
  "@type": "Antrag",
  "fimLeistungsId": "99345001002000",
  "fimProzessId": "99345001002000_01",
  "antragsteller": {
    "idnr": "02 476 291 358",
    "pid": "urn:eudi:pid:DE:...",
    "consentToken": "eyJhbGciOiJFUzI1NiJ9..."
  },
  "formData": {
    "zweck": "Ummeldung Hauptwohnsitz",
    "neueAdresse": {
      "strasse": "Musterstraße 42",
      "plz": "10115",
      "ort": "Berlin"
    }
  },
  "anhänge": [
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
    "prioritaet": "normal",
    "absenderBehoerde": null,
    "zielBehoerde": "urn:dvdv:bund:bmi:bva:meldewesen:berlin-mitte"
  }
}
```

### 3.4  Bescheid-Rückformat

```json
{
  "@context": "https://schema.verwdigistack.de/v1/bescheid",
  "@type": "Bescheid",
  "antragsId": "ANT-2031-03-15-4711",
  "status": "bewilligt",
  "bescheidDatum": "2031-03-17T14:00:00Z",
  "bescheidPDF": "https://dms.verwdigistack.de/bescheide/xyz789",
  "bescheidSignatur": {
    "typ": "QualifiziertesSiegel",
    "ausstellendeBehoerde": "Bezirksamt Berlin-Mitte",
    "signiert": true
  },
  "verifiableCredential": {
    "typ": "Meldebescheinigung",
    "vcUrl": "https://wallet.verwdigistack.de/vc/issue/..."
  },
  "rechtsmittelbelehrung": {
    "frist": "P30D",
    "stelle": "Verwaltungsgericht Berlin"
  }
}
```

---

## 4  Ökosystem-Design: Wie motiviert man Hersteller?

### 4.1  Das Problem der fehlenden Motivation

Fachverfahrenshersteller haben heute **keinen wirtschaftlichen Anreiz**, Stack-APIs zu implementieren:

- Bestehende Kunden können nicht wechseln → kein Wettbewerbsdruck
- API-Integration als **Extra-Kostenstelle** (50.000–500.000 EUR pro Anbindung)
- Jede Behörde verhandelt individuell → kein skalierender Anreiz
- Modernisierung kannibalisiert das bestehende Lizenzmodell

### 4.2  Die 7 Hebel zur Motivation

#### Hebel 1: 🏪 Stack-Marktplatz (Pull-Anreiz)

> **„Wer Stack-konform ist, bekommt Zugang zu allen Behörden Deutschlands."**

```
┌──────────────────────────────────────────────────────────────┐
│                 STACK-MARKTPLATZ                              │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 🥇 Civento   │  │ 🥇 OpenMelde │  │ 🥈 ADVIS     │      │
│  │ Stack-Native │  │ Cloud-Native │  │ Stack-Native │      │
│  │ Meldewesen   │  │ Meldewesen   │  │ Ausländer-   │      │
│  │ ★★★★★ (4,8) │  │ ★★★★☆ (4,3) │  │ behörde      │      │
│  │ 47 Behörden  │  │ 12 Behörden  │  │ ★★★★☆ (4,1) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  Filter: [Stufe 1+] [Stufe 2+] [Stufe 3 Cloud-Native]      │
│  Sortierung: [Bewertung] [Behörden-Anzahl] [Preis]          │
└──────────────────────────────────────────────────────────────┘
```

**Mechanik:**
- Jede Behörde kann Fachverfahren über den Stack-Marktplatz beziehen
- Nur **Stack-zertifizierte** Produkte werden gelistet
- **Bewertungssystem** durch Behörden → Transparenz über Qualität
- Hersteller sehen: „Wenn ich Stack-konform bin, erreiche ich 11.000 Behörden"
- **Wettbewerb** wird sichtbar: Behörden können erstmals Alternativen vergleichen

#### Hebel 2: 📜 Vergaberecht-Kopplung (Push-Anreiz)

> **„Ab 2028 dürfen Behörden nur noch Stack-konforme Fachverfahren beschaffen."**

- **Vergaberechtsänderung**: Stack-Konformität als Vergabekriterium (MUSS-Anforderung)
- **Bestandsschutz**: Bestehende Verträge laufen aus; Nachfolge muss Stack-konform sein
- **Migrationszuschuss**: Bund finanziert 50% der Migrationskosten für erste 3 Jahre
- **Übergangsfrist**: 3 Jahre für Stufe 1; 5 Jahre für Stufe 2

#### Hebel 3: 🧪 Stack-Conformance-Test-Suite (Enabler)

> **„Wir machen es Herstellern so einfach wie möglich, Stack-konform zu werden."**

```
┌──────────────────────────────────────────────────────────────┐
│              STACK CONFORMANCE TEST SUITE                     │
│                                                              │
│  ┌─────────────────────────────────────┐                    │
│  │  $ stack-test run --level 2         │                    │
│  │                                     │                    │
│  │  ✅ API-01: POST /antraege          │ PASS               │
│  │  ✅ API-02: GET /antraege/{id}      │ PASS               │
│  │  ✅ API-03: POST /antraege/{id}/docs│ PASS               │
│  │  ✅ API-04: GET /bescheid           │ PASS               │
│  │  ✅ API-05: POST /callbacks         │ PASS               │
│  │  ✅ API-06: GET /leistungen         │ PASS               │
│  │  ✅ API-07: GET /health             │ PASS               │
│  │  ✅ AUTH-01: OAuth 2.0              │ PASS               │
│  │  ✅ AUTH-02: mTLS                   │ PASS               │
│  │  ❌ CONSENT-01: Token-Validierung   │ FAIL               │
│  │  ⚠️ EVENT-01: CloudEvents          │ OPTIONAL (Stufe 3) │
│  │                                     │                    │
│  │  Ergebnis: 9/10 Pflicht-Tests ✅    │                    │
│  │  Stack-Konformität: Stufe 2 (fast!)│                    │
│  └─────────────────────────────────────┘                    │
│                                                              │
│  • Open Source (Apache 2.0)                                  │
│  • CLI + CI/CD-Integration (GitHub Actions, GitLab CI)      │
│  • Sandbox-Umgebung mit Mock-APIs aller BBs                 │
│  • Kostenlos für Hersteller                                  │
└──────────────────────────────────────────────────────────────┘
```

#### Hebel 4: 🔌 Stack-Connect-Adapter-SDK (Enabler)

> **„Für Legacy-Systeme: ein fertiger Adapter, der den Rest erledigt."**

```
Fachverfahren (Legacy)
       │
       ▼
┌──────────────────────────────────────┐
│  STACK-CONNECT-ADAPTER               │
│                                      │
│  ┌──────────────┐  ┌──────────────┐ │
│  │ Inbound      │  │ Outbound     │ │
│  │ REST → XML   │  │ DB → REST    │ │
│  │ JSON → OSCI  │  │ File → API   │ │
│  │ WebHook ←    │  │ Event →      │ │
│  └──────────────┘  └──────────────┘ │
│                                      │
│  Konfigurieren statt Programmieren:  │
│  · YAML-Mappings (Feld → Feld)      │
│  · SQL-Queries für Statusabfragen    │
│  · Filesystem-Watch für Bescheide    │
│  · OSCI-Bridge für XÖV-Systeme      │
│                                      │
│  Betrieb: Container (Docker/K8s)     │
│  Lizenz: Open Source (Apache 2.0)    │
└──────────────────────────────────────┘
       │
       ▼
  API-Gateway (BB-07)
```

**Was der Adapter kann:**
- **Inbound**: REST-Anfragen in das proprietäre Format des Fachverfahrens übersetzen (XML, OSCI, Datei, DB-Insert)
- **Outbound**: Statusänderungen aus dem Fachverfahren lesen (DB-Polling, Datei-Watch, Message-Queue) und als REST-Response / Webhook / CloudEvent weiterleiten
- **Bescheid-Extraktion**: Fertige Bescheide aus dem Fachverfahren extrahieren und im Stack-Format bereitstellen
- **Konfigurierbar**: Feld-Mappings per YAML; keine Programmierung nötig
- **Open Source**: Behörden und Hersteller können den Adapter kostenlos nutzen

#### Hebel 5: 💰 Wirtschaftliches Ökosystem

> **„Stack-Konformität schafft ein neues Geschäftsmodell für Hersteller."**

| Altes Modell | Neues Modell |
|-------------|-------------|
| Lizenz + Wartung + individuelle Anbindungen | SaaS + Pay-per-Transaction + Stack-Marktplatz |
| Vendor Lock-in sichert Umsatz | Marktplatz-Reichweite sichert Umsatz |
| Jede Behörde einzeln verhandeln | Einmal zertifizieren → 11.000 Behörden erreichbar |
| API-Integration als Zusatzgeschäft | API ist Standard → Kernprodukt ist besser |
| On-Premises pro Behörde | Multi-Tenant Cloud → Margensteigerung |
| Wechselkosten = Burggraben | UX-Qualität = Burggraben |

**Wirtschaftliche Anreize:**
1. **Transaktionsbasierte Vergütung**: Fachverfahren werden pro abgewickeltem Antrag bezahlt (Pay-per-Use statt Lizenz)
2. **Skalierung durch Marktplatz**: Ein Produkt erreicht alle Behörden → höhere Stückzahlen, niedrigere Stückkosten
3. **Weniger Support**: Standardisierte APIs = weniger individuelle Integration = niedrigere Supportkosten
4. **Cloud-Marge**: SaaS-Modelle haben 70–80% Bruttomarge vs. 50–60% bei On-Premises-Lizenzen
5. **Neue Player**: Marktplatz senkt Eintrittsbarriere → Start-ups können einsteigen → Innovation

#### Hebel 6: 🏆 Stack-Zertifizierungsprogramm

> **„Zertifizierung schafft Vertrauen und Sichtbarkeit."**

| Zertifizierungsstufe | Anforderung | Vorteile |
|---------------------|-------------|---------|
| **🥉 Stack-Connected** | 7 Pflicht-APIs implementiert; Conformance-Test bestanden | Listung im Marktplatz; Basis-Badge |
| **🥈 Stack-Native** | + OAuth 2.0, Consent-Token, CloudEvents, WCAG 2.2 AA | Bevorzugte Listung; Empfehlung |
| **🥇 Stack-Cloud-Native** | + Multi-Tenant SaaS, Container, Auto-Scaling, SLA 99,9% | Premium-Listung; „Empfohlen"-Badge; Prioritäts-Support |

**Zertifizierungsprozess:**
1. Hersteller führt **Conformance-Test-Suite** (automatisiert) durch
2. Ergebnisse werden beim **Stack-Conformance-Board** eingereicht
3. Board prüft Ergebnisse + führt **Pen-Test + UX-Review** durch (für Stufe 2+)
4. Zertifikat gültig für **2 Jahre**; jährliches Re-Testing
5. Kosten: **Stufe 1 kostenlos**; Stufe 2: 5.000 EUR; Stufe 3: 15.000 EUR

#### Hebel 7: 🌱 Open-Source-Referenzimplementierungen

> **„Wir zeigen, wie es geht – und senken die Eintrittsbarriere für neue Player."**

Für die 20 häufigsten Fachverfahrensdomänen erstellt der Stack **Open-Source-Referenzimplementierungen**:

| Domäne | Referenz-Fachverfahren | Zweck |
|--------|----------------------|-------|
| Meldewesen | `stack-ref-meldewesen` | Ummeldung, Abmeldung, Meldebestätigung |
| KfZ-Zulassung | `stack-ref-kfz` | Zulassung, Abmeldung, Halterwechsel |
| Gewerbe | `stack-ref-gewerbe` | Gewerbeanmeldung, -abmeldung, -ummeldung |
| Personenstand | `stack-ref-standesamt` | Geburt, Ehe, Sterbefall |
| Baurecht | `stack-ref-baugenehmigung` | Bauantrag, -genehmigung |
| Aufenthaltsrecht | `stack-ref-aufenthalt` | Aufenthaltstitel, Visum |
| Sozialleistungen | `stack-ref-sozial` | Bürgergeld, Wohngeld, Grundsicherung |
| Führerschein | `stack-ref-fuehrerschein` | Antrag, Umtausch, Internationaler FS |

**Strategie:**
- Referenzimplementierungen sind **vollständig funktionsfähig** (nicht nur Stubs)
- Lizenz: **EUPL oder Apache 2.0**
- Können von Behörden direkt eingesetzt werden → Druck auf proprietäre Hersteller
- Können von Herstellern als **Template** für eigene Produkte genutzt werden
- Die **Conformance-Test-Suite** testet gegen diese Referenzimplementierungen

---

## 5  Governance & Organisation

### 5.1  Governance-Strukturen

```
┌─────────────────────────────────────────────────────────────────┐
│                  STACK-GOVERNANCE-BOARD                          │
│  (BMI, FITKO, Landes-CIOs, Kommunale Spitzenverbände)          │
│                                                                  │
│  Aufgaben:                                                       │
│  · Stack-API-Spezifikationen verabschieden                      │
│  · Vergaberecht-Empfehlungen formulieren                        │
│  · Roadmap und Priorisierung                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
   ┌──────────────┐ ┌────────────┐ ┌────────────────┐
   │ Stack-Tech-  │ │ Conformance│ │ Marktplatz-    │
   │ Team         │ │ Board      │ │ Team           │
   │              │ │            │ │                │
   │ · API-Specs  │ │ · Zerti-   │ │ · Marktplatz   │
   │ · Adapter-SDK│ │   fizierung│ │ · Bewertungen  │
   │ · Referenz-  │ │ · Test-    │ │ · Hersteller-  │
   │   implemen-  │ │   Suite    │ │   Onboarding   │
   │   tierungen  │ │ · Audits   │ │ · Analytics    │
   │ · Sandbox    │ │            │ │                │
   └──────────────┘ └────────────┘ └────────────────┘
            ▲              ▲              ▲
            │              │              │
   ┌────────┴──────────────┴──────────────┴──────────┐
   │         HERSTELLER-COMMUNITY                     │
   │  · Open-Source-Beiträge                          │
   │  · API-Feedback                                   │
   │  · Interop-Tests                                  │
   │  · Jährliche Stack-Konferenz                      │
   └──────────────────────────────────────────────────┘
```

### 5.2  Migration: Der 4-Phasen-Plan für Bestandssysteme

| Phase | Zeitraum | Maßnahme | Ergebnis |
|-------|---------|----------|---------|
| **Phase 1** | 2026–2027 | Stack-Connect-API-Spec veröffentlichen; Adapter-SDK bereitstellen; Sandbox aufbauen | Hersteller können testen; erste Adapter für Top-10-Fachverfahren |
| **Phase 2** | 2027–2028 | Marktplatz starten; Vergabekriterium „Stack-Stufe 1" einführen; Migrationszuschüsse | 30% der Fachverfahren Stack-Connected; erste Wettbewerber sichtbar |
| **Phase 3** | 2028–2029 | Vergabekriterium „Stack-Stufe 2"; Referenzimplementierungen für Top-20; Cloud-Migration | 60% Stack-Native; erste Cloud-Native-Angebote auf Marktplatz |
| **Phase 4** | 2029–2031 | Vergabekriterium „Stack-Stufe 3" empfohlen; Legacy-Systeme nur noch mit Ausnahmegenehmigung | 80%+ Stack-konform; lebendiger Marktplatz mit Wettbewerb |

### 5.3  Finanzierungsmodell

| Posten | Geschätzte Kosten | Finanzierung |
|--------|------------------|-------------|
| Stack-Tech-Team (20 FTE, 4 Jahre) | 40 Mio. EUR | Bund |
| Conformance-Infrastruktur | 5 Mio. EUR | Bund |
| Marktplatz-Entwicklung | 10 Mio. EUR | Bund |
| Adapter-SDK + Referenzimplementierungen | 15 Mio. EUR | Bund + EU (Digital Europe Programme) |
| Migrationszuschüsse für Hersteller | 100 Mio. EUR (3 Jahre) | Bund + Länder |
| Migrationszuschüsse für Behörden | 200 Mio. EUR (3 Jahre) | Bund + Länder + EU (RRF) |
| **Gesamt** | **~370 Mio. EUR** | |

**ROI-Berechnung:**
- 11.000 Behörden × ∅ 500.000 EUR jährliche Fachverfahrenskosten = **5,5 Mrd. EUR/Jahr**
- Durch Wettbewerb, SaaS-Migration und Standardisierung: **20–30% Kostenreduktion möglich**
- Potenzielle Einsparung: **1,1–1,6 Mrd. EUR/Jahr**
- ROI der Investition: **< 6 Monate**

---

## 6  Fachverfahrens-Domänen: Priorisierung

### 6.1  Priorisierung nach Nutzervolumen × Digitalisierungspotenzial

| Prio | Domäne | Volumen/Jahr | Ist-Zustand | Quick Win? |
|------|--------|-------------|-------------|-----------|
| 🔴 1 | **Meldewesen** (Ummeldung) | 9,5 Mio. | VOIS, OK.EWO | ✅ Ja |
| 🔴 2 | **KfZ-Zulassung** | 15 Mio. | OK.VERKEHR, IKOL-Kfz | ✅ Ja |
| 🔴 3 | **Personalausweis / Reisepass** | 10 Mio. | BMS, ZEVIS | ⚠️ Mittel |
| 🔴 4 | **Gewerbe** (An-/Ummeldung) | 750.000 | Gewerbemeldung online | ✅ Ja |
| 🔴 5 | **Elterngeld** | 1,8 Mio. | ELAN, ElterngeldDigital | ⚠️ Mittel |
| ⚠️ 6 | **Wohngeld** | 1,2 Mio. | WoGG, Diverse | ⚠️ Mittel |
| ⚠️ 7 | **Führerschein** | 2,5 Mio. | AVIS, Fahrerlaubnis | ⚠️ Mittel |
| ⚠️ 8 | **Aufenthaltsrecht** | 3 Mio. | ADVIS, AZR | 🔴 Komplex |
| ⚠️ 9 | **Baugenehmigung** | 400.000 | ProBauG, XBau | 🔴 Komplex |
| ⚠️ 10 | **Standesamt** (Geburt, Ehe) | 2 Mio. | AutiSta, Personenstand | ⚠️ Mittel |
| 11 | Bürgergeld / ALG | 5,5 Mio. | ALLEGRO, coLei | 🔴 Sehr komplex |
| 12 | Steuererklärung | 42 Mio. | ELSTER | ✅ Bereits digital |
| 13 | Grundsteuer | 36 Mio. | ELSTER Grundsteuer | ✅ Bereits digital |
| … | Friedhofsverwaltung, Jagdschein, Fischereischein, etc. | Gering | Diverse | Long Tail |

### 6.2  Migrationsstrategie: „Die Top 10 zuerst"

```
Jahr 1 (2026–2027):     Jahr 2 (2027–2028):     Jahr 3+ (2028–2031):
─────────────────       ─────────────────       ─────────────────
Meldewesen              Personalausweis         Bürgergeld
KfZ-Zulassung           Elterngeld              Aufenthaltsrecht
Gewerbe                 Wohngeld                Baugenehmigung
ELSTER (bereits ✅)     Führerschein            Alle weiteren
                        Standesamt
```

---

## 7  Zusammenfassung

### Das Gesamtbild

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│     BÜRGER:INNEN                                                    │
│         │                                                           │
│    Deutschland-App / Portal                                         │
│         │                                                           │
│    ┌────┴─────────────────────────────────────────────────┐        │
│    │             VERWDIGISTACK PLATTFORM                   │        │
│    │  Identity · Portal · Postfach · Wallet · BPM · KI    │        │
│    │  API-Gateway · Event-Bus · Consent · Payment         │        │
│    └────┬─────────────────────────────────────────────────┘        │
│         │                                                           │
│    STACK-CONNECT API (7 Pflicht-Endpunkte)                         │
│         │                                                           │
│    ┌────┴─────────────────────────────────────────────────┐        │
│    │                FACHVERFAHREN                          │        │
│    │                                                       │        │
│    │  🥇 Cloud-Native    🥈 Stack-Native    🥉 + Adapter  │        │
│    │  (SaaS, API-First)  (eigene APIs)     (Legacy + SDK) │        │
│    │                                                       │        │
│    │  ┌──────────────────────────────────────────┐        │        │
│    │  │            STACK-MARKTPLATZ               │        │        │
│    │  │  Zertifiziert · Bewertet · Vergleichbar  │        │        │
│    │  └──────────────────────────────────────────┘        │        │
│    └───────────────────────────────────────────────────────┘        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Die 7 Hebel

1. **🏪 Marktplatz** → Pull: „Stack-konform = 11.000 Behörden erreichbar"
2. **📜 Vergaberecht** → Push: „Nur Stack-konform beschaffbar"
3. **🧪 Test-Suite** → Enabler: „Konformität prüfen in 5 Minuten"
4. **🔌 Adapter-SDK** → Enabler: „Legacy anbinden in Tagen, nicht Monaten"
5. **💰 Wirtschaftsmodell** → Pull: „SaaS-Marge > On-Prem-Lizenz"
6. **🏆 Zertifizierung** → Signal: „Vertrauen und Sichtbarkeit"
7. **🌱 Referenzimplementierungen** → Druck: „Open Source als Alternative"

### Erwartetes Ergebnis

| Zeitpunkt | Zielbild |
|-----------|---------|
| **Ende 2027** | Top-3-Fachverfahren Stack-Connected; Marktplatz live; Adapter-SDK verfügbar |
| **Ende 2028** | 30% aller Fachverfahren Stack-konform; erste Cloud-Native-Angebote; Vergaberecht angepasst |
| **Ende 2029** | 60% Stack-konform; lebendiger Wettbewerb auf Marktplatz; 3+ neue Anbieter |
| **Ende 2031** | 80%+ Stack-konform; SaaS-Modelle dominieren; Behörden können Anbieter frei wählen |
