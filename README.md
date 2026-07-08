# @gykmi design system

A distributable, versioned design system built on headless primitives (Radix), with design tokens as the single source of truth. Fintech/AI POV. Documented in Storybook, consumed by a real app.

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
pnpm --filter @gykmi/dashboard dev
```

### E2E tests

```bash
cd apps/dashboard && npx playwright test
```

## Packages

| Package | Description | Version |
|---|---|---|
| `@gykmi/tokens` | Design tokens (CSS vars + TS types) | v1.0.0 |
| `@gykmi/ui` | Component library (50+ components) | v1.3.0 |
| `@gykmi/docs` | Storybook documentation | — |
| `@gykmi/dashboard` | Financial dashboard (consuming app) | — |

## Components

**Layout:** Box, Separator, Sidebar, Sheet, Skeleton
**Typography:** Text (10-variant type scale)
**Display:** Accordion, AspectRatio, Avatar, Badge, Breadcrumb, Card, Collapsible, Progress, ScrollArea, VisuallyHidden
**Form:** Button, Checkbox, Input, Label, RadioGroup, Select, Slider, Switch, Toggle, ToggleGroup
**Overlay/Menu:** Alert, AlertDialog, ContextMenu, Dialog, DropdownMenu, HoverCard, Menubar, NavigationMenu, Popover, Tabs, Toast, Toolbar, Tooltip
**POV (Fintech/AI):** AnalysisSection, AuditTrail, ComplianceBanner, ConfidenceIndicator, DataProvenance, DataTable, Disclaimer, MetricCard, ModelError, RegulatoryNotice, StreamingText
**DataViz:** BarChart, BulletChart, CandlestickChart, ConfidenceChart, DonutChart, GaugeChart, HeatmapChart, LineChart, RadarChart, ScatterChart, Sparkline, StackedBarChart, TreemapChart, WaterfallChart
**Utilities:** ThemeToggle

## Architecture

```
DTCG JSON → Style Dictionary → CSS custom properties → Tailwind @theme → Components
                                       ↓
                              Figma variables (synced)
```

- **Tokens:** DTCG-format JSON, built by Style Dictionary into CSS vars + TS types. Code is the source of truth.
- **Styling:** Tailwind v4 with `@theme inline`, tokens as source of truth
- **Components:** Radix primitives, typed props API, Tailwind classes internal
- **Distribution:** compiled CSS (`@gykmi/ui/css`) + Tailwind theme (`@gykmi/ui/theme`)
- **Figma:** tokens synced as variables (Primitives + Semantic with light/dark modes), 25 components mirrored as a published library, 15 text styles with variable bindings
- **Testing:** 142 unit tests (Vitest + axe) + 8 E2E tests (Playwright)
- **CI:** lint, typecheck, build, test, changeset enforcement, migration gate
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
  tokens/      @gykmi/tokens — design tokens
  ui/          @gykmi/ui — component library
apps/
  docs/        Storybook documentation
  dashboard/   Financial dashboard (consuming app)
```
