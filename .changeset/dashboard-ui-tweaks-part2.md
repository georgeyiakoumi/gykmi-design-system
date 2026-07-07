---
"@gykmi/ui": minor
"@gykmi/dashboard": minor
---

Dashboard + component UI tweaks (part 2).

New components: Carousel, CarouselItem, RadioCards, RadioCardsItem, SheetFooter, AddSourceDialog, Toaster, useToast.

Chrome treatment: gradient cards (surface-raised-from/to tokens), gradient buttons (action, secondary, danger), bevelled card borders (border-raised-from/to tokens), inner shadow on action button.

Button: iconLeft/iconRight props with size-aware slots. All dashboard buttons have contextual Lucide icons.

Sheet: SheetContent is flex-col by default, SheetFooter (mt-auto) pins actions to bottom.

Removed unused components: AspectRatio, Box, ContextMenu, HoverCard, Menubar, NavigationMenu, Toolbar, VisuallyHidden, ComplianceBanner, Disclaimer, ModelError, RegulatoryNotice, StreamingText.

Renamed pov/ to dashboard/ folder.

Storybook: removed 7 obsolete stories, added 8 new (Alert, Breadcrumb, Carousel, MetricCard, RadioCards, Sheet, Skeleton, Text).

Mobile: Carousel component with snap, scroll-fade, scroll-padding. DataSourceCard restructured with stacked actions.

Fixes: Toast subtle backgrounds, Sheet border-border dark mode, Input bg-transparent, AlertDialog button styling, PageHeader z-20, bar chart label truncation.
