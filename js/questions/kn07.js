window.QUESTIONS.push(
  {
    id: "kn07-01",
    topic: "KN07 Skalierung",
    text: "Die Shop-App läuft intern auf Port 5000 (.NET) bzw. 5001 (Java), ist aber auf Port 80 erreichbar. Welche Rolle spielt nginx dabei?",
    options: [
      "nginx ist ein Load Balancer, der die Anfragen auf mehrere Instanzen verteilt",
      "nginx führt den Datenbank-Import in MongoDB Atlas durch",
      "nginx ist ein Reverse Proxy: Er nimmt Anfragen auf Port 80 entgegen und leitet sie an die App auf localhost weiter",
      "nginx verschlüsselt die Verbindung automatisch mit TLS"
    ],
    correct: [2],
    explanation: "Ein Reverse Proxy steht vor der Applikation und leitet Anfragen per proxy_pass weiter (hier an 127.0.0.1:5000 bzw. 5001). TLS ist im cloud-init bewusst nicht konfiguriert."
  },
  {
    id: "kn07-02",
    topic: "KN07 Skalierung",
    text: "Auf welchen internen Ports lauscht die Shop-App hinter nginx?",
    options: [
      "Java: 5001, .NET: 5000",
      "Java und .NET: beide 80",
      "Java: 5000, .NET: 5001",
      "Java und .NET: beide 443"
    ],
    correct: [0],
    explanation: "Das .NET-cloud-init leitet an Port 5000, das Java-cloud-init an Port 5001 weiter. Von aussen ist die App nur auf Port 80 erreichbar."
  },
  {
    id: "kn07-03",
    topic: "KN07 Skalierung",
    text: "Warum ist eine externe Datenbank (MongoDB Atlas) die Voraussetzung für austauschbare Web-Instanzen?",
    options: [
      "Weil EC2-Instanzen keine Datenbank installieren können",
      "Weil Atlas schneller ist als jede lokale Datenbank",
      "Weil der Load Balancer nur mit externen Datenbanken zusammenarbeitet",
      "Weil die Webinstanzen dadurch zustandslos (stateless) sind: Jede Instanz kann jede Anfrage beantworten, der Zustand liegt in der gemeinsamen DB"
    ],
    correct: [3],
    explanation: "Horizontale Skalierung setzt Zustandslosigkeit voraus. Daten liegen in einem gemeinsamen Dienst, deshalb können Instanzen beliebig ersetzt oder hinzugefügt werden."
  },
  {
    id: "kn07-04",
    topic: "KN07 Skalierung",
    text: "Wie wird MongoDB Atlas im Modul eingeordnet?",
    options: [
      "IaaS, weil man virtuelle Server mietet",
      "SaaS, weil man eine fertige Datenbank nutzt und keinen Datenbank-Server mehr betreibt",
      "FaaS, weil die Datenbank nur bei Abfragen läuft",
      "On Premise, weil die Daten von der eigenen App stammen"
    ],
    correct: [1],
    explanation: "In der Servicemodell-Tabelle des Moduls ist MongoDB Atlas SaaS (null Betrieb bei Ihnen). Als Grenzfall (DBaaS) ist auch PaaS diskutierbar, entscheidend ist die Begründung."
  },
  {
    id: "kn07-05",
    topic: "KN07 Skalierung",
    text: "Ihre Web-Instanzen haben wechselnde IP-Adressen. Welche Netzwerk-Freigabe in Atlas ist dafür nötig, und was ist der Trade-off?",
    options: [
      "Nur die IP des Load Balancers, das ist sicherer und funktioniert immer",
      "Der Bereich 0.0.0.0/0: Das funktioniert mit wechselnden IPs, öffnet die DB aber für das ganze Internet, geschützt nur durch Benutzer und Passwort",
      "Keine Freigabe, Atlas erkennt AWS-Instanzen automatisch",
      "Port 22 muss für alle IPs geöffnet werden"
    ],
    correct: [1],
    explanation: "Bei wechselnden Quell-IPs bleibt in der Lernumgebung nur ein sehr weiter Range. Das ist bequem, aber ein Sicherheits-Trade-off, weil nur noch die Zugangsdaten schützen."
  },
  {
    id: "kn07-06",
    topic: "KN07 Skalierung",
    text: "Vertikale Skalierung einer EC2-Instanz: Was geht im laufenden Betrieb, was nicht?",
    options: [
      "Beides erfordert die Neuerstellung der Instanz",
      "Beides geht immer im laufenden Betrieb",
      "Instanztyp wechseln geht hot, die Disk vergrössern erfordert einen Stop",
      "Disk vergrössern geht im laufenden Betrieb, der Instanztyp wechseln erfordert Stop, ändern, Start"
    ],
    correct: [3],
    explanation: "Bei AWS lässt sich der Datenspeicher hot vergrössern. CPU und RAM (Instanztyp) können nur bei gestoppter Instanz geändert werden."
  },
  {
    id: "kn07-07",
    topic: "KN07 Skalierung",
    text: "Welche Grenzen und Nachteile hat vertikale Skalierung? (Mehrfachauswahl)",
    options: [
      "Es gibt eine Obergrenze: irgendwann existiert keine grössere Maschine mehr",
      "Sie erfordert zwingend eine Änderung der Applikation auf stateless",
      "Beim Typwechsel entsteht Downtime, und es bleibt eine einzelne Instanz (Single Point of Failure)",
      "Sie ist nur mit einem Load Balancer möglich"
    ],
    correct: [0,2],
    explanation: "Vertikale Skalierung ist einfach und braucht keine App-Anpassung, hat aber eine Obergrenze, Downtime beim Umstellen und keine Ausfallsicherheit."
  },
  {
    id: "kn07-08",
    topic: "KN07 Skalierung",
    text: "Sie haben die Root-Disk per OpenTofu auf 20 GB vergrössert. Mit welchem Befehl prüfen Sie in der Instanz die verfügbare Grösse der Dateisysteme?",
    options: [
      "df -h",
      "ls -l /",
      "tail -f /var/log/cloud-init-output.log",
      "systemctl status shop-app"
    ],
    correct: [0],
    explanation: "df -h zeigt Grösse und Belegung der eingehängten Dateisysteme. Die Aufgabe in Teil B verlangt genau diese Prüfung nach der Disk-Vergrösserung."
  },
  {
    id: "kn07-09",
    topic: "KN07 Skalierung",
    text: "Eine Legacy-Applikation speichert Benutzer-Sessions im lokalen RAM der Instanz. Was ist die passende Skalierungsstrategie?",
    options: [
      "Horizontal mit einem Load Balancer, das funktioniert immer",
      "Gar nicht skalieren, weil Skalierung bei Legacy unmöglich ist",
      "Zuerst nur vertikal, weil die App nicht stateless ist und Benutzer sonst zufällig ausgeloggt würden",
      "Auto Scaling mit möglichst vielen Instanzen"
    ],
    correct: [2],
    explanation: "Ohne Zustandslosigkeit landet die nächste Anfrage evtl. bei einer Instanz ohne Session. Erst nach Auslagern der Sessions (DB, Redis) ist horizontale Skalierung sinnvoll."
  },
  {
    id: "kn07-10",
    topic: "KN07 Skalierung",
    text: "Ein Webshop hat starke Lastspitzen (z. B. Black Friday) und danach wieder wenig Last. Welche Lösung passt am besten?",
    options: [
      "Eine sehr grosse Instanz dauerhaft (vertikal)",
      "Die Datenbank auf die Web-Instanz verschieben",
      "Zwei Instanzen fix, ohne Load Balancer",
      "Horizontal skalieren mit Auto Scaling: Spitzen abfangen und danach automatisch zurückbauen"
    ],
    correct: [3],
    explanation: "Horizontal plus Auto Scaling fängt Spitzen ab und spart danach Kosten durch automatisches Zurückbauen."
  },
  {
    id: "kn07-11",
    topic: "KN07 Skalierung",
    text: "Ein klassischer SQL-Datenbankserver braucht mehr RAM. Welche Skalierungsart ist laut Theorie die übliche Wahl?",
    options: [
      "Vertikal, weil klassische SQL-Datenbanken schlecht horizontal skalieren",
      "Horizontal, weil SQL-Datenbanken beliebig verteilt werden können",
      "Auto Scaling mit Target Tracking",
      "Keine, RAM lässt sich in der Cloud nicht anpassen"
    ],
    correct: [0],
    explanation: "Datenbankserver werden typischerweise vertikal skaliert (siehe Entscheidungstabelle in der Theorie zur Skalierung)."
  },
  {
    id: "kn07-12",
    topic: "KN07 Skalierung",
    text: "Der Load Balancer hat einen DNS-Namen wie xyz.elb.amazonaws.com. Wie lassen Sie Ihre Domain app.firma.ch darauf zeigen?",
    options: [
      "Mit einem A-Record auf die aktuelle IP des Load Balancers",
      "Mit einem MX-Record auf den Load-Balancer-Namen",
      "Mit einem CNAME- bzw. Alias-Eintrag auf den Load-Balancer-Namen",
      "Gar nicht, Load Balancer sind nur mit IP erreichbar"
    ],
    correct: [2],
    explanation: "Die IP-Adressen eines Load Balancers können sich ändern, deshalb zeigt man per CNAME/Alias auf seinen DNS-Namen."
  },
  {
    id: "kn07-13",
    topic: "KN07 Skalierung",
    text: "Wozu dienen Health Checks im Zusammenspiel mit Load Balancer und Auto Scaling? (Mehrfachauswahl)",
    options: [
      "Der Load Balancer prüft periodisch, ob jede Instanz gesund ist, und schickt ungesunden Instanzen keinen Traffic mehr",
      "Sie verschlüsseln die Verbindung zwischen Load Balancer und Instanz",
      "Mit health_check_type = ELB erkennt die Auto Scaling Group kranke Instanzen und ersetzt sie",
      "Sie verteilen die Last nach Round Robin"
    ],
    correct: [0,2],
    explanation: "Ohne funktionierende Health Checks funktioniert weder Load Balancing noch Auto Scaling. Bei Typ ELB nutzt die ASG das Urteil des Load Balancers."
  },
  {
    id: "kn07-14",
    topic: "KN07 Skalierung",
    text: "Welche Rolle hat das Launch Template (aws_launch_template)?",
    options: [
      "Es verteilt eingehende Anfragen auf die Instanzen",
      "Es ist die Vorlage für jede neue Instanz: Image, Typ, Security Group und cloud-init als user_data",
      "Es legt fest, wie viele Instanzen mindestens laufen",
      "Es prüft, ob eine Instanz gesund ist"
    ],
    correct: [1],
    explanation: "Das Launch Template beschreibt, wie eine neue Instanz aussieht. Die Anzahl steuert die Auto Scaling Group, die Verteilung der Load Balancer."
  },
  {
    id: "kn07-15",
    topic: "KN07 Skalierung",
    text: "Ordnen Sie zu: Welche Aufgabe hat die Target Group (aws_lb_target_group)?",
    options: [
      "Sie nimmt die Anfragen auf Port 80 am Load Balancer entgegen",
      "Sie startet bei Last neue Instanzen",
      "Sie enthält die Ziel-Instanzen samt Port und Health Check, an die der Load Balancer weiterleitet",
      "Sie definiert die erlaubten SSH-Schlüssel"
    ],
    correct: [2],
    explanation: "Die Target Group ist die Gruppe der Ziele (Port 80, Health Check-Pfad). Der Listener nimmt Anfragen an, die ASG verwaltet die Instanzen."
  },
  {
    id: "kn07-16",
    topic: "KN07 Skalierung",
    text: "Welche Rolle hat der Listener (aws_lb_listener) am Application Load Balancer?",
    options: [
      "Er prüft auf einem Port (z. B. 80) auf eingehende Verbindungen und leitet sie an eine Target Group weiter",
      "Er überwacht die CPU-Auslastung der Instanzen",
      "Er erstellt die Snapshots der Volumes",
      "Er speichert die Benutzer-Sessions"
    ],
    correct: [0],
    explanation: "Der Listener ist der Eingang des Load Balancers: Port und Protokoll, plus Regel, an welche Target Group weitergeleitet wird."
  },
  {
    id: "kn07-17",
    topic: "KN07 Skalierung",
    text: "Die ASG ist mit desired 2, minimum 2 und maximum 5 konfiguriert. Sie terminieren eine Instanz von Hand im GUI. Was passiert?",
    options: [
      "Nichts, die Flotte läuft mit einer Instanz weiter",
      "Die ASG wird automatisch gelöscht",
      "Der Load Balancer startet eine neue Instanz",
      "Die ASG startet eine neue Instanz aus dem Launch Template und stellt so den Sollwert wieder her"
    ],
    correct: [3],
    explanation: "Die Auto Scaling Group verteidigt ihren Sollwert (Selbstheilung). Die Ersatz-Instanz installiert sich per cloud-init selbst."
  },
  {
    id: "kn07-18",
    topic: "KN07 Skalierung",
    text: "Warum funktioniert die Selbstheilung nur, wenn die Installation vollautomatisch per cloud-init geschieht?",
    options: [
      "Weil sonst die Security Group fehlt",
      "Weil die Ersatz-Instanz vom rohen Image startet: Ohne automatische Installation bleibt der Health Check rot und die ASG ersetzt sie endlos",
      "Weil cloud-init den Load Balancer erstellt",
      "Weil AWS nur Instanzen mit cloud-init terminieren darf"
    ],
    correct: [1],
    explanation: "Niemand kann bei einer automatisch erstellten Instanz von Hand nachhelfen. Auto Scaling setzt vollautomatische Installation voraus."
  },
  {
    id: "kn07-19",
    topic: "KN07 Skalierung",
    text: "Die ASG ersetzt laufend Instanzen im Sekundentakt, weil der Health Check fehlschlägt, bevor die App fertig installiert ist. Was ist die passende Massnahme?",
    options: [
      "health_check_type auf EC2 stellen und den Load Balancer löschen",
      "health_check_grace_period grosszügig setzen, z. B. 300 Sekunden",
      "Das Maximum auf 1 setzen",
      "Port 22 in der Security Group öffnen"
    ],
    correct: [1],
    explanation: "Die Grace Period gibt der Instanz Zeit für die cloud-init-Installation, bevor der Health Check zählt."
  },
  {
    id: "kn07-20",
    topic: "KN07 Skalierung",
    text: "Der einmalige Datenbank-Import (mongosh ... < shop-database) gehört nicht ins cloud-init des Launch Templates. Warum?",
    options: [
      "mongosh ist auf Ubuntu nicht verfügbar",
      "Atlas erlaubt nur einen Import pro Tag",
      "Der Import dauert länger als 5 Minuten und wird von AWS abgebrochen",
      "Sonst würde jede neu gestartete Instanz die Daten erneut importieren"
    ],
    correct: [3],
    explanation: "Das Launch Template wird zur Massen-Vorlage. Die Daten sind seit Teil A in Atlas und müssen nicht bei jeder Instanz neu importiert werden."
  },
  {
    id: "kn07-21",
    topic: "KN07 Skalierung",
    text: "Welche Security-Group-Architektur ist für Teil C die saubere Lösung?",
    options: [
      "LB-SG: Port 80 von überall. Instanz-SG: Port 80 nur von der LB-SG und Port 22 für die Administration",
      "Beide Security Groups erlauben Port 80 von überall",
      "LB-SG: Port 22 von überall. Instanz-SG: alles offen",
      "Nur eine gemeinsame SG ohne Regeln"
    ],
    correct: [0],
    explanation: "Der Load Balancer ist der einzige öffentliche Eingang. Die Instanzen akzeptieren HTTP nur von der Security Group des Load Balancers."
  },
  {
    id: "kn07-22",
    topic: "KN07 Skalierung",
    text: "Braucht es hinter dem Load Balancer noch eine Elastic IP pro Instanz?",
    options: [
      "Ja, sonst kann der Load Balancer die Instanz nicht erreichen",
      "Ja, sonst funktioniert cloud-init nicht",
      "Nein, Benutzer sprechen nur den Load Balancer über seinen DNS-Namen an; feste IPs der einzelnen Instanzen sind nicht nötig",
      "Ja, jede Instanz der ASG braucht dieselbe Elastic IP"
    ],
    correct: [2],
    explanation: "Die Instanzen sind austauschbar, die Benutzer sehen nur den Load-Balancer-DNS-Namen. Öffentliche IPs der einzelnen Instanzen braucht es nicht mehr."
  },
  {
    id: "kn07-23",
    topic: "KN07 Skalierung",
    text: "Welcher OpenTofu-Ressourcentyp erstellt die Auto Scaling Group?",
    options: [
      "aws_lb_listener",
      "aws_lb_target_group",
      "aws_launch_template",
      "aws_autoscaling_group"
    ],
    correct: [3],
    explanation: "aws_autoscaling_group definiert Sollwert, Minimum, Maximum und die Verknüpfung mit der Target Group. Die anderen Typen sind Launch Template, Target Group und Listener."
  },
  {
    id: "kn07-24",
    topic: "KN07 Skalierung",
    text: "Wie wird das cloud-init als user_data im Launch Template übergeben?",
    options: [
      "Base64-kodiert, z. B. mit base64encode(file(\"...\"))",
      "Als Klartext-Datei direkt im Security-Group-Block",
      "Als Terraform-Output",
      "Per SSH nach dem Start"
    ],
    correct: [0],
    explanation: "Das Launch Template erwartet user_data Base64-kodiert, in OpenTofu mit base64encode(file(...))."
  },
  {
    id: "kn07-25",
    topic: "KN07 Skalierung",
    text: "Warum wird im Lasttest keine Anfrage-Flut über das Internet auf den Load Balancer geschickt?",
    options: [
      "Weil der Load Balancer nur 10 Anfragen pro Sekunde verarbeiten kann",
      "Weil HTTP-Anfragen nie die CPU belasten",
      "Weil Massen-Requests wie ein DoS-Angriff aussehen und im geteilten AWS-Academy-Umfeld eine Kontosperrung riskieren",
      "Weil Swagger keine Lasttests erlaubt"
    ],
    correct: [2],
    explanation: "Die Last wird stattdessen auf den Instanzen selbst erzeugt (stress-ng), das ist für den Autoscaler gleichwertig."
  },
  {
    id: "kn07-26",
    topic: "KN07 Skalierung",
    text: "Warum funktioniert der CPU-Ansatz mit stress-ng für den Autoscaler genauso wie echte Besucher?",
    options: [
      "Weil stress-ng echte HTTP-Anfragen simuliert",
      "Weil dem Autoscaler nur die CPU-Metrik zählt und es ihm egal ist, woher die Last kommt",
      "Weil stress-ng die Security Group ändert",
      "Weil der Autoscaler den Prozessnamen prüft"
    ],
    correct: [1],
    explanation: "Die Target-Tracking-Policy reagiert auf die Metrik CPUUtilization, nicht auf die Ursache der Last."
  },
  {
    id: "kn07-27",
    topic: "KN07 Skalierung",
    text: "Was bewirkt eine Target-Tracking-Policy (aws_autoscaling_policy) mit Ziel 50 % durchschnittliche CPU?",
    options: [
      "Die ASG terminiert alle Instanzen, sobald die CPU über 50 % liegt",
      "Jede Instanz wird auf 50 % CPU gedrosselt",
      "Die ASG startet bzw. entfernt Instanzen, um die durchschnittliche CPU-Auslastung der Gruppe um 50 % zu halten",
      "Der Load Balancer verteilt nur noch 50 % der Anfragen"
    ],
    correct: [2],
    explanation: "Target Tracking regelt die Flottengrösse (im Rahmen von Minimum und Maximum) so, dass die Zielmetrik gehalten wird."
  },
  {
    id: "kn07-28",
    topic: "KN07 Skalierung",
    text: "Die Flotte skaliert trotz stress-ng nicht hoch. Welche Ursachen sind plausibel? (Mehrfachauswahl)",
    options: [
      "stress-ng läuft nur auf einer von zwei Instanzen, der Autoscaler schaut aber auf den Durchschnitt",
      "Die Instanzen haben keine Elastic IP",
      "Die Metriken hinken ca. 1 bis 2 Minuten hinterher, es braucht Geduld",
      "Die Datenbank liegt bei MongoDB Atlas"
    ],
    correct: [0,2],
    explanation: "Der Autoscaler wertet den Gruppen-Durchschnitt aus, und CloudWatch-Metriken laufen in Minuten-Intervallen. Zudem muss --cpu zum Instanztyp passen (2 bei t3.micro)."
  },
  {
    id: "kn07-29",
    topic: "KN07 Skalierung",
    text: "Neue Instanzen sind nach dem Scale-out noch unbelastet. Was bedeutet das für die Steuerung?",
    options: [
      "Sie senken den CPU-Durchschnitt der Flotte, deshalb skaliert sie evtl. nicht weiter hoch",
      "Sie erhöhen den CPU-Durchschnitt der Flotte",
      "Sie werden sofort wieder terminiert",
      "Sie werden vom Load Balancer ignoriert"
    ],
    correct: [0],
    explanation: "Die Policy arbeitet mit dem Gruppen-Durchschnitt. Unbelastete Instanzen drücken ihn nach unten."
  },
  {
    id: "kn07-30",
    topic: "KN07 Skalierung",
    text: "Wo finden Sie in der Konsole den fertigen Graphen Average CPU Utilization der Flotte?",
    options: [
      "In der Route-53-Konsole unter Hosted Zones",
      "Bei den Security Groups im Tab Inbound rules",
      "Im Elastic-IP-Menü",
      "EC2, Auto Scaling Groups, Ihre Gruppe, Tab Monitoring"
    ],
    correct: [3],
    explanation: "Dort liefert CloudWatch die Metrik CPUUtilization über die ganze Gruppe gemittelt. Alternativ: CloudWatch, Metrics, EC2, By Auto Scaling Group."
  },
  {
    id: "kn07-31",
    topic: "KN07 Skalierung",
    text: "Sie löschen im GUI von Hand eine Instanz nach der anderen, aber sie kommen immer wieder. Was ist die Ursache und das richtige Vorgehen?",
    options: [
      "Ein Fehler im Load Balancer, man muss AWS kontaktieren",
      "Das ist die ASG, die ihren Sollwert verteidigt. Aufgeräumt wird mit tofu destroy statt von Hand",
      "Die Instanzen sind durch Elastic IPs geschützt",
      "Die Instanzen werden von cloud-init neu erstellt"
    ],
    correct: [1],
    explanation: "Eine vergessene ASG erstellt gelöschte Instanzen immer wieder neu. Deshalb räumt man über den Code ab."
  },
  {
    id: "kn07-32",
    topic: "KN07 Skalierung",
    text: "Warum zeigt der Browser bei http://<IP>/swagger/ manchmal Timeout oder Verbindungsfehler, obwohl die App läuft?",
    options: [
      "Swagger funktioniert nur mit Port 443",
      "Der Browser hat automatisch auf https:// umgestellt, aber es ist bewusst kein TLS konfiguriert (nur Port 80)",
      "Der Browser blockiert alle Adressen mit Port 5000",
      "Die Datenbank ist zu langsam"
    ],
    correct: [1],
    explanation: "Weder Instanz noch Load Balancer haben TLS. Die Adresszeile muss http:// enthalten."
  },
  {
    id: "kn07-33",
    topic: "KN07 Skalierung",
    text: "Welche Punkte im bereitgestellten cloud-init sind für eine produktive Umgebung problematisch? (Mehrfachauswahl)",
    options: [
      "Das Datenbank-Passwort steht im Klartext im cloud-init (Geheimnis)",
      "Der Paketname nginx",
      "Der einmalige DB-Import und das Klonen eines Repos ohne feste Version sind nicht sauber wiederholbar",
      "Der Parameter ssh_pwauth: false"
    ],
    correct: [0,2],
    explanation: "Geheimnisse gehören nicht in Klartext-Dateien (z. B. Secrets Manager). Ausserdem fehlt die Wiederholbarkeit. ssh_pwauth: false ist dagegen eine sinnvolle Härtung."
  },
  {
    id: "kn07-34",
    topic: "KN07 Skalierung",
    text: "Wann lohnt sich Auto Scaling gegenüber fix 5 Instanzen?",
    options: [
      "Nie, fixe Instanzen sind immer günstiger",
      "Wenn man keine Load Balancer nutzen möchte",
      "Nur bei konstanter Last",
      "Bei schwankender Last: Man zahlt die zusätzlichen Instanzen nur, solange sie gebraucht werden"
    ],
    correct: [3],
    explanation: "Auto Scaling baut nach Lastspitzen wieder zurück und spart so Kosten gegenüber dauerhaft laufenden Maximal-Instanzen."
  },
  {
    id: "kn07-35",
    topic: "KN07 Skalierung",
    text: "Mit welchem Befehl verfolgen Sie auf der Instanz den Fortschritt des cloud-init?",
    options: [
      "tail -f /var/log/cloud-init-output.log",
      "df -h",
      "stress-ng --cpu 2",
      "nginx -s reload"
    ],
    correct: [0],
    explanation: "Die Installation dauert einige Minuten. Das cloud-init-Log zeigt den Fortschritt, journalctl -u shop-app die App-Logs."
  }
);
