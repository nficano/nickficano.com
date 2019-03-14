import './scss/main.scss';
import 'default-passive-events';

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
