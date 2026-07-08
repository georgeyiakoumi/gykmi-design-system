# @gykmi design system

A distributable, versioned design system built on headless primitives (Radix), with a semantic colour theme on top of Tailwind's palette. Documented in Storybook, consumed by a real fintech dashboard.

**[Live dashboard](https://gykmi-ds-dashboard.netlify.app/)** · **[Storybook](https://gykmi-ds-storybook.netlify.app/)** · **[Figma library](https://www.figma.com/design/tqcsSSGM38hdEU4Yaqsmdn/GYKMI-Design-System?m=auto&t=QwRLX6wp6lOYkpTM-1)** · **[Figma demo](https://www.figma.com/design/nbXOqeECZDkNB8MgkZURSK/Demo?m=auto&t=QwRLX6wp6lOYkpTM-1)**

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
pnpm --filter @gykmi/dashboard dev:fresh
```

### E2E tests

```bash
cd apps/dashboard && npx playwright test
```

## Packages

| Package | Description | Version |
|---|---|---|
| `@gykmi/tokens` | Semantic colour tokens (CSS vars) | v1.0.0 |
| `@gykmi/ui` | Component library (40+ components) | v1.4.0 |
| `@gykmi/docs` | Storybook documentation | — |
| `@gykmi/dashboard` | Fintech risk dashboard (consuming app) | — |

## Components

**Layout:** Separator, Sidebar, Sheet, Skeleton
**Typography:** Text (10-variant type scale)
**Display:** Accordion, Avatar, Badge, Breadcrumb, Card, Carousel, Collapsible, Progress, ScrollArea
**Form:** Button, Checkbox, Input, Label, RadioCards, RadioGroup, Select, Slider, Switch, Toggle, ToggleGroup
**Overlay/Menu:** Alert, AlertDialog, Dialog, DropdownMenu, Popover, Tabs, Toast, Toaster, Tooltip
**Dashboard:** AnalysisSection, AuditTrail, ConfidenceIndicator, DataProvenance, DataTable, MetricCard
**DataViz:** BarChart, BulletChart, CandlestickChart, ConfidenceChart, DonutChart, GaugeChart, HeatmapChart, LineChart, RadarChart, ScatterChart, Sparkline, StackedBarChart, TreemapChart, WaterfallChart
**Utilities:** ThemeToggle

## Architecture

```
Tailwind palette → theme.css (semantic vars) → @theme inline → Components
                                    ↓
                         Figma variables (synced)
```

- **Tokens:** Semantic colour CSS vars referencing Tailwind's built-in palette with `color-mix()` for opacity variants. Light/dark mode via `[data-theme]`.
- **Fonts:** Source Sans Pro (sans), Source Serif Pro (serif), Source Code Pro (mono)
- **Styling:** Tailwind v4 with `@theme inline`, semantic tokens as the colour layer
- **Components:** Radix primitives, typed props API, Tailwind classes internal
- **Distribution:** compiled CSS (`@gykmi/ui/css`) + Tailwind theme (`@gykmi/ui/theme`)
- **Figma:** semantic + theme variable collections with light/dark modes, component library
- **Testing:** 229 unit tests (Vitest + axe)
- **CI:** lint, typecheck, build, test, changeset enforcement, migration gate
- **Deploy:** Netlify (dashboard + Storybook), build ignore for unchanged packages
- **Release:** automated via Changesets — Version Packages PR on merge, publish on approval

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

See [CONTRIBUTING.md](CONTRIBUTING.md) and [CHANGE_PROCESS.md](CHANGE_PROCESS.md) for the full component change lifecycle and pre-merge checklist.

## Structure

```
packages/
  tokens/      @gykmi/tokens — semantic colour tokens
  ui/          @gykmi/ui — component library
apps/
  docs/        Storybook documentation
  dashboard/   Fintech risk dashboard (consuming app)
```
