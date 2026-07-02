# @gykmi/ui

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
