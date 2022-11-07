<p align="center">
  <div align="center">
    <img src="https://img.shields.io/badge/python-3.6-blue.svg" />
    <img src="https://img.shields.io/badge/lighthouse-100%25-brightgreen.svg" />
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" />
  </div>
</p>

My website running live now at [nickficano.com](https://nickficano.com). This
project is semi-organized, and I do occasionally refactor it, but it can
probably use some clean-up since I learned a lot about client-side development
since I originally wrote it (admittedly the way I incorporate jinja with the
client is ugly and unnecessary). The point being is this is a great project to
reference but using it as a boilerplate is ill-advised.

It's also worth noting that I deploy to my website directly from here, there is
no secret or untracked files required to release this (of course authentication
is handled through ssh keys, but that all happens transparently). You can grok
through my entire source code with confidence that it will never reference some
excluded file.

## Features
* 100% Lighthouse Score
* Python 3.6/Flask Backend
* Progressive Web App (PWA)
* Auto renewing SSL certificates via Let's Encrypt
* Hardened NGINX configuration

## Installing as a Progressive Web App (PWA) on iOS

<img src="https://assets.nickficano.com/gh-nickficano.com-progressive-web-app-pwa.gif" width="296" alt="Installing as a Progressive Web App (PWA) on iOS" />
