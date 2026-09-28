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
- Facts on transcript, activities, and awards refreshed 2026-09-28 from the
  owner's Academic Resume (2026-09-23), Senior Brag Sheet (2026-09-23), and
  counselor senior-checkup sheet. Sensitive family, health, and login details
  from those docs stay off the public site.
- Known gaps:
  - Official school transcript PDF was still pending in mid-September notes;
    GPA and grades here match the resume / brag sheet working figures
    (3.97 UW / 4.56 W), not a stamped registrar file.
  - SAT listed as the 1510 sitting (740 RW / 770 M). Later sittings exist;
    do not invent a superscore on the page.
  - The nav and `<head>` block are duplicated by hand across all five pages.
  - EmailJS SDK in use logs as deprecated upstream; v4 moves the CDN host
    (spec.md drift, not yet approved).

## Repo Landmarks
| Path | Role |
|------|------|
| `index.html` | Hero, about cards, fun facts, EmailJS contact form, social links |
| `projects.html` | Project catalog; card per project with status line |
| `activities.html` | Leadership, clubs, athletics, community service |
| `transcript.html` | GPA, test scores, coursework table, summer programs |
| `awards.html` | Awards and certificates |
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
- Public pages should not include information the owner would not hand to a
  stranger: no home address, no phone, no full birthdate, no ID numbers, no
  school portal logins, no family or diagnostic detail from counselor docs.
- Project descriptions carry each project's own disclaimer (LitSieve is a
  starting point and not medical advice; the ASD companion is a research
  prototype and not diagnostic). These are load-bearing claims about
  health-adjacent tools, not marketing copy — do not trim them for length.
- Project status lines carry **no version numbers** (owner decision
  2026-09-28). The repository link is where the current version lives.
- LitSieve links to its live site, **www.litpilot.org**.
- The MOVER SIS ventilation dashboard repo is private, so the Projects page
  describes it without a public source link.

## Session Handoff
- **Date:** 2026-09-28
- **Branch:** `main`
- **Done:** Transcript, activities, and awards facts brought in line with
  Google Drive resume and brag sheet. Cedars hours and junior council title
  corrected. MOVER SIS proof of concept added without a public repo link.
- **Next:** Swap GPA if a stamped official transcript disagrees with 3.97 /
  4.56. Confirm whether a later SAT sitting should replace 1510.
