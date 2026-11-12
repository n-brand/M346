// Service Worker: alles vorab cachen, damit die App offline laeuft.
// Bei Aenderungen an Dateien VERSION erhoehen. Neue Screenshots unten eintragen.
var VERSION = 'm346-v3';

var ASSETS = [
  './',
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/questions.js',
  'js/questions/kn01.js',
  'js/questions/kn02.js',
  'js/questions/kn03.js',
  'js/questions/kn04.js',
  'js/questions/kn05.js',
  'js/questions/kn06.js',
  'js/questions/kn07.js',
  'js/questions/kn08.js',
  'js/questions/kn09.js',
  'manifest.webmanifest',
  'img/icon.svg',
  'Anforderungen/Unterlagen/Theorie/img/Hypervisor.png',
  'Anforderungen/Unterlagen/Kompetenznachweise/KN08/snapshots.png',
  'Anforderungen/Unterlagen/Theorie/img/Migrationsmodelle.png',
  'Anforderungen/Unterlagen/Theorie/img/Betriebsmodell_Hybrid_Webshop.svg'
  // 'img/screenshots/beispiel.png',
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        // Weitere Ressourcen (z.B. Google Fonts) beim ersten Laden mitcachen
        if (res && (res.ok || res.type === 'opaque')) {
          var copy = res.clone();
          caches.open(VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        if (req.mode === 'navigate') return caches.match('index.html');
      });
    })
  );
});
