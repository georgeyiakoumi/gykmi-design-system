# @gykmi design system

A distributable, versioned design system. Tokens are the single source of truth.

## Getting started

```bash
# Requires Node 22 (LTS) and pnpm
nvm use        # reads .nvmrc
pnpm install
```

## Scripts

```bash
pnpm run build       # Build all packages
pnpm run lint        # Lint all packages (Biome)
pnpm run typecheck   # TypeScript strict checking
pnpm run test        # Run all tests (Vitest)
pnpm run format      # Format all files (Biome)
pnpm run check       # Lint + format check (Biome)
```

## Format on save

This project uses [Biome](https://biomejs.dev) for linting and formatting.

**VS Code:** Install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome), then add to your workspace settings (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true
}
```

**Other editors:** Run `pnpm run format` before committing, or configure your editor's Biome plugin.

## Packages

| Package | Description | Status |
|---|---|---|
| `@gykmi/tokens` | Design tokens (CSS vars + TS types) | M1 |
| `@gykmi/ui` | Component library | Scaffold only |

## Structure

```
packages/
  tokens/   @gykmi/tokens — design tokens
  ui/       @gykmi/ui — component library (from M2)
apps/
  docs/     Storybook documentation (from M2)
```
