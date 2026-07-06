# @gykmi/ui

## 1.3.0

### Minor Changes

- [#33](https://github.com/georgeyiakoumi/gykmi-design-system/pull/33) [`ac6d593`](https://github.com/georgeyiakoumi/gykmi-design-system/commit/ac6d5932377e147d31f2cdcd3407d5942f0f1a3d) Thanks [@georgeyiakoumi](https://github.com/georgeyiakoumi)! - Dashboard interactions: wire 14 previously unused components into the dashboard with real purpose.

  New components: RadioCards (card-style radio selection), Toaster + useToast hook.

  AlertDialog, Dialog, Toast, Sheet, Slider, Accordion, RadioGroup, Checkbox, Switch, Input, Label, Separator, Tabs — all integrated with genuine use cases across morning review, counterparties, settings, and export flows.

  Mobile: carousel layouts with snap + scroll-fade for flagged items, counterparties, and data sources. Horizontal scrollable audit timeline.

  Fixes: Toast variant colours (subtle backgrounds), Sheet border-border in dark mode, Input bg-transparent, AlertDialog Cancel/Action button styling, PageHeader z-index above DataTable, bar chart label auto-truncation.

## 1.2.1

### Patch Changes

- [#27](https://github.com/georgeyiakoumi/gykmi-design-system/pull/27) [`5911a24`](https://github.com/georgeyiakoumi/gykmi-design-system/commit/5911a24ad2619321541c481d7ec7caf340095125) Thanks [@georgeyiakoumi](https://github.com/georgeyiakoumi)! - Netlify deploy: dashboard and Storybook live on Netlify from committed config.

  Static export for Next.js dashboard, Turbo-scoped builds, Node 22 pinned.
  Demo-data disclaimer footer. Biome excludes build output.

## 1.2.0

### Minor Changes

- [#22](https://github.com/georgeyiakoumi/gykmi-design-system/pull/22) [`c3767ec`](https://github.com/georgeyiakoumi/gykmi-design-system/commit/c3767ec7a25c4dd390255e596506a57e5f0c0b64) Thanks [@georgeyiakoumi](https://github.com/georgeyiakoumi)! - Dashboard as a product: two-page fintech risk dashboard with morning review and counterparties views.

  New components: Alert, Breadcrumb, Text (10-variant type scale), MetricCard, ThemeToggle (localStorage persistence).

  Refactored: Badge (label + count props), Card (CardAction), AnalysisSection (Card composition), ComplianceBanner (action prop), AuditTrail (horizontal timeline with avatar nodes), DataProvenance (interactive items with stale badges), ConfidenceIndicator (label prop), ScrollArea (viewportClassName), RegulatoryNotice (simplified).

  Mobile responsive: tables swap to cards, stacked CTAs, vertical audit timeline.

  Fixed: Sidebar/Sheet bg-surface token class (L006), CardContent last:pb-6.

  Added shadcn/tailwind.css for scroll-fade utilities. Figma components synced.

## 1.1.0

### Minor Changes

- [#19](https://github.com/georgeyiakoumi/gykmi-design-system/pull/19) [`75e5b0f`](https://github.com/georgeyiakoumi/gykmi-design-system/commit/75e5b0f159a4196e67365c53ec97648baee79ce2) Thanks [@georgeyiakoumi](https://github.com/georgeyiakoumi)! - Add DataViz layer: 14 visx chart components (LineChart, BarChart, Sparkline, DonutChart, StackedBarChart, ScatterChart, CandlestickChart, WaterfallChart, BulletChart, GaugeChart, HeatmapChart, TreemapChart, RadarChart, ConfidenceChart) with tooltips, keyboard a11y, and accessible data table fallbacks.

## 1.0.1

### Patch Changes

- Governance and documentation: getting-started guide, design principles, token architecture docs, contribution guide, deprecation policy, visual regression CI pipeline.

## 1.0.0

### Major Changes

- BREAKING: Button `variant="primary"` renamed to `variant="default"`. The default variant (when no `variant` prop is passed) is now `"default"` instead of `"primary"`. This aligns with the convention used by Badge and other components.

  Migration: find and replace `variant="primary"` with `variant="default"` in your codebase. Buttons without an explicit `variant` prop are unaffected — they already use the default.

## 0.3.0

### Minor Changes

- POV layer (fintech/AI): AI output states (StreamingText, ConfidenceIndicator, ModelError, AnalysisSection, Disclaimer), audit/disclosure patterns (AuditTrail, ComplianceBanner, DataProvenance, RegulatoryNotice), and a full-featured DataTable with sorting, pagination, column visibility, sticky headers, and empty/skeleton states.

## 0.2.0

### Minor Changes

- Full component set (33 components): Accordion, AlertDialog, AspectRatio, Avatar, Badge, Box, Card, Checkbox, Collapsible, ContextMenu, Dialog, DropdownMenu, HoverCard, Input, Label, Menubar, NavigationMenu, Popover, Progress, RadioGroup, ScrollArea, Select, Separator, Slider, Stack, Switch, Tabs, Toast, Toggle, ToggleGroup, Toolbar, Tooltip, VisuallyHidden. All follow the Button pattern: Radix primitives, typed API, token-backed Tailwind styling, a11y owned, 112 tests.

## 0.1.0

### Minor Changes

- Button component: Radix-based with asChild polymorphism, typed variant/size API, full state matrix (hover, focus-visible, active, disabled, loading), token-backed Tailwind styling, a11y owned, dual distribution (compiled CSS + Tailwind theme preset).
