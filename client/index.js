import './scss/main.scss';

if ('ontouchstart' in document.documentElement) {
  document.addEventListener('touchstart', onTouchStart, {passive: true});
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register(`service-worker.js?${Math.random()}`)
    .then(function(registration) {
        console.log('Service Worker Registered');
        return registration;
    })
    .catch(function(err) {
        console.error('Unable to register service worker.', err);
    });
}
