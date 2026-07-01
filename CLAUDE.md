# CLAUDE.md

## What this is
A distributable, versioned design system. Tokens are the single source of truth.
Built on headless primitives (Radix, from M2), documented in Storybook, published
as npm packages, consumed by a real app to prove distribution.

## Stack (locked)
- Turborepo + pnpm workspaces
- TypeScript, strict
- Biome (lint + format)
- Vitest (unit/interaction)
- Style Dictionary, DTCG-format tokens
- Changesets (versioning + changelog)
- GitHub Actions (CI)
- Radix for component primitives (from M2)
- Tailwind v4 for styling, tokens-first (from M2). Tokens owned via Style Dictionary/DTCG to CSS vars; Tailwind @theme consumes them. Components expose a typed API; Tailwind classes internal. Ship compiled CSS + a Tailwind preset.

## Conventions
- Semantic tokens reference primitives, never raw values.
- Every component (from M2) needs: full state matrix, a11y, a Storybook story, tests.
- Done criteria are mechanical. Meet them literally.
- British spelling in prose and docs.

## Working agreement
- Decisions before code. Ask before assuming.
- Never fabricate values, palettes, or config not provided. Label placeholders.
- Log decisions in DECISIONS.md as they're made.
- One ticket per commit.

## Current milestone
Handover 01: M0 (repo and rails) + M1 (token foundation). No components yet.
