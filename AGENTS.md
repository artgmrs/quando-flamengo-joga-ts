# AGENTS.md

This file provides guidance for AI coding agents working on this repository.

## Project Overview

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Language**: TypeScript 5
- **Purpose**: Front-end application displaying Flamengo's next game with Google Calendar integration

## Build Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Type Checking

```bash
# TypeScript compilation (included in build)
npx tsc -b
```

## Testing

**No test framework is currently configured.** Tests need to be added manually.

## Code Style Guidelines

### TypeScript

- Use **strict mode** (enabled in tsconfig)
- Enable all strict flags: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- Target ES2020 with DOM libraries
- Use `.ts` extension in import paths explicitly

### Naming Conventions

- **Components**: PascalCase files and function names (e.g., `GameInfo.tsx`, `function Mandante`)
- **Interfaces/Types**: PascalCase (e.g., `GameProp`)
- **Functions**: camelCase (e.g., `formatDate`, `generateGoogleCalendarLink`)
- **Variables**: camelCase (e.g., `loadingInProgress`)
- **CSS Files**: PascalCase matching component name (e.g., `GameInfo.css`)

### Imports

- Group imports: React hooks first, then components, then utils, then CSS
- Use double quotes for strings
- Explicit `.ts` extension in import paths:
  ```typescript
  import getNextGame from "../../services/ApiService.ts";
  import { GameProp } from "../../types/GameProp.ts";
  ```

### Formatting

- 2-space indentation
- Use semicolons
- Single line breaks between imports and code
- JSX in parentheses for multi-line components

### React Patterns

- Use functional components (arrow functions or regular functions)
- Destructure props when used
- Use React hooks (`useState`, `useEffect`) at top of component
- Export components as default at end of file
- Use `react-jsx` transform (no need to import React)

### Error Handling

- Handle loading states explicitly (e.g., `ClipLoader` for loading)
- Use optional chaining for potentially undefined data (`dados?.nomeRival`)
- No try-catch in async functions (follow existing pattern)

### ESLint Rules

- Extends: `eslint:recommended`, `@typescript-eslint/recommended`, `react-hooks/recommended`
- Plugins: `react-refresh`
- Special rule: `react-refresh/only-export-components` with `allowConstantExport: true`

## Project Structure

```
src/
├── components/       # React components (PascalCase directories)
│   └── GameInfo/
│       ├── GameInfo.tsx
│       └── GameInfo.css
├── services/         # API calls and external services
│   └── ApiService.ts
├── types/            # TypeScript interfaces and types
│   └── GameProp.ts
├── utils/            # Helper functions
│   ├── DateUtils.ts
│   └── GoogleCalendarUtils.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Dependencies

- `axios` - HTTP client
- `react-spinners` - Loading spinners
- No state management library (use React hooks)

## API

External API endpoint used:
- `https://flascrapper.vercel.app/api/nextgame` - Returns next Flamengo game data

## Notes

- Application is Brazilian Portuguese focused (pt-BR locale)
- No test runner configured - add one if writing tests
- No Prettier configuration - follow existing manual formatting
- CSS uses BEM-like naming (e.g., `team-principal`, `box-teams`)
