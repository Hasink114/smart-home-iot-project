# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Built with

- TanStack Start
- React (JavaScript/JSX only — no TypeScript in app code)
- Tailwind CSS v4
- Firebase (Authentication + Realtime Database)
- Zustand

## Smart Home IoT Platform

A subscription-based smart home management platform: homes, rooms, ESP32 control
boxes, relay-connected appliances, live status, sensor analytics, schedules and
subscription management. Built against an existing Firebase project
(`esp32-relay-control-e1413`); see the project master instruction for the full spec.

### Setup

1. Copy `.env.example` to `.env`.
2. Fill in the Firebase web config values from **Firebase Console → Project
   Settings → General → Your apps → SDK setup and configuration** (these are
   public client identifiers, not secrets).
3. `npm i` and `npm run dev`.

Until the values are set, the app runs in "Awaiting Firebase setup" mode and no
Firebase feature initializes.

### Architecture

- `src/firebase/firebase.js` — the ONLY place Firebase is configured; lazy
  singletons (`getFirebaseApp`, `getFirebaseAuth`, `getFirebaseDatabase`) plus a
  `firebaseConfigured` flag for UI status. Uses `import.meta.env.VITE_FIREBASE_*`.
- `src/routes/` — TanStack Start file-based routes, all `.jsx`:
  `__root.jsx` (app shell + fonts/meta), `_app.jsx` (pathless layout with the
  sidebar/bottom-nav shell), `_app/{index,rooms,devices,analytics,schedules,subscription,settings}.jsx`.
- `src/components/layout/AppLayout.jsx` — navigation shell and Firebase status chip.
- `src/components/layout/PageParts.jsx` — shared `PageHeader`, `EmptyStateCard`, `SectionPage`.
- `src/styles.css` — the design system (oklch tokens, Manrope font). Never hardcode colors in components.

### Development phases

1. ✅ **Foundation** — project structure, Firebase config layer, design system, app shell, section routes.
2. ⬜ Auth & onboarding (Firebase Authentication, profiles).
3. ⬜ Homes, rooms & ESP32 box registration.
4. ⬜ Devices, desired/actual state control.
5. ⬜ Data & monitoring (real sensor readings, analytics).
6. ⬜ Schedules, subscription management, settings.

### Key rules

- JavaScript/JSX only in app code; no TypeScript or TSX files.
- All Firebase operations live in dedicated service modules, never scattered in UI components.
- `desiredState` (user request) ≠ `actualState` (ESP32-reported) ≠ `online`. Never
  fabricate current/power/voltage readings; only real sensor data is displayed.
- Free plan: 1 room, 2 devices total. Pro: unlimited + analytics + schedules.
  Limits must be enforced by trusted backend logic, not just the frontend.

