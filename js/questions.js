// Fragenkatalog: window.QUESTIONS wird hier angelegt, die Fragen liegen pro
// Kompetenznachweis in js/questions/knXX.js (jede Datei haengt ihre Fragen an).
//
// Felder einer Frage:
//   id          eindeutig, z.B. "kn03-12" (wird fuer die Statistik verwendet)
//   topic       "KN03 IaaS und IaC" (Filter im Quiz, pro KN immer derselbe Text)
//   text        Fragetext
//   image       optional, Pfad zu einem Screenshot
//   imageAlt    optional, Beschreibung des Bildes
//   options     Antwortmoeglichkeiten
//   correct     Indizes der richtigen Antworten (ab 0). Mehrere = Mehrfachauswahl
//   explanation optional, Erklaerung nach dem Pruefen
//
// Neue Dateien und Bilder zusaetzlich in sw.js (Liste ASSETS) und index.html eintragen.

window.QUESTIONS = [];
