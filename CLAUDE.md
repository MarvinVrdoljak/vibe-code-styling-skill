# Skill maintenance rules (root only — never copy into the skills)

This repo maintains **two standalone skills**. Each skill folder is dragged
into projects **individually**, so every `SKILL.md` must be fully
self-contained: **no references to this repo, its structure, or the sibling
skill** may appear inside the skill files. Meta rules like the ones in this
file live only here at the root.

- `nextjs-basic-setup/` — **extended** skill (`nextjs-app-setup`): full
  project setup incl. CSS architecture, components, i18n, TypeScript, plus
  `templates/`.
- `css-styling/` — **styling-only** skill (`css-styling`): just the CSS
  architecture and styling workflow, for existing projects.

## Sync rule

The styling/CSS content of both skills is shared and must stay **identical,
word for word**:

- A change to **styling or the CSS setup** (tokens, layers, CSS Modules rules,
  breakpoints, PostCSS contract, styling workflow, CSS checklist, the
  "inherit, don't redeclare" rule) → apply it to **both** `SKILL.md` files in
  the same change.
- A change **beyond styling** (i18n/multilang, TypeScript, component folder
  structure, reuse rules, bootstrapping, dependencies, templates) → apply it
  **only** to `nextjs-basic-setup/SKILL.md`, never to `css-styling`.

When editing, phrase shared sections so they work in both files (no
cross-references), then copy them verbatim.
