const REPLACEMENT_MAPPING = {
  '/subresource-integrity-demo/service-worker/style.messed-up.css': '/subresource-integrity-demo/style.css',
  '/subresource-integrity-demo/service-worker/script.messed-up.js': '/subresource-integrity-demo/script.js',
};

const RESOURCES = Object.keys(REPLACEMENT_MAPPING);

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const { pathname } = new URL(request.url);
  if (RESOURCES.indexOf(pathname) < 0) {
    event.respondWith(fetch(request));
    return;
  }
  event.respondWith(
    fetch(request)
    .catch(() => {
      const linkFromOwnServer = REPLACEMENT_MAPPING[pathname];
      const req = new Request(linkFromOwnServer, request);
      console.log(`[INFO]: ${pathname} is invalid, try backup resource... Should notify server here.`);
      return fetch(req);
    })
  );
});
