# Contributing to @gykmi

## Prerequisites

- Node 22 LTS (pinned via `.nvmrc` — run `nvm use`)
- pnpm (install via `npm install -g pnpm`)

## Setup

```bash
git clone https://github.com/georgeyiakoumi/gykmi-design-system.git
cd gykmi-design-system
nvm use
pnpm install
```

## Development

```bash
pnpm run build          # Build all packages
pnpm run lint           # Lint (Biome)
pnpm run typecheck      # TypeScript strict
pnpm run test           # Run all tests (Vitest)
pnpm run format         # Format all files (Biome)
```

### Storybook

```bash
pnpm --filter @gykmi/docs storybook
```

### Dashboard (consuming app)

```bash
pnpm --filter @gykmi/dashboard dev
```

## Adding a component

Every component follows the same pattern. Use Button as the reference implementation.

### Checklist

1. **Component file** — `packages/ui/src/components/[name].tsx`
   - `"use client"` directive
   - Radix primitive where one exists
   - `forwardRef` with `displayName`
   - Typed props extending `ComponentPropsWithRef`
   - Tailwind classes via `cn()` — never exposed in the public API
   - Token-backed colours (use semantic tokens, not primitives)

2. **Test file** — `packages/ui/src/components/[name].test.tsx`
   - Basic render test
   - Interaction/behaviour test
   - `vitest-axe` a11y test (zero violations)

3. **Story** — `apps/docs/stories/[Name].stories.tsx`
   - `tags: ["autodocs"]`
   - Controls for all props
   - Representative usage examples

4. **Export** — add to `packages/ui/src/index.ts`

5. **Verify** — `pnpm turbo run lint typecheck build test` must pass

## Making changes

### Versioning

We use [Changesets](https://github.com/changesets/changesets) for versioning.

- **patch** — bug fixes, documentation
- **minor** — new components, new features, non-breaking additions
- **major** — breaking changes (renamed props, removed components, changed behaviour)

### Breaking changes

Every breaking change must include:

1. A changeset with `major` bump and clear description
2. An entry in `MIGRATION.md` with:
   - What changed
   - Who is affected
   - Before/after code example
   - Why the change was made
3. The consuming dashboard migrated and passing

### Commit messages

```
geo-[N]: [Short description]
```

Where `[N]` is the Linear issue number.

## Code style

- **Biome** for lint + format (tabs, double quotes, semicolons)
- **British spelling** in prose and docs
- **No comments** unless the logic isn't self-evident
- Format on save (see README for VS Code setup)

## Deprecation policy

When deprecating a component or prop:

1. Add a `@deprecated` JSDoc tag with the migration path
2. Log a console warning in development
3. Document in a changeset (minor bump — deprecation is not a breaking change)
4. Remove in the next major version, with a `MIGRATION.md` entry

Minimum deprecation window: one minor release before removal.
