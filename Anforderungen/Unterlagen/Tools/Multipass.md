# Multipass: Installation & erste Schritte

Multipass ist das Standard-Virtualisierungswerkzeug in diesem Modul. Es erstellt Ubuntu-VMs mit einem einzigen Befehl, unterstützt cloud-init nativ (wie die Public Cloud) und läuft auf Windows, macOS und Linux. Sie bedienen es über die Kommandozeile – genau wie später die Cloud.

## Installation

### Windows

**Windows 11 Pro, Enterprise oder Education** (Multipass nutzt Hyper-V).

1. [Multipass für Windows herunterladen](https://canonical.com/multipass/download/windows) und den Installer mit Administratorrechten ausführen.
2. Stellen Sie sicher, dass Ihr Netzwerk als **privat** eingestuft ist (Einstellungen → Netzwerk & Internet → Eigenschaften des aktiven Netzwerks) – sonst verweigert Windows Multipass den Start.

**Windows Home** (kein Hyper-V verfügbar): Installieren Sie zuerst [VirtualBox](https://www.virtualbox.org/wiki/Downloads), dann Multipass. Multipass verwendet VirtualBox dann automatisch als Backend – Sie arbeiten trotzdem ganz normal mit den Multipass-Befehlen. Backend bei Bedarf explizit setzen:

```powershell
multipass set local.driver=virtualbox
```

### macOS

[Multipass für macOS herunterladen](https://canonical.com/multipass/download/macos) und den Installer ausführen (Administratorrechte nötig). Alternativ mit Homebrew: `brew install multipass`. Funktioniert auf Intel- und Apple-Silicon-Macs.

### Linux

```bash
sudo snap install multipass
```

### Installation prüfen

```bash
multipass version          # Version wird angezeigt → Installation ok
multipass get local.driver # zeigt das verwendete Backend (hyperv, qemu, virtualbox, ...)
```

## Erste Schritte

VM erstellen und betreten (der erste `launch` lädt das Ubuntu-Image herunter – das dauert einige Minuten, danach geht es in Sekunden):

```bash
multipass launch --name demo          # VM mit aktuellem Ubuntu LTS erstellen
multipass shell demo                  # in die VM einloggen (verlassen mit exit oder Ctrl-D)
multipass exec demo -- lsb_release -a # einzelnen Befehl in der VM ausführen, ohne einzuloggen
```

Verwalten:

```bash
multipass list                        # alle VMs und ihr Status
multipass info demo                   # Details einer VM (IP, Ressourcen, Disk)
multipass stop demo                   # stoppen
multipass start demo                  # starten
multipass delete demo                 # zum Löschen vormerken ...
multipass purge                       # ... und endgültig entfernen
```

Mit Optionen erstellen (brauchen Sie in KN01):

```bash
multipass find                                        # verfügbare Ubuntu-Images anzeigen
multipass launch --name kn01 26.04                    # bestimmte Ubuntu-Version
multipass launch --name gross -c 4 -m 4G -d 10G       # 4 CPUs, 4 GB RAM, 10 GB Disk
multipass launch --name auto --cloud-init datei.yaml  # mit cloud-init-Konfiguration
```

## Befehls-Spickzettel

| Befehl | Wirkung |
|---|---|
| `multipass launch --name X [Image]` | VM erstellen |
| `multipass launch --cloud-init y.yaml` | VM mit cloud-init erstellen |
| `multipass shell X` | Shell in der VM öffnen |
| `multipass exec X -- <Befehl>` | Befehl in der VM ausführen |
| `multipass list` / `info X` | Übersicht / Details |
| `multipass stop X` / `start X` | stoppen / starten |
| `multipass delete X` + `purge` | löschen (zweistufig) |
| `multipass delete --purge X` | in einem Schritt löschen |
| `multipass find` | verfügbare Images |
| `multipass get local.driver` | verwendetes Backend anzeigen |

## Häufige Probleme

- **`launch` (oder ein anderer Befehl) hängt oder bricht mit Timeout ab:** Kommt gelegentlich auf allen Betriebssystemen vor, auch ohne erkennbaren Grund – kein Fehler Ihrerseits. Kurz warten, nötigenfalls abbrechen (`Ctrl-C`) und erneut versuchen; hilft das nicht, Multipass bzw. den Rechner neu starten. **Windows speziell:** zusätzlich Netzwerk auf «privat» stellen, Firewall/VPN testweise deaktivieren, Backend prüfen (`multipass get local.driver`).
- **«start failed» / Hyper-V-Fehler (Windows):** Prüfen, ob die Windows-Edition Hyper-V unterstützt. Auf Windows Home: VirtualBox installieren und als Driver setzen (siehe oben).
- **VM erstellt, aber cloud-init hat nicht gegriffen:** Das ist kein Multipass-Problem – Log in der VM lesen: `cat /var/log/cloud-init-output.log` (siehe [Theorie Cloud-init](../Theorie/CloudInit.md)).
- **Wenig Diskplatz auf dem Laptop:** Alte VMs regelmässig mit `multipass delete --purge` entfernen; heruntergeladene Images belegen zusätzlich einige GB.
- **Ein Test mit absichtlich fehlerhafter/unvollständiger cloud-init-Datei zeigt lokal keinen Unterschied (z. B. `#cloud-config`-Zeile weglassen):** Multipass liest Ihre `--cloud-init`-Datei ein, interpretiert sie als YAML und schreibt sie beim Erstellen der VM intern neu. Kommentarzeilen – auch die Kennzeichnung `#cloud-config` – werden dabei nicht 1:1 übernommen, sondern von Multipass selbst wieder ergänzt. Solche Experimente funktionieren daher nur in der echten Cloud zuverlässig (ab KN02 mit AWS), wo Ihre Datei unverändert an die Instanz weitergereicht wird.

## Quellen

- [Offizielle Installationsseite](https://canonical.com/multipass/install)
- [Multipass-Dokumentation](https://documentation.ubuntu.com/multipass/en/latest/)
