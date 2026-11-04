<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Architecture rules

- App code is JavaScript/JSX only (user's master instruction): no new .ts/.tsx
  source files. TypeScript remains only in toolchain files (configs, generated
  routeTree.gen.ts, pre-existing src/test and lib helpers).
- Firebase is the only backend; the existing project `esp32-relay-control-e1413`
  must not be replaced. Firebase configuration lives only in
  `src/firebase/firebase.js`, read from `VITE_FIREBASE_*` env vars, initialized
  lazily — never initialize or configure Firebase in another file.
- All Firebase operations belong in dedicated service modules, not UI components.
- Routes are TanStack Start file routes in `src/routes`, all `.jsx`; section
  pages live under the `_app.jsx` pathless layout. Never edit routeTree.gen.ts.
- Design tokens are defined once in `src/styles.css` (oklch); components never
  hardcode colors.
- Never fabricate sensor readings (current/power/voltage); only display real
  sensor data. Keep desiredState (requested) separate from actualState (reported).
- No payment gateway unless explicitly requested; plan limits are enforced
  server-side, never frontend-only.

