# Decisions Log

Decisions made during development, logged as they happen.

---

## M0: Repo and rails

### D001 — npm scope: @gykmi
**Date:** 01/07/2026
**Decision:** Use `@gykmi` as the npm package scope.
**Why:** Matches the repo name and is short enough for imports.
**What I almost did instead:** `@gy` (shorter but less identifiable).

### D002 — Node 22 LTS, pinned via .nvmrc
**Date:** 01/07/2026
**Decision:** Pin Node 22 (current LTS) via `.nvmrc`. Global default remains on the user's preferred version.
**Why:** Handover spec requires current LTS. Auto-switching via zsh hook keeps it frictionless.
**What I almost did instead:** Using Node 24 (already installed) — but 24 is not LTS and could introduce compatibility issues with CI and downstream consumers.

### D003 — Biome v2.5 (not v1.x)
**Date:** 01/07/2026
**Decision:** Use Biome v2.5 (latest). Config uses the v2.5 schema with `preset: "recommended"` instead of v1's `rules.recommended`.
**Why:** pnpm resolved to 2.5; staying current avoids an immediate migration later.
**What I almost did instead:** Pinning to v1.x for stability — unnecessary since this is a greenfield project.

### D004 — Tabs for indentation (Biome default)
**Date:** 01/07/2026
**Decision:** Use tabs for indentation across the project (Biome's default).
**Why:** Accessible (users can set their own tab width), and Biome's default avoids fighting the formatter.
**What I almost did instead:** 2-space indentation (common in JS/TS). Tabs are a better accessibility default.
