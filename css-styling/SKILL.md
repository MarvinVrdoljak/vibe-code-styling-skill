---
name: css-styling
description: >
  Style components inside an EXISTING Next.js project following the team's
  strict 3-layer CSS architecture: design tokens + base reset + CSS Modules,
  processed by PostCSS (postcss-pxtorem, custom-media, preset-env). Every
  component owns a co-located .module.css with short, semantic, local class
  names. Use this when writing or reviewing CSS, styling a component, adding
  design tokens, or handling responsive breakpoints. NO Tailwind. This skill
  does NOT cover project scaffolding, i18n, or TypeScript setup.
---

# CSS Styling — house architecture

This skill encodes **only the styling conventions** of the team's Next.js house
style. It assumes the project is already set up. Everything here applies
whenever you touch CSS or style a component.

---

## Golden rules (TL;DR)

- **CSS values come from tokens only** (`var(--…)`); write `px`, never
  hand-write `rem`; **no Tailwind**.
- **One semantic class per element**, short and local. No descendant selectors,
  no BEM, no global selectors inside modules.
- **Inherit, don't redeclare**: `font-size`, `font-weight`, `line-height` etc.
  come from the base layer — only write them in a module when the component
  genuinely deviates from the global style.
- Every styled component has a **co-located `.module.css`** whose filename
  mirrors the component (`CommonButton.tsx` → `CommonButton.module.css`).
- **Breakpoints via `@custom-media` tokens** (`--bp-*`), nested inside the
  selector, mobile-first.
- **`stylelint` is the source of truth** for the CSS rules — run it, don't
  fight it.

---

## CSS Architecture — 3 layers

> **PostCSS contract:** all CSS is processed through PostCSS. Write **`px`**
> everywhere — `postcss-pxtorem` converts to `rem` at build time. **Never write
> `rem` by hand**; it won't be converted and breaks the scaling contract.
> Values below 2px (hairline borders) intentionally stay px. **Never set
> `font-size` on `html`** — the root stays at the browser default so
> 1rem = 16px; fluid body text is set on `body` only. Browser targets
> come from `.browserslistrc` (Next.js defaults) — without it `postcss-preset-env`
> assumes old browsers and bloats the output with fallbacks.

The cascade is controlled with a single declared layer order at the top of
`globals.css`:

```css
@layer base, components, utilities;

@import './base/index.css';
@import './components/index.css';
```

### Layer 1 — Design tokens (`styles/base/tokens.css`)
Single source of truth for every visual value: colors, spacing, radii,
typography. Defined as CSS custom properties on `:root`.

- NEVER hardcode a color, spacing, or radius in component CSS
  (no `#3b82f6`, no raw `16px` for spacing, no `8px` for radius).
- ALWAYS reference via `var(--token-name)`.
- Missing a value? Add the token to `tokens.css` first, then use it.
- Fluid typography uses `clamp(min, preferred, max)` — never JS for font
  scaling. Responsive token jumps go in `@media (--bp-*)` blocks on `:root`.

### Layer 2 — Base / reset (`styles/base/base.css`)
Minimal reset + base element typography (body, headings, links, button reset),
all inside `@layer base`. NEVER override base element styles from a component
module — fix them here.

The base layer also provides a global `:focus-visible` outline for keyboard
users. NEVER write `outline: none` in a module unless you provide an equally
visible focus style in its place.

### Layer 3 — Components (CSS Modules)
Every component that has styles gets a co-located `.module.css`. Class names
are short, local, and semantic — **no BEM**, **no global selectors**, **no
descendant/child selectors** (`.root li`, `.root > a`), **no bare tag
selectors** (stylelint enforces all of these in `*.module.css`):

- Give every element its own class: `.root`, `.item`, `.link`, `.icon`, `.label`.
- JSX assigns each class explicitly:
  `<a className={styles.link}><Icon className={styles.icon} /></a>`.
- Inline `style={{}}` is allowed **only** for truly runtime-dynamic values
  (e.g. a computed width). Never for static design values.
- Module classes are **unlayered**, so they always win over everything in
  `@layer base/components/utilities`. That's what lets a module override a
  global atom or utility without specificity hacks.

### Inherit, don't redeclare
The base layer (`base.css` + tokens) already styles typography for body text,
headings, links, and buttons. **Before writing `font-size`, `font-weight`,
`line-height`, or `font-family` in a module, check whether the global base
style already produces the desired result** — most of the time it does, and
the declaration is pure noise.

- Only declare typography in a `.module.css` when the component **genuinely
  deviates** from the base style.
