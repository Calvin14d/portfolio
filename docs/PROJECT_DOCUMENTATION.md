# Animated Portfolio (Next.js) — Project Documentation

## Overview
This repository contains a statically-exported Next.js portfolio site designed for GitHub Pages. The UI is built around a layered animated background (scroll-driven image sequence + particles + matrix rain), a theme system (dark/light), and section-based content (Hero, Skills, Projects, About, Contact).

## Tech Stack
- Framework: Next.js (App Router)
- Language: TypeScript + React
- Styling: Tailwind CSS v4 (via `@import "tailwindcss"`) + CSS Modules + CSS variables theme files
- Animation: Framer Motion, Typed.js, canvas-based effects
- Theme: `next-themes` (class-based theme switching)
- Deployment: Static export (`output: 'export'`) + `gh-pages` publish

## Quick Start (Local)
From the repository root (`portfolio/`):

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## NPM Scripts
Defined in `package.json`:
- `npm run dev`: starts the local dev server.
- `npm run build`: builds the app. Because `next.config.ts` uses `output: 'export'`, the build produces a static site in `out/`.
- `npm run predeploy`: builds and ensures `out/.nojekyll` exists.
- `npm run deploy`: publishes the `out/` directory to the `gh-pages` branch using the `gh-pages` package.
- `npm run start`: starts a production server (mainly useful outside GitHub Pages).
- `npm run lint`: runs ESLint.

## Project Structure
High-level structure (generated/build folders included for clarity):

```text
portfolio/
  .git/                      # Git repository metadata
  .gitignore                 # Ignored files/folders for Git
  .next/                     # Next.js build output (generated)
  out/                       # Static export output (generated)
  node_modules/              # Dependencies (generated)
  public/                    # Static assets served as-is
  src/
    app/                     # Next.js App Router entrypoints
    components/              # UI building blocks
    styles/                  # Global CSS + theme variables
  eslint.config.mjs          # ESLint configuration
  next-env.d.ts              # Next.js TypeScript references (generated)
  next.config.ts             # Next.js config (static export + GitHub Pages basePath)
  package.json               # Dependencies and scripts
  postcss.config.mjs         # PostCSS config (Tailwind v4)
  tsconfig.json              # TypeScript configuration
  README.md                  # Default scaffold readme (can be replaced)
```

Notes:
- `package-lock.json` pins dependency versions for consistent installs.
- `.nojekyll` exists to prevent GitHub Pages from running Jekyll processing (important for paths like `/_next/`).

## Application Architecture

### App Router Entry Points (`src/app/`)

#### `src/app/layout.tsx`
- Defines the global HTML shell for all routes.
- Imports global styles from `src/styles/globals.css`.
- Loads Google fonts using `next/font/google` (Geist, Geist Mono, Bitter).
- Wraps the app with `Providers` (theme context) and renders `NetworkStatus` globally.
- Adds Boxicons CSS in the `<head>` for icon usage across the UI.

#### `src/app/providers.tsx`
- Client component that mounts a `ThemeProvider` from `next-themes`.
- Uses a `mounted` state to avoid hydration mismatch (theme depends on client-only state).
- Configured with:
  - `attribute="class"` so theme is applied as a class on the root element.
  - `defaultTheme="dark"` and `enableSystem={false}`.

#### `src/app/page.tsx`
- Main portfolio page (client component).
- Composes the page from:
  - `Navbar`
  - Section components: `Skills`, `Projects`, `AboutCard`, `Contact`
  - Background layers: `ScrollSequence`, `Particles`, `MatrixRain`
  - Typed hero subtitle using `typed.js`

Base path handling:
- Uses `process.env.NODE_ENV` to set `base` to `'/portfolio'` in production and `''` in development.
- This matches the GitHub Pages URL pattern: `https://<username>.github.io/portfolio/`.
- Static assets are referenced like `${base}/profile_photo/profile_photo.png`.

