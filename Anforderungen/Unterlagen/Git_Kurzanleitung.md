# Kurzanleitung: Git Basics für dein Projekt

Da du alleine an deinem Repository (Repo) arbeitest, ist der Ablauf sehr geradlinig. Diese Anleitung zeigt dir, wie du dein lokales Projekt mit GitHub oder GitLab verbindest und deine Änderungen speicherst.

## 0. Bevor du startest: Git installieren
Falls Git noch nicht auf deinem PC installiert ist, musst du es zuerst herunterladen und installieren (die Standardeinstellungen bei der Installation passen in der Regel):
👉 **[Git herunterladen (git-scm.com)](https://git-scm.com/downloads)**

---

## 1. Einmalige Vorbereitung

Bevor du loslegst, musst du Git mitteilen, wer du bist, und dich sicher mit GitHub/GitLab verbinden.

### A. Name und E-Mail hinterlegen
Öffne dein Terminal (oder die Git Bash unter Windows) und gib Folgendes ein (verwende die E-Mail, mit der du bei GitHub/GitLab registriert bist):
```bash
git config --global user.name "Dein Vor- und Nachname"
git config --global user.email "deine.email@beispiel.ch"
```

### B. SSH-Key erstellen und hinterlegen
Ein SSH-Key ist wie ein digitaler Schlüssel. Er erspart dir, bei jedem Upload dein Passwort eingeben zu müssen. Er besteht aus zwei Teilen: einem **privaten** Schlüssel (bleibt sicher auf deinem PC) und einem **öffentlichen** Schlüssel (wird bei GitHub/GitLab hinterlegt).

1. **Key erstellen:** Gib im Terminal ein:
   ```bash
   ssh-keygen -t ed25519 -C "deine.email@beispiel.ch"
   ```
   Bestätige alle Fragen einfach mit der `Enter`-Taste (du brauchst kein extra Passwort zu setzen, wenn du nicht möchtest).
2. **Öffentlichen Schlüssel kopieren:** Lass dir den öffentlichen Schlüssel im Terminal anzeigen und kopiere den gesamten ausgegebenen Text:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
3. **Bei GitHub/GitLab einfügen:**
   * **GitHub:** Gehe zu *Settings > SSH and GPG keys > New SSH key*.
   * **GitLab:** Gehe zu *Preferences > SSH Keys > Add new key*.
   * Füge den kopierten Text ein und speichere.

---

## 2. Das Repository auf den PC holen (`clone`)

Damit du an deinem Projekt arbeiten kannst, musst du das Online-Repo einmalig auf deinen PC herunterladen. Dieser Vorgang heisst **Klonen**.

* **Erklärung:** `git clone` erstellt eine exakte lokale Kopie des Repositories in einem neuen Ordner auf deinem Computer.
* **Befehl:** Gehe auf GitHub/GitLab auf dein Repo, klicke auf "Code" oder "Clone" und kopiere die **SSH-URL** (beginnt mit `git@...`).
  ```bash
  git clone git@github.com:DeinName/DeinRepo.git
  ```
* Wechsle danach im Terminal in den neuen Ordner:
  ```bash
  cd DeinRepo
  ```

---

## 3. Der tägliche Workflow (Die wichtigsten Befehle)

Wenn du an deinen Dateien gearbeitet hast, nutzt du immer wieder den gleichen Ablauf, um deine Arbeit zu sichern.

### Schritt 1: Übersicht verschaffen (`status`)
Zeigt dir an, welche Dateien geändert, gelöscht oder neu erstellt wurden.
```bash
git status
```

### Schritt 2: Änderungen vormerken (`add`)
Git speichert nicht automatisch alles. Du musst die geänderten Dateien zuerst "in den Warenkorb" legen (Staging).
* **Befehl für alle geänderten Dateien (am häufigsten genutzt):**
  ```bash
  git add .
  ```
* **Befehl für eine einzelne Datei:**
  ```bash
  git add index.html
  ```

### Schritt 3: Änderungen lokal speichern (`commit`)
Jetzt "kaufst" du den Warenkorb. Du verpackst die vorgemerkten Änderungen in ein Paket und versiehst es mit einer kurzen, erklärenden Nachricht.
* **Erklärung:** Ein Commit ist wie ein Speicherpunkt in einem Videospiel. Du kannst später genau sehen, was du wann gemacht hast.
* **Befehl:**
  ```bash
  git commit -m "Navigation auf der Startseite hinzugefügt"
  ```

### Schritt 4: Änderungen hochladen (`push`)
Bis jetzt sind deine Commits nur lokal auf deinem PC. Damit dein Experte/Lehrer sie sieht und sie als Backup sicher sind, musst du sie hochladen.
* **Erklärung:** `push` schiebt deine lokalen Commits auf den Server (GitHub/GitLab).
* **Befehl:**
  ```bash
  git push
  ```

---

### Ausnahme: Änderungen herunterladen (`pull`)
Da du alleine arbeitest, brauchst du diesen Befehl selten. Du brauchst ihn aber **zwingend**, wenn du eine Datei direkt im Browser auf GitHub/GitLab geändert hast (z.B. die README) oder wenn du an einem anderen PC arbeitest.
* **Erklärung:** `pull` holt die neuesten Änderungen vom Server und aktualisiert deine lokalen Dateien.
* **Befehl (mache dies immer, bevor du zu arbeiten beginnst, falls du die PCs wechselst):**
  ```bash
  git pull
  ```

---

## 4. Alle Befehle auf einen Blick

Bevor wir zu VS Code wechseln, hier nochmals alle Befehle aus dieser Anleitung zusammengefasst:

| Befehl | Was er macht |
|---|---|
| `git config --global user.name "..."` / `user.email "..."` | Einmalig: wer bist du (steht danach in jedem Commit) |
| `ssh-keygen -t ed25519 -C "..."` | Einmalig: SSH-Schlüsselpaar erstellen |
| `git clone git@...` | Repo einmalig auf den PC herunterladen |
| `git status` | Zeigt geänderte, neue und gelöschte Dateien |
| `git add .` bzw. `git add <datei>` | Änderungen vormerken (Staging) |
| `git commit -m "..."` | Vorgemerkte Änderungen lokal speichern |
| `git push` | Lokale Commits auf den Server hochladen |
| `git pull` | Änderungen vom Server herunterladen |

Diese acht Befehle reichen für praktisch den gesamten Modulalltag – der Rest dieser Anleitung zeigt dir, wie du dieselben acht Dinge auch **ohne Terminal**, direkt in VS Code, erledigst.

---

## 5. Der gleiche Workflow in VS Code (ohne Terminal)

Alles oben Gezeigte kannst du auch erledigen, ohne ein einziges Terminal-Kommando zu tippen – VS Code bringt eine eigene Git-Oberfläche mit. Wichtig zu verstehen: **VS Code erfindet dabei nichts Neues.** Im Hintergrund führt VS Code exakt dieselben Befehle aus (`git add`, `git commit`, `git push`, …), es klickt sie nur für dich, statt dass du sie tippst. Das Git aus Schritt 0 und der SSH-Key aus Schritt 1B brauchst du also so oder so – VS Code baut darauf auf, ersetzt es nicht.

### Repo klonen (`git clone`)
`Strg+Umschalt+P` (Befehlspalette öffnen) → `Git: Clone` eingeben und auswählen → SSH-URL einfügen (die gleiche wie in Schritt 2) → Zielordner wählen → im Dialog **"Open"** anklicken, damit sich der geklonte Ordner öffnet.

### Die Source-Control-Ansicht (`git status`)
Symbol am linken Rand (drei verbundene Punkte, Tastenkürzel `Strg+Umschalt+G`). Hier siehst du automatisch, was `git status` im Terminal anzeigen würde: Geänderte Dateien stehen unter **"Changes"**, neue (noch nicht verfolgte) Dateien ebenfalls dort mit dem Buchstaben `U`. Die Zahl auf dem Symbol entspricht der Anzahl geänderter Dateien.

### Stagen (`git add`)
Fährst du bei einer Datei unter "Changes" mit der Maus darüber, erscheint ein **`+`** – anklicken staged genau diese eine Datei (entspricht `git add <datei>`). Das `+` neben der Überschrift **"Changes"** selbst staged alle Dateien auf einmal (entspricht `git add .`).

### Committen (`git commit -m "..."`)
Zuoberst im Source-Control-Panel gibt es ein Textfeld ("Message"). Commit-Nachricht eintippen, dann entweder auf den **Haken (✓)** klicken oder `Strg+Enter` drücken.

### Pushen und Pullen (`git push` / `git pull`)
Unten in der blauen Statusleiste zeigt ein Symbol mit zwei Pfeilen und einer Zahl, wie viele Commits lokal bereit zum Hochladen sind. Darauf klicken **synchronisiert**: Das erledigt Push und – falls nötig – gleich auch Pull. Willst du die beiden Schritte einzeln ausführen, findest du **Push** und **Pull** auch separat über die drei Punkte `...` oben im Source-Control-Panel.

### SSH-Key
Kein zusätzlicher Schritt nötig – VS Code verwendet automatisch denselben SSH-Key, den du in Schritt 1B eingerichtet hast. Fragt VS Code trotzdem nach Benutzername/Passwort, ist meist der Schlüssel nicht (richtig) bei GitHub/GitLab hinterlegt – Schritt 1B nochmals prüfen.

### Bonus: Diff-Ansicht
Klickst du im Source-Control-Panel auf eine geänderte Datei, zeigt VS Code direkt an, **was genau** sich geändert hat (rot = gelöscht, grün = neu hinzugekommen) – übersichtlicher, als das im reinen Terminal möglich wäre (dort bräuchtest du zusätzlich `git diff`).

### Terminal bleibt trotzdem nützlich
VS Code hat auch ein eingebautes Terminal (Tastenkürzel `Strg+ö`, bzw. Menü *Terminal > New Terminal*). Dort kannst du jederzeit genau die Befehle aus Kapitel 1–4 eintippen – zum Beispiel, wenn eine Situation (etwa ein Merge-Konflikt) im Klick-Menü unübersichtlich wird. Die zwei Wege schliessen sich nicht aus: Viele nutzen die Klick-Oberfläche für den Alltag (add/commit/push) und das Terminal für alles Spezielle.

### Kurzübersicht: Terminal ↔ VS Code

| Terminal-Befehl | In VS Code |
|---|---|
| `git clone` | Befehlspalette (`Strg+Umschalt+P`) → `Git: Clone` |
| `git status` | Source-Control-Panel öffnen (`Strg+Umschalt+G`) |
| `git add .` | `+` neben der Überschrift "Changes" |
| `git add <datei>` | `+` bei der einzelnen Datei |
| `git commit -m "..."` | Nachricht eintippen → ✓ (bzw. `Strg+Enter`) |
| `git push` | Sync-Symbol unten in der Statusleiste, oder `...` → Push |
| `git pull` | Sync-Symbol unten in der Statusleiste, oder `...` → Pull |
