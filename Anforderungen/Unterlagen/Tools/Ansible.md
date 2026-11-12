# Ansible: Installation & Setup

Ansible ist das Konfigurationsmanagement-Werkzeug in diesem Modul (Theorie: [Ansible](../Theorie/Ansible.md)). Wichtig zu wissen: Ansible läuft auf **Ihrem** Rechner (Control Node) und konfiguriert die Zielserver über SSH – auf den Servern selbst wird nichts installiert.

## Installation

### Windows (via WSL)

Ansible läuft **nicht nativ** auf Windows – Sie brauchen das Windows-Subsystem für Linux (WSL). Das ist in 10 Minuten eingerichtet und ein Werkzeug, das Sie als Entwickler ohnehin immer wieder brauchen:

1. PowerShell **als Administrator** öffnen: `wsl --install` (installiert Ubuntu; Neustart nötig, danach Benutzername/Passwort für Ubuntu festlegen).
2. Im Ubuntu-Terminal (WSL):

```bash
sudo apt update && sudo apt install -y ansible
```

**Wichtige Stolperfalle – SSH-Schlüssel:** WSL ist ein eigenes Linux mit eigenem Home-Verzeichnis. Kopieren Sie Ihre .pem-Dateien **in das WSL-Home** – nicht von `/mnt/c/...` aus verwenden, denn auf dem Windows-Dateisystem funktioniert `chmod 400` nicht und SSH verweigert den Schlüssel:

```bash
mkdir -p ~/.ssh
cp /mnt/c/Users/<IhrWindowsBenutzer>/.ssh/*.pem ~/.ssh/
chmod 400 ~/.ssh/*.pem
```

### macOS

```bash
brew install ansible
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update && sudo apt install -y ansible
```

### Fallback: Multipass-VM als Control Node

Falls WSL auf Ihrem Gerät nicht möglich ist: Erstellen Sie eine Multipass-VM als Steuerrechner, kopieren Sie die Schlüssel hinein und arbeiten Sie von dort:

```bash
multipass launch --name control
multipass transfer ~/.ssh/vorname1.pem control:/home/ubuntu/.ssh/
multipass shell control
# in der VM: sudo apt update && sudo apt install -y ansible && chmod 400 ~/.ssh/*.pem
```

### Installation prüfen

```bash
ansible --version
```

## Projekt-Grundeinstellungen

Legen Sie in jedem Ansible-Projektordner eine `ansible.cfg` an – sie erspart Ihnen wiederkehrende Bestätigungsfragen bei neuen Hosts (im Schulkontext ok; in Produktion würde man Host-Keys prüfen):

```ini
[defaults]
inventory = inventory.ini
host_key_checking = False
```

## Befehls-Spickzettel

| Befehl | Wirkung |
|---|---|
| `ansible all -m ping` | Verbindungstest zu allen Hosts im Inventar |
| `ansible-playbook site.yaml` | Playbook ausführen |
| `ansible-playbook site.yaml --check` | Trockenlauf: zeigt, was sich ändern würde |
| `ansible-playbook site.yaml --limit web` | nur auf der Gruppe/dem Host `web` |
| `ansible-playbook site.yaml -v` | ausführlichere Ausgabe (-vvv für Debugging) |
| `ansible-inventory --list` | zeigt, wie Ansible Ihr Inventar interpretiert |
| `ansible-doc <modul>` | Dokumentation zu einem Modul (z. B. `ansible-doc apt`) |

## Häufige Probleme

- **`Permission denied (publickey)`:** Falscher Schlüsselpfad im Inventar, `chmod 400` fehlt, oder (WSL) der Schlüssel liegt noch auf `/mnt/c/...` – siehe oben.
- **`UNREACHABLE`:** IP im Inventar veraltet (öffentliche IPs ändern nach Stop/Start!), Security Group blockt Port 22, oder die Instanz läuft nicht.
- **`Failed to lock apt for exclusive operation`:** Auf der frischen Instanz laufen noch automatische Updates (cloud-init/unattended-upgrades) – 1–2 Minuten warten und erneut ausführen.
- **`/usr/bin/python3: not found`:** Bei Ubuntu-Cloud-Images vorhanden – falls doch: exotisches Image gewählt.
- **Playbook hängt bei `Gathering Facts`:** Meist ein SSH-Problem – zuerst `ansible all -m ping` testen.

## Quellen

- [Offizieller Einstieg](https://docs.ansible.com/ansible/latest/getting_started/index.html)
- [Installations-Doku](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)
- [WSL installieren (Microsoft)](https://learn.microsoft.com/de-de/windows/wsl/install)
