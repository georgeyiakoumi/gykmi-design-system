# Figma component guide

Rules for creating and updating components in the GYKMI Design System Figma file via MCP. Code leads, Figma mirrors — every component here is derived from the TypeScript source.

## File reference

- **File key:** `tqcsSSGM38hdEU4Yaqsmdn`
- **Pages:** Components (primitives + layout), POV Components (fintech/AI), Preview

---

## Before you build: audit the code

Before creating or updating any Figma component, read the TypeScript source and extract:

1. **All subcomponents** — e.g. `Card` has `CardHeader`, `CardTitle`, `CardAction`, `CardContent`, `CardFooter`
2. **All Radix imports** — e.g. `Dialog` imports from `@radix-ui/react-dialog`
3. **Props and variants** — every prop that affects visual output
4. **State matrix** — hover, active, disabled, focus states from the code
5. **Composition** — what primitives does this component use? (e.g. `ComplianceBanner` composes `Alert` + `Button`)

Do not skip this step. Do not guess the structure from memory.

---

## Atomic composition

**Build bottom-up, compose from existing components.**

1. Create subcomponents first (e.g. `BadgeCount` before `Badge`)
2. If the component uses another component (e.g. a `Button`), use an **instance** of the existing Figma `Button` component — do not recreate it as a frame
3. If the component imports a Radix primitive, check if a Figma component already exists for that pattern and use it
4. The main component is assembled from instances of its subcomponents

### Example: AlertDialog

```
AlertDialog
├── AlertDialogHeader (instance)
│   ├── AlertDialogTitle (text)
│   └── AlertDialogDescription (text)
├── AlertDialogFooter (instance)
│   ├── Button/secondary (instance of Button component)
│   └── Button/danger (instance of Button component)
```

The buttons are **instances** of the `Button` component, not frames styled to look like buttons.

### Slot containers

During the audit, identify which subcomponents are **containers** — designed to wrap arbitrary children. These need a Figma **Slot** element inside them so designers know content goes there.

Look for subcomponents that:
- Accept `children` as their primary content (e.g. `CardContent`, `DialogContent`, `AccordionContent`)
- Wrap specific known children (e.g. `CardHeader` wraps `CardTitle` + `CardDescription` + `CardAction`)
- Act as layout wrappers with `{...props}` spread and no fixed content

| Subcomponent | Slot type | What goes inside |
|---|---|---|
| `CardContent` | Open slot | Any content |
| `CardHeader` | Structured slot | `CardTitle`, `CardDescription`, `CardAction` |
| `CardFooter` | Open slot | Actions, metadata |
| `DialogContent` | Open slot | Form fields, text, any content |
| `AccordionContent` | Open slot | Any content |
| `AlertDescription` | Open slot | Description text, links |

In Figma, use the native **Slot** element inside these containers — not a regular frame. Slots allow designers to nest any content into the component instance. Refer to the Figma Plugin API for the correct method to create a Slot element.

---

## Conditional styles

Some components have CSS classes that apply conditionally based on the presence or absence of sibling elements. These don't have a direct Figma equivalent — handle them as **component variants** or **boolean properties**.

### Common patterns

| Code pattern | Meaning | Figma solution |
|---|---|---|
| `last:pb-6` | "If I'm the last child (no Footer after me), add bottom padding" | Two variants: `Footer=true` and `Footer=false`, where the `Footer=false` variant has extra bottom padding on CardContent |
| `has-data-[slot=badge-count]:pr-1` | "If BadgeCount is present, reduce right padding" | Two variants: `Count=true` and `Count=false` with different padding |
| `group-hover/item:opacity-100` | "Show on parent hover" | State variant on the parent: `State=default` (hidden) and `State=hover` (visible) |
| `lg:hidden` / `lg:block` | Responsive breakpoint | Separate component variants for mobile and desktop, or document in description |

### How to audit for these

When reading the TypeScript source, look for:
- Tailwind modifiers: `last:`, `first:`, `has-*:`, `group-*:`, `peer-*:`
- Conditional className logic: `cn(base, condition && "extra-class")`
- Conditional rendering: `{footer && <CardFooter>}`

Each conditional visual change should map to either a Figma variant property or be documented in the component description if it can't be represented visually.

---

## Variables only — no custom values

Every visual property must be bound to a Figma variable. Never use raw hex colours, hardcoded spacing, or literal font sizes.

### Colour variables (Semantic collection)

| Token | Use |
|---|---|
| `surface/default` | Page backgrounds |
| `surface/raised` | Card backgrounds, elevated surfaces |
| `surface/overlay` | Modal/overlay backgrounds |
| `text/default` | Primary text |
| `text/muted` | Secondary/helper text |
| `text/inverse` | Text on coloured backgrounds |
| `border/default` | Borders, dividers |
| `border/strong` | Emphasised borders |
| `action/default` | Primary action fills |
| `action/text` | Text on action backgrounds |
| `danger/default`, `danger/subtle`, `danger/text` | Error/danger states |
| `success/default`, `success/subtle`, `success/text` | Success states |
| `warning/default`, `warning/subtle`, `warning/text` | Warning states |

### Spacing variables (Primitives collection)

Use `spacing/*` variables for all padding, gap, and size values:

`spacing/0` (0) · `spacing/½` (2) · `spacing/1` (4) · `spacing/1½` (6) · `spacing/2` (8) · `spacing/2½` (10) · `spacing/3` (12) · `spacing/4` (16) · `spacing/5` (20) · `spacing/6` (24) · `spacing/8` (32) · `spacing/10` (40) · `spacing/12` (48)

### Radius variables

