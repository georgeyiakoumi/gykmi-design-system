## Summary

<!-- What changed and why. Link the Linear issue. -->

Closes GEO-

## Pre-merge checklist

<!-- Check all that apply. Delete lines that don't. -->

- [ ] Change classified: patch / minor / major
- [ ] Typed API, tokens only (no hard-coded values)
- [ ] Full state matrix covered
- [ ] Accessibility: axe passes, keyboard and focus verified
- [ ] Storybook story updated (all variants and states)
- [ ] Tests updated and green (Vitest + axe)
- [ ] Changeset added with the correct bump level
- [ ] `MIGRATION.md` updated (majors only)
- [ ] Figma re-synced and Code Connect current (visual or structural changes)
- [ ] CI green: lint, typecheck, test, build

## Verification

```bash
pnpm turbo run lint typecheck build test
```
