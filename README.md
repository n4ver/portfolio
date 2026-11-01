# n4ver.xyz

Personal portfolio of Nicholas Chng, live at **https://www.n4ver.xyz**.

Built with Vue 3, Vite and Tailwind CSS v3, prerendered to static HTML with [vite-ssg](https://github.com/antfu-collective/vite-ssg) and deployed to GitHub Pages.

## Run it

Requires Node 22 (see `.nvmrc`).

```sh
npm ci
npm run dev       # dev server at http://localhost:5173
npm run build     # prerendered site in dist/
npm run preview   # serve dist/ locally
npm run lint      # ESLint (eslint-plugin-vue)
npm run format    # Prettier
```

## Editing content

All CV content lives in `src/data/`. Changing these files updates the page with no template edits:

| File            | What it holds                                                                  |
| --------------- | ------------------------------------------------------------------------------ |
| `profile.js`    | Name, role, availability, email, links, resume, summary + quote, terminal text |
| `experience.js` | Jobs: role, company, location, dates, bullets, tags                            |
| `projects.js`   | Project cards (see the comment at the top of the file) and course projects     |
| `education.js`  | Education entries (optional `gpa`, `coursework`) and notes                     |
| `skills.js`     | Skill groups                                                                   |

The resume PDF is `public/Nicholas-Chng-Resume.pdf`. Project screenshots go in `public/projects/`, referenced from a project's `image` field.

`index.html` carries the page title, meta description, Open Graph tags and JSON-LD; update those by hand if the role line changes.

## Structure

- `src/App.vue`: page layout only
- `src/components/`: one component per piece of UI (hero, sections, cards, terminal, background)
- `src/composables/`: shared state (`useSecretTheme`, `usePrefersReducedMotion`)
- `src/style.css`: theme tokens (CSS variables) for the normal and corrupted themes, reveal animation, fonts

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml` (lint, build, deploy to Pages). Pull requests run `.github/workflows/ci.yml`: lint, build and Lighthouse with minimum scores of 0.9 performance and 0.95 accessibility, best practices and SEO (`lighthouserc.json`).

## Credits

- The WebGL background (`src/components/ThreadsBackground.vue`) and the scroll reveal are adapted from [Vue Bits](https://vue-bits.dev) by David Haz, MIT + Commons Clause. See `src/components/LICENSE-vue-bits.md`.
- [Fira Code](https://github.com/tonsky/FiraCode), self-hosted under the SIL Open Font License (`public/fonts/OFL.txt`).
