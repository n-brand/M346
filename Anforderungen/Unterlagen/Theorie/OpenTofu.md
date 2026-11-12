# OpenTofu

> **Auftrag:** [KN03](../Kompetenznachweise/KN03.md) · **Installation:** [Tools/OpenTofu.md](../Tools/OpenTofu.md)

## Lernziele

- Sie können erklären, was OpenTofu ist und wie es sich zu Terraform verhält.
- Sie beherrschen den Arbeitszyklus `init` → `plan` → `apply` → `destroy`.
- Sie können Ressourcen deklarieren und über Referenzen verknüpfen.
- Sie können erklären, was der State ist und warum er (wie alle Secrets) nicht ins Git gehört.
- Sie kennen die Besonderheiten im AWS Learner Lab.

## Was ist OpenTofu?

OpenTofu ist ein Werkzeug, das **Infrastruktur aus deklarativem Code** erstellt: Sie beschreiben in `.tf`-Dateien, welche Ressourcen existieren sollen (Instanzen, Security Groups, Netzwerke, Volumes) – OpenTofu vergleicht das mit der Realität und führt genau die nötigen Änderungen aus.

Zur Geschichte: Terraform war jahrelang der De-facto-Standard. 2023 wechselte der Hersteller HashiCorp auf eine restriktivere Lizenz – daraufhin entstand OpenTofu als **Open-Source-Fork** unter der Linux Foundation. Sprache (HCL), Konzepte und Provider sind identisch; der Befehl heisst `tofu` statt `terraform`. **Alle Terraform-Tutorials und KI-Antworten funktionieren praktisch 1:1** – genau deshalb müssen Sie die Konzepte verstehen, nicht die Markennamen.

OpenTofu ist **Provider-unabhängig**: Derselbe Werkzeugkasten verwaltet AWS, Azure, Google Cloud und hunderte weitere Dienste. Der jeweilige «Provider» übersetzt Ihre Deklarationen in API-Aufrufe des Anbieters.

## Ein vollständiges Beispiel

Instanz + Security Group + cloud-init – die Grundstruktur, die Sie in KN03 bauen:

```hcl
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"          # Learner Lab läuft in us-east-1
}

resource "aws_security_group" "web_sg" {
  name = "sg-webserver"

  ingress {                     # eingehend: HTTP für alle
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {                     # eingehend: SSH
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {                      # ausgehend: alles erlaubt
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami                    = "ami-0b6d9d3d33ba97d99"          # Ubuntu 26.04
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.web_sg.id]   # Referenz!
  user_data              = file("cloud-init-web.yaml")      # cloud-init übergeben

  tags = {
    Name = "KN03-Web"
  }
}

output "public_ip" {            # nach dem apply anzeigen
  value = aws_instance.web.public_ip
}
```

Der entscheidende Mechanismus ist die **Referenz** `aws_security_group.web_sg.id`: Die ID der Security Group existiert erst, wenn AWS sie erstellt hat. Mit CLI-Befehlen müssten Sie die ID aus der Antwort des ersten Befehls herauskopieren und in den zweiten einsetzen. OpenTofu löst das selbst auf und erkennt daraus auch die richtige **Reihenfolge**: erst die Security Group, dann die Instanz.

## Der Arbeitszyklus

```bash
tofu init      # einmalig pro Projekt: Provider herunterladen
tofu plan      # Vorschau: was WÜRDE passieren? (+ erstellen, ~ ändern, - löschen)
tofu apply     # Änderungen ausführen (zeigt den Plan und fragt nach)
tofu destroy   # alles aus diesem Code Erstellte wieder entfernen
```

`plan` ist Ihr Sicherheitsnetz und Ihr Lernwerkzeug: **Lesen Sie den Plan, bevor Sie bestätigen.** Er zeigt exakt, was erstellt, geändert oder – Vorsicht – **ersetzt** wird (manche Änderungen, z. B. an `user_data`, erzwingen Neuerstellung der Instanz: `-/+ destroy and then create replacement`).

## Der State

OpenTofu merkt sich in der Datei `terraform.tfstate`, welche realen Ressourcen zu Ihrem Code gehören (Zuordnung Code ↔ echte IDs). Daraus folgt:

