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
- Verified 2026-08-14 with headless Chromium against a local static server, at
  380 / 768 / 1280px: no element overflows the viewport on `projects.html`,
  `transcript.html`, `awards.html`, or `activities.html`, in light or dark mode.
- Known gaps:
  - `index.html` has one pre-existing horizontal overflow — `img.profile-img`
    measures at its 6152px natural width. Present identically on `main` before
    this session's changes; not caused by them, not yet fixed.
  - `Face.jpg` is 6.7 MB and is displayed at 200×200.
  - `awards.html` renders one award card whose heading, body, and date are all
    empty strings.
  - `transcript.html` coursework table ends at one sophomore-year course.
  - The nav and `<head>` block are duplicated by hand across all five pages.

## Repo Landmarks
| Path | Role |
|------|------|
| `index.html` | Hero, about cards, fun facts, EmailJS contact form, social links |
| `projects.html` | Project catalog; card per project; embedded code sample |
| `activities.html` | Leadership, clubs, athletics, community service |
| `transcript.html` | GPA, test scores, coursework table |
| `awards.html` | Awards and certificates grid (one empty card) |
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
- **Date:** 2026-08-14
- **Branch:** `claude/litsieve-asd-companion-updates-7phd1q`
- **Done:** Adopted the five governance files (agents.md verbatim from
  LitSieve). Replaced the two brainstorm placeholders on `projects.html`
  (Nurse AI, Nutrition Guide) with **LitSieve** and the **ASD Insight
  Companion**, written from those repositories' README / CHANGELOG / context.
  Fixed the `.project-card` layout so multi-paragraph cards stack and no
  longer overflow at 380px.
- **Next:** Human review. Open items are listed in roadmap.md's backlog —
  nearest are the empty awards card and the missing junior-year coursework.
