# SSH mit Public/Private Keys

> Dieses Kapitel erklärt den **Umgang** mit SSH-Schlüsseln in diesem Modul – nicht die kryptographische Funktionsweise. Dazu gibt es das [Modul 114](https://gitlab.com/ch-tbz-it/Stud/m114).

## Lernziele

- Sie können sich mit `ssh` und einem privaten Schlüssel auf einen Server verbinden.
- Sie wissen, welcher Schlüssel wohin gehört: privater Schlüssel auf Ihren Rechner, öffentlicher auf den Server.
- Sie können Schlüsselpaare erstellen und den öffentlichen Schlüssel aus dem privaten extrahieren.
- Sie kennen die häufigsten SSH-Fehlermeldungen und wissen, wie Sie sie beheben.

## Die Grundregel

SSH (Secure Shell) baut eine sichere Verbindung zu einem anderen Gerät auf – mit Passwort oder mit einem Schlüsselpaar. In diesem Modul **verzichten** wir aus Sicherheitsgründen komplett auf Passwörter und arbeiten **ausschliesslich** mit Schlüsseln.

Ein Schlüsselpaar besteht aus zwei zusammengehörenden Dateien, und es gilt eine einzige, nicht verhandelbare Regel:

| Schlüssel | Liegt | Schutzbedarf |
|---|---|---|
| **Privater** Schlüssel (`.pem`) | **nur auf Ihrem Rechner**, im Verzeichnis `~/.ssh/` | maximal – wer ihn hat, *ist* Sie. Nie teilen, nie ins Git, nie per Mail/Chat verschicken. |
| **Öffentlicher** Schlüssel (`.pub`) | **auf dem Server** (in `~/.ssh/authorized_keys`) | keiner – darf jeder sehen. Genau darum können Sie ihn bedenkenlos in cloud-init-Dateien eintragen. |

Merkhilfe: Der öffentliche Schlüssel ist das **Schloss**, das Sie an beliebig viele Türen (Server) montieren. Der private Schlüssel ist der einzige **Schlüssel** dazu – und der bleibt an Ihrem Schlüsselbund.

Daraus folgt auch: Verlieren Sie den privaten Schlüssel, gibt es keine Wiederherstellung – AWS speichert ihn nicht. Es hilft nur ein neues Schlüsselpaar.

## Verbinden

Der Befehl ist in Windows (CMD/PowerShell), macOS und Linux identisch:

```bash
ssh <user>@<server-ip> -i <pfad-zum-privaten-schlüssel>

# Beispiel:
ssh ubuntu@121.12.3.1 -i C:\Users\maxmuster\.ssh\max.pem

# Optional gegen Timeouts bei Inaktivität:
ssh ubuntu@121.12.3.1 -i C:\Users\maxmuster\.ssh\max.pem -o ServerAliveInterval=30
```

Der Benutzername hängt vom Image ab: bei **Ubuntu**-Images `ubuntu`, bei **Amazon-Linux**-Instanzen `ec2-user` – oder der Benutzer, den Sie selbst per cloud-init angelegt haben.

## Schlüsselpaare erstellen

Schlüssel gehören ins Verzeichnis `.ssh` in Ihrem Home-Verzeichnis (Windows wie macOS/Linux):

```bash
# Schlüsselpaar erstellen (erzeugt .pem und .pub):
ssh-keygen -f C:\Users\<IhrBenutzer>\.ssh\<keyname>.pem -t rsa -b 2048 -C <keyname>
```

Parameter: `-t` Algorithmus, `-b` Schlüssellänge (mindestens 2048), `-C` Kommentar/Name (wird an den öffentlichen Schlüssel angehängt).

Den öffentlichen Schlüssel können Sie jederzeit aus dem privaten **extrahieren** – das brauchen Sie z. B., wenn AWS Ihnen beim Erstellen eines Key Pairs nur die .pem-Datei gegeben hat und Sie den Public Key für cloud-init benötigen:

```bash
ssh-keygen -y -f C:\Users\<IhrBenutzer>\.ssh\<keyname>.pem > C:\Users\<IhrBenutzer>\.ssh\<keyname>.pub
```

Für cloud-init gilt: Der öffentliche Schlüssel muss auf **einer Zeile** stehen (`ssh-rsa AAAA... kommentar`) – Zeilenumbrüche aus Copy-Paste sind der häufigste Fehler.

## Typische Fehlermeldungen

| Meldung | Ursache | Lösung |
|---|---|---|
| `Permission denied (publickey)` | falscher Schlüssel, falscher Benutzername oder Public Key nicht auf dem Server | Schlüsseldatei prüfen (`-i`), Benutzer prüfen (`ubuntu`?), cloud-init-Log auf dem Server prüfen |
| `WARNING: UNPROTECTED PRIVATE KEY FILE` | Schlüsseldatei ist für andere lesbar (macOS/Linux) | `chmod 400 keyname.pem` |
| `Connection timed out` | Port 22 nicht offen oder falsche IP | Security Group prüfen, aktuelle öffentliche IP prüfen (ändert nach Stop/Start!) |
| `Host key verification failed` / `REMOTE HOST IDENTIFICATION HAS CHANGED` | Unter der IP meldet sich ein anderer Server (normal, wenn Instanzen ersetzt wurden) | betroffene Zeile aus `~/.ssh/known_hosts` löschen |

## Anwendung im Modul

Ab KN02 laufen alle Serverzugriffe über SSH-Schlüssel: Sie weisen im Zwei-Schlüssel-Experiment nach, dass nur der passende private Schlüssel funktioniert, und verteilen öffentliche Schlüssel per cloud-init (Ihr Template enthält Ihren Schlüssel und den der Lehrperson). Später nutzt auch Ansible (KN06) genau diese SSH-Verbindungen.

## Selbsttest

<details><summary>1. Sie wollen einem Kollegen Zugriff auf Ihren Server geben. Welche Datei geben Sie ihm – bzw. welche verlangen Sie von ihm?</summary>

Keine eigene Datei weitergeben! Sie verlangen von ihm seinen **öffentlichen** Schlüssel und tragen ihn auf dem Server in `authorized_keys` (bzw. im cloud-init) ein. Sein privater Schlüssel bleibt bei ihm, Ihrer bei Ihnen.
</details>

<details><summary>2. Warum darf der öffentliche Schlüssel problemlos im Git-Repo oder in einer cloud-init-Datei stehen, der private aber niemals?</summary>

Der öffentliche Schlüssel erlaubt nur das «Abschliessen» (Zugriff gewähren an den passenden privaten Schlüssel) – mit ihm allein kann sich niemand einloggen. Der private Schlüssel ist der Zugang selbst: Wer ihn besitzt, kann sich auf allen Servern anmelden, auf denen der zugehörige öffentliche Schlüssel liegt.
</details>

<details><summary>3. `ssh ubuntu@54.93.1.10 -i kn.pem` liefert `Permission denied (publickey)`. Nennen Sie drei mögliche Ursachen in absteigender Wahrscheinlichkeit.</summary>

(1) Falscher privater Schlüssel für diesen Server (anderes Key Pair gewählt). (2) Falscher Benutzername (z. B. eigener cloud-init-User statt `ubuntu` oder umgekehrt). (3) Der öffentliche Schlüssel ist nie auf dem Server gelandet (cloud-init-Fehler, Format mit Zeilenumbruch).
</details>

<details><summary>4. Nach Stop/Start Ihrer Instanz schlägt der gestern funktionierende ssh-Befehl mit `Connection timed out` fehl. Woran liegt es vermutlich?</summary>

Die öffentliche IP hat beim Stop/Start gewechselt – der Befehl zeigt auf die alte IP. Aktuelle IP in der Konsole nachschauen (oder eine Elastic IP verwenden, ab KN04).
</details>

## Quellen

- Techtarget: [Secure Shell (SSH)](https://www.techtarget.com/searchsecurity/definition/Secure-Shell)
- Thorntech: [Passwords vs. SSH keys](https://thorntech.com/passwords-vs-ssh)
