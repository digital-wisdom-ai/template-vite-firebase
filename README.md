# Vite Firebase React Template

A modern React template with Firebase authentication, live design tokens, Vite, TypeScript, and comprehensive testing setup.

## Features

- ⚡️ Vite for super fast development
- 🔐 Firebase Authentication with Google SSO
- 🎨 Live Design Tokens system with Firebase Remote Config
- 💅 Emotion CSS-in-JS styling
- 📝 TypeScript support with path aliases
- ✅ Testing setup with Vitest and Testing Library
- 🔍 ESLint + Prettier configuration with pre-commit hooks
- 📦 PNPM package management
- 📚 Storybook for component development

## Getting Started

1. Clone this template
2. Install dependencies:
   ```bash
   pnpm i
   ```
3. Start the development server:
   ```bash
   make emulator
   ```

## Available Scripts

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

### Environment Management

- `make beStaging` - Switch to staging environment
- `make beProduction` - Switch to production environment

### Design Tokens

- `make tokensSync` - Download tokens from Firebase and generate TypeScript constants
- `make tokensUpload` - Upload local tokens.json to Firebase Remote Config

## Project Structure

```
src/
  ├── App.tsx            # Root application component
  ├── components/        # Reusable components & their tests
  ├── context/           # React contexts (Auth, Design Tokens)
  ├── hooks/             # Custom React hooks
  ├── lib/               # Utility libraries (Firebase, Design Tokens)
  ├── gen/               # Generated files (tokens.json, tokenConstants.ts)
  ├── test/              # Test configuration
  └── main.tsx           # Application entry point
```

## Architecture

### Authentication

- Firebase Authentication with Google SSO
- `AuthContext` provides auth state throughout the app
- Unauthenticated users see login page, authenticated users see profile

### Design Tokens

- Live design tokens loaded from Firebase Remote Config
- Local fallback from `src/gen/tokens.json`
- Type-safe constants generated in `src/gen/tokenConstants.ts`
- Components use `getValue()` and `getClasses()` methods

### Environment Setup

- Firebase config via `VITE_PUBLIC_FIREBASE_CLIENT_CONFIG` (base64 encoded)
- Environment switching with `.env` symlinks
- Path aliases configured for clean imports

## Contributing

Feel free to submit issues and enhancement requests!
