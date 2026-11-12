# OpenTofu: Installation & Setup

OpenTofu ist das Infrastructure-as-Code-Werkzeug in diesem Modul (Theorie: [OpenTofu](../Theorie/OpenTofu.md)). Der Befehl heisst `tofu`.

## Installation

### Windows

```powershell
winget install --exact --id=OpenTofu.Tofu
```

Danach ein **neues** Terminal öffnen. Falls der Befehl `tofu` nicht gefunden wird: prüfen, ob `%LOCALAPPDATA%\Microsoft\WinGet\Links` im PATH ist.

### macOS

```bash
brew install opentofu
```

### Linux (Ubuntu/Debian)

```bash
sudo snap install --classic opentofu
```

Weitere Methoden (rpm, standalone, etc.): [offizielle Installationsseite](https://opentofu.org/docs/intro/install/).

### Installation prüfen

```bash
tofu -version
```

## Editor einrichten (empfohlen)

In VS Code die Extension **«OpenTofu»** (oder «HashiCorp Terraform») installieren – sie bietet Syntax-Highlighting und Autovervollständigung für `.tf`-Dateien. Zusätzlich formatiert `tofu fmt` Ihre Dateien automatisch einheitlich.

## Verbindung zu AWS

OpenTofu liest die Zugangsdaten automatisch aus `~/.aws/credentials` – **niemals** Credentials in `.tf`-Dateien schreiben. Im Learner Lab müssen die Credentials **bei jedem Lab-Start** aktualisiert werden: [Credentials-Routine](./AwsCredentials.md).

## Befehls-Spickzettel

| Befehl | Wirkung |
|---|---|
| `tofu init` | Projekt initialisieren, Provider herunterladen (einmalig pro Projekt) |
| `tofu validate` | Syntax und Konsistenz prüfen |
| `tofu fmt` | Dateien einheitlich formatieren |
| `tofu plan` | Vorschau: was würde passieren? (`+` erstellen, `~` ändern, `-/+` ersetzen) |
| `tofu apply` | Änderungen ausführen (zeigt Plan, fragt nach Bestätigung) |
| `tofu destroy` | alles aus diesem Projekt Erstellte entfernen |
| `tofu output` | definierte Outputs anzeigen (z. B. die öffentliche IP) |
| `tofu state list` | Ressourcen im State auflisten |

## Projekt-Hygiene (.gitignore)

In jedes OpenTofu-Projekt gehört eine `.gitignore` mit mindestens:

```text
.terraform/
terraform.tfstate
terraform.tfstate.backup
*.tfvars
```

Der State enthält alle Ressourcen-Attribute im Klartext und gehört nicht ins Repo ([warum? → Theorie](../Theorie/OpenTofu.md#der-state)).

## Häufige Probleme

- **`error configuring provider` / `ExpiredToken` / `InvalidClientTokenId`:** Credentials abgelaufen – [Routine](./AwsCredentials.md) ausführen (Lab neu gestartet?).
- **`UnauthorizedOperation`:** Die Aktion ist im Learner Lab nicht erlaubt (z. B. IAM-Ressourcen erstellen) – Konfiguration anpassen, `LabRole`/`LabInstanceProfile` verwenden statt eigene Rollen.
- **`Error: Invalid AMI ID` / Instanz startet nicht:** AMI-ID passt nicht zur Region. Das Learner Lab läuft in `us-east-1` – AMI-IDs sind **pro Region** unterschiedlich.
- **`tofu init` lädt ewig / Firewall:** Schulnetz kann Registry-Zugriffe bremsen – Hotspot testen.
- **State kaputt / gelöscht:** Nicht in Panik `apply` ausführen! Erst im GUI prüfen, welche Ressourcen noch existieren, aufräumen, dann neu aufbauen.