Scroll-driven background:
- Builds arrays of 51 image URLs for dark and light laptop frame sequences.
- `ScrollSequence` renders the right frame based on scroll position.

#### `src/app/not-found.tsx`
- Custom 404 page with a “system error” aesthetic.
- Uses `.glitch-text` styles defined in `src/styles/globals.css`.

### Components (`src/components/`)

#### Layout

`src/components/layout/Navbar.tsx`
- Fixed top navigation.
- Desktop links + CTA + theme toggle.
- Mobile hamburger menu with dropdown.

#### Sections

`src/components/sections/Skills.tsx`
- Renders a grid of “terminal” skill tiles.
- Uses icons hosted externally (Devicon + Wikipedia SVG URLs).
- Styling is handled by `src/components/sections/Skills.module.css`.

`src/components/sections/Projects.tsx`
- Implements a 3D spinning carousel of top projects plus a responsive grid of “other projects”.
- Uses requestAnimationFrame for continuous animation and momentum after dragging.
- Calculates the 3D radius based on viewport breakpoints.
- Styling is handled by `src/components/sections/Projects.module.css`.

Important asset note:
- `Projects.tsx` references several images under `public/img/projects/` (for example `ai_sec.jpg`, `net_vis.jpg`, etc.).
- In the current repo, only a subset exists (for example `public/img/projects/pass_vault.jpg` and `public/img/projects/landing.jpg`). Missing files will render as broken images after deployment.
- GitHub Pages is case-sensitive. Ensure file names and extensions match exactly (for example `.jpg` vs `.JPG`).

`src/components/sections/AboutCard.tsx`
- A 3D flip-card with hover tilt (front) and contact links (back).
- Uses Typed.js for the rotating “About me” text.
- Uses utility classes defined in `src/styles/globals.css` for 3D transforms.

`src/components/sections/Contact.tsx`
- Contact form UI.
- Submits form content via `fetch()` to a Discord webhook.

Security note (important for GitHub uploads):
- The Discord webhook URL is a secret and is currently hard-coded in `src/components/sections/Contact.tsx`.
- If you push this repository to GitHub, the webhook will be exposed publicly and can be abused.
- GitHub Pages is static, so you cannot securely hide a webhook/secret in frontend code. Use one of these approaches instead:
  - Replace the form with `mailto:` or direct links.
  - Use a form provider (Formspree, Getform, etc.)
  - Use a backend/serverless function (Vercel/Netlify/Cloudflare) and call that endpoint from the form.
  - Rotate/revoke the current webhook immediately if it has been exposed.

#### UI / Effects

`src/components/ui/ThemeToggle.tsx`
- Toggles between `dark` and `light` using `next-themes`.
- Uses a mounted check to avoid hydration issues.

`src/components/ui/NetworkStatus.tsx`
- Listens to `online`/`offline` events.
- When offline, shows a full-screen overlay with an animated progress bar.

`src/components/ui/Particles.tsx`
- Canvas particle system with connecting lines.
- Reads `--main-color` from CSS variables so it matches the current theme.

`src/components/ui/MatrixRain.tsx`
- Canvas-based “matrix” falling character effect.

`src/components/ui/ScrollSequence.tsx`
- Preloads an array of images and draws the correct frame to a full-screen canvas.
- Uses Framer Motion’s `useScroll()` and a transform to map scroll progress to an image index.

## Styling System

### Global CSS
`src/styles/globals.css`:
- Imports Tailwind v4 and both theme files.
- Defines global typography and scroll behavior.
- Defines custom utility classes and keyframe animations used by components:
  - Profile border morph (`.animate-morph`)
  - Gradient text (`.text-gradient`)
  - 404 glitch text (`.glitch-text`)
  - 3D card helpers (`.perspective-1400`, `.transform-style-3d`, etc.)
  - Offline progress bar animation (`.animate-progress-indeterminate`)

