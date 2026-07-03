---
"@gykmi/ui": minor
"@gykmi/dashboard": minor
---

Dashboard as a product: two-page fintech risk dashboard with morning review and counterparties views.

New components: Alert, Breadcrumb, Text (10-variant type scale), MetricCard, ThemeToggle (localStorage persistence).

Refactored: Badge (label + count props), Card (CardAction), AnalysisSection (Card composition), ComplianceBanner (action prop), AuditTrail (horizontal timeline with avatar nodes), DataProvenance (interactive items with stale badges), ConfidenceIndicator (label prop), ScrollArea (viewportClassName), RegulatoryNotice (simplified).

Mobile responsive: tables swap to cards, stacked CTAs, vertical audit timeline.

Fixed: Sidebar/Sheet bg-surface token class (L006), CardContent last:pb-6.

Added shadcn/tailwind.css for scroll-fade utilities. Figma components synced.
