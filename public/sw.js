self.addEventListener('install', (e) => {
  console.log('PWA Service Worker 已安装');
});

self.addEventListener('fetch', (e) => {
  // 这里可以留空，或者处理缓存逻辑
  e.respondWith(fetch(e.request));
});
