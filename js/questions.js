// Fragenkatalog. Neue Fragen einfach am Ende anhaengen.
//
// Felder:
//   id          eindeutig, z.B. "iam-03" (wird fuer die Statistik verwendet)
//   topic       Thema (wird als Filter angezeigt)
//   text        Fragetext
//   image       optional, Pfad zu einem Screenshot, z.B. "img/screenshots/vpc-1.png"
//   imageAlt    optional, Beschreibung des Bildes
//   options     Antwortmoeglichkeiten
//   correct     Indizes der richtigen Antworten (ab 0). Mehrere = Mehrfachauswahl
//   explanation optional, Erklaerung nach dem Pruefen
//
// Screenshots in img/screenshots/ ablegen. Neue Bilder zusaetzlich in sw.js
// (Liste ASSETS) eintragen, damit sie offline verfuegbar sind.
//
// Die folgenden Fragen sind Beispiele zum Testen der App. Bitte durch
// eigene Fragen aus dem Unterricht ersetzen oder ergaenzen.

window.QUESTIONS = [
  {
    id: "kn02-01",
    topic: "KN02 Cloud Onboarding",
    text: "Was beschreibt das Modell der geteilten Verantwortung (Shared Responsibility Model) bei AWS?",
    options: [
      "AWS ist fuer alles verantwortlich, auch fuer die Daten der Kunden",
      "AWS ist fuer die Sicherheit DER Cloud, der Kunde fuer die Sicherheit IN der Cloud",
      "Der Kunde ist fuer die physische Sicherheit der Rechenzentren verantwortlich",
      "Verantwortung wird je nach Region neu verteilt"
    ],
    correct: [1],
    explanation: "AWS betreibt und sichert die Infrastruktur (Hardware, Rechenzentren, Netzwerk). Der Kunde sichert seine Daten, Konfiguration, Zugriffe und Betriebssysteme auf EC2."
  },
  {
    id: "kn02-02",
    topic: "KN02 Cloud Onboarding",
    text: "Welche Aussagen zu Regionen und Availability Zones (AZ) sind korrekt?",
    options: [
      "Eine Region besteht aus mehreren, voneinander getrennten Availability Zones",
      "Eine AZ besteht aus einem oder mehreren Rechenzentren",
      "Eine Region ist immer genau ein einziges Rechenzentrum",
      "Alle AZs einer Region liegen im selben Gebaeude"
    ],
    correct: [0, 1],
    explanation: "Regionen sind geografische Gebiete mit mehreren AZs. Verteilt man Ressourcen auf mehrere AZs, erhoeht das die Verfuegbarkeit."
  },
  {
    id: "kn02-03",
    topic: "KN02 Cloud Onboarding",
    text: "Welches Prinzip sollte bei der Vergabe von IAM-Berechtigungen gelten?",
    options: [
      "Alle Benutzer erhalten Administrator-Rechte, damit nichts blockiert",
      "Least Privilege: nur die Rechte, die tatsaechlich benoetigt werden",
      "Berechtigungen werden nie entzogen",
      "Jeder Benutzer teilt sich die Zugangsdaten des Root-Benutzers"
    ],
    correct: [1],
    explanation: "Least Privilege reduziert das Risiko bei kompromittierten Zugaengen. Den Root-Benutzer nur fuer wenige Aufgaben verwenden und mit MFA schuetzen."
  },
  {
    id: "kn02-04",
    topic: "KN02 Cloud Onboarding",
    text: "Eine EC2-Instanz soll auf einen S3-Bucket zugreifen. Wie geht das am sichersten?",
    options: [
      "Access Key und Secret Key fest im Code speichern",
      "Der Instanz eine IAM-Rolle (Instance Profile) mit passender Policy zuweisen",
      "Den Bucket oeffentlich machen",
      "Die Zugangsdaten per E-Mail an die Instanz senden"
    ],
    correct: [1],
    explanation: "Rollen liefern temporaere Zugangsdaten, es muessen keine langlebigen Schluessel verwaltet oder im Code abgelegt werden."
  },
  {
    id: "kn03-01",
    topic: "KN03 IaaS und IaC",
    text: "Wofuer steht EC2?",
    options: [
      "Elastic Compute Cloud, virtuelle Server in AWS",
      "Elastic Container Catalog",
      "Extended Cloud Connection",
      "Encrypted Content Cache"
    ],
    correct: [0],
    explanation: "Mit EC2 startet man virtuelle Maschinen (Instanzen) und waehlt Instanztyp, AMI, Netzwerk und Speicher."
  },
  {
    id: "kn05-01",
    topic: "KN05 Speicherarten",
    text: "Welcher AWS-Dienst ist ein Objektspeicher?",
    options: ["Amazon EBS", "Amazon S3", "Amazon EFS", "Amazon RDS"],
    correct: [1],
    explanation: "S3 speichert Objekte in Buckets. EBS ist Blockspeicher fuer EC2, EFS ein Dateisystem, RDS eine verwaltete Datenbank."
  },
  {
    id: "kn04-01",
    topic: "KN04 IaaS und Netzwerk",
    text: "Was ist eine Amazon VPC?",
    options: [
      "Ein logisch isoliertes, virtuelles Netzwerk im eigenen AWS-Konto",
      "Ein Dienst fuer Videostreaming",
      "Ein Backup-Dienst fuer Datenbanken",
      "Eine Lizenz fuer virtuelle Server"
    ],
    correct: [0],
    explanation: "In einer VPC definiert man IP-Bereiche, Subnetze, Routing und Gateways selbst."
  },
  {
    id: "kn04-02",
    topic: "KN04 IaaS und Netzwerk",
    text: "Was unterscheidet eine Security Group von einer Network ACL?",
    options: [
      "Security Groups sind zustandsbehaftet (stateful) und gelten auf Instanzebene",
      "Network ACLs sind zustandslos (stateless) und gelten auf Subnetz-Ebene",
      "Security Groups gelten fuer das ganze Konto",
      "Network ACLs erlauben nur Regeln vom Typ Allow"
    ],
    correct: [0, 1],
    explanation: "Security Groups: stateful, nur Allow-Regeln. Network ACLs: stateless, Allow und Deny, pro Subnetz."
  },
  {
    id: "kn08-01",
    topic: "KN08 PaaS und FaaS",
    text: "Welchen Vorteil bietet Amazon RDS gegenueber einer selbst betriebenen Datenbank auf EC2?",
    options: [
      "Patching, Backups und Failover werden von AWS uebernommen bzw. vereinfacht",
      "Man hat Root-Zugriff auf das Betriebssystem des Datenbankservers",
      "RDS ist immer kostenlos",
      "RDS speichert Daten ausschliesslich in S3"
    ],
    correct: [0],
    explanation: "RDS ist ein verwalteter Dienst. Dafuer hat man keinen Zugriff auf das zugrunde liegende Betriebssystem."
  },
  {
    id: "kn07-01",
    topic: "KN07 Skalierung",
    text: "Mit welchem Dienst lassen sich Metriken und Logs ueberwachen und Alarme ausloesen?",
    options: ["AWS CloudTrail", "Amazon CloudWatch", "AWS Artifact", "Amazon Route 53"],
    correct: [1],
    explanation: "CloudWatch sammelt Metriken und Logs und kann Alarme ausloesen. CloudTrail protokolliert API-Aufrufe im Konto."
  },

  // ---- KN01 Virtualisierung ----
  {
    id: "kn01-01",
    topic: "KN01 Virtualisierung",
    text: "Was macht ein Hypervisor?",
    options: [
      "Er teilt die Hardware eines Hosts auf mehrere virtuelle Maschinen auf",
      "Er verschluesselt den Netzwerkverkehr zwischen Servern",
      "Er ersetzt das Betriebssystem in jeder virtuellen Maschine",
      "Er speichert Backups in der Cloud"
    ],
    correct: [0],
    explanation: "Der Hypervisor abstrahiert CPU, RAM, Storage und Netzwerk und stellt sie mehreren VMs isoliert zur Verfuegung."
  },
  {
    id: "kn01-02",
    topic: "KN01 Virtualisierung",
    text: "Wofuer wird Cloud-Init typischerweise verwendet?",
    options: [
      "Um eine neue Instanz beim ersten Start automatisch zu konfigurieren (Benutzer, Pakete, Skripte)",
      "Um eine Instanz nach einem Absturz neu zu starten",
      "Um die Kosten einer Instanz zu berechnen",
      "Um einen Bucket zu verschluesseln"
    ],
    correct: [0],
    explanation: "Cloud-Init liest beim Booten die User Data und fuehrt die darin beschriebene Initialkonfiguration aus."
  },

  // ---- KN03 IaaS / IaC ----
  {
    id: "kn03-02",
    topic: "KN03 IaaS und IaC",
    text: "Was beschreibt Infrastructure as Code (IaC)?",
    options: [
      "Infrastruktur wird in Textdateien deklariert und automatisiert, reproduzierbar erstellt",
      "Infrastruktur wird manuell ueber die Konsole angeklickt",
      "Programme werden direkt auf dem Router geschrieben",
      "Server werden ausschliesslich physisch verkabelt"
    ],
    correct: [0],
    explanation: "Mit IaC (z.B. OpenTofu/Terraform) ist die Umgebung versionierbar, wiederholbar und nachvollziehbar."
  },
  {
    id: "kn03-03",
    topic: "KN03 IaaS und IaC",
    text: "Welche Aussagen zu OpenTofu (bzw. Terraform) sind korrekt?",
    options: [
      "Mit 'plan' sieht man die geplanten Aenderungen, bevor sie angewendet werden",
      "Mit 'apply' werden die Aenderungen umgesetzt",
      "Der State speichert, welche Ressourcen verwaltet werden",
      "Zugangsdaten gehoeren fest in die .tf-Dateien im Repo"
    ],
    correct: [0, 1, 2],
    explanation: "plan = Dry Run, apply = ausfuehren. Der State ordnet Code und reale Ressourcen zu. Zugangsdaten gehoeren nie ins Repo."
  },

  // ---- KN05 Speicherarten ----
  {
    id: "kn05-02",
    topic: "KN05 Speicherarten",
    text: "Was passiert mit Daten auf einem EBS-Volume, wenn die EC2-Instanz gestoppt wird?",
    options: [
      "Sie bleiben erhalten (persistent)",
      "Sie gehen immer verloren",
      "Sie werden automatisch nach S3 verschoben",
      "Sie werden an alle anderen Instanzen verteilt"
    ],
    correct: [0],
    explanation: "EBS ist persistenter Blockspeicher. Instance-Store-Daten dagegen gehen beim Stoppen oder Beenden verloren."
  },

  // ---- KN06 IaC / Ansible ----
  {
    id: "kn06-01",
    topic: "KN06 IaC und Ansible",
    text: "Welche Aussage zu Ansible stimmt?",
    options: [
      "Ansible konfiguriert Systeme ueber Playbooks, meist agentenlos per SSH",
      "Ansible erstellt ausschliesslich Netzwerkkabel-Plaene",
      "Ansible benoetigt zwingend einen installierten Agenten auf jedem Zielsystem",
      "Ansible ist ein Speicherdienst von AWS"
    ],
    correct: [0],
    explanation: "Playbooks (YAML) beschreiben den gewuenschten Zustand. Ansible verbindet sich dazu per SSH, ein Agent ist nicht noetig."
  },
  {
    id: "kn06-02",
    topic: "KN06 IaC und Ansible",
    text: "Was bedeutet Idempotenz bei Ansible?",
    options: [
      "Ein mehrfaches Ausfuehren eines Playbooks fuehrt zum gleichen Zustand",
      "Jede Ausfuehrung loescht alle Daten",
      "Ein Playbook laeuft nur einmal pro Jahr",
      "Ein Playbook funktioniert nur ohne Netzwerk"
    ],
    correct: [0],
    explanation: "Bereits erfuellte Aufgaben werden uebersprungen. Das Ergebnis bleibt bei jeder Wiederholung gleich."
  },

  // ---- KN07 Skalierung ----
  {
    id: "kn07-02",
    topic: "KN07 Skalierung",
    text: "Welche Aufgabe hat ein Load Balancer?",
    options: [
      "Er verteilt eingehende Anfragen auf mehrere Ziele (z.B. Instanzen)",
      "Er sichert die Datenbank taeglich",
      "Er vergibt IAM-Berechtigungen",
      "Er berechnet die monatlichen Kosten"
    ],
    correct: [0],
    explanation: "Zusammen mit Health Checks leitet er Verkehr nur an gesunde Ziele und erhoeht so Verfuegbarkeit und Kapazitaet."
  },
  {
    id: "kn07-03",
    topic: "KN07 Skalierung",
    text: "Was ist der Unterschied zwischen vertikaler und horizontaler Skalierung?",
    options: [
      "Vertikal: groessere Instanz. Horizontal: mehr Instanzen",
      "Vertikal: mehr Instanzen. Horizontal: groessere Instanz",
      "Beides bedeutet dasselbe",
      "Horizontal ist nur bei Datenbanken moeglich"
    ],
    correct: [0],
    explanation: "Scale up/down aendert die Groesse einer Instanz, Scale out/in die Anzahl. Auto Scaling arbeitet horizontal."
  },

  // ---- KN08 PaaS / FaaS ----
  {
    id: "kn08-02",
    topic: "KN08 PaaS und FaaS",
    text: "Welcher Dienst ist ein FaaS-Angebot (Function as a Service) von AWS?",
    options: ["AWS Lambda", "Amazon EC2", "Amazon EBS", "Amazon VPC"],
    correct: [0],
    explanation: "Lambda fuehrt Code ereignisgesteuert aus, ohne dass man Server verwaltet. Abgerechnet wird nach Ausfuehrung."
  },
  {
    id: "kn08-03",
    topic: "KN08 PaaS und FaaS",
    text: "Wofuer wird AWS CloudFormation verwendet?",
    options: [
      "Um AWS-Ressourcen ueber Vorlagen (Stacks) zu erstellen und zu verwalten",
      "Um Videos zu streamen",
      "Um E-Mails zu versenden",
      "Um Domains zu registrieren"
    ],
    correct: [0],
    explanation: "CloudFormation ist das IaC-Werkzeug von AWS. Templates in YAML/JSON werden als Stack ausgerollt."
  },

  // ---- KN09 Kostenberechnungen ----
  {
    id: "kn09-01",
    topic: "KN09 Kostenberechnungen",
    text: "Welches Werkzeug eignet sich, um die Kosten einer geplanten AWS-Umgebung vorab zu schaetzen?",
    options: ["AWS Pricing Calculator", "AWS CloudTrail", "Amazon Route 53", "AWS Artifact"],
    correct: [0],
    explanation: "Im Pricing Calculator stellt man Dienste und Nutzung zusammen und erhaelt eine Kostenschaetzung."
  },
  {
    id: "kn09-02",
    topic: "KN09 Kostenberechnungen",
    text: "Welche Massnahmen helfen, Cloud-Kosten zu senken?",
    options: [
      "Nicht benoetigte Ressourcen loeschen oder stoppen",
      "Instanzen passend dimensionieren (Right Sizing)",
      "Alle Instanzen dauerhaft auf der groessten Groesse laufen lassen",
      "Budgets und Alarme einrichten"
    ],
    correct: [0, 1, 3],
    explanation: "Ungenutzte Ressourcen kosten weiter. Right Sizing und Budget-Alarme verhindern unnoetige Ausgaben."
  }
];
