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

## Styling
- Global tokens only in `src/index.css` (`--color-*`, `--spacing-*`). Use only those values.
- Until the styling step, components stay unstyled.
