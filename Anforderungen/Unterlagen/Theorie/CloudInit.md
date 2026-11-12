# Cloud-init

## Lernziele

- Sie können erklären, was cloud-init ist und wann es ausgeführt wird.
- Sie kennen die wichtigsten Konfigurationsblöcke (`users`, `packages`, `write_files`, `runcmd` u. a.) und können sie anwenden.
- Sie können Fehler in cloud-init-Konfigurationen systematisch über das Log finden.
- Sie finden sich in der offiziellen Referenz zurecht.

## Was ist cloud-init?

Cloud-init konfiguriert eine Instanz **beim ersten Start** automatisch. Sie geben der Instanz bei der Erstellung eine YAML-Datei mit (bei AWS im Feld *user data*), und cloud-init arbeitet sie beim ersten Boot ab: Benutzer anlegen, Pakete installieren, Dateien schreiben, Befehle ausführen. Cloud-init ist auf praktisch allen Cloud-Images vorinstalliert (Ubuntu, Debian, RedHat, …) und funktioniert bei allen grossen Anbietern gleich – **dieselbe Datei läuft in AWS, Azure und lokal mit Multipass.**

Das Szenario, das cloud-init löst: 10 Server brauchen dieselbe Grundeinrichtung. Die Optionen:

1. Alle 10 von Hand installieren – fehleranfällig, langsam, nicht reproduzierbar.
2. Ein Bash-Skript schreiben – besser, aber es muss auf jeden Server kopiert und ausgeführt werden.
3. Eine cloud-init-Datei bei der Erstellung mitgeben – **keine weiteren Schritte nötig.**

**Wichtig:** Cloud-init läuft nur beim **ersten** Boot. Eine bestehende Instanz «nachträglich per cloud-init ändern» funktioniert nicht – man erstellt stattdessen eine neue Instanz. Das ist kein Mangel, sondern das Cloud-Prinzip (Instanzen ersetzen statt reparieren). Für Änderungen an laufenden Systemen ist [Ansible](./Ansible.md) das Werkzeug.

## Aufbau einer cloud-init-Datei

Die Datei **muss** mit `#cloud-config` beginnen (häufigster Anfängerfehler: Zeile fehlt → alles wird stillschweigend ignoriert).

```yaml
#cloud-config
users:                                  # Benutzer anlegen
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL        # sudo ohne Passwort
    groups: users, admin
    shell: /bin/bash
    ssh_authorized_keys:                # öffentliche SSH-Schlüssel für diesen User
      - ssh-rsa AAAA...restlicher-key... aws-key

ssh_pwauth: false                       # Login nur per Schlüssel, nie per Passwort
disable_root: true                      # kein direkter root-Login

package_update: true                    # Paketlisten aktualisieren (apt update)
packages:                               # Pakete installieren
  - apache2
  - php
  - mariadb-server

write_files:                            # Dateien mit Inhalt erstellen
  - path: /var/www/html/info.php
    content: |
      <?php phpinfo(); ?>

runcmd:                                 # Befehle am Schluss ausführen (einmalig!)
  - sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mysql/mariadb.conf.d/50-server.cnf
  - systemctl restart mariadb
```

Die Blöcke in der Übersicht:

| Block | Zweck | Merkpunkt |
|---|---|---|
| `users` | Benutzer, sudo-Regeln, SSH-Keys | Schlüsselformat: `ssh-rsa <key ohne Umbrüche> kommentar` |
| `ssh_pwauth`, `disable_root` | Härtung des Zugangs | gehören in jedes Template |
| `package_update`, `packages` | Paketverwaltung | ersetzt `apt update && apt install …` |
| `write_files` | Dateien anlegen | Inhalt als Block mit `content: \|` |
| `runcmd` | Befehle nach allem anderen | nur für das, was kein eigener Block abdeckt |

Faustregel: **Erst der passende Block, dann `runcmd`.** Wer alles in `runcmd` packt, schreibt ein Bash-Skript in YAML-Verkleidung und verschenkt Lesbarkeit und Fehlertoleranz. Genau das produzieren KI-Werkzeuge übrigens gern – erkennen und verbessern Sie es.

Die Reihenfolge der Abarbeitung ist durch cloud-init vorgegeben (nicht durch die Reihenfolge in der Datei) und läuft in mehreren Boot-Phasen ab. Die tatsächliche Reihenfolge unserer Blöcke: zuerst `write_files`, danach – noch in derselben frühen Boot-Phase, aber deutlich später – `users`, dann in der nächsten Phase `runcmd`, und erst ganz am Schluss, in der letzten Boot-Phase, `package_update`/`packages`.

