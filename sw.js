 self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('dir-zap').then((cache) => cache.addAll([
      '/pwa-directzap/',
      '/pwa-directzap/index.html',
      '/pwa-directzap/bootstrap/css/bootstrap.min.css',
      '/pwa-directzap/bootstrap/css/bootstrap.min.css.map',
      '/pwa-directzap/bootstrap/fonts/glyphicons-halflings-regular.eot',
      '/pwa-directzap/bootstrap/fonts/glyphicons-halflings-regular.svg',
      '/pwa-directzap/bootstrap/fonts/glyphicons-halflings-regular.ttf',
      '/pwa-directzap/bootstrap/fonts/glyphicons-halflings-regular.woff',
      '/pwa-directzap/bootstrap/fonts/glyphicons-halflings-regular.woff2',
      '/pwa-directzap/bootstrap/js/bootstrap.min.js',
      '/pwa-directzap/css/main.css',
      '/pwa-directzap/img/icon_192.png',
      '/pwa-directzap/img/ic_launcher_48x48.png',
      '/pwa-directzap/img/ic_launcher_72x72.png',
      '/pwa-directzap/img/ic_launcher_96x96.png',
      '/pwa-directzap/img/ic_launcher_144x144.png',
      '/pwa-directzap/img/ic_launcher_192x192.png',
      '/pwa-directzap/img/apple-touch-icon.png',
      '/pwa-directzap/img/apple-touch-icon-57x57.png',
      '/pwa-directzap/img/apple-touch-icon-72x72.png',
      '/pwa-directzap/img/apple-touch-icon-76x76.png',
      '/pwa-directzap/img/apple-touch-icon-114x114.png',
      '/pwa-directzap/img/apple-touch-icon-120x120.png',
      '/pwa-directzap/img/apple-touch-icon-144x144.png',
      '/pwa-directzap/img/apple-touch-icon-152x152.png',
      '/pwa-directzap/img/apple-touch-icon-180x180.png',
      '/pwa-directzap/img/favicon.ico',
      '/pwa-directzap/img/logo1.png',
      '/pwa-directzap/jquery/jquery-1.12.4.min.js',
      '/pwa-directzap/js/main.js'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});