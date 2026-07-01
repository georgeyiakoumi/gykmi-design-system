# @gykmi design system

A distributable, versioned design system built on headless primitives (Radix), with design tokens as the single source of truth. Fintech/AI POV. Documented in Storybook, consumed by a real app.

## Getting started

```bash
# Requires Node 22 (LTS) and pnpm
nvm use        # reads .nvmrc
pnpm install
```

See the [Getting Started guide](apps/docs/stories/GettingStarted.mdx) for install and usage instructions.

## Scripts

```bash
pnpm run build       # Build all packages
pnpm run lint        # Lint all packages (Biome)
pnpm run typecheck   # TypeScript strict checking
pnpm run test        # Run all tests (Vitest)
pnpm run format      # Format all files (Biome)
pnpm run check       # Lint + format check (Biome)
```

### Storybook

```bash
pnpm --filter @gykmi/docs storybook
```

### Dashboard (consuming app)

```bash
pnpm --filter @gykmi/dashboard dev
```

### E2E tests

```bash
cd apps/dashboard && npx playwright test
```

## Packages

| Package | Description | Version |
|---|---|---|
| `@gykmi/tokens` | Design tokens (CSS vars + TS types) | v0.1.0 |
| `@gykmi/ui` | Component library (43 components) | v1.0.1 |

## Apps

| App | Description |
|---|---|
| `@gykmi/docs` | Storybook documentation (37 stories + 3 docs pages) |
| `@gykmi/dashboard` | Financial dashboard (consuming app) |

## Components (43)

**Layout:** Box, Stack, Separator
**Display:** Accordion, AspectRatio, Avatar, Badge, Card, Collapsible, Progress, ScrollArea, VisuallyHidden
**Form:** Button, Checkbox, Input, Label, RadioGroup, Select, Slider, Switch, Toggle, ToggleGroup
**Overlay/Menu:** AlertDialog, ContextMenu, Dialog, DropdownMenu, HoverCard, Menubar, NavigationMenu, Popover, Tabs, Toast, Toolbar, Tooltip
**POV (Fintech/AI):** AnalysisSection, AuditTrail, ComplianceBanner, ConfidenceIndicator, DataProvenance, DataTable, Disclaimer, ModelError, RegulatoryNotice, StreamingText

## Architecture

```
DTCG JSON → Style Dictionary → CSS custom properties → Tailwind @theme → Components
```

- **Tokens:** DTCG-format JSON, built by Style Dictionary into CSS vars + TS types
- **Styling:** Tailwind v4 with `@theme inline`, tokens as source of truth
- **Components:** Radix primitives, typed props API, Tailwind classes internal
- **Distribution:** compiled CSS (`@gykmi/ui/css`) + Tailwind theme (`@gykmi/ui/theme`)
- **Testing:** 142 unit tests (Vitest + axe) + 8 E2E tests (Playwright)

## Format on save

This project uses [Biome](https://biomejs.dev) for linting and formatting.

**VS Code:** Install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome), then add to your workspace settings (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true
}
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Structure

```
packages/
  tokens/      @gykmi/tokens — design tokens
  ui/          @gykmi/ui — component library
apps/
  docs/        Storybook documentation
  dashboard/   Financial dashboard (consuming app)
```
