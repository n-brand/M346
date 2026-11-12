# Ansible

## Lernziele

- Sie können erklären, wofür Ansible eingesetzt wird und wie es sich von cloud-init und OpenTofu abgrenzt.
- Sie kennen die Bausteine Inventar, Playbook, Task, Modul und Handler.
- Sie können Idempotenz erklären und am Ansible-Output nachweisen.
- Sie können ein einfaches Playbook lesen, erklären und anpassen.

## Wozu Ansible?

Cloud-init richtet eine Instanz beim **ersten Boot** ein – danach ist es fertig. Aber Server leben weiter: Konfigurationen ändern, Pakete nachinstallieren, eine Änderung auf 20 Server gleichzeitig ausrollen. Von Hand per SSH auf jeden Server? Genau das automatisiert Ansible: Es führt **wiederholbar** Konfigurationen auf laufenden Systemen aus – über normales SSH, ohne dass auf den Zielservern etwas installiert werden muss (agentenlos). Es braucht nur Python auf dem Ziel (bei Ubuntu vorhanden) und einen SSH-Key – den haben Sie seit KN02.

Einordnung: **OpenTofu baut das Haus, cloud-init richtet es beim Einzug ein, Ansible macht den Unterhalt.**

## Die Bausteine

**Inventar** – welche Server gibt es, in Gruppen organisiert (`inventory.ini`):

```ini
[web]
54.93.100.10 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/kn.pem

[db]
54.93.100.20 ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/kn.pem
```

**Playbook** – was auf welchen Gruppen passieren soll (`site.yaml`, wieder YAML!):

```yaml
- name: Webserver konfigurieren
  hosts: web                          # Gruppe aus dem Inventar
  become: true                        # mit sudo ausführen

  tasks:
    - name: Apache und PHP installieren
      apt:                            # Modul "apt"
        name: [apache2, php, libapache2-mod-php]
        state: present                # Zielzustand: installiert
        update_cache: true

    - name: PHP-Infoseite verteilen
      copy:                           # Modul "copy"
        dest: /var/www/html/info.php
        content: "<?php phpinfo(); ?>"
      notify: Apache neustarten       # Handler nur bei Änderung auslösen

  handlers:
    - name: Apache neustarten
      service:
        name: apache2
        state: restarted
```

Ausführen und prüfen:

```bash
ansible all -i inventory.ini -m ping        # Verbindungstest zu allen Servern
ansible-playbook -i inventory.ini site.yaml # Playbook ausführen
```

**Die Konzepte dahinter:**

- **Task**: ein Schritt mit einem Ziel («Apache ist installiert»).
- **Modul**: das Werkzeug, das der Task benutzt (`apt`, `copy`, `service`, `user`, `template`, …). Module beschreiben **Zielzustände** (`state: present`), keine Befehle – deshalb ist Ansible deklarativ.
- **Handler**: wird nur ausgeführt, wenn ein Task ihn per `notify` auslöst **und** dieser Task tatsächlich etwas geändert hat. Typisch: Dienst nur neu starten, wenn sich die Konfiguration geändert hat.

## Idempotenz – das Kernkonzept

Ein Playbook zweimal ausführen ist **gefahrlos**: Beim zweiten Lauf stellt jedes Modul fest, dass der Zielzustand schon erreicht ist, und tut nichts. Der Output zeigt das direkt:

```text
1. Lauf:  ok=3  changed=3  failed=0
2. Lauf:  ok=3  changed=0  failed=0   ← nichts mehr zu tun: idempotent
```

Das unterscheidet ein Playbook fundamental von einem Bash-Skript: `apt install` in einem Skript läuft einfach nochmal; ein fehlgeschlagener halber Skript-Lauf hinterlässt einen undefinierten Zustand. Ein Playbook kann man nach einem Fehler einfach erneut starten – es macht dort weiter, wo der Zielzustand noch nicht stimmt.

Idempotenz kann sogar **Daten schützen**: Das Modul `filesystem` formatiert eine Disk nur, wenn darauf noch kein Dateisystem existiert – ein zweiter Lauf zerstört nichts. Ein Skript mit blindem `mkfs` würde beim zweiten Lauf alle Daten löschen. (Genau das nutzen Sie in KN06 Teil E für das Volume aus KN05.)

Vorsicht: Wer im Playbook das Modul `shell`/`command` benutzt, verlässt die Idempotenz («führe Befehl aus» ist kein Zielzustand). Gleiche Faustregel wie bei cloud-init und `runcmd`: **erst das passende Modul suchen, `shell` ist der letzte Ausweg.** KI-generierte Playbooks bestehen auffallend oft aus `shell`-Tasks – erkennen und verbessern.

**Praxisbezug KN06:** Sie bauen den Web+DB-Stack aus der Kontrastlektion als Playbook, beweisen die Idempotenz mit dem zweiten Lauf (`changed=0`) und spielen eine Änderung gezielt nur über das Playbook ein.

## Abgrenzung: Wann welches Werkzeug?

| Aufgabe | Werkzeug | Warum |
|---|---|---|
| Neue Instanz + Security Group erstellen | OpenTofu | Infrastruktur-Ebene |
| SSH-Keys und Grundpakete beim ersten Boot | cloud-init | läuft genau einmal, vor jedem Zugriff |
| MariaDB-Konfiguration auf 5 laufenden Servern ändern | Ansible | wiederholbar, auf bestehenden Systemen |
| Kaputte Instanz reparieren | Trick-Frage: gar nicht | ersetzen (`tofu apply`) statt reparieren |

In der Praxis überschneiden sich die Werkzeuge (Ansible kann auch Instanzen erstellen, cloud-init kann fast alles installieren). Die saubere Arbeitsteilung oben ist der Normalfall – und die Antwort, die Sie bei der Abnahme begründen können müssen.

## Selbsttest

<details><summary>1. Woran erkennen Sie am Ansible-Output, dass Ihr Playbook idempotent ist?</summary>

Ein zweiter Lauf direkt nach dem ersten zeigt `changed=0` – kein Task musste etwas ändern, weil alle Zielzustände schon erreicht waren.
</details>

<details><summary>2. Warum wird der Apache-Neustart als Handler modelliert und nicht als normaler Task am Ende?</summary>

Ein normaler Task würde Apache bei **jedem** Lauf neu starten (kurzer Ausfall, unnötig). Der Handler läuft nur, wenn ein `notify`-Task wirklich etwas geändert hat – Neustart genau dann, wenn es einen Grund gibt.
</details>

<details><summary>3. Ein KI-generiertes Playbook enthält: `shell: apt-get install -y apache2`. Es funktioniert. Was verbessern Sie trotzdem, und warum?</summary>

Das `apt`-Modul verwenden (`state: present`). Das `shell`-Kommando ist nicht idempotent, meldet `changed` bei jedem Lauf (und triggert damit fälschlich Handler), und Ansible kann Fehler schlechter erkennen.
</details>

<details><summary>4. Ansible braucht keinen Agenten auf den Zielservern. Was braucht es stattdessen, und warum ist das im Modul bereits vorhanden?</summary>

SSH-Zugang mit Key und Python auf dem Ziel. Die SSH-Keys verteilen Sie seit KN02 per cloud-init auf jede Instanz; Python ist bei Ubuntu vorinstalliert.
</details>

## Quellen

- <https://docs.ansible.com/ansible/latest/getting_started/index.html> – offizieller Einstieg
- <https://docs.ansible.com/ansible/latest/collections/index_module.html> – Modul-Referenz