`radius/none` (0) · `radius/sm` (4) · `radius/md` (8) · `radius/lg` (12) · `radius/xl` (16) · `radius/full` (9999)

### Typography variables

- Font sizes: `fontSize/xs` through `fontSize/4xl`
- Line heights: `lineHeight/{size}-{tightness}` (e.g. `lineHeight/sm-tight`, `lineHeight/2xl-normal`)
- Font weights: `fontWeight/normal` (400) · `fontWeight/medium` (500) · `fontWeight/semibold` (600) · `fontWeight/bold` (700)
- Letter spacing: `letterSpacing/normal` · `letterSpacing/tight` · `letterSpacing/wide` · `letterSpacing/wider` · `letterSpacing/widest`

### Binding colours

Always use `setBoundVariableForPaint` — never set fills/strokes with raw `{r, g, b}` values:

```js
const fill = figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: {r:0, g:0, b:0} },
  "color",
  variable
);
node.fills = [fill];
```

### Binding spacing/radius

Use `setBoundVariable` on the node:

```js
node.setBoundVariable("itemSpacing", spacingVar);
node.setBoundVariable("paddingTop", spacingVar);
node.setBoundVariable("topLeftRadius", radiusVar);
```

---

## Component set layout

Every component set (variant group) must use:

- **Layout:** auto-layout, vertical (`VERTICAL`)
- **Sizing:** hug content on both axes (`primaryAxisSizingMode: "AUTO"`, `counterAxisSizingMode: "AUTO"`)
- **Padding:** bound to `spacing/8` (32px) on all sides
- **Item spacing:** bound to `spacing/8` (32px)

```js
const componentSet = figma.combineAsVariants(components, page);
componentSet.layoutMode = "VERTICAL";
componentSet.primaryAxisSizingMode = "AUTO";
componentSet.counterAxisSizingMode = "AUTO";
componentSet.setBoundVariable("paddingTop", spacing8);
componentSet.setBoundVariable("paddingBottom", spacing8);
componentSet.setBoundVariable("paddingLeft", spacing8);
componentSet.setBoundVariable("paddingRight", spacing8);
componentSet.setBoundVariable("itemSpacing", spacing8);
```

---

## State matrix

Every interactive component must include all visual states as variants:

| State | When |
|---|---|
| `default` | Resting state |
| `hover` | Mouse over |
| `active` | Mouse down / pressed |
| `disabled` | Non-interactive |
| `focus` | Keyboard focus (show focus ring) |

For components with multiple visual variants (e.g. Button has `default`, `secondary`, `danger`, `ghost`), the state matrix applies to each variant.

Variant naming convention: `Variant=default, Size=md, State=hover`

---

## Card chrome convention

All card titles in the dashboard use the same style:

- Font: Inter Medium
- Size: bound to `fontSize/xs`
- Case: `UPPER` (via `textCase`)
- Letter spacing: bound to `letterSpacing/wider`
- Colour: bound to `text/muted`

```js
titleText.fontName = { family: "Inter", style: "Medium" };
titleText.setBoundVariable("fontSize", getFloat("fontSize/xs"));
titleText.textCase = "UPPER";
titleText.setBoundVariable("letterSpacing", getFloat("letterSpacing/wider"));
const mutedFill = figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: {r:0,g:0,b:0} },
  "color",
  textMuted
);
titleText.fills = [mutedFill];
```

---

## Component descriptions

Every component must have a description with:

1. What it does (one line)
2. Link to the live Storybook page

Format:

```
Status badge with label and optional count.

📖 https://gykmi-ds-storybook.netlify.app/?path=/docs/badge--docs
```

The Storybook URL pattern is `https://gykmi-ds-storybook.netlify.app/?path=/docs/{story-name}--docs` where `{story-name}` is the lowercase story filename without the `.stories.tsx` extension.

---

## Page placement

| Component type | Page | Position |
|---|---|---|
| Primitives (Button, Card, Input, etc.) | Components | Find rightmost node, place 100px to the right |
| POV components (AnalysisSection, MetricCard, etc.) | POV Components | Find rightmost node, place 100px to the right |

Always scan existing nodes to avoid overlapping:

```js
let maxX = 0;
for (const child of page.children) {
  const right = child.x + child.width;
  if (right > maxX) maxX = right;
}
const newX = maxX + 100;
```

---

## Figma variable naming

- Use unicode fractions in Figma: `spacing/½`, `spacing/1½` — never change the Figma names
- Code token names and Figma variable names may differ slightly — that's fine, the mapping is in the Tailwind `@theme inline` block
- Tailwind class ≠ token name ≠ Figma variable name (see L006)

---

## Font loading

Always load fonts before creating or editing text nodes:

```js
await figma.loadFontAsync({ family: "Inter", style: "Regular" });
await figma.loadFontAsync({ family: "Inter", style: "Medium" });
await figma.loadFontAsync({ family: "Inter", style: "Semi Bold" });
await figma.loadFontAsync({ family: "Inter", style: "Bold" });
```

Note: Inter's style is `"Semi Bold"` (with space), not `"SemiBold"`.

---

## Checklist before pushing a component

- [ ] Read the TypeScript source first
- [ ] Subcomponents created as separate Figma components
- [ ] Existing Figma components used as instances (not recreated as frames)
- [ ] All colours bound to semantic variables
- [ ] All spacing/padding/gap bound to spacing variables
- [ ] All radii bound to radius variables
- [ ] All font sizes bound to fontSize variables
- [ ] Component set uses vertical auto-layout with spacing/8 padding and gap
- [ ] All visual states included as variants
- [ ] Component description includes import + usage example
- [ ] Placed on the correct page (Components or POV Components)
- [ ] Screenshot taken to verify
