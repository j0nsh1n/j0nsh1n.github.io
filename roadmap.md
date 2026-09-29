# roadmap.md — j0nsh1n.github.io

Note: "Complete when" conditions are verified locally (pages open, links work,
both themes render) since this repo has no CI. One phase may span several small
commits.

## Phase 1 — Governance files adoption
- Tasks:
  - Commit tracked `agents.md`, `spec.md`, `roadmap.md`, `context.md`,
    `CHANGELOG.md`, matching the structure used by LitSieve and
    asd-insight-companion
  - Copy `agents.md` verbatim from LitSieve so the global rules stay identical
    across repos
  - Record in spec.md that no lint / type / test / CI tooling exists here, so
    those Definition-of-Done items are report-only
- Complete when: all five files are tracked in the repository root and an agent
  can resume from context.md's handoff without reading any other repo
- Status: [x] 2026-08-14

## Phase 2 — Project catalog refresh
- Tasks:
  - Replace the two brainstorm placeholders on `projects.html` (Nurse AI,
    Nutrition Guide) with the two projects that actually exist: **LitSieve**
    and the **ASD Insight Companion**
  - Give each a description, its stack, its current status, and a link to its
    source repository
  - Carry each project's own non-diagnostic / starting-point disclaimer onto
    the page rather than overstating what the tools do
- Complete when: every project card on `projects.html` describes a real
  repository and links to it, and no card is a placeholder for unstarted work
- Status: [x] 2026-08-14

## Backlog (unscheduled)
- Transcript coursework table stops mid-sophomore-year; junior year is missing
- No CI: an HTML validator + link checker on push would catch broken links and
  malformed markup that nothing currently checks
- Duplicated nav and `<head>` markup across five pages drifts (each page is
  edited by hand); no fix proposed yet that keeps "no build step"
