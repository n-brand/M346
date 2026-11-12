# Infrastructure as Code (Überblick)

## Lernziele

- Sie können das Paradigma «Infrastructure as Code» (IaC) und dessen Ziele erklären.
- Sie kennen den Unterschied zwischen imperativem und deklarativem Vorgehen.
- Sie können die Werkzeuge des Moduls (cloud-init, OpenTofu, Ansible, CLI) den richtigen Ebenen zuordnen und wissen, wann welches zum Einsatz kommt.

## Das Paradigma

Infrastructure as Code ist ein Ansatz zur Automatisierung der Infrastruktur, der auf Praktiken aus der Softwareentwicklung basiert: Systeme und ihre Konfiguration werden als **Code** definiert (konsistent, wiederholbar, versioniert in Git), und automatisierte Prozesse übertragen Änderungen am Code auf die Systeme.

Für Firmen wie Amazon, Netflix oder Google sind IT-Systeme nicht nur geschäftskritisch – sie **sind** das Geschäft. Kein Mensch könnte deren Infrastruktur von Hand verwalten.

Die Ziele:

- Änderungen sind Routine statt Drama: klein, häufig, getestet – statt riskanter «Urknall»-Projekte.
- Fehler-Erholung statt Fehler-Verhinderung: Eine kaputte Umgebung wird aus dem Code neu erstellt, nicht mühsam repariert.
- Menschen verbringen Zeit mit wertvoller Arbeit statt mit repetitiven Handgriffen.
- Der Code **ist** die Dokumentation – ein Git-Repo zeigt exakt, wie die Umgebung aussieht und wer wann was geändert hat.

**Sie erleben den Nutzen im Modul direkt:** Eine Umgebung, die als Code existiert, kann man jederzeit bedenkenlos wegwerfen und in Minuten identisch neu aufbauen – für ein frisches Experiment, nach einem kaputten Zustand oder zum Kostensparen. Wer geklickt hat, klammert sich an seine Umgebung; wer Code hat, tippt `tofu apply` und trinkt einen Kaffee.

## Imperativ vs. deklarativ

Der wichtigste Denkunterschied in diesem Modul:

| | Imperativ («wie») | Deklarativ («was») |
|---|---|---|
| Sie beschreiben | die Schritte zum Ziel | den Zielzustand |
| Beispiel | «Erstelle eine Instanz. Erstelle eine SG. Verbinde sie.» | «Es existiert eine Instanz mit dieser SG.» |
| Zweite Ausführung | erstellt alles doppelt (oder scheitert) | ändert nichts – Ziel ist ja erreicht |
| Werkzeuge | Shell-Skripte, CLI-Befehle | OpenTofu, Ansible*, cloud-init |

*Ansible-Playbooks sind deklarativ gedacht (Module beschreiben Zielzustände), auch wenn sie schrittweise abgearbeitet werden.

Die deklarative Eigenschaft «zweimal ausführen ändert nichts» heisst **Idempotenz** – sie macht Automatisierung erst sicher, weil man Code gefahrlos wiederholt anwenden kann.

## Die Werkzeug-Landschaft des Moduls

Drei Werkzeuge, drei Ebenen – die Abgrenzung ist Prüfungsstoff und Praxiswissen:

| Werkzeug | Ebene | Beantwortet die Frage | Typischer Moment |
|---|---|---|---|
| [OpenTofu](./OpenTofu.md) | Infrastruktur | Welche Ressourcen existieren? (Instanzen, Netze, SGs, Volumes) | vor dem ersten Boot |
| [cloud-init](./CloudInit.md) | Ersteinrichtung | Wie richtet sich eine Instanz beim **ersten Start** ein? (User, Pakete, Dateien) | beim ersten Boot |
| [Ansible](./Ansible.md) | Betrieb | Wie wird eine **laufende** Instanz konfiguriert und aktuell gehalten? | nach dem Boot, wiederholt |

Merkhilfe: **OpenTofu baut das Haus, cloud-init richtet es beim Einzug ein, Ansible macht den Unterhalt.** Die Werkzeuge konkurrieren nicht, sie ergänzen sich – OpenTofu übergibt die cloud-init-Datei als `user_data` an die Instanz, und Ansible übernimmt, sobald sie läuft.

**Und die CLI?** Jeder Anbieter hat ein Command Line Interface ([AWS](https://aws.amazon.com/cli/), [Azure](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli), [Google](https://cloud.google.com/sdk/gcloud)), mit dem sich alle Ressourcen imperativ erstellen lassen. Für vollständige Umgebungen ist das mühsam: Jeder Befehl liefert IDs zurück, die man von Hand in den nächsten Befehl übertragen muss – genau das Problem, das OpenTofu mit Referenzen zwischen Ressourcen löst. Im Modul nutzen Sie die CLI darum nur für zwei Dinge: **Credentials einrichten** und **schnell etwas nachschauen** (`aws ec2 describe-instances`).

## IaC und KI

IaC-Dateien sind Text – und damit ideal für KI-Generierung. Genau darum gilt im Modul: Sie dürfen Configs generieren lassen, aber Sie müssen jede Zeile erklären und Fehler erkennen können. Eine generierte Security Group mit offenem Datenbank-Port sieht syntaktisch perfekt aus – ob sie ein Sicherheitsloch ist, erkennt nur, wer die Konzepte versteht. Der Wert Ihrer Arbeit verschiebt sich vom Schreiben zum **Beurteilen**.

## Selbsttest

<details><summary>1. Erklären Sie einem Kollegen den Unterschied zwischen OpenTofu und Ansible in zwei Sätzen.</summary>

OpenTofu erstellt und verwaltet die Infrastruktur selbst – Instanzen, Netzwerke, Security Groups («baut das Haus»). Ansible konfiguriert laufende Server – installiert Pakete, verteilt Konfigurationsdateien, startet Dienste («macht den Unterhalt»).
</details>

<details><summary>2. Ein Bash-Skript mit 20 aws-CLI-Befehlen erstellt Ihre Umgebung. Beim zweiten Ausführen bricht es ab («already exists»). Welche Eigenschaft fehlt, und welche Werkzeugklasse löst das?</summary>

Idempotenz. Deklarative Werkzeuge wie OpenTofu vergleichen Zielzustand mit Ist-Zustand und tun beim zweiten Lauf einfach nichts (bzw. nur die Differenz).
</details>

<details><summary>3. Warum ist «der Code ist die Dokumentation» mehr als ein Spruch? Nennen Sie zwei konkrete Vorteile gegenüber einem Wiki-Artikel über die Serverkonfiguration.</summary>

(1) Der Code kann nicht veralten, ohne dass es auffällt – er ist die tatsächlich angewendete Wahrheit, während Wikis von der Realität abdriften. (2) Git liefert Historie und Verantwortlichkeit: Wer hat wann welchen Port geöffnet, und warum (Commit Message)?
</details>

## Quellen

- Kief Morris: Infrastructure as Code (O'Reilly) – Standardwerk zum Paradigma
- [Cloud Native Kurs TBZ/HF](https://gitlab.com/ch-tbz-hf/Stud/cnt/-/tree/main/2_Unterrichtsressourcen/B)
