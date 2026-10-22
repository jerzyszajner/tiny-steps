# tiny-steps

Task list filtered by available time and energy. Learning project (React + TypeScript).

## Stack
Vite, React, TypeScript, React Router, Firebase (Auth + Firestore), CSS Modules.
No AI, UI libraries or Google Maps.

## Conventions
- Code, commits, README and UI in English.
- Commits: imperative, lowercase, one change each (e.g. `add task list page`).
- Never commit `.env` files. Branch: `main` only.
- Components do not touch Firebase directly: use `services/` and hooks.

## Code style
- Components are `function` declarations, not arrows. No `import React`.
- Component and file share one name, PascalCase. Pages end with `Page` and live in their own folder (`pages/HomePage/HomePage.tsx`). JSX files are `.tsx`, the rest `.ts`.
- Router in Declarative mode (`BrowserRouter`, `Routes`, `Route`), imported from `react-router`.
- Routes: `/`, `/tasks/:id`, `/login`, `*`.

## Workflow
- Progress and next steps live in `notes/PLAN.md`. Work on one step at a time.
- New ideas go to `notes/PARKING.md`, not into the code.

## Styling
- Global tokens only in `src/index.css` (`--color-*`, `--spacing-*`). Use only those values.
- Until the styling step, components stay unstyled.
