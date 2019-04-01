import './scss/main.scss';

const fixViewHeight = () => {
  if (window.location.search.indexOf('mode')) {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
};

const init = () => {
  window.addEventListener('resize', () => fixViewHeight());
  fixViewHeight();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register(`service-worker.js?${Math.random()}`)
    .then(function(registration) {
        console.log('🚀  Service Worker Registered');
        return registration;
    })
    .catch(function(err) {
        console.error('Unable to register service worker.', err);
    });
  }
};

init();