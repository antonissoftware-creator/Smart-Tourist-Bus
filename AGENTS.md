# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Expo Router screens and layouts (file-based routing). Example: `app/index.tsx` is the home route, `app/_layout.tsx` defines the root stack.
- `assets/`: Static assets (images, icons, fonts) referenced by the app.
- `components/`: Reusable UI and layout components.
- `types/`: Shared TypeScript types and interfaces, grouped by feature or concern.
- `interfaces/`: Shared TypeScript interfaces, grouped by feature or concern.
- `app.json`: Expo configuration (app name, icons, splash, etc.).
- `eslint.config.js`, `tsconfig.json`: Linting and TypeScript configuration.

## Build, Test, and Development Commands
- `npm install`: Install dependencies.
- `npm run start` or `npx expo start`: Start the Expo dev server.
- `npm run android`: Launch on Android emulator/device.
- `npm run ios`: Launch on iOS simulator (macOS only).
- `npm run web`: Run the web build via Expo.
- `npm run lint`: Run ESLint with the Expo config.
- `npm run reset-project`: Resets the starter template (requires `scripts/reset-project.js` to exist).

## Coding Style & Naming Conventions
- Language: TypeScript + React Native (Expo Router).
- Indentation: 2 spaces (match existing files).
- Naming: components and screens use `PascalCase`, hooks use `useX`, file-based routes use lowercase filenames (e.g., `app/index.tsx`).
- Linting: `eslint` with `eslint-config-expo` (`npm run lint`).
- Types: define TypeScript types in `types/` and interfaces in `interfaces/`; import them into components/screens; avoid inline type/interface declarations in UI files.
- Theming: use `useThemeColor` from `hooks/use-theme-color.ts` for UI colors and avoid hardcoded hex values in new screens/components.
  - Base palette lives in `constants/theme.ts` (`background`, `text`, `mutedText`, `tint`, `icon`).
  - Apply theme colors to top-level backgrounds, primary text, secondary text, and links/buttons.

## Organizing Types, Interfaces, and Constants
- Folder scope: keep `types/`, `interfaces/`, and `constants/` organized by feature or concern (e.g., `types/bus.ts`, `interfaces/route.ts`, `constants/map.ts`), not by file owner.
- File names: use lowercase, descriptive, singular names (`trip.ts`, `ticket.ts`) and keep related items in one file until it grows beyond reasonable size.
- Export style: prefer named exports; avoid default exports in these folders to keep imports explicit and searchable.
- Surface area: keep UI-focused files free of inline type/interface declarations; import from `types/` or `interfaces/` instead.
- Reuse: if a type/interface is used by more than one feature, place it in a shared file (e.g., `types/shared.ts`) and re-export from a feature file only if needed for ergonomics.
- Dependencies: do not import UI components into `types/`, `interfaces/`, or `constants/`. These layers should be framework-agnostic and safe to use anywhere.
- Structure for types:
  - Prefer `type` for unions, mapped types, and utility compositions.
  - Prefer `interface` for object shapes intended to be extended or implemented.
  - Keep names precise and domain-focused (e.g., `BusStop`, `TripSummary`, `RouteLeg`).
- Constants: centralize reusable values in `constants/` instead of duplicating literals (status strings, API paths, limits, display labels).
- Constant naming: use `UPPER_SNAKE_CASE` for primitives and `camelCase` for objects (e.g., `MAX_STOPS`, `mapConfig`).
- Avoid magic strings: pair enums or string unions with typed constants when values are used in multiple places.
- Export grouping: group related exports in a single file and keep the public API small; use `index.ts` per folder only if it improves import clarity.
- Local vs shared: keep view-specific constants local to the screen/component if they are not reused elsewhere.

## Testing Guidelines
- No automated test runner is configured in this repo.
- If adding tests, document the framework and add a matching npm script (e.g., `test`).

## Commit & Pull Request Guidelines
- Current Git history contains only `Initial commit`, so there is no established commit message convention yet.
- Recommended commit style: short, imperative, scoped if helpful (e.g., `Add map screen`).
- PRs should include: a clear description, how to verify, and screenshots or screen recordings for UI changes.

## Configuration Tips
- Use `app.json` for app metadata and Expo settings.
- Prefer keeping environment-specific values in a `.env` file if introduced; document any new variables in the README.
