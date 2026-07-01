# CLAUDE.md

## What this is
A distributable, versioned design system. Tokens are the single source of truth.
Built on headless primitives (Radix, from M2), documented in Storybook, published
as npm packages, consumed by a real app to prove distribution.

## Stack (locked — do not substitute without asking George)
- Turborepo + pnpm workspaces
- TypeScript, strict
- Biome (lint + format)
- Vitest (unit/interaction)
- Style Dictionary, DTCG-format tokens
- Changesets (versioning + changelog)
- GitHub Actions (CI)
- Radix for component primitives (from M2)
- Tailwind v4 for styling, tokens-first (from M2). Tokens owned via Style Dictionary/DTCG to CSS vars; Tailwind @theme consumes them. Components expose a typed API; Tailwind classes internal. Ship compiled CSS + a Tailwind preset.
- npm scope: `@gykmi/*`
- Node 22 LTS (pinned via `.nvmrc`)

## Conventions
- Semantic tokens reference primitives, never raw values.
- Every component (from M2) needs: full state matrix, a11y, a Storybook story, tests.
- Done criteria are mechanical. Meet them literally.
- British spelling in prose and docs.
- Token values are PLACEHOLDERS until George supplies real palette from Figma.

## Git workflow — non-negotiable

### One issue = one branch = one PR

Every Linear issue is worked on its own branch. No bundling multiple issues unless George explicitly says otherwise.

### The cycle (follow this exactly)

1. `git checkout main && git pull` — always start from fresh main
2. Copy the branch name from the Linear issue
3. `git checkout -b [branch-name]`
4. Do the work for that one issue only
5. Commit with message: `geo-[N]: [Short description]`
6. `git push -u origin [branch-name]`
7. `gh pr create` with description, Linear ticket link, verification steps
8. Wait for George to merge — Linear auto-syncs status from the PR
9. After merge: `git checkout main && git pull && git push origin --delete [branch-name]`
10. Move to the next issue — back to step 1

### Never work on main
No commits, no edits, no exceptions.

### Never commit or push without George's approval
When work is ready, say: "Ready for your review — let me know when you've tested and I'll commit and push."
Wait for explicit go-ahead.

### PR requirements
Before raising a PR:
- `pnpm run lint` must pass
- `pnpm run typecheck` must pass
- `pnpm run test` must pass
- `pnpm run build` must pass

## Release workflow

### Changesets + GitHub Releases
- Changesets handles version bumping and changelog generation
- Every version gets a GitHub Release with the pre-release toggle ON (until v1.0.0)
- Tag format: `v0.1.0`, `v0.2.0`, etc.
- Release description pulls from the generated CHANGELOG
- Pre-release versions use: `v0.1.0-alpha.0`, `v0.1.0-beta.1`, etc. when appropriate
- npm publishing is dry-run only until George decides to publish for real

## Tracking

### Linear
- Project: GYKMI Design System
- Team: georgeyiakoumi (key: GEO)
- Every piece of work has a Linear issue before a branch is created
- Log material decisions as comments on the relevant Linear issue
- Update issue status as work progresses (Linear auto-syncs from PRs)

### Notion
- Master plan: "GYKMI Design System — Master Plan"
- Decisions Log: child page under master plan (4-field format)
- Lessons & Insights: child page under master plan
- Update Notion when scope changes or milestones complete

### DECISIONS.md
- Local decisions log in the repo, updated as decisions are made
- Format: date (DD/MM/YYYY), decision, why, what I almost did instead

## Milestones

| # | Name | Status |
|---|---|---|
| M0 | Repo and rails | Done |
| M1 | Token foundation | In progress |
| M2 | Vertical slice (Button) | Not started |
| M3 | Breadth (core components) | Not started |
| M4 | POV layer | Not started |
| M5 | Dogfood (consuming app) | Not started |
| M6 | Governance, docs, polish | Not started |

## After /compact — re-read this file
If the conversation has been compacted, re-read this entire file before continuing.
Check the current Linear issue and confirm which branch you should be on.

## Working agreement
- Decisions before code. Ask before assuming.
- Never fabricate values, palettes, or config not provided. Label placeholders.
- Log decisions in DECISIONS.md as they're made.
- One ticket per commit. One issue per branch per PR.
- Don't trust automated codegen blindly — verify output before committing.
