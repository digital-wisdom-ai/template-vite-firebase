# Agent Coding Standards

# ALL CODE MUSE BE UP TO THIS STANDARD

## Use appropriate technologies:

# All platforms

- Check @Makefile for commands before running _anything_ in the project

# Frontend

- React
- Typescript
- MUI
- pnpm for package management
- Use only the breakpoint key object syntax for responsive styles (e.g., { xs: ..., sm: ... }), and do not use theme.breakpoints.up or similar breakpoint function calls.
- single quotes for strings

# Backend

- Python
- Use UV package manager, use it properly, not the backwards-compatible `uv pip` commands.
- Double quotes for strings

## Follow Clean Code principles (Robert C. Martin) and SOLID principles when writing code

- Specifically the correct reading order of functions

## No useless comments!

- Most likely there is absolutely no reason to add a comment
- If you're writing one, it's definitely a sign of a useless comment or bad code, maybe something poorly named

## Never, ever guess. Find truth.

- If you don't know the library, search the web for information
- If you are not sure, ask the user

## Do not regress

- Before adding code, ensure your new code doesn't break existing code
- Make sure quality of moved code is at least as good as the original

## Only essential complexity, not accidental

- Use the simplest approach that works
- Question whether each line adds value or just complexity
