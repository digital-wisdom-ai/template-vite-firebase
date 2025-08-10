# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `make emulator` - Start development server (runs on port 3000)
- `make build` - Build for production
- `make clean` - Remove build artifacts and node_modules

### Code Quality

- `make lint` - Run ESLint with auto-fix
- `make format` - Format all files with Prettier
- `make checkFormat` - Check formatting (used in CI)
- `make preCommit` - Run pre-commit checks manually

### Testing

- `make test` - Run tests in watch mode
- `make testRun` - Run tests once (for CI)
- `pnpm test` - Run Vitest tests in watch mode
- `pnpm test-run` - Run Vitest tests once

### Environment Management

- `make beStaging` - Switch to staging environment (.env.staging)
- `make beProduction` - Switch to production environment (.env.prod)

### Git Workflow Commands

- `make deployFeatureToProd` - Merge staging to prod and deploy
- `make featureComplete` - Clean up feature branch after merge to staging

### Package Management

Use `pnpm` for all package operations (not npm or yarn).

### Design Tokens

- `make tokensSync` - Download tokens from Firebase and generate TypeScript constants
- `make tokensUpload` - Upload local tokens.json to Firebase Remote Config
- `node scripts/designTokens.js generate` - Generate TypeScript constants from tokens.json

## Architecture Overview

This is a Vite-based React template with Firebase authentication and live design tokens system using Emotion CSS-in-JS.

### Key Components

- **AuthContext** (`src/context/AuthContext.tsx`) - Firebase authentication provider that wraps the entire app
- **DesignTokensContext** (`src/context/DesignTokensContext.tsx`) - Design tokens provider with Firebase Remote Config integration
- **Firebase Config** (`src/lib/firebase.ts`) - Firebase initialization with base64-encoded config from environment
- **Design Tokens Client** (`src/lib/designTokens.ts`) - Handles loading tokens from Firebase with local fallbacks
- **Login Flow** - Unauthenticated users see `Login` component with Google SSO buttons
- **Profile** (`src/components/Profile.tsx`) - Main authenticated user interface

### Design Tokens System

- **Source of Truth**: `src/gen/tokens.json` - contains all design values (colors, spacing, typography, etc.)
- **Generated Constants**: `src/gen/tokenConstants.ts` - auto-generated TypeScript constants for type safety
- **Firebase Integration**: Live updates via Firebase Remote Config with local fallbacks
- **Component Usage**: Components use only `getValue()` and `getClasses()` methods with generated constants

### Authentication Flow

1. App wrapped in `AuthProvider` which monitors Firebase auth state
2. If user not authenticated → shows `Login` component with Google SSO
3. If user authenticated → shows `Profile` component
4. Firebase config loaded from `VITE_PUBLIC_FIREBASE_CLIENT_CONFIG` environment variable (base64 encoded)

### Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI**: Material-UI with Emotion styling
- **Authentication**: Firebase Auth with Google provider
- **Testing**: Vitest + Testing Library + jsdom
- **Linting**: ESLint with React plugins
- **Formatting**: Prettier

### Path Aliases

The project uses TypeScript path aliases configured in `config/aliases.ts`:

- `@` → `src/`
- `@components` → `src/components`
- `@context` → `src/context`
- `@hooks` → `src/hooks`
- `@layouts` → `src/layouts`
- `@lib` → `src/lib`
- `@pages` → `src/pages`
- `@routes` → `src/routes`
- `@store` → `src/store`

### Environment Setup

- Firebase client config must be provided as base64-encoded JSON in `VITE_PUBLIC_FIREBASE_CLIENT_CONFIG`
- Development server runs on port 3000 with auto-open browser
- Environment switching handled via symlinked `.env` files

### Testing Setup

- Tests use Vitest with jsdom environment
- Global test setup in `src/test/setup.ts`
- Jest-dom matchers available via setup file

## Coding Standards

### Frontend Standards

- Follow [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) as the default standard
- Use only breakpoint key object syntax for responsive styles (e.g., `{ xs: ..., sm: ... }`)
- Avoid `theme.breakpoints.up()` or similar breakpoint function calls
- Check Makefile for commands before running anything in the project

### Code Quality Principles

- Follow Clean Code book and SOLID principles
  - Specifically, maintain correct reading order of functions
- Use simplest approach that works
- Question whether each line adds value or complexity
- Never add comments unless absolutely necessary
- Ensure new code doesn't break existing functionality
- Never guess - find truth through research or ask the user
