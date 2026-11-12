window.QUESTIONS.push(
  {
    id: "kn09-01",
    topic: "KN09 Kostenberechnungen",
    text: "Welches Migrationsmodell entspricht Rehosting (Lift & Shift), und welches Servicemodell ist das Ziel?",
    options: [
      "Rehosting, Ziel PaaS",
      "Rehosting, Ziel SaaS",
      "Rehosting, Ziel IaaS: Die Applikation zieht mit minimalen Anpassungen auf virtuelle Server in der Cloud",
      "Rehosting, Ziel FaaS"
    ],
    correct: [2],
    explanation: "Rehosting ist der Umzug auf VMs (IaaS), wie ein Umzug, bei dem die Möbel unverändert in die neue Wohnung kommen."
  },
  {
    id: "kn09-02",
    topic: "KN09 Kostenberechnungen",
    text: "Welches Migrationsmodell passt zu: Wir ersetzen unsere selbst gehostete MariaDB durch AWS RDS, der Applikationscode bekommt nur einen neuen Connection String.",
    options: [
      "Replatforming (Ziel PaaS)",
      "Rehosting",
      "Repurchasing",
      "Retire"
    ],
    correct: [0],
    explanation: "Die Architektur bleibt, aber eine Komponente wird durch einen Plattform-Dienst ersetzt. Das ist Replatforming (Lift & Reshape)."
  },
  {
    id: "kn09-03",
    topic: "KN09 Kostenberechnungen",
    text: "Ihre Firma ersetzt das Eigenbau-CRM durch Salesforce. Welches Modell ist das, und wo liegt der Hauptaufwand? (Mehrfachauswahl)",
    options: [
      "Repurchasing mit Ziel SaaS",
      "Rehosting, Hauptaufwand sind neue Server",
      "Der Hauptaufwand liegt in der Datenübernahme, der Anpassung der Prozesse und der Schulung der Benutzer",
      "Der Hauptaufwand liegt im Umschreiben des alten Codes"
    ],
    correct: [0,2],
    explanation: "Die alte Applikation wird nicht bewegt, sondern ersetzt. Die Arbeit liegt bei Daten, Prozessen und Schulung."
  },
  {
    id: "kn09-04",
    topic: "KN09 Kostenberechnungen",
    text: "Welches Migrationsmodell bedeutet, die Applikation umzubauen oder neu zu schreiben (Microservices, Container, Serverless), um Cloud-Eigenschaften voll zu nutzen?",
    options: [
      "Retain",
      "Rehosting",
      "Repurchasing",
      "Refactoring (Rearchitecting)"
    ],
    correct: [3],
    explanation: "Refactoring hat den grössten Aufwand (Monate bis Jahre) und den grössten Nutzen, lohnt sich aber nur für strategisch wichtige, weiterentwickelte Applikationen."
  },
  {
    id: "kn09-05",
    topic: "KN09 Kostenberechnungen",
    text: "Nach dem Schaubild zu den Migrationsmodellen: Welches Modell hat die Ziel-Servicemodelle IaaS, PaaS und FaaS?",
    image: "Anforderungen/Unterlagen/Theorie/img/Migrationsmodelle.png",
    imageAlt: "Schema: App On Premise mit Pfeilen zu Rehosting (IaaS), Replatforming (PaaS), Refactoring (IaaS, PaaS, FaaS) und Repurchasing (SaaS)",
    options: [
      "Replatforming",
      "Refactoring",
      "Rehosting",
      "Repurchasing"
    ],
    correct: [1],
    explanation: "Refactoring führt zu einer cloud-nativ adaptierten App und nutzt je nach Komponente IaaS, PaaS und FaaS. Rehosting ist IaaS, Replatforming PaaS, Repurchasing SaaS."
  },
  {
    id: "kn09-06",
    topic: "KN09 Kostenberechnungen",
    text: "Warum bringt Rehosting oft kaum Kostenersparnis, obwohl Cloud als günstig gilt?",
    options: [
      "Weil Cloud-Anbieter keine Server vermieten",
      "Weil die Applikation weiterhin 24/7 auf gemieteten VMs läuft und weder Elastizität noch Managed Services genutzt werden",
      "Weil Rehosting immer ein Refactoring verlangt",
      "Weil die Daten in der Cloud nicht gespeichert werden dürfen"
    ],
    correct: [1],
    explanation: "Cloud wird günstig durch Elastizität und Managed Services. Lift & Shift tauscht im Wesentlichen den Standort der Server."
  },
  {
    id: "kn09-07",
    topic: "KN09 Kostenberechnungen",
    text: "Die Firma muss schnell migrieren, hat wenig Budget und will wenig Risiko. Welches Modell empfiehlt die Entscheidungshilfe?",
    options: [
      "Refactoring",
      "Retire",
      "Repurchasing",
      "Rehosting"
    ],
    correct: [3],
    explanation: "Rehosting hat geringen Aufwand und geringes Risiko und ist oft der erste Schritt unter Zeitdruck. Der Nutzen ist allerdings begrenzt."
  },
  {
    id: "kn09-08",
    topic: "KN09 Kostenberechnungen",
    text: "Was bedeuten Retire und Retain in der AWS-Sicht der 6 R? (Mehrfachauswahl)",
    options: [
      "Retire: Die Applikation wird abgeschaltet, weil man sie nicht mehr braucht",
      "Retire: Die Applikation wird in die Public Cloud verschoben",
      "Retain: Die Applikation bleibt bewusst On Premise",
      "Retain: Die Applikation wird neu geschrieben"
    ],
    correct: [0,2],
    explanation: "Zusätzlich zu den vier Modellen der Theorie gibt es Retire (abschalten) und Retain (bewusst behalten)."
  },
  {
    id: "kn09-09",
    topic: "KN09 Kostenberechnungen",
    text: "Eine Treuhand-Firma betreibt ihre Buchhaltung auf einem Server im Keller und nutzt Microsoft 365 für Mail und Office. Welches Betriebsmodell liegt vor?",
    options: [
      "Hybrid Cloud",
      "Cloud-Native",
      "On Premise",
      "Private Cloud"
    ],
    correct: [0],
    explanation: "Ein Teil läuft On Premise, ein Teil (Microsoft 365, SaaS) in der Cloud. Hybrid ist heute das am weitesten verbreitete Modell."
  },
  {
    id: "kn09-10",
    topic: "KN09 Kostenberechnungen",
    text: "Was ist der Unterschied zwischen Cloud-Native und Public Cloud?",
    options: [
      "Es sind zwei Namen für dasselbe",
      "Public Cloud ist ein Betriebsmodell, Cloud-Native beschreibt den Besitzer",
      "Cloud-Native ist ein Betriebsmodell (alles läuft in der Cloud), Public/Private beschreibt, wem die Cloud-Infrastruktur gehört",
      "Cloud-Native bedeutet immer eine Private Cloud"
    ],
    correct: [2],
    explanation: "Die Unterscheidungen liegen quer zueinander: Eine Firma kann Cloud-Native in einer Private Cloud sein oder hybrid mit Public-Cloud-Anteilen."
  },
  {
    id: "kn09-11",
    topic: "KN09 Kostenberechnungen",
    text: "Was kennzeichnet eine Private Cloud im Vergleich zur Public Cloud?",
    options: [
      "Die Infrastruktur ist geteilt bei einem öffentlichen Anbieter",
      "Sie hat keine Virtualisierung",
      "Sie ist immer günstiger",
      "Die Infrastruktur ist exklusiv für eine Organisation, betrieben von der Firma selbst oder einem Dienstleister"
    ],
    correct: [3],
    explanation: "Private Clouds sind typisch für Banken, Behörden oder besondere Compliance-Anforderungen. Mischformen sind üblich."
  },
  {
    id: "kn09-12",
    topic: "KN09 Kostenberechnungen",
    text: "Welche Kostenstruktur spricht eher für die Public Cloud?",
    options: [
      "Schwankende Last und schnelles Wachstum (pay as you go)",
      "Konstante, planbare Last, bei der sich eine eigene Investition lohnt",
      "Daten, die das Haus nie verlassen dürfen",
      "Legacy-Software, die sich nicht migrieren lässt"
    ],
    correct: [0],
    explanation: "Bei konstanter Last kann On Premise/Private günstiger sein, bei schwankender Last punktet die Public Cloud."
  },
  {
    id: "kn09-13",
    topic: "KN09 Kostenberechnungen",
    text: "Bei der hybriden Möbel Muster AG läuft das ERP im Firmengebäude, der Webshop in der Public Cloud, Mail und Office über Microsoft 365. Wie sind die drei Teile einzuordnen?",
    image: "Anforderungen/Unterlagen/Theorie/img/Betriebsmodell_Hybrid_Webshop.svg",
    imageAlt: "Hybride Architektur der Möbel Muster AG: ERP lokal, Webshop in der Public Cloud, Microsoft 365, Verbindung per VPN",
    options: [
      "ERP: Public Cloud, Webshop: On Premise, Office: SaaS",
      "Alle drei sind On Premise",
      "ERP: On Premise (Altsystem), Webshop: Public Cloud (skalierend), Mail/Office: SaaS",
      "Alle drei sind SaaS"
    ],
    correct: [2],
    explanation: "Typisches Muster: Neues und Skalierendes wandert in die Cloud, Altes und Schwer-Migrierbares bleibt vorerst im Haus. Die Verbindung läuft über VPN."
  },
  {
    id: "kn09-14",
    topic: "KN09 Kostenberechnungen",
    text: "Woher stammen alle Zahlen in den Abgaben von KN09?",
    options: [
      "Von einer KI, die aktuelle Preise kennt",
      "Aus den offiziellen Kostenrechnern und Preisseiten, belegt mit Screenshots",
      "Aus dem Gedächtnis von früheren Projekten",
      "Von Preisvergleichsblogs ohne Datum"
    ],
    correct: [1],
    explanation: "KI-Werkzeuge erfinden plausibel klingende Zahlen. Preise kommen nur aus offiziellen Quellen mit Datum des Stands."
  },
  {
    id: "kn09-15",
    topic: "KN09 Kostenberechnungen",
    text: "Mit welchen Werkzeugen berechnen Sie die Kosten der Rehosting-Variante?",
    options: [
      "Heroku Preisseite und Terraform Registry",
      "Zoho und Salesforce Preisseiten",
      "AWS Pricing Calculator und Azure Pricing Calculator",
      "Nur der AWS Free Tier"
    ],
    correct: [2],
    explanation: "Rehosting wird für beide Anbieter AWS und Azure mit den offiziellen Rechnern durchgerechnet. Heroku ist Replatforming, Zoho und Salesforce sind Repurchasing."
  },
  {
    id: "kn09-16",
    topic: "KN09 Kostenberechnungen",
    text: "Welche Plattform wird für das Replatforming (PaaS) evaluiert?",
    options: [
      "Heroku",
      "Salesforce Sales Cloud",
      "Zoho CRM",
      "Microsoft 365"
    ],
    correct: [0],
    explanation: "Für Heroku werden Dynos, ein Datenbank-Angebot und Backups ausgewählt. Hier gibt es keine Server mehr, man übersetzt die Spezifikation in Plattform-Angebote."
  },
  {
    id: "kn09-17",
    topic: "KN09 Kostenberechnungen",
    text: "Welche Systeme prüft die Aufgabe für Repurchasing, und für wie viele Benutzer wird gerechnet?",
    options: [
      "Nur Salesforce, für 1 Benutzer",
      "Heroku und AWS, für 3 Benutzer",
      "Azure und AWS, für 300 Benutzer",
      "Zoho CRM und Salesforce Sales Cloud, für 30 Benutzer"
    ],
    correct: [3],
    explanation: "Die On-Premise-Software hat 30 Benutzer. Preise pro Benutzer und Monat sind darauf hochzurechnen."
  },
  {
    id: "kn09-18",
    topic: "KN09 Kostenberechnungen",
    text: "Wie ist die On-Premise-Ausgangslage des CRM beschrieben?",
    options: [
      "3 Web-Server mit je 8 Cores und ein SaaS-Backup",
      "1 Web-Server (1 Core, 20 GB Speicher, 2 GB RAM) und 1 DB-Server (2 Cores, 100 GB Speicher, 4 GB RAM), beide Ubuntu, plus Backup-Speicher, 30 Benutzer",
      "1 Windows-Server mit 16 GB RAM und 1000 Benutzern",
      "Nur eine Datenbank in der Cloud mit 30 GB"
    ],
    correct: [1],
    explanation: "Die On-Premise-Kisten sind klein. Wer im Rechner reflexartig etwas Grosses wählt, verfälscht den Vergleich."
  },
  {
    id: "kn09-19",
    topic: "KN09 Kostenberechnungen",
    text: "Welche Backup-Aufbewahrung wird On Premise für die Datenbank-Daten verwendet?",
    options: [
      "Nur ein Backup pro Jahr",
      "Täglich für die letzten 7 Tage, wöchentlich für den letzten Monat, monatlich für die letzten drei Monate",
      "Stündlich für 24 Stunden",
      "Keine Backups"
    ],
    correct: [1],
    explanation: "Daraus ergibt sich der Backup-Speicherbedarf, den Sie im Rechner abbilden müssen, inklusive Wahl der Speicherklasse."
  },
  {
    id: "kn09-20",
    topic: "KN09 Kostenberechnungen",
    text: "Welche Speicherklasse passt gemäss Speichermodellen für tägliche Backups der letzten 7 Tage, die im Notfall schnell verfügbar sein müssen?",
    options: [
      "Hot, dauerhaft auf dem schnellsten Datenträger der Datenbank",
      "Flüchtiger Speicher (Instance Store)",
      "Cold bzw. Archive (z. B. Glacier), weil es am günstigsten ist",
      "Warm, z. B. S3-Standardklasse"
    ],
    correct: [3],
    explanation: "Die Theorie ordnet tägliche Backups Warm zu, weil man sie im Notfall schnell braucht. Cold ist für Archive mit sehr seltenem Zugriff."
  },
  {
    id: "kn09-21",
    topic: "KN09 Kostenberechnungen",
    text: "Was gilt als Faustregel für die Kosten der Zugriffsklassen?",
    options: [
      "Je heisser, desto teurer pro GB, je kälter, desto teurer pro Zugriff (Abrufgebühren, Wartezeit)",
      "Je kälter, desto teurer pro GB, je heisser, desto teurer pro Zugriff",
      "Alle Klassen kosten gleich viel",
      "Cold Storage ist immer am günstigsten, auch bei häufigem Zugriff"
    ],
    correct: [0],
    explanation: "Cold Storage bestraft häufige Zugriffe mit Abrufgebühren und Wartezeit."
  },
  {
    id: "kn09-22",
    topic: "KN09 Kostenberechnungen",
    text: "Welches Zahlungs- bzw. Laufzeitmodell passt am ehesten für eine 24/7 laufende CRM-Applikation mit konstanter Last?",
    options: [
      "Eine Instanz, die nur 1 Stunde pro Tag läuft",
      "Spontane Nutzung ohne Verpflichtung ist immer günstiger",
      "Reserved Instances bzw. Savings Plans, weil bei dauerhafter Nutzung günstiger als On-Demand",
      "Ein Support-Plan als Ersatz für die Instanz"
    ],
    correct: [2],
    explanation: "Bei planbarer Dauerlast lohnt sich eine Verpflichtung. Die Begründung gehört zum Kern der Aufgabe A."
  },
  {
    id: "kn09-23",
    topic: "KN09 Kostenberechnungen",
    text: "Die Rechner zeigen Monats-, Jahres- und Upfront-Preise. Wie vergleichen Sie die Varianten sauber?",
    options: [
      "Nur den Upfront-Betrag vergleichen",
      "Jede Variante in ihrer Originaleinheit lassen",
      "Nur die Jahrespreise vergleichen",
      "Alles auf Kosten pro Monat normalisieren"
    ],
    correct: [3],
    explanation: "Laut Fehlerquellen sind Reserved-Varianten teils mit Einmalzahlung angegeben. Für die Vergleichstabelle gilt Kosten pro Monat."
  },
  {
    id: "kn09-24",
    topic: "KN09 Kostenberechnungen",
    text: "Welche Fehler verfälschen den Preisvergleich im Rechner? (Mehrfachauswahl)",
    options: [
      "Unterschiedliche Regionen für die Varianten",
      "Versteckte Positionen wie Datentransfer, Support-Pläne oder Snapshots werden übersehen",
      "Die Begründung zu jeder Komponente wird angegeben",
      "Die Preise werden mit Datum dokumentiert"
    ],
    correct: [0,1],
    explanation: "Preise unterscheiden sich je Region deutlich. Konsequent dieselbe Region wählen und angeben. Versteckte Positionen bewusst durchgehen."
  },
  {
    id: "kn09-25",
    topic: "KN09 Kostenberechnungen",
    text: "Salesforce und Zoho nennen Preise per user/month, billed annually. Was bedeutet das für Ihre Berechnung?",
    options: [
      "Der Preis gilt pro Benutzer und Monat bei jährlicher Abrechnung: für 30 Benutzer rechnen und die Abrechnungsart angeben",
      "Der Preis gilt für das gesamte Unternehmen, egal wie viele Benutzer",
      "Der Preis gilt nur für einen einzigen Benutzer, andere sind gratis",
      "Der Preis ist ein einmaliger Kaufpreis für die Software"
    ],
    correct: [0],
    explanation: "Das Kleingedruckte ist der Klassiker bei SaaS-Preisen. Für 30 Benutzer rechnen und monatlich normalisieren."
  },
  {
    id: "kn09-26",
    topic: "KN09 Kostenberechnungen",
    text: "Welche Kosten stehen in keinem Kostenrechner und gehören trotzdem in den Vergleich? (Mehrfachauswahl)",
    options: [
      "Personalaufwand für den Betrieb (z. B. Patchen der Server bei Rehosting)",
      "Der monatliche Preis der Instanz laut Rechner",
      "Migrationsaufwand, bei Repurchasing z. B. Datenübernahme, Prozesse und Schulung von 30 Benutzern",
      "Der Listenpreis der Lizenz laut Preisseite"
    ],
    correct: [0,2],
    explanation: "Die Kalkulatoren zeigen nur die Rechnungen des Anbieters. Personal, Migration, Schulung und Anpassungen kommen hinzu."
  },
  {
    id: "kn09-27",
    topic: "KN09 Kostenberechnungen",
    text: "Wer ist bei Rehosting (IaaS) für das Patchen und Härten des Betriebssystems zuständig?",
    options: [
      "Der Cloud-Anbieter",
      "Der Hersteller der CRM-Software",
      "Die Firma selbst, also Personalaufwand, den der Kostenrechner nicht zeigt",
      "Niemand, bei Ubuntu ist das nicht nötig"
    ],
    correct: [2],
    explanation: "Bei IaaS verwalten Sie das OS selbst, bei PaaS und SaaS übernimmt es der Anbieter."
  },
  {
    id: "kn09-28",
    topic: "KN09 Kostenberechnungen",
    text: "Der CEO fragt: Warum ist die SaaS-Variante pro Monat teurer als die Server? Wofür zahle ich da? Welche Antwort passt?",
    options: [
      "Weil SaaS-Software immer schlechter ist",
      "Weil bei SaaS Betrieb, Wartung, Updates und Hosting inklusive sind und kein eigenes Personal dafür nötig ist; die Unterschiede sind nur mit den unsichtbaren Kosten fair vergleichbar",
      "Weil bei SaaS die Hardware dem Kunden gehört",
      "Das ist ein Preisfehler des Anbieters"
    ],
    correct: [1],
    explanation: "Bei Repurchasing ist kein Betrieb mehr nötig, dafür entstehen Lizenzkosten pro Benutzer und Abhängigkeit vom Hersteller."
  },
  {
    id: "kn09-29",
    topic: "KN09 Kostenberechnungen",
    text: "Wann würden Sie dem CEO trotz Repurchasing-Empfehlung eine andere Variante vorschlagen?",
    options: [
      "Wenn die Applikation in Python geschrieben ist",
      "Wenn Salesforce mehr Benutzer als 30 unterstützt",
      "Wenn das CRM stark individualisiert ist und Spezialfunktionen enthält, die das Standardprodukt nicht bietet",
      "Nie, Repurchasing ist immer die beste Lösung"
    ],
    correct: [2],
    explanation: "Repurchasing bringt Abhängigkeit vom Hersteller und den Verlust von Spezialfunktionen. Bei starker Individualisierung eignen sich Replatforming oder Rehosting besser."
  },
  {
    id: "kn09-30",
    topic: "KN09 Kostenberechnungen",
    text: "Wie ordnen Sie die fünf Varianten des KN09 den Servicemodellen zu? (Mehrfachauswahl)",
    options: [
      "AWS und Azure (virtuelle Server): IaaS",
      "Heroku: PaaS",
      "Zoho CRM und Salesforce: IaaS",
      "Heroku: FaaS"
    ],
    correct: [0,1],
    explanation: "Rehosting auf AWS/Azure ist IaaS, Heroku ist als Replatforming PaaS, Zoho und Salesforce sind SaaS (Repurchasing)."
  },
  {
    id: "kn09-31",
    topic: "KN09 Kostenberechnungen",
    text: "Wie sollen die Erklärungen und die Empfehlung an den CEO geschrieben sein?",
    options: [
      "CEO-tauglich: ohne Fachbegriffe ohne Erklärung, begründet und mit Hinweis, unter welchen Umständen anders entschieden würde",
      "Nur als Tabelle ohne Text",
      "Mit möglichst vielen Fachbegriffen, damit sie fachkundig wirken",
      "Nur mit Screenshots"
    ],
    correct: [0],
    explanation: "Der CEO ist technisch nicht sattelfest. Die Empfehlung umfasst ca. 150 bis 250 Wörter und eine klare Begründung."
  },
  {
    id: "kn09-32",
    topic: "KN09 Kostenberechnungen",
    text: "Warum sollten die Cloud-Instanzen im Rechner nicht reflexartig gross gewählt werden?",
    options: [
      "Weil grosse Instanzen in der Cloud nicht existieren",
      "Weil grosse Instanzen nur mit Savings Plans bestellbar sind",
      "Weil AWS keine Instanzen mit 2 GB RAM anbietet",
      "Weil die On-Premise-Server klein sind (1 bis 2 Cores) und ein zu grosser Typ den Vergleich verfälscht. Abweichungen sind erlaubt, müssen aber begründet werden"
    ],
    correct: [3],
    explanation: "Die Begründung der Abweichungen von der On-Premise-Spezifikation ist der Kern der Aufgabe A."
  },
  {
    id: "kn09-33",
    topic: "KN09 Kostenberechnungen",
    text: "Warum sind Rehosting und Hybrid Cloud in der Praxis oft nur ein Übergangszustand, der Jahre dauert?",
    options: [
      "Weil Cloud-Anbieter nur befristete Verträge anbieten",
      "Weil Legacy-Systeme, Abhängigkeiten, Verträge und Migrationskosten den Wechsel auf einen Schlag verhindern. Jede Abhängigkeit muss einzeln abgelöst werden",
      "Weil Hybrid technisch nicht länger als ein Jahr funktioniert",
      "Weil On Premise rechtlich verboten ist"
    ],
    correct: [1],
    explanation: "Hybrid ist oft ein Übergang, kein Zielzustand. Neues wandert zuerst in die Cloud, Altes bleibt vorerst im Haus."
  },
  {
    id: "kn09-34",
    topic: "KN09 Kostenberechnungen",
    text: "Welche Fremdkosten und Aufwände soll die Kostenschätzung laut Kompetenzmatrix (Stufe Advanced) umfassen?",
    options: [
      "Nur die Fremdkosten für die Betriebsarten",
      "Fremdkosten, nötigen Personalaufwand und anfallende Migrationsaufwände",
      "Nur den Personalaufwand",
      "Nur die Lizenzkosten"
    ],
    correct: [1],
    explanation: "Die Stufen steigern sich: Fremdkosten (Basic), plus Personalaufwand (Intermediate), plus Migrationsaufwände (Advanced)."
  }
);
