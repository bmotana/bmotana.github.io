# Portfolio — Local Setup

## Requirements
Install Node.js (v18+) from https://nodejs.org — choose the LTS version.

## Steps

1. Extract this folder somewhere on your computer
2. Open a terminal inside the folder
3. Run:

```bash
npm install
npm run dev
```

4. Open http://localhost:5173 in your browser

The site hot-reloads — every file save updates the browser instantly.

## Files to personalise (the only ones you need to touch)

| File | What to change |
|---|---|
| src/data/projects.js | Your project titles, descriptions, tags, and links |
| src/components/Hero.jsx | Your name, tagline, and email link |
| src/components/Navbar.jsx | Logo text and GitHub URL |
| src/components/Footer.jsx | Your name, GitHub, LinkedIn, email |

## When ready to deploy to GitHub Pages

1. In vite.config.js — change `base: '/'` to `base: '/your-repo-name/'`
2. Install gh-pages: `npm install -D gh-pages`
3. Add to package.json scripts:
   `"predeploy": "npm run build"`
   `"deploy": "gh-pages -d dist"`
4. Add to package.json root:
   `"homepage": "https://yourusername.github.io/your-repo-name"`
5. Run: `npm run deploy`
