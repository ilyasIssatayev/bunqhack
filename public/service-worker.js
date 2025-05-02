self.addEventListener("install", event => {
  console.log("[SW] Installed");
  const options = {
    body:  "Push received!",
    icon: "icon-192-192.png",
  };
});

self.addEventListener("activate", event => {
  console.log("[SW] Activated");
});

self.addEventListener("push", event => {
  console.log("[SW] Push received");
  const data = event.data ? event.data.json() : {};
  const title = data.title || "Notification";
  const options = {
    body: data.body || "Push received!",
    icon: "icon-192-192.png",
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
