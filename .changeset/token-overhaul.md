---
"@gykmi/ui": minor
"@gykmi/dashboard": minor
---

Semantic token overhaul — new theme layer from Tailwind palette.

Replace entire token system with semantic-only colours referencing Tailwind's built-in palette. Theme layer uses color-mix() for opacity variants. Semantic layer maps to surface-*, text-*, border-*, fill-*, icon-* categories with light/dark mode switching via [data-theme="dark"].

New font families: Source Sans Pro (sans), Source Serif Pro (serif), Source Code Pro (mono).

Badge: icon prop with variant-specific icon-* token colours, brand/info variants, size prop (default/sm).
Avatar: size prop (sm/md/lg), AvatarIcon variant.
Button: icon/icon-sm sizes, [&>svg] auto-sizing, active:bg-fill-press.
Card: sunken variant, grid CardHeader.
Toast: simplified to single default style.

All 42 component files migrated to new token classes. Hover/active states use fill-hover/fill-press tokens. Heatmap labels truncate with tooltips. ScrollArea thumb uses border-strong.
