# Ben Motana — Developer Portfolio

A responsive portfolio highlighting selected projects, services, technical capabilities, and contact links.

**Live site:** [bmotana.github.io](https://bmotana.github.io)

## Features

- Mobile-first layouts with a compact, single-row navigation bar and 44 × 44 px navigation targets.
- Native touch scrolling on phones, with Lenis smoothing for wheel and programmatic navigation. Anchor jumps account for the navbar's rendered height.
- Responsive hero, service, and project sections, with mobile spacing and stable small-viewport sizing.
- A continuously scrolling capability strip that pauses on hover or focus, plus subtle project preview motion that respects reduced-motion preferences.
- Contact links, project demos, and source repositories.

## Run locally

```sh
npm ci
npm run dev
```

Vite listens on the local network. To preview from a phone or tablet on the same network, open the **Network** URL printed by Vite.

## Checks

```sh
npm run lint
npm test
npm run build
```

Component tests use Vitest and JSDOM. They cover rendering, responsive grid breakpoints, navigation behavior, and touch-target classes. Native touch flings, browser rubber-band behavior, and pull-to-refresh need to be checked on physical iOS and Android devices.

The GitHub Pages workflow runs lint, tests, and a production build before deployment to `main`.

## Stack

React, Vite, Tailwind CSS, GSAP, Lenis, and Vitest.

## Connect

[GitHub](https://github.com/bmotana) · [LinkedIn](https://linkedin.com/in/bmotana1) · [Email](mailto:bmotana1@gmail.com)
