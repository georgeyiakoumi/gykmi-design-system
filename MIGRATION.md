# Migration Guide

## v1.0.0 (from v0.x)

### Button: `variant="primary"` renamed to `variant="default"`

**What changed:** The `primary` variant has been renamed to `default` to align with the naming convention used across other components (Badge, Toast, etc.).

**Who is affected:** Any consumer that explicitly passes `variant="primary"` to the Button component.

**Migration:**

```diff
- <Button variant="primary">Submit</Button>
+ <Button variant="default">Submit</Button>
```

**Not affected:** Buttons without an explicit `variant` prop. The default behaviour is unchanged — `<Button>Submit</Button>` still renders the same way.

**Why:** Consistency across the component API. `default` is the standard name for the primary/standard variant in Badge, Toast, and other components. Having Button use `primary` while everything else uses `default` was a naming inconsistency.