- If the same "deviation" keeps repeating across components, it's not a
  deviation — change `base.css` or the token instead.
- Redundant re-declarations are the main source of style bloat: they hide the
  real cascade and multiply future edits (change the `h2` size once in base vs.
  hunting it through N modules).

### Where does a layout class go?

| Type | Example | Where |
| --- | --- | --- |
| Structural app/page wrapper | `.layout`, `.grid` | `styles/base/utilities.css` → `@layer utilities` |
| Page/feature-specific layout | `.heroSection`, `.sidebarLayout` | the page's `page.module.css` |
| Component-internal layout | `.root`, `.wrapper`, `.header` | the component's `.module.css` |

Rule: appears in >1 place → `@layer utilities`. Used exactly once → that
page/component module. Global utilities and module classes combine freely in
JSX: `className={\`${styles.root} grid\`}`.

Keep global utilities **minimal** — only genuinely structural, app-wide
patterns (the centered `.grid` container, the `.layout` shell). Resist adding
generic helpers like `.stack` / `.row`: they describe *how* not *what*, which
fights the "semantic class per element" rule and drifts toward mini-Tailwind. A
two-line `display: flex; gap: …` is clearer written directly in the component's
`.root`. Let utilities grow organically: promote a pattern only once it's
actually repeated.

### Breakpoints — `styles/base/media.css`
CSS Level 5 `@custom-media`, made available to all files via
`@csstools/postcss-global-data`.

- NEVER hardcode a breakpoint (`@media (max-width: 768px)`).
- ALWAYS use tokens: `@media (--bp-medium-up) { … }`.
- Mobile-first: default = mobile, `*-up` tokens enhance upward.
- ALWAYS nest media queries **inside** the selector, not as separate blocks.

```css
.nav {
  display: none;
  @media (--bp-medium-up) {
    display: flex;
  }
}
```

### How CSS reaches a component
- `globals.css` is imported **once**, in the root `app/[locale]/layout.tsx`:
  `import '@/styles/globals.css'`.
- Component styles are imported per file: `import styles from './CommonButton.module.css'`.
- Global atom styles that must also work outside React (e.g. a `.button`
  used in rich text / markup) live in `styles/components/*.css` and are
  aggregated by `styles/components/index.css`. The matching React component
  composes that class (`className={\`button ${styles.ghost}\`}`) and keeps only
  its variants in its module — one source for the base look, never two.

### No Tailwind
No Tailwind classes in any JSX/TSX, no `tailwind.config.js`. Layout and spacing
are handled entirely via CSS Modules + tokens.

### Styling a new component — the everyday workflow
This is the loop you'll run most often. Keep it tight:

1. Create `components/<domain>/<Prefix><Name>.tsx` with a co-located
   `<Prefix><Name>.module.css` (e.g. `components/blocks/BlockHero.tsx` +
   `BlockHero.module.css`) — domain folders stay flat, no folder per component.
2. In the `.tsx`, give **every** styled element its own semantic class from
   `styles` (`.root`, `.title`, `.list`, `.item`, `.icon`) — no descendant
   selectors, no styling bare tags.
3. In the `.module.css`, write plain `px` and reference `var(--…)` tokens for
   colors/spacing/radii. Need a value that has no token? Add it to `tokens.css`
   first.
4. Responsive tweaks go **nested** inside the selector with `@media (--bp-*-up)`.
5. If the same layout shows up again elsewhere → promote it to
   `@layer utilities` in `utilities.css`.

Want a one-off custom look for a single instance? Compose classes in JSX —
`className={\`${styles.root} grid\`}` — rather than reaching for inline styles.

### Pre-submit CSS checklist
- [ ] All color/spacing/radius values use `var(--…)` tokens
- [ ] Every styled component has a `.module.css`; classes are short, local, no BEM
- [ ] No nested descendant selectors inside modules
- [ ] No hardcoded values outside `tokens.css`
- [ ] No hand-written `rem` (write `px`)
- [ ] No redundant `font-size`/`font-weight`/`line-height` where the base
      style already applies
- [ ] No inline styles for static values
- [ ] No Tailwind
- [ ] Reusable layout in `@layer utilities`, not duplicated
- [ ] Responsive type uses `clamp()`; breakpoints use `@custom-media`

---

## Out of scope

Project scaffolding, component folder structure and naming beyond the
`.module.css` co-location, i18n/multilang (next-intl), TypeScript rules, and
dependency setup are **not** part of this skill — follow the project's own
conventions there.
