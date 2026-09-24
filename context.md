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
- Verified 2026-09-24 with headless Chromium against a local static server,
  at 380 and 1280px in light and dark mode: every page has scrollWidth equal to
  the viewport, the mobile menu opens on one tap on all five pages, no console
  errors, and the contact form shows an error toast when EmailJS is blocked.
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
- The EmailJS **public** key sitting in `index.html` is intended — EmailJS
  treats it as publishable. The private key must never appear in this repo.
- `.project-card` is a **single-column grid**, not a block. The grid track is
  what keeps a wide `<pre>` code sample from widening the whole page; as a
  block, the card propagated the code sample's max-content width up to the
  `.hero` flex item and pushed the page ~920px wide at a 380px viewport.
- `.project-card a { overflow-wrap: anywhere }` exists because repository URLs
  are long unbreakable tokens that otherwise overflow on a phone.
- Project descriptions carry each project's own disclaimer (LitSieve is a
  starting point and not medical advice; the ASD companion is a research
  prototype and not diagnostic). These are load-bearing claims about
  health-adjacent tools, not marketing copy — do not trim them for length.
- The LitSieve deployment at litpilot.org is deliberately **not** linked from
  the projects page: it is self-hosted and was unreachable when checked
  2026-08-14, and a dead link on a portfolio site is worse than no link.

## Session Handoff
- **Date:** 2026-09-24
- **Branch:** `feat/portfolio-refresh`
- **Done:** Fixed the home mobile menu double toggle, projects overflow at
  380px, silent contact-form failures, low-contrast tokens, and favicon 404.
  Resized and stripped `Face.jpg`. Added four public projects and refreshed
  LitSieve and ASD copy from their repos. Removed the Hospital Supply Tracker
  code sample. Honest awards state. Head metadata and `aria-current` on all
  pages.
- **Next:** Owner review of the PR (photo crop, teammate wording, intro copy),
  then transcript, activities, and awards facts from the owner.
