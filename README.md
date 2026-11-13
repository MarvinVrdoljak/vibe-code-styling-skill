# Next.js House-Style Skills

Two standalone Claude skills that encode the team's Next.js conventions. Each
skill folder is **self-contained** — drag the folder you need into a project:

| Skill | Folder | Scope |
| --- | --- | --- |
| `nextjs-app-setup` (extended) | [`nextjs-basic-setup/`](nextjs-basic-setup/SKILL.md) | Full project setup: CSS architecture, component structure & reuse rules, i18n (next-intl), TypeScript, bootstrapping. Templates in `nextjs-basic-setup/templates/`. |
| `css-styling` (simple) | [`css-styling/`](css-styling/SKILL.md) | Styling only: the 3-layer CSS architecture (tokens + base + CSS Modules), PostCSS contract, breakpoints, styling workflow. For working inside an existing project. |

Maintenance and sync rules for editing the skills live in [`CLAUDE.md`](CLAUDE.md)
— they apply only inside this repo and must never be copied into the skill
files themselves.
