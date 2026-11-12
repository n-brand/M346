// Service Worker: alles vorab cachen, damit die App offline laeuft.
// Bei Aenderungen an Dateien VERSION erhoehen. Neue Screenshots unten eintragen.
var VERSION = 'm346-v2';

var ASSETS = [
  './',
  'index.html',
  'css/styles.css',
  'js/app.js',
  'js/questions.js',
  'manifest.webmanifest',
  'img/icon.svg'
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