### Themes
- `src/styles/themes/light.css`: defines CSS variables on `:root` for light mode.
- `src/styles/themes/dark.css`: defines CSS variables under `.dark` for dark mode.

These variables drive:
- `--background`, `--second-bg-color`
- `--foreground`
- `--main-color`, `--gradient-second`
- glass effects: `--glass-bg`, `--glass-border`, `--glass-blur`

## Static Assets (`public/`)
Everything in `public/` is served as-is.
- `public/profile_photo/`: profile images used in the hero.
- `public/dark_animated_laptop/` and `public/light_animated_laptop/`: frame-by-frame background images used by `ScrollSequence`.
- `public/img/projects/`: project card images used by `Projects`.

If you add new assets, keep paths and file name casing consistent with the imports/URLs in code.

## Configuration Files

### `next.config.ts`
Key settings:
- `output: 'export'`: generates a fully static site in `out/`.
- `basePath` and `assetPrefix`: set to `'/portfolio'` only in production.
- `images.unoptimized: true`: required for static export when using Next image optimization (this project uses plain `<img>` tags, but the setting is safe).

If your GitHub repository name is not `portfolio`, update the production prefix to match:

```ts
basePath: isProd ? '/<your-repo-name>' : '',
assetPrefix: isProd ? '/<your-repo-name>/' : '',
```

### `eslint.config.mjs`
- Uses Next.js “core web vitals” + TypeScript rules.
- Ignores generated folders like `.next/` and `out/`.

### `tsconfig.json`
- Strict TypeScript settings.
- Path alias `@/*` maps to `src/*`.

## Deploying to GitHub Pages (Full Guide)

This project is already configured for GitHub Pages deployment via the `gh-pages` branch.

### One-Time GitHub Setup
1. Ensure the repository exists on GitHub (example remote in this repo: `origin`).
   - If you do not have a GitHub repo yet:
     - Create a new repository on GitHub named to match your desired Pages URL (for project pages, this is typically the repo name).
     - In `next.config.ts`, set `basePath`/`assetPrefix` to that repo name for production.
     - Initialize and push from your local folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

2. On GitHub, go to:
   - Repository `Settings` → `Pages`.
3. Under “Build and deployment”, set:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Save. GitHub will publish at:
   - `https://<username>.github.io/<repo>/`

### Deploy Command
From `portfolio/`:

```bash
npm run predeploy
npm run deploy
```

What happens:
- `predeploy` runs a full static build and creates `out/.nojekyll`.
- `deploy` pushes `out/` to the `gh-pages` branch.

### Pushing Your Source Code
If `git status` says you are ahead of `origin/main`, push your latest commit(s):

```bash
git push
```

### Project Pages vs User/Org Pages
- Project Pages URL format: `https://<username>.github.io/<repo>/` (this project is configured for this).
- User/Org Pages URL format: `https://<username>.github.io/` (repo must be named `<username>.github.io`, and typically `basePath` should be empty).

### Troubleshooting
- Blank page or missing assets on GitHub Pages:
  - Check `next.config.ts` `basePath` matches your repository name.
  - Verify asset URLs in `src/app/page.tsx` and `src/components/sections/Projects.tsx`.
- Images work locally but fail on GitHub Pages:
  - Fix file name casing (`.JPG` vs `.jpg`) and ensure the files exist in `public/`.
- Contact form works locally but is unreliable/unsafe on Pages:
  - Remove secrets (webhooks) from frontend code and use a proper backend or a form provider.

## Common Customizations
- Hero text/links: `src/app/page.tsx`
- Navbar links/labels: `src/components/layout/Navbar.tsx`
- Skills tiles: `src/components/sections/Skills.tsx` + `src/components/sections/Skills.module.css`
- Projects list/images: `src/components/sections/Projects.tsx` + `public/img/projects/`
- About card text/links: `src/components/sections/AboutCard.tsx`
- Theme colors: `src/styles/themes/light.css`, `src/styles/themes/dark.css`
