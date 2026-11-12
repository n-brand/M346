# M346 AWS Lernhilfe

**Live:** [https://n-brand.github.io/M346/](https://n-brand.github.io/M346/)

Lernhilfe fuer das Modul 346 (Cloud-Loesungen, AWS): Multiple-Choice-Quiz (auch mit Screenshots), Lernjournal und Statistik. Als PWA installierbar und offline nutzbar.

Erstellt von [Nicolas Brand](https://n-brand.github.io/portfolio/)

## Funktionen

- **Quiz:** Themenfilter, Anzahl waehlbar, Einfach- und Mehrfachauswahl, Erklaerung nach dem Pruefen, optionale Screenshots (Klick zum Vergroessern)
- **Lernjournal:** Eintraege erfassen, bearbeiten, loeschen, als Markdown kopieren oder herunterladen
- **Statistik:** Trefferquote gesamt und pro Thema
- **Offline:** Service Worker cached alle Dateien. Daten (Journal, Resultate) liegen im `localStorage` des Browsers

## Fragen und Screenshots hinzufuegen

1. Screenshot in `img/screenshots/` ablegen
2. Frage in `js/questions.js` ergaenzen (Feld `image`, siehe Kommentar am Dateianfang)
3. Bild in `sw.js` in der Liste `ASSETS` eintragen und `VERSION` erhoehen, damit es offline verfuegbar ist

Die mitgelieferten Fragen sind Beispiele und sollen durch eigene ersetzt werden.

## Lokal testen

Ein Service Worker laeuft nur ueber `http://localhost` oder HTTPS, nicht ueber `file://`:

```powershell
cd C:\Source\M346; python -m http.server 8080
```

Danach `http://localhost:8080` oeffnen. Das Journal wird pro Browser und Adresse gespeichert, daher regelmaessig als Markdown sichern.
