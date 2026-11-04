# tiny-steps

A task list filtered by how much time and energy you have right now. It shows only what fits.

Work in progress.

## Features

- Sign up, log in and log out (Firebase Auth)
- Add tasks with estimated time and energy level
- Filter the list by available time, energy and status
- Mark tasks as done or not done
- Delete a task or your whole account (with password confirmation)
- Each user sees only their own tasks

## Tech stack

Vite, React, TypeScript, React Router, Firebase (Auth + Firestore), React Hook Form, Zod, CSS Modules, Vitest.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a Firebase project with Auth (email and password) and Firestore enabled.
3. Copy `.env.example` to `.env` and fill in the values from your Firebase project settings.
4. Start the dev server:

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: start the dev server
- `npm run build`: type-check and build for production
- `npm run preview`: preview the production build
- `npm run lint`: run ESLint
- `npm test`: run tests with Vitest
