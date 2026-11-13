# Next.js House-Style Skills

Two standalone [Claude Code skills](https://docs.claude.com/en/docs/claude-code/skills)
that encode our Next.js conventions — from full project scaffolding down to
pure CSS styling rules.

**Stack:** Next.js 16+ (App Router, Turbopack), React 19, Node ≥ 20.9,
next-intl v4, PostCSS (px→rem, custom media), Stylelint. **No Tailwind, no CMS.**

## The two skills

| Skill | Folder | Use when… |
| --- | --- | --- |
| `nextjs-basic-setup` (extended) | [`nextjs-basic-setup/`](nextjs-basic-setup/SKILL.md) | …starting a **new project** or working on one that follows the full house style. Covers the 3-layer CSS architecture, fixed component folder structure & reuse rules, i18n (next-intl with `[locale]` segment), strict TypeScript, and bootstrapping. Ships ready-to-copy [`templates/`](nextjs-basic-setup/templates/): the complete `styles/` tree, `postcss.config.cjs`, `.browserslistrc`, `.stylelintrc.cjs`, i18n wiring, `proxy.ts`, `next.config.ts`, and example components. |
| `css-styling` (simple) | [`css-styling/`](css-styling/SKILL.md) | …you only need the **styling rules inside an existing project**: design tokens, base layer, CSS Modules conventions, breakpoints, the styling workflow and checklist. No scaffolding, no i18n, no TypeScript rules, no templates. |

Each skill folder is **fully self-contained** — the two know nothing about
each other, so you can drag exactly the one you need into a project.

## Usage

Copy the folder you need into the target project's skill directory:

```
<project>/.claude/skills/nextjs-basic-setup/   # full setup incl. templates
<project>/.claude/skills/css-styling/          # styling rules only
```

(Or into `~/.claude/skills/` to have it available in every project.)
Claude Code picks the skill up automatically via its `SKILL.md`. The folder
names match the skill names in the frontmatter (`nextjs-basic-setup`,
`css-styling`) — keep them as they are when copying.

## Maintaining this repo

The styling/CSS sections of both skills are intentionally **duplicated word
for word** — the sync rules for editing them (what goes into both files, what
only into the extended skill) live in [`CLAUDE.md`](CLAUDE.md) and apply only
inside this repo. Never copy repo-meta rules or cross-references into the
skill files themselves; they must stay standalone.
