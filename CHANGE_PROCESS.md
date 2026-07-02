# Component change process

How a change to a `@gykmi/ui` component flows from idea to published, and the checklist every change clears before merge. Code is the source of truth; Figma mirrors it. Lives alongside `CONTRIBUTING.md` (fold in or link).

## 1. Propose

Raise an issue before writing code. State what's changing, why, and which kind of change it is:

- **New** component or pattern.
- **Change** to an existing component.
- **Deprecation / removal.**

For anything breaking or a new pattern, add a short rationale: the problem, the options considered, the call. Decisions before code.

## 2. Classify (this drives the release)

Decide the change level up front, because it sets the version bump and whether a migration note is needed:

- **Patch:** bug or visual fix, no API change.
- **Minor:** additive and backward compatible (new prop, new variant, new component).
- **Major:** breaking (removed or renamed prop, changed default, changed behaviour).

## 3. Build to the bar

Every component meets the same standard, no exceptions:

- Typed props API. Tokens only, never hard-coded values.
- Full state matrix (hover, focus-visible, active, disabled, loading, plus any component-specific states).
- Accessibility owned on top of Radix (labelling, focus management, reduced-motion, contrast).
- Storybook story updated: every variant and state visible.
- Tests updated: Vitest interaction plus axe.

## 4. Sync design (code leads)

If the change is visual or structural:

- Re-run the token sync if tokens changed.
- Re-push the component to Figma via Code to Canvas.
- Keep the Code Connect mapping current.

When Figma and code disagree, code wins.

## 5. Changeset

Add a changeset declaring the bump level from step 2 and a human-readable summary. This is the contract that generates the version and the changelog.

## 6. Migration note (majors only)

If breaking, add a `MIGRATION.md` entry: what changed, why, before and after, and a codemod if one applies.

## 7. Review, merge, release

- PR reviewed against the checklist below.
- CI green.
- Merge. Changesets versions and publishes; the changelog updates; consumers pick it up by semver.

---

## Pre-merge checklist

- [ ] Change classified: patch / minor / major
- [ ] Typed API, tokens only (no hard-coded values)
- [ ] Full state matrix covered
- [ ] Accessibility: axe passes, keyboard and focus verified
- [ ] Storybook story updated (all variants and states)
- [ ] Tests updated and green (Vitest + axe)
- [ ] Changeset added with the correct bump level
- [ ] `MIGRATION.md` updated (majors only)
- [ ] Figma re-synced and Code Connect current (visual or structural changes)
- [ ] CI green: lint, typecheck, test, build, publint, attw
