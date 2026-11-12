window.QUESTIONS.push(
  {
    id: "kn08-01",
    topic: "KN08 PaaS und FaaS",
    text: "Welchem Servicemodell entspricht Amazon RDS?",
    options: [
      "IaaS, weil man ein Betriebssystem per SSH verwaltet",
      "SaaS, weil die Datenbank im Browser bedient wird",
      "PaaS, weil AWS die Plattform (Installation, Betrieb, Updates, Backups) betreibt und Sie das Schema liefern",
      "FaaS, weil die Datenbank nur bei Abfragen läuft"
    ],
    correct: [2],
    explanation: "RDS ist ein verwalteter Datenbankdienst und wird im Modul als PaaS eingeordnet."
  },
  {
    id: "kn08-02",
    topic: "KN08 PaaS und FaaS",
    text: "Mit welchem OpenTofu-Ressourcentyp erstellen Sie die RDS-Datenbank?",
    options: [
      "aws_db_instance",
      "aws_s3_bucket",
      "aws_instance",
      "aws_lambda_function"
    ],
    correct: [0],
    explanation: "aws_db_instance beschreibt eine RDS-Instanz (hier Engine MariaDB, Klasse db.t3.micro, 20 GB)."
  },
  {
    id: "kn08-03",
    topic: "KN08 PaaS und FaaS",
    text: "Warum muss skip_final_snapshot = true gesetzt werden?",
    options: [
      "Sonst werden keine Backups erstellt",
      "Sonst startet die Datenbank nicht",
      "Sonst ist die Datenbank nicht verschlüsselt",
      "Sonst verweigert der spätere destroy die Löschung, weil beim Löschen ein finaler Snapshot verlangt wird"
    ],
    correct: [3],
    explanation: "Ohne skip_final_snapshot scheitert tofu destroy der RDS-Instanz. Das ist eine häufige Fehlerquelle in KN08."
  },
  {
    id: "kn08-04",
    topic: "KN08 PaaS und FaaS",
    text: "Welche Zeichen sollten im RDS-Master-Passwort vermieden werden, weil sie zu Verbindungsproblemen führen?",
    options: [
      "Grossbuchstaben und Ziffern",
      "Die Zeichen # und -",
      "Punkt und Komma",
      "Das Zeichen @ und Leerzeichen sind Pflicht"
    ],
    correct: [1],
    explanation: "Die Aufgabe nennt # und - als problematisch. Wie immer gilt: Wegwerf-Passwort verwenden."
  },
  {
    id: "kn08-05",
    topic: "KN08 PaaS und FaaS",
    text: "Wie ist der Zugriff auf die RDS-Datenbank in dieser Lernaufgabe konfiguriert?",
    options: [
      "publicly_accessible = false und Port 3306 für 0.0.0.0/0",
      "publicly_accessible = true und die Security Group erlaubt Port 3306 nur von Ihrer aktuellen IP (<Ihre-IP>/32)",
      "publicly_accessible = true und Port 22 für alle",
      "Die Datenbank ist nur aus einer EC2-Instanz erreichbar"
    ],
    correct: [1],
    explanation: "Das ist eine dokumentierte Ausnahme zu Lernzwecken, weil es in KN08 keine EC2-Instanz zum Testen gibt. Produktiv wäre die DB nicht öffentlich erreichbar."
  },
  {
    id: "kn08-06",
    topic: "KN08 PaaS und FaaS",
    text: "Wie sähe die produktive Lösung statt eines öffentlich erreichbaren RDS aus?",
    options: [
      "Die Datenbank wird mit Elastic Beanstalk veröffentlicht",
      "Die Datenbank bekommt 0.0.0.0/0, aber ein komplexes Passwort",
      "Die Datenbank wird auf dem Laptop betrieben",
      "Die Datenbank bleibt nicht öffentlich und ist nur von der Applikations-Schicht (z. B. deren Security Group) erreichbar"
    ],
    correct: [3],
    explanation: "Datenbanken sind niemals öffentlich erreichbar. Der Zugriff soll nur von den Applikations-Instanzen aus möglich sein."
  },
  {
    id: "kn08-07",
    topic: "KN08 PaaS und FaaS",
    text: "Wie weisen Sie unter Windows (PowerShell) nach, dass die RDS-Datenbank auf dem MariaDB-Port erreichbar ist?",
    options: [
      "Test-NetConnection -ComputerName <Endpoint> -Port 3306 mit Ergebnis TcpTestSucceeded : True",
      "ssh <Endpoint> -p 3306",
      "ping <Endpoint> -p 3306",
      "df -h <Endpoint>"
    ],
    correct: [0],
    explanation: "Test-NetConnection prüft den TCP-Port 3306. Unter macOS/Linux gibt es nc -vz <Endpoint> 3306."
  },
  {
    id: "kn08-08",
    topic: "KN08 PaaS und FaaS",
    text: "Der apply der RDS-Instanz dauert 5 bis 10 Minuten. Wie ist das einzuordnen?",
    options: [
      "Fehler, man soll abbrechen und neu starten",
      "Das zeigt, dass die Security Group falsch ist",
      "Normal, RDS-Operationen (auch destroy) brauchen diese Zeit, nicht abbrechen",
      "Das liegt am Passwort mit Sonderzeichen"
    ],
    correct: [2],
    explanation: "Laut Fehlerquellen ist die Dauer bei apply und destroy von RDS normal."
  },
  {
    id: "kn08-09",
    topic: "KN08 PaaS und FaaS",
    text: "Was nimmt Ihnen RDS gegenüber der selbst installierten MariaDB aus KN06 ab? (Mehrfachauswahl)",
    options: [
      "Installation und Konfiguration der Datenbank-Software",
      "Das Entwerfen des Datenbank-Schemas",
      "Backups, Updates und Ausfallsicherheit des Datenbankbetriebs",
      "Das Schreiben der Applikation"
    ],
    correct: [0,2],
    explanation: "Die Plattform übernimmt den Betrieb. Dafür geben Sie Kontrolle ab (z. B. keinen Zugriff auf das Betriebssystem). Schema und Applikation bleiben Ihre Aufgabe."
  },
  {
    id: "kn08-10",
    topic: "KN08 PaaS und FaaS",
    text: "Keine Verbindung zur RDS vom Laptop aus. Welche Ursachen sind plausibel? (Mehrfachauswahl)",
    options: [
      "Ihre IP hat sich geändert (z. B. Schulnetz/Hotspot), die Security Group erlaubt die alte IP",
      "Die Engine ist MariaDB",
      "publicly_accessible ist nicht gesetzt",
      "Die Instanzklasse ist db.t3.micro"
    ],
    correct: [0,2],
    explanation: "Laut Fehlerquellen prüfen Sie Security Group (aktuelle IP), publicly_accessible und das Passwort (ohne # und -)."
  },
  {
    id: "kn08-11",
    topic: "KN08 PaaS und FaaS",
    text: "Warum ist die Konfiguration von Elastic Beanstalk im GUI eine vertretbare Ausnahme vom Code-Prinzip?",
    options: [
      "Weil Beanstalk keinen Code erzeugen kann",
      "Weil man im GUI schneller ist",
      "Weil OpenTofu Beanstalk nicht kennt",
      "Weil Beanstalk selbst die Automatisierungsschicht ist: Sie beschreiben das Was, die Plattform generiert daraus CloudFormation-Code"
    ],
    correct: [3],
    explanation: "Beanstalk erzeugt die Infrastruktur im Hintergrund als CloudFormation-Stack. Man schaut einer IaC-Maschine bei der Arbeit zu."
  },
  {
    id: "kn08-12",
    topic: "KN08 PaaS und FaaS",
    text: "Welchem Servicemodell entspricht Elastic Beanstalk?",
    options: [
      "PaaS",
      "FaaS",
      "IaaS",
      "On Premise"
    ],
    correct: [0],
    explanation: "Sie liefern die Applikation, AWS stellt OS, Laufzeit, Load Balancer usw. bereit."
  },
  {
    id: "kn08-13",
    topic: "KN08 PaaS und FaaS",
    text: "Welche Umgebungs-Einstellung wird für Beanstalk in der Aufgabe verlangt?",
    options: [
      "Single instance ohne Load Balancer",
      "Nur Spot-Instanzen",
      "Umgebungstyp load balanced mit mindestens 2 Instanzen",
      "Eigene Service Role per OpenTofu erstellen"
    ],
    correct: [2],
    explanation: "Zusätzlich werden die vorhandenen Lab-Rollen (Service Role und Instance Profile) verwendet, da im Learner Lab keine eigenen Rollen erstellt werden können."
  },
  {
    id: "kn08-14",
    topic: "KN08 PaaS und FaaS",
    text: "Die Beanstalk-Umgebung bleibt rot oder grau. Was prüfen Sie zuerst?",
    options: [
      "Den Zeitplan der Lambda-Funktion",
      "Die Events der Umgebung, häufig fehlt die Service Role oder das Instance Profile (Lab-Rollen wählen)",
      "Ob der RDS-Snapshot DeleteOn trägt",
      "Die Elastic IP der Instanz"
    ],
    correct: [1],
    explanation: "Die Events unten auf der Environment-Seite zeigen die Ursache. Typisch sind fehlende Rollen."
  },
  {
    id: "kn08-15",
    topic: "KN08 PaaS und FaaS",
    text: "Welche Objekte findet man nach dem Erstellen der Beanstalk-Umgebung im EC2-Bereich? (Mehrfachauswahl)",
    options: [
      "Instanzen, Security Groups, Load Balancer und Target Group",
      "Auto Scaling Group und Launch Template",
      "Ein MongoDB-Atlas-Cluster",
      "Ein EventBridge-Zeitplan"
    ],
    correct: [0,1],
    explanation: "Beanstalk baut dasselbe wie Ihr eigener Bau aus KN07: Instanzen, SGs, ALB, Target Group, ASG und Launch Template."
  },
  {
    id: "kn08-16",
    topic: "KN08 PaaS und FaaS",
    text: "Welchen Bucket legt Beanstalk automatisch in S3 an?",
    options: [
      "Einen Bucket, der die cloud-init-Datei der Lehrperson enthält",
      "Einen Bucket mit dem Namen rds-backup",
      "Einen Bucket, dessen Name mit elasticbeanstalk- beginnt, mit Dateien der Umgebung (z. B. Applikationsversionen)",
      "Gar keinen, Beanstalk speichert alles auf der Instanz"
    ],
    correct: [2],
    explanation: "In diesem Bucket legt Beanstalk u. a. die hochgeladenen Applikationsversionen ab, die Namen beginnen mit elasticbeanstalk-."
  },
  {
    id: "kn08-17",
    topic: "KN08 PaaS und FaaS",
    text: "Was ist CloudFormation, und was entspricht bei OpenTofu dem Template und dem Stack?",
    options: [
      "CloudFormation ist das IaC-Werkzeug von AWS: Das Template entspricht den .tf-Dateien (Code), der Stack der damit erzeugten Umgebung mit ihren Ressourcen",
      "CloudFormation ist ein Backup-Dienst: Template entspricht dem Snapshot, Stack dem Volume",
      "CloudFormation ist ein Load Balancer: Template entspricht dem Listener",
      "CloudFormation ist ein Konfigurationswerkzeug wie Ansible für laufende Server"
    ],
    correct: [0],
    explanation: "CloudFormation ist die native IaC-Lösung von AWS (deklarativ). Ein Stack ist die Gesamtheit der Ressourcen, die aus einem Template erstellt wurden."
  },
  {
    id: "kn08-18",
    topic: "KN08 PaaS und FaaS",
    text: "Warum wurde im Modul OpenTofu statt CloudFormation gelernt?",
    options: [
      "Weil CloudFormation keine EC2-Instanzen kann",
      "Weil OpenTofu schneller läuft",
      "Weil CloudFormation kostenpflichtig ist",
      "Weil OpenTofu providerunabhängig ist und mit mehreren Anbietern funktioniert (siehe KN03)"
    ],
    correct: [3],
    explanation: "CloudFormation funktioniert nur bei AWS, OpenTofu kennt viele Provider."
  },
  {
    id: "kn08-19",
    topic: "KN08 PaaS und FaaS",
    text: "Wie lassen sich die Ebenen sauber abgrenzen?",
    options: [
      "cloud-init erstellt die Netzwerke, OpenTofu installiert die Pakete",
      "CloudFormation/OpenTofu bauen die Infrastruktur, cloud-init richtet die Instanz beim ersten Start ein, Ansible konfiguriert laufende Instanzen",
      "Ansible erstellt die Instanzen, CloudFormation konfiguriert Pakete",
      "Alle drei Werkzeuge machen dasselbe und ersetzen einander"
    ],
    correct: [1],
    explanation: "Merkhilfe: OpenTofu baut das Haus, cloud-init richtet es beim Einzug ein, Ansible macht den Unterhalt."
  },
  {
    id: "kn08-20",
    topic: "KN08 PaaS und FaaS",
    text: "Wie räumen Sie die Beanstalk-Umgebung richtig ab, und warum?",
    options: [
      "Die EC2-Instanzen einzeln terminieren, das geht am schnellsten",
      "Über Beanstalk (Environment terminieren), weil die Auto Scaling Group sonst einzeln gelöschte Instanzen wieder neu erstellt",
      "Nur den S3-Bucket löschen",
      "Den CloudFormation-Stack nie löschen"
    ],
    correct: [1],
    explanation: "Dieselbe Falle wie bei der ASG in KN07: Die Plattform verteidigt ihren Sollzustand. Abräumen geschieht über das steuernde Werkzeug."
  },
  {
    id: "kn08-21",
    topic: "KN08 PaaS und FaaS",
    text: "Was ist Lambda im Sinne der Servicemodelle, und wann fallen Kosten an?",
    options: [
      "IaaS, Kosten fallen rund um die Uhr an",
      "PaaS, Kosten pro Server und Stunde",
      "SaaS, Kosten pro Benutzer und Monat",
      "FaaS, Kosten fallen nur bei der Ausführung der Funktion an"
    ],
    correct: [3],
    explanation: "Bei FaaS läuft kein Server für Sie. Eine nächtliche Backup-Funktion kostet praktisch nichts, eine dafür dauernd laufende EC2-Instanz schon."
  },
  {
    id: "kn08-22",
    topic: "KN08 PaaS und FaaS",
    text: "Was liefern Sie bei FaaS, und was liefert der Anbieter?",
    options: [
      "Sie liefern nur den Code (die Funktion), Laufzeit, OS und Infrastruktur stellt der Anbieter",
      "Sie liefern das Betriebssystem, der Anbieter die Funktion",
      "Sie liefern gar nichts, es ist fertige Software",
      "Sie liefern Hardware und Netzwerk"
    ],
    correct: [0],
    explanation: "In der Verantwortungstabelle ist bei FaaS nur die Applikation (der Code) Ihre Aufgabe."
  },
  {
    id: "kn08-23",
    topic: "KN08 PaaS und FaaS",
    text: "Wie findet backup.py die zu sichernden Instanzen?",
    options: [
      "Über alle Instanzen im Konto, ohne Filter",
      "Über den Instanznamen, der mit snapshot beginnt",
      "Über einen Filter auf den Tag-Key backup bzw. Backup",
      "Über die Security Group mit Port 22"
    ],
    correct: [2],
    explanation: "describe_instances filtert mit tag-key auf die Werte backup und Backup."
  },
  {
    id: "kn08-24",
    topic: "KN08 PaaS und FaaS",
    text: "Was erstellt backup.py für jede gefundene Instanz?",
    options: [
      "Ein AMI der ganzen Instanz",
      "Eine Kopie der Instanz in einer zweiten Region",
      "Einen S3-Bucket pro Instanz",
      "Snapshots der angehängten EBS-Volumes, die anschliessend mit DeleteOn getaggt werden"
    ],
    correct: [3],
    explanation: "Das Skript ruft create_snapshot für die EBS-Volumes auf und setzt den Tag DeleteOn mit dem Löschdatum."
  },
  {
    id: "kn08-25",
    topic: "KN08 PaaS und FaaS",
    text: "Wie kommt das Löschdatum (DeleteOn) zustande?",
    options: [
      "Heute plus Aufbewahrungsdauer: Standard 7 Tage, pro Instanz mit dem Tag Retention übersteuerbar",
      "Es wird manuell im GUI eingetragen",
      "Es ist immer fix 30 Tage in der Zukunft",
      "Es entspricht dem Datum der Instanz-Erstellung"
    ],
    correct: [0],
    explanation: "backup.py nimmt standardmässig 7 Tage und liest andernfalls den Wert des Tags Retention der Instanz."
  },
  {
    id: "kn08-26",
    topic: "KN08 PaaS und FaaS",
    text: "Was löscht cleanup.py, und was folgt daraus für die Ausführungsfrequenz?",
    options: [
      "Alle Snapshots, die älter als 7 Tage sind. Wöchentlich genügt",
      "Alle Snapshots im Konto. Es darf nie laufen",
      "Snapshots mit DeleteOn exakt gleich heute. Das Skript muss mindestens täglich laufen, sonst bleiben Snapshots hängen",
      "Alle Instanzen mit Tag Backup. Einmal pro Monat reicht"
    ],
    correct: [2],
    explanation: "cleanup.py filtert auf DeleteOn = heutiges Datum (YYYY-MM-DD). Fällt ein Tag aus, wird der Snapshot später nie mehr gefunden."
  },
  {
    id: "kn08-27",
    topic: "KN08 PaaS und FaaS",
    text: "Cleanup löscht beim Handtest nichts. Was prüfen Sie? (Mehrfachauswahl)",
    options: [
      "Ob DeleteOn genau das heutige Datum im Format YYYY-MM-DD enthält",
      "Ob der Instanztyp t3.micro ist",
      "Ob der Test an einem Snapshot mit Tag DeleteOn durchgeführt wird und nicht an einem ohne Tag",
      "Ob nginx läuft"
    ],
    correct: [0,2],
    explanation: "cleanup.py findet nur Snapshots mit dem Tag DeleteOn = exakt heute."
  },
  {
    id: "kn08-28",
    topic: "KN08 PaaS und FaaS",
    text: "Die Lambda-Funktion bricht mit Task timed out after 3.00 seconds ab. Was ist die Lösung?",
    options: [
      "Die Funktion in eine EC2-Instanz kopieren",
      "In der Funktions-Konfiguration den Timeout erhöhen, z. B. auf 1 Minute",
      "Das Tag Backup in backup umbenennen",
      "Den Snapshot von Hand löschen"
    ],
    correct: [1],
    explanation: "Der Standard-Timeout von 3 Sekunden ist für describe/create-Aufrufe zu kurz."
  },
  {
    id: "kn08-29",
    topic: "KN08 PaaS und FaaS",
    text: "Welche Execution Role verwenden Sie für die Lambda-Funktionen im Learner Lab?",
    options: [
      "Eine selbst erstellte Rolle",
      "Die Rolle root",
      "Die bestehende LabRole, da eigene Rollen im Learner Lab gesperrt sind",
      "Gar keine Rolle"
    ],
    correct: [2],
    explanation: "Bei AccessDenied-Fehlern prüfen Sie, ob wirklich die LabRole als Execution Role gesetzt ist."
  },
  {
    id: "kn08-30",
    topic: "KN08 PaaS und FaaS",
    text: "Wie lassen Sie die Backup-Funktion täglich automatisch ausführen?",
    options: [
      "Mit einem Zeitplan über EventBridge Scheduler bzw. einem Trigger an der Lambda-Funktion",
      "Mit einem Eintrag in der Security Group",
      "Mit einem Load Balancer Listener",
      "Mit einem cron-Job auf dem Laptop"
    ],
    correct: [0],
    explanation: "Zeitgesteuerte Auslösung ist der Kern von D3. Zum Schluss wird der Zeitplan wieder deaktiviert oder gelöscht."
  },
  {
    id: "kn08-31",
    topic: "KN08 PaaS und FaaS",
    text: "Backup findet 0 Instanzen. Was prüfen Sie? (Mehrfachauswahl)",
    options: [
      "Ob der Tag exakt Backup (bzw. backup) heisst",
      "Ob die Instanzen in der Region us-east-1 laufen, in der die Funktion sucht",
      "Ob die Lambda-Funktion Python verwendet",
      "Ob der RDS-Endpoint erreichbar ist"
    ],
    correct: [0,1],
    explanation: "Der Tag-Filter ist exakt, und die Abfrage gilt für die Region der Funktion (hier us-east-1)."
  },
  {
    id: "kn08-32",
    topic: "KN08 PaaS und FaaS",
    text: "Wie vergeben Sie den Tag Backup an beide Instanzen gemäss Aufgabe D1?",
    options: [
      "Im GUI per Hand bei jeder Instanz",
      "Im cloud-init unter runcmd",
      "Per E-Mail an die Lehrperson",
      "Als Code im tags-Block der Instanz-Ressource in den .tf-Dateien"
    ],
    correct: [3],
    explanation: "Die Aufgabe verlangt explizit den Tag als Code und nicht im GUI."
  },
  {
    id: "kn08-33",
    topic: "KN08 PaaS und FaaS",
    text: "Wofür steht boto3, das in backup.py und cleanup.py importiert wird?",
    options: [
      "Ein Linux-Paketmanager",
      "Das AWS-SDK für Python",
      "Der Name der Lambda-Runtime",
      "Ein OpenTofu-Provider"
    ],
    correct: [1],
    explanation: "boto3 ist die Python-Bibliothek, mit der die Skripte EC2-Snapshots und Tags ansteuern."
  },
  {
    id: "kn08-34",
    topic: "KN08 PaaS und FaaS",
    text: "Der Screenshot zeigt einen Snapshot mit Starttermin 2023/03/23 und dem Tag DeleteOn = 2023-03-30. Welche Aufbewahrungsdauer wurde angewendet, und wann wird er von cleanup.py gelöscht?",
    image: "Anforderungen/Unterlagen/Kompetenznachweise/KN08/snapshots.png",
    imageAlt: "AWS-Konsole mit einem 20 GiB Snapshot, gestartet am 2023/03/23, Tag DeleteOn mit Wert 2023-03-30",
    options: [
      "1 Tag, gelöscht am 24. März",
      "7 Tage (Standard), gelöscht beim Lauf von cleanup.py am 30. März 2023",
      "30 Tage, gelöscht Ende April",
      "Gar nicht, der Snapshot ist dauerhaft"
    ],
    correct: [1],
    explanation: "23. März plus 7 Tage ergibt den 30. März. cleanup.py löscht Snapshots, deren DeleteOn dem heutigen Datum entspricht."
  },
  {
    id: "kn08-35",
    topic: "KN08 PaaS und FaaS",
    text: "Welches Speichermodell steckt hinter den EBS-Volumes, von denen backup.py Snapshots erstellt?",
    options: [
      "Objektspeicher, wie S3",
      "Dateispeicher, wie EFS",
      "Flüchtiger Speicher, wie Instance Store",
      "Blockspeicher: die Disk der EC2-Instanz"
    ],
    correct: [3],
    explanation: "EBS ist Blockspeicher und die Disk der Instanz. Gemäss Theorie wird er immer nur an eine Instanz angehängt."
  },
  {
    id: "kn08-36",
    topic: "KN08 PaaS und FaaS",
    text: "Warum ist Lambda für die nächtliche Backup-Automation das richtige Servicemodell?",
    options: [
      "Weil es keinen Server braucht und nur für die kurze Ausführung bezahlt wird, während eine rund um die Uhr laufende EC2-Instanz auch im Leerlauf kostet",
      "Weil Lambda mehr Speicher bietet als EC2",
      "Weil Lambda keine Rollen braucht",
      "Weil nur Lambda Snapshots erstellen kann"
    ],
    correct: [0],
    explanation: "Kostenargument des FaaS-Modells: Bezahlt wird die effektive Ausführungszeit."
  },
  {
    id: "kn08-37",
    topic: "KN08 PaaS und FaaS",
    text: "Was ist beim Aufräumen nach D3 zusätzlich nötig? (Mehrfachauswahl)",
    options: [
      "Den Lambda-Zeitplan deaktivieren oder löschen",
      "Übrig gebliebene Snapshots löschen, da sie nicht mit tofu destroy entfernt werden",
      "Die Schulungsunterlagen archivieren",
      "Den Atlas-Cluster in Free-Tier-Compute umwandeln"
    ],
    correct: [0,1],
    explanation: "Die Snapshots wurden von der Funktion erstellt und gehören nicht zum OpenTofu-State. Der Zeitplan würde sonst weiter Snapshots erzeugen."
  }
);
