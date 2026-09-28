# context.md — j0nsh1n.github.io

## Current State
- Static personal portfolio site published by GitHub Pages from the repository
  root at <https://j0nsh1n.github.io>. Five hand-written HTML pages, one
  stylesheet, one script. **No build step, no npm, no server, no tests.**
- Governance files adopted 2026-08-14: `agents.md` (copied verbatim from
  LitSieve), `spec.md`, `roadmap.md`, `context.md`, `CHANGELOG.md`.
- Lint / types / tests / CI: **none configured**. Per agents.md these
  Definition-of-Done items are report-only here. Verification is manual, per
  spec.md's Validation section.
- Verified 2026-09-28 with Playwright + headless Chromium against a local
  static server of `main` at `8a7dd7e`, at 380 and 1280px: no element overflows
  the viewport on any page, no page errors or console errors besides blocked
  CDN fetches, the mobile menu opens on one tap and closes on the next on all
  five pages, the theme toggle persists, `aria-current` marks the current page,
  and the contact form shows an error toast when EmailJS is blocked.
- Deployed: GitHub Pages run #22 succeeded on `8a7dd7e` (2026-09-27).
- All seven repositories linked from `projects.html` are public (checked
  2026-09-28), so no project link 404s for visitors.
- Known gaps:
  - `awards.html` has no awards yet; it shows an "in progress" card.
  - `transcript.html` coursework table ends at one sophomore-year course.
  - `activities.html` has no 2026-27 entries.
  - The nav and `<head>` block are duplicated by hand across all five pages.
  - EmailJS SDK in use logs as deprecated upstream; v4 moves the CDN host
    (spec.md drift, not yet approved).

## Repo Landmarks
| Path | Role |
|------|------|
| `index.html` | Hero, about cards, fun facts, EmailJS contact form, social links |
| `projects.html` | Project catalog; card per project with status line |
| `activities.html` | Leadership, clubs, athletics, community service |
| `transcript.html` | GPA, test scores, coursework table |
| `awards.html` | Awards and certificates (in-progress state) |
| `pw.css` | Theme tokens (`:root` / `.dark-mode`), layout, components, media queries |
| `pw.js` | Dark mode, mobile menu, navbar scroll state, EmailJS submit, Discord popup, toasts |
| `Face.jpg` | Profile photo |

## Domain Model
No database, no accounts, no server-side state. The only persisted value is
client-side:

```
localStorage.theme = "dark" | "light"   (absent => follow OS preference)
```

External services, all called from the browser:

```
contact form  -> EmailJS   (service_mdo0jec / template_2vv226u, public key in source)
icons         -> Font Awesome 6 via cdnjs
fonts         -> Inter via Google Fonts (@import at top of pw.css)
```

## Non-Obvious Decisions
- Vanilla HTML/CSS/JS on purpose. No framework and no bundler — the site must
  stay openable as plain files and publishable by GitHub Pages as-is.
- The dark-mode toggle button is **injected by `pw.js`**, not written into each
  page's nav, so a new page picks it up by including the script.
- `pw.js` guards every element lookup (`?.`, early return) because it runs on
  pages that have no contact form and no profile image.
- `index.html` loads the EmailJS CDN script **before** `pw.js`, and
  `pw.js` `initContactForm()` initializes EmailJS only if it loaded, so a
  blocked CDN still gets an error toast on submit instead of a silent no-op.
- The EmailJS **public** key sitting in `pw.js` is intended — EmailJS
  treats it as publishable. The private key must never appear in this repo.
- `.project-card` is a **single-column grid**, not a block. It was made a grid
  because, as a block, a wide `<pre>` code sample's max-content width
  propagated up to the `.hero` flex item and pushed the page ~920px wide at a
  380px viewport. The code sample was removed 2026-09-24; the grid stays so any
  future wide content is still bounded.
- `.project-card a { overflow-wrap: anywhere }` exists because repository URLs
  are long unbreakable tokens that otherwise overflow on a phone.
- Project descriptions carry each project's own disclaimer (LitSieve is a
  starting point and not medical advice; the ASD companion is a research
  prototype and not diagnostic). These are load-bearing claims about
  health-adjacent tools, not marketing copy — do not trim them for length.
- Project status lines carry **no version numbers** (owner decision
  2026-09-28). Every project releases often enough that a hardcoded version
  went stale within days (FlexWeek read v0.14.3 while v0.16.0 was out). The
  repository link is where the current version lives.
- LitSieve links to its live site, **www.litpilot.org**, which the owner
  confirmed 2026-09-28 is its permanent address. It was previously left
  unlinked on a 2026-08-14 "unreachable" finding that was wrong: the agent
  sandbox's network policy denies both `www.litpilot.org` and
  `j0nsh1n.github.io`, so a failed fetch from an agent session says nothing
  about whether either site is up.

## Session Handoff
- **Date:** 2026-09-28
- **Branch:** `claude/litsieve-asd-companion-updates-7phd1q` (restarted from
  `main` at `8a7dd7e`; PRs #1, #2, #3 all merged)
- **Done:** Removed version numbers from every project status line; linked
  LitSieve's live site; corrected the wrong litpilot.org note; pruned
  roadmap backlog items that the 2026-09-24 refresh completed.
- **Next:** Transcript, activities, and awards facts from the owner. Merged
  branches `codex/refactor-code-to-remove-duplicates` and
  `feat/portfolio-refresh` are still on the remote.