1. **State nie von Hand editieren oder löschen** – sonst «vergisst» OpenTofu seine Ressourcen und legt Duplikate an oder kann nichts mehr aufräumen.
2. **State nicht ins Git** – er enthält alle Attribute im Klartext, potenziell auch sensible. In die `.gitignore` gehören: `terraform.tfstate*`, `.terraform/`.
3. Änderungen an der Infrastruktur laufen **immer durch OpenTofu**, nie durchs GUI – sonst weichen State und Realität voneinander ab (Drift).

## Besonderheiten im AWS Learner Lab

| Learner-Lab-Eigenheit | Umgang |
|---|---|
| Credentials ändern bei jedem Lab-Start | Vor der Arbeit die aktuellen Werte (inkl. `aws_session_token`!) in `~/.aws/credentials` übertragen. Der Provider liest sie automatisch – **niemals Credentials in .tf-Dateien schreiben.** |
| Region | `us-east-1` |
| Kein IAM-Management | Keine Rollen/Benutzer per OpenTofu erstellen; wo nötig `LabRole`/`LabInstanceProfile` referenzieren |
| Lab stoppt nach 4h | Instanzen werden nur gestoppt (nichts geht verloren), aber die öffentlichen IPs ändern. Und dank IaC können Sie Umgebungen jederzeit bedenkenlos zerstören und mit `tofu apply` neu aufbauen. |

## OpenTofu und KI

KI generiert brauchbaren HCL-Code – mit typischen Schwächen, die Sie erkennen müssen: veraltete AMI-IDs, falsche Region, Security Groups mit zu offenen Regeln (3306 für 0.0.0.0/0!), IAM-Konstrukte, die im Learner Lab nicht funktionieren, und Terraform-spezifische Details. Der Arbeitsablauf ist immer: generieren lassen → **Plan lesen und verstehen** → korrigieren → anwenden. Wer den Plan nicht lesen kann, führt fremden Code blind auf seiner Infrastruktur aus.

## Selbsttest

<details><summary>1. Was zeigt `tofu plan` bei einer Änderung von `instance_type`, und was bei einer Änderung von `user_data`? Warum der Unterschied?</summary>

`instance_type`: `~ update in-place` möglich (Stop/Änderung/Start durch AWS). `user_data`: `-/+ destroy and then create replacement` – cloud-init läuft nur beim ersten Boot, also erzwingt eine Änderung eine neue Instanz.
</details>

<details><summary>2. Ein Kollege hat `terraform.tfstate` gelöscht, «weil die Datei nicht im Git war und komisch aussah». Was ist jetzt das Problem?</summary>

OpenTofu hat die Zuordnung zu den realen Ressourcen verloren. `apply` würde alles doppelt anlegen, `destroy` kann nichts mehr aufräumen – die alten Ressourcen müssen von Hand (GUI/CLI) gefunden und gelöscht werden.
</details>

<details><summary>3. Warum gehören AWS-Credentials in `~/.aws/credentials` und nicht als Variablen in die .tf-Datei – die Datei liegt doch nur in Ihrem Repo?</summary>

Repos werden geteilt, geforkt, öffentlich gestellt oder geleakt – Credentials im Code landen früher oder später in fremden Händen (automatisierte Scanner durchsuchen GitHub/GitLab permanent danach). Trennung von Code und Geheimnissen ist ein Grundprinzip.
</details>

<details><summary>4. Woran erkennen Sie im Plan, dass eine KI-generierte Security Group ein Sicherheitsproblem enthält?</summary>

Ingress-Regeln prüfen: `cidr_blocks = ["0.0.0.0/0"]` auf Ports, die nicht öffentlich sein dürfen (z. B. 3306). Der Plan listet jede Regel – genau dafür liest man ihn.
</details>

## Quellen

- <https://opentofu.org/docs/> – offizielle Dokumentation
- <https://developer.hashicorp.com/terraform/tutorials/aws-get-started> – Terraform-Tutorial (1:1 übertragbar, `terraform` → `tofu`)
- <https://search.opentofu.org/providers/hashicorp/aws/latest> – AWS-Provider-Referenz
