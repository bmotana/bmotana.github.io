# benmotana.dev — Personal Portfolio

A modern, high-performance developer portfolio built with React, Vite, Tailwind CSS v4, GSAP, and Vitest.

## 🚀 Features

- **Responsive & Dynamic Design**: Sleek dark-mode aesthetic with custom animations and glassmorphism.
- **Interactive Navbar**: Brand logo with integrated profile avatar and smooth navigation links.
- **Projects Showcase**: Filterable project cards detailing key technologies and live links.
- **Smooth Animations**: Animated transitions and interactive UI powered by GSAP and Lenis scroll.
- **Unit Testing**: Unit test suite using Vitest and React Testing Library.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [GSAP](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/)
- **Testing**: [Vitest](https://vitest.dev/) + [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)

## 📂 Project Structure

```text
portfolio/
├── public/              # Static assets (favicons, public images)
├── src/
│   ├── components/      # React components (Navbar, Hero, Projects, Services, etc.)
│   ├── data/            # Static data (projects array, user info)
│   ├── test/            # Test setup and configuration
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React application entry point
│   └── index.css        # Main stylesheet with Tailwind directives
├── eslint.config.js     # ESLint configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.js       # Vite build configuration
└── package.json         # Dependencies & scripts
```

## 🏎️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn` / `pnpm`

### Installation

1. Clone or download the repository:
   ```bash
   git clone https://github.com/bmotana/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Builds the production-ready bundle in the `dist` directory.
- `npm run preview`: Previews the built production app locally.
- `npm test`: Runs the Vitest test suite once.

## 🌐 Personalization & Configuration

To personalize the portfolio content:

| File | Description |
|---|---|
| [`src/data/projects.js`](file:///C:/Users/Bafana/Documents/dev/web_dev/portfolio/src/data/projects.js) | Projects list, tags, descriptions, and links |
| [`src/components/Hero.jsx`](file:///C:/Users/Bafana/Documents/dev/web_dev/portfolio/src/components/Hero.jsx) | Intro bio, headline, and email call-to-action |
| [`src/components/Navbar.jsx`](file:///C:/Users/Bafana/Documents/dev/web_dev/portfolio/src/components/Navbar.jsx) | Brand identity, avatar, and header links |
| [`src/components/Footer.jsx`](file:///C:/Users/Bafana/Documents/dev/web_dev/portfolio/src/components/Footer.jsx) | Social media links, copyright notice |

## 🚀 Deployment to GitHub Pages

1. In `vite.config.js`, update `base` if deploying to a subdirectory repository:
   ```js
   base: '/portfolio/'
   ```
2. Install `gh-pages` package:
   ```bash
   npm install -D gh-pages
   ```
3. Add deployment scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