> ⚠️ **Wichtige Konsequenz:** Weil `write_files` **vor** `users` läuft, können Sie einer über `write_files` erstellten Datei **nicht** mit `owner:` einen Benutzer zuweisen, den Sie in derselben Konfiguration erst über `users` anlegen – dieser existiert zu diesem Zeitpunkt noch nicht, und cloud-init bricht diesen Schritt mit einem Fehler ab (die Datei wird dann **nicht** geschrieben). Schreiben Sie eigene Dateien für neue Benutzer daher ohne `owner:` (Standard: `root:root`, trotzdem lesbar) oder in ein Verzeichnis, das unabhängig von neu angelegten Benutzern existiert (z. B. `/home/ubuntu` beim Standardbenutzer). Ebenso: Verlassen Sie sich nicht darauf, dass `packages` bereits installiert sind, wenn `runcmd` startet – `packages` läuft erst danach. Wer in `runcmd` ein frisch installiertes Paket braucht, installiert es dort explizit mit `apt-get install -y <paket>`.

## Fehlersuche – der wichtigste Abschnitt

Cloud-init scheitert **still**: Die Instanz startet normal, nur die Einrichtung fehlt oder ist unvollständig. Systematisches Vorgehen:

1. **Vor dem Start validieren**: YAML-Syntax auf <https://www.yamllint.com/> prüfen, erste Zeile `#cloud-config` kontrollieren.
2. **Auf der Instanz das Log lesen** – merken Sie sich diesen Pfad:

```bash
cat /var/log/cloud-init-output.log     # Ausgabe aller Schritte, inkl. Fehlermeldungen
cloud-init status                      # done | running | error
```

3. **Typische Ursachen**: fehlendes `#cloud-config`, Einrückungsfehler, SSH-Key mit Zeilenumbrüchen, Befehl in `runcmd` schlägt fehl (Log zeigt welcher).

## Anwendung im Modul

Ab KN01 (lokal mit Multipass: `multipass launch --cloud-init datei.yaml`) über KN02 (AWS *user data*) bis KN07, wo der Autoscaler jede neue Instanz mit Ihrem cloud-init einrichtet. Ab KN03 übergibt OpenTofu die Datei als `user_data` – cloud-init bleibt also bis zum Schluss im Einsatz.

Im Modul erstellen Sie sich in KN02 ein **persönliches Template** (Ihre Keys + Key der Lehrperson, Härtung), das Sie in allen folgenden KNs wiederverwenden.

## Selbsttest

<details><summary>1. Ihre Instanz startet, aber Apache ist nicht installiert und Sie können sich nicht per SSH einloggen. Was prüfen Sie in welcher Reihenfolge?</summary>

Kein SSH-Zugang heisst: entweder scheiterte cloud-init sehr früh (Users/Keys) oder die YAML-Datei wurde ganz ignoriert. (1) Erste Zeile `#cloud-config` vorhanden? (2) YAML-Syntax valid (yamllint)? (3) Schlüsselformat korrekt (eine Zeile)? Zur Not mit dem im GUI gewählten Key-Pair einloggen und `/var/log/cloud-init-output.log` lesen.
</details>

<details><summary>2. Warum gehört `apt install apache2` nicht in `runcmd`?</summary>

Dafür gibt es den deklarativen Block `packages`. Er ist lesbarer, distributionUnabhängiger (cloud-init wählt apt/yum selbst) und läuft an der richtigen Stelle der Boot-Sequenz.
</details>

<details><summary>3. Sie ändern die cloud-init-Datei einer laufenden Instanz im AWS-GUI. Was bewirkt das?</summary>

Nichts – cloud-init läuft nur beim ersten Boot. Die korrekte Vorgehensweise: neue Instanz mit der geänderten Datei erstellen (bzw. `tofu apply`, das die Instanz ersetzt).
</details>

<details><summary>4. Was bewirken `ssh_pwauth: false` und `disable_root: true`, und warum gehören sie in jedes Template?</summary>

Kein Passwort-Login (nur Schlüssel) und kein direkter root-Zugang. Beides reduziert die Angriffsfläche massiv – öffentlich erreichbare Server werden permanent mit Passwort-Brute-Force gescannt.
</details>

## Quellen

- <https://cloudinit.readthedocs.io/en/latest/> – offizielle Dokumentation
- <https://cloudinit.readthedocs.io/en/latest/reference/examples.html> – Beispielsammlung (sehr nützlich!)
